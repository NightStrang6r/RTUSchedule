class Calendar {
    constructor(selector) {
        this.calendarEl = document.querySelector(selector);

        const options = {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            moreLinkText: '',
            allDayText: '',
            initialView: 'timeGridWeek',
            locale: 'en',
            selectable: true,
            dayMaxEvents: true,
            selectMirror: true,
            firstDay: 1,
            height: '100%',
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
            unselectCancel: '.cd-popup-container'
        }
    
        this.calendar = new FullCalendar.Calendar(this.calendarEl, options);
    }

    render() {
        this.calendar.render();
    }
}

export default Calendar;