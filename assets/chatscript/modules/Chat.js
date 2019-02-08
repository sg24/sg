import $ from 'jquery';
 
class Chat { 
    constructor() { 
        this.userOptToggler = $(".site-main__chat--header__user-opt");
        this.userOpt = $(".site-main__chat--header__user-opt--list");
        this.srchToggler = $(".site-main__chat--header__user-opt--list__srch");
        this.srchClose = $(".site-main__chat--srch__close");
        this.srch = $(".site-main__chat--srch");
        this.grpToggler = $(".site-main__chat--header__user-opt--list__grp");
        this.grpClose = $(".site-main__chat--grp__close");
        this.grp = $(".site-main__chat--grp");
        this.curChatToggler = $(".site-main__chat--header__user-opt--list__chat");
        this.curChat = $(".site-main__chat--cur-chat");
        this.curChatClose = $(".site-main__chat--cur-chat__close");
        this.srchUserToggler = $(".site-main__chat--header__user-opt--list__srch-user");
        this.srchUserClose = $(".site-main__chat--srch-user__close");
        this.srchUser = $(".site-main__chat--srch-user");
        this.grpDetToggler = $(".site-main__chat--header__user-opt--list__grp-det, .site-main__chat--header__det--cnt__lg");
        this.grpDetClose = $(".site-main__chat--grp-det__close");
        this.grpDet = $(".site-main__chat--grp-det");
        this.userPrfToggler = $(".site-main__chat--header__det--cnt__prf, .site-main__chat--header__user-opt--list__prf");
        this.userPrfClose = $(".site-main__chat--user-prf__close");
        this.userPrf = $(".site-main__chat--user-prf");
        this.clipItmToggler = $(".site-main__chat--footer__input--clip, .site-main__chat--footer__clip");
        this.clipItm = $(".site-main__chat--footer__clip-itm");
        this.overlay = $(".site-main__chat--overlay");
        this.events();
    }

    events() {
        this.userOptToggler.click(this.toggleUserOpt.bind(this));
        this.srchToggler.click(this.openSrch.bind(this));
        this.srchClose.click(this.closeSrch.bind(this));
        this.grpToggler.click(this.openGrp.bind(this));
        this.grpClose.click(this.closeGrp.bind(this));
        this.curChatToggler.click(this.openCurChat.bind(this));
        this.curChatClose.click(this.closeCurChat.bind(this));
        this.srchUserToggler.click(this.openSrchUser.bind(this));
        this.srchUserClose.click(this.closeSrchUser.bind(this));
        this.grpDetToggler.click(this.openGrpDet.bind(this));
        this.grpDetClose.click(this.closeGrpDet.bind(this));
        this.userPrfToggler.click(this.openUserPrf.bind(this));
        this.userPrfClose.click(this.closeUserPrf.bind(this)); 
        this.clipItmToggler.click(this.openClipItm.bind(this));
        this.overlay.click(this.closeAll.bind(this)); 
    }

    toggleUserOpt() {
        this.userOpt.toggleClass("site-main__chat--header__user-opt--list__visible");
        this.overlay.toggleClass("site-main__chat--overlay__visible");
    }

    openSrch() {
        this.srch.addClass("site-main__chat--srch__visible");
    }

    closeSrch() {
        this.srch.removeClass("site-main__chat--srch__visible");
    }

    openGrp() {
        this.grp.addClass("site-main__chat--grp__visible");
    }

    closeGrp() {
        this.grp.removeClass("site-main__chat--grp__visible");
    }

    openCurChat() {
        this.curChat.addClass("site-main__chat--cur-chat__visible");
    }

    closeCurChat() {
        this.curChat.removeClass("site-main__chat--cur-chat__visible");
    }

    openSrchUser() {
        this.srchUser.addClass("site-main__chat--srch-user__visible");
    }

    closeSrchUser() {
        this.srchUser.removeClass("site-main__chat--srch-user__visible");
    }

    openGrpDet() {
        this.grpDet.addClass("site-main__chat--grp-det__visible");
    }

    closeGrpDet() {
        this.grpDet.removeClass("site-main__chat--grp-det__visible");
    }

    openUserPrf() {
        this.userPrf.addClass("site-main__chat--user-prf__visible");
    }

    closeUserPrf() {
        this.userPrf.removeClass("site-main__chat--user-prf__visible");
    }

    openClipItm() {
        this.clipItm.addClass("site-main__chat--footer__clip-itm--visible");
        this.overlay.addClass("site-main__chat--overlay__visible");
    }

    closeAll() {
        this.userOpt.removeClass("site-main__chat--header__user-opt--list__visible");
        this.overlay.removeClass("site-main__chat--overlay__visible");
        this.clipItm.removeClass("site-main__chat--footer__clip-itm--visible");
    }
}

export default Chat;