import $ from 'jquery';

class SiteMainChat {
    constructor() {
        this.shareChats = $(".site-main__nav--chats__headerIcon--firstitems, .site-main__nav--chats__userStatus--item");
        this.chatlogs = $(".chats__logs");
        this.chatlogsClose = $(".chats__logs--mainclose, .site-main__nav--chats__groupList, .site-main__nav--chats__firstChatBox, .site-main__nav--chats__secondChatBox, .site-main__nav--chats__inputWrapper");
        this.viewUser = $(".chats__logs--userOnline__img");
        this.clickUser = $(".chats__logs--userOnline__view--userDetails");
        this.selectGroup = $(".site-main__nav--chats__groupList--item");
        this.selectGroupOption = $(".site-main__nav--chats__groupList--options");
        this.attachFile = $(".site-main__nav--chats__clip");
        this.attachWrapper = $(".site-main__nav--chats__attachWrapper");
        this.toggleInputWrapper = $(".site-main__nav--chats__inputWrapper");
        this.closeallAttach = $(".site-main__nav--chats__input, .site-main__nav--chats__micWrapper, .site-main__nav--chats__smile, .site-main__nav--chats__attachWrapper");
        this.inputMic = $(".site-main__nav--chats__mic");
        this.removeMic = $(".site-main__nav--chats__input, .site-main__nav--chats__smile, .site-main__nav--chats__clip, .site-main__nav--chats--clicklistening");
        this.selectWrapper = $(".chats__logs--userOnline__wrapper, .chats__logs--userOffline__wrapper");
        this.selectUser = $(".chats__logs--selectIcon");
        this.selectUserActive = $(".chats__logs--selectIconActive");
        this.events();
    }

    events() {
        this.shareChats.click(this.toggleShareChat.bind(this));
        this.chatlogsClose.click(this.closeShareChat.bind(this));
        this.viewUser.mouseenter(this.showUser.bind(this));
        this.viewUser.mouseleave(this.removeUser.bind(this));
        this.attachFile.click(this.toggleAttachFile.bind(this));
        this.closeallAttach.click(this.closeAttachFile.bind(this));
        this.inputMic.click(this.toggleMic.bind(this));
        this.removeMic.click(this.removeToggleMic.bind(this));
        this.selectGroup.click(this.toggleSelectGroup.bind(this));
        this.selectWrapper.mouseenter(this.addSelectUser.bind(this));
        this.selectWrapper.mouseleave(this.removeSelectUser.bind(this));
        this.selectWrapper.click(this.toggleClickUser.bind(this));
    }

    toggleShareChat() {
        this.chatlogs.toggleClass("chats__logs--visible");
    }

    closeShareChat() {
        this.chatlogs.removeClass("chats__logs--visible");
    }

    showUser() {
        this.clickUser.addClass("chats__logs--userOnline__view--userDetails__visible");
    }

    removeUser() {
        this.clickUser.removeClass("chats__logs--userOnline__view--userDetails__visible")
    }

    toggleSelectGroup() {
        this.selectGroupOption.toggleClass("site-main__nav--chats__groupList--options__visible");
        this.selectGroup.toggleClass("icon--rotate");
    }

    toggleAttachFile() {
        this.attachWrapper.toggleClass("site-main__nav--chats__attachWrapper--visible");
        this.toggleInputWrapper.toggleClass("site-main__nav--chats__inputWrapper--zindex");
    }

    closeAttachFile() {
        this.attachWrapper.removeClass("site-main__nav--chats__attachWrapper--visible");
        this.toggleInputWrapper.removeClass("site-main__nav--chats__inputWrapper--zindex");
    }

    toggleMic() {
        this.inputMic.toggleClass("site-main__nav--chats__mic--active");
    }

    removeToggleMic() {
        this.inputMic.removeClass("site-main__nav--chats__mic--active");
    }

    addSelectUser() {
        this.selectUser.addClass("chats__logs--selectIcon__visible");
        this.selectWrapper.addClass("chats__logs--userOnline__wrapper--borderhover");
    }

    removeSelectUser() {
        this.selectUser.removeClass("chats__logs--selectIcon__visible");
        this.selectWrapper.removeClass("chats__logs--userOnline__wrapper--borderhover");
    }

    toggleClickUser() {
        this.selectUserActive.toggleClass("chats__logs--selectIconActive__visible");
        this.selectWrapper.toggleClass("chats__logs--userOnline__wrapper--bordervisible");
        this.selectUser.removeClass("chats__logs--selectIcon__visible");
        this.selectWrapper.removeClass("chats__logs--userOnline__wrapper--borderhover");
    }

}

export default SiteMainChat;