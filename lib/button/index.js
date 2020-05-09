"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ATButton;

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

function ATButton(props) {
  var children = props.children,
      atOnClick = props.onClick,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["children", "onClick"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var onClick = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoading(true);
              _context.t0 = atOnClick;

              if (!_context.t0) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return atOnClick();

            case 6:
              _context.next = 10;
              break;

            case 8:
              _context.prev = 8;
              _context.t1 = _context["catch"](0);

            case 10:
              _context.prev = 10;
              setLoading(false);
              return _context.finish(10);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8, 10, 13]]);
    }));

    return function onClick() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react.default.createElement(_button.default, (0, _extends2.default)({
    loading: loading,
    onClick: onClick
  }, otherProps), children);
}