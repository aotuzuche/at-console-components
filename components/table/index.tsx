import DownOutlined from '@ant-design/icons/DownOutlined'
import RedoOutlined from '@ant-design/icons/RedoOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { Button, Col, Form as AntdForm, Row, Space, Table as AntdTable, Tooltip } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { TableProps as AntdTableProps } from 'antd/lib/table'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import mapValues from 'lodash/mapValues'
import pickBy from 'lodash/pickBy'
import AsyncButton from '../async-button'
import Form, { FormProps } from '../form'
import useStates from '../hooks/useStates'
import { isFunc } from '../utils/is'
import showDesensitize, { DesensitizeType } from '../utils/showDesensitize'
import showPlaceHolder from '../utils/showPlaceholder'
import { getHistoryState, setHistoryState } from './historyState'
import useWindowSize from './useWindowSize'
import React, {
  useEffect,
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  ReactNode,
} from 'react'
import {
  SorterResult,
  TableCurrentDataSource,
  Key,
  ColumnsType,
  ColumnGroupType,
  ColumnType,
  TablePaginationConfig,
} from 'antd/lib/table/interface'

const { useForm } = AntdForm

interface TableCommonProps {
  /**
   * If show when data nullish
   * @default -
   */
  placeholder?: string

  // 信息脱敏
  desensitize?: DesensitizeType | string
}

export interface TableSearchProps extends FormProps {
  /**
   * Show search form item count
   * @default 3
   */
  initialCount?: number
  /**
   * Support search form string value trim
   */
  allowTrim?: boolean
  addonButtons?: React.ReactNode
  disabledSearchBtn?: boolean
  disabledSearchBtnAddonAfter?: React.ReactNode // 隐藏搜索按钮之后，替代组件
}

interface TablePaginationName {
  /**
   * @default total
   */
  totalName?: string
  /**
   * @default pageSize
   */
  pageSizeName?: string
  /**
   * @default pageNum
   */
  pageNumName?: string
  /**
   * @default data
   */
  dataName?: string
  /**
   * @default 20
   */
  pageSize?: number
  /**
   * @default 1
   */
  pageNum?: number
}

export interface TableData<RecordType> {
  data: RecordType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// interface TableColumnsProps extends TableCommonProps {}

export type TableColumnsType<RecordType> = TableCommonProps &
  (ColumnGroupType<RecordType> | ColumnType<RecordType>)

export interface TableOnSearchChangeState<RecordType> {
  paginationConfig?: TablePaginationConfig
  filters?: Record<string, (Key | boolean)[] | null>
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  extra?: TableCurrentDataSource<RecordType>
  isInit?: boolean
}
export interface TableProps<RecordType>
  extends Omit<AntdTableProps<RecordType>, 'title' | 'summary'>,
    TablePaginationName,
    TableCommonProps {
  searchProps?: TableSearchProps
  onReset?: () => void
  onSearch?:
    | RecordType[]
    | ((
        params: Store,
        changeState?: TableOnSearchChangeState<RecordType>,
      ) => TableData<RecordType> | Promise<TableData<RecordType>>)
  columns?: TableColumnsType<RecordType>[]
  /**
   * Show Table quick tools (refresh ...)
   */
  showTools?: boolean
  isKeepAlive?: boolean
  title?: (data: TableData<RecordType>) => ReactNode
  toolbar?: (data: TableData<RecordType>) => ReactNode
  summary?: (data: RecordType[], pageData: TableData<RecordType>) => ReactNode
}

export interface TableRef {
  /**
   * Refresh Table data with existing search params
   */
  refresh: () => Promise<unknown>
  getSearchBarFieldsValue: () => any
  setSearchBarFieldsValue: (obj: any) => any
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Table<RecordType extends object>(
  {
    searchProps: tableSearchProps,
    onSearch: onTableSearch,
    pagination,
    totalName = 'total',
    pageSize = 20,
    pageSizeName = 'pageSize',
    pageNum = 1,
    pageNumName = 'pageNum',
    dataName = 'data',
    onChange: onTableChange,
    columns,
    placeholder: tablePlaceholder = '-',
    toolbar,
    title,
    showTools,
    scroll,
    isKeepAlive = false,
    sticky,
    summary,
    onReset: onTableReset,
    ...props
  }: TableProps<RecordType>,
  ref: Ref<TableRef>,
) {
  const [form] = useForm(tableSearchProps?.form)
  const { height } = useWindowSize()
  const [state, setState] = useStates<{
    loading: boolean
    isExpand: boolean
    data: TableData<RecordType>
    pageNum: number
    pageSize: number
  }>({
    loading: false,
    isExpand: false,
    data: { data: [] },
    pageNum,
    pageSize,
  })
  const isShowTableTool = !!(toolbar || showTools)

  // get data source
  const onSearch = async (
    params: Store = {},
    changeState: TableOnSearchChangeState<RecordType> = {},
  ) => {
    try {
      if (!isFunc(onTableSearch)) {
        return
      }
      setState({
        loading: true,
      })
      const searchValues = await form.validateFields()

      const searchParams = pickBy(
        {
          ...(pagination === false
            ? {}
            : {
                [pageNumName]: state.pageNum,
                [pageSizeName]: pageSize,
              }),
          ...params,
          ...searchValues,
        },
        param => param !== '' && param !== undefined && param !== null,
      )

      const cloneTableSearchParams = cloneDeep(searchParams)

      const result = await onTableSearch(
        tableSearchProps?.allowTrim
          ? mapValues(cloneTableSearchParams, value =>
              typeof value === 'string' ? value.trim() : value,
            )
          : cloneTableSearchParams,
        changeState,
      )

      setState({
        data: result,
      })

      isKeepAlive && setHistoryState(searchParams)
    } finally {
      setState({
        loading: false,
      })
    }
  }

  const refresh = () => onSearch()

  const getSearchBarFieldsValue = () => form.getFieldsValue(true)

  const setSearchBarFieldsValue = (obj: any) => form.setFieldsValue(obj)

  const onClickSearch = () => {
    setState({
      pageNum: 1,
    })
    return onSearch({
      [pageNumName]: 1,
    })
  }

  const onReset = () => {
    setState({
      pageNum: 1,
    })
    isKeepAlive && setHistoryState({})
    if (onTableReset) {
      // 外部手动调用search
      onTableReset()
    } else {
      onSearch({
        [pageNumName]: 1,
      })
    }
  }

  const onChange = (
    paginationConfig: TablePaginationConfig,
    filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: TableCurrentDataSource<RecordType>,
  ) => {
    setState({
      pageNum: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    })

    onSearch(
      {
        [pageNumName]: paginationConfig.current,
        [pageSizeName]: paginationConfig.pageSize,
      },
      {
        paginationConfig,
        filters,
        sorter,
        extra,
      },
    )

    if (isFunc(onTableChange)) {
      onTableChange(paginationConfig, filters, sorter, extra)
    }
  }

  const renderColumns: () => ColumnsType<RecordType> | undefined = () =>
    columns?.map(({ placeholder = tablePlaceholder, desensitize, render, ...columnProps }) => ({
      ...columnProps,
      render: (text, record, index) => {
        if (isFunc(render)) {
          const result = render(text, record, index)
          return showPlaceHolder(result, placeholder)
        }

        if (desensitize) {
          return showPlaceHolder(showDesensitize(text, desensitize), placeholder)
        }

        return showPlaceHolder(text, placeholder)
      },
    }))

  const renderSearchColumns = () => {
    if (!tableSearchProps) {
      return null
    }
    const { initialCount = 3, items, addonButtons, ...searchProps } = tableSearchProps

    const { disabledSearchBtn, disabledSearchBtnAddonAfter } = searchProps

    return (
      <>
        <Form
          items={
            state.isExpand
              ? items
              : items.map((item, index) => {
                  if (index >= initialCount) {
                    return {
                      ...item,
                      hidden: true,
                    }
                  }
                  return item
                })
          }
          form={form}
          layoutCol={{
            span: 6,
            xs: 12,
            sm: 12,
            md: 12,
            lg: 8,
            xl: 6,
          }}
          onReset={onReset}
          {...searchProps}
        >
          <Form.Item noStyle>
            <Row justify="end">
              <Space>
                {disabledSearchBtn ? (
                  disabledSearchBtnAddonAfter
                ) : (
                  <AsyncButton onClick={onClickSearch} type="primary" icon={<SearchOutlined />}>
                    搜索
                  </AsyncButton>
                )}
                <Button htmlType="reset">重置</Button>
                {addonButtons}
                {items.length > initialCount && (
                  <Button
                    type="link"
                    style={{
                      padding: '0 0 0 4px',
                    }}
                    onClick={() => {
                      setState({
                        isExpand: !state.isExpand,
                      })
                    }}
                  >
                    {state.isExpand ? '收起' : '展开'}
                    <DownOutlined rotate={state.isExpand ? 180 : 0} />
                  </Button>
                )}
              </Space>
            </Row>
          </Form.Item>
        </Form>
        {isShowTableTool && <div style={{ height: '16px' }} />}
      </>
    )
  }

  const renderTool = () => (
    <Row justify="space-between" style={{ marginBottom: '16px' }}>
      <Col flex={1}>{toolbar && toolbar(state.data)}</Col>
      {showTools && (
        <Col>
          <Tooltip title="刷新">
            <Button onClick={() => refresh()}>
              <RedoOutlined
                spin={state.loading}
                style={{
                  fontSize: 18,
                }}
              />
            </Button>
          </Tooltip>
        </Col>
      )}
    </Row>
  )

  const onInit = () => {
    const histroyState = isKeepAlive ? getHistoryState() : {}
    const historyPageNum = histroyState[pageNumName] || 1

    isKeepAlive && form.setFieldsValue(histroyState)

    setState({
      pageNum: historyPageNum,
    })
    onSearch(
      {
        [pageNumName]: historyPageNum,
        ...(isKeepAlive ? getHistoryState() : {}),
      },
      {
        isInit: true,
      },
    )
  }

  useEffect(() => {
    onInit()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh,
    getSearchBarFieldsValue,
    setSearchBarFieldsValue,
  }))

  return (
    <div>
      {renderSearchColumns()}
      {isShowTableTool ? renderTool() : undefined}
      <AntdTable<RecordType>
        {...props}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 'max-content',
          y: sticky ? undefined : height,
          ...scroll,
        }}
        sticky={sticky}
        columns={renderColumns()}
        onChange={onChange}
        loading={state.loading}
        dataSource={isFunc(onTableSearch) ? get(state.data, dataName) : onTableSearch}
        pagination={
          pagination === false
            ? pagination
            : {
                showTotal: total => `共 ${total} 条`,
                total: get(state.data, totalName),
                current: state.pageNum,
                pageSize: state.pageSize,
                ...pagination,
              }
        }
        title={title ? () => title(state.data) : void 0}
        // @ts-ignore
        summary={summary ? data => summary(data, state.data) : undefined}
      />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default forwardRef(Table) as <RecordType extends object>(
  p: TableProps<RecordType> & { ref?: Ref<TableRef> },
) => ReactElement
