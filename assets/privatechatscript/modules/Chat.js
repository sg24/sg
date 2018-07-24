import $ from 'jquery';

class Chat {
    constructor() {
        this.pvtChatToggler = $(".site-main__pvtchat--main__header--search");
        this.pvtChat = $(".site-main__pvtchat--main__search");
        this.closePvtChat = $(".site-main__pvtchat--main__msg, .site-main__pvtchat--main__chatdate");
        this.chatDetToggler = $(".site-main__pvtchat--main__msg--footer__content");
        this.chatDet = $(".site-main__pvtchat--main__msg--footer__content--details");
        this.events();
    }

    events() {
        this.pvtChatToggler.click(this.togglePvtChat.bind(this));
        this.closePvtChat.click(this.removePvtChat.bind(this));
        this.chatDetToggler.click(this.toggleChatDet.bind(this));
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
}

export default Chat;