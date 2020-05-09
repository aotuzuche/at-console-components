"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _card = _interopRequireDefault(require("antd/lib/card"));

var _row = _interopRequireDefault(require("antd/lib/row"));

var _col = _interopRequireDefault(require("antd/lib/col"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _popover = _interopRequireDefault(require("antd/lib/popover"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _skeleton = _interopRequireDefault(require("antd/lib/skeleton"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireWildcard(require("react"));

var _get = _interopRequireDefault(require("lodash/get"));

var _QuestionCircleOutlined = _interopRequireDefault(require("@ant-design/icons/QuestionCircleOutlined"));

var _update = _interopRequireDefault(require("lodash/update"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _is = require("../utils/is");

var _useForceUpdate = _interopRequireDefault(require("../hooks/useForceUpdate"));

var _useStates3 = _interopRequireDefault(require("../hooks/useStates"));

var _showPlaceholder = _interopRequireDefault(require("../utils/showPlaceholder"));

var _usePrevious = _interopRequireDefault(require("./usePrevious"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Item = _form.default.Item,
    useForm = _form.default.useForm,
    List = _form.default.List,
    Provider = _form.default.Provider;

var InternalForm = function InternalForm(_ref) {
  var items = _ref.items,
      children = _ref.children,
      onFinishInternal = _ref.onFinish,
      _ref$isView = _ref.isView,
      isView = _ref$isView === void 0 ? false : _ref$isView,
      form = _ref.form,
      _ref$layoutCol = _ref.layoutCol,
      layoutCol = _ref$layoutCol === void 0 ? {
    span: 24
  } : _ref$layoutCol,
      initialValuesInternal = _ref.initialValues,
      _ref$placeholder = _ref.placeholder,
      placeholderInternal = _ref$placeholder === void 0 ? '-' : _ref$placeholder,
      onValuesChangeInternal = _ref.onValuesChange,
      mode = _ref.mode,
      cardProps = _ref.cardProps,
      props = (0, _objectWithoutProperties2.default)(_ref, ["items", "children", "onFinish", "isView", "form", "layoutCol", "initialValues", "placeholder", "onValuesChange", "mode", "cardProps"]);

  var _useForm = useForm(form),
      _useForm2 = (0, _slicedToArray2.default)(_useForm, 1),
      formInsatce = _useForm2[0];

  var forceUpdate = (0, _useForceUpdate.default)();
  var isLoadinginitialValues = (0, _is.isFunc)(initialValuesInternal);

  var _useStates = (0, _useStates3.default)({
    isLoadinginitialValues: isLoadinginitialValues,
    initialValues: isLoadinginitialValues ? {} : initialValuesInternal
  }),
      _useStates2 = (0, _slicedToArray2.default)(_useStates, 2),
      initialStates = _useStates2[0],
      setInitialStates = _useStates2[1];

  var prevFormInitialValues = (0, _usePrevious.default)(initialValuesInternal);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var getInitialValues = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var values;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              values = {};
              _context.prev = 1;
              _context.next = 4;
              return initialValuesInternal();

            case 4:
              values = _context.sent;
              items.filter(function (_ref3) {
                var pipeline = _ref3.pipeline;
                return Array.isArray(pipeline) && pipeline.length === 2;
              }).forEach(function (_ref4) {
                var pipeline = _ref4.pipeline,
                    name = _ref4.name;
                var inputer = pipeline[0];
                (0, _update.default)(values, name, inputer);
              });

            case 6:
              _context.prev = 6;
              setInitialStates({
                isLoadinginitialValues: false,
                initialValues: values
              });
              return _context.finish(6);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1,, 6, 9]]);
    }));

    return function getInitialValues() {
      return _ref2.apply(this, arguments);
    };
  }(); // eslint-disable-next-line react-hooks/rules-of-hooks


  (0, _react.useEffect)(function () {
    if (initialStates.isLoadinginitialValues) {
      getInitialValues();
    } else {
      // Todo: Initial value cannot get when first mount
      forceUpdate();
    } // Fix if Form instance destory but useForm from external.


    return function () {
      return formInsatce.resetFields();
    };
  }, []); // If promise initialValues update need rerenader?
  // eslint-disable-next-line react-hooks/rules-of-hooks

  (0, _react.useEffect)(function () {
    forceUpdate();
  }, [initialStates]);
  (0, _react.useEffect)(function () {
    if (!isLoadinginitialValues && !(0, _isEqual.default)(prevFormInitialValues, initialValuesInternal)) {
      formInsatce.setFieldsValue(initialValuesInternal);
      forceUpdate();
    }
  }, [initialValuesInternal]);

  if (!items || items.length === 0) {
    return null;
  }

  if (initialStates.isLoadinginitialValues) {
    return /*#__PURE__*/_react.default.createElement(_skeleton.default, null);
  }

  var onFinish = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(values) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              setLoading(true);
              items.filter(function (_ref6) {
                var pipeline = _ref6.pipeline;
                return (0, _is.isFunc)(pipeline) || Array.isArray(pipeline) && pipeline.length === 2;
              }).forEach(function (_ref7) {
                var pipeline = _ref7.pipeline,
                    name = _ref7.name;
                var outputer = (0, _is.isFunc)(pipeline) ? pipeline : pipeline[1];
                (0, _update.default)(values, name, outputer);
              });

              if (!onFinishInternal) {
                _context2.next = 6;
                break;
              }

              _context2.next = 6;
              return onFinishInternal(values);

            case 6:
              _context2.prev = 6;
              setLoading(false);
              return _context2.finish(6);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0,, 6, 9]]);
    }));

    return function onFinish(_x) {
      return _ref5.apply(this, arguments);
    };
  }();

  var renderItems = function renderItems(_ref8, index) {
    var render = _ref8.render,
        renderView = _ref8.renderView,
        _ref8$isView = _ref8.isView,
        isItemView = _ref8$isView === void 0 ? isView : _ref8$isView,
        isHidden = _ref8.isHidden,
        _ref8$layoutCol = _ref8.layoutCol,
        itemLlayoutCol = _ref8$layoutCol === void 0 ? layoutCol : _ref8$layoutCol,
        label = _ref8.label,
        tip = _ref8.tip,
        _ref8$placeholder = _ref8.placeholder,
        placeholder = _ref8$placeholder === void 0 ? placeholderInternal : _ref8$placeholder,
        extra = _ref8.extra,
        itemProps = (0, _objectWithoutProperties2.default)(_ref8, ["render", "renderView", "isView", "isHidden", "layoutCol", "label", "tip", "placeholder", "extra"]);
    var Comp;
    var name = itemProps.name;
    var getFieldsValue = formInsatce.getFieldsValue;

    var fieldsValue = _objectSpread({}, initialValuesInternal, {}, initialStates.initialValues, {}, getFieldsValue());

    var fieldValue = (0, _get.default)(fieldsValue, name);

    if ((0, _is.isFunc)(isHidden) && isHidden(fieldValue, fieldsValue)) {
      return null;
    }

    var key = "form-item-".concat((name || index).toString());
    var LabelWrap = tip ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, label, /*#__PURE__*/_react.default.createElement(_popover.default, {
      content: (0, _is.isFunc)(tip) ? function () {
        return tip(fieldValue, fieldsValue, formInsatce);
      } : tip
    }, /*#__PURE__*/_react.default.createElement(_QuestionCircleOutlined.default, {
      style: {
        marginLeft: 4
      }
    }))) : label;

    if (isItemView) {
      Comp = (0, _showPlaceholder.default)(renderView && (0, _is.isFunc)(renderView) ? renderView(fieldValue, fieldsValue, formInsatce) : fieldValue, placeholder);
    } else {
      Comp = render && (0, _is.isFunc)(render) ? render(fieldValue, fieldsValue, formInsatce) : /*#__PURE__*/_react.default.createElement(_input.default, {
        allowClear: true
      });
    }

    return /*#__PURE__*/_react.default.createElement(_col.default, itemLlayoutCol, /*#__PURE__*/_react.default.createElement(Item, (0, _extends2.default)({
      key: key,
      label: LabelWrap,
      extra: (0, _is.isFunc)(extra) ? extra(fieldsValue) : extra
    }, itemProps), Comp));
  };

  var onValuesChange = function onValuesChange(changeValues, values) {
    forceUpdate();
    (0, _is.isFunc)(onValuesChangeInternal) && onValuesChangeInternal(changeValues, values);
  };

  var FormChildren = /*#__PURE__*/_react.default.createElement(_row.default, {
    gutter: 24
  }, items.map(function (item, index) {
    return renderItems(item, index);
  }), children && /*#__PURE__*/_react.default.createElement(_col.default, {
    style: {
      flex: '1'
    }
  }, /*#__PURE__*/_react.default.createElement(Item, {
    label: /*#__PURE__*/_react.default.createElement("span", null),
    colon: false
  }, children))); // Better use Button loading when submit, but we can't control button


  return /*#__PURE__*/_react.default.createElement(_spin.default, {
    spinning: loading
  }, /*#__PURE__*/_react.default.createElement(_form.default, (0, _extends2.default)({
    form: formInsatce,
    onFinish: onFinish,
    onValuesChange: onValuesChange,
    initialValues: initialStates.initialValues
  }, props), mode === 'card' ? /*#__PURE__*/_react.default.createElement(_card.default, (0, _extends2.default)({
    headStyle: {
      backgroundColor: '#fafafa'
    }
  }, cardProps), FormChildren) : FormChildren));
};

var Form = InternalForm;
Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = Provider;
var _default = Form;
exports.default = _default;