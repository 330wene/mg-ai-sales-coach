/**
 * 学习记录页 — Alipay 蓝风格
 * 路由：#learn-record
 */

// ====== Mock 数据 ======
var LEARN_RECORD_DATA = [
  { date: '2026-06-23', dayLabel: '6月23日', weekday: '周一', totalMinutes: 55, sessions: 2, assignedCount: 8,
    items: [
      { title: 'MG7 新品上市资料', type: 'PDF', minutes: 30, stars: 1 },
      { title: '成交话术演练',       type: '对练', minutes: 25, stars: 12, maxStars: 15 }
    ]
  },
  { date: '2026-06-22', dayLabel: '6月22日', weekday: '周日', totalMinutes: 0, sessions: 0, assignedCount: 0, items: [] },
  { date: '2026-06-21', dayLabel: '6月21日', weekday: '周六', totalMinutes: 20, sessions: 1, assignedCount: 3,
    items: [
      { title: '留资开口标准话术', type: 'PPT', minutes: 20, stars: 1 }
    ]
  },
  { date: '2026-06-20', dayLabel: '6月20日', weekday: '周五', totalMinutes: 45, sessions: 2, assignedCount: 5,
    items: [
      { title: 'MG4 产品核心卖点讲解',        type: 'PDF',  minutes: 30, stars: 1 },
      { title: '竞品对比分析 — 秦 PLUS vs MG4', type: 'Word', minutes: 15, stars: 1 }
    ]
  },
  { date: '2026-06-19', dayLabel: '6月19日', weekday: '周四', totalMinutes: 35, sessions: 1, assignedCount: 4,
    items: [
      { title: '金融方案推荐技巧', type: 'PPT', minutes: 35, stars: 1 }
    ]
  },
  { date: '2026-06-18', dayLabel: '6月18日', weekday: '周三', totalMinutes: 60, sessions: 2, assignedCount: 6,
    items: [
      { title: '试驾邀约标准流程',            type: '视频', minutes: 25, stars: 1 },
      { title: 'MG Cyberster 展厅接待攻略', type: 'PDF', minutes: 35, stars: 2 }
    ]
  },
  { date: '2026-06-17', dayLabel: '6月17日', weekday: '周二', totalMinutes: 30, sessions: 1, assignedCount: 3,
    items: [
      { title: 'MG7 半固态电池核心技术', type: 'PDF', minutes: 30, stars: 1 }
    ]
  }
];

var LEARN_RECORD_RANK = { today: 12, week: 15 };

// ====== CSS ======
var LEARN_RECORD_CSS = '' +
'<style>' +
'  .lr-page {' +
'    width: 100%; max-width: 412px;' +
'    min-height: 100vh;' +
'    margin: 0 auto;' +
'    background: linear-gradient(180deg, #E3ECF9 0px, #EBEFF5 200px);' +
'    display: flex; flex-direction: column;' +
'    font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;' +
'    -webkit-font-smoothing: antialiased;' +
'  }' +

'  .env-switcher { display: none !important; }' +

'  /* ── 导航栏 56px ── */' +
'  .lr-nav {' +
'    height: 56px;' +
'    display: flex; align-items: center; justify-content: center;' +
'    position: relative; flex-shrink: 0;' +
'  }' +
'  .lr-back-btn {' +
'    position: absolute; left: 16px; top: 50%; transform: translateY(-50%);' +
'    display: flex; align-items: center; gap: 2px;' +
'    color: #1677FF; font-size: 15px;' +
'    background: none; border: none;' +
'    cursor: pointer; font-family: inherit;' +
'    padding: 0;' +
'    -webkit-tap-highlight-color: transparent;' +
'  }' +
'  .lr-back-btn:active { opacity: 0.6; }' +
'  .lr-nav-title { font-size: 18px; font-weight: 700; color: #1D2129; }' +

'  /* ── 滚动区 ── */' +
'  .lr-scroll {' +
'    flex: 1; overflow-y: auto; overscroll-behavior: contain;' +
'    scrollbar-width: none; -webkit-overflow-scrolling: touch;' +
'    padding: 0 16px 24px;' +
'  }' +
'  .lr-scroll::-webkit-scrollbar { display: none; }' +

'  /* ── 卡片基础 ── */' +
'  .lr-card {' +
'    border-radius: 20px; padding: 20px;' +
'  }' +
'  .lr-card + .lr-card { margin-top: 16px; }' +

'  /* 卡片标题：蓝色色条 + 文字 */' +
'  .lr-card-title {' +
'    display: flex; align-items: center; gap: 8px;' +
'    font-size: 16px; font-weight: 700; color: #1677FF;' +
'    margin-bottom: 20px;' +
'  }' +
'  .lr-card-title::before {' +
'    content: "";' +
'    display: block; width: 4px; height: 16px;' +
'    border-radius: 2px;' +
'    background: #1677FF;' +
'    flex-shrink: 0;' +
'  }' +

'  /* 浅色分隔线 */' +
'  .lr-divider {' +
'    height: 1px; background: #EEF1F6;' +
'    margin: 20px 0;' +
'  }' +

'  /* 3 列数据行 */' +
'  .lr-stat-row {' +
'    display: grid; grid-template-columns: repeat(3, 1fr);' +
'    text-align: center;' +
'  }' +
'  .lr-stat-val {' +
'    font-size: 24px; font-weight: 800; color: #1D2129;' +
'    line-height: 1.2;' +
'  }' +
'  .lr-stat-val.gold { color: #F59A00; }' +
'  .lr-stat-sm { font-size: 14px; font-weight: 400; }' +
'  .lr-stat-lbl {' +
'    font-size: 12px; color: #8A94A6;' +
'    margin-top: 4px;' +
'  }' +

'  /* ========== 今日统计卡 ========== */' +
'  .lr-card.today {' +
'    background: linear-gradient(140deg, #EAF3FF, #DFE9FE);' +
'    border: 1px solid rgba(22,119,255,.12);' +
'    box-shadow: 0 2px 12px rgba(22,119,255,.06);' +
'  }' +

'  /* 星星主角区 */' +
'  .lr-star-hero {' +
'    display: flex; flex-direction: column; align-items: center;' +
'    padding: 12px 0 8px;' +
'  }' +
'  .lr-star-hero .lr-big-star {' +
'    font-size: 36px; line-height: 1;' +
'    color: #FFA51F;' +
'    text-shadow: 0 2px 12px rgba(255,165,31,.35);' +
'    margin-bottom: 4px;' +
'  }' +
'  .lr-star-hero .lr-big-num {' +
'    font-size: 48px; font-weight: 800;' +
'    color: #F59A00;' +
'    line-height: 1.1;' +
'  }' +
'  .lr-star-hero .lr-big-label {' +
'    font-size: 13px; color: #8A94A6;' +
'    margin-top: 4px;' +
'  }' +

'  /* 进度条 */' +
'  .lr-progress-info {' +
'    font-size: 12px; color: #8A94A6;' +
'    margin-bottom: 8px;' +
'  }' +
'  .lr-progress-info strong { color: #1D2129; font-weight: 600; }' +
'  .lr-progress-info .lr-pct { color: #1677FF; font-weight: 600; }' +
'  .lr-progress-bar {' +
'    height: 8px; background: #D5E2F7;' +
'    border-radius: 4px; overflow: hidden;' +
'  }' +
'  .lr-progress-fill {' +
'    height: 100%; border-radius: 4px;' +
'    background: linear-gradient(90deg, #1677FF, #3D8FFF);' +
'    transition: width 0.6s ease;' +
'  }' +

'  /* ========== 本周统计卡 ========== */' +
'  .lr-card.week {' +
'    background: #FFFFFF;' +
'    box-shadow: 0 6px 22px rgba(27,67,140,.07);' +
'  }' +

'  .lr-week-header {' +
'    display: flex; align-items: baseline; justify-content: space-between;' +
'    margin-bottom: 20px;' +
'  }' +
'  .lr-week-header .lr-card-title { margin-bottom: 0; }' +
'  .lr-week-summary { font-size: 12.5px; color: #8A94A6; flex-shrink: 0; }' +

'  /* 集星墙 */' +
'  .lr-star-wall {' +
'    display: grid; grid-template-columns: repeat(7, 1fr);' +
'    gap: 4px;' +
'  }' +
'  .lr-sw-cell {' +
'    background: #F4F7FC;' +
'    border-radius: 13px;' +
'    padding: 12px 4px;' +
'    display: flex; flex-direction: column; align-items: center;' +
'    gap: 5px;' +
'    border: 1.5px solid transparent;' +
'  }' +
'  .lr-sw-cell.today {' +
'    background: #EAF3FF;' +
'    border-color: #1677FF;' +
'  }' +
'  .lr-sw-star { font-size: 16px; line-height: 1; color: #FFA51F; }' +
'  .lr-sw-cell.rest .lr-sw-star { color: #D0D5DD; }' +
'  .lr-sw-num  { font-size: 17px; font-weight: 800; color: #F59A00; line-height: 1; }' +
'  .lr-sw-cell.rest .lr-sw-num { font-size: 13px; font-weight: 400; color: #B0B8C5; }' +
'  .lr-sw-day  { font-size: 12px; color: #8A94A6; }' +
'  .lr-sw-cell.today .lr-sw-day { color: #1677FF; font-weight: 700; }' +

'  /* ========== 每日明细 ========== */' +
'  .lr-detail-wrap { text-align: center; padding: 20px 0 0; }' +
'  .lr-detail-toggle {' +
'    font-size: 13px; color: #8A94A6;' +
'    cursor: pointer; background: none; border: none;' +
'    font-family: inherit; padding: 8px 16px;' +
'    -webkit-tap-highlight-color: transparent;' +
'  }' +
'  .lr-detail-toggle:active { color: #4E5969; }' +

'  .lr-detail-list { display: none; }' +
'  .lr-detail-list.open { display: block; }' +

'  .lr-day-card {' +
'    background: #FFFFFF; border-radius: 16px;' +
'    box-shadow: 0 1px 3px rgba(0,0,0,.04);' +
'    padding: 14px 16px;' +
'    margin-top: 10px;' +
'  }' +

'  .lr-day-card-head {' +
'    display: flex; align-items: baseline; justify-content: space-between;' +
'    margin-bottom: 10px;' +
'  }' +
'  .lr-day-date { font-size: 14px; font-weight: 600; color: #1D2129; }' +
'  .lr-day-info { font-size: 12px; color: #8A94A6; }' +

'  .lr-day-card-body { border-top: 1px solid #F5F5F5; padding-top: 6px; }' +

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

'  .lr-log-stars { display: flex; gap: 1px; font-size: 11px; line-height: 1; }' +
'  .lr-star-on  { color: #FFA51F; }' +
'  .lr-star-off { color: #E8E8E8; }' +
'  .lr-star-score {' +
'    display: inline-flex; align-items: baseline; gap: 1px;' +
'    color: #F59A00; font-weight: 600; white-space: nowrap;' +
'  }' +
'  .lr-star-score .lr-sc-num { font-size: 13px; font-weight: 700; }' +
'  .lr-star-score .lr-sc-of  { font-size: 10px; color: #8A94A6; font-weight: 400; }' +

'  .lr-day-empty { font-size: 13px; color: #B0B8C5; padding: 8px 0 4px; }' +

'  @media (max-width: 430px) {' +
'    .lr-page { max-width: 100%; }' +
'  }' +
'</style>';

// ====== 辅助函数 ======

function lrDayTotalStars(day) {
  var t = 0;
  day.items.forEach(function(it) { t += it.stars; });
  return t;
}

function lrDayPct(day) {
  if (!day.assignedCount || day.assignedCount <= 0) return 0;
  return Math.min(100, Math.round(day.items.length / day.assignedCount * 100));
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

/** 集星墙 */
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
  var today = LEARN_RECORD_DATA[0];
  var todayMinutes = today.totalMinutes;
  var todaySessions = today.sessions;
  var todayCompleted = today.items.length;
  var todayAssigned = today.assignedCount;
  var todayPct = lrDayPct(today);
  var todayStars = lrDayTotalStars(today);
  var todayRank = LEARN_RECORD_RANK.today;

  // 本周（最旧在前）
  var weekBars = LEARN_RECORD_DATA.slice().reverse();
  var todayBarIndex = weekBars.length - 1;

  var weekMinutes = 0, weekStars = 0, weekCompleted = 0, weekAssigned = 0, weekDays = 0;
  for (var w = 0; w < LEARN_RECORD_DATA.length; w++) {
    var d = LEARN_RECORD_DATA[w];
    weekMinutes += d.totalMinutes;
    weekStars += lrDayTotalStars(d);
    weekCompleted += d.items.length;
    weekAssigned += d.assignedCount;
    if (d.items.length > 0) weekDays++;
  }
  var weekRank = LEARN_RECORD_RANK.week;

  // ── 构建 HTML ──
  var html = LEARN_RECORD_CSS;
  html += '<div class="lr-page">';

  // ===== 导航 =====
  html += '<div class="lr-nav">';
  html += '<button class="lr-back-btn" onclick="window.lrGoBack()">‹ 返回</button>';
  html += '<span class="lr-nav-title">学习记录</span>';
  html += '</div>';

  html += '<div class="lr-scroll">';

  // ===== 今日统计卡 =====
  html += '<div class="lr-card today">';
  html += '<div class="lr-card-title">今日统计</div>';

  // 星星主角区
  html += '<div class="lr-star-hero">';
  html += '<span class="lr-big-star">★</span>';
  html += '<span class="lr-big-num">' + todayStars + '</span>';
  html += '<span class="lr-big-label">今日获得星星</span>';
  html += '</div>';

  html += '<div class="lr-divider"></div>';

  // 3 列数据
  html += '<div class="lr-stat-row">';
  html += '<div><div class="lr-stat-val">' + todayMinutes + '</div><div class="lr-stat-lbl">学习时间（分钟）</div></div>';
  html += '<div><div class="lr-stat-val">' + todaySessions + '</div><div class="lr-stat-lbl">学习次数</div></div>';
  html += '<div><div class="lr-stat-val"><span class="lr-stat-sm">第</span>' + todayRank + '<span class="lr-stat-sm">名</span></div><div class="lr-stat-lbl">门店排名</div></div>';
  html += '</div>';

  // 进度条
  if (todayAssigned > 0) {
    html += '<div class="lr-divider"></div>';
    html += '<div class="lr-progress-info">';
    html += '<span>今日学习进度 <span class="lr-pct">' + todayPct + '%</span></span>';
    html += '</div>';
    html += '<div class="lr-progress-bar"><div class="lr-progress-fill" style="width:' + todayPct + '%"></div></div>';
  }

  html += '</div>'; // .lr-card.today

  // ===== 本周统计卡 =====
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

  html += '</div>'; // .lr-scroll
  html += '</div>'; // .lr-page
  return html;
}

Router.register('learn-record', renderLearnRecordPage);
