import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
      description: 'The button variant style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The button size',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the button will take full width of container',
    },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};