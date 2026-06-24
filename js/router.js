/**
 * 简单 Hash 路由
 * 支持三端切换和页面内导航
 */

const Router = {
  // 当前环境
  currentEnv: 'sales',
  currentSubPage: 'overview',

  // 环境对应的页面渲染函数
  pages: {},

  // 注册页面
  register(env, renderFn) {
    this.pages[env] = renderFn;
  },

  // 初始化
  init() {
    // 读取 hash，默认 sales，如果带子页面用 hq-overview
    const hash = window.location.hash.slice(1) || 'sales';
    this.setEnv(hash);

    // 监听 hash 变化
    window.addEventListener('hashchange', () => {
      this.setEnvFromHash();
    });

    // 绑定端切换器事件
    this.bindEnvSwitcher();
  },

  // 从 hash 设置环境（支持子页面如 hq-course, coach-home）
  setEnvFromHash() {
    const hash = window.location.hash.slice(1);
    // 支持 hq, hq-course, hq-question 这种格式
    if (hash.startsWith('hq-')) {
      const subPage = hash.replace('hq-', '') || 'overview';
      this.setEnv('hq', subPage);
    } else if (hash === 'hq') {
      this.setEnv('hq', 'overview');
    } else if (hash.startsWith('study-')) {
      const subPage = hash.replace('study-', '') || 'mg4-new-launch-intro';
      this.setEnv('study', subPage);
    } else if (hash === 'study') {
      this.setEnv('study', 'mg4-new-launch-intro');
    } else if (hash.startsWith('coach-v2-')) {
      const subPage = hash.replace('coach-v2-', '') || 'home';
      this.setEnv('coach-v2', subPage);
    } else if (hash === 'coach-v2') {
      this.setEnv('coach-v2', 'home');
    } else if (hash.startsWith('sales-coach-new-')) {
      const subPage = hash.replace('sales-coach-new-', '') || 'home';
      this.setEnv('sales-coach-new', subPage);
    } else if (hash === 'sales-coach-new') {
      this.setEnv('sales-coach-new', 'home');
    } else if (hash.startsWith('sales-coach-')) {
      const subPage = hash.replace('sales-coach-', '') || 'home';
      this.setEnv('sales-coach', subPage);
    } else if (hash === 'sales-coach') {
      this.setEnv('sales-coach', 'home');
    } else if (hash.startsWith('coach-')) {
      const subPage = hash.replace('coach-', '') || 'home';
      this.setEnv('coach', subPage);
    } else if (hash === 'coach') {
      this.setEnv('coach', 'home');
    } else if (hash.startsWith('learn-record')) {
      this.setEnv('learn-record', 'overview');
    } else if (hash.startsWith('learn-')) {
      const subPage = hash.replace('learn-', '') || 'mg7';
      this.setEnv('learn', subPage);
    } else if (hash === 'learn') {
      this.setEnv('learn', 'mg7');
    } else {
      this.setEnv(hash || 'sales');
    }
  },

  // 设置环境（可选 subPage 参数用于内部切换）
  setEnv(env, subPage) {
    // 处理 hq 前缀
    let baseEnv = env;
    let sp = subPage;
    if (env.startsWith('hq-')) {
      baseEnv = 'hq';
      sp = env.replace('hq-', '') || subPage || 'overview';
    } else if (env === 'hq') {
      baseEnv = 'hq';
      sp = subPage || 'overview';
    } else if (env.startsWith('study-')) {
      baseEnv = 'study';
      sp = env.replace('study-', '') || subPage || 'mg4-new-launch-intro';
    } else if (env === 'study') {
      baseEnv = 'study';
      sp = subPage || 'mg4-new-launch-intro';
    } else if (env.startsWith('coach-v2-')) {
      baseEnv = 'coach-v2';
      sp = env.replace('coach-v2-', '') || subPage || 'home';
    } else if (env === 'coach-v2') {
      baseEnv = 'coach-v2';
      sp = subPage || 'home';
    } else if (env.startsWith('sales-coach-new-')) {
      baseEnv = 'sales-coach-new';
      sp = env.replace('sales-coach-new-', '') || subPage || 'home';
    } else if (env === 'sales-coach-new') {
      baseEnv = 'sales-coach-new';
      sp = subPage || 'home';
    } else if (env.startsWith('sales-coach-')) {
      baseEnv = 'sales-coach';
      sp = env.replace('sales-coach-', '') || subPage || 'home';
    } else if (env === 'sales-coach') {
      baseEnv = 'sales-coach';
      sp = subPage || 'home';
    } else if (env.startsWith('coach-')) {
      baseEnv = 'coach';
      sp = env.replace('coach-', '') || subPage || 'home';
    } else if (env === 'coach') {
      baseEnv = 'coach';
      sp = subPage || 'home';
    } else if (env.startsWith('learn-record')) {
      baseEnv = 'learn-record';
      sp = subPage || 'overview';
    } else if (env.startsWith('learn-')) {
      baseEnv = 'learn';
      sp = env.replace('learn-', '') || subPage || 'mg7';
    } else if (env === 'learn') {
      baseEnv = 'learn';
      sp = subPage || 'mg7';
    }

    if (!this.pages[baseEnv]) {
      console.warn(`[Router] Unknown env: ${baseEnv}, fallback to sales`);
      baseEnv = 'sales';
    }

    this.currentEnv = baseEnv;
    this.currentSubPage = sp || 'overview';

    this.render();

    // 更新 URL
    let hash;
    if (baseEnv === 'hq') {
      hash = `hq-${this.currentSubPage}`;
    } else if (baseEnv === 'study') {
      hash = `study-${this.currentSubPage}`;
    } else if (baseEnv === 'sales-coach-new') {
      hash = `sales-coach-new-${this.currentSubPage}`;
    } else if (baseEnv === 'sales-coach') {
      hash = `sales-coach-${this.currentSubPage}`;
    } else if (baseEnv === 'coach') {
      hash = `coach-${this.currentSubPage}`;
    } else if (baseEnv === 'coach-v2') {
      hash = `coach-v2-${this.currentSubPage}`;
    } else if (baseEnv === 'learn-record') {
      hash = 'learn-record';
    } else if (baseEnv === 'learn') {
      hash = `learn-${this.currentSubPage}`;
    } else {
      hash = baseEnv;
    }
    if (window.location.hash.slice(1) !== hash) {
      window.location.hash = hash;
    }
  },

  // 渲染当前页
  render() {
    const app = document.getElementById('app');
    const renderFn = this.pages[this.currentEnv];
    // 存储当前子页面到全局，供渲染函数使用
    window.__currentSubPage__ = this.currentSubPage;

    if (renderFn) {
      app.innerHTML = renderFn();
      this.updateEnvButtons();
      // 触发全局事件绑定（innerHTML 会让内联 <script> 失效）
      if (typeof window.bindPageEvents === 'function') {
        window.bindPageEvents();
      }
    }
  },

  // 绑定端切换器
  bindEnvSwitcher() {
    const container = document.querySelector('.env-switcher');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.env-btn');
      if (!btn) return;

      const env = btn.dataset.env;
      if (env) {
        this.setEnv(env);
      }
    });
  },

  // 更新切换器按钮状态
  updateEnvButtons() {
    const buttons = document.querySelectorAll('.env-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.env === this.currentEnv);
    });
  },

  // 获取当前环境
  getEnv() {
    return this.currentEnv;
  }
};

// 导出
window.Router = Router;