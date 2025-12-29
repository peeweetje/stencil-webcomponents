import React from 'react';
import { TableColumn } from './Table';

interface TableHeaderProps {
    columns: TableColumn[];
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    onSort: (columnKey: string) => void;
    showActionColumn: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
    columns,
    sortColumn,
    sortDirection,
    onSort,
    showActionColumn
}) => {
    return (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key}
                        onClick={() => onSort(col.key)}
                        className={`
              sortable 
              ${sortColumn === col.key ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}
            `}
                    >
                        {col.label}
                        <span className="sort-icon"></span>
                    </th>
                ))}
                {showActionColumn && <th className="action-column">Actions</th>}
            </tr>
        </thead>
    );
};

export default TableHeader;
