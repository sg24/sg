import $ from 'jquery';

class Chat {
    constructor() {
        this.pvtChatToggler = $(".site-main__pvtchat--main__header--search");
        this.pvtChat = $(".site-main__pvtchat--main__search");
        this.closePvtChat = $(".site-main__pvtchat--main__msg, .site-main__pvtchat--main__chatdate");
        this.chatDetToggler = $(".site-main__pvtchat--main__msg--footer__content");
        this.chatDet = $(".site-main__pvtchat--main__msg--footer__content--details");
        this.chatOptToggler = $(".site-main__pvtchat--main__options--searchuser__chat--img");
        this.chatOpt = $(".site-main__pvtchat--main__options--searchuser__chat--img__userdetails");
        this.srchUserToggler = $(".site-main__pvtchat--main__options--create");
        this.srchUser = $(".site-main__pvtchat--main__options--searchuser");
        this.recTooltipToggler = $(".site-main__pvtchat--main__msg--header__secondwrapper--recieve");
        this.recTooltip  = $(".tool-tip__recieve");
        this.sentTooltipToggler = $(".site-main__pvtchat--main__msg--header__secondwrapper--sent");
        this.sentTooltip  = $(".tool-tip__sent");
        this.events();
    }

    events() {
        this.pvtChatToggler.click(this.togglePvtChat.bind(this));
        this.closePvtChat.click(this.removePvtChat.bind(this));
        this.chatDetToggler.click(this.toggleChatDet.bind(this));
        this.chatOptToggler.mouseenter(this.addChatOpt.bind(this));
        this.chatOptToggler.mouseleave(this.removeChatOpt.bind(this));
        this.srchUserToggler.click(this.toggleSrchUser.bind(this));
        this.recTooltipToggler.mouseenter(this.addRecTooltip.bind(this));
        this.recTooltipToggler.mouseleave(this.removeRecTooltip.bind(this));
        this.sentTooltipToggler.mouseenter(this.addSentTooltip.bind(this));
        this.sentTooltipToggler.mouseleave(this.removeSentTooltip.bind(this));
    }

    togglePvtChat() {
        this.pvtChat.toggleClass("site-main__pvtchat--main__search--visible");
    }

    removePvtChat() {
        this.pvtChat.removeClass("site-main__pvtchat--main__search--visible");
    }

    toggleChatDet() {
        this.chatDet.toggleClass("site-main__pvtchat--main__msg--footer__content--details__visible");
    }

    addChatOpt() {
        this.chatOpt.addClass("site-main__pvtchat--main__options--searchuser__chat--img__userdetails--visible");
    }

    removeChatOpt() {
        this.chatOpt.removeClass("site-main__pvtchat--main__options--searchuser__chat--img__userdetails--visible");
    }

    toggleSrchUser() {
        this.srchUser.toggleClass("site-main__pvtchat--main__options--searchuser__visible");
    }

    addRecTooltip() {
        this.recTooltip.addClass("tool-tip__recieve--visible");
    }

    removeRecTooltip() {
        this.recTooltip.removeClass("tool-tip__recieve--visible");
    }

    addSentTooltip() {
        this.sentTooltip.addClass("tool-tip__sent--visible");
    }

    removeSentTooltip() {
        this.sentTooltip.removeClass("tool-tip__sent--visible");
    }
}

export default Chat;