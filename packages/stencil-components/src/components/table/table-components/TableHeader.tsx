import { h } from '@stencil/core';
import { TableColumn } from '../table-component';

interface TableHeaderProps {
    columns: TableColumn[];
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    onSort: (columnKey: string) => void;
    showActionColumn: boolean;
}

export const TableHeader = ({ columns, sortColumn, sortDirection, onSort, showActionColumn }: TableHeaderProps) => (
    <thead>
        <tr>
            {columns.map(col => (
                <th
                    key={col.key}
                    onClick={() => onSort(col.key)}
                    class={{
                        'sortable': true,
                        'sorted-asc': sortColumn === col.key && sortDirection === 'asc',
                        'sorted-desc': sortColumn === col.key && sortDirection === 'desc'
                    }}
                >
                    {col.label}
                    <span class="sort-icon"></span>
                </th>
            ))}
            {showActionColumn && <th class="action-column">Actions</th>}
        </tr>
    </thead>
);
