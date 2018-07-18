import $ from 'jquery';

class SiteMainChat {
    constructor() {
        this.chatOpt = $(".site-main__groupchat--header__options--list");
        this.chatOptToggler = $(".site-main__groupchat--header__options--circle");
        this.searchChat = $(".site-main__groupchat--chatbox__search");
        this.searchChatToggler = $(".site-main__groupchat--header__options--list__search");
        this.removeSearchChat = $(".site-main__groupchat--chatbox__search--close");
        this.switchGroupToggler = $(".site-main__groupchat--header__options--list__switGroup");
        this.switchGroup = $(".site-main__groupchat--header__options--group");
        this.removeSwitchGroup = $(".site-main__groupchat--header__options--group__content--wrapper");
        this.currentChatToggler = $(".site-main__groupchat--header__options--currentclk");
        this.currentChat = $(".site-main__groupchat--header__options--current");
        this.searchUserToggler = $(".site-main__groupchat--header__options--searchuser");
        this.searchUser = $(".site-main__groupchat--header__options--search");
        this.events();
    }

    events() {
        this.chatOptToggler.click(this.toggleChatOpt.bind(this));
        this.searchChatToggler.click(this.toggleSearchChat.bind(this));
        this.removeSearchChat.click(this.closeSearchChat.bind(this));
        this.switchGroupToggler.mouseenter(this.openSwitchGroup.bind(this));
        this.switchGroupToggler.mouseleave(this.closeSwitchGroup.bind(this));
        this.currentChatToggler.mouseenter(this.openCurrentChat.bind(this));
        this.currentChatToggler.mouseleave(this.closeCurrentChat.bind(this));
        this.searchUserToggler.mouseenter(this.openSearchUser.bind(this));
        this.searchUserToggler.mouseleave(this.closeSearchUser.bind(this));
        this.removeSwitchGroup.click(this.closeChatOpt.bind(this));
    }

    toggleChatOpt() {
        this.chatOpt.toggleClass("site-main__groupchat--header__options--list__visible");
    }

    closeChatOpt() {
        this.switchGroup.removeClass("site-main__groupchat--header__options--group__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
    }

    toggleSearchChat() {
        this.searchChat.toggleClass("site-main__groupchat--chatbox__search--visible");
        this.chatOpt.toggleClass("site-main__groupchat--header__options--list__visible");
    }

    closeSearchChat() {
        this.searchChat.removeClass("site-main__groupchat--chatbox__search--visible");
    }

    openSwitchGroup() {
        this.switchGroup.addClass("site-main__groupchat--header__options--group__visible");
    }

    closeSwitchGroup() {
        this.switchGroup.removeClass("site-main__groupchat--header__options--group__visible");
    }

    openCurrentChat() {
        this.currentChat.addClass("site-main__groupchat--header__options--current__visible");
    }

    closeCurrentChat() {
        this.currentChat.removeClass("site-main__groupchat--header__options--current__visible");
    }

    openSearchUser() {
        this.searchUser.addClass("site-main__groupchat--header__options--search__visible");
    }

    closeSearchUser() {
        this.searchUser.removeClass("site-main__groupchat--header__options--search__visible");
    }
}

export default SiteMainChat;