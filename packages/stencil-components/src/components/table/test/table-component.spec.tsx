import { newSpecPage } from '@stencil/core/testing';
import { TableComponent } from '../table-component';

describe('pv-table-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableComponent],
      html: `<pv-table-component></pv-table-component>`,
    });
    expect(page.root).toEqualHtml(`
      <pv-table-component>
        <mock:shadow-root>
          <div class="table-container">
            <table>
              <thead>
                <tr></tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </mock:shadow-root>
      </pv-table-component>
    `);
  });
});
