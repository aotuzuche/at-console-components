"use strict";

require("core-js/modules/es.array.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFalse = void 0;

var isFalse = function isFalse(icon) {
  return ['false', false, 0, '0'].includes(icon);
};

exports.isFalse = isFalse;