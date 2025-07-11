/* eslint-disable no-undef */

import {tns} from '../../../../node_modules/tiny-slider/src/tiny-slider';

/**
 * Init tiny slider
 * @param {string} elId
 * @param {object} options
 */

export default function initTinySlider(elId, options) {
    const el = document.querySelector(`#${elId}`);

    if (!el) {
        return;
    }

    tns({
        container: el,
        ...options,
    });
}
