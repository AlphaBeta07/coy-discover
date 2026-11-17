export interface SwipeRequestBody {
  profileId: string;
  action: "like" | "pass";
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateSwipeRequest(body: unknown, currentUserId: string): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const { profileId, action } = body as Partial<SwipeRequestBody>;

  if (!profileId || typeof profileId !== "string" || profileId.trim() === "") {
    return { valid: false, error: "profileId is required and must be a non-empty string" };
  }

  if (profileId === currentUserId) {
    return { valid: false, error: "Users cannot swipe on themselves" };
  }

  if (action !== "like" && action !== "pass") {
    return { valid: false, error: 'action must be either "like" or "pass"' };
  }

  return { valid: true };
}
