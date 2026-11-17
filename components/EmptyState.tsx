import React from "react";
import Link from "next/link";
import { Sparkles, Heart, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  type: "feed" | "matches";
  onReset?: () => void;
  isResetting?: boolean;
}

export function EmptyState({ type, onReset, isResetting }: EmptyStateProps) {
  if (type === "matches") {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-[500px]">
        {/* Playful Coy styled badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-coy-pink-soft border-2 border-coy-text flex items-center justify-center shadow-[4px_4px_0_#15121D] -rotate-3">
            <Heart className="w-10 h-10 text-coy-pink stroke-[2.5]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-coy-yellow border-2 border-coy-text flex items-center justify-center shadow-[2px_2px_0_#15121D] rotate-6">
            <Sparkles className="w-4 h-4 text-coy-text" />
          </div>
        </div>

        <h2 className="font-extrabold text-2xl text-coy-text mb-2">
          No matches yet!
        </h2>
        <p className="text-sm text-coy-muted max-w-xs leading-relaxed mb-6">
          Mutual matches happen only when you both like each other. Your secret is always 100% safe.
        </p>

        <Link
          href="/discover"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-coy-pink text-white font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[3px_3px_0_#15121D] hover:shadow-[5px_5px_0_#15121D] active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Discovering</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 min-h-[500px]">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-coy-yellow border-2 border-coy-text flex items-center justify-center shadow-[4px_4px_0_#15121D] rotate-3">
          <span className="text-3xl">🎉</span>
        </div>
        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-coy-mint border-2 border-coy-text flex items-center justify-center shadow-[2px_2px_0_#15121D] -rotate-6">
          <Sparkles className="w-4 h-4 text-coy-text" />
        </div>
      </div>

      <h2 className="font-extrabold text-2xl text-coy-text mb-2">
        You&apos;re all caught up!
      </h2>
      <p className="text-sm text-coy-muted max-w-xs leading-relaxed mb-6">
        You&apos;ve reviewed all available profiles for now. Check out your mutual matches or reset the demo feed to discover again.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Link
          href="/matches"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-coy-pink text-white font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[3px_3px_0_#15121D] hover:shadow-[4px_4px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px] transition-all"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>View Matches</span>
        </Link>

        {onReset && (
          <button
            onClick={onReset}
            disabled={isResetting}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-white text-coy-text font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[3px_3px_0_#15121D] hover:bg-coy-soft hover:shadow-[4px_4px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <RotateCcw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
            <span>Reset Demo</span>
          </button>
        )}
      </div>
    </div>
  );
}
