'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

require('core-js/modules/es.symbol')

require('core-js/modules/es.array.filter')

require('core-js/modules/es.array.for-each')

require('core-js/modules/es.object.get-own-property-descriptor')

require('core-js/modules/es.object.get-own-property-descriptors')

require('core-js/modules/es.object.keys')

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.reflect.construct')

require('core-js/modules/es.regexp.to-string')

require('core-js/modules/web.dom-collections.for-each')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _layout = _interopRequireDefault(require('antd/lib/layout'))

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'))

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'))

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn'),
)

var _getPrototypeOf2 = _interopRequireDefault(require('@babel/runtime/helpers/getPrototypeOf'))

require('./style')

var _react = _interopRequireDefault(require('react'))

var _autoLibs = require('auto-libs')

var _compatible = require('@ant-design/compatible')

var _classnames = _interopRequireDefault(require('classnames'))

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

function _createSuper(Derived) {
  return function() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result
    if (_isNativeReflectConstruct()) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return (0, _possibleConstructorReturn2.default)(this, result)
  }
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {}))
    return true
  } catch (e) {
    return false
  }
}

var HeaderView = /*#__PURE__*/ (function(_React$PureComponent) {
  ;(0, _inherits2.default)(HeaderView, _React$PureComponent)

  var _super = _createSuper(HeaderView)

  ;(0, _createClass2.default)(HeaderView, null, [
    {
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.collapsed !== prevState.collapsed) {
          return _objectSpread({}, prevState, {
            triggerIcon: nextProps.collapsed ? 'fold' : 'unfold',
          })
        }

        return null
      },
    },
  ])

  function HeaderView(props) {
    var _this

    ;(0, _classCallCheck2.default)(this, HeaderView)
    _this = _super.call(this, props)
    _this.userInfo = null

    _this.onTrigger = function() {
      var _this$props = _this.props,
        breakpoint = _this$props.breakpoint,
        onCollapse = _this$props.onCollapse,
        collapsed = _this$props.collapsed
      onCollapse && onCollapse(!collapsed, breakpoint)
    }

    _this.onGoMain = function() {
      history.replaceState(null, '', '/system')
      location.reload()
    }

    _this.onLogout = function() {
      ;(0, _autoLibs.clearConsoleToken)()
      history.replaceState(null, '', '/system/login')
      location.reload()
    }

    _this.state = {
      hello: '',
      collapsed: false,
      triggerIcon: 'unfold',
      loginName: '',
    }
    return _this
  }

  ;(0, _createClass2.default)(HeaderView, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        try {
          this.userInfo = localStorage['auto_system_userData']
            ? JSON.parse(localStorage['auto_system_userData'])
            : {}
        } catch (e) {
          this.userInfo = {}
        }

        var loginName = this.userInfo.loginName ? this.userInfo.loginName : ''
        var now = new Date()
        var hour = now.getHours()
        var hello = '' // 0:00 ~ 5:59

        if (hour > 0 && hour < 6) {
          hello = '凌晨好：'
        } // 6:00 ~ 10:59
        else if (hour >= 6 && hour < 11) {
          hello = '上午好：'
        } // 11:00 ~ 12:59
        else if (hour >= 11 && hour < 13) {
          hello = '中午好：'
        } // 13:00 ~ 17:59
        else if (hour >= 13 && hour < 18) {
          hello = '下午好：'
        } // 16:00 ~ 23:59
        else {
          hello = '晚上好：'
        }

        this.setState({
          hello: hello,
          loginName: loginName,
        })
      }, // 点击ICon菜单收起或者展开
    },
    {
      key: 'render',
      value: function render() {
        var state = this.state,
          props = this.props
        var breakpoint = props.breakpoint
        var className = (0, _classnames.default)('at-header-bar', {
          breakpoint: breakpoint,
        })
        return /*#__PURE__*/ _react.default.createElement(
          _layout.default.Header,
          {
            className: className,
          },
          breakpoint &&
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'at-header-logo',
              },
              /*#__PURE__*/ _react.default.createElement('img', {
                src: 'https://cdn.atzuche.com/static/images/icon-logo-green.png',
                alt: 'logo',
              }),
            ),
          /*#__PURE__*/ _react.default.createElement(_compatible.Icon, {
            type: 'menu-' + state.triggerIcon,
            onClick: this.onTrigger,
            className: 'at-trigger',
          }),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'at-userInfo',
            },
            /*#__PURE__*/ _react.default.createElement(
              'p',
              null,
              this.state.hello,
              /*#__PURE__*/ _react.default.createElement('strong', null, this.state.loginName),
            ),
            /*#__PURE__*/ _react.default.createElement(
              'p',
              null,
              /*#__PURE__*/ _react.default.createElement(
                'a',
                {
                  onClick: this.onGoMain,
                },
                /*#__PURE__*/ _react.default.createElement(_compatible.Icon, {
                  type: 'appstore-o',
                }),
                '\u8FD4\u56DE\u5165\u53E3',
              ),
              /*#__PURE__*/ _react.default.createElement(
                'a',
                {
                  onClick: this.onLogout,
                },
                /*#__PURE__*/ _react.default.createElement(_compatible.Icon, {
                  type: 'poweroff',
                }),
                '\u9000\u51FA\u767B\u5F55',
              ),
            ),
          ),
        )
      },
    },
  ])
  return HeaderView
})(_react.default.PureComponent)

var _default = HeaderView
exports.default = _default
