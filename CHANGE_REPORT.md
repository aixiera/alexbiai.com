# kairuibi.com — August 18, 2026 Change Report

## Current positioning and design

- Keeps the Canada-wide local-business positioning: Kairui is based in BC and serves businesses across Canada.
- Retains the restored cream-and-gold editorial system, angular panels, compact bilingual navigation, serif display type, and homepage-only Three.js motion stack.
- Keeps the homepage sales architecture while removing sections 01, 03, and 06 at the owner's request.
- Reworks the hero workflow into a realistic sample lead desk with missed calls, incomplete quote requests, estimates awaiting replies, owner actions, and due-today follow-up.
- Fixes the FAQ open-state symbol and removes mojibake from CSS-generated symbols.
- Labels the industries section “My niche · Industries.”

## Booking and Pre-Call journey

- Adds `/precall.html` as the required preparation page for booked prospects.
- Includes a founder-video slot, required operational briefing form, sensitive-data warning, three-item preparation checklist, calendar guidance, and scheduling links.
- The video slot is configuration-driven through `siteConfig.precall.youtubeUrl`; YouTube's privacy-enhanced player loads only after a visitor clicks play.
- Expands the booking page with the two engagement paths, five-step diagnosis roadmap, problem-led service options, proposal/SOW process, 25% kickoff payment, remaining 75% after acceptance, and remaining-fee satisfaction commitment.
- Retires `/contractors/` as a standalone sales page while preserving the URL as a clear, noindex handoff to Booking and Pre-Call.
- Adds direct top-navigation access to Services, My Niche, Demos, Pre-Call, Projects, Publication, About, and Booking.

## Form delivery and privacy

- Connects the homepage inquiry and Pre-Call briefing forms to FormSubmit using native POST fallbacks and AJAX enhancement.
- Submissions are time-stamped, delivered to `bia446635@gmail.com`, and retained in FormSubmit's submission archive for up to 30 days under its current service terms.
- Adds honeypots, required response consent, validation, bilingual status copy, email fallback, language, page, referrer, and UTM metadata.
- The first live submission triggers FormSubmit's one-time email activation step for this domain.
- Updates the Privacy Policy for FormSubmit and the click-to-load YouTube video behavior.
- Keeps Google Analytics and Meta Pixel disabled until identifiers are configured and consent is granted.

## Content and route cleanup

- Removes the identified product-category wording, negative contrast phrases, and defensive formulations from commercial copy.
- Keeps legal limitations where they are needed to explain payment, privacy, acceptance, and responsibility.
- Adds the Pre-Call route to the sitemap and removes the retired contractor landing page from indexing.
- Keeps working demos and builder proof accessible without presenting demonstrations as client results.

## Configuration still needed

- Paste the future YouTube or YouTube Shorts URL into `siteConfig.precall.youtubeUrl` in `assets/js/site-config.js`.
- Click the one-time FormSubmit activation email after the production activation test is sent.
- Add GA4 or Meta IDs only when those trackers should be enabled.
- Replace the existing founder portrait when the preferred portrait file is supplied.

## Verification

- JavaScript syntax, HTML structure, translation-key coverage, unique IDs, local links, sitemap, form routing, and removed-content scans are verified before publishing.
- Production routes and GitHub Pages deployment are checked after the push.
