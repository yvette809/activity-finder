# ActivityFinder

A modern Next.js 14 platform for discovering and booking local activities. Built with React, Tailwind CSS, MongoDB, and JWT authentication.

## ✨ What's new in this version

This is a significantly enhanced version of the original Activity Finder. Below is a summary of every meaningful change.

### 🐛 Critical bugs fixed

1. **Hardcoded localhost in API calls** — The original `utils/api.js` had `const base_url = "http://localhost:3000"`, which broke the app in production. The new `lib/api/client.js` uses **relative URLs** so it works in dev, staging, and prod with zero configuration.
2. **Race condition in SearchForm** — The original crashed when an activity had no `creator` (e.g. mid-load). The new version filters defensively.
3. **Security hole in booking** — Users could choose `confirmed` or `cancelled` from a dropdown when creating their own reservations. The new flow doesn't send `bookingStatus` from the client at all — the server controls it.
4. **Duplicate components** — `ActivityCard.jsx` and `Activities.jsx` existed in two places with slightly different versions. Now there's exactly one of each.
5. **Missing `key` prop** — Reservations list rendered without keys.
6. **Missing `alt` on Image** — Navigation rendered `<Image>` without an `alt`, causing Next.js warnings.
7. **Hardcoded year `2024`** — Footer now uses `new Date().getFullYear()`.
8. **`window.confirm` issues** — Delete actions ignored the user's choice (called the API regardless of "Cancel"). Now properly gated.
9. **Unused `jwt.decode` on the client** — Removed from components, isolated in `lib/userInfo.js`.

### 🎨 Visual & UX overhaul

- **Hero**: New gradient overlay, Framer Motion animations, stats strip, dual CTAs, scroll indicator
- **Activity cards**: Image-first layout, status badges (full / almost full), price overlay, hover scale, smooth animations
- **Navigation**: Scroll-aware translucent bar, mobile drawer, user dropdown menu
- **Search form**: Sticky-to-hero floating card, active-filter clear button
- **Skeleton loaders** instead of giant spinning dots
- **Empty states** everywhere instead of bare "no results" text
- **Login/Register**: Centered cards with role-tab toggle for trainers
- **Booking page**: Plus/minus stepper, radio-style time-slot picker, live total
- **Activity detail**: Hero image, info tiles, sticky booking sidebar
- **Trainer dashboard**: Clean table with edit + delete actions, modal-based create form
- **Confirmation page**: Animated success state with Framer Motion

### 📁 Code structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── activities/[id]/    # Activity detail + booking
│   ├── api/                # API routes (untouched)
│   ├── dashboard/
│   ├── login/, register/
│   ├── reservations/
│   ├── trainers/
│   ├── payment/, confirmation/
│   ├── layout.js
│   ├── page.jsx            # Home
│   └── globals.css
├── components/
│   ├── ui/                 # Reusable primitives
│   │   ├── Loading.jsx     # Spinner + skeleton
│   │   ├── EmptyState.jsx
│   │   └── Modal.jsx
│   ├── Hero.jsx
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   ├── Activities.jsx
│   ├── ActivityCard.jsx
│   ├── ActivityForm.jsx    # Unified create + edit
│   ├── SearchForm.jsx
│   ├── TrainerCard.jsx
│   ├── CreditCardForm.jsx
│   ├── StarRating.jsx
│   └── ClientOnly.jsx
├── lib/
│   ├── api/                # Domain-split API client
│   │   ├── client.js       # Base fetch wrapper (FIXES localhost bug)
│   │   ├── activities.js
│   │   ├── reservations.js
│   │   ├── trainers.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── auth.js             # Cookie helpers
│   ├── userInfo.js         # JWT decode
│   ├── connectDB.js        # Mongo connection
│   ├── session.js, token.js, formatTime.js
└── models/                 # Mongoose schemas (untouched)
```

### 🎨 Design system

A proper Tailwind theme replaces the original single `deep-green` color:

| Color | Use |
|---|---|
| `forest-{50–950}` | Primary brand — buttons, links, accents |
| `sun-{50–900}` | Warm highlight — featured / warning states |
| `ink-{50–950}` | Neutral grayscale — text, borders, backgrounds |

Plus utility classes: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-danger`, `input`, `label`, `tag`, `tag-forest`, `tag-sun`, `card`, `card-hover`, `skeleton`, `container-page`.

## 🚀 Setup

```bash
npm install
```

Create `.env.local`:

```
MONGO_URI=mongodb://localhost:27017/activity-finder
JWT_SECRET=replace-this-with-a-strong-random-string
```

Then:

```bash
npm run dev
```

Open **http://localhost:3000**.

## 📚 Tech stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom design system
- **Animations**: Framer Motion
- **Database**: MongoDB + Mongoose
- **Auth**: JWT in HTTP-only cookies (via `nookies`)
- **Validation**: Zod
- **UX**: react-hot-toast, react-datepicker, moment

## 📦 Deploy

Works on Vercel out of the box. Set `MONGO_URI` and `JWT_SECRET` in your Vercel environment variables. No `base_url` config needed — relative URLs handle everything.
