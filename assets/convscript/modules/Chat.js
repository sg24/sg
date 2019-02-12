import $ from 'jquery';

class Chat {
    constructor() {
        this.overlay = $(".site-main__content--overlay");
        this.srchToggler = $(".site-main__conv--header__search");
        this.srch = $(".site-main__conv--srch");
        this.srchClose = $(".site-main__conv--srch__close, .site-main__conv--content");
        this.sortToggler = $(".reuse-conv-filter__srt");
        this.sortOpt = $(".reuse-conv-filter__srt--opt");
        this.events();

    } 

    events() { 
        this.overlay.click(this.closeAll.bind(this));
        this.srchToggler.click(this.toggleSrch.bind(this));
        this.srchClose.click(this.removeSrch.bind(this));  
        this.sortToggler.click(this.toggleSort.bind(this));
    }

    toggleSrch() {
        this.srch.addClass("site-main__conv--srch__visible");
        this.overlay.addClass("site-main__content--overlay__visible");
        this.sortOpt.removeClass("reuse-conv-filter__srt--opt__visible");
    }   

    removeSrch() {
        this.srch.removeClass("site-main__conv--srch__visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }

    toggleSort() {
        this.sortOpt.toggleClass("reuse-conv-filter__srt--opt__visible");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    closeAll() {
        this.overlay.removeClass("site-main__content--overlay__visible");
        this.sortOpt.removeClass("reuse-conv-filter__srt--opt__visible");
        this.srch.removeClass("site-main__conv--srch__visible");
    }
}

export default Chat;