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
    "nav.examples": { en: "Demos", zh: "演示" },
    "nav.precall": { en: "Pre-Call", zh: "通话准备" },
    "nav.process": { en: "Process", zh: "流程" },
    "nav.about": { en: "About", zh: "关于" },
    "nav.book": { en: "Book a Fit Call", zh: "预约匹配通话" },
    "nav.menu": { en: "Menu", zh: "菜单" },
    "nav.close": { en: "Close", zh: "关闭" },

    "home.title": { en: "Kairui Bi | AI Consulting & Systems Building for BC Businesses", zh: "Kairui Bi | 卑诗省企业 AI 咨询与系统搭建" },
    "home.heroEyebrow": { en: "Kairui Bi · BC, Canada", zh: "Kairui Bi · 加拿大卑诗省" },
    "home.heroTitle": { en: "AI Consulting & Systems Building for BC Businesses.", zh: "面向卑诗省企业的 AI 咨询与系统搭建。" },
    "home.heroBody": { en: "I help businesses choose the right AI tools, build practical customer-service systems, and set up digital operations that actually fit how the business works.", zh: "我帮助企业选择合适的 AI 工具、搭建实用的客户服务系统，并建立真正符合业务运作方式的数字化流程。" },
    "cta.checkup15": { en: "Book a Free 15-Min Fit Call", zh: "预约免费 15 分钟匹配通话" },
    "cta.checkup": { en: "Book a Free Fit Call", zh: "预约免费匹配通话" },
    "cta.workflow": { en: "See working demos", zh: "查看可用演示" },
    "cta.linkedin": { en: "View LinkedIn", zh: "查看 LinkedIn" },
    "trust.one": { en: "One-person builder", zh: "一人全程负责" },
    "trust.human": { en: "Human-reviewed automation", zh: "人工复核自动化" },
    "trust.handoff": { en: "Clean handoff", zh: "清晰交付" },
    "workflow.example": { en: "Three focused offers · illustrative", zh: "三项聚焦服务 · 示意" },
    "workflow.leadJob": { en: "Fit before build", zh: "先匹配再搭建" },
    "workflow.inquiry": { en: "Codex & Claude consulting", zh: "Codex 与 Claude 咨询" },
    "workflow.inquiryNote": { en: "Choose, configure, connect, or build the right system", zh: "选择、配置、连接或搭建合适系统" },
    "workflow.captured": { en: "AI chat & voice service", zh: "AI 文字与语音客户服务" },
    "workflow.capturedNote": { en: "Answer, qualify, collect, route, and escalate", zh: "回答、筛选、收集、分派与人工升级" },
    "workflow.alertedNote": { en: "Ordering, POS workflow, menu updates, and staff handoff", zh: "点餐、POS 流程、菜单更新与员工交接" },
    "workflow.followup": { en: "Front-desk lead · waiting for an answer", zh: "前台潜客 · 等待回复" },
    "workflow.followupNote": { en: "Common questions need a quick live response", zh: "常见问题需要快速实时回复" },
    "workflow.trustGap": { en: "Website visitor · trust gap", zh: "网站访客 · 信任缺口" },
    "workflow.trustGapNote": { en: "Proof, contact, and booking actions need to be obvious", zh: "证明、联系与预约操作需要一目了然" },
    "workflow.note": { en: "Every row shows the pain, owner, age, and next action.", zh: "每一行都显示问题、负责人、等待时间和下一步。" },
    "workflow.visualLabel": { en: "Fit-to-build path", zh: "从匹配到搭建" },
    "workflow.capture": { en: "Triage", zh: "分级" },
    "workflow.route": { en: "Assign", zh: "分配" },
    "workflow.followShort": { en: "Recover", zh: "挽回" },
    "workflow.describe": { en: "Fit Call", zh: "匹配通话" },
    "workflow.proposal": { en: "Diagnose", zh: "诊断" },
    "workflow.result": { en: "Build", zh: "搭建" },
    "workflow.websiteCall": { en: "Keep", zh: "保留" },
    "workflow.ownerAlert": { en: "Connect", zh: "连接" },
    "workflow.estimateReminder": { en: "Build", zh: "搭建" },
    "workflow.readout1": { en: "Priority lead", zh: "优先潜客" },
    "workflow.readout2": { en: "Owner action", zh: "负责人操作" },
    "workflow.readout3": { en: "Due today", zh: "今日到期" },
    "workflow.sequence1": { en: "Emergency call waiting eight minutes for a response.", zh: "紧急来电已等待八分钟回复。" },
    "workflow.sequence2": { en: "Quote request needs a postal code before assignment.", zh: "报价请求需要补充邮编后再分配。" },
    "workflow.sequence3": { en: "HVAC estimate is ready for a follow-up call.", zh: "暖通报价已进入今日回访。" },

    "services.eyebrow": { en: "Three focused offers", zh: "三项聚焦服务" },
    "services.title": { en: "Choose the business problem. Then choose the right system.", zh: "先明确业务问题，再选择合适系统。" },
    "services.body": { en: "Each offer starts with diagnosis and can continue into a separately scoped implementation.", zh: "每项服务都从诊断开始，并可在另行确定范围后进入实施。" },
    "services.problem": { en: "Problem", zh: "业务问题" },
    "services.deliver": { en: "Possible deliverables", zh: "可能交付" },
    "services.custom": { en: "When custom work fits", zh: "适合定制的情况" },
    "services.offer1": { en: "Codex & Claude AI Consulting / Implementation", zh: "Codex 与 Claude AI 咨询 / 实施" },
    "services.offer1Problem": { en: "Your team sees useful AI tools but needs a controlled plan for applying them to real work.", zh: "团队看到了有用的 AI 工具，但需要一套可控方案把它们用于真实工作。" },
    "services.offer1Custom": { en: "Custom implementation makes sense when a mature product cannot support the required workflow, controls, or handoff.", zh: "当成熟产品无法支持所需流程、控制或交接时，定制实施才有意义。" },
    "services.offer2": { en: "AI Chat & Voice Customer Service Systems", zh: "AI 文字与语音客户服务系统" },
    "services.offer2Problem": { en: "Customers wait for answers, calls are missed, and useful inquiry details do not reach the right person.", zh: "客户等待回复、来电未接，有用的咨询信息也没有到达正确负责人。" },
    "services.offer2Deliver": { en: "Website assistants, FAQ and knowledge flows, lead qualification, information collection, appointment inquiries, Voice AI reception, routing, and human escalation.", zh: "网站助手、FAQ 与知识流程、潜客筛选、信息收集、预约咨询、Voice AI 接待、分派与人工升级。" },
    "services.scope": { en: "Consulting and implementation are separate. You may take the diagnosis and recommendation without hiring me for the build.", zh: "咨询与实施彼此独立。你可以只获取诊断与建议，无需继续委托我搭建。" },

    "diagnose.eyebrow": { en: "Diagnose before building", zh: "先诊断，再搭建" },
    "diagnose.title": { en: "Keep, configure, connect, replace, or build.", zh: "保留、配置、连接、替换或搭建。" },
    "diagnose.body": { en: "The recommendation starts from your current operation, constraints, risks, and staff workflow.", zh: "建议从你当前的运营、限制、风险和员工流程出发。" },
    "diagnose.keep": { en: "Keep what already works", zh: "保留已有成效" },
    "diagnose.configure": { en: "Configure a mature platform", zh: "配置成熟平台" },
    "diagnose.connect": { en: "Connect the missing handoff", zh: "连接缺失交接" },
    "diagnose.replace": { en: "Replace the weak link", zh: "替换薄弱环节" },
    "diagnose.build": { en: "Build only for a real gap", zh: "只为真实缺口搭建" },

    "examples.eyebrow": { en: "Demo Gallery", zh: "演示作品库" },
    "examples.title": { en: "See what I have already built.", zh: "查看我已经搭建的作品。" },
    "examples.body": { en: "The full Demo Gallery shows actual workflow screens, delivered outputs, public products, and technical builds—so you can inspect how I structure inputs, decisions, and handoffs.", zh: "完整演示作品库展示真实流程界面、交付输出、公开产品和技术搭建，让你了解我如何组织输入、决策与交接。" },
    "examples.previewCaption": { en: "Actual workflow screen · n8n automation", zh: "真实流程界面 · n8n 自动化" },
    "examples.previewLabel": { en: "Inside the Demo Gallery", zh: "演示作品库内容" },
    "examples.previewBody": { en: "Review the process, interface, and usable output behind each finished screen.", zh: "查看每个最终界面背后的流程、界面设计和可用输出。" },
    "examples.preview1": { en: "Workflow automation", zh: "流程自动化" },
    "examples.preview1Body": { en: "n8n canvases, delivered emails, and appointment records.", zh: "n8n 画布、已交付邮件和预约记录。" },
    "examples.preview2": { en: "Customer interfaces", zh: "客户界面" },
    "examples.preview2Body": { en: "Guided intake, AI-assisted answers, and clear human handoffs.", zh: "引导式信息收集、AI 辅助回答和清晰人工交接。" },
    "examples.openGallery": { en: "Open the Demo Gallery", zh: "打开演示作品库" },
    "examples.openWorkflows": { en: "See n8n workflow builds", zh: "查看 n8n 流程搭建" },
    "examples.demoLabel": { en: "Demo · No client results claimed", zh: "演示 · 不代表真实客户成果" },
    "examples.plumbing": { en: "Plumbing Lead Follow-up", zh: "管道服务潜客跟进" },
    "examples.plumbingBody": { en: "A quote request is captured, routed by service area, acknowledged, assigned, and kept visible until the estimate is followed up.", zh: "报价请求被收集后按服务区域分配、自动确认、指派负责人，并持续显示直到完成报价跟进。" },
    "examples.proof": { en: "Builder proof", zh: "搭建能力证明" },
    "examples.stage": { en: "StagePulse Map", zh: "StagePulse Map" },
    "examples.stageBody": { en: "Built in six hours at Science World and awarded 2nd place at Vancouver HackerRivals. It demonstrates fast scoping, interface design, and delivery under a tight deadline.", zh: "在 Science World 六小时内完成，并获 Vancouver HackerRivals 二等奖，体现了快速范围界定、界面设计和限时交付能力。" },
    "examples.spie": { en: "Research-informed technical build", zh: "研究支持的技术搭建" },
    "examples.spieBody": { en: "A browser-based phosphene vision simulator and related computer-vision work demonstrate technical depth through a usable interactive interface.", zh: "浏览器光幻视模拟器和相关计算机视觉工作，通过可用的交互界面展示技术深度。" },
    "examples.openStage": { en: "Open StagePulse", zh: "打开 StagePulse" },
    "examples.openTechnical": { en: "See technical demo", zh: "查看技术演示" },

    "faq.eyebrow": { en: "FAQ", zh: "常见问题" },
    "faq.title": { en: "Questions local owners actually ask.", zh: "本地企业主真正会问的问题。" },
    "faq.q1": { en: "Where can AI help in my business?", zh: "AI 可以在哪些业务环节提供帮助？" },
    "faq.a1": { en: "Useful starting points include sorting intake, extracting information, drafting routine responses, and directing exceptions to a person.", zh: "常见起点包括整理客户信息、提取资料、起草常规回复，以及把例外情况交给人工处理。" },
    "faq.q2": { en: "Can you connect the tools we already use?", zh: "你能连接我们现有的工具吗？" },
    "faq.a2": { en: "Yes. The checkup identifies what should stay, what should connect, and where a clearer handoff can save time.", zh: "可以。系统检查会明确保留哪些工具、连接哪些环节，以及哪里可以通过更清晰的交接节省时间。" },
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
    "about.proof": { en: "My technical background includes published computer-vision research and a 2nd-place HackerRivals build. These projects demonstrate delivery speed, technical depth, and comfort with complex systems.", zh: "我的技术背景包括已发表的计算机视觉研究和 HackerRivals 二等奖作品。这些项目体现了交付速度、技术深度和处理复杂系统的能力。" },
    "about.final": { en: "Show me one workflow that wastes your time.", zh: "告诉我一个正在浪费你时间的流程。" },

    "booking.title": { en: "Book a Free 15-Minute Fit Call | Kairui Bi", zh: "预约免费 15 分钟匹配通话 | Kairui Bi" },
    "booking.description": { en: "Book a free 15-minute Fit Call with Kairui Bi to discuss an AI consulting or systems opportunity for a BC business.", zh: "预约与 Kairui Bi 的免费 15 分钟匹配通话，讨论卑诗省企业的 AI 咨询或系统机会。" },
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

    "precall.title": { en: "Pre-Call Guide | Kairui Bi Fit Call", zh: "通话准备指南 | Kairui Bi 匹配通话" },
    "precall.description": { en: "Prepare for a focused 15-minute Fit Call with Kairui Bi using the pre-call video space, required briefing form, and practical checklist.", zh: "通过通话前视频位置、必填简报表和实用清单，为与 Kairui Bi 的 15 分钟匹配通话做好准备。" },
    "precall.eyebrow": { en: "Before the call", zh: "通话之前" },
    "precall.heading": { en: "Prepare for a focused 15-minute Fit Call.", zh: "为一次聚焦的 15 分钟匹配通话做好准备。" },
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

    // Working demo gallery.
    "gallery.title": { en: "Working Demos & Project Proof | Kairui Bi", zh: "可用演示与项目证明 | Kairui Bi" },
    "gallery.description": { en: "Explore Kairui Bi's n8n workflow automations, customer-intake prototypes, StagePulse Map, GenPromptly, and phosphene vision simulator.", zh: "查看 Kairui Bi 的 n8n 流程自动化、客户信息收集原型、StagePulse Map、GenPromptly 与光幻视模拟器。" },
    "gallery.eyebrow": { en: "Working demos and project proof", zh: "可用演示与项目证明" },
    "gallery.heading": { en: "See the workflow, the interface, and the handoff.", zh: "查看流程、界面与交付方式。" },
    "gallery.exploreWorkflows": { en: "Explore workflow builds", zh: "查看流程搭建" },
    "gallery.signal1": { en: "n8n orchestration", zh: "n8n 流程编排" },
    "gallery.signal2": { en: "Responsive interfaces", zh: "响应式界面" },
    "gallery.signal3": { en: "Public deployments", zh: "公开部署" },
    "gallery.featuredTitle": { en: "StagePulse Map", zh: "StagePulse Map" },
    "gallery.featuredBody": { en: "Built in six hours at Science World and awarded second place at Vancouver HackerRivals.", zh: "在 Science World 六小时内完成，并获得 Vancouver HackerRivals 第二名。" },
    "gallery.workflowEyebrow": { en: "Workflow automations", zh: "流程自动化" },
    "gallery.workflowTitle": { en: "Real screens from n8n and AI-assisted workflow builds.", zh: "来自 n8n 与 AI 辅助流程搭建的真实界面。" },
    "gallery.workflowIntro": { en: "The screenshots below show orchestration, delivered email output, customer intake, and appointment-record handling. They are portfolio demonstrations built with sample or public information.", zh: "下方截图展示流程编排、邮件输出、客户信息收集和预约记录处理。这些作品集演示使用示例或公开信息制作。" },
    "gallery.buildLabel": { en: "Automation build · n8n", zh: "自动化搭建 · n8n" },
    "gallery.digestTitle": { en: "Daily AI signal digest", zh: "每日 AI 信息摘要" },
    "gallery.digestBody": { en: "A scheduled workflow collects selected sources, normalizes the items, removes repeated entries, organizes links and summaries, and sends a compact email brief.", zh: "定时流程收集选定来源、统一条目格式、移除重复内容、整理链接与摘要，并发送精简邮件简报。" },
    "gallery.digestStep1": { en: "Collect selected feeds", zh: "收集选定信息源" },
    "gallery.digestStep2": { en: "Filter and structure items", zh: "筛选并结构化条目" },
    "gallery.digestStep3": { en: "Compose the brief", zh: "生成简报" },
    "gallery.digestStep4": { en: "Deliver by email", zh: "通过邮件交付" },
    "gallery.digestOutput1": { en: "Long-form source brief", zh: "长版信息源简报" },
    "gallery.digestOutput2": { en: "Focused trend brief", zh: "聚焦趋势简报" },
    "gallery.tutorialLabel": { en: "Tutorial build · appointment operations", zh: "教程搭建 · 预约运营" },
    "gallery.appointmentTitle": { en: "Appointment record automation", zh: "预约记录自动化" },
    "gallery.appointmentBody": { en: "A booking event becomes a structured record that can feed a spreadsheet, preparation step, confirmation, or internal follow-up.", zh: "预约事件会转化为结构化记录，可用于表格、通话准备、确认消息或内部跟进。" },
    "gallery.appointmentStep1": { en: "Calendar event", zh: "日历事件" },
    "gallery.appointmentStep2": { en: "Structured record", zh: "结构化记录" },
    "gallery.appointmentStep3": { en: "Team follow-up", zh: "团队跟进" },
    "gallery.prototypeLabel": { en: "Interface prototype · guided intake", zh: "界面原型 · 引导式信息收集" },
    "gallery.assistantTitle": { en: "Customer-question assistant", zh: "客户问题助手" },
    "gallery.assistantBody": { en: "A mobile assistant answers common questions, gathers the missing details needed for a useful response, and prepares the conversation for a person.", zh: "移动端助手回答常见问题、收集有效回复所需的缺失信息，并为人工接手准备对话。" },
    "gallery.assistantStep1": { en: "Question", zh: "客户提问" },
    "gallery.assistantStep2": { en: "Clarify", zh: "补充信息" },
    "gallery.assistantStep3": { en: "Qualified handoff", zh: "有效转交" },
    "gallery.productsEyebrow": { en: "Public products and technical builds", zh: "公开产品与技术搭建" },
    "gallery.productsTitle": { en: "Interfaces you can open, inspect, and try.", zh: "可以打开、检查和试用的界面。" },
    "gallery.productsIntro": { en: "These projects demonstrate product scoping, interaction design, deployment, and the ability to turn complex ideas into usable screens.", zh: "这些项目展示产品范围界定、交互设计、部署，以及把复杂想法转化为可用界面的能力。" },
    "gallery.shippedLabel": { en: "Public build · hackathon", zh: "公开搭建 · 黑客松" },
    "gallery.stageBody": { en: "A no-login venue feedback experience combining a real Science World floor map, location-based comments, live voting, search, moderation, and an audience readout.", zh: "无需登录的场馆反馈体验，结合真实 Science World 楼层地图、地点评论、实时投票、搜索、内容管理和观众信息面板。" },
    "gallery.stagePoint1": { en: "Built and scoped under a six-hour deadline", zh: "在六小时期限内完成范围界定与搭建" },
    "gallery.stagePoint2": { en: "Responsive audience and operator views", zh: "响应式观众端与运营端界面" },
    "gallery.stagePoint3": { en: "Vercel, Supabase, and Elastic integration", zh: "Vercel、Supabase 与 Elastic 集成" },
    "gallery.openStage": { en: "Open StagePulse Map", zh: "打开 StagePulse Map" },
    "gallery.productLabel": { en: "Public product · TypeScript", zh: "公开产品 · TypeScript" },
    "gallery.genBody": { en: "A focused prompt-refinement product that turns rough input into structured, reusable instructions with clear review points.", zh: "聚焦提示词优化的产品，把粗略输入转化为结构清晰、可复用并便于复核的指令。" },
    "gallery.genPoint1": { en: "Focused input-to-output product flow", zh: "聚焦的输入到输出产品流程" },
    "gallery.genPoint2": { en: "Reusable prompt structures", zh: "可复用提示词结构" },
    "gallery.genPoint3": { en: "Public deployment and GitHub repository", zh: "公开部署与 GitHub 代码库" },
    "gallery.openGen": { en: "Open GenPromptly", zh: "打开 GenPromptly" },
    "gallery.viewSource": { en: "View source", zh: "查看源代码" },
    "gallery.technicalLabel": { en: "Technical build · simulated prosthetic vision", zh: "技术搭建 · 模拟人工视觉" },
    "gallery.phospheneTitle": { en: "Phosphene Vision Simulator", zh: "光幻视视觉模拟器" },
    "gallery.phospheneBody": { en: "A browser interface that transforms an uploaded image into AlphaAMS, Argus II, and PRIMA simulations using the Pulse2Percept library.", zh: "使用 Pulse2Percept 库，把上传图片转化为 AlphaAMS、Argus II 和 PRIMA 模拟结果的浏览器界面。" },
    "gallery.phosphenePoint1": { en: "Image upload and three comparable outputs", zh: "图片上传与三种可比较输出" },
    "gallery.phosphenePoint2": { en: "Research-informed interaction design", zh: "研究支持的交互设计" },
    "gallery.phosphenePoint3": { en: "JavaScript interface with a public repository", zh: "带公开代码库的 JavaScript 界面" },
    "gallery.openPhosphene": { en: "Open simulator", zh: "打开模拟器" },
    "gallery.capabilityEyebrow": { en: "What this proves", zh: "这些项目证明什么" },
    "gallery.capabilityTitle": { en: "Different builds, one practical delivery pattern.", zh: "不同搭建，共用一套实用交付模式。" },
    "gallery.capability1": { en: "Map the real input", zh: "梳理真实输入" },
    "gallery.capability1Body": { en: "Start from the booking, question, feed, image, or customer action that begins the work.", zh: "从启动工作的预约、问题、信息源、图片或客户操作开始。" },
    "gallery.capability2": { en: "Make the middle visible", zh: "让中间过程可见" },
    "gallery.capability2Body": { en: "Use a reviewable workflow with clear rules, transformations, and decision points.", zh: "使用可复核的流程，并明确规则、转换和决策节点。" },
    "gallery.capability3": { en: "Deliver a usable output", zh: "交付可用输出" },
    "gallery.capability3Body": { en: "End with an email, record, dashboard, response, or interface that a person can act on.", zh: "最终交付可供人员采取行动的邮件、记录、仪表盘、回复或界面。" },
    "gallery.capability4": { en: "Deploy and hand off", zh: "部署并交接" },
    "gallery.capability4Body": { en: "Package the build with clear access, review points, and a maintainable next step.", zh: "通过清晰的访问方式、复核节点和可维护的下一步完成交付。" },
    "gallery.ctaEyebrow": { en: "Bring your workflow", zh: "带来你的流程" },
    "gallery.ctaTitle": { en: "Which part of your business should become this clear?", zh: "你的哪一部分业务需要变得如此清晰？" },

    // Diagnosis-led contractor journey.
    "contractor.title": { en: "Business Systems Consulting & Implementation for Canadian Contractors | Kairui Bi", zh: "加拿大承包商业务系统咨询与实施 | Kairui Bi" },
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
    "contractor.operations2": { en: "n8n workflows and Claude Code / Codex automations", zh: "n8n 流程与 Claude Code / Codex 自动化" },
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
    "contractor.askDemo": { en: "Ask for a guided demo", zh: "预约讲解演示" },
    "contractor.phospheneDemo": { en: "Interactive vision simulator", zh: "交互式视觉模拟器" },
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
    "footer.privacy": { en: "Privacy Policy", zh: "隐私政策" },
    "footer.terms": { en: "Terms of Service", zh: "服务条款" },

    "workflow.note": { en: "Start with the business. Then choose the system.", zh: "先理解业务，再选择系统。" },
    "services.problem": { en: "Business problem", zh: "业务问题" },
    "examples.title": { en: "Inspect the workflow, interface, and handoff.", zh: "查看流程、界面与交接方式。" },
    "examples.body": { en: "The gallery separates working demonstrations, fictional examples, prototypes, and builder proof so you can see exactly what each item represents.", zh: "作品库清楚区分可运行演示、虚构示例、原型和搭建能力证明，让你准确了解每项内容代表什么。" },
    "examples.previewCaption": { en: "Demo · n8n appointment workflow", zh: "演示 · n8n 预约流程" },
    "examples.preview1": { en: "Codex & Claude", zh: "Codex 与 Claude" },
    "examples.preview1Body": { en: "Appointment, internal-tool, API, and before/after workflow examples.", zh: "预约、内部工具、API 与流程前后对比示例。" },
    "examples.preview2": { en: "Chat & Voice", zh: "文字与语音 AI" },
    "examples.preview2Body": { en: "Clearly labelled prototypes with information collection and human escalation.", zh: "清楚标注的原型，涵盖信息收集与转人工。" },
    "examples.openWorkflows": { en: "See the workflow demo", zh: "查看流程演示" },

    "process.eyebrow": { en: "Process", zh: "流程" },
    "process.title": { en: "From fit call to a measured handoff.", zh: "从匹配通话到可衡量的交付。" },
    "process.body": { en: "The first call checks fit. Diagnosis and implementation are separately scoped, and you may stop after receiving the recommendation.", zh: "首次通话用于判断是否适合合作。诊断与实施分别确定范围，你也可以在获得建议后结束合作。" },
    "process.step1": { en: "Fit Call", zh: "匹配通话" },
    "process.step1Body": { en: "Discuss one real business problem and decide whether to continue.", zh: "讨论一个真实业务问题，并决定是否继续。" },
    "process.step2": { en: "Diagnose", zh: "诊断" },
    "process.step2Body": { en: "Map customers, staff, information, tools, bottlenecks, and constraints.", zh: "梳理客户、员工、信息、工具、瓶颈与限制。" },
    "process.step3": { en: "Prescribe", zh: "提出方案" },
    "process.step3Body": { en: "Receive a practical recommendation with choices and reasoning.", zh: "获得包含选项与理由的实用建议。" },
    "process.step4": { en: "Implement", zh: "实施" },
    "process.step4Body": { en: "Configure, connect, or build the separately approved solution.", zh: "配置、连接或搭建另行批准的方案。" },
    "process.step5": { en: "Measure & Maintain", zh: "衡量与维护" },
    "process.step5Body": { en: "Review agreed measures, hand off clearly, and add optional care where useful.", zh: "复核约定指标、清楚交付，并在有价值时提供可选维护。" },

    "tutorials.eyebrow": { en: "Builds & Tutorials", zh: "搭建与教程" },
    "tutorials.title": { en: "See how a workflow is built.", zh: "了解一个流程如何被搭建。" },
    "tutorials.body": { en: "A future Kairui Bi video will break down a practical build, the decisions behind it, and how it can be handed off.", zh: "之后的 Kairui Bi 视频会拆解一个实用搭建、背后的决策以及交付方式。" },
    "tutorials.pending": { en: "Video coming soon", zh: "视频即将上线" },
    "tutorials.noRequest": { en: "No YouTube content loads until a video is configured and you choose to play it.", zh: "在配置视频并由你选择播放前，不会加载任何 YouTube 内容。" },
    "tutorials.category": { en: "Build walkthrough", zh: "搭建讲解" },
    "tutorials.videoTitle": { en: "Builds & Tutorials with Kairui Bi", zh: "Kairui Bi 搭建与教程" },
    "tutorials.videoBody": { en: "A concise walkthrough of the business problem, system design, implementation, and handoff.", zh: "简洁讲解业务问题、系统设计、实施与交付。" },
    "tutorials.channel": { en: "Visit the YouTube channel", zh: "访问 YouTube 频道" },
    "tutorials.playVideo": { en: "Play featured video", zh: "播放精选视频" },

    "about.eyebrow": { en: "Builder Proof / About", zh: "搭建能力证明 / 关于" },
    "about.body": { en: "I’m Kairui Bi, a BC-based AI consultant and systems builder. I diagnose the operation, explain the options, and build focused systems with clear review points and handoff.", zh: "我是 Kairui Bi，一名常驻卑诗省的 AI 顾问与系统搭建者。我诊断运营流程、解释可选方案，并以清楚的复核节点和交付方式搭建聚焦系统。" },
    "about.proof": { en: "My technical background includes published computer-vision research and a second-place HackerRivals build. The Demo Gallery keeps those technical projects clearly separated from commercial prototypes.", zh: "我的技术背景包括已发表的计算机视觉研究和 HackerRivals 二等奖作品。演示作品库会把这些技术项目与商业原型清楚区分。" },
    "about.final": { en: "Bring one workflow that needs a clearer next step.", zh: "带来一个需要更清晰下一步的流程。" },
    "faq.title": { en: "Before you book a fit call.", zh: "预约匹配通话之前。" },
    "faq.q1": { en: "What happens in the free 15-minute fit call?", zh: "免费 15 分钟匹配通话会做什么？" },
    "faq.a1": { en: "We discuss one business problem, decide whether there is a fit, and identify whether diagnosis or implementation is the sensible next step.", zh: "我们讨论一个业务问题，判断是否适合合作，并确定诊断或实施哪一个是合理的下一步。" },
    "faq.q2": { en: "Is consulting separate from implementation?", zh: "咨询与实施是分开的吗？" },
    "faq.a2": { en: "Yes. Diagnosis and recommendations can be delivered as a separate consulting engagement. Implementation receives its own scope and quote.", zh: "是。诊断与建议可以作为独立咨询服务交付；实施会另行确定范围与报价。" },
    "faq.q3": { en: "Do you already operate a live chatbot or Voice AI service?", zh: "你现在已经运营在线聊天机器人或语音 AI 服务了吗？" },
    "faq.a3": { en: "The gallery currently shows clearly labelled prototypes and illustrative workflows. A live deployment is scoped, tested, and approved for each business.", zh: "作品库目前展示的是清楚标注的原型和示意流程。正式上线会针对每家企业单独确定范围、测试并批准。" },
    "faq.q4": { en: "Can you work with our current tools?", zh: "你能与我们现有的工具配合吗？" },
    "faq.a4": { en: "Yes. Diagnosis identifies what should stay, what should connect, and where a platform change or custom build is justified.", zh: "可以。诊断会明确哪些应保留、哪些应连接，以及何时更换平台或定制搭建是合理的。" },
    "faq.a5": { en: "Yes. Platform selection, setup, POS and kitchen workflow, menu updates, staff training, analytics, and optional maintenance can all be scoped.", zh: "可以。平台选择与设置、POS 和后厨流程、菜单更新、员工培训、分析及可选维护都可以纳入范围。" },
    "faq.q6": { en: "What happens after delivery?", zh: "交付之后会怎样？" },
    "faq.a6": { en: "The agreed system is reviewed, documented, and handed off. Measurement and ongoing care can be included when useful.", zh: "约定系统会经过复核、记录并完成交付；如有价值，也可以包含衡量与持续维护。" },
    "form.successBody": { en: "I will review it and reply with a practical next step. You can also book the free fit call now.", zh: "我会查看并回复一个实用的下一步。你也可以现在预约免费匹配通话。" },

    "gallery.title": { en: "AI Systems Demo Gallery | Kairui Bi", zh: "AI 系统演示作品库 | Kairui Bi" },
    "gallery.eyebrow": { en: "Demo Gallery", zh: "演示作品库" },
    "gallery.heading": { en: "See what is demonstrated, what is a prototype, and what is builder proof.", zh: "看清哪些是演示、哪些是原型、哪些是搭建能力证明。" },
    "gallery.cat1": { en: "Codex & Claude", zh: "Codex 与 Claude" },
    "gallery.cat2": { en: "Chat & Voice", zh: "文字与语音 AI" },
    "gallery.heroMediaTitle": { en: "Appointment workflow demonstration", zh: "预约流程演示" },
    "gallery.heroMediaBody": { en: "A real workflow asset used to explain information movement and handoff.", zh: "用真实流程素材解释信息移动与交接。" },
    "gallery.demoLabel": { en: "Demo · working asset", zh: "演示 · 真实搭建素材" },
    "gallery.prototypeLabel": { en: "Prototype · no live deployment claimed", zh: "原型 · 不代表已上线项目" },
    "gallery.fictionalLabel": { en: "Demo · fictional BC business", zh: "演示 · 虚构卑诗省企业" },
    "gallery.proofLabel": { en: "Builder Proof", zh: "搭建能力证明" },
    "gallery.codexEyebrow": { en: "01 · Codex & Claude", zh: "01 · Codex 与 Claude" },
    "gallery.codexTitle": { en: "From appointment information to an organized team action.", zh: "从预约信息到有组织的团队行动。" },
    "gallery.codexIntro": { en: "This demonstration shows how an event can become structured information for a spreadsheet, preparation step, confirmation, or internal follow-up.", zh: "此演示展示一个事件如何转化为结构化信息，用于表格、准备步骤、确认或内部跟进。" },
    "gallery.appointmentTitle": { en: "Appointment information workflow", zh: "预约信息流程" },
    "gallery.appointmentBody": { en: "A booking event is normalized once and routed into an action-ready record. The same pattern can support preparation, reminders, or an approved internal assistant.", zh: "预约事件经过一次标准化后，被分派为可执行记录。同一模式可支持准备、提醒或经批准的内部助手。" },
    "gallery.calendar": { en: "Calendar event", zh: "日历事件" },
    "gallery.record": { en: "Structured record", zh: "结构化记录" },
    "gallery.action": { en: "Team action", zh: "团队行动" },
    "gallery.internalTitle": { en: "Internal tool + API architecture", zh: "内部工具 + API 架构" },
    "gallery.internal1": { en: "Approved staff input", zh: "经批准的员工输入" },
    "gallery.internal2": { en: "Codex or Claude assisted step", zh: "Codex 或 Claude 辅助步骤" },
    "gallery.internal3": { en: "Business rules and review", zh: "业务规则与复核" },
    "gallery.internal4": { en: "API-connected record or action", zh: "API 连接的记录或行动" },
    "gallery.internalNote": { en: "Architecture example only; access, data, and approvals are scoped for each business.", zh: "仅为架构示例；访问权限、数据与审批会针对每家企业确定。" },
    "gallery.beforeAfterTitle": { en: "Before / after business process", zh: "业务流程前后对比" },
    "gallery.before": { en: "Before", zh: "之前" },
    "gallery.beforeBody": { en: "Copy details between messages, calendars, notes, and spreadsheets; remember the next action.", zh: "在消息、日历、笔记与表格之间复制信息，并靠记忆安排下一步。" },
    "gallery.after": { en: "After", zh: "之后" },
    "gallery.afterBody": { en: "Capture once, validate the required fields, route the record, and leave exceptions for human review.", zh: "一次收集、验证必填字段、分派记录，并把例外留给人工复核。" },
    "gallery.chatEyebrow": { en: "02 · AI Chat & Voice", zh: "02 · AI 文字与语音" },
    "gallery.chatTitle": { en: "Customer-service flows with a visible human handoff.", zh: "带有明确人工交接的客户服务流程。" },
    "gallery.chatIntro": { en: "These interfaces and diagrams illustrate how approved answers, qualification, information collection, and escalation could work. They are not a live chatbot or Voice AI deployment.", zh: "这些界面与图示说明经批准答案、筛选、信息收集与升级可以如何运作。它们不是已上线的聊天机器人或语音 AI 项目。" },
    "gallery.assistantTitle": { en: "Website assistant interface", zh: "网站助手界面" },
    "gallery.assistantBody": { en: "A guided interface for approved answers, missing-detail collection, lead qualification, and a clear transfer to a person.", zh: "用于经批准答案、缺失信息收集、潜客筛选与清楚转人工的引导式界面。" },
    "gallery.approved": { en: "Approved answers", zh: "经批准答案" },
    "gallery.qualify": { en: "Lead qualification", zh: "潜客筛选" },
    "gallery.collect": { en: "Information collection", zh: "信息收集" },
    "gallery.escalate": { en: "Human escalation", zh: "转人工" },
    "gallery.voiceTitle": { en: "Voice AI call path", zh: "语音 AI 通话路径" },
    "gallery.voiceBody": { en: "An illustrative call flow for a BC business. It does not represent an active phone agent or client deployment.", zh: "面向卑诗省企业的示意通话流程，不代表正在运行的电话助手或客户上线项目。" },
    "gallery.voice1": { en: "Incoming call", zh: "来电" },
    "gallery.voice2": { en: "Identify intent", zh: "识别意图" },
    "gallery.voice3": { en: "Collect required information", zh: "收集必要信息" },
    "gallery.voice4": { en: "Resolve or escalate", zh: "解决或升级" },
    "gallery.proofTitle": { en: "Technical depth, kept separate from commercial demos.", zh: "技术深度，与商业演示清楚分开。" },
    "gallery.proofIntro": { en: "These completed public builds demonstrate product scoping, interaction design, research depth, and delivery under constraints.", zh: "这些已完成的公开作品展示产品范围界定、交互设计、研究深度与受限条件下的交付能力。" },
    "gallery.stageBody": { en: "Built in six hours at Science World and awarded second place at Vancouver HackerRivals.", zh: "在 Science World 六小时内完成，并获 Vancouver HackerRivals 二等奖。" },
    "gallery.phospheneBody": { en: "A browser interface connected to published technical work, with image upload and three comparable simulation outputs.", zh: "与已发表技术工作相关的浏览器界面，支持图像上传与三种可比较模拟输出。" },
    "gallery.ctaTitle": { en: "Which part of your business needs a clearer system?", zh: "你业务的哪个部分需要更清晰的系统？" },

    "footer.tagline": { en: "AI consulting and practical systems for BC businesses.", zh: "为卑诗省企业提供 AI 咨询与实用系统。" },
    "footer.based": { en: "Based in BC · Serving British Columbia", zh: "常驻卑诗省 · 服务卑诗省企业" }
    ,"home.description": { en: "Two focused offers for BC businesses: Codex, Claude, and n8n AI project consultation and implementation, plus customized website chatbots and AI voice receptionists.", zh: "为卑诗省企业提供两项聚焦服务：Codex、Claude 与 n8n AI 项目咨询和实施，以及网站聊天机器人与 AI 语音接待定制。" }
    ,"home.heroBody": { en: "I consult on and implement Codex, Claude, and n8n AI projects. I also customize website chatbots and AI voice receptionists around how your business actually works.", zh: "我提供 Codex、Claude 与 n8n AI 项目咨询和实施，也会根据您的实际业务方式定制网站聊天机器人与 AI 语音接待。" }
    ,"workflow.example": { en: "Two focused offers · illustrative", zh: "两项聚焦服务 · 示意" }
    ,"workflow.inquiry": { en: "Codex / Claude / n8n AI projects", zh: "Codex / Claude / n8n AI 项目" }
    ,"workflow.inquiryNote": { en: "Consultation, workflow design, and implementation", zh: "咨询、流程设计与实施" }
    ,"workflow.captured": { en: "Website chatbot & AI voice receptionist", zh: "网站聊天机器人与 AI 语音接待" }
    ,"workflow.capturedNote": { en: "Customized answers, intake, routing, and human handoff", zh: "定制回答、信息收集、分派与人工交接" }
    ,"services.eyebrow": { en: "Two focused offers", zh: "两项聚焦服务" }
    ,"services.title": { en: "Two ways I can build with your business.", zh: "两种与您的企业共同搭建的方式。" }
    ,"services.body": { en: "Choose a Codex, Claude, or n8n project—or customize an AI customer-service system for your business.", zh: "选择 Codex、Claude 或 n8n 项目，或为您的企业定制 AI 客户服务系统。" }
    ,"services.offer1": { en: "Codex / Claude / n8n AI Project Consultation & Implementation", zh: "Codex / Claude / n8n AI 项目咨询与实施" }
    ,"services.offer1Problem": { en: "You have an AI project or repetitive workflow but need a clear technical plan and someone to implement it.", zh: "您已有 AI 项目想法或重复流程，但需要清晰的技术方案与实施者。" }
    ,"services.deliver": { en: "What I can build", zh: "我可以搭建什么" }
    ,"services.offer1Deliver": { en: "Workflow diagnosis, Codex and Claude implementation, n8n automations, integrations, testing, documentation, and handoff.", zh: "流程诊断、Codex 与 Claude 实施、n8n 自动化、集成、测试、文档与交接。" }
    ,"services.offer1Custom": { en: "When the project must follow your business rules, data sources, approvals, and existing tools.", zh: "当项目必须遵循您的业务规则、数据来源、审批与现有工具时。" }
    ,"services.offer2": { en: "Website Chatbot & AI Voice Receptionist Customization", zh: "网站聊天机器人与 AI 语音接待定制" }
    ,"services.offer2Problem": { en: "Website visitors or callers wait for answers, repeat the same questions, or fail to reach the right person.", zh: "网站访客或来电者等待回答、反复提问，或无法联系到正确负责人。" }
    ,"services.offer2Deliver": { en: "Approved answers, information collection, lead qualification, chat or call routing, booking handoff, and human escalation.", zh: "经批准的回答、信息收集、潜客筛选、聊天或来电分派、预约交接与人工升级。" }
    ,"examples.body": { en: "The gallery separates working demonstrations, prototypes, and builder proof so you can see exactly what each item represents.", zh: "演示库清楚区分可运行演示、原型与搭建能力证明。" }
    ,"examples.previewBody": { en: "See Codex, Claude, and n8n workflow examples plus website-chatbot and AI voice-receptionist prototypes.", zh: "查看 Codex、Claude 与 n8n 流程示例，以及网站聊天机器人和 AI 语音接待原型。" }
    ,"examples.preview1": { en: "Codex / Claude / n8n", zh: "Codex / Claude / n8n" }
    ,"examples.preview1Body": { en: "Appointment, assisted-step, integration, and before/after workflow examples.", zh: "预约、AI 辅助步骤、集成与流程前后对比示例。" }
    ,"examples.preview2": { en: "Chatbot & Voice Receptionist", zh: "聊天机器人与语音接待" }
    ,"examples.preview2Body": { en: "Clearly labelled prototypes with information collection, routing, and human escalation.", zh: "清楚标注的信息收集、分派与人工升级原型。" }
    ,"faq.q5": { en: "What does chatbot or voice-receptionist customization include?", zh: "聊天机器人或语音接待定制包括什么？" }
    ,"faq.a5": { en: "Approved answers, business hours, intake questions, booking or call routing, and human escalation are defined around your operation.", zh: "根据您的运营方式定义经批准的回答、营业时间、信息收集问题、预约或来电分派与人工升级。" }
    ,"about.body": { en: "I’m Kairui Bi, a BC-based AI consultant and systems builder focused on Codex, Claude, and n8n projects plus customized AI customer-service systems.", zh: "我是 Kairui Bi，一名常驻卑诗省的 AI 顾问与系统搭建者，专注 Codex、Claude、n8n 项目和定制 AI 客户服务系统。" }

    ,"booking.description": { en: "Book a free fit call for a Codex, Claude, or n8n AI project, website chatbot, or customized AI voice receptionist.", zh: "为 Codex、Claude、n8n AI 项目、网站聊天机器人或定制 AI 语音接待预约免费匹配通话。" }
    ,"booking.eyebrow": { en: "Free 15-minute fit call", zh: "免费 15 分钟匹配通话" }
    ,"booking.heading": { en: "Choose the project. Define the result. Then build.", zh: "选择项目，定义结果，然后搭建。" }
    ,"booking.body": { en: "Bring one Codex, Claude, or n8n AI project—or a website chatbot or AI voice receptionist you want customized for your business. We use the call to check fit and choose the clearest next step.", zh: "带来一个 Codex、Claude 或 n8n AI 项目，或您希望为企业定制的网站聊天机器人或 AI 语音接待。我们通过通话判断匹配度并确定下一步。" }
    ,"booking.expect2": { en: "Written scope and acceptance criteria", zh: "书面范围与验收标准" }
    ,"booking.offersEyebrow": { en: "Exactly what I offer", zh: "我提供的两项服务" }
    ,"booking.offersTitle": { en: "Two focused ways to work together.", zh: "两种聚焦的合作方式。" }
    ,"booking.offer1": { en: "Codex / Claude / n8n AI Project Consultation & Implementation", zh: "Codex / Claude / n8n AI 项目咨询与实施" }
    ,"booking.offer1Body": { en: "I diagnose the workflow, design the project, and implement the approved AI solution around your business rules and existing tools.", zh: "我会诊断流程、设计项目，并围绕您的业务规则与现有工具实施获批的 AI 方案。" }
    ,"booking.offer1Item1": { en: "Project and workflow diagnosis", zh: "项目与流程诊断" }
    ,"booking.offer1Item2": { en: "Codex or Claude implementation", zh: "Codex 或 Claude 实施" }
    ,"booking.offer1Item3": { en: "n8n automation and integrations", zh: "n8n 自动化与集成" }
    ,"booking.offer1Item4": { en: "Testing, documentation, and handoff", zh: "测试、文档与交接" }
    ,"booking.offer2": { en: "Website Chatbot & AI Voice Receptionist Customization", zh: "网站聊天机器人与 AI 语音接待定制" }
    ,"booking.offer2Body": { en: "I customize the assistant around your services, approved answers, business hours, intake questions, routing, and human escalation.", zh: "我会围绕您的服务、经批准的回答、营业时间、信息收集问题、分派与人工升级定制助理。" }
    ,"booking.offer2Item1": { en: "Website chatbot conversation flow", zh: "网站聊天机器人对话流程" }
    ,"booking.offer2Item2": { en: "AI voice receptionist call flow", zh: "AI 语音接待通话流程" }
    ,"booking.offer2Item3": { en: "Information collection and qualification", zh: "信息收集与筛选" }
    ,"booking.offer2Item4": { en: "Booking, routing, and human handoff", zh: "预约、分派与人工交接" }
    ,"booking.paymentEyebrow": { en: "Simple scope and payment", zh: "清晰的范围与付款" }
    ,"booking.paymentTitle": { en: "25% to start. The remaining 75% after you accept the agreed result.", zh: "支付 25% 开始；接受约定结果后支付剩余 75%。" }
    ,"booking.paymentBody": { en: "Before work starts, the proposal states what I will deliver and the written criteria used to review it.", zh: "工作开始前，提案会写明交付内容以及用于验收的书面标准。" }
    ,"booking.pay1": { en: "Free fit call", zh: "免费匹配通话" }
    ,"booking.pay1Body": { en: "Discuss the project and decide whether we fit.", zh: "讨论项目并判断是否适合合作。" }
    ,"booking.pay2": { en: "Written proposal", zh: "书面提案" }
    ,"booking.pay2Body": { en: "Agree on scope, price, timing, and acceptance criteria.", zh: "约定范围、价格、时间与验收标准。" }
    ,"booking.pay3": { en: "25% kickoff", zh: "25% 启动款" }
    ,"booking.pay3Body": { en: "Pay the kickoff amount, then consulting or implementation begins.", zh: "支付启动款后，咨询或实施开始。" }
    ,"booking.pay4": { en: "Accept + pay 75%", zh: "接受并支付 75%" }
    ,"booking.pay4Body": { en: "Review the agreed result; the balance is due after acceptance.", zh: "审核约定结果；接受后支付余款。" }
    ,"booking.commitmentEyebrow": { en: "Remaining-fee commitment", zh: "剩余费用承诺" }
    ,"booking.commitmentTitle": { en: "If the written acceptance criteria are still unmet after a fair correction opportunity, the remaining 75% is waived.", zh: "若在给予合理修正机会后仍未满足书面验收标准，剩余 75% 将被免除。" }
    ,"booking.commitmentBody": { en: "In simple terms: you pay 25% to start and the remaining 75% after you accept the agreed work. The signed proposal controls the details. The kickoff amount, approved third-party costs, accepted milestones, and out-of-scope work remain payable.", zh: "简单来说：支付 25% 开始，在接受约定工作后支付剩余 75%。具体细节以签署的提案为准；启动款、获批第三方费用、已接受里程碑和范围外工作仍需支付。" }
    ,"booking.commitmentNote": { en: "Acceptance uses results we can verify, such as a working workflow, correctly handled chat or call paths, completed integrations, or another written project measure. Profit and revenue depend on your market and operation and are not guaranteed.", zh: "验收采用可验证结果，例如可运行流程、正确处理的聊天或来电路径、完成的集成或其他书面项目指标。利润与营收受市场和运营影响，不作保证。" }
    ,"booking.scheduleEyebrow": { en: "Choose a time", zh: "选择时间" }
    ,"booking.scheduleTitle": { en: "Book your free 15-minute fit call.", zh: "预约免费 15 分钟匹配通话。" }
    ,"booking.scheduleBody": { en: "The scheduler works on phone and laptop. If the embedded calendar is inconvenient, open it in a new tab.", zh: "预约器适配手机与电脑；如嵌入日历使用不便，可在新标签页打开。" }
    ,"booking.processEyebrow": { en: "From call to handoff", zh: "从通话到交接" }
    ,"booking.processTitle": { en: "Fit call → diagnose → propose → implement → review.", zh: "匹配通话 → 诊断 → 提案 → 实施 → 验收。" }
    ,"booking.processBody": { en: "Consultation and implementation can be scoped separately. You may stop after receiving the diagnosis and recommendation.", zh: "咨询与实施可分别确定范围；您可在收到诊断与建议后停止。" }

    ,"gallery.title": { en: "AI Project & Customer-Service Demo Gallery | Kairui Bi", zh: "AI 项目与客户服务演示库 | Kairui Bi" }
    ,"gallery.description": { en: "Explore labelled Codex, Claude, and n8n project demos plus website-chatbot and AI voice-receptionist prototypes by Kairui Bi.", zh: "查看 Kairui Bi 清楚标注的 Codex、Claude、n8n 项目演示，以及网站聊天机器人与 AI 语音接待原型。" }
    ,"gallery.heading": { en: "See how the two offers can work.", zh: "查看两项服务如何运作。" }
    ,"gallery.cat1": { en: "Codex / Claude / n8n", zh: "Codex / Claude / n8n" }
    ,"gallery.cat2": { en: "Chatbot & Voice Receptionist", zh: "聊天机器人与语音接待" }
    ,"gallery.heroMediaBody": { en: "A real n8n workflow asset used to explain information movement and handoff.", zh: "使用真实 n8n 流程素材解释信息流动与交接。" }
    ,"gallery.codexEyebrow": { en: "01 · Codex / Claude / n8n", zh: "01 · Codex / Claude / n8n" }
    ,"gallery.codexTitle": { en: "From business process to implemented AI project.", zh: "从业务流程到已实施的 AI 项目。" }
    ,"gallery.codexIntro": { en: "This example shows information entering once, being structured and reviewed, then reaching the right team action through an n8n workflow and an approved AI-assisted step.", zh: "此示例展示信息一次进入、被结构化与复核，再通过 n8n 流程和获批 AI 辅助步骤到达正确团队行动。" }
    ,"gallery.appointmentBody": { en: "A booking event is normalized once and routed into an action-ready record. The same pattern can support preparation, reminders, or an approved Codex or Claude step.", zh: "预约事件经一次标准化后被分派为可执行记录；同一模式可支持准备、提醒或获批的 Codex / Claude 步骤。" }
    ,"gallery.record": { en: "n8n workflow", zh: "n8n 流程" }
    ,"gallery.action": { en: "Reviewed action", zh: "经复核的行动" }
    ,"gallery.internalTitle": { en: "Codex / Claude / n8n project architecture", zh: "Codex / Claude / n8n 项目架构" }
    ,"gallery.internal1": { en: "Approved business input", zh: "获批业务输入" }
    ,"gallery.internal2": { en: "n8n routing and validation", zh: "n8n 分派与验证" }
    ,"gallery.internal3": { en: "Codex or Claude assisted step", zh: "Codex 或 Claude 辅助步骤" }
    ,"gallery.internal4": { en: "Human review and final action", zh: "人工复核与最终行动" }
    ,"gallery.internalNote": { en: "Architecture example only; access, data, business rules, and approvals are scoped for each project.", zh: "仅为架构示例；访问权限、数据、业务规则与审批会针对每个项目确定。" }
    ,"gallery.chatEyebrow": { en: "02 · Website Chatbot & AI Voice Receptionist", zh: "02 · 网站聊天机器人与 AI 语音接待" }
    ,"gallery.chatTitle": { en: "Customized customer-service flows with a visible human handoff.", zh: "带有明确人工交接的定制客户服务流程。" }
    ,"gallery.chatIntro": { en: "These interfaces illustrate approved answers, information collection, qualification, routing, and escalation. They are prototypes, not active client deployments.", zh: "这些界面展示经批准的回答、信息收集、筛选、分派与升级。它们是原型，并非活跃客户部署。" }
    ,"gallery.assistantTitle": { en: "Website chatbot interface", zh: "网站聊天机器人界面" }
    ,"gallery.assistantBody": { en: "A guided interface customized for approved answers, missing-detail collection, lead qualification, and transfer to the right person.", zh: "围绕经批准回答、缺失信息收集、潜客筛选与转交正确负责人的定制引导界面。" }
    ,"gallery.voiceTitle": { en: "AI voice receptionist call path", zh: "AI 语音接待通话路径" }
    ,"gallery.voiceBody": { en: "An illustrative call flow customized around business hours, approved answers, required questions, routing, and human escalation.", zh: "围绕营业时间、经批准回答、必问信息、分派与人工升级定制的示意通话流程。" }
    ,"gallery.voice4": { en: "Answer or escalate", zh: "回答或升级" }
    ,"gallery.ctaTitle": { en: "Which of the two offers fits what you want to build?", zh: "两项服务中，哪一项符合您想搭建的内容？" }
    ,"footer.tagline": { en: "Codex, Claude, and n8n projects plus customized AI customer service for BC businesses.", zh: "为卑诗省企业提供 Codex、Claude、n8n 项目与定制 AI 客户服务。" }
    ,"services.offer2Custom": { en: "When the assistant must match your services, hours, policies, tone, and escalation rules.", zh: "当助理必须符合您的服务、营业时间、政策、语气与升级规则时。" }
    ,"faq.q3": { en: "Do you already operate a live chatbot or Voice AI service?", zh: "你现在已经运营在线聊天机器人或语音 AI 服务了吗？" }
    ,"examples.previewTitle": { en: "Two focused demonstration tracks.", zh: "两条聚焦的演示路线。" }
    ,"gallery.intro": { en: "The gallery follows the same two offers as the homepage. Every item is labelled so a prototype is never mistaken for a live client deployment.", zh: "演示库与首页的两项服务一致。每一项均清楚标注，避免把原型误认为已上线客户项目。" }
    ,"gallery.future": { en: "Booking or team handoff", zh: "预约或团队交接" }
    ,"gallery.voice5": { en: "Booking or team handoff", zh: "预约或团队交接" }
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
            <div><strong data-i18n="footer.explore">${escapeHtml(getText("footer.explore"))}</strong><a href="${escapeHtml(resolvePath("index.html#services"))}" data-i18n="nav.services">${escapeHtml(getText("nav.services"))}</a><a href="${escapeHtml(resolvePath("demo_gallery.html"))}" data-i18n="nav.examples">${escapeHtml(getText("nav.examples"))}</a><a href="${escapeHtml(resolvePath("index.html#process"))}" data-i18n="nav.process">${escapeHtml(getText("nav.process"))}</a><a href="${escapeHtml(resolvePath(config.routes.precall))}" data-i18n="footer.precall">${escapeHtml(getText("footer.precall"))}</a></div>
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
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (TEXT[key]) element.setAttribute("aria-label", getText(key));
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
    applySiteTokens();
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
    document.querySelectorAll("[data-youtube-channel]").forEach((link) => {
      const url = config.youtube?.channelUrl || "";
      link.hidden = !url;
      if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
    });
    document.querySelectorAll("[data-youtube-title]").forEach((element) => {
      if (language === "en" && config.youtube?.featuredVideoTitle) element.textContent = config.youtube.featuredVideoTitle;
      else element.textContent = getText("tutorials.videoTitle", element.textContent);
    });
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

  function setupTutorialVideos() {
    const videoId = getYouTubeId(config.youtube?.featuredVideoUrl || "");
    if (!videoId) return;
    document.querySelectorAll("[data-tutorial-video]").forEach((slot) => {
      slot.classList.add("is-configured");
      if (config.youtube?.thumbnailUrl) slot.style.backgroundImage = `linear-gradient(rgba(28, 24, 16, .3), rgba(28, 24, 16, .62)), url("${config.youtube.thumbnailUrl.replaceAll('"', '%22')}")`;
      slot.innerHTML = `<button class="precall-video-play" type="button"><span class="video-play-mark" aria-hidden="true">&#9654;</span><span>${escapeHtml(getText("tutorials.playVideo"))}</span></button>`;
      slot.querySelector("button")?.addEventListener("click", () => {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
        iframe.title = config.youtube?.featuredVideoTitle || getText("tutorials.videoTitle");
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        slot.replaceChildren(iframe);
      });
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
    const subject = encodeURIComponent(`Fit Call inquiry — ${data.get("business_name") || data.get("name") || "website lead"}`);
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
    setupTutorialVideos();
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
