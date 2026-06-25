/**
 * 学习记录页 — 深蓝渐变 Hero + 白卡内容面板
 * 路由：#learn-record
 * 视觉风格：上浓下淡，精确规格
 */

// ====== Mock 数据（硬编码匹配 spec） ======
var LEARN_RECORD_DATA = [
  // 周一（today）— 13 星
  { date: '2026-06-23', dayLabel: '6月23日', weekday: '周一', totalMinutes: 55, sessions: 2, assignedCount: 8,
    items: [
      { title: 'MG7 新品上市资料',       type: 'PDF',  minutes: 30, stars: 1 },
      { title: '成交话术演练',           type: '对练', minutes: 25, stars: 12, maxStars: 15 }
    ]
  },
  // 周日 — 休息
  { date: '2026-06-22', dayLabel: '6月22日', weekday: '周日', totalMinutes: 0, sessions: 0, assignedCount: 0, items: [] },
  // 周六 — 1 星
  { date: '2026-06-21', dayLabel: '6月21日', weekday: '周六', totalMinutes: 20, sessions: 1, assignedCount: 3,
    items: [
      { title: '留资开口标准话术', type: 'PPT', minutes: 20, stars: 1 }
    ]
  },
  // 周五 — 2 星
  { date: '2026-06-20', dayLabel: '6月20日', weekday: '周五', totalMinutes: 45, sessions: 2, assignedCount: 5,
    items: [
      { title: 'MG4 产品核心卖点讲解',        type: 'PDF',  minutes: 30, stars: 1 },
      { title: '竞品对比分析 — 秦 PLUS vs MG4', type: 'Word', minutes: 15, stars: 1 }
    ]
  },
  // 周四 — 1 星
  { date: '2026-06-19', dayLabel: '6月19日', weekday: '周四', totalMinutes: 35, sessions: 1, assignedCount: 4,
    items: [
      { title: '金融方案推荐技巧', type: 'PPT', minutes: 35, stars: 1 }
    ]
  },
  // 周三 — 3 星
  { date: '2026-06-18', dayLabel: '6月18日', weekday: '周三', totalMinutes: 60, sessions: 2, assignedCount: 6,
    items: [
      { title: '试驾邀约标准流程',            type: '视频', minutes: 25, stars: 1 },
      { title: 'MG Cyberster 展厅接待攻略', type: 'PDF',  minutes: 35, stars: 2 }
    ]
  },
  // 周二 — 1 星
  { date: '2026-06-17', dayLabel: '6月17日', weekday: '周二', totalMinutes: 30, sessions: 1, assignedCount: 3,
    items: [
      { title: 'MG7 半固态电池核心技术', type: 'PDF', minutes: 30, stars: 1 }
    ]
  }
];

var LEARN_RECORD_RANK = { today: 12, week: 15 };

// ====== CSS（精确规格） ======
var LEARN_RECORD_CSS = '' +
'<style>' +
'  /* ===== 外层容器 ===== */' +
'  .lr-stage {' +
'    display: flex; align-items: center; justify-content: center;' +
'    min-height: 100vh; padding: 12px;' +
'    background: #E3ECF9;' +
'  }' +
'  .lr-phone {' +
'    width: 412px; max-width: 100%;' +
'    background: #EFF3FA;' +
'    border-radius: 24px;' +
'    overflow: hidden;' +
'    box-shadow: 0 12px 36px rgba(20,50,100,0.2);' +
'    position: relative;' +
'  }' +

'  .env-switcher { display: none !important; }' +

'  /* ===== 深蓝渐变 Hero ===== */' +
'  .lr-hero {' +
'    background: linear-gradient(168deg, #3E68DD 0%, #274FB2 52%, #172E78 100%);' +
'    padding: 16px 18px 32px;' +
'    color: #fff;' +
'    position: relative;' +
'    overflow: hidden;' +
'  }' +
'  /* 光感装饰 */' +
'  .lr-hero::before {' +
'    content: "";' +
'    position: absolute;' +
'    width: 160px; height: 160px;' +
'    right: -46px; top: -30px;' +
'    background: rgba(255,255,255,0.06);' +
'    border-radius: 50%;' +
'    pointer-events: none;' +
'  }' +
'  .lr-hero::after {' +
'    content: "";' +
'    position: absolute;' +
'    width: 96px; height: 96px;' +
'    left: -34px; bottom: 30px;' +
'    background: rgba(255,255,255,0.045);' +
'    border-radius: 50%;' +
'    pointer-events: none;' +
'  }' +

'  /* ── 导航行 ── */' +
'  .lr-nav {' +
'    display: flex; align-items: center; justify-content: center;' +
'    position: relative;' +
'    margin-bottom: 16px;' +
'  }' +
'  .lr-back-btn {' +
'    position: absolute; left: 0; top: 50%; transform: translateY(-50%);' +
'    display: flex; align-items: center; gap: 2px;' +
'    font-size: 15px; color: #fff;' +
'    background: none; border: none;' +
'    cursor: pointer; font-family: inherit;' +
'    padding: 0;' +
'    -webkit-tap-highlight-color: transparent;' +
'  }' +
'  .lr-back-btn:active { opacity: 0.6; }' +
'  .lr-nav-title {' +
'    font-size: 17px; font-weight: 500; color: #fff;' +
'  }' +

'  /* ── 今日统计标题行 ── */' +
'  .lr-section-title {' +
'    display: flex; align-items: center; gap: 8px;' +
'    font-size: 16px; font-weight: 500; color: #fff;' +
'    margin-bottom: 14px;' +
'    position: relative; z-index: 1;' +
'  }' +
'  .lr-section-title::before {' +
'    content: "";' +
'    display: block;' +
'    width: 4px; height: 17px;' +
'    border-radius: 2px;' +
'    background: #8FC0FF;' +
'    flex-shrink: 0;' +
'  }' +

'  /* ── 星星主角区 ── */' +
'  .lr-star-hero {' +
'    display: flex; flex-direction: column; align-items: center;' +
'    padding: 8px 0;' +
'    position: relative; z-index: 1;' +
'  }' +
'  .lr-star-hero .lr-big-star {' +
'    font-size: 34px; line-height: 1;' +
'    color: #FFC062;' +
'    filter: drop-shadow(0 2px 10px rgba(255,180,60,0.5));' +
'    margin-bottom: 2px;' +
'  }' +
'  .lr-star-hero .lr-big-num {' +
'    font-size: 44px; font-weight: 500;' +
'    color: #FFC470;' +
'    line-height: 1.1;' +
'    filter: drop-shadow(0 2px 12px rgba(255,180,60,0.4));' +
'  }' +
'  .lr-star-hero .lr-big-label {' +
'    font-size: 12px; color: rgba(255,255,255,0.74);' +
'    margin-top: 4px;' +
'  }' +

'  /* ── Hero 分隔线 ── */' +
'  .lr-hero-divider {' +
'    height: 1px;' +
'    background: rgba(255,255,255,0.15);' +
'    margin: 14px 0;' +
'    position: relative; z-index: 1;' +
'  }' +

'  /* ── 3 列统计行（hero 内） ── */' +
'  .lr-hero .lr-stat-row {' +
'    display: grid; grid-template-columns: repeat(3, 1fr);' +
'    text-align: center;' +
'    position: relative; z-index: 1;' +
'  }' +
'  .lr-hero .lr-stat-val {' +
'    font-size: 21px; font-weight: 500; color: #fff;' +
'    line-height: 1.2;' +
'  }' +
'  .lr-hero .lr-stat-sm { font-size: 14px; font-weight: 400; }' +
'  .lr-hero .lr-stat-lbl {' +
'    font-size: 11px; color: rgba(255,255,255,0.7);' +
'    margin-top: 2px;' +
'  }' +

'  /* ── 进度条区域（hero 内） ── */' +
'  .lr-progress {' +
'    position: relative; z-index: 1;' +
'    margin-top: 14px;' +
'  }' +
'  .lr-progress-info {' +
'    display: flex; justify-content: space-between; align-items: baseline;' +
'    margin-bottom: 8px;' +
'  }' +
'  .lr-progress-label {' +
'    font-size: 13px; color: rgba(255,255,255,0.85);' +
'  }' +
'  .lr-progress-pct {' +
'    font-size: 14px; font-weight: 500; color: #FFD08A;' +
'  }' +
'  .lr-progress-bar {' +
'    height: 8px;' +
'    background: rgba(255,255,255,0.2);' +
'    border-radius: 5px;' +
'    overflow: hidden;' +
'  }' +
'  .lr-progress-fill {' +
'    height: 100%;' +
'    width: 25%;' +
'    border-radius: 5px;' +
'    background: linear-gradient(90deg, #BFE0FF, #7FB0FF);' +
'  }' +

'  /* ===== 内容面板（白底圆角上盖） ===== */' +
'  .lr-content-panel {' +
'    background: #EFF3FA;' +
'    border-radius: 22px 22px 0 0;' +
'    margin-top: -20px;' +
'    padding: 18px 14px;' +
'    position: relative; z-index: 1;' +
'  }' +

'  /* ===== 白卡规范 ===== */' +
'  .lr-card {' +
'    background: #fff;' +
'    border-radius: 18px;' +
'    padding: 16px 14px;' +
'    box-shadow: 0 1px 2px rgba(20,40,90,0.05), 0 10px 26px rgba(30,58,140,0.07);' +
'  }' +

'  /* 卡片标题：竖线 + 文字 */' +
'  .lr-card-title {' +
'    display: flex; align-items: center; gap: 8px;' +
'    font-size: 16px; font-weight: 500; color: #1A2742;' +
'  }' +
'  .lr-card-title::before {' +
'    content: "";' +
'    display: block;' +
'    width: 4px; height: 17px;' +
'    border-radius: 2px;' +
'    background: #5BA0F5;' +
'    flex-shrink: 0;' +
'  }' +

'  /* ── 分隔线 ── */' +
'  .lr-divider {' +
'    height: 1px; background: #EEF1F6;' +
'    margin: 16px 0;' +
'  }' +

'  /* ── 3 列统计行（面板内） ── */' +
'  .lr-stat-row {' +
'    display: grid; grid-template-columns: repeat(3, 1fr);' +
'    text-align: center;' +
'  }' +
'  .lr-stat-val {' +
'    font-size: 21px; font-weight: 500; color: #1D2129;' +
'    line-height: 1.2;' +
'  }' +
'  .lr-stat-val.gold { color: #E8941A; }' +
'  .lr-stat-sm { font-size: 14px; font-weight: 400; }' +
'  .lr-stat-lbl {' +
'    font-size: 12px; color: #9AA4B8;' +
'    margin-top: 2px;' +
'  }' +

'  /* ===== 本周统计卡 ===== */' +
'  .lr-card.week {' +
'    margin-bottom: 0;' +
'  }' +
'  .lr-week-header {' +
'    display: flex; align-items: baseline; justify-content: space-between;' +
'    margin-bottom: 16px;' +
'  }' +
'  .lr-week-header .lr-card-title { margin-bottom: 0; }' +
'  .lr-week-summary { font-size: 12px; color: #9AA4B8; flex-shrink: 0; }' +

'  /* ── 集星墙（7 格） ── */' +
'  .lr-star-wall {' +
'    display: grid; grid-template-columns: repeat(7, 1fr);' +
'    gap: 5px;' +
'  }' +
'  .lr-sw-cell {' +
'    background: #F2F5FB;' +
'    border-radius: 11px;' +
'    padding: 9px 0;' +
'    display: flex; flex-direction: column; align-items: center;' +
'    border: 1.5px solid transparent;' +
'  }' +
'  .lr-sw-cell .lr-sw-star {' +
'    font-size: 13px; line-height: 1;' +
'    color: #EFA82B;' +
'  }' +
'  .lr-sw-cell .lr-sw-num {' +
'    font-size: 14px; font-weight: 500;' +
'    color: #E8941A;' +
'    line-height: 1;' +
'    margin: 2px 0;' +
'  }' +
'  .lr-sw-cell .lr-sw-day {' +
'    font-size: 11px; color: #9AA4B8;' +
'  }' +

'  /* 选中格（今天） */' +
'  .lr-sw-cell.today {' +
'    background: #EAF1FE;' +
'    border-color: #3B82F6;' +
'  }' +
'  .lr-sw-cell.today .lr-sw-star { color: #EFA82B; }' +
'  .lr-sw-cell.today .lr-sw-num  { color: #2563EB; }' +
'  .lr-sw-cell.today .lr-sw-day  { color: #2563EB; }' +

'  /* 休息格 */' +
'  .lr-sw-cell.rest { background: #F4F5F7; }' +
'  .lr-sw-cell.rest .lr-sw-star { color: #C7CCD6; }' +
'  .lr-sw-cell.rest .lr-sw-num  {' +
'    font-size: 11px; font-weight: 500;' +
'    color: #AAB2C0;' +
'  }' +
'  .lr-sw-cell.rest .lr-sw-day  { color: #AAB2C0; }' +

'  /* ===== 每日明细 ===== */' +
'  .lr-detail-wrap {' +
'    text-align: center; padding: 20px 0 0;' +
'  }' +
'  .lr-detail-toggle {' +
'    font-size: 14px; color: #7486A6;' +
'    cursor: pointer; background: none; border: none;' +
'    font-family: inherit; padding: 8px 16px;' +
'    -webkit-tap-highlight-color: transparent;' +
'  }' +
'  .lr-detail-toggle:active { color: #4E5969; }' +

'  .lr-detail-list { display: none; }' +
'  .lr-detail-list.open { display: block; }' +

'  /* 明细日卡片 */' +
'  .lr-day-card {' +
'    background: #fff;' +
'    border-radius: 16px;' +
'    box-shadow: 0 1px 2px rgba(20,40,90,0.04), 0 6px 16px rgba(30,58,140,0.05);' +
'    padding: 14px 16px;' +
'    margin-top: 10px;' +
'  }' +
'  .lr-day-card-head {' +
'    display: flex; align-items: baseline; justify-content: space-between;' +
'    margin-bottom: 10px;' +
'  }' +
'  .lr-day-date { font-size: 14px; font-weight: 500; color: #1A2742; }' +
'  .lr-day-info { font-size: 12px; color: #9AA4B8; }' +

'  .lr-day-card-body {' +
'    border-top: 1px solid #EEF1F6;' +
'    padding-top: 6px;' +
'  }' +

'  .lr-log-item {' +
'    display: flex; align-items: center; justify-content: space-between;' +
'    padding: 8px 0;' +
'  }' +
'  .lr-log-item + .lr-log-item { border-top: 1px solid #F5F5F5; }' +
'  .lr-log-left { min-width: 0; display: flex; align-items: baseline; gap: 8px; }' +
'  .lr-log-title { font-size: 13px; color: #1D2129; line-height: 1.4; }' +
'  .lr-log-type {' +
'    font-size: 10px; color: #8A94A6; flex-shrink: 0;' +
'    background: #F5F5F5; padding: 1px 6px; border-radius: 4px;' +
'  }' +
'  .lr-log-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: 12px; }' +
'  .lr-log-time { font-size: 12px; color: #8A94A6; white-space: nowrap; }' +

'  /* 星星 */' +
'  .lr-log-stars { display: flex; gap: 1px; font-size: 11px; line-height: 1; }' +
'  .lr-star-on  { color: #EFA82B; }' +
'  .lr-star-off { color: #E8E8E8; }' +
'  .lr-star-score {' +
'    display: inline-flex; align-items: baseline; gap: 1px;' +
'    color: #E8941A; font-weight: 500; white-space: nowrap;' +
'  }' +
'  .lr-star-score .lr-sc-num { font-size: 13px; font-weight: 500; }' +
'  .lr-star-score .lr-sc-of  { font-size: 10px; color: #8A94A6; font-weight: 400; }' +

'  .lr-day-empty {' +
'    font-size: 13px; color: #B0B8C5; padding: 8px 0 4px;' +
'  }' +

'  /* ===== 响应式 ===== */' +
'  @media (max-width: 430px) {' +
'    .lr-stage { padding: 0; }' +
'    .lr-phone { width: 100%; border-radius: 0; box-shadow: none; min-height: 100vh; }' +
'  }' +
'</style>';

// ====== 辅助函数 ======

function lrDayTotalStars(day) {
  var t = 0;
  day.items.forEach(function(it) { t += it.stars; });
  return t;
}

function lrRenderStars(n, max) {
  max = max || 3;
  if (max > 5) {
    return '<span class="lr-star-score"><span class="lr-sc-num">' + n + '</span><span class="lr-sc-of">/' + max + '</span></span>';
  }
  var h = '';
  for (var i = 1; i <= max; i++) {
    h += '<span class="' + (i <= n ? 'lr-star-on' : 'lr-star-off') + '">★</span>';
  }
  return h;
}

/** 集星墙（7 格，最旧→最新，今天在最后） */
function lrRenderStarWall(weekBars, todayIndex) {
  var h = '<div class="lr-star-wall">';
  for (var i = 0; i < weekBars.length; i++) {
    var day = weekBars[i];
    var isToday = (i === todayIndex);
    var stars = lrDayTotalStars(day);
    var isRest = (day.items.length === 0);
    var cls = isRest ? ' rest' : '';
    if (isToday) cls = ' today';

    h += '<div class="lr-sw-cell' + cls + '">';
    h += '<span class="lr-sw-star">★</span>';
    if (isRest) {
      h += '<span class="lr-sw-num">休息</span>';
    } else {
      h += '<span class="lr-sw-num">' + stars + '</span>';
    }
    h += '<span class="lr-sw-day">' + day.weekday + '</span>';
    h += '</div>';
  }
  h += '</div>';
  return h;
}

// ====== 导航 ======

window.lrGoBack = function() {
  window.location.href = '成交教练-phase1-v5.html';
};

window.lrToggleDetail = function() {
  var list = document.getElementById('lrDetailList');
  var btn = document.getElementById('lrDetailToggle');
  if (list.classList.contains('open')) {
    list.classList.remove('open');
    btn.innerHTML = '展开每日明细 <span style="font-size:10px">⌄</span>';
  } else {
    list.classList.add('open');
    btn.innerHTML = '收起每日明细 <span style="font-size:10px">⌃</span>';
  }
};

// ====== 渲染 ======

function renderLearnRecordPage() {
  // ── Today（最新日 = LEARN_RECORD_DATA[0]）──
  var today = LEARN_RECORD_DATA[0];
  var todayMinutes = today.totalMinutes;           // 55
  var todaySessions = today.sessions;               // 2
  var todayStars = lrDayTotalStars(today);          // 13
  var todayRank = LEARN_RECORD_RANK.today;          // 12

  // ── 本周（最旧在前）──
  var weekBars = LEARN_RECORD_DATA.slice().reverse();  // 周二…周一
  var todayBarIndex = weekBars.length - 1;              // 周一在末尾

  var weekMinutes = 0, weekStars = 0, weekCompleted = 0, weekAssigned = 0, weekDays = 0;
  for (var w = 0; w < LEARN_RECORD_DATA.length; w++) {
    var d = LEARN_RECORD_DATA[w];
    weekMinutes += d.totalMinutes;
    weekStars += lrDayTotalStars(d);
    weekCompleted += d.items.length;
    weekAssigned += d.assignedCount;
    if (d.items.length > 0) weekDays++;
  }
  // weekMinutes=245, weekStars=21, weekCompleted=9, weekAssigned=29, weekDays=6

  // ── 构建 HTML ──
  var html = LEARN_RECORD_CSS;
  html += '<div class="lr-stage">';
  html += '<div class="lr-phone">';

  // ========== Hero 深蓝渐变头部 ==========
  html += '<div class="lr-hero">';

  // 导航
  html += '<div class="lr-nav">';
  html += '<button class="lr-back-btn" onclick="window.lrGoBack()">'
       + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
       + '返回</button>';
  html += '<span class="lr-nav-title">学习记录</span>';
  html += '</div>';

  // 今日统计标题
  html += '<div class="lr-section-title">今日统计</div>';

  // 星星主角区
  html += '<div class="lr-star-hero">';
  html += '<span class="lr-big-star">★</span>';
  html += '<span class="lr-big-num">' + todayStars + '</span>';
  html += '<span class="lr-big-label">今日获得星星</span>';
  html += '</div>';

  html += '<div class="lr-hero-divider"></div>';

  // 3 列统计
  html += '<div class="lr-stat-row">';
  html += '<div><div class="lr-stat-val">' + todayMinutes + '</div><div class="lr-stat-lbl">学习时间（分钟）</div></div>';
  html += '<div><div class="lr-stat-val">' + todaySessions + '</div><div class="lr-stat-lbl">学习次数</div></div>';
  html += '<div><div class="lr-stat-val"><span class="lr-stat-sm">第</span>' + todayRank + '<span class="lr-stat-sm">名</span></div><div class="lr-stat-lbl">门店排名</div></div>';
  html += '</div>';

  html += '<div class="lr-hero-divider"></div>';

  // 进度条（硬编码 25%）
  html += '<div class="lr-progress">';
  html += '<div class="lr-progress-info">';
  html += '<span class="lr-progress-label">今日学习进度</span>';
  html += '<span class="lr-progress-pct">25%</span>';
  html += '</div>';
  html += '<div class="lr-progress-bar"><div class="lr-progress-fill"></div></div>';
  html += '</div>';

  html += '</div>'; // .lr-hero

  // ========== 内容面板 ==========
  html += '<div class="lr-content-panel">';

  // 本周统计白卡
  html += '<div class="lr-card week">';
  html += '<div class="lr-week-header">';
  html += '<div class="lr-card-title">本周统计</div>';
  html += '<span class="lr-week-summary">共推送 ' + weekAssigned + ' · 已学 ' + weekCompleted + ' 项</span>';
  html += '</div>';

  // 集星墙
  html += lrRenderStarWall(weekBars, todayBarIndex);

  html += '<div class="lr-divider"></div>';

  // 3 列本周累计
  html += '<div class="lr-stat-row">';
  html += '<div><div class="lr-stat-val">' + weekMinutes + '</div><div class="lr-stat-lbl">总时长（分钟）</div></div>';
  html += '<div><div class="lr-stat-val gold">' + weekStars + '</div><div class="lr-stat-lbl">本周星星</div></div>';
  html += '<div><div class="lr-stat-val">' + weekDays + '</div><div class="lr-stat-lbl">学习天数</div></div>';
  html += '</div>';

  html += '</div>'; // .lr-card.week

  // ===== 每日明细 =====
  html += '<div class="lr-detail-wrap">';
  html += '<button class="lr-detail-toggle" id="lrDetailToggle" onclick="window.lrToggleDetail()">展开每日明细 ⌄</button>';
  html += '</div>';

  html += '<div class="lr-detail-list" id="lrDetailList">';

  for (var dd = 0; dd < LEARN_RECORD_DATA.length; dd++) {
    var dayData = LEARN_RECORD_DATA[dd];
    html += '<div class="lr-day-card">';
    html += '<div class="lr-day-card-head">';
    html += '<span class="lr-day-date">' + dayData.dayLabel + ' ' + dayData.weekday + '</span>';
    html += '<span class="lr-day-info">' + (dayData.totalMinutes > 0 ? dayData.totalMinutes + '分钟' : '休息') + '</span>';
    html += '</div>';

    if (dayData.items.length > 0) {
      html += '<div class="lr-day-card-body">';
      dayData.items.forEach(function(item) {
        html += '<div class="lr-log-item">';
        html += '<div class="lr-log-left">';
        html += '<span class="lr-log-title">' + item.title + '</span>';
        html += '<span class="lr-log-type">' + item.type + '</span>';
        html += '</div>';
        html += '<div class="lr-log-right">';
        html += '<span class="lr-log-stars">' + lrRenderStars(item.stars, item.maxStars) + '</span>';
        html += '<span class="lr-log-time">' + item.minutes + '分钟</span>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
    } else {
      html += '<div class="lr-day-empty">暂无学习记录</div>';
    }
    html += '</div>';
  }

  html += '</div>'; // .lr-detail-list

  html += '</div>'; // .lr-content-panel
  html += '</div>'; // .lr-phone
  html += '</div>'; // .lr-stage

  return html;
}

Router.register('learn-record', renderLearnRecordPage);
