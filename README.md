# Nirikshan — Product Specification

Tagline: Capture. Tag. Track.

## 1) Problem

District officials’ field inspections lack verifiable evidence, clear workflows, and accountable records. Citizen feedback is underused and often unverifiable. We need a secure, geo-tagged, digitally authenticated system with officer and citizen participation and transparent records.

## 2) Roles & Permissions

- Citizen
  - Login: Phone OTP (no Aadhaar storage). Optional eKYC via compliant KUA if mandated.
  - Actions: View nearby inspections (<= 4 km). Submit feedback (Satisfactory/Unsatisfactory). Upload image + comment for Unsatisfactory.
- Officer
  - Login: Org SSO or issued credentials + 2FA. Device binding.
  - Actions: Create inspections (photo/video, comment, rating), respond to reviews, view records.
- Reviewer (Senior Officer)
  - Actions: Review inspections (Live, Previous), rate, request action, add comments, close cases.
- Admin
  - Actions: Manage users, roles, assignments, locations, SLAs, view analytics, export, audits.

## 3) Authentication & Compliance

- Citizens: Phone OTP via compliant SMS provider. Do not store Aadhaar. If Aadhaar eKYC is required, integrate with an approved KUA; store only tokens/transaction IDs; follow UIDAI norms.
- Officers/Reviewers: SAML/OIDC SSO (Keycloak/Azure AD). Enforce 2FA; rotate credentials; session timeouts.
- Device binding: Register officer devices; revoke if compromised.

## 4) Geo-Tagging & Anti-Fraud

- In-app capture only (no gallery). Watermark with time + coordinates + hash.
- Collect: GPS + network location + compass + altitude + timestamp; EXIF preserved.
- Mock location detection; emulator/root/jailbreak checks.
- Payload signing: hash(media+metadata), sign with device key; verify server-side.
- Trusted timestamping (server time sync).
- Optional: Officer selfie with background for liveness checks.

## 5) Information Architecture & Navigation

- Splash → Login (Officer | Citizen)
- Officer tabs:
  - Inspect (Create new)
  - Reviews (Live | Previous)
  - Records (Officers | Locations)
- Citizen tabs:
  - Review (Nearby)
  - Records (Location histories)

## 6) Core Flows

### 6.1 Officer — Inspect

1. Create Inspection:
   - Capture photo/video in-app.
   - Add comment (min length).
   - Rate site (1–5).
   - Auto-capture geo/time/device signals; sign payload.
   - Submit → Inspection State: Submitted.
2. Post-submit screen:
   - Show: Location name (reverse geocode), timestamp, map pin.
   - Tabs: Reviews by Senior Officer | Citizen Feedback.
   - Officer can reply with text/photo (in-app capture).

### 6.2 Officer — Reviews

- Live Inspections: Inspections submitted in the last X hours or in open states.
- Previously Inspected: Historical list with filters.
- Detail page shows:
  - Location, inspecting officer, media, comment, rating.
  - Reviewer actions: Rate, Comment, Mark ActionRequired (assign), or Close.
  - Post action → back to list with success toast.

### 6.3 Citizen — Review

- On login, request location permission and verify integrity (no mock).
- List inspections within 4 km (geohash/PostGIS query).
- Detail page shows:
  - Location, officer name, media, comment.
  - Choose: Satisfactory → Thank you.
  - Unsatisfactory → Upload in-app photo + comment (min length).
  - Submit → Creates/links Case (ActionRequired). Back to list.

### 6.4 Records

- Officer:
  - Records of Inspecting Officers:
    - List → Detail: Officer profile, sites visited, # complaints, SLA adherence, overall rating, trend.
  - Records of Locations:
    - List → Detail: Location profile, inspection timeline, outcomes, citizen feedback history.
- Citizen:
  - Locations list → Detail: Location profile and previous inspections.

## 7) States & Transitions

- Inspection States:
  - Draft → Submitted → UnderReview → ActionRequired → Resolved → Closed
- Citizen Feedback:
  - Satisfactory → attaches to inspection summary.
  - Unsatisfactory → creates Case linked to inspection (state: Open → InProgress → Resolved → Closed).
- Notifications:
  - Officer notified on ActionRequired; Citizen notified on resolution (if opted in).

## 8) Data Model (Summary)

- Users(id, role, phone, name, dept, device_binding,…)
- Inspections(id, officer_id, location_id, state, rating, comment, created_at,…)
- Media(id, inspection_id, type, url, hash, signed_metadata,…)
- Locations(id, name, lat, lon, geohash, admin_codes,…)
- Reviews(id, inspection_id, reviewer_id, rating, comment, state_change,…)
- CitizenFeedback(id, inspection_id, citizen_id, verdict, comment,…)
- Cases(id, inspection_id, created_by, assigned_to, state, sla_due_at,…)
- AuditLogs(id, actor_id, entity_type, entity_id, action, diff, ts)

## 9) Geo Radius Logic (4 km)

- Use PostGIS ST_DWithin with geography type for accuracy.
- Index by geohash for efficient pre-filter.
- Re-validate on submit (timestamp + location threshold).
- Rate-limit citizen submissions; one feedback per inspection per citizen per 24h.

## 10) Security & Privacy

- PII minimization; encrypt at rest (KMS) and in transit (TLS 1.2+).
- RBAC + ABAC: Officers limited to assigned districts.
- Audit logs for all sensitive actions.
- Retention policies: media N days/months; anonymize after closure.
- Consent prompts for citizens; privacy policy.

## 11) Offline & Performance

- Local encrypted queue for offline inspections; retry with exponential backoff.
- Chunked uploads for videos; background upload.
- Media storage in S3-compatible bucket with pre-signed URLs; CDN for downloads.

## 12) Admin & Analytics

- Dashboards: inspections by area/time, complaint rate, SLA breach rate, repeat issues.
- Exports (CSV), scheduled reports, map overlays.
- User/device management and revocation.

## 13) Tech Stack (Suggested)

- Mobile: React Native or Flutter; native modules for camera and attestation.
- Backend: Node (NestJS) or Django/FastAPI; GraphQL/REST.
- DB: Postgres + PostGIS; Redis for queues; S3 for media.
- Auth: Keycloak/Azure AD; JWT with short TTL + refresh.
- Maps: Mapbox/Google Maps; reverse geocoding API.
- CI/CD: GitHub Actions; SAST/DAST; IaC (Terraform).

## 14) MVP Scope (3–6 weeks)

- Auth: Citizen phone OTP; Officer password login (SSO optional phase 2).
- Inspections: photo capture, comment, rating; submission with geo + timestamp.
- Citizen feedback within 4 km; satisfactory/unsatisfactory with photo.
- Basic Reviews: Reviewer can comment and mark ActionRequired.
- Records basic views; simple dashboards.
- Anti-fraud baseline: in-app capture only, location/timestamp, mock detection.

## 15) Risks & Mitigations

- Legal (Aadhaar): avoid storing Aadhaar; use phone OTP; only eKYC via approved KUA.
- GPS spoofing: in-app capture, mock detection, signed payloads, liveness.
- Connectivity: offline mode + retries.
- Privacy: consent, minimization, retention, audits.

## 16) Success Metrics

- % inspections with verified geotag media
- Avg time to review; SLA adherence
- Citizen engagement rate; unsatisfactory resolution time
- Fraud detection rate (mock/invalid submissions blocked)
