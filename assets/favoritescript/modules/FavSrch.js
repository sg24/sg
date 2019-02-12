import $ from 'jquery';

class FavSrch {
    constructor() { 
        this.srchToggler = $(".reuse-fav-filter__srch");
        this.srch = $(".site-main__fav-main--srch");
        this.srchClose = $(".site-main__fav-main--srch__close, .site-main__content--overlay");
        this.overlay = $(".site-main__content--overlay");
        this.events();
    }

    events() {  
        this.srchToggler.click(this.openSrch.bind(this));
        this.srchClose.click(this.closeSrch.bind(this));
    }

    openSrch() {
        this.srch.addClass("site-main__fav-main--srch__visible");
        this.overlay.addClass("site-main__content--overlay__visible");
    }

    closeSrch() {
        this.srch.removeClass("site-main__fav-main--srch__visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }
} 

export default FavSrch;