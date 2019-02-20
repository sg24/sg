import $ from 'jquery';

class UserOpt {
    constructor() {
        this.pwtToggler = $(".reuse-pwt__content--det__user--det");
        this.pwtOpt = $(".reuse-pwt__content--det__user--det__opt");
        this.shareToggler = $(".reuse-share__icn");
        this.share = $(".reuse-share__wrapper");
        this.events();
    }
  
    events() { 
        this.pwtToggler.click(this.togglePwtOpt.bind(this));
    } 

    togglePwtOpt() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
        this.pwtOpt.toggleClass("reuse-pwt__content--det__user--det__opt--visible");
    }
}
    
export default UserOpt;