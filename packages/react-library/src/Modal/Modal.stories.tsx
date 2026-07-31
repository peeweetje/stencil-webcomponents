import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = (args: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This is the modal body content. You can put any content here including forms, text, images or other components.</p>
        <p style={{ marginTop: '16px' }}>Modal supports escape key to close, backdrop click and has smooth animations.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Title',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    size: 'medium',
  },
};

export const Small: Story = {
  render: ModalTemplate,
  args: {
    title: 'Small Modal',
    size: 'small',
  },
};

export const Large: Story = {
  render: ModalTemplate,
  args: {
    title: 'Large Modal',
    size: 'large',
  },
};

export const WithoutCloseButton: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Without Close Button',
    showCloseButton: false,
  },
};