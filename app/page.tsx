import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 min-h-[460px]">
      {/* Subtle Coy icon badge */}
      <div className="w-16 h-16 rounded-2xl bg-coy-soft border-2 border-coy-text flex items-center justify-center shadow-[3px_3px_0_#15121D] mb-6 -rotate-2">
        <svg
          viewBox="0 0 64 64"
          className="w-9 h-9 text-coy-text"
          fill="currentColor"
        >
          <path d="M30.7 45.4c-6.8 0-12-1.9-15.6-5.8-3.5-3.8-5.3-9-5.3-15.5 0-6.4 1.8-11.6 5.3-15.5 3.6-3.8 8.8-5.8 15.6-5.8 6.9 0 12.1 2.3 15.6 6.9l-4.5 4.3c-2.8-3.4-6.5-5.1-11.1-5.1-4.7 0-8.3 1.5-10.7 4.5-2.4 3-3.6 7.2-3.6 12.7s1.2 9.7 3.6 12.7c2.4 3 6 4.5 10.7 4.5 4.6 0 8.3-1.6 11.1-4.9l4.5 4.3c-3.5 4.4-8.7 6.5-15.6 6.5z" />
          <circle cx="48" cy="24" r="5" fill="#FF3D81" stroke="#15121D" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="inline-block px-3 py-1 bg-coy-lilac/70 border border-coy-text rounded-full text-xs font-black uppercase tracking-wider text-coy-text mb-3">
        Home Tab
      </div>

      <h1 className="font-extrabold text-2xl text-coy-text tracking-tight mb-2">
        Home Placeholder
      </h1>

      <p className="text-sm text-coy-muted max-w-xs leading-relaxed mb-8">
        As specified in the Coy assignment guidelines, this tab is kept as a clean placeholder. The new swipe-based discovery experience is live in the Discover tab.
      </p>

      <Link
        href="/discover"
        className="inline-flex items-center gap-2 py-3.5 px-6 bg-coy-pink text-white font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[4px_4px_0_#15121D] hover:shadow-[5px_5px_0_#15121D] hover:bg-coy-pink-strong active:translate-x-[1px] active:translate-y-[1px] transition-all"
      >
        <Sparkles className="w-4 h-4" />
        <span>Go to Discover</span>
        <ArrowRight className="w-4 h-4 ml-0.5" />
      </Link>
    </div>
  );
}
