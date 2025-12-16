import { Component, Prop, Host, h, State, Event, EventEmitter } from '@stencil/core';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  tag: 'pv-table-component',
  styleUrl: 'table-component.scss',
  shadow: true,
})
export class TableComponent {
  /**
   * The table column definitions
   */
  @Prop() columns: TableColumn[] | string;

  /**
   * The table data
   */
  @Prop() data: any[] | string;

  /**
   * Items to display per page
   */
  @Prop() itemsPerPage: number = 5;

  /**
   * Enable row deletion
   */
  @Prop() enableRowSelection: boolean = false;

  @Event() rowSort: EventEmitter;
  @Event() rowClick: EventEmitter;
  @Event() actionDelete: EventEmitter;

  @State() sortColumn: string = '';
  @State() sortDirection: 'asc' | 'desc' = 'asc';
  @State() currentPage: number = 1;
  @State() filterText: string = '';

  private parseProp<T>(prop: T | string): T {
    if (typeof prop === 'string') {
      try {
        return JSON.parse(prop);
      } catch {
        return [] as any;
      }
    }
    return prop || ([] as any);
  }

  private handleSort(columnKey: string) {
    if (this.sortColumn === columnKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnKey;
      this.sortDirection = 'asc';
    }
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
  }

  private handleFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterText = input.value;
    this.currentPage = 1;
  }

  private handleDelete(row: any) {
    this.actionDelete.emit(row);
  }

  render() {
    const columns = this.parseProp<TableColumn[]>(this.columns);
    let data = this.parseProp<any[]>(this.data);

    // Filtering
    if (this.filterText) {
      const lowerFilter = this.filterText.toLowerCase();
      data = data.filter(row => {
        const rowValues = Object.values(row).map(val => String(val));
        return rowValues.join(' ').toLowerCase().includes(lowerFilter);
      });
    }

    // Sorting
    if (this.sortColumn) {
      data = [...data].sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Pagination
    const totalPages = Math.ceil(data.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + this.itemsPerPage);

    return (
      <Host>
        <div class="table-container">
          {this.parseProp<any[]>(this.data).length > 0 && (
            <div class="table-controls">
              <input
                type="text"
                placeholder="Filter..."
                value={this.filterText}
                onInput={(e) => this.handleFilter(e)}
                class="filter-input"
              />
            </div>
          )}
          <table>
            <thead>
              <tr>
                {columns.map(col => (
                  <th
                    key={col.key}
                    onClick={() => this.handleSort(col.key)}
                    class={{
                      'sortable': true,
                      'sorted-asc': this.sortColumn === col.key && this.sortDirection === 'asc',
                      'sorted-desc': this.sortColumn === col.key && this.sortDirection === 'desc'
                    }}
                  >
                    {col.label}
                    <span class="sort-icon"></span>
                  </th>
                ))}
                {this.enableRowSelection && (
                  <th class="action-column">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td key={`${rowIndex}-${colIndex}`}>{row[col.key]}</td>
                    ))}
                    {this.enableRowSelection && (
                      <td class="action-column">
                        <button class="delete-btn" onClick={() => this.handleDelete(row)}>
                          🗑️
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (this.enableRowSelection ? 1 : 0)} class="empty-state">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div class="pagination">
              <button
                disabled={this.currentPage === 1}
                onClick={() => this.handlePageChange(this.currentPage - 1)}
              >
                Previous
              </button>
              <span class="page-info">
                Page {this.currentPage} of {totalPages}
              </span>
              <button
                disabled={this.currentPage === totalPages}
                onClick={() => this.handlePageChange(this.currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
