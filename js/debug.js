/**
 * Debug Test Script
 * 
 * 此脚本用于测试所有功能是否正常工作
 */

function runDebugTests() {
  console.log('=== 开始调试测试 ===');
  
  // 测试1: 检查常量是否定义
  console.log('测试1: 检查常量定义');
  try {
    console.log('SHIFT_MODE:', SHIFT_MODE);
    console.log('TABLE_MODE:', TABLE_MODE);
    console.log('OPERATION_TYPE:', OPERATION_TYPE);
    console.log('✓ 常量定义正常');
  } catch (e) {
    console.log('✗ 常量定义失败:', e.message);
  }
  
  // 测试2: 检查状态变量是否定义
  console.log('\n测试2: 检查状态变量');
  try {
    console.log('currentShiftMode:', currentShiftMode);
    console.log('isSummaryShow:', isSummaryShow);
    console.log('isStudentListExpanded:', isStudentListExpanded);
    console.log('currentTableMode:', currentTableMode);
    console.log('✓ 状态变量定义正常');
  } catch (e) {
    console.log('✗ 状态变量定义失败:', e.message);
  }
  
  // 测试3: 检查DOM元素是否存在
  console.log('\n测试3: 检查DOM元素');
  const elements = [
    'mode-both', 'mode-only-library', 'mode-only-circulation',
    'student-name', 'add-student-btn', 'batch-import-btn', 'reset-all-btn',
    'student-list', 'toggle-student-list-btn', 'toggle-summary-btn',
    'summary-container', 'summary-wrapper', 'summary-table',
    'history-modal', 'show-history-btn', 'toast'
  ];
  
  elements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      console.log(`✓ ${id} 存在`);
    } else {
      console.log(`✗ ${id} 不存在`);
    }
  });
  
  // 测试4: 检查函数是否存在
  console.log('\n测试4: 检查函数定义');
  const functions = [
    'initApp', 'initEvents', 'refreshPage', 'renderStudentList',
    'renderSummaryTable', 'updateTotalStats', 'bindStudentListEvents',
    'addStudent', 'deleteStudent', 'addCount', 'clearCount',
    'logOperation', 'undoOperation', 'showToast', 'setTheme'
  ];
  
  functions.forEach(fn => {
    if (typeof window[fn] === 'function') {
      console.log(`✓ ${fn} 函数存在`);
    } else {
      console.log(`✗ ${fn} 函数不存在:`, typeof window[fn]);
    }
  });
  
  console.log('\n=== 调试测试完成 ===');
}

// DOM加载完成后运行测试
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(runDebugTests, 100);
});
