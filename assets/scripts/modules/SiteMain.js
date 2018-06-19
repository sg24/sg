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
        this.userCounterViewAll = $(".site-main__content--details__header--share__userCounter__viewall");
        this.userSelected = $(".site-main__content--details__header--share__userSelected");
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
        this.userCounterViewAll.click(this.toggleAllUsers.bind(this));
    }

    clearAll() {
        this.userList.removeClass("site-main__content--details__header--share__content__visible");
        this.selectUserArrow.removeClass("icon--rotate");
        this.shareSocialIcons.removeClass("site-main__content--details__header--share__options--socialIcons__socialIconHide"); 
        this.shareUserOption.removeClass("site-main__content--details__header--share__options--visible");
        this.selectUserCheckIcon.removeClass("site-main__content--details__header--share__content--user__selectIcon--visible");
        this.SelectuserWrapper.removeClass("site-main__content--details__header--share__content--user__wrapper--borderHoverVisible");
        this.selectUserCheckIconChecked.removeClass("site-main__content--details__header--share__content--user__selectIconClicked--visible");
        this.SelectuserWrapper.removeClass("site-main__content--details__header--share__content--user__wrapper--borderVisible");
    }

    toggleShareUserIcon() {
        this.shareUserOption.toggleClass("site-main__content--details__header--share__options--visible");
    }

    toggleUserList () {
        this.userList.toggleClass("site-main__content--details__header--share__content__visible");
        this.selectUserArrow.toggleClass("icon--rotate");
        this.shareSocialIcons.toggleClass("site-main__content--details__header--share__options--socialIcons__socialIconHide");
        this.userCounter.toggleClass("site-main__content--details__header--share__userCounter--visible");
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
    }

    toggleContentItemOption() {
        this.contentItemsOption.toggleClass("icon--rotate");
        this.contentItemsOptionList.toggleClass("site-main__content--details__footer--details__options--toggle__opened");
    }

    toggleAllUsers() {
        this.userSelected.toggleClass("site-main__content--details__header--share__userSelected--visible");
    }
}

export default SiteMain;