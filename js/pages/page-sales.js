/**
 * 导购端 - 嵌入零售大师最新版
 * 通过 iframe 加载原文件
 */

function renderSalesPage() {
  return `
    <div class="phone-wrapper">
      <div class="page-sales">
      <style>
        .phone-wrapper {
          display: flex;
          justify-content: center;
          min-height: 100vh;
          background: #e5e5e5;
          padding: 20px;
        }

        .page-sales {
          width: 375px;
          max-width: 100%;
          background: var(--bg-page, #f5f6fa);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .sales-iframe {
          width: 100%;
          height: 667px;
          border: none;
          display: block;
        }
      </style>

      <iframe
        class="sales-iframe"
        src="./零售大师 最新版.html"
        title="零售大师"
      ></iframe>
    </div>
    </div>
  `;
}

// 注册到路由
Router.register('sales', renderSalesPage);