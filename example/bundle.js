(function () {
    'use strict';

    var defaults = {
        duration: 400,
        easing: function easing(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        to: 0
    };

    var animatedScrollTo = function animatedScrollTo(args) {
        if (isInteger(args)) {
            args = {
                to: args
            };
        }

        //const options = extend(defaults, args);
        var options = Object.assign({}, defaults, args);

        options.startingYOffset = window.pageYOffset;
        options.distanceYOffset = parseInt(options.to, 10) - options.startingYOffset;

        window.requestAnimationFrame(function (timestamp) {
            return animateScroll(options, timestamp);
        });
    };

    var animateScroll = function animateScroll(options, now) {
        if (!options.startTime) {
            options.startTime = now;
        }

        var currentTime = now - options.startTime;
        var newYOffset = Math.round(options.easing(currentTime, options.startingYOffset, options.distanceYOffset, options.duration));

        if (currentTime < options.duration) {
            window.requestAnimationFrame(function (timestamp) {
                return animateScroll(options, timestamp);
            });
        } else {
            newYOffset = options.to;
        }

        setScrollTopPosition(newYOffset);
    };

    var setScrollTopPosition = function setScrollTopPosition(newYOffset) {
        document.documentElement.scrollTop = newYOffset;
        document.body.scrollTop = newYOffset;
    };

    var isInteger = function isInteger(value) {
        if (Number.isInteger) {
            return Number.isInteger(value);
        } else {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        }
    };

    const easeInQuint = (t, b, c, d) => {
        return c*(t/=d)*t*t*t*t + b;
    };

    const easeInOutBack = (t, b, c, d, s = 1.70158) => {
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    };

    document.getElementById('scroll-600').onclick = function () {
        animatedScrollTo(600);
    };

    document.getElementById('scroll-1200').onclick = function () {
        animatedScrollTo({
            to: 1200,
            easing: easeInOutBack
        });
    };

    document.getElementById('scroll-top').onclick = function () {
        animatedScrollTo({
            easing: easeInQuint
        });
    };

}());
