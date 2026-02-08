# 我们的无限时刻 - 情侣网站

一个充满爱意的情侣专属网站，记录你们的甜蜜时光、照片回忆和共同足迹。

## 🎨 功能特点

- **时光计数器**：实时记录你们在一起的时间
- **甜蜜寄语**：互相发送爱的留言，支持分享给对方
- **照片墙**：点击添加照片，创建属于你们的回忆花园
- **共同足迹**：记录重要时刻，生成链接分享给对方
- **响应式设计**：适配手机、平板和电脑等各种设备

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite
- **UI组件**：Lucide React（图标库）
- **样式**：Tailwind CSS
- **数据存储**：浏览器本地存储（localStorage）

## 📦 本地运行

### 前提条件
- Node.js 16.0 或更高版本

### 步骤
1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/couple-website.git
   cd couple-website
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问网站**
   打开浏览器，访问 http://localhost:3000

## 🚀 部署上线

推荐使用 Vercel 进行部署（免费、简单、快速）：

1. **登录 Vercel**：访问 [Vercel](https://vercel.com/)，使用 GitHub 账号登录

2. **导入项目**：点击 "Add New Project"，选择你的 GitHub 仓库

3. **部署**：保持默认配置，点击 "Deploy"

4. **获取链接**：部署完成后，Vercel 会生成一个公共 URL，分享给你的另一半

## 📸 添加照片

1. **准备照片**：将你的情侣照片重命名为 `photo1.jpg`、`photo2.jpg` 等

2. **上传照片**：将照片复制到 `public/images/` 文件夹

3. **更新配置**：照片墙会自动从 `siteData.ts` 中读取照片路径

4. **查看效果**：在照片墙页面点击草地任意位置，即可添加照片

## 🔄 同步功能

- **留言同步**：点击留言右上角的分享图标，生成链接发送给对方，对方打开后留言会保存在他/她的设备上

- **足迹同步**：点击足迹右上角的分享图标，生成链接发送给对方，对方打开后足迹会出现在他/她的足迹页面

## 💝 项目结构

```
couple-website/
├── components/         # 功能组件
│   ├── TimeCounter.tsx  # 时光计数器
│   ├── LoveNotes.tsx    # 甜蜜寄语
│   ├── MemoryGarden.tsx # 照片墙
│   ├── Footprints.tsx   # 共同足迹
├── public/             # 静态资源
│   ├── images/         # 照片文件夹
├── services/           # 服务
│   ├── geminiService.ts # AI 相关服务
├── utils/              # 工具函数
├── App.tsx             # 主应用组件
├── siteData.ts         # 网站配置数据
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 🌟 温馨提示

- 所有数据存储在本地浏览器中，不会上传到任何服务器
- 生成的分享链接只包含单个内容的数据，不包含其他信息
- 建议定期备份浏览器中的数据，以防数据丢失

---

❤️ 祝你们的爱情如星辰般永恒，如花朵般绽放！
