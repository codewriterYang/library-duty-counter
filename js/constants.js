/**
 * Constants - 全局常量定义
 * 
 * 本文件定义所有全局常量
 * - SHIFT_MODE: 模式切换常量
 * - TABLE_MODE: 表格显示模式常量
 * - OPERATION_TYPE: 操作类型常量
 */

/**
 * 班次模式常量
 * @readonly
 * @enum {number}
 */
const SHIFT_MODE = {
  BOTH: 1,           // 双班模式 - 同时显示书库和流通
  ONLY_LIBRARY: 2,    // 仅书库模式 - 仅显示书库班
  ONLY_CIRCULATION: 3 // 仅流通模式 - 仅显示流通班
};

/**
 * 表格显示模式常量
 * @readonly
 * @enum {string}
 */
const TABLE_MODE = {
  FULL: 'full',      // 完整显示模式 - 显示所有记录
  SCROLL: 'scroll'   // 内部滚动模式 - 表格内部滚动
};

/**
 * 操作类型常量
 * @readonly
 * @enum {string}
 */
const OPERATION_TYPE = {
  ADD_STUDENT: 'add_student',           // 添加学生
  DELETE_STUDENT: 'delete_student',     // 删除学生
  ADD_LIBRARY: 'add_library',           // 书库班次+1
  ADD_CIRCULATION: 'add_circulation',  // 流通班次+1
  CLEAR_LIBRARY: 'clear_library',      // 清零书库班次
  CLEAR_CIRCULATION: 'clear_circulation', // 清零流通班次
  IMPORT_STUDENTS: 'import_students',   // 批量导入学生
  RESET_ALL: 'reset_all',             // 全部重置
  UNDO: 'undo'                        // 撤销操作
};
