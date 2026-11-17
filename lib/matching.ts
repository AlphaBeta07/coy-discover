import { prisma } from "./prisma";

export const CURRENT_USER_ID = process.env.CURRENT_USER_ID || "user_me";
export const DEFAULT_CURRENT_USER_ID = CURRENT_USER_ID;

export function getCurrentUserId(): string {
  return process.env.CURRENT_USER_ID || CURRENT_USER_ID;
}

export interface PublicProfile {
  id: string;
  name: string;
  age: number;
  photo: string;
  bio: string;
  cityOrCollege: string;
  interests: string[];
}

export interface MatchResult {
  success: boolean;
  matched: boolean;
  match?: {
    id: string;
    profile: PublicProfile;
    matchedAt: string;
  };
  message?: string;
}

export interface MutualMatchItem {
  id: string;
  matchedAt: string;
  profile: PublicProfile;
}

/**
 * Normalizes two user IDs lexicographically so that regardless of who liked whom first,
 * the unique constraint @@unique([user1Id, user2Id]) guarantees exactly one match record.
 */
export function normalizeMatchPair(userA: string, userB: string): [string, string] {
  return userA < userB ? [userA, userB] : [userB, userA];
}

/**
 * Retrieves profiles that the current user has not yet swiped on.
 * Strictly adheres to privacy: NO incoming like information is returned.
 */
export async function getFeedProfiles(currentUserId: string): Promise<PublicProfile[]> {
  // Find all profiles already swiped by current user
  const swipedRecords = await prisma.swipe.findMany({
    where: { swiperId: currentUserId },
    select: { swipedId: true },
  });

  const excludedIds = [currentUserId, ...swipedRecords.map((s) => s.swipedId)];

  const rawUsers = await prisma.user.findMany({
    where: {
      id: {
        notIn: excludedIds,
      },
    },
    select: {
      id: true,
      name: true,
      age: true,
      photo: true,
      bio: true,
      cityOrCollege: true,
      interests: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return rawUsers.map((u) => {
    let parsedInterests: string[] = [];
    try {
      parsedInterests = JSON.parse(u.interests);
    } catch {
      parsedInterests = u.interests ? u.interests.split(",").map((s) => s.trim()) : [];
    }

    return {
      id: u.id,
      name: u.name,
      age: u.age,
      photo: u.photo,
      bio: u.bio,
      cityOrCollege: u.cityOrCollege,
      interests: parsedInterests,
    };
  });
}

/**
 * Records a swipe (like or pass) from current user to target profile.
 * Uses a database transaction to prevent race conditions during matching.
 */
export async function recordSwipe(
  swiperId: string,
  swipedId: string,
  action: "like" | "pass"
): Promise<MatchResult> {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify target profile exists
    const targetUser = await tx.user.findUnique({
      where: { id: swipedId },
    });

    if (!targetUser) {
      throw new Error("Target profile not found");
    }

    // 2. Check if a swipe already exists from this swiper to swiped
    const existingSwipe = await tx.swipe.findUnique({
      where: {
        swiperId_swipedId: {
          swiperId,
          swipedId,
        },
      },
    });

    if (existingSwipe) {
      // Swipe already recorded: return idempotent result
      if (existingSwipe.action === "like") {
        const [u1, u2] = normalizeMatchPair(swiperId, swipedId);
        const existingMatch = await tx.match.findUnique({
          where: { user1Id_user2Id: { user1Id: u1, user2Id: u2 } },
        });

        if (existingMatch) {
          let interests: string[] = [];
          try {
            interests = JSON.parse(targetUser.interests);
          } catch {
            interests = [];
          }
          return {
            success: true,
            matched: true,
            match: {
              id: existingMatch.id,
              profile: {
                id: targetUser.id,
                name: targetUser.name,
                age: targetUser.age,
                photo: targetUser.photo,
                bio: targetUser.bio,
                cityOrCollege: targetUser.cityOrCollege,
                interests,
              },
              matchedAt: existingMatch.createdAt.toISOString(),
            },
          };
        }
      }
      return { success: true, matched: false, message: "Swipe already recorded" };
    }

    // 3. Save the new swipe
    await tx.swipe.create({
      data: {
        swiperId,
        swipedId,
        action,
      },
    });

    // If it's a pass, no match can occur
    if (action === "pass") {
      return {
        success: true,
        matched: false,
      };
    }

    // 4. Action is "like": check for existing reverse like
    const reverseSwipe = await tx.swipe.findUnique({
      where: {
        swiperId_swipedId: {
          swiperId: swipedId,
          swipedId: swiperId,
        },
      },
    });

    const isMutualLike = reverseSwipe && reverseSwipe.action === "like";

    if (isMutualLike) {
      // Mutual match! Create Match record
      const [user1Id, user2Id] = normalizeMatchPair(swiperId, swipedId);

      const match = await tx.match.upsert({
        where: {
          user1Id_user2Id: {
            user1Id,
            user2Id,
          },
        },
        create: {
          user1Id,
          user2Id,
        },
        update: {},
      });

      let interests: string[] = [];
      try {
        interests = JSON.parse(targetUser.interests);
      } catch {
        interests = [];
      }

      return {
        success: true,
        matched: true,
        match: {
          id: match.id,
          profile: {
            id: targetUser.id,
            name: targetUser.name,
            age: targetUser.age,
            photo: targetUser.photo,
            bio: targetUser.bio,
            cityOrCollege: targetUser.cityOrCollege,
            interests,
          },
          matchedAt: match.createdAt.toISOString(),
        },
      };
    }

    // Non-mutual like: Return false without revealing reverse status
    return {
      success: true,
      matched: false,
    };
  });
}

/**
 * Returns only mutual matches for the user. Never returns non-mutual incoming likes.
 */
export async function getUserMatches(currentUserId: string): Promise<MutualMatchItem[]> {
  const matches = await prisma.match.findMany({
    where: {
      OR: [{ user1Id: currentUserId }, { user2Id: currentUserId }],
    },
    include: {
      user1: true,
      user2: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return matches.map((m) => {
    const otherUser = m.user1Id === currentUserId ? m.user2 : m.user1;
    let parsedInterests: string[] = [];
    try {
      parsedInterests = JSON.parse(otherUser.interests);
    } catch {
      parsedInterests = [];
    }

    return {
      id: m.id,
      matchedAt: m.createdAt.toISOString(),
      profile: {
        id: otherUser.id,
        name: otherUser.name,
        age: otherUser.age,
        photo: otherUser.photo,
        bio: otherUser.bio,
        cityOrCollege: otherUser.cityOrCollege,
        interests: parsedInterests,
      },
    };
  });
}
