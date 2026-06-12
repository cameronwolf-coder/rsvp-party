# RSVP Party — SPEC.md

## 1. Concept & Vision

A clean, single-page RSVP form for Cam's rooftop pool / Rainey Street housewarming birthday. Minimal friction: one field, one tap, done. Feels like a text message that became a webpage — warm, personal, Austin-coded. Mobile-first, no app required.

## 2. Design Language

**Aesthetic:** Warm night-out energy. Dark rooftop vibes with gold accents — like a neon sign in Austin.

**Colors:**
- Background: `#0f0f1a` (deep night)
- Card: `#1a1a2e` (dark panel)
- Primary / accent: `#f5a623` (gold)
- Text: `#f0f0f0` (off-white)
- Muted: `#8888aa` (muted lavender)
- Success: `#4ade80` (soft green)
- Error: `#f87171` (soft red)

**Typography:**
- Headings: `Playfair Display` (Google Fonts) — elegant, party
- Body: `DM Sans` (Google Fonts) — clean, readable

**Motion:**
- Form card fades + slides up on load (400ms ease-out)
- Submit button: gold fill sweep on hover
- Success state: smooth crossfade with checkmark

**Visual assets:**
- No images needed — text-first design
- Decorative: subtle gold gradient border on card
- Inline SVG checkmark on success

## 3. Layout & Structure

Single centered card on full-viewport dark background.

```
[Background: dark]
  [Card: dark panel, gold border]
    [Party details section]
      — "You're invited" eyebrow
      — "Housewarming / Birthday" title
      — Date, time, address, logistics
    [Divider]
    [RSVP form]
      — Name input
      — Attendance toggle (Going / Can't make it)
      — Submit button
    [Success state replaces form]
```

Mobile-first: max-width 480px, centered, 16px side padding.

## 4. Features & Interactions

**RSVP Form:**
- Name field: required, min 2 chars
- Attendance: toggle between "Going" (default) and "Can't make it"
- Submit: POST to `/api/rsvp`
- Loading state: button shows spinner, disabled
- Success: form replaced by confirmation message + checkmark
- Error: inline error message below button, button re-enabled

**API `/api/rsvp` (POST):**
- Body: `{ name: string, attending: boolean }`
- Appends row to Google Sheet: Timestamp, Name, Attending, RSVP'd At
- Returns `{ success: true }` or `{ error: string }`
- CORS headers for cross-origin POST

**Edge cases:**
- Empty name → inline validation error
- Network failure → "Something went wrong. Try again?" with retry
- Duplicate name → still appends (Cam can dedupe manually)

## 5. Component Inventory

**`<PartyDetails />`**
- Eyebrow: "You're invited"
- Title: "Housewarming / Birthday" (Playfair Display, large)
- Details list: date, time, address, logistics bullets
- States: static only

**`<RsvpForm />`**
- Name input: text, placeholder "Your name", gold focus ring
- Attendance toggle: two-button pill, active = gold fill
- Submit button: full-width, gold bg, dark text, hover sweep
- States: idle, loading (spinner), success (hidden), error (inline message)

**`<SuccessState />`**
- Gold checkmark SVG
- "You're on the list!" heading
- Confirmation text
- States: enter animation only

## 6. Technical Approach

**Stack:** Next.js 14 (App Router), TypeScript, no CSS framework (inline CSS modules)

**Google Sheets integration:**
- Service account: JSON key stored in `GOOGLE_SERVICE_ACCOUNT_KEY` env var (base64-encoded)
- Sheet ID stored in `GOOGLE_SHEET_ID` env var
- API: `POST /api/rsvp` → appends via Google Sheets API v4

**Project structure:**
```
rsvp-party/
├── SPEC.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.local.example
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── rsvp/
│           └── route.ts
└── components/
    ├── PartyDetails.tsx
    ├── RsvpForm.tsx
    └── SuccessState.tsx
```

**Deploy:** Push to GitHub → connect repo to Vercel → set env vars in Vercel dashboard.
