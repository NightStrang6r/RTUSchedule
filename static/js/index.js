(() => {
  // static/js/dev/calendar.js
  var Calendar = class {
    constructor(selector) {
      this.calendarEl = document.querySelector(selector);
      const options = {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        moreLinkText: "",
        allDayText: "",
        initialView: "timeGridWeek",
        locale: "en",
        firstDay: 1,
        height: "100%",
        nowIndicator: true,
        slotMinTime: "08:00:00",
        slotMaxTime: "18:00:00",
        slotDuration: "00:25:00",
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short"
        }
      };
      this.calendar = new FullCalendar.Calendar(this.calendarEl, options);
    }
    render() {
      this.calendar.render();
    }
  };
  var calendar_default = Calendar;

  // static/js/dev/app.js
  var App = class {
    constructor() {
      document.addEventListener("DOMContentLoaded", (event) => this.main(event));
      this.calendar = new calendar_default("#calendar");
    }
    run() {
      this.calendar.render();
    }
    async main() {
      const burgerButtonMobile = document.querySelector(".header__burger-menu.mobile");
      const burgerButtonDesktop = document.querySelector(".header__burger-menu.desktop");
      const header_container = document.querySelector(".header-container");
      const body = document.querySelector("body");
      const navLinks = document.querySelectorAll(".header__menu-link");
      const openSidebarMenu = document.getElementById("openSidebarMenu");
      burgerButtonDesktop.addEventListener("click", () => {
        burgerButtonDesktop.classList.toggle("active");
        openSidebarMenu.checked = !openSidebarMenu.checked;
      });
      burgerButtonMobile.addEventListener("click", function() {
        header_container.classList.toggle("active");
        burgerButtonMobile.classList.toggle("active");
        body.classList.toggle("lock");
      });
      navLinks.forEach((navLink) => {
        navLink.addEventListener("click", () => {
          if (burgerButtonMobile.classList.contains("active")) {
            header__nav.classList.remove("active");
            burgerButtonMobile.classList.remove("active");
            body.classList.remove("lock");
          }
        });
      });
    }
  };
  var app_default = App;

  // static/js/dev/index.js
  var app = new app_default();
  app.run();
})();
