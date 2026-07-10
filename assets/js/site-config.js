window.siteConfig = {
  ownerName: "Kairui Bi",
  roleLabel: "AI workflow builder",
  roleTagline: "Custom AI agents, small web apps, and fast Vercel launches.",
  location: "BC, Canada",
  contactEmail: "bia446635@gmail.com",
  hiringStatus: "Available for custom AI agent builds, web app design, and Vercel launches.",
  resumeUrl: "",
  resumePlaceholder: "Add your resume URL in assets/js/site-config.js.",
  linkedInUrl: "",
  routes: {
    home: "index.html",
    about: "About.html",
    publications: "publications.html",
    genpromptly: "genpromptly.html",
    projects: "projects.html",
    booking: "booking.html",
    contact: "contact.html",
    privacy: "legal/privacy.html",
    terms: "legal/terms.html",
    refund: "legal/refund.html"
  },
  portfolioNav: [
    { key: "intro", label: "Intro", href: "index.html#intro" },
    { key: "services", label: "Services", href: "index.html#services" },
    { key: "demos", label: "Demos", href: "index.html#demos" },
    { key: "process", label: "Process", href: "index.html#process" },
    { key: "thinking", label: "Thinking", href: "index.html#thinking" },
    { key: "publication", label: "Publication", href: "index.html#publication" },
    { key: "booking", label: "Free Audit", href: "index.html#booking" },
    { key: "contact", label: "Contact", href: "index.html#contact" }
  ],
  socialLinks: [],
  booking: {
    publicUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0czzh-VaKOKuwnCJw2I0bd0k3KESTbmkJfyQgNnnSI85QNXp9t2lGTQ0showPV_tvt9Vn9-N47",
    embedUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0czzh-VaKOKuwnCJw2I0bd0k3KESTbmkJfyQgNnnSI85QNXp9t2lGTQ0showPV_tvt9Vn9-N47?gv=true",
    ctaLabel: "Book the free 15-min AI workflow audit",
    supportCopy:
      "Use the embedded Google Appointment Schedule to pick a time, and use the direct link if you want to open it in a separate tab."
  },
  demos: [
    {
      key: "stagepulse-map",
      title: "StagePulse Map",
      status: "2nd place at HackerRivals",
      image: "images/stagepulse-scienceworld-level1.png",
      imageAlt: "StagePulse Map using the real Science World level map from the hackathon demo.",
      tags: ["Hackathon", "No login", "Live map"],
      problem: "Google Maps does not solve live interior feedback inside venues and buildings.",
      workflow: "Tap a spot, add a booth, comment, vote, and search feedback without logging in.",
      output: "A live venue map for location-based comments, votes, and moderated interior feedback.",
      bestFor: "Events, campuses, malls, museums, and any building that needs interior feedback.",
      impact: "Built in 6 hours at Science World and won 2nd place at Vancouver HackerRivals.",
      proof: [
        { label: "Result", value: "2nd place" },
        { label: "Build time", value: "6 hours" },
        { label: "Live layer", value: "24h data + Elastic moderation" }
      ],
      actionLabel: "Open live app",
      actionUrl: "https://stage-pulse-map.vercel.app/",
      actionExternal: true,
      extraActionLabel: "HackerRivals",
      extraActionUrl: "https://hackerrivals.com/",
      extraActionExternal: true
    },
    {
      key: "ai-digest",
      title: "Daily AI digest system",
      status: "Founder-ready research brief",
      visualType: "digest",
      image: "images/ai-digest-workflow.jpg",
      imageAlt: "n8n workflow that collects AI information from multiple sources and sends a daily email digest.",
      images: [
        {
          src: "images/ai-digest-workflow.jpg",
          alt: "Workflow view of the AI information digest automation."
        },
        {
          src: "images/ai-digest-email-1.jpg",
          alt: "Daily AI digest email with linked source highlights."
        },
        {
          src: "images/ai-digest-email-2.jpg",
          alt: "Another AI digest email showing curated video and news links."
        }
      ],
      tags: ["n8n", "Daily email", "Research workflow"],
      problem: "Useful AI updates are scattered across too many feeds.",
      workflow: "Collect, rank, summarize, and send one brief.",
      output: "A daily email with links and the top takeaways.",
      bestFor: "Founders and small teams that want signal without doomscrolling.",
      impact: "One brief replaces a messy morning of scanning tabs and feeds.",
      proof: [
        { label: "Potential gain", value: "~75% less manual scanning" },
        { label: "Delivery", value: "One email on a schedule" },
        { label: "Review model", value: "Human review stays possible" }
      ]
    },
    {
      key: "sales-copilot",
      title: "Pre-call brief system",
      status: "Meeting-ready research",
      image: "images/sale_summary_agent_new.png",
      imageAlt: "AI sales copilot that prepares a pre-call report from research inputs.",
      tags: ["Research", "Pre-call prep", "Client briefs"],
      problem: "Calls suffer when prep is scattered.",
      workflow: "Pull public context and turn it into one brief.",
      output: "A pre-call brief with background and talking points.",
      bestFor: "Founders, agencies, and sales teams with recurring calls.",
      impact: "It turns fragmented research into one fast review step.",
      proof: [
        { label: "Potential gain", value: "~60% faster prep" },
        { label: "Output", value: "One shareable brief" },
        { label: "Risk control", value: "Public-data-first research" }
      ]
    },
    {
      key: "asmr-generator",
      title: "Weekly content workflow",
      status: "Content automation",
      image: "images/n8n-asmr-screenshot.jpg",
      imageAlt: "n8n workflow for automated ASMR video generation and publishing.",
      tags: ["n8n", "Content drafting", "Publishing flow"],
      problem: "Content takes too long when every step is manual.",
      workflow: "Pick a topic, generate assets, assemble, and queue publish.",
      output: "A repeatable workflow for draft-ready weekly content.",
      bestFor: "Creators and small brands publishing on a schedule.",
      impact: "It cuts context switching across planning, assets, and publishing.",
      proof: [
        { label: "Potential gain", value: "~50% faster content prep" },
        { label: "Throughput", value: "Repeatable weekly cadence" },
        { label: "Review model", value: "Human edit before publish" }
      ]
    },
    {
      key: "phosphene-simulator",
      title: "Interactive research demo",
      status: "Accessible vision demo",
      image: "images/phosphenevisionsimulator.png",
      imageAlt: "Interactive phosphene vision simulator interface preview.",
      tags: ["Pulse2Percept", "Assistive tech", "Vision simulation"],
      problem: "Some technical ideas stay abstract until people can interact with them.",
      workflow: "Upload an image and compare multiple simulations.",
      output: "A browser demo for explaining a specialized research concept.",
      bestFor: "Researchers, educators, and technical product teams.",
      impact: "It turns a hard concept into something people can test and discuss.",
      proof: [
        { label: "Format", value: "Interactive browser demo" },
        { label: "Use case", value: "Technical explanation" },
        { label: "Strength", value: "Clearer visual learning" }
      ],
      actionLabel: "Open live demo",
      actionUrl: "https://aixiera.github.io/phosphene-web/",
      actionExternal: true
    },
    {
      key: "genpromptly",
      title: "GenPromptly",
      status: "Product experiment",
      visualType: "genpromptly",
      imageAlt: "GenPromptly web app preview.",
      tags: ["Prompt design", "Product UI", "Structured output"],
      problem: "Prompt drafting gets messy and hard to review.",
      workflow: "Turn rough input into a structured prompt.",
      output: "A lightweight product for cleaner prompt drafting and reuse.",
      bestFor: "Small teams and solo builders who want repeatable prompt quality.",
      impact: "It shows product thinking around a focused AI workflow.",
      proof: [
        { label: "Product angle", value: "One focused job" },
        { label: "Workflow benefit", value: "Cleaner prompt reuse" },
        { label: "Strength", value: "Service + product thinking" }
      ],
      actionLabel: "Open GenPromptly.app",
      actionUrl: "https://genpromptly.app/",
      actionExternal: true
    }
  ],
  genPromptly: {
    tryUrl: "https://genpromptly.app/",
    subscribeUrl: "",
    manageBillingUrl: "",
    paymentMode: "payment-links-first",
    tryPlaceholder: "https://genpromptly.app/",
    subscribePlaceholder: "Add your Stripe Payment Link in assets/js/site-config.js.",
    billingPlaceholder: "Add your Stripe Customer Portal or billing route in assets/js/site-config.js."
  }
};
