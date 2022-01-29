/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styled from '@emotion/styled';
import { cx } from 'emotion';
import PropTypes from 'prop-types';
import { usePagination, useTable } from 'react-table';

import { Icon } from '@atoms/Icon';

export function Pagination({ pageIndex, pageSize, numRows, previousPage, nextPage, canPreviousPage, canNextPage }) {
  const firstIndex = pageIndex * pageSize;
  const lastIndex = Math.min(firstIndex + pageSize, numRows);
  const firstRecordIndex = firstIndex + 1;
  return (
    <PaginationWrapper>
      <PaginationText>
        {firstRecordIndex === lastIndex ? (
          <span>
            Viewing {firstRecordIndex} of {numRows}
          </span>
        ) : (
          <span>
            Viewing {firstRecordIndex}-{lastIndex} of {numRows}
          </span>
        )}
      </PaginationText>
      <PaginationArrows>
        <PaginationArrow disabled={!canPreviousPage} role="button" onClick={() => previousPage()}>
          <Icon icon="chevron-left" size={12} />
        </PaginationArrow>
        <PaginationArrow disabled={!canNextPage} role="button" onClick={() => nextPage()}>
          <Icon icon="chevron-right" size={12} />
        </PaginationArrow>
      </PaginationArrows>
    </PaginationWrapper>
  );
}

export function Table({ columns, data, className, enablePagination }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    state: { pageIndex, pageSize },
    ...tableProps
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    usePagination,
  );

  function renderHeaderGroup(headerGroup) {
    // don't render empty header row
    if (headerGroup.headers.every(headerRecord => headerRecord.Header === '')) return null;

    return (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th data-column={column.id} {...column.getHeaderProps()}>
            {column.render('Header')}
          </th>
        ))}
      </tr>
    );
  }

  return (
    <div className={cx('position-relative', className)}>
      {enablePagination && (
        <Pagination pageIndex={pageIndex} pageSize={pageSize} numRows={rows.length} {...tableProps} />
      )}
      <TableWrapper {...getTableProps()}>
        <thead>{headerGroups.map(renderHeaderGroup)}</thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td data-column={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
    </div>
  );
}

Table.propTypes = {
  enablePagination: PropTypes.bool,
};

Table.defaultProps = {
  enablePagination: true,
};

const TableWrapper = styled.table`
  width: 100%;
  color: var(--copy-black-med);

  th,
  td {
    vertical-align: top;
    padding: 0.5rem;
    line-height: 28px;
    white-space: nowrap;
  }
`;

const PaginationWrapper = styled.div`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  user-select: none;
`;

const PaginationText = styled.div`
  margin-top: 4px;
  color: var(--copy-black-low);
  position: relative;
`;

const PaginationArrows = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationArrow = styled.div`
  margin-left: 12px;
  cursor: pointer;
  svg {
    color: var(--brand-bubble);
  }
  ${({ disabled }) =>
    disabled &&
    `
    svg {
      opacity: 0.5;
      color: var(--brand-bubble-100);
    }
    pointer-events: none;
  `}
`;
