import React, { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';
import { Range, v2p, p2v, correctNumber } from './utils';
import './index.css';

interface StepSliderProps {
    range?: Range
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void

    className?: string
    showBar?: boolean

    thumbColor?: string
    barColor?: string
}

export const Slider: React.FC<StepSliderProps> = ({
    range = { min: 0, max: 100, step: 1 },
    defaultValue = correctNumber((range.min + range.max) / 2, range),
    onChange,
    className,
    showBar = false,
    thumbColor = "#3b82f6",
    barColor = "#3b82f6",
}) => {
    const { min, max, step } = range;

    // Internal value of the component
    const [internalValue, setInternalValue] = useState<number>(defaultValue);
    const internalValueRef = useRef(internalValue); // Avoid closure trap

    // Judge dragging state to apply transition
    const [isDragging, setIsDragging] = useState(false);

    // Reference to the slider <div>
    const sliderRef = useRef<HTMLDivElement>(null);

    const [inputValue, setInputValue] = useState(internalValue.toString());

    // Update internal value
    const updateInternalValue = useCallback(
        (value: number) => {
            const corrected = correctNumber(value, range)

            if (value == corrected) {
                setInputValue(corrected.toString());
                onChange?.(corrected);
            }
            internalValueRef.current = value;
            setInternalValue(value);
        }, [onChange, range]
    );

    // Correct value & Update external value
    const updateExternalValue = useCallback(
        (value: number) => {
            const corrected = correctNumber(value, range);

            internalValueRef.current = corrected;
            setInternalValue(corrected);

            setInputValue(corrected.toString());

            onChange?.(corrected);
        }, [onChange, range]
    )

    // Calculate rounded value of user input
    const x2v = useCallback(
        (clientX: number) => {
            if (!sliderRef.current) return min;

            const rect = sliderRef.current.getBoundingClientRect();

            const offsetX = Math.min(rect.width, Math.max(0, clientX - rect.left)); // Restriction
            const percentage = offsetX / rect.width * 100;
            const rawValue = p2v(percentage, range);

            // return correctNumber(rawValue, range);
            return rawValue;
        },
        [min, max, step]
    );

    const handleMouseDown = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            e.preventDefault();
            setIsDragging(true);

            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const newValue = x2v(clientX);
            updateInternalValue(newValue);

            const handleMove = (moveEvent: Event) => {
                const event = moveEvent as unknown as MouseEvent | TouchEvent;

                const moveClientX = 'touches' in event ?
                    event.touches[0].clientX :
                    (event as MouseEvent).clientX;

                const moveValue = x2v(moveClientX);
                updateInternalValue(moveValue);
            };

            const handleUp = () => {
                setIsDragging(false);
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('touchend', handleUp);

                updateInternalValue(correctNumber(internalValueRef.current, range));
            };

            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleUp);
        }, [x2v]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const clampedValue = Math.min(Math.max(value, min), max);

        setInputValue(clampedValue.toString());
        updateInternalValue(clampedValue);
    };

    // When input loses focus, correct the value
    const handleInputBlur = () => {
        updateExternalValue(Number(inputValue));
    };

    useEffect(() => {
        const corrected = correctNumber(internalValue, range);
        if (corrected !== internalValue) {
            setInternalValue(corrected);
            setInputValue(corrected.toString());
            onChange?.(corrected);
        }
    }, [range]);

    return (
        <div className={`react-slider relative h-4 w-xs ${className}`}>

            {/* Slider Track */}
            <div
                ref={sliderRef}
                className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-300 cursor-pointer"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={internalValue}
            >

                {/* Fill */}
                {
                    showBar
                        ? < div
                            className={`h-full rounded-full ${isDragging ? '' : 'transition-all duration-500'}`}
                            style={{ width: `${v2p(internalValue, range)}%`, backgroundColor: barColor }}
                        />
                        : null
                }
            </div>

            {/* Slider Thumb */}
            <div
                className={`group absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${isDragging ? '' : 'transition-all duration-500'}`}
                style={{
                    left: `${v2p(internalValue, range)}%`,
                    backgroundColor: `${thumbColor}${Math.round(0.3 * 255).toString(16).padStart(2, '0')}`
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >

                <div
                    className='absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md transition-transform duration-200 ease-in-out group-hover:scale-[3]'
                    style={{ backgroundColor: thumbColor }}
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
                className="absolute top-1/2 left-full ml-6 w-16 -translate-y-1/2 text-center border border-gray-300 rounded"
                aria-label="Slider value"
            />

            {/* <div className='m-10'>Internal value: {internalValue}</div>
            <div className='m-10'>Internal ref value: {internalValueRef.current}</div> */}
        </div >
    );
};
