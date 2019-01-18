import $ from 'jquery';

class UserOpt {
    constructor() {
        this.onqueOptToggler = $(".reuse-onlineque__content--posted__user--det");
        this.onqueOpt = $(".reuse-onlineque__content--posted__user--det__opt");
        this.shareToggler = $(".reuse-share__icn");
        this.share = $(".reuse-share__wrapper");
        this.events();
    }
 
    events() { 
        this.onqueOptToggler.click(this.toggleOnqueOpt.bind(this));
    } 

    toggleOnqueOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.onqueOpt.toggleClass("reuse-onlineque__content--posted__user--det__opt--visible");
    }

}
    
export default UserOpt;