"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _button = _interopRequireDefault(require("antd/lib/button"));

var _form = _interopRequireDefault(require("antd/lib/form"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var _autoLibs = require("auto-libs");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  }
};
var tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 12
  }
};

var View = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(View, _React$PureComponent);

  var _super = _createSuper(View);

  function View(props) {
    var _this;

    (0, _classCallCheck2.default)(this, View);
    _this = _super.call(this, props);

    _this.onSubmit = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(values) {
        var username, password, res, token, userInfo;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                _this.setState({
                  loading: true
                });

                username = values.username, password = values.password;
                _context.next = 5;
                return (0, _autoLibs.httpConsole)({
                  url: '/casService/login',
                  method: 'POST',
                  data: {
                    username: username,
                    password: password
                  }
                });

              case 5:
                res = _context.sent;
                token = res.token, userInfo = (0, _objectWithoutProperties2.default)(res, ["token"]);
                (0, _autoLibs.setConsoleToken)(token);
                localStorage['_app_console_userinfo_'] = JSON.stringify(userInfo); // 兼容老的

                localStorage['auto_system_token'] = token; // 兼容老的项目token

                localStorage['auto_system_userData'] = JSON.stringify(userInfo);

                _this.props.history.replace('/');

                window.location.reload();
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);

                _message2.default.error(_context.t0.message || '系统异常');

              case 18:
                _context.prev = 18;

                _this.setState({
                  loading: false
                });

                return _context.finish(18);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15, 18, 21]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.state = {
      loading: false
    };
    return _this;
  }

  (0, _createClass2.default)(View, [{
    key: "render",
    value: function render() {
      var loading = this.state.loading;
      return /*#__PURE__*/React.createElement("div", {
        className: "devlogin-page"
      }, loading && /*#__PURE__*/React.createElement("div", {
        className: "devlogin-page-loading"
      }, /*#__PURE__*/React.createElement(_spin.default, null)), /*#__PURE__*/React.createElement(_form.default, (0, _extends2.default)({}, layout, {
        className: "devlogin-form",
        initialValues: {
          remember: true
        },
        onFinish: this.onSubmit
      }), /*#__PURE__*/React.createElement(_form.default.Item, {
        label: "Username",
        name: "username",
        rules: [{
          required: true,
          message: 'Please input your username!'
        }]
      }, /*#__PURE__*/React.createElement(_input.default, null)), /*#__PURE__*/React.createElement(_form.default.Item, {
        label: "Password",
        name: "password",
        rules: [{
          required: true,
          message: 'Please input your password!'
        }]
      }, /*#__PURE__*/React.createElement(_input.default.Password, null)), /*#__PURE__*/React.createElement(_form.default.Item, tailLayout, /*#__PURE__*/React.createElement(_button.default, {
        type: "primary",
        htmlType: "submit"
      }, "Submit"))));
    }
  }]);
  return View;
}(React.PureComponent);

var _default = View;
exports.default = _default;