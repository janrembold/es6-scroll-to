export interface animatedScrollToOptions {
    to?: number;
    duration?: number;
    easing?: Function;
}
export declare const animatedScrollTo: (args?: number | animatedScrollToOptions) => void;
