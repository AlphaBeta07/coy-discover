"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, Info, Check, Sparkles } from "lucide-react";

interface NavbarProps {
  onReset?: () => void;
  isResetting?: boolean;
}

export function Navbar({ onReset, isResetting }: NavbarProps) {
  const [showPartAModal, setShowPartAModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetClick = async () => {
    if (onReset) {
      onReset();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2000);
      return;
    }

    try {
      const res = await fetch("/api/reset", { method: "POST" });
      if (res.ok) {
        setResetSuccess(true);
        setTimeout(() => {
          setResetSuccess(false);
          window.location.reload();
        }, 800);
      }
    } catch (e) {
      console.error("Reset error:", e);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white border-b-2 border-coy-line/80">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Official Coy Logo Icon */}
          <div className="w-8 h-8 rounded-xl bg-coy-pink border-2 border-coy-text flex items-center justify-center shadow-[2px_2px_0_#15121D] transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 64 64"
              className="w-5 h-5 text-coy-text"
              fill="currentColor"
            >
              <path d="M30.7 45.4c-6.8 0-12-1.9-15.6-5.8-3.5-3.8-5.3-9-5.3-15.5 0-6.4 1.8-11.6 5.3-15.5 3.6-3.8 8.8-5.8 15.6-5.8 6.9 0 12.1 2.3 15.6 6.9l-4.5 4.3c-2.8-3.4-6.5-5.1-11.1-5.1-4.7 0-8.3 1.5-10.7 4.5-2.4 3-3.6 7.2-3.6 12.7s1.2 9.7 3.6 12.7c2.4 3 6 4.5 10.7 4.5 4.6 0 8.3-1.6 11.1-4.9l4.5 4.3c-3.5 4.4-8.7 6.5-15.6 6.5z" />
              <circle cx="48" cy="24" r="5" fill="#FFFFFF" stroke="#15121D" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-coy-text lowercase">
            coy
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Part A Proposal Info Button */}
          <button
            onClick={() => setShowPartAModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-coy-text bg-coy-lilac border-2 border-coy-text rounded-full shadow-[2px_2px_0_#15121D] hover:shadow-[3px_3px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            title="View Part A: Suggested Features"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Part A</span> Insights
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={handleResetClick}
            disabled={isResetting}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold border-2 border-coy-text rounded-full shadow-[2px_2px_0_#15121D] transition-all active:translate-x-[1px] active:translate-y-[1px] ${
              resetSuccess
                ? "bg-coy-mint text-coy-text"
                : "bg-coy-soft hover:bg-coy-yellow text-coy-text"
            }`}
            title="Reset feed swipes and demo matches"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-coy-ok" />
                <span>Reset!</span>
              </>
            ) : (
              <>
                <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} />
                <span>Reset</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Part A Features Modal */}
      {showPartAModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPartAModal(false)}
        >
          <div
            className="w-full max-w-md bg-white border-2 border-coy-text rounded-[26px] p-6 shadow-[6px_6px_0_#15121D] max-h-[85vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-coy-line">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-black tracking-wide uppercase bg-coy-pink text-white rounded-full border border-coy-text">
                  Assignment Part A
                </span>
                <h3 className="font-extrabold text-lg text-coy-text">Suggested Features</h3>
              </div>
              <button
                onClick={() => setShowPartAModal(false)}
                className="w-8 h-8 rounded-full border-2 border-coy-text bg-coy-soft hover:bg-coy-pink-soft flex items-center justify-center font-bold text-sm text-coy-text"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-coy-text">
              <div className="p-3.5 bg-coy-yellow/40 border-2 border-coy-text rounded-2xl shadow-[2px_2px_0_#15121D]">
                <h4 className="font-black text-base flex items-center gap-1.5 text-coy-text mb-1">
                  💡 Feature 1: Campus / Circle Verifications & Vouching
                </h4>
                <p className="text-xs leading-relaxed text-coy-text/90">
                  <strong>Why it is required:</strong> Coy is built on high-trust college and circle secrets. Adding domain-verified university badges (`.ac.in` / `.edu`) or mutual college friend vouching dramatically elevates user confidence, eliminates fake profiles, and reinforces privacy among genuine peers.
                </p>
              </div>

              <div className="p-3.5 bg-coy-mint/40 border-2 border-coy-text rounded-2xl shadow-[2px_2px_0_#15121D]">
                <h4 className="font-black text-base flex items-center gap-1.5 text-coy-text mb-1">
                  ⏳ Feature 2: Timed Clue Drops & Anonymized Match Hints
                </h4>
                <p className="text-xs leading-relaxed text-coy-text/90">
                  <strong>Why it is required:</strong> If an incoming secret crush exists, the user never knows who it is unless they add them back. Introducing periodic anonymized clues (e.g. &quot;Someone from BITS who loves Indie Music likes you&quot;) sparks curiosity, viral retention, and incentivizes users to guess and add genuine crushes without compromising identity privacy.
                </p>
              </div>

              <div className="p-3 bg-coy-soft border border-coy-line rounded-xl text-xs text-coy-muted leading-relaxed">
                Both features strictly uphold Coy&apos;s ironclad privacy rule: individual identities remain totally confidential until a mutual match occurs.
              </div>
            </div>

            <button
              onClick={() => setShowPartAModal(false)}
              className="mt-5 w-full py-3 bg-coy-pink text-white font-extrabold text-sm border-2 border-coy-text rounded-full shadow-[3px_3px_0_#15121D] hover:shadow-[4px_4px_0_#15121D] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              Back to App
            </button>
          </div>
        </div>
      )}
    </>
  );
}
