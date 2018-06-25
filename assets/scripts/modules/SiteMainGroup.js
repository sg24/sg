import $ from 'jquery';

class SiteMainGroup {
    constructor() {
        this.groupDetails = $(".site-main__group--mainContent__desc--options__firstItem");
        this.detailsOverlay = $(".site-main__group--mainContent__overlay");
        this.closeOverlay = $(".site-main__group--mainContent__overlay--close");
        this.filterCategory = $(".site-main__group--filter__category");
        this.filterCategoryOption = $(".site-main__group--filter__category--option");
        this.filterToggleIcon = $(".site-main__group--filter__category--header__toggleIcon");
        this.events();
    }

    events() {
        this.groupDetails.click(this.showGroupDetails.bind(this));
        this.closeOverlay.click(this.closeGroupDetails.bind(this));
        this.filterCategory.click(this.toggleCategoryOption.bind(this));
    }

    showGroupDetails() {
        this.detailsOverlay.toggleClass("site-main__group--mainContent__overlay--visible");
    }

    closeGroupDetails() {
        this.detailsOverlay.removeClass("site-main__group--mainContent__overlay--visible");
    }

    toggleCategoryOption() {
        this.filterCategoryOption.toggleClass("site-main__group--filter__category--option__visible");
        this.filterToggleIcon.toggleClass("icon--rotate");
    }

}

export default SiteMainGroup;