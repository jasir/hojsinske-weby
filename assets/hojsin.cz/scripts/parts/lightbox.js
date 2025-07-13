import Glightbox from 'glightbox';

export default function initLightBox(elClass) {
    console.log('ZZZZZZZZZZZZZz initLightBox', elClass);
    Glightbox({
        selector: elClass,
    });
}
