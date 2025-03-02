import { Meta, StoryObj } from '@storybook/react';

import StepSlider from '../components/Slider';
// import React from 'react';

const meta: Meta<typeof StepSlider> = {
    title: 'Components/StepSlider',
    component: StepSlider,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof StepSlider>;

export const Default: Story = {
    args: {
        range: { min: -1, max: 100, step: 5 },
        showBar: true
    }
};