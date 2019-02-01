import $ from 'jquery';

class Chat {
    constructor() {
        this.overlay = $(".site-main__content--overlay");
        this.convDetToggler = $(".site-main__conv--content__opt");
        this.convDetOpt = $(".site-main__conv--content__opt--det");
        this.srchToggler = $(".site-main__conv--header__search");
        this.srch = $(".site-main__conv--srch");
        this.srchClose = $(".site-main__conv--srch__close, .site-main__conv--content");
        this.sortToggler = $(".site-main__conv--filter__sort");
        this.sortOpt = $(".site-main__conv--filter__sort--opt");
        this.events();

    }

    events() { 
        this.convDetToggler.click(this.toggleConvDet.bind(this));
        this.overlay.click(this.closeAll.bind(this));
        this.srchToggler.click(this.toggleSrch.bind(this));
        this.srchClose.click(this.removeSrch.bind(this));  
        this.sortToggler.click(this.toggleSort.bind(this));
    }

    toggleConvDet() {
        this.overlay.toggleClass("site-main__content--overlay__visible");
        this.convDetOpt.toggleClass("site-main__conv--content__opt--det__visible");
    }

    toggleSrch() {
        this.srch.toggleClass("site-main__conv--srch__visible");
        this.overlay.toggleClass("site-main__content--overlay__visible");
        this.convDetOpt.removeClass("site-main__conv--content__opt--det__visible");
        this.sortOpt.removeClass("site-main__conv--filter__sort--opt__visible");
    }   

    removeSrch() {
        this.srch.removeClass("site-main__conv--srch__visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }

    toggleSort() {
        this.sortOpt.toggleClass("site-main__conv--filter__sort--opt__visible");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    closeAll() {
        this.overlay.removeClass("site-main__content--overlay__visible");
        this.convDetOpt.removeClass("site-main__conv--content__opt--det__visible");
        this.sortOpt.removeClass("site-main__conv--filter__sort--opt__visible");
    }
}

export default Chat;