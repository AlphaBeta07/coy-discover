import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { SwipeButtons } from "@/components/SwipeButtons";
import { EmptyState } from "@/components/EmptyState";
import { MatchModal } from "@/components/MatchModal";
import HomePage from "@/app/page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/discover",
}));

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

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
    const mockProfile = {
      id: "user_101",
      name: "Priya Sharma",
      age: 21,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      bio: "Literature major",
      cityOrCollege: "Lady Shri Ram College, Delhi",
      interests: ["Reading", "Chai"],
    };

    render(<MatchModal matchedProfile={mockProfile} onClose={handleClose} />);

    expect(screen.getByText("It's a Match!")).toBeInTheDocument();
    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText("View in Matches")).toBeInTheDocument();
    expect(screen.getByText("Keep Swiping")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Keep Swiping"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
