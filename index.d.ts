export interface animatedScrollToOptions {
    to?: number;
    dist?: number;
    easing?(): Function;
}
export declare const animatedScrollTo: (args?: number | animatedScrollToOptions) => void;
