import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { prisma } from "@/lib/prisma";
import {
  CURRENT_USER_ID,
  getFeedProfiles,
  recordSwipe,
  getUserMatches,
  normalizeMatchPair,
} from "@/lib/matching";
import { validateSwipeRequest } from "@/lib/validation";
import { seedDatabase } from "@/prisma/seed";

describe("Matching Engine & Privacy Protection Tests", () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  beforeEach(async () => {
    // Reset current user's outgoing swipes and matches
    await prisma.match.deleteMany({
      where: {
        OR: [{ user1Id: CURRENT_USER_ID }, { user2Id: CURRENT_USER_ID }],
      },
    });
    await prisma.swipe.deleteMany({
      where: {
        swiperId: CURRENT_USER_ID,
      },
    });
  });

  it("TEST 1: getFeedProfiles returns only unswiped profiles and excludes logged-in user", async () => {
    const feed = await getFeedProfiles(CURRENT_USER_ID);
    expect(feed.length).toBeGreaterThan(0);

    // Current user should never appear in feed
    const containsSelf = feed.some((p) => p.id === CURRENT_USER_ID);
    expect(containsSelf).toBe(false);

    // Verify properties required for profile cards
    const firstProfile = feed[0];
    expect(firstProfile).toHaveProperty("id");
    expect(firstProfile).toHaveProperty("name");
    expect(firstProfile).toHaveProperty("age");
    expect(firstProfile).toHaveProperty("photo");
    expect(firstProfile).toHaveProperty("bio");
    expect(firstProfile).toHaveProperty("cityOrCollege");
    expect(firstProfile).toHaveProperty("interests");
    expect(Array.isArray(firstProfile.interests)).toBe(true);
  });

  it("TEST 2: Pass action successfully saves a pass and does not match", async () => {
    // Pick an unswiped profile (e.g. user_103 Rohan)
    const result = await recordSwipe(CURRENT_USER_ID, "user_103", "pass");

    expect(result.success).toBe(true);
    expect(result.matched).toBe(false);

    // Check database record
    const savedSwipe = await prisma.swipe.findUnique({
      where: {
        swiperId_swipedId: {
          swiperId: CURRENT_USER_ID,
          swipedId: "user_103",
        },
      },
    });
    expect(savedSwipe).not.toBeNull();
    expect(savedSwipe?.action).toBe("pass");
  });

  it("TEST 3 & 4: Mutual like creates exactly one match", async () => {
    // user_101 (Priya) has pre-liked user_me in seed
    const preLike = await prisma.swipe.findUnique({
      where: {
        swiperId_swipedId: {
          swiperId: "user_101",
          swipedId: CURRENT_USER_ID,
        },
      },
    });
    expect(preLike).not.toBeNull();
    expect(preLike?.action).toBe("like");

    // Current user likes user_101
    const result = await recordSwipe(CURRENT_USER_ID, "user_101", "like");

    expect(result.success).toBe(true);
    expect(result.matched).toBe(true);
    expect(result.match).toBeDefined();
    expect(result.match?.profile.id).toBe("user_101");
    expect(result.match?.profile.name).toBe("Priya Sharma");

    // Verify exactly one match in database
    const [u1, u2] = normalizeMatchPair(CURRENT_USER_ID, "user_101");
    const dbMatch = await prisma.match.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: u1,
          user2Id: u2,
        },
      },
    });
    expect(dbMatch).not.toBeNull();

    // Verify user matches list
    const matches = await getUserMatches(CURRENT_USER_ID);
    expect(matches.some((m) => m.profile.id === "user_101")).toBe(true);
  });

  it("TEST 5: Non-mutual like does not create a match", async () => {
    // user_103 has NOT liked user_me
    const result = await recordSwipe(CURRENT_USER_ID, "user_103", "like");

    expect(result.success).toBe(true);
    expect(result.matched).toBe(false);

    // Ensure no match was created
    const [u1, u2] = normalizeMatchPair(CURRENT_USER_ID, "user_103");
    const dbMatch = await prisma.match.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: u1,
          user2Id: u2,
        },
      },
    });
    expect(dbMatch).toBeNull();
  });

  it("TEST 6 & 14: Incoming non-mutual likes are NEVER revealed in feed or matches", async () => {
    // user_102 (Ananya) has pre-liked user_me, but user_me hasn't swiped yet
    const feed = await getFeedProfiles(CURRENT_USER_ID);
    const ananya = feed.find((p) => p.id === "user_102");
    expect(ananya).toBeDefined();

    // Privacy assertion: No field indicating incoming like exists
    expect(ananya).not.toHaveProperty("preLikesMe");
    expect(ananya).not.toHaveProperty("hasLikedMe");
    expect(ananya).not.toHaveProperty("liked");
    expect(JSON.stringify(ananya)).not.toContain("like");

    // Matches endpoint must NOT contain user_102 because user_me hasn't liked her
    const matches = await getUserMatches(CURRENT_USER_ID);
    expect(matches.some((m) => m.profile.id === "user_102")).toBe(false);
  });

  it("TEST 7 & 8: Previously swiped profiles never appear in feed again (Persistence)", async () => {
    const initialFeed = await getFeedProfiles(CURRENT_USER_ID);
    const countBefore = initialFeed.length;
    const target = initialFeed[0];

    // Swipe on target
    await recordSwipe(CURRENT_USER_ID, target.id, "pass");

    // Re-fetch feed
    const updatedFeed = await getFeedProfiles(CURRENT_USER_ID);
    expect(updatedFeed.length).toBe(countBefore - 1);
    expect(updatedFeed.some((p) => p.id === target.id)).toBe(false);
  });

  it("TEST 9: Matches persist across queries and reloads", async () => {
    // Like user_105 (Diya Patel who pre-liked user_me)
    await recordSwipe(CURRENT_USER_ID, "user_105", "like");

    const matches1 = await getUserMatches(CURRENT_USER_ID);
    expect(matches1.some((m) => m.profile.id === "user_105")).toBe(true);

    // Query again simulating another page load
    const matches2 = await getUserMatches(CURRENT_USER_ID);
    expect(matches2.length).toBe(matches1.length);
    expect(matches2.some((m) => m.profile.id === "user_105")).toBe(true);
  });

  it("TEST 10: Duplicate swipe requests are safely and idempotently handled", async () => {
    const swipe1 = await recordSwipe(CURRENT_USER_ID, "user_104", "like");
    expect(swipe1.success).toBe(true);

    // Duplicate swipe
    const swipe2 = await recordSwipe(CURRENT_USER_ID, "user_104", "like");
    expect(swipe2.success).toBe(true);

    // Verify only 1 swipe record exists in the DB
    const allSwipes = await prisma.swipe.findMany({
      where: {
        swiperId: CURRENT_USER_ID,
        swipedId: "user_104",
      },
    });
    expect(allSwipes.length).toBe(1);
  });

  it("TEST: Validation correctly blocks invalid requests", () => {
    expect(validateSwipeRequest(null, CURRENT_USER_ID).valid).toBe(false);
    expect(validateSwipeRequest({}, CURRENT_USER_ID).valid).toBe(false);
    expect(validateSwipeRequest({ profileId: "user_101", action: "invalid" }, CURRENT_USER_ID).valid).toBe(false);
    // Self-swipe prevention
    expect(validateSwipeRequest({ profileId: CURRENT_USER_ID, action: "like" }, CURRENT_USER_ID).valid).toBe(false);
    // Valid request
    expect(validateSwipeRequest({ profileId: "user_101", action: "like" }, CURRENT_USER_ID).valid).toBe(true);
  });
});
