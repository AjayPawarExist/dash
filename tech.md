# Nirikshan Web (Next.js) — Role-Based App Flow

Tagline: Capture. Tag. Track.

This document translates the product spec into a pragmatic web app flow using Next.js (App Router), focusing on role-based navigation, route structure, auth, data flows, and anti-fraud constraints on the web.

## 1) High-Level Navigation

- Entry
  - Splash/Landing → Choose role: Citizen | Officer | Reviewer | Admin (or auto-redirect if already logged in)
  - Auth routes per role
- Citizen
  - Review (nearby inspections within 4 km)
  - Records (location histories)
- Officer
  - Inspect (create new inspection)
  - Reviews (Live | Previous)
  - Records (Officers | Locations)
- Reviewer (Senior)
  - Reviews (Live | Previous)
  - Inspection Detail (rate, comment, request action, close)
- Admin
  - Dashboard (overview)
  - Users/Roles, Locations, Devices, SLAs
  - Exports and Audits

Use a top-level role-aware layout to show only the relevant tabs.

## 2) Auth Flows

- Citizen (MVP): Phone OTP
  - Enter phone → receive OTP → verify → create session
  - Optional: consent prompt, privacy policy
- Officer/Reviewer: Org SSO (OIDC/SAML via NextAuth/Keycloak/Azure AD) or issued credentials (MVP password + 2FA)
  - Device binding: show device registration prompt post-login if not bound; persist device fingerprint token
- Admin: SSO + enforced 2FA

Notes:

- Short-lived JWT session with refresh
- Session timeouts, rotation on sensitive actions
- Middleware-enforced RBAC/ABAC by role and district

## 3) Core User Flows

### 3.1 Officer — Inspect

1. Go to Inspect
2. Capture media in browser (camera-only, no gallery), collect geolocation
3. Enter comment (min length) + rating (1–5)
4. Payload generation
   - Client: collect GPS, network (if available), compass (where supported), altitude (if available), timestamp
   - Watermark: render timestamp + coords + content hash onto image via canvas
   - Attach EXIF where possible; compute hash(media+metadata)
   - Sign payload with device key (web: use WebCrypto + device-bound keypair stored in IndexedDB; register public key at binding time)
5. Submit
6. Post-submit summary: reverse geocoded location, map pin, tabs:
   - Senior Reviews
   - Citizen Feedback
7. Reply thread: Officer can respond with text + new capture

### 3.2 Officer — Reviews

- Live: submitted in last X hours or open states (Submitted, UnderReview, ActionRequired)
- Previous: historical with filters
- Detail: location, officer, media, comment, rating, timeline
- Reviewer actions (if officer has reviewer role or on reviewer screen): rate, comment, mark ActionRequired (assign), or Close → back to list with success toast

### 3.3 Citizen — Review

1. Login with OTP → prompt for location permission; show integrity notice (no mock)
2. List inspections within 4 km (from current location)
3. Detail: location, officer name, media, comment
4. Choose:
   - Satisfactory → Thank you
   - Unsatisfactory → capture photo (camera-only) + comment (min length)
5. Submit → creates/links Case (ActionRequired) → back to list

Constraints:

- Rate limit
- One feedback per inspection per citizen per 24h

### 3.4 Records

- Officer
  - Officers list → detail: profile, sites visited, complaints, SLA adherence, rating, trend
  - Locations list → detail: timeline, outcomes, citizen history
- Citizen
  - Locations list → detail: profile + previous inspections

## 4) States & Transitions (UI Surface)

- Inspection: Draft → Submitted → UnderReview → ActionRequired → Resolved → Closed
- Case: Open → InProgress → Resolved → Closed
- UI reflects current state with pills/badges; action buttons enabled per role and state

## 5) Next.js Route Map (App Router)

```text
app/
  (public)/
    page.tsx                 // landing
    privacy/page.tsx
    terms/page.tsx
  (auth)/
    citizen/
      login/page.tsx
      otp/page.tsx
    officer/
      login/page.tsx         // MVP password + 2FA; SSO in phase 2
    sso/
      callback/route.ts      // OIDC/SAML callback (NextAuth)
  (citizen)/
    layout.tsx               // shows Citizen tabs
    review/page.tsx          // nearby list (4 km)
    inspections/[id]/page.tsx
    locations/page.tsx
    locations/[id]/page.tsx
  (officer)/
    layout.tsx               // shows Officer tabs
    inspect/page.tsx         // create inspection
    reviews/
      page.tsx               // default Live
      live/page.tsx
      previous/page.tsx
    inspections/[id]/page.tsx
    records/
      officers/page.tsx
      officers/[id]/page.tsx
      locations/page.tsx
      locations/[id]/page.tsx
  (reviewer)/
    layout.tsx               // shows Reviewer tabs
    reviews/
      live/page.tsx
      previous/page.tsx
    inspections/[id]/page.tsx
  (admin)/
    layout.tsx               // admin nav
    dashboard/page.tsx
    users/page.tsx
    users/[id]/page.tsx
    locations/page.tsx
    locations/[id]/page.tsx
    devices/page.tsx
    slas/page.tsx
    exports/page.tsx
    audits/page.tsx
  api/
    auth/
      otp/start/route.ts     // POST: start OTP
      otp/verify/route.ts    // POST: verify
    inspections/
      route.ts               // POST: create; GET: list (role-aware)
      [id]/route.ts          // GET: detail; PATCH: state change/comments
      [id]/media/route.ts    // POST: upload init (pre-signed), GET: list
    locations/
      route.ts               // GET: list; POST: create (admin)
      nearby/route.ts        // POST: list within radius {lat, lon, 4km}
      [id]/route.ts          // GET: detail; PATCH: update (admin)
    feedback/
      route.ts               // POST: citizen feedback
    cases/
      route.ts               // GET/POST
      [id]/route.ts          // GET/PATCH
    users/
      me/route.ts            // GET session + roles
      route.ts               // admin list/create
    analytics/
      summary/route.ts
      exports/route.ts
middleware.ts                 // RBAC/ABAC gate by route-group
```

Notes:

- Use route groups for role layouts.
- middleware.ts checks session/role and district access (ABAC) and redirects if unauthorized.

## 6) Data Fetching & Components

- Server Components (RSC) for lists/detail pages to leverage caching and fast TTFB
- Client Components for:
  - Camera capture (MediaDevices API) with accept/capture
  - Geolocation prompt and map rendering (Mapbox/Google Maps)
  - Forms, toasts, optimistic updates
- Mutations via Server Actions or route handlers (api routes) with Zod validation

Key Components:

- MapView (client)
- CaptureCamera (client) with canvas watermark
- GeoConsentBanner (client)
- InspectionCard, CaseCard
- StatePill, RoleGuard, DistrictGuard
- UploadManager (chunked uploads, background retry)

## 7) Geo & Anti-Fraud (Web Constraints)

- Capture:
  - Use input capture or MediaDevices getUserMedia; disallow file picker (avoid gallery) by UI/UX and accept attributes. Note: absolute prevention is limited on web.
  - Draw watermark (timestamp, coords, hash) on canvas; upload watermarked image and original.
- Geolocation:
  - Use Geolocation API with high accuracy; show rationale; retry logic
  - Send raw coords; backend validates 4 km via PostGIS ST_DWithin (geography)
- Integrity checks (best-effort on web):
  - Detect devtools open (soft), user agent anomalies
  - Check for location mock indicators via heuristics and server-side consistency (speed jumps, improbable accuracy)
  - Device binding: IndexedDB-stored keypair; sign payload with WebCrypto; verify server-side
- Trusted timestamp: server writes canonical timestamp; compare with EXIF/client

## 8) Uploads & Storage

- Initialize upload via api to fetch S3 pre-signed URL(s)
- Chunked uploads for videos; resume via UploadManager
- On submit: send metadata {hash, exif, signed_metadata, coords, device_key_id}
- CDN for media downloads with auth token or signed URLs

## 9) Offline & Performance

- PWA:
  - Service Worker + Workbox
  - IndexedDB queue for pending inspections/feedback
  - Background Sync (where supported)
- Optimizations:
  - Infinite lists with cursor pagination
  - Edge caching for anonymous pages (landing)
  - Image optimization for thumbnails
  - Debounced reverse geocoding calls

## 10) Admin & Analytics

- Dashboard cards: inspections by area/time, complaint rate, SLA breach rate, repeat issues
- Filters: time range, district, officer, location
- Exports: CSV via async job; notify when ready
- User/device management: add/revoke, device list, binding reset
- Audit logs view with filters and diff viewer

## 11) Security & Privacy

- PII minimization; encrypt in transit; server-side at rest (KMS on storage layer)
- RBAC + ABAC: officers limited to assigned districts/locations
- Consent prompts for citizens; privacy policy page
- Retention: media TTL configs; anonymize on closure
- Rate limiting per route; CSRF protection on mutations; strict CSP
- Session rotation, short JWT TTL + refresh; 2FA for staff

## 12) MVP Scope Mapping (3–6 weeks)

- Citizen OTP login, consent prompt
- Officer password login (+basic 2FA)
- Create inspection (photo, comment, rating, geo + timestamp, watermark + hash)
- Citizen feedback within 4 km (satisfactory/unsatisfactory with photo)
- Reviewer basic actions (comment, mark ActionRequired)
- Records basic lists and simple analytics
- Anti-fraud baseline: camera-only UX, geolocation, timestamp, soft mock detection

## 13) Key Backend Contracts (Request/Response Shapes)

```ts
// POST /api/inspections
type CreateInspectionReq = {
  media: {
    originalUrl: string;
    watermarkedUrl: string;
    type: "photo" | "video";
    hash: string; // sha256(original + metadata)
    exif?: Record<string, any>;
    signedMetadata: string; // JWS of metadata below
  };
  metadata: {
    lat: number;
    lon: number;
    accuracy?: number;
    altitude?: number;
    heading?: number;
    speed?: number;
    timestamp: string; // client ISO
    deviceKeyId: string;
  };
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

type CreateInspectionRes = {
  id: string;
  state: "Submitted";
  serverTimestamp: string;
  location: { name: string; lat: number; lon: number };
};

// POST /api/locations/nearby  body: { lat, lon, radiusMeters: 4000 }
type NearbyRes = {
  inspections: Array<{
    id: string;
    locationName: string;
    lat: number;
    lon: number;
    distanceMeters: number;
    officerName: string;
    createdAt: string;
  }>;
};

// POST /api/feedback
type FeedbackReq = {
  inspectionId: string;
  verdict: "Satisfactory" | "Unsatisfactory";
  comment?: string;
  media?: { url: string; hash: string; signedMetadata: string };
};
```

## 14) Middleware & Guards

- middleware.ts reads session (NextAuth/JWT) and routes by group:
  - (citizen) → citizen role only
  - (officer) → officer role only
  - (reviewer) → reviewer role only
  - (admin) → admin role only
- DistrictGuard fetches assignment on server, injects into RSC, and filters queries server-side

## 15) Tech Choices (Web)

- Next.js App Router (RSC + route handlers or server actions)
- NextAuth for OTP custom provider + OIDC/SAML
- Mapbox GL JS for maps + reverse geocoding API
- Zod for validation, React Hook Form for forms
- Workbox for PWA/Offline
- S3-compatible storage, pre-signed URLs
- Postgres + PostGIS backend services

---

Deliverable: Implement the route skeleton, middleware RBAC, auth stubs, and the four core screens first:

- Officer Inspect (camera + geo + submit)
- Officer Reviews (Live)
- Citizen Review (nearby 4 km)
- Reviewer Detail (actions)

Add Admin and Records next, then offline/PWA and stronger anti-fraud.
