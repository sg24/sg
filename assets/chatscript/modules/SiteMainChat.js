import $ from 'jquery';
 
class SiteMainChat { 
    constructor() {
        this.chatOpt = $(".site-main__groupchat--header__options--list");
        this.chatOptToggler = $(".site-main__groupchat--header__options--circle");
        this.searchChat = $(".site-main__groupchat--search");
        this.searchChatToggler = $(".site-main__groupchat--header__options--list__search");
        this.removeSearchChat = $(".site-main__groupchat--search__close, .site-main__groupchat--chatbox, .site-main__groupchat--footer");
        this.switchGroupToggler = $(".site-main__groupchat--header__options--list__switGroup");
        this.switchGroup = $(".site-main__groupchat--switchgroup");
        this.closeSwitchGroup = $(".site-main__groupchat--chatbox, .site-main__groupchat--footer");
        this.removeSwitchGroup = $(".site-main__groupchat--header__options--group__content--wrapper");
        this.currentChatToggler = $(".site-main__groupchat--header__options--currentclk");
        this.currentChat = $(".site-main__groupchat--currentchat");
        this.closeCurrentChat = $(".site-main__groupchat--chatbox, .site-main__groupchat--footer");
        this.searchUserToggler = $(".site-main__groupchat--header__options--searchuser");
        this.searchUser = $(".site-main__groupchat--searchuser");
        this.closeSearchUser = $(".site-main__groupchat--chatbox, .site-main__groupchat--footer");
        this.userDetailsToggler = $(".chats__logs--user__view--userdetails__user");
        this.userDetails = $(".site-main__userdetails");
        this.closeUserDetails = $(".site-main__userdetails--header__cancelopt, .site-main__groupchat--mainwrapper, .site-main__userdetails--header__canceloptsm");
        this.switchUserDetails = $(".site-main__userdetails--header__backopt");
        this.attachToggler = $(".site-main__groupchat--footer__input--mouseout, .site-main__groupchat--footer__clip");
        this.attach = $(".site-main__groupchat--attachWrapper");
        this.switchIconToggler = $(".site-main__groupchat--footer__input--field");
        this.switchClipIcon = $(".site-main__groupchat--footer__input--mouseout");
        this.switchSendIcon = $(".site-main__groupchat--footer__input--mousein");
        this.switchCamera = $(".site-main__groupchat--footer__camera");
        this.switchClip = $(".site-main__groupchat--footer__clip");
        this.sendChatToggler = $(".site-main__groupchat--chatbox__firstchat--content, .site-main__groupchat--chatbox__secondchat--content");
        this.sendChat = $(".site-main__groupchat--options");
        this.userOptToggler = $(".chats__logs--user__img");
        this.userOpt = $(".chats__logs--user__view--userdetails");
        this.chatdetToggler = $(".site-main__groupchat--header__details--seconddetails__sh-more-lg, .site-main__groupchat--header__options--grupdetails");
        this.chatdetails = $(".site-main__groupchat--detail");
        this.closeChatDet = $(".site-main__groupchat--chatbox, .site-main__groupchat--footer");
        this.chatRoomToggler = $(".site-main__groupchat--header__details--seconddetails__sh-more-sm");
        this.chatRoom = $(".chats__logs");
        this.closeChatRoom = $(".chats__logs--mainclose, .site-main__groupchat--detail, .site-main__groupchat--chatbox, .site-main__groupchat--footer");
        this.curruserOptToggler = $(".site-main__groupchat--currentchat__chat--img");
        this.curruserOpt = $(".site-main__groupchat--currentchat__chat--img__userdetails");
        this.srchuserOptToggler = $(".site-main__groupchat--searchuser__chat--img");
        this.srchuserOpt = $(".site-main__groupchat--searchuser__chat--img__userdetails");
        this.events();
    }

    events() {
        this.chatOptToggler.click(this.toggleChatOpt.bind(this));
        this.searchChatToggler.click(this.toggleSearchChat.bind(this));
        this.removeSearchChat.click(this.closeSearchChat.bind(this));
        this.switchGroupToggler.click(this.toggleSwitchGroup.bind(this));
        this.closeSwitchGroup.click(this.switchGroupRemove.bind(this));
        this.currentChatToggler.click(this.toggleCurrentChat.bind(this));
        this.closeCurrentChat.click(this.removeCurrentChat.bind(this));
        this.searchUserToggler.click(this.toggleSearchUser.bind(this));
        this.closeSearchUser.click(this.removeSearchUser.bind(this));
        this.removeSwitchGroup.click(this.closeChatOpt.bind(this));
        this.userDetailsToggler.click(this.toggleUserDetails.bind(this));
        this.closeUserDetails.click(this.removeUserDetails.bind(this));
        this.attachToggler.click(this.toggleAttach.bind(this));
        this.attach.click(this.removeAttach.bind(this));
        this.switchIconToggler.keypress(this.addSwitchIcon.bind(this));
        this.sendChatToggler.click(this.toggleSendChat.bind(this));
        this.userOptToggler.mouseenter(this.addUserOpt.bind(this));
        this.userOptToggler.mouseleave(this.removeUserOpt.bind(this));
        this.chatdetToggler.click(this.toggleChatDet.bind(this));
        this.closeChatDet.click(this.removeChatDet.bind(this));
        this.chatRoomToggler.click(this.toggleChatRoom.bind(this));
        this.closeChatRoom.click(this.removeChatRoom.bind(this));
        this.switchUserDetails.click(this.UserDetailSwitch.bind(this));
        this.curruserOptToggler.mouseenter(this.showCurrUserOpt.bind(this));
        this.curruserOptToggler.mouseleave(this.removeCurrUserOpt.bind(this));
        this.srchuserOptToggler.mouseenter(this.showSrchUserOpt.bind(this));
        this.srchuserOptToggler.mouseleave(this.removeSrchUserOpt.bind(this));
    }

    toggleChatOpt() {
        this.chatOpt.toggleClass("site-main__groupchat--header__options--list__visible");
        this.userDetails.removeClass("site-main__userdetails--visible");
        this.sendChat.removeClass("site-main__groupchat--options__visible");
        this.chatdetails.removeClass("site-main__groupchat--detail__visible");
    }

    closeChatOpt() {
        this.switchGroup.removeClass("site-main__groupchat--header__options--group__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
    }

    toggleSearchChat() {
        this.searchChat.toggleClass("site-main__groupchat--search__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
        this.currentChat.removeClass("site-main__groupchat--currentchat__visible");
        this.searchUser.removeClass("site-main__groupchat--searchuser__visible");
    }

    closeSearchChat() {
        this.searchChat.removeClass("site-main__groupchat--search__visible");
    }

    toggleSwitchGroup() {
        this.switchGroup.toggleClass("site-main__groupchat--switchgroup__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.currentChat.removeClass("site-main__groupchat--currentchat__visible");
        this.searchUser.removeClass("site-main__groupchat--searchuser__visible");
        this.searchChat.removeClass("site-main__groupchat--search__visible");
    }

    switchGroupRemove() {
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
    }

    toggleCurrentChat() {
        this.currentChat.toggleClass("site-main__groupchat--currentchat__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
        this.searchUser.removeClass("site-main__groupchat--searchuser__visible");
        this.searchChat.removeClass("site-main__groupchat--search__visible");
    }

    removeCurrentChat() {
        this.currentChat.removeClass("site-main__groupchat--currentchat__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
        this.searchUser.removeClass("site-main__groupchat--searchuser__visible");
    }

    toggleSearchUser() {
        this.searchUser.toggleClass("site-main__groupchat--searchuser__visible");
        this.currentChat.removeClass("site-main__groupchat--currentchat__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
        this.searchChat.removeClass("site-main__groupchat--search__visible");
    }

    removeSearchUser() {
        this.searchUser.removeClass("site-main__groupchat--searchuser__visible");
        this.currentChat.removeClass("site-main__groupchat--currentchat__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
    }

    toggleUserDetails() {
        this.userDetails.addClass("site-main__userdetails--visible");
        this.switchGroup.removeClass("site-main__groupchat--header__options--group__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.chatRoom.removeClass("chats__logs--visible");
    }

    removeUserDetails() {
        this.userDetails.removeClass("site-main__userdetails--visible");
    }

    UserDetailSwitch() {
        this.chatRoom.addClass("chats__logs--visible");
        this.userDetails.removeClass("site-main__userdetails--visible");
    }

    toggleAttach() {
        this.attach.addClass("site-main__groupchat--attachWrapper__visible")
    }

    removeAttach() {
        this.attach.removeClass("site-main__groupchat--attachWrapper__visible");
    }

    addSwitchIcon() {
        this.switchClipIcon.addClass("site-main__groupchat--footer__input--mouseout__hidden");
        this.switchSendIcon.addClass("site-main__groupchat--footer__input--mousein__visible");
        this.switchCamera.addClass("site-main__groupchat--footer__camera--hidden");
        this.switchClip.addClass("site-main__groupchat--footer__clip--visible");
    }

    toggleSendChat() {
        this.sendChat.toggleClass("site-main__groupchat--options__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
    }

    addUserOpt() {
        this.userOpt.addClass("chats__logs--user__view--userdetails__visible");
    }

    removeUserOpt() {
        this.userOpt.removeClass("chats__logs--user__view--userdetails__visible");
    }

    toggleChatDet() {
        this.chatdetails.toggleClass("site-main__groupchat--detail__visible");
        this.searchUser.removeClass("site-main__groupchat--searchuser__visible");
        this.currentChat.removeClass("site-main__groupchat--currentchat__visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
        this.switchGroup.removeClass("site-main__groupchat--switchgroup__visible");
        this.searchChat.removeClass("site-main__groupchat--search__visible");
    }

    removeChatDet() {
        this.chatdetails.removeClass("site-main__groupchat--detail__visible");
    }

    toggleChatRoom() {
        this.chatRoom.toggleClass("chats__logs--visible");
        this.userDetails.removeClass("site-main__userdetails--visible");
        this.chatOpt.removeClass("site-main__groupchat--header__options--list__visible");
    }

    removeChatRoom() {
        this.chatRoom.removeClass("chats__logs--visible");
    }

    showCurrUserOpt() {
        this.curruserOpt.addClass("site-main__groupchat--currentchat__chat--img__userdetails--visible");
    }

    removeCurrUserOpt() {
        this.curruserOpt.removeClass("site-main__groupchat--currentchat__chat--img__userdetails--visible");
    }

    showSrchUserOpt() {
        this.srchuserOpt.addClass("site-main__groupchat--searchuser__chat--img__userdetails--visible");
    }

    removeSrchUserOpt() {
        this.srchuserOpt.removeClass("site-main__groupchat--searchuser__chat--img__userdetails--visible");
    }
}

export default SiteMainChat;