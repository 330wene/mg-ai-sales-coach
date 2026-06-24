/**
 * 学一学详情页 — 导读页（A） + 原材料页（B）
 * 路由：#study-<materialId>-intro → A 页
 *       #study-<materialId>-content[-<sectionId>] → B 页
 */

// ====== Mock 数据 ======
var STUDY_MATERIALS = {
  'mg7-new-launch': {
    materialId: 'mg7-new-launch',
    title: 'MG7 新品上市资料',
    estimatedMinutes: 6,
    globalReason: '基于你本月需求挖掘、静态讲解两处薄弱，为你选了 3 个重点学习',
    keyPoints: [
      {
        id: 'kp1',
        content: '半固态电池版续航 537km，化解「担心续航」最硬的一张牌',
        reason: { level: 'personal', text: '上月 3 位客户问到续航，这条能直接接住' },
        sectionId: 'powertrain',
        paragraphId: 'powertrain-p1'
      },
      {
        id: 'kp2',
        content: 'XDS 弯道控制是同级独有，客户提操控时直接演示弯道模式',
        reason: { level: 'personal', text: '上周两位运动型客户聊到操控，这条是现成的演示话术' },
        sectionId: 'powertrain',
        paragraphId: 'powertrain-p2'
      },
      {
        id: 'kp3',
        content: '家庭场景卖点：后排纯平地板 + 540° 影像',
        reason: { level: 'personal', text: '昨天那位「给家里人开」的客户，正好用得上' },
        sectionId: 'family',
        paragraphId: 'family-p1'
      }
      // 附：store 级别示例 — 文案不出现"你"字，样式同 personal
      // {
      //   id: 'kp-store-demo',
      //   content: '半固态电池版续航 537km，化解「担心续航」最硬的一张牌',
      //   reason: { level: 'store', text: '本店客户上月问得最多的就是续航' },
      //   sectionId: 'powertrain',
      //   paragraphId: 'powertrain-p1'
      // },
      // 附：none 级别示例 — 不渲染理由行，知识点只显示标题
      // {
      //   id: 'kp-none-demo',
      //   content: '参数化格栅与无框车门构成运动化外观',
      //   reason: { level: 'none', text: '' },
      //   sectionId: 'design',
      //   paragraphId: 'design-p1'
      // }
    ],
    sections: [
      {
        id: 'design',
        order: 1,
        name: '设计亮点',
        summary: '参数化格栅与无框车门构成运动化外观，四种车色覆盖年轻审美',
        isKey: false,
        paragraphs: [
          { id: 'design-p1', text: 'MG7 采用参数化主动进气格栅，配合无框车门与溜背造型，风阻系数低至 0.24Cd。前脸采用封闭式设计，贯穿式日行灯搭配分体式大灯，辨识度极高。提供四种车色选择：极光白、星云灰、幻影蓝、烈焰红，其中幻影蓝为广告色，最受年轻客户欢迎。' },
          { id: 'design-p2', text: '车身侧面线条凌厉，上扬的腰线从前翼子板延伸至尾灯，营造俯冲姿态。18 寸双色轮毂为全系标配。' }
        ]
      },
      {
        id: 'cockpit',
        order: 2,
        name: '智能座舱',
        summary: '手车互联打通微信抖音，小布语音支持连续多轮对话',
        isKey: false,
        paragraphs: [
          { id: 'cockpit-p1', text: '搭载 12.3 英寸全液晶仪表 + 15.6 英寸中控大屏，车机芯片为高通骁龙 8155，操作流畅无卡顿。支持无线 Apple CarPlay 与 Android Auto，上车自动连接。' },
          { id: 'cockpit-p2', text: '小布语音助手支持连续对话与四音区识别，可控制导航、空调、车窗、音乐等全车功能。系统支持 OTA 远程升级，每季度推送新功能。' }
        ]
      },
      {
        id: 'powertrain',
        order: 3,
        name: '动力与续航',
        summary: '半固态电池 CLTC 续航 537km，CTB 结构兼顾安全与操控',
        isKey: true,
        paragraphs: [
          { id: 'powertrain-p1', text: '半固态电池版搭载上汽与宁德时代联合研发的第二代半固态电池，CLTC 续航 537km，能量密度较上一代提升 15%。采用 CTB（Cell to Body）电池车身一体化结构，电池包直接融入底盘，不侵占车内空间。' },
          { id: 'powertrain-p2', text: '全系标配 XDS 弯道动态控制系统，同级独有的过弯辅助技术，通过内侧车轮主动制动抑制转向不足，弯道极限提升 12%。后驱版百公里加速 6.5 秒，四驱版 3.8 秒。' }
        ]
      },
      {
        id: 'family',
        order: 4,
        name: '家庭场景配置',
        summary: '后排纯平地板可坐三人，540° 影像让新手与家人更安心',
        isKey: true,
        paragraphs: [
          { id: 'family-p1', text: '后排纯平地板设计，无中央隆起，中间座位可正常乘坐三人。轴距 2705mm，后排膝部空间达到 820mm，同级领先。' },
          { id: 'family-p2', text: '540° 全景影像系统含透明底盘功能，可查看车辆底部路面情况，新手与家人驾驶更安心。全车配备 ISOFIX 儿童座椅接口（后排左右两侧），后排独立空调出风口及双 USB 充电口。' },
          { id: 'family-p3', text: '后备箱标准容积 398L，放倒后排座椅可扩展至 1210L，满足家庭出行需求。' }
        ]
      }
    ],
    afterStudyHook: {
      subtitle: '正好，你昨天有位「给家里人开」的客户',
      practiceRoute: '/practice/placeholder'
    }
  },

  'mg4-new-launch': {
    materialId: 'mg4-new-launch',
    title: 'MG4 新品上市资料',
    estimatedMinutes: 12,
    sections: [
      {
        id: 'powertrain',
        order: 1,
        name: '动力与续航',
        summary: '半固态电池 CLTC 续航 537km，CTB 结构兼顾安全与操控',
        isKey: true,
        coachReason: '这个月 3 个客户问续航，你都没接住。',
        paragraphs: [
          { id: 'powertrain-p1', text: 'MG4 搭载上汽与宁德时代联合研发的第二代半固态电池，CLTC 续航 537km，能量密度较上一代提升 15%。采用 CTB（Cell to Body）电池车身一体化结构，电池包直接融入底盘，不侵占车内空间，同时提升车身扭转刚度。' },
          { id: 'powertrain-p2', text: '后驱版百公里加速 6.5 秒，四驱高性能版 3.8 秒。全系标配 XDS 弯道动态控制系统，通过内侧车轮主动制动抑制转向不足，弯道极限提升 12%，同级独有配置。' }
        ]
      },
      {
        id: 'family',
        order: 2,
        name: '家庭场景配置',
        summary: '后排纯平地板可坐三人，540° 影像让新手与家人更安心',
        isKey: true,
        coachReason: '这个月 2 组带孩子来看车的客户，你都没讲到后排和 540° 影像。',
        paragraphs: [
          { id: 'family-p1', text: '后排纯平地板设计，无中央隆起，中间座位可正常乘坐三人。轴距 2705mm，后排膝部空间达到 820mm，同级领先。全车配备 ISOFIX 儿童座椅接口（后排左右两侧），后排独立空调出风口及双 USB 充电口。' },
          { id: 'family-p2', text: '540° 全景影像系统含透明底盘功能，可查看车辆底部路面情况，新手与家人驾驶更安心。后备箱标准容积 398L，放倒后排座椅可扩展至 1210L，满足家庭出行需求。' }
        ]
      },
      {
        id: 'competition',
        order: 3,
        name: '竞品对比要点',
        summary: '与同级三款热门车型的操控、安全配置逐项对照',
        isKey: true,
        coachReason: '竞品应对，这个月你五项里最低的一项。',
        paragraphs: [
          { id: 'competition-p1', text: '与比亚迪海豚相比：MG4 后驱平台操控更优，XDS 弯道控制为同级独有，车身扭转刚度高出 18%。与 AION Y 相比：MG4 半固态电池能量密度更高，CLTC 续航多出 27km，CTB 结构安全性更优。与大众 ID.3 相比：MG4 车机芯片为高通 8155，流畅度与生态丰富度领先，售价低 2-3 万元。' },
          { id: 'competition-p2', text: '竞品应对五步法：听需求、不贬竞品、客观对比、引导体验、确认优势。重点强调 MG4 的后驱驾控、半固态电池安全性和 CTB 结构三大核心差异点。' }
        ]
      },
      {
        id: 'design',
        order: 4,
        name: '外观设计',
        summary: '封闭式前脸与贯穿日行灯构成家族化外观，四种车色可选',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'design-p1', text: 'MG4 采用封闭式前脸设计，贯穿式日行灯搭配分体式大灯，辨识度极高。车身侧面线条凌厉，上扬的腰线从前翼子板延伸至尾灯，营造俯冲姿态。' },
          { id: 'design-p2', text: '提供四种车色选择：极光白、星云灰、幻影蓝、烈焰红，其中幻影蓝为广告色。18 寸双色轮毂为全系标配。' }
        ]
      },
      {
        id: 'cockpit',
        order: 5,
        name: '智能座舱',
        summary: '8155 芯片驱动 15.6 寸中控屏，小布语音支持连续多轮对话',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'cockpit-p1', text: '搭载 12.3 英寸全液晶仪表 + 15.6 英寸中控大屏，车机芯片为高通骁龙 8155，操作流畅无卡顿。支持无线 Apple CarPlay 与 Android Auto。' },
          { id: 'cockpit-p2', text: '小布语音助手支持连续对话与四音区识别，可控制导航、空调、车窗、音乐等全车功能。系统支持 OTA 远程升级。' }
        ]
      },
      {
        id: 'safety',
        order: 6,
        name: '安全配置',
        summary: 'L2+ 级辅助驾驶全系标配，6 安全气囊与 CTB 结构双重防护',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'safety-p1', text: '全系标配 L2+ 级辅助驾驶，含 ACC 自适应巡航、AEB 自动紧急制动、LKA 车道保持、BSD 盲区监测等功能。6 安全气囊为全系标配。' },
          { id: 'safety-p2', text: 'CTB 电池车身一体化结构在碰撞中可吸收更多能量，C-NCAP 五星安全评级，电池包通过针刺、挤压、跌落等 200+ 项安全测试。' }
        ]
      },
      {
        id: 'space',
        order: 7,
        name: '空间与储物',
        summary: '2705mm 轴距带来同级领先的后排空间，21 处储物格',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'space-p1', text: '轴距 2705mm，后排膝部空间 820mm，后排纯平地板可舒适乘坐三人。全车 21 处储物空间，包括门板、中控台、扶手箱等。' },
          { id: 'space-p2', text: '后备箱标准容积 398L，放倒后排座椅可扩展至 1210L。支持 4/6 比例放倒，灵活应对不同装载需求。' }
        ]
      },
      {
        id: 'chassis',
        order: 8,
        name: '底盘与操控',
        summary: '后驱平台 + 五连杆后悬架，同级操控标杆',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'chassis-p1', text: 'MG4 基于上汽星云纯电平台打造，采用后驱布局，前后配重比接近 50:50。后悬架为五连杆独立悬架，同级罕见，过弯支撑与滤震表现均优于扭力梁竞品。' },
          { id: 'chassis-p2', text: '转向系统提供舒适、标准、运动三种模式，最小转弯半径 5.3m，城市调头灵活。四驱版零百加速 3.8 秒，为同级最快。' }
        ]
      },
      {
        id: 'charging',
        order: 9,
        name: '充电与能耗',
        summary: '快充 30-80% 仅需 28 分钟，百公里电耗 12.8kWh',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'charging-p1', text: '支持 150kW 直流快充，30%-80% 充电仅需 28 分钟。家用 7kW 交流慢充 0-100% 约 8 小时。百公里综合电耗 12.8kWh，同级领先。' },
          { id: 'charging-p2', text: '标配 V2L 对外放电功能，最大输出功率 3.3kW，可驱动露营电器。电池包提供 8 年/16 万公里质保。' }
        ]
      },
      {
        id: 'warranty',
        order: 10,
        name: '售后与质保',
        summary: '整车 5 年/10 万公里质保，三电系统 8 年/16 万公里',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'warranty-p1', text: '整车质保 5 年/10 万公里，三电系统（电池、电机、电控）质保 8 年/16 万公里，均高于行业平均水平。首任车主享受终身免费道路救援。' },
          { id: 'warranty-p2', text: '全国 1200+ 服务网点覆盖，首保免费（6 个月/5000 公里），常规保养间隔 12 个月/10000 公里，单次保养费用约 300 元。' }
        ]
      },
      {
        id: 'finance',
        order: 11,
        name: '金融方案',
        summary: '0 首付/低月供/置换补贴三种方案，覆盖不同客户需求',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'finance-p1', text: '提供三种金融方案：0 首付 5 年分期（月供低至 1980 元）、30% 首付 3 年 0 利率、任意品牌置换享 5000 元补贴。金融方案可叠加使用。' },
          { id: 'finance-p2', text: '保险与上牌一站式代办，提车周期 7-15 个工作日，热门车色与配置可能需要 30 天。' }
        ]
      },
      {
        id: 'versions',
        order: 12,
        name: '版本差异',
        summary: '三个版本覆盖 11.98-16.98 万价格带，中配性价比最高',
        isKey: false,
        coachReason: '',
        paragraphs: [
          { id: 'versions-p1', text: '标准版 11.98 万：后驱单电机，CLTC 续航 430km，基础配置齐全。舒适版 13.98 万：后驱单电机，CLTC 续航 537km（半固态电池），新增 540° 影像、前排座椅加热。高性能版 16.98 万：双电机四驱，CLTC 续航 480km，零百加速 3.8 秒。' },
          { id: 'versions-p2', text: '推荐中配舒适版，续航最长、配置均衡，适合大多数家庭用户。高性能版适合对驾控有极致追求的年轻客户。' }
        ]
      }
    ],
    afterStudyHook: {
      subtitle: '正好，你昨天有位客户纠结 MG4 和海豚怎么选',
      practiceRoute: '/practice/placeholder'
    }
  }
};

// ====== 默认 materialId ======
var STUDY_DEFAULT_MATERIAL = 'mg4-new-launch';

// ====== CSS 样式（内嵌） ======
var STUDY_CSS = '' +
'<style>' +
'  :root {' +
'    --study-blue: #1677FF;' +
'    --study-text: #1c1c1e;' +
'    --study-t2: #3a3a3c;' +
'    --study-t3: #8e8e93;' +
'    --study-line: #e5e5ea;' +
'    --study-page-bg: #f5f6f8;' +
'    --study-card-white: #ffffff;' +
'    --study-card-gray: #f2f3f5;' +
'  }' +
'' +
'  .study-page {' +
'    width: 375px;' +
'    min-height: 100vh;' +
'    margin: 0 auto;' +
'    background: var(--study-page-bg);' +
'    display: flex;' +
'    flex-direction: column;' +
'    position: relative;' +
'    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;' +
'    -webkit-font-smoothing: antialiased;' +
'  }' +
'' +
'  /* ── 状态栏 ── */' +
'  .study-status-bar {' +
'    display: flex;' +
'    justify-content: space-between;' +
'    align-items: center;' +
'    padding: 13px 26px 5px;' +
'    font-size: 15px;' +
'    font-weight: 600;' +
'    color: var(--study-text);' +
'    flex-shrink: 0;' +
'    background: var(--study-page-bg);' +
'  }' +
'  .study-status-icons {' +
'    display: flex;' +
'    gap: 6px;' +
'    align-items: center;' +
'  }' +
'' +
'  /* ── 导航栏 ── */' +
'  .study-nav {' +
'    display: flex;' +
'    align-items: center;' +
'    padding: 2px 16px 10px;' +
'    gap: 6px;' +
'    flex-shrink: 0;' +
'    background: var(--study-page-bg);' +
'  }' +
'  .study-nav-back {' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: center;' +
'    width: 28px;' +
'    height: 28px;' +
'    flex-shrink: 0;' +
'    cursor: pointer;' +
'  }' +
'  .study-nav-back svg {' +
'    display: block;' +
'  }' +
'  .study-nav-title {' +
'    font-size: 17px;' +
'    font-weight: 600;' +
'    color: var(--study-text);' +
'    line-height: 1.3;' +
'  }' +
'  .study-nav-title--centered {' +
'    flex: 1;' +
'    text-align: center;' +
'    padding-right: 28px;' +
'  }' +
'' +
'  /* ── 滚动区 ── */' +
'  .study-scroll {' +
'    flex: 1;' +
'    overflow-y: auto;' +
'    padding: 0 16px 100px;' +
'    display: flex;' +
'    flex-direction: column;' +
'  }' +
'  .study-scroll::-webkit-scrollbar { display: none; }' +
'' +
'  /* ── 区块 1：资料名 + 推荐理由 ── */' +
'  .study-intro-header {' +
'    padding: 8px 0 20px;' +
'  }' +
'  .study-intro-title {' +
'    font-size: 20px;' +
'    font-weight: 700;' +
'    color: var(--study-text);' +
'    line-height: 1.35;' +
'    margin-bottom: 6px;' +
'  }' +
'  .study-intro-reason {' +
'    font-size: 12px;' +
'    color: var(--study-blue);' +
'    line-height: 1.55;' +
'  }' +
'' +
'  /* ── 通用模块卡片 ── */' +
'  .study-module {' +
'    background: var(--study-card-white);' +
'    border-radius: 14px;' +
'    padding: 18px 16px 14px;' +
'    margin-bottom: 14px;' +
'  }' +
'  .study-module-title {' +
'    font-size: 15px;' +
'    font-weight: 600;' +
'    color: var(--study-text);' +
'    margin-bottom: 12px;' +
'  }' +
'' +
'  /* ── 区块 2：重点知识点（线条风，位于模块内） ── */' +
'  .study-keypoints-title {' +
'    font-size: 13px;' +
'    font-weight: 400;' +
'    color: var(--study-t3);' +
'    margin-bottom: 8px;' +
'  }' +
'  .study-keypoint-item {' +
'    display: flex;' +
'    align-items: flex-start;' +
'    padding: 14px 0;' +
'    border-bottom: 0.5px solid var(--study-line);' +
'    cursor: pointer;' +
'  }' +
'  .study-keypoint-item:first-child { padding-top: 0; }' +
'  .study-keypoint-item:last-child { padding-bottom: 0; border-bottom: none; }' +
'  .study-keypoint-num {' +
'    font-size: 14px;' +
'    font-weight: 500;' +
'    color: var(--study-blue);' +
'    width: 16px;' +
'    flex-shrink: 0;' +
'    line-height: 1.5;' +
'  }' +
'  .study-keypoint-body {' +
'    flex: 1;' +
'    min-width: 0;' +
'  }' +
'  .study-keypoint-content {' +
'    font-size: 15px;' +
'    color: var(--study-text);' +
'    line-height: 1.5;' +
'  }' +
'  .study-keypoint-reason {' +
'    font-size: 13px;' +
'    color: var(--study-t3);' +
'    line-height: 1.5;' +
'    margin-top: 4px;' +
'  }' +
'  .study-keypoint-chevron {' +
'    flex-shrink: 0;' +
'    margin-left: 8px;' +
'    display: flex;' +
'    align-items: center;' +
'    padding-top: 3px;' +
'  }' +
'' +
'  /* ── 区块 3：资料结构（线条风，纵向目录线） ── */' +
'  .study-outline-card {' +
'    position: relative;' +
'    border-left: 1px solid var(--study-line);' +
'    padding-left: 16px;' +
'  }' +
'  .study-outline-title {' +
'    font-size: 13px;' +
'    font-weight: 400;' +
'    color: var(--study-t3);' +
'    margin-bottom: 8px;' +
'  }' +
'  .study-outline-section {' +
'    position: relative;' +
'    padding: 8px 0 2px;' +
'  }' +
'  .study-outline-section:first-child { padding-top: 0; }' +
'  .study-outline-section:first-child .study-outline-dot { top: 3px; }' +
'  .study-outline-dot {' +
'    position: absolute;' +
'    left: -16px;' +
'    top: 11px;' +
'    width: 7px;' +
'    height: 7px;' +
'    border-radius: 50%;' +
'    transform: translateX(-50%);' +
'  }' +
'  .study-outline-dot-filled {' +
'    background: var(--study-blue);' +
'    border: none;' +
'  }' +
'  .study-outline-dot-empty {' +
'    background: #ffffff;' +
'    border: 1.5px solid var(--study-line);' +
'  }' +
'  .study-outline-name {' +
'    font-size: 13px;' +
'    font-weight: 400;' +
'    color: var(--study-text);' +
'    display: flex;' +
'    align-items: center;' +
'    gap: 6px;' +
'  }' +
'  .study-outline-key-tag {' +
'    font-size: 11px;' +
'    font-weight: 400;' +
'    color: var(--study-blue);' +
'  }' +
'  .study-outline-summary {' +
'    font-size: 12px;' +
'    color: var(--study-t3);' +
'    padding: 2px 0 3px 0;' +
'    line-height: 1.55;' +
'  }' +
'  .study-outline-emphasis {' +
'    font-size: 12px;' +
'    color: var(--study-blue);' +
'    padding: 2px 0 0 0;' +
'    line-height: 1.55;' +
'  }' +
'' +
'  /* ── PDF 课件模块 ── */' +
'  .study-pdf-module {' +
'    background: var(--study-card-white);' +
'    border-radius: 14px;' +
'    padding: 18px 16px 14px;' +
'    margin-bottom: 14px;' +
'  }' +
'  .study-pdf-module-header {' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: space-between;' +
'    margin-bottom: 12px;' +
'  }' +
'  .study-pdf-module-title {' +
'    font-size: 15px;' +
'    font-weight: 600;' +
'    color: var(--study-text);' +
'  }' +
'  .study-pdf-fullscreen-btn {' +
'    flex-shrink: 0;' +
'    padding: 6px 14px;' +
'    border-radius: 8px;' +
'    font-size: 13px;' +
'    color: var(--study-blue);' +
'    background: rgba(22, 119, 255, 0.08);' +
'    border: none;' +
'    font-family: inherit;' +
'    cursor: pointer;' +
'    font-weight: 500;' +
'  }' +
'  .study-pdf-embed {' +
'    width: 100%;' +
'    height: 500px;' +
'    border: 1px solid var(--study-line);' +
'    border-radius: 8px;' +
'  }' +
'' +
'  /* ── 底部悬浮按钮 ── */' +
'  .study-floating-bottom {' +
'    position: fixed;' +
'    bottom: 20px;' +
'    left: 50%;' +
'    transform: translateX(-50%);' +
'    width: 375px;' +
'    padding: 0 16px;' +
'    z-index: 10;' +
'  }' +
'  .study-floating-bottom .study-btn-primary {' +
'    display: block;' +
'    width: 100%;' +
'    padding: 14px 0;' +
'    text-align: center;' +
'    font-size: 16px;' +
'    font-weight: 600;' +
'    color: #ffffff;' +
'    background: var(--study-blue);' +
'    border: none;' +
'    border-radius: 12px;' +
'    letter-spacing: 0.4px;' +
'    cursor: pointer;' +
'    font-family: inherit;' +
'  }' +
'' +
'  /* ── 底部固定按钮 ── */' +
'  .study-bottom-bar {' +
'    position: fixed;' +
'    bottom: 0;' +
'    left: 50%;' +
'    transform: translateX(-50%);' +
'    width: 375px;' +
'    padding: 12px 16px 20px;' +
'    background: var(--study-page-bg);' +
'    z-index: 10;' +
'  }' +
'  .study-btn-primary {' +
'    display: block;' +
'    width: 100%;' +
'    padding: 14px 0;' +
'    text-align: center;' +
'    font-size: 16px;' +
'    font-weight: 600;' +
'    color: #ffffff;' +
'    background: var(--study-blue);' +
'    border: none;' +
'    border-radius: 12px;' +
'    letter-spacing: 0.4px;' +
'    cursor: pointer;' +
'    font-family: inherit;' +
'  }' +
'' +
'  /* ── B 页：章节 Tab ── */' +
'  .study-tabs {' +
'    display: flex;' +
'    gap: 8px;' +
'    padding: 6px 16px 10px;' +
'    overflow-x: auto;' +
'    flex-shrink: 0;' +
'    scrollbar-width: none;' +
'    background: var(--study-page-bg);' +
'  }' +
'  .study-tabs::-webkit-scrollbar { display: none; }' +
'  .study-tab {' +
'    flex-shrink: 0;' +
'    padding: 6px 14px;' +
'    border-radius: 20px;' +
'    font-size: 13px;' +
'    color: var(--study-t2);' +
'    background: #f2f3f5;' +
'    font-weight: 500;' +
'    white-space: nowrap;' +
'    cursor: pointer;' +
'    display: flex;' +
'    align-items: center;' +
'    gap: 5px;' +
'    border: none;' +
'    font-family: inherit;' +
'  }' +
'  .study-tab.active {' +
'    background: #e6f0ff;' +
'    color: var(--study-blue);' +
'    font-weight: 600;' +
'  }' +
'  .study-tab-dot {' +
'    width: 5px;' +
'    height: 5px;' +
'    border-radius: 50%;' +
'    background: var(--study-blue);' +
'    flex-shrink: 0;' +
'  }' +
'  .study-tab:not(.active) .study-tab-dot {' +
'    opacity: 0.5;' +
'  }' +
'' +
'  /* ── B 页：分隔线 ── */' +
'  .study-divider {' +
'    height: 1px;' +
'    background: var(--study-line);' +
'    margin: 0 16px;' +
'    flex-shrink: 0;' +
'  }' +
'' +
'  /* ── B 页：内容区 ── */' +
'  .study-content {' +
'    flex: 1;' +
'    overflow-y: auto;' +
'    padding: 16px 16px 80px;' +
'  }' +
'  .study-content::-webkit-scrollbar { display: none; }' +
'  .study-section-title {' +
'    font-size: 19px;' +
'    font-weight: 700;' +
'    color: var(--study-text);' +
'    margin-bottom: 10px;' +
'  }' +
'  .study-section-text {' +
'    font-size: 15px;' +
'    line-height: 1.64;' +
'    color: var(--study-t2);' +
'  }' +
'  .study-section-text p {' +
'    margin-bottom: 8px;' +
'  }' +
'  .study-section-text p:last-child {' +
'    margin-bottom: 0;' +
'  }' +
'  .study-img-placeholder {' +
'    width: 100%;' +
'    height: 170px;' +
'    background: #f4f5f7;' +
'    border-radius: 12px;' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: center;' +
'    color: #c9cacf;' +
'    font-size: 14px;' +
'    margin: 14px 0 20px;' +
'  }' +
'' +
'  /* ── 完成弹窗覆盖层 ── */' +
'  .study-overlay {' +
'    position: fixed;' +
'    inset: 0;' +
'    z-index: 100;' +
'    background: rgba(0,0,0,0.38);' +
'    display: flex;' +
'    flex-direction: column;' +
'    justify-content: flex-end;' +
'    padding: 20px 16px 28px;' +
'    max-width: 375px;' +
'    margin: 0 auto;' +
'    left: 50%;' +
'    transform: translateX(-50%);' +
'  }' +
'  .study-sheet {' +
'    background: #ffffff;' +
'    border-radius: 20px;' +
'    padding: 28px 22px 18px;' +
'    text-align: center;' +
'  }' +
'  .study-sheet-title {' +
'    font-size: 21px;' +
'    font-weight: 700;' +
'    color: var(--study-text);' +
'    margin-bottom: 5px;' +
'    letter-spacing: 0.4px;' +
'  }' +
'  .study-sheet-desc {' +
'    font-size: 14px;' +
'    color: #636366;' +
'    line-height: 1.5;' +
'    margin-bottom: 18px;' +
'  }' +
'  .study-sheet .study-btn-primary {' +
'    margin-bottom: 10px;' +
'  }' +
'  .study-sheet-skip {' +
'    font-size: 13px;' +
'    color: var(--study-t3);' +
'    padding: 6px 0;' +
'    cursor: pointer;' +
'  }' +
'' +
'  /* ── Home indicator ── */' +
'  .study-home-indicator {' +
'    width: 134px;' +
'    height: 4px;' +
'    background: var(--study-text);' +
'    border-radius: 100px;' +
'    flex-shrink: 0;' +
'    opacity: 0.14;' +
'    margin: 8px auto 10px;' +
'  }' +
'' +
'  /* ── Spacer ── */' +
'  .study-spacer {' +
'    height: 6px;' +
'    flex-shrink: 0;' +
'    background: var(--study-page-bg);' +
'  }' +
'' +
'  /* ── B 页：段落锚点与高亮（临时态） ── */' +
'  .study-paragraph {' +
'    padding: 8px 10px;' +
'    margin: 0 -10px;' +
'    border-radius: 8px;' +
'    transition: background-color 0.6s ease-out;' +
'  }' +
'  .study-paragraph-highlight {' +
'    background: rgba(22, 119, 255, 0.12);' +
'  }' +
'' +
'  /* ── A 页：蓝色理由行 + sparkles 图标 ── */' +
'  .study-keypoint-reason-blue {' +
'    font-size: 13px;' +
'    color: var(--study-blue);' +
'    line-height: 1.5;' +
'    margin-top: 4px;' +
'    display: flex;' +
'    align-items: center;' +
'    gap: 4px;' +
'  }' +
'  .study-keypoint-reason-blue svg {' +
'    flex-shrink: 0;' +
'  }' +

'  /* ── A 页 v2：重点学习提炼（扁平卡片 + 三层条目） ── */' +
'  .study-keypoints-card {' +
'    background: var(--study-card-white);' +
'    border-radius: 12px;' +
'    border: 0.5px solid var(--study-line);' +
'    padding: 18px 16px 14px;' +
'    margin-bottom: 14px;' +
'  }' +
'  .study-keypoints-coach-line {' +
'    font-size: 14px;' +
'    font-weight: 400;' +
'    color: var(--study-text);' +
'    line-height: 1.55;' +
'    margin-bottom: 14px;' +
'  }' +
'  .study-keypoints-item {' +
'    padding: 14px 0;' +
'    border-bottom: 0.5px solid var(--study-line);' +
'  }' +
'  .study-keypoints-item:first-child {' +
'    padding-top: 0;' +
'  }' +
'  .study-keypoints-item:last-child {' +
'    padding-bottom: 0;' +
'    border-bottom: none;' +
'  }' +
'  .study-keypoints-title-line {' +
'    font-size: 15px;' +
'    font-weight: 500;' +
'    color: var(--study-text);' +
'    line-height: 1.45;' +
'  }' +
'  .study-keypoints-summary-line {' +
'    font-size: 13px;' +
'    font-weight: 400;' +
'    color: var(--study-t3);' +
'    line-height: 1.5;' +
'  }' +
'  .study-keypoints-reason-line {' +
'    font-size: 13px;' +
'    font-weight: 400;' +
'    color: #378ADD;' +
'    line-height: 1.5;' +
'    margin-top: 6px;' +
'  }' +
'</style>';

// ====== 辅助函数 ======

/** 解析 subPage → { materialId, page, sectionId } */
function parseStudySubPage(subPage) {
  if (!subPage) return null;

  // 剥离 URL query 参数（如 ?section=xxx&anchor=xxx）
  var queryIndex = subPage.indexOf('?');
  var clean = queryIndex !== -1 ? subPage.slice(0, queryIndex) : subPage;

  // 匹配 intro 页: <materialId>-intro
  if (clean.endsWith('-intro')) {
    var materialId = clean.slice(0, -6);
    return { materialId: materialId, page: 'intro', sectionId: null };
  }

  // 匹配 content 页: <materialId>-content 或 <materialId>-content-<sectionId>
  var contentIdx = clean.lastIndexOf('-content');
  if (contentIdx !== -1) {
    var materialId = clean.slice(0, contentIdx);
    var rest = clean.slice(contentIdx + 8); // after '-content'
    var sectionId = rest.startsWith('-') ? rest.slice(1) : (rest || null);
    return { materialId: materialId, page: 'content', sectionId: sectionId || null };
  }

  return null;
}

/** 获取 material 数据，找不到返回默认 */
function getStudyMaterial(materialId) {
  return STUDY_MATERIALS[materialId] || STUDY_MATERIALS[STUDY_DEFAULT_MATERIAL];
}

/** 获取第一个带蓝点的章节 id */
function getFirstKeySectionId(material) {
  for (var i = 0; i < material.sections.length; i++) {
    if (material.sections[i].isKey) return material.sections[i].id;
  }
  return material.sections[0].id;
}

/** 根据 sectionId 查找章节 */
function getSectionById(material, sectionId) {
  for (var i = 0; i < material.sections.length; i++) {
    if (material.sections[i].id === sectionId) return material.sections[i];
  }
  return material.sections[0];
}

/** 从 hash 中提取 query 参数（hash 路由使用 ?section=xxx&anchor=xxx） */
function getStudyQueryParams() {
  var hash = window.location.hash;
  var queryIndex = hash.indexOf('?');
  if (queryIndex === -1) return {};
  var queryString = hash.slice(queryIndex + 1);
  var params = {};
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    if (parts.length === 2) {
      params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
  }
  return params;
}

// ====== 导航辅助（挂 window 供 onclick 调用） ======

window.studyGoToIntro = function(materialId) {
  window.location.hash = 'study-' + (materialId || STUDY_DEFAULT_MATERIAL) + '-intro';
};

window.studyGoToContent = function(materialId, sectionId) {
  var hash = 'study-' + (materialId || STUDY_DEFAULT_MATERIAL) + '-content';
  if (sectionId) hash += '-' + sectionId;
  window.location.hash = hash;
};

window.studyGoToContentWithAnchor = function(materialId, sectionId, paragraphId) {
  var hash = 'study-' + (materialId || STUDY_DEFAULT_MATERIAL) + '-content';
  if (sectionId) hash += '-' + sectionId;
  hash += '?section=' + encodeURIComponent(sectionId || '') + '&anchor=' + encodeURIComponent(paragraphId || '');
  window.location.hash = hash;
};

window.studyGoBackFromIntro = function() {
  window.location.hash = 'sales-coach-new';
};

window.studyGoBackFromContent = function(materialId) {
  window.location.hash = 'study-' + (materialId || STUDY_DEFAULT_MATERIAL) + '-intro';
};

window.studyShowCompletion = function() {
  // 标记 product-knowledge 任务已完成
  var completed = sessionStorage.getItem('scn_completed_tasks') || '';
  var ids = completed ? completed.split(',').map(function(s) { return s.trim(); }).filter(Boolean) : [];
  if (ids.indexOf('product-knowledge') === -1) {
    ids.push('product-knowledge');
    sessionStorage.setItem('scn_completed_tasks', ids.join(','));
  }
  window.location.hash = 'sales-coach-new';
};

window.studyHideCompletion = function() {
  var el = document.getElementById('study-completion-modal');
  if (el) el.style.display = 'none';
};

window.studyGoToPractice = function(route) {
  // route 如 /practice/placeholder，用 hash 跳转
  window.location.hash = 'sales-coach-new';
};

window.studyGoHome = function() {
  window.studyHideCompletion();
  window.location.hash = 'sales-coach-new';
};

window.studySwitchTab = function(materialId, sectionId) {
  window.location.hash = 'study-' + materialId + '-content-' + sectionId;
};

window.studyOpenPdfFullscreen = function() {
  var el = document.querySelector('.study-pdf-embed');
  if (!el) return;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
};

// ====== SVG 图标 ======
var STUDY_BACK_SVG = '<svg width="9" height="16" viewBox="0 0 9 16"><path d="M7.5 1L1 8l6.5 7" stroke="#007AFF" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

var STUDY_SIGNAL_SVG = '<svg width="15" height="10" viewBox="0 0 15 10"><rect x="0" y="5" width="2" height="5" rx="0.5" fill="#1c1c1e"/><rect x="3.5" y="3" width="2" height="7" rx="0.5" fill="#1c1c1e"/><rect x="7" y="1" width="2" height="9" rx="0.5" fill="#1c1c1e"/><rect x="10.5" y="0" width="2" height="10" rx="0.5" fill="#1c1c1e"/></svg>';
var STUDY_BATT_SVG = '<svg width="15" height="11" viewBox="0 0 15 11"><rect x="0" y="0" width="13" height="11" rx="2.5" fill="none" stroke="#1c1c1e" stroke-width="1"/><rect x="1.5" y="1.5" width="3" height="8" rx="0.5" fill="#1c1c1e"/><rect x="5.5" y="1.5" width="3" height="8" rx="0.5" fill="#1c1c1e"/><rect x="9.5" y="1.5" width="3" height="8" rx="0.5" fill="#1c1c1e"/><rect x="13.5" y="3" width="1.8" height="5" rx="0.9" fill="#1c1c1e" opacity="0.25"/></svg>';

// ====== 状态栏 HTML ======
function studyStatusBar() {
  return '<div class="study-status-bar">' +
    '<span>9:41</span>' +
    '<span class="study-status-icons">' + STUDY_SIGNAL_SVG + STUDY_BATT_SVG + '</span>' +
  '</div>';
}

// ====== 页面 A：导读页 ======
function renderIntroPage(material) {
  var html = STUDY_CSS;
  html += '<div class="study-page">';

  // 状态栏
  html += studyStatusBar();

  // 导航栏
  html += '<div class="study-nav">';
  html += '<div class="study-nav-back" onclick="window.studyGoBackFromIntro()">' + STUDY_BACK_SVG + '</div>';
  html += '<span class="study-nav-title study-nav-title--centered">' + material.title + '</span>';
  html += '</div>';

  // 滚动区
  html += '<div class="study-scroll">';

  // 区块 3：重点学习提炼（扁平卡片 + 三层条目）
  var sections = material.sections;
  var totalSections = sections.length;
  var keySections = [];
  for (var j = 0; j < sections.length; j++) {
    if (sections[j].isKey) {
      keySections.push(sections[j]);
    }
  }
  var keyCount = keySections.length;

  html += '<div class="study-keypoints-card">';
  html += '<div class="study-keypoints-coach-line">这份资料 ' + totalSections + ' 节，有' + keyCount + '节你要重点学习。</div>';

  for (var k = 0; k < keySections.length; k++) {
    var sec = keySections[k];
    html += '<div class="study-keypoints-item">';
    // 第一行：序号 + 章节标题
    html += '<div class="study-keypoints-title-line">' + (k + 1) + ' ' + sec.name + '</div>';
    // 第二行：客观内容提炼
    html += '<div class="study-keypoints-summary-line">' + sec.summary + '</div>';
    // 第三行：教练事实（条件渲染 — 按章节 id 绑定）
    if (sec.coachReason && sec.coachReason.length > 0) {
      html += '<div class="study-keypoints-reason-line">' + sec.coachReason + '</div>';
    }
    html += '</div>';
  }

  html += '</div>'; // .study-keypoints-card

  // 区块 4：PDF 课件（直接嵌入查看）
  html += '<div class="study-pdf-module">';
  html += '<div class="study-pdf-module-header">';
  html += '<div class="study-pdf-module-title">课件：' + material.title + '</div>';
  html += '<button class="study-pdf-fullscreen-btn" onclick="window.studyOpenPdfFullscreen()">全屏查看</button>';
  html += '</div>';
  html += '<embed class="study-pdf-embed" src="课件：MG7 25款上市培训.pdf#toolbar=0" type="application/pdf">';
  html += '</div>'; // .study-pdf-module

  html += '</div>'; // .study-scroll

  // 底部悬浮「我学完了」按钮
  html += '<div class="study-floating-bottom">';
  html += '<button class="study-btn-primary" onclick="window.studyShowCompletion()">我学完了</button>';
  html += '</div>';

  // Home indicator
  html += '<div class="study-home-indicator"></div>';

  html += '</div>'; // .study-page
  return html;
}

// ====== 页面 B：原材料页 ======
function renderContentPage(material, activeSectionId) {
  // 从 hash query 参数读取 ?section=xxx&anchor=xxx
  var queryParams = getStudyQueryParams();

  // 确定当前激活的章节
  if (!activeSectionId) {
    var sectionParam = queryParams['section'];
    if (sectionParam) activeSectionId = sectionParam;
  }
  if (!activeSectionId) activeSectionId = getFirstKeySectionId(material);
  var activeSection = getSectionById(material, activeSectionId);

  // anchor 段落 ID（用于跳转高亮）
  var anchorId = queryParams['anchor'] || null;

  var html = STUDY_CSS;
  html += '<div class="study-page">';

  // 状态栏
  html += studyStatusBar();

  // 导航栏
  html += '<div class="study-nav">';
  html += '<div class="study-nav-back" onclick="window.studyGoBackFromContent(\'' + material.materialId + '\')">' + STUDY_BACK_SVG + '</div>';
  html += '<span class="study-nav-title">' + material.title + '</span>';
  html += '</div>';

  // 章节 Tab 横向切换
  html += '<div class="study-tabs">';
  var sections = material.sections;
  for (var i = 0; i < sections.length; i++) {
    var sec = sections[i];
    var isActive = sec.id === activeSectionId;
    html += '<button class="study-tab' + (isActive ? ' active' : '') + '" onclick="window.studySwitchTab(\'' + material.materialId + '\',\'' + sec.id + '\')">';
    if (sec.isKey) html += '<span class="study-tab-dot"></span>';
    html += sec.name;
    html += '</button>';
  }
  html += '</div>';

  // 分隔线
  html += '<div class="study-divider"></div>';

  // 内容区（按段落渲染，每段有稳定 id 供锚点使用）
  html += '<div class="study-content" id="study-content-area">';
  html += '<div class="study-section-title">' + activeSection.name + '</div>';
  html += '<div class="study-section-text">';
  var paragraphs = activeSection.paragraphs;
  for (var pi = 0; pi < paragraphs.length; pi++) {
    var para = paragraphs[pi];
    html += '<p id="' + para.id + '" class="study-paragraph">' + para.text + '</p>';
  }
  html += '</div>';
  html += '<div class="study-img-placeholder">资料配图</div>';
  html += '</div>';

  // 底部固定按钮
  html += '<div class="study-bottom-bar">';
  html += '<button class="study-btn-primary" onclick="window.studyShowCompletion()">我学完了</button>';
  html += '</div>';

  // Home indicator
  html += '<div class="study-home-indicator"></div>';

  // 完成弹窗
  html += '<div class="study-overlay" id="study-completion-modal" style="display:none;">';
  html += '<div class="study-sheet">';
  html += '<div class="study-sheet-title">学完了，去接住它</div>';
  html += '<div class="study-sheet-desc">' + material.afterStudyHook.subtitle + '</div>';
  html += '<button class="study-btn-primary" onclick="window.studyGoToPractice(\'' + material.afterStudyHook.practiceRoute + '\')">去练那一段</button>';
  html += '<div class="study-sheet-skip" onclick="window.studyGoHome()">下次再说</div>';
  html += '</div>';
  html += '</div>';

  html += '</div>'; // .study-page

  // 锚点滚动 + 高亮（渲染后执行）
  if (anchorId) {
    setTimeout(function() {
      var el = document.getElementById(anchorId);
      if (el) {
        el.classList.add('study-paragraph-highlight');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() {
          el.classList.remove('study-paragraph-highlight');
        }, 2000);
      }
    }, 150);
  }

  return html;
}

// ====== 主渲染函数 ======
function renderStudyPage() {
  var subPage = window.__currentSubPage__ || (STUDY_DEFAULT_MATERIAL + '-intro');
  var parsed = parseStudySubPage(subPage);

  if (!parsed) {
    // 无效路由，回退到默认导读页
    return renderIntroPage(getStudyMaterial(STUDY_DEFAULT_MATERIAL));
  }

  var material = getStudyMaterial(parsed.materialId);

  if (parsed.page === 'intro') {
    return renderIntroPage(material);
  }

  if (parsed.page === 'content') {
    return renderContentPage(material, parsed.sectionId);
  }

  // fallback
  return renderIntroPage(material);
}

// ====== 注册路由 ======
Router.register('study', renderStudyPage);
