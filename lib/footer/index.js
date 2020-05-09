"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _react = _interopRequireDefault(require("react"));

require("./style.scss");

var Footer = _layout.default.Footer;

var FooterView = function FooterView() {
  return /*#__PURE__*/_react.default.createElement(Footer, {
    className: "at-footer"
  }, "Created By Atzuche");
};

var _default = FooterView;
exports.default = _default;