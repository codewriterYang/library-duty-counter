/**
 * Render - 渲染函数模块
 * 
 * 本文件包含所有渲染相关函数
 * - 更新统计数据
 * - 渲染学生列表
 * - 渲染汇总表格
 * - 刷新页面
 */

/**
 * 更新统计数据
 */
function updateTotalStats() {
  const students = getStudents();
  const totalLibrary = students.reduce((sum, s) => sum + (s.libraryCount || 0), 0);
  const totalCirculation = students.reduce((sum, s) => sum + (s.circulationCount || 0), 0);

  // 更新所有统计卡片（顶部和底部）
  document.querySelectorAll('.stats-card-library p').forEach(el => {
    el.textContent = totalLibrary;
  });
  document.querySelectorAll('.stats-card-circulation p').forEach(el => {
    el.textContent = totalCirculation;
  });
  document.querySelectorAll('.stats-card-students p').forEach(el => {
    el.textContent = students.length;
  });
}

/**
 * 渲染学生列表
 */
function renderStudentList() {
  const students = getStudents();
  const listEl = document.getElementById('student-list');
  const isLibraryMode = currentShiftMode === SHIFT_MODE.ONLY_LIBRARY;
  const isCirculationMode = currentShiftMode === SHIFT_MODE.ONLY_CIRCULATION;
  const isBothMode = currentShiftMode === SHIFT_MODE.BOTH;

  if (students.length === 0) {
    listEl.innerHTML = `
      <div class="student-list-collapse-tip">
        <i class="fa-solid fa-angle-down mr-1"></i> 学生列表已折叠，点击按钮展开查看全部
      </div>
      <div class="empty-state">
        <i class="fa-solid fa-user-group"></i>
        <p>暂无学生数据，请添加学生</p>
      </div>
    `;
    return;
  }

  let listHtml = `
    <div class="student-list-collapse-tip">
      <i class="fa-solid fa-angle-down mr-1"></i> 学生列表已折叠，点击按钮展开查看全部
    </div>
  `;

  students.forEach(student => {
    const showLibrary = isBothMode || isLibraryMode;
    const showCirculation = isBothMode || isCirculationMode;

    const libraryGroup = showLibrary ? `
      <div class="operation-group">
        <button class="add-library btn-add-library" data-name="${student.name}">
          <i class="fa-solid fa-plus-sm"></i>书库
        </button>
        <span class="count-badge count-badge-library">${student.libraryCount || 0}</span>
        <button class="clear-library btn-clear" data-name="${student.name}">
          <i class="fa-solid fa-rotate-left"></i>清零
        </button>
      </div>
    ` : '';

    const circulationGroup = showCirculation ? `
      <div class="operation-group">
        <button class="add-circulation btn-add-circulation" data-name="${student.name}">
          <i class="fa-solid fa-plus-sm"></i>流通
        </button>
        <span class="count-badge count-badge-circulation">${student.circulationCount || 0}</span>
        <button class="clear-circulation btn-clear" data-name="${student.name}">
          <i class="fa-solid fa-rotate-left"></i>清零
        </button>
      </div>
    ` : '';

    const deleteBtn = `
      <button class="delete-student btn-delete" data-name="${student.name}">
        <i class="fa-solid fa-xmark"></i>删除
      </button>
    `;

    listHtml += `
      <div class="student-card">
        <div class="name">${student.name}</div>
        <div class="btn-group">
          ${libraryGroup}
          ${circulationGroup}
          ${deleteBtn}
        </div>
      </div>
    `;
  });

  listEl.innerHTML = listHtml;
  
  bindStudentListEvents();
}

/**
 * 渲染汇总表格
 */
function renderSummaryTable() {
  const students = getStudents();
  const tableEl = document.getElementById('summary-table');
  const updateTimeEl = document.getElementById('table-update-time');

  // 根据当前模式决定显示哪些列
  const showLibrary = currentShiftMode === SHIFT_MODE.BOTH || currentShiftMode === SHIFT_MODE.ONLY_LIBRARY;
  const showCirculation = currentShiftMode === SHIFT_MODE.BOTH || currentShiftMode === SHIFT_MODE.ONLY_CIRCULATION;

  // 计算总列数（序号 + 姓名 + 书库 + 流通 + 总数）
  const totalColumns = 2 + (showLibrary ? 1 : 0) + (showCirculation ? 1 : 0) + 1;
  
  // 设置CSS变量用于动态计算列宽
  tableEl.style.setProperty('--total-columns', totalColumns);

  if (students.length === 0) {
    const colSpan = showLibrary && showCirculation ? 5 : 4;
    tableEl.innerHTML = `<tbody><tr><td colspan="${colSpan}" class="border px-4 py-4 text-center text-gray-500">暂无数据</td></tr></tbody>`;
    updateTimeEl.textContent = '--';
    return;
  }

  // 动态生成表头
  let headerHtml = `
    <thead>
      <tr>
        <th class="border px-4 py-2">序号</th>
        <th class="border px-4 py-2">姓名</th>
  `;
  if (showLibrary) {
    headerHtml += '<th class="border px-4 py-2">书库班次数</th>';
  }
  if (showCirculation) {
    headerHtml += '<th class="border px-4 py-2">流通班次数</th>';
  }
  headerHtml += '<th class="border px-4 py-2">总数</th></tr></thead>';

  // 动态生成表体
  const bodyHtml = students.map((student, index) => {
    let rowHtml = `
      <tr>
        <td class="border px-4 py-2 text-center">${index + 1}</td>
        <td class="border px-4 py-2">${student.name}</td>
    `;
    let rowTotal = 0;
    if (showLibrary) {
      rowTotal += student.libraryCount || 0;
      rowHtml += `<td class="border px-4 py-2 text-center">${student.libraryCount || 0}</td>`;
    }
    if (showCirculation) {
      rowTotal += student.circulationCount || 0;
      rowHtml += `<td class="border px-4 py-2 text-center">${student.circulationCount || 0}</td>`;
    }
    rowHtml += `<td class="border px-4 py-2 text-center font-bold">${rowTotal}</td></tr>`;
    return rowHtml;
  }).join('');

  // 计算总计
  const totalLibrary = students.reduce((sum, s) => sum + (s.libraryCount || 0), 0);
  const totalCirculation = students.reduce((sum, s) => sum + (s.circulationCount || 0), 0);
  let total = 0;
  if (showLibrary) total += totalLibrary;
  if (showCirculation) total += totalCirculation;

  // 动态生成总计行
  let footerHtml = '<tr><td colspan="2" class="border px-4 py-2 text-center font-bold">总计</td>';
  if (showLibrary) {
    footerHtml += `<td class="border px-4 py-2 text-center font-bold">${totalLibrary}</td>`;
  }
  if (showCirculation) {
    footerHtml += `<td class="border px-4 py-2 text-center font-bold">${totalCirculation}</td>`;
  }
  footerHtml += `<td class="border px-4 py-2 text-center font-bold">${total}</td></tr>`;

  tableEl.innerHTML = `${headerHtml}<tbody>${bodyHtml}${footerHtml}</tbody>`;
  updateTimeEl.textContent = new Date().toLocaleTimeString('zh-CN');
}

/**
 * 刷新整个页面
 */
function refreshPage() {
  updateTotalStats();
  renderStudentList();
  renderSummaryTable();
}
