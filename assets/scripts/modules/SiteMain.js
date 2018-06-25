import $ from 'jquery';

class SiteMain {
    constructor() {
        this.siteBody = $(".site-main__nav");
        this.shareUser = $(".site-main__content--details__header--share");
        this.shareUserOption = $(".site-main__content--details__header--share__options");
        this.shareSocialIcons = $(".site-main__content--details__header--share__options--socialIcons");
        this.selectUser = $(".site-main__content--details__header--share__options--item");
        this.selectUserArrow = $(".userarrowicon");
        this.userList = $(".site-main__content--details__header--share__content"); 
        this.SelectuserWrapper = $(".site-main__content--details__header--share__content--user__wrapper");
        this.selectUserCheckIcon = $(".site-main__content--details__header--share__content--user__selectIcon");
        this.selectUserCheckIconChecked = $(".site-main__content--details__header--share__content--user__selectIconClicked");
        this.contentDetails = $(".site-main__content--details__footer--details");
        this.contentDetailsOptions = $(".site-main__content--details__footer--details__options");
        this.contentItemsOption = $(".site-main__content--details__footer--details__options--item");
        this.contentItemsOptionList = $(".site-main__content--details__footer--details__options--toggle");
        this.userCounter = $(".site-main__content--details__header--share__userCounter");
        this.userCounterViewAll = $(".site-main__content--details__header--share__userCounter__viewall, .site-main__content--details__header--share__userCounter-sm--secondItem");
        this.userSelected = $(".site-main__content--details__header--share__userSelected");
        this.userSelectedClosed = $(".site-main__content--details__header--share__userSelected--mainclose");
        this.userSelectedSmWrapper = $(".site-main__content--details__header--share__userCounter-sm");
        this.events(); 
    }

    events() {
        this.siteBody.click(this.clearAll.bind(this));
        this.shareUser.click(this.toggleShareUserIcon.bind(this));
        this.selectUser.click(this.toggleUserList.bind(this));
        this.SelectuserWrapper.mouseenter(this.addUserSelectIcon.bind(this));
        this.SelectuserWrapper.mouseleave(this.removeUserSelectIcon.bind(this));
        this.SelectuserWrapper.click(this.clicktoggleSelectIcon.bind(this));
        this.contentDetails.click(this.toggleContentDetails.bind(this));
        this.contentItemsOption.click(this.toggleContentItemOption.bind(this));
        this.userCounterViewAll.click(this.showSelectedUsers.bind(this));
        this.userSelectedClosed.click(this.closeAllUserSelected.bind(this));
    }

    clearAll() {
        // this.shareUserOption.removeClass("site-main__content--details__header--share__options--visible");
        // this.contentDetailsOptions.removeClass("site-main__content--details__footer--details__options--visible");
    }

    toggleShareUserIcon() {
        this.shareUserOption.toggleClass("site-main__content--details__header--share__options--visible");
        this.contentDetailsOptions.removeClass("site-main__content--details__footer--details__options--visible");
    }

    toggleUserList () {
        this.userList.toggleClass("site-main__content--details__header--share__content__visible");
        this.selectUserArrow.toggleClass("icon--rotate");
        this.shareSocialIcons.toggleClass("site-main__content--details__header--share__options--socialIcons__socialIconHide");
        this.userCounter.toggleClass("site-main__content--details__header--share__userCounter--visible");
        this.userSelected.removeClass("site-main__content--details__header--share__userSelected--visible");
        this.userSelectedSmWrapper.toggleClass("site-main__content--details__header--share__userCounter-sm--visible")
    }

    addUserSelectIcon() {
        this.selectUserCheckIcon.addClass("site-main__content--details__header--share__content--user__selectIcon--visible");
        this.SelectuserWrapper.addClass("site-main__content--details__header--share__content--user__wrapper--borderHoverVisible");
    }

    removeUserSelectIcon() {
        this.selectUserCheckIcon.removeClass("site-main__content--details__header--share__content--user__selectIcon--visible");
        this.SelectuserWrapper.removeClass("site-main__content--details__header--share__content--user__wrapper--borderHoverVisible");
    }

    clicktoggleSelectIcon () {
        this.selectUserCheckIconChecked.toggleClass("site-main__content--details__header--share__content--user__selectIconClicked--visible");
        this.SelectuserWrapper.toggleClass("site-main__content--details__header--share__content--user__wrapper--borderVisible");
        this.selectUserCheckIcon.removeClass("site-main__content--details__header--share__content--user__selectIcon--visible");
        this.SelectuserWrapper.removeClass("site-main__content--details__header--share__content--user__wrapper--borderHoverVisible");
    }

    toggleContentDetails() {
        this.contentDetailsOptions.toggleClass("site-main__content--details__footer--details__options--visible");
        this.shareUserOption.removeClass("site-main__content--details__header--share__options--visible");
    }

    toggleContentItemOption() {
        this.contentItemsOption.toggleClass("icon--rotate");
        this.contentItemsOptionList.toggleClass("site-main__content--details__footer--details__options--toggle__opened");
    }

    showSelectedUsers() {
        this.userSelected.toggleClass("site-main__content--details__header--share__userSelected--visible");
        this.userList.toggleClass("site-main__content--details__header--share__content__visible");
    }

    closeAllUserSelected() {
        this.userSelected.removeClass("site-main__content--details__header--share__userSelected--visible");
        this.userList.toggleClass("site-main__content--details__header--share__content__visible");
    }

    // showSelectedUsersSm () {
    //     this.userSelected.toggleClass("site-main__content--details__header--share__userSelected--visible");
    //     this.userList.removeClass("site-main__content--details__header--share__content__visible");
    //     this.shareSocialIcons.addClass("site-main__content--details__header--share__options--socialIcons__socialIconHide");
    // }
}

export default SiteMain;