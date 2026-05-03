const siteConfig = window.siteConfig;

if (!siteConfig) {
  throw new Error("siteConfig must be loaded before site-components.js");
}

function getSitePrefix() {
  const pathname = decodeURIComponent(window.location.pathname).replaceAll("\\", "/");
  const segments = pathname.split("/").filter(Boolean);
  const rootIndex = segments.findIndex((segment) => segment.toLowerCase() === "kairuibi.com");
  const siteSegments = rootIndex >= 0 ? segments.slice(rootIndex + 1) : segments;
  const directoryDepth = Math.max(siteSegments.length - 1, 0);

  return directoryDepth ? "../".repeat(directoryDepth) : "";
}

const sitePrefix = getSitePrefix();

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resolveSitePath(path = "") {
  if (!path) {
    return "";
  }

  if (/^(?:[a-z]+:|#|\/\/)/i.test(path)) {
    return path;
  }

  return `${sitePrefix}${path}`;
}

function buildButton({ label, href, variant = "", disabledMessage = "", external = false }) {
  const className = ["btn", variant].filter(Boolean).join(" ");

  if (href) {
    const externalAttrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    const resolvedHref = external ? href : resolveSitePath(href);
    return `<a class="${className}" href="${escapeHtml(resolvedHref)}"${externalAttrs}>${escapeHtml(label)}</a>`;
  }

  return `<span class="${className} is-disabled" role="link" aria-disabled="true" title="${escapeHtml(
    disabledMessage
  )}">${escapeHtml(label)}</span>`;
}

function renderSocialLinks() {
  if (!siteConfig.socialLinks.length) {
    return "";
  }

  return siteConfig.socialLinks
    .map(
      (link) =>
        `<a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
          link.label
        )}</a>`
    )
    .join("");
}

function renderNav(current = "") {
  const links = siteConfig.portfolioNav
    .map((item) => {
      const activeClass = item.key === current ? " is-active" : "";
      return `<a class="nav-link${activeClass}" href="${escapeHtml(resolveSitePath(item.href))}" data-section-link="${escapeHtml(
        item.key
      )}">${escapeHtml(item.label)}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand-link" href="${resolveSitePath(siteConfig.routes.home)}">
          <span class="brand-mark">KB</span>
          <span class="brand-copy">
            <span class="brand-name">${siteConfig.ownerName}</span>
            <span class="brand-tag">${escapeHtml(siteConfig.roleLabel)}</span>
          </span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
        <nav class="site-nav" aria-label="Main navigation">
          ${links}
          ${buildButton({
            label: "LinkedIn",
            href: siteConfig.linkedInUrl,
            variant: "btn-primary",
            external: true
          })}
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  const socialLinks = renderSocialLinks();
  const resumeButton = buildButton({
    label: "Resume",
    href: siteConfig.resumeUrl,
    variant: "btn",
    disabledMessage: siteConfig.resumePlaceholder
  });

  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-panel reveal">
        <div class="footer-grid">
          <div>
              <p class="footer-brand">${siteConfig.ownerName}</p>
              <p class="footer-small">${escapeHtml(siteConfig.roleTagline)}</p>
              <p class="footer-small">AI demos, service packages, and contact.</p>
              <p class="footer-small">${escapeHtml(siteConfig.hiringStatus)}</p>
            </div>
            <div>
              <p class="footer-brand">Contact</p>
              <p class="footer-small"><a data-contact-link href="#"></a></p>
              <p class="footer-small"><span data-location></span></p>
            </div>
            <div>
              <p class="footer-brand">Links</p>
              <div class="footer-links">
                <a href="${resolveSitePath(`${siteConfig.routes.home}#services`)}">Services</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#demos`)}">Demos</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#xulan`)}">XuLan</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#thinking`)}">Thinking</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#publication`)}">Publication</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#booking`)}">Free Audit</a>
                <a href="${escapeHtml(siteConfig.linkedInUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="${resolveSitePath(siteConfig.routes.genpromptly)}">GenPromptly</a>
                <a href="${resolveSitePath(siteConfig.routes.privacy)}">Privacy</a>
                <a href="${resolveSitePath(siteConfig.routes.terms)}">Terms</a>
              </div>
            </div>
          </div>
          <div class="footer-actions">
            ${resumeButton}
            ${socialLinks ? `<div class="social-links">${socialLinks}</div>` : ""}
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderProductActions(mode = "full") {
  const actions = [];

  if (mode === "full") {
    actions.push(
      buildButton({
        label: "Try GenPromptly",
        href: siteConfig.genPromptly.tryUrl,
        variant: "btn-primary",
        disabledMessage: siteConfig.genPromptly.tryPlaceholder
      })
    );
  }

  if (siteConfig.genPromptly.subscribeUrl) {
    actions.push(
      buildButton({
        label: "Subscribe with Stripe",
        href: siteConfig.genPromptly.subscribeUrl
      })
    );
  }

  if (siteConfig.genPromptly.manageBillingUrl) {
    actions.push(
      buildButton({
        label: "Manage Billing",
        href: siteConfig.genPromptly.manageBillingUrl,
        variant: "btn-ghost"
      })
    );
  }

  const note = siteConfig.genPromptly.subscribeUrl || siteConfig.genPromptly.manageBillingUrl
    ? 'Live app and billing URLs are in <span class="inline-path">assets/js/site-config.js</span>.'
    : 'The live app URL is in <span class="inline-path">assets/js/site-config.js</span>. Billing links can be added later.';

  return `
    <div class="cta-row">
      <div class="button-row">${actions.join("")}</div>
      <p class="integration-note">${note}</p>
    </div>
  `;
}

class SiteNavbar extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") {
      return;
    }

    this.dataset.ready = "true";
    this.classList.add("site-navbar");
    this.innerHTML = renderNav(this.getAttribute("current") || "");

    const toggle = this.querySelector(".nav-toggle");
    toggle?.addEventListener("click", () => {
      const isOpen = this.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    this.querySelectorAll(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        this.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") {
      return;
    }

    this.dataset.ready = "true";
    this.innerHTML = renderFooter();
  }
}

function renderDemoVisual(demo) {
  if (demo.visualType === "stagepulse") {
    const levels = ["Level 1", "Level 2", "OMNIMAX"];
    const zones = [
      { name: "Main Stage", style: "left:18%;top:32%;" },
      { name: "Booths", style: "left:62%;top:28%;" },
      { name: "Food", style: "left:42%;top:68%;" },
      { name: "New Booth", style: "left:74%;top:58%;" }
    ];

    return `
      <div class="stagepulse-visual">
        <div class="stagepulse-shell">
          <div class="stagepulse-toolbar">
            <span class="stagepulse-brand">StagePulse Map</span>
            <span class="stagepulse-live">Live</span>
          </div>
          <div class="stagepulse-pill-row">
            ${levels
              .map((level, index) => `<span class="stagepulse-pill${index === 0 ? " is-active" : ""}">${escapeHtml(level)}</span>`)
              .join("")}
          </div>
          <div class="stagepulse-map">
            ${zones
              .map(
                (zone, index) => `
                  <button class="stagepulse-point point-${index + 1}" type="button" style="${zone.style}" aria-label="${escapeHtml(
                    zone.name
                  )}">
                    <span>${escapeHtml(zone.name)}</span>
                  </button>
                `
              )
              .join("")}
            <div class="stagepulse-bubble">
              <strong>New Booth</strong>
              <p>One tap to create a booth and post feedback.</p>
            </div>
          </div>
        </div>
        <div class="stagepulse-side">
          <article class="stagepulse-stat">
            <span class="detail-label">No login</span>
            <strong>Vote, comment, add booths</strong>
            <p>Built for fast event interaction in under 5 seconds.</p>
          </article>
          <article class="stagepulse-stat">
            <span class="detail-label">Live stack</span>
            <strong>Vercel + Supabase + Elastic</strong>
            <p>24-hour live data plus Elastic moderation and search-ready comments.</p>
          </article>
        </div>
        <p class="stagepulse-note">A venue comment layer that works for Science World now and any building later.</p>
      </div>
    `;
  }

  if (demo.visualType === "digest") {
    const [workflow, emailOne, emailTwo] = demo.images || [];

    return `
      <div class="digest-visual">
        <div class="digest-primary">
          <img src="${escapeHtml(resolveSitePath(workflow?.src || demo.image))}" alt="${escapeHtml(
            workflow?.alt || demo.imageAlt
          )}" />
        </div>
        <div class="digest-secondary">
          ${[emailOne, emailTwo]
            .filter(Boolean)
            .map(
              (image, index) => `
                <figure class="digest-email-card digest-email-${index + 1}">
                  <img src="${escapeHtml(resolveSitePath(image.src))}" alt="${escapeHtml(image.alt || demo.imageAlt)}" />
                </figure>
              `
            )
            .join("")}
        </div>
        <p class="digest-note">Daily AI signal from YouTube, podcasts, and other sources, sent as a compact email.</p>
      </div>
    `;
  }

  if (demo.visualType === "genpromptly") {
    const skills = [
      "Workflow Spec",
      "Email Pack",
      "Marketing Variants",
      "Video Script",
      "Image to Prompt",
      "Compliance Review"
    ];

    return `
      <div class="promptly-visual">
        <div class="promptly-surface">
          <div class="promptly-header">
            <div>
              <span class="promptly-brand">GenPromptly</span>
              <p>Makes prompts clearer, structured, and easier to review.</p>
            </div>
            <div class="promptly-actions">
              <span class="promptly-btn is-primary">Start Free</span>
              <span class="promptly-btn">View Pricing</span>
              <span class="promptly-btn">Sign In</span>
              <span class="promptly-btn">Create Prompt</span>
            </div>
          </div>
          <div class="promptly-block">
            <span class="promptly-label">Who It Is For</span>
            <p>For teams that need repeatable prompt quality.</p>
          </div>
          <div class="promptly-skill-grid">
            ${skills
              .map(
                (skill) => `
                  <article class="promptly-skill-card">
                    <strong>${escapeHtml(skill)}</strong>
                    <p>Sharper structure for a practical prompt workflow.</p>
                  </article>
                `
              )
              .join("")}
          </div>
          <div class="promptly-footer">
            <span class="promptly-plan">Free to try, with live access at GenPromptly.app.</span>
          </div>
        </div>
      </div>
    `;
  }

  if (demo.visualType === "phosphene") {
    const devices = [
      { label: "AlphaAMS", note: "coarse prosthetic field" },
      { label: "ArgusII", note: "retinal implant output" },
      { label: "PRIMA", note: "central vision simulation" }
    ];

    return `
      <div class="phosphene-visual">
        <div class="phosphene-grid">
          ${devices
            .map(
              (device, index) => `
                <article class="phosphene-device device-${index + 1}">
                  <span class="detail-label">Mode ${String(index + 1).padStart(2, "0")}</span>
                  <strong>${escapeHtml(device.label)}</strong>
                  <p>${escapeHtml(device.note)}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <p class="phosphene-note">Upload a JPG or PNG under 50 KB to compare simulated implant outputs.</p>
      </div>
    `;
  }

  return `<img src="${escapeHtml(resolveSitePath(demo.image))}" alt="${escapeHtml(demo.imageAlt)}" />`;
}

function renderDemoCards() {
  return siteConfig.demos
    .map(
      (demo, index) => `
        <article class="demo-card reveal${index === 0 ? " is-featured" : ""}" style="--reveal-delay:${index * 120}ms">
          <div class="demo-frame${demo.visualType ? " is-generated" : ""}">
            ${renderDemoVisual(demo)}
            <div class="demo-visual-meta">
              <span class="demo-visual-status">${escapeHtml(demo.status || demo.title)}</span>
            </div>
          </div>
          <div class="demo-copy">
            <div class="demo-heading">
              <h3>${escapeHtml(demo.title)}</h3>
              <p class="demo-summary">${escapeHtml(demo.impact)}</p>
            </div>
            <div class="demo-chip-row">
              ${(demo.tags || [])
                .map((tag) => `<span class="demo-chip">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>
            <div class="demo-list">
              <div class="demo-detail">
                <span class="detail-label">What it does</span>
                <p>${escapeHtml(demo.output || demo.workflow || demo.flow || "")}</p>
              </div>
              <div class="demo-detail is-output">
                <span class="detail-label">Best for</span>
                <p>${escapeHtml(demo.bestFor || demo.stack || "")}</p>
              </div>
            </div>
            ${
              demo.actionUrl || demo.extraActionUrl
                ? `<div class="button-row compact-row demo-actions">
                    ${
                      demo.actionUrl
                        ? buildButton({
                            label: demo.actionLabel || "Open",
                            href: demo.actionUrl,
                            variant: "btn-primary",
                            external: Boolean(demo.actionExternal)
                          })
                        : ""
                    }
                    ${
                      demo.extraActionUrl
                        ? buildButton({
                            label: demo.extraActionLabel || "More",
                            href: demo.extraActionUrl,
                            external: Boolean(demo.extraActionExternal)
                          })
                        : ""
                    }
                  </div>`
                : ""
            }
          </div>
        </article>
      `
    )
    .join("");
}

function applySiteTokens() {
  const bookingUrl = siteConfig.booking?.publicUrl || resolveSitePath(siteConfig.routes.booking);
  const bookingLabel = siteConfig.booking?.ctaLabel || "Book time";
  const bookingEmbedUrl = siteConfig.booking?.embedUrl || bookingUrl;
  const bookingSupportCopy = siteConfig.booking?.supportCopy || "";

  document.querySelectorAll("[data-contact-link]").forEach((element) => {
    if (element instanceof HTMLAnchorElement) {
      element.href = `mailto:${siteConfig.contactEmail}`;
      element.textContent = siteConfig.contactEmail;
    }
  });

  document.querySelectorAll("[data-contact-button]").forEach((element) => {
    if (element instanceof HTMLAnchorElement) {
      element.href = `mailto:${siteConfig.contactEmail}`;
    }
  });

  document.querySelectorAll("[data-location]").forEach((element) => {
    element.textContent = siteConfig.location;
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-social-links]").forEach((element) => {
    const markup = renderSocialLinks();
    if (!markup) {
      element.closest("[data-hide-if-empty]")?.classList.add("hide");
      return;
    }
    element.innerHTML = markup;
  });

  document.querySelectorAll("[data-product-actions]").forEach((element) => {
    const mode = element.getAttribute("data-product-actions") || "full";
    element.innerHTML = renderProductActions(mode);
  });

  document.querySelectorAll("[data-resume-button]").forEach((element) => {
    element.innerHTML = buildButton({
      label: "Resume",
      href: siteConfig.resumeUrl,
      disabledMessage: siteConfig.resumePlaceholder
    });
  });

  document.querySelectorAll("[data-linkedin-button]").forEach((element) => {
    element.innerHTML = buildButton({
      label: "LinkedIn",
      href: siteConfig.linkedInUrl,
      variant: element.getAttribute("data-variant") || "",
      external: true
    });
  });

  document.querySelectorAll("[data-booking-link]").forEach((element) => {
    if (element instanceof HTMLAnchorElement) {
      element.href = bookingUrl;
      element.textContent = element.dataset.label || bookingLabel;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  });

  document.querySelectorAll("[data-booking-label]").forEach((element) => {
    element.textContent = bookingLabel;
  });

  document.querySelectorAll("[data-booking-support]").forEach((element) => {
    element.textContent = bookingSupportCopy;
  });

  document.querySelectorAll("[data-booking-embed]").forEach((element) => {
    if (element instanceof HTMLIFrameElement) {
      element.src = bookingEmbedUrl;
    }
  });

  document.querySelectorAll("[data-hiring-status]").forEach((element) => {
    element.textContent = siteConfig.hiringStatus;
  });

  document.querySelectorAll("[data-role-tagline]").forEach((element) => {
    element.textContent = siteConfig.roleTagline;
  });

  document.querySelectorAll("[data-demo-grid]").forEach((element) => {
    element.innerHTML = renderDemoCards();
  });
}

function setupSectionObserver() {
  const links = Array.from(document.querySelectorAll("[data-section-link]"));
  const sections = Array.from(document.querySelectorAll("[data-section]"));

  if (!links.length || !sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  const linkBySection = new Map(
    links.map((link) => [link.getAttribute("data-section-link"), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach((link) => link.classList.remove("is-active"));
        linkBySection.get(entry.target.id)?.classList.add("is-active");
      });
    },
    { rootMargin: "-40% 0px -45% 0px", threshold: 0.05 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupRevealObserver() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

customElements.define("site-navbar", SiteNavbar);
customElements.define("site-footer", SiteFooter);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    applySiteTokens();
    setupSectionObserver();
    setupRevealObserver();
  });
} else {
  applySiteTokens();
  setupSectionObserver();
  setupRevealObserver();
}
