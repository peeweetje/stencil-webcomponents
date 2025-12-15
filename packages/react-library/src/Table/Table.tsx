import React, { useState, useMemo } from 'react';
import './Table.scss';

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableProps {
  data?: any[];
  columns?: TableColumn[];
  className?: string;
  itemsPerPage?: number;
}

const Table: React.FC<TableProps> = ({ 
  data = [], 
  columns = [], 
  className,
  itemsPerPage = 5 
}) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const processedData = useMemo(() => {
    let tempData = [...data];

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
  }, [data, sortColumn, sortDirection]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`table-container ${className || ''}`}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`
                  sortable 
                  ${sortColumn === col.key ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}
                `}
              >
                {col.label}
                <span className="sort-icon"></span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="empty-state">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
