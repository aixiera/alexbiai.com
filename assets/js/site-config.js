window.siteConfig = {
  ownerName: "Kairui Bi",
  roleLabel: "Canadian local business systems builder",
  roleTagline: "Websites, lead capture, and practical automation for local businesses across Canada.",
  location: "BC, Canada",
  serviceArea: "Serving local businesses across Canada",
  contactEmail: "bia446635@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/kairui-bi-9913ab377/",

  routes: {
    home: "index.html",
    precall: "precall.html",
    booking: "booking.html",
    projects: "projects.html",
    publications: "publications.html",
    privacy: "legal/privacy.html",
    terms: "legal/terms.html"
  },

  navigation: [
    { key: "services", label: "Services", href: "index.html#services" },
    { key: "industries", label: "My Niche", href: "index.html#industries" },
    { key: "examples", label: "Demos", href: "demo_gallery.html" },
    { key: "precall", label: "Pre-Call", href: "precall.html" },
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "publications", label: "Publication", href: "publications.html" },
    { key: "about", label: "About", href: "index.html#about" }
  ],

  precall: {
    youtubeUrl: "",
    videoTitle: "What to expect from your Systems Checkup"
  },

  booking: {
    publicUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0czzh-VaKOKuwnCJw2I0bd0k3KESTbmkJfyQgNnnSI85QNXp9t2lGTQ0showPV_tvt9Vn9-N47",
    embedUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0czzh-VaKOKuwnCJw2I0bd0k3KESTbmkJfyQgNnnSI85QNXp9t2lGTQ0showPV_tvt9Vn9-N47?gv=true",
    ctaLabel: "Book a Free 15-Min Systems Checkup"
  },

  leadForm: {
    provider: "formsubmit",
    endpoint: "https://formsubmit.co/ajax/bia446635@gmail.com",
    subject: "New Systems Checkup inquiry from {{ name }}"
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
