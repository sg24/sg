import $ from 'jquery';

class UserOpt {
    constructor() {
        this.vwOptToggler = $(".reuse-view__main--footer__user-det");
        this.vwOpt = $(".reuse-view__main--footer__user-det--opt");
        this.usOptToggler = $(".reuse-view__comments--box__footer--user-det");
        this.usOpt = $(".reuse-view__comments--box__footer--user-det__opt");
        this.share = $(".reuse-share__wrapper");
        this.events();
    }
 
    events() { 
        this.vwOptToggler.click(this.toggleVwOpt.bind(this));
        this.usOptToggler.click(this.toggleUsOpt.bind(this)); 
    } 

    toggleVwOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.vwOptToggler.toggleClass("reuse-view__main--footer__user-det--clk");
        this.vwOpt.toggleClass("reuse-view__main--footer__user-det--opt__visible");
    }

    toggleUsOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.usOptToggler.toggleClass("reuse-view__comments--box__footer--user-det__clk");
        this.usOpt.toggleClass("reuse-view__comments--box__footer--user-det__opt--visible");
    }
} 
    
export default UserOpt;