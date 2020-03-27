import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  ActionPopover, ActionPopoverDivider, ActionPopoverItem, ActionPopoverMenu
} from '.';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import {
  Table, TableRow, TableCell, TableHeader
} from '../table';
import Button from '../button';

const submenu = (
  <ActionPopoverMenu>
    <ActionPopoverItem onClick={ action('sub menu 1') }>
      Sub Menu 1
    </ActionPopoverItem>
    <ActionPopoverItem onClick={ action('sub menu 2') }>
      Sub Menu 2
    </ActionPopoverItem>
    <ActionPopoverItem disabled onClick={ action('sub menu 3') }>
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

const submenuWithIcons = (
  <ActionPopoverMenu>
    <ActionPopoverItem icon='graph' onClick={ action('sub menu 1') }>
      Sub Menu 1
    </ActionPopoverItem>
    <ActionPopoverItem icon='add' onClick={ action('sub menu 2') }>
      Sub Menu 2
    </ActionPopoverItem>
    <ActionPopoverItem
      icon='print'
      disabled
      onClick={ action('sub menu 3') }
    >
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

export default {
  title: 'Test/Action Popover',
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    }
  }
};

export const Default = () => (
  <div style={ { marginTop: '40px', height: '275px' } }>
    <Table isZebra>
      <TableRow>
        <TableHeader>First Name</TableHeader>
        <TableHeader>Last Name</TableHeader>
        <TableHeader>&nbsp;</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>Doe</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              disabled
              icon='graph'
              submenu={ submenu }
              onClick={ action('email') }
            >
              Business
            </ActionPopoverItem>
            <ActionPopoverItem icon='email' onClick={ action('email') }>Email Invoice</ActionPopoverItem>
            <ActionPopoverItem
              icon='print'
              onClick={ action('print') }
              submenu={ submenu }
            >
              Print Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon='pdf'
              submenu={ submenu }
              onClick={ action('pdf') }
            >
              Download PDF
            </ActionPopoverItem>
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem icon='delete' onClick={ action('delete') }>Delete</ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane</TableCell>
        <TableCell>Smith</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell>Jones</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              icon='csv'
              submenu={ submenuWithIcons }
              onClick={ action('csv') }
            >
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
    </Table>
  </div>
);

Default.story = {
  name: 'default'
};

export const Classic = () => (
  <div style={ { height: '275px' } }>
    <Table isZebra>
      <TableRow>
        <TableHeader>First Name</TableHeader>
        <TableHeader>Last Name</TableHeader>
        <TableHeader>&nbsp;</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>Doe</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              disabled
              icon='graph'
              submenu={ submenu }
              onClick={ action('business') }
            >
              Business
            </ActionPopoverItem>
            <ActionPopoverItem icon='email' onClick={ action('email') }>Email Invoice</ActionPopoverItem>
            <ActionPopoverItem
              icon='print'
              onClick={ action('print') }
              submenu={ submenu }
            >
              Print Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon='pdf'
              submenu={ submenu }
              onClick={ action('pdf') }
            >
              Download PDF
            </ActionPopoverItem>
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem icon='delete' onClick={ action('delete') }>Delete</ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane</TableCell>
        <TableCell>Smith</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell>Jones</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              icon='csv'
              submenu={ submenuWithIcons }
              onClick={ action('csv') }
            >
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
    </Table>
  </div>
);

Classic.story = {
  name: 'classic',
  parameters: {
    themeSelector: classicThemeSelector
  }
};

const generateTableCells = (options, cols) => {
  const cells = options.slice(0, cols - 1).map((cell, index) => <TableCell key={ String(index) }>{cell}</TableCell>);

  if (cells.length === options.length) {
    return cells;
  }

  const overflow = (
    <TableCell>
      <ActionPopover
        rightAlignMenu
        renderButton={ ({ styleOverride, tabIndex, ...rest }) => (
          <Button
            buttonType='tertiary'
            iconType='dropdown'
            iconPosition='after'
            size='small'
            tabIndex={ tabIndex }
            styleOverride={ styleOverride }
            date-element={ rest['data-element'] }
          >
              More
          </Button>
        )
        }
      >
        {options.slice(cols - 1, options.length).map((opt, index) => {
          return <ActionPopoverItem key={ String(index) } onClick={ action(opt) }>{opt}</ActionPopoverItem>;
        })}
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={ action('manage services') }>Manage Services</ActionPopoverItem>
      </ActionPopover>
    </TableCell>
  );
  return [
    ...cells,
    overflow
  ];
};

const options = ['Accounting', 'Payroll', 'Auto Entry', 'Corporation Tax', 'Final Accounts', 'VAT Centre'];

export const ServicesColumn = () => (
  <div style={ { marginTop: '40px', height: '275px', maxWidth: '400px' } }>
    <Table isZebra>
      <TableRow>
        <TableHeader colSpan='3'>Services</TableHeader>
      </TableRow>
      <TableRow>
        {generateTableCells(options, 3)}
      </TableRow>
      <TableRow>
        {generateTableCells(options, 3)}
      </TableRow>
    </Table>
  </div>
);

ServicesColumn.story = {
  name: 'services column',
  parameters: {
    themeSelector: dlsThemeSelector
  }
};
