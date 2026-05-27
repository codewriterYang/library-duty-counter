/**
 * Events - 事件处理模块
 * 
 * 本文件包含所有事件处理函数
 * - Toast 显示
 * - 主题切换
 * - 表格模式切换
 * - 学生列表折叠/展开
 * - 汇总显示/隐藏
 */

/**
 * 显示 Toast 提示
 * @param {string} text - 提示文本
 * @param {string} type - 提示类型 ('info', 'success', 'warning', 'error')
 */
function showToast(text, type = 'info') {
  const toastEl = document.getElementById('toast');
  clearTimeout(toastTimer);

  const icons = {
    info: 'fa-circle-info',
    success: 'fa-circle-check text-green-500',
    warning: 'fa-circle-exclamation text-yellow-500',
    error: 'fa-circle-xmark text-red-500'
  };
  toastEl.innerHTML = `
    <i class="fa-solid ${icons[type]}"></i>
    <span>${text}</span>
  `;

  toastEl.classList.add('show');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}

/**
 * 设置主题
 * @param {number} mode - 模式 (SHIFT_MODE.BOTH, SHIFT_MODE.ONLY_LIBRARY, SHIFT_MODE.ONLY_CIRCULATION)
 */
function setTheme(mode) {
  const themeMap = {
    [SHIFT_MODE.BOTH]: 'both',
    [SHIFT_MODE.ONLY_LIBRARY]: 'library',
    [SHIFT_MODE.ONLY_CIRCULATION]: 'circulation'
  };
  document.documentElement.setAttribute('data-theme', themeMap[mode] || 'both');
  localStorage.setItem('shiftMode', mode);
}

/**
 * 更新模式按钮样式
 */
function updateModeBtnStyle() {
  const btns = {
    [SHIFT_MODE.BOTH]: document.getElementById('mode-both'),
    [SHIFT_MODE.ONLY_LIBRARY]: document.getElementById('mode-only-library'),
    [SHIFT_MODE.ONLY_CIRCULATION]: document.getElementById('mode-only-circulation')
  };
  Object.values(btns).forEach(btn => btn.classList.remove('active'));
  btns[currentShiftMode].classList.add('active');
}

/**
 * 表格模式切换功能
 * @param {string} mode - 表格模式 (TABLE_MODE.FULL, TABLE_MODE.SCROLL)
 */
function setTableMode(mode) {
  currentTableMode = mode;
  localStorage.setItem('tableMode', mode);

  const wrapper = document.getElementById('summary-wrapper');
  const tableModeBtns = {
    [TABLE_MODE.FULL]: document.getElementById('table-mode-full'),
    [TABLE_MODE.SCROLL]: document.getElementById('table-mode-scroll')
  };

  Object.values(tableModeBtns).forEach(btn => btn.classList.remove('active'));
  if (tableModeBtns[mode]) {
    tableModeBtns[mode].classList.add('active');
  }

  wrapper.classList.remove('scrollable', 'full');
  if (mode === TABLE_MODE.SCROLL) {
    wrapper.classList.add('scrollable');
  } else if (mode === TABLE_MODE.FULL) {
    wrapper.classList.add('full');
  }

  const modeText = {
    [TABLE_MODE.FULL]: '完整显示模式',
    [TABLE_MODE.SCROLL]: '滚动显示模式'
  };
  showToast(`表格已切换为${modeText[mode]}`, 'success');
}

/**
 * 静默应用表格模式（不显示 Toast）
 * @param {string} mode - 表格模式
 */
function applyTableMode(mode) {
  const wrapper = document.getElementById('summary-wrapper');
  const tableModeBtns = {
    [TABLE_MODE.FULL]: document.getElementById('table-mode-full'),
    [TABLE_MODE.SCROLL]: document.getElementById('table-mode-scroll')
  };

  Object.values(tableModeBtns).forEach(btn => btn.classList.remove('active'));
  if (tableModeBtns[mode]) {
    tableModeBtns[mode].classList.add('active');
  }

  wrapper.classList.remove('scrollable', 'full');
  if (mode === TABLE_MODE.SCROLL) {
    wrapper.classList.add('scrollable');
  } else if (mode === TABLE_MODE.FULL) {
    wrapper.classList.add('full');
  }
}

/**
 * 切换学生列表折叠/展开
 */
function toggleStudentList() {
  const listEl = document.getElementById('student-list');
  const btn = document.getElementById('toggle-student-list-btn');

  listEl.classList.toggle('collapsed');
  isStudentListExpanded = !listEl.classList.contains('collapsed');
  localStorage.setItem('isStudentListExpanded', isStudentListExpanded);

  if (isStudentListExpanded) {
    btn.innerHTML = '<i class="fa-solid fa-chevron-up mr-1"></i>折叠学生列表';
    showToast('已展开学生列表', 'info');
  } else {
    btn.innerHTML = '<i class="fa-solid fa-chevron-down mr-1"></i>展开学生列表';
    showToast('已折叠学生列表', 'info');
  }
}

/**
 * 切换汇总显示/隐藏
 */
function toggleSummary() {
  const container = document.getElementById('summary-container');
  const btn = document.getElementById('toggle-summary-btn');

  isSummaryShow = !isSummaryShow;
  localStorage.setItem('isSummaryShow', isSummaryShow);

  if (isSummaryShow) {
    container.classList.add('show');
    btn.innerHTML = '<i class="fa-solid fa-table mr-1"></i>隐藏汇总';
  } else {
    container.classList.remove('show');
    btn.innerHTML = '<i class="fa-solid fa-table mr-1"></i>显示汇总';
  }
}

/**
 * 绑定学生列表事件
 */
function bindStudentListEvents() {
  // 添加书库班次数
  document.querySelectorAll('.add-library').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      addCount(name, 'library');
      refreshPage();
    });
  });

  // 添加流通班次数
  document.querySelectorAll('.add-circulation').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      addCount(name, 'circulation');
      refreshPage();
    });
  });

  // 清零书库班次数
  document.querySelectorAll('.clear-library').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      clearCount(name, 'library');
      refreshPage();
    });
  });

  // 清零流通班次数
  document.querySelectorAll('.clear-circulation').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      clearCount(name, 'circulation');
      refreshPage();
    });
  });

  // 删除学生
  document.querySelectorAll('.delete-student').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      deleteStudent(name);
      refreshPage();
    });
  });
}

/**
 * 初始化所有事件
 */
function initEvents() {
  // 模式切换
  document.getElementById('mode-both').addEventListener('click', () => {
    currentShiftMode = SHIFT_MODE.BOTH;
    localStorage.setItem('shiftMode', currentShiftMode);
    setTheme(currentShiftMode);
    updateModeBtnStyle();
    renderStudentList();
    renderSummaryTable();
  });

  document.getElementById('mode-only-library').addEventListener('click', () => {
    currentShiftMode = SHIFT_MODE.ONLY_LIBRARY;
    localStorage.setItem('shiftMode', currentShiftMode);
    setTheme(currentShiftMode);
    updateModeBtnStyle();
    renderStudentList();
    renderSummaryTable();
  });

  document.getElementById('mode-only-circulation').addEventListener('click', () => {
    currentShiftMode = SHIFT_MODE.ONLY_CIRCULATION;
    localStorage.setItem('shiftMode', currentShiftMode);
    setTheme(currentShiftMode);
    updateModeBtnStyle();
    renderStudentList();
    renderSummaryTable();
  });

  // 学生列表折叠/展开
  document.getElementById('toggle-student-list-btn').addEventListener('click', toggleStudentList);

  // 汇总显隐
  document.getElementById('toggle-summary-btn').addEventListener('click', toggleSummary);

  // 表格显示模式切换
  document.getElementById('table-mode-full').addEventListener('click', () => setTableMode(TABLE_MODE.FULL));
  document.getElementById('table-mode-scroll').addEventListener('click', () => setTableMode(TABLE_MODE.SCROLL));

  // 全部重置按钮事件
  document.getElementById('reset-all-btn').addEventListener('click', resetAllData);

  // 操作日志相关事件
  document.getElementById('show-history-btn').addEventListener('click', () => {
    document.getElementById('history-modal').classList.remove('hidden');
    renderOperationHistory();
  });

  document.getElementById('close-history-btn').addEventListener('click', () => {
    document.getElementById('history-modal').classList.add('hidden');
  });

  document.getElementById('undo-btn').addEventListener('click', () => {
    if (undoOperation()) {
      renderOperationHistory();
    }
  });

  document.getElementById('history-filter-type').addEventListener('change', (e) => {
    renderOperationHistory(e.target.value);
  });

  document.getElementById('clear-history-btn').addEventListener('click', clearOperationHistory);

  // 添加单个学生
  document.getElementById('add-student-btn').addEventListener('click', () => {
    const name = document.getElementById('student-name').value;
    if (addStudent(name)) {
      document.getElementById('student-name').value = '';
      refreshPage();
    }
  });

  // 回车添加
  document.getElementById('student-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('add-student-btn').click();
    }
  });

  // 批量导入
  document.getElementById('batch-import-btn').addEventListener('click', () => {
    document.getElementById('batch-import-modal').classList.remove('hidden');
    document.getElementById('batch-student-text').focus();
  });

  // 关闭模态框
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('batch-import-modal').classList.add('hidden');
  });

  // 取消导入
  document.getElementById('cancel-import-btn').addEventListener('click', () => {
    document.getElementById('batch-import-modal').classList.add('hidden');
  });

  // 确认导入
  document.getElementById('confirm-import-btn').addEventListener('click', () => {
    const text = document.getElementById('batch-student-text').value;
    batchImportStudents(text);
    document.getElementById('batch-import-modal').classList.add('hidden');
    document.getElementById('batch-student-text').value = '';
    refreshPage();
  });

  // 点击模态框外部关闭
  document.getElementById('batch-import-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('batch-import-modal')) {
      document.getElementById('batch-import-modal').classList.add('hidden');
    }
  });

  // 绑定学生卡片事件
  bindStudentListEvents();

  // 应用初始状态
  if (!isStudentListExpanded) {
    document.getElementById('student-list').classList.add('collapsed');
    document.getElementById('toggle-student-list-btn').innerHTML = '<i class="fa-solid fa-chevron-down mr-1"></i>展开学生列表';
  }

  if (isSummaryShow) {
    document.getElementById('summary-container').classList.add('show');
    document.getElementById('toggle-summary-btn').innerHTML = '<i class="fa-solid fa-table mr-1"></i>隐藏汇总';
  }

  applyTableMode(currentTableMode);
}
