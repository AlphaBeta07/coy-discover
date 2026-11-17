import { NextResponse } from "next/server";
import { getCurrentUserId, getFeedProfiles } from "@/lib/matching";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const currentUserId = getCurrentUserId();
    const profiles = await getFeedProfiles(currentUserId);

    return NextResponse.json(
      {
        success: true,
        count: profiles.length,
        profiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/feed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve discovery feed",
      },
      { status: 500 }
    );
  }
}
