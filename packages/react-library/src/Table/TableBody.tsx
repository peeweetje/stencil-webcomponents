import React from 'react';
import { TableColumn } from './Table';

interface TableBodyProps {
    data: any[];
    columns: TableColumn[];
    onRowDelete?: (row: any) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
    data,
    columns,
    onRowDelete
}) => {
    return (
        <tbody>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
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
                                    title="Delete Row"
                                >
                                    🗑️
                                </button>
                            </td>
                        )}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length + (onRowDelete ? 1 : 0)} className="empty-state">
                        No data available
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default TableBody;
