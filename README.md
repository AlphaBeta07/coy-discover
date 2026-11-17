# Coy – Discover Feature

> **Full-Stack SDE Intern Assignment**  
> Standalone implementation of the swipe-based Discover experience built natively within Coy's original visual identity, privacy architecture, and design system.

---

## 🌟 Executive Summary

This application introduces a swipe-based **Discover** feature alongside Coy's existing consumer experience. Designed from the ground up to uphold Coy's core promise—**absolute privacy until mutual connection**—it implements a full-stack architecture with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, SQLite, and Prisma ORM.

---

## 📑 Table of Contents

1. [Part A: Core Feature Proposals](#-part-a-core-feature-proposals)
2. [Original Coy Design System](#-original-coy-design-system)
3. [Architecture & Tech Stack](#-architecture--tech-stack)
4. [Strict Privacy & Mutual Matching Engine](#-strict-privacy--mutual-matching-engine)
5. [Application Walkthrough](#-application-walkthrough)
   - [1. Home (Placeholder Tab)](#1-home-tab-placeholder)
   - [2. Discover (Swipe Deck)](#2-discover-tab-main-feature)
   - [3. Matches (Mutual Connections)](#3-matches-tab)
   - [4. Match Celebration Modal](#4-match-celebration-modal)
6. [Database Schema & Seeding](#-database-schema--seeding)
7. [API Documentation](#-api-documentation)
8. [Setup & Installation Instructions](#-setup--installation-instructions)
9. [Automated Testing & QA](#-automated-testing--qa)
10. [Vercel Deployment Guide](#-vercel-deployment-guide)

---

## 💡 Part A: Core Feature Proposals

Based on exploring Coy at [https://app.getcoy.com](https://app.getcoy.com) (phone OTP login, crush addition, email verification, invite link, and slot economics), here are two high-impact core feature proposals:

### Feature 1: Verified Campus / Circle Trust Rings (`.ac.in` & Peer Vouching)
* **What it is:** A verified tier for university campuses and professional circles. Users verify their university email (e.g., `@bits-pilani.ac.in`, `@iitb.ac.in`, `@du.ac.in`) or receive private vouches from mutual friends on the platform.
* **Why it is required:** 
  - **High-Trust Intimacy:** College crushes are hyper-contextual. Knowing that a crush notification comes from an actual student in your campus or immediate circle exponentially increases engagement and trust.
  - **Eliminates Ghosting & Spam:** Pre-verifies authenticity without sacrificing secrecy.
  - **Upholds Coy's Core Promise:** The identity of the crush remains 100% secret; only the circle badge (e.g., *"A verified peer from BITS Pilani"*) is vouched for.

### Feature 2: Timed Clue Drops & Anonymized Match Hints
* **What it is:** When user A adds user B as a secret crush, user B receives a notification that someone added them to their slots. If user B doesn't add user A after 48 hours, Coy unlocks an opt-in anonymized hint (e.g., *"Your secret crush is an Economics major who loves Indie Rock"* or *"Shares 2 mutual campus interests"*).
* **Why it is required:**
  - **Breaks Asymmetric Stalemates:** In real life, users often hesitate to add someone because they assume the other person wouldn't like them back.
  - **Viral Loop & Retention:** Periodic subtle clues keep users opening the app to guess and re-evaluate their crushes, driving organic referrals and slot demand.
  - **Strict Privacy Preservation:** Clues are aggregated from broad interests/faculties so no individual can be deanonymized unless both parties explicitly add each other.

---

## 🎨 Original Coy Design System

Rather than using generic Tinder or Bumble UI styles, this application replicates the **actual observed design tokens of Coy** extracted directly from [https://app.getcoy.com](https://app.getcoy.com):

| Token | CSS Variable | Hex / Value | Usage |
|---|---|---|---|
| **Coy Pink** | `--pink` | `#FF3D81` | Primary brand accent, Like button, active tab indicator |
| **Coy Pink Strong** | `--pink-strong` | `#D81E63` | Hover states, active highlights |
| **Coy Pink Soft** | `--pink-soft` | `#FFE4EF` | Badges, subtle highlight backdrops |
| **Sunshine Yellow** | `--yellow` | `#FFE45C` | Emphasized cards, celebration badges |
| **Mint Green** | `--mint` | `#CBF4E0` | Mutual match tags, status cards |
| **Lilac** | `--lilac` | `#E7E0FF` | Category chips, secondary accents |
| **Coy Text Noir** | `--text` | `#15121D` | Primary text, 2px borders, drop shadows |
| **Muted Slate** | `--muted` | `#6D6979` | Secondary labels, college/city subtitles |
| **Soft Background** | `--soft` | `#F6F4FA` | Skeletons, input backings, card wells |
| **Pure White** | `--bg` | `#FFFFFF` | Card canvases, sheet base |
| **Pop Shadow** | `--pop` | `3px 3px 0 #15121D` | Pill buttons, icon actions, chips |
| **Card Shadow** | `--pop-lg` | `5px 5px 0 #15121D` | Floating deck cards, modals |
| **Typography** | `--sans` | `Bricolage Grotesque` | Playful neo-brutalist grotesque font |
| **Edge Border** | `--edge` | `2px solid #15121D` | Universal crisp black border styling |

---

## 🛠 Architecture & Tech Stack

```
coy-discover/
├── app/
│   ├── layout.tsx              # Root layout with Bricolage font & mobile shell
│   ├── page.tsx                # Home Tab (Clean blank placeholder per spec)
│   ├── discover/
│   │   └── page.tsx            # Discover Tab (Interactive swipe deck)
│   ├── matches/
│   │   └── page.tsx            # Matches Tab (Mutual match list & modal)
│   └── api/
│       ├── feed/route.ts       # GET: Unswiped profiles (Privacy enforced)
│       ├── swipe/route.ts      # POST: Like / Pass & transactional matching
│       ├── matches/route.ts    # GET: Mutual matches only
│       └── reset/route.ts      # POST: Demo state reset helper
├── components/
│   ├── Navbar.tsx              # Coy wordmark, Part A modal, Reset button
│   ├── BottomNav.tsx           # Fixed bottom tabs (Home, Discover, Matches)
│   ├── ProfileCard.tsx         # Framer Motion gesture card with stamps
│   ├── SwipeButtons.tsx        # Like / Pass / Keyboard hint controls
│   ├── MatchModal.tsx          # "It's a Match!" celebration modal + confetti
│   ├── MatchesList.tsx         # Responsive mutual match grid
│   ├── MatchDetailModal.tsx    # Detailed profile inspector
│   ├── EmptyState.tsx          # Feed exhausted / zero matches screens
│   └── LoadingCard.tsx         # Skeleton loader matching Coy tokens
├── lib/
│   ├── prisma.ts               # Cached Prisma client singleton
│   ├── matching.ts             # Matching engine & privacy queries
│   └── validation.ts           # Server-side input & payload validators
├── prisma/
│   ├── schema.prisma           # SQLite models with composite uniqueness
│   └── seed.ts                 # 32 Indian profiles with pre-seeded likes
├── tests/
│   ├── api.test.ts             # 9 Vitest integration & privacy tests
│   └── components.test.tsx     # 6 UI & component interaction tests
├── vitest.config.ts            # Test runner config
├── tailwind.config.ts          # Coy design tokens & theme extensions
└── README.md
```

---

## 🔒 Strict Privacy & Mutual Matching Engine

Privacy is the foundational value of Coy:

```
[User A] --swipes LIKE--> [User B]
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    Has User B liked User A?    User B has NOT liked User A
             │                                   │
             ▼                                   ▼
    ✅ MUTUAL MATCH CREATED           🔒 ABSOLUTE PRIVACY
    • Match record inserted in DB      • Swipe saved silently in DB
    • Response: { matched: true }      • Response: { matched: false }
    • "It's a Match!" celebration      • User B NEVER sees who liked them
    • Appears in Matches tab           • Feed NEVER leaks incoming likes
```

### Database Safety Guarantees
1. **Lexicographical User ID Ordering:** `[user1Id, user2Id]` is ordered so that `user1Id < user2Id`. The `@@unique([user1Id, user2Id])` constraint prevents duplicate matches between any two users under all concurrency conditions.
2. **Swipe Uniqueness:** `@@unique([swiperId, swipedId])` ensures an idempotent swipe recording where duplicate submissions are safely ignored.
3. **Database Transactions:** Matching evaluations are executed inside `prisma.$transaction()` to eliminate race conditions.
4. **Feed Filtering:** `GET /api/feed` queries `prisma.swipe.findMany({ where: { swiperId: currentUserId } })` and strictly excludes all previously liked or passed profiles, along with the user themselves.

---

## 📱 Application Walkthrough

### 1. Home Tab (Placeholder)
Per the assignment brief:
> *"Keep this tab blank as explicitly required in the assignment. Maintain the common Coy navigation and branding."*

Provides a clean, branded landing surface with Coy's wordmark, explaining its placeholder status and offering a direct link to the Discover tab.

### 2. Discover Tab (Main Feature)
- **Fluid Swipe Gestures:** Drag left to Pass, drag right to Like.
- **Physical Deck Illusion:** The next card in the deck is rendered underneath with scale `0.96` and offset, giving a tangible physical feeling.
- **Dynamic Stamps:** As you drag, an animated green **LIKE** or red **PASS** badge dynamically rotates and scales based on displacement.
- **Action Buttons:** Accessible circular buttons with Coy's signature `3px 3px 0 #15121D` drop shadow.
- **Keyboard Shortcuts:** Press `←` for Pass, `→` for Like.
- **Empty State:** When all 32 profiles are swiped, a celebration screen appears with a **Reset Demo** button.

### 3. Matches Tab
- Fetches all mutual matches from `/api/matches`.
- Shows profile photos, age badge, college or city, and bio snippet.
- Clicking any match opens a detailed modal with interests, graduation tags, and match date.
- Clean empty state when no mutual matches exist yet.

### 4. Match Celebration Modal
- Triggers immediately when a mutual match occurs.
- Fires an interactive multi-color confetti cannon (`canvas-confetti`).
- Displays both user avatars with an overlapping heart icon and playful `-2deg` angle.
- Instant actions: **"View in Matches"** or **"Keep Swiping"**.

---

## 🗄 Database Schema & Seeding

### Prisma Schema (`prisma/schema.prisma`)
```prisma
model User {
  id            String   @id
  name          String
  age           Int
  photo         String
  bio           String
  cityOrCollege String
  interests     String   // JSON array of strings
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  swipesGiven    Swipe[] @relation("SwipesGiven")
  swipesReceived Swipe[] @relation("SwipesReceived")
  matchesAsUser1 Match[] @relation("MatchesUser1")
  matchesAsUser2 Match[] @relation("MatchesUser2")
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

### Seeding Strategy (`prisma/seed.ts`)
- **Logged-in User:** `user_me` (Aarav Sharma, 22, BITS Pilani / Bengaluru).
- **32 Realistic Indian Student Profiles:** Diverse colleges across India (IIT Bombay, LSR Delhi, St. Xavier's Mumbai, Ashoka University, CEPT Ahmedabad, NLSIU, NID, etc.) with verified interests and high-resolution Unsplash portraits.
- **Pre-seeded Incoming Likes:** Profiles such as **Priya Sharma (`user_101`)**, **Ananya Iyer (`user_102`)**, **Diya Patel (`user_105`)**, **Meera Sen (`user_107`)**, **Sneha Nair (`user_108`)**, **Tara Mukherjee (`user_112`)**, **Riya Kapoor (`user_114`)**, **Zoya Khan (`user_115`)**, and **Natasha D'Souza (`user_125`)** have pre-liked the user.
- **Testing Mutual Matching:** Swiping right on any of these profiles triggers an instantaneous **"It's a Match!"** celebration! Swiping right on other profiles records a one-sided like without a match.

---

## 📡 API Documentation

### 1. GET `/api/feed`
Retrieves profiles that the logged-in user has not yet liked or passed.

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
      "interests": ["Reading", "Chai", "Classic Cinema", "Poetry", "Museum Hopping"]
    }
  ]
}
```
*Note: Privacy guarantee: incoming likes or `preLikesMe` flags are NEVER exposed.*

### 2. POST `/api/swipe`
Records a swipe action (`"like"` or `"pass"`).

**Request Body:**
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
    "id": "cm7...",
    "profile": {
      "id": "user_101",
      "name": "Priya Sharma",
      "age": 21,
      "photo": "https://images.unsplash.com/...",
      "bio": "Literature major...",
      "cityOrCollege": "Lady Shri Ram College, Delhi",
      "interests": ["Reading", "Chai", "Classic Cinema"]
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

### 3. GET `/api/matches`
Retrieves the logged-in user's mutual matches.

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 1,
  "matches": [
    {
      "id": "cm7...",
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

### 4. POST `/api/reset`
Utility endpoint for testing and live evaluation. Resets all swipes made by the demo user while preserving pre-seeded incoming likes.

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js `v18.18+` or `v20+` (tested on Node v22.14)
- npm `v9+` or `v10+`

### 1. Clone & Install
```bash
git clone https://github.com/your-username/coy-discover.git
cd coy-discover
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
DATABASE_URL="file:./dev.db"
CURRENT_USER_ID="user_me"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Push Database Schema & Seed Profiles
```bash
# Push schema to SQLite
npx prisma db push

# Seed 32 realistic profiles and incoming likes
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🧪 Automated Testing & QA

Run the full automated test suite (Unit, Integration, Privacy, and React Component tests):

```bash
npm test
```

### Test Coverage Highlights:
- **TEST 1:** `GET /api/feed` returns only unswiped profiles and excludes logged-in user.
- **TEST 2:** `Pass` action saves a pass record and returns `matched: false`.
- **TEST 3 & 4:** Mutual like creates exactly one `Match` record in database.
- **TEST 5:** Non-mutual like records a swipe without creating a match.
- **TEST 6 & 14:** Incoming non-mutual likes are **NEVER** revealed in feed or matches.
- **TEST 7 & 8:** Previously swiped profiles never reappear in feed (DB persistence).
- **TEST 9:** Matches persist across reloads and queries.
- **TEST 10:** Duplicate swipe requests are handled safely and idempotently.
- **TEST 11:** Input validation blocks self-swiping, invalid actions, and malformed bodies.
- **UI Tests:** Navbar branding, BottomNav active states, Home placeholder, SwipeButtons callbacks, MatchModal celebration, and EmptyState rendering.

---

## ☁️ Vercel Deployment Guide

To deploy this Next.js application to Vercel:

1. **Persistent Cloud Database:**  
   Standard SQLite files on local disk are ephemeral in serverless environments. For persistent production storage:
   - **Option A (Turso / libSQL):** Create a free database on [Turso](https://turso.tech) and set:
     ```env
     DATABASE_URL="libsql://your-database.turso.io"
     ```
   - **Option B (PostgreSQL / Supabase / Neon):** Switch provider to `postgresql` in `prisma/schema.prisma` and connect your connection pooler URL.
2. **Deploy to Vercel:**
   ```bash
   vercel
   ```
3. **Set Environment Variables on Vercel Dashboard:**
   - `DATABASE_URL`: Your production database URL.
   - `CURRENT_USER_ID`: `user_me`
4. **Run Seed on Production DB:**
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

---

## 📄 License
This project was built for the Coy Full-Stack SDE Intern Assignment. All rights reserved.
