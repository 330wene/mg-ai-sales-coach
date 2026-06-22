/**
 * CoachPractice — 成交教练对练覆盖层
 *
 * 流程：倒计时 3-2-1 → 客户开口 → 点击麦克风说话 → LLM评分 →
 *        教练点评+销冠话术 → 下一轮 → 全部完成+星星汇总
 *
 * 左侧：N 个树节点（默认 4 个，每个节点内通过颜色区分 talking/review 阶段）
 * 底部：呼吸脉冲麦克风按钮（纯语音，不支持时提示用手机）
 *
 * 用法:
 *   // 页面加载时初始化一次
 *   CoachPractice.init({ apiKey: 'sk-ant-...', onExit: fn, onComplete: fn });
 *
 *   // 进入对练步骤时启动
 *   CoachPractice.start({
 *     title: '练 · 真实场景对练',
 *     scene: '场景：客户首次到店咨询 MG4',
 *     rounds: [{ customer: '客户说的话...' }, ...]
 *   });
 */

(function () {
  'use strict';

  // ===================================================================
  //  CSS — 全量注入
  // ===================================================================
  var CSS = [
    '/* ===== 倒计时 ===== */',
    '.cp-cd{position:absolute;inset:0;z-index:100;background:linear-gradient(170deg,#040b18 0%,#08162e 40%,#0d1f44 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .35s;overflow:hidden}',
    '.cp-cd.show{opacity:1;pointer-events:auto}',
    '.cp-cd::before{content:"";position:absolute;top:50%;left:50%;width:300px;height:300px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(59,130,246,.12) 0%,rgba(59,130,246,.03) 40%,transparent 70%);pointer-events:none}',
    '.cp-cd-badge{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;margin-bottom:40px}',
    '.cp-cd-crown{width:40px;height:40px;display:grid;place-items:center;margin-bottom:4px}',
    '.cp-cd-crown svg{width:28px;height:28px}',
    '.cp-cd-label{font-size:13px;font-weight:600;color:rgba(255,255,255,.65);letter-spacing:2px}',
    '.cp-cd-sub{font-size:10px;color:rgba(255,255,255,.3);margin-top:2px}',
    '.cp-cd-num{position:relative;z-index:1;font-size:110px;font-weight:800;color:#fff;line-height:1;text-shadow:0 0 60px rgba(59,130,246,.5),0 0 120px rgba(59,130,246,.2)}',
    '.cp-cd-num.pop{animation:cpPop .55s cubic-bezier(0.22,0.61,0.36,1)}',
    '.cp-cd-num.go{font-size:56px;background:linear-gradient(135deg,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none;animation:cpGoShine .6s ease}',
    '@keyframes cpPop{0%{transform:scale(.3);opacity:.2}50%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}}',
    '@keyframes cpGoShine{0%{transform:scale(.2);opacity:0}60%{transform:scale(1.2);opacity:1}100%{transform:scale(1);opacity:1}}',
    '.cp-cd-ring{position:absolute;top:50%;left:50%;width:200px;height:200px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(255,255,255,.08);pointer-events:none}',
    '.cp-cd-ring.pulse{animation:cpRingPulse 1s ease-out}',
    '@keyframes cpRingPulse{0%{width:180px;height:180px;opacity:.6;border-color:rgba(59,130,246,.3)}100%{width:320px;height:320px;opacity:0;border-color:transparent}}',

    '/* ===== 主覆盖层 ===== */',
    '.cp-overlay{position:absolute;inset:0;z-index:90;background:linear-gradient(170deg,#060d1a 0%,#0a1628 35%,#0f1f3d 100%);display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .35s;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}',
    '.cp-overlay.show{opacity:1;pointer-events:auto}',
    '.cp-overlay::before{content:"";position:absolute;top:-80px;right:-60px;width:260px;height:260px;background:radial-gradient(circle,rgba(59,130,246,.06) 0%,transparent 70%);pointer-events:none}',
    '.cp-overlay::after{content:"";position:absolute;bottom:10%;left:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(245,166,35,.03) 0%,transparent 70%);pointer-events:none}',

    '/* 顶栏 */',
    '.cp-topbar{position:relative;z-index:2;display:flex;align-items:center;padding:12px 14px 10px;gap:8px;flex:0 0 auto;background:rgba(6,13,26,.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:.5px solid rgba(255,255,255,.05)}',
    '.cp-back{width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center;color:rgba(255,255,255,.5);font-size:22px;border-radius:50%;transition:background .15s,color .15s;cursor:pointer;border:none;background:none}',
    '.cp-back:active{background:rgba(255,255,255,.08);color:#fff}',
    '.cp-topbar-title{flex:1;font-size:15px;font-weight:600;color:rgba(255,255,255,.8);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',

    '/* 主体 */',
    '.cp-main{position:relative;z-index:1;flex:1;display:flex;overflow:hidden;min-height:0}',

    '/* ===== 左侧树 ===== */',
    '.cp-tree{flex:0 0 auto;width:52px;display:flex;flex-direction:column;align-items:center;padding:20px 0;position:relative;border-right:.5px solid rgba(255,255,255,.04)}',
    '.cp-tree-inner{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;width:100%;flex:1}',
    '.cp-tree-node{position:relative;z-index:1;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;flex:0 0 auto;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.08);color:rgba(255,255,255,.2);transition:all .4s cubic-bezier(0.22,0.61,0.36,1)}',
    '.cp-tree-node.done{background:rgba(16,185,129,.2);border-color:rgba(16,185,129,.45);color:#10b981}',
    '.cp-tree-node.speaking{background:#3b82f6;border-color:#3b82f6;color:#fff;box-shadow:0 0 16px rgba(59,130,246,.4);transform:scale(1.12);animation:cpNodePulseBlue 2s ease-in-out infinite}',
    '.cp-tree-node.reviewing{background:#f59e0b;border-color:#f59e0b;color:#fff;box-shadow:0 0 16px rgba(245,158,11,.4);transform:scale(1.12);animation:cpNodePulseGold 1.5s ease-in-out infinite}',
    '@keyframes cpNodePulseBlue{0%,100%{box-shadow:0 0 12px rgba(59,130,246,.35)}50%{box-shadow:0 0 22px rgba(59,130,246,.6)}}',
    '@keyframes cpNodePulseGold{0%,100%{box-shadow:0 0 10px rgba(245,158,11,.3)}50%{box-shadow:0 0 20px rgba(245,158,11,.55)}}',
    '.cp-tree-svg{position:absolute;inset:0;pointer-events:none;z-index:0}',

    '/* ===== 右侧内容区 ===== */',
    '.cp-content{flex:1;display:flex;flex-direction:column;padding:0 16px 0 18px;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}',
    '.cp-content::-webkit-scrollbar{display:none}',

    '/* 场景条 */',
    '.cp-ctx{padding:10px 0 8px;font-size:11px;color:rgba(255,255,255,.3);line-height:1.5;position:sticky;top:0;z-index:2;background:linear-gradient(180deg,#0a1628 60%,transparent 100%);flex:0 0 auto}',

    '/* 客户区 */',
    '.cp-cust{padding:16px 0 0;flex:0 0 auto}',
    '.cp-cust-head{display:flex;align-items:center;gap:8px;margin-bottom:8px}',
    '.cp-cust-avatar{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;box-shadow:0 0 0 2px rgba(245,158,11,.12),0 2px 8px rgba(0,0,0,.2)}',
    '.cp-cust-avatar svg{width:36px;height:36px;display:block}',
    '.cp-cust-name{font-size:13px;font-weight:600;color:rgba(255,255,255,.7)}',
    '.cp-cust-role{font-size:10px;color:rgba(255,255,255,.3);margin-left:4px;font-weight:400}',
    '.cp-bubble{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.07);border-radius:4px 14px 14px 14px;padding:14px 16px;font-size:15px;color:#e2e8f0;line-height:1.8;letter-spacing:.3px;position:relative;animation:cpBubbleIn .4s cubic-bezier(0.22,0.61,0.36,1)}',
    '.cp-bubble::after{content:"";position:absolute;left:-6px;bottom:10px;width:10px;height:8px;background:rgba(255,255,255,.06);clip-path:polygon(100% 0,0 50%,100% 100%);border-left:1px solid rgba(255,255,255,.07)}',
    '@keyframes cpBubbleIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    '.cp-round-tag{display:flex;align-items:center;gap:4px;padding:4px 0 12px;font-size:12px;color:rgba(255,255,255,.35);font-weight:500}',

    '/* ===== 底部按钮区 ===== */',
    '.cp-bottom{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;padding:8px 20px 36px;position:relative;z-index:2}',
    '.cp-waveform{display:none;align-items:center;justify-content:center;gap:3px;height:12px;margin-bottom:4px}',
    '.cp-waveform.active{display:flex}',
    '.cp-wave-bar{width:3px;border-radius:2px;background:rgba(59,130,246,.4);animation:cpWave 1.2s ease-in-out infinite}',
    '.cp-wave-bar:nth-child(1){height:6px;animation-delay:0s}.cp-wave-bar:nth-child(2){height:12px;animation-delay:.1s}.cp-wave-bar:nth-child(3){height:8px;animation-delay:.2s}.cp-wave-bar:nth-child(4){height:14px;animation-delay:.3s}.cp-wave-bar:nth-child(5){height:5px;animation-delay:.4s}',
    '@keyframes cpWave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.4)}}',

    '.cp-btn-wrap{position:relative;width:80px;height:80px;cursor:pointer;-webkit-tap-highlight-color:transparent}',
    '.cp-btn-wrap::before{content:"";position:absolute;inset:-14px;border-radius:50%;border:1.5px solid rgba(255,255,255,.05);animation:cpBreathe 2.8s ease-in-out infinite;pointer-events:none}',
    '@keyframes cpBreathe{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.15);opacity:.06}}',
    '.cp-btn-wrap.listening::before{border-color:rgba(59,130,246,.25);animation:cpBreatheActive 1.4s ease-in-out infinite}',
    '@keyframes cpBreatheActive{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.2);opacity:.12}}',
    '.cp-btn-main{width:80px;height:80px;position:relative;z-index:1;border-radius:50%;background:radial-gradient(circle at 50% 40%,#1a2740,#0d1a2d);border:1.5px solid rgba(255,255,255,.1);display:grid;place-items:center;transition:transform .15s,background .4s,border-color .4s,box-shadow .4s;box-shadow:0 0 40px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.03)}',
    '.cp-btn-main:active{transform:scale(.93)}',
    '.cp-btn-inner{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.03);display:grid;place-items:center;transition:all .4s}',
    '.cp-btn-icon{color:rgba(255,255,255,.25);transition:color .4s,transform .4s;display:grid;place-items:center}',
    '.cp-btn-icon svg{width:18px;height:18px}',

    '/* 聆听状态 */',
    '.cp-btn-wrap.listening .cp-btn-main{background:radial-gradient(circle at 50% 40%,#1e3a5f,#0f2440);border-color:rgba(59,130,246,.3);box-shadow:0 0 50px rgba(59,130,246,.18),inset 0 1px 0 rgba(255,255,255,.03)}',
    '.cp-btn-wrap.listening .cp-btn-inner{background:rgba(59,130,246,.1)}',
    '.cp-btn-wrap.listening .cp-btn-icon{color:rgba(96,165,250,.7)}',
    '/* 分析中 */',
    '.cp-btn-wrap.processing .cp-btn-main{border-color:rgba(245,166,35,.25)}',
    '.cp-btn-wrap.processing .cp-btn-inner{animation:cpSpin 1s linear infinite}',
    '@keyframes cpSpin{to{transform:rotate(360deg)}}',
    '/* 说完 */',
    '.cp-btn-wrap.done-s .cp-btn-main{background:radial-gradient(circle at 50% 40%,#0f2f1a,#0a1f12);border-color:rgba(16,185,129,.35);box-shadow:0 0 50px rgba(16,185,129,.15)}',
    '.cp-btn-wrap.done-s .cp-btn-inner{background:rgba(16,185,129,.1)}',
    '.cp-btn-wrap.done-s .cp-btn-icon{color:#10b981;transform:scale(1.15)}',

    '.cp-btn-hint{font-size:12px;color:rgba(255,255,255,.3);margin-top:12px;text-align:center;transition:color .4s}',
    '.cp-btn-hint.active{color:rgba(96,165,250,.6)}',
    '.cp-btn-hint.done-s{color:rgba(16,185,129,.55)}',

    '/* ===== 教练点评区 ===== */',
    '.cp-stars{display:flex;align-items:center;justify-content:center;gap:6px;padding:10px 0 4px;animation:cpSlideUp .4s cubic-bezier(0.22,0.61,0.36,1) both}',
    '@keyframes cpSlideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',
    '.cp-star{width:22px;height:22px;display:grid;place-items:center}',
    '.cp-star svg{width:20px;height:20px}',
    '.cp-star.bright{animation:cpStarPop .5s cubic-bezier(0.34,1.56,0.64,1) both}',
    '.cp-star.dim:nth-child(1){animation-delay:0s}.cp-star.dim:nth-child(2){animation-delay:.08s}.cp-star.dim:nth-child(3){animation-delay:.16s}',
    '@keyframes cpStarPop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.35) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}',

    '.cp-review-card{margin-top:12px;padding:14px 16px;background:rgba(245,166,35,.04);border:1px solid rgba(245,166,35,.15);border-radius:12px;animation:cpSlideUp .4s .05s cubic-bezier(0.22,0.61,0.36,1) both}',
    '.cp-review-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:rgba(245,166,35,.75);font-weight:600;margin-bottom:8px;letter-spacing:.5px}',
    '.cp-review-badge svg{width:13px;height:13px}',
    '.cp-review-text{font-size:13.5px;color:rgba(255,255,255,.7);line-height:1.75}',

    '.cp-script-card{margin-top:10px;padding:14px 16px;background:rgba(16,185,129,.03);border:1px solid rgba(16,185,129,.12);border-radius:12px;animation:cpSlideUp .4s .1s cubic-bezier(0.22,0.61,0.36,1) both}',
    '.cp-script-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:rgba(16,185,129,.75);font-weight:600;margin-bottom:8px;letter-spacing:.5px}',
    '.cp-script-badge svg{width:13px;height:13px}',
    '.cp-script-quote{font-size:13.5px;color:rgba(255,255,255,.75);line-height:1.8;padding:10px 14px;background:rgba(255,255,255,.02);border-radius:8px;border-left:2px solid rgba(16,185,129,.25)}',

    '/* 下一轮按钮 */',
    '.cp-next-btn{width:100%;min-height:44px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.55);border-radius:12px;font-size:14px;font-weight:500;transition:background .15s,color .15s,border-color .15s;cursor:pointer;margin-top:16px;flex:0 0 auto;animation:cpSlideUp .4s .15s cubic-bezier(0.22,0.61,0.36,1) both}',
    '.cp-next-btn:active{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.2)}',
    '.cp-next-btn.final{background:rgba(245,166,35,.08);border-color:rgba(245,166,35,.2);color:rgba(245,166,35,.8)}',

    '/* ===== 完成页 ===== */',
    '.cp-finish{display:none;flex:1;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px 24px;overflow-y:auto}',
    '.cp-finish.show{display:flex}',
    '.cp-finish-icon{width:56px;height:56px;display:grid;place-items:center;margin-bottom:4px;animation:cpStarPop .6s cubic-bezier(0.34,1.56,0.64,1) both}',
    '.cp-finish-icon svg{width:40px;height:40px}',
    '.cp-finish-stars{display:flex;gap:8px;margin:4px 0 16px}',
    '.cp-finish-star{width:28px;height:28px;display:grid;place-items:center;animation:cpStarPop .5s cubic-bezier(0.34,1.56,0.64,1) both}',
    '.cp-finish-star:nth-child(1){animation-delay:.1s}.cp-finish-star:nth-child(2){animation-delay:.2s}.cp-finish-star:nth-child(3){animation-delay:.3s}.cp-finish-star:nth-child(4){animation-delay:.4s}.cp-finish-star:nth-child(5){animation-delay:.5s}.cp-finish-star:nth-child(6){animation-delay:.6s}.cp-finish-star:nth-child(7){animation-delay:.7s}.cp-finish-star:nth-child(8){animation-delay:.8s}.cp-finish-star:nth-child(9){animation-delay:.9s}.cp-finish-star:nth-child(10){animation-delay:1s}.cp-finish-star:nth-child(11){animation-delay:1.1s}.cp-finish-star:nth-child(12){animation-delay:1.2s}',
    '.cp-finish-star svg{width:26px;height:26px}',
    '.cp-finish-total{font-size:14px;color:rgba(255,255,255,.5);margin-bottom:4px}',
    '.cp-finish-total strong{color:#f59e0b;font-size:22px}',
    '.cp-finish-title{font-size:17px;color:rgba(255,255,255,.8);line-height:1.7;font-weight:600;margin-bottom:4px}',
    '.cp-finish-sub{font-size:13px;color:rgba(255,255,255,.35);line-height:1.5;margin-bottom:28px}',
    '.cp-finish-actions{display:flex;gap:12px;width:100%;max-width:280px}',
    '.cp-finish-actions button{flex:1;min-height:44px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;border:none}',
    '.cp-btn-ghost{border:1px solid rgba(255,255,255,.1)!important;color:rgba(255,255,255,.5);background:transparent;transition:background .15s,color .15s,border-color .15s}',
    '.cp-btn-ghost:active{background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.2)}',
    '.cp-btn-gold{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;box-shadow:0 4px 16px rgba(245,158,11,.25);transition:transform .12s,box-shadow .15s}',
    '.cp-btn-gold:active{transform:scale(.98);box-shadow:0 2px 8px rgba(245,158,11,.15)}',

    '/* Toast */',
    '.cp-toast{position:fixed;z-index:110;left:50%;bottom:120px;max-width:82%;padding:10px 16px;color:#fff;background:rgba(14,24,41,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:22px;font-size:13px;font-weight:500;text-align:center;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;opacity:0;pointer-events:none;transform:translate(-50%,12px);transition:opacity .25s,transform .25s cubic-bezier(0.34,1.56,0.64,1)}',
    '.cp-toast.show{opacity:1;transform:translate(-50%,0)}',

    '/* 响应式 */',
    '@media(max-width:374px){.cp-tree{width:44px;padding-left:6px}.cp-content{padding:0 12px 0 14px}.cp-btn-wrap{width:72px;height:72px}.cp-btn-main{width:72px;height:72px}.cp-bubble{font-size:14px}}'
  ].join('\n');

  // ===================================================================
  //  SVG
  // ===================================================================
  var CROWN  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 17l2-9 4 4 4-8 4 8 4-4 2 9H2z" stroke-linejoin="round"/><circle cx="12" cy="17" r="2" fill="currentColor" stroke="none"/></svg>';
  var MIC    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="1" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>';
  var CHECK  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var CHAT   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var SPIN   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10" stroke-opacity=".2"/><path d="M12 2a10 10 0 019.95 9"/></svg>';
  var STAR_S = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
  var STAR_E = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

  // 客户头像 — 精致人物剪影（替代 emoji）
  var CUSTOMER_AVATAR = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">'+
    '<defs><linearGradient id="cag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="40%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs>'+
    '<circle cx="16" cy="16" r="16" fill="url(#cag)" opacity=".92"/>'+
    '<circle cx="16" cy="11" r="4.5" fill="#fff" opacity=".85"/>'+
    '<path d="M7 29c0-5.5 4-10 9-10s9 4.5 9 10" fill="#fff" opacity=".5"/>'+
    '<circle cx="16" cy="16" r="15.5" stroke="rgba(255,255,255,.12)" stroke-width=".5"/>'+
    '</svg>';

  // ===================================================================
  //  默认练习数据（真实场景对练 4 回合）
  // ===================================================================
  var DEFAULT_DATA = {
    title: '真实场景对练',
    scene: 'MG展厅 · 带娃的张姐',
    customerName: '张姐',
    customerAvatar: CUSTOMER_AVATAR,
    rounds: [
      { customer: '小姑娘，这个 MG4 怎么样啊？我每天就是接送孩子上学，来回差不多30公里。' },
      { customer: '那冬天开暖风堵在路上，续航会不会掉得厉害？我可不想到时候趴窝。' },
      { customer: '我听朋友说国产电池开两三年就不行了，换一块要好几万。靠不靠谱啊？带孩子用的，安全最重要。' },
      { customer: '你说的这些是不错，但我看隔壁比亚迪海豚便宜两万多，配置也差不多嘛，为什么非要买 MG4？' }
    ]
  };

  // ===================================================================
  //  状态
  // ===================================================================
  var S = {
    data:        null,
    roundIdx:    0,
    phase:       'init',
    results:     [],
    locked:      false,
    apiKey:      null,
    scoreFn:     null,
    opts:        {},
    container:   null,
    _timer:      null
  };

  // ===================================================================
  //  DOM refs
  // ===================================================================
  var els = {};
  function $(id) { if (!els[id]) els[id] = document.getElementById(id); return els[id]; }
  function clearTimer() { if (S._timer) { clearTimeout(S._timer); S._timer = null; } }

  function totalRounds() { return S.data ? S.data.rounds.length : 0; }
  function isLastRound() { return S.roundIdx >= totalRounds() - 1; }
  function totalStars() { var s=0; S.results.forEach(function(r){s+=r.stars}); return s; }
  function maxStars() { return S.results.length * 3; }

  // ===================================================================
  //  评分
  // ===================================================================
  function defaultScore(customerMsg, userMsg) {
    var len = (userMsg||'').length;
    if (len < 5) return Promise.resolve({ stars:2, comment:'多想想客户为什么问这个问题，把回答跟她的生活场景扣在一起。', championScript:'试着从客户的使用场景出发——"您每天接孩子来回30公里，充一次电够用一周"比"续航520公里"更能打动人。' });
    if (len < 25) return Promise.resolve({ stars:2, comment:'方向基本对了，可以把卖点说得更具体，让客户感受到价值。', championScript:'试试结合客户的使用场景来展开，效果会更好。' });
    return Promise.resolve({ stars:2, comment:'说得不错，条理清楚。继续打磨场景化表达会更好。', championScript:'把参数翻译成客户能感知的好处——"一周充一次"比"64度电"更打动人。' });
  }

  function createLLMScorer(apiKey) {
    return function(customerMsg, userMsg) {
      var prompt = [
        '你是资深汽车销售教练。评价销售顾问的回应（1-3星）：',
        '- 1星：方向偏了，没抓住客户关切',
        '- 2星：基本对了，但表达可以更精准',
        '- 3星：精准切中要害，能推动成交',
        '',
        '客户说：' + customerMsg,
        '销售回应：' + userMsg,
        '返回 JSON（不要markdown包裹）：',
        '{"stars":2,"comment":"一句话点评（20字内）","championScript":"一段销冠级别的参考回应（50-100字，自然口语化）"}'
      ].join('\n');
      return fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01'},
        body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:400,messages:[{role:'user',content:prompt}]})
      }).then(function(r){if(!r.ok)throw Error('API '+r.status);return r.json()}).then(function(d){
        var t=d.content[0].text.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,'');
        var j=JSON.parse(t);
        return {stars:Math.max(1,Math.min(3,j.stars||2)),comment:j.comment||'继续加油！',championScript:j.championScript||''};
      }).catch(function(e){console.warn('[CoachPractice] LLM failed:',e.message);return defaultScore(customerMsg,userMsg);});
    };
  }

  // ===================================================================
  //  点击模拟说话（点一下=说完了，1.2s聆听动画→评分）
  // ===================================================================
  function startListening() {
    S.phase = 'listening';
    updateBtn();
    S._timer = setTimeout(function() {
      S.phase = 'processing';
      updateBtn();
      var round = S.data.rounds[S.roundIdx];
      var scorer = S.scoreFn || defaultScore;
      scorer(round.customer, '').then(function(result) {
        S.results.push({ stars:result.stars, comment:result.comment, championScript:result.championScript, userText:'' });
        S.phase = 'review';
        S.locked = false;
        renderContent();
        updateTree();
        updateBtn();
      }).catch(function(e) {
        console.error('[CoachPractice] Score error:', e);
        S.results.push({ stars:2, comment:'继续加油，多练几次会更好。', championScript:'建议参考产品课件中的标准话术。', userText:'' });
        S.phase = 'review';
        S.locked = false;
        renderContent();
        updateTree();
        updateBtn();
      });
    }, 1200);
  }

  function stopListening() {
    clearTimer();
  }

  // ===================================================================
  //  左侧树
  // ===================================================================
  function buildTree() {
    var n = totalRounds();
    var inner = $('cpTreeInner'), svg = $('cpTreeSvg');
    if (!inner) return;
    var h='';
    for (var i=0;i<n;i++) {
      var cls='';
      if (i<S.roundIdx) cls='done';
      else if (i===S.roundIdx) cls=S.phase==='review'?'reviewing':'speaking';
      h+='<div class="cp-tree-node '+cls+'" id="cpNode'+i+'">'+(i<S.roundIdx?'✓':i+1)+'</div>';
    }
    inner.innerHTML=h;
    // 等两帧确保 layout 完成再画线
    requestAnimationFrame(function() { requestAnimationFrame(function() { drawLines(); }); });
  }

  function drawLines() {
    var n = totalRounds();
    var svg = $('cpTreeSvg'), inner = $('cpTreeInner');
    if (!svg||!inner||n<2) return;

    var ir = inner.getBoundingClientRect();
    // 使用 scrollHeight 确保覆盖全部节点
    var h2 = inner.scrollHeight;
    var w = ir.width;
    svg.setAttribute('viewBox','0 0 '+w+' '+h2);
    svg.style.width = w+'px';
    svg.style.height = h2+'px';

    var pts=[];
    for (var i=0;i<n;i++) {
      var node=document.getElementById('cpNode'+i);
      if(!node) return;
      var nr=node.getBoundingClientRect();
      pts.push({x:nr.left-ir.left+nr.width/2, y:nr.top-ir.top+nr.height/2});
    }

    var els='';
    for (var i=0;i<pts.length-1;i++) {
      var from=pts[i], to=pts[i+1];
      var color;
      if (i < S.roundIdx) color='rgba(16,185,129,.25)';
      else if (i === S.roundIdx) color=S.phase==='review'?'rgba(245,166,35,.2)':'rgba(59,130,246,.2)';
      else color='rgba(255,255,255,.04)';
      els+='<line x1="'+from.x+'" y1="'+from.y+'" x2="'+to.x+'" y2="'+to.y+'" stroke="'+color+'" stroke-width="1.5" stroke-linecap="round"/>';
    }
    svg.innerHTML=els;
  }

  function updateTree() {
    var n=totalRounds();
    for (var i=0;i<n;i++) {
      var node=document.getElementById('cpNode'+i);
      if(!node) continue;
      node.classList.remove('done','speaking','reviewing');
      if (i<S.roundIdx) { node.classList.add('done'); node.textContent='✓'; }
      else if (i===S.roundIdx) { node.classList.add(S.phase==='review'?'reviewing':'speaking'); node.textContent=i+1; }
      else { node.textContent=i+1; }
    }
    drawLines();
  }

  // ===================================================================
  //  内容区
  // ===================================================================
  function renderContent() {
    var c=$('cpContent'); if(!c) return;
    var d=S.data, round=d.rounds[S.roundIdx];

    if (S.phase==='speaking'||S.phase==='listening'||S.phase==='processing') {
      // 客户说话阶段
      c.innerHTML =
        '<div class="cp-ctx">📍 '+d.scene+'</div>'+
        '<div class="cp-round-tag">第 '+(S.roundIdx+1)+'/'+totalRounds()+' 回合</div>'+
        '<div class="cp-cust">'+
        ' <div class="cp-cust-head"><div class="cp-cust-avatar">'+(d.customerAvatar||CUSTOMER_AVATAR)+'</div><div><span class="cp-cust-name">'+(d.customerName||'客户')+'</span><span class="cp-cust-role">真实客户场景</span></div></div>'+
        ' <div class="cp-bubble">'+round.customer+'</div>'+
        '</div>';
    } else if (S.phase==='review') {
      var r=S.results[S.results.length-1]; if(!r) return;
      var stars='';
      for (var s=1;s<=3;s++) {
        stars+='<div class="cp-star'+(s<=r.stars?' bright':' dim')+'" style="animation-delay:'+(s*.1)+'s">'+
          (s<=r.stars?STAR_S.replace(/currentColor/g,'#f59e0b'):STAR_E.replace(/currentColor/g,'rgba(255,255,255,.1)'))+'</div>';
      }
      c.innerHTML =
        '<div class="cp-ctx">📍 '+d.scene+'</div>'+
        '<div class="cp-round-tag">第 '+(S.roundIdx+1)+'/'+totalRounds()+' 回合</div>'+
        '<div class="cp-cust">'+
        ' <div class="cp-cust-head"><div class="cp-cust-avatar">'+CUSTOMER_AVATAR+'</div><div><span class="cp-cust-name">'+(d.customerName||'客户')+'</span><span class="cp-cust-role">真实客户场景</span></div></div>'+
        ' <div class="cp-bubble" style="opacity:.55">'+round.customer+'</div>'+
        '</div>'+
        '<div class="cp-stars">'+stars+'</div>'+
        '<div class="cp-review-card">'+
        ' <div class="cp-review-badge">'+CROWN.replace(/currentColor/g,'rgba(245,166,35,.75)')+' 教练点评</div>'+
        ' <div class="cp-review-text">'+r.comment+'</div>'+
        '</div>'+
        '<div class="cp-script-card">'+
        ' <div class="cp-script-badge">'+CHAT.replace(/currentColor/g,'rgba(16,185,129,.75)')+' 销冠参考话术</div>'+
        ' <div class="cp-script-quote">'+r.championScript+'</div>'+
        '</div>';
    }
    c.scrollTop=0;
  }

  function showFinish() {
    var c=$('cpContent'), b=$('cpBottom');
    if(!c) return;
    if(b) b.style.display='none';

    var total=totalStars(), n=totalRounds(), stars='';
    for (var s=0;s<total;s++) stars+='<div class="cp-finish-star" style="animation-delay:'+(s*.08)+'s">'+STAR_S.replace(/currentColor/g,'#f59e0b')+'</div>';

    var title,sub;
    if (total>=n*2.5)      { title='太棒了，产品讲解很扎实！'; sub=total+' 颗星 · 明天进店就这么讲'; }
    else if (total>=n*1.8) { title='不错，再练练会更稳'; sub=total+' 颗星 · 场景翻译的感觉出来了'; }
    else                   { title='别灰心，方向是对的'; sub=total+' 颗星 · 下次把参数翻译成画面会更好'; }

    c.innerHTML=
      '<div class="cp-finish show">'+
      ' <div class="cp-finish-icon">'+CROWN.replace(/currentColor/g,'rgba(245,166,35,.6)')+'</div>'+
      ' <div class="cp-finish-total">本轮完成 <strong>'+n+'</strong> 回合对练</div>'+
      ' <div class="cp-finish-stars">'+stars+'</div>'+
      ' <div class="cp-finish-title">'+title+'</div>'+
      ' <div class="cp-finish-sub">'+sub+'</div>'+
      ' <div class="cp-finish-actions">'+
      '  <button class="cp-btn-ghost" id="cpExitBtn">掌握了，回去</button>'+
      '  <button class="cp-btn-gold" id="cpRetryBtn">再练 5 组</button>'+
      ' </div>'+
      '</div>';
    c.scrollTop=0;
    setTimeout(function(){
      var eb=document.getElementById('cpExitBtn'), rb=document.getElementById('cpRetryBtn');
      if(eb) eb.addEventListener('click',function(){exit();});
      if(rb) rb.addEventListener('click',function(){
        if (S.opts.onRetry) { S.opts.onRetry(); }
        else { restart(); }
      });
    },100);
  }

  // ===================================================================
  //  底部按钮
  // ===================================================================
  function updateBtn() {
    var b=$('cpBottom'); if(!b) return;

    if (S.phase==='finish') { b.style.display='none'; return; }
    b.style.display='';

    if (S.phase==='review') {
      b.innerHTML='<button class="cp-next-btn'+(isLastRound()?' final':'')+'" id="cpNextBtn" onclick="CoachPractice._nextRound()">'+
        (isLastRound()?'✨ 查看练习结果':'继续下一回合 →')+'</button>';
      return;
    }

    // speaking / listening / processing → 麦克风按钮
    var wrapCls='';
    if (S.phase==='listening') wrapCls=' listening';
    else if (S.phase==='processing') wrapCls=' processing';
    else if (S.phase==='done') wrapCls=' done-s';

    b.innerHTML=
      '<div class="cp-waveform'+(S.phase==='listening'?' active':'')+'" id="cpWave">'+
      ' <div class="cp-wave-bar"></div><div class="cp-wave-bar"></div><div class="cp-wave-bar"></div><div class="cp-wave-bar"></div><div class="cp-wave-bar"></div>'+
      '</div>'+
      '<div class="cp-btn-wrap'+wrapCls+'" id="cpBtnWrap" onclick="CoachPractice._handleTap()">'+
      ' <div class="cp-btn-main"><span class="cp-btn-inner"><span class="cp-btn-icon" id="cpBtnIcon">'+(S.phase==='processing'?SPIN:MIC)+'</span></span></div>'+
      '</div>'+
      '<div class="cp-btn-hint'+(S.phase==='listening'||S.phase==='processing'?' active':(S.phase==='done'?' done-s':''))+'" id="cpBtnHint">'+
      (S.phase==='listening'?'正在聆听...':S.phase==='processing'?'分析中...':S.phase==='done'?'收到了':'点击说话')+'</div>';
  }

  // ===================================================================
  //  倒计时
  // ===================================================================
  function runCountdown(cb) {
    var overlay=$('cpCountdown'), numEl=$('cpCdNum'), ringEl=$('cpCdRing');
    overlay.classList.add('show');
    var n = totalRounds();
    var steps=[{num:'3',c:''},{num:'2',c:''},{num:'1',c:''},{num:'开始',c:'go'},{num:'共 '+n+' 组',c:'go'}], i=0;
    function tick(){
      if(i>=steps.length){setTimeout(function(){overlay.classList.remove('show');cb();},200);return;}
      var s=steps[i];numEl.textContent=s.num;numEl.className='cp-cd-num pop';
      if(ringEl){ringEl.classList.remove('pulse');void ringEl.offsetWidth;ringEl.classList.add('pulse');}
      if(s.c)numEl.classList.add(s.c);i++;setTimeout(tick,i===steps.length?700:800);
    }
    tick();
  }

  // ===================================================================
  //  交互
  // ===================================================================
  function handleTap() {
    if (S.locked) return;
    if (S.phase!=='speaking') return;
    S.locked=true;
    startListening();
  }

  function nextRound() {
    if (S.locked) return;
    S.locked=true; clearTimer();

    if (isLastRound()) {
      S.phase='finish';
      S.roundIdx++;
      updateTree();
      showFinish();
      if (S.opts.onComplete) S.opts.onComplete(S.results);
    } else {
      S.roundIdx++;
      S.phase='speaking';
      S.locked=false;
      updateTree();
      renderContent();
      updateBtn();
      var c=$('cpContent'); if(c) c.scrollTop=0;
    }
  }

  function exit() {
    clearTimer(); stopListening();
    $('cpOverlay').classList.remove('show');
    if (!S.container) document.body.style.overflow='';
    if (S.opts.onExit) S.opts.onExit();
  }

  function restart() {
    clearTimer(); stopListening();
    S.roundIdx=0; S.phase='speaking'; S.results=[]; S.locked=false;

    var c=$('cpContent'); if(c) c.innerHTML='';
    var b=$('cpBottom'); if(b) b.style.display='';

    buildTree(); updateTree(); updateBtn();

    var self=window.CoachPractice;
    runCountdown(function(){S.phase='speaking';updateBtn();renderContent();});
  }

  // ===================================================================
  //  Toast
  // ===================================================================
  var _toastTimer;
  function toast(msg) {
    var t=$('cpToast'); if(!t) return;
    clearTimeout(_toastTimer); t.textContent=msg; t.classList.add('show');
    _toastTimer=setTimeout(function(){t.classList.remove('show');},2000);
  }

  // ===================================================================
  //  HTML 注入
  // ===================================================================
  var COUNTDOWN_HTML='<div class="cp-cd" id="cpCountdown"><div class="cp-cd-ring" id="cpCdRing"></div><div class="cp-cd-badge"><div class="cp-cd-crown">'+CROWN.replace(/currentColor/g,'rgba(245,166,35,.6)')+'</div><div class="cp-cd-label">成交教练</div><div class="cp-cd-sub">实战对练</div></div><div class="cp-cd-num" id="cpCdNum">3</div></div>';
  var OVERLAY_HTML='<div class="cp-overlay" id="cpOverlay"><div class="cp-topbar"><button class="cp-back" id="cpBack" aria-label="退出">‹</button><div class="cp-topbar-title" id="cpTopTitle">真实场景对练</div><span style="width:32px;flex:0 0 auto"></span></div><div class="cp-main"><div class="cp-tree"><div class="cp-tree-inner" id="cpTreeInner"></div><svg class="cp-tree-svg" id="cpTreeSvg" viewBox="0 0 52 400" preserveAspectRatio="none"></svg></div><div class="cp-content" id="cpContent"></div></div><div class="cp-bottom" id="cpBottom"></div></div><div class="cp-toast" id="cpToast" role="status" aria-live="polite"></div>';

  function injectAll(container) {
    if (document.getElementById('cp-styles')) return;
    var style=document.createElement('style'); style.id='cp-styles'; style.textContent=CSS;
    document.head.appendChild(style);

    if (container) {
      // 容器模式：注入到指定元素（它需要 position:relative）
      var wrap=document.createElement('div');
      wrap.innerHTML=COUNTDOWN_HTML+OVERLAY_HTML;
      while(wrap.firstChild) container.appendChild(wrap.firstChild);
    } else {
      // body 模式：包一个 fixed 壳
      var shell=document.createElement('div');
      shell.id='cpShell'; shell.style.cssText='position:fixed;inset:0;z-index:90';
      var wrap2=document.createElement('div');
      wrap2.innerHTML=COUNTDOWN_HTML+OVERLAY_HTML;
      while(wrap2.firstChild) shell.appendChild(wrap2.firstChild);
      document.body.appendChild(shell);
    }
  }

  // ===================================================================
  //  Public API
  // ===================================================================
  window.CoachPractice = {
    _inited: false,

    /**
     * init({ apiKey?, onExit?, onComplete?, container? })
     * container: 注入目标元素（默认 document.body）。传入时 overlay 使用 absolute 定位填满容器。
     */
    init: function(opts) {
      opts=opts||{}; S.opts=opts; S.apiKey=opts.apiKey||null; S.container=opts.container||null;
      if (opts.apiKey) S.scoreFn=createLLMScorer(opts.apiKey);
      if (opts.scoreFn) S.scoreFn=opts.scoreFn;

      injectAll(S.container);

      var backBtn=document.getElementById('cpBack');
      if(backBtn) backBtn.addEventListener('click',function(){exit();});

      this._inited=true;
    },

    /**
     * start(data)
     * data: { title, scene, customerName?, customerAvatar?, rounds: [{ customer }, ...] }
     */
    start: function(data) {
      data=data||DEFAULT_DATA;
      S.data=data; S.roundIdx=0; S.phase='init'; S.results=[]; S.locked=false;
      clearTimer(); stopListening();

      $('cpOverlay').classList.add('show');
      if (!S.container) document.body.style.overflow='hidden';

      var title=$('cpTopTitle'); if(title) title.textContent=data.title||'真实场景对练';

      buildTree(); updateTree(); updateBtn();

      var self=this;
      runCountdown(function(){
        S.phase='speaking'; updateBtn(); renderContent();
      });
    },

    exit: exit,
    _handleTap: handleTap,
    _nextRound: nextRound
  };

  // resize 时重绘连线
  var _rt;
  window.addEventListener('resize',function(){
    clearTimeout(_rt);
    _rt=setTimeout(function(){
      if($('cpOverlay')&&$('cpOverlay').classList.contains('show')&&S.phase!=='init') drawLines();
    },200);
  });

})();
