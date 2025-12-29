import { Component, Prop, Host, h, State, Event, EventEmitter } from '@stencil/core';
import { TableHeader } from './table-components/TableHeader';
import { TableBody } from './table-components/TableBody';
import { TablePagination } from './table-components/TablePagination';
import { TableFilter } from './table-components/TableFilter';

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
            <TableFilter
              filterText={this.filterText}
              onFilterInput={(e) => this.handleFilter(e)}
            />
          )}

          <table>
            <TableHeader
              columns={columns}
              sortColumn={this.sortColumn}
              sortDirection={this.sortDirection}
              onSort={(key) => this.handleSort(key)}
              showActionColumn={this.enableRowSelection}
            />

            <TableBody
              data={paginatedData}
              columns={columns}
              enableRowSelection={this.enableRowSelection}
              onDelete={this.enableRowSelection ? (row) => this.handleDelete(row) : undefined}
            />
          </table>

          <TablePagination
            currentPage={this.currentPage}
            totalPages={totalPages}
            onPageChange={(page) => this.handlePageChange(page)}
          />
        </div>
      </Host>
    );
  }
}
