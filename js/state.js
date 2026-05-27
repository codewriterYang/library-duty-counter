/**
 * State - 全局状态变量
 * 
 * 本文件定义所有全局状态变量
 * 这些变量用于跟踪应用的当前状态
 */

/**
 * 当前班次模式
 * @type {number}
 */
let currentShiftMode = Number(localStorage.getItem('shiftMode')) || SHIFT_MODE.BOTH;

/**
 * 汇总显示状态
 * @type {boolean}
 */
let isSummaryShow = localStorage.getItem('isSummaryShow') === 'true' || false;

/**
 * 学生列表展开状态
 * @type {boolean}
 */
let isStudentListExpanded = localStorage.getItem('isStudentListExpanded') !== 'false';

/**
 * 当前表格显示模式
 * @type {string}
 */
let currentTableMode = localStorage.getItem('tableMode') || TABLE_MODE.FULL;

/**
 * Toast 定时器 ID
 * @type {number|null}
 */
let toastTimer = null;

/**
 * 操作历史记录
 * @type {Array}
 */
let operationHistory = JSON.parse(localStorage.getItem('operationHistory') || '[]');

/**
 * 操作历史索引（用于撤销功能）
 * @type {number}
 */
let historyIndex = operationHistory.length;
