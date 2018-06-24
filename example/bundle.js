(function () {
    'use strict';

    const defaults = {
        duration: 600,
        easing: (t, b, c, d) => {
            return -c *(t/=d)*(t-2) + b;
        },
        to: 0
    };

    const animatedScrollTo = (options) => {
        const settings = Object.assign({}, defaults, options);

        // console.log(settings);
        console.log('document.body.scrollTop = ' + document.body.scrollTop);
        console.log('document.documentElement.scrollTop = ' + document.documentElement.scrollTop);
        console.log('window.scrollY = ' + window.scrollY);
        console.log('window.pageYOffset = ' + window.pageYOffset);

        // settings.startTime = performance.now();
        settings.startingYOffset = window.pageYOffset;
        settings.distanceYOffset = parseInt(settings.to, 10) - settings.startingYOffset;

        window.requestAnimationFrame(timestamp => animateScroll(settings, timestamp));
        
        // document.documentElement || document.body

        // var start = element.scrollTop,
        // change = to - start,
        // currentTime = 0,
        // increment = 20;
        
        // var animateScroll = function(){        
        //     currentTime += increment;
        //     var val = Math.easeInOutQuad(currentTime, start, change, duration);
        //     element.scrollTop = val;
        //     if(currentTime < duration) {
        //         setTimeout(animateScroll, increment);
        //     }
        // };

        // animateScroll();

    };

    function animateScroll(settings, now) {
        if(!settings.startTime) {
            settings.startTime = now;
        }
        // console.log(settings);

        const currentTime = now - settings.startTime;
        // console.log(currentTime);

        const newYOffset = Math.round(settings.easing(
            currentTime, 
            settings.startingYOffset, 
            settings.distanceYOffset,
            settings.duration
        ));

        console.log(newYOffset);

        document.documentElement.scrollTop = newYOffset;
        document.body.scrollTop = newYOffset;
        //if(newYOffset < settings.to) {
        if(currentTime < settings.duration && newYOffset !== settings.to) {
            window.requestAnimationFrame(timestamp => animateScroll(settings, timestamp)); 
        }
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
        animatedScrollTo({
            to: 600
        });
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
