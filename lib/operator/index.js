"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

require("./style.scss");

var _icons = require("@ant-design/icons");

/**
 * 对操作栏的二次封装
 *
 * 用法
 * <Operator>
 *   <span>操作1</span>
 *   <span>操作2</span>
 *   <span>操作3</span>
 * </Operator>
 *
 * 1. 字体颜色（可点击）
 * 2. 间隔
 * 3. 超过三个操作进行折叠
 *
 * @param {*} props
 * @returns
 */
function Operator(_ref) {
  var _ref$len = _ref.len,
      len = _ref$len === void 0 ? 2 : _ref$len,
      props = (0, _objectWithoutProperties2.default)(_ref, ["len"]);
  var children = props.children;
  var composition = [].concat(children);

  if (composition.length > len) {
    var overlay = /*#__PURE__*/_react.default.createElement(_menu.default, null, composition.slice(len - 1).map(function (child, index) {
      var _child$props;

      // 把子元素的 onClick 提上来，防止 inline 元素触发体验差
      var childClick = child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.onClick;
      return /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
        onClick: childClick,
        key: index
      }, _react.default.cloneElement(child, {
        onClick: function onClick() {}
      }));
    }));

    composition = [composition.slice(0, len - 1), /*#__PURE__*/_react.default.createElement(_dropdown.default, {
      overlay: overlay,
      key: "at-operator-dropdown"
    }, /*#__PURE__*/_react.default.createElement("span", null, "\u66F4\u591A ", /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)))];
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "at-operator"
  }, composition);
}

var _default = Operator;
exports.default = _default;