"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showPlaceHolder;

function showPlaceHolder(value, placeholder) {
  if (value === null || value === void 0 || value === '') {
    return placeholder;
  }

  return value;
}