/**
 * 应用入口
 * 初始化路由，开始运行
 */

(function() {
  // 等待 DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('[App] Starting 汽车导购 AI 培训系统...');
    Router.init();
    console.log(`[App] Loaded env: ${Router.getEnv()}`);

    // 绑定页面内导航点击事件
    bindNavEvents();
  }

  // 全局导航事件绑定
  function bindNavEvents() {
    document.addEventListener('click', (e) => {
      const navItem = e.target.closest('[data-page]');
      if (!navItem) return;

      const page = navItem.dataset.page;
      console.log('[App] Navigate to:', page);

      // 如果是 HQ 页面的导航，调用 HQ.navigate
      if (window.HQ && typeof HQ.navigate === 'function') {
        HQ.navigate(page);
      }
    });
  }
})();