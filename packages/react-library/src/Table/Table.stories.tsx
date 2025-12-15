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
    itemsPerPage: {
      control: 'number',
      description: 'Items key page',
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

const largeData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'User',
  status: i % 5 === 0 ? 'Inactive' : 'Active',
}));

const columnsWithId = [
  { key: 'id', label: 'ID' },
  ...sampleColumns
];

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const PaginatedAndSortable = {
  args: {
    columns: columnsWithId,
    data: largeData,
    itemsPerPage: 5,
  },
};

export const Empty = {
  args: {
    columns: sampleColumns,
    data: [],
  },
};
