(function () {
    'use strict';

    const defaults = {
        duration: 400,
        easing: (t, b, c, d) => {
            return -c *(t/=d)*(t-2) + b;
        },
        to: 0
    };

    const animatedScrollTo = (options) => {
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

    const easeInQuint = (t, b, c, d) => {
        return c*(t/=d)*t*t*t*t + b;
    };

    const easeInOutBack = (t, b, c, d) => {
        var s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    };

    document.getElementById('scroll-600').onclick = function() {
        animatedScrollTo(600);
    };

    document.getElementById('scroll-1200').onclick = function() {
        animatedScrollTo({
            to: 1200,
            easing: easeInOutBack
        });
    };

    document.getElementById('scroll-top').onclick = function() {
        animatedScrollTo({
            easing: easeInQuint
        });
    };

}());
