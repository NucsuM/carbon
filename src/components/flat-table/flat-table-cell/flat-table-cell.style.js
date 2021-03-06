import styled, { css } from "styled-components";
import { space } from "styled-system";

import baseTheme from "../../../style/themes/base";

const StyledFlatTableCell = styled.td`
  ${({ align, theme, rowSpan }) => css`
    background-color: #fff;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    text-overflow: ellipsis;
    text-align: ${align};
    vertical-align: middle;
    white-space: nowrap;
    padding: 0;

    > div {
      box-sizing: border-box;
      ${space};
    }

    &:first-of-type {
      border-left: 1px solid ${theme.table.secondary};
    }

    &:last-of-type {
      border-right: 1px solid ${theme.table.secondary};
    }

    ${rowSpan &&
    css`
      &:first-of-type + & {
        border-left: 1px solid ${theme.table.secondary};
      }
    `}
  `}
`;

StyledFlatTableCell.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableCell;
