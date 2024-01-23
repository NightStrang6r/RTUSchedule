import Calendar from "./calendar.js";
import Burger from "./burger.js";
import DarkTheme from "./darkTheme.js";
import API from "./API.js";

class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', (event) => this.main(event));
        this.burger = new Burger();
        this.darkTheme = new DarkTheme();
        this.calendar = new Calendar("#calendar");
        this.API = new API();
    }

    run() {
        this.burger.init();
        this.calendar.render();
    }

    async main() {
        
    }
}

export default App;