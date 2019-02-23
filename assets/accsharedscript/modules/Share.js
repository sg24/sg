import $ from "jquery";

class Share {
    constructor() {
        this.shareToggler = $(".reuse-share__icn");
        this.sharedInfo = $(".site-main__acc-srd--info__cnt");
        this.events();
    }
  
    events() {
        this.shareToggler.click(this.share.bind(this));
    }

    share() {
        this.sharedInfo.removeClass("site-main__acc-srd--info__cnt--visible");
    }

}

export default Share;