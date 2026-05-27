/**
 * Operations - 操作日志模块
 * 
 * 本文件包含操作日志相关函数
 * - 记录操作
 * - 保存操作历史
 * - 检查是否可以撤销
 * - 执行撤销操作
 * - 获取操作类型信息
 */

/**
 * 记录操作到日志
 * @param {string} type - 操作类型
 * @param {string} content - 操作内容描述
 * @param {string} result - 操作结果 ('success' 或 'error')
 * @param {Array|null} previousData - 操作前的数据快照
 */
function logOperation(type, content, result = 'success', previousData = null) {
  const operation = {
    id: Date.now(),
    type: type,
    content: content,
    result: result,
    timestamp: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    previousData: previousData ? JSON.stringify(previousData) : null,
    currentData: JSON.stringify(getStudents())
  };

  operationHistory = operationHistory.slice(0, historyIndex);
  operationHistory.push(operation);
  historyIndex = operationHistory.length;

  saveOperationHistory();
}

/**
 * 保存操作历史到本地存储
 */
function saveOperationHistory() {
  localStorage.setItem('operationHistory', JSON.stringify(operationHistory));
}

/**
 * 检查是否可以撤销
 * @returns {boolean}
 */
function canUndo() {
  return historyIndex > 0;
}

/**
 * 执行撤销操作
 * @returns {boolean} 是否撤销成功
 */
function undoOperation() {
  if (!canUndo()) {
    showToast('没有可撤销的操作', 'warning');
    return false;
  }

  historyIndex--;
  const operation = operationHistory[historyIndex];

  if (operation.previousData) {
    const previousStudents = JSON.parse(operation.previousData);
    saveStudents(previousStudents);
    refreshPage();

    logOperation(OPERATION_TYPE.UNDO, `撤销操作: ${getOperationTypeName(operation.type)}`, 'success');
    showToast(`已撤销${getOperationTypeName(operation.type)}`, 'success');
    return true;
  }
  return false;
}

/**
 * 获取操作类型的中文名称
 * @param {string} type - 操作类型
 * @returns {string} 中文名称
 */
function getOperationTypeName(type) {
  const names = {
    [OPERATION_TYPE.ADD_STUDENT]: '添加学生',
    [OPERATION_TYPE.DELETE_STUDENT]: '删除学生',
    [OPERATION_TYPE.ADD_LIBRARY]: '书库班次+1',
    [OPERATION_TYPE.ADD_CIRCULATION]: '流通班次+1',
    [OPERATION_TYPE.CLEAR_LIBRARY]: '清零书库',
    [OPERATION_TYPE.CLEAR_CIRCULATION]: '清零流通',
    [OPERATION_TYPE.IMPORT_STUDENTS]: '批量导入学生',
    [OPERATION_TYPE.RESET_ALL]: '全部重置',
    [OPERATION_TYPE.UNDO]: '撤销操作'
  };
  return names[type] || type;
}

/**
 * 获取操作类型的图标
 * @param {string} type - 操作类型
 * @returns {string} Font Awesome 图标类名
 */
function getOperationTypeIcon(type) {
  const icons = {
    [OPERATION_TYPE.ADD_STUDENT]: 'fa-user-plus',
    [OPERATION_TYPE.DELETE_STUDENT]: 'fa-user-minus',
    [OPERATION_TYPE.ADD_LIBRARY]: 'fa-book-open',
    [OPERATION_TYPE.ADD_CIRCULATION]: 'fa-arrows-rotate',
    [OPERATION_TYPE.CLEAR_LIBRARY]: 'fa-rotate-left',
    [OPERATION_TYPE.CLEAR_CIRCULATION]: 'fa-rotate-left',
    [OPERATION_TYPE.IMPORT_STUDENTS]: 'fa-file-import',
    [OPERATION_TYPE.RESET_ALL]: 'fa-trash-can',
    [OPERATION_TYPE.UNDO]: 'fa-undo'
  };
  return icons[type] || 'fa-circle-info';
}

/**
 * 获取操作类型的颜色
 * @param {string} type - 操作类型
 * @returns {string} Tailwind 颜色类名
 */
function getOperationTypeColor(type) {
  const colors = {
    [OPERATION_TYPE.ADD_STUDENT]: 'text-green-500',
    [OPERATION_TYPE.DELETE_STUDENT]: 'text-red-500',
    [OPERATION_TYPE.ADD_LIBRARY]: 'text-blue-500',
    [OPERATION_TYPE.ADD_CIRCULATION]: 'text-emerald-500',
    [OPERATION_TYPE.CLEAR_LIBRARY]: 'text-yellow-500',
    [OPERATION_TYPE.CLEAR_CIRCULATION]: 'text-yellow-500',
    [OPERATION_TYPE.IMPORT_STUDENTS]: 'text-purple-500',
    [OPERATION_TYPE.RESET_ALL]: 'text-red-600',
    [OPERATION_TYPE.UNDO]: 'text-gray-500'
  };
  return colors[type] || 'text-gray-500';
}

/**
 * 渲染操作历史列表
 * @param {string} filterType - 筛选类型（空字符串表示全部）
 */
function renderOperationHistory(filterType = '') {
  const historyList = document.getElementById('history-list');
  const undoBtn = document.getElementById('undo-btn');
  
  let filteredHistory = [...operationHistory].reverse();
  if (filterType) {
    filteredHistory = filteredHistory.filter(op => op.type === filterType);
  }

  if (filteredHistory.length === 0) {
    historyList.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-history text-4xl mb-2 opacity-30"></i>
        <p>${filterType ? '没有匹配的操作记录' : '暂无操作日志'}</p>
      </div>
    `;
  } else {
    historyList.innerHTML = filteredHistory.map((op, index) => `
      <div class="flex items-start gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style="background-color: var(--bg-secondary);">
          <i class="fa-solid ${getOperationTypeIcon(op.type)} ${getOperationTypeColor(op.type)}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-medium text-gray-800">${getOperationTypeName(op.type)}</span>
            <span class="px-2 py-0.5 rounded-full text-xs ${op.result === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
              ${op.result === 'success' ? '成功' : '失败'}
            </span>
          </div>
          <p class="text-sm text-gray-600">${op.content}</p>
          <p class="text-xs text-gray-400 mt-1">${op.timestamp}</p>
        </div>
      </div>
    `).join('');
  }

  undoBtn.disabled = !canUndo();
}

/**
 * 清空操作历史
 */
function clearOperationHistory() {
  if (!confirm('确定要清空所有操作日志吗？')) {
    return;
  }
  operationHistory = [];
  historyIndex = 0;
  saveOperationHistory();
  renderOperationHistory();
  showToast('已清空操作日志', 'info');
}
