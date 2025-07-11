/* eslint-disable no-undef */
import {jarallax} from 'jarallax';

export default function parallax() {
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.7,
    });
}
