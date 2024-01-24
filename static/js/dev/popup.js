class Popup {
    constructor(popupSelector, triggerSelector) {
        this.popupEl = document.querySelector(popupSelector);
        
        if(triggerSelector != null)
            this.popupTriggerEl = document.querySelector(triggerSelector);

        this.setupListeners();
    }

    setupListeners() {
        this.popupEl.classList.remove('d-none');

        if (this.popupTriggerEl)
            this.popupTriggerEl.addEventListener('click', (event) => this.open(event));

        this.popupEl.addEventListener('click', (event) => this.closeEvent(event));
        document.addEventListener('keyup', (event) => this.closeEvent(event));
    }

    open() {
        //event.preventDefault();
        this.popupEl.classList.add('is-visible');
    }

    close() {
        this.popupEl.classList.remove('is-visible');
    }

    closeEvent(event) {
        if(event.target.classList.contains('cd-popup-close') || event.target.classList.contains('cd-popup')) {
            event.preventDefault();
            this.close();
        }

        if(event.which == '27') {
            this.close();
        }
    }
}

export default Popup;