import $ from 'jquery';

class SiteNav {
    constructor() {
        this.timedQue = $(".site-main__nav--timedQues__category--title");
        this.timedQueCategory = $(".site-main__nav--timedQues__category--title__item");
        this.timedQueToggleIcon = $(".site-main__nav--timedQues__category--title__toggleIcon");
        this.shareUser = $(".site-main__nav--quote__header-share");
        this.shareUserOption = $(".site-main__nav--quote__header-share__content--options");
        this.shareSocialIcons = $(".site-main__nav--quote__header-share__content--options__socialIcons");
        this.selectUser = $(".site-main__nav--quote__header-share__content--options--item");
        this.selectUserArrow = $(".userarrowicon");
        this.userList = $(".site-main__nav--quote__header-share__content--options__details"); 
        this.SelectuserWrapper = $(".site-main__nav--quote__header-share__content--options__details--user__wrapper");
        this.selectUserCheckIcon = $(".site-main__nav--quote__header-share__content--options__details--user__selectIcon");
        this.selectUserCheckIconChecked = $(".site-main__nav--quote__header-share__content--options__details--user__selectIconClicked");
        this.userCounter = $(".site-main__nav--quote__header-share__content--options__userCounter");
        this.userCounterViewAll = $(".site-main__nav--quote__header-share__content--options__userCounter--viewall");
        this.userSelected = $(".site-main__nav--quote__header-share__content--options__userSelected");
        this.userSelectedClosed = $(".site-main__nav--quote__header-share__content--options__userSelected--mainclose");
        this.events();
    }

    events() {
        this.timedQue.click(this.toggleTimedQueCategory.bind(this));
        this.shareUser.click(this.toggleShareUserIcon.bind(this));
        this.selectUser.click(this.toggleUserList.bind(this));
        this.SelectuserWrapper.mouseenter(this.addUserSelectIcon.bind(this));
        this.SelectuserWrapper.mouseleave(this.removeUserSelectIcon.bind(this));
        this.SelectuserWrapper.click(this.clicktoggleSelectIcon.bind(this));
        this.userCounterViewAll.click(this.showSelectedUsers.bind(this));
        this.userSelectedClosed.click(this.closeAllUserSelected.bind(this));
    }

    toggleTimedQueCategory() {
        this.timedQueCategory.toggleClass("site-main__nav--timedQues__category--title__item--visible");
        this.timedQueToggleIcon.toggleClass("icon--rotate");
    }

    toggleShareUserIcon() {
        this.shareUserOption.toggleClass("site-main__nav--quote__header-share__content--options__visible");
        this.shareUser.toggleClass("icon--rotate");
    }

    toggleUserList () {
        this.userList.toggleClass("site-main__nav--quote__header-share__content--options__details--visible");
        this.selectUserArrow.toggleClass("icon--rotate");
        this.shareSocialIcons.toggleClass("site-main__nav--quote__header-share__content--options__socialIcons--socialIconHide");
        this.userCounter.toggleClass("site-main__nav--quote__header-share__content--options__userCounter--visible");
        this.userSelected.removeClass("site-main__nav--quote__header-share__content--options__userSelected--visible");
    }

    addUserSelectIcon() {
        this.selectUserCheckIcon.addClass("site-main__nav--quote__header-share__content--options__details--user__selectIcon--visible");
        this.SelectuserWrapper.addClass("site-main__nav--quote__header-share__content--options__details--user__wrapper--borderHoverVisible");
    }

    removeUserSelectIcon() {
        this.selectUserCheckIcon.removeClass("site-main__nav--quote__header-share__content--options__details--user__selectIcon--visible");
        this.SelectuserWrapper.removeClass("site-main__nav--quote__header-share__content--options__details--user__wrapper--borderHoverVisible");
    }

    clicktoggleSelectIcon () {
        this.selectUserCheckIconChecked.toggleClass("site-main__nav--quote__header-share__content--options__details--user__selectIconClicked--visible");
        this.SelectuserWrapper.toggleClass("site-main__nav--quote__header-share__content--options__details--user__wrapper--borderVisible");
        this.selectUserCheckIcon.removeClass("site-main__nav--quote__header-share__content--options__details--user__selectIcon--visible");
        this.SelectuserWrapper.removeClass("site-main__nav--quote__header-share__content--options__details--user__wrapper--borderHoverVisible");
    }

    showSelectedUsers() {
        this.userSelected.toggleClass("site-main__nav--quote__header-share__content--options__userSelected--visible");
        this.userList.toggleClass("site-main__nav--quote__header-share__content--options__details--visible");
    }

    closeAllUserSelected() {
        this.userSelected.removeClass("site-main__nav--quote__header-share__content--options__userSelected--visible");
        this.userList.toggleClass("site-main__nav--quote__header-share__content--options__details--visible");
    }

}

export default SiteNav;