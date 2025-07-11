/* eslint-disable no-undef */
/**
 * Get offset of an element
 *
 * @param {HTMLElement} element
 *
 * @returns {{top: number, left: number}}
 */
function elGetDocumentOffset(element) {
    if (!element) {
        return {
            top: 0,
            left: 0,
        };
    }

    const elementBox = element.getBoundingClientRect();

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

    const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    const clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

    const top = elementBox.top + scrollTop - clientTop;
    const left = elementBox.left + scrollLeft - clientLeft;

    return {
        top,
        left,
    };
}

/**
 *  Scroll page to an element
 *
 * @param {HTMLElement} element
 * @param {number} offset
 * @param {number} duration
 *
 * @returns {undefined}
 */
export function elScrollTo(element, offset = -20, duration = 500) {
    if (!element) {
        return;
    }

    const fps = 60;
    const stepDuration = 1000 / fps;
    const elementOffset = elGetDocumentOffset(element);
    const targetScroll = elementOffset.top + offset;
    const scrollDirectionTop = window.pageYOffset > targetScroll;
    const {body} = document;
    const html = document.documentElement;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    let scrollStep = -window.pageYOffset / (duration / stepDuration);

    if (!scrollDirectionTop) {
        scrollStep = targetScroll / (duration / stepDuration);
    }

    const scrollInterval = setInterval(() => {
        if (scrollDirectionTop && (window.pageYOffset + scrollStep < targetScroll)) {
            window.scrollTo(0, targetScroll);
            clearInterval(scrollInterval);

            return;
        }

        if (!scrollDirectionTop && (window.pageYOffset + scrollStep > targetScroll)) {
            window.scrollTo(0, targetScroll);
            clearInterval(scrollInterval);

            return;
        }

        if (!scrollDirectionTop && (documentHeight - window.pageYOffset <= windowHeight)) {
            window.scrollTo(0, documentHeight - windowHeight);
            clearInterval(scrollInterval);

            return;
        }

        if (window.pageYOffset !== targetScroll) {
            window.scrollBy(0, scrollStep);

            return;
        }

        clearInterval(scrollInterval);
    }, stepDuration);
}

function forEachLinkCallFunction(elList, callback) {
    [].forEach.call(elList, el => {
        const target = document.getElementById(el.getAttribute('href').substr(1));

        callback(el, target);
    });
}

function scrollToTargetOnClick(el, target) {
    const menu = document.querySelector('.js_toggle-menu');
    const menuToggler = document.querySelector('.js_menu-toggler');

    el.addEventListener('click', e => {
        e.preventDefault();

        if (!target) {
            return;
        }

        elScrollTo(target, -80, 900);

        if (menu && menu.classList.contains('-opened')) {
            menu.classList.remove('-opened');
        }
        if (menuToggler && menuToggler.classList.contains('-opened')) {
            menuToggler.classList.remove('-opened');
        }
    });
}

function toggleActiveClassOnScroll(link, target) {
    window.addEventListener('scroll', () => {
        if (!target) {
            return;
        }

        const targetClientRect = target.getBoundingClientRect().top;


        if (targetClientRect < 200 && targetClientRect > -(target.clientHeight - 200)) {
            link.classList.add('-active');
        } else {
            link.classList.remove('-active');
        }
    });
}


export default function initPageScroll() {
    const scrollLinks = document.querySelectorAll('.js_scroll');

    if (scrollLinks.length === 0) {
        return;
    }

    forEachLinkCallFunction(scrollLinks, scrollToTargetOnClick);
    forEachLinkCallFunction(scrollLinks, toggleActiveClassOnScroll);
}
