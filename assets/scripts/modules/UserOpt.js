import $ from 'jquery';

class UserOpt {
    constructor() {
        this.queOptToggler = $(".reuse-que__footer--details");
        this.queOpt = $(".reuse-que__footer--details__options");
        this.ptOptToggler = $(".reuse-pt__footer--details");
        this.ptOpt = $(".reuse-pt__footer--details__options");
        this.onqueOptToggler = $(".reuse-onlineque__content--posted__user--det");
        this.onqueOpt = $(".reuse-onlineque__content--posted__user--det__opt");
        this.pwtToggler = $(".reuse-pwt__content--det__user--det");
        this.pwtOpt = $(".reuse-pwt__content--det__user--det__opt");
        this.shareToggler = $(".reuse-share__icn");
        this.share = $(".reuse-share__wrapper");
        this.events();
    }
 
    events() { 
        this.queOptToggler.click(this.toggleQueOpt.bind(this));
        this.ptOptToggler.click(this.togglePtOpt.bind(this));
        this.onqueOptToggler.click(this.toggleOnqueOpt.bind(this));
        this.pwtToggler.click(this.togglePwtOpt.bind(this));
    } 

    toggleQueOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.queOptToggler.toggleClass("reuse-que__footer--details__clk");
        this.queOpt.toggleClass("reuse-que__footer--details__options--visible");
    }

    togglePtOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.ptOptToggler.toggleClass("reuse-pt__footer--details__clk");
        this.ptOpt.toggleClass("reuse-pt__footer--details__options--visible");
    }

    toggleOnqueOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.onqueOpt.toggleClass("reuse-onlineque__content--posted__user--det__opt--visible");
    }

    togglePwtOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.pwtOpt.toggleClass("reuse-pwt__content--det__user--det__opt--visible");
    }
}
    
export default UserOpt;