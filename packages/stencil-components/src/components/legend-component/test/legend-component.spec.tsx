import { newSpecPage } from '@stencil/core/testing';
import { LegendComponent } from '../legend-component';

describe('pv-legend-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LegendComponent],
      html: `<pv-legend-component></pv-legend-component>`,
    });
    expect(page.root).toEqualHtml(`
      <pv-legend-component>
        <mock:shadow-root>
          <div class="legend">
            <div class="legend-items"></div>
          </div>
        </mock:shadow-root>
      </pv-legend-component>
    `);
  });
});
