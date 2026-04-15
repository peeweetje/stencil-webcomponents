import React from 'react';
import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger', 'success', 'warning'],
      description: 'The badge variant style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The badge size',
    },
    rounded: {
      control: 'boolean',
      description: 'If true, the badge will have rounded corners',
    },
    filled: {
      control: 'boolean',
      description: 'If true, the badge will be filled',
    },
  },

};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary Badge',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Badge',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline Badge',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    children: 'Danger Badge',
  },
};

export const Success = {
  args: {
    variant: 'success',
    children: 'Success Badge',
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    children: 'Warning Badge',
  },
};

export const Small = {
  args: {
    size: 'small',
    children: 'Small Badge',
  },
};

export const Large = {
  args: {
    size: 'large',
    children: 'Large Badge',
  },
};

export const Rounded = {
  args: {
    rounded: true,
    children: 'Rounded Badge',
  },
};

export const Filled = {
  args: {
    filled: true,
    children: 'Filled Badge',
  },
};

export const CustomContent = {
  args: {
    children: 'New Badge',
  },
};
