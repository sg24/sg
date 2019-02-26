import $ from 'jquery';

class AccNav {
    constructor() {
        this.siteMain = $(".site-main");
        this.navTogger = $(".site-main__content--tab__nav-cnt");
        this.nav = $(".site-main__nav");
        this.navClose = $(".site-main__nav-cnt-overlay, .site-main__nav--header > div")
        this.overlay = $(".site-main__nav-cnt-overlay");
        this.events();
    } 

    events() { 
        this.navTogger.click(this.toggleNav.bind(this));
        this.navClose.click(this.closeNav.bind(this));
    }

    toggleNav() {
        this.nav.toggleClass("site-main__nav--md-visible");
        this.siteMain.toggleClass("site-main__nav-cnt-visible");
        this.overlay.toggleClass("site-main__nav-cnt-overlay--visible");
    }

    closeNav() {
        this.nav.removeClass("site-main__nav--md-visible");
        this.siteMain.removeClass("site-main__nav-cnt-visible");
        this.overlay.removeClass("site-main__nav-cnt-overlay--visible");
    }
}

export default AccNav;