import $ from 'jquery';

class ShareChat {
    constructor() {
        this.shareChatToggler = $(".chats__logs--user__wrapper");
        this.shareChat = $(".chats__logs--selectIcon");
        this.events(); 
    }

    events() {
        this.shareChatToggler.mouseenter(this.openShareChat.bind(this));
        this.shareChatToggler.mouseleave(this.closeShareChat.bind(this));
        this.shareChatToggler.click(this.toggleShareChat.bind(this));
    }

    openShareChat() {
        this.shareChat.addClass("chats__logs--selectIcon__visible");
        this.shareChatToggler.addClass("chats__logs--user__wrapper--borderhover");
    }

    closeShareChat() {
        this.shareChat.removeClass("chats__logs--selectIcon__visible");
        this.shareChatToggler.removeClass("chats__logs--user__wrapper--borderhover");
    }

    toggleShareChat() {
        this.shareChatToggler.toggleClass("chats__logs--user__wrapper--bgactive");
        this.shareChat.toggleClass("chats__logs--selectIconActive__visible");
        this.shareChat.removeClass("chats__logs--selectIcon__visible");
        this.shareChatToggler.removeClass("chats__logs--user__wrapper--borderhover");
    }
}

export default ShareChat;