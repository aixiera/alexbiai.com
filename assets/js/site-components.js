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
const LANGUAGE_STORAGE_KEY = "kb-site-language";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = new Set(["en", "zh"]);

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.has(stored) ? stored : null;
  } catch {
    return null;
  }
}

let currentLanguage = readStoredLanguage() || DEFAULT_LANGUAGE;

const TEXT = {
  "ui.chooseLanguage": {
    en: "Choose your language",
    zh: "请选择语言"
  },
  "ui.chooseLanguageBody": {
    en: "Pick English or 中文 before you enter. You can switch again anytime from the top-left corner.",
    zh: "进入前请选择 English 或 中文。进入网站后，你也可以随时在左上角切换。"
  },
  "ui.english": {
    en: "English",
    zh: "English"
  },
  "ui.chinese": {
    en: "中文",
    zh: "中文"
  },
  "ui.languageShortEn": {
    en: "EN",
    zh: "EN"
  },
  "ui.languageShortZh": {
    en: "中文",
    zh: "中文"
  },
  "ui.languageSwitch": {
    en: "Language switcher",
    zh: "语言切换"
  },
  "nav.intro": { en: "Intro", zh: "首页" },
  "nav.services": { en: "Services", zh: "服务" },
  "nav.demos": { en: "Demos", zh: "作品" },
  "nav.xulan": { en: "XuLan", zh: "序蓝" },
  "nav.thinking": { en: "Thinking", zh: "智能体思考" },
  "nav.publication": { en: "Publication", zh: "论文" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.booking": { en: "Free Audit", zh: "免费诊断" },
  "nav.contact": { en: "Contact", zh: "联系" },
  "nav.menu": { en: "Menu", zh: "菜单" },
  "nav.menuAria": { en: "Toggle navigation", zh: "切换导航" },
  "nav.mainAria": { en: "Main navigation", zh: "主导航" },
  "site.roleLabel": { en: "AI workflow builder", zh: "AI 流程搭建" },
  "site.roleTagline": {
    en: "Custom AI agents, small web apps, and fast Vercel launches.",
    zh: "定制 AI 智能体、小型 Web 应用，以及快速 Vercel 上线。"
  },
  "site.hiringStatus": {
    en: "Available for custom AI agent builds, web app design, and Vercel launches.",
    zh: "可承接定制 AI 智能体、Web 应用设计与 Vercel 上线部署。"
  },
  "footer.line": {
    en: "AI demos, service packages, and contact.",
    zh: "AI 作品、服务方案与联系入口。"
  },
  "footer.contact": { en: "Contact", zh: "联系" },
  "footer.links": { en: "Links", zh: "链接" },
  "footer.services": { en: "Services", zh: "服务" },
  "footer.demos": { en: "Demos", zh: "作品" },
  "footer.xulan": { en: "XuLan", zh: "序蓝" },
  "footer.thinking": { en: "Thinking", zh: "思考" },
  "footer.publication": { en: "Publication", zh: "论文" },
  "footer.audit": { en: "Free Audit", zh: "免费诊断" },
  "footer.privacy": { en: "Privacy", zh: "隐私" },
  "footer.terms": { en: "Terms", zh: "条款" },
  "button.resume": { en: "Resume", zh: "简历" },
  "button.tryGenPromptly": { en: "Try GenPromptly", zh: "试用 GenPromptly" },
  "button.subscribeStripe": { en: "Subscribe with Stripe", zh: "通过 Stripe 订阅" },
  "button.manageBilling": { en: "Manage Billing", zh: "管理账单" },
  "product.noteLiveOnly": {
    en: 'The live app URL is in <span class="inline-path">assets/js/site-config.js</span>. Billing links can be added later.',
    zh: '在线应用链接写在 <span class="inline-path">assets/js/site-config.js</span> 里，账单链接后续可再补充。'
  },
  "product.noteBilling": {
    en: 'Live app and billing URLs are in <span class="inline-path">assets/js/site-config.js</span>.',
    zh: '在线应用与账单链接都写在 <span class="inline-path">assets/js/site-config.js</span> 里。'
  },
  "booking.cta": {
    en: "Book the free 15-min AI workflow audit",
    zh: "预约免费 15 分钟 AI 流程诊断"
  },
  "booking.support": {
    en: "Use the embedded Google Appointment Schedule to pick a time, and use the direct link if you want to open it in a separate tab.",
    zh: "可直接使用嵌入的 Google 预约日历选时间；如果你想单独打开，也可以使用直达链接。"
  },
  "home.title": {
    en: "Kairui Bi | AI Workflow Builder for Founders, Creators, and Small Businesses",
    zh: "Kairui Bi | 面向创业者、创作者与小团队的 AI 流程搭建"
  },
  "home.description": {
    en: "Kairui Bi builds custom AI agents, small web apps, and fast Vercel launches for practical workflows.",
    zh: "Kairui Bi 为真实业务流程搭建定制 AI 智能体、小型 Web 应用与快速 Vercel 上线方案。"
  },
  "home.heroEyebrow": { en: "AI Workflow Services / Kairui Bi", zh: "AI 流程服务 / Kairui Bi" },
  "home.heroKicker": { en: "N8N / AI AGENTS / GITHUB / VERCEL", zh: "N8N / AI 智能体 / GITHUB / VERCEL" },
  "home.heroTitle": { en: "Custom AI agents. Compact web apps.", zh: "定制 AI 智能体。小而精的 Web 应用。" },
  "home.heroSubtitle": {
    en: "I help founders, creators, and small businesses turn repetitive research, follow-up, and content work into practical AI workflows.",
    zh: "我帮助创业者、创作者和小团队，把重复的调研、跟进与内容工作，整理成真正能落地的 AI 流程。"
  },
  "home.heroDescription": {
    en: "Built with n8n or focused GitHub + Vercel apps. Small scope, clear function, clean launch.",
    zh: "可用 n8n 搭建，也可做聚焦型 GitHub + Vercel Web 应用。范围小、功能清楚、上线干净。"
  },
  "home.heroPrimary": { en: "Book a free 15-min AI workflow audit", zh: "预约免费 15 分钟 AI 流程诊断" },
  "home.heroSecondary": { en: "View services", zh: "查看服务" },
  "home.heroProof1": { en: "n8n workflows", zh: "n8n 工作流" },
  "home.heroProof2": { en: "GitHub + Vercel", zh: "GitHub + Vercel" },
  "home.heroProof3": { en: "Human review", zh: "人工复核" },
  "home.heroProof4": { en: "Fast launch", zh: "快速上线" },
  "home.heroScroll": { en: "Services, demos, publication, contact.", zh: "服务、作品、论文与联系入口。" },
  "home.featuredLabel": { en: "Featured visual", zh: "重点展示" },
  "home.featuredCaption": {
    en: "Real Science World map asset from the 2nd-place hackathon build.",
    zh: "来自二等奖黑客松作品的真实 Science World 地图素材。"
  },
  "home.stageMini1Label": { en: "n8n agents", zh: "n8n 智能体" },
  "home.stageMini1Body": { en: "Custom automations for real tasks.", zh: "围绕真实任务搭建定制自动化。" },
  "home.founderRole": { en: "AI workflow builder", zh: "AI 流程搭建" },
  "home.stageMini2Label": { en: "Build style", zh: "搭建方式" },
  "home.stageMini2Body": { en: "Compact tools, clear inputs, usable outputs.", zh: "工具紧凑、输入清楚、输出可直接使用。" },
  "home.servicesEyebrow": { en: "Services", zh: "服务" },
  "home.servicesHeading": { en: "What I offer.", zh: "我提供什么。" },
  "home.servicesIntro": {
    en: "Custom AI agent builds through n8n, plus focused GitHub + Vercel web app design and installation.",
    zh: "通过 n8n 搭建定制 AI 智能体，也承接聚焦型 GitHub + Vercel Web 应用设计与部署。"
  },
  "home.approachLabel": { en: "Approach", zh: "方法" },
  "home.approachBody": { en: "One job. Small scope. Clean launch.", zh: "一个任务，小范围，干净上线。" },
  "home.serviceFocusLabel": { en: "Service focus", zh: "服务重点" },
  "home.serviceFocusPill": { en: "Practical", zh: "务实" },
  "home.serviceFocusTitle": { en: "Build only what is needed.", zh: "只做真正需要的部分。" },
  "home.serviceFocusBody": {
    en: "I start with one repetitive task, one useful output, and one clean deployment path.",
    zh: "我会先从一个重复任务、一个有用输出，以及一条清楚的部署路径开始。"
  },
  "home.serviceFocusPrimary": { en: "View service packages", zh: "查看服务方案" },
  "home.serviceFocusSecondary": { en: "Start by email", zh: "先发邮件沟通" },
  "home.demosEyebrow": { en: "Demos", zh: "作品" },
  "home.demosHeading": { en: "What I build.", zh: "我做什么。" },
  "home.demosIntro": { en: "Service packages first. Live examples below.", zh: "先看服务方案，再看实际作品。" },
  "home.exampleLabel": { en: "Example builds", zh: "示例作品" },
  "home.exampleBody": { en: "These demos show the kind of tools, workflows, and product surfaces I can ship.", zh: "这些作品展示了我能设计、搭建并上线的工具、流程和产品界面。" },
  "service.card1.label": { en: "Service 01", zh: "服务 01" },
  "service.card1.title": { en: "Custom n8n AI agent", zh: "定制 n8n AI 智能体" },
  "service.card1.body": { en: "Build one custom AI agent around a real task.", zh: "围绕一个真实任务，搭建一套定制 AI 智能体。" },
  "service.card1.li1": { en: "Map the trigger and output.", zh: "先梳理触发点与输出结果。" },
  "service.card1.li2": { en: "Connect forms, sheets, email, or APIs.", zh: "连接表单、表格、邮件或 API。" },
  "service.card1.li3": { en: "Keep review in the loop.", zh: "保留人工复核环节。" },
  "service.card1.note": { en: "Best for: follow-up, research, summaries, and ops.", zh: "适合：跟进、调研、摘要与运营流程。" },
  "service.card2.label": { en: "Service 02", zh: "服务 02" },
  "service.card2.title": { en: "Local web app design", zh: "本地 Web 应用设计" },
  "service.card2.body": { en: "Design a focused web app around one workflow.", zh: "围绕一条清晰流程，设计一个聚焦型 Web 应用。" },
  "service.card2.li1": { en: "Build the UI around one clear job.", zh: "让界面只服务于一个清楚任务。" },
  "service.card2.li2": { en: "Keep the scope small and usable.", zh: "控制范围，让产品真正可用。" },
  "service.card2.li3": { en: "Ship a clean GitHub handoff.", zh: "提供干净的 GitHub 交付。" },
  "service.card2.note": { en: "Best for: internal tools, demos, and AI utilities.", zh: "适合：内部工具、Demo 与 AI 小应用。" },
  "service.card3.label": { en: "Service 03", zh: "服务 03" },
  "service.card3.title": { en: "GitHub + Vercel install", zh: "GitHub + Vercel 部署安装" },
  "service.card3.body": { en: "Set up, deploy, and hand off the app cleanly.", zh: "把应用搭好、部署好，并完成清晰交付。" },
  "service.card3.li1": { en: "Prepare the repo, env, and deploy flow.", zh: "整理仓库、环境变量与部署流程。" },
  "service.card3.li2": { en: "Launch on Vercel with simple updates.", zh: "在 Vercel 上线，并保持后续更新简单。" },
  "service.card3.li3": { en: "Keep the local setup easy to maintain.", zh: "让本地环境便于维护。" },
  "service.card3.note": { en: "Best for: founders, creators, and small teams shipping fast.", zh: "适合：创业者、创作者与需要快速上线的小团队。" },
  "home.xulanEyebrow": { en: "XuLan", zh: "序蓝" },
  "home.xulanHeading": { en: "Public AI notes and tutorials.", zh: "公开的 AI 笔记与教程。" },
  "home.xulanIntro": { en: "XuLan is the public identity for my AI automation notes, source packs, and workflow tutorials.", zh: "序蓝是我公开发布 AI 自动化笔记、资料包和工作流教程的内容身份。" },
  "home.xulanWhat": { en: "What it is", zh: "它是什么" },
  "home.xulanLayer": { en: "Public layer", zh: "公开内容" },
  "home.xulanTitle": { en: "Notes, tutorials, and AI study in public.", zh: "把 AI 学习、教程与思考公开出来。" },
  "home.xulanLi1": { en: "Workflow notes and AI essays.", zh: "工作流笔记与 AI 文章。" },
  "home.xulanLi2": { en: "Source packs and public folders.", zh: "资料包与公开资源文件夹。" },
  "home.xulanLi3": { en: "Short tutorials and updates.", zh: "简短教程与持续更新。" },
  "home.xulanLinks": { en: "Links", zh: "链接" },
  "home.xulanChannels": { en: "Channels", zh: "渠道" },
  "home.xulanBody": { en: "Follow XuLan across video, notes, and public resources.", zh: "可以通过视频、笔记与公开资料持续关注序蓝。" },
  "home.thinkingEyebrow": { en: "AI Agent Thinking", zh: "AI 智能体思考" },
  "home.thinkingHeading": { en: "How I think about agents.", zh: "我如何理解智能体。" },
  "home.thinkingIntro": { en: "I treat agents as scoped workflow systems, not vague magic.", zh: "我把智能体看成有边界的流程系统，而不是模糊的魔法。" },
  "home.thinking1Title": { en: "One job first", zh: "先把一件事做好" },
  "home.thinking1Body": { en: "Good agents should do one clear job well.", zh: "好的智能体，应该先把一个明确任务做扎实。" },
  "home.thinking2Title": { en: "Human review stays visible", zh: "人工复核必须可见" },
  "home.thinking2Body": { en: "Outputs should stay easy to check, edit, and trust.", zh: "输出必须方便检查、修改，也更容易建立信任。" },
  "home.thinking3Title": { en: "Context matters", zh: "上下文很重要" },
  "home.thinking3Body": { en: "Useful systems turn scattered information into usable context.", zh: "有用的系统会把分散信息整理成可用上下文。" },
  "home.thinking4Title": { en: "Launch small", zh: "从小规模上线" },
  "home.thinking4Body": { en: "Small, usable systems beat oversized AI promises.", zh: "小而可用的系统，比夸大的 AI 承诺更有价值。" },
  "home.publicationEyebrow": { en: "Publication", zh: "论文" },
  "home.publicationHeading": { en: "Research and publication.", zh: "研究与论文。" },
  "home.publicationIntro": { en: "I also have a Proc. SPIE publication comparing CNN models and a Swin Transformer for facial expression recognition.", zh: "我还有一篇 Proc. SPIE 论文，比较了多种 CNN 模型与 Swin Transformer 在表情识别上的表现。" },
  "home.paperLabel": { en: "Paper", zh: "论文" },
  "home.paperTitle": { en: "Facial expression recognition model comparison.", zh: "表情识别模型对比研究。" },
  "home.paperBody": { en: "MobileNetV2, VGG-16, ResNet, and Swin Transformer compared on FER2013.", zh: "在 FER2013 数据集上比较 MobileNetV2、VGG-16、ResNet 与 Swin Transformer。" },
  "home.paperLi1": { en: "Published in Proceedings of SPIE.", zh: "发表于 Proceedings of SPIE。" },
  "home.paperLi2": { en: "CNN vs transformer tradeoffs.", zh: "比较 CNN 与 Transformer 的取舍。" },
  "home.paperLi3": { en: "Useful research foundation.", zh: "也是我后续实践的研究基础。" },
  "home.readMoreLabel": { en: "Read more", zh: "继续阅读" },
  "home.fullPagePill": { en: "Full page", zh: "详情页" },
  "home.publicationBody": { en: "Open the full publication page for the abstract, method, and related demo.", zh: "可打开完整论文页面，查看摘要、方法和相关 Demo。" },
  "home.viewPublication": { en: "View publication", zh: "查看论文" },
  "home.readSPIE": { en: "Read at SPIE", zh: "前往 SPIE" },
  "home.aboutEyebrow": { en: "About", zh: "关于" },
  "home.aboutHeading": { en: "Background and fit.", zh: "背景与适配方向。" },
  "home.aboutIntro": { en: "I focus on practical AI systems, usable interfaces, and clear output.", zh: "我关注的是实用 AI 系统、可用界面，以及清楚的输出结构。" },
  "home.profileLabel": { en: "Profile", zh: "定位" },
  "home.focusPill": { en: "Focus", zh: "重点" },
  "home.profileTitle": { en: "AI agents, product demos, and web tools.", zh: "AI 智能体、产品 Demo 与 Web 工具。" },
  "home.profileLi1": { en: "AI-agent workflows for research, meeting prep, and content automation.", zh: "为调研、会议准备与内容自动化搭建 AI 智能体流程。" },
  "home.profileLi2": { en: "Small interfaces that explain the workflow clearly.", zh: "通过小而清楚的界面，把流程解释清楚。" },
  "home.profileLi3": { en: "Best fit: AI products, tooling, and user-facing utilities.", zh: "最适合：AI 产品、工具类系统与面向用户的小应用。" },
  "home.backgroundLabel": { en: "Background", zh: "背景" },
  "home.studyPill": { en: "Study", zh: "学习" },
  "home.backgroundLi1": { en: "IB student focused on AI agents and data science.", zh: "IB 学生，关注 AI 智能体与数据科学。" },
  "home.backgroundLi2": { en: "AP Physics C tutor at Compass Point Educators since January 2025.", zh: "自 2025 年 1 月起，在 Compass Point Educators 担任 AP Physics C 导师。" },
  "home.backgroundLi3": { en: "IB student with additional data processing study at Neoschool.", zh: "同时在 Neoschool 进行数据处理相关学习。" },
  "home.backgroundLi4": { en: "Builder of demos that turn AI ideas into practical workflows.", zh: "持续搭建能把 AI 想法落成实际流程的 Demo。" },
  "home.contactEyebrow": { en: "Contact", zh: "联系" },
  "home.contactHeading": { en: "Contact and booking.", zh: "联系与预约。" },
  "home.contactIntro": { en: "Start with a short audit or send the workflow idea by email.", zh: "你可以先预约一次简短诊断，或直接把流程想法发邮件给我。" },
  "home.contactStart": { en: "Start here", zh: "从这里开始" },
  "home.contactFree": { en: "Free 15 min", zh: "免费 15 分钟" },
  "home.contactEmail": { en: "Email", zh: "邮箱" },
  "home.contactLocation": { en: "Location", zh: "地点" },
  "home.contactStatus": { en: "Status", zh: "状态" },
  "home.contactPrimary": { en: "Book a free 15-min AI workflow audit", zh: "预约免费 15 分钟 AI 流程诊断" },
  "home.contactSecondary": { en: "Email workflow details", zh: "邮件发送流程需求" },
  "home.riskBanner": { en: "Low-risk workflows only: no sensitive customer data, no password sharing, and review stays in the loop.", zh: "仅承接低风险流程：不接触敏感客户数据、不共享密码，并保留人工复核环节。" },
  "home.fitTitle": { en: "Good first fit", zh: "适合先聊的方向" },
  "home.fitBody": { en: "Research, pre-call prep, follow-up, summaries, and simple AI utilities.", zh: "调研、会前准备、跟进、摘要，以及简单 AI 工具。" },
  "home.auditTitle": { en: "What the audit covers", zh: "诊断会聊什么" },
  "home.auditBody": { en: "We map one task and decide if automation is worth building.", zh: "我们会一起拆解一个任务，并判断它值不值得自动化。" },
  "home.bookingLabel": { en: "Booking", zh: "预约" },
  "home.googleMeet": { en: "Google Meet", zh: "Google Meet" },
  "home.bookingTitle": { en: "Use the booking page for the scheduler.", zh: "使用预约页面查看时间表。" },
  "home.bookingBody": { en: "The booking page uses your Google Appointment Schedule embed, with a direct fallback link.", zh: "预约页面已经接入 Google 预约日历，也保留了直达链接作为备用。" },
  "home.bookingPrimary": { en: "Open booking page", zh: "打开预约页" },
  "home.bookingSecondary": { en: "Review services", zh: "回看服务" },
  "home.bookingLi1": { en: "Free 15-minute workflow audit.", zh: "免费 15 分钟流程诊断。" },
  "home.bookingLi2": { en: "One repetitive process mapped into a clear next step.", zh: "把一个重复流程拆成清楚的下一步。" },
  "home.bookingLi3": { en: "Low-risk scope with human review still in the loop.", zh: "保持低风险范围，并保留人工复核。" },
  "booking.title": { en: "Book a Free 15-min AI Workflow Audit | Kairui Bi", zh: "预约免费 15 分钟 AI 流程诊断 | Kairui Bi" },
  "booking.description": { en: "Book a free 15-minute AI workflow audit with Kairui Bi for research, follow-up, and content automation ideas.", zh: "预约 Kairui Bi 的免费 15 分钟 AI 流程诊断，讨论调研、跟进与内容自动化想法。" },
  "booking.label": { en: "Booking", zh: "预约" },
  "booking.titleBody": { en: "Book a free 15-min AI workflow audit.", zh: "预约一次免费 15 分钟 AI 流程诊断。" },
  "booking.body": { en: "Pick a time below. If the embed does not load on your device, open the booking page in a new tab or email me directly.", zh: "请直接在下方选择时间。如果你的设备无法加载嵌入日历，可以新开标签页预约，或直接发邮件给我。" },
  "booking.newTab": { en: "Open booking in a new tab", zh: "在新标签页打开预约" },
  "booking.emailInstead": { en: "Email instead", zh: "改用邮件联系" },
  "projects.title": { en: "Projects | Kairui Bi", zh: "项目作品 | Kairui Bi" },
  "projects.description": { en: "Selected AI workflow and product projects from Kairui Bi.", zh: "Kairui Bi 的精选 AI 流程与产品项目作品。" },
  "projects.eyebrow": { en: "Projects", zh: "项目" },
  "projects.heading": { en: "Selected workflow and product work.", zh: "精选流程与产品作品。" },
  "projects.intro": { en: "Practical AI systems with clear jobs and usable outputs.", zh: "实用的 AI 系统，任务清楚，输出可用。" },
  "projects.liveDemo": { en: "Live demo", zh: "在线 Demo" },
  "projects.liveBody": { en: "StagePulse Map is a no-login venue feedback app built in 6 hours with Vercel, Supabase, and Elastic.", zh: "StagePulse Map 是一个无需登录的场馆反馈应用，用 6 小时完成，技术栈为 Vercel、Supabase 和 Elastic。" },
  "projects.demoList": { en: "Demo list", zh: "作品列表" },
  "projects.demoHeading": { en: "Service packages and project examples.", zh: "服务方案与项目示例。" },
  "projects.demoIntro": { en: "Service cards first. Example projects below.", zh: "先看服务卡片，再看具体项目。" },
  "projects.exampleLabel": { en: "Example builds", zh: "示例作品" },
  "projects.exampleBody": { en: "These demos show the kind of products and workflow systems I can design, build, and launch.", zh: "这些作品展示了我能设计、搭建并上线的产品与流程系统。" },
  "gallery.title": { en: "Demo Gallery | Kairui Bi", zh: "作品展示 | Kairui Bi" },
  "gallery.description": { en: "Compact AI demos and service packages from Kairui Bi.", zh: "Kairui Bi 的紧凑型 AI 作品与服务方案。" },
  "gallery.eyebrow": { en: "Demo gallery", zh: "作品展示" },
  "gallery.heading": { en: "Compact demos. Clear links.", zh: "作品简洁，链接清楚。" },
  "gallery.intro": { en: "Service packages first. Live builds below.", zh: "先看服务方案，再看在线作品。" },
  "gallery.featured": { en: "Featured", zh: "重点项目" },
  "gallery.featuredBody": { en: "StagePulse Map won 2nd place at Vancouver HackerRivals and turns interior space into live feedback.", zh: "StagePulse Map 在 Vancouver HackerRivals 获得第二名，把室内空间变成实时反馈层。" },
  "gallery.openStagePulse": { en: "Open StagePulse Map", zh: "打开 StagePulse Map" },
  "gallery.viewHomepageDemos": { en: "View homepage demos", zh: "查看主页作品" },
  "gallery.allDemos": { en: "All demos", zh: "全部作品" },
  "gallery.allHeading": { en: "Service packages and demo builds.", zh: "服务方案与 Demo 作品。" },
  "gallery.allIntro": { en: "Short service cards first. Live examples below.", zh: "先看精简服务卡片，再看在线示例。" },
  "gallery.exampleLabel": { en: "Example builds", zh: "示例作品" },
  "gallery.exampleBody": { en: "These demos show the kind of products and workflow systems I can design, build, and launch.", zh: "这些作品展示了我能设计、搭建并上线的产品与流程系统。" },
  "publication.title": { en: "Publication | Kairui Bi", zh: "论文 | Kairui Bi" },
  "publication.description": { en: "Research publication by Kairui Bi on facial expression recognition.", zh: "Kairui Bi 关于表情识别的研究论文。" },
  "publication.heroEyebrow": { en: "Publication / Research", zh: "论文 / 研究" },
  "publication.heroKicker": { en: "Computer vision / FER2013 / Proc. SPIE", zh: "计算机视觉 / FER2013 / Proc. SPIE" },
  "publication.heroTitle": { en: "A comparative study on facial expression recognition using MobileNetV2, VGG-16, ResNet and Swin Transformer", zh: "基于 MobileNetV2、VGG-16、ResNet 与 Swin Transformer 的表情识别对比研究" },
  "publication.heroSubtitle": { en: "Published in Proceedings of SPIE Volume 13545.", zh: "发表于 Proceedings of SPIE 第 13545 卷。" },
  "publication.heroDescription": { en: "CNN facial-expression models compared with a Swin Transformer on FER2013.", zh: "在 FER2013 数据集上，对 CNN 表情识别模型与 Swin Transformer 进行了比较。" },
  "publication.readSPIE": { en: "Read at SPIE", zh: "前往 SPIE" },
  "publication.backPortfolio": { en: "Back to portfolio", zh: "返回作品集" },
  "publication.openPhosphene": { en: "Open phosphene demo", zh: "打开磷光点 Demo" },
  "publication.detailsLabel": { en: "Paper details", zh: "论文信息" },
  "publication.detailLi1": { en: "Published: 3 March 2025.", zh: "发表时间：2025 年 3 月 3 日。" },
  "publication.detailLi2": { en: "Proceedings Volume 13545, ICANCT 2024.", zh: "Proceedings 第 13545 卷，ICANCT 2024。" },
  "publication.detailLi3": { en: "Conference context: Wuhan, China.", zh: "会议地点：中国武汉。" },
  "publication.detailLi4": { en: "DOI: 10.1117/12.3060400.", zh: "DOI：10.1117/12.3060400。" },
  "publication.signalLabel": { en: "Research signal", zh: "研究要点" },
  "publication.signalPill": { en: "Model comparison", zh: "模型对比" },
  "publication.datasetLabel": { en: "Dataset", zh: "数据集" },
  "publication.datasetBody": { en: "FER2013, 48x48 images, 7 emotion classes, and augmentation.", zh: "FER2013，48x48 图像，7 类情绪，并包含数据增强。" },
  "publication.evalLabel": { en: "Evaluation", zh: "评估指标" },
  "publication.evalBody": { en: "Accuracy, F1, precision, recall, loss, and confusion matrices.", zh: "准确率、F1、精确率、召回率、损失和混淆矩阵。" },
  "publication.fitLabel": { en: "Why it fits here", zh: "为何放在这里" },
  "publication.fitBody": { en: "It connects research discipline with practical AI systems and interfaces.", zh: "它把研究训练和实际 AI 系统、界面搭建联系了起来。" },
  "publication.glanceEyebrow": { en: "At a glance", zh: "快速概览" },
  "publication.glanceHeading": { en: "Short paper summary.", zh: "论文简述。" },
  "publication.glanceIntro": { en: "CNN backbones and a transformer compared under one FER setup.", zh: "在同一套 FER 实验设置下，对比 CNN 主干与 Transformer。" },
  "publication.metric1": { en: "model families across CNN and transformer approaches", zh: "覆盖 CNN 与 Transformer 的模型家族" },
  "publication.metric2": { en: "FER2013 emotion categories", zh: "FER2013 情绪类别" },
  "publication.metric3": { en: "input image size", zh: "输入图像尺寸" },
  "publication.metric4": { en: "training epochs with evaluation visuals", zh: "训练轮次与评估可视化" },
  "publication.summaryLabel": { en: "Summary", zh: "摘要" },
  "publication.summaryPill": { en: "Paper overview", zh: "论文概览" },
  "publication.summaryBody": { en: "This paper compares CNN local-feature extractors with a Swin Transformer's global-feature approach.", zh: "这篇论文比较了 CNN 的局部特征提取方式与 Swin Transformer 的全局特征方法。" },
  "publication.methodLabel": { en: "Method", zh: "方法" },
  "publication.methodPill": { en: "Evaluation setup", zh: "评估设置" },
  "publication.methodLi1": { en: "Pretrained MobileNetV2, VGG-16, ResNet, and Swin Transformer models.", zh: "使用预训练的 MobileNetV2、VGG-16、ResNet 与 Swin Transformer 模型。" },
  "publication.methodLi2": { en: "FER2013 benchmark with 48x48 images across 7 classes.", zh: "FER2013 基准数据集，48x48 图像，7 个类别。" },
  "publication.methodLi3": { en: "20+ training epochs with augmentation and visual review.", zh: "20 轮以上训练，并结合数据增强与可视化复核。" },
  "publication.methodLi4": { en: "Accuracy, F1, precision, recall, loss, and confusion matrices.", zh: "评估包括准确率、F1、精确率、召回率、损失和混淆矩阵。" },
  "publication.relatedEyebrow": { en: "Related demo", zh: "相关 Demo" },
  "publication.relatedHeading": { en: "A live experiment extending the site's vision work.", zh: "一个延伸视觉研究方向的在线实验。" },
  "publication.relatedIntro": { en: "The portfolio also includes a browser-based Phosphene Vision Simulator built with Pulse2Percept.", zh: "作品集中还包含一个基于 Pulse2Percept 的浏览器版磷光点视觉模拟器。" },
  "publication.demoLabel": { en: "Phosphene demo", zh: "磷光点 Demo" },
  "publication.demoPill": { en: "Live experiment", zh: "在线实验" },
  "publication.demoBody": { en: "This web demo lets users upload a JPG or PNG and generate AlphaAMS, ArgusII, and PRIMA simulations.", zh: "这个网页 Demo 允许用户上传 JPG 或 PNG，生成 AlphaAMS、ArgusII 与 PRIMA 模拟结果。" },
  "publication.demoLi1": { en: "Lightweight browser demo for comparing prosthetic vision outputs.", zh: "轻量级浏览器 Demo，用于比较义眼视觉输出。" },
  "publication.demoLi2": { en: "Upload guidance: keep files under 50 KB and avoid sensitive images.", zh: "上传建议：文件小于 50 KB，避免敏感图像。" },
  "publication.demoLi3": { en: "Shows scientific and assistive-tech interaction design.", zh: "展示了科研与辅助科技交互设计能力。" },
  "publication.openLiveDemo": { en: "Open live demo", zh: "打开在线 Demo" },
  "publication.contextLabel": { en: "Portfolio context", zh: "作品集语境" },
  "publication.contextPill": { en: "Why it belongs here", zh: "为什么放在这里" },
  "publication.contextBody": { en: "The publication and simulator show research-informed computer vision, interface clarity, and practical demo building.", zh: "这篇论文与模拟器一起展示了我在研究驱动的计算机视觉、界面清晰度以及实用 Demo 搭建上的能力。" },
  "publication.backDemoPortfolio": { en: "Back to demo portfolio", zh: "返回作品集" },
  "gen.title": { en: "GenPromptly | Kairui Bi", zh: "GenPromptly | Kairui Bi" },
  "gen.description": { en: "GenPromptly is a prompt-refinement project by Kairui Bi for turning rough prompts into clearer instructions.", zh: "GenPromptly 是 Kairui Bi 的提示词优化项目，用于把粗糙输入整理成更清楚的指令。" },
  "gen.heroEyebrow": { en: "Project detail", zh: "项目详情" },
  "gen.heroKicker": { en: "Prompt refinement / Product thinking / Structured output", zh: "提示词优化 / 产品思路 / 结构化输出" },
  "gen.heroSubtitle": { en: "A narrow prompt-refinement product inside the broader portfolio.", zh: "这是作品集里一个聚焦提示词优化的小产品。" },
  "gen.heroDescription": { en: "GenPromptly turns rough prompt drafts into clearer, reusable instructions without extra complexity.", zh: "GenPromptly 能把粗糙的提示词草稿整理成更清楚、可复用的指令，同时不增加额外复杂度。" },
  "gen.backDemos": { en: "Back to demos", zh: "返回作品" },
  "gen.productAccess": { en: "Product access", zh: "产品入口" },
  "gen.liveLabel": { en: "Live product", zh: "在线产品" },
  "gen.liveBody": { en: 'The live web app is available at <a class="back-link" href="https://genpromptly.app/" target="_blank" rel="noopener noreferrer">GenPromptly.app</a>.', zh: '在线版本可直接访问 <a class="back-link" href="https://genpromptly.app/" target="_blank" rel="noopener noreferrer">GenPromptly.app</a>。' },
  "gen.liveLi1": { en: "Shows product framing.", zh: "展示产品化思路。" },
  "gen.liveLi2": { en: "Turns vague requests into structured prompts.", zh: "把模糊需求整理成结构化提示词。" },
  "gen.liveLi3": { en: "Adds interface discipline to the portfolio.", zh: "也让作品集具备更完整的产品界面表达。" },
  "gen.overviewEyebrow": { en: "Overview", zh: "概览" },
  "gen.overviewHeading": { en: "A practical product for clearer prompts.", zh: "一个让提示词更清楚的实用产品。" },
  "gen.overviewIntro": { en: "One clear job: improve a prompt without adding complexity.", zh: "它只做一件清楚的事：在不增加复杂度的前提下优化提示词。" },
  "gen.card1Title": { en: "Start rough", zh: "从粗稿开始" },
  "gen.card1Body": { en: "GenPromptly starts from rough input.", zh: "GenPromptly 从粗糙输入开始处理。" },
  "gen.card2Title": { en: "Add structure", zh: "补足结构" },
  "gen.card2Body": { en: "It sharpens objective, tone, and boundaries.", zh: "它会把目标、语气与边界整理清楚。" },
  "gen.card3Title": { en: "Keep it reusable", zh: "保留复用性" },
  "gen.card3Body": { en: "The result is easier to save, adapt, and reuse.", zh: "结果更容易保存、调整与重复使用。" },
  "gen.card4Title": { en: "Stay focused", zh: "保持聚焦" },
  "gen.card4Body": { en: "The interface stays tool-like and focused.", zh: "界面保持工具感和聚焦感。" },
  "gen.exampleEyebrow": { en: "Example", zh: "示例" },
  "gen.exampleHeading": { en: "Input becomes easier to trust.", zh: "输入会变得更值得信任。" },
  "gen.exampleIntro": { en: "The value is clarity, not volume.", zh: "它的价值在于清晰，而不是堆砌文字。" },
  "gen.beforeLabel": { en: "Before", zh: "优化前" },
  "gen.beforePill": { en: "Draft", zh: "草稿" },
  "gen.beforeBody": { en: "help me write a prompt for product feedback and make it organized", zh: "帮我写一个关于产品反馈的 prompt，并且整理得更清楚" },
  "gen.afterLabel": { en: "After", zh: "优化后" },
  "gen.afterPill": { en: "Refined", zh: "整理后" },
  "gen.afterBody": { en: "Ask users for product feedback in three parts: what worked, what felt unclear, and what to improve first.", zh: "请从三个部分收集产品反馈：哪些地方有效、哪些地方不清楚、以及最应该优先改进什么。" },
  "gen.accessEyebrow": { en: "Access and billing", zh: "入口与计费" },
  "gen.accessHeading": { en: "Ready for live links.", zh: "已为在线链接做好准备。" },
  "gen.accessIntro": { en: "The CTA area uses configuration values, so access can change without layout edits.", zh: "这个 CTA 区域读取配置值，因此未来更换入口时不需要重改版式。" },
  "gen.accessTitle": { en: "Product access", zh: "产品入口" },
  "gen.accessBody": { en: 'The live app is already reachable at <a class="back-link" href="https://genpromptly.app/" target="_blank" rel="noopener noreferrer">GenPromptly.app</a>. Billing links can be added later.', zh: '在线应用已可通过 <a class="back-link" href="https://genpromptly.app/" target="_blank" rel="noopener noreferrer">GenPromptly.app</a> 访问，账单链接后续可再补充。' },
  "gen.contextTitle": { en: "Portfolio context", zh: "作品集语境" },
  "gen.contextBody": { en: "GenPromptly sits inside the broader proof-of-work story instead of defining the whole site.", zh: "GenPromptly 是整个作品集能力证明中的一部分，而不是网站唯一主题。" },
  "demo.whatItDoes": { en: "What it does", zh: "它做什么" },
  "demo.bestFor": { en: "Best for", zh: "适合场景" }
};

const DEMO_TEXT = {
  "stagepulse-map": {
    status: { en: "2nd place at HackerRivals", zh: "HackerRivals 第二名" },
    impact: {
      en: "Built in 6 hours at Science World and won 2nd place at Vancouver HackerRivals.",
      zh: "在 Science World 用 6 小时完成，并获得 Vancouver HackerRivals 第二名。"
    },
    tags: {
      en: ["Hackathon", "No login", "Live map"],
      zh: ["黑客松", "无需登录", "实时地图"]
    },
    output: {
      en: "A live venue map for location-based comments, votes, and moderated interior feedback.",
      zh: "一个可在室内空间上发表评论、投票，并进行内容审核的实时场馆地图。"
    },
    bestFor: {
      en: "Events, campuses, malls, museums, and any building that needs interior feedback.",
      zh: "适合活动现场、校园、商场、博物馆，以及任何需要室内反馈的建筑。"
    },
    actionLabel: { en: "Open live app", zh: "打开在线应用" },
    extraActionLabel: { en: "HackerRivals", zh: "HackerRivals" },
    imageAlt: {
      en: "StagePulse Map using the real Science World level map from the hackathon demo.",
      zh: "StagePulse Map 使用黑客松作品中的真实 Science World 楼层地图。"
    }
  },
  "ai-digest": {
    title: { en: "Daily AI digest system", zh: "每日 AI 摘要系统" },
    status: { en: "Founder-ready research brief", zh: "适合创始人的研究简报" },
    impact: {
      en: "One brief replaces a messy morning of scanning tabs and feeds.",
      zh: "一份简报，替代早上到处刷标签页和信息流的混乱过程。"
    },
    tags: {
      en: ["n8n", "Daily email", "Research workflow"],
      zh: ["n8n", "每日邮件", "研究流程"]
    },
    output: {
      en: "A daily email with links and the top takeaways.",
      zh: "每天发送一封带链接和重点结论的摘要邮件。"
    },
    bestFor: {
      en: "Founders and small teams that want signal without doomscrolling.",
      zh: "适合想获得高质量信息、又不想不停刷内容的创业者和小团队。"
    }
  },
  "sales-copilot": {
    title: { en: "Pre-call brief system", zh: "会前简报系统" },
    status: { en: "Meeting-ready research", zh: "面向会议的调研简报" },
    impact: {
      en: "It turns fragmented research into one fast review step.",
      zh: "它能把零散调研压缩成一次快速可读的会前复核。"
    },
    tags: {
      en: ["Research", "Pre-call prep", "Client briefs"],
      zh: ["调研", "会前准备", "客户简报"]
    },
    output: {
      en: "A pre-call brief with background and talking points.",
      zh: "输出一份包含背景信息与沟通重点的会前简报。"
    },
    bestFor: {
      en: "Founders, agencies, and sales teams with recurring calls.",
      zh: "适合创业者、代理团队，以及经常开客户电话会议的销售团队。"
    }
  },
  "asmr-generator": {
    title: { en: "Weekly content workflow", zh: "每周内容工作流" },
    status: { en: "Content automation", zh: "内容自动化" },
    impact: {
      en: "It cuts context switching across planning, assets, and publishing.",
      zh: "它减少了在选题、素材和发布之间频繁切换的成本。"
    },
    tags: {
      en: ["n8n", "Content drafting", "Publishing flow"],
      zh: ["n8n", "内容草稿", "发布流程"]
    },
    output: {
      en: "A repeatable workflow for draft-ready weekly content.",
      zh: "一个可重复执行的每周内容草稿生产流程。"
    },
    bestFor: {
      en: "Creators and small brands publishing on a schedule.",
      zh: "适合按固定节奏发布内容的创作者和小品牌。"
    }
  },
  "precall-briefing": {
    title: { en: "Client onboarding handoff", zh: "客户 onboarding 交接包" },
    status: { en: "Meeting preparation", zh: "会议准备" },
    impact: {
      en: "It reduces repeated explanations before the first meeting.",
      zh: "它能减少首次会议前反复解释背景的成本。"
    },
    tags: {
      en: ["Onboarding", "Expectation setting", "Workflow messaging"],
      zh: ["Onboarding", "预期管理", "流程沟通"]
    },
    output: {
      en: "A cleaner handoff with clearer next steps.",
      zh: "交接更干净，下一步更清楚。"
    },
    bestFor: {
      en: "Consultants, agencies, and founder-led teams.",
      zh: "适合顾问、代理机构和创始人主导的小团队。"
    }
  },
  "phosphene-simulator": {
    title: { en: "Interactive research demo", zh: "交互式研究 Demo" },
    status: { en: "Accessible vision demo", zh: "辅助视觉 Demo" },
    impact: {
      en: "It turns a hard concept into something people can test and discuss.",
      zh: "它把抽象概念变成了用户可以亲自测试和讨论的体验。"
    },
    tags: {
      en: ["Pulse2Percept", "Assistive tech", "Vision simulation"],
      zh: ["Pulse2Percept", "辅助科技", "视觉模拟"]
    },
    output: {
      en: "A browser demo for explaining a specialized research concept.",
      zh: "一个用浏览器解释专业研究概念的交互式 Demo。"
    },
    bestFor: {
      en: "Researchers, educators, and technical product teams.",
      zh: "适合研究者、教育者和技术产品团队。"
    },
    actionLabel: { en: "Open live demo", zh: "打开在线 Demo" }
  },
  genpromptly: {
    impact: {
      en: "It shows product thinking around a focused AI workflow.",
      zh: "它展示了围绕聚焦型 AI 流程进行产品化思考的能力。"
    },
    tags: {
      en: ["Prompt design", "Product UI", "Structured output"],
      zh: ["提示词设计", "产品界面", "结构化输出"]
    },
    output: {
      en: "A lightweight product for cleaner prompt drafting and reuse.",
      zh: "一个帮助提示词起草与复用更清楚的小产品。"
    },
    bestFor: {
      en: "Small teams and solo builders who want repeatable prompt quality.",
      zh: "适合希望稳定提升提示词质量的小团队与独立开发者。"
    },
    actionLabel: { en: "Open GenPromptly.app", zh: "打开 GenPromptly.app" }
  }
};

function getText(key, fallback = "", lang = currentLanguage) {
  const entry = TEXT[key];
  if (!entry) {
    return fallback;
  }

  return entry[lang] || entry[DEFAULT_LANGUAGE] || fallback;
}

function getLocalizedDemoValue(demo, field) {
  const entry = DEMO_TEXT[demo.key]?.[field];
  if (!entry) {
    return demo[field];
  }

  return entry[currentLanguage] || entry[DEFAULT_LANGUAGE] || demo[field];
}

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

function renderLanguageSwitch() {
  return `
    <div class="language-switch" aria-label="${escapeHtml(getText("ui.languageSwitch", "Language switcher"))}">
      <button class="language-chip${currentLanguage === "en" ? " is-active" : ""}" type="button" data-set-language="en">${escapeHtml(
        getText("ui.languageShortEn", "EN")
      )}</button>
      <button class="language-chip${currentLanguage === "zh" ? " is-active" : ""}" type="button" data-set-language="zh">${escapeHtml(
        getText("ui.languageShortZh", "中文")
      )}</button>
    </div>
  `;
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
      )}">${escapeHtml(getText(`nav.${item.key}`, item.label))}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <div class="container header-inner">
        <div class="header-start">
          ${renderLanguageSwitch()}
          <a class="brand-link" href="${resolveSitePath(siteConfig.routes.home)}">
            <span class="brand-mark">KB</span>
            <span class="brand-copy">
              <span class="brand-name">${siteConfig.ownerName}</span>
              <span class="brand-tag">${escapeHtml(getText("site.roleLabel", siteConfig.roleLabel))}</span>
            </span>
          </a>
        </div>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-label="${escapeHtml(
          getText("nav.menuAria", "Toggle navigation")
        )}">${escapeHtml(getText("nav.menu", "Menu"))}</button>
        <nav class="site-nav" aria-label="${escapeHtml(getText("nav.mainAria", "Main navigation"))}">
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
    label: getText("button.resume", "Resume"),
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
              <p class="footer-small">${escapeHtml(getText("site.roleTagline", siteConfig.roleTagline))}</p>
              <p class="footer-small">${escapeHtml(getText("footer.line", "AI demos, service packages, and contact."))}</p>
              <p class="footer-small">${escapeHtml(getText("site.hiringStatus", siteConfig.hiringStatus))}</p>
            </div>
            <div>
              <p class="footer-brand">${escapeHtml(getText("footer.contact", "Contact"))}</p>
              <p class="footer-small"><a data-contact-link href="#"></a></p>
              <p class="footer-small"><span data-location></span></p>
            </div>
            <div>
              <p class="footer-brand">${escapeHtml(getText("footer.links", "Links"))}</p>
              <div class="footer-links">
                <a href="${resolveSitePath(`${siteConfig.routes.home}#services`)}">${escapeHtml(getText("footer.services", "Services"))}</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#demos`)}">${escapeHtml(getText("footer.demos", "Demos"))}</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#xulan`)}">${escapeHtml(getText("footer.xulan", "XuLan"))}</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#thinking`)}">${escapeHtml(getText("footer.thinking", "Thinking"))}</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#publication`)}">${escapeHtml(getText("footer.publication", "Publication"))}</a>
                <a href="${resolveSitePath(`${siteConfig.routes.home}#booking`)}">${escapeHtml(getText("footer.audit", "Free Audit"))}</a>
                <a href="${escapeHtml(siteConfig.linkedInUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="${resolveSitePath(siteConfig.routes.genpromptly)}">GenPromptly</a>
                <a href="${resolveSitePath(siteConfig.routes.privacy)}">${escapeHtml(getText("footer.privacy", "Privacy"))}</a>
                <a href="${resolveSitePath(siteConfig.routes.terms)}">${escapeHtml(getText("footer.terms", "Terms"))}</a>
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
        label: getText("button.tryGenPromptly", "Try GenPromptly"),
        href: siteConfig.genPromptly.tryUrl,
        variant: "btn-primary",
        disabledMessage: siteConfig.genPromptly.tryPlaceholder
      })
    );
  }

  if (siteConfig.genPromptly.subscribeUrl) {
    actions.push(
      buildButton({
        label: getText("button.subscribeStripe", "Subscribe with Stripe"),
        href: siteConfig.genPromptly.subscribeUrl
      })
    );
  }

  if (siteConfig.genPromptly.manageBillingUrl) {
    actions.push(
      buildButton({
        label: getText("button.manageBilling", "Manage Billing"),
        href: siteConfig.genPromptly.manageBillingUrl,
        variant: "btn-ghost"
      })
    );
  }

  const note = siteConfig.genPromptly.subscribeUrl || siteConfig.genPromptly.manageBillingUrl
    ? getText("product.noteBilling")
    : getText("product.noteLiveOnly");

  return `
    <div class="cta-row">
      <div class="button-row">${actions.join("")}</div>
      <p class="integration-note">${note}</p>
    </div>
  `;
}

class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.refresh();
  }

  refresh() {
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

    this.querySelectorAll("[data-set-language]").forEach((button) => {
      button.addEventListener("click", () => {
        setActiveLanguage(button.getAttribute("data-set-language") || DEFAULT_LANGUAGE);
      });
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.refresh();
  }

  refresh() {
    this.dataset.ready = "true";
    this.innerHTML = renderFooter();
  }
}

function renderDemoVisual(demo) {
  if (demo.visualType === "stagepulse") {
    const levels = currentLanguage === "zh" ? ["一层", "二层", "OMNIMAX"] : ["Level 1", "Level 2", "OMNIMAX"];
    const zones = [
      { name: currentLanguage === "zh" ? "主舞台" : "Main Stage", style: "left:18%;top:32%;" },
      { name: currentLanguage === "zh" ? "展位区" : "Booths", style: "left:62%;top:28%;" },
      { name: currentLanguage === "zh" ? "餐饮区" : "Food", style: "left:42%;top:68%;" },
      { name: currentLanguage === "zh" ? "新展位" : "New Booth", style: "left:74%;top:58%;" }
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
              <strong>${escapeHtml(currentLanguage === "zh" ? "新展位" : "New Booth")}</strong>
              <p>${escapeHtml(currentLanguage === "zh" ? "一键创建展位并发布反馈。" : "One tap to create a booth and post feedback.")}</p>
            </div>
          </div>
        </div>
        <div class="stagepulse-side">
          <article class="stagepulse-stat">
            <span class="detail-label">${escapeHtml(currentLanguage === "zh" ? "无需登录" : "No login")}</span>
            <strong>${escapeHtml(currentLanguage === "zh" ? "投票、评论、创建展位" : "Vote, comment, add booths")}</strong>
            <p>${escapeHtml(currentLanguage === "zh" ? "为活动现场的快速互动而设计，几秒内即可上手。" : "Built for fast event interaction in under 5 seconds.")}</p>
          </article>
          <article class="stagepulse-stat">
            <span class="detail-label">${escapeHtml(currentLanguage === "zh" ? "实时技术栈" : "Live stack")}</span>
            <strong>Vercel + Supabase + Elastic</strong>
            <p>${escapeHtml(currentLanguage === "zh" ? "24 小时实时数据，加上 Elastic 审核与可搜索评论。" : "24-hour live data plus Elastic moderation and search-ready comments.")}</p>
          </article>
        </div>
        <p class="stagepulse-note">${escapeHtml(currentLanguage === "zh" ? "这是一层适用于 Science World，也可泛化到其他建筑的室内评论层。" : "A venue comment layer that works for Science World now and any building later.")}</p>
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
        <p class="digest-note">${escapeHtml(currentLanguage === "zh" ? "把 YouTube、播客等来源的 AI 信息整理成一封紧凑邮件。" : "Daily AI signal from YouTube, podcasts, and other sources, sent as a compact email.")}</p>
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
              <p>${escapeHtml(currentLanguage === "zh" ? "让提示词更清楚、更结构化，也更容易复核。" : "Makes prompts clearer, structured, and easier to review.")}</p>
            </div>
            <div class="promptly-actions">
              <span class="promptly-btn is-primary">${escapeHtml(currentLanguage === "zh" ? "免费开始" : "Start Free")}</span>
              <span class="promptly-btn">${escapeHtml(currentLanguage === "zh" ? "查看价格" : "View Pricing")}</span>
              <span class="promptly-btn">${escapeHtml(currentLanguage === "zh" ? "登录" : "Sign In")}</span>
              <span class="promptly-btn">${escapeHtml(currentLanguage === "zh" ? "创建提示词" : "Create Prompt")}</span>
            </div>
          </div>
          <div class="promptly-block">
            <span class="promptly-label">${escapeHtml(currentLanguage === "zh" ? "适合谁" : "Who It Is For")}</span>
            <p>${escapeHtml(currentLanguage === "zh" ? "适合需要稳定提示词质量的团队。" : "For teams that need repeatable prompt quality.")}</p>
          </div>
          <div class="promptly-skill-grid">
            ${skills
              .map(
                (skill) => `
                  <article class="promptly-skill-card">
                    <strong>${escapeHtml(skill)}</strong>
                    <p>${escapeHtml(currentLanguage === "zh" ? "为实际提示词流程提供更清楚的结构。" : "Sharper structure for a practical prompt workflow.")}</p>
                  </article>
                `
              )
              .join("")}
          </div>
          <div class="promptly-footer">
            <span class="promptly-plan">${escapeHtml(currentLanguage === "zh" ? "可直接试用，在线入口为 GenPromptly.app。" : "Free to try, with live access at GenPromptly.app.")}</span>
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
        <p class="phosphene-note">${escapeHtml(currentLanguage === "zh" ? "上传小于 50 KB 的 JPG 或 PNG，用来比较不同植入模拟结果。" : "Upload a JPG or PNG under 50 KB to compare simulated implant outputs.")}</p>
      </div>
    `;
  }

  return `<img src="${escapeHtml(resolveSitePath(demo.image))}" alt="${escapeHtml(getLocalizedDemoValue(demo, "imageAlt") || demo.imageAlt)}" />`;
}

function renderDemoCards() {
  return siteConfig.demos
    .map(
      (demo, index) => `
        <article class="demo-card reveal${index === 0 ? " is-featured" : ""}" style="--reveal-delay:${index * 120}ms">
          <div class="demo-frame${demo.visualType ? " is-generated" : ""}">
            ${renderDemoVisual(demo)}
            <div class="demo-visual-meta">
              <span class="demo-visual-status">${escapeHtml(getLocalizedDemoValue(demo, "status") || getLocalizedDemoValue(demo, "title") || demo.status || demo.title)}</span>
            </div>
          </div>
          <div class="demo-copy">
            <div class="demo-heading">
              <h3>${escapeHtml(getLocalizedDemoValue(demo, "title") || demo.title)}</h3>
              <p class="demo-summary">${escapeHtml(getLocalizedDemoValue(demo, "impact") || demo.impact)}</p>
            </div>
            <div class="demo-chip-row">
              ${(getLocalizedDemoValue(demo, "tags") || demo.tags || [])
                .map((tag) => `<span class="demo-chip">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>
            <div class="demo-list">
              <div class="demo-detail">
                <span class="detail-label">${escapeHtml(getText("demo.whatItDoes", "What it does"))}</span>
                <p>${escapeHtml(getLocalizedDemoValue(demo, "output") || demo.output || demo.workflow || demo.flow || "")}</p>
              </div>
              <div class="demo-detail is-output">
                <span class="detail-label">${escapeHtml(getText("demo.bestFor", "Best for"))}</span>
                <p>${escapeHtml(getLocalizedDemoValue(demo, "bestFor") || demo.bestFor || demo.stack || "")}</p>
              </div>
            </div>
            ${
              demo.actionUrl || demo.extraActionUrl
                ? `<div class="button-row compact-row demo-actions">
                    ${
                      demo.actionUrl
                        ? buildButton({
                            label: getLocalizedDemoValue(demo, "actionLabel") || demo.actionLabel || "Open",
                            href: demo.actionUrl,
                            variant: "btn-primary",
                            external: Boolean(demo.actionExternal)
                          })
                        : ""
                    }
                    ${
                      demo.extraActionUrl
                        ? buildButton({
                            label: getLocalizedDemoValue(demo, "extraActionLabel") || demo.extraActionLabel || "More",
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
  const bookingLabel = getText("booking.cta", siteConfig.booking?.ctaLabel || "Book time");
  const bookingEmbedUrl = siteConfig.booking?.embedUrl || bookingUrl;
  const bookingSupportCopy = getText("booking.support", siteConfig.booking?.supportCopy || "");

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
      label: getText("button.resume", "Resume"),
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
      element.textContent = element.dataset.labelKey
        ? getText(element.dataset.labelKey, element.dataset.label || bookingLabel)
        : element.dataset.label || bookingLabel;
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
    element.textContent = getText("site.hiringStatus", siteConfig.hiringStatus);
  });

  document.querySelectorAll("[data-role-tagline]").forEach((element) => {
    element.textContent = getText("site.roleTagline", siteConfig.roleTagline);
  });

  document.querySelectorAll("[data-demo-grid]").forEach((element) => {
    element.innerHTML = renderDemoCards();
  });
}

function applyPageTranslations() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";

  const titleKey = document.body?.dataset.i18nTitle;
  if (titleKey) {
    document.title = getText(titleKey, document.title);
  }

  const descriptionKey = document.body?.dataset.i18nDescription;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionKey && descriptionMeta) {
    descriptionMeta.setAttribute("content", getText(descriptionKey, descriptionMeta.getAttribute("content") || ""));
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (!key) {
      return;
    }

    element.textContent = getText(key, element.textContent.trim());
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (!key) {
      return;
    }

    element.innerHTML = getText(key, element.innerHTML);
  });
}

function refreshLocalizedUi() {
  document.body?.classList.add("has-reveal");
  document.querySelectorAll("site-navbar").forEach((element) => element.refresh?.());
  document.querySelectorAll("site-footer").forEach((element) => element.refresh?.());
  applySiteTokens();
  applyPageTranslations();
  setupSectionObserver();
  setupRevealObserver();
}

function setActiveLanguage(language) {
  if (!SUPPORTED_LANGUAGES.has(language)) {
    return;
  }

  currentLanguage = language;

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore storage failures and still switch the UI in memory.
  }

  refreshLocalizedUi();
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
    document.body?.classList.add("has-reveal");
    applySiteTokens();
    applyPageTranslations();
    setupSectionObserver();
    setupRevealObserver();
  });
} else {
  document.body?.classList.add("has-reveal");
  applySiteTokens();
  applyPageTranslations();
  setupSectionObserver();
  setupRevealObserver();
}
