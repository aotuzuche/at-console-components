"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHistoryState = getHistoryState;
exports.setHistoryState = setHistoryState;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _moment = _interopRequireDefault(require("moment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var key = '_query';
var _window = window,
    history = _window.history,
    location = _window.location;

var handler = function handler(values, isSet) {
  return (0, _mapValues2.default)(values, function (value) {
    if (value && value._isAMomentObject) {
      var v = {
        _isAMomentObject: true,
        value: value.format()
      };
      return !isSet ? (0, _moment.default)(value.value) : v;
    }

    if (Array.isArray(value) && value.length === 2 && (value[0]._isAMomentObject || value[1]._isAMomentObject)) {
      var _value$, _value$2, _value$3, _value$4;

      var v0 = {
        _isAMomentObject: true,
        value: (_value$ = value[0]) === null || _value$ === void 0 ? void 0 : _value$.format()
      };
      var v1 = {
        _isAMomentObject: true,
        value: (_value$2 = value[1]) === null || _value$2 === void 0 ? void 0 : _value$2.format()
      };
      return [isSet ? v0 : (0, _moment.default)((_value$3 = value[0]) === null || _value$3 === void 0 ? void 0 : _value$3.value), isSet ? v1 : (0, _moment.default)((_value$4 = value[1]) === null || _value$4 === void 0 ? void 0 : _value$4.value)];
    }

    if ((0, _isPlainObject2.default)(value)) {
      return handler(value, isSet);
    }

    return value;
  });
};

function getHistoryState() {
  var _history$state = history.state,
      state = _history$state === void 0 ? {} : _history$state;

  if (!state[key] || !(0, _isPlainObject2.default)(state[key])) {
    return {};
  }

  return handler(state[key]);
} // eslint-disable-next-line @typescript-eslint/no-explicit-any


function setHistoryState(query) {
  if (!query || !(0, _isPlainObject2.default)(query)) {
    return;
  }

  var pathname = location.pathname,
      search = location.search;
  var state = history.state;
  history.replaceState(_objectSpread({}, state, (0, _defineProperty2.default)({}, key, handler(query, true))), '', pathname + search);
}