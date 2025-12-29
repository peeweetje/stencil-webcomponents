import { h } from '@stencil/core';

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const TablePagination = ({ currentPage, totalPages, onPageChange }: TablePaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div class="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            <span class="page-info">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};
