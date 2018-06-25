import $ from 'jquery';

class SiteMainCommunities {
    constructor() {
        this.communitiesDetails = $(".site-main__communities--mainContent__desc--options__firstItem");
        this.detailsOverlay = $(".site-main__communities--mainContent__overlay");
        this.closeOverlay = $(".site-main__communities--mainContent__overlay--close");
        this.filterCategory = $(".site-main__communities--filter__category");
        this.filterCategoryOption = $(".site-main__communities--filter__category--option");
        this.filterToggleIcon = $(".site-main__communities--filter__category--header__toggleIcon");
        this.events();
    }

    events() {
        this.communitiesDetails.click(this.showCommunitiesDetails.bind(this));
        this.closeOverlay.click(this.closeCommunitiesDetails.bind(this));
        this.filterCategory.click(this.toggleCategoryOption.bind(this));
    }

    showCommunitiesDetails() {
        this.detailsOverlay.toggleClass("site-main__communities--mainContent__overlay--visible");
    }

    closeCommunitiesDetails() {
        this.detailsOverlay.removeClass("site-main__communities--mainContent__overlay--visible");
    }

    toggleCategoryOption() {
        this.filterCategoryOption.toggleClass("site-main__communities--filter__category--option__visible");
        this.filterToggleIcon.toggleClass("icon--rotate");
    }

}

export default SiteMainCommunities;