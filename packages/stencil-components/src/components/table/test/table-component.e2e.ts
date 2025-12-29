import { newE2EPage } from '@stencil/core/testing';

describe('pv-table-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-table-component></pv-table-component>');

    const element = await page.find('pv-table-component');
    expect(element).toHaveClass('hydrated');
  });
});
