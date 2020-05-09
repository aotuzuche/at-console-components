"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.some");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _layout = _interopRequireDefault(require("antd/lib/layout"));

require("./style");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compatible = require("@ant-design/compatible");

var _menuHandles = require("../utils/menuHandles");

var _arraryHelp = require("../utils/arraryHelp");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Sider = _layout.default.Sider;
var SubMenu = _menu.default.SubMenu;

var AsideView = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(AsideView, _React$PureComponent);

  var _super = _createSuper(AsideView);

  (0, _createClass2.default)(AsideView, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var defaultMenu = nextProps.defaultMenu,
          list = nextProps.list;

      if (list && (defaultMenu !== prevState.defaultMenu || list !== prevState.list)) {
        var currentMenu = (0, _menuHandles.findMenuInfo)(defaultMenu, list, 'url');
        var selectedKeys = list[0] ? [list[0].id.toString()] : [];
        var openKeys = []; // 如果找到当前菜单，定位当前菜单，然后展开相关的菜单

        if (currentMenu) {
          var _url = currentMenu.url;
          var ids = (0, _menuHandles.findMenuPathIds)(_url, list);
          var find = false;
          openKeys = ids.reverse().map(function (id) {
            var menu = (0, _menuHandles.findMenuInfo)(id, list);

            if (!find && !(0, _arraryHelp.isFalse)(menu.icon)) {
              selectedKeys = [menu.id.toString()];
              find = true;
            }

            return id.toString();
          });
        }

        return {
          list: list,
          defaultMenu: defaultMenu,
          openKeys: openKeys,
          selectedKeys: selectedKeys
        };
      } // 否则，对于state不进行任何操作


      return null;
    }
  }]);

  function AsideView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AsideView);
    _this = _super.call(this, props);
    _this.maskerRef = null;

    _this.onAsideMaskerClick = function () {
      var onMaskerClick = _this.props.onMaskerClick;
      onMaskerClick && onMaskerClick(true, false);
    };

    _this.onMenuHandle = function (e) {
      try {
        var _current = (0, _menuHandles.findMenuInfo)(e.key, _this.state.list);

        console.log(e.key, _this.state);

        if (_current) {
          _this.props.onMenuHandle(_current.url);
        }
      } catch (e) {
        console.log(e);

        _message2.default.error(e.msg || '系统异常');
      }
    };

    _this.onMenuSelect = function (e) {
      var selectedKeys = e.selectedKeys;

      _this.setState({
        selectedKeys: selectedKeys
      });
    };

    _this.onCollapse = function (collapsed) {
      _this.props.onCollapse(collapsed);
    };

    _this.recursionMenu = function (obj) {
      if (!(obj instanceof Array)) {
        return null;
      }

      return obj.map(function (item) {
        // 判断是否有子菜单
        var hasSub = false;

        if (item.children instanceof Array) {
          // 如果所有的子菜单都是隐藏形式的话
          // 就认为该菜单没有子菜单
          hasSub = item.children.some(function (res) {
            return !(0, _arraryHelp.isFalse)(res.icon);
          });
        }

        if (hasSub) {
          return /*#__PURE__*/_react.default.createElement(SubMenu, {
            key: item.id,
            title: /*#__PURE__*/_react.default.createElement("span", null, item.icon ? /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
              type: item.icon
            }) : /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
              type: "folder"
            }), /*#__PURE__*/_react.default.createElement("span", null, item.name))
          }, _this.recursionMenu(item.children));
        } // 不显示隐藏形式的菜单


        if ((0, _arraryHelp.isFalse)(item.icon)) {
          return null;
        }

        return /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
          key: item.id
        }, item.icon ? /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
          type: item.icon
        }) : /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
          type: "file"
        }), /*#__PURE__*/_react.default.createElement("span", null, item.name));
      });
    };

    _this.state = {
      selectedKeys: [],
      openKeys: [],
      list: null,
      defaultMenu: null
    };
    _this.maskerRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(AsideView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.maskerRef.current.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, {
        passive: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$breakpoin = _this$props.breakpoint,
          breakpoint = _this$props$breakpoin === void 0 ? 'lg' : _this$props$breakpoin,
          collapsed = _this$props.collapsed,
          screens = _this$props.screens,
          fixedAside = _this$props.fixedAside,
          title = _this$props.title;
      var _this$state = this.state,
          list = _this$state.list,
          openKeys = _this$state.openKeys,
          selectedKeys = _this$state.selectedKeys;
      var siderClassName = (0, _classnames.default)('at-sider-wrapper', {
        breakpoint: !screens.md,
        fixedAside: !screens.md && fixedAside
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: siderClassName
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "at-sider-wrapper-masker",
        onClick: this.onAsideMaskerClick,
        ref: this.maskerRef
      }), /*#__PURE__*/_react.default.createElement(Sider, {
        className: "at-sider",
        width: "256",
        collapsedWidth: "80",
        breakpoint: breakpoint,
        collapsed: collapsed,
        onCollapse: this.onCollapse
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "at-logo"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: "https://cdn.atzuche.com/static/images/icon-logo-green.png",
        alt: "logo"
      }), /*#__PURE__*/_react.default.createElement("h1", null, title)), /*#__PURE__*/_react.default.createElement(_menu.default, {
        openKeys: openKeys,
        selectedKeys: selectedKeys,
        mode: "inline",
        theme: "dark",
        onClick: this.onMenuHandle,
        onSelect: this.onMenuSelect,
        onOpenChange: function onOpenChange(e) {
          _this2.setState({
            openKeys: e
          });
        }
      }, this.recursionMenu(list))));
    }
  }]);
  return AsideView;
}(_react.default.PureComponent);

var _default = AsideView;
exports.default = _default;