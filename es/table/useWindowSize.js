"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useWindowSize;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _useRafState3 = _interopRequireDefault(require("./useRafState"));

/* eslint-disable @typescript-eslint/member-delimiter-style */

/**
 * Todo: calc
 */
function useWindowSize() {
  var _useRafState = (0, _useRafState3.default)({
    width: window.innerWidth,
    height: window.innerHeight - 213
  }),
      _useRafState2 = (0, _slicedToArray2.default)(_useRafState, 2),
      state = _useRafState2[0],
      setState = _useRafState2[1];

  (0, _react.useEffect)(function () {
    var handler = function handler() {
      setState({
        width: window.innerWidth,
        height: window.innerHeight - 213
      });
    };

    window.addEventListener('resize', handler);
    return function () {
      window.removeEventListener('resize', handler);
    };
  }, []);
  return state;
}