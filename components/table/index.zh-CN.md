---
group:
  title: Components
  path: /components
---

## Table

### 使用

<code src="./demo/base.tsx" />

### 参数

| 属性        | 描述                                 | 类型                                                                          | 默认值  |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------- | ------- |
| onSearch    | 数据获取                             | `() => Promise<TableData> \| TableData`                                       | -       |
| searchProps | 搜索栏参数                           | [SearchProps](/components/table#SearchProps) \| [Form](/components/form#参数) | -       |
| showTools   | 是否显示工具栏（刷新）               | `boolean`                                                                     | `false` |
| toolbar     | 自定义工具栏（新增、批量处理按钮等） | `(TableData) => React.ReactNode`                                              | -       |
| columns     | 表格列的配置描述                     | `Array`                                                                       |         |
| isKeepAlive | 是否缓存搜索参数                     | `boolean`                                                                     | `false` |

#### SearchProps

| 属性         | 描述                   | 类型              | 默认值 |
| ------------ | ---------------------- | ----------------- | ------ |
| initialCount | 初始显示个数           | `number`          | 3      |
| allowTrim    | 是否对搜索参数进行     | `boolean`         | false  |
| addonButtons | 搜索栏处添加额外的按钮 | `React.ReactNode` | null   |

#### TableData

| 属性         | 描述         | 类型     | 默认值     |
| ------------ | ------------ | -------- | ---------- |
| data         | 数据源       | `T[]`    | -          |
| dataName     | 数据字段名   | `string` | `data`     |
| total        | 数据总量     | `string` | -          |
| pageSize     | 分页大小     | `string` | 20         |
| pageSizeName | 分页字段名   | `string` | `pageSize` |
| pageNum      | 当前页       | `string` | `1`        |
| pageNumName  | 当前页字段名 | `string` | `pageNum`  |
| totalName    | 总条数字段名 | `string` | `total`    |

#### Table Instance Methods

| 属性                    | 描述            | 类型     | 默认值 |
| ----------------------- | --------------- | -------- | ------ |
| refresh                 | 刷新 table 数据 | function | void   |
| getSearchBarFieldsValue | 获取搜索框的值  | function | any    |
| setSearchBarFieldsValue | 设置搜索框的值  | function | any    |
