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
    "nav.industries": { en: "Industries", zh: "行业" },
    "nav.examples": { en: "Results / Examples", zh: "成果 / 示例" },
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
    "cta.checkup15": { en: "Book a free 15-min Systems Checkup", zh: "预约免费 15 分钟系统检查" },
    "cta.checkup": { en: "Book a free Systems Checkup", zh: "预约免费系统检查" },
    "cta.workflow": { en: "See how a lead workflow works", zh: "查看潜客流程示例" },
    "cta.linkedin": { en: "View LinkedIn", zh: "查看 LinkedIn" },
    "trust.one": { en: "One-person builder", zh: "一人全程负责" },
    "trust.human": { en: "Human-reviewed automation", zh: "人工复核自动化" },
    "trust.handoff": { en: "Clean handoff", zh: "清晰交付" },
    "workflow.example": { en: "Example system", zh: "示例系统" },
    "workflow.leadJob": { en: "Lead to job", zh: "从潜客到订单" },
    "workflow.inquiry": { en: "New inquiry", zh: "新咨询" },
    "workflow.inquiryNote": { en: "Website, phone, or ad", zh: "网站、电话或广告" },
    "workflow.captured": { en: "Captured", zh: "统一收集" },
    "workflow.capturedNote": { en: "Details organized once", zh: "信息一次整理" },
    "workflow.alerted": { en: "Owner alerted", zh: "负责人收到提醒" },
    "workflow.alertedNote": { en: "The right person sees it", zh: "正确的人及时看到" },
    "workflow.followup": { en: "Estimate & follow-up", zh: "报价与跟进" },
    "workflow.followupNote": { en: "Nothing quietly disappears", zh: "不让机会悄悄流失" },
    "workflow.note": { en: "Start with the business problem. Use AI only when it helps.", zh: "先从业务问题出发，只在真正有帮助时使用 AI。" },
    "workflow.visualLabel": { en: "Lead workflow", zh: "潜客流程" },
    "workflow.capture": { en: "Capture", zh: "收集" },
    "workflow.route": { en: "Route", zh: "分配" },
    "workflow.followShort": { en: "Follow up", zh: "跟进" },
    "workflow.websiteCall": { en: "Website / call / ad", zh: "网站 / 电话 / 广告" },
    "workflow.ownerAlert": { en: "Owner alert", zh: "负责人提醒" },
    "workflow.estimateReminder": { en: "Estimate reminder", zh: "报价提醒" },
    "workflow.sequence1": { en: "Every inquiry enters one organized intake.", zh: "每条咨询都进入统一整理的入口。" },
    "workflow.sequence2": { en: "The right person sees the details and next action.", zh: "正确的人会看到详情和下一步操作。" },
    "workflow.sequence3": { en: "Estimates stay visible until follow-up is complete.", zh: "报价会保持可见，直到跟进完成。" },
    "workflow.ready": { en: "Ready for action", zh: "等待处理" },
    "workflow.nothingLost": { en: "Nothing lost", zh: "不再遗漏" },

    "pain.eyebrow": { en: "Problem recognition", zh: "常见问题" },
    "pain.title": { en: "Where does work fall through the cracks?", zh: "工作在哪些环节悄悄流失？" },
    "pain.body": { en: "The best first project is usually hiding inside a small, repeated frustration.", zh: "最值得先解决的项目，通常藏在每天反复出现的小麻烦里。" },
    "pain.1": { en: "A quote request sits in an inbox while the day gets busy.", zh: "报价请求躺在收件箱里，忙起来就被忘记。" },
    "pain.2": { en: "Lead details are copied by hand into a spreadsheet or CRM.", zh: "潜客资料需要手工复制到表格或 CRM。" },
    "pain.3": { en: "The website makes calling or requesting a quote difficult on mobile.", zh: "网站在手机上不方便拨打电话或提交报价请求。" },
    "pain.4": { en: "Estimates and bookings live in different tools with inconsistent follow-up.", zh: "报价和预约分散在不同工具中，跟进不一致。" },
    "pain.5": { en: "Employees repeat the same data entry and status updates.", zh: "员工反复录入相同资料、更新相同状态。" },
    "pain.6": { en: "You are unsure which AI tools are actually worth paying for.", zh: "你不确定哪些 AI 工具真正值得付费。" },

    "services.eyebrow": { en: "Services", zh: "服务" },
    "services.title": { en: "Diagnose first. Build what helps.", zh: "先诊断，再搭建真正有用的系统。" },
    "services.body": { en: "The goal is not to sell more software. It is to fix one clear operational problem with the simplest useful approach.", zh: "目标不是卖更多软件，而是用最简单有效的方式解决一个明确的运营问题。" },
    "services.diagnose": { en: "Digital Systems Checkup", zh: "数字系统检查" },
    "services.diagnoseBody": { en: "Map one real workflow, find the bottleneck, review the tools you already pay for, and recommend the simplest path forward.", zh: "梳理一条真实流程，找出瓶颈，检查你已经付费的工具，并推荐最简单的改进路径。" },
    "services.diagnoseList": { en: "Configure existing software · Choose an off-the-shelf tool · Scope a focused custom fix", zh: "配置现有软件 · 选择成熟工具 · 规划小范围定制方案" },
    "services.build": { en: "Website & Lead Capture", zh: "网站与潜客收集" },
    "services.buildBody": { en: "Mobile-first websites built around calls, quote requests, booking, trust, speed, basic analytics, and practical local-search foundations.", zh: "以电话、报价请求、预约、信任、速度、基础分析和实用本地搜索基础为核心的移动优先网站。" },
    "services.buildList": { en: "Clear mobile actions · Useful forms · Fast, maintainable handoff", zh: "清晰的移动端操作 · 实用表单 · 快速且易维护的交付" },
    "services.automate": { en: "Workflow Automation & AI", zh: "流程自动化与 AI" },
    "services.automateBody": { en: "Connect forms, CRM, email, documents, notifications, reporting, and lightweight apps. Predictable work uses rules; AI is reserved for interpretation or generation.", zh: "连接表单、CRM、邮件、文档、通知、报表和轻量应用。可预测任务使用规则，只有解释或生成内容时才使用 AI。" },
    "services.automateList": { en: "Lead routing · Follow-up reminders · Intake, documents, and reporting", zh: "潜客分配 · 跟进提醒 · 客户信息、文档与报表" },
    "services.scope": { en: "Projects are scoped after the Systems Checkup.", zh: "项目范围将在系统检查后确定。" },

    "system.eyebrow": { en: "Combined service", zh: "组合服务" },
    "system.title": { en: "From new inquiry to organized follow-up.", zh: "从新咨询到有序跟进。" },
    "system.body": { en: "A Lead-to-Job System connects the website and everyday tools around one outcome: fewer missed opportunities and a workflow the owner can understand.", zh: "潜客到订单系统把网站和日常工具连接起来，目标只有一个：减少遗漏，让业主看得懂整个流程。" },
    "system.website": { en: "Website / Ad / Phone", zh: "网站 / 广告 / 电话" },
    "system.capture": { en: "Lead capture", zh: "潜客收集" },
    "system.qualify": { en: "Qualification", zh: "需求筛选" },
    "system.book": { en: "Booking", zh: "预约" },
    "system.estimate": { en: "Estimate", zh: "报价" },
    "system.follow": { en: "Follow-up", zh: "跟进" },
    "system.job": { en: "Job", zh: "订单" },
    "system.review": { en: "Review / Reporting", zh: "评价 / 报表" },
    "system.callout": { en: "This is a custom service, not another monthly software product.", zh: "这是定制服务，不是又一个按月收费的软件产品。" },

    "industries.eyebrow": { en: "Industries", zh: "行业" },
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
    "examples.stageBody": { en: "Built in six hours at Science World and awarded 2nd place at Vancouver HackerRivals. Proof that I can scope and ship working software quickly—not a local-business case study.", zh: "在 Science World 六小时内完成，并获 Vancouver HackerRivals 二等奖。它证明我能快速确定范围并交付可用软件，但不是本地企业案例。" },
    "examples.spie": { en: "Published technical work", zh: "已发表技术研究" },
    "examples.spieBody": { en: "A Proceedings of SPIE publication comparing facial-expression recognition models. Evidence of technical depth, kept secondary to business outcomes.", zh: "一篇发表于 Proceedings of SPIE 的表情识别模型比较论文，用于证明技术深度，但不会盖过业务成果。" },
    "examples.openStage": { en: "Open StagePulse", zh: "打开 StagePulse" },
    "examples.readPaper": { en: "View publication", zh: "查看论文" },

    "process.eyebrow": { en: "How I work", zh: "合作方式" },
    "process.title": { en: "Show me how the work moves.", zh: "先让我看看工作如何流动。" },
    "process.body": { en: "The goal is not to automate everything. It is to remove one specific bottleneck while keeping the system understandable.", zh: "目标不是把一切自动化，而是在系统仍然易懂的前提下消除一个具体瓶颈。" },
    "process.1": { en: "Diagnose the workflow", zh: "诊断流程" },
    "process.1Body": { en: "Map the trigger, people, tools, decisions, and handoffs around one real process.", zh: "围绕一条真实流程梳理触发点、人员、工具、决策与交接。" },
    "process.2": { en: "Prescribe the simplest useful fix", zh: "提出最简单有效的方案" },
    "process.2Body": { en: "Improve existing software first. Recommend a new product or custom build only when it earns its place.", zh: "先改善现有软件，只有确有必要时才推荐新产品或定制开发。" },
    "process.3": { en: "Build and connect it", zh: "搭建并连接" },
    "process.3Body": { en: "Create the website flow, integration, automation, or lightweight app with review points visible.", zh: "搭建网站流程、集成、自动化或轻量应用，并保留清晰复核点。" },
    "process.4": { en: "Measure and hand it off", zh: "衡量并交付" },
    "process.4Body": { en: "Test the system, document how it works, and make ownership clear after launch.", zh: "测试系统、记录使用方式，并明确上线后的维护责任。" },

    "faq.eyebrow": { en: "FAQ", zh: "常见问题" },
    "faq.title": { en: "Questions local owners actually ask.", zh: "本地企业主真正会问的问题。" },
    "faq.q1": { en: "Do I need to know anything about AI?", zh: "我需要懂 AI 吗？" },
    "faq.a1": { en: "No. We start with the business problem and only use AI when it is useful. Many good fixes are a clearer website, better software setup, or straightforward automation.", zh: "不需要。我们从业务问题开始，只在真正有用时使用 AI。很多好方案只是更清晰的网站、更合理的软件配置或简单自动化。" },
    "faq.q2": { en: "Can you work with the software we already use?", zh: "你能使用我们现有的软件吗？" },
    "faq.a2": { en: "Usually, yes. Integration and better configuration come before replacement. The checkup identifies what should stay, what should connect, and what is creating unnecessary work.", zh: "通常可以。集成和优化配置优先于替换。系统检查会明确哪些工具应该保留、哪些需要连接、哪些正在制造不必要的工作。" },
    "faq.q3": { en: "Do you replace our CRM or accounting system?", zh: "你会替换我们的 CRM 或会计系统吗？" },
    "faq.a3": { en: "Not by default. Core systems should be replaced only for a clear reason. I can improve the inputs, handoffs, reminders, and reporting around them.", zh: "默认不会。只有理由充分时才应替换核心系统。我可以改善它们周围的输入、交接、提醒和报表。" },
    "faq.q4": { en: "What kinds of tasks can be automated?", zh: "哪些任务可以自动化？" },
    "faq.a4": { en: "Lead routing, acknowledgements, reminders, status updates, document handling, customer intake, notifications, and routine reporting are common starting points.", zh: "潜客分配、自动确认、提醒、状态更新、文档处理、客户信息收集、通知和常规报表都是常见起点。" },
    "faq.q5": { en: "Can you rebuild an existing website?", zh: "你能改造现有网站吗？" },
    "faq.a5": { en: "Yes. The first step is deciding whether the current site needs a focused conversion improvement or a full rebuild.", zh: "可以。第一步是判断现有网站只需针对转化做改进，还是确实需要完整重建。" },
    "faq.q6": { en: "How long does a small project take?", zh: "小型项目需要多久？" },
    "faq.a6": { en: "Timing depends on access, integrations, and scope. After the checkup, you receive a defined proposal and timeline before work begins.", zh: "时间取决于访问权限、集成和范围。系统检查后，你会在开工前收到明确的方案和时间表。" },
    "faq.q7": { en: "What happens after launch?", zh: "上线后怎么办？" },
    "faq.a7": { en: "The system is tested, documented, and handed off. Ongoing support can be scoped when the workflow needs monitoring or continued improvement.", zh: "系统会经过测试、记录并完成交付。如果流程需要监控或持续改进，可以另行确定支持范围。" },
    "faq.q8": { en: "How do you handle sensitive business data?", zh: "你如何处理敏感业务数据？" },
    "faq.a8": { en: "Data access is minimized, credentials are not placed in public code, and sensitive workflows are reviewed before implementation. Any specific compliance requirement must be identified during scoping.", zh: "尽量减少数据访问，不把凭据放进公开代码，并在实施前审查敏感流程。任何特定合规要求都需要在确定范围时说明。" },

    "form.eyebrow": { en: "Not ready to book?", zh: "还没准备好预约？" },
    "form.title": { en: "Tell me one process you want to improve.", zh: "告诉我一个你想改善的流程。" },
    "form.body": { en: "Share the short version. I will reply with the most useful next step, even if that means recommending an existing tool instead of a custom build.", zh: "简单描述即可。我会回复最有用的下一步，即使答案是建议使用现有工具而不是定制开发。" },
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
    "about.body": { en: "I’m Kairui Bi, a BC-based builder working across practical automation and lightweight web software. I prefer small systems that solve a measurable problem over large technology projects that are hard to maintain.", zh: "我是 Kairui Bi，一名常驻卑诗省、专注实用自动化与轻量网站软件的搭建者。我更喜欢解决可衡量问题的小系统，而不是难以维护的大型技术项目。" },
    "about.proof": { en: "My technical background includes published computer-vision research and a 2nd-place HackerRivals build. Those are proof that I can ship and understand complex systems—not substitutes for local-business results.", zh: "我的技术背景包括已发表的计算机视觉研究和 HackerRivals 二等奖作品。它们证明我能交付并理解复杂系统，但不会被包装成本地企业成果。" },
    "about.final": { en: "Show me one workflow that wastes your time.", zh: "告诉我一个正在浪费你时间的流程。" },

    "booking.title": { en: "Book a Free Systems Checkup | Kairui Bi", zh: "预约免费系统检查 | Kairui Bi" },
    "booking.description": { en: "Book a free 15-minute Systems Checkup with Kairui Bi for a Canadian local-business website or workflow.", zh: "预约与 Kairui Bi 的免费 15 分钟系统检查，讨论加拿大本地企业的网站或工作流程。" },
    "booking.eyebrow": { en: "Free 15-minute fit check", zh: "免费 15 分钟匹配检查" },
    "booking.heading": { en: "Start with the workflow, not the software.", zh: "从工作流程开始，而不是从软件开始。" },
    "booking.body": { en: "Bring one process that feels slow, manual, or easy to lose track of. We will decide whether the next step is a website change, better configuration, an existing product, an integration, or a custom system.", zh: "带来一个缓慢、手工或容易失去跟踪的流程。我们会判断下一步应是网站改进、配置优化、现有产品、系统集成还是定制方案。" },
    "booking.expect1": { en: "One real workflow discussed", zh: "讨论一条真实流程" },
    "booking.expect2": { en: "No obligation to use AI", zh: "无需预设必须使用 AI" },
    "booking.expect3": { en: "A clear next step if there is a fit", zh: "若适合合作，明确下一步" },
    "booking.open": { en: "Open scheduler in a new tab", zh: "在新标签页打开预约" },
    "booking.email": { en: "Email instead", zh: "改用电子邮件" },

    "contractor.title": { en: "Contractor Websites & Lead Follow-up Systems | Kairui Bi", zh: "承包商网站与潜客跟进系统 | Kairui Bi" },
    "contractor.description": { en: "Websites and simple lead follow-up systems for Canadian contractors, built by Kairui Bi.", zh: "Kairui Bi 为加拿大承包商搭建网站与简单潜客跟进系统。" },
    "contractor.eyebrow": { en: "For Canadian contractors", zh: "面向加拿大承包商" },
    "contractor.hero": { en: "Turn more contractor inquiries into organized follow-up.", zh: "把更多承包商咨询转化为有序跟进。" },
    "contractor.heroBody": { en: "I build websites and simple systems for Canadian contractors so new inquiries are captured, routed, followed up, and easy to review.", zh: "我为加拿大承包商搭建网站和简单系统，让新咨询得到收集、分配、跟进并便于查看。" },
    "contractor.capture": { en: "01 · Capture", zh: "01 · 收集" },
    "contractor.captureBody": { en: "Calls and quote requests arrive with useful job details.", zh: "电话和报价请求会附带有用的工作详情。" },
    "contractor.route": { en: "02 · Route", zh: "02 · 分配" },
    "contractor.routeBody": { en: "Service area, urgency, scheduling, and dispatch context stay together.", zh: "服务区域、紧急程度、排期和派工信息保持统一。" },
    "contractor.follow": { en: "03 · Follow up", zh: "03 · 跟进" },
    "contractor.followBody": { en: "Open estimates, invoices, and review requests remain visible.", zh: "未完成的报价、发票和评价邀请始终可见。" },
    "contractor.painEyebrow": { en: "Calls · Quotes · Estimates", zh: "电话 · 报价请求 · 报价" },
    "contractor.painTitle": { en: "A missed call should not become a missed job.", zh: "漏接一个电话，不该等于错过一份订单。" },
    "contractor.pain1": { en: "Quote requests arrive without the job details needed to respond.", zh: "报价请求没有包含回复所需的工作详情。" },
    "contractor.pain2": { en: "Calls, forms, and messages are tracked in different places.", zh: "电话、表单和消息分散在不同地方。" },
    "contractor.pain3": { en: "Estimates are sent, but follow-up depends on someone remembering.", zh: "报价已经发出，但跟进完全依赖人工记忆。" },
    "contractor.before": { en: "Before", zh: "改进前" },
    "contractor.after": { en: "After", zh: "改进后" },
    "contractor.change": { en: "Workflow change", zh: "流程改进" },
    "contractor.visible": { en: "Make the handoff visible.", zh: "让每次交接清晰可见。" },
    "contractor.beforeBody": { en: "Missed call → note on paper → details re-entered → estimate sent → follow-up uncertain", zh: "漏接电话 → 纸上记录 → 重复录入 → 发送报价 → 跟进不确定" },
    "contractor.afterBody": { en: "Inquiry captured → service area checked → job details routed → estimate tracked → reminder queued", zh: "收集咨询 → 检查服务区域 → 分配工作详情 → 跟踪报价 → 安排提醒" },
    "contractor.helpTitle": { en: "Three ways I can help", zh: "我可以从三个方面帮助你" },
    "contractor.help1": { en: "A website built around calls and quote requests", zh: "围绕电话和报价请求设计的网站" },
    "contractor.help1Body": { en: "Clear service areas, mobile contact actions, useful job-detail forms, trust signals, and fast pages.", zh: "清晰服务区域、移动联系操作、实用工作详情表单、信任信息和快速页面。" },
    "contractor.help2": { en: "Organized inquiry and dispatch handoffs", zh: "有序的咨询与派工交接" },
    "contractor.help2Body": { en: "Route calls and forms to the right person with consistent job details, status, and scheduling context.", zh: "把电话和表单交给正确负责人，并保持工作详情、状态和排期信息一致。" },
    "contractor.help3": { en: "Estimate and follow-up visibility", zh: "报价与跟进可见性" },
    "contractor.help3Body": { en: "Keep estimates, reminders, invoices, and review requests visible without replacing your core systems by default.", zh: "让报价、提醒、发票和评价邀请保持可见，同时默认不替换你的核心系统。" },
    "contractor.demoTitle": { en: "Demo: Plumbing Lead Follow-up", zh: "演示：管道服务潜客跟进" },
    "contractor.demoBody": { en: "This example uses dummy data. It demonstrates the workflow, not a client result.", zh: "此示例使用虚拟数据，用于展示流程，并非客户成果。" },
    "contractor.step1": { en: "Customer submits address, issue, urgency, and preferred time.", zh: "客户提交地址、问题、紧急程度和偏好时间。" },
    "contractor.step2": { en: "The system checks the service area and alerts the dispatcher.", zh: "系统检查服务区域并提醒调度人员。" },
    "contractor.step3": { en: "Job details stay together through scheduling and estimate preparation.", zh: "工作详情在排期和报价准备过程中保持统一。" },
    "contractor.step4": { en: "If the estimate is still open, a follow-up reminder appears.", zh: "如果报价仍未结束，系统会显示跟进提醒。" },
    "contractor.faqTitle": { en: "Contractor questions", zh: "承包商常见问题" },
    "contractor.faq1": { en: "Do I need a new CRM?", zh: "我需要新的 CRM 吗？" },
    "contractor.faq1a": { en: "Usually not. The first goal is to make your existing website, inbox, scheduling, CRM, or job software work together more clearly.", zh: "通常不需要。第一目标是让你现有的网站、收件箱、排期、CRM 或工作管理软件更清晰地协同。" },
    "contractor.faq2": { en: "Can this work for emergency or after-hours calls?", zh: "这适用于紧急或非工作时间电话吗？" },
    "contractor.faq2a": { en: "The intake and alerting flow can distinguish urgency and route information, but it should support—not replace—your real emergency response process.", zh: "信息收集与提醒流程可以区分紧急程度并分配信息，但它应支持而不是替代真实的紧急响应流程。" },
    "contractor.faq3": { en: "Can you show exact ROI?", zh: "你能展示准确的投资回报吗？" },
    "contractor.faq3a": { en: "Not before measuring your current workflow. We first define what is being missed or repeated, then agree on practical measures for the project.", zh: "在衡量现有流程前不能。我们会先明确哪些工作被遗漏或重复，再共同确定项目的实际衡量方式。" },

    "privacy.settings": { en: "Privacy choices", zh: "隐私选择" },
    "consent.title": { en: "Your privacy choices", zh: "你的隐私选择" },
    "consent.body": { en: "This site works without optional tracking. If configured later, analytics helps improve the site and marketing measurement helps assess ads. Nothing optional loads until you choose.", zh: "本网站无需可选追踪也能正常运行。若日后配置，分析用于改善网站，营销衡量用于评估广告。在你选择前不会加载任何可选追踪。" },
    "consent.analytics": { en: "Analytics", zh: "分析" },
    "consent.analyticsBody": { en: "Measure visits and on-site actions.", zh: "衡量访问与站内操作。" },
    "consent.marketing": { en: "Marketing", zh: "营销" },
    "consent.marketingBody": { en: "Measure ad campaigns and future retargeting.", zh: "衡量广告活动和未来再营销。" },
    "consent.accept": { en: "Save choices", zh: "保存选择" },
    "consent.decline": { en: "Decline optional", zh: "拒绝可选追踪" },
    "consent.privacy": { en: "Read privacy policy", zh: "阅读隐私政策" },

    "footer.tagline": { en: "Websites, lead capture, and practical automation for Canadian local businesses.", zh: "为加拿大本地企业提供网站、潜客收集与实用自动化。" },
    "footer.based": { en: "Based in BC · Serving Canada", zh: "常驻卑诗省 · 服务加拿大" },
    "footer.explore": { en: "Explore", zh: "浏览" },
    "footer.contact": { en: "Contact", zh: "联系" },
    "footer.contractors": { en: "For contractors", zh: "承包商专页" },
    "footer.projects": { en: "Builder proof", zh: "搭建能力证明" },
    "footer.privacy": { en: "Privacy", zh: "隐私" },
    "footer.terms": { en: "Terms", zh: "条款" }
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
            <div><strong data-i18n="footer.explore">${escapeHtml(getText("footer.explore"))}</strong><a href="${escapeHtml(resolvePath("index.html#services"))}" data-i18n="nav.services">${escapeHtml(getText("nav.services"))}</a><a href="${escapeHtml(resolvePath("index.html#industries"))}" data-i18n="nav.industries">${escapeHtml(getText("nav.industries"))}</a><a href="${escapeHtml(resolvePath(config.routes.contractors))}" data-i18n="footer.contractors">${escapeHtml(getText("footer.contractors"))}</a><a href="${escapeHtml(resolvePath(config.routes.projects))}" data-i18n="footer.projects">${escapeHtml(getText("footer.projects"))}</a></div>
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

  function refreshFormConfiguration() {
    document.querySelectorAll("[data-lead-form]").forEach((form) => {
      fillFormMetadata(form);
      const configured = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(config.leadForm?.endpoint || "");
      const note = form.parentElement?.querySelector("[data-form-config-note]");
      const fallback = form.parentElement?.querySelector("[data-form-email-fallback]");
      if (configured) {
        form.action = config.leadForm.endpoint;
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
      form.addEventListener("input", () => {
        if (!leadFormStarted) { leadFormStarted = true; trackEvent("lead_form_start", { page_path: window.location.pathname }); }
        if (fallback) fallback.href = buildMailto(form);
      });
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        fillFormMetadata(form);
        if (!form.reportValidity()) return;
        const endpoint = config.leadForm?.endpoint || "";
        if (!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint)) {
          if (error) { error.hidden = false; error.textContent = getText("form.unconfigured"); }
          if (fallback) { fallback.href = buildMailto(form); fallback.focus(); }
          return;
        }
        if (submit) { submit.disabled = true; submit.textContent = getText("form.sending"); }
        if (error) error.hidden = true;
        try {
          const response = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
          if (!response.ok) throw new Error("Submission failed");
          trackEvent("lead_form_submit", { page_path: window.location.pathname, industry: form.elements.industry?.value || "" });
          form.hidden = true;
          wrapper?.querySelector("[data-form-config-note]")?.setAttribute("hidden", "");
          if (success) { success.hidden = false; success.focus(); }
        } catch {
          if (error) { error.hidden = false; error.textContent = getText("form.error"); }
          if (fallback) fallback.href = buildMailto(form);
        } finally {
          if (submit) { submit.disabled = false; submit.textContent = getText("form.submit"); }
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
