/**
 * 总部后台 - 高保真版
 * 基于现有架构持续迭代
 */

// 常量定义
var SOP_LINKS = [
  { id: '迎接准备', name: '🚗 迎接准备', count: 12 },
  { id: '需求分析', name: '🔍 需求分析', count: 18 },
  { id: '产品介绍', name: '🚙 产品介绍', count: 15 },
  { id: '留资开口', name: '📝 留资开口', count: 10 },
  { id: '试乘试驾前', name: '🎯 试乘试驾前', count: 8 },
  { id: '试乘试驾中', name: '🛣️ 试乘试驾中', count: 7 },
  { id: '试乘试驾后', name: '🏁 试乘试驾后', count: 11 }
];

var CUSTOMER_TYPES = [
  { id: '砍价型', name: '💰 砍价型', count: 156 },
  { id: '纠结油电型', name: '⚡ 纠结油电型', count: 89 },
  { id: '带竞品来比型', name: '🔎 带竞品来比型', count: 67 },
  { id: '只看不买型', name: '👀 只看不买型', count: 234 },
  { id: '全家来看型', name: '👨‍👩‍👧 全家来看型', count: 45 },
  { id: '预算有限型', name: '💵 预算有限型', count: 78 },
  { id: '高意向待逼单型', name: '🎯 高意向待逼单型', count: 34 },
  { id: '复购转介绍型', name: '🔄 复购转介绍型', count: 23 }
];

// 推送详情导航（从薄弱项跳转时使用）
var __pendingPushDetail = null;
function navigateToPushDetail(pushId) {
  __pendingPushDetail = pushId;
  window.location.hash = 'hq-push';
  setTimeout(function() {
    if (__pendingPushDetail) {
      openPushDetail(__pendingPushDetail);
      __pendingPushDetail = null;
    }
  }, 50);
}

// 课件库数据（多维度归属）
var COURSEWARE_DATA = [
  { title: 'MG4 产品核心卖点讲解', type: 'ppt', sop: '产品介绍', lib: '车型产品手册', product: 'MG4', activity: '26年国庆大促', status: 'complete', updated: '2小时前', tags: ['产品介绍', 'MG4', '26年国庆大促'] },
  { title: 'MG7 竞品对比话术实战', type: 'video', sop: '产品介绍', lib: '竞品对比资料', product: 'MG7', activity: '常规销售', status: 'missing-video', updated: '昨天', tags: ['产品介绍', 'MG7', '竞品对比'] },
  { title: '留资开口标准话术要点', type: 'knowledge', sop: '留资开口', lib: '话术案例库', product: '全系通用', activity: '常规销售', status: 'complete', updated: '3天前', tags: ['留资开口', '全系通用', '话术'] },
  { title: 'MG Cyberster 展厅接待攻略', type: 'ppt', sop: '迎接准备', lib: '车型产品手册', product: 'MG Cyberster', activity: '春季新品发布', status: 'missing-q', updated: '1周前', tags: ['迎接准备', 'MG Cyberster', '春季新品发布'] },
  { title: '新能源 vs 燃油车深度对比', type: 'video', sop: '需求分析', lib: '竞品对比资料', product: 'MG ES5', activity: '26年国庆大促', status: 'complete', updated: '1周前', tags: ['需求分析', 'MG ES5', '油电对比'] },
  { title: '金融方案推荐技巧', type: 'ppt', sop: '需求分析', lib: '金融方案资料', product: 'MG4', activity: '双11购车节', status: 'complete', updated: '5天前', tags: ['需求分析', 'MG4', '金融方案'] },
  { title: '试驾邀约标准流程', type: 'knowledge', sop: '试乘试驾前', lib: '话术案例库', product: '全系通用', activity: '周年庆', status: 'pending', updated: '2天前', tags: ['试驾邀约', '全系通用', '话术'] },
  { title: 'MG3 价格异议处理', type: 'ppt', sop: '需求分析', lib: '价格政策文档', product: 'MG3', activity: '常规销售', status: 'complete', updated: '昨天', tags: ['需求分析', 'MG3', '价格异议'] },
  { title: 'MG4 试驾体验要点讲解', type: 'video', sop: '试乘试驾中', lib: '车型产品手册', product: 'MG4', activity: '26年国庆大促', status: 'missing-video', updated: '4天前', tags: ['试乘试驾中', 'MG4', '26年国庆大促'] },
  { title: '试驾后跟进回访话术', type: 'knowledge', sop: '试乘试驾后', lib: '话术案例库', product: '全系通用', activity: '常规销售', status: 'complete', updated: '6天前', tags: ['试乘试驾后', '全系通用', '话术'] },
  { title: 'MG7 选配方案推荐', type: 'ppt', sop: '产品介绍', lib: '配置参数表', product: 'MG7', activity: '周年庆', status: 'pending', updated: '3天前', tags: ['产品介绍', 'MG7', '配置参数'] },
  { title: 'MG ES5 家庭用车场景讲解', type: 'video', sop: '产品介绍', lib: '车型产品手册', product: 'MG ES5', activity: '春季新品发布', status: 'offline', updated: '2周前', tags: ['产品介绍', 'MG ES5', '家庭用车'] }
];

// 题库数据（专项 → 训练单元 层级结构）
var QUESTION_BANK_DATA = [
  {
    id: 'new-car', name: '新车上线专项', icon: '🚗',
    comprehensive: { name: '新车产品知识综合通关训练', questions: 120, learners: 856, updated: '2026-05-25' },
    units: [
      { name: '车型配置与参数', questions: 25, learners: 856, updated: '2026-05-25', status: 'ok', note: '' },
      { name: '产品核心卖点讲解', questions: 30, learners: 856, updated: '2026-05-24', status: 'warning', note: '80%一次通过，太简单' },
      { name: '竞品对比分析', questions: 25, learners: 720, updated: '2026-05-22', status: 'ok', note: '' },
      { name: '标准接待话术', questions: 20, learners: 680, updated: '2026-05-20', status: 'error', note: '实战转化率下降8%，话术可能过时' },
      { name: '选配规则', questions: 20, learners: 560, updated: '2026-05-18', status: 'ok', note: '' }
    ]
  },
  {
    id: 'marketing', name: '营销活动专项', icon: '🎯',
    comprehensive: { name: '营销活动综合通关训练', questions: 85, learners: 720, updated: '2026-05-22' },
    units: [
      { name: '活动政策解读', questions: 20, learners: 720, updated: '2026-05-22', status: 'ok', note: '' },
      { name: '促销话术演练', questions: 25, learners: 680, updated: '2026-05-20', status: 'warning', note: '平均练5次才过，太难' },
      { name: '客户邀约技巧', questions: 20, learners: 650, updated: '2026-05-18', status: 'ok', note: '' },
      { name: '活动复盘分析', questions: 20, learners: 580, updated: '2026-05-15', status: 'ok', note: '' }
    ]
  },
  {
    id: 'finance', name: '金融政策专项', icon: '💰',
    comprehensive: { name: '金融政策综合通关训练', questions: 60, learners: 540, updated: '2026-05-18' },
    units: [
      { name: '贷款方案介绍', questions: 20, learners: 540, updated: '2026-05-18', status: 'ok', note: '' },
      { name: '分期计算实操', questions: 15, learners: 520, updated: '2026-05-16', status: 'warning', note: '通过率仅42%，难度偏大' },
      { name: '置换补贴政策', questions: 15, learners: 500, updated: '2026-05-14', status: 'ok', note: '' },
      { name: '保险方案推荐', questions: 10, learners: 460, updated: '2026-05-12', status: 'ok', note: '' }
    ]
  },
  {
    id: 'store-mgmt', name: '门店管理专项', icon: '🏪',
    comprehensive: { name: '门店管理综合通关训练', questions: 50, learners: 320, updated: '2026-05-15' },
    units: [
      { name: '展厅陈列规范', questions: 15, learners: 320, updated: '2026-05-15', status: 'ok', note: '' },
      { name: '客户接待流程', questions: 15, learners: 310, updated: '2026-05-13', status: 'ok', note: '' },
      { name: '数据报表分析', questions: 10, learners: 280, updated: '2026-05-10', status: 'warning', note: '内容需随新政策更新' },
      { name: '团队绩效管理', questions: 10, learners: 260, updated: '2026-05-08', status: 'ok', note: '' }
    ]
  },
  {
    id: 'daily-sop', name: '日常 SOP 训练', icon: '📋',
    comprehensive: { name: 'SOP 全流程综合通关训练', questions: 140, learners: 920, updated: '2026-05-20' },
    units: [
      { name: '迎接准备', questions: 20, learners: 920, updated: '2026-05-20', status: 'ok', note: '' },
      { name: '需求分析', questions: 25, learners: 900, updated: '2026-05-19', status: 'warning', note: '80%一次通过，太简单' },
      { name: '产品介绍', questions: 25, learners: 880, updated: '2026-05-18', status: 'ok', note: '' },
      { name: '留资开口', questions: 20, learners: 860, updated: '2026-05-17', status: 'error', note: '实战转化率下滑12%' },
      { name: '试乘试驾前', questions: 15, learners: 840, updated: '2026-05-16', status: 'ok', note: '' },
      { name: '试乘试驾中', questions: 15, learners: 820, updated: '2026-05-15', status: 'ok', note: '' },
      { name: '试乘试驾后', questions: 20, learners: 800, updated: '2026-05-14', status: 'ok', note: '' }
    ]
  }
];

// 主渲染入口
function renderHQPage() {
  var subPage = window.__currentSubPage__ || 'overview';
  var hash = window.location.hash;
  if (hash.indexOf('#hq-targeted-question') > -1) subPage = 'targeted-question';
  else if (hash.indexOf('#hq-course-make') > -1) subPage = 'course-make';
  else if (hash.indexOf('#hq-course') > -1) subPage = 'course';
  else if (hash.indexOf('#hq-knowledge-question') > -1) subPage = 'knowledge-question';
  else if (hash.indexOf('#hq-knowledge') > -1) subPage = 'knowledge';
  else if (hash.indexOf('#hq-question') > -1) subPage = 'knowledge-question';
  else if (hash.indexOf('#hq-push') > -1) subPage = 'push';
  else if (hash.indexOf('#hq-script') > -1) subPage = 'script';

  return hqStyles() + hqLayout(subPage);
}

// ====== 布局结构 ======
function hqLayout(subPage) {
  return '<div class="hq-layout">' +
    sidebar(subPage) +
    '<main class="hq-main">' +
    header(subPage) +
    hqContent(subPage) +
    '</main></div>';
}

function sidebar(activePage) {
  return '<aside class="hq-sidebar">' +
    '<div class="hq-logo">' +
    '<div class="logo-text"><div class="brand">零售培训中心</div></div>' +
    '</div>' +
    '<nav class="hq-nav">' +
    navItem('overview', '培训概览', activePage) +
    navItem('course', '课件制作', activePage) +
    navItem('knowledge', '知识管理', (activePage === 'knowledge' || activePage === 'knowledge-question') ? 'knowledge' : '') +
    navItem('push', '推送任务', activePage) +
    navItem('script', '实战话术', activePage) +
    '</nav>' +
    '<div class="hq-footer">' +
    '<div class="help-link">帮助中心</div>' +
    '</div>' +
    '</aside>';
}

function navItem(page, label, current) {
  var isActive = page === current;
  var cls = isActive ? ' nav-item-active' : '';
  return '<a class="nav-item' + cls + '" href="#hq-' + page + '">' +
    '<span class="nav-label">' + label + '</span>' +
    '</a>';
}

function header(page) {
  var titles = {
    overview: '培训概览',
    course: '课件制作',
    'course-make': '课件制作',
    knowledge: '知识管理',
    push: '推送任务',
    script: '实战话术',
    'targeted-question': '针对出题'
  };
  return '<header class="hq-header">' +
    '<div class="header-left">' +
    '<h1 class="page-title">' + (titles[page] || '培训概览') + '</h1>' +
    '</div>' +
    '<div class="header-right">' +
    '<div class="user-info">' +
    '<div class="user-avatar">张</div>' +
    '<div class="user-detail"><div class="user-name">张培训师</div><div class="user-role">总部培训部</div></div>' +
    '</div>' +
    '</div>' +
    '</header>';
}

function overviewStatsBar() {
  return '<div class="overview-stats">' +
    '<div class="ov-stat-item"><div class="ov-stat-val">234</div><div class="ov-stat-label">覆盖门店数</div></div>' +
    '<div class="ov-stat-item"><div class="ov-stat-val">1,856</div><div class="ov-stat-label">覆盖人数</div></div>' +
    '<div class="ov-stat-item"><div class="ov-stat-val">2,340h</div><div class="ov-stat-label">累计学习时长</div></div>' +
    '<div class="ov-stat-item"><div class="ov-stat-val">1,856</div><div class="ov-stat-label">今日学习人数</div></div>' +
    '<div class="ov-stat-item"><div class="ov-stat-val">76%</div><div class="ov-stat-label">本周学习率</div></div>' +
    '</div>';
}

function hqContent(page) {
  switch(page) {
    case 'course': return renderCourseMakeChat();
    case 'course-make': return renderCourseMake();
    case 'knowledge': return renderKnowledgePage();
    case 'knowledge-question': return renderKnowledgePageQuestion();
    case 'push': return renderPushPage();
    case 'script': return renderScriptPage();
    case 'targeted-question': return renderTargetedQuestionPage();
    default: return renderOverviewPage();
  }
}

// ====== 模块一：培训概览 ======
function renderOverviewPage() {
  return '<div class="hq-content">' +
    overviewStatsBar() +
    '<div class="hq-row">' +
    trendChart() +
    pushSnapshot() +
    '</div>' +
    '<div class="hq-row">' +
    storeDist() +
    weakPoints() +
    '</div>';
}

function metricsGrid() {
  return '<div class="metrics-grid">' +
    metricCard('今日活跃', '1,856', '覆盖 234 家门店', '+12%', 'up') +
    metricCard('累计学习时长', '2,340h', '人均 1.26h/天', '+8%', 'up') +
    metricCard('本周完成率', '76%', '上周 71%', '+5%', 'up') +
    metricCard('本周通关率', '68%', '上周 71%', '-3%', 'down');
}

function metricCard(label, value, sub, change, dir) {
  var arrow = dir === 'up' ? '↑' : '↓';
  var cls = dir === 'up' ? 'positive' : 'negative';
  return '<div class="metric-card">' +
    '<div class="metric-header">' +
    '<span class="metric-label">' + label + '</span>' +
    '<span class="metric-change ' + cls + '">' + arrow + ' ' + change + '</span>' +
    '</div>' +
    '<div class="metric-value">' + value + '</div>' +
    '<div class="metric-sub">' + sub + '</div>' +
    '</div>';
}

function trendChart() {
  return '<div class="hq-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">学习趋势</h3>' +
    '<div class="card-actions">' +
    '<button class="chip">门店</button>' +
    '<button class="chip active">人数</button>' +
    '<button class="chip">通关率</button>' +
    '</div>' +
    '</div>' +
    '<div class="chart-container">' +
    '<svg class="trend-svg" viewBox="0 0 800 200">' +
    '<defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3B82F6" stop-opacity="0.2"/><stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/></linearGradient></defs>' +
    '<path class="chart-fill" d="M0,160 Q50,140 100,130 T200,110 T300,90 T400,70 T500,60 T600,50 T700,40 T800,30 L800,200 L0,200 Z" fill="url(#grad)"/>' +
    '<path class="chart-line" d="M0,160 Q50,140 100,130 T200,110 T300,90 T400,70 T500,60 T600,50 T700,40 T800,30" fill="none" stroke="#3B82F6" stroke-width="3"/>' +
    '</svg>' +
    '<div class="chart-labels">' +
    '<span>30天前</span><span>25天前</span><span>20天前</span><span>15天前</span><span>10天前</span><span>5天前</span><span>今天</span>' +
    '</div>' +
    '</div>' +
    '</div>';
}

function weakPoints() {
  var items = [
    { name: '价格异议处理', link: '需求分析', percent: '61%', type: '🔴 严重偏弱', pushId: '1' },
    { name: '竞品对比话术', link: '产品介绍', percent: '58%', type: '🟠 偏弱', pushId: '4' },
    { name: '留资开口技巧', link: '留资开口', percent: '52%', type: '🟠 偏弱', pushId: '7' },
    { name: '试驾异议处理', link: '试乘试驾中', percent: '45%', type: '🟡 一般', pushId: '3' },
    { name: '逼单促单话术', link: '试乘试驾后', percent: '38%', type: '🟡 一般', pushId: '5' }
  ];

  var listHtml = items.map(function(item, i) {
    return '<li class="weak-item">' +
      '<span class="weak-rank">' + (i + 1) + '</span>' +
      '<div class="weak-info">' +
      '<div class="weak-name">' + item.name + '</div>' +
      '<div class="weak-meta">' + item.link + '</div>' +
      '</div>' +
      '<span class="weak-tag">' + item.type + '</span>' +
      '<button class="weak-action" onclick="navigateToPushDetail(\'' + item.pushId + '\')">查看</button>' +
      '</li>';
  }).join('');

  return '<div class="hq-card weak-points-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">本月薄弱项 TOP5</h3>' +
    '</div>' +
    '<ul class="weak-list">' + listHtml + '</ul>' +
    '</div>';
}

function storeDist() {
  return '<div class="hq-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">本月门店学习进度</h3>' +
    '</div>' +
    '<div class="store-list">' +
    storeItem('深圳宝安 MG 4S 店', 'MG4产品知识考核', 98, '积极') +
    storeItem('上海浦东 MG 中心', '价格异议处理专项', 95, '积极') +
    storeItem('广州天河 MG 旗舰店', '竞品对比话术训练', 88, '正常') +
    storeItem('成都锦江 MG 体验店', '留资开口技巧', 76, '正常') +
    storeItem('北京朝阳 MG 体验中心', '试驾流程标准化', 72, '落后') +
    '</div>' +
    '</div>';
}

function storeItem(name, task, pct, status) {
  var statusCls = status === '积极' ? 'good' : (status === '正常' ? 'normal' : 'poor');
  return '<div class="store-item">' +
    '<div class="store-info">' +
    '<div class="store-name">' + name + '</div>' +
    '<div class="store-city">' + task + '</div>' +
    '</div>' +
    '<div class="store-bar-wrap">' +
    '<div class="store-bar" style="width:' + pct + '%"></div>' +
    '</div>' +
    '<span class="store-stat ' + statusCls + '">' + pct + '%</span>' +
    '</div>';
}

function pushSnapshot() {
  return '<div class="hq-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">本月推送任务</h3>' +
    '<a href="#hq-push" class="card-link">查看全部 →</a>' +
    '</div>' +
    '<div class="push-snapshot">' +
    pushSnapItem('《价格异议处理专项》', '今天 14:30', 68, ['PPT', '产品介绍']) +
    pushSnapItem('《竞品对比话术》', '昨天', 45, ['MG4']) +
    pushSnapItem('《留资开口技巧》', '周一', 82, ['PPT', 'MG4']) +
    '</div>' +
    '</div>';
}

function pushSnapItem(title, time, pct, tags) {
  var tagsHtml = (tags || []).map(function(t) { return '<span class="snap-tag">' + t + '</span>'; }).join('');
  return '<div class="snap-item">' +
    '<div class="snap-info">' +
    '<div class="snap-title">' + title + '</div>' +
    '<div class="snap-time">' + time + '</div>' +
    (tagsHtml ? '<div class="snap-tags">' + tagsHtml + '</div>' : '') +
    '</div>' +
    '<div class="snap-progress">' +
    '<div class="snap-bar" style="width:' + pct + '%"></div>' +
    '<span>' + pct + '% 完成</span>' +
    '</div>' +
    '</div>';
}

// ====== 模块二：课件制作（AI 对话式） ======
function renderCourseMakeChat() {
  return '<div class="hq-content cm-chat-page">' +
    '<div class="cm-chat-layout">' +
    cmLeftMaterials() +
    cmCenterChat() +
    cmRightPreview() +
    '</div>' +
    '</div>';
}

function cmLeftMaterials() {
  return '<aside class="cm-left">' +
    '<div class="cm-section-header">' +
    '<div class="cm-section-title">可选资料</div>' +
    '<button class="cm-upload-btn">上传资料</button>' +
    '</div>' +
    '<div class="cm-search"><input type="text" placeholder="搜索资料..."/></div>' +
    '<div class="cm-mat-group">' +
    '<div class="cm-mat-label">车型手册</div>' +
    cmMatItem('Model Y 配置手册.pdf', '2.4MB', true) +
    cmMatItem('Model 3 价格政策.docx', '380KB', true) +
    cmMatItem('Model X 选装表.xlsx', '125KB', false) +
    '</div>' +
    '<div class="cm-mat-group">' +
    '<div class="cm-mat-label">竞品对比</div>' +
    cmMatItem('比亚迪汉 vs Model 3.pdf', '1.8MB', true) +
    cmMatItem('问界 M7 对比报告.pdf', '2.1MB', false) +
    '</div>' +
    '<div class="cm-mat-group">' +
    '<div class="cm-mat-label">销冠话术</div>' +
    cmMatItem('价格异议-销冠陈静.mp3', '8.2MB', false) +
    cmMatItem('留资场景-销冠李伟.mp3', '6.5MB', false) +
    '</div>' +
    '<div class="cm-selected-summary">已选 3 份资料 · 共 4.6MB</div>' +
    '</aside>';
}

function cmMatItem(name, size, selected) {
  return '<div class="cm-mat-item' + (selected ? ' selected' : '') + '">' +
    '<input type="checkbox"' + (selected ? ' checked' : '') + '/>' +
    '<div class="cm-mat-info">' +
    '<div class="cm-mat-name">' + name + '</div>' +
    '<div class="cm-mat-size">' + size + '</div>' +
    '</div>' +
    '</div>';
}

function cmCenterChat() {
  return '<main class="cm-center">' +
    '<div class="cm-chat-header">' +
    '<div class="cm-bot-avatar">AI</div>' +
    '<div>' +
    '<div class="cm-bot-name">AI 课件助手</div>' +
    '<div class="cm-bot-sub">基于左侧资料，帮你一键生成 PPT / 视频 / 通关话术</div>' +
    '</div>' +
    '</div>' +
    '<div class="cm-chat-messages">' +
    cmMsgBot('您好！我是您的课件助手。请告诉我您想做什么样的课件，我会基于您选定的资料帮您生成：<br><br>• PPT 培训课件<br>• 短视频口播脚本<br>• 通关话术 + 配套题目<br><br>试试发送：「基于 Model Y 配置手册，做一份价格异议处理 PPT」') +
    cmMsgUser('基于已选的 Model Y 配置手册和价格政策，做一份「价格异议处理」专项课件，要包含 PPT、口播视频脚本和通关话术。') +
    cmMsgBot('好的，我已识别到 3 份资料，正在生成中...<br><br>✅ 已抽取关键卖点：电池租用方案、保养政策、保险方案<br>✅ 已匹配销冠话术：陈静在「客户嫌贵」场景的 3 段经典应对<br>✅ 已生成大纲：① 客户砍价心理 → ② 替代降价的 5 种话术 → ③ 实战演练<br><br>右侧已生成「价格异议处理 v1」，您可以：<br>• 切换 PPT/视频/话术 三种形态查看<br>• 告诉我「把第3页拆成口播」或「再生成 2 道通关题」') +
    '</div>' +
    '<div class="cm-quick-prompts">' +
    '<button class="cm-quick">把价格政策做成 PPT</button>' +
    '<button class="cm-quick">基于竞品资料生成对比口播</button>' +
    '<button class="cm-quick">把销冠语音转成通关话术</button>' +
    '</div>' +
    '<div class="cm-chat-input">' +
    '<textarea placeholder="描述你的课件需求，比如：基于 Model Y 配置手册，生成一份留资话术课件..." rows="2"></textarea>' +
    '<button class="cm-send-btn">发送</button>' +
    '</div>' +
    '</main>';
}

function cmMsgBot(html) {
  return '<div class="cm-msg cm-msg-bot">' +
    '<div class="cm-msg-avatar">AI</div>' +
    '<div class="cm-msg-bubble">' + html + '</div>' +
    '</div>';
}

function cmMsgUser(html) {
  return '<div class="cm-msg cm-msg-user">' +
    '<div class="cm-msg-bubble">' + html + '</div>' +
    '<div class="cm-msg-avatar">张</div>' +
    '</div>';
}

function cmRightPreview() {
  return '<aside class="cm-right">' +
    '<div class="cm-preview-header">' +
    '<div class="cm-preview-title">价格异议处理 v1</div>' +
    '<div class="cm-format-tabs">' +
    '<button class="cm-tab active" data-cmtab="ppt">PPT</button>' +
    '<button class="cm-tab" data-cmtab="video">视频</button>' +
    '<button class="cm-tab" data-cmtab="script">通关话术</button>' +
    '</div>' +
    '</div>' +
    '<div class="cm-preview-body">' +
    cmPreviewPPT() +
    cmPreviewVideo() +
    cmPreviewScript() +
    '</div>' +
    '<div class="cm-preview-actions">' +
    '<button class="btn-secondary">保存草稿</button>' +
    '<button class="btn-primary">发布到知识管理</button>' +
    '</div>' +
    '</aside>';
}

function cmPreviewPPT() {
  return '<div class="cm-preview-ppt">' +
    '<div class="cm-ppt-slide">' +
    '<div class="cm-slide-num">封面页 1/12</div>' +
    '<div class="cm-slide-title">价格异议处理</div>' +
    '<div class="cm-slide-sub">从客户砍价心理到 5 种应对话术</div>' +
    '<div class="cm-slide-tag">来源：Model Y 配置手册 · 销冠陈静话术</div>' +
    '</div>' +
    '<div class="cm-slide-thumbs">' +
    cmSlideThumb(1, true) + cmSlideThumb(2, false) + cmSlideThumb(3, false) +
    cmSlideThumb(4, false) + cmSlideThumb(5, false) + cmSlideThumb(6, false) +
    '</div>' +
    '</div>';
}

function cmPreviewVideo() {
  return '<div class="cm-preview-video" style="display:none">' +
    '<div class="cm-video-player">' +
    '<div class="cm-video-play">▶</div>' +
    '<div class="cm-video-meta">短视频口播脚本 · 时长 2:18</div>' +
    '</div>' +
    '<div class="cm-video-script">' +
    '<div class="cm-script-line"><b>[0:00]</b> 哥，您说太贵了，我特别理解。咱先不聊价格，您方便说说，您最看重的是哪几个点？</div>' +
    '<div class="cm-script-line"><b>[0:15]</b> 我们家这台 Model Y，电池是宁德时代最新一代，质保 8 年 16 万公里...</div>' +
    '<div class="cm-script-line"><b>[0:42]</b> 您要是今天能定，我立刻找经理给您申请：两次免费保养 + 价值 3000 的脚垫和行车记录仪...</div>' +
    '<div class="cm-script-line"><b>[1:20]</b> 您看，这样算下来，等于变相省了将近 5000 块，比直接降价对您更划算...</div>' +
    '</div>' +
    '</div>';
}

function cmPreviewScript() {
  return '<div class="cm-preview-script" style="display:none">' +
    '<div class="cm-script-card">' +
    '<div class="cm-script-q">客户提问</div>' +
    '<div class="cm-script-q-text">"你们这车太贵了，比亚迪汉同配置便宜 3 万呢"</div>' +
    '<div class="cm-script-a">销冠应答（陈静）</div>' +
    '<div class="cm-script-a-text">不直接降价，先承接情绪，再用差异化价值替代：「您对比的很仔细，我也理解预算这个事。不过同价位里咱家几个点比亚迪暂时还没做到：辅助驾驶系统 / 充电网络 / 二手保值率。您看您日常用车更看重哪个？」</div>' +
    '<div class="cm-script-tips">配套通关题 3 道 · 难度：中等 · 平均通关率 67%</div>' +
    '</div>' +
    '<div class="cm-script-card">' +
    '<div class="cm-script-q">客户提问</div>' +
    '<div class="cm-script-q-text">"再便宜五千我今天就定"</div>' +
    '<div class="cm-script-a">销冠应答</div>' +
    '<div class="cm-script-a-text">用赠品替代降价，给客户面子：「价格上真的到底了，但您今天能定，我给您争取脚垫 + 行车记录仪 + 两次保养，加起来差不多三千多，您看行不？」</div>' +
    '<div class="cm-script-tips">配套通关题 2 道 · 难度：较难</div>' +
    '</div>' +
    '</div>';
}

function cmSlideThumb(num, active) {
  return '<div class="cm-thumb' + (active ? ' active' : '') + '">' + num + '</div>';
}

// ====== 模块三：知识管理（课件 + 题库） ======
function renderKnowledgePage() {
  return '<div class="hq-content">' +
    '<div class="kn-tabs">' +
    '<span class="kn-tab active">课件库 <span class="kn-tab-count">89</span></span>' +
    '<a href="#hq-knowledge-question" class="kn-tab">题库 <span class="kn-tab-count">456</span></a>' +
    '</div>' +
    renderCoursePage() +
    '</div>';
}

// 题库独立页面（可直接 #hq-knowledge-question 访问，不依赖 Tab 切换）
function renderKnowledgePageQuestion() {
  return '<div class="hq-content">' +
    '<div class="kn-tabs">' +
    '<a href="#hq-knowledge" class="kn-tab">课件库 <span class="kn-tab-count">89</span></a>' +
    '<span class="kn-tab active">题库 <span class="kn-tab-count">456</span></span>' +
    '</div>' +
    renderQuestionPageContent() +
    '</div>';
}

// 题库内容（独立函数，被 Tab 切换和独立页面复用）
function renderQuestionPageContent() {
  return '<div class="question-layout">' +
    questionLeftSidebar() +
    questionRightTable() +
    '</div>';
}

// ====== 模块（旧）：课件管理 ======
function renderCoursePage() {
  var sopOptions = ['迎接准备','需求分析','产品介绍','留资开口','试乘试驾前','试乘试驾中','试乘试驾后'];
  var libOptions = ['车型产品手册','配置参数表','价格政策文档','竞品对比资料','金融方案资料','话术案例库'];
  var productOptions = ['MG4','MG7','MG ES5','MG Cyberster','MG3','全系通用'];
  var activityOptions = [
    { name: '26年国庆大促', status: 'active' },
    { name: '周年庆', status: 'upcoming' },
    { name: '春季新品发布', status: 'ended' },
    { name: '双11购车节', status: 'upcoming' },
    { name: '常规销售', status: 'active' }
  ];

  var html = '';
  // 顶栏：搜索 + 新建
  html += '<div class="cw-topbar">';
  html += '<div class="search-box"><span class="search-icon">🔍</span><input type="text" placeholder="搜索课件标题或标签..." class="search-input" id="cwSearchInput"/></div>';
  html += '<button class="btn-new"><span>+</span> 新建课件</button>';
  html += '</div>';

  // 四组并行筛选器
  html += '<div class="cw-filters">';

  // 维度1：服务环节
  html += '<div class="cw-filter-group"><span class="cw-filter-label">服务环节</span><div class="cw-filter-chips">';
  sopOptions.forEach(function(s) {
    html += '<button class="cw-chip" data-dim="sop" data-val="' + s + '">' + s + '</button>';
  });
  html += '</div></div>';

  // 维度2：资料库
  html += '<div class="cw-filter-group"><span class="cw-filter-label">资料库</span><div class="cw-filter-chips">';
  libOptions.forEach(function(l) {
    html += '<button class="cw-chip" data-dim="lib" data-val="' + l + '">' + l + '</button>';
  });
  html += '</div></div>';

  // 维度3：产品
  html += '<div class="cw-filter-group"><span class="cw-filter-label">产品</span><div class="cw-filter-chips">';
  productOptions.forEach(function(p) {
    html += '<button class="cw-chip" data-dim="product" data-val="' + p + '">' + p + '</button>';
  });
  html += '</div></div>';

  // 维度4：活动（带时间状态）
  html += '<div class="cw-filter-group"><span class="cw-filter-label">活动</span><div class="cw-filter-chips">';
  activityOptions.forEach(function(a) {
    var ico = a.status === 'active' ? '🟢' : a.status === 'upcoming' ? '🔵' : '⚪';
    html += '<button class="cw-chip cw-chip-activity" data-dim="activity" data-val="' + a.name + '" data-activity-status="' + a.status + '">' + ico + ' ' + a.name + '</button>';
  });
  html += '<label class="cw-hide-ended"><input type="checkbox" id="cwHideEnded"/> 隐藏已结束活动</label>';
  html += '</div></div>';

  html += '</div>'; // end cw-filters

  // 课件卡片网格
  html += '<div class="cw-grid" id="cwGrid">';
  COURSEWARE_DATA.forEach(function(c) {
    html += coursewareCard(c);
  });
  html += '</div>';

  return html;
}

function coursewareCard(c) {
  var typeLabels = { ppt: 'PPT', video: '视频', knowledge: '知识点' };
  var statusMap = {
    complete: { label: '✅ 已配套题目', cls: 'cw-status-ok' },
    'missing-video': { label: '⚠️ 缺视频', cls: 'cw-status-warn' },
    'missing-q': { label: '📝 待配题目', cls: 'cw-status-warn' },
    pending: { label: '⏳ 待审核', cls: 'cw-status-pending' },
    offline: { label: '🚫 已下架', cls: 'cw-status-offline' }
  };
  var st = statusMap[c.status] || statusMap.complete;

  var dimAttrs = '';
  if (c.sop) dimAttrs += ' data-sop="' + c.sop + '"';
  if (c.lib) dimAttrs += ' data-lib="' + c.lib + '"';
  if (c.product) dimAttrs += ' data-product="' + c.product + '"';
  if (c.activity) dimAttrs += ' data-activity="' + c.activity + '"';

  var tagsHtml = c.tags.map(function(t) { return '<span class="cw-tag">' + t + '</span>'; }).join('');

  return '<div class="cw-card"' + dimAttrs + ' data-status="' + c.status + '">' +
    '<div class="cw-card-type cw-type-' + c.type + '"><span class="cw-type-label">' + typeLabels[c.type] + '</span></div>' +
    '<div class="cw-card-title">' + c.title + '</div>' +
    '<div class="cw-card-tags">' + tagsHtml + '</div>' +
    '<div class="cw-card-status"><span class="' + st.cls + '">' + st.label + '</span></div>' +
    '<div class="cw-card-footer">' +
    '<span class="cw-card-time">' + c.updated + '</span>' +
    '<div class="cw-card-actions">' +
    '<button class="cw-action-btn">编辑</button>' +
    '<button class="cw-action-btn">推送</button>' +
    '<button class="cw-action-btn">下架</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

// 课件库筛选逻辑
function applyCoursewareFilter() {
  var activeFilters = { sop: [], lib: [], product: [], activity: [] };
  document.querySelectorAll('.cw-chip.active').forEach(function(chip) {
    var dim = chip.getAttribute('data-dim');
    var val = chip.getAttribute('data-val');
    if (activeFilters[dim]) activeFilters[dim].push(val);
  });

  var hideEnded = document.getElementById('cwHideEnded') && document.getElementById('cwHideEnded').checked;

  var endedActivities = [];
  document.querySelectorAll('.cw-chip-activity[data-activity-status="ended"]').forEach(function(chip) {
    endedActivities.push(chip.getAttribute('data-val'));
  });

  var hasAnyFilter = activeFilters.sop.length > 0 || activeFilters.lib.length > 0 || activeFilters.product.length > 0 || activeFilters.activity.length > 0;

  document.querySelectorAll('.cw-card').forEach(function(card) {
    var visible = true;

    if (hasAnyFilter) {
      ['sop', 'lib', 'product', 'activity'].forEach(function(dim) {
        if (activeFilters[dim].length > 0) {
          var cardVal = card.getAttribute('data-' + dim);
          if (!cardVal || activeFilters[dim].indexOf(cardVal) === -1) {
            visible = false;
          }
        }
      });
    }

    if (visible && hideEnded) {
      var cardActivity = card.getAttribute('data-activity');
      if (cardActivity && endedActivities.indexOf(cardActivity) !== -1) {
        visible = false;
      }
    }

    card.style.display = visible ? '' : 'none';
  });
}

// 课件制作子页
function renderCourseMake() {
  return '<div class="hq-content course-make">' +
    '<div class="make-layout">' +
    '<div class="make-result">' +
    '<div class="result-header">' +
    '<input type="text" class="title-input" value="《价格异议处理进阶》" placeholder="课件标题"/>' +
    '<div class="type-toggle">' +
    '<button class="toggle-btn active">PPT</button>' +
    '<button class="toggle-btn">视频</button>' +
    '<button class="toggle-btn">知识点</button>' +
    '</div>' +
    '</div>' +
    '<div class="result-preview">' +
    '<div class="preview-placeholder">' +
    '<div class="preview-icon">PPT</div>' +
    '<div class="preview-text">PPT 预览区</div>' +
    '<div class="preview-pages">共 12 页</div>' +
    '</div>' +
    '</div>' +
    '<div class="result-actions">' +
    '<button class="btn-secondary">保存草稿</button>' +
    '<button class="btn-primary">发布课件</button>' +
    '</div>' +
    '</div>' +
    '<div class="make-chat">' +
    '<div class="chat-header">' +
    '<div class="chat-title">AI 课件助手</div>' +
    '<div class="chat-sub">描述需求，我来帮你生成</div>' +
    '</div>' +
    '<div class="chat-messages">' +
    '<div class="msg bot">您好！我是您的课件助手。可以告诉我：<br><br>• "把这本价格手册做成课件"<br>• "把第3页拆成3个知识点"<br>• "配一段讲竞品对比的口播视频"<br><br>请告诉我您的需求~</div>' +
    '</div>' +
    '<div class="chat-input-area">' +
    '<textarea class="chat-textarea" placeholder="描述您的课件需求..." rows="3"></textarea>' +
    '<button class="btn-send">发送</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<a href="#hq-course" class="back-link">← 返回课件库</a>' +
    '</div>';
}

// ====== 模块三：题库管理（专项层级化） ======
function renderQuestionPageContent() {
  var html = '<div class="qb-page">';

  // 一级专项 Tab 切换
  html += '<div class="qb-tabs">';
  QUESTION_BANK_DATA.forEach(function(sp, idx) {
    html += '<button class="qb-tab' + (idx === 0 ? ' active' : '') + '" data-qb-tab="' + sp.id + '">' + sp.name + '</button>';
  });
  html += '</div>';

  // 每个专项的内容面板
  QUESTION_BANK_DATA.forEach(function(sp, idx) {
    html += '<div class="qb-panel' + (idx === 0 ? ' active' : '') + '" data-qb-panel="' + sp.id + '">';

    // 综合通关训练大卡
    html += '<div class="qb-comp">';
    html += '<div class="qb-comp-head"><span class="qb-comp-label">🏆 综合通关训练</span><span class="qb-comp-desc">该专项全部单元串起来的综合考核</span></div>';
    html += '<div class="qb-comp-card">';
    html += '<div class="qb-comp-info">';
    html += '<div class="qb-comp-name">' + sp.comprehensive.name + '</div>';
    html += '<div class="qb-comp-meta">' + sp.comprehensive.questions + '题 · ' + sp.comprehensive.learners + '人学习 · ' + sp.comprehensive.updated + '</div>';
    html += '</div>';
    html += '<div class="qb-comp-actions">';
    html += '<button class="qb-comp-btn">查看详情</button>';
    html += '<button class="qb-comp-btn qb-comp-btn-primary">推送整套</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    // 训练单元标题栏
    html += '<div class="qb-units-bar">';
    html += '<h3 class="qb-units-title">训练单元</h3>';
    html += '<button class="btn-new"><span>+</span> 新建训练单元</button>';
    html += '</div>';

    // 训练单元卡片网格
    html += '<div class="qb-units-grid">';
    sp.units.forEach(function(u) {
      html += renderUnitCard(u, sp.name);
    });
    html += '</div>';

    html += '</div>'; // end qb-panel
  });

  html += '</div>'; // end qb-page
  return html;
}

function renderUnitCard(u, specialName) {
  var sm = {
    ok: { label: '🟢 正常', cls: 'qb-status-ok' },
    warning: { label: '🟡 建议优化', cls: 'qb-status-warn' },
    error: { label: '🔴 实战下滑', cls: 'qb-status-err' }
  };
  var st = sm[u.status] || sm.ok;

  return '<div class="qb-unit-card">' +
    '<div class="qb-unit-name">' + u.name + '</div>' +
    '<div class="qb-unit-meta">' +
    '<span>' + specialName + '</span>' +
    '<span class="qb-meta-dot">·</span>' +
    '<span>' + u.questions + '题</span>' +
    '<span class="qb-meta-dot">·</span>' +
    '<span>' + u.learners + '人学习</span>' +
    '</div>' +
    '<div class="qb-unit-status">' +
    '<span class="' + st.cls + '">' + st.label + '</span>' +
    (u.note ? '<div class="qb-unit-note">' + u.note + '</div>' : '') +
    '</div>' +
    '<div class="qb-unit-footer">' +
    '<span class="qb-unit-time">' + u.updated + '</span>' +
    '<div class="qb-unit-actions">' +
    '<button class="qb-action-link">编辑</button>' +
    '<button class="qb-action-link">调难度</button>' +
    '<button class="qb-action-link">推送</button>' +
    '<button class="qb-action-link">关联课件</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

// ====== 模块四：推送任务 ======

// 推送任务数据
var PUSH_TASKS = [
  {
    id: '1',
    contentName: 'MG3 价格异议处理', contentType: '课件',
    tags: ['需求分析', 'MG3', '价格异议'],
    coverageStores: 156, coverageGuides: 1248,
    sentTime: '2026-05-25 14:30', deadline: '2026-06-01',
    status: 'doing', viewRate: 84, finishRate: 68, passRate: 52,
    stores: [
      { name: '北京朝阳 MG 体验中心', city: '北京', total: 12, completed: 11, passRate: 92 },
      { name: '上海浦东 MG 4S 店', city: '上海', total: 15, completed: 14, passRate: 87 },
      { name: '广州天河 MG 旗舰店', city: '广州', total: 10, completed: 8, passRate: 75 },
      { name: '成都春熙路 MG 体验中心', city: '成都', total: 8, completed: 5, passRate: 58 },
      { name: '杭州西湖 MG 4S 店', city: '杭州', total: 9, completed: 4, passRate: 42 },
      { name: '郑州金水 MG 4S 店', city: '郑州', total: 7, completed: 2, passRate: 28 }
    ],
    persons: [
      { name: '张小红', store: '北京朝阳 MG 体验中心', status: '已完成', score: 92 },
      { name: '王美丽', store: '北京朝阳 MG 体验中心', status: '已完成', score: 88 },
      { name: '刘芳', store: '上海浦东 MG 4S 店', status: '已完成', score: 85 },
      { name: '陈晓', store: '广州天河 MG 旗舰店', status: '进行中', score: 60 },
      { name: '李娜', store: '成都春熙路 MG 体验中心', status: '进行中', score: 45 },
      { name: '赵勇', store: '郑州金水 MG 4S 店', status: '未开始', score: 0 },
      { name: '孙志', store: '杭州西湖 MG 4S 店', status: '未开始', score: 0 }
    ]
  },
  {
    id: '2',
    contentName: 'MG4 产品核心卖点讲解', contentType: '课件',
    tags: ['产品介绍', 'MG4', '26年国庆大促'],
    coverageStores: 234, coverageGuides: 1856,
    sentTime: '2026-05-24 09:00', deadline: '2026-05-31',
    status: 'doing', viewRate: 92, finishRate: 78, passRate: 65,
    stores: [
      { name: '上海浦东 MG 4S 店', city: '上海', total: 15, completed: 15, passRate: 96 },
      { name: '北京朝阳 MG 体验中心', city: '北京', total: 12, completed: 11, passRate: 88 },
      { name: '深圳南山 MG 体验中心', city: '深圳', total: 10, completed: 7, passRate: 68 },
      { name: '天津滨海 MG 体验中心', city: '天津', total: 6, completed: 3, passRate: 50 }
    ],
    persons: [
      { name: '陈明', store: '上海浦东 MG 4S 店', status: '已完成', score: 95 },
      { name: '王丽', store: '北京朝阳 MG 体验中心', status: '已完成', score: 82 },
      { name: '李华', store: '深圳南山 MG 体验中心', status: '进行中', score: 55 }
    ]
  },
  {
    id: '3',
    contentName: '试驾邀约标准流程', contentType: '题库',
    tags: ['试驾邀约', '全系通用', '话术'],
    coverageStores: 198, coverageGuides: 1520,
    sentTime: '2026-05-20 10:00', deadline: '2026-05-27',
    status: 'done', viewRate: 96, finishRate: 88, passRate: 76,
    stores: [
      { name: '广州天河 MG 旗舰店', city: '广州', total: 10, completed: 10, passRate: 94 },
      { name: '成都春熙路 MG 体验中心', city: '成都', total: 8, completed: 7, passRate: 82 },
      { name: '杭州西湖 MG 4S 店', city: '杭州', total: 9, completed: 6, passRate: 65 }
    ],
    persons: [
      { name: '张明', store: '广州天河 MG 旗舰店', status: '已完成', score: 90 },
      { name: '李强', store: '成都春熙路 MG 体验中心', status: '已完成', score: 78 }
    ]
  },
  {
    id: '4',
    contentName: 'MG7 竞品对比话术实战', contentType: '课件',
    tags: ['产品介绍', 'MG7', '竞品对比'],
    coverageStores: 120, coverageGuides: 960,
    sentTime: '2026-05-18 16:00', deadline: '2026-05-25',
    status: 'done', viewRate: 98, finishRate: 91, passRate: 82,
    stores: [],
    persons: []
  },
  {
    id: '5',
    contentName: '金融方案推荐技巧', contentType: '课件',
    tags: ['需求分析', 'MG4', '金融方案'],
    coverageStores: 89, coverageGuides: 712,
    sentTime: '2026-05-15 11:00', deadline: '2026-05-22',
    status: 'done', viewRate: 95, finishRate: 85, passRate: 71,
    stores: [],
    persons: []
  },
  {
    id: '6',
    contentName: '新能源 vs 燃油车深度对比', contentType: '课件',
    tags: ['需求分析', 'MG ES5', '油电对比'],
    coverageStores: 200, coverageGuides: 1600,
    sentTime: '2026-05-28 08:00', deadline: '2026-06-11',
    status: 'doing', viewRate: 45, finishRate: 28, passRate: 15,
    stores: [
      { name: '北京朝阳 MG 体验中心', city: '北京', total: 12, completed: 7, passRate: 52 },
      { name: '郑州金水 MG 4S 店', city: '郑州', total: 7, completed: 1, passRate: 14 }
    ],
    persons: [
      { name: '赵刚', store: '北京朝阳 MG 体验中心', status: '进行中', score: 50 },
      { name: '钱伟', store: '郑州金水 MG 4S 店', status: '未开始', score: 0 }
    ]
  },
  {
    id: '7',
    contentName: 'MG4 学练任务包', contentType: 'package',
    contentItems: {
      coursewares: [{ title: 'MG4 产品核心卖点讲解', type: 'ppt', duration: 12 }],
      questions: [{ name: '新车上线专项', count: 10, duration: 15 }],
      scene: { name: '价格异议处理', duration: 15 }
    },
    tags: ['产品介绍', 'MG4', '26年国庆大促'],
    coverageStores: 180, coverageGuides: 1440,
    sentTime: '2026-05-28 10:00', deadline: '2026-06-11',
    status: 'doing', viewRate: 52, finishRate: 35, passRate: 22,
    stores: [
      { name: '北京朝阳 MG 体验中心', city: '北京', total: 12, completed: 7, passRate: 52 },
      { name: '上海浦东 MG 4S 店', city: '上海', total: 15, completed: 5, passRate: 33 }
    ],
    persons: [
      { name: '张小红', store: '北京朝阳 MG 体验中心', status: '进行中', score: 55 },
      { name: '王美丽', store: '上海浦东 MG 4S 店', status: '未开始', score: 0 }
    ]
  }
];

// 陪练场景库数据
var PRACTICE_SCENE_DATA = [
  { id: 'price', name: '价格异议处理', icon: '💰', duration: 15, desc: '客户说"太贵了"怎么破' },
  { id: 'test-drive', name: '试驾邀约话术', icon: '🚗', duration: 10, desc: '邀约客户试乘试驾' },
  { id: 'need-analysis', name: '需求分析探询', icon: '🔍', duration: 12, desc: '挖掘客户真实购车需求' },
  { id: 'close-deal', name: '逼单促成技巧', icon: '🎯', duration: 10, desc: '临门一脚促成成交' },
  { id: 'leave-contact', name: '留资开口', icon: '📝', duration: 8, desc: '自然留下客户联系方式' },
  { id: 'oil-ev', name: '油电对比引导', icon: '⚡', duration: 15, desc: '引导油车客户关注新能源' }
];

// 创建弹层状态
var __pushCreateState = { step: 1, coursewareIds: [], questionIds: [], sceneId: null, tags: [], customTags: [], deadline: '1w' };

function getContentTags() {
  var tags = [];
  __pushCreateState.coursewareIds.forEach(function(idx) {
    var c = COURSEWARE_DATA[idx];
    if (c) tags = tags.concat(c.tags);
  });
  __pushCreateState.questionIds.forEach(function(idx) {
    var q = QUESTION_BANK_DATA[idx];
    if (q) tags.push(q.name);
  });
  if (__pushCreateState.sceneId !== null) {
    var s = PRACTICE_SCENE_DATA[__pushCreateState.sceneId];
    if (s) tags.push(s.name);
  }
  return tags;
}

function estimateCoverage(tags) {
  var base = tags.length * 47 + 23;
  return { stores: base, guides: base * 8 };
}

function renderPushPage() {
  return '<div class="hq-content push-page">' +
    '<div class="page-toolbar">' +
    '<button class="btn-new" onclick="openPushCreate()">+ 新建推送</button>' +
    '</div>' +
    '<div id="pushDetailView" style="display:none"></div>' +
    '<div id="pushListView">' + pushTaskList() + '</div>' +
    pushCreateModal() +
    '</div>';
}

// ====== 新建推送弹层（5步） ======
function pushCreateModal() {
  return '<div class="pu-modal-mask" id="puModalMask" onclick="closePushCreate()"></div>' +
    '<div class="pu-modal" id="puModal">' +
    '<div class="pu-modal-header">' +
    '<div class="pu-modal-title">新建推送</div>' +
    '<button class="pu-modal-close" onclick="closePushCreate()">×</button>' +
    '</div>' +
    '<div class="pu-steps-bar" id="puStepsBar">' +
    '<div class="pu-step-item active" data-pustep="1"><span class="pu-step-dot">1</span>选内容</div>' +
    '<div class="pu-step-line"></div>' +
    '<div class="pu-step-item" data-pustep="2"><span class="pu-step-dot">2</span>选标签</div>' +
    '<div class="pu-step-line"></div>' +
    '<div class="pu-step-item" data-pustep="3"><span class="pu-step-dot">3</span>设截止</div>' +
    '<div class="pu-step-line"></div>' +
    '<div class="pu-step-item" data-pustep="4"><span class="pu-step-dot">4</span>确认</div>' +
    '<div class="pu-step-line"></div>' +
    '<div class="pu-step-item" data-pustep="5"><span class="pu-step-dot">5</span>发送</div>' +
    '</div>' +
    '<div class="pu-modal-body" id="puModalBody"></div>' +
    '<div class="pu-modal-footer" id="puModalFooter"></div>' +
    '</div>';
}

function openPushCreate() {
  __pushCreateState = { step: 1, coursewareIds: [], questionIds: [], sceneId: null, tags: [], customTags: [], deadline: '1w' };
  var m = document.getElementById('puModal');
  var mask = document.getElementById('puModalMask');
  if (m) m.style.display = 'flex';
  if (mask) mask.style.display = 'block';
  renderPushStep();
}

function closePushCreate() {
  var m = document.getElementById('puModal');
  var mask = document.getElementById('puModalMask');
  if (m) m.style.display = 'none';
  if (mask) mask.style.display = 'none';
}

function renderPushStep() {
  var s = __pushCreateState;
  var body = document.getElementById('puModalBody');
  var footer = document.getElementById('puModalFooter');
  var steps = document.querySelectorAll('.pu-step-item');
  steps.forEach(function(el) {
    var n = parseInt(el.getAttribute('data-pustep'));
    el.classList.remove('active', 'done');
    if (n === s.step) el.classList.add('active');
    if (n < s.step) el.classList.add('done');
  });

  var bodyHTML = '';
  var footerHTML = '';

  switch (s.step) {
    case 1:
      bodyHTML = pushStep1Content();
      footerHTML = '<button class="btn-primary" onclick="nextPushStep()" id="puNextBtn" disabled>下一步</button>';
      break;
    case 2:
      bodyHTML = pushStep2Content();
      footerHTML = '<button class="btn-secondary" onclick="prevPushStep()">上一步</button>' +
        '<button class="btn-primary" onclick="nextPushStep()">下一步</button>';
      break;
    case 3:
      bodyHTML = pushStep3Content();
      footerHTML = '<button class="btn-secondary" onclick="prevPushStep()">上一步</button>' +
        '<button class="btn-primary" onclick="nextPushStep()">下一步</button>';
      break;
    case 4:
      bodyHTML = pushStep4Content();
      footerHTML = '<button class="btn-secondary" onclick="prevPushStep()">上一步</button>' +
        '<button class="btn-primary" onclick="nextPushStep()">确认并发送</button>';
      break;
    case 5:
      bodyHTML = pushStep5Content();
      footerHTML = '<button class="btn-primary" onclick="closePushCreate()">完成</button>';
      break;
  }

  if (body) body.innerHTML = bodyHTML;
  if (footer) footer.innerHTML = footerHTML;
  if (s.step === 1) { updateOrderPreview(); updateNextBtn(); }
}

function nextPushStep() {
  if (__pushCreateState.step < 5) {
    __pushCreateState.step++;
    renderPushStep();
  }
}

function prevPushStep() {
  if (__pushCreateState.step > 1) {
    __pushCreateState.step--;
    renderPushStep();
  }
}

function pushStep1Content() {
  var cwHTML = COURSEWARE_DATA.map(function(c, i) {
    var sel = __pushCreateState.coursewareIds.indexOf(i) > -1;
    return '<label class="pu-pick-item' + (sel ? ' selected' : '') + '" onclick="toggleCourseware(' + i + ',this)">' +
      '<input type="checkbox" style="display:none"/>' +
      '<div class="pu-pick-info"><div class="pu-pick-name">' + c.title + '</div><div class="pu-pick-meta">' + c.type.toUpperCase() + ' · ' + c.sop + '</div></div>' +
      '</label>';
  }).join('');

  var qbHTML = QUESTION_BANK_DATA.map(function(q, i) {
    var sel = __pushCreateState.questionIds.indexOf(i) > -1;
    return '<label class="pu-pick-item' + (sel ? ' selected' : '') + '" onclick="toggleQuestion(' + i + ',this)">' +
      '<input type="checkbox" style="display:none"/>' +
      '<div class="pu-pick-info"><div class="pu-pick-name">' + q.name + '</div><div class="pu-pick-meta">题库 · ' + q.units.length + ' 个训练单元</div></div>' +
      '</label>';
  }).join('');

  var scHTML = PRACTICE_SCENE_DATA.map(function(s, i) {
    var sel = __pushCreateState.sceneId === i;
    return '<label class="pu-scene-item' + (sel ? ' selected' : '') + '" onclick="selectScene(' + i + ',this)">' +
      '<input type="radio" name="pushScene" style="display:none"/>' +
      '<div class="pu-pick-icon">' + s.icon + '</div>' +
      '<div class="pu-pick-info"><div class="pu-pick-name">' + s.name + '</div><div class="pu-pick-meta">约 ' + s.duration + ' 分钟 · ' + s.desc + '</div></div>' +
      '</label>';
  }).join('');

  return '<div class="pu-step-title">第一步：组合内容（学完顺势就练）</div>' +
    '<div class="pu-step-desc">勾选课件和题目（可选），选择陪练场景（必选），系统自动按「课件→题目→陪练」顺序打包</div>' +

    '<div class="pu-combo-section">' +
    '<div class="pu-combo-title">📎 选课件 <span class="pu-combo-hint">可选，多选</span></div>' +
    '<div class="pu-pick-list" style="max-height:200px">' + (cwHTML || '<div class="pu-empty-hint">暂无课件</div>') + '</div>' +
    '</div>' +

    '<div class="pu-combo-section">' +
    '<div class="pu-combo-title">📝 选题目 <span class="pu-combo-hint">可选，多选</span></div>' +
    '<div class="pu-pick-list" style="max-height:200px">' + (qbHTML || '<div class="pu-empty-hint">暂无题目</div>') + '</div>' +
    '</div>' +

    '<div class="pu-combo-section">' +
    '<div class="pu-combo-title">🎤 选陪练场景 <span class="pu-combo-required">*必选</span></div>' +
    '<div class="pu-scene-list">' + scHTML + '</div>' +
    '</div>' +

    '<div class="pu-order-preview" id="puOrderPreview"></div>';
}

function pushStep2Content() {
  var contentTags = getContentTags();
  var allTags = contentTags.concat(__pushCreateState.customTags.filter(function(t) { return contentTags.indexOf(t) === -1; }));
  var selectedTags = __pushCreateState.tags;
  var cov = estimateCoverage(selectedTags.length ? selectedTags : allTags);

  var tagsHTML = allTags.map(function(t) {
    var sel = selectedTags.indexOf(t) > -1;
    return '<span class="pu-tag-chip' + (sel ? ' selected' : '') + '" onclick="togglePushTag(\'' + t.replace(/'/g, "\\'") + '\',this)">' + t + '</span>';
  }).join('');

  return '<div class="pu-step-title">第二步：选择推送标签</div>' +
    '<div class="pu-step-desc">勾选标签确定推送范围，系统已自动读取内容关联标签</div>' +
    '<div class="pu-tags-section">' +
    '<div class="pu-tags-label">内容自带标签</div>' +
    '<div class="pu-tags-list">' + tagsHTML + '</div>' +
    '</div>' +
    '<div class="pu-custom-tag">' +
    '<span class="pu-tags-label">自定义标签</span>' +
    '<div style="display:flex;gap:8px;margin-top:8px"><input type="text" class="pu-tag-input" id="puCustomTagInput" placeholder="输入自定义标签..."/>' +
    '<button class="btn-secondary" onclick="addCustomTag()" style="white-space:nowrap">+ 添加</button></div>' +
    '<div class="pu-tags-list" id="puCustomTagsList" style="margin-top:8px"></div>' +
    '</div>' +
    '<div class="pu-coverage" id="puCoverage">预计覆盖 <b>' + cov.stores + '</b> 家门店 / <b>' + cov.guides + '</b> 位导购</div>';
}

function pushStep3Content() {
  var dl = __pushCreateState.deadline;
  return '<div class="pu-step-title">第三步：设置截止时间</div>' +
    '<div class="pu-step-desc">选择导购需在此时间前完成学习和练习</div>' +
    '<div class="pu-deadline-options">' +
    '<label class="pu-dl-option' + (dl === '3d' ? ' selected' : '') + '" onclick="selectDeadline(\'3d\',this)"><input type="radio" name="deadline" style="display:none"/><span class="pu-dl-label">3 天</span><span class="pu-dl-hint">适合紧急专项</span></label>' +
    '<label class="pu-dl-option' + (dl === '1w' ? ' selected' : '') + '" onclick="selectDeadline(\'1w\',this)"><input type="radio" name="deadline" style="display:none"/><span class="pu-dl-label">1 周</span><span class="pu-dl-hint">适合常规推送</span></label>' +
    '<label class="pu-dl-option' + (dl === '2w' ? ' selected' : '') + '" onclick="selectDeadline(\'2w\',this)"><input type="radio" name="deadline" style="display:none"/><span class="pu-dl-label">2 周</span><span class="pu-dl-hint">适合深度内容</span></label>' +
    '<label class="pu-dl-option' + (dl === 'none' ? ' selected' : '') + '" onclick="selectDeadline(\'none\',this)"><input type="radio" name="deadline" style="display:none"/><span class="pu-dl-label">无截止</span><span class="pu-dl-hint">适合长期参考</span></label>' +
    '</div>';
}

function calcTotalDuration() {
  var total = 0;
  __pushCreateState.coursewareIds.forEach(function(idx) {
    total += 8; // 课件统一估算 8 分钟
  });
  __pushCreateState.questionIds.forEach(function(idx) {
    var q = QUESTION_BANK_DATA[idx];
    total += q ? q.units.length * 3 : 10;
  });
  if (__pushCreateState.sceneId !== null) {
    var s = PRACTICE_SCENE_DATA[__pushCreateState.sceneId];
    total += s ? s.duration : 10;
  }
  return total;
}

function buildTimelineHTML() {
  var step = 1;
  var html = '';
  __pushCreateState.coursewareIds.forEach(function(idx) {
    var c = COURSEWARE_DATA[idx];
    if (!c) return;
    html += '<div class="pu-timeline-item"><div class="pu-tl-num">' + step + '</div><div class="pu-tl-info"><div class="pu-tl-label">📎 看课件</div><div class="pu-tl-name">' + c.title + '</div></div><div class="pu-tl-time">约 8 分钟</div></div>';
    step++;
  });
  __pushCreateState.questionIds.forEach(function(idx) {
    var q = QUESTION_BANK_DATA[idx];
    if (!q) return;
    var dur = q.units ? q.units.length * 3 : 10;
    html += '<div class="pu-timeline-item"><div class="pu-tl-num">' + step + '</div><div class="pu-tl-info"><div class="pu-tl-label">📝 做题目</div><div class="pu-tl-name">' + q.name + '</div></div><div class="pu-tl-time">约 ' + dur + ' 分钟</div></div>';
    step++;
  });
  if (__pushCreateState.sceneId !== null) {
    var s = PRACTICE_SCENE_DATA[__pushCreateState.sceneId];
    if (s) {
      html += '<div class="pu-timeline-item pu-tl-final"><div class="pu-tl-num">' + step + '</div><div class="pu-tl-info"><div class="pu-tl-label">🎤 陪练</div><div class="pu-tl-name">' + s.name + '</div></div><div class="pu-tl-time">约 ' + s.duration + ' 分钟</div></div>';
    }
  }
  return html;
}

function pushStep4Content() {
  var names = [];
  __pushCreateState.coursewareIds.forEach(function(idx) {
    var c = COURSEWARE_DATA[idx];
    if (c) names.push(c.title);
  });
  __pushCreateState.questionIds.forEach(function(idx) {
    var q = QUESTION_BANK_DATA[idx];
    if (q) names.push(q.name);
  });
  if (__pushCreateState.sceneId !== null) {
    var sc = PRACTICE_SCENE_DATA[__pushCreateState.sceneId];
    if (sc) names.push(sc.name);
  }
  var contentName = names.length ? names.join(' + ') : '（未选择）';

  var tags = __pushCreateState.tags;
  var cov = estimateCoverage(tags);
  var dlMap = { '3d': '3 天', '1w': '1 周', '2w': '2 周', 'none': '无截止' };
  var dlText = dlMap[__pushCreateState.deadline] || '1 周';
  var totalMin = calcTotalDuration();
  var timelineHTML = buildTimelineHTML();

  return '<div class="pu-step-title">第四步：确认推送信息</div>' +
    '<div class="pu-step-desc">请确认以下信息无误后再发送</div>' +
    '<div class="pu-confirm-card">' +
    '<div class="pu-confirm-row"><span class="pu-confirm-label">推送内容</span><span class="pu-confirm-val">' + contentName + '</span></div>' +
    '<div class="pu-confirm-row"><span class="pu-confirm-label">推送标签</span><span class="pu-confirm-val">' + (tags.length ? tags.join('、') : '（未选择）') + '</span></div>' +
    '<div class="pu-confirm-row"><span class="pu-confirm-label">预计覆盖</span><span class="pu-confirm-val">' + cov.stores + ' 家门店 / ' + cov.guides + ' 位导购</span></div>' +
    '<div class="pu-confirm-row"><span class="pu-confirm-label">截止时间</span><span class="pu-confirm-val">' + dlText + '</span></div>' +
    '</div>' +
    '<div class="pu-package-preview">' +
    '<div class="pu-pp-header">导购端任务包预览</div>' +
    '<div class="pu-pp-duration">⏱ 总耗时：约 ' + totalMin + ' 分钟</div>' +
    '<div class="pu-timeline">' + timelineHTML + '</div>' +
    '</div>';
}

function pushStep5Content() {
  return '<div class="pu-step-title" style="text-align:center">推送已发送</div>' +
    '<div class="pu-success-icon">✓</div>' +
    '<div class="pu-success-text">任务已成功推送到门店，导购将收到学习提醒</div>';
}

// ====== 任务列表（卡片式） ======
function pushTaskList() {
  return '<div class="push-list-section">' +
    '<div class="push-tabs">' +
    '<button class="push-tab active" data-pushtab="all" onclick="switchPushTab(\'all\',this)">全部</button>' +
    '<button class="push-tab" data-pushtab="doing" onclick="switchPushTab(\'doing\',this)">进行中</button>' +
    '<button class="push-tab" data-pushtab="done" onclick="switchPushTab(\'done\',this)">已结束</button>' +
    '</div>' +
    '<div class="push-cards" id="pushCards">' +
    PUSH_TASKS.map(function(t) { return pushTaskCard(t); }).join('') +
    '</div>' +
    '</div>';
}

function getPackageTypeLabel(t) {
  if (t.contentType !== 'package' || !t.contentItems) return '';
  var hasCW = t.contentItems.coursewares && t.contentItems.coursewares.length > 0;
  var hasQ = t.contentItems.questions && t.contentItems.questions.length > 0;
  if (hasCW && hasQ) return '📚 学练任务包';
  if (hasCW) return '📚 学练任务包';
  if (hasQ) return '📝 测练任务';
  return '🎯 纯陪练任务';
}

function getPackageTypeClass(t) {
  if (t.contentType !== 'package' || !t.contentItems) return '';
  var hasCW = t.contentItems.coursewares && t.contentItems.coursewares.length > 0;
  var hasQ = t.contentItems.questions && t.contentItems.questions.length > 0;
  if (hasCW && hasQ) return 'ps-type-package';
  if (hasCW) return 'ps-type-package';
  if (hasQ) return 'ps-type-exam';
  return 'ps-type-practice';
}

function pushTaskCard(t) {
  var statusMap = {
    doing: { label: '进行中', cls: 'ps-doing' },
    done: { label: '已结束', cls: 'ps-done' },
    revoked: { label: '已撤回', cls: 'ps-revoked' }
  };
  var st = statusMap[t.status];
  var dlMap = { '3d': '3 天', '1w': '1 周', '2w': '2 周', 'none': '无截止' };
  var tagsHTML = t.tags.map(function(tag) { return '<span class="ps-tag">' + tag + '</span>'; }).join('');

  return '<div class="push-card-item" data-status="' + t.status + '" id="pushCard' + t.id + '">' +
    '<div class="ps-top">' +
    '<div class="ps-title-area">' +
    '<span class="ps-title">' + t.contentName + '</span>' +
    (t.contentType === 'package' ? '<span class="ps-type-tag ' + getPackageTypeClass(t) + '">' + getPackageTypeLabel(t) + '</span>' : '') +
    '<span class="ps-status ' + st.cls + '">' + st.label + '</span>' +
    '</div>' +
    '<div class="ps-meta">' +
    '<span>推送：' + t.sentTime + '</span>' +
    '<span class="ps-meta-sep">|</span>' +
    '<span>截止：' + t.deadline + '</span>' +
    '<span class="ps-meta-sep">|</span>' +
    '<span>' + t.contentType + '</span>' +
    '</div>' +
    '<div class="ps-tags-row">' + tagsHTML + '</div>' +
    '</div>' +
    '<div class="ps-mid">' +
    '<div class="ps-cover">覆盖 <b>' + t.coverageStores + '</b> 家门店 / <b>' + t.coverageGuides + '</b> 位导购</div>' +
    '<div class="ps-stats">' +
    '<div class="ps-stat"><div class="ps-stat-val">' + t.viewRate + '%</div><div class="ps-stat-label">查看率</div></div>' +
    '<div class="ps-stat"><div class="ps-stat-val">' + t.finishRate + '%</div><div class="ps-stat-label">完成率</div></div>' +
    '<div class="ps-stat"><div class="ps-stat-val">' + t.passRate + '%</div><div class="ps-stat-label">通关率</div></div>' +
    '</div>' +
    '</div>' +
    '<div class="ps-actions">' +
    '<button class="ps-action-btn primary" onclick="openPushDetail(\'' + t.id + '\')">查看明细</button>' +
    '<button class="ps-action-btn" onclick="copyAndNew(\'' + t.id + '\')">复制并新建</button>' +
    (t.status === 'doing' ? '<button class="ps-action-btn danger" onclick="revokePush(\'' + t.id + '\')">撤回</button>' : '') +
    '</div>' +
    '</div>';
}

// ====== 任务详情页 ======
function openPushDetail(id) {
  var task = null;
  for (var i = 0; i < PUSH_TASKS.length; i++) {
    if (PUSH_TASKS[i].id === id) { task = PUSH_TASKS[i]; break; }
  }
  if (!task) return;

  var listView = document.getElementById('pushListView');
  var detailView = document.getElementById('pushDetailView');
  if (listView) listView.style.display = 'none';
  if (detailView) {
    detailView.style.display = 'block';
    detailView.innerHTML = renderPushDetailPage(task);
  }
}

function closePushDetail() {
  var listView = document.getElementById('pushListView');
  var detailView = document.getElementById('pushDetailView');
  if (listView) listView.style.display = 'block';
  if (detailView) detailView.style.display = 'none';
}

// ====== 区域聚合工具函数 ======
function getRegion(city) {
  var map = { '北京':'华北', '天津':'华北', '石家庄':'华北',
              '上海':'华东', '杭州':'华东', '南京':'华东', '苏州':'华东',
              '广州':'华南', '深圳':'华南', '东莞':'华南',
              '郑州':'华中', '武汉':'华中', '长沙':'华中', '合肥':'华中',
              '成都':'西南', '重庆':'西南' };
  return map[city] || '其他';
}

function aggregateRegions(stores) {
  var regions = {};
  stores.forEach(function(s) {
    var r = getRegion(s.city);
    if (!regions[r]) regions[r] = { name: r, stores: [], totalPass: 0 };
    regions[r].stores.push(s);
    regions[r].totalPass += s.passRate;
  });
  var order = ['华东', '华南', '华中', '华北', '西南', '其他'];
  return order.map(function(name) {
    var reg = regions[name];
    if (!reg) return null;
    reg.avgPass = Math.round(reg.totalPass / reg.stores.length);
    reg.storeCount = reg.stores.length;
    reg.weakCount = reg.stores.filter(function(s) { return s.passRate < 60; }).length;
    return reg;
  }).filter(Boolean);
}

function regionStatusTag(avgPass) {
  if (avgPass >= 70) return '<span class="pd-region-tag good">🟢 良好</span>';
  if (avgPass >= 60) return '<span class="pd-region-tag normal">🟡 一般</span>';
  return '<span class="pd-region-tag poor">🔴 薄弱</span>';
}

function renderRegionActions(region, index) {
  var weakNames = region.stores.filter(function(s) { return s.passRate < 60; }).map(function(s) { return s.name; });
  return '<div class="pd-region-actions">' +
    '<button class="pd-action-btn-quiz" onclick="openWeaknessQuizModal(\'push-detail\',{weakName:\'' + (weakNames[0] || '薄弱场景') + '\',weakPercent:\'' + region.avgPass + '%\',weakStores:' + JSON.stringify(weakNames.slice(0, 5)) + '})">💎 针对出题</button>' +
    '</div>';
}

function handleResendTask(regionName, weakNames, count) {
  if (!confirm('检测到 ' + count + ' 家弱店（' + weakNames + '）通关率偏低。\n\n建议补推内容：本任务的"加强练习版"（同样的陪练场景 + 增加 2 道情景题）\n截止时间：5 天\n\n点击"确定"发送补发任务')) return;
  alert('✅ 补发任务已发送！\n\n🏷 任务标记：🔁 补发版（' + regionName + '专项）\n📤 覆盖 ' + count + ' 家弱店\n\n可在「推送任务」列表中查看');
}

function renderRegionRow(region, index) {
  return '<div class="pd-region-row" id="pdRegion' + index + '">' +
    '<div class="pd-region-info">' +
    '<div class="pd-region-name">' + region.name + '大区</div>' +
    '<div class="pd-region-meta">' + region.storeCount + ' 家门店</div>' +
    '</div>' +
    '<div class="pd-region-stat">' +
    '<span class="pd-region-pct">通关率 ' + region.avgPass + '%</span>' +
    regionStatusTag(region.avgPass) +
    '</div>' +
    '<button class="pd-region-toggle" onclick="toggleRegionStores(\'pdRegionStores' + index + '\',this)">查看门店明细 ›</button>' +
    '</div>' +
    '<div class="pd-region-stores" id="pdRegionStores' + index + '" style="display:none">' +
    region.stores.map(function(s) { return renderRegionStoreRow(s); }).join('') +
    (region.weakCount > 0 ? renderRegionActions(region, index) : '') +
    '</div>';
}

function renderRegionStoreRow(s) {
  var cls = s.passRate >= 80 ? 'good' : s.passRate >= 60 ? 'normal' : 'poor';
  var label = s.passRate >= 80 ? '🟢' : s.passRate >= 60 ? '🟡' : '🔴';
  return '<div class="pd-rstore-row ' + cls + '">' +
    '<div class="pd-rs-info"><div class="pd-rs-name">' + s.name + '</div><div class="pd-rs-city">' + s.city + ' · ' + s.completed + '/' + s.total + ' 人完成</div></div>' +
    '<div class="pd-rs-bar-wrap"><div class="pd-rs-bar"><div class="pd-rs-bar-fill" style="width:' + s.passRate + '%"></div></div></div>' +
    '<div class="pd-rs-pct">' + s.passRate + '%</div>' +
    '<div class="pd-rs-label">' + label + '</div>' +
    '</div>';
}

function toggleRegionStores(storesId, btn) {
  var el = document.getElementById(storesId);
  if (!el) return;
  var isOpen = el.style.display === 'block';
  el.style.display = isOpen ? 'none' : 'block';
  if (btn) btn.textContent = isOpen ? '查看门店明细 ›' : '收起 ▲';
}

function renderPushDetailPage(task) {
  var statusMap = {
    doing: { label: '进行中', cls: 'ps-doing' },
    done: { label: '已结束', cls: 'ps-done' },
    revoked: { label: '已撤回', cls: 'ps-revoked' }
  };
  var st = statusMap[task.status];
  var tagsHTML = task.tags.map(function(t) { return '<span class="ps-tag">' + t + '</span>'; }).join('');

  var storesHTML = task.stores.length ? task.stores.map(function(s) { return pushDetailStoreRow(s); }).join('') :
    '<div class="pd-empty">该任务暂无门店明细数据</div>';
  var personsHTML = task.persons.length ? task.persons.map(function(p) { return pushDetailPersonRow(p); }).join('') :
    '<div class="pd-empty">该任务暂无个人明细数据</div>';

  var regions = aggregateRegions(task.stores);
  var regionalHTML = regions.length > 0 ?
    '<div class="pd-region-card hq-card">' +
    '<div class="card-header"><h3 class="card-title">区域分布</h3><span class="card-sub">按大区查看完成情况，点击展开门店明细</span></div>' +
    '<div class="pd-region-list">' +
    regions.map(function(r, i) { return renderRegionRow(r, i); }).join('') +
    '</div></div>' : '';

  // SVG 进度环参数（半径 36，周长 ≈ 226）
  function ring(pct, color) {
    var c = 226.2;
    var offset = c - (c * pct / 100);
    return '<svg width="90" height="90" class="pd-ring"><circle cx="45" cy="45" r="36" fill="none" stroke="#e2e8f0" stroke-width="7"/>' +
      '<circle cx="45" cy="45" r="36" fill="none" stroke="' + color + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 45 45)"/>' +
      '<text x="45" y="42" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">' + pct + '%</text></svg>';
  }

  return '<div class="pd-page">' +
    '<div class="pd-back" onclick="closePushDetail()">← 返回任务列表</div>' +
    '<div class="pd-header-card hq-card">' +
    '<div class="pd-header-top">' +
    '<div><div class="pd-title">' + task.contentName + '</div>' +
    '<div class="pd-meta">' + (task.contentType === 'package' ? '学练任务包' : task.contentType) + ' · 推送时间：' + task.sentTime + ' · 截止：' + task.deadline + '</div>' +
    '<div class="ps-tags-row" style="margin-top:8px">' + tagsHTML + '</div></div>' +
    '<span class="ps-status ' + st.cls + '">' + st.label + '</span>' +
    '</div>' +
    '<div class="pd-cover-line">覆盖 <b>' + task.coverageStores + '</b> 家门店 / <b>' + task.coverageGuides + '</b> 位导购</div>' +
    '</div>' +
    '<div class="pd-rings-card hq-card">' +
    '<div class="card-header"><h3 class="card-title">完成情况</h3></div>' +
    '<div class="pd-rings">' +
    '<div class="pd-ring-item">' + ring(task.viewRate, '#3b82f6') + '<div class="pd-ring-label">查看率</div></div>' +
    '<div class="pd-ring-item">' + ring(task.finishRate, '#10b981') + '<div class="pd-ring-label">完成率</div></div>' +
    '<div class="pd-ring-item">' + ring(task.passRate, '#f59e0b') + '<div class="pd-ring-label">通关率</div></div>' +
    '</div>' +
    '</div>' +
    regionalHTML +
    '<div class="pd-drill-card hq-card">' +
    '<div class="pd-drill-tabs">' +
    '<button class="pd-drill-tab active" data-pddtab="store" onclick="switchDetailTab(\'store\',this)">按门店看（' + task.stores.length + '）</button>' +
    '<button class="pd-drill-tab" data-pddtab="person" onclick="switchDetailTab(\'person\',this)">按个人看（' + task.persons.length + '）</button>' +
    '</div>' +
    '<div class="pd-drill-body" id="pdDrillStore">' +
    '<div class="pd-drill-list">' + storesHTML + '</div>' +
    '</div>' +
    '<div class="pd-drill-body" id="pdDrillPerson" style="display:none">' +
    '<div class="pd-drill-list">' + personsHTML + '</div>' +
    '</div>' +
    '</div>' +
    (task.status === 'doing' ? '<div class="pd-bottom-bar"><button class="btn-primary" onclick="alert(\'已发送提醒\')">一键提醒未完成</button></div>' : '') +
    '</div>';
}

function pushDetailStoreRow(s) {
  var cls = s.passRate >= 80 ? 'good' : s.passRate >= 50 ? 'normal' : 'poor';
  return '<div class="pd-store-row ' + cls + '">' +
    '<div class="pds-info"><div class="pds-name">' + s.name + '</div><div class="pds-city">' + s.city + ' · ' + s.completed + '/' + s.total + ' 人完成</div></div>' +
    '<div class="pds-bar-wrap"><div class="pds-bar"><div class="pds-bar-fill" style="width:' + s.passRate + '%"></div></div></div>' +
    '<div class="pds-pct">' + s.passRate + '%</div>' +
    '<div class="pds-level">' + (s.passRate >= 80 ? '完成好' : s.passRate >= 50 ? '正常' : '偏慢') + '</div>' +
    '</div>';
}

function pushDetailPersonRow(p) {
  var cls = p.status === '已完成' ? 'good' : p.status === '进行中' ? 'normal' : 'poor';
  return '<div class="pd-person-row ' + cls + '">' +
    '<div class="pdp-avatar">' + p.name.charAt(0) + '</div>' +
    '<div class="pdp-info"><div class="pdp-name">' + p.name + '</div><div class="pdp-store">' + p.store + '</div></div>' +
    '<span class="pdp-status ' + cls + '">' + p.status + '</span>' +
    (p.score > 0 ? '<span class="pdp-score">' + p.score + ' 分</span>' : '<span class="pdp-score">-</span>') +
    '</div>';
}

// ====== 交互辅助函数（全局调用） ======
function toggleCourseware(idx, el) {
  var pos = __pushCreateState.coursewareIds.indexOf(idx);
  if (pos > -1) {
    __pushCreateState.coursewareIds.splice(pos, 1);
    if (el) el.classList.remove('selected');
  } else {
    __pushCreateState.coursewareIds.push(idx);
    if (el) el.classList.add('selected');
  }
  updateOrderPreview();
  updateNextBtn();
}

function toggleQuestion(idx, el) {
  var pos = __pushCreateState.questionIds.indexOf(idx);
  if (pos > -1) {
    __pushCreateState.questionIds.splice(pos, 1);
    if (el) el.classList.remove('selected');
  } else {
    __pushCreateState.questionIds.push(idx);
    if (el) el.classList.add('selected');
  }
  updateOrderPreview();
  updateNextBtn();
}

function selectScene(idx, el) {
  __pushCreateState.sceneId = idx;
  document.querySelectorAll('.pu-scene-item').forEach(function(x) { x.classList.remove('selected'); });
  if (el) el.classList.add('selected');
  __pushCreateState.tags = getContentTags();
  updateOrderPreview();
  updateNextBtn();
}

function updateNextBtn() {
  var btn = document.getElementById('puNextBtn');
  if (btn) btn.disabled = (__pushCreateState.sceneId === null);
}

function updateOrderPreview() {
  var el = document.getElementById('puOrderPreview');
  if (!el) return;
  var items = [];
  __pushCreateState.coursewareIds.forEach(function(idx) {
    var c = COURSEWARE_DATA[idx];
    if (c) items.push('<span class="pu-order-item pu-order-cw">📎 ' + c.title + '</span>');
  });
  __pushCreateState.questionIds.forEach(function(idx) {
    var q = QUESTION_BANK_DATA[idx];
    if (q) items.push('<span class="pu-order-item pu-order-q">📝 ' + q.name + '</span>');
  });
  if (__pushCreateState.sceneId !== null) {
    var s = PRACTICE_SCENE_DATA[__pushCreateState.sceneId];
    if (s) items.push('<span class="pu-order-item pu-order-scene">🎤 ' + s.name + '</span>');
  }
  el.innerHTML = items.length ? '<span style="font-size:12px;color:#94a3b8;margin-right:8px">任务包顺序：</span>' + items.join('<span style="color:#94a3b8;margin:0 4px">→</span>') : '<span style="font-size:12px;color:#94a3b8">请至少选择陪练场景</span>';
}

function togglePushTag(tag, el) {
  var idx = __pushCreateState.tags.indexOf(tag);
  if (idx > -1) {
    __pushCreateState.tags.splice(idx, 1);
    if (el) el.classList.remove('selected');
  } else {
    __pushCreateState.tags.push(tag);
    if (el) el.classList.add('selected');
  }
  updateCoverageDisplay();
}

function addCustomTag() {
  var input = document.getElementById('puCustomTagInput');
  if (!input) return;
  var val = input.value.trim();
  if (!val) return;
  if (__pushCreateState.customTags.indexOf(val) > -1) { input.value = ''; return; }
  __pushCreateState.customTags.push(val);
  __pushCreateState.tags.push(val);
  input.value = '';
  // 重新渲染标签区
  var body = document.getElementById('puModalBody');
  if (body) { body.innerHTML = pushStep2Content(); }
}

function updateCoverageDisplay() {
  var tags = __pushCreateState.tags;
  var cov = estimateCoverage(tags.length ? tags : getContentTags());
  var el = document.getElementById('puCoverage');
  if (el) el.innerHTML = '预计覆盖 <b>' + cov.stores + '</b> 家门店 / <b>' + cov.guides + '</b> 位导购';
}

function selectDeadline(val, el) {
  __pushCreateState.deadline = val;
  document.querySelectorAll('.pu-dl-option').forEach(function(x) { x.classList.remove('selected'); });
  if (el) el.classList.add('selected');
}

function switchPushTab(tab, el) {
  document.querySelectorAll('.push-tab').forEach(function(x) { x.classList.remove('active'); });
  if (el) el.classList.add('active');
  var cards = document.querySelectorAll('.push-card-item');
  cards.forEach(function(c) {
    var st = c.getAttribute('data-status');
    if (tab === 'all') { c.style.display = ''; }
    else if (tab === 'doing') { c.style.display = st === 'doing' ? '' : 'none'; }
    else if (tab === 'done') { c.style.display = st === 'done' ? '' : 'none'; }
  });
}

function copyAndNew(id) {
  var task = null;
  for (var i = 0; i < PUSH_TASKS.length; i++) {
    if (PUSH_TASKS[i].id === id) { task = PUSH_TASKS[i]; break; }
  }
  if (!task) return;
  __pushCreateState.tags = task.tags.slice();
  __pushCreateState.customTags = [];
  __pushCreateState.coursewareIds = [];
  __pushCreateState.questionIds = [];
  __pushCreateState.sceneId = null;
  if (task.contentType === 'package' && task.contentItems) {
    if (task.contentItems.coursewares) {
      task.contentItems.coursewares.forEach(function(cw) {
        for (var j = 0; j < COURSEWARE_DATA.length; j++) {
          if (COURSEWARE_DATA[j].title === cw.title) { __pushCreateState.coursewareIds.push(j); break; }
        }
      });
    }
    if (task.contentItems.questions) {
      task.contentItems.questions.forEach(function(q) {
        for (var k = 0; k < QUESTION_BANK_DATA.length; k++) {
          if (QUESTION_BANK_DATA[k].name === q.name) { __pushCreateState.questionIds.push(k); break; }
        }
      });
    }
    if (task.contentItems.scene) {
      for (var m = 0; m < PRACTICE_SCENE_DATA.length; m++) {
        if (PRACTICE_SCENE_DATA[m].name === task.contentItems.scene.name) { __pushCreateState.sceneId = m; break; }
      }
    }
  }
  openPushCreate();
}

function revokePush(id) {
  if (!confirm('确认撤回此推送任务吗？撤回后导购将不再看到该任务。')) return;
  for (var i = 0; i < PUSH_TASKS.length; i++) {
    if (PUSH_TASKS[i].id === id) { PUSH_TASKS[i].status = 'revoked'; break; }
  }
  var pageEl = document.querySelector('.push-page');
  if (pageEl) { pageEl.innerHTML = renderPushPage().replace(/^<div class="hq-content push-page">/, '').replace(/<\/div>$/, ''); }
}

function switchDetailTab(tab, el) {
  document.querySelectorAll('.pd-drill-tab').forEach(function(x) { x.classList.remove('active'); });
  if (el) el.classList.add('active');
  var se = document.getElementById('pdDrillStore');
  var pe = document.getElementById('pdDrillPerson');
  if (se) se.style.display = tab === 'store' ? 'block' : 'none';
  if (pe) pe.style.display = tab === 'person' ? 'block' : 'none';
}

// ====== 模块五：实战话术 ======
function renderScriptPage() {
  return '<div class="hq-content">' +
    '<div class="script-top-bar">' +
    '<div class="script-main-tabs">' +
    '<button class="smt-tab active" data-smttab="frontline">一线挖掘 <span class="smt-count">23</span></button>' +
    '<button class="smt-tab" data-smttab="adopted">门店上报 <span class="smt-count">156</span></button>' +
    '<button class="smt-tab" data-smttab="demand">一线练习 <span class="smt-count">5</span></button>' +
    '</div>' +
    '<div class="script-top-actions script-top-actions-frontline">' +
    '<input type="text" placeholder="搜索话术..." class="search-input search-input-sm"/>' +
    '<button class="chip active">待审核</button>' +
    '<button class="chip">已采纳为标准</button>' +
    '<button class="chip">仅本店保留</button>' +
    '<button class="sort-btn active">按时间</button>' +
    '<button class="sort-btn">按转化</button>' +
    '</div>' +
    '<div class="script-top-actions script-top-actions-adopted" style="display:none">' +
    '<input type="text" placeholder="搜索已采纳话术..." class="search-input search-input-sm"/>' +
    '<button class="chip active">全部</button>' +
    '<button class="chip">已采纳为标准</button>' +
    '<button class="chip">仅本店保留</button>' +
    '<button class="sort-btn active">按时间</button>' +
    '<button class="sort-btn">按采纳门店数</button>' +
    '</div>' +
    '<div class="script-top-actions script-top-actions-demand" style="display:none">' +
    '</div>' +
    '</div>' +
    '<div class="script-pane script-pane-frontline">' +
    scriptFrontlinePane() +
    '</div>' +
    '<div class="script-pane script-pane-adopted" style="display:none">' +
    scriptAdoptedPane() +
    '</div>' +
    '<div class="script-pane script-pane-demand" style="display:none">' +
    scriptDemandPane() +
    '</div>' +
    '</div>';
}

// 一线挖掘：导购原话被系统/AI 抓出来，待审核
function scriptFrontlinePane() {
  return '<div class="script-list">' +
    frontlineCard({ store: '北京城北 MG 体验中心', link: '价格异议', status: 'pending', question: '你们这个价格还能再便宜五千吗？我朋友买的时候人家就给优惠了', content: '哥，这个价格确实是我们店里的底价了。您今天要是定的话，我找我们经理申请一下，送您两次保养加价值3000的脚垫和行车记录仪...', strategy: '不纠缠价格本身，用"赠品+今天定"把焦点从降价转移到额外价值，让客户觉得"不降也赚了"' }) +
    frontlineCard({ store: '上海浦东 MG 4S 店', link: '油电纠结', status: 'pending', question: '电车我还是有点不放心，万一起火怎么办？听说自燃挺多的', content: '您说电车不安全，其实我特别理解您的顾虑。我给您看一下这个碰撞测试视频，咱家这个钢材是和保时捷同级别的...', strategy: '不辩论"电车安不安全"，用具体证据（碰撞视频+钢材对比）把抽象恐惧转化为可视化的安全信心' }) +
    frontlineCard({ store: '广州天河 MG 旗舰店', link: '横向比价', status: 'adopted', question: '我看比亚迪汉马力比你们大不少，价格还便宜，为什么我要选你们？', content: '您马力这个问题问得好，我们这台电机是自研的，连续零百加速5次不衰减，比亚迪汉在第3次就会有保护机制启动...', strategy: '不比马力大小，把焦点转移到"持续性能不衰减"这个竞品软肋上，用自研电机建立技术自信' }) +
    frontlineCard({ store: '成都春熙路 MG 体验中心', link: '需求挖掘', status: 'pending', question: '我们家有两个小孩，主要是想买个全家用的SUV', content: '家有小朋友的话，我觉得空间和安全是最关键的。您看我们这个后排，特别设计了儿童安全座椅的接口...', strategy: '抓住"有小孩"这个关键信息，把卖点从"车大"精准切换到"儿童安全+空间"，让客户觉得你懂他的真实需求' }) +
    frontlineCard({ store: '深圳南山 MG 体验中心', link: '留资', status: 'kept', question: '我就随便看看，今天不会定的，你别介绍那么多了', content: '您先随便看看，有问题随时问我。我不着急成单的，您了解清楚了更重要，要不咱加个微信，有新车型我第一时间告诉您？', strategy: '先退一步给客户空间，用"不急着成单"卸下防备，再用"加微信看新车"自然留资，把推销变成服务' }) +
    frontlineCard({ store: '杭州西湖 MG 4S 店', link: '逼单促成', status: 'pending', question: '我再考虑考虑吧，回去和家人商量下', content: '其实您今天定和下周定，价格政策是不一样的。本月还剩 3 天，您要是定下来，能多省一笔购置税补贴...', strategy: '不催"快买"，而是制造时间窗口的紧迫感——"今天定多省一笔"，把逼单变成帮客户省钱' }) +
    '</div>';
}

function frontlineCard(d) {
  var statusMap = {
    pending: { label: '待审核', cls: 'st-pending' },
    adopted: { label: '已采纳为标准话术', cls: 'st-adopted' },
    kept: { label: '仅本店保留', cls: 'st-kept' }
  };
  var st = statusMap[d.status];
  return '<div class="frontline-card">' +
    '<div class="fc-header">' +
    '<div class="fc-tags">' +
    '<span class="fc-tag-store">' + d.store + '</span>' +
    '<span class="fc-tag-link">' + d.link + '</span>' +
    '</div>' +
    '<div class="fc-right">' +
    '<span class="fc-status ' + st.cls + '">' + st.label + '</span>' +
    '</div>' +
    '</div>' +
    '<div class="fc-qa">' +
    '<div class="fc-q"><span class="fc-q-label">客户：</span>' + d.question + '</div>' +
    '<div class="fc-a"><span class="fc-a-label">导购：</span>' + d.content + '</div>' +
    '</div>' +
    (d.strategy ? '<div class="fc-strategy"><span class="fc-strategy-label">打法：</span>' + d.strategy + '</div>' : '') +
    '<div class="fc-footer">' +
    '<div class="fc-meta">原话已脱敏</div>' +
    '<div class="fc-actions">' +
    (d.status === 'pending' ? '<button class="btn-adopt">采纳为标准话术</button><button class="btn-keep">仅本店保留</button><button class="btn-ignore">忽略</button>' : '<button class="action-link">查看详情</button><button class="action-link">编辑</button>') +
    '</div>' +
    '</div>' +
    '</div>';
}

// 门店上报：店长/总部已采纳的话术
function scriptAdoptedPane() {
  return '<div class="script-list">' +
    adoptedCard({ store: '广州天河 MG 旗舰店', link: '横向比价', status: 'adopted', adoptCount: 45, question: '我看比亚迪汉马力比你们大不少，价格还便宜，为什么我要选你们？', content: '您马力这个问题问得好，我们这台电机是自研的，连续零百加速5次不衰减...', strategy: '不比马力大小，把焦点转移到"持续性能不衰减"这个竞品软肋上，用自研电机建立技术自信' }) +
    adoptedCard({ store: '北京城北 MG 体验中心', link: '价格异议', status: 'adopted', adoptCount: 32, question: '你们这个价格还能再便宜五千吗？', content: '哥，这个价格确实是我们店里的底价了。您今天要是定的话，我找我们经理申请一下，送您两次保养...', strategy: '不纠缠价格本身，用"赠品+今天定"把焦点从降价转移到额外价值，让客户觉得"不降也赚了"' }) +
    adoptedCard({ store: '深圳南山 MG 体验中心', link: '留资', status: 'kept', adoptCount: 8, question: '我就随便看看，今天不会定的', content: '您先随便看看，有问题随时问我。我不着急成单的，您了解清楚了更重要...', strategy: '先退一步给客户空间，用"不急着成单"卸下防备，再自然留资，把推销变成服务' }) +
    adoptedCard({ store: '成都春熙路 MG 体验中心', link: '需求挖掘', status: 'adopted', adoptCount: 28, question: '我们家有两个小孩，主要是想买个全家用的SUV', content: '家有小朋友的话，我觉得空间和安全是最关键的。您看我们这个后排...', strategy: '抓住"有小孩"这个关键信息，精准切换到"儿童安全+空间"，让客户觉得你懂他的真实需求' }) +
    adoptedCard({ store: '上海浦东 MG 4S 店', link: '油电纠结', status: 'kept', adoptCount: 15, question: '电车我还是有点不放心，万一起火怎么办？', content: '您说电车不安全，其实我特别理解您的顾虑。我给您看一下这个碰撞测试视频...', strategy: '不辩论"电车安不安全"，用具体证据把抽象恐惧转化为可视化的安全信心' }) +
    '</div>';
}

function adoptedCard(d) {
  var statusMap = {
    adopted: { label: '已采纳为标准话术', cls: 'st-adopted' },
    kept: { label: '仅本店保留', cls: 'st-kept' }
  };
  var st = statusMap[d.status];
  var hotBadge = d.adoptCount >= 20 ? '<span class="fc-hot-badge">多店验证</span>' : '';
  return '<div class="frontline-card">' +
    '<div class="fc-header">' +
    '<div class="fc-tags">' +
    '<span class="fc-tag-store">' + d.store + '</span>' +
    '<span class="fc-tag-link">' + d.link + '</span>' +
    '</div>' +
    '<div class="fc-right">' +
    hotBadge +
    '<span class="fc-status ' + st.cls + '">' + st.label + '</span>' +
    '</div>' +
    '</div>' +
    '<div class="fc-qa">' +
    '<div class="fc-q"><span class="fc-q-label">客户：</span>' + d.question + '</div>' +
    '<div class="fc-a"><span class="fc-a-label">导购：</span>' + d.content + '</div>' +
    '</div>' +
    (d.strategy ? '<div class="fc-strategy"><span class="fc-strategy-label">打法：</span>' + d.strategy + '</div>' : '') +
    '<div class="fc-footer">' +
    '<div class="fc-meta">原话已脱敏</div>' +
    '<div class="fc-actions">' +
    '<button class="action-link">查看详情</button>' +
    '<button class="action-link">用于出题</button>' +
    '<button class="action-link">推送门店</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

// 一线练习：导购自定义练习的聚合上报
function scriptDemandPane() {
  return '<div class="script-list">' +
    demandCard({ scene: '客户拿小米SU7来比MG4', count: 142, trend: 'up', trendLabel: '热度上升' }) +
    demandCard({ scene: '客户说要等国补/政策', count: 89, trend: 'up', trendLabel: '本周新增' }) +
    demandCard({ scene: '二手车置换价格谈判', count: 67, trend: 'stable', trendLabel: '' }) +
    demandCard({ scene: '客户担心电车保值率', count: 54, trend: 'stable', trendLabel: '' }) +
    demandCard({ scene: '全家来看意见不统一', count: 43, trend: 'stable', trendLabel: '' }) +
    '</div>';
}

function demandCard(d) {
  var trendHtml = d.trend === 'up' ? '<span class="demand-trend demand-trend-up">' + d.trendLabel + '</span>' : '';
  return '<div class="demand-card">' +
    '<div class="demand-main">' +
    '<div class="demand-scene">' + d.scene + '</div>' +
    '<div class="demand-meta">' +
    '<span class="demand-count">全国 ' + d.count + ' 人自定义练了这个</span>' +
    trendHtml +
    '</div>' +
    '</div>' +
    '<div class="demand-action">' +
    '<button class="btn-demand-create">做成官方训练</button>' +
    '</div>' +
    '</div>';
}

function scriptCard(data) {
  return '<div class="script-card">' +
    '<div class="script-header">' +
    '<div class="script-source">' +
    '<span class="source-tag">🔴 来自一线</span>' +
    '<span class="source-store">' + data.store + '</span>' +
    '</div>' +
    '<span class="script-status">待审核</span>' +
    '</div>' +
    '<div class="script-body">' + data.content + '</div>' +
    '<div class="script-tags">' +
    '<span class="tag-link">📍 ' + data.link + '</span>' +
    '<span class="tag-type">👤 ' + data.type + '</span>' +
    '<span class="tag-emotion">😀 ' + data.emotion + '</span>' +
    (data.deal ? '<span class="tag-deal">✅ 已成交</span>' : '') +
    '</div>' +
    '<div class="script-footer">' +
    '<div class="script-likes">❤️ <b>' + data.likes + '</b> 位店长点赞</div>' +
    '<div class="script-actions">' +
    '<button class="btn-adopt">采纳为标准</button>' +
    '<button class="btn-keep">本店保留</button>' +
    '<button class="btn-ignore">忽略</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

// ====== 模块六：针对出题（薄弱场景闭环） ======
function renderTargetedQuestionPage() {
  return '<div class="hq-content targeted-page">' +
    '<a href="#hq-overview" class="back-link">← 返回培训概览</a>' +
    targetedSceneSection() +
    targetedStoreSection() +
    targetedAISection() +
    targetedActions() +
    '</div>';
}

function targetedSceneSection() {
  return '<div class="hq-card targeted-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">第一步：选定薄弱场景</h3>' +
    '<span class="card-sub">从全网薄弱项中选择需要专项突破的场景</span>' +
    '</div>' +
    '<div class="targeted-scene-list">' +
    targetedSceneItem('价格异议处理', '需求分析', '61%', true) +
    targetedSceneItem('竞品对比话术', '产品介绍', '58%', false) +
    targetedSceneItem('留资开口技巧', '留资开口', '52%', false) +
    targetedSceneItem('试驾异议处理', '试乘试驾中', '45%', false) +
    targetedSceneItem('逼单促单话术', '试乘试驾后', '38%', false) +
    '</div>' +
    '</div>';
}

function targetedSceneItem(name, link, percent, active) {
  return '<div class="ts-item' + (active ? ' active' : '') + '">' +
    '<div class="ts-radio">' + (active ? '●' : '○') + '</div>' +
    '<div class="ts-info">' +
    '<div class="ts-name">' + name + '</div>' +
    '<div class="ts-meta">所属环节：' + link + ' · 通过率 ' + percent + '</div>' +
    '</div>' +
    '</div>';
}

function targetedStoreSection() {
  return '<div class="hq-card targeted-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">第二步：查看薄弱门店分布</h3>' +
    '<span class="card-sub">该场景下表现偏弱的门店，将作为推送目标</span>' +
    '</div>' +
    '<div class="targeted-store-grid">' +
    targetedStoreItem('深圳南山 MG 体验中心', '深圳', '42%', '重度偏弱') +
    targetedStoreItem('成都春熙路 MG 体验中心', '成都', '48%', '重度偏弱') +
    targetedStoreItem('广州天河 MG 旗舰店', '广州', '55%', '偏弱') +
    targetedStoreItem('杭州西湖 MG 4S 店', '杭州', '58%', '偏弱') +
    targetedStoreItem('武汉光谷 MG 体验中心', '武汉', '60%', '偏弱') +
    targetedStoreItem('北京朝阳 MG 体验中心', '北京', '63%', '一般') +
    '</div>' +
    '<div class="targeted-store-summary">共 6 家门店符合，预计覆盖 48 位顾问</div>' +
    '</div>';
}

function targetedStoreItem(name, city, pct, status) {
  var cls = status === '重度偏弱' ? 'severe' : (status === '偏弱' ? 'mild' : 'normal');
  return '<div class="t-store-item ' + cls + '">' +
    '<div class="t-store-name">' + name + '</div>' +
    '<div class="t-store-city">' + city + '</div>' +
    '<div class="t-store-bar"><div class="t-store-fill" style="width:' + pct + '"></div></div>' +
    '<div class="t-store-foot"><span>' + pct + '</span><span class="t-store-status">' + status + '</span></div>' +
    '</div>';
}

function targetedAISection() {
  return '<div class="hq-card targeted-card">' +
    '<div class="card-header">' +
    '<h3 class="card-title">第三步：AI 推荐题目</h3>' +
    '<span class="card-sub">基于场景特点与销冠话术生成，可选择采纳或调整</span>' +
    '</div>' +
    '<div class="ai-question-list">' +
    aiQuestionItem(1, '客户说"再便宜五千我今天就定"，怎么应对？',
      '建议先承接情绪："我懂您是真心想买"，再用价值锚定（送保养/装饰）替代直接降价。') +
    aiQuestionItem(2, '客户拿出隔壁店报价单施压，如何破局？',
      '不否定对手，把话题引到"差异化"：服务、交付时间、金融方案。') +
    aiQuestionItem(3, '客户问"现在订还是再等等优惠"，如何促成？',
      '用"时间稀缺 + 优惠透明"两板斧：本月政策窗口 + 库存紧张 + 真实可查证。') +
    aiQuestionItem(4, '面对反复砍价"再让一千就定"，如何守住底价？',
      '坚定但不冷硬：把价值再过一遍 + 适度赠送替代降价 + 给客户"留面子"的台阶。') +
    '</div>' +
    '</div>';
}

function aiQuestionItem(num, question, tip) {
  return '<div class="ai-q-item">' +
    '<div class="ai-q-header">' +
    '<span class="ai-q-num">' + num + '</span>' +
    '<span class="ai-q-text">' + question + '</span>' +
    '<label class="ai-q-check"><input type="checkbox" checked/> 选中</label>' +
    '</div>' +
    '<div class="ai-q-tip"><b>销冠思路：</b>' + tip + '</div>' +
    '<div class="ai-q-actions">' +
    '<button class="action-link">编辑</button>' +
    '<button class="action-link">重新生成</button>' +
    '<button class="action-link">查看销冠完整示范</button>' +
    '</div>' +
    '</div>';
}

function targetedActions() {
  return '<div class="targeted-bottom-bar">' +
    '<div class="bottom-summary">已选 4 道题 · 推送 6 家门店 · 覆盖 48 位顾问</div>' +
    '<div class="bottom-buttons">' +
    '<button class="btn-secondary">仅加入题库</button>' +
    '<button class="btn-primary">一键加入题库并推送</button>' +
    '</div>' +
    '</div>';
}

// ====== 针对薄弱点 AI 出题弹层（共用组件） ======
var __weaknessQuizState = { source: 'overview', context: {} };

var __WEAKNESS_QUESTIONS = {
  '价格异议处理': [
    { id: 1, title: '客户问"冬天续航打几折"', scene: '客户：你们这电动车冬天续航是不是得打对折啊？', options: ['A. 一般会打8折左右，这是正常的', 'B. 看您主要怎么用车，咱们算笔账，您每天通勤30公里的话…', 'C. 我们续航在同级里算很好的了', 'D. 这个您不用担心，电池都有加热系统'], answer: 'B', analysis: '用算账方式回应模糊担忧，把话题从"续航打折"转向"实际够不够用"。' },
    { id: 2, title: '横向比价——客户拿竞品价格施压', scene: '客户：比亚迪汉同配置便宜3万，你说你们贵在哪？', options: ['A. 我们品牌更高端', 'B. 您对比得很仔细，同价位我们多了辅助驾驶和免费充电网络，这俩加起来值2万多', 'C. 比亚迪的质量不如我们', 'D. 这个价格已经是底价了，不能再降'], answer: 'B', analysis: '不贬低对手，用"差异化价值"替代"比价格"，把客户注意力从价格差转移到配置差。' },
    { id: 3, title: '客户反复砍价"再让一千就定"', scene: '客户：再便宜一千我今天就定了，行不行一句话。', options: ['A. 真的到底了，不信您去别家问问', 'B. 这样吧，价格不变但我送您两次保养加脚垫，加起来差不多两千', 'C. 那我去问问经理', 'D. 不行，这个价格已经亏本了'], answer: 'B', analysis: '用赠品替代降价，给客户"面子"和"实际利益"，同时守住底价。' },
    { id: 4, title: '客户说"我再考虑考虑"', scene: '客户：我再考虑考虑吧，回去跟家人商量下。', options: ['A. 好的，您慢慢考虑，随时联系我', 'B. 其实您今天定和下周定，价格政策不一样。本月还剩3天有购置税补贴', 'C. 您还在犹豫什么？是价格问题吗？', 'D. 那我先帮您留着这台车'], answer: 'B', analysis: '用"时间稀缺 + 政策窗口"制造适度紧迫感，不逼单但给出理性理由。' },
    { id: 5, title: '客户带家人来看车——决策人多', scene: '客户一家三口来看车，妻子明显对空间有顾虑。', options: ['A. 主要给您先生介绍性能', 'B. 姐您坐后排感受一下，这腿部空间比同级别大两拳，带老人孩子都舒服', 'C. 这车马力很大的', 'D. 其实性能都不重要，舒服就行'], answer: 'B', analysis: '识别隐性决策人（妻子关注空间），直接回应而非忽略她的顾虑。' }
  ],
  '竞品对比话术': [
    { id: 1, title: '客户说竞品马力更大', scene: '客户：我看比亚迪汉马力比你们大不少，为什么我要选你们？', options: ['A. 马力大不一定好开', 'B. 您说得对，但我们电机是自研的，连续零百加速5次不衰减，汉在第3次会启动保护', 'C. 我们加速也不慢', 'D. 马力大会更费电'], answer: 'B', analysis: '用"持续性能"替代"峰值马力"，用具体数据说话而非空谈。' },
    { id: 2, title: '客户担心保值率', scene: '客户：电动车二手车不值钱，我怕开两年亏一半。', options: ['A. 现在新能源保值率在涨', 'B. 您说得对，但我们有保值回购计划，三年后可以按55%回收', 'C. 买车不是为了卖的', 'D. 所有车都会贬值'], answer: 'B', analysis: '承认顾虑 + 给出具体方案（保值回购），把抽象担忧变成可量化的保障。' },
    { id: 3, title: '油电对比——客户纠结要不要换', scene: '客户：我现在开的油车挺好的，干嘛要换电车？', options: ['A. 新能源是趋势', 'B. 您一年油费大概多少？两万公里的话，换电车一年能省一万多，加上保养…', 'C. 电车更环保', 'D. 国家在推新能源，以后油车会限行'], answer: 'B', analysis: '用"算经济账"替代"讲趋势"，让客户自己感受到省钱而不是被教育。' },
    { id: 4, title: '客户问电池安全问题', scene: '客户：听说电动车自燃挺多的，我还是有点不放心。', options: ['A. 那是以前的事了', 'B. 给您看个碰撞测试视频，我们电池包用的是和保时捷同级别的钢材保护', 'C. 我们的电池不会起火', 'D. 自燃概率很低，不用担心'], answer: 'B', analysis: '用"眼见为实"（视频/钢材等级）替代"口头保证"，把安全从抽象变成可视。' },
    { id: 5, title: '客户说"再等等看新款"', scene: '客户：听说下半年有改款，我再等等。', options: ['A. 改款还早呢', 'B. 改款主要是外观微调，核心三电系统不变。而且现在有购置税补贴，改款后可能取消', 'C. 改款肯定会涨价', 'D. 现在买就挺好的'], answer: 'B', analysis: '承认改款事实 + 说明"不变的核心" + 给出"现在买"的理由（补贴窗口）。' }
  ],
  'default': [
    { id: 1, title: '客户问续航时回答模糊', scene: '客户：冬天续航能跑多少？', options: ['A. 和标称差不多', 'B. 看您主要怎么用车，我帮您算笔账…', 'C. 我们续航很好', 'D. 不用担心'], answer: 'B', analysis: '用算账方式回应模糊问题，把话题从"续航数字"转向"实际够用"。' },
    { id: 2, title: '价格异议未接住总账逻辑', scene: '客户：你们比XX贵了不少。', options: ['A. 一分钱一分货', 'B. 同价位我们多了X和Y，加起来值2万多', 'C. 我们品牌好', 'D. 可以再优惠一点'], answer: 'B', analysis: '用"总账价值"替代"单品比价"，列出差异化配置让客户自己算。' },
    { id: 3, title: '试驾邀约转化率低', scene: '客户：今天就是来看看，不用试驾。', options: ['A. 试驾又不要钱', 'B. 您不试怎么知道合不合适？我带您感受一下这个座椅…', 'C. 好吧那您随便看', 'D. 试驾有礼品送'], answer: 'B', analysis: '不直接说"试驾"，先用一个低门槛动作（感受座椅）自然过渡。' },
    { id: 4, title: '客户锁定不了决策人', scene: '客户：我得和我老婆商量一下。', options: ['A. 好的那您先商量', 'B. 要不您拍个视频给嫂子看看？重点拍后排空间和儿童座椅接口…', 'C. 您自己做主就行了', 'D. 那我们约个时间您带她一起来'], answer: 'B', analysis: '用"让缺席决策人参与"替代"等下次再来"，降低沟通成本。' },
    { id: 5, title: '逼单时机把握不准', scene: '客户看完车很满意但就是不定。', options: ['A. 今天定有优惠', 'B. 本月政策窗口还剩3天，您现在定能锁定购置税补贴…', 'C. 不定就没这个价了', 'D. 您还犹豫什么'], answer: 'B', analysis: '用"政策窗口"制造适度紧迫感，不逼单但给出理性理由。' }
  ]
};

function getWeaknessQuestions(weakName) {
  return __WEAKNESS_QUESTIONS[weakName] || __WEAKNESS_QUESTIONS['default'];
}

function renderWeaknessQuizModal(source, context) {
  var weakName = context.weakName || '薄弱场景';
  var weakPercent = context.weakPercent || '50%';
  var questions = getWeaknessQuestions(weakName);

  var storeNames = (context.weakStores || []).join('、');
  var painHTML = '<div class="wqm-insight">' +
    '<div class="wqm-insight-title">🔍 AI 已识别 1 个高频卡点：</div>' +
    '<div class="wqm-pain-item">① <b>' + weakName + '</b>（' + weakPercent + ' 通关）</div>' +
    (storeNames ? '<div class="wqm-pain-desc">薄弱门店：' + storeNames + '</div>' : '<div class="wqm-pain-desc">该场景下导购普遍存在应对策略单一、价值锚定能力不足的问题</div>') +
    '</div>';

  var questionsHTML = questions.map(function(q) {
    return '<div class="wqm-q-card">' +
      '<div class="wqm-q-header"><span class="wqm-q-num">题 ' + q.id + '</span><span class="wqm-q-title">' + q.title + '</span></div>' +
      '<div class="wqm-q-scene">📋 场景：' + q.scene + '</div>' +
      '<div class="wqm-q-options">' + q.options.map(function(o) {
        var isAnswer = o.charAt(0) === q.answer;
        return '<div class="wqm-opt' + (isAnswer ? ' wqm-opt-answer' : '') + '">' + o + '</div>';
      }).join('') + '</div>' +
      '<div class="wqm-q-analysis"><b>✅ 参考答案：' + q.answer + '</b> — ' + q.analysis + '</div>' +
      '</div>';
  }).join('');

  return '<div class="wqm-mask" id="wqmMask" onclick="closeWeaknessQuizModal()"></div>' +
    '<div class="wqm-modal" id="wqmModal">' +
    '<div class="wqm-modal-header">' +
    '<div class="wqm-modal-title">💎 针对薄弱点 AI 出题</div>' +
    '<button class="wqm-modal-close" onclick="closeWeaknessQuizModal()">×</button>' +
    '</div>' +
    '<div class="wqm-modal-body">' +
    painHTML +
    '<div class="wqm-generated-label">✨ 已为你生成 <b>' + questions.length + ' 道</b>针对性情景题：</div>' +
    '<div class="wqm-questions-list">' + questionsHTML + '</div>' +
    '</div>' +
    '<div class="wqm-modal-footer">' +
    '<button class="wqm-btn-secondary" onclick="alert(\'📝 题目已加入题库，可在知识管理-题库中查看\');closeWeaknessQuizModal()">📝 加入题库</button>' +
    '<button class="wqm-btn-secondary" onclick="alert(\'✏️ 进入预览编辑界面（demo阶段暂未实现）\')">✏️ 预览编辑</button>' +
    '<button class="wqm-btn-primary" onclick="handlePackAndPush(\'' + source + '\',\'' + weakName.replace(/'/g, "\\'") + '\')">📤 直接打包推送</button>' +
    '</div>' +
    '</div>';
}

function openWeaknessQuizModal(source, context) {
  __weaknessQuizState = { source: source, context: context || {} };
  var container = document.createElement('div');
  container.id = 'wqmContainer';
  container.innerHTML = renderWeaknessQuizModal(source, context);
  document.body.appendChild(container);
}

function closeWeaknessQuizModal() {
  var container = document.getElementById('wqmContainer');
  if (container) container.remove();
}

function handlePackAndPush(source, weakName) {
  closeWeaknessQuizModal();
  var scopeText = source === 'overview' ? '全国' : '该任务的弱店';
  alert('✅ 已基于「' + weakName + '」生成新推送任务\n\n📤 推送范围：' + scopeText + '\n🏷 任务标记：💎 针对薄弱点专项 · ' + weakName + '（' + scopeText + '专攻）\n\n可在「推送任务」列表中查看');
}

// ====== 样式 ======
function hqStyles() {
  return '<style>' +
    `:focus{outline:none}.hq-layout{display:flex;min-height:100vh;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans;color:#1e293b}
.hq-sidebar{width:220px;background:#1e293b;position:fixed;top:0;left:0;bottom:0;display:flex;flex-direction:column}
.hq-logo{padding:24px 20px;border-bottom:1px solid rgba(255,255,255,0.08)}
.logo-text .brand{font-size:16px;font-weight:700;color:#fff}
.hq-nav{flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:4px}
.nav-item{padding:12px 14px;border-radius:8px;color:rgba(255,255,255,0.7);cursor:pointer;font-size:14px;display:flex;align-items:center;gap:12px;text-decoration:none;transition:all 0.2s}
.nav-item:hover{background:rgba(255,255,255,0.06);color:#fff}
.nav-item-active{background:#3b82f6;color:#fff}
.nav-label{font-size:14px}
.hq-footer{padding:16px 20px;border-top:1px solid rgba(255,255,255,0.08)}
.help-link{color:#94a3b8;font-size:13px;cursor:pointer}.help-link:hover{color:#fff}
.hq-main{flex:1;margin-left:240px;min-height:100vh;background:#f8fafc}
.hq-header{height:72px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:100}
.page-title{font-size:20px;font-weight:600}
.header-right{display:flex;align-items:center;gap:32px}
.header-stats{display:flex;gap:24px;flex-wrap:wrap}
.stat-item{display:flex;flex-direction:column;align-items:center;min-width:80px}
.stat-val{font-size:18px;font-weight:700;color:#1e293b}
.stat-label{font-size:12px;color:#94a3b8}
.user-info{display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f8fafc;border-radius:8px}
.user-avatar{width:36px;height:36px;background:linear-gradient(135deg,#3b82f6,#6366f1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600}
.user-detail .user-name{font-size:14px;font-weight:600}.user-detail .user-role{font-size:12px;color:#94a3b8}
.hq-content{padding:28px 32px;max-width:1600px}
.overview-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:24px;background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.ov-stat-item{text-align:center;padding:8px;border-right:1px solid #f1f5f9}
.ov-stat-item:last-child{border-right:none}
.ov-stat-val{font-size:28px;font-weight:700;color:#1e293b;margin-bottom:6px}
.ov-stat-label{font-size:13px;color:#64748b}
.page-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px}
.toolbar-left{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.search-box{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:0 14px;height:40px}
.search-icon{font-size:14px;color:#94a3b8}
.search-input{border:none;background:none;font-size:14px;width:200px;color:#1e293b}
.filter-chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{padding:8px 14px;border-radius:20px;font-size:13px;background:#fff;border:1px solid #e2e8f0;cursor:pointer;transition:all 0.2s}
.chip:hover{background:#f1f5f9}.chip.active{background:#2563eb;color:#fff;border-color:#2563eb}
.btn-new{display:flex;align-items:center;gap:6px;background:#2563eb;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s}
.btn-new:hover{background:#1d4ed8}
.metrics-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;margin-bottom:28px}
.metric-card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all 0.2s}
.metric-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08)}
.metric-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.metric-label{font-size:13px;color:#64748b}
.metric-change{padding:3px 8px;border-radius:4px;font-size:12px;font-weight:500}
.metric-change.positive{background:#ecfdf5;color:#059669}
.metric-change.negative{background:#fef2f2;color:#dc2626}
.metric-value{font-size:30px;font-weight:700;color:#1e293b;margin-bottom:6px}
.metric-sub{font-size:12px;color:#94a3b8}
.hq-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px}
.hq-card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);min-height:200px}
.card-header{padding:18px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.card-title{font-size:15px;font-weight:600}
.card-sub{font-size:12px;color:#94a3b8}
.card-actions{display:flex;gap:6px;flex-wrap:wrap}
.card-link{font-size:13px;color:#2563eb;cursor:pointer}
.chart-container{padding:20px 24px}
.trend-svg{width:100%;height:200px;min-width:400px}
.chart-labels{display:flex;justify-content:space-between;padding:12px 0 0;font-size:12px;color:#94a3b8}
.chart-labels span:first-child,.chart-labels span:last-child{font-size:11px}
.weak-list{padding:12px 24px}
.weak-item{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #f1f5f9;flex-wrap:wrap}
.weak-item:last-child{border:none}
.weak-rank{width:24px;height:24px;border-radius:50%;background:#fee2e2;color:#dc2626;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.weak-item:nth-child(2) .weak-rank,.weak-item:nth-child(3) .weak-rank,.weak-item:nth-child(4) .weak-rank{background:#fef3c7;color:#b45309}
.weak-item:nth-child(5) .weak-rank{background:#dbeafe;color:#2563eb}
.weak-info{flex:1;min-width:150px}.weak-name{font-size:14px;font-weight:500;margin-bottom:2px}.weak-meta{font-size:12px;color:#94a3b8}
.weak-tag{font-size:11px;padding:4px 8px;border-radius:4px;background:#fef3c7;color:#b45309;flex-shrink:0}
.weak-action{background:none;border:1px solid #e2e8f0;padding:6px 12px;border-radius:6px;font-size:12px;cursor:pointer;transition:all 0.2s;flex-shrink:0}
.weak-action:hover{background:#2563eb;color:#fff;border-color:#2563eb}
.store-list{padding:16px 24px}
.store-item{display:flex;align-items:center;gap:16px;padding:12px 0;flex-wrap:wrap}
.store-info{width:140px;flex-shrink:0}.store-name{font-size:13px;font-weight:500}.store-city{font-size:12px;color:#94a3b8}
.store-bar-wrap{flex:1;min-width:100px;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden}
.store-bar{height:100%;background:linear-gradient(90deg,#3b82f6,#6366f1);border-radius:4px;transition:width 0.3s}
.store-stat{padding:4px 10px;border-radius:4px;font-size:12px;font-weight:500;flex-shrink:0}
.store-stat.good{background:#ecfdf5;color:#059669}.store-stat.normal{background:#dbeafe;color:#2563eb}.store-stat.poor{background:#fef3c7;color:#b45309}
.push-snapshot{padding:16px 24px}
.snap-item{display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #f1f5f9;flex-wrap:wrap}
.snap-item:last-child{border:none}
.snap-info{flex:1;min-width:150px}.snap-title{font-size:13px;font-weight:500;margin-bottom:2px}.snap-time{font-size:12px;color:#94a3b8}.snap-tags{display:flex;gap:6px;margin-top:4px;flex-wrap:wrap}.snap-tag{display:inline-block;padding:1px 8px;font-size:11px;border-radius:4px;background:#eef2ff;color:#4f46e5}
.snap-progress{width:120px;flex-shrink:0;display:flex;flex-direction:column;gap:4px}
.snap-bar{height:6px;background:#10b981;border-radius:3px}
.snap-progress span{font-size:12px;color:#64748b}
.lr-layout{display:grid;grid-template-columns:220px 1fr;gap:24px}
.left-panel{background:#fff;border-radius:12px;padding:20px;height:fit-content}
.panel-section{margin-bottom:24px}.panel-section:last-child{margin-bottom:0}
.section-title{font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:12px}
.category-tree{}
.tree-item{display:flex;justify-content:space-between;padding:10px 14px;border-radius:6px;font-size:13px;color:#64748b;cursor:pointer;margin-bottom:4px;transition:all 0.2s}
.tree-item:hover{background:#f1f5f9}.tree-item.active{background:#eff6ff;color:#2563eb}
.tree-item .count{background:#e2e8f0;padding:2px 8px;border-radius:10px;font-size:11px}
.right-panel{background:#fff;border-radius:12px;padding:24px}
.course-list{}
.course-card{display:flex;align-items:center;gap:16px;padding:18px 0;border-bottom:1px solid #f1f5f9}
.course-card:last-child{border:none}
.course-icon{width:48px;height:48px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px}
.course-icon.ppt{background:#eff6ff}.course-icon.video{background:#fce7f3}.course-icon.knowledge{background:#fef3c7}
.course-info{flex:1}
.course-title{font-size:14px;font-weight:600;margin-bottom:6px}
.course-meta{font-size:12px;color:#94a3b8}
.meta-sep{margin:0 6px}
.course-status{padding:5px 10px;border-radius:6px;font-size:12px;font-weight:500}
.course-status.success{background:#ecfdf5;color:#059669}
.course-status.warning{background:#fef3c7;color:#b45309}
.course-actions{display:flex;gap:8px}
.action-btn{background:none;border:1px solid #e2e8f0;padding:6px 12px;border-radius:6px;font-size:12px;cursor:pointer;transition:all 0.2s}
.action-btn:hover{background:#f1f5f9}
/* Course Make */
.course-make{padding:28px}
.make-layout{display:grid;grid-template-columns:1fr 380px;gap:24px;min-height:calc(100vh - 200px)}
.make-result{background:#fff;border-radius:12px;display:flex;flex-direction:column}
.result-header{padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:16px}
.title-input{border:none;font-size:18px;font-weight:600;flex:1}
.type-toggle{display:flex;gap:4px;background:#f1f5f9;padding:4px;border-radius:8px}
.toggle-btn{padding:8px 14px;border-radius:6px;font-size:13px;cursor:pointer;transition:all 0.2s}
.toggle-btn:hover{background:#fff}.toggle-btn.active{background:#fff;color:#2563eb}
.result-preview{flex:1;padding:24px}
.preview-placeholder{height:100%;border:2px dashed #e2e8f0;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#94a3b8}
.preview-icon{font-size:48px;margin-bottom:12px}
.preview-text{font-size:16px}.preview-pages{font-size:13px;margin-top:8px}
.result-actions{padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:12px}
.btn-secondary{background:#fff;border:1px solid #e2e8f0;padding:10px 18px;border-radius:8px;font-size:14px;cursor:pointer}
.btn-primary{background:#2563eb;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-size:14px;cursor:pointer}
.make-chat{background:#fff;border-radius:12px;display:flex;flex-direction:column}
.chat-header{padding:20px 24px;border-bottom:1px solid #e2e8f0}
.chat-title{font-size:16px;font-weight:600;margin-bottom:4px}
.chat-sub{font-size:13px;color:#94a3b8}
.chat-messages{flex:1;padding:20px;overflow-y:auto;max-height:400px}
.msg{padding:14px 18px;border-radius:12px;font-size:14px;line-height:1.6;margin-bottom:12px}
.msg.bot{background:#f1f5f9;color:#64748b}
.chat-input-area{padding:16px;border-top:1px solid #e2e8f0;display:flex;gap:12px}
.chat-textarea{flex:1;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:14px;resize:none}
.btn-send{background:#2563eb;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:14px;cursor:pointer}
.back-link{display:inline-flex;align-items:center;gap:8px;color:#64748b;font-size:14px;margin-bottom:20px;cursor:pointer}
.back-link:hover{color:#2563eb}
/* Question */
.view-tabs{display:flex;gap:4px;background:#f1f5f9;padding:4px;border-radius:8px;margin-bottom:20px;width:fit-content}
.tab-btn{padding:10px 20px;border-radius:6px;font-size:13px;cursor:pointer;transition:all 0.2s}
.tab-btn.active{background:#fff;color:#2563eb}
.table-wrapper{background:#fff;border-radius:12px;overflow:hidden}
.data-table{}
.table-head{display:flex;padding:14px 24px;background:#f8fafc;font-size:12px;font-weight:600;color:#64748b;border-bottom:1px solid #e2e8f0;gap:12px}
.table-row{display:flex;padding:16px 24px;font-size:13px;border-bottom:1px solid #f1f5f9;align-items:flex-start;gap:12px}
.table-row:last-child{border:none}
.col{flex:1;min-width:0}
.col:last-child{flex:none}
.scene-col{}.scene-name{font-weight:500;margin-bottom:4px}.scene-tags{display:flex;gap:6px}
.tag{font-size:11px;padding:2px 8px;background:#f1f5f9;color:#64748b;border-radius:4px}
.status-success{background:#ecfdf5;color:#059669;padding:4px 10px;border-radius:6px;font-size:12px}
.status-warning{background:#fef3c7;color:#b45309;padding:4px 10px;border-radius:6px;font-size:12px}
.status-error{background:#fef2f2;color:#dc2626;padding:4px 10px;border-radius:6px;font-size:12px}
.actions-col{display:flex;gap:12px;flex-wrap:wrap}
.action-link{background:none;border:none;color:#2563eb;font-size:12px;cursor:pointer}
/* Push */
.push-steps{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:28px;padding:20px}
.step-item{display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:8px;background:#f1f5f9;color:#94a3b8}
.step-item.active{background:#eff6ff;color:#2563eb}
.step-num{width:24px;height:24px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600}
.step-item.active .step-num{background:#2563eb;color:#fff}
.step-label{font-size:14px}
.step-line{width:40px;height:2px;background:#e2e8f0}
.push-list{}
.push-card{background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:16px;display:flex;align-items:center;gap:24px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.push-main{flex:1}
.push-title{font-size:15px;font-weight:600;margin-bottom:6px}
.push-tags{display:flex;gap:8px}
.tag{padding:4px 10px;background:#f1f5f9;color:#64748b;border-radius:4px;font-size:12px}
.tag.required{background:#fef3c7;color:#b45309}
.tag.optional{background:#dbeafe;color:#2563eb}
.push-scope{width:100px;text-align:center}
.scope-num{font-size:18px;font-weight:700}
.scope-cities{font-size:12px;color:#94a3b8}
.push-time{width:100px}
.time-send{font-size:13px}
.time-deadline{font-size:12px;color:#94a3b8}
.push-progress{width:140px}
.progress-bar{height:8px;background:#e2e8f0;border-radius:4px;margin-bottom:6px}
.progress-fill{height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:4px}
.progress-num{font-size:14px;font-weight:600;color:#10b981}
.push-actions{display:flex;gap:12px}
/* HQ Responsive */
@media (max-width: 1200px) {
  .metrics-grid {grid-template-columns: repeat(3, 1fr)}
  .hq-row {grid-template-columns: 1fr}
  .overview-stats {grid-template-columns: repeat(3, 1fr)}
  .ov-stat-item:nth-child(3){border-right:none}
}
@media (max-width: 768px) {
  .hq-sidebar {position: relative; width: 100%; height: auto; flex-direction: column}
  .hq-nav {flex-direction: row; padding: 8px; overflow-x: auto}
  .nav-item {white-space: nowrap; flex-shrink: 0}
  .hq-main {margin-left: 0}
  .hq-content {padding: 16px}
  .metrics-grid {grid-template-columns: repeat(2, 1fr)}
  .overview-stats {grid-template-columns: repeat(2, 1fr); padding: 16px}
  .ov-stat-item {border-right: none; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px}
  .header-stats {gap: 16px}
  .stat-item {min-width: 60px}
}
@media (max-width: 480px) {
  .hq-header {padding: 0 12px; flex-wrap: wrap; height: auto; padding: 12px}
  .header-stats {gap: 12px; width: 100%; justify-content: space-between}
  .stat-item {min-width: auto; flex: 1}
  .hq-content {padding: 12px}
  .metrics-grid {grid-template-columns: 1fr}
  .page-toolbar {flex-direction: column; align-items: stretch}
  .toolbar-left {flex-direction: column}
}

/* Script */
.script-sort{display:flex;gap:12px;margin-bottom:20px}
.sort-btn{padding:8px 16px;border-radius:20px;font-size:13px;background:#fff;border:1px solid #e2e8f0;cursor:pointer}
.sort-btn.active{background:#2563eb;color:#fff;border-color:#2563eb}
.script-list{}
.script-card{background:#fff;border-radius:12px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden}
.script-header{padding:16px 24px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between}
.script-source{display:flex;align-items:center;gap:10px}
.source-tag{background:#fef2f2;color:#dc2626;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:500}
.source-store{font-size:13px;color:#64748b}
.script-status{padding:4px 10px;background:#fef3c7;color:#b45309;border-radius:4px;font-size:12px}
.script-body{padding:20px 24px;font-size:15px;line-height:1.7;color:#1e293b;font-style:italic}
.script-tags{display:flex;flex-wrap:wrap;gap:10px;padding:0 24px 16px}
.tag-link,.tag-type,.tag-emotion{font-size:13px;padding:6px 12px;background:#f1f5f9;color:#64748b;border-radius:6px}
.tag-deal{background:#ecfdf5;color:#059669}
.script-footer{padding:16px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between}
.script-likes{font-size:13px;color:#64748b}
.script-likes b{color:#dc2626}
.script-actions{display:flex;gap:10px}
.btn-adopt,.btn-keep,.btn-ignore{padding:8px 16px;border-radius:6px;font-size:13px;cursor:pointer;transition:all 0.2s}
.btn-adopt{background:#10b981;color:#fff;border:none}
.btn-adopt:hover{background:#059669}
.btn-keep{background:#fff;color:#2563eb;border:1px solid #2563eb}
/* Course Make Chat (AI 对话式) */
.cm-chat-page{padding:20px 24px}
.cm-chat-layout{display:grid;grid-template-columns:260px 1fr 400px;gap:16px;height:calc(100vh - 130px);min-height:600px}
.cm-left,.cm-center,.cm-right{background:#fff;border-radius:12px;display:flex;flex-direction:column;overflow:hidden}
.cm-left{padding:16px;overflow-y:auto}
.cm-section-title{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px}
.cm-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.cm-section-header .cm-section-title{margin-bottom:0}
.cm-upload-btn{padding:4px 10px;font-size:11px;background:#fff;color:#2563eb;border:1px solid #2563eb;border-radius:6px;cursor:pointer;transition:all 0.2s}
.cm-upload-btn:hover{background:#eff6ff}
.cm-search input{width:100%;border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;margin-bottom:16px}
.cm-mat-group{margin-bottom:16px}
.cm-mat-label{font-size:11px;color:#94a3b8;font-weight:600;margin-bottom:8px;text-transform:uppercase}
.cm-mat-item{display:flex;align-items:center;gap:10px;padding:8px;border-radius:6px;cursor:pointer;transition:all 0.2s;margin-bottom:4px}
.cm-mat-item:hover{background:#f8fafc}
.cm-mat-item.selected{background:#eff6ff}
.cm-mat-info{flex:1;min-width:0}
.cm-mat-name{font-size:12px;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cm-mat-size{font-size:11px;color:#94a3b8;margin-top:2px}
.cm-selected-summary{margin-top:auto;padding:12px;background:#eff6ff;border-radius:8px;font-size:12px;color:#2563eb;text-align:center}
.cm-chat-header{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:12px}
.cm-bot-avatar{width:40px;height:40px;background:linear-gradient(135deg,#3b82f6,#6366f1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px}
.cm-bot-name{font-size:14px;font-weight:600}
.cm-bot-sub{font-size:12px;color:#94a3b8;margin-top:2px}
.cm-chat-messages{flex:1;padding:20px;overflow-y:auto}
.cm-msg{display:flex;gap:10px;margin-bottom:16px}
.cm-msg-bot{justify-content:flex-start}
.cm-msg-user{justify-content:flex-end;flex-direction:row}
.cm-msg-avatar{width:32px;height:32px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.cm-msg-user .cm-msg-avatar{background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-weight:600}
.cm-msg-bubble{max-width:75%;padding:12px 14px;border-radius:12px;font-size:13px;line-height:1.6;background:#f8fafc;color:#1e293b}
.cm-msg-user .cm-msg-bubble{background:#2563eb;color:#fff}
.cm-quick-prompts{padding:8px 20px;display:flex;gap:8px;flex-wrap:wrap;border-top:1px solid #f1f5f9}
.cm-quick{padding:6px 12px;border:1px solid #e2e8f0;border-radius:16px;font-size:12px;background:#fff;cursor:pointer;color:#64748b;transition:all 0.2s}
.cm-quick:hover{border-color:#2563eb;color:#2563eb}
.cm-chat-input{padding:12px 20px 16px;border-top:1px solid #f1f5f9;display:flex;gap:10px;align-items:flex-end}
.cm-chat-input textarea{flex:1;border:1px solid #e2e8f0;border-radius:8px;padding:10px;font-size:13px;font-family:inherit;resize:none}
.cm-send-btn{background:#2563eb;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:13px;cursor:pointer;height:42px}
.cm-preview-header{padding:16px 20px;border-bottom:1px solid #f1f5f9}
.cm-preview-title{font-size:14px;font-weight:600;margin-bottom:10px}
.cm-format-tabs{display:flex;gap:4px;background:#f1f5f9;padding:4px;border-radius:8px}
.cm-tab{flex:1;padding:6px 10px;border-radius:6px;font-size:12px;cursor:pointer;background:none;border:none}
.cm-tab.active{background:#fff;color:#2563eb;font-weight:500}
.cm-preview-body{flex:1;padding:16px 20px;overflow-y:auto}
.cm-ppt-slide{aspect-ratio:16/9;border:1px solid #e2e8f0;border-radius:8px;padding:24px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(135deg,#f0f9ff,#eff6ff);margin-bottom:16px;position:relative}
.cm-slide-num{position:absolute;top:10px;right:14px;font-size:11px;color:#94a3b8}
.cm-slide-title{font-size:22px;font-weight:700;color:#1e293b;margin-bottom:8px}
.cm-slide-sub{font-size:13px;color:#64748b;margin-bottom:16px}
.cm-slide-tag{font-size:11px;color:#94a3b8;padding:4px 8px;background:#fff;border-radius:4px;display:inline-block;width:fit-content}
.cm-slide-thumbs{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.cm-thumb{aspect-ratio:16/9;border:1px solid #e2e8f0;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#94a3b8;cursor:pointer}
.cm-thumb.active{border-color:#2563eb;color:#2563eb;background:#eff6ff}
.cm-preview-actions{padding:14px 20px;border-top:1px solid #f1f5f9;display:flex;gap:10px;justify-content:flex-end}
.cm-video-player{aspect-ratio:16/9;background:linear-gradient(135deg,#1e293b,#334155);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;margin-bottom:14px;cursor:pointer}
.cm-video-play{width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:10px}
.cm-video-meta{font-size:12px;opacity:0.8}
.cm-video-script{}
.cm-script-line{padding:10px 12px;background:#f8fafc;border-radius:6px;font-size:13px;line-height:1.6;margin-bottom:8px;color:#374151}
.cm-script-line b{color:#2563eb;margin-right:6px}
.cm-script-card{padding:14px;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:12px;background:#fff}
.cm-script-q{font-size:11px;color:#94a3b8;font-weight:600;margin-bottom:4px}
.cm-script-q-text{font-size:13px;color:#1e293b;font-style:italic;margin-bottom:12px;padding-left:10px;border-left:3px solid #e2e8f0}
.cm-script-a{font-size:11px;color:#10b981;font-weight:600;margin-bottom:4px}
.cm-script-a-text{font-size:13px;color:#374151;line-height:1.6;margin-bottom:10px}
.cm-script-tips{font-size:11px;color:#94a3b8;padding-top:8px;border-top:1px dashed #e2e8f0}

/* Knowledge tabs */
.kn-tabs{display:flex;gap:4px;background:#fff;padding:6px;border-radius:10px;margin-bottom:16px;width:fit-content;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.kn-tab{padding:10px 20px;border-radius:8px;font-size:13px;cursor:pointer;color:#64748b;display:inline-flex;align-items:center;gap:8px;text-decoration:none}
.kn-tab.active{background:#eff6ff;color:#2563eb;font-weight:500;cursor:default}
.kn-tab-count{background:#e2e8f0;padding:1px 8px;border-radius:10px;font-size:11px}
.kn-tab.active .kn-tab-count{background:#2563eb;color:#fff}

@media (max-width: 1100px){
  .cm-chat-layout{grid-template-columns:200px 1fr 320px}
}
@media (max-width: 900px){
  .cm-chat-layout{grid-template-columns:1fr;height:auto}
}

.btn-ignore{background:#fff;color:#94a3b8;border:1px solid #e2e8f0}
/* Script V2 */
.script-top-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:12px;flex-wrap:wrap}
.script-main-tabs{display:flex;gap:0;background:#fff;padding:0 8px;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.script-top-actions{display:flex;align-items:center;gap:10px}
.search-input-sm{width:180px;padding:8px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px}
.smt-tab{padding:14px 22px;background:none;border:none;font-size:14px;cursor:pointer;color:#64748b;border-bottom:2px solid transparent;display:flex;align-items:center;gap:8px}
.smt-tab.active{color:#2563eb;border-color:#2563eb;font-weight:500}
.smt-count{background:#e2e8f0;padding:1px 8px;border-radius:10px;font-size:11px;color:#64748b}
.smt-tab.active .smt-count{background:#2563eb;color:#fff}
.script-toolbar{display:flex;align-items:center;gap:14px;margin-bottom:16px;flex-wrap:wrap}
.frontline-card{background:#fff;border-radius:12px;margin-bottom:14px;padding:18px 20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all 0.2s}
.frontline-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08)}
.fc-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;gap:14px;flex-wrap:wrap}
.fc-tags{display:flex;gap:8px;flex-wrap:wrap}
.fc-tag-store,.fc-tag-link{font-size:12px;padding:5px 10px;border-radius:6px;font-weight:500;background:#f8fafc;color:#475569}
.fc-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.fc-status{padding:5px 10px;border-radius:6px;font-size:12px;font-weight:500}
.fc-status.st-pending{background:#fef3c7;color:#b45309}
.fc-status.st-adopted{background:#ecfdf5;color:#059669}
.fc-status.st-kept{background:#dbeafe;color:#2563eb}
.fc-qa{margin-bottom:12px}
.fc-q{padding:12px 14px;background:#f8fafc;border-left:3px solid #e2e8f0;border-radius:6px;font-size:13px;line-height:1.7;color:#1e293b;margin-bottom:8px}
.fc-a{padding:12px 14px;background:#f8fafc;border-left:3px solid #e2e8f0;border-radius:6px;font-size:13px;line-height:1.7;color:#1e293b}
.fc-q-label{font-weight:600;color:#475569;margin-right:4px}
.fc-a-label{font-weight:600;color:#475569;margin-right:4px}
.fc-footer{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
.fc-meta{font-size:12px;color:#94a3b8}
.fc-actions{display:flex;gap:8px;flex-wrap:wrap}
.fc-strategy{padding:10px 14px;background:#eff6ff;border-left:3px solid #3b82f6;border-radius:6px;font-size:13px;line-height:1.7;color:#1e40af;margin-bottom:12px}
.fc-strategy-label{font-weight:600;color:#2563eb;margin-right:4px}
.fc-hot-badge{font-size:12px;padding:4px 10px;border-radius:6px;font-weight:600;background:#fff7ed;color:#ea580c;animation:fc-hot-pulse 2s ease-in-out infinite}
@keyframes fc-hot-pulse{0%,100%{opacity:1}50%{opacity:0.7}}
/* Demand tab */
.demand-card{background:#fff;border-radius:12px;margin-bottom:12px;padding:18px 20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;align-items:center;justify-content:space-between;gap:16px;transition:all 0.2s}
.demand-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08)}
.demand-main{flex:1;min-width:0}
.demand-scene{font-size:15px;font-weight:600;color:#1e293b;margin-bottom:8px}
.demand-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.demand-count{font-size:13px;color:#64748b}
.demand-trend{font-size:12px;padding:3px 10px;border-radius:12px;font-weight:500}
.demand-trend-up{background:#fef3c7;color:#b45309}
.btn-demand-create{padding:10px 18px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.btn-demand-create:hover{background:linear-gradient(135deg,#1d4ed8,#1e40af);transform:translateY(-1px);box-shadow:0 2px 8px rgba(37,99,235,0.3)}
/* Push Page V2 */
.push-page{position:relative}
/* Push create modal */
.pu-modal-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:200;display:none}
.pu-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:640px;max-width:92vw;max-height:85vh;background:#fff;border-radius:16px;z-index:201;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.15);overflow:hidden}
.pu-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #f1f5f9}
.pu-modal-title{font-size:17px;font-weight:600}
.pu-modal-close{background:none;border:none;font-size:22px;cursor:pointer;color:#94a3b8;padding:0;line-height:1}
.pu-modal-close:hover{color:#1e293b}
.pu-steps-bar{display:flex;align-items:center;justify-content:center;padding:16px 24px;background:#f8fafc;gap:0}
.pu-step-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#94a3b8;white-space:nowrap}
.pu-step-item.active{color:#2563eb;font-weight:600}
.pu-step-item.done{color:#059669}
.pu-step-dot{width:22px;height:22px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#94a3b8}
.pu-step-item.active .pu-step-dot{background:#2563eb;color:#fff}
.pu-step-item.done .pu-step-dot{background:#059669;color:#fff}
.pu-step-line{width:28px;height:2px;background:#e2e8f0;margin:0 4px}
.pu-step-item.done + .pu-step-line{background:#059669}
.pu-modal-body{flex:1;overflow-y:auto;padding:24px}
.pu-modal-footer{display:flex;justify-content:flex-end;gap:10px;padding:16px 24px;border-top:1px solid #f1f5f9}
.pu-step-title{font-size:16px;font-weight:600;margin-bottom:6px}
.pu-step-desc{font-size:13px;color:#94a3b8;margin-bottom:20px}
/* Content type switch */
.pu-content-type-switch{display:flex;gap:6px;margin-bottom:16px;background:#f1f5f9;padding:4px;border-radius:8px;width:fit-content}
.pu-ct-switch{padding:8px 18px;border:none;border-radius:6px;font-size:13px;cursor:pointer;background:none;color:#64748b;transition:all 0.2s}
.pu-ct-switch.active{background:#fff;color:#2563eb;box-shadow:0 1px 3px rgba(0,0,0,0.08)}
.pu-pick-list{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;max-height:340px;overflow-y:auto}
.pu-pick-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 0.2s}
.pu-pick-item:hover{border-color:#3b82f6}
.pu-pick-item.selected{border-color:#2563eb;background:#eff6ff}
.pu-pick-icon{font-size:24px;flex-shrink:0}
.pu-pick-info{min-width:0}
.pu-pick-name{font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pu-pick-meta{font-size:11px;color:#94a3b8;margin-top:2px}
/* Tag step */
.pu-tags-section{margin-bottom:16px}
.pu-tags-label{font-size:13px;font-weight:500;color:#64748b;margin-bottom:8px}
.pu-tags-list{display:flex;flex-wrap:wrap;gap:6px}
.pu-tag-chip{padding:6px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;font-size:12px;cursor:pointer;color:#64748b;transition:all 0.2s}
.pu-tag-chip:hover{border-color:#3b82f6}
.pu-tag-chip.selected{background:#2563eb;color:#fff;border-color:#2563eb}
.pu-custom-tag{margin-bottom:16px}
.pu-tag-input{padding:7px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;flex:1}
.pu-coverage{padding:12px 16px;background:#eff6ff;border-radius:8px;font-size:14px;color:#2563eb;text-align:center}
/* Deadline step */
.pu-deadline-options{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.pu-dl-option{display:flex;flex-direction:column;align-items:center;gap:4px;padding:20px;border:1px solid #e2e8f0;border-radius:12px;cursor:pointer;transition:all 0.2s}
.pu-dl-option:hover{border-color:#3b82f6}
.pu-dl-option.selected{border-color:#2563eb;background:#eff6ff}
.pu-dl-label{font-size:18px;font-weight:700;color:#1e293b}
.pu-dl-option.selected .pu-dl-label{color:#2563eb}
.pu-dl-hint{font-size:12px;color:#94a3b8}
/* Confirm step */
.pu-confirm-card{background:#f8fafc;border-radius:10px;padding:20px}
.pu-confirm-row{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #e2e8f0;font-size:14px}
.pu-confirm-row:last-child{border:none}
.pu-confirm-label{color:#64748b}
.pu-confirm-val{font-weight:500;text-align:right;max-width:60%}
/* Success step */
.pu-success-icon{width:64px;height:64px;background:#ecfdf5;color:#059669;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 16px}
.pu-success-text{text-align:center;font-size:14px;color:#64748b;line-height:1.6}
/* Task list */
.push-list-section{margin-top:0}
.push-tabs{display:flex;gap:4px;background:#fff;border-radius:10px;padding:4px;margin-bottom:20px;width:fit-content;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.push-tab{padding:8px 20px;border:none;border-radius:8px;font-size:13px;cursor:pointer;background:none;color:#64748b;transition:all 0.2s}
.push-tab.active{background:#2563eb;color:#fff}
.push-cards{display:flex;flex-direction:column;gap:16px}
.push-card-item{background:#fff;border-radius:12px;padding:20px 24px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all 0.2s}
.push-card-item:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08)}
.ps-top{margin-bottom:16px}
.ps-title-area{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.ps-title{font-size:16px;font-weight:600}
.ps-status{padding:4px 12px;border-radius:6px;font-size:12px;font-weight:500}
.ps-doing{background:#dbeafe;color:#2563eb}
.ps-done{background:#ecfdf5;color:#059669}
.ps-revoked{background:#f1f5f9;color:#94a3b8}
.ps-meta{display:flex;align-items:center;gap:6px;font-size:12px;color:#94a3b8;flex-wrap:wrap}
.ps-meta-sep{color:#e2e8f0}
.ps-tags-row{display:flex;gap:6px;flex-wrap:wrap}
.ps-tag{padding:3px 10px;background:#f1f5f9;color:#64748b;border-radius:4px;font-size:11px}
.ps-mid{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;margin-bottom:16px;gap:16px;flex-wrap:wrap}
.ps-cover{font-size:13px;color:#64748b}
.ps-stats{display:flex;gap:20px}
.ps-stat{text-align:center}
.ps-stat-val{font-size:18px;font-weight:700;color:#1e293b}
.ps-stat-label{font-size:11px;color:#94a3b8}
.ps-actions{display:flex;gap:8px}
.ps-action-btn{padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;background:#fff;border:1px solid #e2e8f0;color:#64748b;transition:all 0.2s}
.ps-action-btn:hover{background:#f1f5f9}
.ps-action-btn.primary{background:#2563eb;color:#fff;border-color:#2563eb}
.ps-action-btn.primary:hover{background:#1d4ed8}
.ps-action-btn.danger{color:#dc2626;border-color:#fecaca}
.ps-action-btn.danger:hover{background:#fef2f2}
/* Task type tags on cards */
.ps-type-tag{padding:3px 10px;border-radius:6px;font-size:11px;font-weight:500;white-space:nowrap}
.ps-type-practice{background:#dbeafe;color:#2563eb}
.ps-type-package{background:#ede9fe;color:#7c3aed}
.ps-type-exam{background:#fff7ed;color:#c2410c}
/* Combo content selection */
.pu-combo-section{margin-bottom:18px}
.pu-combo-title{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.pu-combo-hint{font-size:11px;font-weight:400;color:#94a3b8}
.pu-combo-required{font-size:11px;font-weight:500;color:#dc2626;background:#fef2f2;padding:2px 8px;border-radius:4px}
.pu-scene-list{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;max-height:240px;overflow-y:auto}
.pu-scene-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 0.2s}
.pu-scene-item:hover{border-color:#3b82f6}
.pu-scene-item.selected{border-color:#2563eb;background:#eff6ff}
.pu-empty-hint{text-align:center;padding:20px;color:#94a3b8;font-size:13px}
/* Order preview bar */
.pu-order-preview{display:flex;align-items:center;flex-wrap:wrap;gap:6px;padding:12px 16px;background:#f8fafc;border-radius:8px;margin-top:20px;font-size:13px;min-height:40px}
.pu-order-item{padding:4px 10px;border-radius:6px;font-size:12px;font-weight:500;white-space:nowrap}
.pu-order-cw{background:#eff6ff;color:#2563eb}
.pu-order-q{background:#fef3c7;color:#b45309}
.pu-order-scene{background:#ecfdf5;color:#059669}
/* Package preview in step 4 */
.pu-package-preview{margin-top:20px;background:#f8fafc;border-radius:12px;padding:20px}
.pu-pp-header{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:4px}
.pu-pp-duration{font-size:13px;color:#64748b;margin-bottom:16px}
.pu-timeline{display:flex;flex-direction:column;gap:0;position:relative}
.pu-timeline::before{content:'';position:absolute;left:15px;top:8px;bottom:8px;width:2px;background:#e2e8f0}
.pu-timeline-item{display:flex;align-items:flex-start;gap:12px;padding:8px 0;position:relative;z-index:1}
.pu-tl-num{width:32px;height:32px;border-radius:50%;background:#fff;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#64748b;flex-shrink:0}
.pu-timeline-item.pu-tl-final .pu-tl-num{border-color:#059669;background:#ecfdf5;color:#059669}
.pu-tl-info{flex:1;min-width:0}
.pu-tl-label{font-size:11px;color:#94a3b8;margin-bottom:2px}
.pu-tl-name{font-size:13px;color:#1e293b;font-weight:500}
.pu-tl-time{font-size:12px;color:#64748b;flex-shrink:0;padding-top:2px}
/* Push detail page */
.pd-page{}
.pd-back{display:inline-flex;align-items:center;gap:6px;color:#64748b;font-size:14px;cursor:pointer;margin-bottom:20px;transition:color 0.2s}
.pd-back:hover{color:#2563eb}
.pd-header-card{margin-bottom:20px;padding:24px}
.pd-header-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.pd-title{font-size:18px;font-weight:600;margin-bottom:6px}
.pd-meta{font-size:13px;color:#94a3b8}
.pd-cover-line{font-size:13px;color:#64748b;margin-top:12px}
.pd-rings-card{margin-bottom:20px}
.pd-rings{display:flex;justify-content:center;gap:40px;padding:24px}
.pd-ring-item{display:flex;flex-direction:column;align-items:center;gap:10px}
.pd-ring-label{font-size:13px;color:#64748b}
.pd-drill-card{}
.pd-drill-tabs{display:flex;gap:0;padding:0 24px;background:#fff;border-bottom:1px solid #e2e8f0}
.pd-drill-tab{padding:14px 20px;background:none;border:none;font-size:14px;cursor:pointer;color:#64748b;border-bottom:2px solid transparent}
.pd-drill-tab.active{color:#2563eb;border-color:#2563eb;font-weight:500}
.pd-drill-body{max-height:400px;overflow-y:auto;padding:16px 24px}
.pd-drill-list{display:flex;flex-direction:column;gap:8px}
.pd-empty{text-align:center;color:#94a3b8;padding:32px;font-size:13px}
.pd-store-row{display:grid;grid-template-columns:1.8fr 1.2fr 55px 70px;gap:12px;align-items:center;padding:10px 14px;border:1px solid #f1f5f9;border-radius:8px}
.pd-store-row.poor{border-color:#fed7aa;background:#fff7ed}
.pds-name{font-size:13px;font-weight:600}
.pds-city{font-size:11px;color:#94a3b8;margin-top:2px}
.pds-bar-wrap{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden}
.pds-bar-fill{height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:3px}
.pd-store-row.poor .pds-bar-fill{background:#f97316}
.pds-pct{font-size:13px;font-weight:600}
.pds-level{font-size:12px;color:#64748b}
.pd-store-row.poor .pds-level{color:#b45309}
.pd-person-row{display:grid;grid-template-columns:auto 1fr 80px 50px;gap:12px;align-items:center;padding:10px 14px;border:1px solid #f1f5f9;border-radius:8px}
.pd-person-row.poor{border-color:#fed7aa;background:#fff7ed}
.pdp-avatar{width:36px;height:36px;background:#dbeafe;color:#2563eb;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}
.pdp-name{font-size:13px;font-weight:600}
.pdp-store{font-size:11px;color:#94a3b8;margin-top:2px}
.pdp-status{padding:3px 10px;border-radius:4px;font-size:12px;text-align:center}
.pdp-status.good{background:#ecfdf5;color:#059669}
.pdp-status.normal{background:#dbeafe;color:#2563eb}
.pdp-status.poor{background:#fee2e2;color:#dc2626}
.pdp-score{font-size:13px;font-weight:500;color:#64748b;text-align:right}
.pd-bottom-bar{padding:20px 0;text-align:center}
@media (max-width: 1100px){
  .pu-modal{width:96vw;max-height:90vh}
  .pu-pick-list{grid-template-columns:1fr}
  .ps-mid{flex-direction:column;align-items:flex-start}
  .pd-rings{gap:20px}
  .pd-store-row{grid-template-columns:1fr 80px 55px 55px;font-size:12px}
  .pd-person-row{grid-template-columns:auto 1fr 70px}
  .pds-bar-wrap{display:none}
}
/* Question bank */
.question-layout{display:grid;grid-template-columns:200px 1fr;gap:20px}
.question-left{background:#fff;border-radius:12px;padding:16px;height:fit-content}
.ql-section{margin-bottom:20px}
.ql-section:last-child{margin-bottom:0}
.ql-section-title{font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:10px}
.ql-list{display:flex;flex-direction:column;gap:2px}
.ql-item{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;border-radius:6px;cursor:pointer;font-size:13px;color:#475569;transition:all 0.2s}
.ql-item:hover{background:#f8fafc}
.ql-item.active{background:#eff6ff;color:#2563eb;font-weight:500}
.ql-count{font-size:11px;background:#f1f5f9;color:#64748b;padding:1px 8px;border-radius:10px}
.ql-item.active .ql-count{background:#2563eb;color:#fff}
.question-right{}
.q-col-scene{flex:2}
.q-col-opt{flex:1.8}
.q-col-actions{flex:2}
.qt-status{padding:4px 10px;border-radius:6px;font-size:12px;font-weight:500;display:inline-block}
.qt-status-ok{background:#ecfdf5;color:#059669}
.qt-status-warn{background:#fef3c7;color:#b45309}
.qt-status-err{background:#fef2f2;color:#dc2626}
.qt-note{font-size:11px;color:#94a3b8;margin-top:4px;max-width:180px}
@media (max-width: 900px){
  .question-layout{grid-template-columns:1fr}
  .question-left{display:none}
}
/* Targeted Question */
.targeted-page{padding-bottom:100px}
.targeted-card{margin-bottom:20px;padding:0}
.targeted-card .card-header{flex-direction:column;align-items:flex-start;gap:4px}
.targeted-scene-list{padding:8px 24px 20px}
.ts-item{display:flex;align-items:center;gap:14px;padding:14px;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:10px;cursor:pointer;transition:all 0.2s}
.ts-item:hover{border-color:#3b82f6;background:#f8fafc}
.ts-item.active{border-color:#2563eb;background:#eff6ff}
.ts-radio{font-size:18px;color:#94a3b8}
.ts-item.active .ts-radio{color:#2563eb}
.ts-info{flex:1}
.ts-name{font-size:14px;font-weight:600;margin-bottom:2px}
.ts-meta{font-size:12px;color:#64748b}
.targeted-store-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:8px 24px 16px}
.t-store-item{padding:14px;border:1px solid #e2e8f0;border-radius:10px;background:#fff}
.t-store-item.severe{border-color:#fecaca;background:#fef2f2}
.t-store-item.mild{border-color:#fed7aa;background:#fff7ed}
.t-store-item.normal{border-color:#bfdbfe;background:#eff6ff}
.t-store-name{font-size:14px;font-weight:600;margin-bottom:2px}
.t-store-city{font-size:12px;color:#94a3b8;margin-bottom:10px}
.t-store-bar{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:6px}
.t-store-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#6366f1);border-radius:3px}
.t-store-item.severe .t-store-fill{background:#dc2626}
.t-store-item.mild .t-store-fill{background:#f97316}
.t-store-foot{display:flex;justify-content:space-between;font-size:12px;color:#64748b}
.t-store-status{font-weight:500}
.t-store-item.severe .t-store-status{color:#dc2626}
.t-store-item.mild .t-store-status{color:#b45309}
.targeted-store-summary{padding:0 24px 20px;font-size:13px;color:#64748b}
.ai-question-list{padding:8px 24px 20px}
.ai-q-item{padding:16px;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:12px;background:#fff}
.ai-q-header{display:flex;align-items:flex-start;gap:12px;margin-bottom:10px}
.ai-q-num{width:24px;height:24px;background:#2563eb;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0}
.ai-q-text{flex:1;font-size:14px;font-weight:600;line-height:1.5}
.ai-q-check{font-size:12px;color:#64748b;display:flex;align-items:center;gap:4px;cursor:pointer;flex-shrink:0}
.ai-q-tip{font-size:13px;color:#475569;line-height:1.6;background:#f8fafc;padding:10px 12px;border-radius:6px;margin-bottom:10px}
.ai-q-actions{display:flex;gap:14px}
.targeted-bottom-bar{position:fixed;bottom:0;left:220px;right:0;background:#fff;border-top:1px solid #e2e8f0;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 -2px 8px rgba(0,0,0,0.04);z-index:50}
.bottom-summary{font-size:13px;color:#64748b}
.bottom-buttons{display:flex;gap:10px}
@media (max-width: 768px) {
  .targeted-store-grid{grid-template-columns:1fr}
  .targeted-bottom-bar{left:0;flex-direction:column;gap:10px;align-items:stretch}
}
/* ====== 课件库（Courseware） ====== */
.cw-topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;gap:12px}
.cw-filters{background:#fff;border-radius:12px;padding:16px 20px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px}
.cw-filter-group{display:flex;align-items:flex-start;gap:12px}
.cw-filter-label{font-size:12px;font-weight:600;color:#64748b;white-space:nowrap;padding-top:6px;min-width:56px}
.cw-filter-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.cw-chip{padding:6px 14px;border-radius:20px;font-size:12px;background:#f8fafc;border:1px solid #e2e8f0;cursor:pointer;transition:all 0.2s;color:#475569;white-space:nowrap}
.cw-chip:hover{background:#eff6ff;border-color:#93c5fd}
.cw-chip.active{background:#2563eb;color:#fff;border-color:#2563eb}
.cw-chip-activity[data-activity-status="active"]{border-color:#10b981}
.cw-chip-activity[data-activity-status="upcoming"]{border-color:#3b82f6}
.cw-chip-activity[data-activity-status="ended"]{border-color:#d1d5db;color:#9ca3af}
.cw-chip-activity[data-activity-status="ended"].active{background:#9ca3af;border-color:#9ca3af;color:#fff}
.cw-hide-ended{display:flex;align-items:center;gap:4px;font-size:12px;color:#94a3b8;cursor:pointer;margin-left:8px;white-space:nowrap}
.cw-hide-ended input{cursor:pointer}
.cw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.cw-card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:10px;transition:all 0.2s;border:1px solid transparent}
.cw-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08);border-color:#e2e8f0}
.cw-card-type{display:flex;align-items:center;gap:6px}
.cw-type-icon{font-size:20px}
.cw-type-label{font-size:11px;font-weight:600;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:4px}
.cw-type-ppt .cw-type-label{background:#eff6ff;color:#2563eb}
.cw-type-video .cw-type-label{background:#fce7f3;color:#be185d}
.cw-type-knowledge .cw-type-label{background:#fef3c7;color:#b45309}
.cw-card-title{font-size:15px;font-weight:600;color:#1e293b;line-height:1.4}
.cw-card-tags{display:flex;flex-wrap:wrap;gap:4px}
.cw-tag{font-size:11px;padding:2px 8px;background:#f1f5f9;color:#64748b;border-radius:4px}
.cw-card-status{font-size:12px}
.cw-status-ok{color:#059669;background:#ecfdf5;padding:3px 8px;border-radius:4px}
.cw-status-warn{color:#b45309;background:#fef3c7;padding:3px 8px;border-radius:4px}
.cw-status-pending{color:#6d28d9;background:#f5f3ff;padding:3px 8px;border-radius:4px}
.cw-status-offline{color:#9ca3af;background:#f3f4f6;padding:3px 8px;border-radius:4px}
.cw-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:8px;border-top:1px solid #f1f5f9}
.cw-card-time{font-size:12px;color:#94a3b8}
.cw-card-actions{display:flex;gap:8px}
.cw-action-btn{background:none;border:1px solid #e2e8f0;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;color:#64748b;transition:all 0.2s}
.cw-action-btn:hover{background:#f1f5f9;color:#1e293b}
@media (max-width: 768px) {
  .cw-filter-group{flex-direction:column;gap:6px}
  .cw-grid{grid-template-columns:1fr}
}
/* ====== 题库（Question Bank 专项层级化） ====== */
.qb-page{}
.qb-tabs{display:flex;gap:4px;background:#fff;padding:6px;border-radius:10px;margin-bottom:20px;width:fit-content;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.qb-tab{padding:10px 20px;border-radius:8px;font-size:13px;cursor:pointer;color:#64748b;background:none;border:none;transition:all 0.2s;white-space:nowrap}
.qb-tab:hover{background:#f1f5f9}
.qb-tab.active{background:#eff6ff;color:#2563eb;font-weight:500}
.qb-panel{display:none}
.qb-panel.active{display:block}
.qb-comp{margin-bottom:24px}
.qb-comp-head{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.qb-comp-label{}
.qb-comp-desc{font-size:12px;color:#94a3b8;font-weight:400}
.qb-comp-card{background:linear-gradient(135deg,#eff6ff,#f0f9ff);border:1px solid #bfdbfe;border-radius:12px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.qb-comp-info{flex:1}
.qb-comp-name{font-size:16px;font-weight:600;color:#1e293b;margin-bottom:6px}
.qb-comp-meta{font-size:13px;color:#64748b}
.qb-comp-actions{display:flex;gap:10px;flex-shrink:0}
.qb-comp-btn{padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;background:#fff;border:1px solid #bfdbfe;color:#2563eb;transition:all 0.2s}
.qb-comp-btn:hover{background:#2563eb;color:#fff;border-color:#2563eb}
.qb-comp-btn-primary{background:#2563eb;color:#fff;border-color:#2563eb}
.qb-comp-btn-primary:hover{background:#1d4ed8}
.qb-units-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.qb-units-title{font-size:15px;font-weight:600;color:#1e293b}
.qb-units-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.qb-unit-card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:8px;transition:all 0.2s;border:1px solid transparent}
.qb-unit-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08);border-color:#e2e8f0}
.qb-unit-name{font-size:15px;font-weight:600;color:#1e293b}
.qb-unit-meta{font-size:12px;color:#94a3b8;display:flex;align-items:center;gap:4px}
.qb-meta-dot{margin:0 2px}
.qb-unit-status{font-size:12px}
.qb-status-ok{color:#059669;background:#ecfdf5;padding:3px 8px;border-radius:4px;display:inline-block}
.qb-status-warn{color:#b45309;background:#fef3c7;padding:3px 8px;border-radius:4px;display:inline-block}
.qb-status-err{color:#dc2626;background:#fef2f2;padding:3px 8px;border-radius:4px;display:inline-block}
.qb-unit-note{font-size:11px;color:#94a3b8;margin-top:4px}
.qb-unit-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:8px;border-top:1px solid #f1f5f9}
.qb-unit-time{font-size:12px;color:#94a3b8}
.qb-unit-actions{display:flex;gap:8px;flex-wrap:wrap}
.qb-action-link{background:none;border:none;color:#2563eb;font-size:12px;cursor:pointer;padding:0}
.qb-action-link:hover{text-decoration:underline}
@media (max-width: 768px) {
  .qb-tabs{overflow-x:auto;width:100%}
  .qb-comp-card{flex-direction:column;align-items:flex-start}
  .qb-units-grid{grid-template-columns:1fr}
}
/* 区域分布 */
.pd-region-card{margin-bottom:20px}
.pd-region-list{padding:8px 0}
.pd-region-row{display:flex;align-items:center;gap:16px;padding:16px 24px;border-bottom:1px solid #f1f5f9;transition:all 0.2s}
.pd-region-row:last-child{border-bottom:none}
.pd-region-row:hover{background:#f8fafc}
.pd-region-info{width:120px;flex-shrink:0}
.pd-region-name{font-size:15px;font-weight:600;color:#1e293b}
.pd-region-meta{font-size:12px;color:#94a3b8;margin-top:2px}
.pd-region-stat{flex:1;display:flex;align-items:center;gap:10px}
.pd-region-pct{font-size:16px;font-weight:700;color:#1e293b}
.pd-region-tag{padding:3px 10px;border-radius:6px;font-size:12px;font-weight:500}
.pd-region-tag.good{background:#ecfdf5;color:#059669}
.pd-region-tag.normal{background:#fef3c7;color:#b45309}
.pd-region-tag.poor{background:#fef2f2;color:#dc2626}
.pd-region-toggle{background:none;border:1px solid #e2e8f0;padding:8px 16px;border-radius:8px;font-size:13px;color:#2563eb;cursor:pointer;transition:all 0.2s;flex-shrink:0}
.pd-region-toggle:hover{background:#eff6ff;border-color:#2563eb}
/* 区域门店下钻 */
.pd-region-stores{padding:0 24px 16px;background:#f8fafc;border-top:1px solid #e2e8f0}
.pd-rstore-row{display:grid;grid-template-columns:1.8fr 1.2fr 55px 50px;gap:12px;align-items:center;padding:10px 14px;margin-top:8px;border-bottom:1px solid #f1f5f9}
.pd-rstore-row.poor{background:#fff7ed;border-radius:8px;border:1px solid #fed7aa}
.pd-rs-name{font-size:13px;font-weight:600;color:#1e293b}
.pd-rs-city{font-size:11px;color:#94a3b8;margin-top:2px}
.pd-rs-bar-wrap{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden}
.pd-rs-bar-fill{height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:3px}
.pd-rstore-row.poor .pd-rs-bar-fill{background:#f97316}
.pd-rs-pct{font-size:13px;font-weight:600;color:#1e293b}
.pd-rs-label{font-size:13px}
.pd-region-actions{display:flex;gap:12px;padding:16px 0 8px}
.pd-action-btn-resend{padding:12px 20px;border-radius:10px;font-size:14px;cursor:pointer;background:#fff;border:2px solid #f97316;color:#c2410c;font-weight:500;transition:all 0.2s;flex:1}
.pd-action-btn-resend:hover{background:#fff7ed;border-color:#ea580c}
.pd-action-btn-quiz{padding:12px 20px;border-radius:10px;font-size:14px;cursor:pointer;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border:none;font-weight:500;transition:all 0.2s;flex:1}
.pd-action-btn-quiz:hover{background:linear-gradient(135deg,#1d4ed8,#1e40af);box-shadow:0 4px 12px rgba(37,99,235,0.3)}
@media (max-width: 768px) {
  .pd-region-row{flex-wrap:wrap}
  .pd-region-info{width:100%}
  .pd-rstore-row{grid-template-columns:1fr 60px 50px}
  .pd-rs-bar-wrap{display:none}
}
/* 针对薄弱点 AI 出题弹层 */
.wqm-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.45);backdrop-filter:blur(4px);z-index:300}
.wqm-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:680px;max-width:94vw;max-height:88vh;background:#fff;border-radius:16px;z-index:301;display:flex;flex-direction:column;box-shadow:0 24px 80px rgba(0,0,0,0.18);overflow:hidden}
.wqm-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 28px;border-bottom:1px solid #f1f5f9;flex-shrink:0}
.wqm-modal-title{font-size:18px;font-weight:700;color:#1e293b}
.wqm-modal-close{background:none;border:none;font-size:24px;cursor:pointer;color:#94a3b8;padding:4px 8px;line-height:1;border-radius:6px;transition:all 0.2s}
.wqm-modal-close:hover{background:#f1f5f9;color:#1e293b}
.wqm-modal-body{flex:1;overflow-y:auto;padding:24px 28px}
.wqm-modal-footer{display:flex;justify-content:flex-end;gap:10px;padding:16px 28px;border-top:1px solid #f1f5f9;flex-shrink:0;background:#f8fafc}
.wqm-insight{background:linear-gradient(135deg,#eff6ff,#f0f9ff);border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;margin-bottom:20px}
.wqm-insight-title{font-size:13px;font-weight:600;color:#2563eb;margin-bottom:8px}
.wqm-pain-item{font-size:14px;color:#1e293b;margin-bottom:6px;line-height:1.6}
.wqm-pain-desc{font-size:12px;color:#64748b}
.wqm-generated-label{font-size:14px;color:#1e293b;margin-bottom:16px}
.wqm-questions-list{display:flex;flex-direction:column;gap:12px;max-height:360px;overflow-y:auto;padding-right:4px}
.wqm-q-card{padding:16px 18px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;transition:all 0.2s}
.wqm-q-card:hover{border-color:#93c5fd;box-shadow:0 2px 8px rgba(59,130,246,0.08)}
.wqm-q-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.wqm-q-num{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:24px;background:#2563eb;color:#fff;border-radius:6px;font-size:11px;font-weight:600;padding:0 8px}
.wqm-q-title{font-size:14px;font-weight:600;color:#1e293b}
.wqm-q-scene{font-size:13px;color:#475569;margin-bottom:10px;line-height:1.5;padding:8px 12px;background:#f8fafc;border-radius:6px}
.wqm-q-options{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px}
.wqm-opt{font-size:12px;color:#475569;padding:8px 10px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;line-height:1.5}
.wqm-opt-answer{background:#ecfdf5;border-color:#a7f3d0;color:#065f46;font-weight:500}
.wqm-q-analysis{font-size:12px;color:#64748b;line-height:1.6;padding:10px 12px;background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 6px 6px 0}
.wqm-btn-secondary{padding:10px 18px;border-radius:8px;font-size:13px;cursor:pointer;background:#fff;border:1px solid #e2e8f0;color:#475569;transition:all 0.2s}
.wqm-btn-secondary:hover{background:#f1f5f9;border-color:#cbd5e1}
.wqm-btn-primary{padding:10px 18px;border-radius:8px;font-size:13px;cursor:pointer;background:#2563eb;color:#fff;border:none;font-weight:500;transition:all 0.2s}
.wqm-btn-primary:hover{background:#1d4ed8}
@media (max-width: 768px) {
  .wqm-modal{width:96vw;max-height:92vh}
  .wqm-q-options{grid-template-columns:1fr}
  .wqm-modal-footer{flex-direction:column}
  .wqm-modal-footer button{width:100%}
}
</style>`;
}

// 文档级事件委托 —— 无论 innerHTML 刷新多少次都有效
(function() {
  document.addEventListener('click', function(e) {
    var el = e.target;

    // 知识管理：课件库/题库 Tab
    var kt = el.closest('.kn-tab');
    if (kt) {
      document.querySelectorAll('.kn-tab').forEach(function(x){ x.classList.remove('active'); });
      kt.classList.add('active');
      var w = kt.getAttribute('data-kntab');
      var ce = document.querySelector('.kn-content-course');
      var qe = document.querySelector('.kn-content-question');
      if (ce) ce.style.display = w === 'course' ? 'block' : 'none';
      if (qe) qe.style.display = w === 'question' ? 'block' : 'none';
      return;
    }

    // 实战话术：一线挖掘/门店采纳/一线需求 Tab
    var st = el.closest('.smt-tab');
    if (st) {
      document.querySelectorAll('.smt-tab').forEach(function(x){ x.classList.remove('active'); });
      st.classList.add('active');
      var w = st.getAttribute('data-smttab');
      var fe = document.querySelector('.script-pane-frontline');
      var ae = document.querySelector('.script-pane-adopted');
      var de = document.querySelector('.script-pane-demand');
      var fa = document.querySelector('.script-top-actions-frontline');
      var aa = document.querySelector('.script-top-actions-adopted');
      var da = document.querySelector('.script-top-actions-demand');
      if (fe) fe.style.display = w === 'frontline' ? 'block' : 'none';
      if (ae) ae.style.display = w === 'adopted' ? 'block' : 'none';
      if (de) de.style.display = w === 'demand' ? 'block' : 'none';
      if (fa) fa.style.display = w === 'frontline' ? 'flex' : 'none';
      if (aa) aa.style.display = w === 'adopted' ? 'flex' : 'none';
      if (da) da.style.display = w === 'demand' ? 'flex' : 'none';
      return;
    }

    // 课件制作：PPT/视频/话术 预览切换
    var ct = el.closest('.cm-format-tabs .cm-tab');
    if (ct) {
      var ctnr = ct.closest('.cm-format-tabs');
      ctnr.querySelectorAll('.cm-tab').forEach(function(x){ x.classList.remove('active'); });
      ct.classList.add('active');
      var w = ct.getAttribute('data-cmtab');
      var pe = document.querySelector('.cm-preview-ppt');
      var ve = document.querySelector('.cm-preview-video');
      var se = document.querySelector('.cm-preview-script');
      if (pe) pe.style.display = w === 'ppt' ? 'block' : 'none';
      if (ve) ve.style.display = w === 'video' ? 'block' : 'none';
      if (se) se.style.display = w === 'script' ? 'block' : 'none';
      return;
    }

    // 推送详情下钻：按门店/按个人 Tab（事件委托 + onclick 双保险）
    var dt = el.closest('.pd-drill-tab');
    if (dt) {
      document.querySelectorAll('.pd-drill-tab').forEach(function(x){ x.classList.remove('active'); });
      dt.classList.add('active');
      var w = dt.getAttribute('data-pddtab');
      var se = document.getElementById('pdDrillStore');
      var pe = document.getElementById('pdDrillPerson');
      if (se) se.style.display = w === 'store' ? 'block' : 'none';
      if (pe) pe.style.display = w === 'person' ? 'block' : 'none';
      return;
    }

    // 新建推送弹层：关闭（点击遮罩）
    if (el.closest('.pu-modal-mask')) {
      closePushCreate();
      return;
    }

    // 题库左侧分类
    var qi = el.closest('.ql-item');
    if (qi) {
      var section = qi.closest('.ql-section');
      if (section) {
        section.querySelectorAll('.ql-item').forEach(function(x){ x.classList.remove('active'); });
        qi.classList.add('active');
      }
      return;
    }

    // 课件库：维度筛选 chip
    var cwc = el.closest('.cw-chip');
    if (cwc) {
      cwc.classList.toggle('active');
      applyCoursewareFilter();
      return;
    }

    // 课件库：隐藏已结束活动
    var hec = el.closest('#cwHideEnded');
    if (hec) {
      applyCoursewareFilter();
      return;
    }

    // 题库：专项 Tab 切换
    var qbt = el.closest('.qb-tab');
    if (qbt) {
      var tabId = qbt.getAttribute('data-qb-tab');
      var tabsContainer = qbt.closest('.qb-tabs');
      if (tabsContainer) {
        tabsContainer.querySelectorAll('.qb-tab').forEach(function(t){ t.classList.remove('active'); });
        qbt.classList.add('active');
      }
      document.querySelectorAll('.qb-panel').forEach(function(p){ p.classList.remove('active'); });
      var panel = document.querySelector('.qb-panel[data-qb-panel="' + tabId + '"]');
      if (panel) panel.classList.add('active');
      return;
    }

  });
})();

// 搜索框 input 事件（独立于 click 委托）
document.addEventListener('input', function(e) {
  if (e.target && e.target.id === 'cwSearchInput') {
    var keyword = (e.target.value || '').toLowerCase();
    document.querySelectorAll('.cw-card').forEach(function(card) {
      var text = (card.textContent || '').toLowerCase();
      card.style.display = keyword === '' || text.indexOf(keyword) !== -1 ? '' : 'none';
    });
  }
});

window.HQ = {
  navigate: function(page) {
    window.__currentSubPage__ = page;
    var app = document.getElementById('app');
    if (app && typeof renderHQPage === 'function') {
      app.innerHTML = renderHQPage();
    }
  }
};

Router.register('hq', renderHQPage);