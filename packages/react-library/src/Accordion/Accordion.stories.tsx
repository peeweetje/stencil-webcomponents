import React from 'react';
import Accordion from './Accordion';

export default {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        allowMultiple: { control: 'boolean' },
    },
};

const defaultItems = [
    { header: 'Section 1', content: 'This is the content for section 1.' },
    { header: 'Section 2', content: 'This is the content for section 2.' },
    { header: 'Section 3', content: 'This is the content for section 3.' },
];

export const Default = {
    args: {
        items: defaultItems,
        allowMultiple: false,
    },
};

export const MultipleOpen = {
    args: {
        items: defaultItems,
        allowMultiple: true,
    },
};

export const WithJsonString = {
    args: {
        items: JSON.stringify(defaultItems),
        allowMultiple: false,
    },
};
