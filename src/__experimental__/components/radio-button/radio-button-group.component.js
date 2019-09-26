import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { RadioFieldsetStyle } from './radio-button.style';
import withValidation from '../../../components/validations/with-validation.hoc';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const RadioButtonGroup = (props) => {
  const {
    children,
    groupName,
    legend,
    initialValue,
    hasError,
    hasWarning,
    hasInfo
  } = props;
  const [selectedValue, setSelectedValue] = useState(null);

  if (!selectedValue && initialValue) {
    setSelectedValue(initialValue);
  }

  const groupLabelId = `${groupName}-label`;

  const buttons = React.Children.map(children, (child, index) => {
    const isDefaultChecked = child.props.checked && !selectedValue;
    const checked = isDefaultChecked || selectedValue === child.props.value;
    const tabindex = selectedValue ? checkedTabIndex(checked) : initialTabIndex(index);

    const handleChange = (ev) => {
      child.props.onChange(ev);
      setSelectedValue(ev.target.value);
    };

    let childProps = {
      checked,
      tabindex,
      inputName: groupName,
      onChange: handleChange
    };

    if (checked) {
      childProps = {
        ...childProps,
        hasError,
        hasWarning,
        hasInfo
      };
    }

    return React.cloneElement(child, childProps);
  });

  return (
    <RadioFieldsetStyle
      aria-labelledby={ groupLabelId }
      role='radiogroup'
      legend={ legend }
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      { ...tagComponent('radiogroup', props) }
    >
      {buttons}
    </RadioFieldsetStyle>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired,
  /** Help text */
  labelHelp: PropTypes.string,
  /** Predefined value that would check the relevant radio button */
  initialValue: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(RadioButtonGroup);
