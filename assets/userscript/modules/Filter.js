import $ from 'jquery';

class Filter {
    constructor() { 
        this.srchToggler = $(".site-main__user--filter__srch");
        this.srch = $(".site-main__user--tab__srch");
        this.filterToggler = $(".site-main__user--filter__opt--title");
        this.filter = $(".site-main__user--filter__opt--wrapper");
        this.overlay = $(".site-main__user--main__overlay");
        this.filterClose = $(".site-main__user--main__overlay, .site-main__user--filter__opt--close");
        this.srchClose = $(".site-main__user--tab__srch--close, .site-main__user--content");
        this.events();
    }

    events() {
        this.srchToggler.click(this.openSrch.bind(this));
        this.srchClose.click(this.closeSrch.bind(this)); 
        this.filterToggler.click(this.toggleFilter.bind(this)); 
        this.filterClose.click(this.CloseAllFilter.bind(this)); 
    }
 
    openSrch() {
        this.srch.addClass("site-main__user--tab__srch--visible");
        this.overlay.addClass("site-main__user--main__overlay--visible");
    }

    closeSrch() {
        this.srch.removeClass("site-main__user--tab__srch--visible");
        this.overlay.removeClass("site-main__user--main__overlay--visible");
    }

    toggleFilter() {
        this.overlay.addClass("site-main__user--main__overlay--visible");
        this.filter.addClass("site-main__user--filter__opt--wrapper__visible");
    }

    CloseAllFilter() {
        this.overlay.removeClass("site-main__user--main__overlay--visible");
        this.filter.removeClass("site-main__user--filter__opt--wrapper__visible");
        this.srch.removeClass("site-main__user--tab__srch--visible");
        this.overlay.removeClass("site-main__user--main__overlay--visible");
    }
}

export default Filter;