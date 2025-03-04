import React from 'react';
import { Range } from './utils';
interface StepSliderProps {
    range?: Range;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    className?: string;
    showBar?: boolean;
    thumbColor?: string;
    barColor?: string;
}
export declare const Slider: React.FC<StepSliderProps>;
export {};
