(() => {
  // static/js/dev/calendar.js
  var Calendar = class {
    constructor(selector) {
      this.calendarEl = document.querySelector(selector);
      this.options = {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        height: "100%",
        allDaySlot: false,
        expandRows: true,
        initialView: "timeGridWeek",
        locale: "en",
        firstDay: 1,
        nowIndicator: true,
        slotMinTime: "08:00:00",
        slotMaxTime: "18:00:00",
        slotDuration: "00:25:00",
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short"
        },
        swipeEffect: "slide",
        swipeSpeed: 250,
        swipeTitlePosition: "none",
        windowResize: (arg) => this.onWindowResize(arg)
      };
      if (window.innerWidth < 990) {
        this.options.swipeTitlePosition = "center";
        this.options.headerToolbar = {
          right: "dayGridMonth,timeGridWeek,timeGridDay,today"
        };
      }
      this.calendar = new SwipeCalendar(this.calendarEl, this.options);
    }
    render() {
      this.calendar.render();
    }
    onWindowResize(arg) {
    }
  };
  var calendar_default = Calendar;

  // static/js/dev/burger.js
  var Burger = class {
    constructor() {
      this.burgerButtonMobile = document.querySelector(".header__burger-menu.mobile");
      this.burgerButtonDesktop = document.querySelector(".header__burger-menu.desktop");
      this.headerContainer = document.querySelector(".header-container");
      this.body = document.querySelector("body");
      this.navLinks = document.querySelectorAll(".header__menu-link");
      this.openSidebarMenu = document.getElementById("openSidebarMenu");
    }
    init() {
      this.burgerButtonDesktop.addEventListener("click", () => this.onBurgerButtonDesktopClick());
      this.burgerButtonMobile.addEventListener("click", () => this.onBurgerButtonMobileClick());
      for (let i = 0; i < this.navLinks.length; i++) {
        this.navLinks[i].addEventListener("click", () => this.onNavLinkClick());
      }
    }
    onBurgerButtonDesktopClick() {
      this.burgerButtonDesktop.classList.toggle("active");
      this.openSidebarMenu.checked = !this.openSidebarMenu.checked;
    }
    onBurgerButtonMobileClick() {
      this.headerContainer.classList.toggle("active");
      this.burgerButtonMobile.classList.toggle("active");
      this.body.classList.toggle("lock");
    }
    onNavLinkClick() {
      if (!this.burgerButtonMobile.classList.contains("active"))
        return;
      this.burgerButtonMobile.classList.remove("active");
      this.body.classList.remove("lock");
    }
  };
  var burger_default = Burger;

  // static/js/dev/darkTheme.js
  var DarkTheme = class {
    constructor() {
      this.storage = window.storage;
      document.addEventListener("DOMContentLoaded", () => this.onDOMContentLoaded());
      this.isEnabled = false;
    }
    onDOMContentLoaded() {
      this.trigger = document.querySelector(".dark-trigger");
      this.trigger.addEventListener("click", (event) => this.onTrigger(event));
      this.setButtonImage(this.isEnabled);
    }
    isEnabled() {
      let isEnabled = this.storage.getDarkTheme();
      if (isEnabled == null)
        isEnabled = false;
    }
    onLoad() {
      let isEnabled = this.isEnabled();
      if (isEnabled) {
        this.enable();
      } else {
        this.disable();
      }
    }
    onTrigger(event) {
      event.preventDefault();
      this.isEnabled = !this.isEnabled;
      this.setButtonImage(this.isEnabled);
    }
    setButtonImage(isEnabled) {
      let img = this.trigger.children[0];
      if (isEnabled) {
        img.src = "assets/sun.png";
      } else {
        img.src = "assets/moon.png";
      }
    }
    async enable() {
    }
    disable() {
    }
    async getDarkCSS() {
      let res = await fetch("css/dark.css");
      css = await res.text();
      this.storage.saveDarkCSS(css);
      return css;
    }
  };
  var darkTheme_default = DarkTheme;

  // static/js/dev/API.js
  var API = class {
    constructor() {
      this.getSemesterProgEventList("13741", "2024", "01");
    }
    async getSemesterProgEventList(semesterProgramId, year, month) {
      const url = `/getSemesterProgEventList`;
      const body = {
        semesterProgramId,
        year,
        month
      };
      const data = new URLSearchParams(body);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: data
      };
      let res, json;
      try {
        res = await fetch(url, options);
        json = await res.json();
      } catch (err) {
        json = false;
      }
      return json;
    }
  };
  var API_default = API;

  // static/js/dev/app.js
  var App = class {
    constructor() {
      document.addEventListener("DOMContentLoaded", (event) => this.main(event));
      this.burger = new burger_default();
      this.darkTheme = new darkTheme_default();
      this.calendar = new calendar_default("#calendar");
      this.API = new API_default();
    }
    run() {
      this.burger.init();
      this.calendar.render();
    }
    async main() {
    }
  };
  var app_default = App;

  // static/js/dev/index.js
  var app = new app_default();
  app.run();
})();
