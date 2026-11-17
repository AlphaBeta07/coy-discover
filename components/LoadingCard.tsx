import React from "react";

export function LoadingCard() {
  return (
    <div className="relative w-full aspect-[3/4.2] max-h-[580px] bg-white border-2 border-coy-text rounded-[26px] shadow-[5px_5px_0_#15121D] overflow-hidden flex flex-col animate-pulse">
      {/* Photo skeleton */}
      <div className="relative flex-1 bg-coy-soft w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 w-12 h-6 bg-coy-line rounded-full border border-coy-text/30" />
      </div>

      {/* Profile info skeleton */}
      <div className="p-5 bg-white border-t-2 border-coy-line space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-36 bg-coy-line rounded-full" />
          <div className="h-6 w-10 bg-coy-yellow/60 rounded-full" />
        </div>
        <div className="h-4 w-48 bg-coy-soft rounded-full" />
        <div className="h-4 w-full bg-coy-soft rounded-full" />
        <div className="h-4 w-3/4 bg-coy-soft rounded-full" />

        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 bg-coy-lilac/60 rounded-full" />
          <div className="h-6 w-20 bg-coy-mint/60 rounded-full" />
          <div className="h-6 w-14 bg-coy-pink-soft/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}
