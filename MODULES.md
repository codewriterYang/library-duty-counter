# 图书馆勤工助学值班记录器 - 技术文档

## 项目概述

图书馆勤工助学值班记录器是一个基于 Web 的单页应用，用于管理图书馆勤工助学学生的值班记录。

## 技术架构

### 目录结构

```
library-duty-counter/
├── index.html           # 主页面入口
├── css/
│   ├── style.css       # 主样式文件（引入所有模块）
│   ├── variables.css   # CSS 变量与主题系统
│   ├── base.css        # 基础样式与工具类
│   ├── buttons.css      # 按钮样式
│   ├── components.css   # 组件样式
│   └── layout.css      # 布局与动画样式
└── js/
    ├── constants.js     # 全局常量定义
    ├── state.js         # 全局状态变量
    ├── data.js          # 数据操作模块
    ├── operations.js     # 操作日志模块
    ├── render.js         # 渲染函数模块
    ├── events.js         # 事件处理模块
    └── app.js           # 应用入口模块
```

### 模块依赖关系

```
app.js (入口)
    ├── constants.js (常量)
    ├── state.js (状态)
    ├── data.js (数据操作)
    │   └── operations.js (日志记录)
    ├── render.js (渲染)
    │   └── data.js
    └── events.js (事件)
        ├── operations.js
        ├── render.js
        └── data.js
```

## CSS 模块说明

### variables.css - 主题变量

**功能**：定义所有 CSS 变量和三种主题配色方案

**主题类型**：
- `both` - 双班模式（靛蓝紫融合色调）
- `library` - 书库模式（Klein Blue 深邃蓝色）
- `circulation` - 流通模式（清新翠绿动态色调）

**使用方式**：
```html
<html data-theme="library">
```

### base.css - 基础样式

**功能**：
- Body 样式定义
- 通用隐藏类 `.hidden`
- 禁用状态样式

### buttons.css - 按钮样式

**包含样式**：
- `.btn-custom` - 通用按钮基类
- `.btn-primary` / `.btn-success` / `.btn-warning` / `.btn-danger` - 主题按钮
- `.btn-outline` - 轮廓按钮
- `.mode-btn` - 模式切换按钮
- `.table-mode-btn` - 表格模式切换按钮
- `.btn-add-library` / `.btn-add-circulation` - 添加班次按钮
- `.btn-clear` - 清零按钮
- `.btn-delete` - 删除按钮
- `.reset-all-btn` - 全部重置按钮（含 Tooltip）

### components.css - 组件样式

**包含样式**：
- `.card` - 卡片容器
- `.student-card` - 学生卡片
- `.stats-card` - 统计卡片
- `#summary-table` - 汇总表格
- `#summary-wrapper` - 表格包装容器
- `#batch-import-modal` / `#history-modal` - 模态框
- `.empty-state` - 空状态
- `#toast` - Toast 提示
- `.operation-group` - 操作组
- `.count-badge` - 数量徽章

### layout.css - 布局样式

**包含样式**：
- `.summary-container` - 汇总容器（带显隐动画）
- `.student-list-container` - 学生列表容器（带折叠动画）

## JS 模块说明

### constants.js - 全局常量

**导出内容**：
- `SHIFT_MODE` - 班次模式枚举（BOTH, ONLY_LIBRARY, ONLY_CIRCULATION）
- `TABLE_MODE` - 表格显示模式枚举（FULL, SCROLL）
- `OPERATION_TYPE` - 操作类型枚举

### state.js - 全局状态

**导出变量**：
- `currentShiftMode` - 当前班次模式
- `isSummaryShow` - 汇总显示状态
- `isStudentListExpanded` - 学生列表展开状态
- `currentTableMode` - 当前表格模式
- `toastTimer` - Toast 定时器
- `operationHistory` - 操作历史记录
- `historyIndex` - 历史索引（用于撤销）

### data.js - 数据操作

**主要函数**：

| 函数名 | 说明 | 参数 |
|--------|------|------|
| `getStudents()` | 获取所有学生数据 | 无 |
| `saveStudents(students)` | 保存学生数据 | students: 学生数组 |
| `addStudent(name)` | 添加单个学生 | name: 学生姓名 |
| `batchImportStudents(text)` | 批量导入学生 | text: 包含多个姓名的文本 |
| `deleteStudent(name)` | 删除学生 | name: 学生姓名 |
| `addCount(name, type)` | 添加班次 | name: 学生姓名, type: 'library'/'circulation' |
| `clearCount(name, type)` | 清零班次 | name: 学生姓名, type: 'library'/'circulation' |
| `resetAllData()` | 全部重置 | 无 |

### operations.js - 操作日志

**主要函数**：

| 函数名 | 说明 | 参数 |
|--------|------|------|
| `logOperation(type, content, result, previousData)` | 记录操作 | type: 类型, content: 内容, result: 结果, previousData: 前数据 |
| `saveOperationHistory()` | 保存历史 | 无 |
| `canUndo()` | 检查是否可撤销 | 无，返回 boolean |
| `undoOperation()` | 执行撤销 | 无，返回 boolean |
| `getOperationTypeName(type)` | 获取操作类型名称 | type: 操作类型 |
| `getOperationTypeIcon(type)` | 获取操作类型图标 | type: 操作类型 |
| `getOperationTypeColor(type)` | 获取操作类型颜色 | type: 操作类型 |
| `renderOperationHistory(filterType)` | 渲染日志列表 | filterType: 筛选类型 |
| `clearOperationHistory()` | 清空日志 | 无 |

### render.js - 渲染函数

**主要函数**：

| 函数名 | 说明 | 参数 |
|--------|------|------|
| `updateTotalStats()` | 更新统计数据 | 无 |
| `renderStudentList()` | 渲染学生列表 | 无 |
| `renderSummaryTable()` | 渲染汇总表格 | 无 |
| `refreshPage()` | 刷新整个页面 | 无 |

### events.js - 事件处理

**主要函数**：

| 函数名 | 说明 | 参数 |
|--------|------|------|
| `showToast(text, type)` | 显示 Toast | text: 文本, type: 类型 |
| `setTheme(mode)` | 设置主题 | mode: 班次模式 |
| `updateModeBtnStyle()` | 更新模式按钮样式 | 无 |
| `setTableMode(mode)` | 设置表格模式 | mode: 表格模式 |
| `applyTableMode(mode)` | 应用表格模式（静默） | mode: 表格模式 |
| `toggleStudentList()` | 切换学生列表折叠 | 无 |
| `toggleSummary()` | 切换汇总显示 | 无 |
| `bindStudentListEvents()` | 绑定学生列表事件 | 无 |
| `initEvents()` | 初始化所有事件 | 无 |

### app.js - 应用入口

**主要函数**：

| 函数名 | 说明 | 参数 |
|--------|------|------|
| `initApp()` | 初始化应用 | 无 |

**初始化流程**：
1. 应用主题
2. 更新模式按钮样式
3. 渲染初始页面
4. 初始化事件绑定

## 数据存储

所有数据存储在浏览器的 `localStorage` 中：

| 键名 | 说明 |
|------|------|
| `libraryStudents` | 学生数据数组 |
| `shiftMode` | 当前班次模式 |
| `isSummaryShow` | 汇总显示状态 |
| `isStudentListExpanded` | 学生列表展开状态 |
| `tableMode` | 表格显示模式 |
| `operationHistory` | 操作日志数组 |

## 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

## 部署说明

本项目支持直接部署到 GitHub Pages：

1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings > Pages 中选择 `main` 分支
3. 访问 `https://username.github.io/library-duty-counter/`

## 许可证

MIT License
