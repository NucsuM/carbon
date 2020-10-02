import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import SelectTextbox, { formInputPropTypes } from '../select-textbox/select-textbox.component';
import guid from '../../../utils/helpers/guid';
import withFilter from '../utils/with-filter.hoc';
import SelectList from '../select-list/select-list.component';

const FilterableSelectList = withFilter(SelectList);

const FilterableSelect = React.forwardRef(({
  value,
  defaultValue,
  id,
  name,
  children,
  onOpen,
  onChange,
  onClick,
  onKeyDown,
  noResultsMessage,
  ...textboxProps
}, inputRef) => {
  const selectListId = useRef(guid());
  const labelId = useRef(guid());
  const containerRef = useRef();
  const listboxRef = useRef();
  const isControlled = useRef(value !== undefined);
  const [textboxRef, setTextboxRef] = useState();
  const [isOpen, setOpenState] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [highlightedValue, setHighlightedValue] = useState('');
  const [filterText, setFilterText] = useState('');

  const setOpen = useCallback((newValue) => {
    setOpenState((isAlreadyOpen) => {
      if (!isAlreadyOpen && newValue && onOpen) {
        onOpen();
      }

      return newValue;
    });
  }, [onOpen]);

  const createCustomEvent = useCallback((newValue) => {
    const customEvent = {
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: newValue
      }
    };

    return customEvent;
  }, [name, id]);

  const updateValues = useCallback((newFilterText, isDeleteEvent) => {
    setFilterText(newFilterText);

    setSelectedValue((previousValue) => {
      const match = findElementWithMatchingText(newFilterText, children);

      if (!match || isDeleteEvent) {
        setTextValue(newFilterText);

        return previousValue;
      }

      if (onChange) {
        onChange(createCustomEvent(match.props.value));
      }

      if (match.props.text.toLowerCase().startsWith(newFilterText.toLowerCase())) {
        setTextValue(match.props.text);
      } else {
        setTextValue(newFilterText);
      }

      if (isControlled.current) {
        return previousValue;
      }

      setHighlightedValue(match.props.value);

      return match.props.value;
    });
  }, [children, createCustomEvent, onChange]);

  const setMatchingText = useCallback((newValue) => {
    const matchingOption = React.Children.toArray(children).find(option => (option.props.value === newValue));

    if (matchingOption) {
      setTextValue(matchingOption.props.text);
      setFilterText(matchingOption.props.text);
    }
  }, [children]);

  const handleTextboxChange = useCallback((event) => {
    const newValue = event.target.value;
    const isDeleteEvent = event.nativeEvent.inputType === 'deleteContentBackward'
      || event.nativeEvent.inputType === 'deleteContentForward'
      || event.nativeEvent.inputType === 'delete';

    updateValues(newValue, isDeleteEvent);
    setOpen(true);
  }, [setOpen, updateValues]);

  const fillLastFilterCharacter = useCallback((key) => {
    setFilterText((previousFilterText) => {
      if (previousFilterText.length === textValue.length - 1 && key === textValue.slice(-1)) {
        return textValue;
      }

      return previousFilterText;
    });
  }, [textValue]);

  const handleTextboxKeydown = useCallback(((event) => {
    const { key } = event;

    if (onKeyDown) {
      onKeyDown(event);
    }

    if (!event.defaultPrevented && isNavigationKey(key)) {
      event.preventDefault();
      setOpen(true);
    }

    fillLastFilterCharacter(key);
  }), [fillLastFilterCharacter, onKeyDown, setOpen]);

  const handleGlobalClick = useCallback((event) => {
    const notInContainer = containerRef.current && !containerRef.current.contains(event.target);
    const notInList = listboxRef.current && !listboxRef.current.contains(event.target);

    if (notInContainer && notInList) {
      setMatchingText(selectedValue);
      setOpen(false);
    }
  }, [setMatchingText, setOpen, selectedValue]);

  useEffect(() => {
    const newValue = value || defaultValue;
    const modeSwitchedMessage = 'Input elements should not switch from uncontrolled to controlled (or vice versa). '
    + 'Decide between using a controlled or uncontrolled input element for the lifetime of the component';
    const onChageMissingMessage = 'onChange prop required when using a controlled input element';

    invariant(isControlled.current === (value !== undefined), modeSwitchedMessage);
    invariant(!isControlled.current || (isControlled.current && onChange), onChageMissingMessage);

    setSelectedValue(newValue);
    setHighlightedValue(newValue);
  }, [value, defaultValue, onChange]);

  useEffect(() => {
    setMatchingText(value || defaultValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const clickEvent = 'click';

    document.addEventListener(clickEvent, handleGlobalClick);

    return function cleanup() {
      document.removeEventListener(clickEvent, handleGlobalClick);
    };
  }, [handleGlobalClick]);

  useEffect(() => {
    const textStartsWithFilter = textValue.toLowerCase().startsWith(filterText.toLowerCase());

    if (textboxRef && textValue.length > filterText.length && textStartsWithFilter) {
      textboxRef.selectionStart = filterText.length;
    }
  }, [textValue, filterText, textboxRef]);

  function handleTextboxClick(event) {
    if (onClick) {
      onClick(event);
    }
  }

  function handleDropdownIconClick(event) {
    if (onClick) {
      onClick(event);
    }

    setOpenState((isAlreadyOpen) => {
      if (isAlreadyOpen) {
        return false;
      }

      if (onOpen) {
        onOpen();
      }

      return true;
    });
  }

  const onSelectOption = useCallback((optionData) => {
    const { text, value: newValue, selectionType } = optionData;

    if (!isControlled.current) {
      setSelectedValue(newValue);
    }

    setTextValue(text);

    if (onChange) {
      onChange(createCustomEvent(newValue));
    }

    setHighlightedValue(newValue);

    if (selectionType !== 'navigationKey') {
      setOpen(false);
      setFilterText(text);
      textboxRef.focus();
      textboxRef.select();
    }
  }, [createCustomEvent, onChange, setOpen, textboxRef]);

  const onSelectListClose = useCallback(() => {
    setOpen(false);
    setMatchingText(selectedValue);
  }, [selectedValue, setMatchingText, setOpen]);

  function findElementWithMatchingText(textToMatch, list) {
    return list.find((child) => {
      const { text } = child.props;

      return text && text.toLowerCase().indexOf(textToMatch.toLowerCase()) !== -1;
    });
  }

  function assignInput(input) {
    setTextboxRef(input.current);

    if (inputRef) {
      inputRef.current = input.current;
    }
  }

  function getTextboxProps() {
    return {
      id,
      name,
      inputRef: assignInput,
      selectedValue,
      formattedValue: textValue,
      onClick: handleTextboxClick,
      iconOnClick: handleDropdownIconClick,
      onKeyDown: handleTextboxKeydown,
      onChange: handleTextboxChange,
      ...textboxProps
    };
  }

  function isNavigationKey(key) {
    return key === 'ArrowDown' || key === 'ArrowUp'
    || key === 'Home' || key === 'End';
  }

  return (
    <div
      data-component='filterable-select'
      aria-expanded={ isOpen }
      aria-haspopup='listbox'
      ref={ containerRef }
    >
      <SelectTextbox
        aria-controls={ isOpen ? selectListId.current : '' }
        type='text'
        labelId={ labelId.current }
        { ...getTextboxProps() }
      />
      { isOpen && (
        <FilterableSelectList
          ref={ listboxRef }
          id={ selectListId.current }
          labelId={ labelId.current }
          anchorElement={ textboxRef.parentElement }
          onSelect={ onSelectOption }
          onSelectListClose={ onSelectListClose }
          filterText={ filterText }
          highlightedValue={ highlightedValue }
          noResultsMessage={ noResultsMessage }
        >
          { children }
        </FilterableSelectList>
      ) }
    </div>
  );
});

FilterableSelect.propTypes = {
  ...formInputPropTypes,
  /** The selected value(s), when the component is operating in controlled mode */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Child components (such as Option) for the SelectList */
  children: PropTypes.node.isRequired,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage: PropTypes.string
};

export default FilterableSelect;
