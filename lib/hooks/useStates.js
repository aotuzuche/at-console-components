'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

require('core-js/modules/es.symbol')

require('core-js/modules/es.array.filter')

require('core-js/modules/es.array.for-each')

require('core-js/modules/es.object.get-own-property-descriptor')

require('core-js/modules/es.object.get-own-property-descriptors')

require('core-js/modules/es.object.keys')

require('core-js/modules/web.dom-collections.for-each')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = useStates

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'))

var _react = require('react')

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

function useStates(initialValue) {
  var reducer = function reducer(state, data) {
    return _objectSpread({}, state, {}, data)
  }

  return (0, _react.useReducer)(reducer, initialValue)
}
