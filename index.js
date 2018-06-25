const defaults = {
    duration: 400,
    easing: (t, b, c, d) => {
        return -c *(t/=d)*(t-2) + b;
    },
    to: 0
};

export const animatedScrollTo = (options) => {
    if(Number.isInteger(options)) {
        options = {
            to: options
        };
    }

    const settings = Object.assign({}, defaults, options);

    settings.startingYOffset = window.pageYOffset;
    settings.distanceYOffset = parseInt(settings.to, 10) - settings.startingYOffset;

    window.requestAnimationFrame(timestamp => animateScroll(settings, timestamp));
};

function animateScroll(settings, now) {
    if(!settings.startTime) {
        settings.startTime = now;
    }

    const currentTime = now - settings.startTime;
    let newYOffset = Math.round(settings.easing(
        currentTime, 
        settings.startingYOffset, 
        settings.distanceYOffset,
        settings.duration
    ));

    if(currentTime < settings.duration) {
        window.requestAnimationFrame(timestamp => animateScroll(settings, timestamp)); 
    } else {
        newYOffset = settings.to;
    }

    setScrollTopPosition(newYOffset);
}

function setScrollTopPosition(newYOffset) {
    document.documentElement.scrollTop = newYOffset;
    document.body.scrollTop = newYOffset;
}
