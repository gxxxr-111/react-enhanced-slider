"use client";

import React, { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';

interface Range {
    min: number
    max: number
    step: number
}

function correctNumber(rawValue: number, { min, max, step }: Range) {
    const precision = step.toString().split('.')[1]?.length || 0;
    const factor = Math.pow(10, precision);

    const steps = Math.round((rawValue - min) / step);
    let adjusted = min + steps * step;

    adjusted = Math.round(adjusted * factor) / factor;

    const clamped = Math.min(max, Math.max(min, adjusted));

    return Number(clamped.toFixed(precision));
}

interface StepSliderProps {
    range?: Range
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    className?: string
    showBar?: boolean
}

const StepSlider: React.FC<StepSliderProps> = ({
    range = { min: 0, max: 100, step: 1 },
    value: propValue,
    defaultValue = correctNumber((range.min + range.max) / 2, range),
    onChange,
    className,
    showBar = false,
}) => {
    const { min, max, step } = range; // Rename for simplicity

    const [internalValue, setInternalValue] = useState<number>(defaultValue);

    const sliderRef = useRef<HTMLDivElement>(null); // Reference to the slider <div>

    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : internalValue;

    const [inputValue, setInputValue] = useState(value.toString());

    // Get percentage to locate the thumb
    const getPercentage = useCallback(
        (val: number) => ((val - min) / (max - min)) * 100,
        [min, max]
    );

    // Calculate rounded value of user input
    const calculateValue = useCallback(
        (clientX: number) => {
            if (!sliderRef.current) return min;

            const rect = sliderRef.current.getBoundingClientRect(); // Get x_pos of the slider rect

            const offsetX = Math.min(rect.width, Math.max(0, clientX - rect.left)); // Restriction is necessary
            const percentage = offsetX / rect.width;
            const rawValue = min + percentage * (max - min);

            return correctNumber(rawValue, range);
        },
        [min, max, step]
    );

    // Update internal value
    const updateValue = useCallback(
        (correctedValue: number) => {
            if (!isControlled) {
                setInternalValue(correctedValue);
            }
            onChange?.(correctedValue);
        },
        [isControlled, min, max, onChange]
    );

    const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const newValue = calculateValue(clientX);
        updateValue(newValue);

        const handleMove = (moveEvent: Event) => {
            const event = moveEvent as unknown as MouseEvent | TouchEvent;

            const moveClientX = 'touches' in event ?
                event.touches[0].clientX :
                (event as MouseEvent).clientX;

            const moveValue = calculateValue(moveClientX);
            updateValue(moveValue);
        };

        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleUp);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleUp);
    }, [calculateValue, updateValue]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        let processedValue = rawValue;

        const numericValue = Number(rawValue);
        if (!isNaN(numericValue)) {
            const clampedValue = Math.min(Math.max(numericValue, min), max);
            processedValue = clampedValue.toString();
        }
        setInputValue(processedValue);
    };

    // When input loses focus, round the value
    const handleInputBlur = () => {
        let numericValue = Number(inputValue);

        if (isNaN(numericValue)) {
            numericValue = value;
        } else {
            numericValue = correctNumber(numericValue, range);
        }

        updateValue(numericValue);
        setInputValue(numericValue.toString());
    };

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const displayValue = (() => {
        const numericValue = Number(inputValue);
        return isNaN(numericValue) ? value : correctNumber(numericValue, range);
    })();


    return (
        <div className={`relative h-4 w-xs ${className}`}>

            {/* Slider Track */}
            <div
                ref={sliderRef}
                className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-300 cursor-pointer"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
            >

                {/* Fill */}
                {
                    showBar
                        ? < div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${getPercentage(displayValue)}%` }}
                        />
                        : null
                }
            </div>

            {/* Slider Thumb */}
            <div
                className="group absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/30"
                style={{ left: `${getPercentage(displayValue)}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >

                <div
                    className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-md transition-transform duration-200 ease-in-out group-hover:scale-[3]"
                />
            </div>

            {/* Input */}
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                min={min}
                max={max}
                step={step}
                className="absolute top-1/2 left-full ml-6 w-16 text-center border border-gray-300 rounded"
                style={{ transform: 'translateY(-50%)' }}
                aria-label="Slider value"
            />
        </div >
    );
};

export default StepSlider;
