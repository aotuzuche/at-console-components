'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

require('core-js/modules/es.symbol')

require('core-js/modules/es.symbol.description')

require('core-js/modules/es.symbol.iterator')

require('core-js/modules/es.array.filter')

require('core-js/modules/es.array.for-each')

require('core-js/modules/es.array.from')

require('core-js/modules/es.array.iterator')

require('core-js/modules/es.array.map')

require('core-js/modules/es.array.slice')

require('core-js/modules/es.function.name')

require('core-js/modules/es.object.get-own-property-descriptor')

require('core-js/modules/es.object.get-own-property-descriptors')

require('core-js/modules/es.object.keys')

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.regexp.to-string')

require('core-js/modules/es.string.iterator')

require('core-js/modules/web.dom-collections.for-each')

require('core-js/modules/web.dom-collections.iterator')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getTreeFromFlatData = exports.findMenuPathIds = exports.getMenuPathInfos = exports.findMenuInfo = void 0

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'))

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

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0
      var F = function F() {}
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true }
          return { done: false, value: o[i++] }
        },
        e: function e(_e) {
          throw _e
        },
        f: F,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    )
  }
  var it,
    normalCompletion = true,
    didErr = false,
    err
  return {
    s: function s() {
      it = o[Symbol.iterator]()
    },
    n: function n() {
      var step = it.next()
      normalCompletion = step.done
      return step
    },
    e: function e(_e2) {
      didErr = true
      err = _e2
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return()
      } finally {
        if (didErr) throw err
      }
    },
  }
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(n)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

// 根据关键字查找菜单的信息
var findMenuInfo = function findMenuInfo(value, menuTree) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id'

  if (!(menuTree instanceof Array)) {
    return null
  }

  var result = null

  var _iterator = _createForOfIteratorHelper(menuTree),
    _step

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var item = _step.value

      if (item[key] && item[key].toString() === value.toString()) {
        result = item
        break
      }

      if (item.children instanceof Array) {
        result = findMenuInfo(value, item.children, key)

        if (result) {
          break
        }

        continue
      }
    }
  } catch (err) {
    _iterator.e(err)
  } finally {
    _iterator.f()
  }

  return result
} // 获取所有父集节点

exports.findMenuInfo = findMenuInfo

var getMenuPathInfos = function getMenuPathInfos() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var menuTree = arguments.length > 1 ? arguments[1] : undefined
  var menuPathInfos = ids.map(function(id) {
    return findMenuInfo(id, menuTree)
  })
  return menuPathInfos
} // 根据路径从它开始一直找它的父节点，到根节点为止
// 然后用数组的形式返回所有节点的id

exports.getMenuPathInfos = getMenuPathInfos

var findMenuPathIds = function findMenuPathIds(path, menuTree) {
  if (!(menuTree instanceof Array)) {
    return []
  }

  var curr = findMenuInfo(path, menuTree, 'url')
  var menuIds = []
  var p = curr ? curr.id : null

  if (p) {
    menuIds.unshift(p)
  }

  while (p) {
    var t = findMenuInfo(p, menuTree)

    if (t.pid) {
      p = t.pid
      menuIds.unshift(p)
    } else {
      p = null
    }
  }

  return menuIds
}
/**
 * Generate a tree structure from flat data.
 *
 * @param {!Object[]} flatData
 * @param {!function=} getKey - Function to get the key from the nodeData
 * @param {!function=} getParentKey - Function to get the parent key from the nodeData
 * @param {string|number=} rootKey - The value returned by `getParentKey` that corresponds to the root node.
 * For example, if your nodes have id 1-99, you might use rootKey = 0
 *
 * @return {Object[]} treeData - The flat data represented as a tree
 */

exports.findMenuPathIds = findMenuPathIds

var getTreeFromFlatData = function getTreeFromFlatData(args) {
  var flatData = args.flatData,
    _args$getKey = args.getKey,
    getKey =
      _args$getKey === void 0
        ? function(node) {
            return node.id
          }
        : _args$getKey,
    _args$getParentKey = args.getParentKey,
    getParentKey =
      _args$getParentKey === void 0
        ? function(node) {
            return node.parentId
          }
        : _args$getParentKey,
    _args$rootKey = args.rootKey,
    rootKey = _args$rootKey === void 0 ? '0' : _args$rootKey

  if (!flatData) {
    return []
  }

  var childrenToParents = {}
  flatData.forEach(function(child) {
    var parentKey = getParentKey(child)

    if (parentKey in childrenToParents) {
      childrenToParents[parentKey].push(child)
    } else {
      childrenToParents[parentKey] = [child]
    }
  })

  if (!(rootKey in childrenToParents)) {
    return []
  }

  var trav = function trav(parent) {
    var parentKey = getKey(parent)

    if (parentKey in childrenToParents) {
      return _objectSpread({}, parent, {
        children: childrenToParents[parentKey].map(function(child) {
          return trav(child)
        }),
      })
    }

    return _objectSpread({}, parent)
  }

  return childrenToParents[rootKey].map(function(child) {
    return trav(child)
  })
}

exports.getTreeFromFlatData = getTreeFromFlatData
