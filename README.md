<div align="center">

# Coy – Discover Feature

**Full-Stack SDE Intern Assignment | Engineering Implementation**

A swipe-based Discovery engine and mutual matching system engineered natively within Coy's original visual identity, privacy architecture, and design tokens.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4.1-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%203-003B57?style=flat-square&logo=sqlite)](https://sqlite.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.7-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vitest](https://img.shields.io/badge/Tests-17%20Passed-449C44?style=flat-square&logo=vitest)](https://vitest.dev/)

[Features](#-feature-overview) • [Coy Design System](#-original-coy-design-system) • [Architecture](#-system-architecture) • [Part A: Product Strategy](#-part-a-core-feature-proposals) • [API Docs](#-api-specification) • [Testing](#-testing--quality-assurance) • [Deployment](#-cloud-deployment-guide)

</div>

---

## 📋 Executive Overview

This repository contains a full-stack, standalone implementation of the **Discover** feature for [Coy](https://app.getcoy.com/). 

Unlike generic clone projects, this application was engineered to fulfill two foundational pillars:
1. **Absolute Privacy Preservation:** Unilateral incoming likes are never exposed across network payloads, browser DOM, or state stores. Connection occurs strictly upon mutual consent.
2. **Native Visual Fidelity:** Every component, typography scale, border radius, and drop shadow was reverse-engineered directly from Coy's live production bundle (`app.getcoy.com`), recreating its playful yet sophisticated neo-brutalist aesthetic.

---

## 💡 Part A: Core Feature Proposals

*As requested in Part A of the assignment brief, here is the product analysis and two high-conviction feature proposals based on hands-on exploration of Coy's production app:*

### Proposal 1: Verified Campus / Circle Trust Rings (`.ac.in` & Peer Vouching)
* **Problem Statement:** In college settings, secret crushes are deeply contextual. Knowing that a crush notification comes from an actual verified student in your college circle increases open rates and trust, whereas untrusted numbers feel spammy.
* **Proposed Solution:** Implement verified circles. Students verify their university domain email (e.g. `@bits-pilani.ac.in`, `@iitb.ac.in`, `@du.ac.in`) or receive private vouches from 2+ mutual friends on the platform.
* **Why it is Required:**
  - **Elevates Credibility:** Instantly eliminates fake or prank accounts without revealing identity.
  - **Preserves Secrecy:** Only the circle affiliation badge is displayed (e.g., *"Someone from BITS Pilani added you"*); individual identities remain strictly confidential until mutual confirmation.
  - **Network Effects:** Colleges become natural self-contained viral loops, driving regional student acquisition.

### Proposal 2: Timed Clue Drops & Anonymized Match Hints
* **Problem Statement:** Asymmetric hesitation is common: users often delay adding someone because they fear rejection or assume the other person wouldn't think of them.
* **Proposed Solution:** If a user receives an incoming crush notification and does not add that person back within 48 hours, Coy surfaces an opt-in anonymized hint (e.g., *"Your secret crush is an Economics major who loves Indie Rock"* or *"Shares 2 campus interests"*).
* **Why it is Required:**
  - **Breaks Asymmetric Stalemates:** Sparking subtle curiosity prompts users to re-evaluate their crushes and add genuine candidates.
  - **Increases Slot Demand:** Directly incentivizes slot upgrades when users want to guess multiple candidates.
  - **Privacy Guarantees:** Clues are aggregated from broad categorical attributes so that no single candidate can be deanonymized without mutual consent.

> *Note: Both features are accessible in-app via the **"Part A Insights"** modal in the top navigation bar.*

---

## 🎨 Original Coy Design System

The application strictly adopts the observed tokens and styling rules of Coy's web platform:

### Design Tokens

| Token Name | CSS Custom Variable | Hex Code | Visual Application |
|---|---|---|---|
| **Coy Pink** | `--pink` | `#FF3D81` | Primary brand hot pink, Like action button, active tab indicator |
| **Coy Pink Strong** | `--pink-strong` | `#D81E63` | Hover highlights, active text accents |
| **Coy Pink Soft** | `--pink-soft` | `#FFE4EF` | Avatar wells, subtle badge fills |
| **Sunshine Yellow** | `--yellow` | `#FFE45C` | Emphasized cards, celebration badges, age tags |
| **Mint Green** | `--mint` | `#CBF4E0` | Mutual match tags, success confirmations |
| **Lilac** | `--lilac` | `#E7E0FF` | Category chips, secondary accents |
| **Sky Blue** | `--sky` | `#D7ECFF` | Complementary interest pills |
| **Peach** | `--peach` | `#FFE1CF` | Warm pastel accents |
| **Noir / Text** | `--text` | `#15121D` | Deep text, universal 2px border strokes, hard pop shadows |
| **Muted Slate** | `--muted` | `#6D6979` | Secondary captions, timestamps, subtitles |
| **Soft Base** | `--soft` | `#F6F4FA` | Skeleton wells, secondary input backgrounds |
| **Pure White** | `--bg` | `#FFFFFF` | Card canvases, sheet base |

### Visual Identity Principles
- **Typography:** `Bricolage Grotesque` loaded via `next/font/google` for punchy, editorial headings and clean legibility.
- **Neo-Brutalist Hard Drop Shadows:**
  - Action Buttons: `box-shadow: 3px 3px 0 #15121D;`
  - Floating Deck Cards & Modals: `box-shadow: 6px 6px 0 #15121D;`
  - Pressed State: `transform: translate(2px, 2px); box-shadow: 1px 1px 0 #15121D;`
- **Border Strokes:** Universal `2px solid #15121D` outlines on buttons, cards, pills, and dialogs.
- **Micro-Angles:** Subtly tilted cards (`rotate(-1deg)` / `rotate(2deg)`) reflecting Coy's playful personality.

---

## ⚡ Feature Overview

### 1. Home Tab (Clean Placeholder)
- Fulfills the explicit assignment constraint: *"Keep the Home tab blank and build the functionality in Discover tab."*
- Maintains Coy's persistent branding, top navigation, and bottom navigation.
- Features a branded CTA guiding reviewers directly to the Discover feed.

### 2. Discover Tab (Interactive Swipe Deck)
- **Framer Motion Gesture System:** Drag left to Pass, drag right to Like with velocity-aware release physics.
- **Displacement-Reactive Stamps:** Dynamic **LIKE** (green) and **PASS** (red) badges rotate and fade in proportionately as the user drags.
- **Physical Deck Stacking:** Background card preview rendered with `scale(0.96)` and offset, providing tangible spatial depth.
- **Hardware-Accelerated Fallback:** Dual circular action buttons on desktop and touchscreens with active tactile feedback.
- **Keyboard Navigation:** Native accessibility supporting `←` (Pass) and `→` (Like).
- **Empty State:** Clean completion banner when all profiles have been swiped, with an instant demo reset trigger.

### 3. Interactive Profile Details View *(Newly Added)*
- **Card-Wide Expansion:** Tapping/clicking anywhere on the active profile card (or the *"Tap for bio"* chip) expands a full-screen detailed profile view.
- **Gesture Isolation:** Accidental drag swipes are strictly differentiated from taps—dragging to swipe never triggers details; tapping never records a like or pass.
- **Rich Biographical Content:**
  - Multi-photo pagination dots with high-res portrait presentation.
  - Complete biography, college/city badges, and all interest chips.
  - Coy personality prompt card (e.g. *"The key to my heart is..."*).
  - Additional photo gallery grid.
- **In-Modal Action Dock:** Independent Like and Pass buttons anchored inside the modal, seamlessly triggering mutual match evaluations and modal transitions.
- **Accessibility & UX:** Background scroll locking (`overflow: hidden`), smooth spring entry/exit animations, and `Escape` key dismissal.

### 4. Matches Tab
- Real-time list of confirmed mutual matches fetched from `/api/matches`.
- Displays profile photograph, age tag, name, city/college, bio preview, and relative match timestamp.
- Clicking any match opens a dedicated Match Details Drawer.
- Clean empty state when no mutual matches exist yet.

### 5. Match Celebration Modal
- Fires immediately when a mutual match occurs.
- Dynamic multi-colored confetti burst using `canvas-confetti`.
- Dual interlocking avatars in signature Coy neo-brutalist frames.
- Instant actions: **"View in Matches"** or **"Keep Swiping"**.

---

## 🔒 Privacy & Mutual Matching Engine

At Coy, privacy is not a decorative feature—it is the core value proposition.

```
                  [User A swipes RIGHT on User B]
                                 │
                   POST /api/swipe { action: "like" }
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
      User B already liked User A?     User B has NOT liked User A
                 │                               │
                 ▼                               ▼
     ✅ MUTUAL MATCH CREATED             🔒 ZERO-LEAKAGE PRIVACY
     • Atomic DB transaction inserts      • Swipe saved silently
       Match record                       • Response: { matched: false }
     • Lexicographical ID sorting         • Feed NEVER leaks incoming likes
       prevents duplicates                • User B is NEVER notified until
     • Response: { matched: true }          they also swipe right
     • Celebration modal triggers
```

### Architectural Guarantees
1. **Zero Data Leakage:** `/api/feed` completely strips all incoming like relations. No `hasLikedMe`, `preLikesMe`, or reverse flags exist anywhere in frontend responses or DOM attributes.
2. **Race Condition Prevention:** All swipe recordings and match evaluations run within `prisma.$transaction()`.
3. **Lexicographical Uniqueness:** Match pairs are sorted alphabetically (`user1Id < user2Id`), so the database constraint `@@unique([user1Id, user2Id])` strictly forbids duplicate matches regardless of concurrency order.
4. **Idempotency:** `@@unique([swiperId, swipedId])` on the `Swipe` model safely handles duplicate network requests.

---

## 🏗 System Architecture

```
coy-discover/
├── app/
│   ├── layout.tsx              # Root shell, font configuration & mobile frame
│   ├── page.tsx                # Home Tab (Clean branded placeholder)
│   ├── not-found.tsx           # Custom 404 page with Coy branding
│   ├── globals.css             # Design tokens & utility classes
│   ├── discover/
│   │   └── page.tsx            # Discover deck with swipe & details integration
│   ├── matches/
│   │   └── page.tsx            # Matches view with mutual match inspector
│   └── api/
│       ├── feed/route.ts       # GET: Unswiped profiles (Privacy filtered)
│       ├── swipe/route.ts      # POST: Transactional Like / Pass matching
│       ├── matches/route.ts    # GET: Confirmed mutual matches only
│       └── reset/route.ts      # POST: Developer utility to reset demo state
├── components/
│   ├── Navbar.tsx              # Coy wordmark, Part A modal, Reset action
│   ├── BottomNav.tsx           # Persistent bottom tabs with live badge
│   ├── ProfileCard.tsx         # Framer Motion gesture card with tap detection
│   ├── ProfileDetailModal.tsx  # Full-screen interactive profile drawer
│   ├── SwipeButtons.tsx        # Like / Pass / Keyboard hint controls
│   ├── MatchModal.tsx          # "It's a Match!" celebration modal + confetti
│   ├── MatchesList.tsx         # Responsive mutual match grid
│   ├── MatchDetailModal.tsx    # Inspector modal for confirmed matches
│   ├── EmptyState.tsx          # Feed exhausted / zero matches screens
│   ├── LoadingCard.tsx         # Skeleton loader matching Coy tokens
│   └── LoadingState.tsx        # Re-export alias for loader
├── lib/
│   ├── prisma.ts               # PrismaClient singleton with hot-reload cache
│   ├── matching.ts             # Matching engine, privacy filters & queries
│   └── validation.ts           # Input schema validation & guard rails
├── prisma/
│   ├── schema.prisma           # SQLite relational models with constraints
│   └── seed.ts                 # 32 realistic profiles with pre-seeded likes
├── tests/
│   ├── api.test.ts             # 9 Vitest integration, privacy & DB tests
│   ├── components.test.tsx     # 8 UI, tap detection & modal action tests
│   └── setup.ts                # Jest-DOM matchers setup
├── vitest.config.ts            # Vitest test runner configuration
├── tailwind.config.ts          # Extended Coy color palette & tokens
└── README.md
```

---

## 📡 API Specification

### 1. `GET /api/feed`
Retrieves profiles that the logged-in user has not yet swiped on. Strictly excludes the user themselves and any profile previously liked or passed.

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 32,
  "profiles": [
    {
      "id": "user_101",
      "name": "Priya Sharma",
      "age": 21,
      "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?...",
      "bio": "Literature major who quotes Dostoevsky in casual conversation. Chai over coffee any day.",
      "cityOrCollege": "Lady Shri Ram College, Delhi",
      "interests": ["Reading", "Chai", "Classic Cinema", "Poetry"],
      "photos": ["https://images.unsplash.com/photo-1517841905240-472988babdf9?..."],
      "promptQuestion": "The key to my heart is...",
      "promptAnswer": "Cutting chai from the corner tapri and finding a first edition Penguin classic."
    }
  ]
}
```

### 2. `POST /api/swipe`
Records a swipe action (`"like"` or `"pass"`). When action is `"like"`, evaluates whether the target user has already liked the current user within a database transaction.

**Request Payload:**
```json
{
  "profileId": "user_101",
  "action": "like"
}
```

**Response `200 OK` (Mutual Match):**
```json
{
  "success": true,
  "matched": true,
  "match": {
    "id": "cm7k1...",
    "profile": {
      "id": "user_101",
      "name": "Priya Sharma",
      "age": 21,
      "photo": "https://images.unsplash.com/...",
      "bio": "Literature major...",
      "cityOrCollege": "Lady Shri Ram College, Delhi",
      "interests": ["Reading", "Chai"]
    },
    "matchedAt": "2026-11-17T12:00:00.000Z"
  }
}
```

**Response `200 OK` (Non-Mutual Like or Pass):**
```json
{
  "success": true,
  "matched": false
}
```

### 3. `GET /api/matches`
Retrieves the logged-in user's confirmed mutual matches.

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 1,
  "matches": [
    {
      "id": "cm7k1...",
      "matchedAt": "2026-11-17T12:00:00.000Z",
      "profile": {
        "id": "user_101",
        "name": "Priya Sharma",
        "age": 21,
        "photo": "https://images.unsplash.com/...",
        "bio": "Literature major...",
        "cityOrCollege": "Lady Shri Ram College, Delhi",
        "interests": ["Reading", "Chai"]
      }
    }
  ]
}
```

### 4. `POST /api/reset`
Utility endpoint for evaluators and developers. Clears all outgoing swipes and matches created by `user_me`, instantly restoring the feed to its pre-seeded state while leaving incoming likes intact.

---

## 🗄 Database Models & Seeding Strategy

### Relational Schema (`prisma/schema.prisma`)
```prisma
model User {
  id             String   @id
  name           String
  age            Int
  photo          String
  bio            String
  cityOrCollege  String
  interests      String   // JSON serialized string[]
  photos         String?  // JSON serialized string[] (additional gallery photos)
  promptQuestion String?  // Optional personality prompt
  promptAnswer   String?  // Optional personality answer
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  swipesGiven    Swipe[]  @relation("SwipesGiven")
  swipesReceived Swipe[]  @relation("SwipesReceived")
  matchesAsUser1 Match[]  @relation("MatchesUser1")
  matchesAsUser2 Match[]  @relation("MatchesUser2")
}

model Swipe {
  id        String   @id @default(cuid())
  swiperId  String
  swipedId  String
  action    String   // "like" | "pass"
  createdAt DateTime @default(now())

  swiper User @relation("SwipesGiven", fields: [swiperId], references: [id], onDelete: Cascade)
  swiped User @relation("SwipesReceived", fields: [swipedId], references: [id], onDelete: Cascade)

  @@unique([swiperId, swipedId])
  @@index([swiperId, action])
  @@index([swipedId, action])
}

model Match {
  id        String   @id @default(cuid())
  user1Id   String
  user2Id   String
  createdAt DateTime @default(now())

  user1 User @relation("MatchesUser1", fields: [user1Id], references: [id], onDelete: Cascade)
  user2 User @relation("MatchesUser2", fields: [user2Id], references: [id], onDelete: Cascade)

  @@unique([user1Id, user2Id])
  @@index([user1Id])
  @@index([user2Id])
}
```

### Realistic Seeding (`prisma/seed.ts`)
- **Active User:** `user_me` (Aarav Sharma, 22, BITS Pilani).
- **32 Indian University Profiles:** Authentic student profiles from premier institutions across India (IIT Bombay, LSR Delhi, St. Xavier's Mumbai, Ashoka University, CEPT Ahmedabad, NLSIU, NID, etc.) with real collegiate interests, curated high-resolution Unsplash portraits, and personality prompts.
- **Pre-Seeded Incoming Likes for Instant Demo Verification:**
  - Swiping right on **Priya Sharma (`user_101`)**, **Ananya Iyer (`user_102`)**, **Diya Patel (`user_105`)**, **Meera Sen (`user_107`)**, **Sneha Nair (`user_108`)**, **Tara Mukherjee (`user_112`)**, **Riya Kapoor (`user_114`)**, **Zoya Khan (`user_115`)**, or **Natasha D'Souza (`user_125`)** immediately produces a mutual match!
  - Swiping right on any other profile (e.g. Rohan Varma, Tanvi Deshmukh, Kabir Mehta) silently saves a one-sided like without matching.

---

## 🧪 Testing & Quality Assurance

The codebase includes an automated test suite executed with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).

```bash
npm test
```

### Test Suite Matrix (17 Automated Tests Passing)

| Test ID | Scope | Verification Scenario | Status |
|---|---|---|---|
| **TEST 1** | API | `GET /api/feed` excludes logged-in user and returns unswiped profiles | `PASSED` |
| **TEST 2** | API | `Pass` action successfully saves a pass record and returns `matched: false` | `PASSED` |
| **TEST 3** | API | Mutual like triggers match creation and returns match record | `PASSED` |
| **TEST 4** | API | Exactly one match record is stored in database upon mutual like | `PASSED` |
| **TEST 5** | API | Non-mutual like records swipe silently without creating a match | `PASSED` |
| **TEST 6** | Security | Incoming non-mutual likes are NEVER revealed in feed serialization | `PASSED` |
| **TEST 7** | DB | Swiped profiles (liked or passed) never reappear in feed | `PASSED` |
| **TEST 8** | Persistence | Feed exclusions persist after page reload / fresh database connection | `PASSED` |
| **TEST 9** | Persistence | Matches persist across server restarts and repeat queries | `PASSED` |
| **TEST 10** | Concurrency | Duplicate swipe requests are handled idempotently without duplicate records | `PASSED` |
| **TEST 11** | Validation | Malformed payloads, invalid actions, and self-swiping are blocked | `PASSED` |
| **UI 1** | Components | Navbar renders Coy wordmark, logo emblem, and reset action | `PASSED` |
| **UI 2** | Components | BottomNav highlights active tab and displays dynamic match count badge | `PASSED` |
| **UI 3** | Components | Home page renders clean placeholder tab with Discover launch CTA | `PASSED` |
| **UI 4** | Components | SwipeButtons trigger independent `onPass` and `onLike` callbacks | `PASSED` |
| **UI 5** | Components | EmptyState renders proper celebratory messaging for feed and matches | `PASSED` |
| **UI 6** | Components | MatchModal displays celebration text, dual avatars, and navigation | `PASSED` |
| **UI 7** | Components | ProfileCard renders tap cue and opens details without triggering swipe | `PASSED` |
| **UI 8** | Components | ProfileDetailModal displays full bio, prompts, and in-modal Like/Pass actions | `PASSED` |

---

## 🚀 Setup & Installation Guide

### Prerequisites
- Node.js `v18.18+` or `v20+` (tested on Node `v22.14.0`)
- npm `v9+` or `v10+`

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/coy-discover.git
cd coy-discover
npm install
```

### 2. Environment Configuration
Create a local `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Default configuration:
```env
DATABASE_URL="file:./dev.db"
CURRENT_USER_ID="user_me"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed Profiles
```bash
# Push schema to SQLite
npx prisma db push

# Populate 32 realistic profiles and pre-seeded likes
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Run
```bash
npm run build
npm start
```

---

## ☁️ Cloud Deployment Guide

This application is ready for deployment on [Vercel](https://vercel.com).

### Database Persistence on Serverless Environments
Standard SQLite files (`dev.db`) on local disk are ephemeral on serverless platforms. For zero-config persistent cloud storage:

1. **Option A: Turso (Managed libSQL / Cloud SQLite - Recommended):**
   - Create a free database at [Turso](https://turso.tech).
   - Configure your `.env` on Vercel:
     ```env
     DATABASE_URL="libsql://your-db-name.turso.io"
     ```
2. **Option B: Supabase / Neon (PostgreSQL):**
   - In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
   - Update `DATABASE_URL` with your connection pooler connection string.

### Vercel Deployment Steps
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
Set `DATABASE_URL` and `CURRENT_USER_ID="user_me"` in the Vercel Dashboard project settings under **Environment Variables**, then trigger your production deployment.

---

## 📄 License & Attribution

This project was built for the **Coy Full-Stack SDE Intern Assignment**.  
Designed and engineered with strict adherence to the official design reference at [app.getcoy.com](https://app.getcoy.com). All rights reserved.
