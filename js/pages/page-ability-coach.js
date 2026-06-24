/**
 * 能力提升 - 二级面板（移动端单列，主色支付宝蓝）
 * 四步引导：看 → 听 → 练 → 反馈
 * 聚焦短板：需求引导与卖点匹配
 */

// ====== 数据 ======
var ABILITY_DATA = {
  title: '需求引导与卖点匹配',
  parentAbility: '需求分析能力',
  score: 64,
  parentScore: 52,
  weakness: '能问出需求，但没把对应卖点接上去',
  step1: {
    title: '需求分析',
    dimensions: [
      { name: '客户画像挖掘', score: 88 },
      { name: '成交信号判断', score: 85 },
      { name: '客户信息挖掘', score: 73 },
      { name: '需求引导与卖点匹配', score: 64, highlight: true }
    ],
    conclusion: '提问挖掘需求环节你表现还不错，可客户说完用车诉求后，无法联动车型优势针对性讲解，卖点和用户需求脱节，需要多练习。'
  },
  step2: {
    audioLabel: '销冠陈静 · 接卖点示范',
    audioDuration: '02:15',
    transcript: [
      { speaker: '客户', text: '我家俩孩子，经常一家五口出门，后排和后备箱得够用。' },
      { speaker: '销冠陈静', text: '一家五口最怕的就是挤。咱这台第二排能往后滑 15 公分，后备箱放下俩行李箱还有富余，全家长途也不憋屈。' },
      { speaker: '客户', text: '那还行。另外我主要上下班开，图个省钱。' },
      { speaker: '销冠陈静', text: '省钱的诉求很实在——这台百公里电费才十来块，一年省下的油钱够交保险了，保养也比油车便宜一半。' },
      { speaker: '客户', text: '嗯，不过预算有点紧，怕买亏了。' },
      { speaker: '销冠陈静', text: '理解。现在入手最划算：置换补贴最高 8000，两年零利息金融方案，月供 3000 出头，压力不大。' }
    ]
  },
  step3: {
    title: '练 · 听到需求，接上卖点',
    scene: '客户会主动说出在意什么，你的任务是每次都把对应卖点接上去',
    trainerIntro: [
      '李娜，今天咱们练<b>需求引导与卖点匹配</b>。',
      '场景是这样的：客户进店看车，会主动说出自己的<b>用车需求和在意点</b>。',
      '你的任务很简单——<b>听到什么需求，就接什么卖点</b>，别跑偏。',
      '<b>记住：</b><br>客户说省钱 → 你讲低能耗+快充<br>客户说空间 → 你讲大轴距+舒适<br>客户说露营 → 你讲外放电+大电池<br>客户比竞品 → 你讲同价位续航更高',
      '来，跟 AI 客户过几轮，把卖点接准了。'
    ],
    rounds: [
      { customer: '每天市区上下班，就想电费便宜，充电省事。', correctSP: '低能耗 + 快充、日常用车成本低', keywords: ['能耗', '快充', '成本', '省钱', '电费', '充电', '省', '百公里', '用车成本', '经济'] },
      { customer: '经常全家出门，后排经常坐老人小孩。', correctSP: '大轴距后排宽敞、乘坐舒适', keywords: ['轴距', '后排', '宽敞', '舒适', '空间', '大', '家人', '老人', '小孩', '乘坐'] },
      { customer: '偶尔近郊露营，需要车上用电做饭。', correctSP: '外放电功能、大容量电池', keywords: ['外放电', '电池', '露营', '用电', '做饭', '容量', 'V2L', '电源'] },
      { customer: '纠结海豚，想要性价比高、续航更长的车。', correctSP: '同价位续航更高、空间优于竞品', keywords: ['续航', '同价位', '空间', '竞品', '海豚', '性价比', '对比', '更长', '更大', '优于'] }
    ],
    pushMessages: {
      noSellingPoint: '那你们车到底好在哪？我没听出来。',
      wrongAngle: '你说的这个不是我关心的点。'
    }
  },
  step4: {
    score: 72,
    summary: '3 个需求你接住了 2 个——「省钱」那个你讲成了性能，客户其实要的是省钱。',
    items: [
      { topic: '人多出行', result: '接了空间', status: 'correct' },
      { topic: '图省钱', result: '接成了性能', status: 'wrong' },
      { topic: '怕不保值', result: '没接上', status: 'miss' }
    ],
    streakDays: 22,
    duration: '4 分 32 秒'
  }
};

// ====== 状态 ======
var AC_STATE = {
  chatMessages: [],
  chatRound: 0,
  chatDone: false,
  roundResults: [], // { round: 0, status: 'good'|'push'|'wrong' }
  audioPlaying: false,
  audioProgress: 0
};

function resetAcState() {
  AC_STATE.chatMessages = [];
  AC_STATE.chatRound = 0;
  AC_STATE.chatDone = false;
  AC_STATE.roundResults = [];
  AC_STATE.audioPlaying = false;
  AC_STATE.audioProgress = 0;
}

// ====== 主渲染 ======
function renderAbilityCoachPage() {
  var subPage = window.__currentSubPage__ || 'ability-s1';
  var stepKey = subPage.replace('ability-', '');
  var styles = abilityCoachStyles();

  if (stepKey === 's1') resetAcState();

  var html = '<div class="ac-phone-wrapper"><div class="ac-page">' +
    acHeader(stepKey) +
    '<div class="ac-body">';

  if (stepKey === 's1') html += renderAcStep1();
  else if (stepKey === 's2') html += renderAcStep2();
  else if (stepKey === 's3') html += renderAcStep3();
  else if (stepKey === 's4') html += renderAcStep4();
  else html += renderAcStep1();

  html += '</div></div></div>';
  return styles + html;
}

// ====== Header（返回 + 标题 + 四步进度条） ======
function acHeader(stepKey) {
  var steps = [
    { key: 's1', label: '看' },
    { key: 's2', label: '听' },
    { key: 's3', label: '练' },
    { key: 's4', label: '评' }
  ];
  var currentIdx = parseInt(stepKey.replace('s', '')) - 1;

  var dotsHtml = '';
  for (var i = 0; i < steps.length; i++) {
    var isDone = i < currentIdx;
    var isActive = i === currentIdx;
    var dotCls = isDone ? 'done' : (isActive ? 'active' : 'locked');
    var dotContent = isDone ? '✓' : '●';
    dotsHtml += '<span class="ac-step-dot ' + dotCls + '">' + dotContent + '</span>';
    if (i < steps.length - 1) {
      dotsHtml += '<span class="ac-step-line ' + (isDone ? 'done' : '') + '"></span>';
    }
  }

  var labelsHtml = steps.map(function(s, i) {
    var cls = i < currentIdx ? 'done' : (i === currentIdx ? 'active' : 'locked');
    return '<span class="ac-step-label ' + cls + '">' + s.label + '</span>';
  }).join('');

  return '<header class="ac-header">' +
    '<div class="ac-header-top">' +
      '<button class="ac-back-btn" onclick="location.hash=\'#sales-coach\'">←</button>' +
      '<span class="ac-header-title">能力提升 · ' + ABILITY_DATA.title + '</span>' +
    '</div>' +
    '<div class="ac-step-bar">' + dotsHtml + '</div>' +
    '<div class="ac-step-labels">' + labelsHtml + '</div>' +
  '</header>';
}

// ====== 步骤1 · 看 ======
function renderAcStep1() {
  var s1 = ABILITY_DATA.step1;
  var barsHtml = '';
  for (var i = 0; i < s1.dimensions.length; i++) {
    var d = s1.dimensions[i];
    var isHL = d.highlight;
    var barWidth = Math.round(d.score);
    barsHtml += '<div class="ac-bar-item' + (isHL ? ' highlight' : '') + '">' +
      '<div class="ac-bar-top">' +
        '<span class="ac-bar-name' + (isHL ? ' highlight' : '') + '">' + d.name + '</span>' +
        '<span class="ac-bar-score' + (isHL ? ' highlight' : '') + '">' + d.score + '</span>' +
        (isHL ? '<span class="ac-bar-arrow">←</span>' : '') +
      '</div>' +
      '<div class="ac-bar-track">' +
        '<div class="ac-bar-fill' + (isHL ? ' highlight' : '') + '" style="width:' + barWidth + '%"></div>' +
      '</div>' +
    '</div>';
  }

  return '<div class="ac-step-content">' +
    '<h2 class="ac-step-title">' + s1.title + '<span class="ac-parent-score">' + ABILITY_DATA.parentScore + ' 分</span></h2>' +
    '<div class="ac-bars">' + barsHtml + '</div>' +
    '<div class="ac-conclusion">' + s1.conclusion + '</div>' +
    '<button class="ac-btn ac-btn-solid ac-step-btn" onclick="goAcStep(\'s2\')">看看高手怎么接</button>' +
  '</div>';
}

// ====== 步骤2 · 听 ======
function renderAcStep2() {
  var s2 = ABILITY_DATA.step2;
  var transcriptHtml = '';
  for (var i = 0; i < s2.transcript.length; i++) {
    var t = s2.transcript[i];
    var isCoach = t.speaker.indexOf('销冠') > -1;
    var isCustomer = t.speaker.indexOf('客户') > -1;
    transcriptHtml += '<div class="ac-trans-item ' + (isCoach ? 'coach' : (isCustomer ? 'customer' : '')) + '">' +
      '<span class="ac-trans-speaker">' + t.speaker + '</span>' +
      '<p class="ac-trans-text">' + t.text + '</p>' +
    '</div>';
  }

  return '<div class="ac-step-content">' +
    '<div class="ac-audio-player">' +
      '<div class="ac-audio-label">' + s2.audioLabel + '</div>' +
      '<div class="ac-audio-controls">' +
        '<button class="ac-audio-play" id="acAudioBtn" onclick="toggleAcAudio(this,\'' + s2.audioDuration + '\')">▶</button>' +
        '<div class="ac-audio-progress-wrap"><div class="ac-audio-progress" id="acAudioBar" style="width:0%"></div></div>' +
        '<span class="ac-audio-time" id="acAudioTime">0:00 / ' + s2.audioDuration + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="ac-transcript">' + transcriptHtml + '</div>' +
    '<button class="ac-btn ac-btn-solid ac-step-btn" onclick="goAcStep(\'s3\')">学会了，我来试试</button>' +
  '</div>';
}

// ====== 步骤3 · 练 — 通用通话式对练 ======
function renderAcStep3() {
  var s3 = ABILITY_DATA.step3;
  return CallPractice.init({
    id: 'ability-call',
    label: '需求引导与卖点匹配',
    endHash: '#sales-coach',
    doneHash: '#sales-coach-ability-s4',
    doneText: '完成练习',
    mode: 'selling-point',
    trainerIntro: s3.trainerIntro.map(function(t, i) {
      return { speaker: i === 0 ? '培训大师' : '', text: t };
    }),
    rounds: s3.rounds,
    pushMessages: s3.pushMessages
  }).render();
}

// ====== 导航 ======
function goAcStep(stepKey) {
  location.hash = '#sales-coach-ability-' + stepKey;
}

// ====== 音频（模拟） ======
var AC_AUDIO_TIMER = null;
function toggleAcAudio(btn, duration) {
  if (AC_AUDIO_TIMER) {
    clearInterval(AC_AUDIO_TIMER);
    AC_AUDIO_TIMER = null;
    btn.textContent = '▶';
    return;
  }
  btn.textContent = '⏸';
  var parts = duration.split(':');
  var totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  var progress = 0;
  var bar = document.getElementById('acAudioBar');
  var timeEl = document.getElementById('acAudioTime');
  AC_AUDIO_TIMER = setInterval(function() {
    progress = Math.min(progress + 0.7, 100);
    if (bar) bar.style.width = progress + '%';
    var elapsed = Math.floor(progress / 100 * totalSec);
    var min = Math.floor(elapsed / 60), sec = elapsed % 60;
    if (timeEl) timeEl.textContent = min + ':' + (sec < 10 ? '0' : '') + sec + ' / ' + duration;
    if (progress >= 100) {
      clearInterval(AC_AUDIO_TIMER);
      AC_AUDIO_TIMER = null;
      btn.textContent = '▶';
    }
  }, 200);
}

// ====== 步骤4 · 反馈 ======
function renderAcStep4() {
  var s3 = ABILITY_DATA.step3;
  var s4 = ABILITY_DATA.step4;
  var results = CallPractice.getResults();

  // Calculate score dynamically from results
  var goodCount = 0;
  var totalRounds = s3.rounds.length;
  for (var r = 0; r < results.length; r++) {
    if (results[r].status === 'good') goodCount++;
  }
  var dynScore = Math.round(goodCount / Math.max(totalRounds, 1) * 100);

  // Build items from round results + round data
  var itemsHtml = '';
  var roundTopics = [
    '市区通勤省钱', '全家出行空间', '露营外放电', '竞品对比续航'
  ];
  var roundResultsDesc = [
    { correct: '接了低能耗+快充', wrong: '没接到省钱这个点上', miss: '没接上来' },
    { correct: '接了大轴距+舒适', wrong: '没接到空间这个点上', miss: '没接上来' },
    { correct: '接了外放电+大电池', wrong: '没接到露营用电上', miss: '没接上来' },
    { correct: '接了同价位续航更高', wrong: '没接到竞品对比上', miss: '没接上来' }
  ];
  for (var i = 0; i < totalRounds; i++) {
    var result = results[i];
    var status = result ? result.status : 'miss';
    var rd = roundResultsDesc[i];
    var desc = status === 'good' ? rd.correct : (status === 'wrong' ? rd.wrong : rd.miss);
    var icon = status === 'good' ? '✓ 对' : (status === 'wrong' ? '✗ 错' : '✗ 漏');
    var cls = status === 'good' ? 'correct' : (status === 'wrong' ? 'wrong' : 'miss');
    itemsHtml += '<div class="ac-fb-item ' + cls + '">' +
      '<span class="ac-fb-topic">' + roundTopics[i] + ' → ' + desc + '</span>' +
      '<span class="ac-fb-icon">' + icon + '</span>' +
    '</div>';
  }

  var callSeconds = CallPractice.getCallSeconds();
  var durationMin = Math.floor(callSeconds / 60);
  var durationSec = callSeconds % 60;
  var durationStr = durationMin + ' 分 ' + durationSec + ' 秒';

  return '<div class="ac-step-content ac-feedback-content">' +
    '<h2 class="ac-step-title">本次评分</h2>' +
    '<div class="ac-fb-score-wrap">' +
      '<span class="ac-fb-score">' + dynScore + '</span>' +
      '<span class="ac-fb-score-unit">分</span>' +
    '</div>' +
    '<p class="ac-fb-summary">' + goodCount + ' / ' + totalRounds + ' 个需求你接住了卖点，继续加油！</p>' +
    '<div class="ac-fb-items">' + itemsHtml + '</div>' +
    '<div class="ac-fb-meta">' +
      '<span>连续打卡 <strong>+' + s4.streakDays + '</strong></span>' +
      '<span>·</span>' +
      '<span>本次用时 <strong>' + durationStr + '</strong></span>' +
    '</div>' +
    '<button class="ac-btn ac-btn-solid ac-step-btn" onclick="resetAcState();goAcStep(\'s1\')">再练一轮</button>' +
    '<button class="ac-btn ac-btn-outline ac-step-btn" onclick="location.hash=\'#sales-coach\'">返回成交教练</button>' +
  '</div>';
}

// ====== 样式 ======
function abilityCoachStyles() {
  return '<style>' +
    ':root {' +
      '--ac-primary: #1677FF;' +
      '--ac-primary-dark: #0E5FD8;' +
      '--ac-primary-light: #EAF2FF;' +
      '--ac-red: #E24B4A;' +
      '--ac-red-light: #FEF2F2;' +
      '--ac-bg-outer: #EAF2FF;' +
      '--ac-bg-page: #F2F6FC;' +
      '--ac-bg-card: #FFFFFF;' +
      '--ac-border: #DDE4F0;' +
      '--ac-text-primary: #1E293B;' +
      '--ac-text-secondary: #94A3B8;' +
      '--ac-text-muted: #CBD5E1;' +
      '--ac-success: #10B981;' +
      '--ac-success-light: #ECFDF5;' +
    '}' +

    /* Wrapper */
    '.ac-phone-wrapper {' +
      'display: flex; justify-content: center; min-height: 100vh;' +
      'background: var(--ac-bg-outer, #EAF2FF); padding: 12px;' +
    '}' +
    '.ac-page {' +
      'width: 375px; max-width: 100%; background: var(--ac-bg-page, #F2F6FC);' +
      'border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;' +
      'min-height: 100vh;' +
    '}' +

    /* Header */
    '.ac-header {' +
      'background: var(--ac-bg-card, #FFFFFF); padding: 16px 16px 0;' +
      'border-bottom: 0.5px solid var(--ac-border, #DDE4F0);' +
    '}' +
    '.ac-header-top {' +
      'display: flex; align-items: center; margin-bottom: 14px;' +
    '}' +
    '.ac-back-btn {' +
      'background: none; border: none; font-size: 20px; color: var(--ac-text-primary, #1E293B);' +
      'cursor: pointer; padding: 4px; line-height: 1; flex-shrink: 0;' +
    '}' +
    '.ac-header-title {' +
      'flex: 1; font-size: 15px; font-weight: 600; color: var(--ac-text-primary, #1E293B);' +
      'text-align: center; padding-right: 28px;' +
    '}' +

    /* Step progress bar */
    '.ac-step-bar {' +
      'display: flex; align-items: center; justify-content: center; margin-bottom: 6px;' +
    '}' +
    '.ac-step-dot {' +
      'width: 18px; height: 18px; border-radius: 50%; display: inline-flex;' +
      'align-items: center; justify-content: center; font-size: 10px;' +
      'border: 1.5px solid var(--ac-text-muted, #CBD5E1);' +
      'color: var(--ac-text-muted, #CBD5E1); background: var(--ac-bg-card, #FFFFFF);' +
      'flex-shrink: 0; transition: all 0.2s;' +
    '}' +
    '.ac-step-dot.active {' +
      'border-color: var(--ac-primary, #1677FF); color: var(--ac-primary, #1677FF);' +
      'background: var(--ac-primary-light, #EAF2FF);' +
    '}' +
    '.ac-step-dot.done {' +
      'border-color: var(--ac-success, #10B981); color: var(--ac-success, #10B981);' +
      'background: var(--ac-success-light, #ECFDF5);' +
    '}' +
    '.ac-step-dot.locked {' +
      'border-color: var(--ac-text-muted, #CBD5E1); color: var(--ac-text-muted, #CBD5E1);' +
      'background: var(--ac-bg-card, #FFFFFF);' +
    '}' +
    '.ac-step-line {' +
      'width: 28px; height: 1.5px; background: var(--ac-text-muted, #CBD5E1); flex-shrink: 0;' +
    '}' +
    '.ac-step-line.done { background: var(--ac-success, #10B981); }' +
    '.ac-step-labels {' +
      'display: flex; justify-content: space-around; padding: 6px 16px 12px;' +
    '}' +
    '.ac-step-label {' +
      'font-size: 12px; color: var(--ac-text-muted, #CBD5E1); text-align: center;' +
    '}' +
    '.ac-step-label.active { color: var(--ac-primary, #1677FF); font-weight: 600; }' +
    '.ac-step-label.done { color: var(--ac-success, #10B981); }' +
    '.ac-step-label.locked { color: var(--ac-text-muted, #CBD5E1); }' +

    /* Body */
    '.ac-body { flex: 1; overflow-y: auto; }' +
    '.ac-step-content { padding: 20px 16px 28px; }' +

    /* Typography */
    '.ac-step-title { font-size: 16px; font-weight: 600; color: var(--ac-text-primary, #1E293B); margin: 0 0 6px; display: flex; align-items: center; gap: 10px; }' +
    '.ac-parent-score { font-size: 18px; font-weight: 700; color: var(--ac-red, #E24B4A); background: var(--ac-red-light, #FEF2F2); padding: 2px 10px; border-radius: 6px; }' +
    '.ac-step-subtitle { font-size: 12px; color: var(--ac-text-secondary, #94A3B8); margin: 0 0 16px; }' +

    /* Buttons */
    '.ac-btn {' +
      'width: 100%; padding: 10px 0; border-radius: 8px; font-size: 14px; font-weight: 500;' +
      'cursor: pointer; text-align: center; transition: opacity 0.15s;' +
    '}' +
    '.ac-btn:active { opacity: 0.75; }' +
    '.ac-btn:disabled { opacity: 0.4; cursor: not-allowed; }' +
    '.ac-btn-solid {' +
      'background: var(--ac-primary, #1677FF); color: #fff; border: none;' +
    '}' +
    '.ac-btn-outline {' +
      'background: var(--ac-bg-card, #FFFFFF); color: var(--ac-primary, #1677FF);' +
      'border: 0.5px solid var(--ac-primary, #1677FF);' +
    '}' +
    '.ac-step-btn { margin-top: 18px; }' +
    '.ac-step-btn + .ac-step-btn { margin-top: 10px; }' +

    /* === STEP 1: Bar chart === */
    '.ac-bars { display: flex; flex-direction: column; gap: 14px; margin-bottom: 14px; }' +
    '.ac-bar-item {' +
      'padding: 0;' +
    '}' +
    '.ac-bar-item.highlight {' +
      'background: var(--ac-red-light, #FEF2F2); padding: 10px 12px; border-radius: 8px;' +
      'margin: -10px -12px;' +
    '}' +
    '.ac-bar-top {' +
      'display: flex; align-items: center; gap: 8px; margin-bottom: 6px;' +
    '}' +
    '.ac-bar-name {' +
      'font-size: 13px; color: var(--ac-text-primary, #1E293B); flex: 1;' +
    '}' +
    '.ac-bar-name.highlight { font-weight: 700; color: var(--ac-red, #E24B4A); }' +
    '.ac-bar-score {' +
      'font-size: 14px; font-weight: 600; color: var(--ac-primary, #1677FF);' +
    '}' +
    '.ac-bar-score.highlight { color: var(--ac-red, #E24B4A); }' +
    '.ac-bar-arrow {' +
      'font-size: 16px; color: var(--ac-red, #E24B4A); font-weight: 700;' +
    '}' +
    '.ac-bar-track {' +
      'width: 100%; height: 8px; background: #E8ECF0; border-radius: 4px; overflow: hidden;' +
    '}' +
    '.ac-bar-fill {' +
      'height: 100%; background: var(--ac-primary, #1677FF); border-radius: 4px; transition: width 0.5s;' +
    '}' +
    '.ac-bar-fill.highlight { background: var(--ac-red, #E24B4A); }' +

    /* Conclusion card */
    '.ac-conclusion {' +
      'font-size: 13px; line-height: 1.7; color: var(--ac-primary-dark, #0E5FD8);' +
      'padding: 12px 14px; background: var(--ac-primary-light, #EAF2FF);' +
      'border-radius: 8px; margin-bottom: 4px;' +
    '}' +

    /* === STEP 2: Audio + transcript === */
    '.ac-audio-player {' +
      'background: var(--ac-bg-card, #FFFFFF);' +
      'border: 0.5px solid var(--ac-border, #DDE4F0); border-radius: 10px;' +
      'padding: 14px; margin-bottom: 14px;' +
    '}' +
    '.ac-audio-label {' +
      'font-size: 13px; font-weight: 500; color: var(--ac-text-primary, #1E293B); margin-bottom: 10px;' +
    '}' +
    '.ac-audio-controls {' +
      'display: flex; align-items: center; gap: 10px;' +
    '}' +
    '.ac-audio-play {' +
      'width: 36px; height: 36px; border-radius: 50%; border: none;' +
      'background: var(--ac-primary, #1677FF); color: #fff; font-size: 14px;' +
      'cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center;' +
    '}' +
    '.ac-audio-progress-wrap {' +
      'flex: 1; height: 4px; background: #E8ECF0; border-radius: 2px; overflow: hidden;' +
    '}' +
    '.ac-audio-progress {' +
      'height: 100%; background: var(--ac-primary, #1677FF); border-radius: 2px; transition: width 0.2s;' +
    '}' +
    '.ac-audio-time {' +
      'font-size: 11px; color: var(--ac-text-secondary, #94A3B8); white-space: nowrap;' +
    '}' +
    '.ac-transcript { display: flex; flex-direction: column; gap: 8px; }' +
    '.ac-trans-item {' +
      'padding: 10px 12px; border-radius: 8px;' +
    '}' +
    '.ac-trans-item.coach { background: #EFF6FF; }' +
    '.ac-trans-item.customer { background: #F8FAFC; }' +
    '.ac-trans-speaker {' +
      'font-size: 11px; font-weight: 600; color: var(--ac-text-secondary, #64748B);' +
    '}' +
    '.ac-trans-text {' +
      'font-size: 13px; line-height: 1.7; color: var(--ac-text-primary, #1E293B); margin: 4px 0 0;' +
    '}' +

    /* === STEP 3: Chat practice === */
    '.ac-practice-content { display: flex; flex-direction: column; min-height: calc(100vh - 200px); }' +
    '.ac-scene-hint {' +
      'font-size: 12px; color: var(--ac-text-secondary, #94A3B8);' +
      'padding: 8px 12px; background: var(--ac-bg-card, #FFFFFF);' +
      'border: 0.5px solid var(--ac-border, #DDE4F0); border-radius: 8px;' +
      'margin-bottom: 14px; text-align: center;' +
    '}' +
    '.ac-chat-area {' +
      'flex: 1; display: flex; flex-direction: column; gap: 10px;' +
      'overflow-y: auto; margin-bottom: 14px; min-height: 200px;' +
    '}' +
    '.ac-chat-msg {' +
      'display: flex; flex-direction: column; max-width: 85%;' +
    '}' +
    '.ac-chat-msg.customer { align-self: flex-start; }' +
    '.ac-chat-msg.user { align-self: flex-end; }' +
    '.ac-chat-msg.push .ac-chat-bubble { border-left: 2px solid var(--ac-red, #E24B4A); }' +
    '.ac-chat-msg.wrong .ac-chat-bubble { border-left: 2px solid #F59E0B; }' +
    '.ac-chat-from {' +
      'font-size: 10px; color: var(--ac-text-secondary, #94A3B8); margin-bottom: 2px; padding: 0 4px;' +
    '}' +
    '.ac-chat-msg.user .ac-chat-from { text-align: right; }' +
    '.ac-chat-bubble {' +
      'font-size: 13px; line-height: 1.6; padding: 10px 12px; border-radius: 10px;' +
    '}' +
    '.ac-chat-msg.customer .ac-chat-bubble {' +
      'background: var(--ac-bg-card, #FFFFFF); color: var(--ac-text-primary, #1E293B);' +
      'border: 0.5px solid var(--ac-border, #DDE4F0); border-bottom-left-radius: 2px;' +
    '}' +
    '.ac-chat-msg.user .ac-chat-bubble {' +
      'background: var(--ac-primary, #1677FF); color: #fff; border-bottom-right-radius: 2px;' +
    '}' +
    '.ac-chat-input-area {' +
      'border-top: 0.5px solid var(--ac-border, #DDE4F0); padding-top: 10px;' +
    '}' +
    '.ac-chat-input {' +
      'width: 100%; border: 0.5px solid var(--ac-border, #DDE4F0); border-radius: 8px;' +
      'padding: 8px 10px; font-size: 13px; resize: none; font-family: inherit;' +
      'background: var(--ac-bg-card, #FFFFFF); color: var(--ac-text-primary, #1E293B);' +
    '}' +
    '.ac-chat-input:focus { outline: none; border-color: var(--ac-primary, #1677FF); }' +
    '.ac-chat-actions { display: flex; gap: 8px; margin-top: 8px; }' +
    '.ac-voice-btn {' +
      'flex: 1; padding: 10px; border: 0.5px solid var(--ac-primary, #1677FF);' +
      'border-radius: 8px; background: var(--ac-bg-card, #FFFFFF);' +
      'color: var(--ac-primary, #1677FF); font-size: 13px; cursor: pointer; text-align: center;' +
    '}' +
    '.ac-voice-btn:active { background: var(--ac-primary-light, #EAF2FF); }' +
    '.ac-send-btn {' +
      'padding: 10px 16px; background: var(--ac-primary, #1677FF); color: #fff;' +
      'border: none; border-radius: 8px; font-size: 13px; cursor: pointer;' +
    '}' +
    '.ac-chat-done-hint {' +
      'text-align: center; font-size: 13px; color: var(--ac-success, #10B981);' +
      'margin: 10px 0; font-weight: 500;' +
    '}' +
    '.ac-end-practice-btn {' +
      'display: block; margin: 0 auto 8px; background: none;' +
      'border: 0.5px solid var(--ac-primary, #1677FF); color: var(--ac-primary, #1677FF);' +
      'padding: 6px 14px; border-radius: 6px; font-size: 12px; cursor: pointer;' +
    '}' +

    /* === STEP 4: Feedback === */
    '.ac-feedback-content { text-align: center; }' +
    '.ac-feedback-content .ac-step-title { text-align: center; }' +
    '.ac-fb-score-wrap {' +
      'display: flex; align-items: baseline; justify-content: center; gap: 4px;' +
      'margin: 20px 0 12px;' +
    '}' +
    '.ac-fb-score {' +
      'font-size: 56px; font-weight: 800; color: var(--ac-primary, #1677FF); line-height: 1;' +
    '}' +
    '.ac-fb-score-unit {' +
      'font-size: 18px; color: var(--ac-text-secondary, #94A3B8);' +
    '}' +
    '.ac-fb-summary {' +
      'font-size: 14px; line-height: 1.7; color: var(--ac-text-primary, #1E293B);' +
      'margin: 0 auto 18px; max-width: 300px;' +
    '}' +
    '.ac-fb-items {' +
      'display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;' +
      'text-align: left;' +
    '}' +
    '.ac-fb-item {' +
      'display: flex; justify-content: space-between; align-items: center;' +
      'padding: 10px 12px; border-radius: 8px; font-size: 13px;' +
      'border: 0.5px solid var(--ac-border, #DDE4F0); background: var(--ac-bg-card, #FFFFFF);' +
    '}' +
    '.ac-fb-item.correct { border-color: #A7F3D0; background: var(--ac-success-light, #ECFDF5); }' +
    '.ac-fb-item.wrong { border-color: #FECACA; background: var(--ac-red-light, #FEF2F2); }' +
    '.ac-fb-item.miss { border-color: #FED7AA; background: #FFF7ED; }' +
    '.ac-fb-topic { color: var(--ac-text-primary, #1E293B); }' +
    '.ac-fb-icon { font-weight: 600; font-size: 12px; }' +
    '.ac-fb-item.correct .ac-fb-icon { color: var(--ac-success, #10B981); }' +
    '.ac-fb-item.wrong .ac-fb-icon { color: var(--ac-red, #E24B4A); }' +
    '.ac-fb-item.miss .ac-fb-icon { color: #D97706; }' +
    '.ac-fb-meta {' +
      'font-size: 12px; color: var(--ac-text-secondary, #94A3B8);' +
      'margin-bottom: 14px; display: flex; justify-content: center; gap: 8px;' +
    '}' +
    '.ac-fb-meta strong { color: var(--ac-text-primary, #1E293B); font-weight: 600; }' +
    '.ac-fb-sync {' +
      'font-size: 11px; color: var(--ac-text-secondary, #94A3B8);' +
      'margin-top: 16px;' +
    '}' +

    /* === DARK MODE === */
    '@media (prefers-color-scheme: dark) {' +
      '.ac-phone-wrapper { --ac-bg-outer: #0F172A; }' +
      '.ac-page { --ac-bg-page: #111827; --ac-bg-card: #1A2332; --ac-border: #2A3A5C;' +
        '--ac-text-primary: #E2E8F0; --ac-text-secondary: #94A3B8; --ac-text-muted: #4B5563;' +
        '--ac-primary: #3B8CFF; --ac-primary-dark: #60A5FA; --ac-primary-light: #1E3A5F;' +
        '--ac-red: #F87171; --ac-red-light: #3B1A1A;' +
        '--ac-success: #34D399; --ac-success-light: #0A2E1F;' +
      '}' +
      '.ac-btn-solid { background: var(--ac-primary, #3B8CFF); }' +
      '.ac-btn-outline { background: var(--ac-bg-card, #1A2332); color: var(--ac-primary, #3B8CFF); border-color: var(--ac-primary, #3B8CFF); }' +
      '.ac-trans-item.coach { background: #1E3A5F; }' +
      '.ac-trans-item.customer { background: #1E293B; }' +
      '.ac-chat-msg.customer .ac-chat-bubble { background: #1A2332; border-color: #2A3A5C; }' +
      '.ac-bar-track { background: #2A3A5C; }' +
      '.ac-audio-progress-wrap { background: #2A3A5C; }' +
      '.ac-fb-item { background: #1A2332; border-color: #2A3A5C; }' +
      '.ac-fb-item.correct { background: #0A2E1F; border-color: #065F46; }' +
      '.ac-fb-item.wrong { background: #3B1A1A; border-color: #7F1D1D; }' +
      '.ac-fb-item.miss { background: #2D1A0A; border-color: #78350F; }' +
      '.ac-bar-item.highlight { background: var(--ac-red-light, #3B1A1A); }' +
      '.ac-conclusion { background: var(--ac-primary-light, #1E3A5F); color: var(--ac-primary-dark, #60A5FA); }' +
      '.ac-scene-hint { background: #1A2332; border-color: #2A3A5C; }' +
      '.ac-audio-player { background: #1A2332; border-color: #2A3A5C; }' +
    '}' +
  '</style>';
}

// ====== 包装 sales-coach 路由器 ======
(function() {
  var _origRender = Router.pages['sales-coach'];
  Router.register('sales-coach', function() {
    var subPage = window.__currentSubPage__ || 'home';
    if (subPage.startsWith('ability-')) {
      return renderAbilityCoachPage();
    }
    return _origRender();
  });
})();
