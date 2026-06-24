/**
 * 精准学详情页 — 路由 #learn-<materialId>
 */
var LEARN_MATERIALS = {
  'mg7': { materialId:'mg7',title:'MG7 新品上市培训',summaryPoints:['半固态电池版 CLTC 续航 537km，日常通勤一周一充，长途无焦虑','XDS 弯道动态控制同级独有，过弯极限提升 12%，驾控感受远超同级','后排纯平地板 + 540° 影像，接「给家里人开」的客户用得上'],pdfPath:'assets/课件：MG7 25款上市培训.pdf',videoLabel:'MG7 核心卖点解析',videoDuration:'4分钟' },
  'mg4': { materialId:'mg4',title:'MG4 新品上市培训',summaryPoints:['半固态电池版 CLTC 续航 537km，CTB 电池车身一体化，安全与操控兼顾','后驱平台 + 五连杆后悬架，同级操控标杆，四驱版零百 3.8 秒','后排纯平地板可坐三人，540° 全景影像，家庭场景配置齐全'],pdfPath:'assets/课件：MG7 25款上市培训.pdf',videoLabel:'MG4 核心卖点解析',videoDuration:'4分钟' },
  'range': { materialId:'range',title:'今日学习' }
};
var LEARN_DEFAULT_MATERIAL = 'mg7';

// ====== 推荐资料（3 组 × 各 2 条） ======
var RANGE_RECOMMENDED = [
  { id:'r1',type:'PDF', title:'车辆续航里程官方标准答复话术', tags:['续航','标准话术'], group:'系统推荐', date:'06-24',
    summary:'官方标准话术模板，涵盖CLTC续航定义、电池容量换算、同价位对比核心数据，直接用于客户答疑。', pdfPath:'assets/课件：MG7 25款上市培训.pdf' },
  { id:'r2',type:'视频',title:'客户质疑续航时异议处理教学',     tags:['续航','异议处理'], group:'系统推荐', date:'06-24',
    summary:'针对续航虚标、冬天跑不远等高频质疑，逐帧拆解正确回应方式和话术节奏，学完即用。', videoLabel:'客户质疑续航时异议处理教学',videoDuration:'5分钟' },
  { id:'r3',type:'课程',title:'新款车型电池与续航全知识点讲解', tags:['MG4','续航'],       group:'总部定向', date:'06-23',
    summary:'MG4电池包结构、CTB一体化技术、热管理策略、CLTC 537km达成逻辑，从技术到卖点完整链路。', pdfPath:'assets/课件：MG7 25款上市培训.pdf' },
  { id:'r4',type:'课程',title:'新能源车型销售合规培训',         tags:['新能源','销售合规'], group:'总部定向', date:'06-22',
    summary:'新能源车宣传合规要点，续航数据引用规范、对比广告注意事项、客户承诺边界清晰界定。', pdfPath:'assets/课件：MG7 25款上市培训.pdf' },
  { id:'r5',type:'PDF', title:'到店客户纠结续航的逼单实战案例', tags:['续航','逼单实战'],   group:'店长内训', date:'06-22',
    summary:'真实案例还原：客户三次纠结续航，销售通过场景置换+数据对比+试驾体验组合拳当场成交。', pdfPath:'assets/课件：MG7 25款上市培训.pdf' },
  { id:'r6',type:'视频',title:'打消顾客续航焦虑的接待技巧',     tags:['续航','接待技巧'],   group:'店长内训', date:'06-21',
    summary:'从接待第一句话到试驾路线设计，全程展示如何用体验替代解释，让续航不再成为成交阻力。', videoLabel:'打消顾客续航焦虑的接待技巧',videoDuration:'3分钟' }
];

// ====== 分类浏览 ======
var RANGE_CATEGORIES = ['产品知识','销售话术','销售流程','竞品对比','活动营销','金融保险','门店管理','客户管理','新人入职','合规制度'];
var RANGE_SIDEBAR = ['今日重点'].concat(RANGE_CATEGORIES);

var RANGE_BROWSE = [
  { id:'b1', title:'MG4 产品核心卖点讲解',         cat:'产品知识', type:'PDF',  learners:45  },
  { id:'b2', title:'MG7 新品上市资料',              cat:'产品知识', type:'PDF',  learners:128 },
  { id:'b3', title:'MG Cyberster 展厅接待攻略',     cat:'产品知识', type:'PPT',  learners:36  },
  { id:'b4', title:'MG ES5 家庭用车场景讲解',       cat:'产品知识', type:'视频', learners:89  },
  { id:'b5', title:'新能源三电技术解读',             cat:'产品知识', type:'PPT',  learners:67  },
  { id:'b6', title:'留资开口标准话术要点',           cat:'销售话术', type:'PDF',  learners:156 },
  { id:'b7', title:'试驾后跟进回访话术',             cat:'销售话术', type:'Word', learners:98  },
  { id:'b8', title:'砍价型客户应对技巧',             cat:'销售话术', type:'视频', learners:134 },
  { id:'b9', title:'MG3 价格异议处理话术',           cat:'销售话术', type:'PPT',  learners:72  },
  { id:'b10',title:'成交逼单话术实战',               cat:'销售话术', type:'视频', learners:189 },
  { id:'b11',title:'试驾邀约标准流程',               cat:'销售流程', type:'PDF',  learners:112 },
  { id:'b12',title:'交车仪式标准流程',               cat:'销售流程', type:'视频', learners:87  },
  { id:'b13',title:'展厅接待服务规范',               cat:'销售流程', type:'PPT',  learners:93  },
  { id:'b14',title:'MG7 竞品对比话术实战',           cat:'竞品对比', type:'视频', learners:105 },
  { id:'b15',title:'新能源 vs 燃油车深度对比',       cat:'竞品对比', type:'PPT',  learners:78  },
  { id:'b16',title:'MG4 vs 比亚迪秦 PLUS 对比',      cat:'竞品对比', type:'Word', learners:143 },
  { id:'b17',title:'26年国庆大促活动方案',           cat:'活动营销', type:'PDF',  learners:56  },
  { id:'b18',title:'双11购车节促销手册',             cat:'活动营销', type:'PPT',  learners:44  },
  { id:'b19',title:'春季新品发布执行手册',           cat:'活动营销', type:'PDF',  learners:31  },
  { id:'b20',title:'金融方案推荐技巧',               cat:'金融保险', type:'PPT',  learners:68  },
  { id:'b21',title:'置换补贴政策解读',               cat:'金融保险', type:'Word', learners:55  },
  { id:'b22',title:'分期计算与贷款方案介绍',         cat:'金融保险', type:'视频', learners:72  },
  { id:'b23',title:'展厅陈列规范与5S标准',           cat:'门店管理', type:'PDF',  learners:41  },
  { id:'b24',title:'客户接待流程管理规定',           cat:'门店管理', type:'Word', learners:38  },
  { id:'b25',title:'数据报表分析指南',               cat:'门店管理', type:'PPT',  learners:29  },
  { id:'b26',title:'客户分级与跟进策略',             cat:'客户管理', type:'PDF',  learners:84  },
  { id:'b27',title:'售后回访与客户维系',             cat:'客户管理', type:'视频', learners:76  },
  { id:'b28',title:'品牌文化与基础产品知识',         cat:'新人入职', type:'PDF',  learners:320 },
  { id:'b29',title:'门店管理制度学习手册',           cat:'新人入职', type:'Word', learners:280 },
  { id:'b30',title:'个人信息保护合规要点',           cat:'合规制度', type:'PDF',  learners:52  },
  { id:'b31',title:'广告法合规宣传规范',             cat:'合规制度', type:'Word', learners:48  }
];

var RANGE_BROWSE_KP = {
  'b1':['MG4 搭载第二代半固态电池，CLTC 续航 537km，化解客户续航焦虑最硬的一张牌','XDS 弯道动态控制系统为同级独有配置，弯道极限提升 12%，客户提操控时直接演示','后排纯平地板 + 540° 全景影像，面对家庭客户时从安全与空间两个维度切入'],
  'b2':['MG7 采用参数化主动进气格栅 + 无框车门 + 溜背造型，风阻系数 0.24Cd','车机芯片为高通骁龙 8155，支持无线 CarPlay 与 Android Auto','半固态电池版续航 537km，CTB 电池车身一体化结构，兼顾安全与操控'],
  'b6':['留资开口的核心时机在试驾后 3 分钟内，趁客户体验感最强时自然过渡','开口话术避免「你留个电话吧」的生硬表达，改用「我把今天的试驾对比数据发您」','针对不同客户类型准备差异化开口'],
  'b10':['识别成交信号：客户开始讨论颜色、提车时间、上牌细节时，已经进入购买状态','逼单不是施压而是帮客户做决定：总结关注点→确认需求→给出行动建议','二选一法则：「您是选白色还是灰色？」比「您买不买？」成交率高 3 倍'],
  'b15':['半固态电池安全性与循环寿命优于传统锂电池，应对「电池不安全」质疑的核心武器','MG4 后驱平台对比同级前驱车型，操控质感不是一个级别','油电使用成本：每年 2 万公里，MG4 充电约 2800 元，同级燃油约 12000 元'],
  'b28':['MG 品牌始于 1924 年英国牛津，百年运动基因是品牌故事的核心','上汽全球研发体系，核心技术自主可控，消除客户对新能源品牌的顾虑','记住 3 个品牌关键词：运动基因、全球品质、智能科技']
};

// ====== CSS ======
var LEARN_CSS = '' +
'<style>' +
'  :root{' +
'    --lr-blue:#1677FF;--lr-blue-light:#EAF2FF;--lr-bg:#EBEFF5;--lr-ink:#1D2129;' +
'    --lr-text:#4E5969;--lr-muted:#8A94A6;--lr-line:#EDF0F5;--lr-white:#FFFFFF;' +
'    --lr-purple:#6357DC;--lr-gold:#E8920A;--lr-time:#AEB6C2;' +
'    --lr-font:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;' +
'  }' +
  // 基础 learn-page
'  .learn-page{width:375px;min-height:100vh;margin:0 auto;background:var(--lr-bg);display:flex;flex-direction:column;position:relative;font-family:var(--lr-font);-webkit-font-smoothing:antialiased;}' +
'  .learn-status-bar{display:flex;justify-content:space-between;align-items:center;padding:13px 26px 5px;font-size:15px;font-weight:600;color:var(--lr-ink);flex-shrink:0;}' +
'  .learn-status-icons{display:flex;gap:6px;align-items:center;}' +
'  .learn-nav{display:flex;align-items:center;padding:2px 14px 10px;gap:6px;flex-shrink:0;}' +
'  .learn-nav-back{display:flex;align-items:center;justify-content:center;width:28px;height:28px;cursor:pointer;background:none;border:none;padding:0;}' +
'  .learn-nav-title{font-size:17px;font-weight:600;color:var(--lr-ink);line-height:1.3;flex:1;text-align:center;padding-right:28px;}' +
'  .learn-scroll{flex:1;overflow-y:auto;padding:0 16px 20px;display:flex;flex-direction:column;}' +
'  .learn-scroll::-webkit-scrollbar{display:none;}' +
  // 原有详情页样式
'  .learn-summary-card{background:var(--lr-white);border-radius:14px;padding:18px 16px;margin-bottom:14px;}' +
'  .learn-summary-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;}' +
'  .learn-summary-icon{width:22px;height:22px;background:#FFF7E6;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}' +
'  .learn-summary-label{font-size:15px;font-weight:600;color:var(--lr-ink);}' +
'  .learn-summary-badge{font-size:11px;color:#FA8C16;background:#FFF7E6;padding:2px 8px;border-radius:10px;font-weight:500;margin-left:auto;}' +
'  .learn-summary-points{display:flex;flex-direction:column;gap:10px;}' +
'  .learn-summary-point{display:flex;align-items:flex-start;gap:8px;font-size:14px;line-height:1.5;color:var(--lr-muted);}' +
'  .learn-summary-dot{width:5px;height:5px;border-radius:50%;background:var(--lr-blue);flex-shrink:0;margin-top:7px;}' +
'  .learn-section-card{background:var(--lr-white);border-radius:14px;padding:18px 16px;margin-bottom:14px;}' +
'  .learn-section-title{font-size:15px;font-weight:600;color:var(--lr-ink);margin-bottom:12px;}' +
'  .learn-pdf-embed{width:100%;height:420px;border:1px solid var(--lr-line);border-radius:10px;background:#fafafa;}' +
'  .learn-bottom-bar{padding:0 16px 20px;flex-shrink:0;}' +
'  .learn-btn-primary{display:block;width:100%;padding:14px 0;text-align:center;font-size:16px;font-weight:600;color:#fff;background:var(--lr-blue);border:none;border-radius:12px;letter-spacing:.4px;cursor:pointer;font-family:inherit;}' +
'  .learn-home-indicator{width:134px;height:4px;background:var(--lr-ink);border-radius:100px;flex-shrink:0;opacity:.14;margin:8px auto 10px;}' +
'' +
  /* ═══════════ 今日学习页 ═══════════ */
'  .learn-page.today-page{background:var(--lr-bg);}' +
'' +
  /* 顶部导航 52px */
'  .t-nav{display:flex;align-items:center;justify-content:center;height:52px;padding:0 16px;position:relative;flex-shrink:0;border-bottom:1px solid var(--lr-line);}' +
'  .t-nav-back{position:absolute;left:14px;background:none;border:none;font-size:20px;color:var(--lr-muted);cursor:pointer;padding:4px;line-height:1;font-family:var(--lr-font);}' +
'  .t-nav-back:active{opacity:.6;}' +
'  .t-nav-title{font-size:18px;font-weight:700;color:var(--lr-ink);}' +
'' +
  /* 两栏 */
'  .t-body{flex:1;display:flex;overflow:hidden;}' +
'' +
  /* 左栏 90px */
'  .t-side{width:90px;flex-shrink:0;background:#FAFBFD;border-right:1px solid var(--lr-line);overflow-y:auto;scrollbar-width:none;padding:2px 0;}' +
'  .t-side::-webkit-scrollbar{display:none;}' +
'  .t-side-tab{display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;padding:15px 4px;font-size:13.5px;color:var(--lr-muted);text-align:center;line-height:1.25;border:none;background:none;cursor:pointer;font-family:var(--lr-font);position:relative;border-left:3px solid transparent;transition:color .12s;}' +
'  .t-side-tab:active{opacity:.7;}' +
  // 今日重点——选中态（默认）
'  .t-side-tab.focus{font-weight:700;color:var(--lr-blue);background:var(--lr-blue-light);border-left-color:var(--lr-blue);}' +
  // 角标
'  .t-side-badge{position:absolute;top:6px;right:10px;min-width:16px;height:16px;border-radius:8px;background:var(--lr-blue);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 5px;line-height:1;}' +
'' +
  /* 右栏 */
'  .t-main{flex:1;overflow-y:auto;scrollbar-width:none;padding:4px 12px 24px;-webkit-overflow-scrolling:touch;}' +
'  .t-main::-webkit-scrollbar{display:none;}' +
'' +
  /* 分组标题 + 来源色点 */
'  .t-group-label{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:var(--lr-text);padding:14px 0 10px 2px;}' +
'  .t-group-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}' +
'  .t-group-dot.blue{background:var(--lr-blue);}' +
'  .t-group-dot.purple{background:var(--lr-purple);}' +
'  .t-group-dot.gold{background:var(--lr-gold);}' +
'' +
  /* 资料卡片 */
'  .t-card{background:var(--lr-white);border-radius:14px;padding:14px;margin-bottom:11px;box-shadow:0 4px 16px rgba(27,67,140,.06);cursor:pointer;transition:box-shadow .12s,transform .12s;}' +
'  .t-card:active{box-shadow:0 2px 8px rgba(27,67,140,.08);transform:scale(.99);}' +
'  .t-card-row1{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px;}' +
'  .t-card-title{font-size:15.5px;font-weight:600;color:var(--lr-ink);line-height:1.45;flex:1;min-width:0;}' +
'  .t-card-arrow{color:#CCD3DE;font-size:18px;flex-shrink:0;margin-top:1px;}' +
'  .t-card-row2{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}' +
'  .t-card-row3{font-size:11px;color:var(--lr-time);}' +
'' +
  /* 标签 */
'  .t-tag{display:inline-flex;align-items:center;font-size:11.5px;padding:3px 7px;border-radius:6px;white-space:nowrap;line-height:1;}' +
'  .t-tag-type{font-weight:600;}' +
'  .t-tag-type.pdf{color:#F2562F;background:#FFEDE8;}' +
'  .t-tag-type.video{color:var(--lr-blue);background:var(--lr-blue-light);}' +
'  .t-tag-type.course{color:var(--lr-purple);background:#EEEDFB;}' +
'  .t-tag-type.ppt{color:var(--lr-gold);background:#FFF8E8;}' +
'  .t-tag-type.word{color:#0E8C6A;background:#E8F8F3;}' +
'  .t-tag-topic{font-weight:400;color:#6B7585;background:#F2F5FA;}' +
'' +
  /* 分类浏览卡片 */
'  .t-card-count{font-size:11px;color:var(--lr-muted);}' +
'  .t-empty{text-align:center;padding:48px 16px;font-size:13px;color:var(--lr-muted);}' +
'' +
  /* 详情浮层 */
'  .t-overlay{position:absolute;inset:0;z-index:80;background:var(--lr-bg);transform:translateX(105%);transition:transform .32s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;overflow:hidden;}' +
'  .t-overlay.open{transform:translateX(0);}' +
'  .t-overlay-head{display:flex;align-items:center;justify-content:center;height:52px;padding:0 16px;position:relative;background:var(--lr-white);border-bottom:1px solid var(--lr-line);flex-shrink:0;}' +
'  .t-overlay-back{position:absolute;left:14px;background:none;border:none;font-size:20px;color:var(--lr-muted);cursor:pointer;padding:4px;line-height:1;font-family:var(--lr-font);}' +
'  .t-overlay-back:active{opacity:.6;}' +
'  .t-overlay-title{font-size:18px;font-weight:700;color:var(--lr-ink);max-width:270px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}' +
'  .t-overlay-body{flex:1;overflow-y:auto;padding:14px;-webkit-overflow-scrolling:touch;}' +
'  .t-overlay-body::-webkit-scrollbar{display:none;}' +
'' +
'  .t-summary{background:var(--lr-white);border-radius:14px;padding:18px 16px;margin-bottom:14px;box-shadow:0 4px 16px rgba(27,67,140,.06);}' +
'  .t-summary-head{display:flex;align-items:center;gap:8px;margin-bottom:12px;}' +
'  .t-summary-icon{width:22px;height:22px;background:#FFF7E6;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}' +
'  .t-summary-label{font-size:15px;font-weight:600;color:var(--lr-ink);}' +
'  .t-summary-text{font-size:14px;line-height:1.7;color:var(--lr-text);}' +
'' +
'  .t-kp{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--lr-line);font-size:13px;line-height:1.65;}' +
'  .t-kp:last-child{border-bottom:none;}' +
'  .t-kp-num{flex-shrink:0;width:20px;height:20px;background:var(--lr-blue-light);color:var(--lr-blue);border-radius:50%;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px;}' +
'  .t-kp-text{color:var(--lr-text);}' +
'' +
'  .t-content{background:var(--lr-white);border-radius:14px;padding:18px 16px;margin-bottom:14px;box-shadow:0 4px 16px rgba(27,67,140,.06);}' +
'  .t-content-title{font-size:15px;font-weight:600;color:var(--lr-ink);margin-bottom:12px;}' +
'  .t-pdf{width:100%;height:420px;border:1px solid var(--lr-line);border-radius:10px;background:#fafafa;}' +
'  .t-video{width:100%;border-radius:10px;overflow:hidden;background:#1a1a2e;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;}' +
'  .t-video-inner{display:flex;flex-direction:column;align-items:center;gap:10px;color:#fff;}' +
'  .t-video-play{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;border:1.5px solid rgba(255,255,255,.3);cursor:pointer;}' +
'  .t-video-label{font-size:13px;font-weight:500;opacity:.85;}' +
'' +
'  .t-done-btn{display:block;width:100%;padding:14px 0;margin-top:4px;margin-bottom:14px;text-align:center;font-size:16px;font-weight:600;color:#fff;background:linear-gradient(135deg,#2E8FFF,var(--lr-blue));border:none;border-radius:13px;box-shadow:0 6px 16px rgba(22,119,255,.28);cursor:pointer;font-family:var(--lr-font);transition:transform .12s,box-shadow .12s;}' +
'  .t-done-btn:active{transform:translateY(1px) scale(.985);box-shadow:0 3px 10px rgba(22,119,255,.22);}' +
'' +
  /* 完成浮层 */
'  .t-finish{position:absolute;inset:0;z-index:100;background:rgba(11,17,33,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;opacity:0;pointer-events:none;transition:opacity .4s ease;}' +
'  .t-finish.show{opacity:1;pointer-events:auto;}' +
'  .t-finish-stars{font-size:48px;margin-bottom:16px;letter-spacing:4px;}' +
'  .t-finish-title{font-size:22px;font-weight:700;color:#fff;margin-bottom:8px;}' +
'  .t-finish-sub{font-size:14px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:32px;}' +
'  .t-finish-btn{width:100%;max-width:280px;height:48px;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(135deg,#2E8FFF,var(--lr-blue));border:none;border-radius:13px;box-shadow:0 6px 16px rgba(22,119,255,.28);cursor:pointer;font-family:var(--lr-font);}' +
'  .t-finish-btn:active{transform:scale(.98);}' +
'</style>';

// ====== SVG ======
var LEARN_BACK_SVG = '<svg width="9" height="16" viewBox="0 0 9 16"><path d="M7.5 1L1 8l6.5 7" stroke="#007AFF" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var LEARN_SIGNAL_SVG = '<svg width="15" height="10" viewBox="0 0 15 10"><rect x="0" y="5" width="2" height="5" rx="0.5" fill="#1c1c1e"/><rect x="3.5" y="3" width="2" height="7" rx="0.5" fill="#1c1c1e"/><rect x="7" y="1" width="2" height="9" rx="0.5" fill="#1c1c1e"/><rect x="10.5" y="0" width="2" height="10" rx="0.5" fill="#1c1c1e"/></svg>';
var LEARN_BATT_SVG = '<svg width="15" height="11" viewBox="0 0 15 11"><rect x="0" y="0" width="13" height="11" rx="2.5" fill="none" stroke="#1c1c1e" stroke-width="1"/><rect x="1.5" y="1.5" width="3" height="8" rx="0.5" fill="#1c1c1e"/><rect x="5.5" y="1.5" width="3" height="8" rx="0.5" fill="#1c1c1e"/><rect x="9.5" y="1.5" width="3" height="8" rx="0.5" fill="#1c1c1e"/><rect x="13.5" y="3" width="1.8" height="5" rx="0.9" fill="#1c1c1e" opacity="0.25"/></svg>';

// ====== 状态 ======
var _tab = '今日重点';

function getLearnMaterial(mid) { return LEARN_MATERIALS[mid] || LEARN_MATERIALS[LEARN_DEFAULT_MATERIAL]; }
function tTc(t) { var m={'PDF':'pdf','视频':'video','课程':'course','PPT':'ppt','Word':'word'}; return m[t]||'pdf'; }

// ====== 导航 ======
window.learnGoBack = function() { window.location.href = '成交教练-phase1-v5.html'; };
window.learnMarkComplete = function(mid) {
  var c = sessionStorage.getItem('learn_completed') || '';
  var ids = c ? c.split(',').map(function(s){return s.trim();}).filter(Boolean) : [];
  if (ids.indexOf(mid) === -1) { ids.push(mid); sessionStorage.setItem('learn_completed', ids.join(',')); }
  window.location.hash = 'sales-coach-new';
};

// ====== 侧边栏 ======
window.tSelect = function(tab) { _tab = tab; tRender(); tUpdateSide(); };
function tUpdateSide() {
  var els = document.querySelectorAll('.t-side-tab');
  els.forEach(function(el){ el.classList.toggle('focus', el.textContent.trim().replace(/[0-9]/g,'') === _tab); });
}

// ====== 渲染内容 ======
function tRender() {
  var ct = document.getElementById('tMain'); if (!ct) return;
  var h = '';

  if (_tab === '今日重点') {
    var groups = [
      { label:'系统推荐', dotClass:'blue', items:RANGE_RECOMMENDED.filter(function(r){return r.group==='系统推荐';}) },
      { label:'总部定向', dotClass:'purple',items:RANGE_RECOMMENDED.filter(function(r){return r.group==='总部定向';}) },
      { label:'店长内训', dotClass:'gold',  items:RANGE_RECOMMENDED.filter(function(r){return r.group==='店长内训';}) }
    ];
    groups.forEach(function(g){
      if (!g.items.length) return;
      h += '<div class="t-group-label"><span class="t-group-dot '+g.dotClass+'"></span>'+g.label+'</div>';
      g.items.forEach(function(it){ h += tRecCard(it); });
    });
  } else {
    var list = RANGE_BROWSE.filter(function(m){return m.cat===_tab;});
    if (!list.length) { h += '<div class="t-empty">暂无资料</div>'; }
    else { list.forEach(function(m){ h += tBrowseCard(m); }); }
  }

  ct.innerHTML = h;
}

// 推荐卡片（无来源标签，最多 2 个主题标签）
function tRecCard(it) {
  var tc = tTc(it.type);
  var topicTags = it.tags.slice(0, 2);
  var h = '<div class="t-card" onclick="window.tOpenRec(\''+it.id+'\')">';
  h += '<div class="t-card-row1"><span class="t-card-title">'+it.title+'</span><span class="t-card-arrow">›</span></div>';
  h += '<div class="t-card-row2"><span class="t-tag t-tag-type '+tc+'">'+it.type+'</span>';
  for (var i=0;i<topicTags.length;i++) h += '<span class="t-tag t-tag-topic">'+topicTags[i]+'</span>';
  h += '</div>';
  h += '<div class="t-card-row3">'+it.date+' 更新</div>';
  h += '</div>';
  return h;
}

// 浏览卡片
function tBrowseCard(m) {
  var tc = tTc(m.type);
  var h = '<div class="t-card" onclick="window.tOpenBrowse(\''+m.id+'\')">';
  h += '<div class="t-card-row1"><span class="t-card-title">'+m.title+'</span><span class="t-card-arrow">›</span></div>';
  h += '<div class="t-card-row2"><span class="t-tag t-tag-type '+tc+'">'+m.type+'</span></div>';
  h += '<div class="t-card-row3"><span class="t-card-count">'+m.learners+' 人已学</span></div>';
  h += '</div>';
  return h;
}

// ====== 详情 ======
window.tOpenRec = function(rid) {
  var it = RANGE_RECOMMENDED.find(function(r){return r.id===rid;}); if (!it) return;
  document.getElementById('tOverlayTitle').textContent = it.title;
  var b = '';
  b += '<div class="t-summary"><div class="t-summary-head"><span class="t-summary-icon">⚡</span><span class="t-summary-label">1 分钟重点提炼</span></div><div class="t-summary-text">'+it.summary+'</div></div>';
  if (it.type==='视频' && it.videoLabel) {
    b += '<div class="t-content"><div class="t-content-title">视频讲解</div><div class="t-video"><div class="t-video-inner"><div class="t-video-play"><svg width="18" height="20" viewBox="0 0 18 20"><path d="M0 0l18 10L0 20z" fill="#fff"/></svg></div><span class="t-video-label">'+it.videoLabel+' · '+it.videoDuration+'</span></div></div></div>';
  } else if (it.pdfPath) {
    b += '<div class="t-content"><div class="t-content-title">课件文档</div><iframe class="t-pdf" src="'+it.pdfPath+'#toolbar=0&navpanes=0" frameborder="0"></iframe></div>';
  }
  b += '<button class="t-done-btn" onclick="window.tMarkDone()">我学完了</button>';
  document.getElementById('tOverlayBody').innerHTML = b;
  document.getElementById('tOverlay').classList.add('open');
};

window.tOpenBrowse = function(mid) {
  var m = RANGE_BROWSE.find(function(it){return it.id===mid;}); if (!m) return;
  document.getElementById('tOverlayTitle').textContent = m.title;
  var kps = RANGE_BROWSE_KP[mid]; var b = '';
  if (kps && kps.length) {
    b += '<div class="t-summary"><div class="t-summary-head"><span class="t-summary-icon">⚡</span><span class="t-summary-label">成交教练为你提炼以下重点</span></div>';
    for (var i=0;i<kps.length;i++) b += '<div class="t-kp"><span class="t-kp-num">'+(i+1)+'</span><span class="t-kp-text">'+kps[i]+'</span></div>';
    b += '</div>';
  }
  b += '<div class="t-content"><div class="t-content-title">原始资料</div><iframe class="t-pdf" src="assets/课件：MG7 25款上市培训.pdf#toolbar=0&navpanes=0" frameborder="0"></iframe></div>';
  b += '<button class="t-done-btn" onclick="window.tMarkDone()">我学完了</button>';
  document.getElementById('tOverlayBody').innerHTML = b;
  document.getElementById('tOverlay').classList.add('open');
};

window.tCloseOverlay = function() { document.getElementById('tOverlay').classList.remove('open'); };
window.tMarkDone = function() { document.getElementById('tFinish').classList.add('show'); };
window.tExitFinish = function() { document.getElementById('tFinish').classList.remove('show'); document.getElementById('tOverlay').classList.remove('open'); };

// ====== 主渲染 ======
function renderLearnPage() {
  var subPage = window.__currentSubPage__ || LEARN_DEFAULT_MATERIAL;
  var material = getLearnMaterial(subPage);
  var html = LEARN_CSS;
  var isToday = (subPage === 'range');

  if (isToday) {
    var recCount = RANGE_RECOMMENDED.length;
    html += '<div class="learn-page today-page">';
    // 导航 52px
    html += '<div class="t-nav"><button class="t-nav-back" onclick="window.learnGoBack()">←</button><span class="t-nav-title">'+material.title+'</span></div>';
    // 两栏
    html += '<div class="t-body">';
    // 左栏
    html += '<div class="t-side">';
    for (var i=0;i<RANGE_SIDEBAR.length;i++) {
      var tab = RANGE_SIDEBAR[i];
      var focusCls = tab === _tab ? ' focus' : '';
      html += '<button class="t-side-tab'+focusCls+'" onclick="window.tSelect(\''+tab+'\')">';
      html += tab;
      if (tab === '今日重点') html += '<span class="t-side-badge">'+recCount+'</span>';
      html += '</button>';
    }
    html += '</div>';
    // 右栏
    html += '<div class="t-main" id="tMain"></div>';
    html += '</div>'; // .t-body

    // 详情浮层
    html += '<div class="t-overlay" id="tOverlay"><div class="t-overlay-head"><button class="t-overlay-back" onclick="window.tCloseOverlay()">←</button><span class="t-overlay-title" id="tOverlayTitle">详情</span></div><div class="t-overlay-body" id="tOverlayBody"></div></div>';
    // 完成浮层
    html += '<div class="t-finish" id="tFinish"><div class="t-finish-stars">⭐</div><div class="t-finish-title">学完了</div><div class="t-finish-sub">已获得 1 颗星<br>继续加油</div><button class="t-finish-btn" onclick="window.tExitFinish()">返回列表</button></div>';

    html += '</div>'; // .learn-page
    setTimeout(function(){ tRender(); }, 0);
    return html;
  }

  // ── MG 培训详情页 ──
  html += '<div class="learn-page">';
  html += '<div class="learn-status-bar"><span>9:41</span><span class="learn-status-icons">'+LEARN_SIGNAL_SVG+LEARN_BATT_SVG+'</span></div>';
  html += '<div class="learn-nav"><button class="learn-nav-back" onclick="window.learnGoBack()">'+LEARN_BACK_SVG+'</button><span class="learn-nav-title">'+material.title+'</span></div>';
  html += '<div class="learn-scroll">';
  html += '<div class="learn-summary-card"><div class="learn-summary-header"><span class="learn-summary-icon">⚡</span><span class="learn-summary-label">1 分钟概要解读</span><span class="learn-summary-badge">约 1 分钟</span></div><div class="learn-summary-points">';
  for (var i=0;i<material.summaryPoints.length;i++) html += '<div class="learn-summary-point"><span class="learn-summary-dot"></span><span>'+material.summaryPoints[i]+'</span></div>';
  html += '</div></div>';
  html += '<div class="learn-section-card"><div class="learn-section-title">课件</div><embed class="learn-pdf-embed" src="'+material.pdfPath+'#toolbar=0&navpanes=0" type="application/pdf"></div>';
  html += '</div>';
  html += '<div class="learn-bottom-bar"><button class="learn-btn-primary" onclick="window.learnMarkComplete(\''+material.materialId+'\')">我学完了</button></div>';
  html += '<div class="learn-home-indicator"></div>';
  html += '</div>';
  return html;
}

Router.register('learn', renderLearnPage);
