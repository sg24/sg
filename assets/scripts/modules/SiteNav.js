import $ from 'jquery';

class SiteNav {
    constructor() {
        this.timedQue = $(".site-main__nav--timedQues__category--title");
        this.timedQueCategory = $(".site-main__nav--timedQues__category--title__item");
        this.timedQueToggleIcon = $(".site-main__nav--timedQues__category--title__toggleIcon");
        this.shareUser = $(".site-main__share");
        this.shareUserOption = $(".site-main__share--content__options");
        this.shareSocialIcons = $(".site-main__share--content__options--socialIcons");
        this.selectUser = $(".site-main__share--content__options--item");
        this.selectUserArrow = $(".userarrowicon");
        this.userList = $(".site-main__share--content__options--details"); 
        this.SelectuserWrapper = $(".site-main__share--content__options--details__user--wrapper");
        this.selectUserCheckIcon = $(".site-main__share--content__options--details__user--selectIcon");
        this.selectUserCheckIconChecked = $(".site-main__share--content__options--details__user--selectIconClicked");
        this.userCounter = $(".site-main__share--content__options--userCounter");
        this.userCounterViewAll = $(".site-main__share--content__options--userCounter__viewall");
        this.userSelected = $(".site-main__share--content__options--userSelected");
        this.userSelectedClosed = $(".site-main__share--content__options--userSelected__mainclose");
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
        this.shareUserOption.toggleClass("site-main__share--content__options--visible");
        this.shareUser.toggleClass("icon--rotate");
    }

    toggleUserList () {
        this.userList.toggleClass("site-main__share--content__options--details__visible");
        this.selectUserArrow.toggleClass("icon--rotate");
        this.shareSocialIcons.toggleClass("site-main__share--content__options--socialIcons__socialIconHide");
        this.userCounter.toggleClass("site-main__share--content__options--userCounter__visible");
        this.userSelected.removeClass("site-main__share--content__options--userSelected__visible");
    }

    addUserSelectIcon() {
        this.selectUserCheckIcon.addClass("site-main__share--content__options--details__user--selectIcon__visible");
        this.SelectuserWrapper.addClass("site-main__share--content__options--details__user--wrapper__borderHoverVisible");
    }

    removeUserSelectIcon() {
        this.selectUserCheckIcon.removeClass("site-main__share--content__options--details__user--selectIcon__visible");
        this.SelectuserWrapper.removeClass("site-main__share--content__options--details__user--wrapper__borderHoverVisible");
    }

    clicktoggleSelectIcon () {
        this.selectUserCheckIconChecked.toggleClass("site-main__share--content__options--details__user--selectIconClicked__visible");
        this.SelectuserWrapper.toggleClass("site-main__share--content__options--details__user--wrapper__borderVisible");
        this.selectUserCheckIcon.removeClass("site-main__share--content__options--details__user--selectIcon__visible");
        this.SelectuserWrapper.removeClass("site-main__share--content__options--details__user--wrapper__borderHoverVisible");
    }

    showSelectedUsers() {
        this.userSelected.toggleClass("site-main__share--content__options--userSelected__visible");
        this.userList.toggleClass("site-main__share--content__options--details__visible");
    }

    closeAllUserSelected() {
        this.userSelected.removeClass("site-main__share--content__options--userSelected__visible");
        this.userList.toggleClass("site-main__share--content__options--details__visible");
    }

}

export default SiteNav;