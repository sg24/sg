import $ from 'jquery';

class Chat {
    constructor() {
        this.overlay = $(".site-main__conv--tab__overlay");
        this.convDetToggler = $(".site-main__conv--tab__content--opt");
        this.convDetOpt = $(".site-main__conv--tab__content--opt__det");
        this.srchToggler = $(".site-main__conv--header__search");
        this.srch = $(".site-main__conv--tab__srch");
        this.srchClose = $(".site-main__conv--tab__srch--close, .site-main__conv--tab__content");
        this.sortToggler = $(".site-main__conv--filter__sort");
        this.sortOpt = $(".site-main__conv--filter__sort--opt");
        this.closeAllToggler = $(".site-main__conv--tab__overlay");
        this.events();

    }

    events() { 
        this.convDetToggler.click(this.toggleConvDet.bind(this));
        this.closeAllToggler.click(this.closeAll.bind(this));
        this.srchToggler.click(this.toggleSrch.bind(this));
        this.srchClose.click(this.removeSrch.bind(this));  
        this.sortToggler.click(this.toggleSort.bind(this));
    }

    toggleConvDet() {
        this.overlay.toggleClass("site-main__conv--tab__overlay--visible");
        this.convDetOpt.toggleClass("site-main__conv--tab__content--opt__det--visible");
    }

    toggleSrch() {
        this.srch.toggleClass("site-main__conv--tab__srch--visible");
        this.overlay.removeClass("site-main__conv--tab__overlay--visible");
        this.convDetOpt.removeClass("site-main__conv--tab__content--opt__det--visible");
        this.sortOpt.removeClass("site-main__conv--filter__sort--opt__visible");
    }   

    removeSrch() {
        this.srch.removeClass("site-main__conv--tab__srch--visible");
    }

    toggleSort() {
        this.sortOpt.toggleClass("site-main__conv--filter__sort--opt__visible");
        this.overlay.toggleClass("site-main__conv--tab__overlay--visible");
    }

    closeAll() {
        this.overlay.removeClass("site-main__conv--tab__overlay--visible");
        this.convDetOpt.removeClass("site-main__conv--tab__content--opt__det--visible");
        this.sortOpt.removeClass("site-main__conv--filter__sort--opt__visible");
    }
}

export default Chat;