'use strict'

require('core-js/modules/es.array.for-each')

require('core-js/modules/es.array.index-of')

require('core-js/modules/es.object.entries')

require('core-js/modules/es.object.to-string')

require('core-js/modules/web.dom-collections.for-each')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

function isType(target, type) {
  var targetType = {}.toString.call(target).toLowerCase()
  type = '[object '.concat(type, ']').toLowerCase()
  return targetType === type
}

function ignore(target, rule) {
  if (!target) {
    throw new TypeError('"target" is null or not defined.')
  } else if (!rule) {
    throw new TypeError('"rule" is null or not defined.')
  } else if (!isType(target, 'object')) {
    throw new TypeError('"target" must be typeof object.')
  } else if (!isType(rule, 'string') && !isType(rule, 'array')) {
    throw new TypeError('"rule" must be typeof string or array.')
  }

  if (isType(rule, 'string')) {
    rule = [rule]
  } // default: ignore 'children' and 'className' props

  rule.push('children')
  rule.push('className')
  var resObject = {}
  Object.entries(target).forEach(function(item) {
    if (rule.indexOf(item[0]) === -1) {
      resObject[item[0]] = item[1]
    }
  })
  return resObject
}

var _default = ignore
exports.default = _default
