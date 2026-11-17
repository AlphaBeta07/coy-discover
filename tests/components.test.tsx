import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { SwipeButtons } from "@/components/SwipeButtons";
import { EmptyState } from "@/components/EmptyState";
import { MatchModal } from "@/components/MatchModal";
import { ProfileDetailModal } from "@/components/ProfileDetailModal";
import { ProfileCard } from "@/components/ProfileCard";
import HomePage from "@/app/page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/discover",
}));

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

const mockProfile = {
  id: "user_101",
  name: "Priya Sharma",
  age: 21,
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  bio: "Literature major who quotes Dostoevsky in casual conversation.",
  cityOrCollege: "Lady Shri Ram College, Delhi",
  interests: ["Reading", "Chai", "Poetry"],
  photos: ["https://images.unsplash.com/photo-1517841905240-472988babdf9"],
  promptQuestion: "The key to my heart is...",
  promptAnswer: "Cutting chai from the corner tapri.",
};

describe("Frontend Components & UI Test Suite", () => {
  it("renders Navbar with Coy branding and action buttons", () => {
    render(<Navbar />);
    expect(screen.getByText("coy")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("renders BottomNav with Home, Discover, and Matches tabs", () => {
    render(<BottomNav matchCount={3} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Matches")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // Badge count
  });

  it("renders Home page as required clean blank placeholder", () => {
    render(<HomePage />);
    expect(screen.getByText("Home Placeholder")).toBeInTheDocument();
    expect(screen.getByText("Go to Discover")).toBeInTheDocument();
  });

  it("renders SwipeButtons and triggers onPass and onLike callbacks", () => {
    const handlePass = vi.fn();
    const handleLike = vi.fn();

    render(<SwipeButtons onPass={handlePass} onLike={handleLike} />);

    const passBtn = screen.getByLabelText(/Pass profile/i);
    const likeBtn = screen.getByLabelText(/Like profile/i);

    fireEvent.click(passBtn);
    expect(handlePass).toHaveBeenCalledTimes(1);

    fireEvent.click(likeBtn);
    expect(handleLike).toHaveBeenCalledTimes(1);
  });

  it("renders EmptyState for both feed and matches correctly", () => {
    const { rerender } = render(<EmptyState type="feed" />);
    expect(screen.getByText(/You're all caught up!/i)).toBeInTheDocument();

    rerender(<EmptyState type="matches" />);
    expect(screen.getByText(/No matches yet!/i)).toBeInTheDocument();
  });

  it("renders MatchModal with celebratory message, profile name, and action buttons", () => {
    const handleClose = vi.fn();

    render(<MatchModal matchedProfile={mockProfile} onClose={handleClose} />);

    expect(screen.getByText("It's a Match!")).toBeInTheDocument();
    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText("View in Matches")).toBeInTheDocument();
    expect(screen.getByText("Keep Swiping")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Keep Swiping"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders ProfileCard and shows tap cue without accidental swipe", () => {
    const handleSwipe = vi.fn();
    const handleOpenDetails = vi.fn();

    render(
      <ProfileCard
        profile={mockProfile}
        isFront={true}
        onSwipe={handleSwipe}
        onOpenDetails={handleOpenDetails}
      />
    );

    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText("Tap for bio")).toBeInTheDocument();
    expect(screen.getByText("Reading")).toBeInTheDocument();
  });

  it("renders ProfileDetailModal with complete biography, interests, prompts, and controls", () => {
    const handleClose = vi.fn();
    const handleLike = vi.fn();
    const handlePass = vi.fn();

    render(
      <ProfileDetailModal
        profile={mockProfile}
        isOpen={true}
        onClose={handleClose}
        onLike={handleLike}
        onPass={handlePass}
      />
    );

    // Profile details verification
    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText("Lady Shri Ram College, Delhi")).toBeInTheDocument();
    expect(screen.getByText("Literature major who quotes Dostoevsky in casual conversation.")).toBeInTheDocument();
    expect(screen.getByText("The key to my heart is...")).toBeInTheDocument();
    expect(screen.getByText(/Cutting chai from the corner tapri/i)).toBeInTheDocument();

    // Like and Pass buttons inside modal
    const passBtn = screen.getByLabelText("Pass profile");
    const likeBtn = screen.getByLabelText("Like profile");
    expect(passBtn).toBeInTheDocument();
    expect(likeBtn).toBeInTheDocument();

    fireEvent.click(passBtn);
    expect(handlePass).toHaveBeenCalledTimes(1);

    fireEvent.click(likeBtn);
    expect(handleLike).toHaveBeenCalledTimes(1);

    // Back button
    const backBtn = screen.getByLabelText("Back to Discover");
    fireEvent.click(backBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
