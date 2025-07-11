/* global document */

class ToggleMenu {
    constructor(togglerClass, menuClass) {
        this.activeClass = '-opened';
        this.toggler = document.querySelector(`.${togglerClass}`);
        this.menu = document.querySelector(`.${menuClass}`);

        if (!this.toggler && !this.menu) {
            return;
        }

        this.initToggle();
    }

    initToggle() {
        this.toggler.addEventListener('click', e => {
            e.preventDefault();

            e.currentTarget.classList.toggle(this.activeClass);
            this.menu.classList.toggle(this.activeClass);
        });
    }
}

export default ToggleMenu;
