class Calendar {
    constructor(selector) {
        this.calendarEl = document.querySelector(selector);

        this.options = {
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
                right: 'dayGridMonth,timeGridWeek,timeGridDay,today'
            }
        }
    
        this.calendar = new SwipeCalendar(this.calendarEl, this.options);
    }

    render() {
        this.calendar.render();
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