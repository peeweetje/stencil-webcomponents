import React from 'react';
import './Table.scss';

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableProps {
  data?: any[];
  columns?: TableColumn[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ data = [], columns = [], className }) => {
  return (
    <div className={`table-container ${className || ''}`}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
