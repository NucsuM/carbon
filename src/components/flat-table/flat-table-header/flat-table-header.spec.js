import React from 'react';
import { mount } from 'enzyme';
import FlatTableHeader from './flat-table-header.component';
import StyledFlatTableHeader from './flat-table-header.style';
import {
  assertStyleMatch,
  testStyledSystemSpacing
} from '../../../__spec_helper__/test-utils';

describe('FlatTableHeader', () => {
  testStyledSystemSpacing(props => <FlatTableHeader { ...props } />, { py: 1, px: 3 }, null, { modifier: ' > div' });

  it('renders with proper width style rule when width prop is passed', () => {
    const wrapper = mount(<FlatTableHeader width={ 40 } />);
    assertStyleMatch(
      {
        width: '40px'
      },
      wrapper.find(StyledFlatTableHeader)
    );

    assertStyleMatch(
      {
        width: '40px'
      },
      wrapper.find(StyledFlatTableHeader),
      { modifier: ' > div' }
    );
  });
});
