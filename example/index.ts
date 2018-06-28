declare var document: any;

import {animatedScrollTo} from '../lib';
import {easeInOutBack, easeInQuint} from 'es6-easings';


document.getElementById('scroll-600').onclick = function () {
    animatedScrollTo(600);
};

document.getElementById('scroll-1200').onclick = function () {
    animatedScrollTo({
        to: 1200,
        easing: easeInOutBack,
        duration: 3500
    });
};

document.getElementById('scroll-top').onclick = function () {
    animatedScrollTo({
        easing: easeInQuint,
        duration: 1000
    });
};