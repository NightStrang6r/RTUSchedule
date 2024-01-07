import Calendar from "./calendar.js";

class App {
    constructor() {
        this.calendar = new Calendar("#calendar");
    }

    run() {
        this.calendar.render();
    }
}

export default App;