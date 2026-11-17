"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Heart, Sparkles, MessageCircle } from "lucide-react";
import { PublicProfile } from "@/lib/matching";

interface MatchModalProps {
  matchedProfile: PublicProfile;
  currentUserPhoto?: string;
  currentUserName?: string;
  onClose: () => void;
}

export function MatchModal({
  matchedProfile,
  currentUserPhoto = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  currentUserName = "Aarav",
  onClose,
}: MatchModalProps) {
  useEffect(() => {
    // Fire confetti when match modal opens
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.6 },
        colors: ["#FF3D81", "#FFE45C", "#CBF4E0", "#E7E0FF", "#15121D"],
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch (e) {
      console.error("Confetti error:", e);
    }
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white border-2 border-coy-text rounded-[28px] p-6 shadow-[8px_8px_0_#15121D] text-center transform -rotate-1 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-coy-yellow border-2 border-coy-text shadow-[2px_2px_0_#15121D] mb-4">
          <Sparkles className="w-4 h-4 text-coy-text" />
          <span className="text-xs font-black uppercase tracking-wider text-coy-text">
            Mutual Crush!
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-coy-text mb-1">
          It&apos;s a Match!
        </h2>
        <p className="text-xs text-coy-muted mb-6">
          You and <strong className="text-coy-text">{matchedProfile.name}</strong> both liked each other.
        </p>

        {/* Dual Profile Avatars */}
        <div className="relative flex items-center justify-center my-6">
          {/* Current User Avatar */}
          <div className="relative w-24 h-24 rounded-full border-3 border-coy-text overflow-hidden shadow-[4px_4px_0_#15121D] -mr-4 z-10 bg-coy-soft transform -rotate-6">
            <Image
              src={currentUserPhoto}
              alt={currentUserName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* Overlapping Heart Badge */}
          <div className="absolute z-30 w-10 h-10 rounded-full bg-coy-pink border-2 border-coy-text flex items-center justify-center shadow-[2px_2px_0_#15121D]">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>

          {/* Matched User Avatar */}
          <div className="relative w-24 h-24 rounded-full border-3 border-coy-text overflow-hidden shadow-[4px_4px_0_#15121D] -ml-4 z-20 bg-coy-soft transform rotate-6">
            <Image
              src={matchedProfile.photo}
              alt={matchedProfile.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </div>

        {/* Context / Privacy badge */}
        <div className="p-3 bg-coy-soft border-2 border-coy-line rounded-2xl mb-6">
          <p className="text-[11px] font-semibold text-coy-text/80 leading-relaxed">
            🔒 Neither of you knew until you both swiped right. True Coy privacy.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/matches"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-coy-pink text-white font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[4px_4px_0_#15121D] hover:shadow-[5px_5px_0_#15121D] hover:bg-coy-pink-strong active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>View in Matches</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-6 bg-white text-coy-text font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[3px_3px_0_#15121D] hover:bg-coy-soft hover:shadow-[4px_4px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}
