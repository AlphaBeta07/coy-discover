"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, MapPin, GraduationCap, Heart, Sparkles, MessageCircle } from "lucide-react";
import { PublicProfile } from "@/lib/matching";

interface MatchDetailModalProps {
  profile: PublicProfile;
  matchedAt: string;
  onClose: () => void;
}

const INTEREST_COLORS = [
  "bg-coy-yellow/70",
  "bg-coy-lilac/80",
  "bg-coy-mint/80",
  "bg-coy-sky/80",
  "bg-coy-pink-soft",
  "bg-coy-peach/80",
];

export function MatchDetailModal({ profile, matchedAt, onClose }: MatchDetailModalProps) {
  const [imageError, setImageError] = useState(false);

  const formattedDate = new Date(matchedAt).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fallbackDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23FFE4EF"/><text x="50%" y="45%" font-family="system-ui, sans-serif" font-size="84" font-weight="800" fill="%23FF3D81" text-anchor="middle" dominant-baseline="middle">${initials}</text><text x="50%" y="65%" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="%2315121D" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(profile.name)}</text></svg>`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white border-2 border-coy-text rounded-[28px] overflow-hidden shadow-[8px_8px_0_#15121D] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close profile details"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 border-2 border-coy-text flex items-center justify-center shadow-[2px_2px_0_#15121D] hover:bg-coy-pink-soft active:translate-x-[1px] active:translate-y-[1px]"
        >
          <X className="w-5 h-5 text-coy-text" />
        </button>

        {/* Photo Container */}
        <div className="relative w-full h-72 bg-coy-soft shrink-0">
          <Image
            src={imageError ? fallbackDataUrl : profile.photo}
            alt={profile.name}
            fill
            sizes="384px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Mutual match tag */}
          <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coy-mint border-2 border-coy-text shadow-[2px_2px_0_#15121D]">
            <Heart className="w-3.5 h-3.5 text-coy-pink fill-coy-pink" />
            <span className="text-[11px] font-black uppercase text-coy-text">
              Mutual Match • {formattedDate}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-2xl text-coy-text">{profile.name}</h2>
              <span className="px-2.5 py-0.5 text-xs font-black bg-coy-yellow border border-coy-text rounded-full">
                {profile.age}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-coy-muted mt-1">
              <GraduationCap className="w-4 h-4 text-coy-pink-strong shrink-0" />
              <span>{profile.cityOrCollege}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-coy-muted mb-1">
              About
            </h3>
            <p className="text-sm text-coy-text leading-relaxed bg-coy-soft/70 p-3 rounded-2xl border border-coy-line">
              {profile.bio}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-coy-muted mb-1.5">
              Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest, idx) => {
                const color = INTEREST_COLORS[idx % INTEREST_COLORS.length];
                return (
                  <span
                    key={interest}
                    className={`px-3 py-1 text-xs font-bold text-coy-text border border-coy-text rounded-full shadow-[1px_1px_0_#15121D] ${color}`}
                  >
                    {interest}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-coy-pink text-white font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[3px_3px_0_#15121D] hover:shadow-[4px_4px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
