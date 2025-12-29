import { h } from '@stencil/core';

interface TableFilterProps {
    filterText: string;
    onFilterInput: (event: Event) => void;
}

export const TableFilter = ({ filterText, onFilterInput }: TableFilterProps) => (
    <div class="table-controls">
        <input
            type="text"
            placeholder="Filter..."
            value={filterText}
            onInput={onFilterInput}
            class="filter-input"
        />
    </div>
);
