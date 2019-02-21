import $ from 'jquery';

class Srch {
    constructor() { 
        this.srchToggler = $(".reuse-fav-filter__srch, .site-main__conv--header__search, .reuse-user-filter__srch, .reuse-acc-filter__srch");
        this.srch = $(".reuse-srch");
        this.srchClose = $(".reuse-srch__close, .site-main__content--overlay");
        this.sortOpt = $(".reuse-sort__opt");
        this.overlay = $(".site-main__content--overlay");
        this.events();
    } 

    events() {  
        this.srchToggler.click(this.openSrch.bind(this));
        this.srchClose.click(this.closeSrch.bind(this));
    }

    openSrch() {
        this.sortOpt.removeClass("reuse-sort__opt--visible");
        this.srch.addClass("reuse-srch__visible");
        this.overlay.addClass("site-main__content--overlay__visible");
    }

    closeSrch() {
        this.srch.removeClass("reuse-srch__visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }
} 

export default Srch;