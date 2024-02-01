(() => {
  // static/js/dev/eventManager.js
  var EventManager = class {
    parseEvent(eventData) {
      let eventTitle = eventData.eventTempNameEn;
      let formatDate = this.formatEventData(eventData);
      let eventObject = {
        id: eventData.eventDateId + "_" + eventData.eventId,
        title: eventTitle,
        start: formatDate["year"] + "-" + formatDate["month"] + "-" + formatDate["day"] + "T" + formatDate["startHour"] + ":" + formatDate["startMin"] + ":00",
        end: formatDate["year"] + "-" + formatDate["month"] + "-" + formatDate["day"] + "T" + formatDate["endHour"] + ":" + formatDate["endMin"] + ":00"
      };
      return eventObject;
    }
    formatEventData(eventData) {
      let date = new Date(eventData.eventDate);
      let newDateData = [];
      let months_arr = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ];
      newDateData["year"] = date.getFullYear();
      newDateData["month"] = months_arr[date.getMonth()];
      let day = date.getDate();
      newDateData["day"] = this.zeroBeforeDateTime(day);
      newDateData["startHour"] = this.zeroBeforeDateTime(eventData.customStart.hour);
      newDateData["startMin"] = this.zeroBeforeDateTime(
        eventData.customStart.minute
      );
      newDateData["endHour"] = this.zeroBeforeDateTime(eventData.customEnd.hour);
      newDateData["endMin"] = this.zeroBeforeDateTime(eventData.customEnd.minute);
      return newDateData;
    }
    zeroBeforeDateTime(datetimeString) {
      if (datetimeString.toString().length == 1) {
        datetimeString = "0" + datetimeString;
      } else if (datetimeString.toString().length == 0) {
        datetimeString = "00" + datetimeString;
      }
      return datetimeString;
    }
  };
  var eventManager_default = EventManager;

  // static/js/dev/calendar.js
  var Calendar = class {
    constructor(selector) {
      this.calendarEl = document.querySelector(selector);
      this.options = {
        customButtons: {
          chooseScheduleButton: {
            text: "Choose schedule",
            click: function() {
              alert("clicked the custom button!");
            }
          }
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
        swipeSpeed: 250
      };
      this.desktopCalendarOptions = {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        swipeTitlePosition: "none"
      };
      this.mobileCalendarOptions = {
        headerToolbar: {
          left: "dayGridMonth,timeGridWeek,timeGridDay,today",
          right: "chooseScheduleButton"
        },
        swipeTitlePosition: "center"
      };
      this.mobileWidth = 990;
      this.isMobileCalendar = false;
      this.initOptions();
      window.addEventListener("resize", (event) => this.onWindowResize(event));
      this.init();
      this.eventManager = new eventManager_default();
    }
    init() {
      this.calendar = new SwipeCalendar(this.calendarEl, this.options);
    }
    render() {
      this.calendar.render();
    }
    destroy() {
      this.calendar = null;
      this.calendarEl.innerHTML = "";
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
        this.options = { ...this.options, ...this.mobileCalendarOptions };
      } else {
        this.options = { ...this.options, ...this.desktopCalendarOptions };
      }
    }
    onWindowResize(event) {
      if (window.innerWidth < this.mobileWidth && !this.isMobileCalendar) {
        this.isMobileCalendar = true;
        this.initOptions();
        this.rerender();
        console.log("Switched to mobile calendar");
      } else if (window.innerWidth >= this.mobileWidth && this.isMobileCalendar) {
        this.isMobileCalendar = false;
        this.initOptions();
        this.rerender();
        console.log("Switched to desktop calendar");
      }
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

  // static/js/dev/popup.js
  var Popup = class {
    constructor(popupSelector, triggerSelector) {
      this.popupEl = document.querySelector(popupSelector);
      if (triggerSelector != null)
        this.popupTriggerEl = document.querySelector(triggerSelector);
      this.setupListeners();
    }
    setupListeners() {
      this.popupEl.classList.remove("d-none");
      if (this.popupTriggerEl)
        this.popupTriggerEl.addEventListener("click", (event) => this.open(event));
      this.popupEl.addEventListener("click", (event) => this.closeEvent(event));
      document.addEventListener("keyup", (event) => this.closeEvent(event));
    }
    open() {
      this.popupEl.classList.add("is-visible");
    }
    close() {
      this.popupEl.classList.remove("is-visible");
    }
    closeEvent(event) {
      if (event.target.classList.contains("cd-popup-close") || event.target.classList.contains("cd-popup")) {
        event.preventDefault();
        this.close();
      }
      if (event.which == "27") {
        this.close();
      }
    }
  };
  var popup_default = Popup;

  // static/js/dev/popupSelectSchedule.js
  var PopupSelectSchedule = class extends popup_default {
    constructor(popupSelector, triggerSelector) {
      super(popupSelector, triggerSelector);
      this.tabFullTimeEl = document.querySelector(".js-tab-header-full-time");
      this.tabErasmusEl = document.querySelector(".js-tab-header-erasmus");
      this.inputFullTimeEl = document.querySelector(".js-popup-schedule-input-full-time");
      this.inputErasmusEl = document.querySelector(".js-popup-schedule-input-erasmus");
      this.tabFullTimeEl.addEventListener("click", (event) => this.onTabFullTimeSelected(event));
      this.tabErasmusEl.addEventListener("click", (event) => this.onTabErasmusSelected(event));
      this.initSemesters();
    }
    async initSemesters() {
      const semesters = await window.storage.getSemesters();
      this.$selectPeriod = $("#select-period").selectize();
      this.controlPeriod = this.$selectPeriod[0].selectize;
      semesters.forEach((semester) => {
        this.controlPeriod.addOption({
          id: semester.semesterId,
          title: semester.titleEN,
          url: "/"
        });
      });
    }
    onTabFullTimeSelected() {
      this.tabFullTimeEl.classList.add("active");
      this.tabErasmusEl.classList.remove("active");
      this.inputFullTimeEl.classList.remove("d-none");
      this.inputErasmusEl.classList.add("d-none");
    }
    onTabErasmusSelected() {
      this.tabFullTimeEl.classList.remove("active");
      this.tabErasmusEl.classList.add("active");
      this.inputFullTimeEl.classList.add("d-none");
      this.inputErasmusEl.classList.remove("d-none");
    }
  };
  var popupSelectSchedule_default = PopupSelectSchedule;

  // static/js/dev/API.js
  var API = class {
    async POSTRequest(url, body = null) {
      if (body) {
        body = new URLSearchParams(body);
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body
      };
      const res = await fetch(url, options);
      return res;
    }
    async getJsonFromRes(res) {
      return await res.json();
    }
    async getSemesters() {
      const url = `/getSemesters`;
      const res = await this.POSTRequest(url);
      const json = await this.getJsonFromRes(res);
      return json;
    }
    async getSemesterProgEventList(semesterProgramId, year, month) {
      const url = `/getSemesterProgEventList`;
      const body = {
        semesterProgramId,
        year,
        month
      };
      const res = await this.POSTRequest(url, body);
      const json = await this.getJsonFromRes(res);
      return json;
    }
    async getChousenSemesterById(semesterId) {
      const url = `/getChousenSemesterById`;
      const body = {
        semesterId
      };
      const res = await this.POSTRequest(url, body);
      const json = await this.getJsonFromRes(res);
      return json;
    }
    async findProgramsBySemesterId(semesterId) {
      const url = `/findProgramsBySemesterId`;
      const body = {
        semesterId
      };
      const res = await this.POSTRequest(url, body);
      const json = await this.getJsonFromRes(res);
      return json;
    }
  };
  var API_default = API;

  // static/js/dev/storage.js
  var Storage = class {
    constructor() {
      this.API = new API_default();
    }
    async getSemesters() {
      return await this.API.getSemesters();
    }
    async getSemesterProgEventList(semesterProgramId, year, month) {
      return await this.API.getSemesterProgEventList(semesterProgramId, year, month);
    }
  };
  var storage_default = Storage;

  // static/js/dev/app.js
  var App = class {
    constructor() {
      document.addEventListener("DOMContentLoaded", (event) => this.main(event));
      window.storage = new storage_default();
      this.burger = new burger_default();
      this.darkTheme = new darkTheme_default();
      this.calendar = new calendar_default("#calendar");
    }
    run() {
      this.burger.init();
    }
    async main() {
      this.popupSelectSchedule = new popupSelectSchedule_default(".cd-popup-select-schedule", ".js-course-select");
      const eventList = await window.storage.getSemesterProgEventList("13017", "2024", "02");
      this.calendar.loadEvents(eventList);
      console.log("Events loaded: ", eventList);
      this.calendar.render();
    }
  };
  var app_default = App;

  // static/js/dev/index.js
  var app = new app_default();
  app.run();
})();
