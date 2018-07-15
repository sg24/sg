import $ from 'jquery';

class SiteMainChat {
    constructor() {
        this.shareChats = $(".site-main__chats--headerIcon__firstitems, .site-main__chats--userStatus__item");
        this.chatlogs = $(".chats__logs");
        this.chatlogsClose = $(".chats__logs--mainclose, .site-main__chat--groupList, .site-main__chats--firstChatBox, .site-main__chats--secondChatBox, .site-main__chats--inputWrapper");
        this.viewUser = $(".chats__logs--userOnline__img");
        this.clickUser = $(".chats__logs--userOnline__view--userDetails");
        this.selectGroup = $(".site-main__chats--groupList__item");
        this.selectGroupOption = $(".site-main__chats--groupList__options");
        this.attachFile = $(".site-main__chats--clip__wrapper");
        this.attachWrapper = $(".site-main__chats--attachWrapper");
        this.toggleInputWrapper = $(".site-main__chats--inputWrapper");
        this.closeallAttach = $(".site-main__chats--input, .site-main__chats--micWrapper, .site-main__chats--smile, .site-main__chats--attachWrapper");
        this.inputMic = $(".site-main__chats--mic");
        this.removeMic = $(".site-main__chats--input, .site-main__nav--chats__smile, .site-main__nav--chats__clip, .site-main__chats--clicklistening");
        this.selectWrapper = $(".chats__logs--userOnline__wrapper, .chats__logs--userOffline__wrapper");
        this.selectUser = $(".chats__logs--selectIcon");
        this.selectUserActive = $(".chats__logs--selectIconActive");
        this.searchChatBtn = $(".site-main__chats--headerIcon__search");
        this.inputSearch = $(".site-main__chats--headerIcon__inputitem");
        this.removeInputSearch = $(".site-main__chats--secondChatBox, .site-main__chats--firstChatBox, .site-main__chats--inputWrapper");
        this.toggleHeaderIcon = $(".site-main__chats--headerIcon__items");
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
        this.searchChatBtn.click(this.toggleInputSearch.bind(this)); 
        this.removeInputSearch.click(this.closeInputSearch.bind(this));
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
        this.selectGroupOption.toggleClass("site-main__chats--groupList__options--visible");
        this.selectGroup.toggleClass("icon--rotate");
    }

    toggleAttachFile() {
        this.attachWrapper.toggleClass("site-main__chats--attachWrapper__visible");
        this.toggleInputWrapper.toggleClass("site-main__chats--inputWrapper__zindex");
        this.inputMic.removeClass("site-main__chats--mic__active");
    }

    closeAttachFile() {
        this.attachWrapper.removeClass("site-main__chats--attachWrapper__visible");
        this.toggleInputWrapper.removeClass("site-main__chats--inputWrapper__zindex");
    }

    toggleMic() {
        this.inputMic.toggleClass("site-main__chats--mic__active");
    }

    removeToggleMic() {
        this.inputMic.removeClass("site-main__chats--mic__active");
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

    toggleInputSearch() {
        this.inputSearch.toggleClass("site-main__chats--headerIcon__inputitem--visible");
        this.toggleHeaderIcon.toggleClass("site-main__chats--headerIcon__items--notvisible");
        this.searchChatBtn.toggleClass("site-main__chats--headerIcon__search--notvisible");
    }

    closeInputSearch() {
        this.inputSearch.removeClass("site-main__chats--headerIcon__inputitem--visible");
        this.toggleHeaderIcon.removeClass("site-main__chats--headerIcon__items--notvisible");
    }

}

export default SiteMainChat;