import React from 'react';
import Legend from './Legend';

export default {
  title: 'Components/Legend',
  component: Legend,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    items: [
      { label: 'Active', color: '#00ff00' },
      { label: 'Inactive', color: '#ff0000' },
      { label: 'Pending', color: '#ffff00' },
    ],
  },
};

export const WithTitle = {
  args: {
    legendTitle: 'Status Legend',
    items: [
      { label: 'Online', color: '#00ff00' },
      { label: 'Offline', color: '#ff0000' },
    ],
  },
};

export const Empty = {
  args: {
    items: [],
  },
};
