import { h } from '@stencil/core';
import { TableColumn } from '../table-component';

interface TableBodyProps {
    data: any[];
    columns: TableColumn[];
    onDelete?: (row: any) => void;
    enableRowSelection: boolean;
}

export const TableBody = ({ data, columns, onDelete, enableRowSelection }: TableBodyProps) => (
    <tbody>
        {data.length > 0 ? (
            data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                        <td key={`${rowIndex}-${colIndex}`}>{row[col.key]}</td>
                    ))}
                    {enableRowSelection && (
                        <td class="action-column">
                            <button class="delete-btn" onClick={() => onDelete && onDelete(row)}>
                                🗑️
                            </button>
                        </td>
                    )}
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={columns.length + (enableRowSelection ? 1 : 0)} class="empty-state">
                    No data available
                </td>
            </tr>
        )}
    </tbody>
);
