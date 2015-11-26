import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
import List from './../../utils/decorators/list';

/**
 * A dropdown widget.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import Dropdown from 'carbon/lib/components/dropdown';
 *
 * To render a Dropdown:
 *
 *   <Dropdown data={ foo } onChange={ myChangeHandler } />
 *
 * Dropdown
 *
 * @class Dropdown
 * @constructor
 * @decorators {Input,InputIcon,InputLabel,InputValidation}
 */
const Dropdown = List(Input(InputIcon(InputLabel(InputValidation(
class Dropdown extends React.Component {

  static propTypes = {
    /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * @property options
     * @type {object}
     */
    options: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.visibleValue = null;
    }
  }

  // Variable to cache current value. Setting it here rather than state prevents complete rerender when value changes.
  visibleValue = null;

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param {Object} value Value of the selected list item
   */
  emitOnChangeCallback = (value) => {
    this._handleOnChange({ target: { value: value } });
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    let data = this.props.options;
    let highlighted = this.props.value ? this.props.value : data.first().get('id');

    this.setState({
      open: true,
      highlighted: highlighted
    });
  }

  /**
   * Sets visibleValue based on selected id.
   *
   * @method nameByID
   */
  nameByID = () => {
    //if no value selected, visibleValue is null
    if (!this.props.value) {
      this.visibleValue = '';
      return this.visibleValue;
    }

    //Match selected id to corresponding list option
    let option = this.props.options.find((item) => {
      return item.get('id') === this.props.value;
    });

    // If match is found, set visibleValue to option's name;
    if (option) {
      this.visibleValue = option.get('name');
    } else {
      this.visibleValue = '';
    }

    return this.visibleValue;
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.onFocus = this.handleFocus;
    props.value = this.visibleValue || this.nameByID();

    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    let props = {
      ref: "input",
      type: "hidden",
      readOnly: true,
      name: this.props.name,
      value: this.props.value
    };

    return props;
  }

  /**
   * Root Class getter
   *
   * @method rootClass
   */
  get rootClass() {
    return 'ui-dropdown-list';
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   */
  get mainClasses() {
    return 'ui-dropdown-list';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-dropdown-list__input';
  }

  /**
   * Getter to return HTML for list to render method.
   *
   * @method listHTML
   */
  get listHTML() {
    let listClasses = 'ui-dropdown-list__list' +
        (this.state.open ? '' : ' hidden');

    let options = this.props.options ? this.props.options.toJS() : [];

    return (
      <ul
        ref="list"
        className={ listClasses } >
        { this.results(options) }
      </ul>
    );
  }

  /**
   * This components render method is provided by the List decorator
   */
}
)))));

export default Dropdown;
