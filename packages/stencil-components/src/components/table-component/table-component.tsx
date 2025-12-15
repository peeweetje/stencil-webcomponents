import { Component, Prop, Host, h } from '@stencil/core';

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

  render() {
    const columns = this.parseProp<TableColumn[]>(this.columns);
    const data = this.parseProp<any[]>(this.data);

    return (
      <Host>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                {columns.map(col => (
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
      </Host>
    );
  }
}
