/* global window , document */

function resizeHeaderOnScroll() {
    const shrinkOn = 10;
    const {body} = document;
    const shrinkOnPageWidth = 991;
    const smallHeaderClass = '-with-small-header';

    function toggleClass() {
        const distancy = window.pageYOffset;
        const pageWidth = window.innerWidth;

        if (pageWidth > shrinkOnPageWidth) {
            // eslint-disable-next-line no-unused-expressions
            (distancy > shrinkOn) ? body.classList.add(smallHeaderClass) : body.classList.remove(smallHeaderClass);
        }
    }

    window.addEventListener('scroll', toggleClass);
}

export default resizeHeaderOnScroll;
