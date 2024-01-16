class Burger {
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
        if (!this.burgerButtonMobile.classList.contains("active")) return;

        this.burgerButtonMobile.classList.remove("active");
        this.body.classList.remove("lock");
    }
}

export default Burger;