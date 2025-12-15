import React from 'react';
import Table from './Table';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data objects',
    },
    columns: {
      control: 'object',
      description: 'Array of column definitions',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const sampleData = [
  { name: 'John Doe', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', role: 'User', status: 'Inactive' },
  { name: 'Bob Johnson', role: 'Editor', status: 'Active' },
];

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Empty = {
  args: {
    columns: sampleColumns,
    data: [],
  },
};
