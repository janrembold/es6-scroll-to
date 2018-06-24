import {animatedScrollTo} from '../index';
import {easeInOutBack,easeInQuint} from 'es6-easings';

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