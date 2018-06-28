const defaults = {
    duration: 400,
    easing: (t: number, b: number, c: number, d: number) => {
        return -c *(t/=d)*(t-2) + b;
    },
    to: 0
};

export interface animatedScrollToOptions {
    to?: number,
    duration?: number,
    easing?: Function
}

export const animatedScrollTo = (args?: number|animatedScrollToOptions) => {
    if(isInteger(args)) {
        args = { to: <number>args };
    }

    const options: any = extend(defaults, args);
    options.startingYOffset = window.pageYOffset;
    options.distanceYOffset = parseInt(options.to, 10) - options.startingYOffset;

    window.requestAnimationFrame((timestamp: number) => animateScroll(options, timestamp));
};

const animateScroll = (options: any, now: number) => {
    if(!options.startTime) {
        options.startTime = now;
    }

    const currentTime = now - options.startTime;
    let newYOffset = Math.round(options.easing(
        currentTime, 
        options.startingYOffset, 
        options.distanceYOffset,
        options.duration
    ));

    if(currentTime < options.duration) {
        window.requestAnimationFrame((timestamp: number) => animateScroll(options, timestamp));
    } else {
        newYOffset = options.to;
    }

    setScrollTopPosition(newYOffset);
}

const setScrollTopPosition = (newYOffset: number) => {
    document.documentElement.scrollTop = newYOffset;
    document.body.scrollTop = newYOffset;
};

const isInteger = (value: any) => {
    if(<any>Number.isInteger) {
        return Number.isInteger(value);
    } else {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
};

const extend = (defaults: any, options: any) => {
    const extendedOptions: any = {};
    for (let key in defaults) { 
        extendedOptions[key] = options[key] || defaults[key]; 
    }
    return extendedOptions;
};