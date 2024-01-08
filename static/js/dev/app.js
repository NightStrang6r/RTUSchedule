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
        const burgerButton = document.querySelector(".header__burger-menu");
        const header_container = document.querySelector(".header-container");
        const body = document.querySelector("body");
        const navLinks = document.querySelectorAll(".header__menu-link");

        burgerButton.addEventListener("click", function() {
            header_container.classList.toggle("active");
            burgerButton.classList.toggle("active");
            body.classList.toggle("lock");
        });

        navLinks.forEach((navLink) => {
            navLink.addEventListener("click", () => {
                if (burgerButton.classList.contains("active")) {
                    header__nav.classList.remove("active");
                    burgerButton.classList.remove("active");
                    body.classList.remove("lock");
                }
            });
        });
        // Burger Menu End

    }
}

export default App;