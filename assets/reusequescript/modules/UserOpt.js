import $ from 'jquery';

class UserOpt {
    constructor() {
        this.queOptToggler = $(".reuse-que__footer--details");
        this.queOpt = $(".reuse-que__footer--details__options");
        this.shareToggler = $(".reuse-share__icn");
        this.share = $(".reuse-share__wrapper");
        this.events();
    }
 
    events() {  
        this.queOptToggler.click(this.toggleQueOpt.bind(this));
    } 

    toggleQueOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.queOptToggler.toggleClass("reuse-que__footer--details__clk");
        this.queOpt.toggleClass("reuse-que__footer--details__options--visible");
    }
}
    
export default UserOpt;