---
group:
  title: Components
  path: /components
---

# Wrapper

#### 默认模式

```jsx
/**
 * iframe: 600
 */
import React from 'react'
import Demo from './demo/base.tsx'

export default () => <Demo />
```

### 参数

| 属性           | 描述               | 类型                                    | 默认值   |
| -------------- | ------------------ | --------------------------------------- | -------- |
| systemCode     | 系统码或者菜单数据 | `string` \｜ `(() => Promise<IMenu[]>)` |          |
| title          | 标题               | `string`                                | 凹凸租车 |
| showMenuSearch | 显示菜单搜索框     | `boolean`                               | false    |
| logOut         | 注销事件          | `() => void`                            | `-`    |
| backHome       | 回到首页事件       | `() => void`                            | `-`  |
| showHome       | 是否展示回到首页按钮     | `boolean`                               | true    |
