import { newSpecPage } from '@stencil/core/testing';
import { LegendComponent } from '../legend-component';

describe('legend-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LegendComponent],
      html: `<legend-component></legend-component>`,
    });
    expect(page.root).toEqualHtml(`
      <legend-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </legend-component>
    `);
  });
});
