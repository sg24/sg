import $ from 'jquery';

class SiteMainOnlineQue {
    constructor() {
        this.selectQue = $(".site-main__nav--onlineQue__filter--category__option");
        this.selectQueToggle = $(".site-main__nav--onlineQue__filter--category__option--item");
        this.queTime = $(".site-main__nav--onlineQue__filter--category__duration--icon");
        this.queTimeToggle = $(".site-main__nav--onlineQue__filter--category__duration--timeframe__option");
        this.events();
    }

    events() {
        this.selectQue.click(this.toggleSelectQue.bind(this));
        this.queTime.click(this.toggleQueTime.bind(this));
    }

    toggleSelectQue() {
        this.selectQueToggle.toggleClass("site-main__nav--onlineQue__filter--category__option--item__visible");
        this.selectQue.toggleClass("icon--rotate");
    }

    toggleQueTime() {
        this.queTimeToggle.toggleClass("site-main__nav--onlineQue__filter--category__duration--timeframe__option--visible");
    }

}

export default SiteMainOnlineQue;