import { NextResponse } from "next/server";
import { getCurrentUserId, getUserMatches } from "@/lib/matching";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const currentUserId = getCurrentUserId();
    const matches = await getUserMatches(currentUserId);

    return NextResponse.json(
      {
        success: true,
        count: matches.length,
        matches,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/matches:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve matches",
      },
      { status: 500 }
    );
  }
}
