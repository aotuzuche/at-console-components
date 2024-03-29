---
group:
  title: Components
  path: /components
---

# DrawerForm

结合 [Form](/components/form)

### 使用

<code src="./demo/base.tsx" />

### 参数

| 属性        | 描述                                                                                  | 类型                                               | 默认值  |
| ----------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| isKeepAlive | 保留修改的 `Form` 状态（默认每次关闭后都会重置）                                      | `boolean`                                          | `false` |
| formProps   | Form 参数                                                                             | [Form](/components/form#参数)                      | -       |
| onOk        | `formProps.onFinish` 过后会自动调用 `onCancel`, 如果不想自动关闭可以返回 `false` 阻止 | `(values: Store) => Promise<any> \| false \| void` | -       |
