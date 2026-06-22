# KesherTech Website Redesign — Design Spec

**Date:** 2026-06-22
**Status:** Approved (design phase)
**Repo:** KesherTech/KesherTech.github.io (GitHub Pages → kesher-tech.com)

## Summary

Redesign the KesherTech marketing site into a clean, Apple-style single page that
presents the company and its products (**מגן** and **עבודת קיץ**), with a contact
section at the bottom. Add dedicated, accurate **privacy** and **terms** pages for the
SummerJob app, linked from the footer. Hebrew, right-to-left. Static HTML + CSS, no build
step, served by GitHub Pages.

## Goals

- Replace the current Magen-only page with a polished, Apple-like one-pager.
- Present both products (Magen, SummerJob) in a scalable products section.
- Provide a clear contact path (email `contact@kesher-tech.com`).
- Publish honest, thorough privacy + terms pages for SummerJob (also usable as the
  App Store privacy/terms URLs), with a visible "not legal advice" disclaimer.

## Non-Goals (YAGNI)

- No CMS, no framework, no build pipeline, no JS app — plain static files.
- No bilingual toggle (Hebrew only for now).
- No backend/forms — contact is a mailto link.
- Not a substitute for a lawyer's review (disclaimed on the legal pages).

## Approach

Hand-written static HTML + CSS. The site is `KesherTech.github.io`, so files at the repo
root are served at kesher-tech.com via GitHub Pages on push. A system/SF font stack
(`-apple-system, "SF Pro Text", ...`) plus custom CSS delivers the Apple aesthetic without
Tailwind-CDN (avoids a runtime dependency + FOUC). The existing `CNAME` (kesher-tech.com)
is preserved.

## File Structure

```
KesherTech.github.io/
  index.html                 # the one-page site
  css/styles.css             # shared Apple-style stylesheet (site + legal pages)
  assets/                    # logos/marks (sun for SummerJob, shield for Magen) + favicon
  summerjob/
    privacy.html             # SummerJob privacy policy (Hebrew)
    terms.html               # SummerJob terms of use (Hebrew)
  CNAME                      # kesher-tech.com (unchanged)
```

(Legal pages share `css/styles.css` via a `.legal` layout class — one stylesheet.)

## Visual Style (Apple-like)

- Generous whitespace; very large bold Hebrew headlines with thin secondary lines.
- Sticky translucent top nav with `backdrop-filter: blur()`.
- Smooth scrolling; subtle fade/slide-in on scroll (IntersectionObserver, progressive
  enhancement — content is fully visible without JS).
- Rounded product cards/sections; mostly monochrome with a per-product accent
  (Magen = teal/blue shield; SummerJob = sun orange `#F59E0B`).
- Hebrew RTL (`<html dir="rtl" lang="he">`); responsive (mobile-first).

## Page Structure (`index.html`)

1. **Nav** — KesherTech wordmark + anchor links (מוצרים, צור קשר); blurred sticky bar.
2. **Hero** — large KesherTech statement line ("בונים מוצרים שמגנים ועוזרים לאנשים")
   + short subline, over a soft gradient. One primary CTA scrolls to products.
3. **Products** — two alternating feature blocks in a grid that scales to more:
   - **מגן** — scam-shield mark, one-line value, feature chips, App Store link.
   - **עבודת קיץ** — sun mark, tagline ("עבודות קיץ לנוער"), short value, status note
     ("בקרוב ב-App Store" or App Store link when live).
4. **Contact** — "צור קשר" with `contact@kesher-tech.com` (mailto button).
5. **Footer** — KesherTech line + © year + legal links: *מדיניות פרטיות — עבודת קיץ*,
   *תנאי שימוש — עבודת קיץ*, plus existing Magen privacy/terms links.

## Legal Pages (Hebrew, accurate to actual practice)

Shared clean `.legal` template: title, last-updated date, readable max-width column, a
prominent disclaimer box ("מסמך זה אינו ייעוץ משפטי; מומלץ להיוועץ בעו״ד"), back-to-home link.

### `summerjob/privacy.html` — מדיניות פרטיות
- **What is collected:** the content of a published job post — title, city, description,
  and the **employer contact phone number (a personal detail)**; plus the **IP address**
  of the device that submits a post, stored briefly to prevent spam (rate limiting).
- **What is NOT collected:** no accounts/registration; **no data about job-seekers/teens**;
  no tracking, ads, or analytics profiles.
- **Purpose & legal basis:** display posts on the public board; spam prevention.
- **Retention:** posts auto-expire after ~30 days; spam-prevention IP logs are short-lived.
- **Processors:** hosted on Supabase (managed Postgres); listed as a data processor.
- **Minors:** the app is used by teenagers (14+); we deliberately collect no personal data
  from job-seekers; data minimization stance stated.
- **Your rights / removal:** how to request removal of a post or data
  (`contact@kesher-tech.com`); reporting mechanism in-app.
- **Contact & updates:** email, last-updated date.

### `summerjob/terms.html` — תנאי שימוש
- The app is an **information board only**; KesherTech is **not a party** to any job,
  application, or employment relationship and makes no guarantees about postings.
- **User responsibility:** employers/users must comply with Israeli youth-labor law
  (minimum age 14, hours, etc.); KesherTech does not verify or enforce it.
- **Acceptable use:** no illegal/abusive/misleading posts; KesherTech may remove content
  and the report→auto-hide mechanism applies.
- **No warranty / limitation of liability;** governing law: Israel.
- **Age:** intended for users 14+ in line with the law.

Both pages end with a visible **"not legal advice — consult a lawyer"** disclaimer.

## Error Handling / Edge Cases

- Works fully without JavaScript (scroll animations are enhancement only).
- Responsive down to small phones; large tap targets.
- External links (`App Store`, `mailto`) use `rel="noopener"` where relevant.
- Legal pages reachable directly by URL (for App Store submission).

## Testing / Verification

- Render `index.html`, `summerjob/privacy.html`, `summerjob/terms.html` locally and
  **screenshot via headless Chrome** (desktop + mobile widths) to confirm the Apple look,
  RTL correctness, and that all sections/links render.
- HTML validates (no broken tags); all footer legal links resolve to real files.
- Confirm `CNAME` unchanged and files are at the paths GitHub Pages serves.

## Deploy

Push to `KesherTech/KesherTech.github.io`; GitHub Pages serves kesher-tech.com
automatically. No build step.

## Success Criteria

- One-page Apple-style Hebrew RTL site with hero, both products, and contact.
- Footer links open working SummerJob privacy + terms pages.
- Privacy page accurately discloses job-post contact numbers + IP logging, no seeker data,
  minors notice; terms disclaim employment relationship + youth-law responsibility.
- Visible "not legal advice" disclaimer on legal pages.
- Renders correctly on desktop and mobile (screenshot-verified); deploys via Pages.

## Open Questions / Future

- Real App Store URL for SummerJob once live (placeholder "בקרוב" until then).
- Optional: consolidate Magen legal onto this site later (currently external magen-legal).
- A lawyer should review the legal pages before relying on them.
