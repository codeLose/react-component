"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Demo2 = exports.Demo = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _default = {
  title: 'Button'
};
exports.default = _default;

var Demo = function Demo() {
  return /*#__PURE__*/_react.default.createElement(_index.default, null, "Hello Button");
};

exports.Demo = Demo;

var Demo2 = function Demo2() {
  return /*#__PURE__*/_react.default.createElement(_index.default, null, "Hello Button");
};

exports.Demo2 = Demo2;