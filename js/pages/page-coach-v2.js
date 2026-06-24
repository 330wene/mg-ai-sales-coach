/**
 * 练习端 v2 — AI 培训产品
 * 核心理念：育人，不是管人
 * 视觉：浅蓝 + 白主色调、毛玻璃卡片、清新教育风
 */

// ====== 数据 ======
var TOPICS = [
  { id: 'greeting', name: '迎接破冰', peers: 156 },
  { id: 'discovery', name: '需求挖掘', peers: 203 },
  { id: 'product', name: '产品介绍', peers: 189 },
  { id: 'price', name: '价格异议', peers: 312 },
  { id: 'compare', name: '横向比价', peers: 145 },
  { id: 'ev', name: '油电纠结', peers: 178 },
  { id: 'testdrive', name: '试驾邀约', peers: 98 },
  { id: 'delay', name: '拖延异议', peers: 134 },
  { id: 'close', name: '逼单促成', peers: 267 },
  { id: 'lead', name: '留资', peers: 223 },
  { id: 'followup', name: '试驾后跟进', peers: 87 }
];

var CUSTOMER_TYPES = [
  { id: 'bargain', name: '砍价型', peers: 156 },
  { id: 'ev-hesitate', name: '纠结油电型', peers: 89 },
  { id: 'competitor', name: '带竞品来比型', peers: 67 },
  { id: 'windowshop', name: '只看不买型', peers: 234 },
  { id: 'family', name: '全家来看型', peers: 45 },
  { id: 'budget', name: '预算有限型', peers: 78 },
  { id: 'highintent', name: '高意向待逼单型', peers: 34 },
  { id: 'referral', name: '复购转介绍型', peers: 23 }
];

var PRODUCTS = [
  { id: 'mg4', name: '26年款 MG4', image: '人像.png' },
  { id: 'mg5', name: '26年款 MG5', image: '人像.png' },
  { id: 'mg7', name: '26年款 MG7', image: '人像.png' },
  { id: 'mg-cyber', name: 'Cyberster', image: '人像.png' },
  { id: 'mg-es5', name: 'MG ES5', image: '人像.png' },
  { id: 'all', name: '全系通用', image: '人像.png' }
];

var USER_DATA = {
  name: '李娜',
  greeting: '李娜，这周你价格异议接得稳多了，继续。',
  stats: { totalSessions: 128, passedScenes: 12, streakDays: 21 }
};

var TODAY_PRACTICES = [
  {
    id: 'price-1',
    scene: '新MG4产品知识综合通关训练',
    source: 'headquarters',
    sourceLabel: '总部推送',
    reason: '124个同事都在练',
    duration: '约 10 分钟',
    hook: '上次客户咨询 MG4 性能问题你卡住了，来暖暖身？',
    steps: [
      { type: 'video', title: 'MG4 性能卖点视频', duration: '3 分钟', desc: '三大核心卖点速览', status: 'todo' },
      { type: 'courseware', title: '核心配置要点', duration: '2 分钟', desc: '续航、加速、智驾配置', status: 'todo',
        pages: [
          { title: '续航表现', items: ['CLTC 纯电续航 520km', '64kWh 磷酸铁锂电池', '百公里能耗仅 12.8kWh', '同级领先的能效比'] },
          { title: '加速性能', items: ['0-100km/h 加速 7.7 秒', '后置电机功率 150kW', '经济/标准/运动三种驾驶模式', '运动模式下推背感明显'] },
          { title: '智驾配置', items: ['L2 级辅助驾驶', 'ACC 自适应巡航（0-150km/h）', 'AEB 主动紧急刹车', '车道保持 + 交通标志识别'] }
        ] },
      { type: 'quiz', title: '小测验', duration: '2 分钟', desc: '3 道情景题，检验你是否准备好上场', status: 'todo',
        questions: [
          { stem: '客户问"冬天续航打几折"，你怎么回？',
            options: ['"大概打七八折吧，电动车都这样"', '"MG4 有热泵空调和电池加热，冬天续航能保 70% 以上，同级很多车只能保 50% 左右"', '"您放心，续航不会有影响的"', '"冬天您就多充几次电呗"'],
            correct: 1, explanation: '客户要的是信心。用数据和配置说话，同时给对比参照，让客户觉得 MG4 比别人靠谱。' },
          { stem: '客户说"这车加速比 XX 品牌慢"，你怎么接？',
            options: ['"那您去买 XX 品牌吧"', '"MG4 零百 7.7 秒日常完全够用，电机响应比油车快，红绿灯起步反而更有优势"', '"加速快有什么用，安全最重要"', '"数据上确实慢 0.3 秒，但实际开起来感觉不出区别"'],
            correct: 1, explanation: '承认差异但不贬低竞品，聚焦 MG4 的实际体验优势（电机响应快），把参数劣势转化成体验优势。' },
          { stem: '客户纠结"要不要加钱上智驾版"，你会怎么建议？',
            options: ['"必须上，不上肯定后悔"', '"智驾版多花一万，但 ACC+AEB 每天都能用，长途省心，二手保值率也高"', '"便宜的版本也够用了"', '"您自己决定吧，我不替您做主"'],
            correct: 1, explanation: '给出具体价值分析（日常可用 + 保值），让客户觉得"多花的钱能赚回来"，而不是被推销。' }
        ] },
      { type: 'practice', title: '和 AI 客户对练', duration: '5 分钟', desc: 'AI 扮演纠结 MG4 性能的客户', status: 'todo' }
    ]
  },
  {
    id: 'store-1',
    scene: '试乘试驾邀约',
    source: 'store',
    sourceLabel: '店长推送',
    reason: '店长说本周练这个',
    duration: '约 8 分钟',
    hook: '邀约率上不去？看一遍标准流程再去练',
    steps: [
      { type: 'video', title: '试驾邀约标准话术', duration: '2 分钟', desc: '三句话让客户愿意上车', status: 'todo' },
      { type: 'courseware', title: '邀约场景拆解', duration: '2 分钟', desc: '电话邀约 vs 展厅邀约', status: 'todo',
        pages: [
          { title: '电话邀约三要素', items: ['先确认时间："您现在方便说两分钟吗？"', '用兴趣钩子："上次您问的那台车到了"', '降低压力："不用买，来看看也欢迎"', '核心：让客户觉得是"顺便"，不是"被约"'] },
          { title: '展厅邀约时机', items: ['产品介绍后客户眼睛亮了 → 马上约', '客户主动摸方向盘/看后排 → 顺势约', '客户提竞品时 → "两台都试试才知道"', '报价前先试驾，成交率高 3 倍'] }
        ] },
      { type: 'quiz', title: '情景判断', duration: '1 分钟', desc: '2 道题，看你会不会选时机', status: 'todo',
        questions: [
          { stem: '客户说"我今天就是随便看看"，你什么时候邀试驾？',
            options: ['"那您慢慢看，有问题叫我"', '先让客户自由看车，产品介绍中观察兴趣信号，客户摸方向盘或眼睛亮时顺势邀约', '"来都来了，试一下呗，不试白不试"', '"等客户准备走的时候再提试驾"'],
            correct: 1, explanation: '邀约时机是关键。客户说"随便看看"不代表拒绝，先建立连接，找准兴趣信号再出手。' },
          { stem: '电话邀约试驾，客户说"最近太忙了没时间"，你怎么办？',
            options: ['"好的那您有空再说吧"', '"就 15 分钟，我按您时间来，周末也行。这车最近很火，试过的客户都说超出预期"', '"您不来试试怎么知道喜不喜欢呢"', '"那我先把资料发给您看看"'],
            correct: 1, explanation: '"没时间"常是托词，降低门槛（15 分钟）+ 灵活安排 + 社交证明（别人试了说好），三招组合拳。' }
        ] },
      { type: 'practice', title: '和犹豫客户过招', duration: '3 分钟', desc: 'AI 扮演不愿试驾的客户', status: 'todo' }
    ]
  },
  {
    id: 'weak-1',
    scene: '客户说"要和家人商量"后就没下文了',
    source: 'weak',
    sourceLabel: '短板推送',
    reason: '上次李先生那单，这里卡住了',
    duration: '约 9 分钟',
    hook: '上次李先生那单就在这里丢的，这次补上',
    steps: [
      { type: 'video', title: '化解"回家商量"的黄金三招', duration: '2 分钟', desc: '不逼单、不放弃、有策略', status: 'todo' },
      { type: 'courseware', title: '家庭决策心理', duration: '2 分钟', desc: '谁说了算？怎么让客户帮你内部推销', status: 'todo',
        pages: [
          { title: '识别决策者', items: ['全家来看车时，注意谁先开口问价格', '陪同者往往是"否决权"，不能忽视', '不要制造对立——"您太太说得对，这个确实要考虑"', '核心：尊重每个人，但锁定掏钱的那个人'] },
          { title: '给客户"回家说服家人"的话术', items: ['"您回去可以跟家人说，这台车5年能省3万油费"', '"安全配置是同级最多的，家人坐着放心"', '"首付不到5万，月供两千多，不压生活品质"', '关键：让客户成为你的"内部销售"'] }
        ] },
      { type: 'quiz', title: '场景选择', duration: '2 分钟', desc: '2 道真实场景题', status: 'todo',
        questions: [
          { stem: '客户说"我得回去跟老婆商量一下"，你怎么回应？',
            options: ['"这有什么好商量的，喜欢就定呗，您是一家之主"', '"理解！您回去可以跟太太说，这车五年能省三万油费，安全配置同级最全，家人坐着放心"', '"好的，那您商量好了随时联系我"', '"要不要我现在给您太太打个电话介绍一下？"'],
            correct: 1, explanation: '别逼客户"背叛"家人。给他具体的、能打动太太的理由，让他成为你在家里的"内部销售"。' },
          { stem: '一家人来看车，太太一直在旁边皱眉看手机，你怎么处理？',
            options: ['忽略太太，专注跟先生讲解', '"太太您看，这车后排特别宽敞，您坐着舒服吗？"主动邀请太太参与体验', '"太太您是不是有什么顾虑呀？"直接追问', '小声跟先生确认：预算是不是太太在管？'],
            correct: 1, explanation: '皱眉看手机 = 还没参与进来。主动邀请、让她体验、找到她能感知的价值点，而不是忽视或让她难堪。' }
        ] },
      { type: 'practice', title: '和纠结的"李哥"再练一次', duration: '3 分钟', desc: 'AI 还原上次李先生的场景', status: 'todo' }
    ]
  }
];

var SCENE_CARDS_BY_TOPIC = [
  { topic: '价格异议', name: '客户直接问底价', difficulty: '中等', peers: 234, expert: '陈静' },
  { topic: '价格异议', name: '别家更便宜怎么接', difficulty: '较难', peers: 156, expert: '王芳' },
  { topic: '需求挖掘', name: '预算多少合适', difficulty: '简单', peers: 445, expert: '张伟' },
  { topic: '需求挖掘', name: '家里谁说了算', difficulty: '中等', peers: 312, expert: '李明明' },
  { topic: '产品介绍', name: '油耗到底多少', difficulty: '简单', peers: 567, expert: '赵勇' },
  { topic: '产品介绍', name: '为什么选这车不选那车', difficulty: '较难', peers: 189, expert: '陈静' }
];

var SCENE_CARDS_BY_TYPE = [
  { type: '砍价型', name: '开口就要便宜五千', difficulty: '较难', peers: 234, expert: '陈静' },
  { type: '纠结油电型', name: '油车还是电车好', difficulty: '中等', peers: 178, expert: '王芳' },
  { type: '带竞品来比型', name: '比亚迪汉比你们便宜', difficulty: '较难', peers: 145, expert: '张伟' },
  { type: '全家来看型', name: '全家都来怎么接待', difficulty: '中等', peers: 89, expert: '李明明' },
  { type: '预算有限型', name: '首付不够怎么办', difficulty: '中等', peers: 156, expert: '赵勇' },
  { type: '高意向待逼单型', name: '今天能定但还要想想', difficulty: '较难', peers: 203, expert: '陈静' }
];

var ACTIVITY_CARDS = {
  active: [
    { id: 'national-day', name: '26年国庆大促训练', status: 'active', peers: 456 },
    { id: 'mg4-launch', name: 'MG4 上市专项训练', status: 'active', peers: 389 }
  ],
  upcoming: [
    { id: 'anniversary', name: '周年庆训练', status: 'upcoming', note: '下周开始' }
  ]
};

// ====== 主入口 ======
function renderCoachV2Page() {
  var subPage = window.__currentSubPage__ || 'home';
  var hash = window.location.hash;
  if (hash.indexOf('#coach-v2-home') > -1) subPage = 'home';
  else if (hash.indexOf('#coach-v2-practice') > -1) subPage = 'practice';
  else if (hash.indexOf('#coach-v2-chat') > -1) subPage = 'chat';
  else if (hash.indexOf('#coach-v2-feedback') > -1) subPage = 'feedback';
  else if (hash.indexOf('#coach-v2-library') > -1) subPage = 'library';
  else if (hash.indexOf('#coach-v2-growth') > -1) subPage = 'growth';
  else if (hash.indexOf('#coach-v2-task-detail-') > -1) {
    subPage = 'taskDetail';
    window.__coachV2TaskId__ = hash.split('#coach-v2-task-detail-')[1];
  } else if (hash.indexOf('#coach-v2-task-courseware-') > -1) {
    subPage = 'courseware';
    var cwHash = hash.split('#coach-v2-task-courseware-')[1];
    var cwParts = cwHash.split('-step-');
    window.__coachV2TaskId__ = cwParts[0];
    window.__coachV2StepIndex__ = parseInt(cwParts[1]) || 0;
  } else if (hash.indexOf('#coach-v2-task-quiz-') > -1) {
    subPage = 'quiz';
    var qzHash = hash.split('#coach-v2-task-quiz-')[1];
    var qzParts = qzHash.split('-step-');
    window.__coachV2TaskId__ = qzParts[0];
    window.__coachV2StepIndex__ = parseInt(qzParts[1]) || 0;
  } else if (hash.indexOf('#coach-v2-task-video-') > -1) {
    subPage = 'video';
    var videoHash = hash.split('#coach-v2-task-video-')[1];
    var parts = videoHash.split('-step-');
    window.__coachV2TaskId__ = parts[0];
    window.__coachV2StepIndex__ = parseInt(parts[1]) || 0;
  }
  return coachV2Styles() + coachV2Layout(subPage);
}

function coachV2Layout(subPage) {
  return '<div class="cv2-phone-frame">' +
    '<div class="cv2-app">' +
    coachV2Header(subPage) +
    coachV2Content(subPage) +
    '</div></div>';
}

function coachV2Header(subPage) {
  var showBack = subPage !== 'home';
  var titleMap = {
    home: '', practice: '对练中', feedback: '练习反馈', chat: '教练对话',
    library: '练习库', growth: '我的成长', taskDetail: '任务详情', video: '看视频', courseware: '看课件', quiz: '做测验'
  };
  return '<header class="cv2-header">' +
    (showBack ? '<button class="cv2-back" onclick="window.location.hash=\'#coach-v2-home\'">←</button>' : '<div class="cv2-header-spacer"></div>') +
    '<div class="cv2-header-title">' + (titleMap[subPage] || '今日成交教练') + '</div>' +
    '<div class="cv2-header-spacer"></div>' +
    '</header>';
}

function coachV2Content(subPage) {
  switch (subPage) {
    case 'practice': return renderPracticePage();
    case 'chat': return renderChatPage();
    case 'feedback': return renderFeedbackPage();
    case 'library': return renderLibraryPage();
    case 'growth': return renderGrowthPage();
    case 'taskDetail': return renderTaskDetailPage(window.__coachV2TaskId__ || '');
    case 'video': return renderVideoPage(window.__coachV2TaskId__ || '', window.__coachV2StepIndex__ || 0);
    case 'courseware': return renderCoursewarePage(window.__coachV2TaskId__ || '', window.__coachV2StepIndex__ || 0);
    case 'quiz': return renderQuizPage(window.__coachV2TaskId__ || '', window.__coachV2StepIndex__ || 0);
    default: return renderHomePage();
  }
}

// ====== 页面1：首页 ======
function renderHomePage() {
  return '<div class="cv2-home">' +
    aiCoachSection() +
    todayPracticesSection() +
    practiceLibraryEntry() +
    learningRecordEntry() +
    '</div>';
}

// A. 教练模块（人机对话式：人像右侧探出 + 对话气泡左下 + 成绩条底部）
function aiCoachSection() {
  return '<section class="cv2-coach-hero" onclick="window.location.hash=\'#coach-v2-chat\'">' +
    // 人像在右侧，探出半个身子
    '<div class="cv2-coach-portrait-wrap">' +
      '<img class="cv2-coach-portrait" src="assets/images/coach.png" alt="教练" />' +
    '</div>' +
    // 对话气泡在左下
    '<div class="cv2-speech-bubble">' +
      '<div class="cv2-speech-text">' + USER_DATA.greeting + '</div>' +
    '</div>' +
    // 成绩条
    scoreStrip() +
    // 悬浮开练按钮
    '<button class="cv2-start-btn" onclick="event.stopPropagation();window.location.hash=\'#coach-v2-chat\'">戴耳机开练</button>' +
    '</section>';
}

// B. 今日重点练习
function todayPracticesSection() {
  var sourceConfig = {
    headquarters: { label: '总部推送', cls: 'cv2-source-hq' },
    store: { label: '店长推送', cls: 'cv2-source-store' },
    weak: { label: '短板推送', cls: 'cv2-source-weak' }
  };
  var cards = TODAY_PRACTICES.map(function(item) {
    var cfg = sourceConfig[item.source];
    return '<div class="cv2-practice-card" onclick="window.location.hash=\'#coach-v2-task-detail-' + item.id + '\'">' +
      '<span class="cv2-source-tag ' + cfg.cls + '">' + cfg.label + '</span>' +
      '<div class="cv2-card-scene">' + item.scene + '</div>' +
      '<div class="cv2-card-reason">' + item.reason + '</div>' +
      '<div class="cv2-card-go">去练 →</div>' +
      '</div>';
  }).join('');
  return '<section class="cv2-today-section">' +
    '<h2 class="cv2-section-title">今日学习重点</h2>' +
    '<div class="cv2-practice-cards">' + cards + '</div>' +
    '</section>';
}

// B2. 任务详情页
function renderTaskDetailPage(taskId) {
  var task = null;
  for (var i = 0; i < TODAY_PRACTICES.length; i++) {
    if (TODAY_PRACTICES[i].id === taskId) { task = TODAY_PRACTICES[i]; break; }
  }
  if (!task) return '<div class="cv2-placeholder"><div class="cv2-placeholder-text">任务未找到</div></div>';

  var sourceConfig = {
    headquarters: { label: '总部推送', cls: 'cv2-source-hq' },
    store: { label: '店长推送', cls: 'cv2-source-store' },
    weak: { label: '短板推送', cls: 'cv2-source-weak' }
  };
  var cfg = sourceConfig[task.source];

  var stepIcons = { video: '🎬', courseware: '📑', quiz: '📝', practice: '🎤' };

  var stepsHtml = task.steps.map(function(step, idx) {
    var isPractice = step.type === 'practice';
    var isDone = step.status === 'done';
    var statusText = '';
    if (isDone) {
      if (step.type === 'quiz') statusText = '已做 · 答对 2/3 题';
      else if (step.type === 'video') statusText = '已观看 ✓';
      else statusText = '已学习 ✓';
    } else {
      if (step.type === 'video') statusText = '未观看';
      else if (step.type === 'quiz') statusText = '未做';
      else if (step.type === 'practice') statusText = '未开始';
      else statusText = '未学习';
    }

    var isVideo = step.type === 'video';
    var isCourseware = step.type === 'courseware';
    var isQuiz = step.type === 'quiz';
    var isClickable = isVideo || isCourseware || isQuiz;
    var clickAttr = '';
    if (isVideo) clickAttr = ' onclick="window.location.hash=\'#coach-v2-task-video-' + task.id + '-step-' + idx + '\'"';
    if (isCourseware) clickAttr = ' onclick="window.location.hash=\'#coach-v2-task-courseware-' + task.id + '-step-' + idx + '\'"';
    if (isQuiz) clickAttr = ' onclick="window.location.hash=\'#coach-v2-task-quiz-' + task.id + '-step-' + idx + '\'"';

    return '<div class="cv2-step-card' + (isPractice ? ' cv2-step-practice' : '') + (isDone ? ' cv2-step-done' : '') + (isClickable ? ' cv2-step-clickable' : '') + '"' + clickAttr + '>' +
      '<div class="cv2-step-left">' +
      '<div class="cv2-step-icon">' + stepIcons[step.type] + '</div>' +
      (idx < task.steps.length - 1 ? '<div class="cv2-step-line"></div>' : '') +
      '</div>' +
      '<div class="cv2-step-body">' +
      '<div class="cv2-step-label">第 ' + (idx + 1) + ' 步</div>' +
      '<div class="cv2-step-title">' + step.title + ' <span class="cv2-step-dur">（' + step.duration + '）</span></div>' +
      '<div class="cv2-step-desc">' + step.desc + '</div>' +
      '<div class="cv2-step-status' + (isDone ? ' done' : '') + '">' + statusText + '</div>' +
      '</div></div>';
  }).join('');

  return '<div class="cv2-task-detail">' +
    // 顶部任务信息
    '<div class="cv2-task-hero">' +
    '<span class="cv2-source-tag ' + cfg.cls + '">' + cfg.label + '</span>' +
    '<h1 class="cv2-task-title">' + task.scene + '</h1>' +
    '<div class="cv2-task-meta"><span class="cv2-task-duration">⏱ ' + task.duration + '</span></div>' +
    '<div class="cv2-task-hook">💬 "' + task.hook + '"</div>' +
    '</div>' +
    // 学练流程时间线
    '<div class="cv2-steps-section">' +
    '<div class="cv2-steps-section-title">学练流程</div>' +
    '<div class="cv2-steps-timeline">' + stepsHtml + '</div>' +
    '</div>' +
    // 底部行动按钮
    '<div class="cv2-task-actions">' +
    '<button class="cv2-task-btn-primary" onclick="window.location.hash=\'#coach-v2-practice\'">🎤 戴耳机开练</button>' +
    '<button class="cv2-task-btn-secondary" onclick="window.location.hash=\'#coach-v2-practice\'">从第一步开始</button>' +
    '<div class="cv2-task-skip-hint">先看视频和课件，准备更充分再开练效果更好</div>' +
    '</div>' +
    '</div>';
}

// B3. 视频播放页
function renderVideoPage(taskId, stepIndex) {
  var task = null;
  for (var i = 0; i < TODAY_PRACTICES.length; i++) {
    if (TODAY_PRACTICES[i].id === taskId) { task = TODAY_PRACTICES[i]; break; }
  }
  if (!task || !task.steps[stepIndex]) {
    return '<div class="cv2-placeholder"><div class="cv2-placeholder-text">视频未找到</div></div>';
  }
  var step = task.steps[stepIndex];
  var nextStep = task.steps[stepIndex + 1] || null;

  return '<div class="cv2-video-page">' +
    // 顶部标题
    '<div class="cv2-video-info">' +
    '<h2 class="cv2-video-title">' + step.title + '</h2>' +
    '<div class="cv2-video-meta">来源：' + task.scene + ' · ' + step.duration + '</div>' +
    '</div>' +
    // 视频占位区
    '<div class="cv2-video-player" id="cv2VideoPlayer">' +
    '<div class="cv2-video-placeholder">' +
    '<div class="cv2-video-play-icon">▶</div>' +
    '<div class="cv2-video-play-text">点击播放</div>' +
    '</div>' +
    '</div>' +
    // 要点摘要
    '<div class="cv2-video-summary">' +
    '<div class="cv2-video-summary-title">要点</div>' +
    '<div class="cv2-video-summary-text">' + step.desc + '</div>' +
    '</div>' +
    // 看完按钮
    '<div class="cv2-video-actions">' +
    '<button class="cv2-video-btn-done" id="cv2VideoDoneBtn" onclick="cv2VideoMarkDone(\'' + taskId + '\', ' + stepIndex + ')">' +
    '看完视频，进入下一步 →' +
    '</button>' +
    '</div>' +
    // 完成引导弹层（默认隐藏）
    '<div class="cv2-video-overlay" id="cv2VideoOverlay" style="display:none">' +
    '<div class="cv2-video-overlay-card">' +
    '<div class="cv2-video-overlay-icon">✅</div>' +
    '<div class="cv2-video-overlay-text">视频看完了，来练一下试试？</div>' +
    (nextStep
      ? '<button class="cv2-video-overlay-btn" onclick="window.location.hash=\'#coach-v2-task-detail-' + taskId + '\'">进入下一步：' + nextStep.title + '</button>'
      : '<button class="cv2-video-overlay-btn" onclick="window.location.hash=\'#coach-v2-practice\'">🎤 直接开练</button>') +
    '<button class="cv2-video-overlay-skip" onclick="document.getElementById(\'cv2VideoOverlay\').style.display=\'none\'">继续看看</button>' +
    '</div></div>' +
    '</div>';
}

window.cv2VideoMarkDone = function(taskId, stepIndex) {
  var overlay = document.getElementById('cv2VideoOverlay');
  if (overlay) overlay.style.display = 'flex';
};

// B4. 课件查看页
function renderCoursewarePage(taskId, stepIndex) {
  var task = null;
  for (var i = 0; i < TODAY_PRACTICES.length; i++) {
    if (TODAY_PRACTICES[i].id === taskId) { task = TODAY_PRACTICES[i]; break; }
  }
  if (!task || !task.steps[stepIndex]) {
    return '<div class="cv2-placeholder"><div class="cv2-placeholder-text">课件未找到</div></div>';
  }
  var step = task.steps[stepIndex];
  var pages = step.pages || [];
  if (!pages.length) {
    return '<div class="cv2-placeholder"><div class="cv2-placeholder-text">课件内容为空</div></div>';
  }

  var nextStep = task.steps[stepIndex + 1] || null;
  var totalPages = pages.length;

  // Store state globally for flip handlers
  window.__cwState__ = { curIdx: 0, total: totalPages, pages: pages, taskId: taskId, stepIndex: stepIndex, nextStep: nextStep };

  return '<div class="cv2-courseware-page" id="cv2CoursewareRoot">' +
    // 顶部进度条
    '<div class="cv2-cw-header">' +
    '<div class="cv2-cw-progress-bar"><div class="cv2-cw-progress-fill" id="cv2CwProgressFill" style="width:' + (100 / totalPages) + '%"></div></div>' +
    '<div class="cv2-cw-page-num">第 <span id="cv2CwCurPage">1</span> / ' + totalPages + ' 页</div>' +
    '</div>' +
    // 中部内容区
    '<div class="cv2-cw-content" id="cv2CwContent">' +
    '<h2 class="cv2-cw-page-title">' + pages[0].title + '</h2>' +
    '<ul class="cv2-cw-items">' +
    pages[0].items.map(function(item) {
      return '<li class="cv2-cw-item">' + item + '</li>';
    }).join('') +
    '</ul>' +
    '</div>' +
    // 翻页按钮
    '<div class="cv2-cw-nav">' +
    '<button class="cv2-cw-btn-prev" id="cv2CwPrevBtn" disabled onclick="cv2CwPrev()">← 上一页</button>' +
    '<button class="cv2-cw-btn-next" id="cv2CwNextBtn" onclick="cv2CwNext()">下一页 →</button>' +
    '</div>' +
    // 完成引导弹层
    '<div class="cv2-video-overlay" id="cv2CwOverlay" style="display:none">' +
    '<div class="cv2-video-overlay-card">' +
    '<div class="cv2-video-overlay-icon">📋</div>' +
    '<div class="cv2-video-overlay-text">核心要点都过了，来检验一下？</div>' +
    (nextStep
      ? '<button class="cv2-video-overlay-btn" onclick="window.location.hash=\'#coach-v2-task-detail-' + taskId + '\'">进入下一步：' + nextStep.title + '</button>'
      : '<button class="cv2-video-overlay-btn" onclick="window.location.hash=\'#coach-v2-practice\'">🎤 直接开练</button>') +
    '<button class="cv2-video-overlay-skip" onclick="document.getElementById(\'cv2CwOverlay\').style.display=\'none\'">再看一遍</button>' +
    '</div></div>' +
    '</div>';
}

window.cv2CwNext = function() {
  var s = window.__cwState__;
  if (!s) return;
  if (s.curIdx >= s.total - 1) {
    var overlay = document.getElementById('cv2CwOverlay');
    if (overlay) overlay.style.display = 'flex';
  } else {
    cv2CwUpdatePage(s.curIdx + 1);
  }
};

window.cv2CwPrev = function() {
  var s = window.__cwState__;
  if (!s) return;
  if (s.curIdx > 0) {
    cv2CwUpdatePage(s.curIdx - 1);
  }
};

window.cv2CwUpdatePage = function(idx) {
  var s = window.__cwState__;
  if (!s || !s.pages[idx]) return;
  s.curIdx = idx;

  var content = document.getElementById('cv2CwContent');
  var curPageEl = document.getElementById('cv2CwCurPage');
  var progressFill = document.getElementById('cv2CwProgressFill');
  var prevBtn = document.getElementById('cv2CwPrevBtn');
  var nextBtn = document.getElementById('cv2CwNextBtn');

  if (content) {
    content.innerHTML = '<h2 class="cv2-cw-page-title">' + s.pages[idx].title + '</h2>' +
      '<ul class="cv2-cw-items">' +
      s.pages[idx].items.map(function(item) { return '<li class="cv2-cw-item">' + item + '</li>'; }).join('') +
      '</ul>';
  }
  if (curPageEl) curPageEl.textContent = (idx + 1);
  if (progressFill) progressFill.style.width = ((idx + 1) / s.total * 100) + '%';
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) {
    if (idx >= s.total - 1) {
      nextBtn.textContent = '完成 ✓';
      nextBtn.className = 'cv2-cw-btn-done';
    } else {
      nextBtn.textContent = '下一页 →';
      nextBtn.className = 'cv2-cw-btn-next';
    }
  }
};

// B5. 做题页
function renderQuizPage(taskId, stepIndex) {
  var task = null;
  for (var i = 0; i < TODAY_PRACTICES.length; i++) {
    if (TODAY_PRACTICES[i].id === taskId) { task = TODAY_PRACTICES[i]; break; }
  }
  if (!task || !task.steps[stepIndex]) {
    return '<div class="cv2-placeholder"><div class="cv2-placeholder-text">题目未找到</div></div>';
  }
  var step = task.steps[stepIndex];
  var questions = step.questions || [];
  if (!questions.length) {
    return '<div class="cv2-placeholder"><div class="cv2-placeholder-text">暂无题目</div></div>';
  }

  var totalQ = questions.length;
  window.__qzState__ = { questions: questions, curIdx: 0, total: totalQ, answers: [], taskId: taskId, stepIndex: stepIndex };

  var q = questions[0];

  return '<div class="cv2-quiz-page" id="cv2QuizRoot">' +
    // 进度
    '<div class="cv2-qz-header">' +
    '<div class="cv2-qz-progress">' +
    '<div class="cv2-qz-progress-text">第 <span id="cv2QzCurNum">1</span> 题 / 共 ' + totalQ + ' 题</div>' +
    '<div class="cv2-qz-progress-bar"><div class="cv2-qz-progress-fill" id="cv2QzProgressFill" style="width:' + (100 / totalQ) + '%"></div></div>' +
    '</div>' +
    '</div>' +
    // 题干
    '<div class="cv2-qz-body">' +
    '<div class="cv2-qz-stem" id="cv2QzStem">' + q.stem + '</div>' +
    // 选项
    '<div class="cv2-qz-options" id="cv2QzOptions">' +
    q.options.map(function(opt, oi) {
      return '<button class="cv2-qz-option" onclick="cv2QzSelect(' + oi + ')">' +
        '<span class="cv2-qz-opt-letter">' + String.fromCharCode(65 + oi) + '</span>' +
        '<span class="cv2-qz-opt-text">' + opt + '</span>' +
        '</button>';
    }).join('') +
    '</div>' +
    // 反馈区（默认隐藏）
    '<div class="cv2-qz-feedback" id="cv2QzFeedback" style="display:none">' +
    '<div class="cv2-qz-fb-correct" id="cv2QzFbCorrect" style="display:none">' +
    '<div class="cv2-qz-fb-icon">✅</div>' +
    '<div class="cv2-qz-fb-text">答对了！</div>' +
    '<div class="cv2-qz-fb-detail" id="cv2QzFbDetail"></div>' +
    '</div>' +
    '<div class="cv2-qz-fb-wrong" id="cv2QzFbWrong" style="display:none">' +
    '<div class="cv2-qz-fb-icon">💡</div>' +
    '<div class="cv2-qz-fb-text">这个场景挺典型的</div>' +
    '<div class="cv2-qz-fb-detail" id="cv2QzFbWrongDetail"></div>' +
    '<button class="cv2-qz-practice-btn" onclick="window.location.hash=\'#coach-v2-practice\'">🎤 马上和 AI 练一下这个对话</button>' +
    '<div class="cv2-qz-fb-sub">练完再回来继续下一题</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    // 底部
    '<div class="cv2-qz-footer">' +
    '<button class="cv2-qz-next-btn" id="cv2QzNextBtn" style="display:none" onclick="cv2QzNext()">下一题 →</button>' +
    '</div>' +
    // 全部完成引导（默认隐藏）
    '<div class="cv2-video-overlay" id="cv2QzDoneOverlay" style="display:none">' +
    '<div class="cv2-video-overlay-card">' +
    '<div class="cv2-video-overlay-icon">💪</div>' +
    '<div class="cv2-video-overlay-text">准备得差不多了，该上场练真功夫了</div>' +
    '<button class="cv2-video-overlay-btn" onclick="window.location.hash=\'#coach-v2-practice\'">🎤 戴耳机开练</button>' +
    '<button class="cv2-video-overlay-skip" onclick="window.location.hash=\'#coach-v2-task-detail-' + taskId + '\'">返回任务</button>' +
    '</div></div>' +
    '</div>';
}

window.cv2QzSelect = function(optIdx) {
  var s = window.__qzState__;
  if (!s) return;
  var q = s.questions[s.curIdx];
  var isCorrect = optIdx === q.correct;

  // Lock options
  var options = document.querySelectorAll('.cv2-qz-option');
  for (var i = 0; i < options.length; i++) {
    options[i].disabled = true;
    options[i].style.pointerEvents = 'none';
    if (i === q.correct) options[i].classList.add('cv2-qz-correct');
    if (i === optIdx && !isCorrect) options[i].classList.add('cv2-qz-wrong');
  }

  // Show feedback
  var fb = document.getElementById('cv2QzFeedback');
  var correctDiv = document.getElementById('cv2QzFbCorrect');
  var wrongDiv = document.getElementById('cv2QzFbWrong');
  var nextBtn = document.getElementById('cv2QzNextBtn');

  if (fb) fb.style.display = 'block';

  if (isCorrect) {
    if (correctDiv) correctDiv.style.display = 'block';
    if (wrongDiv) wrongDiv.style.display = 'none';
    var detail = document.getElementById('cv2QzFbDetail');
    if (detail) detail.textContent = q.explanation;
    if (nextBtn) { nextBtn.style.display = 'block'; nextBtn.textContent = '下一题 →'; }
    s.answers.push({ qIdx: s.curIdx, selected: optIdx, correct: true });
  } else {
    if (correctDiv) correctDiv.style.display = 'none';
    if (wrongDiv) wrongDiv.style.display = 'block';
    var wrongDetail = document.getElementById('cv2QzFbWrongDetail');
    if (wrongDetail) wrongDetail.textContent = q.explanation;
    // Also show next button option
    if (nextBtn) { nextBtn.style.display = 'block'; nextBtn.textContent = '继续下一题 →'; }
    s.answers.push({ qIdx: s.curIdx, selected: optIdx, correct: false });
  }

  // Scroll feedback into view
  if (fb) fb.scrollIntoView({ behavior: 'smooth' });
};

window.cv2QzNext = function() {
  var s = window.__qzState__;
  if (!s) return;
  var nextIdx = s.curIdx + 1;
  if (nextIdx >= s.total) {
    // All done
    var overlay = document.getElementById('cv2QzDoneOverlay');
    if (overlay) overlay.style.display = 'flex';
    return;
  }

  s.curIdx = nextIdx;
  var q = s.questions[nextIdx];

  // Update question number
  var curNum = document.getElementById('cv2QzCurNum');
  var progressFill = document.getElementById('cv2QzProgressFill');
  if (curNum) curNum.textContent = nextIdx + 1;
  if (progressFill) progressFill.style.width = ((nextIdx + 1) / s.total * 100) + '%';

  // Update stem
  var stem = document.getElementById('cv2QzStem');
  if (stem) stem.textContent = q.stem;

  // Rebuild options
  var optsDiv = document.getElementById('cv2QzOptions');
  if (optsDiv) {
    optsDiv.innerHTML = q.options.map(function(opt, oi) {
      return '<button class="cv2-qz-option" onclick="cv2QzSelect(' + oi + ')">' +
        '<span class="cv2-qz-opt-letter">' + String.fromCharCode(65 + oi) + '</span>' +
        '<span class="cv2-qz-opt-text">' + opt + '</span>' +
        '</button>';
    }).join('');
  }

  // Hide feedback and next button
  var fb = document.getElementById('cv2QzFeedback');
  var correctDiv = document.getElementById('cv2QzFbCorrect');
  var wrongDiv = document.getElementById('cv2QzFbWrong');
  var nextBtn = document.getElementById('cv2QzNextBtn');
  if (fb) fb.style.display = 'none';
  if (correctDiv) correctDiv.style.display = 'none';
  if (wrongDiv) wrongDiv.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  // Scroll to top
  window.scrollTo(0, 0);
};

// C. 成绩条（紧凑一行）
function scoreStrip() {
  return '<div class="cv2-score-strip">' +
    USER_DATA.stats.streakDays + ' 天连续 ｜ 已通关 ' + USER_DATA.stats.passedScenes + ' 个 ｜ 累计对练 ' + USER_DATA.stats.totalSessions + ' 场' +
    '</div>';
}

// D. 练习库入口
function practiceLibraryEntry() {
  return '<section class="cv2-library-entry">' +
    '<div class="cv2-library-tabs">' +
    '<button class="cv2-lib-tab active" data-cv2tab="product" onclick="cv2SwitchLibTab(\'product\')">按产品</button>' +
    '<button class="cv2-lib-tab" data-cv2tab="topic" onclick="cv2SwitchLibTab(\'topic\')">按主题</button>' +
    '<button class="cv2-lib-tab" data-cv2tab="type" onclick="cv2SwitchLibTab(\'type\')">按客户类型</button>' +
    '<button class="cv2-lib-tab" data-cv2tab="activity" onclick="cv2SwitchLibTab(\'activity\')">按活动专项</button>' +
    '</div>' +
    '<div class="cv2-lib-grid" id="cv2LibGrid">' +
    renderProductGridCards(PRODUCTS) +
    '</div>' +
    '<a class="cv2-see-all" href="#coach-v2-library">查看全部练习 →</a>' +
    '</section>';
}

// E. 我的学习记录入口
function learningRecordEntry() {
  return '<section class="cv2-record-entry">' +
    '<a class="cv2-record-link" href="#coach-v2-growth">' +
    '<span class="cv2-record-text">我的学习记录</span>' +
    '<span class="cv2-record-arrow">→</span>' +
    '</a>' +
    '</section>';
}

function renderProductGridCards(products) {
  return products.map(function(p) {
    return '<div class="cv2-product-card" onclick="window.location.hash=\'#coach-v2-practice\'">' +
      '<div class="cv2-product-img-wrap"><div class="cv2-product-icon"></div></div>' +
      '<div class="cv2-product-name">' + p.name + '</div>' +
      '</div>';
  }).join('');
}

function renderLibGridCards(cards, mode) {
  return cards.map(function(c) {
    var label = mode === 'topic' ? c.topic : c.type;
    return '<div class="cv2-scene-card" onclick="window.location.hash=\'#coach-v2-practice\'">' +
      '<div class="cv2-scene-name">' + c.name + '</div>' +
      '<div class="cv2-scene-meta">' +
      '<span class="cv2-scene-tag">' + label + '</span>' +
      '<span class="cv2-scene-diff">' + c.difficulty + '</span>' +
      '</div>' +
      '<div class="cv2-scene-peer">' + c.peers + ' 位同事在练 · 高手：' + c.expert + '</div>' +
      '</div>';
  }).join('');
}

function renderActivityCards() {
  var html = '';
  if (ACTIVITY_CARDS.active.length) {
    html += '<div class="cv2-activity-section"><div class="cv2-activity-section-label">进行中</div>';
    html += ACTIVITY_CARDS.active.map(function(a) {
      return '<div class="cv2-activity-card" onclick="window.location.hash=\'#coach-v2-practice\'">' +
        '<div class="cv2-activity-status active">🟢 进行中</div>' +
        '<div class="cv2-activity-name">' + a.name + '</div>' +
        '<div class="cv2-activity-peer">' + a.peers + ' 位同事在练</div>' +
        '</div>';
    }).join('');
    html += '</div>';
  }
  if (ACTIVITY_CARDS.upcoming.length) {
    html += '<div class="cv2-activity-section"><div class="cv2-activity-section-label">待开始</div>';
    html += ACTIVITY_CARDS.upcoming.map(function(a) {
      return '<div class="cv2-activity-card" onclick="window.location.hash=\'#coach-v2-practice\'">' +
        '<div class="cv2-activity-status upcoming">🔵 待开始</div>' +
        '<div class="cv2-activity-name">' + a.name + '</div>' +
        '<div class="cv2-activity-note">' + a.note + '</div>' +
        '</div>';
    }).join('');
    html += '</div>';
  }
  return html;
}

// ====== 页面2：对练进行中 ======
var PRACTICE_STATE = 'ai-speaking';
var PRACTICE_DEMO_TIMER = null;

function renderPracticePage() {
  return '<div class="cv2-practice">' +
    '<div class="cv2-practice-top">' +
    '<div class="cv2-practice-scene">客户说"太贵了"怎么破</div>' +
    '<div class="cv2-handsfree">免手持模式 · 可放进口袋边走边练</div>' +
    '</div>' +
    '<div class="cv2-voice-area">' +
    '<div class="cv2-voice-orb cv2-orb-ai" id="cv2VoiceOrb">' +
    '<div class="cv2-orb-core"></div>' +
    '<div class="cv2-orb-ring r1"></div>' +
    '<div class="cv2-orb-ring r2"></div>' +
    '<div class="cv2-orb-ring r3"></div>' +
    '</div>' +
    '<div class="cv2-voice-label" id="cv2VoiceLabel">阿冠正在说...</div>' +
    '</div>' +
    '<div class="cv2-dialog-area">' +
    '<div class="cv2-dialog-bubble" id="cv2DialogBubble">' +
    '哥，这个价格确实是我们店里的底价了。您今天要是定的话，我找我们经理申请一下，送您两次保养加脚垫和记录仪。' +
    '</div>' +
    '<div class="cv2-dialog-hint" id="cv2DialogHint">轮到你说了</div>' +
    '</div>' +
    '<div class="cv2-practice-actions">' +
    '<button class="cv2-btn-end" onclick="cv2EndPractice()">结束并看反馈</button>' +
    '</div>' +
    '<div class="cv2-demo-bar">' +
    '<button class="cv2-demo-btn" id="cv2DemoBtn" onclick="cv2ToggleDemo()">自动演示</button>' +
    '</div>' +
    '</div>';
}

function cv2SetPracticeState(state) {
  PRACTICE_STATE = state;
  var orb = document.getElementById('cv2VoiceOrb');
  var label = document.getElementById('cv2VoiceLabel');
  var bubble = document.getElementById('cv2DialogBubble');
  var hint = document.getElementById('cv2DialogHint');
  if (!orb) return;
  if (state === 'ai-speaking') {
    orb.className = 'cv2-voice-orb cv2-orb-ai';
    label.textContent = '阿冠正在说...';
    bubble.innerHTML = '哥，这个价格确实是我们店里的底价了。您今天要是定的话，我找我们经理申请一下，送您两次保养加脚垫和记录仪。';
    hint.textContent = '';
  } else {
    orb.className = 'cv2-voice-orb cv2-orb-user';
    label.textContent = '轮到你说了';
    bubble.innerHTML = '';
    hint.textContent = '正在听你...';
  }
}

function cv2ToggleDemo() {
  var btn = document.getElementById('cv2DemoBtn');
  if (PRACTICE_DEMO_TIMER) {
    clearInterval(PRACTICE_DEMO_TIMER);
    PRACTICE_DEMO_TIMER = null;
    if (btn) btn.textContent = '自动演示';
    cv2SetPracticeState('ai-speaking');
  } else {
    if (btn) btn.textContent = '停止演示';
    cv2SetPracticeState('ai-speaking');
    PRACTICE_DEMO_TIMER = setInterval(function() {
      if (PRACTICE_STATE === 'ai-speaking') { cv2SetPracticeState('user-turn'); }
      else { cv2SetPracticeState('ai-speaking'); }
    }, 3000);
  }
}

function cv2EndPractice() {
  if (PRACTICE_DEMO_TIMER) { clearInterval(PRACTICE_DEMO_TIMER); PRACTICE_DEMO_TIMER = null; }
  window.location.hash = '#coach-v2-feedback';
}

var _origRenderCoachV2Page = renderCoachV2Page;
renderCoachV2Page = function() {
  if (PRACTICE_DEMO_TIMER) { clearInterval(PRACTICE_DEMO_TIMER); PRACTICE_DEMO_TIMER = null; }
  PRACTICE_STATE = 'ai-speaking';
  return _origRenderCoachV2Page();
};

// ====== 页面3：练习反馈 ======
function renderFeedbackPage() {
  return '<div class="cv2-feedback">' +
    '<section class="cv2-fb-score">' +
    '<div class="cv2-fb-circle"><div class="cv2-fb-big">82</div><div class="cv2-fb-total">/100</div></div>' +
    '<div class="cv2-fb-pass">已通关</div>' +
    '<div class="cv2-fb-compare">比上次 <strong>+9</strong> 分</div>' +
    '</section>' +
    '<section class="cv2-fb-card cv2-fb-good">' +
    '<h3 class="cv2-fb-card-title good">你做得好的</h3>' +
    '<div class="cv2-fb-highlight">客户提"贵"时你先问在意点，没急着报价 — 这个开场很聪明</div>' +
    '<div class="cv2-fb-highlight">及时抛出保养价值来转移价格焦点，节奏感好</div>' +
    '<div class="cv2-fb-highlight">用了"找经理申请"的缓冲策略，给了客户面子</div>' +
    '</section>' +
    '<section class="cv2-fb-peer">' +
    '<div class="cv2-fb-peer-line">128 位同事也在练这个难点，你不孤单</div>' +
    '<div class="cv2-fb-peer-star">本场景高手：<a href="#">陈静</a> · 可向她请教</div>' +
    '</section>' +
    '<div class="cv2-fb-actions">' +
    '<button class="cv2-fb-btn-again" onclick="window.location.hash=\'#coach-v2-practice\'">再练一遍</button>' +
    '<button class="cv2-fb-btn-done" onclick="window.location.hash=\'#coach-v2-home\'">完成</button>' +
    '</div>' +
    '</div>';
}

// ====== 页面4-5 占位 ======
function renderLibraryPage() {
  return '<div class="cv2-placeholder">' +
    '<div class="cv2-placeholder-text">练习库</div>' +
    '<div class="cv2-placeholder-sub">完整练习库 — 下一步实现</div>' +
    '</div>';
}

function renderGrowthPage() {
  return '<div class="cv2-placeholder">' +
    '<div class="cv2-placeholder-text">我的成长</div>' +
    '<div class="cv2-placeholder-sub">成长曲线与徽章 — 下一步实现</div>' +
    '</div>';
}

// ====== 样式 ======
function coachV2Styles() {
  return '<style>' +
    ':focus{outline:none}' +
    '*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}' +

    '.cv2-phone-frame{' +
    'display:flex;justify-content:center;min-height:100vh;' +
    'background:linear-gradient(180deg,#e8f2fc 0%,#f0f4f8 30%,#fafbfc 100%);' +
    'padding:12px;padding-bottom:100px' +
    '}' +

    '.cv2-app{' +
    'width:375px;max-width:100%;background:#fafbfc;' +
    'border-radius:16px;overflow:hidden;position:relative;min-height:700px;' +
    'box-shadow:0 4px 24px rgba(0,0,0,0.06),0 0 0 1px rgba(0,0,0,0.04)' +
    '}' +

    '.cv2-header{' +
    'height:56px;display:flex;align-items:center;justify-content:space-between;' +
    'padding:0 16px;background:rgba(255,255,255,0.75);' +
    'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);' +
    'border-bottom:1px solid rgba(0,0,0,0.06)' +
    '}' +
    '.cv2-header-title{font-size:16px;font-weight:600;color:#1e293b}' +
    '.cv2-back{background:none;border:none;color:#64748b;font-size:20px;cursor:pointer;padding:4px}' +
    '.cv2-header-spacer{width:32px}' +

    '.cv2-home{padding-bottom:80px}' +
    // 教练模块（人机对话式：淡蓝渐变底 + 人像右侧探出 + 对话气泡左下）
    '.cv2-coach-hero{' +
    'margin:12px 16px 0;border-radius:20px;overflow:hidden;cursor:pointer;position:relative;' +
    'background:linear-gradient(160deg,#dceaf8 0%,#e8f1fb 35%,#f2f7fd 100%);' +
    'box-shadow:0 2px 16px rgba(0,0,0,0.05),0 0 0 1px rgba(0,0,0,0.03);' +
    'min-height:260px;display:flex;flex-direction:column;justify-content:flex-end' +
    '}' +
    // 人像容器：绝对定位在右侧，半身探出（仅显示肩膀以上）
    '.cv2-coach-portrait-wrap{' +
    'position:absolute;right:-12px;top:-8px;width:62%;height:130%;' +
    'display:flex;align-items:flex-start;justify-content:flex-end;' +
    'pointer-events:none;overflow:hidden' +
    '}' +
    '.cv2-coach-portrait{' +
    'width:100%;height:auto;max-width:none;object-fit:cover;object-position:top center;' +
    'display:block;margin-top:-4px;' +
    'clip-path:inset(0 0 55% 0)' +
    '}' +
    // 对话气泡：左下角，白底圆角
    '.cv2-speech-bubble{' +
    'position:relative;z-index:2;margin:130px 16px 12px 16px;' +
    'background:#fff;border-radius:18px 18px 18px 6px;padding:14px 16px;' +
    'box-shadow:0 2px 12px rgba(0,0,0,0.06);max-width:58%' +
    '}' +
    // 对话文字
    '.cv2-speech-text{' +
    'font-size:14px;font-weight:600;color:#1e293b;line-height:1.7' +
    '}' +
    // 成绩条：底部一行横向
    '.cv2-score-strip{' +
    'position:relative;z-index:2;padding:10px 16px 14px;text-align:center;' +
    'font-size:12px;color:#94a3b8' +
    '}' +
    // 悬浮开练按钮
    '.cv2-start-btn{' +
    'display:block;width:calc(100% - 32px);padding:16px;border:none;border-radius:16px;cursor:pointer;' +
    'background:linear-gradient(135deg,#3b82f6,#2563eb);' +
    'color:#fff;font-size:18px;font-weight:700;letter-spacing:0.5px;' +
    'box-shadow:0 4px 20px rgba(59,130,246,0.35);transition:all 0.2s;' +
    'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:50;' +
    'max-width:343px' +
    '}' +
    '.cv2-start-btn:active{background:linear-gradient(135deg,#2563eb,#1d4ed8);transform:translateX(-50%) scale(0.98)}' +

    // 今日重点
    '.cv2-today-section{padding:20px 20px}' +
    '.cv2-section-title{font-size:15px;font-weight:600;color:#1e293b;margin-bottom:14px}' +
    '.cv2-practice-cards{display:flex;flex-direction:column;gap:8px}' +
    '.cv2-practice-card{' +
    'padding:12px 14px;border-radius:12px;cursor:pointer;' +
    'background:rgba(255,255,255,0.7);' +
    'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
    'border:1px solid rgba(0,0,0,0.05);' +
    'box-shadow:0 1px 4px rgba(0,0,0,0.04);transition:all 0.2s' +
    '}' +
    '.cv2-practice-card:active{background:rgba(255,255,255,0.95);box-shadow:0 2px 8px rgba(0,0,0,0.06)}' +

    '.cv2-source-tag{font-size:10px;font-weight:600;margin-bottom:6px;display:inline-block;padding:2px 8px;border-radius:20px}' +
    '.cv2-source-hq{background:rgba(74,143,231,0.1);color:#3b7fd9}' +
    '.cv2-source-store{background:rgba(34,197,94,0.1);color:#16a34a}' +
    '.cv2-source-weak{background:rgba(249,115,22,0.1);color:#ea580c}' +

    '.cv2-card-scene{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:4px}' +
    '.cv2-card-reason{font-size:11px;color:#64748b;margin-bottom:8px;line-height:1.4}' +
    '.cv2-card-go{display:flex;align-items:center;justify-content:flex-end;gap:4px;font-size:12px;font-weight:500;color:#4a8fe7}' +

    // 练习库入口
    '.cv2-library-entry{padding:0 20px 24px}' +
    '.cv2-library-tabs{' +
    'display:flex;gap:4px;margin-bottom:14px;' +
    'background:rgba(0,0,0,0.03);padding:4px;border-radius:10px' +
    '}' +
    '.cv2-lib-tab{' +
    'flex:1;padding:8px 2px;border-radius:8px;border:none;font-size:11px;font-weight:500;cursor:pointer;' +
    'background:transparent;color:#64748b;transition:all 0.2s;white-space:nowrap' +
    '}' +
    '.cv2-lib-tab.active{background:#fff;color:#1e293b;box-shadow:0 1px 3px rgba(0,0,0,0.06)}' +

    // 产品卡片
    '.cv2-product-card{' +
    'padding:0 0 12px;border-radius:12px;cursor:pointer;overflow:hidden;' +
    'background:rgba(255,255,255,0.7);' +
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(0,0,0,0.05);' +
    'box-shadow:0 1px 3px rgba(0,0,0,0.03);transition:all 0.2s' +
    '}' +
    '.cv2-product-card:active{background:rgba(255,255,255,0.95)}' +
    '.cv2-product-img-wrap{' +
    'width:100%;height:80px;background:linear-gradient(135deg,#e8f2fc,#dbeafe);' +
    'display:flex;align-items:center;justify-content:center;margin-bottom:10px' +
    '}' +
    '.cv2-product-icon{' +
    'width:36px;height:36px;border-radius:8px;background:rgba(74,143,231,0.15)' +
    '}' +
    '.cv2-product-name{font-size:12px;font-weight:600;color:#1e293b;text-align:center;padding:0 8px}' +

    // 场景卡网格
    '.cv2-lib-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}' +
    '.cv2-scene-card{' +
    'padding:14px;border-radius:12px;cursor:pointer;' +
    'background:rgba(255,255,255,0.65);' +
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(0,0,0,0.05);' +
    'box-shadow:0 1px 3px rgba(0,0,0,0.03);transition:all 0.2s' +
    '}' +
    '.cv2-scene-card:active{background:rgba(255,255,255,0.95);box-shadow:0 2px 6px rgba(0,0,0,0.06)}' +
    '.cv2-scene-name{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px}' +
    '.cv2-scene-meta{display:flex;gap:6px;margin-bottom:8px}' +
    '.cv2-scene-tag{font-size:10px;padding:2px 8px;border-radius:4px;background:rgba(74,143,231,0.08);color:#3b7fd9}' +
    '.cv2-scene-diff{font-size:10px;padding:2px 8px;border-radius:4px;background:rgba(245,158,11,0.08);color:#b45309}' +
    '.cv2-scene-peer{font-size:11px;color:#94a3b8;line-height:1.4}' +
    '.cv2-see-all{display:block;text-align:center;font-size:13px;color:#4a8fe7;text-decoration:none;padding:8px}' +

    // 活动专项卡片
    '.cv2-activity-section{margin-bottom:12px}' +
    '.cv2-activity-section-label{font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px;padding-left:2px}' +
    '.cv2-activity-card{' +
    'padding:14px;border-radius:12px;cursor:pointer;margin-bottom:8px;' +
    'background:rgba(255,255,255,0.65);' +
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(0,0,0,0.05);' +
    'box-shadow:0 1px 3px rgba(0,0,0,0.03);transition:all 0.2s' +
    '}' +
    '.cv2-activity-card:active{background:rgba(255,255,255,0.95)}' +
    '.cv2-activity-status{font-size:11px;font-weight:500;margin-bottom:6px}' +
    '.cv2-activity-status.active{color:#16a34a}' +
    '.cv2-activity-status.upcoming{color:#4a8fe7}' +
    '.cv2-activity-name{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:6px}' +
    '.cv2-activity-peer{font-size:11px;color:#94a3b8}' +
    '.cv2-activity-note{font-size:11px;color:#64748b}' +

    // 对练页
    '.cv2-practice{' +
    'min-height:calc(100vh - 56px);display:flex;flex-direction:column;' +
    'background:linear-gradient(180deg,#e8f2fc 0%,#fafbfc 100%)' +
    '}' +
    '.cv2-practice-top{padding:20px 20px 8px;text-align:center}' +
    '.cv2-practice-scene{font-size:16px;font-weight:600;color:#1e293b;margin-bottom:8px}' +
    '.cv2-handsfree{' +
    'display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#64748b;' +
    'background:rgba(74,143,231,0.06);padding:6px 14px;border-radius:20px' +
    '}' +
    '.cv2-voice-area{' +
    'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px' +
    '}' +
    '.cv2-voice-orb{width:180px;height:180px;position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:28px}' +
    '.cv2-orb-core{' +
    'width:100px;height:100px;border-radius:50%;z-index:2;transition:background 0.4s,box-shadow 0.4s' +
    '}' +
    '.cv2-orb-ai .cv2-orb-core{' +
    'background:linear-gradient(135deg,#f97316,#fb923c);' +
    'box-shadow:0 0 40px rgba(249,115,22,0.35),0 0 80px rgba(249,115,22,0.15)' +
    '}' +
    '.cv2-orb-user .cv2-orb-core{' +
    'background:linear-gradient(135deg,#4a8fe7,#60a5fa);' +
    'box-shadow:0 0 40px rgba(74,143,231,0.35),0 0 80px rgba(74,143,231,0.15)' +
    '}' +
    '.cv2-orb-ring{position:absolute;border-radius:50%;border:2px solid rgba(249,115,22,0.3);animation:cv2-ripple 2s ease-out infinite}' +
    '.cv2-orb-user .cv2-orb-ring{border-color:rgba(74,143,231,0.3)}' +
    '.cv2-orb-ring.r1{width:120px;height:120px;animation-delay:0s}' +
    '.cv2-orb-ring.r2{width:150px;height:150px;animation-delay:0.4s}' +
    '.cv2-orb-ring.r3{width:180px;height:180px;animation-delay:0.8s}' +
    '@keyframes cv2-ripple{0%{transform:scale(0.8);opacity:0.7}100%{transform:scale(1.3);opacity:0}}' +
    '.cv2-voice-label{font-size:18px;font-weight:600;color:#1e293b;text-align:center}' +
    '.cv2-dialog-area{padding:0 24px 20px;text-align:center}' +
    '.cv2-dialog-bubble{' +
    'display:inline-block;max-width:100%;padding:14px 18px;border-radius:16px;' +
    'background:rgba(255,255,255,0.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(0,0,0,0.05);box-shadow:0 2px 8px rgba(0,0,0,0.04);' +
    'font-size:14px;line-height:1.6;color:#374151;text-align:left' +
    '}' +
    '.cv2-dialog-hint{margin-top:12px;font-size:14px;color:#4a8fe7;font-weight:500;animation:cv2-blink 1.5s ease-in-out infinite}' +
    '@keyframes cv2-blink{0%,100%{opacity:1}50%{opacity:0.3}}' +
    '.cv2-practice-actions{padding:12px 24px}' +
    '.cv2-btn-end{' +
    'width:100%;padding:16px;border:none;border-radius:14px;cursor:pointer;' +
    'background:#fff;color:#64748b;font-size:15px;font-weight:500;' +
    'border:1px solid rgba(0,0,0,0.08);box-shadow:0 1px 3px rgba(0,0,0,0.04);transition:all 0.2s' +
    '}' +
    '.cv2-btn-end:active{background:#f8fafc}' +
    '.cv2-demo-bar{text-align:center;padding:8px 24px 24px}' +
    '.cv2-demo-btn{' +
    'background:rgba(74,143,231,0.08);border:1px solid rgba(74,143,231,0.15);' +
    'padding:8px 20px;border-radius:20px;font-size:12px;color:#4a8fe7;cursor:pointer' +
    '}' +

    // 反馈页
    '.cv2-feedback{padding-bottom:24px}' +
    '.cv2-fb-score{' +
    'text-align:center;padding:32px 20px;' +
    'background:linear-gradient(180deg,#e0edfb 0%,#eef4fb 60%,#fafbfc 100%)' +
    '}' +
    '.cv2-fb-circle{' +
    'width:100px;height:100px;border-radius:50%;margin:0 auto 16px;' +
    'background:linear-gradient(135deg,#4a8fe7,#3b7fd9);' +
    'display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 4px 20px rgba(74,143,231,0.25)' +
    '}' +
    '.cv2-fb-big{font-size:36px;font-weight:700;color:#fff}' +
    '.cv2-fb-total{font-size:16px;color:rgba(255,255,255,0.7)}' +
    '.cv2-fb-pass{display:inline-block;padding:6px 18px;border-radius:20px;background:#dcfce7;color:#16a34a;font-size:14px;font-weight:600;margin-bottom:8px}' +
    '.cv2-fb-compare{font-size:14px;color:#64748b}' +
    '.cv2-fb-compare strong{color:#4a8fe7;font-size:16px}' +
    '.cv2-fb-card{' +
    'margin:12px 16px;padding:18px;border-radius:14px;' +
    'background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(0,0,0,0.05);box-shadow:0 1px 4px rgba(0,0,0,0.03)' +
    '}' +
    '.cv2-fb-card-title{font-size:14px;font-weight:600;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(0,0,0,0.05)}' +
    '.cv2-fb-card-title.good{color:#16a34a}' +
    '.cv2-fb-highlight{font-size:13px;color:#374151;line-height:1.6;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.03)}' +
    '.cv2-fb-highlight:last-child{border:none}' +
    '.cv2-fb-peer{' +
    'margin:12px 16px;padding:16px;text-align:center;' +
    'background:rgba(255,255,255,0.5);border-radius:14px;border:1px solid rgba(0,0,0,0.04)' +
    '}' +
    '.cv2-fb-peer-line{font-size:13px;color:#64748b;margin-bottom:8px}' +
    '.cv2-fb-peer-star{font-size:13px;color:#d97706}' +
    '.cv2-fb-peer-star a{color:#4a8fe7;text-decoration:underline}' +
    '.cv2-fb-actions{display:flex;gap:10px;padding:16px;margin:0 4px}' +
    '.cv2-fb-btn-again{' +
    'flex:1;padding:15px;border:none;border-radius:14px;cursor:pointer;' +
    'background:linear-gradient(135deg,#4a8fe7,#3b7fd9);' +
    'color:#fff;font-size:15px;font-weight:600;box-shadow:0 3px 12px rgba(74,143,231,0.2)' +
    '}' +
    '.cv2-fb-btn-done{' +
    'padding:15px 24px;border:none;border-radius:14px;cursor:pointer;' +
    'background:rgba(0,0,0,0.04);color:#64748b;font-size:15px;font-weight:500' +
    '}' +

    // 占位页
    '.cv2-placeholder{' +
    'display:flex;flex-direction:column;align-items:center;justify-content:center;' +
    'padding:80px 20px;text-align:center;min-height:400px' +
    '}' +
    '.cv2-placeholder-text{font-size:18px;font-weight:600;color:#64748b;margin-bottom:8px}' +
    '.cv2-placeholder-sub{font-size:13px;color:#94a3b8}' +

    // 任务详情页
    '.cv2-task-detail{padding-bottom:32px}' +
    '.cv2-task-hero{' +
    'padding:24px 20px 20px;' +
    'background:linear-gradient(180deg,#e0edfb 0%,#eef4fb 60%,#fafbfc 100%);' +
    'border-bottom:1px solid rgba(0,0,0,0.04)' +
    '}' +
    '.cv2-task-title{font-size:18px;font-weight:700;color:#1e293b;margin:10px 0 8px;line-height:1.4}' +
    '.cv2-task-meta{font-size:12px;color:#64748b;margin-bottom:10px}' +
    '.cv2-task-duration{display:inline-flex;align-items:center;gap:4px}' +
    '.cv2-task-hook{' +
    'font-size:13px;color:#64748b;line-height:1.6;font-style:italic;' +
    'padding:10px 14px;background:rgba(255,255,255,0.6);border-radius:10px;' +
    'border-left:3px solid #4a8fe7' +
    '}' +

    // 步骤时间线
    '.cv2-steps-section{padding:24px 20px}' +
    '.cv2-steps-section-title{font-size:15px;font-weight:600;color:#1e293b;margin-bottom:18px}' +
    '.cv2-steps-timeline{display:flex;flex-direction:column;}' +
    '.cv2-step-card{' +
    'display:flex;gap:12px;padding:14px 14px 14px 0;' +
    'border-radius:14px;position:relative;transition:all 0.2s' +
    '}' +
    '.cv2-step-left{' +
    'display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0' +
    '}' +
    '.cv2-step-icon{' +
    'width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
    'font-size:18px;background:rgba(148,163,184,0.1);flex-shrink:0;z-index:1' +
    '}' +
    '.cv2-step-line{' +
    'width:2px;flex:1;min-height:20px;margin:4px 0;' +
    'background:rgba(148,163,184,0.2);border-radius:1px' +
    '}' +
    '.cv2-step-body{flex:1;min-width:0}' +
    '.cv2-step-label{font-size:11px;font-weight:500;color:#94a3b8;margin-bottom:4px}' +
    '.cv2-step-body .cv2-step-title{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:4px}' +
    '.cv2-step-dur{font-weight:400;font-size:12px;color:#94a3b8}' +
    '.cv2-step-desc{font-size:12px;color:#64748b;margin-bottom:6px;line-height:1.5}' +
    '.cv2-step-status{font-size:11px;color:#94a3b8}' +
    '.cv2-step-status.done{color:#16a34a}' +

    // 陪练步骤高亮
    '.cv2-step-practice{' +
    'background:rgba(249,115,22,0.04);' +
    'border:1px solid rgba(249,115,22,0.15);' +
    'border-radius:14px;padding:16px;margin-top:4px' +
    '}' +
    '.cv2-step-practice .cv2-step-icon{' +
    'background:rgba(249,115,22,0.12);' +
    '}' +
    '.cv2-step-practice .cv2-step-body .cv2-step-title{color:#ea580c}' +
    '.cv2-step-practice .cv2-step-status{color:#ea580c;font-weight:500}' +

    // 已完成步骤淡化
    '.cv2-step-done{opacity:0.55}' +
    '.cv2-step-done .cv2-step-icon{background:rgba(34,197,94,0.12)}' +

    // 底部按钮
    '.cv2-task-actions{padding:0 20px 32px;text-align:center}' +
    '.cv2-task-btn-primary{' +
    'display:block;width:100%;padding:15px;border:none;border-radius:14px;cursor:pointer;' +
    'margin-bottom:10px;' +
    'background:linear-gradient(135deg,#f97316,#ea580c);' +
    'color:#fff;font-size:16px;font-weight:600;' +
    'box-shadow:0 3px 16px rgba(249,115,22,0.3);transition:all 0.2s' +
    '}' +
    '.cv2-task-btn-primary:active{background:linear-gradient(135deg,#ea580c,#d4620b)}' +
    '.cv2-task-btn-secondary{' +
    'display:block;width:100%;padding:14px;border:1px solid rgba(0,0,0,0.08);border-radius:14px;cursor:pointer;' +
    'background:#fff;color:#4a8fe7;font-size:14px;font-weight:500;' +
    'box-shadow:0 1px 4px rgba(0,0,0,0.04);transition:all 0.2s' +
    '}' +
    '.cv2-task-btn-secondary:active{background:#f8fafc}' +
    '.cv2-task-skip-hint{' +
    'font-size:11px;color:#94a3b8;margin-top:10px;text-align:center;line-height:1.5' +
    '}' +

    // 学习记录入口
    '.cv2-record-entry{padding:0 20px 24px}' +
    '.cv2-record-link{' +
    'display:flex;align-items:center;gap:8px;text-decoration:none;' +
    'padding:12px 16px;border-radius:12px;' +
    'background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.04);' +
    'color:#64748b;font-size:13px;transition:all 0.2s' +
    '}' +
    '.cv2-record-link:active{background:rgba(255,255,255,0.8)}' +
    '.cv2-record-icon{font-size:16px}' +
    '.cv2-record-text{flex:1}' +
    '.cv2-record-arrow{color:#94a3b8}' +

    // 视频播放页
    '.cv2-video-page{' +
    'min-height:calc(100vh - 56px);display:flex;flex-direction:column;' +
    'background:#0f172a' +
    '}' +
    '.cv2-video-info{' +
    'padding:20px 20px 12px;color:#e2e8f0' +
    '}' +
    '.cv2-video-title{font-size:16px;font-weight:600;color:#fff;margin-bottom:4px}' +
    '.cv2-video-meta{font-size:12px;color:#94a3b8}' +
    '.cv2-video-player{' +
    'flex:1;display:flex;align-items:center;justify-content:center;' +
    'margin:0 16px;min-height:240px;' +
    'background:rgba(255,255,255,0.04);border-radius:14px;' +
    'border:1px solid rgba(255,255,255,0.06)' +
    '}' +
    '.cv2-video-placeholder{text-align:center}' +
    '.cv2-video-play-icon{' +
    'width:56px;height:56px;border-radius:50%;' +
    'background:rgba(249,115,22,0.15);' +
    'display:flex;align-items:center;justify-content:center;' +
    'font-size:22px;color:#f97316;margin:0 auto 12px' +
    '}' +
    '.cv2-video-play-text{font-size:14px;color:#64748b}' +
    '.cv2-video-summary{' +
    'margin:16px;padding:16px;' +
    'background:rgba(255,255,255,0.04);border-radius:12px;' +
    'border:1px solid rgba(255,255,255,0.06)' +
    '}' +
    '.cv2-video-summary-title{font-size:13px;font-weight:600;color:#fff;margin-bottom:8px}' +
    '.cv2-video-summary-text{font-size:13px;color:#94a3b8;line-height:1.6}' +
    '.cv2-video-actions{padding:16px 20px 24px}' +
    '.cv2-video-btn-done{' +
    'display:block;width:100%;padding:14px;border:none;border-radius:14px;cursor:pointer;' +
    'background:linear-gradient(135deg,#f97316,#ea580c);' +
    'color:#fff;font-size:15px;font-weight:600;' +
    'box-shadow:0 3px 16px rgba(249,115,22,0.3);transition:all 0.2s' +
    '}' +
    '.cv2-video-btn-done:active{background:linear-gradient(135deg,#ea580c,#d4620b)}' +
    // 完成引导弹层
    '.cv2-video-overlay{' +
    'position:fixed;top:0;left:0;right:0;bottom:0;' +
    'background:rgba(0,0,0,0.6);z-index:100;' +
    'display:flex;align-items:center;justify-content:center;padding:24px' +
    '}' +
    '.cv2-video-overlay-card{' +
    'background:#fff;border-radius:16px;padding:28px 24px;text-align:center;' +
    'max-width:300px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.2)' +
    '}' +
    '.cv2-video-overlay-icon{font-size:36px;margin-bottom:12px}' +
    '.cv2-video-overlay-text{' +
    'font-size:15px;font-weight:600;color:#1e293b;margin-bottom:20px;line-height:1.5' +
    '}' +
    '.cv2-video-overlay-btn{' +
    'display:block;width:100%;padding:14px;border:none;border-radius:12px;cursor:pointer;' +
    'background:linear-gradient(135deg,#4a8fe7,#3b7fd9);' +
    'color:#fff;font-size:14px;font-weight:600;margin-bottom:10px;' +
    'box-shadow:0 3px 12px rgba(74,143,231,0.2)' +
    '}' +
    '.cv2-video-overlay-skip{' +
    'background:none;border:none;color:#94a3b8;font-size:12px;cursor:pointer;padding:4px' +
    '}' +

    // 可点击步骤卡
    '.cv2-step-clickable{cursor:pointer}' +
    '.cv2-step-clickable:active{background:rgba(74,143,231,0.04)}' +

    // 课件查看页
    '.cv2-courseware-page{' +
    'min-height:calc(100vh - 56px);display:flex;flex-direction:column;' +
    'background:linear-gradient(180deg,#f8fafc,#fafbfc)' +
    '}' +
    '.cv2-cw-header{padding:16px 20px 0}' +
    '.cv2-cw-progress-bar{' +
    'height:3px;background:rgba(0,0,0,0.05);border-radius:2px;overflow:hidden;margin-bottom:10px' +
    '}' +
    '.cv2-cw-progress-fill{' +
    'height:100%;background:linear-gradient(90deg,#4a8fe7,#60a5fa);' +
    'border-radius:2px;transition:width 0.3s' +
    '}' +
    '.cv2-cw-page-num{font-size:12px;color:#94a3b8;margin-bottom:16px}' +
    '.cv2-cw-content{' +
    'flex:1;padding:24px 20px;display:flex;flex-direction:column' +
    '}' +
    '.cv2-cw-page-title{' +
    'font-size:18px;font-weight:700;color:#1e293b;margin-bottom:20px;line-height:1.4' +
    '}' +
    '.cv2-cw-items{list-style:none;display:flex;flex-direction:column;gap:12px}' +
    '.cv2-cw-item{' +
    'font-size:14px;color:#374151;line-height:1.6;' +
    'padding:12px 14px;' +
    'background:rgba(255,255,255,0.7);border-radius:12px;' +
    'border:1px solid rgba(0,0,0,0.04);' +
    'box-shadow:0 1px 3px rgba(0,0,0,0.03)' +
    '}' +
    '.cv2-cw-nav{' +
    'display:flex;gap:10px;padding:16px 20px 24px' +
    '}' +
    '.cv2-cw-btn-prev,.cv2-cw-btn-next{' +
    'flex:1;padding:14px;border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;' +
    'border:1px solid rgba(0,0,0,0.06)' +
    '}' +
    '.cv2-cw-btn-prev{' +
    'background:rgba(255,255,255,0.7);color:#64748b' +
    '}' +
    '.cv2-cw-btn-prev:disabled{' +
    'opacity:0.35;cursor:default' +
    '}' +
    '.cv2-cw-btn-next{' +
    'background:linear-gradient(135deg,#4a8fe7,#3b7fd9);color:#fff;' +
    'box-shadow:0 3px 12px rgba(74,143,231,0.2)' +
    '}' +
    '.cv2-cw-btn-next:active{background:linear-gradient(135deg,#3b7fd9,#2d6fcf)}' +
    '.cv2-cw-btn-done{' +
    'flex:1;padding:14px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;' +
    'background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;' +
    'border:none;box-shadow:0 3px 12px rgba(249,115,22,0.2)' +
    '}' +

    // 做题页
    '.cv2-quiz-page{' +
    'min-height:calc(100vh - 56px);display:flex;flex-direction:column;' +
    'background:linear-gradient(180deg,#f8fafc,#fafbfc)' +
    '}' +
    '.cv2-qz-header{padding:16px 20px 0}' +
    '.cv2-qz-progress-text{font-size:12px;color:#94a3b8;margin-bottom:8px}' +
    '.cv2-qz-progress-bar{' +
    'height:3px;background:rgba(0,0,0,0.05);border-radius:2px;overflow:hidden' +
    '}' +
    '.cv2-qz-progress-fill{' +
    'height:100%;background:linear-gradient(90deg,#4a8fe7,#60a5fa);' +
    'border-radius:2px;transition:width 0.3s' +
    '}' +
    '.cv2-qz-body{flex:1;padding:24px 20px}' +
    '.cv2-qz-stem{' +
    'font-size:16px;font-weight:600;color:#1e293b;line-height:1.6;margin-bottom:20px' +
    '}' +
    '.cv2-qz-options{display:flex;flex-direction:column;gap:10px}' +
    '.cv2-qz-option{' +
    'display:flex;align-items:flex-start;gap:12px;width:100%;padding:14px;' +
    'border:1.5px solid rgba(0,0,0,0.06);border-radius:12px;cursor:pointer;' +
    'background:rgba(255,255,255,0.7);text-align:left;' +
    'font-size:14px;color:#374151;line-height:1.5;transition:all 0.2s' +
    '}' +
    '.cv2-qz-option:active{background:rgba(74,143,231,0.04);border-color:rgba(74,143,231,0.2)}' +
    '.cv2-qz-opt-letter{' +
    'display:inline-flex;align-items:center;justify-content:center;' +
    'width:24px;height:24px;border-radius:50%;' +
    'background:rgba(0,0,0,0.04);font-size:12px;font-weight:600;color:#64748b;' +
    'flex-shrink:0;margin-top:1px' +
    '}' +
    '.cv2-qz-opt-text{flex:1}' +
    // Selected states
    '.cv2-qz-option.cv2-qz-correct{' +
    'background:rgba(34,197,94,0.06);border-color:rgba(34,197,94,0.3)' +
    '}' +
    '.cv2-qz-option.cv2-qz-correct .cv2-qz-opt-letter{' +
    'background:rgba(34,197,94,0.15);color:#16a34a' +
    '}' +
    '.cv2-qz-option.cv2-qz-wrong{' +
    'background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2)' +
    '}' +
    '.cv2-qz-option.cv2-qz-wrong .cv2-qz-opt-letter{' +
    'background:rgba(239,68,68,0.12);color:#ef4444' +
    '}' +
    // Feedback
    '.cv2-qz-feedback{' +
    'margin-top:20px;padding:16px;border-radius:14px;' +
    'background:rgba(255,255,255,0.7);border:1px solid rgba(0,0,0,0.05)' +
    '}' +
    '.cv2-qz-fb-icon{font-size:28px;margin-bottom:8px}' +
    '.cv2-qz-fb-text{font-size:15px;font-weight:600;color:#1e293b;margin-bottom:8px}' +
    '.cv2-qz-fb-detail{font-size:13px;color:#64748b;line-height:1.6;margin-bottom:12px}' +
    '.cv2-qz-fb-sub{font-size:11px;color:#94a3b8;margin-top:8px;text-align:center}' +
    // Wrong feedback practice button
    '.cv2-qz-practice-btn{' +
    'display:block;width:100%;padding:13px;border:none;border-radius:12px;cursor:pointer;' +
    'background:linear-gradient(135deg,#f97316,#ea580c);' +
    'color:#fff;font-size:14px;font-weight:600;' +
    'box-shadow:0 3px 12px rgba(249,115,22,0.25);margin-top:4px' +
    '}' +
    '.cv2-qz-practice-btn:active{background:linear-gradient(135deg,#ea580c,#d4620b)}' +
    '.cv2-qz-footer{padding:0 20px 24px}' +
    '.cv2-qz-next-btn{' +
    'display:block;width:100%;padding:14px;border:none;border-radius:14px;cursor:pointer;' +
    'background:linear-gradient(135deg,#4a8fe7,#3b7fd9);' +
    'color:#fff;font-size:15px;font-weight:600;' +
    'box-shadow:0 3px 12px rgba(74,143,231,0.2)' +
    '}' +

    // 教练对话页
    '.cv2-chat{' +
    'min-height:calc(100vh - 56px);display:flex;flex-direction:column;' +
    'background:linear-gradient(180deg,#eef5fc 0%,#f8fafc 100%);padding:0 16px 32px' +
    '}' +
    '.cv2-chat-section{margin-top:20px}' +
    '.cv2-chat-section-title{' +
    'font-size:13px;font-weight:600;color:#64748b;margin-bottom:12px;padding-left:4px' +
    '}' +
    '.cv2-chat-bubble{display:flex;gap:8px;margin-bottom:16px;align-items:flex-start}' +
    '.cv2-chat-bubble-coach{justify-content:flex-start}' +
    '.cv2-chat-bubble-user{justify-content:flex-end}' +
    '.cv2-chat-avatar{' +
    'width:32px;height:32px;border-radius:50%;flex-shrink:0;' +
    'object-fit:cover;border:1.5px solid rgba(74,143,231,0.15)' +
    '}' +
    '.cv2-chat-bubble-body{max-width:85%}' +
    '.cv2-chat-bubble-text{' +
    'display:inline-block;padding:12px 16px;border-radius:16px;' +
    'font-size:14px;line-height:1.6;color:#374151;' +
    'background:rgba(255,255,255,0.85);' +
    'box-shadow:0 1px 3px rgba(0,0,0,0.04);' +
    'border:1px solid rgba(0,0,0,0.04)' +
    '}' +
    '.cv2-chat-bubble-user .cv2-chat-bubble-text{' +
    'background:linear-gradient(135deg,#4a8fe7,#3b7fd9);color:#fff' +
    '}' +
    '.cv2-chat-bubble-coach .cv2-chat-bubble-text{border-radius:4px 16px 16px 16px}' +
    '.cv2-chat-bubble-user .cv2-chat-bubble-text{border-radius:16px 4px 16px 16px}' +
    '.cv2-chat-rec-cards{display:flex;flex-direction:column;gap:8px}' +
    '.cv2-chat-rec-card{' +
    'padding:14px 16px;border-radius:14px;cursor:pointer;' +
    'background:rgba(255,255,255,0.75);' +
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(0,0,0,0.05);' +
    'box-shadow:0 1px 4px rgba(0,0,0,0.03);transition:all 0.2s' +
    '}' +
    '.cv2-chat-rec-card:active{background:rgba(255,255,255,0.95);box-shadow:0 2px 8px rgba(0,0,0,0.06)}' +
    '.cv2-chat-rec-name{font-size:14px;font-weight:600;color:#1e293b;margin:6px 0 4px}' +
    '.cv2-chat-rec-sub{font-size:12px;color:#94a3b8}' +
    '.cv2-chat-mic-btn{' +
    'display:flex;align-items:center;justify-content:center;gap:10px;' +
    'width:100%;padding:16px;border:none;border-radius:16px;cursor:pointer;' +
    'background:rgba(255,255,255,0.75);' +
    'border:1.5px dashed rgba(74,143,231,0.25);' +
    'font-size:15px;color:#4a8fe7;font-weight:500;transition:all 0.2s' +
    '}' +
    '.cv2-chat-mic-btn:active{background:rgba(74,143,231,0.04)}' +
    '.cv2-chat-mic-listening{' +
    'border-color:rgba(249,115,22,0.4);color:#ea580c;' +
    'background:rgba(249,115,22,0.04)' +
    '}' +
    '.cv2-chat-mic-icon{font-size:20px}' +
    '@keyframes cv2-mic-pulse{' +
    '0%,100%{transform:scale(1);opacity:1}' +
    '50%{transform:scale(1.15);opacity:0.7}' +
    '}' +
    '.cv2-chat-mic-pulse{animation:cv2-mic-pulse 0.8s ease-in-out infinite}' +
    '.cv2-chat-temp-card{' +
    'margin-top:12px;padding:16px;border-radius:14px;' +
    'background:rgba(255,255,255,0.8);' +
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'border:1px solid rgba(249,115,22,0.2);' +
    'box-shadow:0 2px 8px rgba(249,115,22,0.06)' +
    '}' +
    '.cv2-chat-temp-name{font-size:15px;font-weight:600;color:#1e293b;margin-bottom:6px}' +
    '.cv2-chat-temp-tag{' +
    'display:inline-block;font-size:11px;color:#94a3b8;' +
    'background:rgba(0,0,0,0.03);padding:3px 10px;border-radius:12px;margin-bottom:14px' +
    '}' +
    '.cv2-chat-temp-btn{' +
    'display:block;width:100%;padding:14px;border:none;border-radius:12px;cursor:pointer;' +
    'background:linear-gradient(135deg,#f97316,#ea580c);' +
    'color:#fff;font-size:15px;font-weight:600;' +
    'box-shadow:0 3px 12px rgba(249,115,22,0.25);transition:all 0.2s' +
    '}' +
    '.cv2-chat-temp-btn:active{background:linear-gradient(135deg,#ea580c,#c2410c);transform:scale(0.98)}' +

    '</style>';
}

// ====== 页面：教练对话页 ======
var CoachChat = {
  state: 'idle', // idle | listening | recognized | responded
  userText: '',

  reset: function() {
    this.state = 'idle';
    this.userText = '';
  },

  startListening: function() {
    var self = this;
    this.state = 'listening';
    this.refreshUI();

    // Demo: 模拟语音识别，1.5 秒后出结果
    setTimeout(function() {
      self.userText = '客户拿小米SU7来比MG4怎么办';
      self.state = 'recognized';
      self.refreshUI();

      // 再等 0.8 秒，教练回应
      setTimeout(function() {
        self.state = 'responded';
        self.refreshUI();
      }, 800);
    }, 1500);
  },

  goPractice: function(sceneName) {
    window.__coachChatScene__ = sceneName;
    window.location.hash = '#coach-v2-practice';
  },

  refreshUI: function() {
    var area = document.getElementById('cv2ChatArea');
    if (area) { area.innerHTML = renderChatContent(); }
    this.bindEvents();
  },

  bindEvents: function() {
    var micBtn = document.getElementById('cv2ChatMicBtn');
    if (micBtn) {
      micBtn.onclick = function() {
        if (CoachChat.state === 'idle') { CoachChat.startListening(); }
      };
    }
    // 推荐卡片点击
    var cards = document.querySelectorAll('.cv2-chat-rec-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].onclick = function() {
        var scene = this.getAttribute('data-scene');
        CoachChat.goPractice(scene);
      };
    }
    // 临时练习卡按钮
    var tempBtn = document.getElementById('cv2ChatTempBtn');
    if (tempBtn) {
      tempBtn.onclick = function() {
        CoachChat.goPractice(CoachChat.userText);
      };
    }
  }
};

function renderChatPage() {
  CoachChat.reset();
  setTimeout(function() { CoachChat.bindEvents(); }, 0);
  return '<div class="cv2-chat">' +
    '<div id="cv2ChatArea">' + renderChatContent() + '</div>' +
    '</div>';
}

function renderChatContent() {
  var html = '';

  // 教练开场气泡
  html += '<div class="cv2-chat-bubble cv2-chat-bubble-coach">' +
    '<img class="cv2-chat-avatar" src="assets/images/coach.png" alt="教练" />' +
    '<div class="cv2-chat-bubble-body">' +
    '<div class="cv2-chat-bubble-text">想练点什么？我可以陪你过一遍。</div>' +
    '</div>' +
    '</div>';

  // 推荐练习区
  html += '<div class="cv2-chat-section">' +
    '<div class="cv2-chat-section-title">我建议你练这些</div>' +
    '<div class="cv2-chat-rec-cards">' +
    '<div class="cv2-chat-rec-card" data-scene="应对\'要和家人商量\'">' +
    '<span class="cv2-source-tag cv2-source-weak">短板推送</span>' +
    '<div class="cv2-chat-rec-name">应对\'要和家人商量\'</div>' +
    '<div class="cv2-chat-rec-sub">上次你在这卡住了</div>' +
    '</div>' +
    '<div class="cv2-chat-rec-card" data-scene="MG4 性能问题应对">' +
    '<span class="cv2-source-tag cv2-source-hq">总部推送</span>' +
    '<div class="cv2-chat-rec-name">MG4 性能问题应对</div>' +
    '</div>' +
    '<div class="cv2-chat-rec-card" data-scene="试驾邀约">' +
    '<span class="cv2-source-tag cv2-source-store">店长推送</span>' +
    '<div class="cv2-chat-rec-name">试驾邀约</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  // 自定义区
  html += '<div class="cv2-chat-section">' +
    '<div class="cv2-chat-section-title">或者，告诉我你想练什么</div>';

  if (CoachChat.state === 'idle') {
    html += '<button class="cv2-chat-mic-btn" id="cv2ChatMicBtn">' +
      '<span class="cv2-chat-mic-icon">🎤</span>' +
      '<span>点击说话</span>' +
      '</button>';
  } else if (CoachChat.state === 'listening') {
    html += '<div class="cv2-chat-mic-btn cv2-chat-mic-listening" id="cv2ChatMicBtn">' +
      '<span class="cv2-chat-mic-icon cv2-chat-mic-pulse">🎤</span>' +
      '<span>聆听中...</span>' +
      '</div>';
  }

  // 用户说的话
  if (CoachChat.state === 'recognized' || CoachChat.state === 'responded') {
    html += '<div class="cv2-chat-bubble cv2-chat-bubble-user">' +
      '<div class="cv2-chat-bubble-text">' + CoachChat.userText + '</div>' +
      '</div>';
  }

  // 教练回应 + 临时练习卡
  if (CoachChat.state === 'responded') {
    html += '<div class="cv2-chat-bubble cv2-chat-bubble-coach">' +
      '<img class="cv2-chat-avatar" src="assets/images/coach.png" alt="教练" />' +
      '<div class="cv2-chat-bubble-body">' +
      '<div class="cv2-chat-bubble-text">好，我来扮演一个拿小米SU7来比的客户。这种客户一般先比智能化和价格——你试试怎么接。</div>' +
      '</div>' +
      '</div>';

    html += '<div class="cv2-chat-temp-card">' +
      '<div class="cv2-chat-temp-name">' + CoachChat.userText + '</div>' +
      '<div class="cv2-chat-temp-tag">临时生成 · 帮你找找感觉</div>' +
      '<button class="cv2-chat-temp-btn" id="cv2ChatTempBtn">🎤 戴耳机开练</button>' +
      '</div>';
  }

  html += '</div>'; // end 自定义区

  return html;
}

// ====== 交互 ======
window.cv2SwitchLibTab = function(tab) {
  var tabs = document.querySelectorAll('.cv2-lib-tab');
  for (var i = 0; i < tabs.length; i++) {
    var isActive = tabs[i].getAttribute('data-cv2tab') === tab;
    if (isActive) { tabs[i].classList.add('active'); }
    else { tabs[i].classList.remove('active'); }
  }
  var grid = document.getElementById('cv2LibGrid');
  if (grid) {
    if (tab === 'product') {
      grid.innerHTML = renderProductGridCards(PRODUCTS);
    } else if (tab === 'activity') {
      grid.innerHTML = renderActivityCards();
    } else {
      var cards = tab === 'topic' ? SCENE_CARDS_BY_TOPIC : SCENE_CARDS_BY_TYPE;
      grid.innerHTML = renderLibGridCards(cards, tab);
    }
  }
};

Router.register('coach-v2', renderCoachV2Page);
