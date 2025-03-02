import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../src';
import React from 'react';

describe('StepSlider', () => {
    test('Render initial value correctly', () => {
        render(<Slider range={{ min: 0, max: 100, step: 10 }} />);
        const input = screen.getByRole('spinbutton') as HTMLInputElement;
        expect(input.value).toBe('50');
    });

    test('Drag the thumb to change value', async () => {
        const handleChange = jest.fn();
        render(<Slider onChange={handleChange} />);

        const slider = screen.getByRole('slider');
        fireEvent.mouseDown(slider, { clientX: 100 });

        expect(handleChange).toHaveBeenCalledWith(expect.any(Number));
    });
});