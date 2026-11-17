import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/matching";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const currentUserId = getCurrentUserId();

    // Remove all matches involving current user
    await prisma.match.deleteMany({
      where: {
        OR: [{ user1Id: currentUserId }, { user2Id: currentUserId }],
      },
    });

    // Remove all swipes made BY the current user (keeps incoming pre-seeded likes intact!)
    await prisma.swipe.deleteMany({
      where: {
        swiperId: currentUserId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Swipes and matches reset successfully. Pre-seeded incoming likes remain active.",
    });
  } catch (error) {
    console.error("Error in POST /api/reset:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to reset demo state",
      },
      { status: 500 }
    );
  }
}
