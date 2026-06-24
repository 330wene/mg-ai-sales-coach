/**
 * 导购端 - 今日成交教练
 * 手机端高保真页面
 */

// 常量定义
var COACH_TOPICS = [
  { id: '迎接破冰', name: '🚗 迎接破冰' },
  { id: '需求挖掘', name: '🔍 需求挖掘' },
  { id: '产品介绍', name: '🚙 产品介绍' },
  { id: '价格异议', name: '💰 价格异议' },
  { id: '横向比价', name: '⚖️ 横向比价' },
  { id: '油电纠结', name: '⚡ 油电纠结' },
  { id: '试驾邀约', name: '🎯 试驾邀约' },
  { id: '拖延异议', name: '⏰ 拖延异议' },
  { id: '逼单促成', name: '🔥 逼单促成' },
  { id: '留资', name: '📝 留资' },
  { id: '试驾后跟进', name: '🏁 试驾后跟进' }
];

var CUSTOMER_TYPES = [
  { id: '砍价型', name: '💰 砍价型' },
  { id: '纠结油电型', name: '⚡ 纠结油电型' },
  { id: '带竞品来比型', name: '🔎 带竞品来比型' },
  { id: '只看不买型', name: '👀 只看不买型' },
  { id: '全家来看型', name: '👨‍👩‍👧 全家来看型' },
  { id: '预算有限型', name: '💵 预算有限型' },
  { id: '高意向待逼单型', name: '🎯 高意向待逼单型' },
  { id: '复购转介绍型', name: '🔄 复购转介绍型' }
];

// 示例数据
var USER_DATA = {
  name: '李娜',
  avatar: '🦸',
  coachName: '阿冠',
  todayCall: '李娜，今天练 10 分钟，把"要和家人商量"拿下？',
  stats: {
    totalSessions: 128,
    passedScenes: 12,
    streakDays: 7
  }
};

var TODAY_PRACTICES = [
  {
    id: 'price-objection',
    scene: '客户说"太贵了"怎么破',
    source: ' headquarters',  // 空格是故意的，用于显示分隔
    sourceType: 'headquarters',
    reason: '总部统一要求掌握的核心场景',
    topic: '价格异议'
  },
  {
    id: 'family-consult',
    scene: '要和家人商量',
    source: ' personal',
    sourceType: 'weak',
    reason: '上次接待你在"锁定决策人"这里偏弱，专门给你推的',
    topic: '需求挖掘'
  },
  {
    id: 'test-drive-invite',
    scene: '试乘试驾邀约',
    source: ' store',
    sourceType: 'store',
    reason: '店长安排本周重点练习',
    topic: '试驾邀约'
  }
];

var SCENE_EXAMPLES = [
  { id: 'price-1', topic: '价格异议', name: '客户直接问底价', difficulty: '中等', passedCount: 234 },
  { id: 'price-2', topic: '价格异议', name: '别家更便宜', difficulty: '较难', passedCount: 156 },
  { id: 'need-1', topic: '需求挖掘', name: '预算多少合适', difficulty: '简单', passedCount: 445 },
  { id: 'need-2', topic: '需求挖掘', name: '家里谁说了算', difficulty: '中等', passedCount: 312 },
  { id: 'product-1', topic: '产品介绍', name: '油耗多少', difficulty: '简单', passedCount: 567 },
  { id: 'product-2', topic: '产品介绍', name: '为什么选这车', difficulty: '较难', passedCount: 189 }
];

// 主渲染入口
function renderCoachPage() {
  var subPage = window.__currentSubPage__ || 'home';
  var hash = window.location.hash;
  if (hash.indexOf('#coach-home') > -1) subPage = 'home';
  else if (hash.indexOf('#coach-practice') > -1) subPage = 'practice';
  else if (hash.indexOf('#coach-feedback') > -1) subPage = 'feedback';
  else if (hash.indexOf('#coach-library') > -1) subPage = 'library';

  return coachStyles() + coachLayout(subPage);
}

function coachLayout(subPage) {
  return '<div class="phone-frame">' +
    '<div class="coach-app">' +
    coachHeader() +
    coachContent(subPage) +
    coachNavBar(subPage) +
    '</div></div>';
}

// ====== 内容区 ======
function coachContent(subPage) {
  switch(subPage) {
    case 'practice': return renderPracticePage();
    case 'feedback': return renderFeedbackPage();
    case 'library': return renderLibraryPage();
    default: return renderHomePage();
  }
}

// ====== 模块一：首页 ======
function renderHomePage() {
  return '<div class="coach-home">' +
    aiCoachSection() +
    todayPracticesSection() +
    practiceLibraryEntry() +
    '</div>';
}

// AI 教练区
function aiCoachSection() {
  return '<section class="ai-coach-section">' +
    '<div class="coach-profile">' +
    '<div class="coach-avatar">' + USER_DATA.coachName + '</div>' +
    '<div class="coach-info">' +
    '<div class="coach-title">你的专属销冠教练</div>' +
    '<div class="coach-status"><span class="status-dot"></span> 在等你来练</div>' +
    '</div>' +
    '</div>' +
    '<div class="coach-call">' + USER_DATA.todayCall + '</div>' +
    '<div class="growth-stats">' +
    '<div class="stat-item">' +
    '<div class="stat-value">' + USER_DATA.stats.totalSessions + '</div>' +
    '<div class="stat-label">累计对练</div>' +
    '</div>' +
    '<div class="stat-item">' +
    '<div class="stat-value">' + USER_DATA.stats.passedScenes + '</div>' +
    '<div class="stat-label">已通关</div>' +
    '</div>' +
    '<div class="stat-item streak">' +
    '<div class="stat-value">' + USER_DATA.stats.streakDays + '</div>' +
    '<div class="stat-label">连续天数</div>' +
    '</div>' +
    '</div>' +
    '<button class="btn-start-practice" onclick="window.location.hash=\'#coach-practice\'">' +
    '<span class="btn-icon">🎤</span>' +
    '<span class="btn-text">戴耳机开练</span>' +
    '<span class="btn-sub">已连接耳夹耳机 · 可边走边练</span>' +
    '</button>' +
    '</section>';
}

// 今日重点练习
function todayPracticesSection() {
  var cards = TODAY_PRACTICES.map(function(item, i) {
    var sourceLabel = item.sourceType === 'headquarters' ? '🔵 总部推送' :
                   item.sourceType === 'weak' ? '🟠 短板推送' : '🟢 店长推送';
    var sourceClass = item.sourceType;
    return '<div class="practice-card" onclick="window.location.hash=\'#coach-practice\'">' +
      '<div class="card-source ' + sourceClass + '">' + sourceLabel + '</div>' +
      '<div class="card-scene">' + item.scene + '</div>' +
      '<div class="card-reason">' + item.reason + '</div>' +
      '<div class="card-action">' +
        '<span>去练</span>' +
        '<span class="arrow">→</span>' +
      '</div>' +
    '</div>';
  }).join('');

  return '<section class="today-section">' +
    '<div class="section-header">' +
    '<h2 class="section-title">今日重点练习</h2>' +
    '</div>' +
    '<div class="practice-cards">' + cards + '</div>' +
    '</section>';
}

// 练习库入口
function practiceLibraryEntry() {
  return '<section class="library-entry">' +
    '<div class="entry-header">' +
    '<h2 class="section-title">练习库</h2>' +
    '<a href="#coach-library" class="see-all">查看全部 →</a>' +
    '</div>' +
    '<div class="topic-preview">' +
    COACH_TOPICS.slice(0, 6).map(function(t) {
      return '<div class="topic-chip" onclick="window.location.hash=\'#coach-library\'"><span>' + t.name + '</span></div>';
    }).join('') +
    '</div>' +
    '<div class="customer-preview">' +
    CUSTOMER_TYPES.slice(0, 4).map(function(t) {
      return '<div class="topic-chip" onclick="window.location.hash=\'#coach-library\'"><span>' + t.name + '</span></div>';
    }).join('') +
    '</div>' +
    '</section>';
}

// ====== 模块二：对练进行中 ======
function renderPracticePage() {
  return '<div class="coach-practice">' +
    practiceHeader() +
    voiceStateSection() +
    dialogBubble() +
    practiceControls() +
    '</div>';
}

function practiceHeader() {
  return '<div class="practice-header">' +
    '<button class="back-btn" onclick="window.location.hash=\'#coach-home\'">←</button>' +
    '<div class="scene-title">客户说"太贵了"怎么破</div>' +
    '<div class="free-hands"><span class="hands-icon">📱</span> 免手持</div>' +
    '</div>';
}

function voiceStateSection() {
  return '<div class="voice-state-section">' +
    '<div class="voice-orb speaking" id="voiceOrb">' +
    '<div class="orb-core"></div>' +
    '<div class="orb-wave w1"></div>' +
    '<div class="orb-wave w2"></div>' +
    '<div class="orb-wave w3"></div>' +
    '</div>' +
    '<div class="state-label" id="stateLabel">阿冠正在说...</div>' +
    '<div class="state-hint">免手持模式 · 可放进口袋边走边练</div>' +
    '</div>';
}

function dialogBubble() {
  return '<div class="dialog-section">' +
    '<div class="ai-bubble">' +
    '<div class="bubble-avatar">👤</div>' +
    '<div class="bubble-content">哥，这个价格确实是我们的底价了。您今天要是定的话，我找我们经理申请一下，送您两次保养。</div>' +
    '</div>' +
    '<div class="turn-hint">轮到你说了</div>' +
    '</div>';
}

function practiceControls() {
  return '<div class="controls-section">' +
    '<button class="btn-end-practice" onclick="window.location.hash=\'#coach-feedback\'">' +
    '结束并看反馈' +
    '</button>' +
    '</div>' +
    '<div class="demo-controls">' +
    '<button class="btn-demo" onclick="toggleVoiceState()">切换状态(演示)</button>' +
    '</div>';
}

// ====== 模块三：练习反馈 ======
function renderFeedbackPage() {
  return '<div class="coach-feedback">' +
    feedbackHeader() +
    scoreSection() +
    goodSection() +
    gapSection() +
    peerSection() +
    feedbackActions() +
    '</div>';
}

function feedbackHeader() {
  return '<div class="feedback-header">' +
    '<button class="back-btn" onclick="window.location.hash=\'#coach-home\'">←</button>' +
    '<div class="scene-title">练习完成</div>' +
    '</div>';
}

function scoreSection() {
  return '<div class="score-section">' +
    '<div class="score-circle">' +
    '<div class="score-value">82</div>' +
    '<div class="score-total">/100</div>' +
    '</div>' +
    '<div class="score-status pass">✓ 已通关</div>' +
    '<div class="score-compared">比上次 +9 分 ↑</div>' +
    '</div>';
}

function goodSection() {
  return '<div class="feedback-part">' +
    '<div class="part-title green">👍 你做得好的</div>' +
    '<div class="part-content">' +
    '<div class="highlight-item">✓ 客户提"贵"时你先问在意点，没急着报价</div>' +
    '<div class="highlight-item">✓ 及时抛出保养价值来转移话题</div>' +
    '<div class="highlight-item">✓ 用了"找经理申请"的缓冲策略</div>' +
    '</div>' +
    '</div>';
}

function gapSection() {
  return '<div class="feedback-part">' +
    '<div class="part-title orange">📚 和销冠的差距</div>' +
    '<div class="comparison-list">' +
    comparisonItem('你说的', '"我去找经理申请一下吧"', '没给确定承诺，客户会觉得没诚意') +
    comparisonItem('销冠会说', '"我和经理沟通下，除了两次保养，再给您争取脚垫和行车记录仪"', '具体到东西，更有诚意') +
    '</div>' +
    '</div>';
}

function comparisonItem(label, yourWord, tip) {
  return '<div class="comparison-item">' +
    '<div class="comp-label">' + label + '</div>' +
    '<div class="comp-quote">' + yourWord + '</div>' +
    '<div class="comp-tip">' + tip + '</div>' +
    '</div>';
}

function peerSection() {
  return '<div class="peer-section">' +
    '<div class="peer-count">128 位同事也在练这个难点</div>' +
    '<div class="peer-star">🌟 本场景高手：陈静 · <a href="#">看看TA怎么练的</a></div>' +
    '</div>';
}

function feedbackActions() {
  return '<div class="feedback-actions">' +
    '<button class="btn-repractice" onclick="window.location.hash=\'#coach-practice\'">' +
    '↻ 再练一遍' +
    '</button>' +
    '<button class="btn-done" onclick="window.location.hash=\'#coach-home\'">' +
    '完成' +
    '</button>' +
    '</div>';
}

// ====== 模块四：练习库 ======
function renderLibraryPage() {
  return '<div class="coach-library">' +
    libraryHeader() +
    libraryTabs() +
    libraryGrid() +
    '</div>';
}

function libraryHeader() {
  return '<div class="library-header">' +
    '<button class="back-btn" onclick="window.location.hash=\'#coach-home\'">←</button>' +
    '<div class="header-title">练习库</div>' +
    '<div class="search-icon">🔍</div>' +
    '</div>';
}

function libraryTabs() {
  return '<div class="library-tabs">' +
    '<button class="tab-btn active">按主题</button>' +
    '<button class="tab-btn">按客户类型</button>' +
    '</div>';
}

function libraryGrid() {
  var cards = SCENE_EXAMPLES.map(function(item) {
    return '<div class="scene-card" onclick="window.location.hash=\'#coach-practice\'">' +
      '<div class="scene-name">' + item.name + '</div>' +
      '<div class="scene-meta">' +
      '<span class="topic-tag">' + item.topic + '</span>' +
      '<span class="difficulty">' + item.difficulty + '</span>' +
      '</div>' +
      '<div class="scene-peers">' + item.passedCount + ' 人已通关</div>' +
      '</div>';
  }).join('');

  return '<div class="scene-grid">' + cards + '</div>';
}

// ====== 底部导航 ======
function coachNavBar(subPage) {
  var items = [
    { page: 'home', icon: '🏠', label: '首页' },
    { page: 'library', icon: '📚', label: '练习库' },
    { page: 'home', icon: '👤', label: '我的' }
  ];

  var btns = items.map(function(item) {
    var isActive = subPage === 'feedback' || subPage === 'practice' ?
      item.page === 'home' : subPage === item.page;
    return '<div class="nav-item ' + (isActive ? 'active' : '') + '" ' +
           'onclick="window.location.hash=\'#coach-' + item.page + '\'">' +
      '<div class="nav-icon">' + item.icon + '</div>' +
      '<div class="nav-label">' + item.label + '</div>' +
    '</div>';
  }).join('');

  return '<nav class="coach-navbar">' + btns + '</nav>';
}

// ====== 通用头部 ======
function coachHeader() {
  return '<header class="coach-header">' +
    '<div class="header-left">' +
    '<button class="back-btn" onclick="window.location.hash=\'#sales\'">←</button>' +
    '</div>' +
    '<div class="header-title">今日成交教练</div>' +
    '<div class="header-right"></div>' +
    '</header>';
}

// ====== 样式 ======
function coachStyles() {
  return '<style>' +
    ':focus{outline:none}' +
    '* {box-sizing: border-box;-webkit-tap-highlight-color:transparent}' +
    '.phone-frame {' +
    '  display:flex;justify-content:center;min-height:100vh;background:#f0f2f5;padding:12px;padding-bottom:80px' +
    '}' +
    '.coach-app {' +
    '  width:375px;max-width:100%;background:#fff;border-radius:16px;overflow:hidden;' +
    '  box-shadow:0 2px 12px rgba(0,0,0,0.08);position:relative' +
    '}' +

    // Header
    '.coach-header {' +
    '  height:56px;display:flex;align-items:center;justify-content:space-between;' +
    '  padding:0 16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff' +
    '}' +
    '.back-btn {' +
    '  background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:4px' +
    '}' +
    '.header-title {font-size:16px;font-weight:600}' +
    '.header-left,.header-right {width:40px}' +

    // Home - AI Coach Section
    '.ai-coach-section {' +
    '  background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:24px 20px' +
    '}' +
    '.coach-profile {display:flex;align-items:center;gap:12px;margin-bottom:16px}' +
    '.coach-avatar {' +
    '  width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:50%;' +
    '  display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600' +
    '}' +
    '.coach-title {font-size:14px;font-weight:600;margin-bottom:2px}' +
    '.coach-status {font-size:12px;opacity:0.8;display:flex;align-items:center;gap:6px}' +
    '.status-dot {' +
    '  width:8px;height:8px;background:#10b981;border-radius:50%;animation:pulse 2s infinite' +
    '}' +
    '@keyframes pulse {' +
    '  0%,100%{opacity:1}50%{opacity:0.5}' +
    '}' +
    '.coach-call {' +
    '  font-size:18px;font-weight:500;line-height:1.4;margin-bottom:20px;padding:12px;' +
    '  background:rgba(255,255,255,0.15);border-radius:12px' +
    '}' +

    // Growth Stats
    '.growth-stats {' +
    '  display:flex;gap:12px;margin-bottom:20px' +
    '}' +
    '.stat-item {' +
    '  flex:1;background:rgba(255,255,255,0.15);border-radius:12px;padding:12px 8px;text-align:center' +
    '}' +
    '.stat-item.streak {' +
    '  background:#f59e0b;color:#1e293b' +
    '}' +
    '.stat-value {' +
    '  font-size:22px;font-weight:700;margin-bottom:2px' +
    '}' +
    '.stat-label {font-size:11px;opacity:0.8}' +
    '.stat-item.streak .stat-label {opacity:0.7}' +

    // Start Button
    '.btn-start-practice {' +
    '  width:100%;background:#10b981;border:none;padding:16px;border-radius:14px;' +
    '  color:#fff;font-size:16px;font-weight:600;cursor:pointer;' +
    '  display:flex;flex-direction:column;align-items:center;gap:4px' +
    '}' +
    '.btn-icon {font-size:24px;margin-bottom:4px}' +
    '.btn-sub {font-size:11px;opacity:0.8;font-weight:400}' +

    // Today Practice Section
    '.today-section {' +
    '  padding:20px;border-bottom:1px solid #f1f5f9' +
    '}' +
    '.section-header {display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}' +
    '.section-title {font-size:16px;font-weight:600;color:#1e293b}' +
    '.practice-cards {display:flex;flex-direction:column;gap:10px}' +
    '.practice-card {' +
    '  background:#f8fafc;border-radius:12px;padding:14px;cursor:pointer' +
    '}' +
    '.card-source {' +
    '  font-size:11px;margin-bottom:6px;font-weight:500' +
    '}' +
    '.card-source.headquarters {color:#3b82f6}' +
    '.card-source.weak {color:#f97316}' +
    '.card-source.store {color:#10b981}' +
    '.card-scene {font-size:14px;font-weight:600;color:#1e293b;margin-bottom:4px}' +
    '.card-reason {font-size:12px;color:#64748b;margin-bottom:8px}' +
    '.card-action {' +
    '  display:flex;align-items:center;justify-content:space-between;color:#3b82f6;font-size:13px;font-weight:500' +
    '}' +
    '.arrow {font-size:16px}' +

    // Library Entry
    '.library-entry {padding:20px}' +
    '.see-all {font-size:13px;color:#3b82f6}' +
    '.topic-preview,.customer-preview {' +
    '  display:flex;flex-wrap:wrap;gap:8px;margin-top:12px' +
    '}' +
    '.topic-chip {' +
    '  padding:8px 12px;background:#f1f5f9;border-radius:8px;font-size:12px;color:#475569;cursor:pointer' +
    '}' +
    '.topic-chip:hover {background:#e2e8f0}' +

    // Navbar
    '.coach-navbar {' +
    '  position:absolute;bottom:0;left:0;right:0;height:64px;background:#fff;' +
    '  border-top:1px solid #f1f5f9;display:flex;padding:8px 16px' +
    '}' +
    '.nav-item {' +
    '  flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;' +
    '  cursor:pointer;color:#94a3b8' +
    '}' +
    '.nav-item.active {color:#6366f1}' +
    '.nav-icon {font-size:20px}' +
    '.nav-label {font-size:11px}' +

    // Practice Page
    '.coach-practice {' +
    '  min-height:calc(100vh - 56px);display:flex;flex-direction:column;' +
    '  background:linear-gradient(180deg,#6366f1 0%,#f0f2f5 100%)' +
    '}' +
    '.practice-header {' +
    '  display:flex;align-items:center;justify-content:space-between;padding:16px;' +
    '  color:#fff' +
    '}' +
    '.scene-title {font-size:15px;font-weight:500}' +
    '.free-hands {font-size:12px;display:flex;align-items:center;gap:4px;opacity:0.8}' +

    // Voice Orb
    '.voice-state-section {' +
    '  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
    '  padding:40px 20px' +
    '}' +
    '.voice-orb {' +
    '  width:160px;height:160px;position:relative;display:flex;align-items:center;justify-content:center' +
    '}' +
    '.orb-core {' +
    '  width:100px;height:100px;background:#f97316;border-radius:50%;' +
    '  display:flex;align-items:center;justify-content:center;font-size:40px;color:#fff' +
    '}' +
    '.voice-orb:not(.speaking) .orb-core {background:#3b82f6}' +
    '.orb-wave {' +
    '  position:absolute;width:100%;height:100%;border-radius:50%;' +
    '  border:2px solid #f97316;opacity:0;animation:wave 2s ease-out infinite' +
    '}' +
    '.voice-orb:not(.speaking) .orb-wave {border-color:#3b82f6}' +
    '.orb-wave.w1 {animation-delay:0s}' +
    '.orb-wave.w2 {animation-delay:0.5s}' +
    '.orb-wave.w3 {animation-delay:1s}' +
    '@keyframes wave {' +
    '  0%{transform:scale(1);opacity:0.6}' +
    '  100%{transform:scale(1.8);opacity:0}' +
    '}' +
    '.state-label {' +
    '  font-size:18px;font-weight:600;color:#fff;margin-top:20px' +
    '}' +
    '.state-hint {font-size:12px;color:#fff;opacity:0.7;margin-top:8px}' +

    // Dialog Bubble
    '.dialog-section {padding:0 20px 20px}' +
    '.ai-bubble {' +
    '  background:#fff;border-radius:16px;padding:14px 16px;' +
    '  display:flex;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06)' +
    '}' +
    '.bubble-avatar {font-size:24px}' +
    '.bubble-content {font-size:14px;line-height:1.5;color:#374151}' +
    '.turn-hint {' +
    '  text-align:center;font-size:13px;color:#10b981;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:6px' +
    '}' +

    // Controls
    '.controls-section {padding:20px}' +
    '.btn-end-practice {' +
    '  width:100%;background:#fff;border:none;padding:16px;border-radius:14px;' +
    '  font-size:15px;font-weight:600;color:#6366f1;cursor:pointer' +
    '}' +
    '.demo-controls {text-align:center;padding-bottom:20px}' +
    '.btn-demo {' +
    '  background:rgba(255,255,255,0.3);border:none;padding:10px 20px;' +
    '  border-radius:20px;color:#fff;font-size:12px;cursor:pointer' +
    '}' +

    // Feedback Page
    '.coach-feedback {' +
    '  background:#f8fafc;min-height:calc(100vh - 56px)' +
    '}' +
    '.feedback-header {' +
    '  display:flex;align-items:center;padding:16px;background:#fff' +
    '}' +

    '.score-section {' +
    '  background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:32px 20px;' +
    '  text-align:center' +
    '}' +
    '.score-circle {' +
    '  width:100px;height:100px;background:rgba(255,255,255,0.2);border-radius:50%;' +
    '  margin:0 auto 16px;display:flex;align-items:center;justify-content:center' +
    '}' +
    '.score-value {font-size:36px;font-weight:700}' +
    '.score-total {font-size:18px;opacity:0.7}' +
    '.score-status {' +
    '  display:inline-block;background:#10b981;color:#fff;padding:6px 16px;' +
    '  border-radius:20px;font-size:14px;font-weight:500;margin-bottom:8px' +
    '}' +
    '.score-compared {font-size:14px;opacity:0.9}' +

    '.feedback-part {' +
    '  background:#fff;margin:12px;border-radius:12px;padding:16px' +
    '}' +
    '.part-title {' +
    '  font-size:14px;font-weight:600;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #f1f5f9' +
    '}' +
    '.part-title.green {color:#10b981}' +
    '.part-title.orange {color:#f97316}' +
    '.highlight-item {' +
    '  font-size:13px;color:#374151;padding:8px 0;border-bottom:1px solid #f8fafc' +
    '}' +
    '.highlight-item:last-child {border:none}' +

    '.comparison-list {display:flex;flex-direction:column;gap:12px}' +
    '.comparison-item {' +
    '  background:#f8fafc;border-radius:10px;padding:12px' +
    '}' +
    '.comp-label {' +
    '  font-size:11px;font-weight:600;margin-bottom:6px' +
    '}' +
    '.comp-quote {' +
    '  font-size:13px;font-weight:500;color:#1e293b;margin-bottom:6px' +
    '}' +
    '.comp-tip {font-size:12px;color:#64748b}' +

    '.peer-section {' +
    '  margin:12px;padding:16px;background:#fff;border-radius:12px;text-align:center' +
    '}' +
    '.peer-count {font-size:13px;color:#64748b;margin-bottom:10px}' +
    '.peer-star {font-size:13px;color:#f59e0b}' +
    '.peer-star a {color:#6366f1;text-decoration:underline}' +

    '.feedback-actions {' +
    '  display:flex;gap:12px;padding:20px 12px;position:fixed;bottom:0;left:0;right:0;' +
    '  background:#fff;box-shadow:0 -2px 8px rgba(0,0,0,0.04)' +
    '}' +
    '.btn-repractice {' +
    '  flex:1;background:#6366f1;border:none;padding:14px;border-radius:12px;' +
    '  color:#fff;font-size:15px;font-weight:600;cursor:pointer' +
    '}' +
    '.btn-done {' +
    '  background:#f1f5f9;border:none;padding:14px 24px;border-radius:12px;' +
    '  color:#374151;font-size:15px;font-weight:500;cursor:pointer' +
    '}' +

    // Library Page
    '.coach-library {' +
    '  background:#f8fafc;min-height:calc(100vh - 56px);padding-bottom:70px' +
    '}' +
    '.library-header {' +
    '  display:flex;align-items:center;justify-content:space-between;padding:16px;' +
    '  background:#fff;border-bottom:1px solid #f1f5f9' +
    '}' +
    '.search-icon {font-size:18px;cursor:pointer}' +

    '.library-tabs {' +
    '  display:flex;padding:12px;background:#fff;gap:8px' +
    '}' +
    '.tab-btn {' +
    '  flex:1;background:#f1f5f9;border:none;padding:10px;border-radius:8px;' +
    '  font-size:13px;color:#64748b;cursor:pointer' +
    '}' +
    '.tab-btn.active {background:#6366f1;color:#fff}' +

    '.scene-grid {' +
    '  display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px' +
    '}' +
    '.scene-card {' +
    '  background:#fff;border-radius:12px;padding:14px;cursor:pointer' +
    '}' +
    '.scene-name {font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px}' +
    '.scene-meta {display:flex;gap:6px;margin-bottom:8px}' +
    '.topic-tag {font-size:10px;padding:2px 6px;background:#f1f5f9;color:#64748b;border-radius:4px}' +
    '.difficulty {font-size:10px;padding:2px 6px;background:#fef3c7;color:#b45309;border-radius:4px}' +
    '.scene-peers {font-size:11px;color:#94a3b8}' +
    '</style>';
}

// 语音状态切换（演示用）
window.toggleVoiceState = function() {
  var orb = document.getElementById('voiceOrb');
  var label = document.getElementById('stateLabel');
  if (orb.classList.contains('speaking')) {
    orb.classList.remove('speaking');
    label.textContent = '轮到你说了';
  } else {
    orb.classList.add('speaking');
    label.textContent = '阿冠正在说...';
  }
};

// 导出模块
window.Coach = {
  navigate: function(page) {
    window.__currentSubPage__ = page;
    var app = document.getElementById('app');
    if (app && typeof renderCoachPage === 'function') {
      app.innerHTML = renderCoachPage();
    }
  }
};

// 注册到路由
console.log('[Coach] Registering coach page...');
Router.register('coach', renderCoachPage);
console.log('[Coach] Registered. Pages:', Object.keys(Router.pages));