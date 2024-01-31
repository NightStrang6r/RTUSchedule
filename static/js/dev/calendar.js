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
            swipeSpeed: 250
        };

        this.desktopCalendarOptions = {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            swipeTitlePosition: 'none'
        };

        this.mobileCalendarOptions = {
            headerToolbar: {
                left: 'dayGridMonth,timeGridWeek,timeGridDay,today',
                right: 'chooseScheduleButton'
            },
            swipeTitlePosition: 'center'
        }

        this.mobileWidth = 990;
        this.isMobileCalendar = false;

        this.initOptions();
        window.addEventListener('resize', (event) => this.onWindowResize(event));
    
        this.init();
        this.eventManager = new EventManager();
    }

    init() {
        this.calendar = new SwipeCalendar(this.calendarEl, this.options);
    }

    render() {
        this.calendar.render();
    }

    destroy() {
        this.calendar = null;
        this.calendarEl.innerHTML = '';
    }

    rerender() {
        this.destroy();
        this.init();
        this.render();
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

    initOptions() {
        if (window.innerWidth < this.mobileWidth) {
            this.options = {...this.options, ...this.mobileCalendarOptions};
        } else {
            this.options = {...this.options, ...this.desktopCalendarOptions};
        }
    }

    onWindowResize(event) {
        if (window.innerWidth < this.mobileWidth && !this.isMobileCalendar) {
            this.isMobileCalendar = true;
            this.initOptions();
            this.rerender();
            console.log('Switched to mobile calendar');
        } else if (window.innerWidth >= this.mobileWidth && this.isMobileCalendar) {
            this.isMobileCalendar = false;
            this.initOptions();
            this.rerender();
            console.log('Switched to desktop calendar');
        }
    }
}

export default Calendar;