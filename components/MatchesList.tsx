"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Sparkles, MapPin, GraduationCap } from "lucide-react";
import { MutualMatchItem } from "@/lib/matching";
import { MatchDetailModal } from "./MatchDetailModal";

interface MatchesListProps {
  matches: MutualMatchItem[];
}

export function MatchesList({ matches }: MatchesListProps) {
  const [selectedMatch, setSelectedMatch] = useState<MutualMatchItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-6">
        {matches.map((item) => {
          const { profile, matchedAt } = item;
          const formattedDate = new Date(matchedAt).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={item.id}
              onClick={() => setSelectedMatch(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedMatch(item);
                }
              }}
              className="group bg-white border-2 border-coy-text rounded-[22px] p-3.5 shadow-[4px_4px_0_#15121D] hover:shadow-[5px_5px_0_#15121D] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo and Badges */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-coy-text mb-3 bg-coy-soft">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 480px) 100vw, 240px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Match pill overlay */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-coy-mint border border-coy-text rounded-full shadow-[1px_1px_0_#15121D] flex items-center gap-1">
                    <Heart className="w-3 h-3 text-coy-pink fill-coy-pink" />
                    <span className="text-[10px] font-black uppercase text-coy-text">Match</span>
                  </div>

                  {/* Age pill */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/95 border border-coy-text rounded-full text-[11px] font-black text-coy-text shadow-[1px_1px_0_#15121D]">
                    {profile.age}
                  </div>
                </div>

                {/* Name & College */}
                <h3 className="font-extrabold text-lg text-coy-text truncate group-hover:text-coy-pink-strong transition-colors">
                  {profile.name}
                </h3>
                <p className="text-xs text-coy-muted font-medium truncate mb-2 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-coy-pink shrink-0" />
                  <span className="truncate">{profile.cityOrCollege}</span>
                </p>

                {/* Short bio preview */}
                <p className="text-xs text-coy-text/80 line-clamp-2 leading-snug mb-3">
                  {profile.bio}
                </p>
              </div>

              {/* Footer info & view tag */}
              <div className="pt-2 border-t border-coy-line flex items-center justify-between text-[11px] text-coy-muted">
                <span>Matched {formattedDate}</span>
                <span className="font-bold text-coy-pink group-hover:underline">View details →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedMatch && (
        <MatchDetailModal
          profile={selectedMatch.profile}
          matchedAt={selectedMatch.matchedAt}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </>
  );
}
