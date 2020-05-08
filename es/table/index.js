'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

require('core-js/modules/es.symbol')

require('core-js/modules/es.array.filter')

require('core-js/modules/es.array.for-each')

require('core-js/modules/es.array.map')

require('core-js/modules/es.array.slice')

require('core-js/modules/es.object.get-own-property-descriptor')

require('core-js/modules/es.object.get-own-property-descriptors')

require('core-js/modules/es.object.keys')

require('core-js/modules/web.dom-collections.for-each')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _table = _interopRequireDefault(require('antd/lib/table'))

var _tooltip = _interopRequireDefault(require('antd/lib/tooltip'))

var _col = _interopRequireDefault(require('antd/lib/col'))

var _divider = _interopRequireDefault(require('antd/lib/divider'))

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'))

var _row = _interopRequireDefault(require('antd/lib/row'))

var _space = _interopRequireDefault(require('antd/lib/space'))

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'))

require('regenerator-runtime/runtime')

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'))

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'))

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties'),
)

var _form = _interopRequireDefault(require('antd/lib/form'))

var _react = _interopRequireWildcard(require('react'))

var _SearchOutlined = _interopRequireDefault(require('@ant-design/icons/SearchOutlined'))

var _DownOutlined = _interopRequireDefault(require('@ant-design/icons/DownOutlined'))

var _RedoOutlined = _interopRequireDefault(require('@ant-design/icons/RedoOutlined'))

var _get = _interopRequireDefault(require('lodash/get'))

var _form2 = _interopRequireDefault(require('../form'))

var _button = _interopRequireDefault(require('../button'))

var _is = require('../utils/is')

var _showPlaceholder = _interopRequireDefault(require('../utils/showPlaceholder'))

var _useStates3 = _interopRequireDefault(require('../hooks/useStates'))

var _historyState = require('./historyState')

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        ;(0, _defineProperty2.default)(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
      })
    }
  }
  return target
}

var useForm = _form.default.useForm

function Table(_ref, ref) {
  var tableSearchProps = _ref.searchProps,
    onTableSearch = _ref.onSearch,
    pagination = _ref.pagination,
    _ref$totalName = _ref.totalName,
    totalName = _ref$totalName === void 0 ? 'total' : _ref$totalName,
    _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 20 : _ref$pageSize,
    _ref$pageSizeName = _ref.pageSizeName,
    pageSizeName = _ref$pageSizeName === void 0 ? 'pageSize' : _ref$pageSizeName,
    _ref$pageNum = _ref.pageNum,
    pageNum = _ref$pageNum === void 0 ? 1 : _ref$pageNum,
    _ref$pageNumName = _ref.pageNumName,
    pageNumName = _ref$pageNumName === void 0 ? 'pageNum' : _ref$pageNumName,
    _ref$dataName = _ref.dataName,
    dataName = _ref$dataName === void 0 ? 'data' : _ref$dataName,
    onTableChange = _ref.onChange,
    columns = _ref.columns,
    _ref$placeholder = _ref.placeholder,
    tablePlaceholder = _ref$placeholder === void 0 ? '-' : _ref$placeholder,
    title = _ref.title,
    showTools = _ref.showTools,
    scroll = _ref.scroll,
    _ref$isKeepAlive = _ref.isKeepAlive,
    isKeepAlive = _ref$isKeepAlive === void 0 ? false : _ref$isKeepAlive,
    props = (0, _objectWithoutProperties2.default)(_ref, [
      'searchProps',
      'onSearch',
      'pagination',
      'totalName',
      'pageSize',
      'pageSizeName',
      'pageNum',
      'pageNumName',
      'dataName',
      'onChange',
      'columns',
      'placeholder',
      'title',
      'showTools',
      'scroll',
      'isKeepAlive',
    ])

  var _useForm = useForm(),
    _useForm2 = (0, _slicedToArray2.default)(_useForm, 1),
    form = _useForm2[0] // const { height } = useWindowSize()

  var _useStates = (0, _useStates3.default)({
      loading: false,
      isExpand: false,
      data: {
        data: [],
      },
      pageNum: pageNum,
    }),
    _useStates2 = (0, _slicedToArray2.default)(_useStates, 2),
    state = _useStates2[0],
    setState = _useStates2[1]

  var isShowTableTitle = !!(title || showTools) // get data source

  var onSearch = /*#__PURE__*/ (function() {
    var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/ _regenerator.default.mark(function _callee(params, changeState) {
        var _ref3, searchValues, searchParams, result

        return _regenerator.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0
                  setState({
                    loading: true,
                  })
                  searchValues = form.getFieldsValue()
                  searchParams = _objectSpread(
                    {},
                    pagination === false
                      ? {}
                      : ((_ref3 = {}),
                        (0, _defineProperty2.default)(_ref3, pageNumName, state.pageNum),
                        (0, _defineProperty2.default)(_ref3, pageSizeName, pageSize),
                        _ref3),
                    {},
                    params,
                    {},
                    searchValues,
                  )
                  _context.next = 6
                  return onTableSearch(searchParams, changeState)

                case 6:
                  result = _context.sent
                  setState({
                    data: result,
                  })
                  isKeepAlive && (0, _historyState.setHistoryState)(searchParams)

                case 9:
                  _context.prev = 9
                  setState({
                    loading: false,
                  })
                  return _context.finish(9)

                case 12:
                case 'end':
                  return _context.stop()
              }
            }
          },
          _callee,
          null,
          [[0, , 9, 12]],
        )
      }),
    )

    return function onSearch(_x, _x2) {
      return _ref2.apply(this, arguments)
    }
  })()

  var refresh = function refresh() {
    return onSearch()
  }

  var onClickSearch = function onClickSearch() {
    setState({
      pageNum: 1,
    })
    return onSearch((0, _defineProperty2.default)({}, pageNumName, 1))
  }

  var onTableReset = function onTableReset() {
    setState({
      pageNum: 1,
    })
    form.resetFields()
    isKeepAlive && (0, _historyState.setHistoryState)({})
    onSearch((0, _defineProperty2.default)({}, pageNumName, 1))
  }

  var onChange = function onChange(paginationConfig, filters, sorter, extra) {
    setState({
      pageNum: paginationConfig.current,
    })
    onSearch((0, _defineProperty2.default)({}, pageNumName, paginationConfig.current), {
      paginationConfig: paginationConfig,
      filters: filters,
      sorter: sorter,
      extra: extra,
    })

    if ((0, _is.isFunc)(onTableChange)) {
      onTableChange(paginationConfig, filters, sorter, extra)
    }
  }

  var renderColumns = function renderColumns() {
    return columns === null || columns === void 0
      ? void 0
      : columns.map(function(_ref4) {
          var _ref4$placeholder = _ref4.placeholder,
            placeholder = _ref4$placeholder === void 0 ? tablePlaceholder : _ref4$placeholder,
            _render = _ref4.render,
            columnProps = (0, _objectWithoutProperties2.default)(_ref4, ['placeholder', 'render'])
          return _objectSpread({}, columnProps, {
            render: function render(text, record, index) {
              if ((0, _is.isFunc)(_render)) {
                var result = _render(text, record, index)

                return (0, _showPlaceholder.default)(result, placeholder)
              }

              return (0, _showPlaceholder.default)(text, placeholder)
            },
          })
        })
  }

  var renderSearchColumns = function renderSearchColumns() {
    if (!tableSearchProps) {
      return null
    }

    var _tableSearchProps$ini = tableSearchProps.initialCount,
      initialCount = _tableSearchProps$ini === void 0 ? 3 : _tableSearchProps$ini,
      items = tableSearchProps.items,
      searchProps = (0, _objectWithoutProperties2.default)(tableSearchProps, [
        'initialCount',
        'items',
      ])
    return /*#__PURE__*/ _react.default.createElement(
      _react.default.Fragment,
      null,
      /*#__PURE__*/ _react.default.createElement(
        _form2.default,
        (0, _extends2.default)(
          {
            items: state.isExpand ? items : items.slice(0, initialCount),
            form: form,
            layoutCol: {
              span: 6,
            },
          },
          searchProps,
        ),
        /*#__PURE__*/ _react.default.createElement(
          _row.default,
          {
            justify: 'end',
          },
          /*#__PURE__*/ _react.default.createElement(
            _space.default,
            null,
            /*#__PURE__*/ _react.default.createElement(
              _button.default,
              {
                onClick: onClickSearch,
                type: 'primary',
                icon: /*#__PURE__*/ _react.default.createElement(_SearchOutlined.default, null),
              },
              '\u641C\u7D22',
            ),
            /*#__PURE__*/ _react.default.createElement(
              _button.default,
              {
                onClick: onTableReset,
              },
              '\u91CD\u7F6E',
            ),
            /*#__PURE__*/ _react.default.createElement(
              _button.default,
              {
                type: 'link',
                style: {
                  padding: '0 0 0 4px',
                },
                onClick: function onClick() {
                  setState({
                    isExpand: !state.isExpand,
                  })
                },
              },
              state.isExpand ? '收起' : '展开',
              /*#__PURE__*/ _react.default.createElement(_DownOutlined.default, {
                rotate: state.isExpand ? 180 : 0,
              }),
            ),
          ),
        ),
      ),
      isShowTableTitle &&
        /*#__PURE__*/ _react.default.createElement(_divider.default, {
          style: {
            margin: 0,
          },
        }),
    )
  }

  var renderTitle = function renderTitle() {
    return /*#__PURE__*/ _react.default.createElement(
      _row.default,
      {
        justify: 'space-between',
      },
      /*#__PURE__*/ _react.default.createElement(_col.default, null, title && title(state.data)),
      showTools &&
        /*#__PURE__*/ _react.default.createElement(
          _col.default,
          null,
          /*#__PURE__*/ _react.default.createElement(
            _tooltip.default,
            {
              title: '\u5237\u65B0',
            },
            /*#__PURE__*/ _react.default.createElement(_RedoOutlined.default, {
              onClick: function onClick() {
                return refresh()
              },
              spin: state.loading,
              style: {
                fontSize: 18,
              },
            }),
          ),
        ),
    )
  }

  var onInit = function onInit() {
    var histroyState = isKeepAlive ? (0, _historyState.getHistoryState)() : {}
    var historyPageNum = histroyState[pageNumName] || 1
    isKeepAlive && form.setFieldsValue(histroyState)
    setState({
      pageNum: historyPageNum,
    })
    onSearch(
      _objectSpread(
        (0, _defineProperty2.default)({}, pageNumName, historyPageNum),
        isKeepAlive ? (0, _historyState.getHistoryState)() : {},
      ),
      {
        isInit: true,
      },
    )
  }

  ;(0, _react.useEffect)(function() {
    onInit()
  }, [])
  ;(0, _react.useImperativeHandle)(ref, function() {
    return {
      refresh: refresh,
    }
  })
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    null,
    renderSearchColumns(),
    /*#__PURE__*/ _react.default.createElement(
      _table.default,
      (0, _extends2.default)({}, props, {
        tableLayout: 'auto',
        scroll: _objectSpread(
          {
            scrollToFirstRowOnChange: true,
            x: 'max-content',
            y: 'max-content',
          },
          scroll,
        ),
        columns: renderColumns(),
        onChange: onChange,
        loading: state.loading,
        dataSource: (0, _get.default)(state.data, dataName),
        pagination:
          pagination === false
            ? pagination
            : _objectSpread(
                {
                  // Hide if single page
                  hideOnSinglePage: true,
                  showSizeChanger: false,
                  showTotal: function showTotal(total) {
                    return '\u5171 '.concat(total, ' \u6761')
                  },
                  total: (0, _get.default)(state.data, totalName),
                  current: state.pageNum,
                  pageSize: pageSize,
                },
                pagination,
              ),
        title: isShowTableTitle ? renderTitle : void 0,
      }),
    ),
  )
}

var _default = (0, _react.forwardRef)(Table)

exports.default = _default
