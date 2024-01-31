import Popup from './popup.js';

class PopupSelectSchedule extends Popup {
    constructor(popupSelector, triggerSelector) {
        super(popupSelector, triggerSelector);

        this.tabFullTimeEl = document.querySelector('.js-tab-header-full-time');
        this.tabErasmusEl = document.querySelector('.js-tab-header-erasmus');
        this.inputFullTimeEl = document.querySelector('.js-popup-schedule-input-full-time');
        this.inputErasmusEl = document.querySelector('.js-popup-schedule-input-erasmus');

        this.tabFullTimeEl.addEventListener('click', (event) => this.onTabFullTimeSelected(event));
        this.tabErasmusEl.addEventListener('click', (event) => this.onTabErasmusSelected(event));

        var $select = $('.js-study-period-select').selectize();          
    }

    onTabFullTimeSelected() {
        this.tabFullTimeEl.classList.add('active');
        this.tabErasmusEl.classList.remove('active');
        this.inputFullTimeEl.classList.remove('d-none');
        this.inputErasmusEl.classList.add('d-none');
    }

    onTabErasmusSelected() {
        this.tabFullTimeEl.classList.remove('active');
        this.tabErasmusEl.classList.add('active');
        this.inputFullTimeEl.classList.add('d-none');
        this.inputErasmusEl.classList.remove('d-none');
    }
}

export default PopupSelectSchedule;