export interface Range {
    min: number
    max: number
    step: number
}

export function v2p(val: number, { min, max }: Range) {

    // For updating the display

    // value -> percentage
    // |min|-----|val|-----------|max|

    return (val - min) / (max - min) * 100;
}

export function p2v(percentage: number, { min, max }: Range) {

    // For updating the value

    // percentage -> value

    return percentage * (max - min) / 100 + min;
}

export function correctNumber(rawValue: number, { min, max, step }: Range) {
    if (step > max - min) return min;

    const precision = step.toString().split('.')[1]?.length || 0;
    const factor = Math.pow(10, precision);

    const steps = Math.round((rawValue - min) / step);
    let adjusted = min + steps * step;

    adjusted = Math.round(adjusted * factor) / factor;

    const clamped = Math.min(max, Math.max(min, adjusted));

    return Number(clamped.toFixed(precision));
}