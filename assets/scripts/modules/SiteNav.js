import $ from 'jquery';

class SiteNav {
    constructor() {
        this.timedQue = $(".site-main__nav--timedQues__category--title");
        this.timedQueCategory = $(".site-main__nav--timedQues__category--title__item");
        this.timedQueToggleIcon = $(".site-main__nav--timedQues__category--title__toggleIcon");
        this.shareUser = $(".site-main__nav--quote__header-share");
        this.shareUserOption = $(".site-main__content--details__header--share__options");
        this.events();
    }

    events() {
        this.timedQue.click(this.toggleTimedQueCategory.bind(this));
        this.shareUser.click(this.toggleShareUserIcon.bind(this));
    }

    toggleTimedQueCategory() {
        this.timedQueCategory.toggleClass("site-main__nav--timedQues__category--title__item--visible");
        this.timedQueToggleIcon.toggleClass("icon--rotate");
    }

    toggleShareUserIcon() {
        this.shareUserOption.toggleClass("site-main__content--details__header--share__options--visible");
        this.shareUser.toggleClass("icon--rotate");
    }

}

export default SiteNav;