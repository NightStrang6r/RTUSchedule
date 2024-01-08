import Calendar from "./calendar.js";

class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', (event) => this.main(event));
        this.calendar = new Calendar("#calendar");
    }

    run() {
        this.calendar.render();
    }

    async main() {
        // Burger Menu Start
        const burgerButtonMobile = document.querySelector(".header__burger-menu.mobile");
        const burgerButtonDesktop = document.querySelector(".header__burger-menu.desktop");
        const header_container = document.querySelector(".header-container");
        const body = document.querySelector("body");
        const navLinks = document.querySelectorAll(".header__menu-link");
        const openSidebarMenu =  document.getElementById("openSidebarMenu");

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
        // Burger Menu End

    }
}

export default App;