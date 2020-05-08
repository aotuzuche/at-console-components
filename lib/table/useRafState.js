'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = useRafState

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'))

var _react = require('react')

function useRafState(initialState) {
  var frame = (0, _react.useRef)(0)

  var _useState = (0, _react.useState)(initialState),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1]

  var setRafState = (0, _react.useCallback)(function(value) {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(function() {
      setState(value)
    })
  }, [])
  ;(0, _react.useEffect)(function() {
    return function() {
      return cancelAnimationFrame(frame.current)
    }
  })
  return [state, setRafState]
}
