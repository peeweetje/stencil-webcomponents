import React, { useState, useMemo } from 'react';
import './Table.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import TableFilter from './TableFilter';

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableProps {
  data?: any[];
  columns?: TableColumn[];
  className?: string;
  itemsPerPage?: number;
  onRowDelete?: (row: any) => void;
  onRowAdd?: () => void;
}

const Table = ({
  data = [],
  columns = [],
  className,
  itemsPerPage = 5,
  onRowDelete
}: TableProps) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterText, setFilterText] = useState<string>('');

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (text: string) => {
    setFilterText(text);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const processedData = useMemo(() => {
    let tempData = [...data];

    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      tempData = tempData.filter(row => {
        const rowValues = Object.values(row).map(val => String(val));
        return rowValues.join(' ').toLowerCase().includes(lowerFilter);
      });
    }

    if (sortColumn) {
      tempData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return tempData;
  }, [data, sortColumn, sortDirection, filterText]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`table-container ${className || ''}`}>
      {data.length > 0 && (
        <TableFilter
          filterText={filterText}
          onFilterChange={handleFilterChange}
        />
      )}

      <table>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          showActionColumn={!!onRowDelete}
        />
        <TableBody
          data={paginatedData}
          columns={columns}
          onRowDelete={onRowDelete}
        />
      </table>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Table;
