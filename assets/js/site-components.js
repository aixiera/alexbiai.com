(function () {
  "use strict";

  const config = window.siteConfig;
  if (!config) return;
  document.documentElement.classList.add("js");

  const LANGUAGE_KEY = "kb-site-language";
  const CAMPAIGN_KEY = "kb-campaign";
  const CONSENT_KEY = "kb-privacy-consent-v1";
  const SUPPORTED_LANGUAGES = new Set(["en", "zh"]);
  let language = readStorage(LANGUAGE_KEY) || "en";
  let leadFormStarted = false;

  const TEXT = {
    "nav.services": { en: "Services", zh: "服务" },
    "nav.industries": { en: "My Niche", zh: "我的细分领域" },
    "nav.examples": { en: "Demos", zh: "演示" },
    "nav.precall": { en: "Pre-Call", zh: "通话准备" },
    "nav.projects": { en: "Projects", zh: "项目" },
    "nav.publications": { en: "Publication", zh: "论文" },
    "nav.process": { en: "Process", zh: "流程" },
    "nav.about": { en: "About", zh: "关于" },
    "nav.book": { en: "Book a Checkup", zh: "预约系统检查" },
    "nav.menu": { en: "Menu", zh: "菜单" },
    "nav.close": { en: "Close", zh: "关闭" },

    "home.title": { en: "Kairui Bi | Websites & Automation for Canadian Local Businesses", zh: "Kairui Bi | 加拿大本地企业网站与自动化" },
    "home.description": { en: "Websites, lead capture, and practical automation for Canadian local businesses. Based in BC and built by Kairui Bi.", zh: "为加拿大本地企业提供网站、潜客收集与实用自动化。Kairui Bi 常驻卑诗省。" },
    "home.heroEyebrow": { en: "BC-based · Serving businesses across Canada", zh: "常驻卑诗省 · 服务加拿大各地企业" },
    "home.heroTitle": { en: "Websites and automations that help Canadian local businesses win more work and waste less time.", zh: "帮助加拿大本地企业赢得更多业务、减少时间浪费的网站与自动化。" },
    "home.heroBody": { en: "I design local-business websites, connect the tools you already use, and automate repetitive lead and admin workflows. Built and handed off by Kairui Bi.", zh: "我为本地企业设计网站、连接现有工具，并自动化重复的潜客与行政流程。由 Kairui Bi 亲自搭建和交付。" },
    "cta.checkup15": { en: "Book a Free 15-Min Systems Checkup", zh: "预约免费 15 分钟系统检查" },
    "cta.checkup": { en: "Book a free Systems Checkup", zh: "预约免费系统检查" },
    "cta.workflow": { en: "See working demos", zh: "查看可用演示" },
    "cta.linkedin": { en: "View LinkedIn", zh: "查看 LinkedIn" },
    "trust.one": { en: "One-person builder", zh: "一人全程负责" },
    "trust.human": { en: "Human-reviewed automation", zh: "人工复核自动化" },
    "trust.handoff": { en: "Clean handoff", zh: "清晰交付" },
    "workflow.example": { en: "Illustrative lead desk · sample data", zh: "潜客工作台示意 · 示例数据" },
    "workflow.leadJob": { en: "Today’s follow-up", zh: "今日跟进" },
    "workflow.inquiry": { en: "Emergency leak · missed call", zh: "紧急漏水 · 未接来电" },
    "workflow.inquiryNote": { en: "Call back now · service area confirmed", zh: "立即回电 · 已确认服务区域" },
    "workflow.captured": { en: "Deck quote · details incomplete", zh: "露台报价 · 信息不完整" },
    "workflow.capturedNote": { en: "Request postal code and budget range", zh: "补充邮编和预算范围" },
    "workflow.alerted": { en: "HVAC estimate · awaiting reply", zh: "暖通报价 · 等待回复" },
    "workflow.alertedNote": { en: "Follow up today · owner assigned", zh: "今日跟进 · 已分配负责人" },
    "workflow.followup": { en: "Restaurant event inquiry", zh: "餐厅活动咨询" },
    "workflow.followupNote": { en: "Assign manager · requested date included", zh: "分配经理 · 已包含日期" },
    "workflow.note": { en: "Every row shows the pain, owner, age, and next action.", zh: "每一行都显示问题、负责人、等待时间和下一步。" },
    "workflow.visualLabel": { en: "Lead desk · sample data", zh: "潜客工作台 · 示例数据" },
    "workflow.capture": { en: "Triage", zh: "分级" },
    "workflow.route": { en: "Assign", zh: "分配" },
    "workflow.followShort": { en: "Recover", zh: "挽回" },
    "workflow.websiteCall": { en: "Missed call", zh: "未接来电" },
    "workflow.ownerAlert": { en: "Unassigned quote", zh: "未分配报价" },
    "workflow.estimateReminder": { en: "Estimate due", zh: "报价待跟进" },
    "workflow.readout1": { en: "Priority lead", zh: "优先潜客" },
    "workflow.readout2": { en: "Owner action", zh: "负责人操作" },
    "workflow.readout3": { en: "Due today", zh: "今日到期" },
    "workflow.sequence1": { en: "Emergency call waiting eight minutes for a response.", zh: "紧急来电已等待八分钟回复。" },
    "workflow.sequence2": { en: "Quote request needs a postal code before assignment.", zh: "报价请求需要补充邮编后再分配。" },
    "workflow.sequence3": { en: "HVAC estimate is ready for a follow-up call.", zh: "暖通报价已进入今日回访。" },

    "services.eyebrow": { en: "Services", zh: "服务" },
    "services.title": { en: "Diagnose first. Build what helps.", zh: "先诊断，再搭建真正有用的系统。" },
    "services.body": { en: "One clear operational problem becomes a focused plan, build, and measurable handoff.", zh: "把一个明确的运营问题转化为聚焦的计划、搭建和可衡量交付。" },
    "services.diagnose": { en: "Digital Systems Checkup", zh: "数字系统检查" },
    "services.diagnoseBody": { en: "Map one real workflow, find the bottleneck, review the tools you already pay for, and recommend the simplest path forward.", zh: "梳理一条真实流程，找出瓶颈，检查你已经付费的工具，并推荐最简单的改进路径。" },
    "services.diagnoseList": { en: "Configure existing tools · Choose a ready-made option · Scope a focused custom fix", zh: "配置现有工具 · 选择成熟方案 · 规划小范围定制方案" },
    "services.build": { en: "Website & Lead Capture", zh: "网站与潜客收集" },
    "services.buildBody": { en: "Mobile-first websites built around calls, quote requests, booking, trust, speed, basic analytics, and practical local-search foundations.", zh: "以电话、报价请求、预约、信任、速度、基础分析和实用本地搜索基础为核心的移动优先网站。" },
    "services.buildList": { en: "Clear mobile actions · Useful forms · Fast, maintainable handoff", zh: "清晰的移动端操作 · 实用表单 · 快速且易维护的交付" },
    "services.automate": { en: "Workflow Automation & AI", zh: "流程自动化与 AI" },
    "services.automateBody": { en: "Connect forms, CRM, email, documents, notifications, reporting, and lightweight apps. Predictable work uses rules; AI is reserved for interpretation or generation.", zh: "连接表单、CRM、邮件、文档、通知、报表和轻量应用。可预测任务使用规则，只有解释或生成内容时才使用 AI。" },
    "services.automateList": { en: "Lead routing · Follow-up reminders · Intake, documents, and reporting", zh: "潜客分配 · 跟进提醒 · 客户信息、文档与报表" },
    "services.scope": { en: "Projects are scoped after the Systems Checkup.", zh: "项目范围将在系统检查后确定。" },

    "industries.eyebrow": { en: "My niche · Industries", zh: "我的细分领域 · 行业" },
    "industries.title": { en: "Focused on businesses with repeated inquiries and handoffs.", zh: "专注于有重复咨询与交接流程的企业。" },
    "industries.body": { en: "Home services are the primary focus today, with room for other Canadian local businesses that share similar lead and admin workflows.", zh: "目前主要服务家居服务行业，也欢迎有类似潜客与行政流程的加拿大本地企业。" },
    "industries.home": { en: "Home Services", zh: "家居服务" },
    "industries.homeBody": { en: "Websites and lead workflows for HVAC, plumbing, electrical, roofing, restoration, landscaping, and renovation businesses.", zh: "为暖通、管道、电气、屋顶、修复、园林和装修企业提供网站与潜客流程。" },
    "industries.restaurant": { en: "Restaurants", zh: "餐饮" },
    "industries.restaurantBody": { en: "Better menu and contact experiences, reservations, customer inquiries, review requests, basic reporting, and repetitive admin.", zh: "改善菜单与联系体验、预约、顾客咨询、评价请求、基础报表和重复行政工作。" },
    "industries.other": { en: "Other Local Services", zh: "其他本地服务" },
    "industries.otherBody": { en: "If your business handles recurring inquiries, bookings, estimates, follow-up, or administrative handoffs, it may be a fit.", zh: "如果你的企业经常处理咨询、预约、报价、跟进或行政交接，也可能适合。" },
    "industries.contractors": { en: "See the contractor page", zh: "查看承包商专页" },

    "examples.eyebrow": { en: "Results / Examples", zh: "成果 / 示例" },
    "examples.title": { en: "Real builder proof, clearly separated from demos.", zh: "真实能力证明，与演示场景明确区分。" },
    "examples.body": { en: "Local-business case studies will be added only when there is real client permission and measurable evidence.", zh: "只有获得真实客户许可并有可衡量证据后，才会加入本地企业案例。" },
    "examples.demoLabel": { en: "Demo · No client results claimed", zh: "演示 · 不代表真实客户成果" },
    "examples.plumbing": { en: "Plumbing Lead Follow-up", zh: "管道服务潜客跟进" },
    "examples.plumbingBody": { en: "A quote request is captured, routed by service area, acknowledged, assigned, and kept visible until the estimate is followed up.", zh: "报价请求被收集后按服务区域分配、自动确认、指派负责人，并持续显示直到完成报价跟进。" },
    "examples.restaurant": { en: "Restaurant Inquiry & Review Flow", zh: "餐厅咨询与评价流程" },
    "examples.restaurantBody": { en: "Customer inquiries are organized, reservation questions reach the right person, and review requests are queued after a completed visit.", zh: "顾客咨询得到整理，预约问题交给正确负责人，并在到店完成后安排评价邀请。" },
    "examples.proof": { en: "Builder proof", zh: "搭建能力证明" },
    "examples.stage": { en: "StagePulse Map", zh: "StagePulse Map" },
    "examples.stageBody": { en: "Built in six hours at Science World and awarded 2nd place at Vancouver HackerRivals. It demonstrates fast scoping, interface design, and delivery under a tight deadline.", zh: "在 Science World 六小时内完成，并获 Vancouver HackerRivals 二等奖，体现了快速范围界定、界面设计和限时交付能力。" },
    "examples.spie": { en: "Published technical work", zh: "已发表技术研究" },
    "examples.spieBody": { en: "A Proceedings of SPIE publication comparing facial-expression recognition models. Evidence of technical depth, kept secondary to business outcomes.", zh: "一篇发表于 Proceedings of SPIE 的表情识别模型比较论文，用于证明技术深度，但不会盖过业务成果。" },
    "examples.openStage": { en: "Open StagePulse", zh: "打开 StagePulse" },
    "examples.readPaper": { en: "View publication", zh: "查看论文" },

    "faq.eyebrow": { en: "FAQ", zh: "常见问题" },
    "faq.title": { en: "Questions local owners actually ask.", zh: "本地企业主真正会问的问题。" },
    "faq.q1": { en: "Where can AI help in my business?", zh: "AI 可以在哪些业务环节提供帮助？" },
    "faq.a1": { en: "Useful starting points include sorting intake, extracting information, drafting routine responses, and directing exceptions to a person.", zh: "常见起点包括整理客户信息、提取资料、起草常规回复，以及把例外情况交给人工处理。" },
    "faq.q2": { en: "Can you connect the tools we already use?", zh: "你能连接我们现有的工具吗？" },
    "faq.a2": { en: "Yes. The checkup identifies what should stay, what should connect, and where a clearer handoff can save time.", zh: "可以。系统检查会明确保留哪些工具、连接哪些环节，以及哪里可以通过更清晰的交接节省时间。" },
    "faq.q3": { en: "How can you improve our CRM or accounting workflow?", zh: "你如何改善我们的 CRM 或会计流程？" },
    "faq.a3": { en: "I can improve intake, data handoffs, reminders, and reporting around your core business systems.", zh: "我可以改善核心业务系统周围的信息录入、数据交接、提醒和报表。" },
    "faq.q4": { en: "What kinds of tasks can be automated?", zh: "哪些任务可以自动化？" },
    "faq.a4": { en: "Lead routing, acknowledgements, reminders, status updates, document handling, customer intake, notifications, and routine reporting are common starting points.", zh: "潜客分配、自动确认、提醒、状态更新、文档处理、客户信息收集、通知和常规报表都是常见起点。" },
    "faq.q5": { en: "Can you rebuild an existing website?", zh: "你能改造现有网站吗？" },
    "faq.a5": { en: "Yes. The first step is deciding whether the current site needs a focused conversion improvement or a full rebuild.", zh: "可以。第一步是判断现有网站只需针对转化做改进，还是确实需要完整重建。" },
    "faq.q6": { en: "How long does a small project take?", zh: "小型项目需要多久？" },
    "faq.a6": { en: "Timing depends on access, integrations, and scope. After the checkup, you receive a defined proposal and timeline before work begins.", zh: "时间取决于访问权限、集成和范围。系统检查后，你会在开工前收到明确的方案和时间表。" },
    "faq.q7": { en: "What happens after launch?", zh: "上线后怎么办？" },
    "faq.a7": { en: "The system is tested, documented, and handed off. Ongoing support can be scoped when the workflow needs monitoring or continued improvement.", zh: "系统会经过测试、记录并完成交付。如果流程需要监控或持续改进，可以另行确定支持范围。" },
    "faq.q8": { en: "How do you handle sensitive business data?", zh: "你如何处理敏感业务数据？" },
    "faq.a8": { en: "Access stays limited to the agreed need, credentials stay outside public code, and sensitive workflows receive a dedicated review during scoping.", zh: "访问权限限制在约定需求内，凭据保存在公开代码之外，并在确定范围时专门审查敏感流程。" },

    "form.eyebrow": { en: "Prefer to write first?", zh: "想先写下来？" },
    "form.title": { en: "Tell me one process you want to improve.", zh: "告诉我一个你想改善的流程。" },
    "form.body": { en: "Share the short version. I will identify the clearest next step and reply with a focused recommendation.", zh: "简单描述即可。我会找出最清晰的下一步，并回复一项聚焦的建议。" },
    "form.recording": { en: "Your submission is time-stamped, recorded by the form service, and delivered directly to Kairui.", zh: "你的提交会记录时间、保存在表单服务中，并直接发送给 Kairui。" },
    "form.consentLead": { en: "I agree that Kairui may use these details to respond to this request.", zh: "我同意 Kairui 使用这些信息回复本次请求。" },
    "form.privacyPolicy": { en: "Privacy Policy", zh: "隐私政策" },
    "form.name": { en: "Name", zh: "姓名" },
    "form.business": { en: "Business name", zh: "企业名称" },
    "form.email": { en: "Email", zh: "电子邮箱" },
    "form.phone": { en: "Phone (optional)", zh: "电话（选填）" },
    "form.website": { en: "Website (optional)", zh: "网站（选填）" },
    "form.industry": { en: "Industry", zh: "行业" },
    "form.industryPlaceholder": { en: "Select an industry", zh: "请选择行业" },
    "form.homeServices": { en: "Home services / contractors", zh: "家居服务 / 承包商" },
    "form.restaurant": { en: "Restaurant / hospitality", zh: "餐饮 / 酒店" },
    "form.professional": { en: "Professional services", zh: "专业服务" },
    "form.other": { en: "Other local service", zh: "其他本地服务" },
    "form.process": { en: "What is one process you want to improve?", zh: "你最想改善的一个流程是什么？" },
    "form.contact": { en: "Preferred contact method", zh: "偏好的联系方式" },
    "form.emailMethod": { en: "Email", zh: "电子邮件" },
    "form.phoneMethod": { en: "Phone", zh: "电话" },
    "form.eitherMethod": { en: "Either", zh: "均可" },
    "form.submit": { en: "Send my workflow", zh: "提交我的流程" },
    "form.sending": { en: "Sending…", zh: "发送中…" },
    "form.successTitle": { en: "Thanks—your workflow is on its way.", zh: "谢谢，你的流程信息已发送。" },
    "form.successBody": { en: "I will review it and reply with a practical next step. You can also book the free Systems Checkup now.", zh: "我会查看并回复一个实用的下一步。你也可以现在预约免费系统检查。" },
    "form.error": { en: "The form could not send right now. Your entries are still here—use the email option below.", zh: "表单暂时无法发送。你填写的内容仍在，请使用下方电子邮件选项。" },
    "form.unconfigured": { en: "Online form delivery is being configured. You can still send these details by email.", zh: "在线表单正在配置中，你仍可通过电子邮件发送这些信息。" },
    "form.emailFallback": { en: "Email these details", zh: "通过邮件发送这些信息" },

    "about.eyebrow": { en: "About", zh: "关于" },
    "about.title": { en: "One builder, one accountable handoff.", zh: "一位搭建者，一次负责到底的交付。" },
    "about.body": { en: "I’m Kairui Bi, a BC-based builder focused on practical automation and lightweight web applications. I create focused systems that solve measurable operational problems and stay clear to maintain.", zh: "我是 Kairui Bi，一名常驻卑诗省、专注实用自动化与轻量 Web 应用的搭建者。我打造聚焦的系统，解决可衡量的运营问题，并保持清晰易维护。" },
    "about.proof": { en: "My technical background includes published computer-vision research and a 2nd-place HackerRivals build. These projects demonstrate delivery speed, technical depth, and comfort with complex systems.", zh: "我的技术背景包括已发表的计算机视觉研究和 HackerRivals 二等奖作品。这些项目体现了交付速度、技术深度和处理复杂系统的能力。" },
    "about.final": { en: "Show me one workflow that wastes your time.", zh: "告诉我一个正在浪费你时间的流程。" },

    "booking.title": { en: "Book a Free Systems Checkup | Kairui Bi", zh: "预约免费系统检查 | Kairui Bi" },
    "booking.description": { en: "Book a free 15-minute Systems Checkup with Kairui Bi for a Canadian local-business website or workflow.", zh: "预约与 Kairui Bi 的免费 15 分钟系统检查，讨论加拿大本地企业的网站或工作流程。" },
    "booking.eyebrow": { en: "Free 15-minute fit check", zh: "免费 15 分钟匹配检查" },
    "booking.heading": { en: "Start with the workflow and business outcome.", zh: "从工作流程和业务成果开始。" },
    "booking.body": { en: "Bring one process that feels slow, manual, or easy to lose track of. The free call focuses on fit and direction. When we fit, the next step is a separately quoted business diagnosis or a separately scoped implementation project.", zh: "带来一个缓慢、手工或容易失去跟踪的流程。免费通话聚焦合作匹配与方向。适合合作时，下一步是单独报价的业务诊断，或另行确定范围的实施项目。" },
    "booking.expect1": { en: "Focused 15-minute fit call", zh: "聚焦的 15 分钟匹配通话" },
    "booking.expect2": { en: "Business-first recommendations", zh: "以业务为先的建议" },
    "booking.expect3": { en: "Custom quote before any paid work", zh: "任何付费工作前先提供定制报价" },
    "booking.open": { en: "Open scheduler in a new tab", zh: "在新标签页打开预约" },
    "booking.email": { en: "Email instead", zh: "改用电子邮件" },
    "booking.preCallTitle": { en: "Already booked? Prepare before we meet.", zh: "已经预约？请在会面前做好准备。" },
    "booking.preCallBody": { en: "Watch the founder briefing, complete the required form, and bring one recent workflow breakdown.", zh: "观看创始人简报、填写必填表单，并准备一个近期流程断点的例子。" },
    "booking.preCallButton": { en: "Open the Pre-Call Guide", zh: "打开通话准备指南" },
    "booking.nextTitle": { en: "Booked your call?", zh: "已经预约通话？" },
    "booking.nextBody": { en: "Complete the Pre-Call Guide so I can prepare around your actual workflow.", zh: "填写通话准备指南，让我可以围绕你的真实流程做好准备。" },

    "precall.title": { en: "Pre-Call Guide | Kairui Bi Systems Checkup", zh: "通话准备指南 | Kairui Bi 系统检查" },
    "precall.description": { en: "Prepare for a focused 15-minute Systems Checkup with Kairui Bi using the pre-call video, required briefing form, and practical checklist.", zh: "通过通话前视频、必填简报表和实用清单，为与 Kairui Bi 的 15 分钟系统检查做好准备。" },
    "precall.eyebrow": { en: "Before the call", zh: "通话之前" },
    "precall.heading": { en: "Prepare for a focused 15-minute Systems Checkup.", zh: "为一次聚焦的 15 分钟系统检查做好准备。" },
    "precall.body": { en: "This page helps me understand your operation before we meet, so the call can focus on the bottleneck, desired outcome, and strongest next step.", zh: "本页帮助我在会面前了解你的运营情况，让通话聚焦于瓶颈、期望结果和最有力的下一步。" },
    "precall.complete": { en: "Complete the required briefing", zh: "填写必填通话简报" },
    "precall.schedule": { en: "Book or reschedule", zh: "预约或改期" },
    "precall.confirmation": { en: "Booked already? Your Google confirmation email contains the calendar event and the Manage booking link.", zh: "已经预约？Google 确认邮件中包含日历事件和“管理预约”链接。" },
    "precall.videoEyebrow": { en: "Founder briefing", zh: "创始人简报" },
    "precall.videoLength": { en: "Short pre-call video", zh: "简短通话前视频" },
    "precall.videoPendingTitle": { en: "Pre-call video", zh: "通话前视频" },
    "precall.videoPending": { en: "A short video will appear here. Use the checklist below to prepare today.", zh: "这里将显示一段简短视频。现在可以先使用下方清单准备。" },
    "precall.playVideo": { en: "Play pre-call video", zh: "播放通话前视频" },
    "precall.formEyebrow": { en: "Required before the call", zh: "通话前必填" },
    "precall.formTitle": { en: "Give me the operating context.", zh: "告诉我你的运营背景。" },
    "precall.formBody": { en: "A concise answer is enough. I use these details to prepare relevant questions and protect the 15 minutes for useful discussion.", zh: "简洁回答即可。我会根据这些信息准备相关问题，把 15 分钟留给有价值的讨论。" },
    "precall.sensitiveTitle": { en: "Keep sensitive data out of this form", zh: "请勿在此表单中填写敏感数据" },
    "precall.sensitiveBody": { en: "Describe the workflow using general examples. Share credentials, customer records, and confidential files later through an agreed secure method.", zh: "请使用一般示例描述流程。凭据、客户记录和机密文件可在之后通过双方同意的安全方式提供。" },
    "precall.callDate": { en: "Booked call date (optional)", zh: "已预约通话日期（选填）" },
    "precall.teamSize": { en: "Team size", zh: "团队规模" },
    "precall.choose": { en: "Choose one", zh: "请选择" },
    "precall.team1": { en: "Owner only", zh: "仅业主" },
    "precall.team2": { en: "2–5 people", zh: "2–5 人" },
    "precall.team3": { en: "6–15 people", zh: "6–15 人" },
    "precall.team4": { en: "16+ people", zh: "16 人以上" },
    "precall.revenue": { en: "Monthly revenue range (optional)", zh: "月营收范围（选填）" },
    "precall.preferNotSay": { en: "Prefer to leave blank", zh: "暂不填写" },
    "precall.bottleneck": { en: "Primary operational bottleneck", zh: "主要运营瓶颈" },
    "precall.bottleneckPlaceholder": { en: "Example: quote requests wait in a shared inbox and follow-up depends on memory.", zh: "例如：报价请求停留在共享收件箱中，跟进依赖人工记忆。" },
    "precall.tools": { en: "Current tools and handoffs", zh: "当前工具和交接方式" },
    "precall.toolsPlaceholder": { en: "Example: website form → Gmail → spreadsheet → phone follow-up.", zh: "例如：网站表单 → Gmail → 表格 → 电话跟进。" },
    "precall.timeline": { en: "Desired timeline", zh: "期望时间" },
    "precall.timeline1": { en: "Immediate", zh: "立即开始" },
    "precall.timeline2": { en: "1–3 months", zh: "1–3 个月" },
    "precall.timeline3": { en: "3+ months", zh: "3 个月以上" },
    "precall.timeline4": { en: "Researching options", zh: "正在研究方案" },
    "precall.outcome": { en: "Most valuable outcome", zh: "最有价值的结果" },
    "precall.outcomePlaceholder": { en: "Faster response, fewer admin hours, clearer reporting…", zh: "更快响应、更少行政工时、更清晰报表……" },
    "precall.submit": { en: "Send my pre-call briefing", zh: "提交通话前简报" },
    "precall.successTitle": { en: "Briefing received.", zh: "简报已收到。" },
    "precall.successBody": { en: "I’ll use it to prepare focused questions for our call. Your Google confirmation email remains the place to manage the appointment.", zh: "我会用它为通话准备聚焦的问题。请通过 Google 确认邮件管理预约。" },
    "precall.prepareEyebrow": { en: "Three-item preparation", zh: "三项准备" },
    "precall.prepareTitle": { en: "Bring one real example from the workday.", zh: "带来一个工作日中的真实例子。" },
    "precall.prepareBody": { en: "A concrete example makes the short call much more useful.", zh: "一个具体例子会让短时间通话更有价值。" },
    "precall.prepare1": { en: "Customer entry point", zh: "客户入口" },
    "precall.prepare1Body": { en: "Show where the request starts: call, website, ad, email, QR code, booking, or referral.", zh: "说明请求从哪里开始：电话、网站、广告、邮件、二维码、预约或转介绍。" },
    "precall.prepare2": { en: "A recent breakdown", zh: "近期流程断点" },
    "precall.prepare2Body": { en: "Bring one example of a delayed reply, missed handoff, repeated entry, unclear status, or lost follow-up.", zh: "准备一个回复延迟、交接遗漏、重复录入、状态不清或跟进流失的例子。" },
    "precall.prepare3": { en: "Access map", zh: "访问权限地图" },
    "precall.prepare3Body": { en: "List the tools and people involved. A live audit can be planned later with scoped access.", zh: "列出涉及的工具和人员。之后可以通过限定访问权限规划实时审查。" },
    "precall.examples": { en: "Review working demos and builder proof", zh: "查看可用演示与搭建能力证明" },
    "precall.logisticsEyebrow": { en: "Calendar and contact", zh: "日历与联系" },
    "precall.logisticsTitle": { en: "Keep the appointment details close.", zh: "把预约信息放在手边。" },
    "precall.logisticsBody": { en: "Google sends the calendar event after booking. The confirmation email includes the Manage booking link for schedule changes.", zh: "Google 会在预约后发送日历事件。确认邮件包含用于修改时间的“管理预约”链接。" },
    "precall.openBooking": { en: "Open booking page", zh: "打开预约页面" },
    "precall.email": { en: "Email Kairui", zh: "给 Kairui 发邮件" },
    "precall.emailNote": { en: "Use email for a time-sensitive scheduling question.", zh: "如有紧急排期问题，请使用电子邮件。" },

    // Diagnosis-led contractor journey.
    "contractor.title": { en: "Business Systems Consulting & Implementation for Canadian Contractors | Kairui Bi", zh: "加拿大承包商业务系统咨询与实施 | Kairui Bi" },
    "contractor.description": { en: "Diagnosis-led websites, CRM, automation, AI reception, and business systems for Canadian contractors and local businesses.", zh: "为加拿大承包商和本地企业提供以诊断为先的网站、CRM、自动化、AI 接待和业务系统服务。" },
    "contractor.eyebrow": { en: "For Canadian contractors and local businesses", zh: "面向加拿大承包商与本地企业" },
    "contractor.hero": { en: "Diagnose the business first. Build only what makes sense.", zh: "先诊断业务，再搭建真正合理的系统。" },
    "contractor.heroBody": { en: "I diagnose how your business currently handles leads, customers, staff workflows, and repetitive admin, then recommend and build the systems that actually make sense.", zh: "我会先诊断你的企业目前如何处理潜客、客户、员工流程和重复行政工作，再推荐并搭建真正合理的系统。" },
    "contractor.seeDemos": { en: "See working demos", zh: "查看可用演示" },
    "contractor.heroStep1": { en: "01 · Fit call", zh: "01 · 匹配通话" },
    "contractor.heroStep1Body": { en: "Start with one real business problem and decide whether we fit.", zh: "从一个真实业务问题开始，判断我们是否适合合作。" },
    "contractor.heroStep2": { en: "02 · Diagnose", zh: "02 · 诊断" },
    "contractor.heroStep2Body": { en: "Map what happens now, where work is lost, and what should change.", zh: "梳理当前流程、损失发生的位置以及需要改变的地方。" },
    "contractor.heroStep3": { en: "03 · Prescribe + build", zh: "03 · 方案 + 实施" },
    "contractor.heroStep3Body": { en: "Keep, configure, connect, replace, or build—with a clear reason.", zh: "有明确理由地保留、配置、连接、替换或定制搭建。" },
    "contractor.beforeEyebrow": { en: "Before we build anything", zh: "在搭建任何系统之前" },
    "contractor.beforeTitle": { en: "The first step is a business diagnosis.", zh: "第一步是业务诊断。" },
    "contractor.beforeBody": { en: "A free 15-minute call checks fit. A deeper business diagnosis is a separate, custom-quoted consulting engagement. Implementation receives its own scope, quote, acceptance criteria, and handoff.", zh: "免费 15 分钟通话用于确认是否适合合作。深入业务诊断是独立、定制报价的咨询服务。实施项目拥有单独的范围、报价、验收标准和交付方式。" },
    "contractor.roadmap1": { en: "Business Diagnosis", zh: "业务诊断" },
    "contractor.roadmap1Body": { en: "Map how customers enter, how staff handle information, which tools support the work, and where leads or time are lost.", zh: "梳理客户如何进入、员工如何处理信息、哪些工具支持工作，以及潜客或时间在哪里流失。" },
    "contractor.roadmap2": { en: "Prescription", zh: "解决方案建议" },
    "contractor.roadmap2Body": { en: "Recommend what to keep, configure, connect, replace, or build—and explain why.", zh: "建议应该保留、配置、连接、替换或定制搭建什么，并说明理由。" },
    "contractor.roadmap3": { en: "Implementation", zh: "实施" },
    "contractor.roadmap3Body": { en: "Build and connect the selected solution with visible review points.", zh: "搭建并连接选定方案，并设置清晰的复核节点。" },
    "contractor.roadmap4": { en: "Measurement", zh: "衡量" },
    "contractor.roadmap4Body": { en: "Track whether response time, admin hours, lead handling, bookings, or customer experience improve.", zh: "跟踪响应时间、行政工时、潜客处理、预约或客户体验是否得到改善。" },
    "contractor.roadmap5": { en: "Ongoing Care", zh: "持续维护" },
    "contractor.roadmap5Body": { en: "Add optional maintenance, monitoring, and future improvements only where useful.", zh: "只在有实际价值时增加可选维护、监控和后续改进。" },
    "contractor.prescribeEyebrow": { en: "What I can prescribe", zh: "我可以提供的解决方案" },
    "contractor.prescribeTitle": { en: "Solutions organized around the business problem.", zh: "围绕业务问题组织解决方案。" },
    "contractor.prescribeBody": { en: "The answer may be a configuration change, an off-the-shelf product, a connected workflow, or a focused custom build. Technology follows the diagnosis.", zh: "答案可能是配置调整、现成产品、连接后的流程或小范围定制开发。技术选择服从业务诊断。" },
    "contractor.acquire": { en: "Customer acquisition", zh: "客户获取" },
    "contractor.acquireBody": { en: "Help the right customer find you, understand the offer, and take the next step.", zh: "帮助合适的客户找到你、理解服务并采取下一步行动。" },
    "contractor.acquire1": { en: "Websites and landing pages", zh: "网站与落地页" },
    "contractor.acquire2": { en: "Restaurant QR menu and phone-ordering web apps", zh: "餐厅二维码菜单与手机点餐 Web App" },
    "contractor.acquire3": { en: "Quote-request and lead forms", zh: "报价请求与潜客表单" },
    "contractor.acquire4": { en: "Booking systems", zh: "预约系统" },
    "contractor.operations": { en: "Operations", zh: "运营" },
    "contractor.operationsBody": { en: "Reduce re-entry, unclear ownership, and repetitive internal work.", zh: "减少重复录入、责任不清和重复内部工作。" },
    "contractor.operations1": { en: "CRM setup or a custom lightweight CRM", zh: "CRM 配置或定制轻量 CRM" },
    "contractor.operations2": { en: "n8n workflows and Claude Code / Codex automations", zh: "n8n 流程与 Claude Code / Codex 自动化" },
    "contractor.operations3": { en: "Document processing and internal notifications", zh: "文档处理与内部通知" },
    "contractor.operations4": { en: "Reporting dashboards and database integrations", zh: "报表仪表盘与数据库集成" },
    "contractor.communication": { en: "Customer communication", zh: "客户沟通" },
    "contractor.communicationBody": { en: "Respond consistently while keeping a person available for judgment.", zh: "保持一致响应，同时让人工继续负责判断。" },
    "contractor.communication1": { en: "AI receptionist, website chatbot, or FAQ assistant", zh: "AI 接待员、网站聊天机器人或 FAQ 助手" },
    "contractor.communication2": { en: "Missed-call follow-up and lead qualification", zh: "未接来电跟进与潜客筛选" },
    "contractor.communication3": { en: "Appointment handling", zh: "预约处理" },
    "contractor.communication4": { en: "Human escalation for exceptions", zh: "例外情况转交人工" },
    "contractor.information": { en: "Information management", zh: "信息管理" },
    "contractor.informationBody": { en: "Turn scattered messages and documents into usable business information.", zh: "把分散的消息和文档转化为可用的业务信息。" },
    "contractor.information1": { en: "AI information collection and email extraction", zh: "AI 信息收集与邮件提取" },
    "contractor.information2": { en: "Structured customer intake", zh: "结构化客户信息收集" },
    "contractor.information3": { en: "Knowledge bases and internal assistants", zh: "知识库与内部助手" },
    "contractor.information4": { en: "Customer-data organization", zh: "客户数据整理" },
    "contractor.engagementEyebrow": { en: "Two separate ways to work together", zh: "两种独立合作方式" },
    "contractor.engagementTitle": { en: "Consulting finds the answer. Implementation builds it.", zh: "咨询找到答案，实施把它做出来。" },
    "contractor.pathA": { en: "Path A · Custom consulting", zh: "路径 A · 定制咨询" },
    "contractor.consulting": { en: "Business systems diagnosis", zh: "业务系统诊断" },
    "contractor.consultingBody": { en: "A paid, custom-quoted engagement to map the current operation, identify bottlenecks, compare options, and deliver a practical prescription. You may stop there.", zh: "这是单独付费、定制报价的服务，用于梳理现有运营、识别瓶颈、比较方案并交付实用建议。你可以在此结束。" },
    "contractor.pathB": { en: "Path B · Implementation", zh: "路径 B · 实施" },
    "contractor.implementation": { en: "Build the selected system", zh: "搭建选定系统" },
    "contractor.implementationBody": { en: "A separately scoped and custom-quoted project to configure, connect, or build the approved solution, with acceptance criteria and handoff defined before work starts.", zh: "这是另行确定范围和定制报价的项目，用于配置、连接或搭建批准的方案，并在开工前明确验收标准和交付方式。" },
    "contractor.paymentEyebrow": { en: "Scope and payment", zh: "范围与付款" },
    "contractor.paymentTitle": { en: "A clear path from fit call to accepted work.", zh: "从匹配通话到验收交付，每一步都清晰。" },
    "contractor.paymentBody": { en: "Every paid engagement receives a custom quote. The proposal or statement of work defines the exact scope, acceptance criteria, schedule, currency, taxes, and payment terms.", zh: "每项付费服务都会单独报价。提案或工作说明书会明确具体范围、验收标准、时间、币种、税费和付款条款。" },
    "contractor.pay1": { en: "Free 15-min fit call", zh: "免费 15 分钟匹配通话" },
    "contractor.pay1Body": { en: "Discuss the problem and decide whether to continue.", zh: "讨论问题并决定是否继续。" },
    "contractor.pay2": { en: "Agree on scope", zh: "确认范围" },
    "contractor.pay2Body": { en: "Choose consulting or implementation and define the outcome.", zh: "选择咨询或实施，并明确结果。" },
    "contractor.pay3": { en: "Proposal + SOW + invoice", zh: "提案 + 工作说明书 + 发票" },
    "contractor.pay3Body": { en: "Review deliverables, acceptance criteria, timing, and price.", zh: "审阅交付物、验收标准、时间和价格。" },
    "contractor.pay4": { en: "25% kickoff payment", zh: "支付 25% 启动款" },
    "contractor.pay4Body": { en: "Pay by Stripe Payment Link, PayPal, or e-transfer as invoiced.", zh: "按发票通过 Stripe Payment Link、PayPal 或电子转账付款。" },
    "contractor.pay5": { en: "Work begins", zh: "开始工作" },
    "contractor.pay5Body": { en: "The kickoff amount is earned when consulting or implementation starts.", zh: "咨询或实施开始后，启动款即作为已完成启动工作的费用。" },
    "contractor.pay6": { en: "Acceptance + remaining 75%", zh: "验收 + 支付剩余 75%" },
    "contractor.pay6Body": { en: "Review the agreed deliverables; the balance is invoiced after acceptance.", zh: "审阅约定交付物；验收后开具余款发票。" },
    "contractor.commitmentEyebrow": { en: "Remaining-fee satisfaction commitment", zh: "余款满意承诺" },
    "contractor.commitmentTitle": { en: "Your remaining 75% is waived when agreed acceptance criteria remain unmet after correction.", zh: "如果修正后仍未达到约定验收标准，剩余 75% 将被免除。" },
    "contractor.commitmentBody": { en: "Tell me the material issue and give me a reasonable opportunity to correct it. When the agreed criteria remain unmet after correction, the remaining balance is waived. The 25% kickoff amount, approved third-party costs, accepted milestones, and out-of-scope work remain payable. Revenue and other business outcomes depend on the client operation and market. Your signed proposal or SOW contains the controlling details.", zh: "请指出实质问题并给我合理的修正机会。修正后仍未达到约定标准时，剩余款项将被免除。25% 启动款、已批准的第三方费用、已验收里程碑和范围外工作仍需支付。收入和其他业务成果取决于客户运营与市场。最终以签署的提案或工作说明书为准。" },
    "contractor.demosEyebrow": { en: "Working demos and builder proof", zh: "可用演示与搭建能力证明" },
    "contractor.demosTitle": { en: "See how I think, build, and hand off systems.", zh: "看看我如何思考、搭建并交付系统。" },
    "contractor.demosBody": { en: "Demos illustrate possible workflows. Builder proof presents shipped work from my technical portfolio, with every item clearly labelled.", zh: "演示用于展示可能的流程。能力证明展示我的技术作品集中的已交付项目，并清晰标注每个项目。" },
    "contractor.plumbingDemo": { en: "Plumbing lead follow-up", zh: "管道服务潜客跟进" },
    "contractor.plumbingDemoBody": { en: "A customer submits the address, issue, urgency, and preferred time. Service area is checked, dispatch is alerted, and an open estimate stays visible for follow-up.", zh: "客户提交地址、问题、紧急程度和偏好时间。系统检查服务区域、提醒调度人员，并持续显示待跟进报价。" },
    "contractor.openWorkflowDemos": { en: "View workflow demos", zh: "查看流程演示" },
    "contractor.solutionConcept": { en: "Solution concept", zh: "方案概念" },
    "contractor.restaurantDemo": { en: "Restaurant QR ordering web app", zh: "餐厅二维码点餐 Web App" },
    "contractor.restaurantDemoBody": { en: "A mobile menu and ordering flow designed for an in-store guest who scans a table QR code, reviews items, submits an order, and receives clear status.", zh: "为到店顾客设计的移动菜单与点餐流程：扫描桌面二维码、查看菜品、提交订单并获得清晰状态。" },
    "contractor.askDemo": { en: "Ask for a guided demo", zh: "预约讲解演示" },
    "contractor.phospheneDemo": { en: "Interactive vision simulator", zh: "交互式视觉模拟器" },
    "contractor.phospheneDemoBody": { en: "A live web application connected to published technical work—evidence of research depth and interactive implementation.", zh: "与已发表技术研究相连的在线 Web 应用，用于证明研究深度和交互实现能力。" },
    "contractor.openPhosphene": { en: "Open live demo", zh: "打开在线演示" },
    "contractor.faqTitle": { en: "Before you book", zh: "预约前常见问题" },
    "contractor.faq1": { en: "What happens in the free 15-minute call?", zh: "免费 15 分钟通话会做什么？" },
    "contractor.faq1a": { en: "It is a fit call. We discuss one business problem, clarify the likely next step, and decide whether a separate consulting diagnosis or implementation project makes sense. No client relationship is created until a written scope is accepted.", zh: "这是一次匹配通话。我们讨论一个业务问题，明确可能的下一步，并判断独立咨询诊断或实施项目是否合理。只有接受书面范围后才建立客户合作关系。" },
    "contractor.faq2": { en: "Is consulting separate from implementation?", zh: "咨询与实施是分开的吗？" },
    "contractor.faq2a": { en: "Yes. A paid diagnosis can stand alone and produce recommendations. Implementation is separately scoped and custom quoted, whether it follows the diagnosis or begins from an already-defined requirement.", zh: "是的。付费诊断可以独立进行并交付建议。实施项目会另行确定范围和定制报价，无论它是否接在诊断之后。" },
    "contractor.faq3": { en: "How does payment work?", zh: "如何付款？" },
    "contractor.faq3a": { en: "Unless a proposal says otherwise, you approve the scope, receive a proposal or SOW and invoice, pay 25% to begin, then pay the remaining 75% after acceptance. The invoice can provide Stripe, PayPal, or e-transfer instructions.", zh: "除非提案另有约定，你确认范围后会收到提案或工作说明书及发票，支付 25% 后开工，验收后支付剩余 75%。发票可提供 Stripe、PayPal 或电子转账说明。" },
    "contractor.faq4": { en: "What does the satisfaction commitment cover?", zh: "满意承诺涵盖什么？" },
    "contractor.faq4a": { en: "When material issues remain after a reasonable correction opportunity, the remaining 75% is waived. The kickoff amount, approved third-party costs, accepted milestones, and out-of-scope work remain payable. The signed agreement controls.", zh: "在合理修正机会后仍存在实质问题时，剩余 75% 将被免除。启动款、已批准的第三方费用、已验收里程碑和范围外工作仍需支付。最终以签署协议为准。" },
    "contractor.faq5": { en: "How do you choose between AI, CRM changes, and a custom build?", zh: "你如何在 AI、CRM 调整和定制开发之间做选择？" },
    "contractor.faq5a": { en: "The diagnosis compares the current tools, workflow, expected value, and risk before recommending the most practical path.", zh: "诊断会比较现有工具、工作流程、预期价值和风险，再推荐最实际的路径。" },
    "contractor.faq6": { en: "Can you work with sensitive customer data?", zh: "你能处理敏感客户数据吗？" },
    "contractor.faq6a": { en: "The data flow and risks receive a dedicated review during scoping. Higher-risk or regulated information may call for a different architecture, specialist advice, or an AI-free workflow.", zh: "确定范围时会专门审查数据流和风险。高风险或受监管信息可能需要不同架构、专业意见，或采用无 AI 流程。" },
    "contractor.finalEyebrow": { en: "Start with one real problem", zh: "从一个真实问题开始" },
    "contractor.finalTitle": { en: "Bring the workflow that is costing you leads or time.", zh: "带来一个正在让你损失潜客或时间的流程。" },
    "contractor.finalBody": { en: "The first 15 minutes are free. If there is a fit, the next step and its price are written down before any paid work begins.", zh: "前 15 分钟免费。如果适合合作，任何付费工作开始前都会书面说明下一步和价格。" },

    "privacy.settings": { en: "Privacy choices", zh: "隐私选择" },
    "consent.title": { en: "Your privacy choices", zh: "你的隐私选择" },
    "consent.body": { en: "This site works without optional tracking. If configured later, analytics helps improve the site and marketing measurement helps assess ads. Nothing optional loads until you choose.", zh: "本网站无需可选追踪也能正常运行。若日后配置，分析用于改善网站，营销衡量用于评估广告。在你选择前不会加载任何可选追踪。" },
    "consent.analytics": { en: "Analytics", zh: "分析" },
    "consent.analyticsBody": { en: "Measure visits and on-site actions.", zh: "衡量访问与站内操作。" },
    "consent.marketing": { en: "Marketing", zh: "营销" },
    "consent.marketingBody": { en: "Measure ad campaigns and future retargeting.", zh: "衡量广告活动和未来再营销。" },
    "consent.accept": { en: "Save choices", zh: "保存选择" },
    "consent.decline": { en: "Decline optional", zh: "拒绝可选追踪" },
    "consent.privacy": { en: "Privacy Policy", zh: "隐私政策" },

    "footer.tagline": { en: "Websites, lead capture, and practical automation for Canadian local businesses.", zh: "为加拿大本地企业提供网站、潜客收集与实用自动化。" },
    "footer.based": { en: "Based in BC · Serving Canada", zh: "常驻卑诗省 · 服务加拿大" },
    "footer.explore": { en: "Explore", zh: "浏览" },
    "footer.contact": { en: "Contact", zh: "联系" },
    "footer.precall": { en: "Pre-call guide", zh: "通话准备指南" },
    "footer.projects": { en: "Builder proof", zh: "搭建能力证明" },
    "footer.privacy": { en: "Privacy Policy", zh: "隐私政策" },
    "footer.terms": { en: "Terms of Service", zh: "服务条款" }
  };

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // The site remains usable when storage is unavailable.
    }
  }

  function getText(key, fallback) {
    return TEXT[key]?.[language] || TEXT[key]?.en || fallback || key;
  }

  function getSiteDepth() {
    const parts = decodeURIComponent(window.location.pathname).replaceAll("\\", "/").split("/").filter(Boolean);
    const repoIndex = parts.findIndex((part) => part.toLowerCase() === "kairuibi.com");
    const siteParts = repoIndex >= 0 ? parts.slice(repoIndex + 1) : parts;
    if (!siteParts.length) return 0;
    const last = siteParts[siteParts.length - 1];
    return /\.[a-z0-9]+$/i.test(last) ? Math.max(siteParts.length - 1, 0) : siteParts.length;
  }

  const prefix = "../".repeat(getSiteDepth());
  const resolvePath = (path) => {
    if (!path || /^(https?:|mailto:|tel:|#)/i.test(path)) return path;
    return `${prefix}${path}`;
  };

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  class SiteNavbar extends HTMLElement {
    connectedCallback() {
      this.classList.add("site-navbar");
      this.render();
    }

    render() {
      const links = config.navigation.map((item) =>
        `<a class="nav-link" href="${escapeHtml(resolvePath(item.href))}" data-i18n="nav.${item.key}">${escapeHtml(getText(`nav.${item.key}`, item.label))}</a>`
      ).join("");

      this.innerHTML = `
        <a class="skip-link" href="#main-content">${language === "zh" ? "跳到主要内容" : "Skip to main content"}</a>
        <header class="site-header">
          <div class="container header-inner">
            <div class="header-start">
              <div class="language-switch" aria-label="${language === "zh" ? "语言选择" : "Language selection"}">
                <button type="button" data-language="en" class="language-chip ${language === "en" ? "is-active" : ""}">EN</button>
                <button type="button" data-language="zh" class="language-chip ${language === "zh" ? "is-active" : ""}">中文</button>
              </div>
              <a class="brand-link" href="${escapeHtml(resolvePath(config.routes.home))}" aria-label="Kairui Bi home">
                <span class="brand-mark" aria-hidden="true">KB</span>
                <span class="brand-copy"><span class="brand-name">Kairui Bi</span><span class="brand-tag">${escapeHtml(language === "zh" ? "加拿大本地企业系统搭建者" : config.roleLabel)}</span></span>
              </a>
            </div>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-menu" data-i18n="nav.menu">${escapeHtml(getText("nav.menu", "Menu"))}</button>
            <nav class="site-nav" id="site-menu" aria-label="${language === "zh" ? "主导航" : "Main navigation"}">
              ${links}
              <a class="btn btn-primary btn-nav" href="${escapeHtml(resolvePath(config.routes.booking))}" data-i18n="nav.book" data-track-cta="nav-book">${escapeHtml(getText("nav.book", "Book a Checkup"))}</a>
            </nav>
          </div>
        </header>`;

      const toggle = this.querySelector(".nav-toggle");
      const menu = this.querySelector(".site-menu");
      toggle?.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        this.classList.toggle("is-open", !open);
      });
      this.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", () => {
        toggle?.setAttribute("aria-expanded", "false");
        this.classList.remove("is-open");
      }));
      this.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const year = new Date().getFullYear();
      this.innerHTML = `
        <footer class="site-footer">
          <div class="footer-grid">
            <div class="footer-brand-block">
              <a class="brand footer-brand" href="${escapeHtml(resolvePath(config.routes.home))}"><span class="brand-mark">KB</span><span><strong>Kairui Bi</strong></span></a>
              <p data-i18n="footer.tagline">${escapeHtml(getText("footer.tagline"))}</p>
              <p class="footer-location" data-i18n="footer.based">${escapeHtml(getText("footer.based"))}</p>
            </div>
            <div><strong data-i18n="footer.explore">${escapeHtml(getText("footer.explore"))}</strong><a href="${escapeHtml(resolvePath("index.html#services"))}" data-i18n="nav.services">${escapeHtml(getText("nav.services"))}</a><a href="${escapeHtml(resolvePath("index.html#industries"))}" data-i18n="nav.industries">${escapeHtml(getText("nav.industries"))}</a><a href="${escapeHtml(resolvePath(config.routes.precall))}" data-i18n="footer.precall">${escapeHtml(getText("footer.precall"))}</a><a href="${escapeHtml(resolvePath(config.routes.projects))}" data-i18n="footer.projects">${escapeHtml(getText("footer.projects"))}</a></div>
            <div><strong data-i18n="footer.contact">${escapeHtml(getText("footer.contact"))}</strong><a href="mailto:${escapeHtml(config.contactEmail)}">${escapeHtml(config.contactEmail)}</a><a href="${escapeHtml(config.linkedinUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="${escapeHtml(resolvePath(config.routes.booking))}" data-i18n="nav.book">${escapeHtml(getText("nav.book"))}</a></div>
            <div><strong>Legal</strong><a href="${escapeHtml(resolvePath(config.routes.privacy))}" data-i18n="footer.privacy">${escapeHtml(getText("footer.privacy"))}</a><a href="${escapeHtml(resolvePath(config.routes.terms))}" data-i18n="footer.terms">${escapeHtml(getText("footer.terms"))}</a><button class="footer-link-button" type="button" data-open-privacy data-i18n="privacy.settings">${escapeHtml(getText("privacy.settings"))}</button></div>
          </div>
          <div class="footer-bottom"><span>© ${year} Kairui Bi</span><span>kairuibi.com</span></div>
        </footer>`;
      this.querySelector("[data-open-privacy]")?.addEventListener("click", () => openConsent(true));
    }
  }

  customElements.define("site-navbar", SiteNavbar);
  customElements.define("site-footer", SiteFooter);

  function applyTranslations() {
    document.documentElement.lang = language === "zh" ? "zh-Hans" : "en";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (TEXT[key]) element.textContent = getText(key, element.textContent);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (TEXT[key]) element.setAttribute("placeholder", getText(key));
    });
    const titleKey = document.body?.dataset.i18nTitle;
    const descriptionKey = document.body?.dataset.i18nDescription;
    if (titleKey && TEXT[titleKey]) document.title = getText(titleKey);
    if (descriptionKey && TEXT[descriptionKey]) document.querySelector('meta[name="description"]')?.setAttribute("content", getText(descriptionKey));
    document.querySelectorAll("[data-current-language]").forEach((input) => { input.value = language; });
  }

  function setLanguage(next) {
    if (!SUPPORTED_LANGUAGES.has(next) || next === language) return;
    language = next;
    writeStorage(LANGUAGE_KEY, language);
    document.querySelectorAll("site-navbar, site-footer").forEach((component) => component.render?.());
    applyTranslations();
    refreshFormConfiguration();
    refreshConsentCopy();
    document.dispatchEvent(new CustomEvent("site:refresh"));
  }

  function captureCampaign() {
    const params = new URLSearchParams(window.location.search);
    const stored = (() => {
      try { return JSON.parse(window.sessionStorage.getItem(CAMPAIGN_KEY) || "{}"); } catch { return {}; }
    })();
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
      if (params.get(key)) stored[key] = params.get(key).slice(0, 200);
    });
    if (!stored.utm_source) stored.utm_source = config.campaignDefaults?.source || "website";
    if (!stored.utm_medium) stored.utm_medium = config.campaignDefaults?.medium || "organic";
    try { window.sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(stored)); } catch { /* optional storage */ }
    return stored;
  }

  const campaign = captureCampaign();

  function campaignUrl(url) {
    try {
      const parsed = new URL(url, window.location.href);
      Object.entries(campaign).forEach(([key, value]) => value && parsed.searchParams.set(key, value));
      return parsed.toString();
    } catch {
      return url;
    }
  }

  function applySiteTokens() {
    document.querySelectorAll("[data-booking-link]").forEach((link) => {
      link.href = campaignUrl(config.booking.publicUrl);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    document.querySelectorAll("[data-booking-embed]").forEach((frame) => { frame.src = config.booking.embedUrl; });
    document.querySelectorAll("[data-contact-link]").forEach((link) => { link.href = `mailto:${config.contactEmail}`; link.textContent = config.contactEmail; });
    document.querySelectorAll("[data-linkedin]").forEach((link) => { link.href = config.linkedinUrl; });
    document.querySelectorAll("[data-location]").forEach((element) => { element.textContent = config.location; });
  }

  function getYouTubeId(url) {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0] || "";
      if (/^(www\.)?(youtube\.com|youtube-nocookie\.com)$/.test(parsed.hostname)) {
        if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
        const parts = parsed.pathname.split("/").filter(Boolean);
        if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] || "";
      }
    } catch { /* keep the placeholder for an invalid URL */ }
    return "";
  }

  function setupPrecallVideo() {
    const slot = document.querySelector("[data-precall-video]");
    const videoId = getYouTubeId(config.precall?.youtubeUrl || "");
    if (!slot || !videoId) return;
    slot.classList.add("is-configured");
    slot.innerHTML = `<button class="precall-video-play" type="button"><span class="video-play-mark" aria-hidden="true">&#9654;</span><span data-i18n="precall.playVideo">${escapeHtml(getText("precall.playVideo"))}</span></button>`;
    slot.querySelector("button")?.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      iframe.title = config.precall?.videoTitle || getText("precall.videoPendingTitle");
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      slot.replaceChildren(iframe);
    });
  }

  function getConsent() {
    try { return JSON.parse(readStorage(CONSENT_KEY) || "null"); } catch { return null; }
  }

  function saveConsent(value) {
    writeStorage(CONSENT_KEY, JSON.stringify({ analytics: Boolean(value.analytics), marketing: Boolean(value.marketing), updatedAt: new Date().toISOString() }));
    activateTrackers();
  }

  function hasConfiguredTrackers() {
    return Boolean(config.analytics?.gaMeasurementId || config.analytics?.metaPixelId);
  }

  function buildConsentDialog() {
    if (document.querySelector("[data-consent-dialog]")) return;
    const dialog = document.createElement("div");
    dialog.className = "consent-shell";
    dialog.dataset.consentDialog = "";
    dialog.hidden = true;
    document.body.appendChild(dialog);
    refreshConsentCopy();
  }

  function refreshConsentCopy() {
    const dialog = document.querySelector("[data-consent-dialog]");
    if (!dialog) return;
    const consent = getConsent() || { analytics: false, marketing: false };
    dialog.innerHTML = `<div class="consent-card" role="dialog" aria-modal="true" aria-labelledby="consent-title"><div><span class="eyebrow" data-i18n="privacy.settings">${escapeHtml(getText("privacy.settings"))}</span><h2 id="consent-title" data-i18n="consent.title">${escapeHtml(getText("consent.title"))}</h2><p data-i18n="consent.body">${escapeHtml(getText("consent.body"))}</p></div><div class="consent-options"><label><input type="checkbox" name="analytics" ${consent.analytics ? "checked" : ""}><span><strong data-i18n="consent.analytics">${escapeHtml(getText("consent.analytics"))}</strong><small data-i18n="consent.analyticsBody">${escapeHtml(getText("consent.analyticsBody"))}</small></span></label><label><input type="checkbox" name="marketing" ${consent.marketing ? "checked" : ""}><span><strong data-i18n="consent.marketing">${escapeHtml(getText("consent.marketing"))}</strong><small data-i18n="consent.marketingBody">${escapeHtml(getText("consent.marketingBody"))}</small></span></label></div><div class="consent-actions"><button class="btn btn-primary" type="button" data-consent-save data-i18n="consent.accept">${escapeHtml(getText("consent.accept"))}</button><button class="btn" type="button" data-consent-decline data-i18n="consent.decline">${escapeHtml(getText("consent.decline"))}</button><a href="${escapeHtml(resolvePath(config.routes.privacy))}" data-i18n="consent.privacy">${escapeHtml(getText("consent.privacy"))}</a></div></div>`;
    dialog.querySelector("[data-consent-save]")?.addEventListener("click", () => {
      saveConsent({ analytics: dialog.querySelector('[name="analytics"]')?.checked, marketing: dialog.querySelector('[name="marketing"]')?.checked });
      dialog.hidden = true;
    });
    dialog.querySelector("[data-consent-decline]")?.addEventListener("click", () => { saveConsent({ analytics: false, marketing: false }); dialog.hidden = true; });
  }

  function openConsent(force) {
    buildConsentDialog();
    const dialog = document.querySelector("[data-consent-dialog]");
    if (dialog && (force || (hasConfiguredTrackers() && !getConsent()))) dialog.hidden = false;
  }

  function activateTrackers() {
    const consent = getConsent();
    if (!consent) return;
    if (consent.analytics && config.analytics?.gaMeasurementId && !window.__kbGaLoaded) {
      window.__kbGaLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", config.analytics.gaMeasurementId, { anonymize_ip: true });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.analytics.gaMeasurementId)}`;
      document.head.appendChild(script);
    }
    if (consent.marketing && config.analytics?.metaPixelId && !window.__kbMetaLoaded) {
      window.__kbMetaLoaded = true;
      window.fbq = window.fbq || function () { window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments); };
      window.fbq.queue = window.fbq.queue || [];
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq("init", config.analytics.metaPixelId);
      window.fbq("track", "PageView");
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }
  }

  function trackEvent(name, properties) {
    const consent = getConsent();
    if (consent?.analytics && typeof window.gtag === "function") window.gtag("event", name, properties || {});
    if (consent?.marketing && typeof window.fbq === "function") window.fbq("trackCustom", name, properties || {});
  }

  function fillFormMetadata(form) {
    const values = { ...campaign, page_path: window.location.pathname, referrer: document.referrer, language };
    Object.entries(values).forEach(([name, value]) => {
      const input = form.elements.namedItem(name);
      if (input) input.value = value || "";
    });
  }

  function buildMailto(form) {
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      if (!key.startsWith("_") && value) lines.push(`${key}: ${value}`);
    }
    const subject = encodeURIComponent(`Systems Checkup inquiry — ${data.get("business_name") || data.get("name") || "website lead"}`);
    return `mailto:${config.contactEmail}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function getLeadEndpointType(endpoint) {
    if (/^https:\/\/formsubmit\.co\/ajax\/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(endpoint)) return "formsubmit";
    return "";
  }

  function refreshFormConfiguration() {
    document.querySelectorAll("[data-lead-form]").forEach((form) => {
      fillFormMetadata(form);
      const endpoint = config.leadForm?.endpoint || "";
      const endpointType = getLeadEndpointType(endpoint);
      const configured = Boolean(endpointType);
      const note = form.parentElement?.querySelector("[data-form-config-note]");
      const fallback = form.parentElement?.querySelector("[data-form-email-fallback]");
      if (configured) {
        form.action = endpointType === "formsubmit" ? endpoint.replace("/ajax/", "/") : endpoint;
        if (note) note.hidden = true;
      } else {
        form.action = `mailto:${config.contactEmail}`;
        if (note) { note.hidden = false; note.textContent = getText("form.unconfigured"); }
      }
      if (fallback) { fallback.textContent = getText("form.emailFallback"); fallback.href = buildMailto(form); }
    });
  }

  function setupForms() {
    document.querySelectorAll("[data-lead-form]").forEach((form) => {
      const wrapper = form.closest("[data-form-wrapper]") || form.parentElement;
      const success = wrapper?.querySelector("[data-form-success]");
      const error = wrapper?.querySelector("[data-form-error]");
      const fallback = wrapper?.querySelector("[data-form-email-fallback]");
      const submit = form.querySelector('[type="submit"]');
      const submitKey = submit?.dataset.i18n || "form.submit";
      form.addEventListener("input", () => {
        if (!leadFormStarted) { leadFormStarted = true; trackEvent("lead_form_start", { page_path: window.location.pathname }); }
        if (fallback) fallback.href = buildMailto(form);
      });
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        fillFormMetadata(form);
        if (!form.reportValidity()) return;
        const endpoint = config.leadForm?.endpoint || "";
        const endpointType = getLeadEndpointType(endpoint);
        if (!endpointType) {
          if (error) { error.hidden = false; error.textContent = getText("form.unconfigured"); }
          if (fallback) { fallback.href = buildMailto(form); fallback.focus(); }
          return;
        }
        if (submit) { submit.disabled = true; submit.textContent = getText("form.sending"); }
        if (error) error.hidden = true;
        try {
          const formData = new FormData(form);
          const request = {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
          };
          const response = await fetch(endpoint, request);
          if (!response.ok) throw new Error("Submission failed");
          trackEvent("lead_form_submit", { page_path: window.location.pathname, industry: form.elements.industry?.value || "" });
          form.hidden = true;
          wrapper?.querySelector("[data-form-config-note]")?.setAttribute("hidden", "");
          if (success) { success.hidden = false; success.focus(); }
        } catch {
          if (error) { error.hidden = false; error.textContent = getText("form.error"); }
          if (fallback) fallback.href = buildMailto(form);
        } finally {
          if (submit) { submit.disabled = false; submit.textContent = getText(submitKey, submit.textContent); }
        }
      });
    });
    refreshFormConfiguration();
  }

  function setupTracking() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      if (link.matches('[data-track-cta], a[href*="booking.html"], [data-booking-link]')) {
        trackEvent("cta_click", { label: link.textContent.trim().slice(0, 100), location: link.dataset.trackCta || "link", page_path: window.location.pathname });
      }
      if (link.hasAttribute("data-booking-link")) trackEvent("scheduler_open", { page_path: window.location.pathname });
    });
    if (document.body?.dataset.page === "booking") trackEvent("booking_page_visit", { page_path: window.location.pathname });
  }

  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  }

  function init() {
    applyTranslations();
    applySiteTokens();
    setupPrecallVideo();
    setupForms();
    setupTracking();
    setupReveal();
    buildConsentDialog();
    activateTrackers();
    openConsent(false);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
