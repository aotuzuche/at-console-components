'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _modal = _interopRequireDefault(require('antd/lib/modal'))

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'))

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

require('regenerator-runtime/runtime')

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'))

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'))

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties'),
)

var _form = _interopRequireDefault(require('antd/lib/form'))

var _react = _interopRequireWildcard(require('react'))

var _form2 = _interopRequireDefault(require('../form'))

var _is = require('../utils/is')

var useForm = _form.default.useForm

var ModalForm = function ModalForm(_ref) {
  var formProps = _ref.formProps,
    onOk = _ref.onOk,
    visible = _ref.visible,
    props = (0, _objectWithoutProperties2.default)(_ref, ['formProps', 'onOk', 'visible'])

  var _useForm = useForm(),
    _useForm2 = (0, _slicedToArray2.default)(_useForm, 1),
    form = _useForm2[0]

  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1]

  var onModalOk = function onModalOk() {
    form.submit()
  }

  var onModalFormFinish = /*#__PURE__*/ (function() {
    var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/ _regenerator.default.mark(function _callee(values) {
        var isNeedCloseWhenOnFinish, onCancel, result
        return _regenerator.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0
                  setLoading(true)
                  isNeedCloseWhenOnFinish = true
                  onCancel = props.onCancel

                  if (!(0, _is.isFunc)(formProps.onFinish)) {
                    _context.next = 7
                    break
                  }

                  _context.next = 7
                  return formProps.onFinish(values)

                case 7:
                  if (!(0, _is.isFunc)(onOk)) {
                    _context.next = 12
                    break
                  }

                  _context.next = 10
                  return onOk(values)

                case 10:
                  result = _context.sent
                  result === false && (isNeedCloseWhenOnFinish = result)

                case 12:
                  if (isNeedCloseWhenOnFinish && (0, _is.isFunc)(onCancel)) {
                    onCancel()
                  }

                case 13:
                  _context.prev = 13
                  setLoading(false)
                  return _context.finish(13)

                case 16:
                case 'end':
                  return _context.stop()
              }
            }
          },
          _callee,
          null,
          [[0, , 13, 16]],
        )
      }),
    )

    return function onModalFormFinish(_x) {
      return _ref2.apply(this, arguments)
    }
  })()

  return /*#__PURE__*/ _react.default.createElement(
    _modal.default,
    (0, _extends2.default)(
      {
        onOk: onModalOk,
        confirmLoading: loading,
        visible: visible,
        destroyOnClose: true,
      },
      props,
    ),
    /*#__PURE__*/ _react.default.createElement(
      _form2.default,
      (0, _extends2.default)({}, formProps, {
        form: form,
        onFinish: onModalFormFinish,
      }),
    ),
  )
}

var _default = ModalForm
exports.default = _default
