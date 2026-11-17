"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  MapPin,
  GraduationCap,
  Heart,
  Sparkles,
  Info,
} from "lucide-react";
import { PublicProfile } from "@/lib/matching";

interface ProfileDetailModalProps {
  profile: PublicProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
  isSubmitting?: boolean;
}

const INTEREST_COLORS = [
  "bg-coy-yellow/70",
  "bg-coy-lilac/80",
  "bg-coy-mint/80",
  "bg-coy-sky/80",
  "bg-coy-pink-soft",
  "bg-coy-peach/80",
];

export function ProfileDetailModal({
  profile,
  isOpen,
  onClose,
  onLike,
  onPass,
  isSubmitting = false,
}: ProfileDetailModalProps) {
  const [imageError, setImageError] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Support Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !profile) return null;

  // Fallback avatar
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fallbackDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23FFE4EF"/><text x="50%" y="45%" font-family="system-ui, sans-serif" font-size="84" font-weight="800" fill="%23FF3D81" text-anchor="middle" dominant-baseline="middle">${initials}</text><text x="50%" y="65%" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="%2315121D" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(profile.name)}</text></svg>`;

  // Collect all photos: main photo + additional photos
  const allPhotos = [profile.photo, ...(profile.photos || [])];

  const isCollege =
    profile.cityOrCollege.includes("/") ||
    profile.cityOrCollege.toLowerCase().includes("college") ||
    profile.cityOrCollege.toLowerCase().includes("university") ||
    profile.cityOrCollege.toLowerCase().includes("institute") ||
    profile.cityOrCollege.toLowerCase().includes("iit") ||
    profile.cityOrCollege.toLowerCase().includes("bits") ||
    profile.cityOrCollege.toLowerCase().includes("nid");

  return (
    <AnimatePresence>
      <motion.div
        key="profile-detail-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-detail-title"
      >
        <motion.div
          key="profile-detail-content"
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md h-[94dvh] sm:h-auto sm:max-h-[90vh] bg-white border-t-2 sm:border-2 border-coy-text rounded-t-[32px] sm:rounded-[28px] shadow-[8px_8px_0_#15121D] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Back/Close button */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b-2 border-coy-line">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to Discover"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coy-soft border-2 border-coy-text text-coy-text text-xs font-black shadow-[2px_2px_0_#15121D] hover:bg-coy-yellow active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back</span>
            </button>

            <span className="text-xs font-black uppercase tracking-wider text-coy-text/70">
              Profile Details
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-coy-soft border-2 border-coy-text flex items-center justify-center text-coy-text font-bold text-sm shadow-[2px_2px_0_#15121D] hover:bg-coy-pink-soft active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Scrollable Profile Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
            {/* Primary Photo */}
            <div className="relative w-full aspect-[4/4.5] max-h-[420px] bg-coy-soft overflow-hidden">
              <Image
                src={imageError ? fallbackDataUrl : allPhotos[activePhotoIndex] || profile.photo}
                alt={profile.name}
                fill
                sizes="(max-width: 480px) 100vw, 448px"
                className="object-cover"
                priority
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

              {/* Photo pagination dots if multiple photos */}
              {allPhotos.length > 1 && (
                <div className="absolute top-4 inset-x-0 flex justify-center gap-1.5 z-20 px-4">
                  {allPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`View photo ${idx + 1}`}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        activePhotoIndex === idx
                          ? "w-8 bg-white shadow-sm"
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Age pill */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/95 border-2 border-coy-text rounded-full shadow-[2px_2px_0_#15121D]">
                <span className="font-black text-sm text-coy-text">{profile.age} years</span>
              </div>
            </div>

            {/* Profile Information Stack */}
            <div className="p-5 space-y-5">
              {/* Name & College/City */}
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    id="profile-detail-title"
                    className="font-extrabold text-3xl tracking-tight text-coy-text"
                  >
                    {profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 text-xs font-black bg-coy-yellow border border-coy-text rounded-full shadow-[1px_1px_0_#15121D]">
                    {profile.age}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-bold text-coy-muted mt-1">
                  {isCollege ? (
                    <GraduationCap className="w-4 h-4 text-coy-pink-strong shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-coy-pink-strong shrink-0" />
                  )}
                  <span>{profile.cityOrCollege}</span>
                </div>
              </div>

              {/* Biography Section */}
              <div className="bg-coy-soft border-2 border-coy-line rounded-[20px] p-4 shadow-[2px_2px_0_#15121D]">
                <h3 className="text-xs font-black uppercase tracking-wider text-coy-muted mb-1.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-coy-pink-strong" />
                  <span>About Me</span>
                </h3>
                <p className="text-sm font-medium text-coy-text leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Interests & Hobbies */}
              {profile.interests && profile.interests.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-coy-muted mb-2.5">
                    Interests & Passions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, idx) => {
                      const color = INTEREST_COLORS[idx % INTEREST_COLORS.length];
                      return (
                        <span
                          key={interest}
                          className={`inline-flex items-center px-3.5 py-1 text-xs font-extrabold text-coy-text border-2 border-coy-text rounded-full shadow-[2px_2px_0_#15121D] ${color}`}
                        >
                          {interest}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prompt Q&A Card (if available) */}
              {profile.promptQuestion && profile.promptAnswer && (
                <div className="bg-coy-yellow/30 border-2 border-coy-text rounded-[22px] p-4 shadow-[4px_4px_0_#15121D] -rotate-0.5">
                  <div className="inline-block px-2.5 py-0.5 bg-coy-yellow border border-coy-text rounded-full text-[10px] font-black uppercase tracking-wider text-coy-text mb-2">
                    Prompt
                  </div>
                  <h4 className="font-extrabold text-sm text-coy-text mb-1.5">
                    {profile.promptQuestion}
                  </h4>
                  <p className="text-sm text-coy-text/90 italic leading-snug">
                    &ldquo;{profile.promptAnswer}&rdquo;
                  </p>
                </div>
              )}

              {/* Additional Photos Gallery (if available) */}
              {allPhotos.length > 1 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-coy-muted mb-2.5">
                    More Photos
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {allPhotos.slice(1).map((photoUrl, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-coy-text shadow-[3px_3px_0_#15121D] bg-coy-soft cursor-pointer hover:scale-[1.02] transition-transform"
                        onClick={() => setActivePhotoIndex(idx + 1)}
                      >
                        <Image
                          src={photoUrl}
                          alt={`${profile.name} photo ${idx + 2}`}
                          fill
                          sizes="(max-width: 480px) 50vw, 200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coy Privacy Reminder */}
              <div className="p-3 bg-coy-soft border border-coy-line rounded-xl text-center">
                <p className="text-[11px] font-bold text-coy-muted">
                  🔒 Liking or passing is 100% confidential. Neither person ever knows unless you both match.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Floating Action Dock */}
          <div className="absolute inset-x-0 bottom-0 z-30 p-4 bg-gradient-to-t from-white via-white/95 to-white/0 pt-6 flex items-center justify-center gap-6 pointer-events-none">
            {/* Pass Action Button */}
            <button
              type="button"
              onClick={onPass}
              disabled={isSubmitting}
              aria-label="Pass profile"
              className="pointer-events-auto relative group w-14 h-14 rounded-full bg-white border-2 border-coy-text flex items-center justify-center shadow-[4px_4px_0_#15121D] hover:shadow-[5px_5px_0_#15121D] hover:bg-coy-danger/10 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#15121D] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              <X className="w-7 h-7 text-coy-danger stroke-[3] transition-transform group-hover:scale-110" />
            </button>

            {/* Like Action Button */}
            <button
              type="button"
              onClick={onLike}
              disabled={isSubmitting}
              aria-label="Like profile"
              className="pointer-events-auto relative group w-16 h-16 rounded-full bg-coy-pink border-2 border-coy-text flex items-center justify-center shadow-[5px_5px_0_#15121D] hover:shadow-[6px_6px_0_#15121D] hover:bg-coy-pink-strong hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#15121D] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              <Heart className="w-8 h-8 text-white fill-white stroke-[2.5] transition-transform group-hover:scale-110" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
