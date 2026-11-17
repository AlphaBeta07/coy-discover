"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MutualMatchItem } from "@/lib/matching";
import { MatchesList } from "@/components/MatchesList";
import { EmptyState } from "@/components/EmptyState";
import { Heart, Sparkles, RefreshCw } from "lucide-react";

export default function MatchesPage() {
  const [matches, setMatches] = useState<MutualMatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) setIsRefreshing(true);
      else setLoading(true);

      setError(null);
      const res = await fetch("/api/matches");
      const data = await res.json();

      if (data.success && Array.isArray(data.matches)) {
        setMatches(data.matches);
      } else {
        setError(data.error || "Failed to load matches");
      }
    } catch (err) {
      console.error("Fetch matches error:", err);
      setError("Network error loading matches");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <div className="flex-1 flex flex-col w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-coy-line">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-coy-pink border-2 border-coy-text flex items-center justify-center shadow-[1.5px_1.5px_0_#15121D]">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <h1 className="font-extrabold text-xl text-coy-text tracking-tight">
            Mutual Matches
          </h1>
          {matches.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-black bg-coy-yellow border border-coy-text rounded-full shadow-[1px_1px_0_#15121D]">
              {matches.length}
            </span>
          )}
        </div>

        <button
          onClick={() => fetchMatches(true)}
          disabled={loading || isRefreshing}
          aria-label="Refresh matches"
          className="p-1.5 rounded-full border border-coy-text/30 hover:bg-coy-soft active:translate-x-[1px] active:translate-y-[1px] transition-all text-coy-muted"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border-2 border-coy-text rounded-[22px] p-3.5 shadow-[4px_4px_0_#15121D] space-y-3"
              >
                <div className="w-full aspect-[4/3] rounded-2xl bg-coy-soft" />
                <div className="h-5 w-28 bg-coy-line rounded-full" />
                <div className="h-3 w-36 bg-coy-soft rounded-full" />
                <div className="h-3 w-full bg-coy-soft rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-center bg-white border-2 border-coy-text rounded-[22px] shadow-[4px_4px_0_#15121D]">
            <p className="text-sm text-coy-danger font-bold mb-3">{error}</p>
            <button
              onClick={() => fetchMatches()}
              className="px-4 py-2 bg-coy-pink text-white font-extrabold text-xs border border-coy-text rounded-full shadow-[2px_2px_0_#15121D]"
            >
              Retry
            </button>
          </div>
        ) : matches.length > 0 ? (
          <MatchesList matches={matches} />
        ) : (
          <EmptyState type="matches" />
        )}
      </div>
    </div>
  );
}
