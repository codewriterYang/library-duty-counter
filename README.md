# 图书馆勤工助学值班记录器

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-green.svg)](https://github.com/your-username/library-duty-counter)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

一款基于 Web 的图书馆勤工助学值班记录管理工具，帮助管理员高效记录和统计学生的书库班/流通班值班情况。

## ✨ 功能特性

### 核心功能
- **三模式切换**：支持双班模式、仅书库模式、仅流通模式
- **学生管理**：添加、删除、批量导入学生
- **班次记录**：书库班/流通班次数增加、清零
- **实时统计**：学生卡片实时显示各班次数量
- **数据汇总**：汇总表格展示所有学生的值班情况
- **操作日志**：完整的操作记录与撤销回退功能
- **主题切换**：三种配色方案自动适配不同模式

### 界面特色
- 卡片式学生布局，操作按钮更大更易点击
- 表格支持完整显示和内部滚动两种模式
- 操作日志支持按类型筛选查看
- 响应式设计，适配各种屏幕尺寸

## 📁 项目结构

```
library-duty-counter/
├── index.html           # 主页面入口
├── LICENSE              # MIT 许可证
├── README.md            # 项目文档
├── MODULES.md           # 技术文档（模块说明）
├── .gitignore           # Git 忽略配置
├── css/
│   ├── style.css        # 主样式文件（引入所有模块）
│   ├── variables.css    # CSS 变量与主题系统
│   ├── base.css         # 基础样式与工具类
│   ├── buttons.css      # 按钮样式
│   ├── components.css   # 组件样式
│   └── layout.css       # 布局与动画样式
└── js/
    ├── constants.js     # 全局常量定义
    ├── state.js         # 全局状态变量
    ├── data.js          # 数据操作模块
    ├── operations.js    # 操作日志模块
    ├── render.js        # 渲染函数模块
    ├── events.js        # 事件处理模块
    ├── app.js           # 应用入口模块
    └── debug.js         # 调试工具模块
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| HTML | 5 | 语义化标记 |
| CSS | 3 | Tailwind CSS CDN + 自定义模块化 CSS |
| JavaScript | ES6+ | 模块化原生实现 |
| Font Awesome | 6.4.0 | 图标库 |
| Tailwind CSS | Latest | 工具类框架 |
| localStorage | - | 数据持久化 |

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge 等）
- 无需 Node.js 或任何服务器环境

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/library-duty-counter.git
   ```

2. **进入项目目录**
   ```bash
   cd library-duty-counter
   ```

3. **直接打开使用**
   - 双击 `index.html` 文件在浏览器中打开
   - 或使用任意本地服务器：
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (npx)
     npx serve .
     ```

### GitHub Pages 部署

项目已配置为可直接部署到 GitHub Pages：

1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings > Pages 中选择 `main` 分支
3. 访问 `https://your-username.github.io/library-duty-counter/`

## 📖 使用指南

### 添加学生

1. 在顶部的输入框中输入学生姓名
2. 点击「添加」按钮或按 Enter 键
3. 学生卡片将出现在列表中

### 批量导入

1. 点击「批量导入」按钮
2. 在弹出的文本框中输入学生姓名
3. 支持逗号、换行、空格分隔
4. 点击「确认导入」

### 记录班次

- **书库班**：「+书库」按钮增加书库班次
- **流通班**：「+流通」按钮增加流通班次
- **清零**：悬停在计数区域时显示「清零」按钮，点击重置对应班次

### 切换模式

点击顶部的模式切换按钮：
- **双班模式**：同时显示书库和流通操作
- **仅书库模式**：仅显示书库班操作
- **仅流通模式**：仅显示流通班操作

### 查看汇总

点击「显示汇总」按钮查看数据汇总表格，支持：
- **完整模式**：显示所有记录
- **滚动模式**：表格内部滚动

### 操作日志

1. 点击「操作日志」按钮
2. 查看所有操作历史记录
3. 使用下拉框筛选特定操作类型
4. 点击「撤销上一步」回退操作
5. 点击「清空日志」清除所有记录

## 💾 数据存储

所有数据存储在浏览器的 localStorage 中：

| 键名 | 说明 |
|------|------|
| `libraryStudents` | 学生数据（数组） |
| `shiftMode` | 当前模式（0-双班, 1-仅书库, 2-仅流通） |
| `isSummaryShow` | 汇总显示状态 |
| `isStudentListExpanded` | 学生列表展开状态 |
| `tableMode` | 表格显示模式 |
| `operationHistory` | 操作日志记录 |

## 🌐 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

## 🤝 贡献指南

### Bug 报告

如果您发现任何问题，请在 GitHub 上提交 Issue，包含：
- 详细的问题描述
- 复现步骤
- 预期行为与实际行为
- 浏览器版本和环境信息

### 功能建议

欢迎提交功能请求，请描述：
- 期望的功能
- 使用场景
- 任何相关的设计建议

### 代码贡献

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 创建 Pull Request

### 代码规范

- 变量命名使用 camelCase
- 函数命名使用 camelCase
- 常量命名使用 UPPER_CASE
- 使用 2 空格缩进
- 添加必要的注释说明

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 📞 联系方式

- GitHub Issues：[提交 Issue](https://github.com/your-username/library-duty-counter/issues)
- 项目主页：[GitHub Repository](https://github.com/your-username/library-duty-counter)

---

*最后更新：2026年5月*
