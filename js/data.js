/**
 * Data Operations - 数据操作模块
 * 
 * 本文件包含所有数据操作相关函数
 * - 获取学生数据
 * - 保存学生数据
 * - 添加学生
 * - 删除学生
 * - 添加班次
 * - 清零班次
 * - 批量导入学生
 * - 全部重置
 */

/**
 * 获取所有学生数据
 * @returns {Array} 学生数组
 */
function getStudents() {
  return JSON.parse(localStorage.getItem('libraryStudents')) || [];
}

/**
 * 保存学生数据到本地存储
 * @param {Array} students - 学生数组
 */
function saveStudents(students) {
  localStorage.setItem('libraryStudents', JSON.stringify(students));
}

/**
 * 添加单个学生
 * @param {string} name - 学生姓名
 * @returns {boolean} 是否添加成功
 */
function addStudent(name) {
  if (!name.trim()) {
    showToast('请输入有效的学生姓名', 'warning');
    return false;
  }

  const students = getStudents();
  const exists = students.some(student => student.name.trim() === name.trim());
  if (exists) {
    showToast(`学生【${name}】已存在`, 'warning');
    return false;
  }

  const previousData = JSON.parse(JSON.stringify(students));
  students.push({
    name: name.trim(),
    libraryCount: 0,
    circulationCount: 0
  });
  saveStudents(students);
  logOperation(OPERATION_TYPE.ADD_STUDENT, `添加学生【${name}】`, 'success', previousData);
  showToast(`成功添加学生【${name}】`, 'success');
  return true;
}

/**
 * 批量导入学生
 * @param {string} text - 包含多个学生姓名的文本
 */
function batchImportStudents(text) {
  if (!text.trim()) {
    showToast('请输入要导入的学生姓名', 'warning');
    return;
  }

  const nameList = text.trim().split(/[,，\n\s]+/).filter(name => name.trim());
  if (nameList.length === 0) {
    showToast('未识别到有效学生姓名', 'warning');
    return;
  }

  const students = getStudents();
  const previousData = JSON.parse(JSON.stringify(students));
  const existingNames = new Set(students.map(s => s.name.trim()));
  const newNames = [];
  const duplicateNames = [];

  const uniqueNames = [...new Set(nameList)];
  uniqueNames.forEach(name => {
    const trimName = name.trim();
    if (existingNames.has(trimName)) {
      duplicateNames.push(trimName);
    } else {
      newNames.push(trimName);
    }
  });

  if (newNames.length > 0) {
    const newStudents = newNames.map(name => ({
      name,
      libraryCount: 0,
      circulationCount: 0
    }));
    students.push(...newStudents);
    saveStudents(students);
    logOperation(OPERATION_TYPE.IMPORT_STUDENTS, `批量导入${newNames.length}名学生`, 'success', previousData);
  }

  let toastText = '';
  if (newNames.length > 0 && duplicateNames.length > 0) {
    toastText = `成功导入${newNames.length}名学生，${duplicateNames.length}名学生已存在`;
  } else if (newNames.length > 0) {
    toastText = `成功导入${newNames.length}名学生`;
  } else {
    toastText = '所有学生均已存在，未导入新学生';
  }
  showToast(toastText, newNames.length > 0 ? 'success' : 'info');
}

/**
 * 删除学生
 * @param {string} name - 学生姓名
 */
function deleteStudent(name) {
  if (!confirm(`确定要删除学生【${name}】的所有记录吗？`)) {
    return;
  }

  const students = getStudents();
  const previousData = JSON.parse(JSON.stringify(students));
  const beforeCount = students.length;
  const filteredStudents = students.filter(student => student.name !== name);
  saveStudents(filteredStudents);

  if (filteredStudents.length < beforeCount) {
    logOperation(OPERATION_TYPE.DELETE_STUDENT, `删除学生【${name}】`, 'success', previousData);
    showToast(`已删除学生【${name}】的所有记录`, 'success');
  } else {
    showToast(`学生【${name}】不存在`, 'error');
  }
}

/**
 * 添加班次计数
 * @param {string} name - 学生姓名
 * @param {string} type - 班次类型 ('library' 或 'circulation')
 */
function addCount(name, type) {
  const students = getStudents();
  const student = students.find(s => s.name === name);
  if (!student) {
    showToast(`学生【${name}】不存在`, 'error');
    return;
  }

  const previousData = JSON.parse(JSON.stringify(students));
  student[`${type}Count`] = (student[`${type}Count`] || 0) + 1;
  saveStudents(students);
  
  const typeText = type === 'library' ? '书库班' : '流通班';
  const opType = type === 'library' ? OPERATION_TYPE.ADD_LIBRARY : OPERATION_TYPE.ADD_CIRCULATION;
  logOperation(opType, `【${name}】${typeText}次数+1`, 'success', previousData);
  showToast(`【${name}】${typeText}次数+1`, 'success');
}

/**
 * 清零班次计数
 * @param {string} name - 学生姓名
 * @param {string} type - 班次类型 ('library' 或 'circulation')
 */
function clearCount(name, type) {
  if (!confirm(`确定要清零【${name}】的${type === 'library' ? '书库班' : '流通班'}次数吗？`)) {
    return;
  }

  const students = getStudents();
  const student = students.find(s => s.name === name);
  if (!student) {
    showToast(`学生【${name}】不存在`, 'error');
    return;
  }

  const previousData = JSON.parse(JSON.stringify(students));
  student[`${type}Count`] = 0;
  saveStudents(students);
  
  const typeText = type === 'library' ? '书库班' : '流通班';
  const opType = type === 'library' ? OPERATION_TYPE.CLEAR_LIBRARY : OPERATION_TYPE.CLEAR_CIRCULATION;
  logOperation(opType, `清零【${name}】的${typeText}次数`, 'success', previousData);
  showToast(`已清零【${name}】的${typeText}次数`, 'success');
}

/**
 * 全部重置函数
 */
function resetAllData() {
  const confirmReset = confirm('⚠️ 确定要清空所有学生的值班记录吗？此操作不可恢复！');
  if (!confirmReset) return;

  const previousData = JSON.parse(JSON.stringify(getStudents()));
  localStorage.removeItem('libraryStudents');
  logOperation(OPERATION_TYPE.RESET_ALL, '全部重置，清空所有学生数据', 'success', previousData);
  showToast('已清空所有学生数据，可重新开始录入', 'success');
  refreshPage();
}
