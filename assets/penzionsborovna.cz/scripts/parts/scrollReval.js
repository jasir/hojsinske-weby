import ScrollReveal from 'scrollreveal';

export default function initScrollReval(elClass) {
    ScrollReveal().reveal(`.${elClass}`, {
        delay: 350,
        duration: 650,
        reset: true,
        distance: '40px',
        easing: 'ease-in-out',
    });
}
