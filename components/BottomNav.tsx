"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Heart } from "lucide-react";

interface BottomNavProps {
  matchCount?: number;
}

export function BottomNav({ matchCount: propMatchCount }: BottomNavProps) {
  const pathname = usePathname();
  const [matchCount, setMatchCount] = useState<number>(propMatchCount ?? 0);

  // Sync propMatchCount if provided
  useEffect(() => {
    if (propMatchCount !== undefined) {
      setMatchCount(propMatchCount);
    }
  }, [propMatchCount]);

  // If no prop count, fetch matches count
  useEffect(() => {
    if (propMatchCount === undefined) {
      fetch("/api/matches")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && typeof data.count === "number") {
            setMatchCount(data.count);
          }
        })
        .catch(() => {});
    }
  }, [propMatchCount, pathname]);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Discover",
      href: "/discover",
      icon: Sparkles,
      highlight: true,
    },
    {
      label: "Matches",
      href: "/matches",
      icon: Heart,
      badge: matchCount > 0 ? matchCount : undefined,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t-2 border-coy-text px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-150 ${
                isActive
                  ? "bg-coy-pink text-white font-extrabold border-2 border-coy-text shadow-[2px_2px_0_#15121D] -translate-y-0.5"
                  : "text-coy-text font-bold hover:bg-coy-soft hover:text-coy-pink-strong"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "scale-110 stroke-[2.5]" : "stroke-[2]"
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-3 min-w-[18px] h-[18px] px-1 text-[10px] font-black flex items-center justify-center rounded-full border border-coy-text ${
                      isActive
                        ? "bg-coy-yellow text-coy-text"
                        : "bg-coy-pink text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
