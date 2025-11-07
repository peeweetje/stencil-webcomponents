import { newE2EPage } from '@stencil/core/testing';

describe('legend-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<legend-component></legend-component>');

    const element = await page.find('legend-component');
    expect(element).toHaveClass('hydrated');
  });
});
