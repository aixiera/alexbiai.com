# kairuibi.com Final Revision Report

## Positioning and homepage

- Repositions the site around three BC business offers: Codex and Claude consulting/implementation, AI chat and voice customer-service systems, and restaurant digital ordering/system setup.
- Uses the approved concise hero, a primary free 15-minute Fit Call CTA, and a direct Demo Gallery CTA.
- Keeps the cream-and-gold editorial visual system, angular geometry, Three.js homepage field, pointer depth, timed sequence, scroll effects, variable-proximity typography, semantic fallback, and reduced-motion behavior.
- Reorders the homepage to Hero → Three Offers → Diagnose Before Building → Demo Preview → Process → Builds & Tutorials → Builder Proof/About → FAQ → Form and final Fit Call CTA.
- Separates consulting from implementation and explains that a client can stop after diagnosis and recommendation.
- Removes the unsupported homepage efficiency percentage and avoids fabricated revenue, ROI, client, deployment, and partnership claims.

## Demo Gallery

- Rebuilds the gallery around the same three offer categories.
- Uses the appointment-record n8n image as a real workflow demonstration asset.
- Labels the website assistant as a Prototype and the Voice AI path as a fictional demonstration; neither is presented as a live deployment.
- Adds a fictional BC restaurant workflow covering ordering, POS, kitchen/status, confirmation, menu updates, setup, staff training, analytics, and optional maintenance.
- Mentions Square and Menufy only as comparison examples and explicitly disclaims a partnership.
- Moves StagePulse Map and the phosphene simulator into a lower Builder Proof section.
- Removes the daily AI-news workflow and GenPromptly from the homepage and commercial Demo Gallery journey.

## YouTube preparation

- Adds empty channel, featured-video, title, and thumbnail configuration fields.
- Adds responsive 16:9 cream-and-gold placeholders to the homepage and Demo Gallery.
- Makes no YouTube request while the URL is empty.
- When a valid URL is supplied, uses a user-initiated, privacy-enhanced `youtube-nocookie.com` embed.
- Updates the Privacy Policy to cover both Pre-Call and Builds & Tutorials video areas.

## Navigation and route cleanup

- Shared navigation is Services / Demos / Process / About / Book a Fit Call.
- Removes `projects.html` and all Projects references from shared navigation, footer, configuration, and sitemap.
- Adds the Demo Gallery to the sitemap.
- Preserves Booking, Pre-Call, Privacy Policy, Terms of Service, FormSubmit delivery, bilingual switching, consent controls, and the contractor redirect.

## Configuration still needed

- Add the future YouTube channel and featured video URLs in `assets/js/site-config.js` when available.
- GA4 and Meta remain disabled because their identifiers are empty.
- The current portrait remains until a preferred replacement is supplied.
- `images/og-editorial.jpg` remains an unrelated local deletion and is intentionally excluded from this revision.
