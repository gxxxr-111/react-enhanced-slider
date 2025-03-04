export interface Range {
    min: number;
    max: number;
    step: number;
}
export declare function v2p(val: number, { min, max }: Range): number;
export declare function p2v(percentage: number, { min, max }: Range): number;
export declare function correctNumber(rawValue: number, { min, max, step }: Range): number;
