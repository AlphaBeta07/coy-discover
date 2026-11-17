"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";
import { PublicProfile } from "@/lib/matching";

interface ProfileCardProps {
  profile: PublicProfile;
  isFront: boolean;
  onSwipe: (action: "like" | "pass") => void;
  disabled?: boolean;
}

const INTEREST_COLORS = [
  "bg-coy-yellow/70",
  "bg-coy-lilac/80",
  "bg-coy-mint/80",
  "bg-coy-sky/80",
  "bg-coy-pink-soft",
  "bg-coy-peach/80",
];

export function ProfileCard({ profile, isFront, onSwipe, disabled = false }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled || hasSwiped) return;

    const threshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      setHasSwiped(true);
      onSwipe("like");
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      setHasSwiped(true);
      onSwipe("pass");
    }
  };

  // Safe fallback avatar using SVG with profile initials
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fallbackDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23FFE4EF"/><text x="50%" y="45%" font-family="system-ui, sans-serif" font-size="84" font-weight="800" fill="%23FF3D81" text-anchor="middle" dominant-baseline="middle">${initials}</text><text x="50%" y="65%" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="%2315121D" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(profile.name)}</text></svg>`;

  if (!isFront) {
    // Background card in deck preview
    return (
      <div className="absolute inset-0 w-full h-full bg-white border-2 border-coy-text rounded-[26px] shadow-[4px_4px_0_#15121D] overflow-hidden pointer-events-none scale-[0.96] translate-y-3 opacity-90 transition-all flex flex-col">
        <div className="relative flex-1 bg-coy-soft overflow-hidden">
          <Image
            src={imageError ? fallbackDataUrl : profile.photo}
            alt={profile.name}
            fill
            sizes="(max-width: 480px) 100vw, 440px"
            className="object-cover pointer-events-none brightness-[0.92]"
            priority={false}
          />
        </div>
        <div className="p-4 bg-white border-t-2 border-coy-line">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-xl text-coy-text truncate">{profile.name}</h3>
            <span className="px-2 py-0.5 text-xs font-black bg-coy-yellow border border-coy-text rounded-full">
              {profile.age}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, rotate }}
      drag={disabled ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className="absolute inset-0 w-full h-full bg-white border-2 border-coy-text rounded-[26px] shadow-[6px_6px_0_#15121D] overflow-hidden flex flex-col cursor-grab select-none z-10 touch-none"
    >
      {/* Visual Swipe Stamps */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-6 left-6 z-20 pointer-events-none -rotate-12 bg-coy-ok/90 backdrop-blur-xs text-white border-3 border-white px-4 py-1.5 rounded-2xl shadow-[3px_3px_0_#15121D]"
      >
        <span className="font-black text-2xl tracking-wider uppercase">LIKE</span>
      </motion.div>

      <motion.div
        style={{ opacity: passOpacity }}
        className="absolute top-6 right-6 z-20 pointer-events-none rotate-12 bg-coy-danger/90 backdrop-blur-xs text-white border-3 border-white px-4 py-1.5 rounded-2xl shadow-[3px_3px_0_#15121D]"
      >
        <span className="font-black text-2xl tracking-wider uppercase">PASS</span>
      </motion.div>

      {/* Profile Photo */}
      <div className="relative flex-1 w-full bg-coy-soft overflow-hidden min-h-[280px]">
        <Image
          src={imageError ? fallbackDataUrl : profile.photo}
          alt={profile.name}
          fill
          sizes="(max-width: 480px) 100vw, 440px"
          className="object-cover select-none pointer-events-none"
          priority
          onError={() => setImageError(true)}
        />
        {/* Subtle gradient vignette at bottom of photo for seamless contrast */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Age pill overlay */}
        <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm border-2 border-coy-text rounded-full shadow-[2px_2px_0_#15121D]">
          <span className="font-black text-sm text-coy-text">{profile.age} yrs</span>
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="p-4 sm:p-5 bg-white border-t-2 border-coy-text flex flex-col gap-2.5">
        {/* Name and Location */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-extrabold text-2xl tracking-tight text-coy-text truncate">
              {profile.name}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-coy-muted mt-0.5">
            {profile.cityOrCollege.includes("/") || profile.cityOrCollege.toLowerCase().includes("college") || profile.cityOrCollege.toLowerCase().includes("university") || profile.cityOrCollege.toLowerCase().includes("institute") || profile.cityOrCollege.toLowerCase().includes("iit") || profile.cityOrCollege.toLowerCase().includes("bits") ? (
              <GraduationCap className="w-3.5 h-3.5 text-coy-pink-strong shrink-0" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-coy-pink-strong shrink-0" />
            )}
            <span className="truncate">{profile.cityOrCollege}</span>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs sm:text-sm text-coy-text/90 leading-snug line-clamp-2">
          {profile.bio}
        </p>

        {/* Interest tags */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {profile.interests.slice(0, 4).map((interest, idx) => {
              const colorClass = INTEREST_COLORS[idx % INTEREST_COLORS.length];
              return (
                <span
                  key={interest}
                  className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold text-coy-text border border-coy-text rounded-full shadow-[1px_1px_0_#15121D] ${colorClass}`}
                >
                  {interest}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
