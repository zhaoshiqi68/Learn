export type Pattern = {
  name: string;
  zh: string;
  what: string;
  who: string;
  wave: "四月就有" | "七月新出现";
};

export const patterns: Pattern[] = [
  {
    name: "Event Sourcing",
    zh: "事件溯源",
    what: "动作和观察追加进持久日志，历史可以重放、分叉。",
    who: "OpenHands；Pi 的会话树；OpenCode 把日志本身当队列",
    wave: "四月就有",
  },
  {
    name: "Policy-as-Code",
    zh: "策略即代码",
    what: "安全规则写成可执行配置，而不是散落在循环里的 if。",
    who: "Codex 的 Starlark、Claude Code 的钩子、Gemini CLI 的 TOML、Hermes、OpenCode、Pi",
    wave: "四月就有",
  },
  {
    name: "Recursive Composition",
    zh: "递归组合",
    what: "Agent 派生出带着分叉或链接上下文的子 Agent。",
    who: "Claude Code、Codex、OpenHands、OpenClaw；Hermes 要开配置，OpenCode 要选择加入",
    wave: "四月就有",
  },
  {
    name: "Polymorphic Edits",
    zh: "多态编辑",
    what: "按模型选择编辑格式或整套工具。",
    who: "Aider 的提示工厂；OpenCode 按模型换工具表",
    wave: "四月就有",
  },
  {
    name: "Deferred Loading",
    zh: "延迟加载",
    what: "工具和 skill 先不放进提示，需要时再发现。",
    who: "Claude Code、Codex 的 BM25 tool_search、Hermes 的桥接工具，以及 8 套 skill 实现",
    wave: "四月就有",
  },
  {
    name: "Template Method",
    zh: "模板方法",
    what: "基类规定流程，子类改解析和格式。",
    who: "Aider 的 Coder，OpenHands 的 Agent",
    wave: "四月就有",
  },
  {
    name: "Protocol Interfaces",
    zh: "协议式接口",
    what: "用结构化子类型把可替换部件隔开。",
    who: "Mini-SWE-Agent；Pi 给每个工具一个可远程的 Operations 缝",
    wave: "四月就有",
  },
  {
    name: "LLM Summarization",
    zh: "模型摘要",
    what: "用模型压缩对话历史。",
    who: "除 Mini-SWE-Agent 外的系统；Aider 是递归对半摘要",
    wave: "四月就有",
  },
  {
    name: "Stuck Detection",
    zh: "卡住检测",
    what: "发现重复行为后警告、询问或停掉。",
    who: "OpenHands 五种场景；Gemini CLI 哈希加模型自检；Hermes；OpenCode 的 doom loop；Mini-SWE-Agent 的格式错误上限",
    wave: "四月就有",
  },
  {
    name: "Reflection Loop",
    zh: "反思循环",
    what: "用 lint 或测试把错误送回模型再改一轮。",
    who: "Aider。近亲：Gemini CLI 的编辑修复子调用，OpenCode 把 LSP 诊断附在编辑结果上",
    wave: "四月就有",
  },
  {
    name: "Prompt Caching",
    zh: "提示缓存",
    what: "把提示切在缓存边界上，或复用会话级缓存键。",
    who: "Claude Code、Codex、OpenHands、Hermes、Pi、OpenCode",
    wave: "四月就有",
  },
  {
    name: "Context Forking",
    zh: "上下文分叉",
    what: "克隆父状态，让子 Agent 隔离运行。",
    who: "Claude Code、Codex、Hermes",
    wave: "四月就有",
  },
  {
    name: "Middleware Pipeline",
    zh: "中间件管道",
    what: "轮次策略（步数、费用、压缩、只读）不写进循环体。",
    who: "Mistral Vibe，语料里独一份",
    wave: "四月就有",
  },
  {
    name: "JIT Repo Context",
    zh: "即时仓库上下文",
    what: "自动发现分层 Markdown，工具碰到子目录时再注入。",
    who: "Claude Code、Codex、Gemini CLI、Mistral Vibe、Hermes、Pi、OpenCode、OpenHands",
    wave: "四月就有",
  },
  {
    name: "Skills",
    zh: "能力包",
    what: "带 YAML 头的 SKILL.md 目录：做什么、何时激活、能用哪些工具。",
    who: "11 个里的 9 个。Aider 和 Mini-SWE-Agent 不做",
    wave: "四月就有",
  },
  {
    name: "Conditional Activation",
    zh: "条件激活",
    what: "skill 或工具按路径、环境或依赖才进入上下文。",
    who: "Claude Code 的 paths，OpenHands 的 PathTrigger，OpenClaw 的 requires",
    wave: "四月就有",
  },
  {
    name: "Turn-Level Checkpoint",
    zh: "轮次检查点",
    what: "文件系统快照，可以倒带并恢复文件。",
    who: "Mistral Vibe、OpenCode 的影子 git、Hermes、Pi（只恢复对话）",
    wave: "四月就有",
  },
  {
    name: "Agent-Maintained Memory",
    zh: "Agent 维护的记忆",
    what: "后台子 Agent 抽取并合并跨会话记忆。",
    who: "Codex 两阶段、以 git 为基线。Gemini CLI 是人审收件箱的变体",
    wave: "七月新出现",
  },
  {
    name: "Outer Verification Loop",
    zh: "外层验证环",
    what: "脚手架在回合外面判断这件事做完没有。",
    who: "OpenHands 的 /goal 裁判；Hermes 的 verify-on-stop",
    wave: "七月新出现",
  },
  {
    name: "Self-Improving Skill Loop",
    zh: "自写 skill",
    what: "Agent 根据做过的任务创建、修补并整理自己的能力包。",
    who: "Hermes。Gemini CLI 只挖到收件箱，等人审",
    wave: "七月新出现",
  },
  {
    name: "Lineage Compaction",
    zh: "谱系压缩",
    what: "压缩不改写旧记录，而是结束当前会话、开一个挂着父 id 的子会话。",
    who: "Hermes",
    wave: "七月新出现",
  },
  {
    name: "Session-Tree Version Control",
    zh: "会话树版本控制",
    what: "只追加的条目树，头指针可移动：分叉、倒带、分支摘要是同一件事。",
    who: "Pi。OpenHands 的对话也是树",
    wave: "七月新出现",
  },
  {
    name: "Minimal-Core / Extension-Host",
    zh: "极简核心",
    what: "安全、沙箱、子 Agent、计划模式都挪到运行时事件总线上。",
    who: "Pi",
    wave: "七月新出现",
  },
  {
    name: "Client/Server Harness",
    zh: "客户端/服务端",
    what: "内嵌 API 服务。终端、网页、IDE、CI 都只是客户端。",
    who: "OpenCode；OpenHands 的 agent-server",
    wave: "七月新出现",
  },
  {
    name: "Model-Family Prompt Matrix",
    zh: "按模型族分提示",
    what: "不同模型族或代际用不同的基础提示。",
    who: "Codex 的服务端目录、OpenCode 的 9 套提示、Hermes 的门控块",
    wave: "七月新出现",
  },
  {
    name: "Cache-Dialect Fanout",
    zh: "缓存方言扇出",
    what: "一次把各家供应商的缓存控制写法都发出去。",
    who: "OpenCode",
    wave: "七月新出现",
  },
  {
    name: "Syntax-Aware Command Permissioning",
    zh: "语法感知的命令权限",
    what: "先解析命令，再按参数结构授权，而不是只做字符串前缀。",
    who: "OpenCode 用 tree-sitter；Mistral Vibe 做解析校验；Hermes 先去混淆再匹配",
    wave: "七月新出现",
  },
  {
    name: "Untrusted-Content Delimiting",
    zh: "不可信内容定界",
    what: "工具和网页结果包进污点标记，并拆掉容易伪造的分隔符。",
    who: "Hermes、OpenHands",
    wave: "七月新出现",
  },
  {
    name: "Harness Mimicry",
    zh: "伪装成别家 harness",
    what: "客户端带上第一方 harness 的身份，以便走它的订阅登录。",
    who: "Pi：在 Anthropic OAuth 上呈现 Claude Code 身份，也能走 ChatGPT 方案的 Codex 后端",
    wave: "七月新出现",
  },
];

export type Observation = {
  n: number;
  title: string;
  section: string;
  text: string;
};

export const observations: Observation[] = [
  {
    n: 1,
    title: "循环写得复杂，不代表基准更高",
    section: "§5",
    text: "十一套系统代码量差三个数量级，做的却是相近的事。Mini-SWE-Agent 的线性循环，自报成绩和 OpenHands 的事件引擎落在同一区间。生产系统里大部分代码花在安全、界面、扩展，以及越来越多的客户端和传输上。",
  },
  {
    n: 2,
    title: "厂商优化不锁死在「只接一家」上",
    section: "§7",
    text: "缓存边界、扩展思考、按模型写的提示，紧耦合的厂商系统有，多供应商系统也能做。差别是谁愿意集中维护那层按供应商分支的代码。只有厂商自己留着的，是服务端跟着模型发布一起改提示，客户端不用更新。",
  },
  {
    n: 3,
    title: "提示词会趋同，然后变薄",
    section: "§7.3",
    text: "「别镀金」这类话在六个独立脚手架里几乎同文。四月时「不要自己提交」几乎是普遍规则。到七月，Mistral Vibe 改成要求带共作者尾注的提交说明，Codex 最新一代模型提示删掉了提交禁令和镀金禁令。行为规范正从提示散文挪到配置。",
  },
  {
    n: 4,
    title: "改文件的契约，决定改得准不准",
    section: "§8.4",
    text: "前沿模型这边收敛到精确、唯一的子串替换。更宽的模型范围用模糊级联。Mistral Vibe 一个季度内从模糊搜索替换迁到 Claude Code 式的精确匹配。Gemini CLI 加了模型来修失败的匹配。行号编辑被论文明确不推荐。",
  },
  {
    n: 5,
    title: "记忆的前沿从压缩换成了谁来写",
    section: "§9.6",
    text: "七套系统都在阈值上做模型摘要，压缩方式已经靠近。拉开差距的是记忆写入：Codex 让沙箱子 Agent 写，Gemini CLI 让人审收件箱，Hermes 用有字数上限的 Markdown，OpenClaw 在每次回复前先跑记忆子 Agent。没有一家把向量检索当主记忆底座。",
  },
  {
    n: 6,
    title: "沙箱是选择，不是代码变大的后果",
    section: "§10.2",
    text: "四月看起来像「越大越有跨平台沙箱」。七月这个相关破了：Hermes 和 OpenCode 都很大，却没有操作系统级隔离。Pi 把「不做半吊子进程内沙箱」写成安全论点，因为那会被误认成边界。真正做原生沙箱的（Codex、Gemini CLI）是数千行的投入。",
  },
  {
    n: 7,
    title: "协调者–工人是独立收敛出来的",
    section: "§11",
    text: "四家厂商旗舰、OpenHands、Hermes、OpenCode、OpenClaw 都出现了父 Agent 派工人的形状。Pi 故意把子 Agent 留在扩展里。论文把「规定好的研究–综合–实现–验证」只算在 Claude Code、Codex，以及开了配置的 Hermes 上。",
  },
  {
    n: 8,
    title: "SKILL.md 超过了 MCP",
    section: "§12.5",
    text: "9/11 有 skill，8/11 有 MCP。四月打平，是 Pi「要 skill、不要 MCP」打破的。延迟加载成了主流。四个系统有远程注册表。Hermes 给 skill 做信任分级和隔离。第一次出现 Agent 自己写的 skill。",
  },
  {
    n: 9,
    title: "没有通用编排框架，也没有代码向量检索",
    section: "§13.2",
    text: "大约四百万行里，没有一条生产 Agent 路径导入 LangChain、LangGraph、AutoGen、CrewAI、LlamaIndex、Pydantic AI、Genkit、Google ADK 或 Semantic Kernel。Gemini CLI 连谷歌自己的两套都不用。代码检索全部是 ripgrep、tree-sitter、glob 和自动发现的 Markdown。向量只出现在对话记忆，而且默认开启的只有 OpenClaw。",
  },
  {
    n: 10,
    title: "Anthropic 的工程文章，和后来的源码对得上",
    section: "§13.2 / §15.1",
    text: "2024 年 12 月到 2025 年 9 月的四篇有效 Agent 文章，和四家独立做出来的厂商 harness 很接近：手写循环、少量高信号工具、即时的结构化检索、协调者–工人。论文说这可能是共同经验，也可能是公开指南影响了设计，或两者都有。他们没有做访谈。",
  },
  {
    n: 11,
    title: "ACP 多了一个设计时没写的角色：托管 harness",
    section: "§13.3",
    text: "ACP 在六个系统里是正式依赖。它本来连接编辑器和 Agent，现在 OpenHands 可以用它把 Claude Code、Codex 或 Gemini CLI 当成可替换的大脑。自己的子 Agent 仍然几乎都在进程内通信。A2A 跨厂商网格仍然只有 Gemini CLI。",
  },
  {
    n: 12,
    title: "2026 上半年，harness 从工具变成了平台",
    section: "§14.5",
    text: "钩子、skill、插件在生产系统上收敛。能力分发有了市场、注册表、信任分级。厂商给对方的会话文件写导入器，并出现 MDM 级治理。Harness 能当库导入，框架厂商反过来发布 harness。Agent 可以藏在兼容 OpenAI 的端点后面。Omnigent 在上面再套一层。",
  },
  {
    n: 13,
    title: "九十行脚手架直接实现了十八条里的十条",
    section: "§16.10",
    text: "Listing 3 是大约 90 行的 Python。它直接落实 10 条建议，并和其余 8 条兼容。没有框架、没有 RAG、没有向量库、没有多 Agent、没有沙箱。论文明确说它是拿去抄了再改的教学脚手架，不是生产模板，也没有证明它能打平 Mini-SWE-Agent 的基准。",
  },
];

export type Recommendation = {
  n: number;
  group: string;
  title: string;
  text: string;
};

export const recommendations: Recommendation[] = [
  {
    n: 1,
    group: "循环",
    title: "先写线性 while",
    text: "正交的轮次策略堆到三件以上（步数、费用、自动压缩、上下文警告、只读），再学 Mistral Vibe，把它们做成中间件，而不是在循环体里加分支。",
  },
  {
    n: 2,
    group: "模型",
    title: "有自家模型就贴紧它，并留一个通用后备",
    text: "没有自家模型也可以用缓存断点、思考档位和推理力度，但要集中维护按供应商区分的元数据。Pi、Hermes、OpenCode 都是这么付这笔成本的。",
  },
  {
    n: 3,
    group: "工具",
    title: "从一只 bash 开始",
    text: "工具只在看见失败后再加：输出被截断就加读文件和写文件，find 别扭就加 grep 和 glob，整文件重写太费 token 再加精确替换。",
  },
  {
    n: 4,
    group: "工具",
    title: "工具超过大约 15 个，再做延迟加载",
    text: "Claude Code 用 shouldDefer 把初始提示减少大约四成。Codex 和 Hermes 用 BM25 搜索工具规格。低于这个数量，多一层间接不划算。",
  },
  {
    n: 5,
    group: "改文件",
    title: "编辑契约跟模型档位走，漂移在工具里处理",
    text: "前沿模型用唯一子串的精确替换。更弱或更杂的模型用模糊级联，或者像 Gemini CLI 那样用一次模型调用修匹配。不要用行号。",
  },
  {
    n: 6,
    group: "上下文",
    title: "自动发现分层 Markdown，并读邻居的文件名",
    text: "项目、用户、扩展三层。顶层内容靠近系统提示的开头；嵌套文件等工具碰到那个子树再注入。Hermes 和 OpenCode 会读 CLAUDE.md、AGENTS.md 甚至 .cursorrules。",
  },
  {
    n: 7,
    group: "上下文",
    title: "在窗口下面留一块缓冲再压缩，并保住最近的原文",
    text: "摘要要增量合并，不要每次从头重写。同一套压缩在上下文溢出时也要能触发，而不是让这一轮崩溃。",
  },
  {
    n: 8,
    group: "上下文",
    title: "不要为代码做向量检索",
    text: "用 ripgrep、glob、tree-sitter 和文件系统。代码自带路径和语法树，而且分钟级就会变，预建的向量几乎一建好就过期。",
  },
  {
    n: 9,
    group: "安全",
    title: "开发者工具用三档审批",
    text: "计划、默认、全自动。Gemini CLI 实际是四档：计划、默认、自动编辑、YOLO。人在环时，按风险问一声就够。",
  },
  {
    n: 10,
    group: "安全",
    title: "企业、共享或自动环境用操作系统沙箱和策略即代码",
    text: "Codex 和 Gemini CLI 在 Linux 上用 Bubblewrap，macOS 上用 Seatbelt，Windows 上用受限令牌。能复用操作系统程序，就不要自己写命名空间。",
  },
  {
    n: 11,
    group: "安全",
    title: "规则写成数据；如果有 YOLO，下面要留地板",
    text: "Hermes 有十二条硬禁模式，--yolo 也拆不掉。绕过开关在模块导入时冻住，这样被注入的内容不能在运行中把它翻开。",
  },
  {
    n: 12,
    group: "编排",
    title: "先保持单 Agent",
    text: "直到你能指出一段必须并行、而且隔离上下文明显好过串行搜索的探索。多 Agent 很费 token。多数编程任务没有那么多真能并行的部分。",
  },
  {
    n: 13,
    group: "编排",
    title: "对外做 ACP 服务端，对内子 Agent 留在进程里",
    text: "ACP 现在同时面向 IDE、托管你的 harness，以及 meta-harness。自己的工人不要走这套协议。A2A 仍然只有 Gemini CLI 在押。",
  },
  {
    n: 14,
    group: "扩展",
    title: "流程和领域知识用 skill，外部系统用 MCP",
    text: "优先级是 skill 在前。第三方 skill 要当软件包：信任分级、扫描、隔离。Pi 证明了「skill 加带 README 的命令行工具、不要 MCP」是说得通的最小位置。",
  },
  {
    n: 15,
    group: "不要做",
    title: "不要用通用 Agent 框架当运行时",
    text: "LangChain、LangGraph、AutoGen、CrewAI、LlamaIndex、Pydantic AI、Genkit、Google ADK、Semantic Kernel，语料里的运行时都没导入。想要现成的，论文说 2026 年的框架层是 harness SDK。",
  },
  {
    n: 16,
    group: "不要做",
    title: "不要为代码建向量索引",
    text: "0/11。出现过的向量是对话记忆。Hermes 用 SQLite 全文检索撑住了这个角色。如果认为语义检索有用，先在留出的任务集上证明它胜过 ripgrep 加 tree-sitter。",
  },
  {
    n: 17,
    group: "不要做",
    title: "不要把每个上游 API 一对一包成工具",
    text: "这是 Anthropic 工具文章里点名的常见错误。把动作收成少量高信号操作。",
  },
  {
    n: 18,
    group: "不要做",
    title: "不要过度设计卡住检测，但便宜的上限要有",
    text: "Claude Code 和 Codex 没有自动卡住检测，也能当产品。十几行就够：连续格式错误上限、墙钟时间、三次相同调用就问人。五种场景的检测器是平台级投入。",
  },
];

export type Audit = {
  claim: string;
  verdict: "准确" | "要补边界" | "说满了";
  detail: string;
};

export const audits: Audit[] = [
  {
    claim: "Agent 等于模型加 Harness，差别在外壳不在模型。",
    verdict: "准确",
    detail: "这是论文开篇的等式。术语 2026 年 2 月流传开来：Mitchell Hashimoto 先随口用过，Trivedy 在 LangChain Deep Agents 的语境里定义它。论文注明这个讽刺：词是从 LangChain 里出来的，而语料运行时谁都没导入 LangChain。",
  },
  {
    claim: "作者都来自 Inclusive Brains / Wavestone AI Lab。",
    verdict: "要补边界",
    detail: "Paul Barbaste 同时署名 Inclusive Brains 和 Wavestone AI Lab，并且是通讯作者。Tristan Darrigol、Germain Vu、Tom Wiltberger 只署 Wavestone AI Lab。",
  },
  {
    claim: "研究对象是 Claude Code、Codex、Gemini CLI、Hermes、Pi、OpenCode、OpenClaw 等 11 个系统，4 家厂商加 7 个开源。",
    verdict: "要补边界",
    detail: "数量对，名单不完整。四家厂商旗舰是 Claude Code、Codex CLI、Gemini CLI、Mistral Vibe。七个开源是 OpenHands、Aider、Mini-SWE-Agent、Hermes、Pi、OpenCode、OpenClaw。Omnigent 是对照用的 meta-harness，不算进这 11 个。",
  },
  {
    claim: "大约 400 万行，只解剖源码，不跑性能排名。",
    verdict: "准确",
    detail: "论文写的是 roughly four million lines，是量级不是精确行数。四月版表里有过自报的 SWE-Bench 数字，七月版删了，因为模型、配置和日期对不上。代码量只用来摆简单和复杂的位置。",
  },
  {
    claim: "隔一季度重钉版本，看演化。",
    verdict: "要补边界",
    detail: "纵向样本是四月版那八套被重新钉版本的系统，不是后加的 Hermes、Pi、OpenCode。三个月里有三条旧观察被就地改写：耦合二分法、规模意味着沙箱、协议只有两个角色。",
  },
  {
    claim: "400 万行里零框架。",
    verdict: "要补边界",
    detail: "没有通用编排框架进运行时，这句话成立，而且扩了三倍语料、隔三个月又查过。边界有两处：OpenCode 用 Vercel AI SDK 做供应商抽象，不是编排框架，仓库里还有一个开关后面的自研客户端。Aider 的 /help 可以选装 llama-index，只检索 Aider 自己的文档。",
  },
  {
    claim: "400 万行里零向量检索，没有一家把代码变成向量。",
    verdict: "要补边界",
    detail: "对代码检索成立：0/11。不是「任何地方都没有向量」。OpenClaw 默认用 sqlite-vec 近邻加全文检索来回忆对话。Hermes 把向量留在可选记忆插件，核心回忆是 SQLite FTS5。Aider 的仓库地图是 tree-sitter 符号加类 PageRank，不是向量。",
  },
  {
    claim: "SKILL.md 9/11，反超 MCP 的 8/11，还出现了 Agent 自己写的 skill。",
    verdict: "准确",
    detail: "不做 skill 的是 Aider 和 Mini-SWE-Agent。打破四月平局的是 Pi。自己写 skill 的是 Hermes 的后台评审；Gemini CLI 是把补丁放进收件箱等人审，论文把它算作部分形态。",
  },
  {
    claim: "Codex 逐字抄了 Claude Code 的 hook 词汇，还写了导入器搬会话。",
    verdict: "准确",
    detail: "事件名几乎逐字相同，并多了一个 Claude Code 没有的 PostCompact。导入器读 ~/.claude 的会话 JSONL 和 settings.json。OpenHands 也读 Claude Code 的插件格式。论文把这叫做收敛变成了模仿。",
  },
  {
    claim: "Harness 正在从工具变成平台，外面还可以再套 meta-harness。",
    verdict: "准确",
    detail: "这是全文论点，不是旁证。证据包括可导入的 SDK、OpenCode 的客户端/服务端拆分、OpenHands 把 Agent 暴露成兼容 OpenAI 的端点，以及 Databricks 在 2026 年 6 月开源的 Omnigent。",
  },
  {
    claim: "最小 Harness 大约 90 行，实现了 18 条设计建议。",
    verdict: "说满了",
    detail: "Listing 3 大约 90 行，直接实现 10 条，并与另外 8 条兼容。它故意不包含沙箱、多 Agent 和 MCP/skill。论文写明不能当生产模板，也没有在基准上跑过它。另一件容易混的事：Mini-SWE-Agent 的研究地板大约 100 行、只有 bash，和这 90 行教学脚手架不是同一段代码。",
  },
  {
    claim: "Claude Code 有三层权限，Codex 有四层加原生沙箱。",
    verdict: "要补边界",
    detail: "标题级说法和论文一致。Codex 四层在正文里写了名字：Starlark 执行策略、生命周期钩子、叫 Guardian 的 LLM 审批、三平台原生沙箱。Claude Code 的三层主要画在图 5 里，正文没有逐层命名；正文写清的是后台和分叉子 Agent 只有前两层，本该弹出的询问会变成拒绝。",
  },
  {
    claim: "循环分三类：迭代、带反思、协调者–工人。",
    verdict: "要补边界",
    detail: "十一套都是 ReAct 的变体。迭代式动作–观察是九套的主体。反思形主循环只有 Aider。协调者–工人是叠在迭代循环上的一层，不是第三种互斥循环；规定得最死的是 Claude Code 和 Codex。",
  },
];
