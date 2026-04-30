window.siteConfig = {
  ownerName: "Kairui Bi",
  roleLabel: "AI workflow builder",
  roleTagline: "I help local founders, creators, and small businesses turn repetitive research, follow-up, and content tasks into simple AI workflows.",
  location: "BC, Canada",
  contactEmail: "bia446635@gmail.com",
  founderImage: "images/about_selfie.jpg",
  hiringStatus: "Available for low-risk AI workflow audits, automation builds, and collaboration.",
  resumeUrl: "",
  resumePlaceholder: "Add your resume URL in assets/js/site-config.js.",
  linkedInUrl: "https://www.linkedin.com/in/kairui-bi-9913ab377/",
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
    { key: "publication", label: "Publication", href: "publications.html" },
    { key: "xulan", label: "XuLan", href: "index.html#xulan" },
    { key: "thinking", label: "AI Agent Thinking", href: "index.html#thinking" },
    { key: "about", label: "About / Resume", href: "index.html#about" },
    { key: "booking", label: "Free Audit", href: "booking.html" },
    { key: "contact", label: "Contact", href: "index.html#contact" }
  ],
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kairui-bi-9913ab377/"
    }
  ],
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
      problem: "Too much useful AI news is scattered across YouTube, podcasts, newsletters, and social feeds.",
      workflow: "Collect, filter, rank, summarize, and send one clean brief on a schedule.",
      output: "A daily email brief with links, takeaways, and the highest-priority updates.",
      bestFor: "Founders, creators, consultants, and small teams that want signal without doomscrolling.",
      impact: "One brief replaces a messy morning routine of checking tabs, feeds, and saved links.",
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
      problem: "Calls underperform when the team shows up with scattered notes and weak company context.",
      workflow: "Pull public context, summarize the company, and assemble a meeting-ready brief before the call.",
      output: "A pre-call brief with background, talking points, and useful follow-up prompts.",
      bestFor: "Founders, agencies, consultants, and sales teams with recurring discovery or client calls.",
      impact: "The workflow turns fragmented research into one brief a human can review in minutes.",
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
      problem: "Content takes too long when planning, asset generation, assembly, and publishing all happen manually.",
      workflow: "Choose a topic, draft the structure, generate assets, assemble the output, and queue publishing.",
      output: "A repeatable content system that produces draft-ready assets and a cleaner publishing handoff.",
      bestFor: "Creators, educators, and small brands producing repeatable weekly content.",
      impact: "One workflow reduces context switching across planning docs, generators, folders, and publishing tools.",
      proof: [
        { label: "Potential gain", value: "~50% faster content prep" },
        { label: "Throughput", value: "Repeatable weekly cadence" },
        { label: "Review model", value: "Human edit before publish" }
      ]
    },
    {
      key: "precall-briefing",
      title: "Client onboarding handoff",
      status: "Meeting preparation",
      image: "images/precall 1 cover.png",
      imageAlt: "Pre-call briefing visual with meeting preparation notes.",
      tags: ["Onboarding", "Expectation setting", "Workflow messaging"],
      problem: "New clients lose momentum when prep, expectations, and next steps are scattered across messages.",
      workflow: "Package context, explain the workflow, and prepare both sides before the conversation starts.",
      output: "A cleaner handoff with clearer expectations, meeting context, and next-step alignment.",
      bestFor: "Consultants, agencies, and founder-led teams that want smoother client conversations.",
      impact: "This kind of workflow reduces repeated explanations and makes the first meeting feel more prepared.",
      proof: [
        { label: "Pain removed", value: "Less back-and-forth" },
        { label: "Output", value: "Clear meeting handoff" },
        { label: "Best use", value: "Client-facing workflows" }
      ]
    },
    {
      key: "phosphene-simulator",
      title: "Interactive research demo",
      status: "Accessible vision demo",
      visualType: "phosphene",
      imageAlt: "Stylized visual for the Phosphene Vision Simulator.",
      tags: ["Pulse2Percept", "Assistive tech", "Vision simulation"],
      problem: "Some technical ideas are hard to explain until people can interact with a concrete visual output.",
      workflow: "Upload an image, generate multiple simulations, and compare outputs in one interface.",
      output: "A live browser demo that makes a specialized research concept easier to understand.",
      bestFor: "Researchers, educators, and product teams that need interactive explanation instead of static slides.",
      impact: "It shows that I can turn technical systems into interfaces people can actually use and discuss.",
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
      problem: "Teams lose time when prompt drafting stays messy, inconsistent, and hard to review.",
      workflow: "Start with rough input, reshape it into a structured prompt, and keep the interface focused on one job.",
      output: "A lightweight product for cleaner prompt drafting, review, and reuse.",
      bestFor: "Small teams and solo builders that need repeatable prompt quality instead of ad hoc copying and editing.",
      impact: "The product demonstrates clear scoping, product framing, and interface discipline around AI work.",
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
