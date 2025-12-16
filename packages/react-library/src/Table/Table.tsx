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
  onRowDelete?: (row: any) => void;
  onRowAdd?: () => void;
}

const Table: React.FC<TableProps> = ({ 
  data = [], 
  columns = [], 
  className,
  itemsPerPage = 5,
  onRowDelete
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

  const [filterText, setFilterText] = useState<string>('');

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
      <div className="table-controls">
        <input
          type="text"
          placeholder="Filter..."
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          className="filter-input"
        />
      </div>
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
            {onRowDelete && <th className="action-column">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`}>{row[col.key]}</td>
                ))}
                {onRowDelete && (
                  <td className="action-column">
                    <button 
                      className="delete-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowDelete(row);
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (onRowDelete ? 1 : 0)} className="empty-state">No data available</td>
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
