import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    clickable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    heading: 'Card title',
    subtitle: 'Card subtitle',
    children: 'This is the card body. Use children for any content.',
    footer: <Button size="small">Action</Button>,
  },
};

export const Elevated: Story = {
  args: {
    heading: 'Elevated card',
    variant: 'elevated',
    children: 'Elevated cards cast a soft shadow instead of a border.',
  },
};

export const Outlined: Story = {
  args: {
    heading: 'Outlined card',
    variant: 'outlined',
    children: 'Outlined cards use a blue accent border.',
  },
};

export const WithImage: Story = {
  args: {
    heading: 'Card with image',
    subtitle: 'Media on top',
    imageSrc: 'https://picsum.photos/320/180',
    imageAlt: 'Random image',
    children: 'Pass imageSrc / imageAlt or a custom media slot.',
  },
};

export const Clickable: Story = {
  args: {
    heading: 'Clickable card',
    subtitle: 'Keyboard accessible',
    clickable: true,
    children: 'Click or press Enter to trigger onCardClick.',
    onCardClick: () => alert('Card clicked!'),
  },
};

export const CustomSlots: Story = {
  render: args => (
    <Card
      {...args}
      header={<strong>Custom header slot</strong>}
      media={<img src="https://picsum.photos/320/120" alt="Custom media" style={{ width: '100%' }} />}
      footer={
        <>
          <Button variant="outline" size="small">Cancel</Button>
          <Button size="small">Confirm</Button>
        </>
      }
    >
      Custom header, media and footer via slots.
    </Card>
  ),
};
