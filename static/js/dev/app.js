import Calendar from "./calendar.js";
import Burger from "./burger.js";
import DarkTheme from "./darkTheme.js";
import API from "./API.js";
import PopupSelectSchedule from "./popupSelectSchedule.js";

class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', (event) => this.main(event));
        this.burger = new Burger();
        this.darkTheme = new DarkTheme();
        this.calendar = new Calendar("#calendar");
        this.API = new API();
        this.PopupSelectSchedule = new PopupSelectSchedule(".cd-popup-select-schedule");
    }

    run() {
        this.burger.init();
        //this.PopupSelectSchedule.open();
    }

    async main() {
        const eventList = await this.API.getSemesterProgEventList('13017', '2024', '02');
        this.calendar.loadEvents(eventList);
        console.log('Events loaded: ', eventList);
        this.calendar.render();
    }
}

export default App;