'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = ModalTable

var _modal = _interopRequireDefault(require('antd/lib/modal'))

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'))

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties'),
)

var _react = _interopRequireDefault(require('react'))

var _table = _interopRequireDefault(require('../table'))

function ModalTable(_ref) {
  var tableProps = _ref.tableProps,
    props = (0, _objectWithoutProperties2.default)(_ref, ['tableProps'])
  return /*#__PURE__*/ _react.default.createElement(
    _modal.default,
    (0, _extends2.default)(
      {
        footer: null,
      },
      props,
    ),
    /*#__PURE__*/ _react.default.createElement(_table.default, tableProps),
  )
}
