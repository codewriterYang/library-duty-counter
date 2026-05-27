/**
 * App - 应用入口模块
 * 
 * 本文件是应用的主入口模块
 * 负责初始化应用状态和启动应用
 */

/**
 * 初始化应用
 */
function initApp() {
  // 应用主题
  setTheme(currentShiftMode);
  updateModeBtnStyle();

  // 渲染初始页面
  refreshPage();

  // 初始化事件
  initEvents();

  console.log('图书馆勤工助学值班记录器 已初始化');
}

// DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);
