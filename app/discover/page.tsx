"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PublicProfile } from "@/lib/matching";
import { ProfileCard } from "@/components/ProfileCard";
import { SwipeButtons } from "@/components/SwipeButtons";
import { MatchModal } from "@/components/MatchModal";
import { EmptyState } from "@/components/EmptyState";
import { LoadingCard } from "@/components/LoadingCard";

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<PublicProfile | null>(null);

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/feed");
      const data = await res.json();

      if (data.success && Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
        setCurrentIndex(0);
      } else {
        setError(data.error || "Failed to load profiles");
      }
    } catch (err) {
      console.error("Feed fetch error:", err);
      setError("Network error loading profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleSwipe = useCallback(
    async (action: "like" | "pass") => {
      if (isSubmitting || currentIndex >= profiles.length) return;

      const currentProfile = profiles[currentIndex];
      setIsSubmitting(true);

      // Advance to next card optimistically for seamless responsive feel
      setCurrentIndex((prev) => prev + 1);

      try {
        const res = await fetch("/api/swipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileId: currentProfile.id,
            action,
          }),
        });

        const data = await res.json();

        if (data.success && data.matched && data.match?.profile) {
          // Mutual match achieved!
          setMatchedProfile(data.match.profile);
        }
      } catch (err) {
        console.error("Swipe submission error:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, currentIndex, profiles]
  );

  // Keyboard accessibility: Left Arrow -> Pass, Right Arrow -> Like
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (matchedProfile || loading || currentIndex >= profiles.length) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe("pass");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe("like");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSwipe, matchedProfile, loading, currentIndex, profiles.length]);

  const handleResetFeed = async () => {
    try {
      setIsResetting(true);
      const res = await fetch("/api/reset", { method: "POST" });
      if (res.ok) {
        await fetchFeed();
      }
    } catch (err) {
      console.error("Reset error:", err);
    } finally {
      setIsResetting(false);
    }
  };

  const hasRemainingProfiles = currentIndex < profiles.length;
  const currentCard = hasRemainingProfiles ? profiles[currentIndex] : null;
  const nextCard = currentIndex + 1 < profiles.length ? profiles[currentIndex + 1] : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-between max-w-sm mx-auto w-full">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between px-1 mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-coy-text/70">
          Discover
        </span>
        {hasRemainingProfiles && (
          <span className="text-xs font-bold text-coy-muted bg-coy-soft px-2.5 py-0.5 rounded-full border border-coy-line">
            {profiles.length - currentIndex} remaining
          </span>
        )}
      </div>

      {/* Card Deck Area */}
      <div className="relative w-full aspect-[3/4.2] max-h-[580px] my-auto">
        {loading ? (
          <LoadingCard />
        ) : error ? (
          <div className="w-full h-full bg-white border-2 border-coy-text rounded-[26px] p-6 shadow-[5px_5px_0_#15121D] flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-3">⚠️</span>
            <h3 className="font-extrabold text-lg text-coy-text mb-1">Unable to load feed</h3>
            <p className="text-xs text-coy-muted mb-4">{error}</p>
            <button
              onClick={fetchFeed}
              className="px-5 py-2.5 bg-coy-pink text-white font-extrabold text-xs border-2 border-coy-text rounded-full shadow-[2px_2px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px]"
            >
              Retry
            </button>
          </div>
        ) : hasRemainingProfiles && currentCard ? (
          <>
            {/* Background next card preview in deck */}
            {nextCard && (
              <ProfileCard
                key={nextCard.id}
                profile={nextCard}
                isFront={false}
                onSwipe={() => {}}
                disabled
              />
            )}

            {/* Foreground top card with swipe gestures */}
            <ProfileCard
              key={currentCard.id}
              profile={currentCard}
              isFront={true}
              onSwipe={handleSwipe}
              disabled={isSubmitting}
            />
          </>
        ) : (
          <EmptyState
            type="feed"
            onReset={handleResetFeed}
            isResetting={isResetting}
          />
        )}
      </div>

      {/* Swipe Action Buttons */}
      {hasRemainingProfiles && !loading && (
        <SwipeButtons
          onPass={() => handleSwipe("pass")}
          onLike={() => handleSwipe("like")}
          disabled={isSubmitting}
        />
      )}

      {/* Mutual Match Celebration Modal */}
      {matchedProfile && (
        <MatchModal
          matchedProfile={matchedProfile}
          onClose={() => setMatchedProfile(null)}
        />
      )}
    </div>
  );
}
