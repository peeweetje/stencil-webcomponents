import { newE2EPage } from '@stencil/core/testing';

describe('pv-legend-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-legend-component></pv-legend-component>');

    const element = await page.find('pv-legend-component');
    expect(element).toHaveClass('hydrated');
  });
});
