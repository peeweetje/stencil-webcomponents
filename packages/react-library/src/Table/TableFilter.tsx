import React from 'react';

interface TableFilterProps {
    filterText: string;
    onFilterChange: (text: string) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
    filterText,
    onFilterChange
}) => {
    return (
        <div className="table-controls">
            <input
                type="text"
                placeholder="Filter..."
                value={filterText}
                onChange={(e) => onFilterChange(e.target.value)}
                className="filter-input"
            />
        </div>
    );
};

export default TableFilter;
