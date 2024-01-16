class DarkTheme {
    constructor() {
        this.storage = window.storage;

        document.addEventListener('DOMContentLoaded', () => this.onDOMContentLoaded());

        this.isEnabled = false;
        //this.onLoad();
    }

    onDOMContentLoaded() {
        this.trigger = document.querySelector('.dark-trigger');
        this.trigger.addEventListener('click', (event) => this.onTrigger(event));
        
        //let isEnabled = this.isEnabled();
        //this.setButtonImage(!isEnabled);
        this.setButtonImage(this.isEnabled);
    }

    isEnabled() {
        let isEnabled = this.storage.getDarkTheme();
        if(isEnabled == null) isEnabled = false;
    }

    onLoad() {
        let isEnabled = this.isEnabled();

        if(isEnabled) {
            this.enable();
        } else {
            this.disable();
        }
    }

    onTrigger(event) {
        event.preventDefault();
        //let isEnabled = this.isEnabled();

        this.isEnabled = !this.isEnabled;
        this.setButtonImage(this.isEnabled);
        //this.setButtonImage(isEnabled);
        //this.storage.saveDarkTheme(!isEnabled);

        // if(isEnabled) {
        //     this.disable();
        // } else {
        //     this.enable();
        // }
    }

    setButtonImage(isEnabled) {
        let img = this.trigger.children[0];

        if(isEnabled) {
            img.src = 'assets/sun.png';
        } else {
            img.src = 'assets/moon.png';
        }
    }

    async enable() {
        //let dark = document.createElement('style');
        //let css = await this.getDarkCSS();
        //dark.innerHTML = css;
        //dark.id = 'darkCSS';
        //document.head.append(dark);
    }

    disable() {
        // let darkStyle = document.querySelectorAll('#darkCSS');
        // let darkLink = document.querySelector('link[href="css/dark.css"]');
        // if(darkLink != null) darkLink.remove();
        // if(darkStyle != null) darkStyle.forEach(el => el.remove());
    }

    async getDarkCSS() {
        //let css = this.storage.getDarkCSS();
        //if(css != null) return css;

        let res = await fetch('css/dark.css');
        css = await res.text();
        this.storage.saveDarkCSS(css);
        return css;
    }
}

export default DarkTheme;