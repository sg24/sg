import $ from 'jquery';

class UserOpt {
    constructor() {
        this.ptOptToggler = $(".reuse-pt__footer--details");
        this.ptOpt = $(".reuse-pt__footer--details__options");
        this.shareToggler = $(".reuse-share__icn");
        this.share = $(".reuse-share__wrapper");
        this.events();
    }
 
    events() { 
        this.ptOptToggler.click(this.togglePtOpt.bind(this));
    } 

    togglePtOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.ptOptToggler.toggleClass("reuse-pt__footer--details__clk");
        this.ptOpt.toggleClass("reuse-pt__footer--details__options--visible");
    }
}
    
export default UserOpt;