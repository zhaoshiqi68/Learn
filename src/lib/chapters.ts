import type { WidgetId } from "@/lib/widgets";

export type NoteTone = "fix" | "keep" | "limit";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; cite: string }
  | { type: "note"; tone: NoteTone; title: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "widget"; id: WidgetId };

export type Chapter = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  minutes: number;
  section: string;
  lead: string;
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    id: "start",
    index: "00",
    title: "先读这一页",
    kicker: "怎么用这份导读",
    minutes: 3,
    section: "导读",
    lead: "这不是把 83 页缩成一张卡片。它按论文自己的章节走，并把网上那份摘要说满了的地方单独标出来。",
    blocks: [
      {
        type: "p",
        text: "原文是 Paul Barbaste、Tristan Darrigol、Germain Vu、Tom Wiltberger 的预印本，arXiv:2609.00006，投稿日期写的是 2026 年 7 月 15 日。标题是 Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents。副标题说明方法：对十一套系统做源码研究。HTML 和 PDF 都在 arXiv 上，下面每节都标了章节号，方便你对着原文翻。",
      },
      {
        type: "p",
        text: "流通摘要把论文说成 CC BY 4.0。我在 arXiv HTML 正文里没有看到单独的许可证声明，所以这份导读不转载全文，只复述论证并引用短句。要引用或转载，以 arXiv 条目上的许可证为准。",
      },
      {
        type: "h",
        text: "建议的读法",
      },
      {
        type: "list",
        items: [
          "时间少：读「论文在回答什么」「两个缺席」「摘要对照」。大约十分钟，能判断那份摘要哪里能信。",
          "想看架构：从「七个子系统」进十一套系统，再挑循环、工具、记忆、安全里跟你有关的一节。",
          "正在做 Agent：直接看十八条建议，勾上你已经有的，缺的再回对应章节。",
        ],
      },
      {
        type: "note",
        tone: "keep",
        title: "论文自己怎么定位",
        text: "它不排名、不跑统一基准。它描述这些系统是怎么写的。作者在致谢里披露：源码分析和文稿都大量使用了 Claude Code，结论在写进论文前对照过所引代码。",
      },
      {
        type: "p",
        text: "左侧是章节。读过的会留下标记，存在这台浏览器里。原文随时可以打开。",
      },
    ],
  },
  {
    id: "question",
    index: "01",
    title: "论文在回答什么",
    kicker: "引言 · §1",
    minutes: 4,
    section: "§1",
    lead: "同一个模型，有的团队做出来的 Agent 能连续改仓库，有的跑几步就丢上下文。论文认为这个差别在模型外面。",
    blocks: [
      {
        type: "quote",
        text: "An agent is a model plus a harness. The model supplies the intelligence; the harness turns that intelligence into work.",
        cite: "§1",
      },
      {
        type: "p",
        text: "Harness 是除模型以外的全部运行时：循环、工具、上下文、安全控制、编排、扩展面。Harness engineering 这个说法 2026 年初才成为一门有指南、有形式定义、有自己文献的事。作者认为它缺的是一份参照：用生产源码说明 harness 到底是什么、由什么组成、领先实现差在哪里。",
      },
      {
        type: "p",
        text: "已有文献都没碰到这个目标。基准调查报分数，不碰架构。概念分类描述模式，没有实现。同期另一份源码分类（Rombaut 的 Inside the Scaffold）不包含定义这个领域前沿的厂商系统。没有人问：循环怎么组织，工具怎么定义和沙箱化，安全怎么强制执行，上下文怎么配给，以及这个品类自己往哪走。",
      },
      {
        type: "h",
        text: "七项贡献",
      },
      {
        type: "list",
        items: [
          "给 harness 下定义，并画出七个子系统各自最小和最大的样子。",
          "第一次把四家厂商原生系统和采用面最广的开源 harness 放进同一份源码对照。",
          "13 条跨系统观察，29 个反复出现的设计模式。",
          "九十天的纵向差异：同一批仓库，四月钉一次，七月再钉一次。",
          "两个缺席在语料扩大三倍之后仍然成立：没有通用 Agent 框架，没有面向代码的向量检索。",
          "平台转向：SDK、市场、治理、meta-harness。",
          "18 条设计建议，外加一份大约 90 行的最小脚手架，直接实现其中 10 条。",
        ],
      },
      {
        type: "note",
        tone: "fix",
        title: "摘要把论点说小了",
        text: "「外壳怎么搭、最佳实践是什么、接下来往哪走」这三问都在。论文真正收束的句子是：2026 年上半年，编程 harness 完成了从工具到平台的转向。最佳实践是第 16 节的副产品，不是全文的终点。",
      },
    ],
  },
  {
    id: "anatomy",
    index: "02",
    title: "什么是 Harness",
    kicker: "定义 · §2",
    minutes: 5,
    section: "§2",
    lead: "先把词钉死。否则后面十一套系统的差异，全会滑成「都是 Agent」。",
    blocks: [
      {
        type: "quote",
        text: "The harness is everything except the model: the runtime that couples an LLM to the world.",
        cite: "§2.1",
      },
      {
        type: "p",
        text: "作者采用 Macedo 的定义核心：包住语言模型、使它能够对仓库采取行动的那一层。然后用七个子系统把它拆开。定义文献暗示过这些部分，但还没有在生产源码里落地。点一个子系统，看它在语料里能缩到多小、又能长到多大。",
      },
      { type: "widget", id: "subsystems" },
      {
        type: "h",
        text: "四个容易混的东西",
      },
      {
        type: "list",
        items: [
          "不是脚手架，也不完全是。脚手架指结构代码（循环、注册表）。Harness 指把结构嵌进去、交付出去的运行时。Mini-SWE-Agent 的脚手架大约 100 行；Claude Code 的 harness 是带终端界面、权限系统和插件生态的产品。",
          "不是 Agent 框架。框架是开发者导入的库。Harness 是开发者在里面工作的运行时。这个界限在 2025 年还清楚，2026 年从两边同时在溶解。",
          "不是评测 harness。SWE-bench 的 harness 包住 Agent 去跑任务。Agent harness 包住模型让它去行动。同一个词，包裹方向相反。",
          "不是编排器。编排器在上面协调一个或多个 harness，自己没有编辑循环。Omnigent 编排了十一家厂商的 harness，其中五家在本论文语料里。它是关于 harness 的证据，它自己不是 harness。",
        ],
      },
      {
        type: "p",
        text: "七个子系统旁边还有两块横切的表面：人用的界面层（终端、命令行旗标、IDE 协议、HTTP、SDK），以及多个子系统共用的会话基底（记录、持久化、恢复、分叉）。平台化的论证，很大一部分落在界面层上。",
      },
      {
        type: "p",
        text: "地板有一个存在证明。Mini-SWE-Agent 用大约 100 行实现全部七个子系统：一个 while、一块模板、一个工具、一份消息列表、两个上限、不做编排、用结构化类型充当全部扩展。它自报的 SWE-bench Verified 成绩和大三个数量级的系统落在同一区间。论文立刻加了限定：数字是自报的，模型和日期不同。能留下来的结论只是：地板很低。把地板和生产系统分开的，不是「能不能做完任务」，而是安全、恢复、成本、扩展，以及越来越像平台的那些表面。",
      },
    ],
  },
  {
    id: "corpus",
    index: "03",
    title: "十一套系统",
    kicker: "样本 · §4–§5",
    minutes: 6,
    section: "§4–§5",
    lead: "样本按设计哲学、成熟度和市场位置铺开，不是按基准分数挑选的优胜者。",
    blocks: [
      {
        type: "p",
        text: "四家商业模型厂商各一家旗舰：Anthropic 的 Claude Code、OpenAI 的 Codex CLI、Google 的 Gemini CLI、Mistral 的 Mistral Vibe。七个开源项目占住不同的缺口。语言覆盖 Python、TypeScript、Rust。快照全部钉在 2026 年 7 月能拿到的版本；四月已经审过的八套保留旧快照，供第 14.5 节做差异。",
      },
      { type: "widget", id: "systems" },
      {
        type: "h",
        text: "两个容易被算进「十一」的对照",
      },
      {
        type: "p",
        text: "OpenClaw 在十一套里面，但是离群点。它的 README 把自己写成个人助手网关，不是编程 Agent，覆盖二十多个通讯平台，没有原生的改代码工具。编程任务交给插件去调 OpenCode、Kimi、Copilot。它被放进来，是为了检验「大家都在收敛」这件事是不是只对编程 Agent 成立。Hermes 站在中间：它也是多通道网关，但自带完整的编程工具，所以算语料成员。",
      },
      {
        type: "p",
        text: "Omnigent 不在十一套里。Databricks 2026 年 6 月开源。它把整套 harness 当成可替换部件，自己不实现编辑循环。如果把它和十一套并列打七个子系统的分，是分类错误。",
      },
      {
        type: "note",
        tone: "limit",
        title: "代码量怎么读",
        text: "论文的规模是定性的：极小约 5 千行，小型约 2 到 4 万，中型约 8 到 11 万，大型约 50 万以上，超大约 60 万以上。Codex 七月快照大约 110 万行 Rust。这些数字不能跨语言比较，只用来把系统放在「简单还是能力」的轴上。",
      },
      {
        type: "p",
        text: "观察 1 放在总览表后面：循环更精致，并不能预测基准表现。OpenCode 非测试源码大约五分之三是终端、网页、桌面和 SDK 客户端，而不是 harness 本体。Codex 用六位数的行数做应用服务器传输、插件，以及没有任何基准会去测的实时语音层。",
      },
    ],
  },
  {
    id: "loop",
    index: "04",
    title: "执行循环",
    kicker: "子系统 1 · §6",
    minutes: 6,
    section: "§6",
    lead: "十一套都是 ReAct 的变体。差别在并发、状态放在哪、以及什么叫做停。",
    blocks: [
      {
        type: "p",
        text: "论文分出三种范式，但它们不是三选一。九套的主体是迭代式动作–观察：组装提示，调用模型，执行工具，把观察追加回去。Aider 是反思增强：改完跑语法、编译和 flake8，失败就再叫一次模型，默认最多三次。协调者–工人是叠在迭代循环上的调度层，在 Claude Code 和 Codex 里是规定好的，在 Hermes 里要开配置。",
      },
      {
        type: "h",
        text: "同一形状，九种脾气",
      },
      {
        type: "list",
        items: [
          "OpenHands：每一步一次模型调用，但这一步里的工具可以成批执行。并行受资源锁约束，文件、终端、浏览器各自串行。卡住检测覆盖五种场景，默认开启。上下文窗口错误会触发压缩，而不是崩掉。",
          "Claude Code：流式事件。工具默认不能并行，必须显式声明并发安全。只读工具可以一批，写工具不行。",
          "Codex：Tokio 状态机，工具走 FuturesOrdered，保证有序的并行。",
          "Mini-SWE-Agent：没有状态机。消息列表一直长。v2.4 加了墙钟上限，以及连续格式错误到达上限就中止。地板也在往上漂。",
          "Mistral Vibe：循环体很普通，轮次策略在中间件里。步数、费用、token、自动压缩、上下文警告、只读，都是可替换的一层。同一循环换中间件，就变成计划、自动批准、探索等不同档案。",
          "Gemini CLI：异步生成器。五次相同工具调用或十段相同内容会停。三十轮之后再加一次模型自检。改文件的工具被强制串行，而且模型能在每个工具参数里看到一个「等上一个完成」的开关。",
          "Hermes：默认 90 次迭代的预算。如果这轮改了代码却没有新的验证证据，verify-on-stop 会否决「我做完了」。卡住时先警告，硬停默认是关的。",
          "Pi：大约 790 行的函数式核心。没有计划器，没有反思步，没有回合上限，没有卡住检测，没有费用开关。这些缺失是写下来的设计拒绝。用户中途插话有两个队列：steer 插在当前工具之后，followUp 只在模型本来要停的时候才放进来。",
          "OpenCode：while(true)，消息日志同时是工作队列。待处理的子 Agent 和压缩是持久化的消息片段，所以进程重启后循环还能接着 dequeue。没有默认步数上限。三次字节级相同的工具调用不自动中止，而是通过权限系统问人，论文叫它 doom loop。",
        ],
      },
      {
        type: "note",
        tone: "keep",
        title: "和「循环工程」不是一个词",
        text: "2026 年 6 月，Steinberger 把一句流传很广的话说成：别再给编程 Agent 写提示，去设计会提示你的 Agent 的循环。论文把这叫做外层循环。Harness 工程做的是里面那圈动作–观察。外层验证已经出现在语料里：OpenHands 的 /goal 用模型当裁判，Hermes 在停止条件上否决过早的完成。",
      },
    ],
  },
  {
    id: "tools",
    index: "05",
    title: "工具与改文件",
    kicker: "子系统 2 · §8",
    minutes: 5,
    section: "§8",
    lead: "工具数量从 1 到 109 以上。论文认为改文件的契约，是影响改准不准的决定因素之一。",
    blocks: [
      {
        type: "p",
        text: "Mini-SWE-Agent 把一切塞进一次 shell。Claude Code 的 43 个工具把校验、权限、并发安全和界面渲染拆成不同接口。Pi 只造 7 个、默认露出 4 个，其余都是扩展。Hermes 注册 69 个，再用工具集决定每个平台的模型实际能看见哪些。OpenClaw 的 109 以上包含媒体和频道，它本来就不是代码编辑器。",
      },
      {
        type: "h",
        text: "工具一多，就不要全放进提示",
      },
      {
        type: "p",
        text: "四月时延迟加载还像 Claude Code 的独家做法：shouldDefer 的工具不进初始系统提示，模型用 ToolSearchTool 现找。论文说这把初始提示减少大约四成。到七月，Codex 给工具打 defer_loading，并用 BM25 检索工具规格。Hermes 更进一步：MCP 和插件的 schema 一旦超过上下文的 10%，就塌成三个桥接工具，搜索、描述、调用。OpenCode 对 skill 只先给名字和描述。Mistral Vibe 的 defer 只推迟 MCP 连接，连上之后工具对模型全可见，论文不再把它算进这一模式。",
      },
      {
        type: "h",
        text: "八种改文件的办法",
      },
      {
        type: "list",
        items: [
          "精确且唯一的子串：Claude Code、迁过去的 Mistral Vibe、Pi（只做 Unicode 和空白规范化，没有相似度阈值）。",
          "补丁 DSL：Codex 的 Begin/End Patch。OpenCode 对 GPT 家族直接换上这套，并拿掉字符串替换工具。",
          "模糊级联：Gemini CLI 从精确走到空白、正则、模糊，最后用一次模型调用修失败的 old/new。OpenCode 和 Hermes 各有九段级联，源码注释写着彼此的继承关系。",
          "Aider 仍是缩进问题的最复杂解法：把绝对缩进变成相对变化，再用 diff-match-patch。它还有 13 种按模型选择的格式。",
          "Mini-SWE-Agent 不提供编辑工具，模型自己用 sed 和 awk。",
        ],
      },
      {
        type: "note",
        tone: "fix",
        title: "摘要没写的运动",
        text: "Mistral Vibe 在一个季度里删掉了模糊的 SEARCH/REPLACE，改成 Claude Code 式的精确契约。论文把这看成：模型变强以后，最优解从「工具容忍漂移」挪向「工具执行严格合同」。另一处勘误：四月稿说旧的模糊匹配器会应用模糊编辑；复审发现它只在报错里提示最接近的匹配，并没有真的这么改文件。",
      },
    ],
  },
  {
    id: "memory",
    index: "06",
    title: "记忆与上下文",
    kicker: "子系统 4 · §9",
    minutes: 6,
    section: "§9",
    lead: "对话总会长出窗口。压缩办法已经靠近。真正拉开差距的，是记忆由谁来写、谁来审。",
    blocks: [
      {
        type: "p",
        text: "论文把会话内的上下文策略排成四档。Mini-SWE-Agent 不做管理，历史无限增长，换来可复现。Aider 在超过阈值时把前半段递归摘要，最近一半留着，最多三层，还可以换一个便宜模型来摘要。OpenHands 曾经有十种冷凝器，V1 SDK 收成三种，并且把压缩本身记进事件日志；窗口溢出和坏掉的历史会触发压缩，而不是崩溃。其余七套，包括四家厂商和这一版新加的三套，收敛到阈值触发的模型压缩。",
      },
      {
        type: "h",
        text: "阈值压缩里仍然不一样的地方",
      },
      {
        type: "list",
        items: [
          "Claude Code 在有效窗口下方留 1.3 万 token 的缓冲。压缩后最多恢复 5 个文件。",
          "Gemini CLI 在达到限额的 50% 时压缩，最近 30% 原样保留。下面还有一层按文件分级的压缩：全文、部分、摘要、排除。",
          "Mistral Vibe 把压缩做成中间件。压缩后的信封会把先前的用户消息重新注入，避免任务目标被摘要冲掉。同一套例程在回合中途溢出时也会触发。",
          "Hermes 的压缩不改写记录。它结束当前 SQLite 会话，开一个用 parent_session_id 串起来的子会话。历史不会被毁掉。",
          "Pi 和 OpenCode 把上一次摘要交回去合并，而不是从头重写。OpenCode 连分词器都没有，用字符数除以 4 估计 token。",
        ],
      },
      {
        type: "h",
        text: "跨会话记忆的四种治理",
      },
      {
        type: "p",
        text: "Codex 最自主：后台流水线从会话里抽出结构化记忆，再由一个不能上网、只能本地写的沙箱子 Agent，对着 git 风格的差异做合并，存到 ~/.codex/memories/。Gemini CLI 走相反方向。四月还有一个 save_memory 工具，七月的系统提示明确说没有这个工具。模型直接改 GEMINI.md 或私有的 MEMORY.md；另有一个抽取子 Agent 把补丁放进 .inbox/，人用 /memory 审。Hermes 把记忆压到两个有字数上限的 Markdown，会话中途写入磁盘，但不让它弄脏提示缓存。OpenClaw 在每次主回复之前先跑一个记忆子 Agent。",
      },
      {
        type: "p",
        text: "仓库上下文则几乎全部收敛到自动发现的 Markdown：CLAUDE.md、AGENTS.md、GEMINI.md，以及别人家的文件名。Aider 仍然是唯一做排序仓库地图的：tree-sitter 抽符号，再按和当前对话的相关性做类 PageRank，默认预算 1024 token。这不是向量检索。",
      },
      {
        type: "note",
        tone: "keep",
        title: "卡住时先看这里",
        text: "如果 Agent 忘了早先的决定，看压缩是不是每次从头重摘要、有没有保住最近一段原文。如果工具结果像是没回到模型，看循环有没有把观察追加进消息。如果上下文一溢出就崩，看溢出是不是接到了同一套压缩，OpenHands 和 Mistral Vibe 都是这么接的。",
      },
    ],
  },
  {
    id: "safety",
    index: "07",
    title: "安全与权限",
    kicker: "子系统 5 · §10",
    minutes: 6,
    section: "§10",
    lead: "自主程度有多高，安全机制就有多重要。语料从几乎不管，到跨三个操作系统的原生沙箱。",
    blocks: [
      {
        type: "p",
        text: "Claude Code 被论文称为结构上最干净的一套，三层画在图 5。正文没有给这三层逐一命名。它写清的行为是：后台和分叉出来的子 Agent 只有第 1、2 层，本来该问人的情况变成拒绝；前台子 Agent 仍可以弹出对话框；解不开的情况升级到父协调者。会话会数拒绝次数，拒绝够多就退回询问。每个异步 Agent 自己记这个计数，避免互相污染。",
      },
      {
        type: "h",
        text: "Codex 的四层是正文里写了名字的",
      },
      {
        type: "list",
        items: [
          "Starlark 执行策略。规则可以内嵌 match 和 not_match 例子，解析时就当测试跑。四月稿曾把这层误写成 TOML，七月更正：一直是 Starlark。",
          "生命周期钩子。事件词表几乎逐字是 Claude Code 的：PreToolUse、PermissionRequest、PostToolUse、PreCompact、SessionStart，以及子 Agent 和停止事件。多一个对方没有的 PostCompact。",
          "Guardian。命令需要人批时，另一个会话按策略提示重新评估，超时或输出不合法就失败关闭。四月稿说 Codex 没有 LLM 分类器，这个对比不再成立。",
          "原生沙箱。Linux 上是编进树里的 Bubblewrap，Landlock 降成旧路径；macOS 用 Seatbelt；Windows 用受限令牌。即使位于可写根目录里，.git 等路径也会被重新标成只读。",
        ],
      },
      {
        type: "p",
        text: "Gemini CLI 用四档审批：计划（只读）、默认（每次问）、自动编辑（改文件放行，shell 仍问）、YOLO（全放行，给 CI）。上面再加按模式区分的 TOML 沙箱策略，以及目录信任列表。四家厂商旗舰现在都有只读的计划模式。",
      },
      {
        type: "p",
        text: "没有操作系统沙箱的大系统，把预算花在别的威胁上。Hermes 本地后端有大约 3200 行审批模块，文档写着配置文件就是安全策略。十二条硬禁（包括 rm -rf /、mkfs、写块设备）在 --yolo 下仍然有效，绕过开关在导入时冻住，防止被注入的 skill 在运行中翻开它。OpenCode 用 tree-sitter 解析命令，按参数结构授权，而不是只看字符串前缀。Pi 的安全文档主张：一个不完整的进程内沙箱很容易被误认成安全边界，所以内建工具就以调用者的权限执行。项目信任只决定仓库控制的扩展和 skill 能不能加载，上下文文件不管怎样都会加载。",
      },
      {
        type: "note",
        tone: "limit",
        title: "规模大，不等于有沙箱",
        text: "这是七月改写的观察。Hermes 和 OpenCode 都在最大的那一档附近，操作系统级隔离是零。隔离可以委托给 Docker、SSH、Modal 这类后端，但本地后端不等于沙箱。",
      },
    ],
  },
  {
    id: "orch",
    index: "08",
    title: "多 Agent 与扩展",
    kicker: "子系统 6–7 · §11–§12",
    minutes: 6,
    section: "§11–§12",
    lead: "派工人已经很常见。工人之间怎么说话，却几乎都不用对外的标准协议。扩展层则是 skill 超过了 MCP。",
    blocks: [
      {
        type: "h",
        text: "派发、交上下文、收回结果",
      },
      {
        type: "p",
        text: "Claude Code 用 AgentTool 派子 Agent。子 Agent 拿到分叉的上下文、独立的中止控制器、克隆的文件状态缓存，权限对话框被压掉。结果用 XML 块回来。流程被写成研究、综合、实现、验证。Codex 用 spawn_agent，线程有自己的历史，分叉模式可以继承全部历史或最近 N 轮，通信走有类型的邮箱。Hermes 可以开嵌套委派，另有一种看板群体：规划根、工人、验证者是子进程，黑板是 SQLite。OpenCode 的子会话在进程内，权限从父会话推导。Pi 的子 Agent 是扩展，用操作系统进程和 JSONL，不用 ACP。",
      },
      {
        type: "p",
        text: "自己的子 Agent，九个多 Agent 系统里有八个仍用进程内原语。跨进程的例外也不走标准协议：Pi 的 JSONL，Hermes 群体的 SQLite。唯一把子 Agent 协调放上标准协议的是 OpenClaw。",
      },
      {
        type: "h",
        text: "ACP 的第三个角色",
      },
      {
        type: "p",
        text: "ACP 现在是六个系统的正式部件：Mistral Vibe、OpenClaw、OpenCode、Hermes、OpenHands，以及论文放进这六个里的 Gemini CLI。它做三件事。第一，编辑器驱动本地 Agent，像语言服务器那样，Zed 和 JetBrains 走这条。第二，四月还没有人占据的角色：把对手的 harness 当成可替换的大脑。OpenHands 的一步可以委托给 claude-agent-acp、codex-acp 或 gemini 的 ACP 模式。第三，A2A 跨厂商网格，语料里仍然只有 Gemini CLI。",
      },
      {
        type: "h",
        text: "Skill、MCP、钩子",
      },
      {
        type: "p",
        text: "SKILL.md 是带说明、可选脚本和元数据的目录。它声明做什么、何时激活、能用什么工具。9 套有，Aider 和 Mini-SWE-Agent 没有。MCP 是 8 套。Pi 明确站在「要 skill、不要 MCP」。延迟加载在 9 个采用者里占了 8 个。四个系统有远程注册表。Hermes 给安装做信任分级、静态扫描和隔离。Hermes 的后台评审会从完成的任务里创建和修补 skill；Gemini CLI 的抽取子 Agent 把补丁放进收件箱。",
      },
      {
        type: "p",
        text: "钩子在四月还是 Claude Code 的特色。七月，十一套里有九套，同样是 Aider 和 Mini-SWE-Agent 不做。Codex 的事件名逐字沿用。Pi 本身就是一条大约 33 种事件的总线。",
      },
    ],
  },
  {
    id: "absences",
    index: "09",
    title: "两个缺席",
    kicker: "跨系统 · §13.2",
    minutes: 5,
    section: "§13.2",
    lead: "外面的文献把两样东西当成生产 Agent 的默认件。这十一套源码里，两样都不在代码检索和运行时编排的位置上。",
    blocks: [
      {
        type: "h",
        text: "没有通用编排框架",
      },
      {
        type: "p",
        text: "每个依赖清单都查过，每棵源码树都搜过导入：LangChain、LangGraph、LlamaIndex、AutoGen、CrewAI、Pydantic AI、Genkit、Haystack、Semantic Kernel、Google ADK，以及 Smolagents、Swarm、Agno。大约四百万行 Python、TypeScript、Rust 里，没有一条生产 Agent 路径导入它们。Gemini CLI 不用 Genkit，也不用谷歌自己的 ADK。Hermes 里仅有的 LangChain 字符串，出现在教用户怎么用向量数据库的 skill 文档里。",
      },
      {
        type: "p",
        text: "循环都是手写的：asyncio、阻塞的同步 Python、Promise、Tokio。工具注册表围着 Pydantic、Zod、TypeBox、Effect Schema 或 Rust 枚举自建。提示是 Markdown、Jinja2 或字符串拼接。作者写，他们本来预期开源项目里至少会有一处 LangChain，搜寻反例找了好几个星期。",
      },
      {
        type: "note",
        tone: "fix",
        title: "两处边界，摘要没写",
        text: "OpenCode 把内层的模型和工具管道委托给 Vercel AI SDK。那是供应商抽象，不是 Agent 编排框架，也是语料里第一个把这段管道交给第三方 SDK 的。一个自研替换客户端坐在开关后面，论文猜测这个依赖是过渡。Aider 的 /help 可以安装 llama-index，对自己的文档做检索，不参与 Agent 循环。",
      },
      {
        type: "h",
        text: "没有把代码做成向量再检索",
      },
      {
        type: "quote",
        text: "Code changes minute to minute, so pre-indexed embeddings are stale almost by construction.",
        cite: "§13.2",
      },
      {
        type: "p",
        text: "向量库、嵌入库、以及文件名里带 embedding、vector_store、rag 的路径，都搜过。对代码检索，十一套都是零。替代品是 ripgrep、glob、tree-sitter、语言服务器，以及自动发现的 Markdown。代码自带路径、语法树和类型，语义相似度复制不了这些。每个编程环境已经有接近最优的检索器：ripgrep、find、glob。",
      },
      {
        type: "p",
        text: "向量确实出现了，但对象是对话，不是源码树。OpenClaw 的默认记忆插件用 sqlite-vec 近邻加全文检索，嵌入默认开着，提供者默认是 OpenAI。Hermes 的历史搜索故意是词法的，SQLite FTS5，BM25 加面向中日韩的三元组分词，文档写着这条路径上没有模型调用。嵌入只在可选插件里。",
      },
      {
        type: "p",
        text: "论文把原因说成另一份复杂度预算。通用 LLM 应用可以忍受框架。一旦 Agent 在改真实源码，静默的提示损坏、不透明的缓存、对不上版本的工具 schema，就贵到不能耸肩放过。可调试和提示透明，压过复用。第 14.2 节给这个缺席一个历史收场：harness 没有采纳那些框架，它们取代了框架，并且自己变成了可以导入的库。",
      },
    ],
  },
  {
    id: "patterns",
    index: "10",
    title: "模式与观察",
    kicker: "目录 · §13",
    minutes: 5,
    section: "§13",
    lead: "29 个模式里，17 个四月就有，12 个是七月语料才结晶的。13 条观察散落在各章，这里收成一张可以检索的表。",
    blocks: [
      {
        type: "p",
        text: "七月新模式里，有几件摘要只点了名字：Agent 自己维护记忆、外层验证、自写 skill、谱系压缩、会话树、极简核心、客户端/服务端拆分、按模型族分提示、缓存方言扇出、语法感知的命令权限、不可信内容定界，以及 Pi 伪装成第一方 harness 去使用对方的登录。",
      },
      { type: "widget", id: "patterns" },
      {
        type: "h",
        text: "五条取舍，论文拒绝打成排名",
      },
      {
        type: "list",
        items: [
          "简单对能力。额外的代码大多不在「把任务做完」，而在安全、界面、扩展和稳健。",
          "安全对自主。摩擦更多的系统不适合拿来比谁跑得快；几乎不管安全的系统不适合直接放进企业。",
          "贴一家供应商，对保持中立。缓存和思考档位是贴紧才最顺，但多供应商系统可以用集中的条件代码买到其中一部分。",
          "单体对模块。Codex 是一百多个 crate。Mini-SWE-Agent 是一个文件。Pi 把这根轴挪到运行时组合。",
          "脚手架复杂度对模型能力。生产系统投资脚手架，是因为用户需要安全、可靠和工作流，不是因为当前模型离开这些就不能做完题。",
        ],
      },
    ],
  },
  {
    id: "platform",
    index: "11",
    title: "从工具到平台",
    kicker: "论点 · §14",
    minutes: 6,
    section: "§14",
    lead: "四月这还是一个谨慎的假说：命令行正在变成框架。七月作者把它写成已经发生的事。",
    blocks: [
      {
        type: "p",
        text: "传统框架提供循环、工具注册表、记忆、配置和扩展。这些生产系统里每一样都有。差别是：框架是你导入到代码里的库，harness 是你在里面工作的运行时。开发者的「程序」是一段自然语言任务，加上一棵 Markdown（CLAUDE.md、AGENTS.md、GEMINI.md、SKILL.md）。API 是文件系统、终端和 git。",
      },
      {
        type: "h",
        text: "四个信号",
      },
      {
        type: "list",
        items: [
          "Skill 是写给模型运行时的程序，不是写给 CPU 的。英文加 YAML 头，现在有了注册表、供应链审查和 Agent 作者。",
          "钩子和事件总线成为扩展基底。人不是在给 Agent 写程序，而是在它里面写。",
          "写代码、跑测试、读日志、提交、开合并请求，不再是人的离散步骤，而是循环里的工具调用。",
          "界面变成了平台的界面。OpenCode 内嵌 HTTP 服务和生成的 SDK，每个 UI 都是客户端。OpenHands 用兼容 OpenAI 的网关暴露对话：Agent 变成了一个模型。",
        ],
      },
      {
        type: "h",
        text: "框架和 harness 从两边并拢",
      },
      {
        type: "p",
        text: "Harness 这边长出库：Claude Agent SDK、openai-codex、OpenHands 的 SDK 化、Pi 的可导入核心、OpenCode 的 SDK。框架那边长出 harness：LangChain 的 Deep Agents 建在 LangGraph 上，独立地采用了 SKILL.md、AGENTS.md、子 Agent 和待办工具；Pydantic AI 和 Strands 也在发 harness。Omnigent 的基线安装导入的是 claude-agent-sdk 和 openai-agents。论文的收法是：2026 年一个编排层拿来当框架用的，是 harness SDK。问题从「该用哪个 Agent 框架」变成「你已经在跑哪个 harness」。",
      },
      {
        type: "h",
        text: "九十天里，收敛变成了模仿",
      },
      {
        type: "p",
        text: "Codex 采用 Claude Code 的钩子词表和计划模式，并提供会话与设置导入器。OpenHands 采用 Claude Code 的插件清单格式。OpenCode 会读 ~/.claude/skills。Hermes 的源码注释点名它借鉴了谁：OpenCode 的编辑匹配、Codex 的智能审批、OpenClaw 的编排提示。延迟加载、只读计划模式、LLM 审批、轮次检查点，都在往下扩散。作者说，一项有竞争力的特色，半衰期现在按星期计。",
      },
      {
        type: "p",
        text: "Omnigent 押的是：harness 变成了可替换部件，耐久的价值在上面一层。适配器覆盖二十多家，集成方式分成进程内 SDK、命令行子进程、ACP、原生终端、原生服务五种，并用一致性探针去测一轮基本对话、工具、流式、打断、换模型和策略拒绝。它在这一层补上单套 harness 没有的东西：任意 harness 可以把另一套当成子会话、一套跨 harness 的策略平面、统一的沙箱和出站代理、可分享的多设备会话。它不做的同样重要：没有自己的编辑循环，没有仓库上下文，也不假装各家能力相同。",
      },
      {
        type: "note",
        tone: "keep",
        title: "库存会过期，结构暂时还在",
        text: "三个月里，工具数量、功能格子、版本钉都会变。循环分类、七个子系统、两个缺席，到这一版还立得住。论文把这两种主张分开写。你如果拿这份导读去对今天的仓库，先对结构，再对某个文件还在不在。",
      },
    ],
  },
  {
    id: "advice",
    index: "12",
    title: "十八条建议",
    kicker: "实践 · §16",
    minutes: 5,
    section: "§16",
    lead: "前面是描述。这一节是处方。每条都钉在一条观察和一个真的这么做的系统上。勾选存在这台浏览器里。",
    blocks: [
      {
        type: "p",
        text: "建议按做一个新编程 Agent 时会遇到的顺序排。和 Anthropic 那组工程文章一致的地方，论文当成交叉验证。语料超出文章的地方也会标。沙箱、多 Agent、skill 和 MCP 被故意留在核心之外：先量到失败，再加最小的那一块。",
      },
      { type: "widget", id: "advice" },
      {
        type: "h",
        text: "那九十行里实际有什么",
      },
      {
        type: "p",
        text: "Listing 3 是 Python 示意，不是库。结构是：一个 Model 协议；bash、读文件、写文件、唯一子串替换这四只工具，输出过长就截断；从当前目录走到根，收集沿途的 AGENTS.md；轮次和费用上限；token 估计越过阈值就摘要，系统消息和最近大约 30% 原样留下；while 循环里串行执行工具，异常变成一条 ERROR 观察，而不是让循环死掉。",
      },
      {
        type: "p",
        text: "它直接覆盖的是线性循环、供应商抽象、四只工具、分层 Markdown、阈值压缩，以及「出错把结果送回去」。它故意没有沙箱、多 Agent、MCP 和 skill。论文猜想、但没有证明：这段脚手架配上前沿模型，会接近 Mini-SWE-Agent 的自报成绩，再往上主要是模型问题。观察 13 的措辞是「直接实现 10 条，并与其余 8 条兼容」，不是「十八条都实现了」。",
      },
      {
        type: "note",
        tone: "limit",
        title: "不要把它当生产模板",
        text: "bash 用 shell=True，没有沙箱，压缩用字符数估计 token，工具参数假定模型给的是可调用的字典。这些在论文里是教学省略，拿到能改真实仓库的环境里就是事故。",
      },
    ],
  },
  {
    id: "audit",
    index: "13",
    title: "摘要对照",
    kicker: "你带来的那份笔记",
    minutes: 4,
    section: "对照",
    lead: "那份根据小红书和全网内容整理的笔记，主干是对的。下面只标出会把设计决定带偏的几处。",
    blocks: [
      { type: "widget", id: "audit" },
      {
        type: "h",
        text: "笔记里已经站得住的部分",
      },
      {
        type: "p",
        text: "七个子系统的划分、不排名只读源码、skill 比 MCP 多一套、Codex 模仿 Claude Code 的钩子并迁移会话、平台化和 meta-harness、Claude Code 源码来自非官方快照、样本不能代表所有 IDE。这些和正文一致。实践上那句「卡住时除了看模型和提示，还要看上下文有没有丢、工具结果有没有回来、报错后能不能继续」，也对应论文里压缩、观察回写和溢出恢复，不是外加的发挥。",
      },
    ],
  },
  {
    id: "limits",
    index: "14",
    title: "证据边界",
    kicker: "§15.6 · 结尾",
    minutes: 4,
    section: "§15–§17",
    lead: "论文自己划了不能推出的结论。导读不再把它们说回去。",
    blocks: [
      {
        type: "list",
        items: [
          "快照在 2026 年 7 月附近。工具数量和版本钉按星期过期。结构主张到这一版还在，不保证到你读的这一天还在。",
          "Claude Code 来自 2026 年 3 月流传的源码。七月发行二进制是 2.1.206，论文写明二进制可能已经不同。",
          "没有把十一套放到同一组任务上跑。自报的 SWE-Bench 不能横比。表 4 里那些分数被删掉了。",
          "框架缺席查的是清单和导入，做了两轮。没有追踪动态导入、插件，或编译后的发行包。作者说，若有公司在没被看到的路径里用了 LangChain，他们会惊讶，但不会震惊。",
          "和 Anthropic 文章的对齐是暗示，不是因果。他们没有访谈工程师。",
          "语料不是整个市场。正文点名了没进样本的 Copilot CLI、Cursor、Cline、Goose、Kiro、Antigravity、Qwen Code、Kimi CLI 等。",
          "九十行示例没有跑基准。Mini-SWE-Agent 的地板数字是自报的。",
        ],
      },
      {
        type: "h",
        text: "作者希望接下来有人做的",
      },
      {
        type: "p",
        text: "把安全、体验、成本和扩展放进评测，而不只测对不对。把模式写成可引用的参照架构。对策略即代码做形式验证。用同一组任务横比十一套。继续按季度重钉，把模式扩散的半衰期算出来，而不是只讲轶事。以及用访谈和提交历史，把「Anthropic 的文章影响了行业」和「大家撞上了同一件事实」分开。",
      },
      {
        type: "quote",
        text: "The competitive unit of the field is no longer the agent loop; it is the ecosystem surface around it.",
        cite: "观察 12，§14.5",
      },
      {
        type: "p",
        text: "九条收束里，和日常选择最有关的是这几句。架构重要，但不是因为循环越复杂基准越高；它决定的是能不能上生产。安全很贵，而且是选择。多 Agent 收敛成层级，子 Agent 仍留在进程内。扩展标准里 skill 领先。两个缺席是真的，并且有了历史解释：harness 取代了框架。平台转向不再是假说。",
      },
    ],
  },
];

export function chapterById(id: string) {
  return chapters.find((chapter) => chapter.id === id) ?? chapters[0];
}
