/**
 * Practice Overlay — 共享练习覆盖层
 *
 * 倒计时 3-2-1 → 沉浸式对练（说话 → 点评 → 自动推进）→ 小组小结 → 完成页
 *
 * 用法:
 *   // 1. 页面加载时初始化
 *   PracticeOverlay.init({
 *     finishTitle: '今天练得很棒！',
 *     finishSub:   '保持这个手感，<br>明天进店就能用得上',
 *     continueLabel: '继续练 5 组',
 *     onExit:     function() { ... },
 *     onContinue: function() { ... }
 *   });
 *
 *   // 2. 用户点击练习按钮时启动
 *   PracticeOverlay.start(groups);
 *
 * groups 数据格式:
 *   [{
 *     type: 'real' | 'sim',
 *     name: '...', shortName: '...',
 *     context: '...',
 *     rounds: [{ customer, coach, reference }, ...],
 *     summary: '...'
 *   }]
 */

(function () {
  'use strict';

  // ===================================================================
  //  CSS — 注入 <style>
  // ===================================================================
  var CSS = [
    '/* ===== 倒计时覆盖层 ===== */',
    '.po-countdown {',
    '  position:fixed;inset:0;z-index:35;',
    '  background:linear-gradient(170deg,#040b18 0%,#08162e 40%,#0d1f44 100%);',
    '  display:flex;flex-direction:column;align-items:center;justify-content:center;',
    '  opacity:0;pointer-events:none;transition:opacity .35s ease;overflow:hidden;',
    '}',
    '.po-countdown.show { opacity:1;pointer-events:auto; }',
    '.po-countdown::before {',
    '  content:"";position:absolute;top:50%;left:50%;width:300px;height:300px;',
    '  transform:translate(-50%,-50%);',
    '  background:radial-gradient(circle,rgba(59,130,246,.12) 0%,rgba(59,130,246,.03) 40%,transparent 70%);',
    '  pointer-events:none;',
    '}',
    '.po-countdown::after {',
    '  content:"";position:absolute;top:30%;right:20%;width:180px;height:180px;',
    '  background:radial-gradient(circle,rgba(245,166,35,.06) 0%,transparent 70%);pointer-events:none;',
    '}',
    '.po-cd-master { position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;margin-bottom:48px; }',
    '.po-cd-crown { width:44px;height:44px;display:grid;place-items:center;margin-bottom:8px; }',
    '.po-cd-crown svg { width:32px;height:32px; }',
    '.po-cd-label { font-size:14px;font-weight:600;color:rgba(255,255,255,.7);letter-spacing:2px; }',
    '.po-cd-sub { font-size:11px;color:rgba(255,255,255,.35);margin-top:4px; }',
    '.po-cd-num {',
    '  position:relative;z-index:1;font-size:120px;font-weight:800;color:#fff;line-height:1;',
    '  text-shadow:0 0 60px rgba(59,130,246,.5),0 0 120px rgba(59,130,246,.2);',
    '  transition:transform .1s ease,opacity .1s ease;',
    '}',
    '.po-cd-num.pop { animation:poCountPop .55s cubic-bezier(0.22,0.61,0.36,1); }',
    '.po-cd-num.go {',
    '  font-size:64px;',
    '  background:linear-gradient(135deg,#fbbf24,#f59e0b);',
    '  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;',
    '  text-shadow:none;animation:poGoShine .6s ease;',
    '}',
    '@keyframes poCountPop {',
    '  0%{transform:scale(.3);opacity:.2} 50%{transform:scale(1.15);opacity:1} 100%{transform:scale(1);opacity:1}',
    '}',
    '@keyframes poGoShine {',
    '  0%{transform:scale(.2);opacity:0} 60%{transform:scale(1.2);opacity:1} 100%{transform:scale(1);opacity:1}',
    '}',
    '.po-cd-ring {',
    '  position:absolute;top:50%;left:50%;width:200px;height:200px;',
    '  transform:translate(-50%,-50%);border-radius:50%;',
    '  border:1px solid rgba(255,255,255,.08);pointer-events:none;',
    '}',
    '.po-cd-ring.pulse { animation:poRingPulse 1s ease-out; }',
    '@keyframes poRingPulse {',
    '  0%{width:180px;height:180px;opacity:.6;border-color:rgba(59,130,246,.3)}',
    '  100%{width:320px;height:320px;opacity:0;border-color:transparent}',
    '}',

    '/* ===== 练习覆盖层 ===== */',
    '.po-practice {',
    '  position:fixed;inset:0;z-index:30;',
    '  background:linear-gradient(170deg,#060d1a 0%,#0a1628 35%,#0f1f3d 100%);',
    '  display:flex;flex-direction:column;',
    '  opacity:0;pointer-events:none;transition:opacity .35s ease;',
    '}',
    '.po-practice.show { opacity:1;pointer-events:auto; }',
    '.po-practice::before {',
    '  content:"";position:absolute;top:-80px;right:-60px;width:260px;height:260px;',
    '  background:radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 70%);pointer-events:none;',
    '}',
    '.po-practice::after {',
    '  content:"";position:absolute;bottom:10%;left:-40px;width:200px;height:200px;',
    '  background:radial-gradient(circle,rgba(245,166,35,.04) 0%,transparent 70%);pointer-events:none;',
    '}',

    '/* 顶栏 */',
    '.po-topbar {',
    '  position:relative;z-index:2;display:flex;align-items:center;',
    '  padding:12px 14px 10px;gap:6px;',
    '  background:rgba(6,13,26,.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);',
    '}',
    '.po-back {',
    '  width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center;',
    '  color:rgba(255,255,255,.5);font-size:22px;border-radius:50%;',
    '  transition:background .15s,color .15s;cursor:pointer;',
    '}',
    '.po-back:active { background:rgba(255,255,255,.08);color:#fff; }',

    '/* 进度步骤条 */',
    '.po-stepper { flex:1;display:flex;align-items:flex-start;justify-content:center;gap:0;padding:0 4px; }',
    '.po-step-wrap { display:flex;flex-direction:column;align-items:center;flex:0 0 auto; }',
    '.po-step-dot {',
    '  width:22px;height:22px;display:grid;place-items:center;',
    '  border-radius:50%;font-size:10px;font-weight:700;',
    '  background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.1);',
    '  color:rgba(255,255,255,.25);transition:all .3s ease;flex:0 0 auto;',
    '}',
    '.po-step-dot.done { background:rgba(16,185,129,.25);border-color:rgba(16,185,129,.5);color:#10b981; }',
    '.po-step-dot.current {',
    '  background:#3b82f6;border-color:#3b82f6;color:#fff;',
    '  box-shadow:0 0 12px rgba(59,130,246,.35);animation:poDotPulse 2s ease-in-out infinite;',
    '}',
    '@keyframes poDotPulse {',
    '  0%,100%{box-shadow:0 0 8px rgba(59,130,246,.35)}',
    '  50%{box-shadow:0 0 18px rgba(59,130,246,.55)}',
    '}',
    '.po-step-label { font-size:9px;color:rgba(255,255,255,.25);margin-top:4px;white-space:nowrap;transition:color .3s ease;text-align:center;line-height:1.2; }',
    '.po-step-label.current { color:rgba(255,255,255,.75);font-weight:600; }',
    '.po-step-label.done { color:rgba(255,255,255,.4); }',
    '.po-step-line { width:18px;height:1px;background:rgba(255,255,255,.08);margin:11px 2px 0;flex:0 0 auto;transition:background .3s ease; }',
    '.po-step-line.done { background:rgba(16,185,129,.35); }',
    '.po-stepper-spacer { width:32px;flex:0 0 auto; }',

    '/* 练习主体 */',
    '.po-body {',
    '  position:relative;z-index:1;flex:1;display:flex;flex-direction:column;',
    '  padding:0 20px;overflow-y:auto;overscroll-behavior:contain;',
    '}',
    '.po-body::-webkit-scrollbar { display:none; }',

    '/* 场景上下文条 */',
    '.po-ctx {',
    '  flex:0 0 auto;margin:0 -20px;padding:8px 20px;',
    '  background:rgba(255,255,255,.04);border-bottom:0.5px solid rgba(255,255,255,.05);',
    '  font-size:12px;color:rgba(255,255,255,.35);line-height:1.5;',
    '  position:sticky;top:0;z-index:2;',
    '  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
    '}',
    '.po-ctx-icon { display:inline-block;margin-right:4px;font-size:11px; }',

    '/* 客户聊天气泡 */',
    '.po-chat {',
    '  flex:0 0 auto;padding:24px 0 0;',
    '  animation:poChatIn .45s cubic-bezier(0.22,0.61,0.36,1);',
    '}',
    '@keyframes poChatIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }',
    '.po-chat-label { font-size:10px;color:rgba(255,255,255,.3);margin-bottom:6px;margin-left:46px;letter-spacing:1px; }',
    '.po-chat-row { display:flex;align-items:flex-end;gap:8px; }',
    '.po-chat-avatar {',
    '  width:34px;height:34px;flex:0 0 auto;border-radius:50%;',
    '  background:linear-gradient(135deg,#374151,#4b5563);',
    '  border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;',
    '  overflow:hidden;flex-shrink:0;',
    '}',
    '.po-chat-avatar svg { width:20px;height:20px;color:rgba(255,255,255,.7); }',
    '.po-chat-avatar.real { background:linear-gradient(135deg,#596b7f,#6d8299); }',
    '.po-chat-avatar.sim  { background:linear-gradient(135deg,#3d4a5c,#4e5d6e); }',
    '.po-chat-bubble {',
    '  flex:0 1 auto;max-width:75%;',
    '  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);',
    '  border-radius:6px 14px 14px 14px;padding:14px 16px;',
    '  font-size:15px;color:#e2e8f0;line-height:1.7;letter-spacing:.3px;position:relative;',
    '}',
    '.po-chat-bubble::after {',
    '  content:"";position:absolute;left:-6px;bottom:10px;width:10px;height:8px;',
    '  background:rgba(255,255,255,.07);clip-path:polygon(100% 0,0 50%,100% 100%);',
    '  border-left:1px solid rgba(255,255,255,.08);',
    '}',
    '.po-chat.dim { opacity:.5; }',

    '/* 回合指示器 */',
    '.po-round {',
    '  flex:0 0 auto;display:flex;align-items:center;justify-content:center;',
    '  gap:10px;padding:14px 0 6px;',
    '}',
    '.po-round-label {',
    '  font-size:12px;color:rgba(255,255,255,.35);font-weight:500;',
    '  letter-spacing:.5px;min-width:52px;text-align:right;',
    '}',
    '.po-round-dots { display:flex;align-items:center;gap:6px; }',
    '.po-round-dot {',
    '  width:8px;height:8px;border-radius:50%;',
    '  background:rgba(255,255,255,.1);transition:all .3s ease;',
    '}',
    '.po-round-dot.active { background:#3b82f6;box-shadow:0 0 8px rgba(59,130,246,.35); }',
    '.po-round-dot.done { background:rgba(16,185,129,.5); }',

    '/* 教练点评卡 */',
    '.po-review {',
    '  flex:0 0 auto;margin-top:14px;',
    '  padding:14px 16px;',
    '  background:rgba(245,166,35,.05);border:1px solid rgba(245,166,35,.18);',
    '  border-radius:12px;',
    '  animation:poSlideIn .4s cubic-bezier(0.22,0.61,0.36,1) both;',
    '}',
    '@keyframes poSlideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }',
    '.po-review-badge {',
    '  display:inline-flex;align-items:center;gap:6px;',
    '  font-size:11px;color:rgba(245,166,35,.8);font-weight:600;',
    '  margin-bottom:8px;letter-spacing:1px;',
    '}',
    '.po-review-badge svg { width:13px;height:13px;flex-shrink:0; }',
    '.po-review-text { font-size:13.5px;color:rgba(255,255,255,.75);line-height:1.75; }',

    '/* 销冠话术卡 */',
    '.po-script {',
    '  flex:0 0 auto;margin-top:10px;',
    '  padding:14px 16px;',
    '  background:rgba(16,185,129,.04);border:1px solid rgba(16,185,129,.15);',
    '  border-radius:12px;',
    '  animation:poSlideIn .4s .08s cubic-bezier(0.22,0.61,0.36,1) both;',
    '}',
    '.po-script-badge {',
    '  display:inline-flex;align-items:center;gap:6px;',
    '  font-size:11px;color:rgba(16,185,129,.8);font-weight:600;',
    '  margin-bottom:8px;letter-spacing:1px;',
    '}',
    '.po-script-badge svg { width:13px;height:13px;flex-shrink:0; }',
    '.po-script-quote {',
    '  font-size:13.5px;color:rgba(255,255,255,.8);line-height:1.75;',
    '  padding:10px 14px;',
    '  background:rgba(255,255,255,.03);border-radius:8px;',
    '  border-left:2px solid rgba(16,185,129,.3);',
    '}',

    '/* 为什么要这么做 */',
    '.po-why {',
    '  flex:0 0 auto;margin-top:8px;',
    '  padding:12px 16px;',
    '  background:rgba(59,130,246,.04);border:1px solid rgba(59,130,246,.12);',
    '  border-radius:12px;',
    '  animation:poSlideIn .4s .16s cubic-bezier(0.22,0.61,0.36,1) both;',
    '}',
    '.po-why-badge {',
    '  display:inline-flex;align-items:center;gap:6px;',
    '  font-size:11px;color:rgba(96,165,250,.75);font-weight:600;',
    '  margin-bottom:6px;letter-spacing:1px;',
    '}',
    '.po-why-badge svg { width:13px;height:13px;flex-shrink:0; }',
    '.po-why-text { font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.7; }',

    '/* 下一回合按钮 + 自动推进提示 */',
    '.po-next-row {',
    '  flex:0 0 auto;margin-top:14px;',
    '  width:100%;min-height:44px;display:flex;align-items:center;justify-content:center;',
    '  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);',
    '  color:rgba(255,255,255,.6);border-radius:12px;font-size:14px;font-weight:500;',
    '  transition:background .15s,color .15s,border-color .15s;',
    '  animation:poSlideIn .4s .15s cubic-bezier(0.22,0.61,0.36,1) both;',
    '  cursor:pointer;',
    '}',
    '.po-next-row:active { background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.2); }',
    '.po-next-row.finish { background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.2);color:rgba(16,185,129,.8); }',
    '.po-next-row.finish:active { background:rgba(16,185,129,.18);color:#10b981; }',
    '.po-auto-hint {',
    '  text-align:center;font-size:11px;color:rgba(255,255,255,.15);',
    '  margin-top:10px;',
    '  animation:poSlideIn .4s .2s cubic-bezier(0.22,0.61,0.36,1) both;',
    '}',

    '/* 底部点击区（说话阶段） */',
    '.po-tap-zone {',
    '  flex:1;display:flex;flex-direction:column;',
    '  align-items:center;justify-content:flex-end;',
    '  padding-bottom:44px;min-height:160px;',
    '}',
    '.po-tap-wrap {',
    '  position:relative;width:104px;height:104px;cursor:pointer;',
    '  -webkit-tap-highlight-color:transparent;',
    '}',
    '.po-tap-wrap::before {',
    '  content:"";position:absolute;inset:-10px;border-radius:50%;',
    '  border:1.5px solid rgba(255,255,255,.06);',
    '  animation:poBreathe 2.8s ease-in-out infinite;',
    '  pointer-events:none;',
    '}',
    '@keyframes poBreathe {',
    '  0%,100%{transform:scale(1);opacity:.35}',
    '  50%{transform:scale(1.13);opacity:.08}',
    '}',
    '.po-tap-circle {',
    '  width:104px;height:104px;position:relative;z-index:1;',
    '  border-radius:50%;background:#0a1424;',
    '  border:1.5px solid rgba(255,255,255,.08);',
    '  display:grid;place-items:center;',
    '  transition:transform .15s,background .35s,border-color .35s,box-shadow .35s;',
    '  box-shadow:0 0 40px rgba(0,0,0,.3);',
    '}',
    '.po-tap-circle:active { transform:scale(.94); }',
    '.po-tap-inner {',
    '  width:40px;height:40px;border-radius:50%;',
    '  background:rgba(255,255,255,.03);',
    '  display:grid;place-items:center;',
    '  transition:all .35s;',
    '}',
    '.po-tap-icon { color:rgba(255,255,255,.2);transition:color .35s,transform .35s; }',
    '.po-tap-icon svg { width:18px;height:18px; }',
    '.po-tap-circle.done {',
    '  background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.35);',
    '  box-shadow:0 0 48px rgba(16,185,129,.15);',
    '}',
    '.po-tap-circle.done .po-tap-inner { background:rgba(16,185,129,.15); }',
    '.po-tap-circle.done .po-tap-icon { color:#10b981;transform:scale(1.2); }',
    '.po-tap-hint { font-size:13px;color:rgba(255,255,255,.35);margin-top:18px;text-align:center;transition:color .3s; }',
    '.po-tap-hint.done { color:rgba(16,185,129,.6); }',

    '/* 小组小结卡 */',
    '.po-summary {',
    '  flex:0 0 auto;margin-top:20px;',
    '  padding:24px 20px;',
    '  background:rgba(245,166,35,.06);border:1px solid rgba(245,166,35,.15);',
    '  border-radius:16px;',
    '  animation:poSummaryPop .5s cubic-bezier(0.22,0.61,0.36,1) both;',
    '  text-align:center;',
    '}',
    '@keyframes poSummaryPop {',
    '  from{opacity:0;transform:scale(.95) translateY(10px)}',
    '  to{opacity:1;transform:scale(1) translateY(0)}',
    '}',
    '.po-summary-check {',
    '  width:48px;height:48px;margin:0 auto 16px;',
    '  display:grid;place-items:center;',
    '  background:linear-gradient(135deg,#f59e0b,#d97706);',
    '  border-radius:50%;font-size:24px;color:#fff;',
    '  box-shadow:0 0 32px rgba(245,158,11,.2);',
    '}',
    '.po-summary-title {',
    '  font-size:14px;color:rgba(255,255,255,.55);font-weight:500;',
    '  margin-bottom:12px;',
    '}',
    '.po-summary-text {',
    '  font-size:15px;color:rgba(255,255,255,.8);line-height:2.0;',
    '  text-align:left;',
    '}',
    '.po-summary-text p + p { margin-top:8px; }',
    '.po-btn-finish {',
    '  width:100%;min-height:46px;display:flex;align-items:center;justify-content:center;',
    '  background:linear-gradient(135deg,#f59e0b,#d97706);',
    '  color:#fff;border-radius:12px;font-size:15px;font-weight:600;',
    '  box-shadow:0 4px 18px rgba(245,158,11,.25);',
    '  transition:background .15s,transform .12s;',
    '  margin-top:16px;flex:0 0 auto;cursor:pointer;',
    '}',
    '.po-btn-finish:active { transform:scale(.98); }',

    '/* 完成页 */',
    '.po-finish {',
    '  display:none;flex:1;flex-direction:column;',
    '  align-items:center;justify-content:center;',
    '  text-align:center;padding:30px;animation:poFadeIn .3s ease;position:relative;z-index:1;',
    '}',
    '.po-finish.active { display:flex; }',
    '@keyframes poFadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }',
    '.po-finish-crown {',
    '  width:64px;height:64px;display:grid;place-items:center;margin-bottom:16px;',
    '}',
    '.po-finish-crown svg { width:44px;height:44px; }',
    '.po-finish-count {',
    '  font-size:15px;color:rgba(255,255,255,.55);margin-bottom:4px;',
    '}',
    '.po-finish-count strong { color:#fff;font-size:20px; }',
    '.po-finish-title {',
    '  font-size:17px;color:rgba(255,255,255,.8);line-height:1.7;font-weight:600;margin-bottom:6px;',
    '}',
    '.po-finish-sub {',
    '  font-size:13px;color:rgba(255,255,255,.4);',
    '  margin-bottom:32px;line-height:1.5;',
    '}',
    '.po-finish-actions { display:flex;gap:12px;width:100%;max-width:280px; }',
    '.po-finish-actions button { flex:1;min-height:46px;border-radius:12px;font-size:14px;font-weight:600; }',
    '.po-btn-ghost {',
    '  border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.55);',
    '  background:transparent;transition:background .15s,color .15s,border-color .15s;',
    '  cursor:pointer;',
    '}',
    '.po-btn-ghost:active { background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.25); }',
    '.po-btn-gold {',
    '  background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;',
    '  box-shadow:0 4px 16px rgba(245,158,11,.3);',
    '  transition:background .15s,transform .12s,box-shadow .15s;',
    '  cursor:pointer;',
    '}',
    '.po-btn-gold:active { transform:scale(.98);box-shadow:0 2px 8px rgba(245,158,11,.2); }',

    '/* Toast */',
    '.po-toast {',
    '  position:fixed;z-index:40;left:50%;bottom:100px;',
    '  max-width:82%;padding:10px 16px;color:#fff;',
    '  background:rgba(14,24,41,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
    '  border-radius:22px;font-size:13px;font-weight:500;text-align:center;',
    '  font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;',
    '  opacity:0;pointer-events:none;transform:translate(-50%,12px);',
    '  transition:opacity .25s ease,transform .25s cubic-bezier(0.34,1.56,0.64,1);',
    '}',
    '.po-toast.show { opacity:1;transform:translate(-50%,0); }',

    '/* 响应式 */',
    '@media (max-width:430px) {',
    '  .po-countdown,.po-practice { position:fixed; }',
    '}'
  ].join('\n');

  // ===================================================================
  //  HTML 模板
  // ===================================================================
  var COUNTDOWN_HTML = [
    '<div class="po-countdown" id="poCountdown">',
    '  <div class="po-cd-ring" id="poCdRing"></div>',
    '  <div class="po-cd-master">',
    '    <div class="po-cd-crown">',
    '      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(245,166,35,.7)" stroke-width="1.5">',
    '        <path d="M2 17l2-9 4 4 4-8 4 8 4-4 2 9H2z" stroke-linejoin="round"/>',
    '        <circle cx="12" cy="17" r="2" fill="rgba(245,166,35,.5)" stroke="none"/>',
    '      </svg>',
    '    </div>',
    '    <div class="po-cd-label">零售大师</div>',
    '    <div class="po-cd-sub">实战练习</div>',
    '  </div>',
    '  <div class="po-cd-num" id="poCdNum">3</div>',
    '</div>'
  ].join('\n');

  var PRACTICE_HTML = [
    '<div class="po-practice" id="poPractice">',
    '  <div class="po-topbar">',
    '    <button class="po-back" id="poBack" aria-label="退出练习">‹</button>',
    '    <div class="po-stepper" id="poStepper"></div>',
    '    <div class="po-stepper-spacer"></div>',
    '  </div>',
    '  <div class="po-body" id="poBody"></div>',
    '  <div class="po-finish" id="poFinish"></div>',
    '</div>',
    '<div class="po-toast" id="poToast" role="status" aria-live="polite"></div>'
  ].join('\n');

  // ===================================================================
  //  SVG 素材
  // ===================================================================
  var CROWN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 17l2-9 4 4 4-8 4 8 4-4 2 9H2z" stroke-linejoin="round"/><circle cx="12" cy="17" r="2" fill="currentColor" stroke="none"/></svg>';
  var MIC_SVG   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="1" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>';
  var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var NEXT_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  var CHAT_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var HELP_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

  function avatarSVG() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>';
  }

  // ===================================================================
  //  Helper — 拆分 reference
  // ===================================================================
  function parseReference(ref) {
    var marker = '<br><br><strong>为什么这样接——</strong>';
    var idx = ref.indexOf(marker);
    if (idx === -1) return { script: ref, why: '' };
    return {
      script: ref.substring(0, idx),
      why:    ref.substring(idx + marker.length)
    };
  }

  // ===================================================================
  //  State
  // ===================================================================
  var groups        = [];
  var groupIdx      = 0;    // 当前第几组
  var roundIdx      = 0;    // 当前第几回合 (0/1/2)
  var phase         = 'speaking'; // 'speaking' | 'review' | 'summary'
  var locked        = false;
  var autoTimer     = null;
  var opts          = {};   // init 时传入的选项

  // ===================================================================
  //  DOM refs (lazy)
  // ===================================================================
  var els = {};

  function $(id) {
    if (!els[id]) els[id] = document.getElementById(id);
    return els[id];
  }

  // ===================================================================
  //  Toast
  // ===================================================================
  var toastTimer;
  function toast(msg) {
    var t = $('poToast');
    if (!t) return;
    clearTimeout(toastTimer);
    t.textContent = msg;
    t.classList.add('show');
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // ===================================================================
  //  Countdown 3-2-1
  // ===================================================================
  function runCountdown(cb) {
    var overlay = $('poCountdown');
    var numEl   = $('poCdNum');
    var ringEl  = $('poCdRing');
    overlay.classList.add('show');
    var steps = [
      { num: '3', cls: '' }, { num: '2', cls: '' }, { num: '1', cls: '' }, { num: '开始', cls: 'go' }
    ];
    var i = 0;
    function tick() {
      if (i >= steps.length) {
        setTimeout(function () { overlay.classList.remove('show'); cb(); }, 200);
        return;
      }
      var s = steps[i];
      numEl.textContent = s.num;
      numEl.className = 'po-cd-num pop';
      ringEl.classList.remove('pulse');
      void ringEl.offsetWidth;
      ringEl.classList.add('pulse');
      if (s.cls) numEl.classList.add(s.cls);
      i++;
      setTimeout(tick, i === steps.length ? 600 : 750);
    }
    tick();
  }

  // ===================================================================
  //  Stepper
  // ===================================================================
  function buildStepper() {
    var h = '';
    groups.forEach(function (g, i) {
      if (i > 0) h += '<span class="po-step-line" id="poStepLine' + i + '"></span>';
      h += '<span class="po-step-wrap"><span class="po-step-dot" id="poStepDot' + i + '">' + (i + 1) + '</span><span class="po-step-label" id="poStepLabel' + i + '">' + g.shortName + '</span></span>';
    });
    $('poStepper').innerHTML = h;
  }

  function updateStepper() {
    groups.forEach(function (g, i) {
      var dot   = document.getElementById('poStepDot' + i);
      var label = document.getElementById('poStepLabel' + i);
      var line  = document.getElementById('poStepLine' + i);
      if (!dot) return;
      dot.classList.remove('done', 'current');
      if (label) label.classList.remove('done', 'current');
      if (i < groupIdx) {
        dot.classList.add('done'); dot.textContent = '✓';
        if (label) label.classList.add('done');
        if (line) line.classList.add('done');
      } else if (i === groupIdx) {
        dot.classList.add('current'); dot.textContent = i + 1;
        if (label) label.classList.add('current');
        if (line) line.classList.remove('done');
      } else {
        dot.textContent = i + 1;
        if (line) line.classList.remove('done');
      }
    });
  }

  // ===================================================================
  //  回合圆点
  // ===================================================================
  function renderRoundDots(cur, total) {
    var d = '';
    for (var i = 0; i < total; i++) {
      var cls = '';
      if (i < cur) cls = 'done';
      else if (i === cur) cls = 'active';
      d += '<span class="po-round-dot ' + cls + '"></span>';
    }
    return d;
  }

  // ===================================================================
  //  清除自动推进
  // ===================================================================
  function clearAuto() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  }

  // ===================================================================
  //  渲染主内容
  // ===================================================================
  function render() {
    clearAuto();
    locked = false;
    var g = groups[groupIdx];
    updateStepper();

    if (phase === 'summary') {
      renderSummary(g);
      return;
    }

    var round     = g.rounds[roundIdx];
    var total     = g.rounds.length;
    var isLast    = roundIdx >= total - 1;
    var body      = $('poBody');

    // 回合指示器
    var roundInd  = '<div class="po-round"><span class="po-round-label">回合 ' + (roundIdx + 1) + '/' + total + '</span><div class="po-round-dots">' + renderRoundDots(roundIdx, total) + '</div></div>';

    // 客户聊天气泡
    var clientLabel = g.type === 'real' ? '真实客户 · 接待原音' : '模拟场景';
    var avatarCls   = g.type === 'real' ? 'real' : 'sim';
    var chatHTML    = '<div class="po-chat"><div class="po-chat-label">' + clientLabel + '</div><div class="po-chat-row"><div class="po-chat-avatar ' + avatarCls + '">' + avatarSVG() + '</div><div class="po-chat-bubble">' + round.customer + '</div></div></div>';

    if (phase === 'speaking') {
      body.innerHTML =
        '<div class="po-ctx"><span class="po-ctx-icon">📍</span>' + g.context + '</div>' +
        roundInd +
        chatHTML +
        '<div class="po-tap-zone">' +
        '  <div class="po-tap-wrap" onclick="PracticeOverlay._handleTap()">' +
        '    <div class="po-tap-circle" id="poTapCircle">' +
        '      <span class="po-tap-inner"><span class="po-tap-icon" id="poTapIcon">' + MIC_SVG + '</span></span>' +
        '    </div>' +
        '  </div>' +
        '  <div class="po-tap-hint" id="poTapHint">按住说话</div>' +
        '</div>';
    } else {
      // review 阶段
      var ref = parseReference(round.reference);
      var reviewHTML =
        '<div class="po-ctx"><span class="po-ctx-icon">📍</span>' + g.context + '</div>' +
        roundInd +
        chatHTML +
        // 教练点评
        '<div class="po-review">' +
        '  <div class="po-review-badge">' + CROWN_SVG + ' 教练点评</div>' +
        '  <div class="po-review-text">' + round.coach + '</div>' +
        '</div>' +
        // 销冠话术
        '<div class="po-script">' +
        '  <div class="po-script-badge">' + CHAT_SVG + ' 销冠话术</div>' +
        '  <div class="po-script-quote">' + ref.script + '</div>' +
        '</div>' +
        // 为什么要这么做
        (ref.why ? '<div class="po-why"><div class="po-why-badge">' + HELP_SVG + ' 为什么要这么做</div><div class="po-why-text">' + ref.why + '</div></div>' : '') +
        // 下一回合按钮
        '<button class="po-next-row' + (isLast ? ' finish' : '') + '" id="poNextBtn" onclick="PracticeOverlay._nextRound()">' + (isLast ? '完成本组' : '下一回合 →') + '</button>' +
        // 自动推进提示
        '<div class="po-auto-hint">' + (isLast ? '8 秒后自动进入本组小结' : '8 秒后自动进入下一回合') + '</div>';

      body.innerHTML = reviewHTML;

      // 8 秒自动推进
      autoTimer = setTimeout(function () {
        advanceRound();
      }, 8000);
    }

    body.scrollTop = 0;
  }

  // ===================================================================
  //  说话阶段 — 点按麦克风
  // ===================================================================
  function handleTap() {
    if (locked) return;
    locked = true;
    clearAuto();

    var circle = document.getElementById('poTapCircle');
    var icon   = document.getElementById('poTapIcon');
    var hint   = document.getElementById('poTapHint');

    if (circle) circle.classList.add('done');
    if (icon)   icon.innerHTML = CHECK_SVG;
    if (hint)   { hint.classList.add('done'); hint.textContent = '收到了'; }

    // 短暂停留后进入点评阶段
    setTimeout(function () {
      phase = 'review';
      render();
    }, 600);
  }

  // ===================================================================
  //  点评阶段 — 手动点下一回合 / 完成本组
  // ===================================================================
  function nextRound() {
    if (locked) return;
    locked = true;
    clearAuto();

    var btn = document.getElementById('poNextBtn');
    if (btn) { btn.style.opacity = '0.5'; btn.textContent = '已确认'; }

    setTimeout(function () {
      advanceRound();
    }, 300);
  }

  function advanceRound() {
    clearAuto();
    var g     = groups[groupIdx];
    var total = g.rounds.length;
    var isLast = roundIdx >= total - 1;

    if (isLast) {
      phase = 'summary';
      render();
    } else {
      roundIdx++;
      phase = 'speaking';
      render();
    }
  }

  // ===================================================================
  //  小组小结
  // ===================================================================
  function renderSummary(g) {
    clearAuto();
    var body     = $('poBody');
    var total    = g.rounds.length;
    var summaryHTML = g.summary;

    // 如果 summary 包含中文句号，拆成段落
    if (summaryHTML.indexOf('。') > -1 && summaryHTML.indexOf('<') === -1) {
      var parts = summaryHTML.split('。').filter(function (s) { return s.trim().length > 0; });
      if (parts.length > 1) {
        summaryHTML = parts.map(function (s) { return '<p>' + s.trim() + '。</p>'; }).join('');
      }
    }

    var isLastGroup = groupIdx >= groups.length - 1;

    body.innerHTML =
      '<div class="po-ctx"><span class="po-ctx-icon">📍</span>' + g.context + '</div>' +
      '<div class="po-round">' +
      '  <span class="po-round-label" style="color:rgba(245,166,35,.6)">' + total + '/' + total + ' 回合完成</span>' +
      '  <div class="po-round-dots">' + renderRoundDots(total, total) + '</div>' +
      '</div>' +
      '<div class="po-chat dim">' +
      '  <div class="po-chat-label">' + (g.type === 'real' ? '真实客户 · 接待原音' : '模拟场景') + '</div>' +
      '  <div class="po-chat-row">' +
      '    <div class="po-chat-avatar ' + (g.type === 'real' ? 'real' : 'sim') + '">' + avatarSVG() + '</div>' +
      '    <div class="po-chat-bubble">' + g.rounds[total - 1].customer + '</div>' +
      '  </div>' +
      '</div>' +
      '<div class="po-summary">' +
      '  <div class="po-summary-check">✓</div>' +
      '  <div class="po-summary-title">这一组小结</div>' +
      '  <div class="po-summary-text">' + summaryHTML + '</div>' +
      '</div>' +
      '<button class="po-btn-finish" id="poFinishGroupBtn" onclick="PracticeOverlay._finishGroup()">' +
        (isLastGroup ? '完成全部练习' : '进入下一组 →') +
      '</button>';

    body.scrollTop = 0;
  }

  // ===================================================================
  //  完成本组 → 下一组 / 完成页
  // ===================================================================
  function finishGroup() {
    clearAuto();

    if (groupIdx < groups.length - 1) {
      groupIdx++;
      roundIdx = 0;
      phase = 'speaking';
      render();
    } else {
      showFinishPage();
    }
  }

  // ===================================================================
  //  全部完成页
  // ===================================================================
  function showFinishPage() {
    clearAuto();
    $('poBody').style.display = 'none';

    // Stepper 全部 done
    groups.forEach(function (g, i) {
      var dot   = document.getElementById('poStepDot' + i);
      var label = document.getElementById('poStepLabel' + i);
      var line  = document.getElementById('poStepLine' + i);
      if (dot)   { dot.classList.add('done'); dot.classList.remove('current'); dot.textContent = '✓'; }
      if (label) { label.classList.add('done'); label.classList.remove('current'); }
      if (line)  line.classList.add('done');
    });

    var finish = $('poFinish');
    finish.innerHTML =
      '<div class="po-finish-crown">' + CROWN_SVG.replace(/currentColor/g, 'rgba(245,166,35,.6)') + '</div>' +
      '<div class="po-finish-count">本轮完成了 <strong>' + groups.length + '</strong> 组</div>' +
      '<div class="po-finish-title">' + (opts.finishTitle || '练得不错！') + '</div>' +
      '<div class="po-finish-sub">' + (opts.finishSub || '') + '</div>' +
      '<div class="po-finish-actions">' +
      '  <button class="po-btn-ghost" id="poExitBtn">结束练习</button>' +
      '  <button class="po-btn-gold" id="poContinueBtn">' + (opts.continueLabel || '再练一次') + '</button>' +
      '</div>';
    finish.classList.add('active');

    // 绑定事件
    document.getElementById('poExitBtn').addEventListener('click', function () {
      exit();
    });
    document.getElementById('poContinueBtn').addEventListener('click', function () {
      if (opts.onContinue) opts.onContinue();
    });
  }

  // ===================================================================
  //  退出
  // ===================================================================
  function exit() {
    clearAuto();
    $('poPractice').classList.remove('show');
    document.body.style.overflow = '';
    if (opts.onExit) opts.onExit();
  }

  // ===================================================================
  //  Public API
  // ===================================================================
  window.PracticeOverlay = {
    /**
     * 初始化 — 注入 CSS + HTML，绑定事件
     */
    init: function (options) {
      opts = options || {};

      // 注入 CSS（仅一次）
      if (!document.getElementById('po-styles')) {
        var style = document.createElement('style');
        style.id = 'po-styles';
        style.textContent = CSS;
        document.head.appendChild(style);
      }

      // 注入 HTML（仅一次）
      if (!document.getElementById('poCountdown')) {
        var div = document.createElement('div');
        div.innerHTML = COUNTDOWN_HTML + PRACTICE_HTML;
        while (div.firstChild) {
          document.body.appendChild(div.firstChild);
        }
      }

      // 退出按钮
      var backBtn = document.getElementById('poBack');
      if (backBtn) {
        backBtn.addEventListener('click', function () { exit(); });
      }
    },

    /**
     * 启动练习
     * @param {Array} data — 练习组数据
     */
    start: function (data) {
      if (!data || !data.length) return;
      groups   = data;
      groupIdx = 0;
      roundIdx = 0;
      phase    = 'speaking';
      locked   = false;
      clearAuto();

      $('poPractice').classList.add('show');
      document.body.style.overflow = 'hidden';
      $('poFinish').classList.remove('active');
      $('poBody').style.display = '';

      buildStepper();
      updateStepper();

      var self = this;
      runCountdown(function () { render(); });
    },

    /**
     * 退出练习
     */
    exit: exit,

    // 暴露给 onclick 的回调（HTML onclick 需要全局访问）
    _handleTap:   handleTap,
    _nextRound:   nextRound,
    _finishGroup: finishGroup
  };

})();
