import type { Preview } from '@storybook/react-vite';
import '../src/Legend/Legend.scss';
import { defineCustomElements } from 'stencil-components/loader';

defineCustomElements();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
