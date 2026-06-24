/**
 * 导购端 - 成交教练
 * 开工首页 + 三级引导面板
 */

// ====== 收工复盘数据（练习端 coach-v2 首页） ======
var REVIEW_DATA = {
  user: { name: '李娜', streakDays: 12 },
  todayStats: { itemsPracticed: 3, minutesSpent: 18 },
  dimensions: {
    today: [
      { name: '服务体验', score: 95 },
      { name: '跟进转化', score: 82 },
      { name: '竞品应对', score: 71 },
      { name: '产品知识', score: 75 },
      { name: '需求分析', score: 52, highlight: true }
    ],
    yesterday: [
      { name: '服务体验', score: 95 },
      { name: '跟进转化', score: 82 },
      { name: '竞品应对', score: 76 },
      { name: '产品知识', score: 75 },
      { name: '需求分析', score: 46 }
    ]
  },
  totalScore: 88,
  changes: { '需求分析': 6, '竞品应对': -5 },
  weakest: { name: '需求分析', score: 52 },
  slipped: { name: '竞品应对', score: 71 },
  sopCard: {
    pill: '今日卡点',
    bodyHtml: '今天你在<b>「邀约试驾」</b>这步还是卡了一下，明天模拟一个相似客户，练一遍就顺了。',
    buttonText: '去补强练一轮'
  },
  tomorrowTask: {
    pill: '明日重点',
    bodyHtml: '需求分析里的<b>「需求引导与卖点匹配」</b>还是偏弱，明天开工记得补一练，很快能拉回来。',
    buttonText: '明天开工提醒我'
  },
  sopStages: [
    { name: '迎接准备', today: 90, yesterday: 90, change: 0 },
    { name: '需求分析', today: 85, yesterday: 85, change: 0 },
    { name: '产品介绍', today: 76, yesterday: 76, change: 0 },
    { name: '试乘试驾', today: 58, yesterday: 58, change: 0, weakest: true },
    { name: '竞品应对', today: 70, yesterday: 75, change: -5 },
    { name: '离店送别', today: 80, yesterday: 80, change: 0 }
  ],
  sopRate: 78
};

// ====== 数据对象 ======
var SALES_COACH_DATA = {
  user: { name: '李娜', greeting: '早上好', streakDays: 12 },
  yesterdayCustomers: 8,
  ranking: { current: 6, change: -2, gapToNext: 4, nextRank: 5 },
  radar: {
    dimensions: [
      { name: '服务体验', score: 95, color: '#1677FF' },
      { name: '跟进转化', score: 82, color: '#1677FF' },
      { name: '竞品应对', score: 71, color: '#1677FF' },
      { name: '产品知识', score: 75, color: '#1677FF' },
      { name: '需求分析', score: 52, color: '#DC2626', highlight: true }
    ],
    totalScore: 88,
    weakest: { name: '需求分析', score: 52 }
  },
  sop: {
    totalRate: 78,
    stages: [
      { name: '迎接准备', score: 90 },
      { name: '需求分析', score: 85 },
      { name: '产品介绍', score: 76 },
      { name: '试乘试驾', score: 58, weakest: true },
      { name: '竞品应对', score: 70 },
      { name: '离店送别', score: 80 }
    ]
  },
  // 文案规范（修改数据时请遵守，防止语义回潮）：
  //   标题句式统一为「你/总部 + 发生了什么」，≤14 个字
  //   scoreLabel = 五维或子能力维度词，≤4 个字
  //   每条任务有且只有一句话，不允许第二行说明文字
  //   score 与 scoreLabel 必须同源同口径（该维度/子能力的真实评分），
  //   任务详情页展示的分数要与首页一致，不允许两处各拉各的数据
  //   actionType 决定右侧动词：practice→去练，study→去学
  homepageTasks: [
    {
      id: 'scene-mining',
      score: 52, scoreLabel: '需求分析',
      title: '你昨天有个客户没有问出预算',
      actionType: 'practice',
      targetRoute: '#sales-coach-task-detail-scene-mining',
      isPrimary: true, gain: 16
    },
    {
      id: 'testdrive-invite',
      score: 68, scoreLabel: '试驾邀约',
      title: '你昨天有个客户没有邀约试驾',
      actionType: 'practice',
      targetRoute: '#sales-coach-task-detail-scene-mining',
      isPrimary: false, gain: 11
    },
    {
      id: 'product-knowledge',
      score: '总部', scoreLabel: '',
      title: 'MG4 新品上市培训',
      actionType: 'study',
      targetRoute: '#study-mg4-new-launch-intro',
      isPrimary: false, gain: 0
    }
  ],
  tasks: [
    {
      id: 'headquarters-training', priority: 'high',
      labelPill: '总部', pillStyle: 'solid', subLabel: '今日上线', subLabelRed: true,
      body: 'MG4 新品上市专项培训',
      actionTags: ['看·资料包', '听·金牌话术', '考·测评', '练·场景对练'],
      buttonText: '马上学习', buttonStyle: 'solid', panelId: 'p1',
      deadline: '还有3天截止培训'
    },
    {
      id: 'ability-improve', priority: 'medium',
      labelPill: '能力提升', pillStyle: 'outline', subLabel: '昨日需求分析52', subLabelRed: true,
      body: '昨天挖掘客户需求不太顺利，先听听销冠怎么做',
      actionTags: ['看·薄弱分析', '听·同行示范', '练·场景对练'],
      buttonText: '去提升', buttonStyle: 'outline', panelId: 'p2'
    },
    {
      id: 'sop-reinforce', priority: 'medium',
      labelPill: 'SOP 补强', pillStyle: 'outline', subLabel: '服务流程 · 邀约试驾',
      body: '昨天邀约试驾总卡壳，给你安排同款客户练一练，练完顺手很多。',
      actionTags: ['练·相似客户场景', '反馈·练习评分'],
      buttonText: '去练习', buttonStyle: 'outline', panelId: 'p3'
    }
  ]
};

// ====== 任务详情页数据 ======
var TASK_DETAIL_DATA = {
  'scene-mining': {
    fragments: [
      {
        headerLine1: '昨天上午 10 点 15 分，那个看 MG5 的客户',
        headerLine2: '你没有问出预算',
        dialogue: [
          { role: '客户', text: '我就随便看看，你们这车多少钱' },
          { role: '你', text: '这款 12.99 万起，现在有优惠……', hasAudio: true }
        ],
        critique: '客户问价格，你直接报了价。价格一报出去，话题就结束了——客户接下来只会跟你谈优惠。应该反问场景，把话头拉回来。',
        refLabel: '你可以怎么回',
        refSource: '需求挖掘话术手册',
        refBody: '「您平时主要在市区开还是跑长途？」',
        refFootnote: '问出场景，才有机会挖预算'
      }
    ],
    practiceHash: '#sales-coach-p3-s1',
    sopTopic: 'demand-analysis'
  },
  'testdrive-invite': {
    eyebrow: '练一练 · 试驾邀约',
    title: '昨天 2 位客户说「再看看」，都没再约试驾',
    subtitle: '先回看 2 个当时的片段，再去练',
    fragments: [
      {
        header: '昨天上午 11 点 20 分 · 看 MG5 的客户',
        dialogue: [
          { role: '客户', text: '「车看着还行，我再看看别的品牌，比较一下」' },
          { role: '你', text: '「好的，您慢慢看，有需要随时找我」' }
        ],
        refLabel: '可以这么接',
        refSource: '邀约试驾话术手册',
        refBody: '客户说要比较，别直接放走，接一句<span class="sc-td-highlight">「您主要对比哪几款？我帮您做个参数对比表，顺便约个试驾感受下」</span>，用服务留住客户'
      },
      {
        header: '昨天下午 5 点 10 分 · 看 MG4 的客户',
        dialogue: [
          { role: '客户', text: '「今天先这样吧，回去跟老婆商量商量」' },
          { role: '你', text: '「行，那您回去商量一下，有消息我联系您」' }
        ],
        refLabel: '可以这么接',
        refSource: '邀约试驾话术手册',
        refBody: '客户说商量，顺势约试驾，接一句<span class="sc-td-highlight">「商量肯定要的！不如明天带嫂子一起来试驾，她坐后排感受一下，她点头了这事就定了」</span>'
      }
    ],
    ctaText: '看会了不算会，接得住才算',
    ctaButton: '去练一遍',
    practiceHash: '#sales-coach-p3-s1',
    sopTopic: 'testdrive-invite'
  }
};

// ====== 面板定义 ======
var PANELS = {
  p1: { id: 'p1', title: 'MG4 新品专项培训', totalSteps: 4, steps: ['看', '听', '考', '练'],
    s1: { title: '',
      sections: [
        { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://placehold.co/343x200/1a1a2e/64748b?text=MG4', label: '' },
        { type: 'heading', text: 'MG4 核心卖点' },
        { type: 'text', text: 'MG4 是上汽 MG 品牌首款全球纯电车型，基于上汽星云纯电专属平台打造。' },
        { type: 'bullet', items: ['续航里程 520km（CLTC），日常通勤一周一充', '百公里加速 3.8 秒（四驱版），同级最快', '电池安全：宁德时代磷酸铁锂，通过针刺实验', '智能座舱：12.3 寸中控屏，支持 OTA 升级', '价格区间：11.98–18.98 万，纯电性价比标杆'] },
        { type: 'heading', text: '销售话术要点' },
        { type: 'text', text: '客户提竞品时强调三电终身质保和 3.8 秒加速优势；担心续航时用"一周一充"打消顾虑。' },
        { type: 'heading', text: '竞争对比' },
        { type: 'bullet', items: ['vs 比亚迪海豚：MG4 更大、更快、续航更长', 'vs AION Y：MG4 操控更好、充电更快', 'vs ID.3：MG4 性价比更高、配置更丰富'] }
      ]
    },
    s2: { title: '',
      tracks: [
        { audioLabel: 'MG4 接待开场白 · 金牌话术', audioDuration: '02:35',
          transcript: [
            { speaker: '销冠', text: '哥，您看的是咱们这款 MG4，这是咱们店卖得最好的。' },
            { speaker: '销冠', text: '续航 520 公里，您平时上下班加周末出去玩，一周充一次就够了。' },
            { speaker: '客户', text: '那还行，但电车充电麻烦啊。' },
            { speaker: '销冠', text: '不麻烦！快充 30 分钟从 30% 充到 80%，喝杯咖啡的功夫就满了。' },
            { speaker: '销冠', text: '3.8 秒破百，红绿灯起步第一个冲出去，操控比宝马 3 系还爽。' },
            { speaker: '销冠', text: '三电终身质保，电池电机电控都是终身的，您完全不用担心。要不要试驾感受一下？' }
          ]
        },
        { audioLabel: 'MG4 产品介绍话术 · 金牌话术', audioDuration: '01:48',
          transcript: [
            { speaker: '销冠', text: '这款 MG4 是我们上汽全球车型，欧洲销量前十，品质绝对过硬。' },
            { speaker: '销冠', text: '外观您看这个溜背造型，风阻系数只有 0.27，又好看又省电。' },
            { speaker: '销冠', text: '空间绝对是同级最大的，轴距 2705mm，后排坐三个大人也不挤。' },
            { speaker: '销冠', text: '智能方面，L2 级辅助驾驶，自动泊车、车道保持全都有。' }
          ]
        },
        { audioLabel: 'MG4 竞品应对话术 · 金牌话术', audioDuration: '02:10',
          transcript: [
            { speaker: '客户', text: '比亚迪海豚比你们便宜不少吧？' },
            { speaker: '销冠', text: '哥，便宜是便宜，但您要对比配置啊。MG4 比海豚大一圈，加速快两秒，三电终身质保，这些海豚都没有。' },
            { speaker: '客户', text: '那 ID.3 呢？大众品牌更靠谱吧？' },
            { speaker: '销冠', text: 'ID.3 确实也不错，但您看同样价位，MG4 续航多 70 公里，加速快 0.5 秒。而且咱们质保终身，大众只保 8 年。' }
          ]
        },
        { audioLabel: 'MG4 政策业务话术 · 金牌话术', audioDuration: '01:35',
          transcript: [
            { speaker: '销冠', text: '现在买 MG4 最划算，厂家有三大政策：第一，置换补贴最高 8000 元。' },
            { speaker: '销冠', text: '第二，金融方案首付低至 15%，两年零利息。月供才 3000 出头，您完全没压力。' },
            { speaker: '销冠', text: '第三，购车送家用充电桩包安装，价值 5000 块。这三样加起来等于优惠了快两万。' }
          ]
        },
        { audioLabel: 'MG4 异议 & 逼单话术 · 金牌话术', audioDuration: '02:00',
          transcript: [
            { speaker: '客户', text: '我再考虑考虑，不着急。' },
            { speaker: '销冠', text: '哥，我理解。但这批车是厂家直供价，下个月政策可能就变了。今天下定我帮您锁定这个优惠。' },
            { speaker: '销冠', text: '而且现在定的话，这个颜色还有现车，下周就能提。再等可能就要排产了，至少多等一个月。' },
            { speaker: '客户', text: '那我回去跟家里人商量一下。' },
            { speaker: '销冠', text: '商量应该的！要不这样，您先交个 1000 意向金，我帮您把车和优惠都锁住。如果家里人不同意，意向金全额退您。' }
          ]
        }
      ]
    },
    s3: { title: '',
      questions: [
        { q: '客户担心 MG4 续航不够时，最该先做什么？', options: ['A. 直接说"续航很长，完全够用"', 'B. 先问他日常通勤和出行习惯，再结合 520km 续航说明', 'C. 推荐他去看油车'], correct: 1, explain: '正确！先了解客户使用场景，再用数据说服。' },
        { q: '关于 MG4 的快充速度，以下哪个说法最准确？', options: ['A. 10 分钟充满', 'B. 30 分钟从 30% 充到 80%', 'C. 跟慢充一样快'], correct: 1, explain: '正确！用"喝杯咖啡"的比喻最容易让客户理解。' }
      ]
    },
    s4: { title: '练 · 真实场景对练', scene: '场景：客户首次到店咨询 MG4',
      rounds: [
        { from: 'customer', text: '这个 MG4 续航到底够不够用啊？我家没充电桩，有点担心。' },
        { from: 'customer', text: '那快充要充多久？我有时候要跑长途的。' },
        { from: 'customer', text: '3.8 秒加速是真这么快？跟油车比呢？' }
      ],
      goodReplies: ['520 公里续航，日常通勤一周一充完全够。没充电桩也不怕，快充站越来越多。', '快充 30 分钟 30% 到 80%，长途休息一下就好。', '3.8 秒是真的，同价位油车没有比它快的。']
    }
  },
  p2: { id: 'p2', title: '需求挖掘能力提升', totalSteps: 3, steps: ['看', '听', '练'],
    s1: { title: '看 · 你的薄弱点在哪', conclusion: '昨天你在「需求挖掘」上得分偏低，比团队均值低 12 分。',
      metrics: [
        { label: '平均每客提问次数', value: '2 次', status: 'low', tip: '销冠平均 5 次' },
        { label: '关键需求点覆盖', value: '40%', status: 'low', tip: '预算、用途、决策人、竞品对比——只覆盖了 2 项' },
        { label: '客户主动说出需求', value: '70%', status: 'warn', tip: '大部分信息是客户主动说的，不是你问出来的' },
        { label: '试驾邀约成功率', value: '15%', status: 'low', tip: '跟没问透需求直接相关' }
      ]
    },
    s2: { title: '听 · 销冠是怎么挖需求的', audioLabel: '陈静 · 需求挖掘示范', audioDuration: '01:52',
      transcript: [
        { speaker: '销冠陈静', text: '哥，咱平时车主要做什么用？上下班代步还是跑长途？' },
        { speaker: '客户', text: '主要是代步，偶尔周末带家人出去玩。' },
        { speaker: '销冠陈静', text: '明白。那您家里几口人？后排常坐人吗？' },
        { speaker: '客户', text: '四口，两个小孩，所以空间得够。' },
        { speaker: '销冠陈静', text: '那您对空间肯定在意。预算大概什么范围？我帮您推荐最合适的配置。' },
        { speaker: '销冠陈静', text: '另外您之前看过其他车吗？比较在意什么？' },
        { speaker: '备注', text: '陈静 4 句话问了用途、家庭、预算、竞品对比 4 个维度，全部是主动提问。' }
      ]
    },
    s3: { title: '练 · 模拟客户，练挖需求', scene: '场景：一位只说"随便看看"的客户进店',
      rounds: [
        { from: 'customer', text: '我随便看看，这车多少钱？' },
        { from: 'customer', text: '预算倒没细想，十万出头吧。你觉得哪款适合家用？' },
        { from: 'customer', text: '家里有小孩，平时还常堵车，油耗太高受不了。' }
      ],
      goodReplies: ['哥您好，先不急着聊价格。您平时主要开什么路况？代步还是兼家用？', '十万出头有轿车和 SUV 两个方向，您家里几口人？常带老人小孩吗？', '有小孩+堵车场景，油耗和空间确实是大头。您更在意哪个？']
    }
  },
  p3: { id: 'p3', title: '邀约试驾 SOP 练习', totalSteps: 1, steps: ['练'],
    s3: { title: '练 · 邀约试驾场景', scene: '场景：客户看完车还在犹豫，需要你主动邀约试驾',
      rounds: [
        { from: 'customer', text: '车看着还行，但我再想想吧，回去跟老婆商量下。' },
        { from: 'customer', text: '今天就要试驾啊？我时间不太够……' },
        { from: 'customer', text: '行吧，那试试看，大概要多久？' }
      ],
      goodReplies: ['商量肯定要的！不如今天先试驾感受一下，您和嫂子都来，开一圈就知道了。', '就 15 分钟，绕一圈感受下动力和空间。让嫂子也坐坐后排，她同意了这事就定了！', '15 分钟！您把驾照给我，我去登记，您喝杯咖啡，马上就好。']
    }
  }
};

// ====== MG4 专项练习 · 通用通话式对练 ======
function renderMg4CallPage() {
  var s4 = PANELS.p1.s4;
  var trainerIntro = [
    '李娜，今天咱们练<b>MG4 真实场景对练</b>。客户首次到店咨询 MG4，你要把学到的卖点用出来。',
    '<b>场景回顾</b><br>客户进店看 MG4，对续航、充电、加速都有顾虑。他可能会拿竞品来比，你要用数据和体验打消他的疑虑。',
    '<b>记住三个核心卖点：</b><br>1. 续航 520km CLTC，日常通勤一周一充<br>2. 快充 30 分钟从 30% 充到 80%<br>3. 百公里加速 3.8 秒，同级最快',
    '<b>话术要点：</b><br>· 客户提竞品 → 强调三电终身质保 + 3.8 秒加速优势<br>· 客户担心续航 → 用"一周一充"打消顾虑<br>· 客户犹豫充电 →"快充站越来越多，喝杯咖啡就满了"',
    '<b>竞品对比速查：</b><br>vs 海豚：MG4 更大、更快、续航更长<br>vs AION Y：MG4 操控更好、充电更快<br>vs ID.3：MG4 性价比更高、配置更丰富',
    '准备好了吗？<br><br>来，跟 AI 客户练一把，把上面的卖点和话术全用出来。我在旁边听着，练完帮你复盘。'
  ];
  return CallPractice.init({
    id: 'mg4-call',
    label: 'MG4 场景对练',
    endHash: isCoachV2() ? '#coach-v2-home' : '#sales-coach',
    doneHash: isCoachV2() ? '#coach-v2-p1-done' : '#sales-coach-p1-done',
    doneText: '完成练习',
    mode: 'free-form',
    trainerIntro: trainerIntro.map(function(t, i) {
      return { speaker: i === 0 ? '成交教练' : '', text: t };
    }),
    rounds: (s4.rounds || []).map(function(r) {
      return { customer: r.text, keywords: [] };
    }),
    goodReplies: s4.goodReplies || []
  }).render();
}

// ====== 环境检测 ======
function isCoachV2() { return Router.currentEnv === 'coach-v2'; }

// ====== 全局状态 ======
var SC_STATE = {
  chatMessages: [], chatRound: 0, chatDone: false,
  audioPlaying: false, audioProgress: 0, quizAnswers: []
};

// ====== 五维成长地图数据 ======
var GROWTH_MAP = {
  user: { name: '李娜' },
  passLine: 80,
  lines: [
    {
      id: 'product',
      name: '产品专业',
      checkpoints: [
        { id: 'brand', name: '品牌认知', score: 88, desc: '熟悉品牌历史、定位与核心优势，能向客户清晰传达品牌价值' },
        { id: 'selling-points', name: '核心卖点', score: 82, desc: '掌握各车型核心卖点，能根据不同客户需求精准匹配卖点讲解' },
        { id: 'demo', name: '功能演示', score: 65, desc: '熟练演示车辆核心功能，涵盖智能座舱、驾驶辅助等场景化操作' },
        { id: 'testdrive', name: '试驾赋能', score: 70, desc: '设计有记忆点的试驾路线，在试驾中强化产品优势体验' }
      ]
    },
    {
      id: 'discovery',
      name: '需求分析',
      highlight: true,
      checkpoints: [
        { id: 'profile', name: '客户画像', score: 85, desc: '快速判断客户类型与决策风格，建立客户画像指导后续沟通策略' },
        { id: 'need-guide', name: '需求引导', score: 52, desc: '通过有效提问挖掘客户真实需求，将需求与产品卖点精准匹配' },
        { id: 'signal', name: '成交信号', score: 68, desc: '识别客户的购买信号（语言/行为），把握最佳成交时机' },
        { id: 'info', name: '客户信息', score: 71, desc: '系统化收集与管理客户信息，为后续跟进与转化提供数据支撑' }
      ]
    },
    {
      id: 'competitor',
      name: '竞品应对',
      checkpoints: [
        { id: 'comp-knowledge', name: '竞品知识', score: 80, desc: '了解主要竞品车型的核心参数、优劣势与市场定位' },
        { id: 'attack-defense', name: '攻防话术', score: 62, desc: '掌握竞品对比的标准话术，不贬低竞品的同时突出自身优势' },
        { id: 'scene-compare', name: '场景对比', score: 66, desc: '针对客户具体用车场景，进行竞品 vs 本品的一对一差异化对比' },
        { id: 'objection', name: '异议处理', score: 70, desc: '化解客户提出的竞品优势异议，转化为本品购买理由' }
      ]
    },
    {
      id: 'followup',
      name: '客户跟进',
      checkpoints: [
        { id: 'follow-manage', name: '跟进管理', score: 83, desc: '建立科学的客户分级与跟进节奏，提高线索转化率' },
        { id: 'engagement', name: '粘性运营', score: 64, desc: '通过朋友圈、社群等方式保持客户粘性，培育潜在购车需求' },
        { id: 'archive', name: '档案管理', score: 69, desc: '规范化记录客户互动历史，为后续服务与复购提供依据' }
      ]
    },
    {
      id: 'service',
      name: '服务满意',
      checkpoints: [
        { id: 'script', name: '话术规范', score: 90, desc: '使用品牌标准话术，保持专业统一的客户沟通体验' },
        { id: 'process', name: '流程执行', score: 72, desc: '严格按照销售服务流程执行，不跳步、不漏项' },
        { id: 'experience', name: '体验管理', score: 75, desc: '主动管理客户全流程体验，提前預判并解决客户痛点' }
      ]
    }
  ]
};

// 计算：找到当前关（所有未达标里分数最低的）
function findCurrentCheckpoint() {
  var lowest = null;
  var lines = GROWTH_MAP.lines;
  for (var i = 0; i < lines.length; i++) {
    var cps = lines[i].checkpoints;
    for (var j = 0; j < cps.length; j++) {
      if (cps[j].score < GROWTH_MAP.passLine) {
        if (!lowest || cps[j].score < lowest.score) lowest = cps[j];
      }
    }
  }
  return lowest;
}

// 已达标和总数
function getGrowthMapStats() {
  var total = 0, passed = 0;
  var lines = GROWTH_MAP.lines;
  for (var i = 0; i < lines.length; i++) {
    var cps = lines[i].checkpoints;
    total += cps.length;
    for (var j = 0; j < cps.length; j++) {
      if (cps[j].score >= GROWTH_MAP.passLine) passed++;
    }
  }
  return { total: total, passed: passed };
}

// 查找关卡
function findCheckpoint(id) {
  var lines = GROWTH_MAP.lines;
  for (var i = 0; i < lines.length; i++) {
    var cps = lines[i].checkpoints;
    for (var j = 0; j < cps.length; j++) {
      if (cps[j].id === id) return { checkpoint: cps[j], line: lines[i] };
    }
  }
  return null;
}

// ====== 五维成长地图页 ======
function renderGrowthMapPage() {
  var current = findCurrentCheckpoint();
  var currentId = current ? current.id : null;
  var stats = getGrowthMapStats();
  var lines = GROWTH_MAP.lines;
  var linesHtml = '';
  for (var i = 0; i < lines.length; i++) {
    linesHtml += renderGrowthMapLine(lines[i], i, currentId);
  }
  return '<div class="sc-phone-wrapper"><div class="sc-page sc-gm-page">' +
    // 顶部
    '<div class="sc-gm-header">' +
      '<div class="sc-gm-user-avatar">李娜</div>' +
      '<div class="sc-gm-header-title">五力能力地图 · 从你出发</div>' +
      '<div class="sc-gm-header-stat">已点亮 ' + stats.passed + ' / ' + stats.total + ' 关</div>' +
    '</div>' +
    // 图例
    '<div class="sc-gm-legend">' +
      '<span class="sc-gm-legend-item"><span class="sc-gm-legend-dot passed"></span>已达标</span>' +
      '<span class="sc-gm-legend-item"><span class="sc-gm-legend-dot current"></span>今日推送</span>' +
      '<span class="sc-gm-legend-item"><span class="sc-gm-legend-dot pending"></span>待练</span>' +
    '</div>' +
    // 五条能力线
    '<div class="sc-gm-lines">' + linesHtml + '</div>' +
    // 底部安全区
    '<div class="sc-gm-bottom"></div>' +
  '</div></div>';
}

function renderGrowthMapLine(line, lineIndex, currentId) {
  var cps = line.checkpoints;
  var passedCount = 0;
  for (var i = 0; i < cps.length; i++) {
    if (cps[i].score >= GROWTH_MAP.passLine) passedCount++;
  }
  var highlightLabel = line.highlight ? '<span class="sc-gm-line-push-tag">今日推送</span>' : '';

  // 渲染关卡方块
  var nodesHtml = '';
  for (var j = 0; j < cps.length; j++) {
    var cp = cps[j];
    var isPassed = cp.score >= GROWTH_MAP.passLine;
    var isCurrent = cp.id === currentId;
    var status = isPassed ? 'passed' : (isCurrent ? 'current' : 'pending');
    var label = isPassed ? '✓' : (isCurrent ? '练' : '○');
    nodesHtml += '<div class="sc-gm-node ' + status + '" onclick="event.stopPropagation();showGrowthMapSheet(\'' + cp.id + '\')">' +
      '<div class="sc-gm-node-dot">' + label + '</div>' +
      '<div class="sc-gm-node-name">' + cp.name + '</div>' +
    '</div>';
    // 连接线（最后一个不加）
    if (j < cps.length - 1) {
      nodesHtml += '<div class="sc-gm-node-connector"></div>';
    }
  }

  return '<div class="sc-gm-line-card">' +
    '<div class="sc-gm-line-head">' +
      '<div class="sc-gm-line-name-wrap">' +
        '<span class="sc-gm-line-name">' + line.name + '</span>' +
        highlightLabel +
      '</div>' +
      '<span class="sc-gm-line-progress">' + passedCount + ' / ' + cps.length + '</span>' +
    '</div>' +
    '<div class="sc-gm-line-track">' + nodesHtml + '</div>' +
  '</div>';
}

// ====== 关卡详情半屏弹层 ======
function renderGrowthMapSheet(checkpointId) {
  var found = findCheckpoint(checkpointId);
  if (!found) return '';
  var cp = found.checkpoint;
  var line = found.line;
  var isPassed = cp.score >= GROWTH_MAP.passLine;
  var gap = GROWTH_MAP.passLine - cp.score;
  var pct = Math.round((cp.score / GROWTH_MAP.passLine) * 100);

  return '<div class="sc-gmsheet-overlay" id="growthMapSheetOverlay" onclick="if(event.target===this)hideGrowthMapSheet()">' +
    '<div class="sc-gmsheet-card">' +
      '<div class="sc-gmsheet-handle"></div>' +
      // 标题
      '<div class="sc-gmsheet-title">' + cp.name + '</div>' +
      '<div class="sc-gmsheet-line">所属：' + line.name + '</div>' +
      // 分数进度
      '<div class="sc-gmsheet-score-row">' +
        '<span class="sc-gmsheet-score-label">当前水平</span>' +
        '<span class="sc-gmsheet-score-num">' + cp.score + ' 分</span>' +
        '<span class="sc-gmsheet-score-divider">/</span>' +
        '<span class="sc-gmsheet-score-target">达标线 ' + GROWTH_MAP.passLine + ' 分</span>' +
      '</div>' +
      '<div class="sc-gmsheet-bar-wrap">' +
        '<div class="sc-gmsheet-bar-fill ' + (isPassed ? 'passed' : '') + '" style="width:' + Math.min(pct, 100) + '%"></div>' +
      '</div>' +
      '<div class="sc-gmsheet-status ' + (isPassed ? 'passed' : '') + '">' +
        (isPassed ? '已达标' : '还差 ' + gap + ' 分达标') +
      '</div>' +
      // 这一关要做什么
      '<div class="sc-gmsheet-desc">' + cp.desc + '</div>' +
      '<div class="sc-gmsheet-actions-label">这一关要做什么</div>' +
      '<div class="sc-gmsheet-step-list">' +
        '<div class="sc-gmsheet-step-item">' +
          '<span class="sc-gmsheet-step-icon">👀</span>' +
          '<span class="sc-gmsheet-step-text">看 · 同行高分示范</span>' +
        '</div>' +
        '<div class="sc-gmsheet-step-item">' +
          '<span class="sc-gmsheet-step-icon">🎤</span>' +
          '<span class="sc-gmsheet-step-text">练 · AI 对练</span>' +
        '</div>' +
      '</div>' +
      // 按钮
      '<button class="sc-gmsheet-btn ' + (isPassed ? 'outline' : 'solid') + '" onclick="hideGrowthMapSheet();window.location.hash=\'#sales-coach-growth-task-' + checkpointId + '\'">' +
        (isPassed ? '复习一遍' : '去练这一关') +
      '</button>' +
      '<button class="sc-gmsheet-close" onclick="hideGrowthMapSheet()">关闭</button>' +
    '</div>' +
  '</div>';
}

window.showGrowthMapSheet = function(checkpointId) {
  var existing = document.getElementById('growthMapSheetOverlay');
  if (existing) existing.remove();
  var div = document.createElement('div');
  div.innerHTML = renderGrowthMapSheet(checkpointId);
  document.body.appendChild(div.firstElementChild);
};

window.hideGrowthMapSheet = function() {
  var overlay = document.getElementById('growthMapSheetOverlay');
  if (overlay) overlay.remove();
};

// ====== 关卡任务页（简易占位） ======
function renderGrowthTaskPage(checkpointId) {
  var found = findCheckpoint(checkpointId);
  if (!found) return '<div class="sc-phone-wrapper"><div class="sc-page"><div class="sc-gm-task-notfound">关卡未找到</div></div></div>';
  var cp = found.checkpoint;
  var line = found.line;
  var isPassed = cp.score >= GROWTH_MAP.passLine;
  return '<div class="sc-phone-wrapper"><div class="sc-page sc-gm-task-page">' +
    '<div class="sc-gm-task-header">' +
      '<div class="sc-gm-task-breadcrumb">' + line.name + ' · ' + cp.name + '</div>' +
      '<h2 class="sc-gm-task-title">' + cp.name + '</h2>' +
      '<div class="sc-gm-task-score">当前 ' + cp.score + ' 分 · 达标线 ' + GROWTH_MAP.passLine + ' 分</div>' +
    '</div>' +
    '<div class="sc-gm-task-steps">' +
      '<div class="sc-gm-task-step" onclick="window.location.hash=\'#sales-coach-ability-s2\'">' +
        '<div class="sc-gm-task-step-num">1</div>' +
        '<div class="sc-gm-task-step-body">' +
          '<div class="sc-gm-task-step-title">看同行高分示范</div>' +
          '<div class="sc-gm-task-step-desc">看销冠怎么处理这个场景</div>' +
        '</div>' +
        '<span class="sc-gm-task-step-go">→</span>' +
      '</div>' +
      '<div class="sc-gm-task-step" onclick="window.location.hash=\'#sales-coach-ability-s3\'">' +
        '<div class="sc-gm-task-step-num">2</div>' +
        '<div class="sc-gm-task-step-body">' +
          '<div class="sc-gm-task-step-title">AI 对练</div>' +
          '<div class="sc-gm-task-step-desc">和 AI 客户实战练习</div>' +
        '</div>' +
        '<span class="sc-gm-task-step-go">→</span>' +
      '</div>' +
      '<div class="sc-gm-task-step" onclick="window.location.hash=\'#sales-coach-ability-s4\'">' +
        '<div class="sc-gm-task-step-num">3</div>' +
        '<div class="sc-gm-task-step-body">' +
          '<div class="sc-gm-task-step-title">查看反馈</div>' +
          '<div class="sc-gm-task-step-desc">即时评分和改进建议</div>' +
        '</div>' +
        '<span class="sc-gm-task-step-go">→</span>' +
      '</div>' +
    '</div>' +
    '<button class="sc-gmsheet-btn solid" style="margin:16px 20px" onclick="window.location.hash=\'#sales-coach-ability-s1\'">' +
      (isPassed ? '复习一遍' : '去练这一关') +
    '</button>' +
    '<button class="sc-gmsheet-close" style="display:block;margin:0 auto 24px" onclick="history.back()">返回成长地图</button>' +
  '</div></div>';
}

// ====== 主渲染入口 ======

// ====== 音频气泡交互 ======
function scToggleAudio(el) {
  var playIcon = el.querySelector('.sc-td-audio-play-icon');
  var pauseIcon = el.querySelector('.sc-td-audio-pause-icon');
  var bars = el.querySelectorAll('.sc-td-audio-bar');
  var isPlaying = el.classList.contains('sc-td-audio-playing');
  if (isPlaying) {
    el.classList.remove('sc-td-audio-playing');
    playIcon.style.display = '';
    pauseIcon.style.display = 'none';
    bars.forEach(function(b) { b.style.animationPlayState = 'paused'; });
  } else {
    var allBubbles = document.querySelectorAll('.sc-td-audio-playing');
    for (var k = 0; k < allBubbles.length; k++) {
      scToggleAudio(allBubbles[k]);
    }
    el.classList.add('sc-td-audio-playing');
    playIcon.style.display = 'none';
    pauseIcon.style.display = '';
    bars.forEach(function(b, i) {
      b.style.animationPlayState = 'running';
      b.style.animationDelay = (i * 0.15) + 's';
    });
    clearTimeout(el._audioTimeout);
    el._audioTimeout = setTimeout(function() {
      if (el.classList.contains('sc-td-audio-playing')) {
        scToggleAudio(el);
      }
    }, 3000);
  }
}

function renderSalesCoachPage() {
  var subPage = window.__currentSubPage__ || 'home';
  var styles = salesCoachStyles();
  if (subPage === 'home') return styles + salesCoachLayout();
  if (subPage === 'sop-map') return styles + renderSopGrowthMapPage();
  if (subPage.startsWith('sop-task-')) return styles + renderSopGrowthTaskPage(subPage.replace('sop-task-', ''));
  if (subPage.startsWith('sop-')) return renderSopTestDrivePage();
  if (subPage.startsWith('p3-')) {
		if (subPage === 'p3-s1-new') return renderCoachConversationPage();
		if (subPage === 'p3-done') return styles + renderPanel('p3', 'p3-done');
		return renderSopTestDrivePage();
	}
  if (subPage.startsWith('p1-')) {
    if (subPage === 'p1-s4' || subPage === 'p1-s4-practice') return renderMg4CallPage();
    return styles + renderPanel('p1', subPage);
  }
  if (subPage.startsWith('p2-')) {
    if (isCoachV2() && subPage === 'p2-s3') return renderAbilityCoachCallPage();
    return styles + renderPanel('p2', subPage);
  }
  if (subPage.startsWith('ability-')) return renderAbilityCoachPage();
  if (subPage === 'growth-map') return styles + renderGrowthMapPage();
  if (subPage.startsWith('growth-task-')) return styles + renderGrowthTaskPage(subPage.replace('growth-task-', ''));
  if (subPage.startsWith('task-detail-')) return styles + renderTaskDetailPage(subPage.replace('task-detail-', ''));
  // Delegate unknown subPages to coach-v2 renderer (taskDetail, courseware, quiz, video, etc.)
  return renderCoachV2Page();
}

// ====== 顶部导航栏 ======
function renderCoachNav() {
  return '<div class="sc-coach-nav">' +
    '<button class="sc-coach-nav-back" onclick="history.back()">&larr;</button>' +
    '<span class="sc-coach-nav-title">成交教练</span>' +
    '<span class="sc-coach-nav-spacer"></span>' +
  '</div>';
}

// ====== 首页 ======
function salesCoachLayout() {
  if (isCoachV2()) return reviewLayout();
  var d = SALES_COACH_DATA;
  return '<div class="sc-phone-wrapper"><div class="sc-page sc-page--v3">' +
    iosStatusBar() +
    renderCoachNav() +
    renderRadarCard(d) +
    renderTaskArea() +
    renderHqMaterialsEntry() +
  '</div></div>';
}

// ====== 五维能力雷达卡（无 TAB 切换） ======
function renderRadarCard(d) {
  return '<section class="sc-card sc-ability-card">' +
    renderForceRadarView(d.radar) +
  '</section>';
}

// ====== iOS 状态栏 ======
function iosStatusBar() {
  return '<div class="sc-ios-bar">' +
    '<span class="sc-ios-time">9:41</span>' +
    '<span class="sc-ios-icons">' +
      '<svg class="sc-ios-signal" width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="#1e293b"/><rect x="5" y="4" width="3" height="7" rx="0.5" fill="#1e293b"/><rect x="10" y="1" width="3" height="10" rx="0.5" fill="#1e293b"/><rect x="15" y="0" width="3" height="11" rx="0.5" fill="#1e293b"/></svg>' +
      '<svg class="sc-ios-wifi" width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.5C10.5 2.5 12.7 3.5 14.5 5" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M8 5.5C9.8 5.5 11.5 6.3 12.8 7.5" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="8" cy="9" r="2" fill="#1e293b"/></svg>' +
      '<svg class="sc-ios-battery" width="25" height="12" viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#1e293b" stroke-width="1" fill="none"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1e293b"/><rect x="23" y="3.5" width="2.5" height="5" rx="1.5" fill="#1e293b"/></svg>' +
    '</span>' +
  '</div>';
}

// ====== V3 问候区 ======
function renderGreetingV3() {
  return '<div class="sc-v3-greeting">' +
    '<h1 class="sc-v3-greeting-name">早上好，' + SALES_COACH_DATA.user.name + '</h1>' +
  '</div>';
}

// ====== 分数着色工具函数 ======
/**
 * 根据分数返回对应的颜色。
 * - score < 60：红色 #E24B4A
 * - 60 ≤ score ≤ 74：琥珀色 #EF9F27
 * - score ≥ 75：蓝色 #378ADD
 * 禁止在组件内硬编码 hex 或散落判断逻辑，所有分数颜色必须通过此函数获取。
 */
function getScoreColor(score) {
  if (score < 60) return '#E24B4A';
  if (score < 75) return '#EF9F27';
  return '#378ADD';
}

// ====== 分数锚点任务列表 ======
// 三条任务使用统一的「分数 + 维度词 + 一句话 + 动词」模板
// 分数颜色由 getScoreColor() 驱动，不由索引决定
// actionType 决定右侧动词：practice→去练，study→去学
function renderTaskArea() {
  var tasks = SALES_COACH_DATA.homepageTasks;
  var ACTION_VERB = { practice: '去练', study: '去学' };
  var activeCount = tasks.length;

  var html = '<section class="sc-v3-task-area">';

  // 问候头部
  html += '<div class="sc-v3-task-header">';
  html += '<h1 class="sc-v3-task-header-name">早上好，' + SALES_COACH_DATA.user.name + '</h1>';
  html += '<p class="sc-v3-task-header-sub">昨天接了 <strong>' + SALES_COACH_DATA.yesterdayCustomers + '</strong> 位客户，今天有 <strong>' + activeCount + '</strong> 个练习要做</p>';
  html += '</div>';

  // 任务行
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var verb = ACTION_VERB[t.actionType] || ACTION_VERB.practice;
    var scoreColor = getScoreColor(t.score);
    var isStudyTask = t.actionType === 'study';

    // 第二行文案
    var subTextHtml = '';
    if (t.subText) {
      subTextHtml = '<div class="sc-v3-task-sub">' + t.subText + '</div>';
    }

    // 先练这个标签
    var primaryTagHtml = '';
    if (t.isPrimary) {
      primaryTagHtml = '<div class="sc-v3-task-primary-tag">先练这个</div>';
    }

    html += '<div class="sc-v3-task-divider"></div>';
    html += '<div class="sc-v3-task-row" onclick="window.location.hash=\'' + t.targetRoute + '\'">' +
      '<div class="sc-v3-task-score">' +
        (typeof t.score === 'string'
          ? '<span class="sc-v3-task-score-pill">' + t.score + '</span>'
          : '<span class="sc-v3-task-score-num" style="color:' + scoreColor + '">' + t.score + '</span>') +
        '<span class="sc-v3-task-score-label">' + t.scoreLabel + '</span>' +
      '</div>' +
      '<div class="sc-v3-task-text">' +
        primaryTagHtml +
        '<span class="sc-v3-task-title">' + t.title + '</span>' +
        subTextHtml +
      '</div>' +
      '<span class="sc-v3-task-link">' + verb + ' ›</span>' +
    '</div>';
  }

  html += '</section>';
  return html;
}

// ====== 总部学习资料入口 ======
function renderHqMaterialsEntry() {
  return '<section class="sc-v3-hq-materials">' +
    '<a class="sc-v3-hq-materials-link" href="hq-materials.html">' +
    '<span class="sc-v3-hq-materials-text">总部学习资料</span>' +
    '<span class="sc-v3-hq-materials-arrow">→</span>' +
    '</a>' +
    '</section>';
}

// ====== 任务详情页渲染 ======
function renderTaskDetailPage(taskId) {
	var activeTaskId = sessionStorage.getItem('scn_active_task');
  if (activeTaskId) {
    var DATA_KEY_MAP = { 'need-analysis': 'scene-mining', 'testdrive-invite': 'testdrive-invite' };
    taskId = DATA_KEY_MAP[activeTaskId] || taskId;
    sessionStorage.removeItem('scn_active_task');
  }
  var data = TASK_DETAIL_DATA[taskId];
  if (!data) return '<div class="sc-phone-wrapper"><div class="sc-page"><div class="sc-td-notfound">任务未找到</div></div></div>';

  var fragmentsHtml = '';
  for (var i = 0; i < data.fragments.length; i++) {
    var f = data.fragments[i];
    // Build chat dialogue
    var chatHtml = '';
    for (var j = 0; j < f.dialogue.length; j++) {
      var line = f.dialogue[j];
      if (line.hasAudio) {
        // 'You' response: text bubble + audio bar below
        chatHtml += '<div class="sc-td-chat-row sc-td-chat-row--you">' +
          '<div class="sc-td-chat-label">' + line.role + '</div>' +
          '<div class="sc-td-chat-bubble sc-td-chat-bubble--you">' + line.text + '</div>' +
          '<div class="sc-td-audio-mini" onclick="scToggleAudio(this)" role="button" aria-label="播放语音">' +
            '<span class="sc-td-audio-play">' +
              '<svg class="sc-td-audio-play-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>' +
              '<svg class="sc-td-audio-pause-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>' +
            '</span>' +
            '<span class="sc-td-audio-wave">' +
              '<span class="sc-td-audio-bar"></span><span class="sc-td-audio-bar"></span><span class="sc-td-audio-bar"></span><span class="sc-td-audio-bar"></span>' +
            '</span>' +
            '<span class="sc-td-audio-dur">3″</span>' +
          '</div>' +
        '</div>';
      } else {
        // Customer bubble (left)
        chatHtml += '<div class="sc-td-chat-row sc-td-chat-row--customer">' +
          '<div class="sc-td-chat-label">' + line.role + '</div>' +
          '<div class="sc-td-chat-bubble">' + line.text + '</div>' +
        '</div>';
      }
    }
    fragmentsHtml += '<div class="sc-td-card">' +
      '<div class="sc-td-card-header">' +
        '<div class="sc-td-card-header-line1">' + f.headerLine1 + '</div>' +
        '<div class="sc-td-card-header-line2">' + f.headerLine2 + '</div>' +
      '</div>' +
      '<div class="sc-td-chat">' + chatHtml + '</div>' +
      '<div class="sc-td-critique"><span class="sc-td-critique-label">问题在哪</span>' + f.critique + '</div>' +
      '<div class="sc-td-divider"></div>' +
      '<div class="sc-td-ref-header-row">' +
        '<span class="sc-td-ref-label">' + f.refLabel + '</span>' +
        '<span class="sc-td-ref-source">' + f.refSource + '</span>' +
      '</div>' +
      '<div class="sc-td-ref-body">' + f.refBody + '</div>' +
      '<div class="sc-td-ref-footnote">' + f.refFootnote + '</div>' +
    '</div>';
  }

  return '<div class="sc-phone-wrapper"><div class="sc-page sc-td-page">' +
    // iOS 状态栏
    '<div class="sc-ios-bar">' +
      '<span class="sc-ios-time">9:41</span>' +
      '<span class="sc-ios-icons">' +
        '<svg class="sc-ios-signal" width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="#1e293b"/><rect x="5" y="4" width="3" height="7" rx="0.5" fill="#1e293b"/><rect x="10" y="1" width="3" height="10" rx="0.5" fill="#1e293b"/><rect x="15" y="0" width="3" height="11" rx="0.5" fill="#1e293b"/></svg>' +
        '<svg class="sc-ios-wifi" width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.5C10.5 2.5 12.7 3.5 14.5 5" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M8 5.5C9.8 5.5 11.5 6.3 12.8 7.5" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="8" cy="9" r="2" fill="#1e293b"/></svg>' +
        '<svg class="sc-ios-battery" width="25" height="12" viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#1e293b" stroke-width="1" fill="none"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1e293b"/><rect x="23" y="3.5" width="2.5" height="5" rx="1.5" fill="#1e293b"/></svg>' +
      '</span>' +
    '</div>' +
    // 导航条
    '<div class="sc-td-nav">' +
      '<button class="sc-td-back" onclick="window.location.hash=\'#sales-coach\'">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 4 7 12 16 20"/></svg>' +
      '</button>' +
      '<span class="sc-td-nav-title">任务详情</span>' +
    '</div>' +
    // 滚动内容区
    '<div class="sc-td-content">' +
      fragmentsHtml +
    '</div>' +
    // 底部固定引导区
    '<div class="sc-td-bottom">' +
      '<button class="sc-td-cta-btn" onclick="window.__sopTestdriveTopic__=\'' + data.sopTopic + '\';window.location.hash=\'' + data.practiceHash + '\'">跟这个客户再练习一次</button>' +
    '</div>' +
  '</div></div>';
}

// ====== 昨日能力可切换卡 ======
function yesterdayAbilityCard(d) {
  return '<section class="sc-card sc-ability-card" id="yesterdayAbilityCard">' +
    // Segmented control
    '<div class="sc-seg-ctrl">' +
      '<button class="sc-seg-btn active" data-view="force" onclick="switchAbilityView(\'force\')">五维能力</button>' +
      '<button class="sc-seg-btn" data-view="sop" onclick="switchAbilityView(\'sop\')">SOP 流程</button>' +
    '</div>' +
    // 五维视图（默认）
    '<div class="sc-ability-view" id="scForceView">' +
      renderForceRadarView(d.radar) +
    '</div>' +
    // SOP 视图（隐藏）
    '<div class="sc-ability-view" id="scSopView" style="display:none">' +
      renderSopFlowView(d.sop) +
    '</div>' +
  '</section>';
}

function renderForceRadarView(radar) {
  return abilityRadarSVG(radar.dimensions, radar.totalScore);
}

// 五维雷达图（单日，无今昨对比）
function abilityRadarSVG(dimensions, totalScore) {
  var cx = 170, cy = 145, r = 100;
  var pointsStr = '', labelsHtml = '', highlightDot = '';
  for (var i = 0; i < dimensions.length; i++) {
    var angleDeg = -90 + i * 72, angleRad = (angleDeg * Math.PI) / 180;
    var score = dimensions[i].score;
    var px = cx + (score / 100) * r * Math.cos(angleRad);
    var py = cy + (score / 100) * r * Math.sin(angleRad);
    pointsStr += (i > 0 ? ' ' : '') + Math.round(px) + ',' + Math.round(py);
    var lx = cx + (r + 32) * Math.cos(angleRad), ly = cy + (r + 32) * Math.sin(angleRad);
    var isHL = dimensions[i].highlight;
    labelsHtml += '<text x="' + Math.round(lx) + '" y="' + Math.round(ly) + '" text-anchor="middle" dominant-baseline="central" style="font-size:11px;fill:var(--sc-text-primary);' + (isHL ? 'font-weight:700' : '') + '">' +
      dimensions[i].name + ' <tspan fill="' + (isHL ? '#E24B4A' : 'var(--sc-primary)') + '">' + dimensions[i].score + '</tspan></text>';
    if (isHL) highlightDot = '<circle cx="' + Math.round(px) + '" cy="' + Math.round(py) + '" r="6" fill="#E24B4A" stroke="#fff" stroke-width="2"/>';
  }
  // Grid
  var gridLines = '';
  for (var g = 20; g <= 100; g += 20) {
    var gridPts = '';
    for (var gi = 0; gi < 5; gi++) {
      var gaDeg = -90 + gi * 72, gaRad = (gaDeg * Math.PI) / 180;
      gridPts += (gi > 0 ? ' ' : '') + Math.round(cx + (g / 100) * r * Math.cos(gaRad)) + ',' + Math.round(cy + (g / 100) * r * Math.sin(gaRad));
    }
    gridLines += '<polygon points="' + gridPts + '" fill="none" stroke="var(--sc-grid,#e8ecf0)" stroke-width="0.5"/>';
  }
  // Axes
  var axes = '';
  for (var ai = 0; ai < 5; ai++) {
    var aDeg = -90 + ai * 72, aRad = (aDeg * Math.PI) / 180;
    axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + Math.round(cx + r * Math.cos(aRad)) + '" y2="' + Math.round(cy + r * Math.sin(aRad)) + '" stroke="var(--sc-grid,#e8ecf0)" stroke-width="0.5"/>';
  }
  var scoreText = totalScore !== undefined ? '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="central" style="font-size:32px;font-weight:700;fill:var(--sc-text-primary,#1e293b)">' + totalScore + '</text>' : '';
  return '<div class="sc-radar-wrap"><svg viewBox="0 0 340 290" class="sc-radar-svg">' +
    '<text x="10" y="22" style="font-size:12px;fill:var(--sc-text-secondary,#94a3b8)">昨日五维能力分</text>' +
    gridLines + axes +
    '<polygon points="' + pointsStr + '" fill="rgba(22,119,255,0.13)" stroke="var(--sc-primary,#1677FF)" stroke-width="1.5" stroke-linejoin="round"/>' +
    highlightDot + scoreText + labelsHtml + '</svg></div>';
}

// SOP 流程横向进度条
function renderSopFlowView(sop) {
  var html = '<div class="sc-sop-header">' +
    '<span class="sc-sop-title">SOP 流程分析 · 昨日</span>' +
    '<span class="sc-sop-total">达成 <strong>' + sop.totalRate + '%</strong></span>' +
  '</div><div class="sc-sop-list">';
  for (var i = 0; i < sop.stages.length; i++) {
    var stage = sop.stages[i];
    var isWeakest = stage.weakest;
    var barW = Math.round(stage.score);
    html += '<div class="sc-sop-item' + (isWeakest ? ' weakest' : '') + '">' +
      '<span class="sc-sop-name' + (isWeakest ? ' weakest' : '') + '">' +
        (isWeakest ? '<span class="sc-sop-weakest-tag">最弱</span>' : '') +
        '&#' + (9312 + i) + '; ' + stage.name +
      '</span>' +
      '<div class="sc-sop-bar-wrap">' +
        '<div class="sc-sop-bar-fill' + (isWeakest ? ' weakest' : '') + '" style="width:' + barW + '%"></div>' +
      '</div>' +
      '<span class="sc-sop-score' + (isWeakest ? ' weakest' : '') + '">' + stage.score + '</span>' +
    '</div>';
  }
  html += '</div>';
  return html;
}

// ====== 昨日关键片段 ======
function renderCriticalMoment() {
  return '<section class="sc-section">' +
    '<h2 class="sc-section-title">昨日关键片段</h2>' +
    '<div class="sc-critical-card">' +
      '<div class="sc-critical-meta">14:30 · 王女士 · 需求挖掘环节</div>' +
      '<p class="sc-critical-text">客户一进店你就开始讲 MG4 配置，没先问用车场景，没接住她<span class="sc-highlight-blue">「主要给家里人开」</span>这条信息。</p>' +
    '</div>' +
  '</section>';
}

// ====== 基于问题，为你推荐 ======
function renderRecommendList() {
  return '<section class="sc-section">' +
    '<h2 class="sc-section-title">基于问题，为你推荐</h2>' +
    '<div class="sc-rec-list">' +
      '<div class="sc-rec-item">' +
        '<span class="sc-rec-icon">📖</span>' +
        '<div class="sc-rec-body">' +
          '<div class="sc-rec-title">学：MG4 新品上市资料</div>' +
          '<div class="sc-rec-sub">总部 · 今日上线</div>' +
        '</div>' +
        '<span class="sc-rec-arrow">→</span>' +
      '</div>' +
      '<div class="sc-rec-item">' +
        '<span class="sc-rec-icon">🎤</span>' +
        '<div class="sc-rec-body">' +
          '<div class="sc-rec-title">练：王女士那场，重新接一遍</div>' +
          '<div class="sc-rec-sub">回放原音 + 自己重接一遍</div>' +
        '</div>' +
        '<span class="sc-rec-arrow">→</span>' +
      '</div>' +
    '</div>' +
  '</section>';
}

// ====== 底部导航栏 ======
function renderBottomNav() {
  return '<div class="sc-bottom-nav-wrap">' +
    '<nav class="sc-bottom-nav">' +
      '<span class="sc-bottom-nav-item active">' +
        '<svg width="25" height="25" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3L21 9.5V19C21 19.6 20.6 20 20 20H15V13H9V20H4C3.4 20 3 19.6 3 19V9.5Z" fill="#1677FF" stroke="#1677FF" stroke-width="0.5" stroke-linejoin="round"/></svg>' +
        '<span class="sc-bottom-nav-label">首页</span>' +
      '</span>' +
      '<div class="sc-bottom-nav-record">' +
        '<svg width="25" height="25" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="15" rx="5" fill="white"/><path d="M12 17V20" stroke="white" stroke-width="1.8" stroke-linecap="round"/><path d="M9 22H15" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '</div>' +
      '<span class="sc-bottom-nav-item">' +
        '<svg width="25" height="25" viewBox="0 0 24 24" fill="none"><path d="M4 4H9L10.3 7.6H20C20.6 7.6 21 8 21 8.5V18C21 18.6 20.6 19 20 19H4C3.4 19 3 18.6 3 18V5C3 4.4 3.4 4 4 4Z" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" fill="none"/></svg>' +
        '<span class="sc-bottom-nav-label">全部录音</span>' +
      '</span>' +
    '</nav>' +
  '</div>';
}

// 切换视图
function switchAbilityView(view) {
  var forceView = document.getElementById('scForceView');
  var sopView = document.getElementById('scSopView');
  var btns = document.querySelectorAll('.sc-seg-btn');
  if (view === 'force') {
    if (forceView) forceView.style.display = '';
    if (sopView) sopView.style.display = 'none';
    btns[0].classList.add('active');
    btns[1].classList.remove('active');
  } else {
    if (forceView) forceView.style.display = 'none';
    if (sopView) sopView.style.display = '';
    btns[0].classList.remove('active');
    btns[1].classList.add('active');
  }
}

// ====== 问候栏 ======
function salesCoachGreeting() {
  return '<header class="sc-greeting-new">' +
    '<div class="sc-greeting-avatar">李</div>' +
    '<div class="sc-greeting-info">' +
      '<h1 class="sc-greeting-name-new">李娜</h1>' +
      '<p class="sc-greeting-sub-new">昨天接待了 3 位客户</p>' +
    '</div>' +
  '</header>';
}

// ====== 雷达图 ======
function radarCard(radar) {
  return '<section class="sc-card sc-radar-card"><div class="sc-radar-header">' +
    '<span class="sc-radar-title">五维能力分析 · 昨日</span>' +
    '<span class="sc-radar-total">总分 <strong>' + radar.totalScore + '</strong></span>' +
  '</div>' + radarSVG(radar.dimensions) + '</section>';
}

function radarSVG(dimensions, yesterdayDims, changes) {
  var cx = 170, cy = 145, r = 100;
  // Today polygon
  var pointsStr = '', labelsHtml = '', highlightDot = '';
  for (var i = 0; i < dimensions.length; i++) {
    var angleDeg = -90 + i * 72, angleRad = (angleDeg * Math.PI) / 180;
    var score = dimensions[i].score;
    var px = cx + (score / 100) * r * Math.cos(angleRad);
    var py = cy + (score / 100) * r * Math.sin(angleRad);
    pointsStr += (i > 0 ? ' ' : '') + Math.round(px) + ',' + Math.round(py);
    var lx = cx + (r + 32) * Math.cos(angleRad), ly = cy + (r + 32) * Math.sin(angleRad);
    var isHL = dimensions[i].highlight;
    var chg = changes ? changes[dimensions[i].name] : 0;
    var changeStr = '';
    if (chg && chg > 0) changeStr = ' <tspan fill="#10b981" font-size="10">↑' + chg + '</tspan>';
    else if (chg && chg < 0) changeStr = ' <tspan fill="#E24B4A" font-size="10">↓' + Math.abs(chg) + '</tspan>';
    labelsHtml += '<text x="' + Math.round(lx) + '" y="' + Math.round(ly) + '" text-anchor="middle" dominant-baseline="central" style="font-size:11px;fill:var(--sc-text-primary);' + (isHL ? 'font-weight:600' : '') + '">' +
      dimensions[i].name + ' <tspan fill="' + (isHL ? '#E24B4A' : 'var(--sc-primary)') + '">' + dimensions[i].score + '</tspan>' + changeStr + '</text>';
    if (isHL) highlightDot = '<circle cx="' + Math.round(px) + '" cy="' + Math.round(py) + '" r="6" fill="#E24B4A" stroke="#fff" stroke-width="2"/>';
  }
  // Yesterday polygon (optional)
  var yesterdayPoly = '';
  if (yesterdayDims) {
    var yPts = '';
    for (var yi = 0; yi < yesterdayDims.length; yi++) {
      var yaDeg = -90 + yi * 72, yaRad = (yaDeg * Math.PI) / 180;
      var yScore = yesterdayDims[yi].score;
      var ypx = cx + (yScore / 100) * r * Math.cos(yaRad);
      var ypy = cy + (yScore / 100) * r * Math.sin(yaRad);
      yPts += (yi > 0 ? ' ' : '') + Math.round(ypx) + ',' + Math.round(ypy);
    }
    yesterdayPoly = '<polygon points="' + yPts + '" fill="none" stroke="var(--sc-text-secondary,#94a3b8)" stroke-width="1.2" stroke-dasharray="6,3" stroke-linejoin="round"/>';
  }
  // Grid and axes
  var gridLines = '';
  for (var g = 20; g <= 100; g += 20) {
    var gridPts = '';
    for (var gi = 0; gi < 5; gi++) {
      var gaDeg = -90 + gi * 72, gaRad = (gaDeg * Math.PI) / 180;
      gridPts += (gi > 0 ? ' ' : '') + Math.round(cx + (g / 100) * r * Math.cos(gaRad)) + ',' + Math.round(cy + (g / 100) * r * Math.sin(gaRad));
    }
    gridLines += '<polygon points="' + gridPts + '" fill="none" stroke="var(--sc-grid,#e2e8f0)" stroke-width="0.5"/>';
  }
  var axes = '';
  for (var ai = 0; ai < 5; ai++) {
    var aDeg = -90 + ai * 72, aRad = (aDeg * Math.PI) / 180;
    axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + Math.round(cx + r * Math.cos(aRad)) + '" y2="' + Math.round(cy + r * Math.sin(aRad)) + '" stroke="var(--sc-grid,#e2e8f0)" stroke-width="0.5"/>';
  }
  return '<div class="sc-radar-wrap"><svg viewBox="0 0 340 290" class="sc-radar-svg">' +
    '<text x="10" y="22" style="font-size:12px;fill:var(--sc-text-secondary,#94a3b8)">昨日五维能力分</text>' +
    gridLines + axes +
    yesterdayPoly +
    '<polygon points="' + pointsStr + '" fill="var(--sc-primary)" fill-opacity="0.1" stroke="var(--sc-primary,#1677FF)" stroke-width="1.5" stroke-linejoin="round"/>' +
    highlightDot + labelsHtml + '</svg></div>';
}

// ====== 收工复盘页（coach-v2 首页） ======
function reviewLayout() {
  var d = REVIEW_DATA;
  return '<div class="sc-phone-wrapper"><div class="sc-page sc-review-page">' +
    reviewGreeting(d) +
    reviewReportStrip(d) +
    renderReviewToggleCard(d) +
  '</div></div>';
}

// 问候栏（纯左对齐，不挂右侧统计）
function reviewGreeting(d) {
  return '<header class="sc-review-greeting">' +
    '<h1 class="sc-review-greet-name">' + d.user.name + '，来看看今日复盘</h1>' +
    '<p class="sc-review-greet-streak">已坚持复盘 <span class="sc-text-accent">' + d.user.streakDays + '</span> 天 · 坚持住</p>' +
  '</header>';
}

// 今日战报条（横向指标 + 涨跌标签）
function reviewReportStrip(d) {
  var changeTags = '';
  for (var key in d.changes) {
    var v = d.changes[key];
    var cls = v > 0 ? 'sc-report-tag-up' : 'sc-report-tag-down';
    var arrow = v > 0 ? '↑' : '↓';
    var sign = v > 0 ? '+' : '';
    changeTags += '<span class="sc-report-tag ' + cls + '">' + key + ' ' + sign + v + ' ' + arrow + '</span>';
  }
  return '<section class="sc-card sc-review-report-strip">' +
    '<div class="sc-report-metrics">' +
      '<div class="sc-report-metric"><span class="sc-report-metric-num">' + d.todayStats.itemsPracticed + '</span><span class="sc-report-metric-label">练了</span></div>' +
      '<div class="sc-report-metric"><span class="sc-report-metric-num">' + d.todayStats.minutesSpent + '</span><span class="sc-report-metric-label">分钟</span></div>' +
      '<div class="sc-report-metric"><span class="sc-report-metric-num">' + d.user.streakDays + '</span><span class="sc-report-metric-label">连续天</span></div>' +
    '</div>' +
    '<div class="sc-report-changes">' + changeTags + '</div>' +
  '</section>';
}

// 五维能力对比雷达（切换卡内 五维视图）
function reviewForceView(d) {
  var tipText = '五维成长地图';
  return '<div class="sc-radar-header">' +
      '<span class="sc-radar-title">五维复盘 · 今天 vs 昨天</span>' +
      '<span class="sc-radar-total">总分 <strong>' + d.totalScore + '</strong></span>' +
    '</div>' +
    radarSVG(d.dimensions.today, d.dimensions.yesterday, d.changes) +
    '<div class="sc-radar-tip sc-radar-tip-clickable" style="text-align:center;justify-content:center">' +
      '<span class="sc-tip-text">' + tipText + '</span>' +
    '</div>' +
    '<button class="sc-btn sc-btn-outline sc-toggle-bottom-btn" id="reviewPeerBtn">看' + d.weakest.name + '高分同行示范</button>' +
    '<p class="sc-review-footer-text" style="text-align:center;margin-top:10px;font-size:14px;color:var(--sc-text-primary,#1e293b);font-weight:500">明天见，加油！</p>';
}

// SOP 流程横向进度条（切换卡内 SOP 视图）
function reviewSopView(d) {
  var barsHtml = '';
  for (var i = 0; i < d.sopStages.length; i++) {
    var s = d.sopStages[i];
    var isWeak = s.weakest;
    var barW = Math.round(s.today);
    var yesterdayPct = Math.round(s.yesterday);
    var chgHtml = '';
    if (s.change > 0) chgHtml = ' <span class="sc-sop-chg up">↑' + s.change + '</span>';
    else if (s.change < 0) chgHtml = ' <span class="sc-sop-chg down">↓' + Math.abs(s.change) + '</span>';
    barsHtml += '<div class="sc-sop-item' + (isWeak ? ' weakest' : '') + '">' +
      '<span class="sc-sop-name' + (isWeak ? ' weakest' : '') + '">' +
        (isWeak ? '<span class="sc-sop-weakest-tag">最弱</span>' : '') +
        '&#' + (9312 + i) + '; ' + s.name +
      '</span>' +
      '<div class="sc-sop-bar-wrap sc-sop-bar-wrap--tick">' +
        '<div class="sc-sop-bar-fill' + (isWeak ? ' weakest' : '') + '" style="width:' + barW + '%"></div>' +
        '<div class="sc-sop-bar-tick" style="left:' + yesterdayPct + '%"></div>' +
      '</div>' +
      '<span class="sc-sop-score' + (isWeak ? ' weakest' : '') + '">' + s.today + chgHtml + '</span>' +
    '</div>';
  }
  return '<div class="sc-sop-header">' +
      '<span class="sc-sop-title">SOP 复盘 · 今天 vs 昨天</span>' +
      '<span class="sc-sop-total">达成 <strong>' + d.sopRate + '%</strong></span>' +
    '</div>' +
    '<div class="sc-sop-list">' + barsHtml + '</div>' +
    '<div class="sc-sop-legend">' +
      '<span class="sc-sop-legend-item"><span class="sc-sop-legend-bar today"></span> 今天</span>' +
      '<span class="sc-sop-legend-item"><span class="sc-sop-legend-bar yesterday"></span> 昨天刻度</span>' +
    '</div>' +
    '<div class="sc-radar-tip sc-radar-tip-clickable" onclick="window.location.hash=\'#sales-coach-sop-map\'" style="text-align:center;justify-content:center;margin-top:8px">' +
      '<span class="sc-tip-text">SOP 成长地图</span>' +
    '</div>' +
    '<button class="sc-btn sc-btn-outline sc-step-btn" id="reviewSopBtn">去补强练一轮</button>' +
    '<p class="sc-review-footer-text" style="text-align:center;margin-top:10px;font-size:14px;color:var(--sc-text-primary,#1e293b);font-weight:500">明天见，加油！</p>';
}

// ====== 复盘可切换卡（五维 ⇄ SOP） ======
function renderReviewToggleCard(d) {
  return '<section class="sc-card sc-review-toggle-card">' +
    '<div class="sc-toggle-seg-ctrl">' +
      '<button class="sc-toggle-seg-btn active" onclick="switchReviewView(\'force\')">五维能力</button>' +
      '<button class="sc-toggle-seg-btn" onclick="switchReviewView(\'sop\')">SOP 流程</button>' +
    '</div>' +
    '<div id="reviewForceView">' + reviewForceView(d) + '</div>' +
    '<div id="reviewSopView" style="display:none">' + reviewSopView(d) + '</div>' +
  '</section>';
}

function switchReviewView(view) {
  var forceEl = document.getElementById('reviewForceView');
  var sopEl = document.getElementById('reviewSopView');
  var btns = document.querySelectorAll('.sc-toggle-seg-btn');
  if (view === 'force') {
    if (forceEl) forceEl.style.display = '';
    if (sopEl) sopEl.style.display = 'none';
    if (btns[0]) { btns[0].classList.add('active'); btns[1].classList.remove('active'); }
  } else {
    if (forceEl) forceEl.style.display = 'none';
    if (sopEl) sopEl.style.display = '';
    if (btns[0]) { btns[0].classList.remove('active'); btns[1].classList.add('active'); }
  }
}

// 明日一个重点
function reviewTomorrowCard(d) {
  var t = d.tomorrowTask;
  return '<section class="sc-card sc-review-tomorrow">' +
    '<div class="sc-review-tomorrow-top">' +
      '<span class="sc-review-tomorrow-title">明天重点补这项</span>' +
      '<span class="sc-pill sc-pill-outline">' + t.pill + '</span>' +
    '</div>' +
    '<p class="sc-review-tomorrow-body">' + t.bodyHtml + '</p>' +
    '<button class="sc-btn sc-btn-outline" id="reviewTomorrowBtn">' + t.buttonText + '</button>' +
  '</section>';
}

// 底部
function reviewFooter() {
  return '<footer class="sc-review-footer">' +
    '<p class="sc-review-footer-text">明天见，加油！</p>' +
  '</footer>';
}

// ====== 任务列表 ======
function taskList(tasks) {
  var html = '<section class="sc-tasks"><h2 class="sc-tasks-title">今日<strong>' + tasks.length + '</strong>项练习</h2>';
  for (var i = 0; i < tasks.length; i++) html += taskCard(tasks[i]);
  return html + '</section>';
}

function taskCard(task) {
  var btnClass = task.buttonStyle === 'solid' ? 'sc-btn-solid' : 'sc-btn-outline';
  var pillClass = task.pillStyle === 'solid' ? 'sc-pill-solid' : 'sc-pill-outline';
  var tagsHtml = task.actionTags.map(function(t) { return '<span class="sc-action-tag">' + t + '</span>'; }).join('');
  var subLabelCls = task.subLabelRed ? 'sc-task-sub sc-task-sub-red' : 'sc-task-sub';
  var deadlineHtml = task.deadline ? '<span class="sc-task-deadline">' + task.deadline + '</span>' : '';
  return '<article class="sc-card sc-task-card"><div class="sc-task-top">' +
    '<span class="sc-pill ' + pillClass + '">' + task.labelPill + '</span>' +
    '<span class="' + subLabelCls + '">' + task.subLabel + '</span>' + deadlineHtml + '</div>' +
    '<p class="sc-task-body">' + task.body + '</p>' +
    '<div class="sc-action-tags">' + tagsHtml + '</div>' +
    '<button class="sc-btn ' + btnClass + '" data-panel="' + task.panelId + '">' + task.buttonText + '</button></article>';
}

// ====== 面板系统 ======
function renderPanel(panelId, subPage) {
  var panel = PANELS[panelId];
  var stepKey = subPage.replace(panelId + '-', '');
  if (stepKey !== SC_STATE._prevStep) {
    SC_STATE.chatMessages = []; SC_STATE.chatRound = 0; SC_STATE.chatDone = false;
    SC_STATE.quizAnswers = [];
  }
  SC_STATE._prevStep = stepKey;
  var html = '<div class="sc-phone-wrapper"><div class="sc-page sc-panel-page">' +
    panelHeader(panel, stepKey) + '<div class="sc-panel-body">';
  html += (stepKey === 'done') ? renderDonePage(panel) : renderStepContent(panel, stepKey);
  return html + '</div></div></div>';
}

function panelHeader(panel, stepKey) {
  var total = panel.totalSteps;
  var ci = stepKey === 'done' ? total : parseInt(stepKey.replace('s', '')) || 1;
  var stepsHtml = '';
  for (var i = 1; i <= total; i++) {
    var cls = i < ci ? 'done' : (i === ci && stepKey !== 'done' ? 'active' : '');
    stepsHtml += '<span class="sc-step-dot ' + cls + '">' + (i < ci ? '&#x2713;' : '') + '</span>';
    if (i < total) stepsHtml += '<span class="sc-step-line ' + (i < ci ? 'done' : '') + '"></span>';
  }
  var backHash = isCoachV2() ? '#coach-v2' : '#sales-coach';
  var panelTitle = isCoachV2() ? panel.title.replace('培训', '复盘') : panel.title;
  return '<header class="sc-panel-header"><div class="sc-panel-top">' +
    '<button class="sc-back-btn" onclick="location.hash=\'' + backHash + '\'">&larr;</button>' +
    '<span class="sc-panel-title">' + panelTitle + '</span><span class="sc-panel-spacer"></span></div>' +
    '<div class="sc-step-bar">' + stepsHtml + '</div>' +
    '<div class="sc-step-labels">' + panel.steps.map(function(s, idx) {
      var lcls = idx + 1 < ci ? 'done' : (idx + 1 === ci && stepKey !== 'done' ? 'active' : '');
      return '<span class="sc-step-label ' + lcls + '">' + s + '</span>';
    }).join('') + '</div></header>';
}

function renderStepContent(panel, stepKey) {
  if (panel.id === 'p3' && stepKey === 's1') return renderStep3(panel);
  // P1 order: 看(s1) → 听(s2) → 考(s3) → 练(s4)
  if (panel.id === 'p1' && stepKey === 's3') return renderStep4(panel);
  if (panel.id === 'p1' && stepKey === 's4') return renderStep3(panel);
  if (stepKey === 's1') return renderStep1(panel);
  if (stepKey === 's2') return renderStep2(panel);
  if (stepKey === 's3') return renderStep3(panel);
  if (stepKey === 's4') return renderStep4(panel);
  return renderStep1(panel);
}

// 步骤1 · 看
function renderStep1(panel) {
  var s1 = panel.s1, contentHtml = '';
  var btnText = panel.id === 'p1' ? '我已读完，下一步' : '知道了，听听高手怎么做';
  if (panel.id === 'p1') {
    for (var i = 0; i < s1.sections.length; i++) {
      var sec = s1.sections[i];
      if (sec.type === 'video') contentHtml += '<div class="sc-material-video-wrap"><div class="sc-video-label">' + sec.label + '</div><video class="sc-material-video" src="' + sec.src + '" poster="' + (sec.poster || '') + '" controls playsinline></video></div>';
      else if (sec.type === 'image') contentHtml += '<div class="sc-material-img-wrap"><img class="sc-material-img" src="' + sec.src + '" alt="' + sec.alt + '"></div>';
      else if (sec.type === 'heading') contentHtml += '<h3 class="sc-material-heading">' + sec.text + '</h3>';
      else if (sec.type === 'text') contentHtml += '<p class="sc-material-text">' + sec.text + '</p>';
      else if (sec.type === 'bullet') contentHtml += '<ul class="sc-material-list">' + sec.items.map(function(it) { return '<li>' + it + '</li>'; }).join('') + '</ul>';
    }
  } else {
    contentHtml += '<p class="sc-conclusion">' + s1.conclusion + '</p><div class="sc-metrics">';
    for (var j = 0; j < s1.metrics.length; j++) {
      var m = s1.metrics[j];
      contentHtml += '<div class="sc-metric-item"><div class="sc-metric-top"><span class="sc-metric-label">' + m.label + '</span>' +
        '<span class="sc-metric-value ' + m.status + '">' + m.value + '</span></div><p class="sc-metric-tip">' + m.tip + '</p></div>';
    }
    contentHtml += '</div>';
  }
  return '<div class="sc-step-content sc-step-read">' + (s1.title ? '<div class="sc-step-title">' + s1.title + '</div>' : '') +
    contentHtml +
    '<button class="sc-btn sc-btn-solid sc-step-btn" id="step1Btn" ' + (panel.id === 'p1' ? 'disabled' : '') +
    ' onclick="goPanelStep(\'' + panel.id + '\',2)">' + btnText + '</button></div>';
}

// 步骤2 · 听
function renderStep2(panel) {
  var s2 = panel.s2;
  // P1 has multiple tracks, P2 has single track
  var tracks = s2.tracks || [{ audioLabel: s2.audioLabel, audioDuration: s2.audioDuration, transcript: s2.transcript }];
  var html = '';

  for (var ti = 0; ti < tracks.length; ti++) {
    var track = tracks[ti], tHtml = '';
    for (var i = 0; i < track.transcript.length; i++) {
      var t = track.transcript[i], isCoach = t.speaker.indexOf('销冠') > -1 || t.speaker.indexOf('陈静') > -1;
      if (t.speaker === '备注') tHtml += '<div class="sc-trans-note">' + t.text + '</div>';
      else tHtml += '<div class="sc-trans-item ' + (isCoach ? 'coach' : 'customer') + '"><span class="sc-trans-speaker">' + t.speaker + '</span><p class="sc-trans-text">' + t.text + '</p></div>';
    }

    html += '<div class="sc-audio-player">' +
      '<div class="sc-audio-label">' + (ti + 1) + '. ' + track.audioLabel + '</div>' +
      '<div class="sc-audio-controls">' +
        '<button class="sc-audio-play" onclick="toggleTrackAudio(this,\'' + track.audioDuration + '\')">播放</button>' +
        '<div class="sc-audio-progress-wrap"><div class="sc-audio-progress" style="width:0%"></div></div>' +
        '<span class="sc-audio-time">0:00 / ' + track.audioDuration + '</span>' +
      '</div>' +
      '<div class="sc-transcript">' + tHtml + '</div>' +
    '</div>';
  }

  return '<div class="sc-step-content sc-step-listen">' +
    (s2.title ? '<div class="sc-step-title">' + s2.title + '</div>' : '') +
    html +
    '<button class="sc-btn sc-btn-solid sc-step-btn" id="step2Btn" onclick="goPanelStep(\'' + panel.id + '\',3)">' +
      (panel.id === 'p1' ? '听完了，去测评' : '听完了，去练习') + '</button></div>';
}

// 步骤3 · 练
function renderStep3(panel) {
  var exData = panel.id === 'p1' ? panel.s4 : panel.s3;
  var msgs = SC_STATE.chatMessages, chatHtml = '';
  for (var i = 0; i < msgs.length; i++) {
    chatHtml += '<div class="sc-chat-msg ' + msgs[i].from + '"><span class="sc-chat-from">' +
      (msgs[i].from === 'customer' ? '客户' : '我') + '</span><div class="sc-chat-bubble">' + msgs[i].text + '</div></div>';
  }
  if (msgs.length === 0 && SC_STATE.chatRound === 0 && exData.rounds && exData.rounds[0]) {
    chatHtml += '<div class="sc-chat-msg customer"><span class="sc-chat-from">客户</span><div class="sc-chat-bubble">' + exData.rounds[0].text + '</div></div>';
    SC_STATE.chatMessages.push(exData.rounds[0]);
  }
  var showInput = !SC_STATE.chatDone && msgs.length > 0;
  var nextStep = panel.id === 'p1' ? -1 : -1;
  return '<div class="sc-step-content sc-step-practice"><div class="sc-step-title">' + exData.title + '</div>' +
    '<div class="sc-scene-hint">' + exData.scene + '</div><div class="sc-chat-area" id="chatArea">' + chatHtml + '</div>' +
    (showInput ? '<div class="sc-chat-input-area"><textarea class="sc-chat-input" id="chatInput" placeholder="输入你的回复……" rows="2"></textarea>' +
    '<div class="sc-chat-actions"><button class="sc-voice-btn" id="voiceBtn" onmousedown="startVoice()" onmouseup="sendVoice()" ontouchstart="startVoice()" ontouchend="sendVoice()">按住说话</button>' +
    '<button class="sc-send-btn" onclick="sendText()">发送</button></div></div>' : '') +
    (SC_STATE.chatDone ? '<div class="sc-chat-done-hint">对练完成，继续下一步吧</div>' : '') +
    '<button class="sc-end-practice-btn" onclick="endPractice()">结束对练</button>' +
    '<button class="sc-btn sc-btn-solid sc-step-btn" id="step3Btn" ' + (SC_STATE.chatDone ? '' : 'disabled') +
    ' onclick="goPanelStep(\'' + panel.id + '\',' + nextStep + ')">完成练习</button></div>';
}

// 步骤4 · 考
function renderStep4(panel) {
  var quizData = panel.id === 'p1' ? panel.s3 : panel.s4, answers = SC_STATE.quizAnswers, quizHtml = '';
  var allCorrect = true;
  for (var i = 0; i < quizData.questions.length; i++) {
    var q = quizData.questions[i], answered = answers[i] !== undefined, isCorrect = answered && answers[i] === q.correct;
    if (!isCorrect) allCorrect = false;
    quizHtml += '<div class="sc-quiz-item"><div class="sc-quiz-q">' + (i + 1) + '. ' + q.q + '</div><div class="sc-quiz-options">';
    for (var j = 0; j < q.options.length; j++) {
      var optCls = answered ? (j === q.correct ? 'correct' : j === answers[i] ? 'wrong' : 'dimmed') : '';
      quizHtml += '<button class="sc-quiz-opt ' + optCls + '" ' + (answered ? 'disabled' : '') + ' onclick="answerQuiz(' + i + ',' + j + ')">' + q.options[j] + '</button>';
    }
    quizHtml += '</div>';
    if (answered) {
      quizHtml += '<div class="sc-quiz-feedback ' + (isCorrect ? 'correct' : 'wrong') + '">' +
        (isCorrect ? '<span class="sc-quiz-check">&#x2713;</span> 正确！' : '') + (isCorrect ? '' : q.explain) +
      '</div>';
    }
    quizHtml += '</div>';
  }
  return '<div class="sc-step-content sc-step-quiz">' +
    (quizData.title ? '<div class="sc-step-title">' + quizData.title + '</div>' : '') +
    quizHtml +
    '<button class="sc-btn sc-btn-solid sc-step-btn" id="step4Btn" ' + (allCorrect && answers.length === quizData.questions.length ? '' : 'disabled') +
    ' onclick="goPanelStep(\'' + panel.id + '\',' + (panel.id === 'p1' ? 4 : -1) + ')">' +
    (panel.id === 'p1' ? '提交，去练习' : '提交，看结果') + '</button></div>';
}

// 完成页
function renderDonePage(panel) {
  var score = panel.id === 'p1' ? 82 : (panel.id === 'p2' ? 78 : 75);
  var qHtml = panel.id === 'p1' ? '<div class="sc-done-stat"><span class="sc-done-stat-val">测评</span><span class="sc-done-stat-num">2/2 全对</span></div>' : '';
  var fb = panel.id === 'p1' ? 'MG4 核心卖点掌握良好，后续注意在实战中多练。' :
    (panel.id === 'p2' ? '这次你主动提问的次数比昨天多了，但还没问到预算，下次记得问。' : '邀约时机把握不错！适当缩短犹豫时间，客户反而更容易答应。');
  var doneTitle = isCoachV2() ? '复盘完成！' : '本次完成！';
  var streakLabel = isCoachV2() ? '已坚持复盘' : '连续打卡';
  var syncText = isCoachV2() ? '结果已保存' : '结果已同步总部';
  var syncHtml = panel.id === 'p1' ? '' : '<p class="sc-done-sync">' + syncText + '</p>';
  var backHash = isCoachV2() ? '#coach-v2' : '#sales-coach';
  return '<div class="sc-step-content sc-done-page"><div class="sc-done-big-text">' + doneTitle + '</div>' +
    '<div class="sc-done-score-wrap"><div class="sc-done-score">' + score + '</div><div class="sc-done-score-label">分</div></div>' +
    '<div class="sc-done-stats"><div class="sc-done-stat"><span class="sc-done-stat-val">对练评分</span><span class="sc-done-stat-num">' + score + ' 分</span></div>' +
    (panel.id === 'p1' ? '<div class="sc-done-stat"><span class="sc-done-stat-val">用时</span><span class="sc-done-stat-num">约 8 分钟</span></div>' : '') + qHtml + '</div>' +
    '<div class="sc-done-streak">' + streakLabel + ' <strong>' + (SALES_COACH_DATA.user.streakDays + 1) + '</strong> 天</div>' +
    '<p class="sc-done-feedback">' + fb + '</p>' + syncHtml +
    '<button class="sc-btn sc-btn-solid sc-step-btn" onclick="location.hash=\'' + backHash + '\'">返回成交教练</button></div>';
}

// ====== 面板导航 ======
function goPanelStep(panelId, stepNum) {
  var prefix = isCoachV2() ? '#coach-v2-' : '#sales-coach-';
  if (stepNum === -1) location.hash = prefix + panelId + '-done';
  else location.hash = prefix + panelId + '-s' + stepNum;
}

// ====== 音频（支持多轨道） ======
var AUDIO_TIMERS = {};
function toggleTrackAudio(btn, duration) {
  var player = btn.closest('.sc-audio-player');
  var bar = player.querySelector('.sc-audio-progress');
  var timeEl = player.querySelector('.sc-audio-time');
  var trackKey = player.querySelector('.sc-audio-label').textContent;
  var isPlaying = AUDIO_TIMERS[trackKey];

  if (isPlaying) {
    clearInterval(AUDIO_TIMERS[trackKey]);
    delete AUDIO_TIMERS[trackKey];
    btn.textContent = '播放';
    return;
  }

  btn.textContent = '暂停';
  // Parse duration string like "02:35" to total seconds
  var parts = duration.split(':');
  var totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  var progress = 0;

  AUDIO_TIMERS[trackKey] = setInterval(function() {
    progress = Math.min(progress + 0.7, 100);
    bar.style.width = progress + '%';
    var elapsed = Math.floor(progress / 100 * totalSec);
    var min = Math.floor(elapsed / 60), sec = elapsed % 60;
    timeEl.textContent = min + ':' + (sec < 10 ? '0' : '') + sec + ' / ' + duration;
    if (progress >= 100) {
      clearInterval(AUDIO_TIMERS[trackKey]);
      delete AUDIO_TIMERS[trackKey];
      btn.textContent = '播放';
    }
  }, 200);
}

// ====== 对话 ======
function sendText() {
  advanceChat(document.getElementById('chatInput')?.value?.trim());
  var inp = document.getElementById('chatInput'); if (inp) inp.value = '';
}
function sendVoice() { advanceChat(null); }
function advanceChat(text) {
  var hash = location.hash, panelId = hash.indexOf('p1') > -1 ? 'p1' : hash.indexOf('p2') > -1 ? 'p2' : 'p3';
  var panel = PANELS[panelId], exData = panel.s3;
  var replyText = text || (exData.goodReplies[SC_STATE.chatRound] || '好的，我了解了。');
  SC_STATE.chatMessages.push({ from: 'user', text: replyText }); SC_STATE.chatRound++;
  if (SC_STATE.chatRound < exData.rounds.length) SC_STATE.chatMessages.push(exData.rounds[SC_STATE.chatRound]);
  else SC_STATE.chatDone = true;
  Router.setEnv(isCoachV2() ? 'coach-v2' : 'sales-coach', panelId + '-s3');
}
function startVoice() { var btn = document.getElementById('voiceBtn'); if (btn) { btn.textContent = '正在听...'; btn.style.background = 'var(--sc-primary,#1677FF)'; btn.style.color = '#fff'; } }
function endPractice() {
  SC_STATE.chatDone = true;
  var btn = document.getElementById('step3Btn'); if (btn) btn.disabled = false;
  var end = document.querySelector('.sc-end-practice-btn'); if (end) end.style.display = 'none';
}

// ====== 测评 ======
function answerQuiz(qIndex, optIndex) {
  SC_STATE.quizAnswers[qIndex] = optIndex;
  var hash = location.hash, panelId = hash.indexOf('p1') > -1 ? 'p1' : hash.indexOf('p2') > -1 ? 'p2' : 'p3';
  var step = hash.indexOf('-s') > -1 ? hash.split('-s')[1] : (panelId === 'p1' ? '3' : '4');
  Router.setEnv(isCoachV2() ? 'coach-v2' : 'sales-coach', panelId + '-s' + step);
}

// ====== 样式 ======
function salesCoachStyles() {
  return '<style>' +
    ':root {--sc-primary:#1677FF;--sc-primary-dark:#0E5FD8;--sc-primary-light:#EAF2FF;--sc-success:#10b981;--sc-success-light:#ecfdf5;--sc-danger:#DC2626;--sc-warning:#D97706;--sc-gray-locked:#d1d5db;--sc-grid:#e8ecf0;}' +
    '.sc-phone-wrapper {display:flex;justify-content:center;min-height:100vh;background:var(--sc-bg-outer,#eef3fa);padding:12px;}' +
    '.sc-page {width:375px;max-width:100%;background:var(--sc-bg-page,#F2F6FC);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;padding-bottom:24px;}' +
    '.sc-panel-page {min-height:100vh;}' +
    '.sc-greeting {display:flex;justify-content:space-between;align-items:flex-start;padding:20px 18px 8px;}' +
    '.sc-greeting-name {font-size:15px;font-weight:500;color:var(--sc-text-primary,#1e293b);margin:0 0 4px;}' +
    '.sc-greeting-streak {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin:0;}' +
    '.sc-text-accent {color:var(--sc-primary,#1677FF);font-weight:600;}' +
    '.sc-text-red {color:#DC2626;font-weight:600;}' +
    '.sc-text-success {color:var(--sc-success,#10b981);font-weight:600;}' +
    '.sc-greeting-right {text-align:right;}' +
    '.sc-rank-label {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin:0 0 2px;}' +
    '.sc-rank-value {font-size:16px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin:0 0 2px;}' +
    '.sc-rank-gap {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin:0;}' +
    '.sc-radar-card {margin:0 16px 4px;padding:14px 16px 8px;}' +
    // 昨日能力可切换卡
    '.sc-ability-card {margin:0 16px 4px;padding:12px 16px 12px;border-radius:12px;}' +
    // 分段控件
    '.sc-seg-ctrl {display:flex;background:var(--sc-bg-page,#F2F6FC);border-radius:8px;padding:3px;margin-bottom:14px;}' +
    '.sc-seg-btn {flex:1;padding:7px 0;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;background:transparent;color:var(--sc-text-secondary,#64748B);transition:all 0.2s;}' +
    '.sc-seg-btn.active {background:var(--sc-bg-card,#fff);color:var(--sc-primary,#1677FF);font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.08);}' +
    // SOP header
    '.sc-sop-header {display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}' +
    '.sc-sop-title {font-size:13px;font-weight:500;color:var(--sc-text-primary,#1e293b);}' +
    '.sc-sop-total {font-size:13px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-sop-total strong {color:var(--sc-text-primary,#1e293b);font-size:18px;font-weight:700;}' +
    // SOP list
    '.sc-sop-list {display:flex;flex-direction:column;gap:8px;}' +
    '.sc-sop-item {display:flex;align-items:center;gap:8px;}' +
    '.sc-sop-item.weakest {background:#FEF2F2;margin:0 -10px;padding:8px 10px;border-radius:8px;}' +
    '.sc-sop-name {font-size:12px;color:var(--sc-text-primary,#1e293b);white-space:nowrap;min-width:82px;display:flex;align-items:center;gap:4px;}' +
    '.sc-sop-name.weakest {color:rgba(226,75,74,0.55);font-weight:500;}' +
    '.sc-sop-weakest-tag {display:inline-block;font-size:10px;color:rgba(226,75,74,0.7);background:rgba(226,75,74,0.12);padding:1px 5px;border-radius:4px;font-weight:600;line-height:1.4;}' +
    '.sc-sop-score {font-size:13px;font-weight:500;color:rgba(22,119,255,0.45);min-width:22px;text-align:right;}' +
    '.sc-sop-score.weakest {color:rgba(226,75,74,0.55);}' +
    '.sc-sop-bar-wrap {flex:1;height:8px;background:var(--sc-grid,#E8ECF0);border-radius:4px;overflow:hidden;}' +
    '.sc-sop-bar-fill {height:100%;background:rgba(22,119,255,0.28);border-radius:4px;transition:width 0.4s;}' +
    '.sc-sop-bar-fill.weakest {background:rgba(226,75,74,0.30);}' +
    //
    '.sc-radar-header {display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}' +
    '.sc-radar-title {font-size:13px;font-weight:500;color:var(--sc-text-primary,#1e293b);}' +
    '.sc-radar-total {font-size:13px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-radar-total strong {color:var(--sc-text-primary,#1e293b);font-size:18px;font-weight:700;}' +
    '.sc-radar-wrap {display:flex;justify-content:center;margin:0 -8px;}' +
    '.sc-radar-svg {width:100%;max-width:310px;height:auto;}' +
    '.sc-radar-tip {display:flex;align-items:center;gap:8px;margin-top:10px;padding:8px 12px;background:var(--sc-primary-light,#EAF2FF);border-radius:8px;}' +
    '.sc-tip-icon {font-size:14px;color:var(--sc-primary,#1677FF);flex-shrink:0;}' +
    '.sc-tip-text {font-size:11px;color:var(--sc-text-primary,#1e293b);line-height:1.5;}' +
    '.sc-tip-text strong {color:#DC2626;font-weight:600;}' +
    '.sc-radar-tip-clickable {cursor:pointer;transition:background 0.2s;}' +
    '.sc-radar-tip-clickable:active {background:rgba(22,119,255,0.12);}' +
    '.sc-tip-arrow {font-size:13px;color:var(--sc-primary,#1677FF);flex-shrink:0;margin-left:auto;}' +
    '.sc-card {background:var(--sc-bg-card,#fff);border:0.5px solid var(--sc-card-border,#dde4f0);border-radius:10px;}' +
    '.sc-tasks {padding:0 16px;}' +
    '.sc-tasks-title {font-size:13px;font-weight:400;color:var(--sc-text-secondary,#64748b);margin:0 0 10px;padding:0 2px;}' +
    '.sc-tasks-title strong {color:var(--sc-text-primary,#1e293b);font-weight:600;}' +
    '.sc-task-card {padding:14px;margin-bottom:10px;}' +
    '.sc-task-top {display:flex;align-items:center;gap:8px;margin-bottom:8px;}' +
    '.sc-task-sub {font-size:11px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-task-sub-red {color:#DC2626;font-weight:500;}' +
    '.sc-task-deadline {font-size:11px;color:#DC2626;margin-left:4px;}' +
    '.sc-pill {display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500;line-height:1.6;white-space:nowrap;}' +
    '.sc-pill-solid {background:var(--sc-primary,#1677FF);color:#fff;}' +
    '.sc-pill-outline {background:var(--sc-primary-light,#EAF2FF);color:var(--sc-primary-dark,#0E5FD8);}' +
    '.sc-task-body {font-size:13px;line-height:1.6;color:var(--sc-text-primary,#1e293b);margin:0 0 10px;}' +
    '.sc-task-body b {font-weight:600;}' +
    '.sc-action-tags {display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}' +
    '.sc-action-tag {display:inline-flex;align-items:center;padding:2px 8px;border:0.5px solid var(--sc-action-tag-border,#dde4f0);border-radius:8px;font-size:11px;color:var(--sc-text-primary,#1e293b);background:var(--sc-bg-card,#fff);}' +
    '.sc-btn {width:100%;padding:9px 0;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;text-align:center;transition:opacity 0.15s;}' +
    '.sc-btn:active {opacity:0.75;}' +
    '.sc-btn:disabled {opacity:0.4;cursor:not-allowed;}' +
    '.sc-btn-solid {background:var(--sc-primary,#1677FF);color:#fff;border:none;}' +
    '.sc-btn-outline {background:var(--sc-bg-card,#fff);color:var(--sc-primary,#1677FF);border:0.5px solid var(--sc-primary,#1677FF);}' +
    '.sc-step-btn {margin-top:20px;}' +
    /* Panel header */
    '.sc-panel-header {padding:16px 16px 0;background:var(--sc-bg-card,#fff);border-bottom:0.5px solid var(--sc-card-border,#dde4f0);}' +
    '.sc-panel-top {display:flex;align-items:center;margin-bottom:12px;}' +
    '.sc-back-btn {background:none;border:none;font-size:20px;color:var(--sc-text-primary,#1e293b);cursor:pointer;padding:4px;line-height:1;}' +
    '.sc-panel-title {flex:1;font-size:15px;font-weight:600;color:var(--sc-text-primary,#1e293b);text-align:center;}' +
    '.sc-panel-spacer {width:28px;}' +
    '.sc-step-bar {display:flex;align-items:center;justify-content:center;margin-bottom:6px;}' +
    '.sc-step-dot {width:16px;height:16px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;border:1.5px solid var(--sc-gray-locked,#d1d5db);color:transparent;background:var(--sc-bg-card,#fff);flex-shrink:0;}' +
    '.sc-step-dot.active {border-color:var(--sc-primary,#1677FF);color:var(--sc-primary,#1677FF);background:var(--sc-primary-light,#EAF2FF);}' +
    '.sc-step-dot.done {border-color:var(--sc-success,#10b981);color:var(--sc-success,#10b981);background:var(--sc-success-light,#ecfdf5);}' +
    '.sc-step-line {width:28px;height:1.5px;background:var(--sc-gray-locked,#d1d5db);flex-shrink:0;}' +
    '.sc-step-line.done {background:var(--sc-success,#10b981);}' +
    '.sc-step-labels {display:flex;justify-content:space-around;padding-bottom:12px;}' +
    '.sc-step-label {font-size:12px;color:var(--sc-gray-locked,#d1d5db);text-align:center;}' +
    '.sc-step-label.active {color:var(--sc-primary,#1677FF);font-weight:600;}' +
    '.sc-step-label.done {color:var(--sc-success,#10b981);}' +
    /* Panel body */
    '.sc-panel-body {flex:1;overflow-y:auto;}' +
    '.sc-step-content {padding:16px 16px 24px;}' +
    '.sc-step-title {font-size:15px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin-bottom:14px;}' +
    /* Step 1 */
    '.sc-material-img-wrap {margin:-16px -16px 14px;overflow:hidden;}' +
    '.sc-material-img {width:100%;height:180px;object-fit:cover;display:block;}' +
    '.sc-material-video-wrap {margin:-16px -16px 14px;}' +
    '.sc-video-label {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:4px;padding:0 16px;}' +
    '.sc-material-video {width:100%;height:200px;background:#000;display:block;border-radius:0;}' +
    '.sc-material-heading {font-size:14px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin:14px 0 6px;}' +
    '.sc-material-text {font-size:13px;line-height:1.7;color:var(--sc-text-primary,#1e293b);margin-bottom:10px;}' +
    '.sc-material-list {padding-left:18px;margin-bottom:10px;}' +
    '.sc-material-list li {font-size:12px;line-height:1.7;color:var(--sc-text-primary,#1e293b);}' +
    '.sc-conclusion {font-size:13px;font-weight:600;color:var(--sc-primary,#1677FF);line-height:1.6;padding:10px 12px;background:var(--sc-primary-light,#EAF2FF);border-radius:8px;margin-bottom:14px;}' +
    '.sc-metrics {display:flex;flex-direction:column;gap:10px;}' +
    '.sc-metric-item {padding:12px;border:0.5px solid var(--sc-card-border,#dde4f0);border-radius:8px;}' +
    '.sc-metric-top {display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;}' +
    '.sc-metric-label {font-size:13px;font-weight:500;color:var(--sc-text-primary,#1e293b);}' +
    '.sc-metric-value {font-size:13px;font-weight:600;}' +
    '.sc-metric-value.low {color:#DC2626;}' +
    '.sc-metric-value.warn {color:#d97706;}' +
    '.sc-metric-tip {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin:0;}' +
    /* Step 2 */
    '.sc-audio-player {padding:14px;border:0.5px solid var(--sc-card-border,#dde4f0);border-radius:10px;margin-bottom:14px;background:var(--sc-bg-page,#F2F6FC);}' +
    '.sc-audio-label {font-size:12px;font-weight:500;color:var(--sc-text-primary,#1e293b);margin-bottom:10px;}' +
    '.sc-audio-controls {display:flex;align-items:center;gap:10px;}' +
    '.sc-audio-play {width:36px;height:36px;border-radius:50%;border:none;background:var(--sc-primary,#1677FF);color:#fff;font-size:12px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;}' +
    '.sc-audio-progress-wrap {flex:1;height:4px;background:var(--sc-gray-locked,#e2e8f0);border-radius:2px;overflow:hidden;}' +
    '.sc-audio-progress {height:100%;background:var(--sc-primary,#1677FF);border-radius:2px;transition:width 0.2s;}' +
    '.sc-audio-time {font-size:11px;color:var(--sc-text-secondary,#94a3b8);white-space:nowrap;}' +
    '.sc-transcript {display:flex;flex-direction:column;gap:8px;margin-top:10px;}' +
    '.sc-trans-item {padding:8px 10px;border-radius:8px;}' +
    '.sc-trans-item.coach {background:#eff6ff;}' +
    '.sc-trans-item.customer {background:var(--sc-bg-page,#F2F6FC);}' +
    '.sc-trans-speaker {font-size:11px;font-weight:600;color:var(--sc-text-secondary,#64748b);}' +
    '.sc-trans-text {font-size:12px;line-height:1.6;color:var(--sc-text-primary,#1e293b);margin:3px 0 0;}' +
    '.sc-trans-note {font-size:11px;color:var(--sc-primary,#1677FF);padding:8px;background:var(--sc-primary-light,#EAF2FF);border-radius:6px;line-height:1.5;}' +
    /* Step 3 */
    '.sc-scene-hint {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:10px;padding:6px 10px;background:var(--sc-bg-page,#F2F6FC);border-radius:6px;text-align:center;}' +
    '.sc-chat-area {display:flex;flex-direction:column;gap:10px;margin-bottom:14px;min-height:200px;max-height:340px;overflow-y:auto;}' +
    '.sc-chat-msg {display:flex;flex-direction:column;max-width:85%;}' +
    '.sc-chat-msg.customer {align-self:flex-start;}' +
    '.sc-chat-msg.user {align-self:flex-end;}' +
    '.sc-chat-from {font-size:10px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:2px;padding:0 4px;}' +
    '.sc-chat-msg.user .sc-chat-from {text-align:right;}' +
    '.sc-chat-bubble {font-size:13px;line-height:1.6;padding:8px 12px;border-radius:10px;}' +
    '.sc-chat-msg.customer .sc-chat-bubble {background:#f1f5f9;color:var(--sc-text-primary,#1e293b);border-bottom-left-radius:2px;}' +
    '.sc-chat-msg.user .sc-chat-bubble {background:var(--sc-primary,#1677FF);color:#fff;border-bottom-right-radius:2px;}' +
    '.sc-chat-input-area {border-top:0.5px solid var(--sc-card-border,#dde4f0);padding-top:10px;}' +
    '.sc-chat-input {width:100%;border:0.5px solid var(--sc-card-border,#dde4f0);border-radius:8px;padding:8px 10px;font-size:13px;resize:none;font-family:inherit;background:var(--sc-bg-card,#fff);color:var(--sc-text-primary,#1e293b);}' +
    '.sc-chat-input:focus {outline:none;border-color:var(--sc-primary,#1677FF);}' +
    '.sc-chat-actions {display:flex;gap:8px;margin-top:8px;}' +
    '.sc-voice-btn {flex:1;padding:10px;border:0.5px solid var(--sc-primary,#1677FF);border-radius:8px;background:var(--sc-bg-card,#fff);color:var(--sc-primary,#1677FF);font-size:13px;cursor:pointer;text-align:center;}' +
    '.sc-voice-btn:active {background:var(--sc-primary-light,#EAF2FF);}' +
    '.sc-send-btn {padding:10px 16px;background:var(--sc-primary,#1677FF);color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;}' +
    '.sc-chat-done-hint {text-align:center;font-size:12px;color:var(--sc-success,#10b981);margin:10px 0;font-weight:500;}' +
    '.sc-end-practice-btn {display:block;margin:0 auto 10px;background:none;border:0.5px solid var(--sc-primary,#1677FF);color:var(--sc-primary,#1677FF);padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;}' +
    /* Step 4 */
    '.sc-quiz-item {margin-bottom:18px;}' +
    '.sc-quiz-q {font-size:14px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin-bottom:10px;}' +
    '.sc-quiz-options {display:flex;flex-direction:column;gap:8px;}' +
    '.sc-quiz-opt {display:block;width:100%;text-align:left;padding:10px 12px;border:0.5px solid var(--sc-card-border,#dde4f0);border-radius:8px;background:var(--sc-bg-card,#fff);font-size:13px;color:var(--sc-text-primary,#1e293b);cursor:pointer;}' +
    '.sc-quiz-opt:hover:not(:disabled) {border-color:var(--sc-primary,#1677FF);}' +
    '.sc-quiz-opt:disabled {cursor:default;}' +
    '.sc-quiz-opt.correct {border-color:var(--sc-success,#10b981);background:var(--sc-success-light,#ecfdf5);color:#065f46;}' +
    '.sc-quiz-opt.wrong {border-color:#fca5a5;background:#fef2f2;color:#991b1b;}' +
    '.sc-quiz-opt.dimmed {opacity:0.4;}' +
    '.sc-quiz-feedback {font-size:12px;line-height:1.6;margin-top:8px;padding:8px 10px;border-radius:6px;}' +
    '.sc-quiz-feedback.correct {background:var(--sc-success-light,#ecfdf5);color:#065f46;}' +
    '.sc-quiz-feedback.wrong {background:#fef2f2;color:#991b1b;}' +
    '.sc-quiz-check {color:var(--sc-success,#10b981);font-weight:700;}' +
    /* Done page */
    '.sc-done-page {text-align:center;padding-top:30px;}' +
    '.sc-done-big-text {font-size:22px;font-weight:700;color:var(--sc-text-primary,#1e293b);margin-bottom:16px;}' +
    '.sc-done-score-wrap {display:flex;align-items:baseline;justify-content:center;gap:2px;margin-bottom:16px;}' +
    '.sc-done-score {font-size:48px;font-weight:800;color:var(--sc-primary,#1677FF);line-height:1;}' +
    '.sc-done-score-label {font-size:18px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-done-stats {display:flex;flex-direction:column;gap:8px;margin-bottom:16px;padding:0 30px;}' +
    '.sc-done-stat {display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:0.5px solid var(--sc-card-border,#dde4f0);}' +
    '.sc-done-stat-val {color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-done-stat-num {color:var(--sc-text-primary,#1e293b);font-weight:500;}' +
    '.sc-done-streak {font-size:15px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin-bottom:12px;}' +
    '.sc-done-feedback {font-size:13px;line-height:1.7;color:var(--sc-text-primary,#1e293b);margin-bottom:10px;padding:0 20px;}' +
    '.sc-done-sync {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:24px;}' +
    /* ====== 收工复盘页样式 ====== */
    '.sc-review-page {padding-bottom:28px;}' +
    /* greeting */
    '.sc-review-greeting {padding:20px 18px 10px;}' +
    '.sc-review-greet-name {font-size:15px;font-weight:500;color:var(--sc-text-primary,#1e293b);margin:0 0 4px;}' +
    '.sc-review-greet-streak {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin:0;}' +
    /* 战报 strip */
    '.sc-review-report-strip {margin:8px 16px 10px;padding:14px 16px;}' +
    '.sc-report-metrics {display:flex;gap:8px;margin-bottom:10px;}' +
    '.sc-report-metric {flex:1;text-align:center;padding:10px 4px;background:var(--sc-bg-page,#F2F6FC);border-radius:8px;}' +
    '.sc-report-metric-num {display:block;font-size:20px;font-weight:700;color:var(--sc-text-primary,#1e293b);line-height:1.2;}' +
    '.sc-report-metric-label {display:block;font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin-top:2px;}' +
    '.sc-report-changes {display:flex;gap:8px;}' +
    '.sc-report-tag {flex:1;text-align:center;padding:6px 8px;border-radius:8px;font-size:13px;font-weight:600;}' +
    '.sc-report-tag-up {background:#ecfdf5;color:#1AAD7A;}' +
    '.sc-report-tag-down {background:#fef2f2;color:#E24B4A;}' +
    /* toggle card */
    '.sc-review-toggle-card {margin:0 16px 10px;padding:12px 16px 14px;border-radius:12px;}' +
    '.sc-toggle-seg-ctrl {display:flex;background:var(--sc-bg-page,#F2F6FC);border-radius:8px;padding:3px;margin-bottom:14px;}' +
    '.sc-toggle-seg-btn {flex:1;padding:7px 0;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;background:transparent;color:var(--sc-text-secondary,#64748B);transition:all 0.2s;}' +
    '.sc-toggle-seg-btn.active {background:var(--sc-bg-card,#fff);color:#1677FF;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.08);}' +
    '.sc-toggle-bottom-btn {margin-top:10px;}' +
    /* radar legend (keep existing classes) */ +
    '.sc-review-radar-legend {display:flex;justify-content:center;gap:16px;margin-top:-4px;margin-bottom:4px;}' +
    '.sc-review-legend-item {font-size:11px;color:var(--sc-text-secondary,#94a3b8);display:flex;align-items:center;gap:4px;}' +
    '.sc-review-legend-line {display:inline-block;width:14px;height:2px;border-radius:1px;flex-shrink:0;}' +
    '.sc-review-legend-line.today {background:var(--sc-primary,#1677FF);}' +
    '.sc-review-legend-line.yesterday {background:var(--sc-text-secondary,#94a3b8);border-top:1px dashed var(--sc-text-secondary,#94a3b8);height:0;}' +
    /* SOP bars — extensions for comparison (today vs yesterday tick + change tags) */
    '.sc-sop-bar-wrap--tick { overflow: visible; }' +
    '.sc-sop-bar-tick { position: absolute; top: -2px; height: 14px; width: 1px; background: #94A3B8; }' +
    '.sc-sop-chg { font-size: 10px; display: block; }' +
    '.sc-sop-chg.up { color: #1AAD7A; }' +
    '.sc-sop-chg.down { color: #E24B4A; }' +
    '.sc-sop-legend { display: flex; justify-content: center; gap: 16px; margin: 6px 0; }' +
    '.sc-sop-legend-item { font-size: 11px; color: var(--sc-text-secondary, #94a3b8); display: flex; align-items: center; gap: 4px; }' +
    '.sc-sop-legend-bar.today { display: inline-block; width: 12px; height: 6px; border-radius: 2px; background: #1677FF; flex-shrink: 0; }' +
    '.sc-sop-legend-bar.yesterday { display: inline-block; width: 1px; height: 10px; background: #94A3B8; flex-shrink: 0; }' +
    /* tomorrow */
    '.sc-review-tomorrow {margin:0 16px 10px;padding:16px;}' +
    '.sc-review-tomorrow-top {display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}' +
    '.sc-review-tomorrow-title {font-size:12px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-review-tomorrow-body {font-size:13px;line-height:1.7;color:var(--sc-text-primary,#1e293b);margin:0 0 14px;}' +
    '.sc-review-tomorrow-body b {font-weight:600;}' +
    /* footer */
    '.sc-review-footer {text-align:center;padding:14px 16px 4px;}' +
    '.sc-review-footer-text {font-size:14px;color:var(--sc-text-primary,#1e293b);margin:0 0 4px;font-weight:500;}' +
    '.sc-review-footer-sub {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin:0;}' +
    /* Dark */
    '@media (prefers-color-scheme: dark) {' +
    '  .sc-phone-wrapper {--sc-bg-outer:#111827;}' +
    '  .sc-page {--sc-bg-page:#111827;--sc-bg-card:#1a2332;--sc-card-border:#2a3a5c;--sc-text-primary:#e2e8f0;--sc-text-secondary:#94a3b8;--sc-primary:#3b8cff;--sc-primary-light:#1e3a5f;--sc-primary-dark:#60a5fa;--sc-action-tag-border:#2a3a5c;--sc-grid:#1e2d45;--sc-red-light:#3b1a1a;}' +
    '  .sc-btn-solid {background:var(--sc-primary,#3b8cff);}' +
    '  .sc-btn-outline {background:var(--sc-bg-card,#1a2332);color:var(--sc-primary,#3b8cff);border-color:var(--sc-primary,#3b8cff);}' +
    '  .sc-pill-outline {background:var(--sc-primary-light,#1e3a5f);color:var(--sc-primary-dark,#60a5fa);}' +
    '  .sc-pill-solid {background:var(--sc-primary,#3b8cff);}' +
    '  .sc-chat-msg.customer .sc-chat-bubble {background:#1e293b;}' +
    '  .sc-trans-item.coach {background:#1e3a5f;}' +
    '  .sc-trans-item.customer {background:#1e293b;}' +
    '  .sc-task-sub-red {color:#F87171;}' +
    '  .sc-task-deadline {color:#F87171;}' +
    '  .sc-report-metric {background:#1e293b;}' +
    '  .sc-report-tag-up {background:#0a2e1f;color:#34d399;}' +
    '  .sc-report-tag-down {background:#3b1a1a;color:#F87171;}' +
    '  .sc-seg-ctrl {background:#1e293b;}' +
    '  .sc-seg-btn.active {background:#1a2332;color:var(--sc-primary,#3b8cff);}' +
    '  .sc-sop-bar-wrap {background:#1e2d45;}' +
    '  .sc-sop-item.weakest {background:var(--sc-red-light,#3b1a1a);}' +
    '  .sc-toggle-seg-ctrl {background:#1e293b;}' +
    '  .sc-toggle-seg-btn.active {background:#1a2332;color:#3b8cff;}' +
    '  .sc-sop-bar-wrap {background:#1e2d45;}' +
    '  .sc-sop-item.weakest {background:#3b1a1a;}' +
    '  .sc-sop-bar-tick {background:#64748B;}' +
    '}' +
    // ====== 新版首页样式 ======
    // greeting
    '.sc-greeting-new {display:flex;align-items:center;gap:14px;padding:24px 18px 12px;}' +
    '.sc-greeting-avatar {' +
    '  width:44px;height:44px;border-radius:50%;background:var(--sc-primary,#1677FF);' +
    '  color:#fff;font-size:18px;font-weight:600;display:flex;align-items:center;justify-content:center;' +
    '  flex-shrink:0;' +
    '}' +
    '.sc-greeting-name-new {font-size:17px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin:0 0 4px;}' +
    '.sc-greeting-sub-new {font-size:13px;color:var(--sc-text-secondary,#94a3b8);margin:0;}' +
    // sections
    '.sc-section {padding:0 16px;margin-top:20px;}' +
    '.sc-section-title {font-size:14px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin:0 0 10px;padding:0 2px;}' +
    // 关键片段
    '.sc-critical-card {' +
    '  background:var(--sc-bg-card,#fff);border:0.5px solid var(--sc-card-border,#dde4f0);' +
    '  border-radius:12px;padding:16px;' +
    '}' +
    '.sc-critical-meta {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:10px;}' +
    '.sc-critical-text {font-size:14px;color:var(--sc-text-primary,#1e293b);line-height:1.7;margin:0;}' +
    '.sc-highlight-blue {color:var(--sc-primary,#1677FF);font-weight:500;}' +
    // 推荐列表
    '.sc-rec-list {display:flex;flex-direction:column;gap:8px;}' +
    '.sc-rec-item {' +
    '  display:flex;align-items:center;gap:12px;padding:14px 16px;' +
    '  background:var(--sc-bg-card,#fff);border:0.5px solid var(--sc-card-border,#dde4f0);' +
    '  border-radius:12px;' +
    '}' +
    '.sc-rec-icon {font-size:22px;flex-shrink:0;width:28px;text-align:center;}' +
    '.sc-rec-body {flex:1;min-width:0;}' +
    '.sc-rec-title {font-size:14px;font-weight:500;color:var(--sc-text-primary,#1e293b);margin-bottom:4px;}' +
    '.sc-rec-sub {font-size:12px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-rec-arrow {font-size:16px;color:var(--sc-text-secondary,#c0c8d4);flex-shrink:0;}' +
    // 底部导航 — 悬浮胶囊
    '.sc-bottom-nav-wrap {position:sticky;bottom:0;padding:0 16px 28px;z-index:10;flex-shrink:0;margin-top:24px;}' +
    '.sc-bottom-nav {display:flex;align-items:flex-end;justify-content:space-around;position:relative;' +
    'background:var(--sc-bg-card,#fff);border-radius:28px;padding:12px 20px 10px;' +
    'box-shadow:0 4px 20px rgba(0,0,0,0.08),0 0 0 0.5px rgba(0,0,0,0.04);}' +
    '.sc-bottom-nav-item {display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:4px 10px;z-index:1;}' +
    '.sc-bottom-nav-label {font-size:10px;color:#94a3b8;font-weight:500;}' +
    '.sc-bottom-nav-item.active .sc-bottom-nav-label {color:#1677FF;}' +
    // 中间录音按钮 — 比胶囊更大、向上突出
    '.sc-bottom-nav-record {width:56px;height:56px;border-radius:50%;' +
    'background:linear-gradient(135deg,#2D7BFF 0%,#1452E6 100%);' +
    'display:flex;align-items:center;justify-content:center;cursor:pointer;' +
    'box-shadow:0 6px 24px rgba(22,78,230,0.35),0 0 0 4px #F2F6FC;' +
    'position:absolute;top:-20px;left:50%;transform:translateX(-50%);z-index:2;transition:all 0.2s;}' +
    '.sc-bottom-nav-record:active {transform:translateX(-50%) scale(0.95);box-shadow:0 3px 12px rgba(22,78,230,0.25),0 0 0 4px #F2F6FC;}' +
    // dark mode
    '@media (prefers-color-scheme: dark) {' +
    '  .sc-greeting-name-new {color:#e2e8f0;}' +
    '  .sc-critical-card {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-critical-text {color:#e2e8f0;}' +
    '  .sc-rec-item {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-rec-title {color:#e2e8f0;}' +
    '  .sc-bottom-nav {background:#1a2332;}' +
    '  .sc-bottom-nav-record {box-shadow:0 6px 24px rgba(22,78,230,0.35),0 0 0 4px #111827;}' +
    '}' +
    // ====== 五维成长地图 ======
    '.sc-gm-page {min-height:100vh;padding-bottom:32px;}' +
    // 顶部
    '.sc-gm-header {padding:28px 20px 16px;text-align:center;}' +
    '.sc-gm-user-avatar {' +
    '  width:48px;height:48px;border-radius:50%;background:var(--sc-primary,#1677FF);' +
    '  color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;' +
    '  margin:0 auto 12px;' +
    '}' +
    '.sc-gm-header-title {font-size:16px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin-bottom:6px;}' +
    '.sc-gm-header-stat {font-size:13px;color:var(--sc-text-secondary,#94a3b8);}' +
    // 图例
    '.sc-gm-legend {display:flex;justify-content:center;gap:18px;padding:0 20px 16px;}' +
    '.sc-gm-legend-item {display:flex;align-items:center;gap:6px;font-size:12px;color:var(--sc-text-secondary,#64748B);}' +
    '.sc-gm-legend-dot {width:10px;height:10px;border-radius:50%;flex-shrink:0;}' +
    '.sc-gm-legend-dot.passed {background:#1AAD7A;}' +
    '.sc-gm-legend-dot.current {background:var(--sc-primary,#1677FF);}' +
    '.sc-gm-legend-dot.pending {background:var(--sc-gray-locked,#d1d5db);}' +
    // 五条能力线
    '.sc-gm-lines {display:flex;flex-direction:column;gap:12px;padding:0 16px;}' +
    '.sc-gm-line-card {' +
    '  background:var(--sc-bg-card,#fff);border:0.5px solid var(--sc-card-border,#dde4f0);' +
    '  border-radius:12px;padding:14px 14px 16px;' +
    '}' +
    // 行头部
    '.sc-gm-line-head {display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}' +
    '.sc-gm-line-name-wrap {display:flex;align-items:center;gap:8px;}' +
    '.sc-gm-line-name {font-size:14px;font-weight:600;color:var(--sc-text-primary,#1e293b);}' +
    '.sc-gm-line-push-tag {display:inline-block;font-size:10px;color:var(--sc-primary,#1677FF);background:var(--sc-primary-light,#EAF2FF);padding:2px 8px;border-radius:10px;font-weight:500;}' +
    '.sc-gm-line-progress {font-size:12px;color:var(--sc-text-secondary,#94a3b8);font-weight:500;}' +
    // 横向关卡 track
    '.sc-gm-line-track {display:flex;align-items:center;gap:0;overflow-x:auto;padding:0 2px;}' +
    '.sc-gm-node {display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;}' +
    '.sc-gm-node:active {opacity:0.7;}' +
    '.sc-gm-node-dot {' +
    '  width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;' +
    '  font-size:13px;font-weight:600;transition:all 0.2s;' +
    '}' +
    '.sc-gm-node.passed .sc-gm-node-dot {background:#1AAD7A;color:#fff;}' +
    '.sc-gm-node.current .sc-gm-node-dot {background:var(--sc-primary,#1677FF);color:#fff;box-shadow:0 0 0 3px var(--sc-primary-light,#EAF2FF);}' +
    '.sc-gm-node.pending .sc-gm-node-dot {background:transparent;color:var(--sc-gray-locked,#c0c8d4);border:1.5px solid var(--sc-gray-locked,#d1d5db);}' +
    '.sc-gm-node-name {font-size:10px;color:var(--sc-text-secondary,#64748B);text-align:center;max-width:44px;line-height:1.3;white-space:nowrap;}' +
    '.sc-gm-node.current .sc-gm-node-name {color:var(--sc-text-primary,#1e293b);font-weight:500;}' +
    // 关卡连线
    '.sc-gm-node-connector {' +
    '  width:16px;height:1.5px;background:var(--sc-gray-locked,#d1d5db);flex-shrink:0;margin-bottom:16px;' +
    '}' +
    // 底部间距
    '.sc-gm-bottom {height:40px;}' +
    // ====== 半屏弹层 ======
    '.sc-gmsheet-overlay {' +
    '  position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;' +
    '  background:rgba(0,0,0,0.35);' +
    '  display:flex;align-items:flex-end;justify-content:center;' +
    '}' +
    '.sc-gmsheet-card {' +
    '  background:var(--sc-bg-card,#fff);border-radius:20px 20px 0 0;' +
    '  width:375px;max-width:100%;padding:12px 20px 28px;' +
    '  animation:gfSlideUp 0.25s ease-out;' +
    '}' +
    '@keyframes gfSlideUp {from{transform:translateY(100%)}to{transform:translateY(0)}}' +
    '.sc-gmsheet-handle {' +
    '  width:36px;height:4px;background:var(--sc-gray-locked,#d1d5db);border-radius:2px;margin:0 auto 16px;' +
    '}' +
    '.sc-gmsheet-title {font-size:18px;font-weight:700;color:var(--sc-text-primary,#1e293b);margin-bottom:4px;}' +
    '.sc-gmsheet-line {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:18px;}' +
    // 分数行
    '.sc-gmsheet-score-row {display:flex;align-items:baseline;gap:4px;margin-bottom:8px;}' +
    '.sc-gmsheet-score-label {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin-right:8px;}' +
    '.sc-gmsheet-score-num {font-size:24px;font-weight:700;color:var(--sc-text-primary,#1e293b);}' +
    '.sc-gmsheet-score-divider {font-size:14px;color:var(--sc-gray-locked,#c0c8d4);margin:0 4px;}' +
    '.sc-gmsheet-score-target {font-size:12px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-gmsheet-bar-wrap {' +
    '  height:6px;background:var(--sc-grid,#E8ECF0);border-radius:3px;overflow:hidden;margin-bottom:8px;' +
    '}' +
    '.sc-gmsheet-bar-fill {' +
    '  height:100%;background:var(--sc-primary,#1677FF);border-radius:3px;transition:width 0.4s;' +
    '}' +
    '.sc-gmsheet-bar-fill.passed {background:#1AAD7A;}' +
    '.sc-gmsheet-status {font-size:13px;color:var(--sc-primary,#1677FF);font-weight:500;margin-bottom:18px;}' +
    '.sc-gmsheet-status.passed {color:#1AAD7A;}' +
    // 要做什么
    '.sc-gmsheet-desc {font-size:13px;color:var(--sc-text-secondary,#64748B);line-height:1.6;margin-bottom:16px;}' +
    '.sc-gmsheet-actions-label {font-size:12px;color:var(--sc-text-secondary,#94a3b8);font-weight:600;margin-bottom:10px;}' +
    '.sc-gmsheet-step-list {display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}' +
    '.sc-gmsheet-step-item {' +
    '  display:flex;align-items:center;gap:10px;padding:10px 12px;' +
    '  background:var(--sc-bg-page,#F2F6FC);border-radius:10px;' +
    '}' +
    '.sc-gmsheet-step-icon {font-size:16px;flex-shrink:0;}' +
    '.sc-gmsheet-step-text {font-size:13px;color:var(--sc-text-primary,#1e293b);font-weight:500;}' +
    // 按钮
    '.sc-gmsheet-btn {' +
    '  display:block;width:100%;padding:14px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:10px;transition:all 0.2s;' +
    '}' +
    '.sc-gmsheet-btn.solid {background:var(--sc-primary,#1677FF);color:#fff;border:none;}' +
    '.sc-gmsheet-btn.solid:active {background:var(--sc-primary-dark,#0E5FD8);}' +
    '.sc-gmsheet-btn.outline {background:transparent;color:var(--sc-primary,#1677FF);border:1px solid var(--sc-primary,#1677FF);}' +
    '.sc-gmsheet-btn.outline:active {background:var(--sc-primary-light,#EAF2FF);}' +
    '.sc-gmsheet-close {background:none;border:none;color:var(--sc-text-secondary,#94a3b8);font-size:13px;cursor:pointer;padding:4px;}' +
    // 任务页
    '.sc-gm-task-notfound {text-align:center;padding:80px 20px;color:var(--sc-text-secondary,#64748B);font-size:15px;}' +
    '.sc-gm-task-page {min-height:100vh;}' +
    '.sc-gm-task-header {padding:24px 20px 8px;}' +
    '.sc-gm-task-breadcrumb {font-size:12px;color:var(--sc-text-secondary,#94a3b8);margin-bottom:8px;}' +
    '.sc-gm-task-title {font-size:20px;font-weight:700;color:var(--sc-text-primary,#1e293b);margin:0 0 8px;}' +
    '.sc-gm-task-score {font-size:13px;color:var(--sc-text-secondary,#64748B);}' +
    '.sc-gm-task-steps {padding:16px 20px;display:flex;flex-direction:column;gap:8px;}' +
    '.sc-gm-task-step {' +
    '  display:flex;align-items:center;gap:14px;padding:14px 16px;cursor:pointer;' +
    '  background:var(--sc-bg-card,#fff);border:0.5px solid var(--sc-card-border,#dde4f0);border-radius:12px;transition:all 0.2s;' +
    '}' +
    '.sc-gm-task-step:active {background:var(--sc-bg-page,#F2F6FC);}' +
    '.sc-gm-task-step-num {' +
    '  width:28px;height:28px;border-radius:50%;background:var(--sc-primary-light,#EAF2FF);' +
    '  color:var(--sc-primary,#1677FF);font-size:13px;font-weight:700;' +
    '  display:flex;align-items:center;justify-content:center;flex-shrink:0;' +
    '}' +
    '.sc-gm-task-step-body {flex:1;}' +
    '.sc-gm-task-step-title {font-size:14px;font-weight:600;color:var(--sc-text-primary,#1e293b);margin-bottom:2px;}' +
    '.sc-gm-task-step-desc {font-size:12px;color:var(--sc-text-secondary,#94a3b8);}' +
    '.sc-gm-task-step-go {font-size:16px;color:var(--sc-text-secondary,#94a3b8);flex-shrink:0;}' +
    // 深色模式
    '@media (prefers-color-scheme:dark){' +
    '  .sc-gm-line-card {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-gm-header-title {color:#e2e8f0;}' +
    '  .sc-gm-line-name {color:#e2e8f0;}' +
    '  .sc-gm-node.current .sc-gm-node-name {color:#e2e8f0;}' +
    '  .sc-gm-line-push-tag {background:rgba(59,130,246,0.15);}' +
    '  .sc-gm-node-connector {background:rgba(255,255,255,0.1);}' +
    '  .sc-gmsheet-card {background:#1a2332;}' +
    '  .sc-gmsheet-title {color:#e2e8f0;}' +
    '  .sc-gmsheet-score-num {color:#e2e8f0;}' +
    '  .sc-gmsheet-step-item {background:#15202b;}' +
    '  .sc-gmsheet-step-text {color:#e2e8f0;}' +
    '  .sc-gmsheet-desc {color:#cbd5e1;}' +
    '  .sc-gmsheet-btn.outline {color:#3b8cff;}' +
    '  .sc-gm-task-step {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-gm-task-step:active {background:#15202b;}' +
    '  .sc-gm-task-step-title {color:#e2e8f0;}' +
    '}' +
    // ====== SOP 成长地图样式 ======
    '.sc-sm-page {min-height:100vh;background:#F4F7FB;}' +
    '.sc-sm-header {display:flex;align-items:center;gap:14px;padding:20px 20px 12px;}' +
    '.sc-sm-avatar {width:40px;height:40px;border-radius:50%;background:#1677FF;color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}' +
    '.sc-sm-header-info {flex:1;}' +
    '.sc-sm-title {font-size:16px;font-weight:600;color:#1E293B;margin-bottom:2px;}' +
    '.sc-sm-stat {font-size:12px;color:#94A3B8;}' +
    '.sc-sm-stat strong {color:#1677FF;font-weight:600;}' +
    '.sc-sm-progress-bar {height:3px;background:#E8ECF2;margin:0 20px 14px;border-radius:2px;overflow:hidden;}' +
    '.sc-sm-progress-fill {height:100%;background:#1677FF;border-radius:2px;transition:width 0.4s;}' +
    '.sc-sm-legend {display:flex;justify-content:center;gap:20px;padding:0 20px 8px;}' +
    '.sc-sm-legend-it {display:flex;align-items:center;gap:6px;font-size:11px;color:#94A3B8;}' +
    '.sc-sm-legend-d {width:8px;height:8px;border-radius:50%;flex-shrink:0;}' +
    '.sc-sm-legend-d.passed {background:#7BB5F0;}' +
    '.sc-sm-legend-d.current {background:#1677FF;box-shadow:0 0 0 2px rgba(22,119,255,0.3);}' +
    '.sc-sm-legend-d.pending {background:#E0E0E0;}' +
    '.sc-sm-svg-wrap {padding:0 0 24px;overflow-x:auto;}' +
    '.sc-sm-svg {width:100%;max-width:375px;display:block;margin:0 auto;}' +
    // ---- SOP 章节卡片列表 ----
    '.sc-sop-list {padding:0 16px 32px;display:flex;flex-direction:column;gap:10px;}' +
    '.sc-sop-chapter {background:#fff;border-radius:12px;overflow:hidden;border:1px solid #EDF0F5;transition:box-shadow 0.2s;}' +
    '.sc-sop-chapter.current {border-color:#C5D9F5;box-shadow:0 0 0 3px rgba(22,119,255,0.06);}' +
    '.sc-sop-chapter.passed {border-color:#D6E8FB;}' +
    '.sc-sop-chapter-head {display:flex;align-items:center;gap:10px;padding:14px 14px 14px 0;cursor:pointer;position:relative;min-height:56px;}' +
    '.sc-sop-chapter-head:active {background:#FAFBFD;}' +
    '.sc-sop-chapter-bar {width:3px;height:100%;position:absolute;left:0;top:0;border-radius:0 2px 2px 0;}' +
    '.sc-sop-chapter-dot {width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0;margin-left:14px;}' +
    '.sc-sop-chapter-dot.passed {background:#7BB5F0;color:#fff;}' +
    '.sc-sop-chapter-dot.current {background:#1677FF;color:#fff;}' +
    '.sc-sop-chapter-dot.pending {background:#E0E0E0;color:#9E9E9E;}' +
    '.sc-sop-chapter-name {flex:1;font-size:14px;font-weight:600;color:#1A2236;}' +
    '.sc-sop-chapter-stat {font-size:11px;color:#9E9E9E;white-space:nowrap;}' +
    '.sc-sop-chapter-stat.passed {color:#7BB5F0;}' +
    '.sc-sop-chapter-stat.current {color:#1677FF;font-weight:600;}' +
    '.sc-sop-chapter-arrow {font-size:12px;color:#BDBDBD;transition:transform 0.25s;flex-shrink:0;padding-right:4px;}' +
    '.sc-sop-chapter-arrow.expanded {transform:rotate(180deg);}' +
    '.sc-sop-chapter-body {max-height:0;overflow:hidden;transition:max-height 0.35s ease;}' +
    '.sc-sop-chapter-body.expanded {max-height:600px;}' +
    '.sc-sop-subs {padding:0 14px 0 42px;display:flex;flex-direction:column;}' +
    '.sc-sop-sub {display:flex;align-items:stretch;gap:10px;cursor:pointer;position:relative;}' +
    '.sc-sop-sub:active {opacity:0.7;}' +
    '.sc-sop-sub-track {display:flex;flex-direction:column;align-items:center;width:28px;flex-shrink:0;}' +
    '.sc-sop-sub-dot {width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0;margin-top:8px;}' +
    '.sc-sop-sub-dot.passed {background:#7BB5F0;color:#fff;}' +
    '.sc-sop-sub-dot.current {background:#1677FF;color:#fff;}' +
    '.sc-sop-sub-dot.current.large {width:26px;height:26px;font-size:12px;box-shadow:0 0 0 4px rgba(22,119,255,0.2);animation:sopPulse 2s ease-in-out infinite;}' +
    '.sc-sop-sub-dot.pending {background:#E0E0E0;color:#9E9E9E;}' +
    '.sc-sop-sub-line {width:2px;flex:1;min-height:40px;background:#E8ECF0;margin:4px 0;}' +
    '.sc-sop-sub-info {flex:1;display:flex;align-items:center;gap:6px;padding:10px 0;min-height:60px;}' +
    '.sc-sop-sub-indicator {font-size:10px;color:#1677FF;flex-shrink:0;animation:sopBlink 1.2s ease-in-out infinite;}' +
    '.sc-sop-sub-name {font-size:13px;color:#1A2236;font-weight:500;}' +
    '.sc-sop-sub-name.passed {color:#7BB5F0;}' +
    '.sc-sop-sub-name.current {color:#1A2236;font-weight:700;}' +
    '.sc-sop-sub-name.current.large {font-size:14px;}' +
    '.sc-sop-sub-score {font-size:11px;color:#9E9E9E;margin-left:auto;white-space:nowrap;font-weight:500;}' +
    '.sc-sop-sub-score.passed {color:#7BB5F0;}' +
    '.sc-sop-sub-score.current {color:#1677FF;font-weight:600;}' +
    '.sc-sop-enter-btn {display:block;width:calc(100% - 28px);margin:8px 14px 14px 42px;padding:10px 0;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;text-align:center;transition:all 0.2s;}' +
    '.sc-sop-enter-btn.solid {background:#1677FF;color:#fff;border:none;}' +
    '.sc-sop-enter-btn.solid:active {background:#0E5FD8;}' +
    '.sc-sop-enter-btn.outline {background:transparent;color:#7BB5F0;border:1px solid #7BB5F0;}' +
    '.sc-sop-enter-btn.outline:active {background:#EAF2FF;}' +
    '@keyframes sopPulse {0%,100%{box-shadow:0 0 0 4px rgba(22,119,255,0.2)}50%{box-shadow:0 0 0 10px rgba(22,119,255,0.06)}}' +
    '@keyframes sopBlink {0%,100%{opacity:1}50%{opacity:0.3}}' +
    '.sc-sm-node-click {cursor:pointer;}' +
    // 半屏弹层（共用 sms 前缀避免冲突）
    '.sc-sms-overlay {position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:rgba(0,0,0,0.35);display:flex;align-items:flex-end;justify-content:center;}' +
    '.sc-sms-card {background:#fff;border-radius:20px 20px 0 0;width:375px;max-width:100%;padding:12px 20px 28px;animation:gfSlideUp 0.25s ease-out;}' +
    '.sc-sms-handle {width:36px;height:4px;background:#D1D5DB;border-radius:2px;margin:0 auto 16px;}' +
    '.sc-sms-title {font-size:18px;font-weight:700;color:#1E293B;margin-bottom:4px;}' +
    '.sc-sms-sub {font-size:12px;color:#94A3B8;margin-bottom:18px;}' +
    '.sc-sms-score-row {display:flex;align-items:baseline;gap:4px;margin-bottom:8px;}' +
    '.sc-sms-score-label {font-size:12px;color:#94A3B8;margin-right:8px;}' +
    '.sc-sms-score-num {font-size:24px;font-weight:700;color:#1E293B;}' +
    '.sc-sms-score-div {font-size:14px;color:#CBD5E1;margin:0 4px;}' +
    '.sc-sms-score-target {font-size:12px;color:#94A3B8;}' +
    '.sc-sms-bar {height:6px;background:#E8ECF0;border-radius:3px;overflow:hidden;margin-bottom:8px;}' +
    '.sc-sms-bar-fill {height:100%;background:#1677FF;border-radius:3px;transition:width 0.4s;}' +
    '.sc-sms-bar-fill.passed {background:#1AAD7A;}' +
    '.sc-sms-status {font-size:13px;color:#1677FF;font-weight:500;margin-bottom:18px;}' +
    '.sc-sms-status.passed {color:#1AAD7A;}' +
    '.sc-sms-label {font-size:12px;color:#94A3B8;font-weight:600;margin-bottom:10px;}' +
    '.sc-sms-step {display:flex;align-items:center;gap:10px;padding:10px 12px;background:#F4F7FB;border-radius:10px;margin-bottom:20px;}' +
    '.sc-sms-step-icon {font-size:16px;flex-shrink:0;}' +
    '.sc-sms-step-text {font-size:13px;color:#1E293B;font-weight:500;}' +
    '.sc-sms-btn {display:block;width:100%;padding:14px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:10px;transition:all 0.2s;}' +
    '.sc-sms-btn.solid {background:#1677FF;color:#fff;border:none;}' +
    '.sc-sms-btn.solid:active {background:#0E5FD8;}' +
    '.sc-sms-btn.outline {background:transparent;color:#1677FF;border:1px solid #1677FF;}' +
    '.sc-sms-btn.outline:active {background:#EAF2FF;}' +
    '.sc-sms-close {background:none;border:none;color:#94A3B8;font-size:13px;cursor:pointer;padding:4px;}' +
    '.sc-sms-sub-list {display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}' +
    '.sc-sms-sub-item {display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#F4F7FB;border-radius:8px;cursor:pointer;}' +
    '.sc-sms-sub-item:active {opacity:0.7;}' +
    '.sc-sms-sub-item.passed {background:#ECFDF5;}' +
    '.sc-sms-sub-name {font-size:13px;color:#1E293B;font-weight:500;}' +
    '.sc-sms-sub-score {font-size:12px;color:#94A3B8;font-weight:600;}' +
    '.sc-sms-sub-score.passed {color:#1AAD7A;}' +
    '.sc-sms-step-go {font-size:14px;color:#94A3B8;flex-shrink:0;margin-left:auto;}' +
    // 任务页
    '.sc-sm-task-page {min-height:100vh;}' +
    '.sc-sm-task-head {padding:24px 20px 8px;}' +
    '.sc-sm-task-bc {font-size:12px;color:#94A3B8;margin-bottom:8px;}' +
    '.sc-sm-task-title {font-size:20px;font-weight:700;color:#1E293B;margin:0 0 8px;}' +
    '.sc-sm-task-score {font-size:13px;color:#94A3B8;}' +
    '.sc-sm-task-steps {padding:16px 20px;display:flex;flex-direction:column;gap:8px;}' +
    '.sc-sm-task-step {display:flex;align-items:center;gap:14px;padding:14px 16px;cursor:pointer;background:#fff;border:0.5px solid #DDE4F0;border-radius:12px;transition:all 0.2s;}' +
    '.sc-sm-task-step:active {background:#F4F7FB;}' +
    '.sc-sm-task-num {width:28px;height:28px;border-radius:50%;background:#EAF2FF;color:#1677FF;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}' +
    '.sc-sm-task-body {flex:1;}' +
    '.sc-sm-task-st {font-size:14px;font-weight:600;color:#1E293B;margin-bottom:2px;}' +
    '.sc-sm-task-sd {font-size:12px;color:#94A3B8;}' +
    '.sc-sm-task-go {font-size:16px;color:#94A3B8;flex-shrink:0;}' +
    '.sc-sm-notfound {text-align:center;padding:80px 20px;color:#94A3B8;font-size:15px;}' +
    // 深色模式
    '@media (prefers-color-scheme:dark){' +
    '  .sc-sm-page {background:#111827;}' +
    '  .sc-sm-title {color:#e2e8f0;}' +
    '  .sc-sms-card {background:#1a2332;}' +
    '  .sc-sms-title {color:#e2e8f0;}' +
    '  .sc-sms-score-num {color:#e2e8f0;}' +
    '  .sc-sms-step {background:#15202b;}' +
    '  .sc-sms-step-text {color:#e2e8f0;}' +
    '  .sc-sms-btn.outline {color:#3b8cff;}' +
    '  .sc-sms-sub-item {background:#15202b;}' +
    '  .sc-sms-sub-item.passed {background:rgba(26,173,122,0.12);}' +
    '  .sc-sms-sub-name {color:#e2e8f0;}' +
    '  .sc-sms-sub-score.passed {color:#34d399;}' +
    '  .sc-sm-task-step {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-sm-task-step:active {background:#15202b;}' +
    '  .sc-sm-task-st {color:#e2e8f0;}' +
    '  .sc-sm-task-head .sc-sm-task-title {color:#e2e8f0;}' +
    '  .sc-sop-chapter {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-sop-chapter.passed {border-color:rgba(129,199,132,0.2);}' +
    '  .sc-sop-chapter.current {border-color:rgba(255,152,0,0.2);}' +
    '  .sc-sop-chapter-head:active {background:rgba(255,255,255,0.03);}' +
    '  .sc-sop-chapter-name {color:#e2e8f0;}' +
    '  .sc-sop-sub-name {color:#e2e8f0;}' +
    '  .sc-sop-sub-name.current {color:#e2e8f0;}' +
    '  .sc-sop-sub-line {background:rgba(255,255,255,0.08);}' +
    '  .sc-sop-enter-btn.outline {color:#7BB5F0;border-color:#7BB5F0;}' +
    '  .sc-sop-enter-btn.outline:active {background:rgba(22,119,255,0.08);}' +
    '}' +
    // ====== V3 首页样式 ======
    '.sc-page--v3 {background:#F5F6FA;min-height:100vh;display:flex;flex-direction:column;padding-bottom:0;}' +
    // iOS 状态栏
    '.sc-ios-bar {display:flex;justify-content:space-between;align-items:center;padding:8px 24px 8px 24px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;}' +
    '.sc-ios-time {font-size:15px;font-weight:600;color:#1e293b;}' +
    '.sc-ios-icons {display:flex;align-items:center;gap:6px;}' +
    '.sc-ios-signal,.sc-ios-wifi,.sc-ios-battery {display:block;flex-shrink:0;}' +
        // 顶部导航栏
    '.sc-coach-nav {display:flex;align-items:center;padding:10px 16px;gap:8px;}' +
    '.sc-coach-nav-back {background:none;border:none;font-size:20px;color:var(--sc-text-primary,#1e293b);cursor:pointer;padding:4px;line-height:1;flex-shrink:0;}' +
    '.sc-coach-nav-title {flex:1;font-size:17px;font-weight:600;color:var(--sc-text-primary,#1e293b);text-align:center;}' +
    '.sc-coach-nav-spacer {width:32px;flex-shrink:0;}' +
	    // 问候区
	    '.sc-v3-greeting {padding:8px 20px 18px;}' +
	    '.sc-v3-greeting-name {font-size:22px;font-weight:700;color:#1e293b;margin:0 0 6px;line-height:1.3;}' +
	    '.sc-v3-greeting-sub {font-size:13px;color:#94a3b8;margin:0;font-weight:400;line-height:1.5;}' +
	    '.sc-v3-greeting-sub strong {color:#64748b;font-weight:600;}' +
	    // 任务区容器（与雷达卡视觉对等）
    '.sc-v3-task-area {margin:10px 16px 0;padding:16px;background:var(--sc-bg-card,#fff);border:0.5px solid rgba(0,0,0,0.06);border-radius:12px;}' +
	    // 区域标题行
    '.sc-v3-task-header {padding-bottom:8px;}' +
    '.sc-v3-task-header-name {font-size:22px;font-weight:700;color:var(--sc-text-primary,#1e293b);margin:0 0 6px;line-height:1.3;}' +
    '.sc-v3-task-header-sub {font-size:13px;color:var(--sc-text-secondary,#94a3b8);margin:0;font-weight:400;line-height:1.5;}' +
    '.sc-v3-task-header-sub strong {color:var(--sc-text-secondary,#64748b);font-weight:600;}' +
	    // 0.5px 分割线（行与行之间）
    '.sc-v3-task-divider {height:0.5px;background:rgba(0,0,0,0.06);}' +
    // 分数锚点任务行 — 三段式横向布局，垂直居中
    '.sc-v3-task-row {display:flex;align-items:center;padding:14px 0;cursor:pointer;transition:opacity 0.15s;gap:10px;}' +
    '.sc-v3-task-row:active {opacity:0.7;}' +
    // 左侧分数块（固定宽 54px，居中对齐）
    '.sc-v3-task-score {width:54px;display:flex;flex-direction:column;align-items:center;flex-shrink:0;}' +
    '.sc-v3-task-score-num {font-size:24px;font-weight:500;line-height:1.2;}' +
    '.sc-v3-task-score-pill {font-size:11px;font-weight:500;color:#378ADD;background:rgba(55,138,221,0.08);padding:3px 8px;border-radius:8px;line-height:1.4;}' +
    '.sc-v3-task-score-label {font-size:11px;color:var(--sc-text-secondary,#94a3b8);margin-top:2px;font-weight:400;}' +
    // 中间文字区
    '.sc-v3-task-text {flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}' +
    // 先练这个标签
    '.sc-v3-task-primary-tag {display:inline-block;font-size:11px;color:#378ADD;background:rgba(55,138,221,0.08);padding:2px 8px;border-radius:8px;font-weight:500;align-self:flex-start;}' +
    // 中间标题
    '.sc-v3-task-title {font-size:13px;font-weight:500;color:var(--sc-text-primary,#1e293b);line-height:1.55;}' +
    // 第二行文案
    '.sc-v3-task-sub {font-size:12px;font-weight:400;color:var(--sc-text-secondary,#94a3b8);display:flex;align-items:center;gap:4px;}' +
    '.sc-v3-task-sub--gain {color:#1D9E75;}' +
    '.sc-v3-task-sub-icon {width:14px;height:14px;flex-shrink:0;}' +
    // 右侧动词链接 — 13px 主题蓝 + chevron，由 actionType 驱动
    '.sc-v3-task-link {font-size:13px;font-weight:500;color:var(--sc-primary,#1677FF);white-space:nowrap;flex-shrink:0;}' +
    // ====== 任务详情页 ======
    '.sc-td-page {background:#f5f6f8;min-height:100vh;display:flex;flex-direction:column;}' +
    '.sc-td-nav {display:flex;align-items:center;padding:8px 16px;gap:8px;flex-shrink:0;}' +
    '.sc-td-back {width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#1a1a1a;background:none;border:none;padding:0;flex-shrink:0;}' +
    '.sc-td-back svg {width:20px;height:20px;}' +
    '.sc-td-nav-title {font-size:17px;font-weight:600;color:#1a1a1a;}' +
    '.sc-td-content {flex:1;overflow-y:auto;padding:0 16px 20px;-webkit-overflow-scrolling:touch;}' +
    '.sc-td-content::-webkit-scrollbar {display:none;}' +
    '.sc-td-title-section {padding:8px 0 18px;}' +
    '.sc-td-eyebrow {font-size:12px;color:#8e8e93;margin-bottom:8px;letter-spacing:.2px;}' +
    '.sc-td-main-title {font-size:22px;font-weight:700;color:#1a1a1a;line-height:1.3;margin:0 0 8px;letter-spacing:.3px;}' +
    '.sc-td-subtitle {font-size:13px;color:#8e8e93;line-height:1.4;}' +
    '.sc-td-card {background:#fff;border:1px solid #e5e5ea;border-radius:14px;padding:16px;margin-bottom:14px;}' +
    '.sc-td-card-header {margin-bottom:18px;}' +
    '.sc-td-card-header-line1 {font-size:14px;color:#1a1a1a;font-weight:500;line-height:1.5;}' +
    '.sc-td-card-header-line2 {font-size:18px;color:#e8553a;font-weight:700;line-height:1.4;margin-top:2px;}' +
    // 聊天气泡区
    '.sc-td-chat {margin-bottom:14px;}' +
    // 点评区
    '.sc-td-critique {background:#fff9f0;border:1px solid #ffe4c4;border-radius:10px;padding:12px 14px;margin-bottom:4px;font-size:13px;color:#8b6914;line-height:1.7;}' +
    '.sc-td-critique-label {display:inline-block;font-size:11px;font-weight:700;color:#d4891a;background:#fff0d4;padding:2px 8px;border-radius:4px;margin-right:8px;}' +
    '.sc-td-chat-row {margin-bottom:12px;}' +
    '.sc-td-chat-label {font-size:11px;color:#8e8e93;margin-bottom:4px;}' +
    // 客户气泡（左侧）
    '.sc-td-chat-row--customer .sc-td-chat-bubble {display:inline-block;max-width:85%;background:#f1f1f4;border-radius:6px 16px 16px 16px;padding:10px 14px;font-size:14px;color:#3a3a3c;line-height:1.6;}' +
    // 你的语音气泡（右侧）
    '.sc-td-chat-row--you {text-align:right;}' +
    '.sc-td-chat-bubble--you {background:#e8f0fe;color:#1a1a1a;border-radius:16px 6px 16px 16px;}' +
    // 音频小条（文字气泡下方）
    '.sc-td-audio-mini {display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:8px 12px;background:#f0f4ff;border:1px solid #d6e4ff;border-radius:10px;cursor:pointer;user-select:none;transition:background .15s;}' +
    '.sc-td-audio-mini:active {background:#e0eaff;}' +
    '.sc-td-audio-mini.sc-td-audio-playing {background:#e0eaff;border-color:#1677FF;}' +
    // 播放按钮
    '.sc-td-audio-play {display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#1677FF;flex-shrink:0;color:#fff;}' +
    '.sc-td-audio-play svg {width:12px;height:12px;}' +
    // 波形动画
    '.sc-td-audio-wave {display:flex;align-items:flex-end;gap:2px;height:16px;flex:1;min-width:24px;}' +
    '.sc-td-audio-bar {display:block;width:3px;background:#1677FF;border-radius:2px;animation:sc-td-wave 0.8s ease-in-out infinite alternate paused;}' +
    '.sc-td-audio-bar:nth-child(1) {height:40%;}' +
    '.sc-td-audio-bar:nth-child(2) {height:70%;}' +
    '.sc-td-audio-bar:nth-child(3) {height:100%;}' +
    '.sc-td-audio-bar:nth-child(4) {height:55%;}' +
    '@keyframes sc-td-wave {0%{opacity:.4;transform:scaleY(.6);}100%{opacity:1;transform:scaleY(1);}}' +
    // 时长标签
    '.sc-td-audio-dur {font-size:11px;color:#1677FF;flex-shrink:0;font-weight:600;}' +
    '.sc-td-divider {height:1px;background:#e5e5ea;margin:0 0 14px;}' +
    '.sc-td-ref-header-row {display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;}' +
    '.sc-td-ref-label {font-size:12px;color:#1677FF;font-weight:600;}' +
    '.sc-td-ref-source {font-size:11px;color:#aeaeb2;}' +
    '.sc-td-ref-body {font-size:16px;color:#1a1a1a;font-weight:600;line-height:1.5;}' +
    '.sc-td-ref-footnote {font-size:11px;color:#aeaeb2;margin-top:6px;line-height:1.4;}' +
    '.sc-td-highlight {color:#1677FF;}' +
    '.sc-td-bottom {flex-shrink:0;background:#f5f6f8;padding:14px 16px 24px;border-top:1px solid #e5e5ea;}' +
    '.sc-td-cta-text {font-size:13px;color:#8e8e93;text-align:center;margin-bottom:10px;}' +
    '.sc-td-cta-btn {display:block;width:100%;padding:13px 0;background:#1677FF;color:#fff;font-size:16px;font-weight:600;border:none;border-radius:12px;cursor:pointer;text-align:center;letter-spacing:.5px;transition:background .15s;}' +
    '.sc-td-cta-btn:active {background:#1468e0;}' +
    '.sc-td-notfound {text-align:center;padding:80px 20px;color:#94a3b8;font-size:15px;}' +
    // 总部学习资料入口
    '.sc-v3-hq-materials {padding:16px 16px 28px;}' +
    '.sc-v3-hq-materials-link {display:flex;align-items:center;gap:8px;text-decoration:none;padding:12px 16px;border-radius:12px;background:var(--sc-bg-card,#fff);border:0.5px solid rgba(0,0,0,0.06);color:#64748b;font-size:13px;transition:all 0.15s;}' +
    '.sc-v3-hq-materials-link:active {background:#f8fafc;border-color:#cbd5e1;}' +
    '.sc-v3-hq-materials-text {flex:1;}' +
    '.sc-v3-hq-materials-arrow {color:#94a3b8;}' +
	    // 深色模式：V3 + task-detail
    '@media (prefers-color-scheme:dark){' +
    '  :root {--sc-danger:#F87171;--sc-warning:#FBBF24;}' +
    '  .sc-page--v3 {background:#111827;}' +
    '  .sc-v3-greeting-name {color:#e2e8f0;}' +
    '  .sc-v3-greeting-sub strong {color:#94a3b8;}' +
    '  .sc-v3-task-area {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-v3-task-header-name {color:#e2e8f0;}' +
    '  .sc-v3-task-header-sub {color:#64748b;}' +
    '  .sc-v3-task-header-sub strong {color:#94a3b8;}' +
    '  .sc-v3-task-divider {background:rgba(255,255,255,0.06);}' +
    '  .sc-v3-task-title {color:#e2e8f0;}' +
    '  .sc-v3-task-score-label {color:#64748b;}' +
    '  .sc-v3-task-link {color:var(--sc-primary,#3b8cff);}' +
    '  .sc-v3-task-sub {color:#64748b;}' +
    '  .sc-v3-task-sub--gain {color:#1D9E75;}' +
    '  .sc-v3-task-primary-tag {color:#3b8cff;background:rgba(59,140,255,0.12);}' +

    '  .sc-v3-hq-materials-link {background:#1a2332;border-color:rgba(255,255,255,0.06);color:#94a3b8;}' +
    '  .sc-v3-hq-materials-link:active {background:#1e293b;}' +
    '  .sc-v3-hq-materials-arrow {color:#64748b;}' +

    '  .sc-coach-nav-back {color:#e2e8f0;}' +
    '  .sc-coach-nav-title {color:#e2e8f0;}' +
    '  .sc-ios-time {color:#e2e8f0;}' +
    '  .sc-ios-signal rect,.sc-ios-battery rect,.sc-ios-battery path {stroke:#e2e8f0;fill:#e2e8f0;}' +
    '  .sc-ios-wifi path {stroke:#e2e8f0;}' +
    '  .sc-ios-wifi circle {fill:#e2e8f0;}' +
    '  .sc-td-page {background:#111827;}' +
    '  .sc-td-nav-title {color:#e2e8f0;}' +
    '  .sc-td-back {color:#e2e8f0;}' +
    '  .sc-td-main-title {color:#e2e8f0;}' +
    '  .sc-td-card-header-line1 {color:#cbd5e1;}' +
    '  .sc-td-card-header-line2 {color:#f87171;}' +
    '  .sc-td-chat-row--customer .sc-td-chat-bubble {background:rgba(255,255,255,0.08);color:#cbd5e1;}' +
    '  .sc-td-chat-bubble--you {background:rgba(22,119,255,0.15);color:#e2e8f0;}' +
    '  .sc-td-audio-mini {background:rgba(22,119,255,0.08);border-color:rgba(22,119,255,0.2);}' +
    '  .sc-td-critique {background:rgba(255,200,100,0.08);border-color:rgba(255,200,100,0.15);color:#cba050;}' +
    '  .sc-td-critique-label {background:rgba(255,200,100,0.15);color:#d4a030;}' +
    '  .sc-td-ref-body {color:#e2e8f0;}' +
    '  .sc-td-ref-footnote {color:#64748b;}' +
    '  .sc-td-card {background:#1a2332;border-color:rgba(255,255,255,0.06);}' +
    '  .sc-td-divider {background:rgba(255,255,255,0.08);}' +
    '  .sc-td-bottom {background:#111827;border-color:rgba(255,255,255,0.06);}' +
    '}' +
  '</style>';
}

// ====== 事件绑定 ======
(function() {
  var _prev = window.bindPageEvents;
  window.bindPageEvents = function() {
    if (_prev) _prev();
    document.querySelectorAll('.sc-btn[data-panel]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var panelId = this.dataset.panel;
        var prefix = isCoachV2() ? '#coach-v2-' : '#sales-coach-';
        // 「能力提升」在 sales-coach 模式下跳转到新的四步面板
        if (!isCoachV2() && panelId === 'p2') {
          location.hash = '#sales-coach-ability-s1';
          return;
        }
        location.hash = prefix + panelId + '-s1';
      });
    });
    // Step 1 scroll-to-enable for MG4
    var stepContent = document.querySelector('.sc-step-read');
    if (stepContent) {
      var step1Btn = document.getElementById('step1Btn');
      if (step1Btn && step1Btn.disabled) {
        var checkScroll = function() {
          if (stepContent.scrollTop + stepContent.clientHeight >= stepContent.scrollHeight - 60) {
            step1Btn.disabled = false;
            stepContent.removeEventListener('scroll', checkScroll);
          }
        };
        stepContent.addEventListener('scroll', checkScroll);
        setTimeout(function() { if (step1Btn) step1Btn.disabled = false; }, 5000);
      }
    }
    // 收工复盘 · SOP 补强按钮 → 进入邀约试驾对练
    var sopBtn = document.getElementById('reviewSopBtn');
    if (sopBtn) {
      sopBtn.addEventListener('click', function() {
        location.hash = '#coach-v2-p3-s1';
      });
    }
    // 收工复盘 · 看同行高分示范 → 看销冠怎么做
    var peerBtn = document.getElementById('reviewPeerBtn');
    if (peerBtn) {
      peerBtn.addEventListener('click', function() {
        location.hash = '#sales-coach-ability-s2';
      });
    }
    // 收工复盘 · 明天开工提醒我（暂放 toast）
    var tomorrowBtn = document.getElementById('reviewTomorrowBtn');
    if (tomorrowBtn) {
      tomorrowBtn.addEventListener('click', function() {
        alert('已设置明天开工提醒');
      });
    }
  };
})();




// ====== SOP 成长地图 ======
var SOP_STAGES = [
  { id: 'greeting', order: 1, name: '迎接准备', subs: [
    { id: 'greeting-1', name: '待岗接待', score: 92 },
    { id: 'greeting-2', name: '进店接待', score: 85 }
  ]},
  { id: 'discovery', order: 2, name: '需求分析', subs: [
    { id: 'discovery-1', name: '自我介绍', score: 80 },
    { id: 'discovery-2', name: '需求挖掘', score: 52 },
    { id: 'discovery-3', name: '主动留资', score: 70 }
  ]},
  { id: 'product', order: 3, name: '产品介绍', subs: [
    { id: 'product-1', name: '车辆静态讲解', score: 76 }
  ]},
  { id: 'lead', order: 4, name: '留资开口', subs: [
    { id: 'lead-1', name: '意向确认', score: 70 }
  ]},
  { id: 'pretest', order: 5, name: '试乘试驾前', subs: [
    { id: 'pretest-1', name: '邀约试驾', score: 55 },
    { id: 'pretest-2', name: '出发前', score: 72 }
  ]},
  { id: 'testing', order: 6, name: '试乘试驾中', subs: [
    { id: 'testing-1', name: '试乘环节', score: 65 },
    { id: 'testing-2', name: '换手环节', score: 60 },
    { id: 'testing-3', name: '试驾环节', score: 58 }
  ]},
  { id: 'posttest', order: 7, name: '试乘试驾后', subs: [
    { id: 'posttest-1', name: '返回门店', score: 78 }
  ]}
];

var SOP_PASS_LINE = 80;

// 扁平节点列表（main + sub 全部串联）
function buildFlatNodes() {
  var nodes = [], mainIdx = 0;
  for (var i = 0; i < SOP_STAGES.length; i++) {
    var st = SOP_STAGES[i];
    nodes.push({ type: 'main', stageIdx: i, stageId: st.id, order: st.order, name: st.name });
    for (var j = 0; j < st.subs.length; j++) {
      var sb = st.subs[j];
      nodes.push({ type: 'sub', stageIdx: i, stageId: st.id, id: sb.id, name: sb.name, score: sb.score });
    }
    mainIdx++;
  }
  return nodes;
}

function findWeakestSub() {
  var lowest = null;
  for (var i = 0; i < SOP_STAGES.length; i++) {
    var subs = SOP_STAGES[i].subs;
    for (var j = 0; j < subs.length; j++) {
      if (subs[j].score < SOP_PASS_LINE && (!lowest || subs[j].score < lowest.score)) lowest = subs[j];
    }
  }
  return lowest;
}

function findSubById(id) {
  for (var i = 0; i < SOP_STAGES.length; i++) {
    var subs = SOP_STAGES[i].subs;
    for (var j = 0; j < subs.length; j++) {
      if (subs[j].id === id) return { sub: subs[j], stage: SOP_STAGES[i] };
    }
  }
  return null;
}

function findStageById(id) {
  for (var i = 0; i < SOP_STAGES.length; i++) {
    if (SOP_STAGES[i].id === id) return SOP_STAGES[i];
  }
  return null;
}

function stagePassedCount(stage) {
  var n = 0;
  for (var i = 0; i < stage.subs.length; i++) {
    if (stage.subs[i].score >= SOP_PASS_LINE) n++;
  }
  return n;
}

function totalPassedStages() {
  var n = 0;
  for (var i = 0; i < SOP_STAGES.length; i++) {
    if (stagePassedCount(SOP_STAGES[i]) === SOP_STAGES[i].subs.length) n++;
  }
  return n;
}

// ---- 坐标生成（S 形蜿蜒，左右交替） ----
function buildNodeCoords(nodes) {
  var coords = [];
  var startX = 187, leftX = 107, rightX = 268;
  var startY = 42, gap = 52;

  // 起点
  coords.push({ x: startX, y: startY, side: 'center' });

  for (var i = 0; i < nodes.length; i++) {
    var y = startY + 52 + i * gap;
    var side = (i % 2 === 0) ? 'right' : 'left';
    var x = side === 'right' ? rightX : leftX;
    coords.push({ x: x, y: y, side: side });
  }

  // 终点
  var lastY = coords[coords.length - 1].y + gap;
  coords.push({ x: startX, y: lastY, side: 'center' });

  return coords;
}

// ---- 路径 d 属性 ----
function buildFullPathD(coords) {
  var d = 'M ' + coords[0].x + ' ' + coords[0].y;
  for (var i = 0; i < coords.length - 1; i++) {
    var a = coords[i], b = coords[i + 1];
    var cy1 = a.y + 30, cy2 = b.y - 30;
    d += ' C ' + a.x + ' ' + cy1 + ', ' + b.x + ' ' + cy2 + ', ' + b.x + ' ' + b.y;
  }
  return d;
}

// ====== SOP 成长地图页 ======
function renderSopGrowthMapPage() {
  var weakest = findWeakestSub();
  var weakestId = weakest ? weakest.id : null;
  var weakestStageId = weakest ? findSubById(weakest.id).stage.id : null;
  var passedStages = totalPassedStages();
  var stats = { total: SOP_STAGES.length, passed: passedStages };

  var chaptersHtml = '';
  for (var i = 0; i < SOP_STAGES.length; i++) {
    chaptersHtml += renderSopChapter(SOP_STAGES[i], i, weakestId, weakestStageId);
  }

  return '<div class="sc-phone-wrapper"><div class="sc-page sc-sm-page">' +
    '<div class="sc-sm-header">' +
      '<div class="sc-sm-avatar">李娜</div>' +
      '<div class="sc-sm-header-info">' +
        '<div class="sc-sm-title">SOP 成长地图</div>' +
        '<div class="sc-sm-stat">已点亮 <strong>' + stats.passed + '</strong> / ' + stats.total + ' 关</div>' +
      '</div>' +
    '</div>' +
    '<div class="sc-sm-progress-bar"><div class="sc-sm-progress-fill" style="width:' + Math.round(stats.passed / stats.total * 100) + '%"></div></div>' +
    '<div class="sc-sm-legend">' +
      '<span class="sc-sm-legend-it"><span class="sc-sm-legend-d passed"></span>已达标</span>' +
      '<span class="sc-sm-legend-it"><span class="sc-sm-legend-d current"></span>当前关</span>' +
      '<span class="sc-sm-legend-it"><span class="sc-sm-legend-d pending"></span>待练</span>' +
    '</div>' +
    '<div class="sc-sop-list">' + chaptersHtml + '</div>' +
  '</div></div>';
}

function renderSopChapter(stage, idx, weakestId, weakestStageId) {
  var allPassed = stagePassedCount(stage) === stage.subs.length;
  var isCurrentStage = stage.id === weakestStageId;
  var isExpanded = isCurrentStage;
  var barColor = allPassed ? '#7BB5F0' : (isCurrentStage ? '#1677FF' : '#E0E0E0');
  var statusIcon = allPassed ? '✓' : (isCurrentStage ? '!' : '');
  var subsHtml = '';

  for (var j = 0; j < stage.subs.length; j++) {
    var sb = stage.subs[j];
    var sbPassed = sb.score >= SOP_PASS_LINE;
    var isWeakest = sb.id === weakestId;
    subsHtml += renderSopSubNode(sb, sbPassed, isWeakest, j === stage.subs.length - 1);
  }

  return '<div class="sc-sop-chapter ' + (allPassed ? 'passed' : (isCurrentStage ? 'current' : 'pending')) + '" data-stage="' + stage.id + '">' +
    '<div class="sc-sop-chapter-head" onclick="toggleSopChapter(\'' + stage.id + '\')">' +
      '<span class="sc-sop-chapter-bar" style="background:' + barColor + '"></span>' +
      '<span class="sc-sop-chapter-dot ' + (allPassed ? 'passed' : (isCurrentStage ? 'current' : 'pending')) + '">' +
        (statusIcon || (idx + 1)) +
      '</span>' +
      '<span class="sc-sop-chapter-name">' + (idx + 1) + '. ' + stage.name + '</span>' +
      '<span class="sc-sop-chapter-stat ' + (allPassed ? 'passed' : (isCurrentStage ? 'current' : '')) + '">' +
        stagePassedCount(stage) + '/' + stage.subs.length + (allPassed ? ' 达标' : '') +
      '</span>' +
      '<span class="sc-sop-chapter-arrow ' + (isExpanded ? 'expanded' : '') + '">▾</span>' +
    '</div>' +
    '<div class="sc-sop-chapter-body ' + (isExpanded ? 'expanded' : '') + '">' +
      '<div class="sc-sop-subs">' + subsHtml + '</div>' +
      '<button class="sc-sop-enter-btn ' + (allPassed ? 'outline' : 'solid') + '" onclick="event.stopPropagation();window.location.hash=\'#sales-coach-sop-task-' + stage.id + '\'">' +
        (allPassed ? '再练一遍' : '进入练习') +
      '</button>' +
    '</div>' +
  '</div>';
}

function renderSopSubNode(sub, isPassed, isCurrent, isLast) {
  var cls = isPassed ? 'passed' : (isCurrent ? 'current' : 'pending');
  var size = isCurrent ? 'large' : '';
  var indicator = isCurrent ? '<span class="sc-sop-sub-indicator">▶</span>' : '';

  return '<div class="sc-sop-sub ' + cls + ' ' + size + '" onclick="event.stopPropagation();showSopSheet(\'' + sub.id + '\')">' +
    '<div class="sc-sop-sub-track">' +
      '<div class="sc-sop-sub-dot ' + cls + ' ' + size + '">' + (isPassed ? '✓' : (isCurrent ? '!' : '')) + '</div>' +
      (!isLast ? '<div class="sc-sop-sub-line"></div>' : '') +
    '</div>' +
    '<div class="sc-sop-sub-info">' +
      indicator +
      '<span class="sc-sop-sub-name ' + cls + ' ' + size + '">' + sub.name + '</span>' +
      '<span class="sc-sop-sub-score ' + cls + '">' + sub.score + ' 分</span>' +
    '</div>' +
  '</div>';
}

window.toggleSopChapter = function(stageId) {
  var chapter = document.querySelector('.sc-sop-chapter[data-stage="' + stageId + '"]');
  if (!chapter) return;
  var body = chapter.querySelector('.sc-sop-chapter-body');
  var arrow = chapter.querySelector('.sc-sop-chapter-arrow');
  var isExpanded = body.classList.contains('expanded');
  if (isExpanded) {
    body.classList.remove('expanded');
    arrow.classList.remove('expanded');
  } else {
    body.classList.add('expanded');
    arrow.classList.add('expanded');
  }
};


// ====== 子节点弹层 ======
function renderSopSheet(subId) {
  var found = findSubById(subId);
  if (!found) return '';
  var sub = found.sub, stage = found.stage;
  var passed = sub.score >= SOP_PASS_LINE;
  var gap = SOP_PASS_LINE - sub.score;
  var pct = Math.round((sub.score / SOP_PASS_LINE) * 100);

  return '<div class="sc-sms-overlay" id="sopSheetOverlay" onclick="if(event.target===this)hideSopSheet()">' +
    '<div class="sc-sms-card">' +
      '<div class="sc-sms-handle"></div>' +
      '<div class="sc-sms-title">' + sub.name + '</div>' +
      '<div class="sc-sms-sub">' + stage.name + ' · 第 ' + stage.order + ' 关</div>' +
      '<div class="sc-sms-score-row">' +
        '<span class="sc-sms-score-label">当前水平</span>' +
        '<span class="sc-sms-score-num">' + sub.score + ' 分</span>' +
        '<span class="sc-sms-score-div">/</span>' +
        '<span class="sc-sms-score-target">达标线 ' + SOP_PASS_LINE + ' 分</span>' +
      '</div>' +
      '<div class="sc-sms-bar"><div class="sc-sms-bar-fill ' + (passed ? 'passed' : '') + '" style="width:' + Math.min(pct, 100) + '%"></div></div>' +
      '<div class="sc-sms-status ' + (passed ? 'passed' : '') + '">' + (passed ? '已达标' : '还差 ' + gap + ' 分达标') + '</div>' +
      '<div class="sc-sms-label">这一关要做什么</div>' +
      '<div class="sc-sms-step" onclick="hideSopSheet();window.location.hash=\'#sales-coach-p3-s1\'">' +
        '<span class="sc-sms-step-icon">M</span>' +
        '<span class="sc-sms-step-text">练 · 相似客户场景对练</span>' +
        '<span class="sc-sms-step-go">→</span>' +
      '</div>' +
      '<button class="sc-sms-btn ' + (passed ? 'outline' : 'solid') + '" onclick="hideSopSheet();window.location.hash=\'#sales-coach-sop-task-' + subId + '\'">' +
        (passed ? '再练一遍' : '去练这一关') +
      '</button>' +
      '<button class="sc-sms-close" onclick="hideSopSheet()">关闭</button>' +
    '</div>' +
  '</div>';
}

// ====== 主节点章节总览弹层 ======
function renderSopStageSummary(stageId) {
  var stage = findStageById(stageId);
  if (!stage) return '';
  var passed = stagePassedCount(stage);
  var total = stage.subs.length;
  var allPassed = passed === total;

  var subsHtml = '';
  for (var i = 0; i < stage.subs.length; i++) {
    var sb = stage.subs[i];
    var sp = sb.score >= SOP_PASS_LINE;
    subsHtml += '<div class="sc-sms-sub-item ' + (sp ? 'passed' : '') + '" onclick="hideSopStageSummary();showSopSheet(\'' + sb.id + '\')">' +
      '<span class="sc-sms-sub-name">' + sb.name + '</span>' +
      '<span class="sc-sms-sub-score ' + (sp ? 'passed' : '') + '">' + sb.score + ' 分 ' + (sp ? '✓' : '') + '</span>' +
      '</div>';
  }

  return '<div class="sc-sms-overlay" id="sopStageSummaryOverlay" onclick="if(event.target===this)hideSopStageSummary()">' +
    '<div class="sc-sms-card">' +
      '<div class="sc-sms-handle"></div>' +
      '<div class="sc-sms-title">' + stage.name + '</div>' +
      '<div class="sc-sms-sub">SOP 接待流程 · 第 ' + stage.order + ' 关 · ' + passed + '/' + total + ' 达标</div>' +
      '<div class="sc-sms-sub-list" style="margin-top:16px">' + subsHtml + '</div>' +
      '<button class="sc-sms-btn ' + (allPassed ? 'outline' : 'solid') + '" onclick="hideSopStageSummary();window.location.hash=\'#sales-coach-sop-task-' + stageId + '\'">' +
        (allPassed ? '再练一遍' : '去练这一关') +
      '</button>' +
      '<button class="sc-sms-close" onclick="hideSopStageSummary()">关闭</button>' +
    '</div>' +
  '</div>';
}

window.showSopSheet = function(id) {
  var ex = document.getElementById('sopSheetOverlay');
  if (ex) ex.remove();
  var div = document.createElement('div');
  div.innerHTML = renderSopSheet(id);
  document.body.appendChild(div.firstElementChild);
};

window.hideSopSheet = function() {
  var el = document.getElementById('sopSheetOverlay');
  if (el) el.remove();
};

window.showSopStageSummary = function(id) {
  var ex = document.getElementById('sopStageSummaryOverlay');
  if (ex) ex.remove();
  var div = document.createElement('div');
  div.innerHTML = renderSopStageSummary(id);
  document.body.appendChild(div.firstElementChild);
};

window.hideSopStageSummary = function() {
  var el = document.getElementById('sopStageSummaryOverlay');
  if (el) el.remove();
};

// ====== 任务页 ======
function renderSopGrowthTaskPage(id) {
  var isStage = (id.indexOf('-') === -1);
  var title, subtitle, score;
  if (isStage) {
    var st = findStageById(id);
    if (!st) return '<div class="sc-phone-wrapper"><div class="sc-page"><div class="sc-sm-notfound">关卡未找到</div></div></div>';
    title = st.name;
    subtitle = 'SOP 接待流程 · 第 ' + st.order + ' 关';
    var minScore = 100;
    for (var i = 0; i < st.subs.length; i++) { if (st.subs[i].score < minScore) minScore = st.subs[i].score; }
    score = minScore;
  } else {
    var found = findSubById(id);
    if (!found) return '<div class="sc-phone-wrapper"><div class="sc-page"><div class="sc-sm-notfound">关卡未找到</div></div></div>';
    title = found.sub.name;
    subtitle = found.stage.name + ' · 第 ' + found.stage.order + ' 关';
    score = found.sub.score;
  }
  var passed = score >= SOP_PASS_LINE;
  return '<div class="sc-phone-wrapper"><div class="sc-page sc-sm-task-page">' +
    '<div class="sc-sm-task-head">' +
      '<div class="sc-sm-task-bc">' + subtitle + '</div>' +
      '<h2 class="sc-sm-task-title">' + title + '</h2>' +
      '<div class="sc-sm-task-score">当前 ' + score + ' 分 · 达标线 ' + SOP_PASS_LINE + ' 分</div>' +
    '</div>' +
    '<div class="sc-sm-task-steps">' +
      '<div class="sc-sm-task-step" onclick="window.location.hash=\'#sales-coach-p3-s1\'">' +
        '<div class="sc-sm-task-num">1</div>' +
        '<div class="sc-sm-task-body"><div class="sc-sm-task-st">AI 场景对练</div><div class="sc-sm-task-sd">模拟真实客户场景练习</div></div>' +
        '<span class="sc-sm-task-go">→</span>' +
      '</div>' +
      '<div class="sc-sm-task-step" onclick="window.location.hash=\'#sales-coach-p3-s1\'">' +
        '<div class="sc-sm-task-num">2</div>' +
        '<div class="sc-sm-task-body"><div class="sc-sm-task-st">查看反馈</div><div class="sc-sm-task-sd">即时评分和改进建议</div></div>' +
        '<span class="sc-sm-task-go">→</span>' +
      '</div>' +
    '</div>' +
    '<button class="sc-sms-btn solid" style="margin:16px 20px" onclick="window.location.hash=\'#sales-coach-p3-s1\'">' +
      (passed ? '再练一遍' : '去练这一关') +
    '</button>' +
    '<button class="sc-sms-close" style="display:block;margin:0 auto 24px" onclick="history.back()">返回 SOP 成长地图</button>' +
  '</div></div>';
}

Router.register('sales-coach', renderSalesCoachPage);
