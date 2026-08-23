window.siteConfig = {
  ownerName: "Kairui Bi",
  roleLabel: "BC AI consultant & systems builder",
  roleTagline: "AI consulting and practical systems for businesses across British Columbia.",
  location: "BC, Canada",
  serviceArea: "Serving businesses across British Columbia",
  contactEmail: "bia446635@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/kairui-bi-9913ab377/",

  routes: {
    home: "index.html",
    precall: "precall.html",
    booking: "booking.html",
    privacy: "legal/privacy.html",
    terms: "legal/terms.html"
  },

  navigation: [
    { key: "services", label: "Services", href: "index.html#services" },
    { key: "examples", label: "Demos", href: "demo_gallery.html" },
    { key: "process", label: "Process", href: "index.html#process" },
    { key: "about", label: "About", href: "index.html#about" }
  ],

  precall: {
    youtubeUrl: "",
    videoTitle: "What to expect from your Fit Call"
  },

  youtube: {
    channelUrl: "",
    featuredVideoUrl: "",
    featuredVideoTitle: "Builds & Tutorials with Kairui Bi",
    thumbnailUrl: ""
  },

  booking: {
    publicUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0czzh-VaKOKuwnCJw2I0bd0k3KESTbmkJfyQgNnnSI85QNXp9t2lGTQ0showPV_tvt9Vn9-N47",
    embedUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0czzh-VaKOKuwnCJw2I0bd0k3KESTbmkJfyQgNnnSI85QNXp9t2lGTQ0showPV_tvt9Vn9-N47?gv=true",
    ctaLabel: "Book a Free 15-Min Fit Call"
  },

  leadForm: {
    provider: "formsubmit",
    endpoint: "https://formsubmit.co/ajax/bia446635@gmail.com",
    subject: "New Fit Call inquiry from {{ name }}"
  },

  chatbot: {
    enabled: true,
    widgetUrl: "https://kairuibi-ai-guide.vercel.app/widget"
  },

  analytics: {
    gaMeasurementId: "",
    metaPixelId: ""
  },

  campaignDefaults: {
    source: "website",
    medium: "organic"
  }
};
