"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.last-index-of");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("antd/lib/upload"));

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _message2 = _interopRequireDefault(require("antd/lib/message"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _compatible = require("@ant-design/compatible");

var _autoLibs = require("auto-libs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Aliyun OSS 上传组件
 * 基于 https://ant.design/components/upload-cn 二次封装
 *
 * @export
 * @class AliyunOSSUpload
 * @extends {React.Component}
 *
 * @prop {File[]} value 受控的 FileList
 * @prop {(value) => void} onChange FileList 变化的监听事件
 * @prop {string} ticket 获取上传信息的 API
 * 返回格式
 * {
      dir: 'user-dir/',
      expire: '1577811661',
      host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
      accessId: 'c2hhb2RhaG9uZw==',
      policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
      signature: 'ZGFob25nc2hhbw==',
    }
 */
var AliyunOSSUpload = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AliyunOSSUpload, _React$Component);

  var _super = _createSuper(AliyunOSSUpload);

  function AliyunOSSUpload() {
    var _temp, _this;

    (0, _classCallCheck2.default)(this, AliyunOSSUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.state = {
      OSSData: {}
    }, _this.init = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var ticket, OSSData;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              ticket = _this.props.ticket;
              _context.next = 4;
              return _autoLibs.httpConsole.get(ticket);

            case 4:
              OSSData = _context.sent;

              _this.setState({
                OSSData: OSSData
              });

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              _message2.default.error(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    })), _this.onChange = function (obj) {
      var onChange = _this.props.onChange;
      var fileList = obj.fileList;

      if (onChange) {
        onChange((0, _toConsumableArray2.default)(fileList));
      }
    }, _this.onRemove = function (file) {
      var _this$props = _this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;
      var files = value.filter(function (v) {
        return v.url !== file.url;
      });

      if (onChange) {
        onChange(files);
      }
    }, _this.transformFile = function (file) {
      var OSSData = _this.state.OSSData;
      var suffix = file.name.slice(file.name.lastIndexOf('.'));
      var filename = Date.now() + suffix;
      file.url = OSSData.dir + filename;
      return file;
    }, _this.getExtraData = function (file) {
      var OSSData = _this.state.OSSData;
      return {
        key: file.url,
        OSSAccessKeyId: OSSData.accessId,
        policy: OSSData.policy,
        Signature: OSSData.signature
      };
    }, _this.beforeUpload = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var OSSData, expire;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              OSSData = _this.state.OSSData;
              expire = OSSData.expire * 1000;

              if (!(expire < Date.now())) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return _this.init();

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })), _temp));
  }

  (0, _createClass2.default)(AliyunOSSUpload, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.init();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          ticket = _this$props2.ticket,
          children = _this$props2.children,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props2, ["value", "onChange", "ticket", "children"]);
      var OSSData = this.state.OSSData;

      var props = _objectSpread({
        name: 'file',
        fileList: value,
        action: OSSData.host,
        onChange: this.onChange,
        onRemove: this.onRemove,
        transformFile: this.transformFile,
        data: this.getExtraData,
        beforeUpload: this.beforeUpload
      }, otherProps);

      return /*#__PURE__*/_react.default.createElement(_upload.default, props, children || /*#__PURE__*/_react.default.createElement(_button.default, null, /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
        type: "upload"
      }), " \u4E0A\u4F20"));
    }
  }]);
  return AliyunOSSUpload;
}(_react.default.Component);

exports.default = AliyunOSSUpload;