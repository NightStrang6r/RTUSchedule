import EventManager from "./eventManager.js";

class Calendar {
    constructor(selector) {
        this.calendarEl = document.querySelector(selector);

        this.options = {
            customButtons: {
                chooseScheduleButton: {
                    text: 'Choose schedule',
                    click: function() {
                        alert('clicked the custom button!');
                    }
                }
            },
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            height: '100%',
            allDaySlot: false,
            expandRows: true,
            initialView: 'timeGridWeek',
            locale: 'en',
            firstDay: 1,
            nowIndicator: true,
            slotMinTime: "08:00:00",
            slotMaxTime: "18:00:00",
            slotDuration: "00:25:00",
            slotLabelFormat: {
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'short'
            },
            swipeEffect: 'slide',
            swipeSpeed: 250,
            swipeTitlePosition: 'none',
            windowResize: (arg) => this.onWindowResize(arg)
        };

        if (window.innerWidth < 990) {
            this.options.swipeTitlePosition = 'center';
            this.options.headerToolbar = {
                left: 'dayGridMonth,timeGridWeek,timeGridDay,today',
                right: 'chooseScheduleButton'
            }
        }
    
        this.calendar = new SwipeCalendar(this.calendarEl, this.options);
        this.eventManager = new EventManager();
    }

    render() {
        this.calendar.render();
    }

    loadEvents(events) {
        events.forEach(async (event) => {
            this.addEvent(event);
        });
    }

    async addEvent(event) {
        let eventObject = this.eventManager.parseEvent(event);
        this.calendar.addEvent(eventObject);
    }

    onWindowResize(arg) {
        /*if (window.innerWidth < 990) {
            this.options.swipeTitlePosition = 'center';
        } else {
            this.options.swipeTitlePosition = 'none';
        }

        this.render();*/
    }
}

export default Calendar;