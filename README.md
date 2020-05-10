# atzuche-backstage-template

管理后台基础模板

```bash
.
├── README.md
├── appConfig.js
├── auth.js
├── babel.config.js
├── jsconfig.json
├── package.json
├── src
│   ├── assets # 公用资源
│   │   └── scss
│   ├── components # 公用组件
│   │   ├── aside
│   │   ├── fetch
│   │   ├── footer
│   │   ├── form
│   │   ├── header
│   │   ├── searchBar # 搜索栏
│   │   ├── table # Table
│   │   └── upload
│   ├── dva.js
│   ├── hoc # 高阶组件
│   │   └── tool.js
│   ├── main.js
│   ├── models # dva model
│   │   ├── home.js
│   │   └── index.js
│   ├── routes # 路由
│   │   ├── app.jsx
│   │   ├── index.js
│   │   └── style.scss
│   ├── services # dva service
│   │   └── index.js
│   ├── store.js
│   ├── style.scss
│   ├── template.html
│   ├── utils # 公用方法
│   │   ├── deepFind.js
│   │   ├── ignoreProps.js
│   │   └── menuHandles.js
│   └── views # 页面模块
│       └── home
└── yarn.lock
```

### 页面基础结构

`render`

```jsx
<Layout>
  <ATSearchBar />
  <ATTable />
</Layout>
```

文档在各自的组件页面









