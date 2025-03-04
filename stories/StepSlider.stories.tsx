import { Meta, StoryObj } from '@storybook/react';

import { Slider } from '../src';

const meta: Meta<typeof Slider> = {
    title: 'Components/StepSlider',
    component: Slider,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
    args: {
        range: { min: -1, max: 100, step: 5 },
        showBar: true
    }
};
