'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = usePrevious

var _react = require('react')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevious(value) {
  var ref = (0, _react.useRef)()
  ;(0, _react.useEffect)(function() {
    ref.current = value
  })
  return ref.current
}
