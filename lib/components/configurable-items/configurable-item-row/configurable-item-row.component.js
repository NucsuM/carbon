"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConfigurableItemRowWithoutHOC = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = require("styled-components");

var _tags = _interopRequireDefault(require("../../../utils/helpers/tags"));

var _dragAndDrop = require("../../drag-and-drop/drag-and-drop");

var _checkbox = _interopRequireDefault(require("../../../__deprecated__/components/checkbox"));

var _checkbox2 = require("../../../__experimental__/components/checkbox");

var _configurableItemRow = require("./configurable-item-row.style");

var _base = _interopRequireDefault(require("../../../style/themes/base"));

var _styleHelper = require("../../../utils/helpers/style-helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfigurableItemRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfigurableItemRow, _React$Component);

  function ConfigurableItemRow() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ConfigurableItemRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ConfigurableItemRow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "classes", function () {
      return (0, _classnames.default)(_this.props.className);
    });

    _defineProperty(_assertThisInitialized(_this), "listItemHTML", function () {
      var _this$props = _this.props,
          rowIndex = _this$props.rowIndex,
          enabled = _this$props.enabled,
          locked = _this$props.locked,
          name = _this$props.name,
          onChange = _this$props.onChange;
      return _react.default.createElement("div", null, _react.default.createElement(_configurableItemRow.ConfigurableItemRowStyle, {
        "data-element": "configurable-item-row",
        isDragged: _this.dragged(_this.context.dragAndDropActiveIndex, rowIndex),
        isDragging: _this.draggingIsOccurring(_this.context.dragAndDropActiveIndex),
        className: _this.classes(),
        ref: function ref(node) {
          _this._listItem = node;
        }
      }, _react.default.createElement(_configurableItemRow.ConfigurableItemRowContentWrapperStyle, {
        "data-element": "configurable-item-row-content-wrapper"
      }, _this.icon(), _this.checkbox(enabled, locked, name, onChange))));
    });

    return _this;
  }

  _createClass(ConfigurableItemRow, [{
    key: "checkbox",
    value: function checkbox(enabled, locked, name, onChange) {
      if ((0, _styleHelper.isClassic)(this.props.theme)) {
        return _react.default.createElement(_checkbox.default, {
          value: enabled,
          disabled: locked,
          label: name,
          onChange: onChange
        });
      }

      return _react.default.createElement(_checkbox2.Checkbox, {
        checked: enabled,
        disabled: locked,
        label: name,
        onChange: onChange
      });
    }
  }, {
    key: "iconHTML",
    value: function iconHTML() {
      return _react.default.createElement("div", null, _react.default.createElement(_configurableItemRow.ConfigurableItemRowIconStyle, {
        type: "drag_vertical"
      }));
    }
  }, {
    key: "icon",
    value: function icon() {
      var _this2 = this;

      return _react.default.createElement(_dragAndDrop.WithDrag, {
        draggableNode: function draggableNode() {
          return _this2._listItem;
        }
      }, this.iconHTML());
    }
  }, {
    key: "dragged",

    /** Determines if the item has been dragged. */
    value: function dragged(dragAndDropActiveIndex, index) {
      return this.draggingIsOccurring(dragAndDropActiveIndex) && dragAndDropActiveIndex === index;
    }
    /** Determines if dragging is occurring within the current draggable context. */

  }, {
    key: "draggingIsOccurring",
    value: function draggingIsOccurring(dragAndDropActiveIndex) {
      return typeof dragAndDropActiveIndex === 'number';
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_dragAndDrop.WithDrop, _extends({
        index: this.props.rowIndex
      }, (0, _tags.default)('configurable-item-row', this.props)), this.listItemHTML());
    }
  }]);

  return ConfigurableItemRow;
}(_react.default.Component);

exports.ConfigurableItemRowWithoutHOC = ConfigurableItemRow;

_defineProperty(ConfigurableItemRow, "contextTypes", {
  dragDropManager: _propTypes.default.object,
  // the React DND DragDropManager
  dragAndDropActiveIndex: _propTypes.default.number // tracks the currently active index

});

ConfigurableItemRow.propTypes = {
  /** A custom class name for the component. */
  className: _propTypes.default.string,

  /** The checked value for the checkbox. */
  enabled: _propTypes.default.bool,

  /** The disabled value for the checkbox. */
  locked: _propTypes.default.bool,

  /** The label for the row. */
  name: _propTypes.default.string,

  /** Callback triggered when the checkbox checked value is updated. */
  onChange: _propTypes.default.func,

  /** The unique index for the row. */
  rowIndex: _propTypes.default.number,

  /** An internal prop. Helpful to detect which component should be rendered */
  theme: _propTypes.default.object
};
ConfigurableItemRow.defaultProps = {
  theme: _base.default
};

var _default = (0, _styledComponents.withTheme)(ConfigurableItemRow);

exports.default = _default;