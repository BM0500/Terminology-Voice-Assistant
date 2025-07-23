# 🎯 Terminology Voice Assistant

<div align="center">
  <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  
  <h3>智能术语语音学习助手</h3>
  <p>一个现代化的多领域专业术语学习平台，支持语音播放和智能测试</p>
  
  [![Vue.js](https://img.shields.io/badge/Vue.js-3.4.15-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.12-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
</div>

## ✨ 特性

- 🎵 **语音播放** - 支持术语的语音朗读，可调节语速和音量
- 📚 **多领域覆盖** - 涵盖斯诺克、医疗、IT、加密货币、学术等专业领域
- 🧠 **智能测试** - 自动生成测试题目，支持多种题型
- 📊 **学习统计** - 详细的学习进度跟踪和统计分析
- 🔍 **智能搜索** - 支持术语名称和定义的全文搜索
- 🏷️ **分类筛选** - 按难度、类别、标签等多维度筛选
- 💾 **本地存储** - 学习进度和偏好设置本地保存
- 📱 **响应式设计** - 完美适配桌面和移动设备

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/BM0500/Terminology-Voice-Assistant.git

# 进入项目目录
cd Terminology-Voice-Assistant

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📖 功能介绍

### 🎯 术语学习

- **多领域术语库**：包含5个专业领域的术语数据
- **语音朗读**：支持术语的语音播放，可自定义语音设置
- **学习标记**：可标记术语为已学习或收藏
- **进度跟踪**：实时统计学习进度和成果

### 🧪 智能测试

- **自动出题**：基于术语库自动生成测试题目
- **多种题型**：支持选择题、填空题等多种测试形式
- **难度分级**：根据术语难度智能调整题目难度
- **成绩统计**：详细的测试结果分析和历史记录

### 🔍 搜索与筛选

- **全文搜索**：支持术语名称和定义的模糊搜索
- **多维筛选**：按类别、难度、标签等条件筛选
- **实时过滤**：输入即时显示搜索结果

## 🗂️ 术语分类

| 分类 | 描述 | 术语数量 | 子分类 |
|------|------|----------|--------|
| 🎱 斯诺克 | 专业斯诺克比赛和技术术语 | 900+ | 比赛赛事、球杆设备、击球技术、规则 |
| 🏥 医疗 | 医学专业术语和临床用语 | 800+ | 心脏病学、神经学、肿瘤学、儿科学等 |
| 💻 IT | 信息技术和计算机科学术语 | 700+ | 编程开发、数据库、网络安全、人工智能等 |
| 💰 加密货币 | 区块链和数字货币术语 | 300+ | 交易、技术、投资、监管 |
| 🎓 学术 | 学术研究和教育术语 | 400+ | 研究方法、学术写作、教育理论 |

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 下一代前端构建工具

### UI & 样式
- **Tailwind CSS** - 实用优先的CSS框架
- **Lucide Vue** - 美观的图标库
- **Vue Sonner** - 优雅的通知组件

### 状态管理
- **Pinia** - Vue 3的状态管理库
- **Vue Router** - 官方路由管理器

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript** - 类型检查
- **PostCSS** - CSS后处理器

## 📁 项目结构

```
src/
├── components/          # 通用组件
├── data/               # 术语数据文件
│   ├── snooker.json    # 斯诺克术语
│   ├── medical.json    # 医疗术语
│   ├── it.json         # IT术语
│   ├── cryptocurrency.json # 加密货币术语
│   ├── academic.json   # 学术术语
│   └── categories.json # 分类配置
├── pages/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── TermsPage.vue   # 术语学习页面
│   ├── Test.vue        # 测试页面
│   └── ...
├── stores/             # 状态管理
│   ├── learning.ts     # 学习状态
│   ├── speech.ts       # 语音设置
│   └── user.ts         # 用户设置
├── utils/              # 工具函数
│   └── dataLoader.ts   # 数据加载器
├── types/              # 类型定义
└── router/             # 路由配置
```

## 🎨 界面预览

### 主页面
- 清晰的学习统计概览
- 快速访问各个术语分类
- 学习进度可视化展示

### 术语学习页面
- 术语列表展示和搜索
- 语音播放控制
- 学习状态标记
- 分页和筛选功能

### 测试页面
- 智能题目生成
- 实时答题反馈
- 详细的成绩分析

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 优秀的前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的CSS框架
- [Lucide](https://lucide.dev/) - 精美的图标库
- 所有贡献者和用户的支持

---

<div align="center">
  <p>如果这个项目对你有帮助，请给它一个 ⭐️</p>
  <p>Made with ❤️ by <a href="https://github.com/BM0500">BM0500</a></p>
</div>
