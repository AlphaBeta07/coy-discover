import { NextResponse } from "next/server";
import { getCurrentUserId, recordSwipe } from "@/lib/matching";
import { validateSwipeRequest, SwipeRequestBody } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const currentUserId = getCurrentUserId();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    const validation = validateSwipeRequest(body, currentUserId);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      );
    }

    const { profileId, action } = body as SwipeRequestBody;

    const result = await recordSwipe(currentUserId, profileId, action);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in POST /api/swipe:", error);
    const message = error instanceof Error ? error.message : "Failed to record swipe";

    if (message.includes("Target profile not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Target profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during swipe processing",
      },
      { status: 500 }
    );
  }
}
