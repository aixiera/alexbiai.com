# kairuibi.com Canada-Wide Repositioning — Change Report

## Editorial visual restoration

- Restored the original warm cream-and-gold design language, serif display typography, condensed monospace labels, angular panels, chevron actions, compact bilingual header, paper texture, and layered shadows.
- Rebuilt the homepage’s original Three.js particle, projection, timed-sequence, pointer-depth, scroll-stage, and variable-proximity motion around the new Lead-to-Job content.
- Kept the Canada-wide information architecture, contractor landing page, Systems Checkup positioning, bilingual sales copy, lead capture, consent, analytics hooks, SEO, legal updates, and booking integration.
- Applied the restored visual system to the homepage, contractor, booking, form, founder, FAQ, legal, project, publication, and footer surfaces without restoring the former AI-first sales language.
- Replaced the navy social preview with an original cream-and-gold editorial card that matches the restored site.

## Positioning

- **Before:** AI workflow/developer portfolio led by n8n, AI agents, GitHub, Vercel, motion effects, research, and technical demos.
- **Now:** BC-based, one-person systems builder serving Canadian local businesses with websites, lead capture, practical automation, and independent tool advice.
- AI is described as one optional tool. The conversion path begins with the business problem and a free 15-minute Systems Checkup.

## Routes and content

- Rebuilt the homepage around problem recognition, Diagnose / Build / Automate services, a Lead-to-Job System, industries, clearly labelled demos, builder proof, process, FAQ, inquiry form, and founder close.
- Added `/contractors/` for paid traffic with contractor vocabulary, a before/after workflow, three service paths, a dummy-data plumbing demo, process, FAQ, and one repeated booking CTA.
- Updated the booking page while retaining Google Appointment Schedule and its direct-link fallback.
- Updated Privacy and Terms for the form, Formspree, Google scheduling, temporary campaign storage, consent-gated analytics, Meta measurement hooks, hosting logs, demos, and service disclaimers.
- Kept projects and publications available as secondary builder proof.

## Design system

- Replaced particle fields, Three.js, parallax, projection effects, technical badges, and motion-as-product storytelling.
- Introduced a deep ink navy, warm ivory, slate, and evergreen system using Space Grotesk and IBM Plex Sans.
- Added semantic HTML/CSS workflow diagrams, alternating light/dark sections, accessible cards, native FAQ accordions, clear focus states, 48px actions, reduced-motion behavior, and responsive layouts.
- Added a founder panel using the existing verified local portrait as a temporary fallback. Replace it with the preferred LinkedIn portrait when supplied.

## Conversion and measurement

- Added a progressive-enhancement inquiry form with required name, business, email, industry, process, and contact preference; optional phone and website; accessible states; Formspree support; honeypot; and prefilled email fallback.
- Captures page, referrer, language, and UTM source/medium/campaign/term/content in session storage for later form and booking attribution.
- Added consent-gated hooks for CTA clicks, form start, form submit, booking-page visits, and scheduler opens.
- Google Analytics and Meta Pixel remain disabled until IDs are configured. Booking completion is intentionally not claimed because the embedded Google scheduler does not expose a reliable cross-origin completion event.

## SEO, accessibility, and performance

- Added Canada-wide titles/descriptions, canonical URLs, root Open Graph/X card, route-specific social metadata, Person/ProfessionalService/Service/FAQ structured data, sitemap, and robots file.
- Added semantic landmarks, one H1 per primary page, alt text, keyboard focus, labelled fields, native details/summary FAQs, no-JavaScript-readable content, and reduced-motion handling.
- Removed the Three.js request and unreferenced legacy animation/runtime scripts.
- Added fixed image dimensions and optimized proof/social JPEG assets to reduce transfer size and layout shift.

## Configuration still needed

Update `assets/js/site-config.js` before enabling these services:

- `leadForm.endpoint`: Formspree endpoint connected to the intended notification email; configure allowed domain/spam settings in Formspree.
- `analytics.gaMeasurementId`: optional GA4 measurement ID.
- `analytics.metaPixelId`: optional Meta Pixel ID.
- Replace `images/about_selfie.jpg` or update the homepage portrait path when the preferred LinkedIn portrait is supplied.

## Next three recommended actions

1. Create one polished contractor automation demo with dummy data and a reviewable owner-facing interface.
2. Collect the first real local-business case study with permission, baseline workflow, measurable before/after evidence, and a client quote.
3. Launch a small Meta image-ad test only after `/contractors/`, Formspree delivery, consent behavior, and campaign-event reporting are verified in production.
