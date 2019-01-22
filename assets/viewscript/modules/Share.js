import $ from "jquery";

class Share {
    constructor() {
        this.shareToggler = $(".reuse-share__icn");
        this.share = $(".reuse-share__wrapper");
        this.userToggler = $(".reuse-share__title");
        this.userTogglerIcn = $(".reuse-share__title--icn");
        this.user = $(".reuse-share__content");
        this.userWrap = $(".reuse-share__content--user__wrapper");
        this.userWrapHIcn = $(".reuse-share__content--user__hov-icn");
        this.userWrapClk = $(".reuse-share__content--user__clk-icn");
        this.userAnsToggler = $(".reuse-share__content--user__ans");
        this.userSntsToggler = $(".reuse-share__content--user__snts");
        this.userAns = $(".reuse-share__content--user__tooltip--ans");
        this.userSnts = $(".reuse-share__content--user__tooltip--snts");
        this.viewUserToggler = $(".reuse-share__user-counter--viewall");
        this.viewUserClose = $(".reuse-share__user-selected--mainclose");
        this.viewUser = $(".reuse-share__user-selected");
        this.userCount = $(".reuse-share__user-counter");
        this.closeShare = $(".exfav__sort, .exfav__filter");
        this.queOptToggler = $(".reuse-que__footer--details");
        this.queOpt = $(".reuse-que__footer--details__options");
        this.ptOptToggler = $(".reuse-pt__footer--details");
        this.ptOpt = $(".reuse-pt__footer--details__options");
        this.onqueOpt = $(".reuse-onlineque__content--posted__user--det__opt");
        this.pwtOpt = $(".reuse-pwt__content--det__user--det__opt");
        this.events();
    }
  
    events() {
        this.shareToggler.click(this.toggleShare.bind(this));
        this.userToggler.click(this.toggleUser.bind(this));
        this.userWrap.mouseenter(this.userWrapHov.bind(this));
        this.userWrap.mouseleave(this.userWrapNHov.bind(this));
        this.userWrap.click(this.userWrapSelec.bind(this));
        this.userAnsToggler.mouseenter(this.tipUserAns.bind(this));
        this.userAnsToggler.mouseleave(this.hidTipUserAns.bind(this));
        this.userSntsToggler.mouseenter(this.tipUserSnts.bind(this));
        this.userSntsToggler.mouseleave(this.hidTipUserSnts.bind(this));
        this.viewUserToggler.click(this.toggleViewUser.bind(this));
        this.viewUserClose.click(this.closeViewUser.bind(this));
        this.closeShare.click(this.closeAll.bind(this));
    }

    toggleShare() {
        this.share.toggleClass("reuse-share__wrapper--visible");
        this.shareToggler.toggleClass("reuse-share__icn--rotate");
        this.queOpt.removeClass("reuse-que__footer--details__options--visible");
        this.queOptToggler.removeClass("reuse-que__footer--details__clk");
        this.ptOptToggler.removeClass("reuse-pt__footer--details__clk");
        this.ptOpt.removeClass("reuse-pt__footer--details__options--visible");
        this.onqueOpt.removeClass("reuse-onlineque__content--posted__user--det__opt--visible");
        this.pwtOpt.removeClass("reuse-pwt__content--det__user--det__opt--visible");
    }

    toggleUser() {
        this.userTogglerIcn.toggleClass("icon--rotate"); 
        this.user.toggleClass("reuse-share__content--visible");
        this.viewUser.removeClass("reuse-share__user-selected--visible");
        this.userCount.removeClass("reuse-share__user-counter--visible"); 
    }

    userWrapHov() {
        this.userWrap.addClass("reuse-share__content--user__wrapper--border-hov");
        this.userWrapHIcn.addClass("reuse-share__content--user__hov-icn--visible")
    }

    userWrapNHov() {
        this.userWrap.removeClass("reuse-share__content--user__wrapper--border-hov");
        this.userWrapHIcn.removeClass("reuse-share__content--user__hov-icn--visible")
    }

    userWrapSelec() {
        this.userWrap.toggleClass("reuse-share__content--user__wrapper--selec");
        this.userWrapClk.toggleClass("reuse-share__content--user__clk-icn--visible");
        this.userWrap.removeClass("reuse-share__content--user__wrapper--border-hov");
        this.userWrapHIcn.removeClass("reuse-share__content--user__hov-icn--visible")
    }

    tipUserAns() {
        this.userAns.addClass("reuse-share__content--user__tooltip--ans__visible");
    }

    hidTipUserAns() {
        this.userAns.removeClass("reuse-share__content--user__tooltip--ans__visible");
    }

    tipUserSnts() {
        this.userSnts.addClass("reuse-share__content--user__tooltip--snts__visible");
    }

    hidTipUserSnts() {
        this.userSnts.removeClass("reuse-share__content--user__tooltip--snts__visible");
    }

    toggleViewUser() {
        this.viewUser.toggleClass("reuse-share__user-selected--visible");
    }

    closeViewUser() {
        this.viewUser.removeClass("reuse-share__user-selected--visible");
    }

    closeAll() {
        this.share.removeClass("reuse-share__wrapper--visible");
        this.shareToggler.removeClass("reuse-share__icn--rotate");
    }
}

export default Share;