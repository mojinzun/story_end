# 故事管理系统

一个基于HTML、CSS、JavaScript的现代化故事管理系统，采用多页面架构设计。

## 项目结构

```
story/
├── index.html          # 仪表盘页面（首页）
├── users.html          # 用户管理页面
├── stories.html        # 故事管理页面
├── categories.html     # 分类管理页面（待开发）
├── vip.html           # VIP管理页面（待开发）
├── comments.html      # 评论管理页面（待开发）
├── orders.html        # 订单管理页面（待开发）
├── favorites.html     # 收藏管理页面（待开发）
├── settings.html      # 系统设置页面（待开发）
├── profile.html       # 个人资料页面（待开发）
├── logout.html        # 退出登录页面（待开发）
├── css/
│   └── style.css      # 全局样式文件
├── js/
│   ├── dashboard.js   # 仪表盘页面脚本
│   ├── users.js       # 用户管理页面脚本
│   └── stories.js     # 故事管理页面脚本
└── README.md          # 项目说明文档
```

## 功能特性

### 已实现功能
- ✅ 响应式侧边栏导航
- ✅ 用户管理（增删改查、搜索、分页）
- ✅ 故事管理（基础界面）
- ✅ 仪表盘统计展示
- ✅ 模态框操作
- ✅ 用户菜单下拉

### 待开发功能
- 🔄 分类管理
- 🔄 VIP管理
- 🔄 评论管理
- 🔄 订单管理
- 🔄 收藏管理
- 🔄 系统设置
- 🔄 个人资料
- 🔄 退出登录

## 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **图标**: Font Awesome 4.7.0
- **布局**: Flexbox + CSS Grid
- **架构**: 多页面应用 (MPA)

## 页面说明

### 仪表盘 (index.html)
- 系统概览统计
- 图表展示区域
- 最近活动列表

### 用户管理 (users.html)
- 用户列表展示
- 搜索和筛选功能
- 添加/编辑/删除用户
- 分页功能
- 模态框操作

### 故事管理 (stories.html)
- 故事列表展示
- 搜索和筛选功能
- 基础操作界面

## 使用方法

1. **直接打开**: 在浏览器中直接打开 `index.html` 文件
2. **本地服务器**: 使用本地服务器运行项目以获得更好的体验

```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 使用Node.js启动本地服务器
npx http-server

# 使用PHP启动本地服务器
php -S localhost:8000
```

3. **访问地址**: 打开浏览器访问 `http://localhost:8000`

## 导航说明

- 点击侧边栏的"汉堡菜单"按钮可以收起/展开侧边栏
- 点击用户头像可以打开用户菜单
- 每个页面都有独立的侧边栏导航，当前页面会高亮显示
- 所有页面都支持响应式设计，适配移动端

## 开发说明

### 添加新页面
1. 创建新的HTML文件
2. 复制现有页面的基础结构
3. 修改页面标题和导航高亮
4. 创建对应的JavaScript文件
5. 在侧边栏中添加导航链接

### 样式修改
- 全局样式在 `css/style.css` 中
- 使用CSS变量便于主题定制
- 响应式断点：1024px、768px、480px

### JavaScript模块
- 每个页面都有独立的JavaScript模块
- 使用ES6类进行代码组织
- 事件绑定在页面加载完成后执行

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License 