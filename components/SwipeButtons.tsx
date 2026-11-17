"use client";

import React from "react";
import { X, Heart, Sparkles } from "lucide-react";

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeButtons({ onPass, onLike, disabled = false }: SwipeButtonsProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 w-full mt-4 mb-2">
      <div className="flex items-center justify-center gap-6 w-full max-w-xs">
        {/* Pass Button */}
        <button
          type="button"
          onClick={onPass}
          disabled={disabled}
          aria-label="Pass profile (Left Arrow)"
          className="relative group w-16 h-16 rounded-full bg-white border-2 border-coy-text flex items-center justify-center shadow-[4px_4px_0_#15121D] hover:shadow-[5px_5px_0_#15121D] hover:bg-coy-danger/10 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#15121D] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          <X className="w-8 h-8 text-coy-danger stroke-[3] transition-transform group-hover:scale-110" />
          <span className="sr-only">Pass</span>
        </button>

        {/* Like Button */}
        <button
          type="button"
          onClick={onLike}
          disabled={disabled}
          aria-label="Like profile (Right Arrow)"
          className="relative group w-20 h-20 rounded-full bg-coy-pink border-2 border-coy-text flex items-center justify-center shadow-[5px_5px_0_#15121D] hover:shadow-[6px_6px_0_#15121D] hover:bg-coy-pink-strong hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#15121D] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          <Heart className="w-10 h-10 text-white fill-white stroke-[2.5] transition-transform group-hover:scale-110" />
          <span className="sr-only">Like</span>
        </button>
      </div>

      {/* Keyboard Accessibility Hint */}
      <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-coy-muted bg-coy-soft px-3 py-1 rounded-full border border-coy-line">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white border border-coy-text/30 rounded text-[10px] shadow-sm">←</kbd> Pass
        </span>
        <span className="text-coy-muted/40">•</span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white border border-coy-text/30 rounded text-[10px] shadow-sm">→</kbd> Like
        </span>
      </div>
    </div>
  );
}
