import $ from 'jquery';

class NavChat {
    constructor() {
        this.shareChats = $(".nav__chats--headerIcon__firstitems, .nav__chats--userStatus__item");
        this.chatlogs = $(".chats__logs");
        this.chatlogsClose = $(".chats__logs--mainclose, .nav__chats--groupList, .site-main__nav--chats__firstChatBox, .site-main__nav--chats__secondChatBox, .site-main__nav--chats__inputWrapper");
        this.viewUser = $(".chats__logs--userOnline__img");
        this.clickUser = $(".chats__logs--userOnline__view--userDetails");
        this.selectGroup = $(".nav__chats--groupList__item");
        this.selectGroupOption = $(".nav__chats--groupList__options");
        this.attachFile = $(".nav__chats--clip__wrapper");
        this.attachWrapper = $(".nav__chats--attachWrapper");
        this.toggleInputWrapper = $(".nav__chats--inputWrapper");
        this.closeallAttach = $(".nav__chats--input, .nav__chats--micWrapper, .nav__chats--smile, .nav__chats--attachWrapper");
        this.inputMic = $(".nav__chats--mic");
        this.removeMic = $(".nav__chats--input, .nav__chats--smile, .nav__chats--clip, .nav__chats--clicklistening");
        this.selectWrapper = $(".chats__logs--userOnline__wrapper, .chats__logs--userOffline__wrapper");
        this.selectUser = $(".chats__logs--selectIcon");
        this.selectUserActive = $(".chats__logs--selectIconActive");
        this.searchChatBtn = $(".nav__chats--headerIcon__search");
        this.inputSearch = $(".nav__chats--headerIcon__inputitem");
        this.removeInputSearch = $(".nav__chats--secondChatBox,.nav__chats--firstChatBox, .nav__chats--inputWrapper");
        this.toggleHeaderIcon = $(".nav__chats--headerIcon__items");
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
        this.selectGroupOption.toggleClass("nav__chats--groupList__options--visible");
        this.selectGroup.toggleClass("icon--rotate");
    }

    toggleAttachFile() {
        this.attachWrapper.toggleClass("nav__chats--attachWrapper__visible");
        this.toggleInputWrapper.toggleClass("nav__chats--inputWrapper__zindex");
    }

    closeAttachFile() {
        this.attachWrapper.removeClass("nav__chats--attachWrapper__visible");
        this.toggleInputWrapper.removeClass("nav__chats--inputWrapper__zindex");
    }

    toggleMic() {
        this.inputMic.toggleClass("nav__chats--mic__active");
    }

    removeToggleMic() {
        this.inputMic.removeClass("nav__chats--mic__active");
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
        this.inputSearch.toggleClass("nav__chats--headerIcon__inputitem--visible");
        this.toggleHeaderIcon.toggleClass("nav__chats--headerIcon__items--notvisible");
        this.searchChatBtn.toggleClass("nav__chats--headerIcon__search--notvisible");
    }

    closeInputSearch() {
        this.inputSearch.removeClass("nav__chats--headerIcon__inputitem--visible");
        this.toggleHeaderIcon.removeClass("nav__chats--headerIcon__items--notvisible");
    }

}

export default NavChat;