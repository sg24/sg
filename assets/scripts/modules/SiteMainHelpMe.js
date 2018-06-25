import $ from 'jquery';

class SiteMainHelpMe {
    constructor() {
        this.StudentDetails = $(".site-main__helpMe--mainContent__desc--options__firstItem");
        this.detailsOverlay = $(".site-main__helpMe--mainContent__overlay");
        this.closeOverlay = $(".site-main__helpMe--mainContent__overlay--close");
        this.filterCategory = $(".site-main__helpMe--filter__category");
        this.filterCategoryOption = $(".site-main__helpMe--filter__category--option");
        this.filterToggleIcon = $(".site-main__helpMe--filter__category--header__toggleIcon");
        this.events();
    }

    events() {
        this.StudentDetails.click(this.showStudentDetails.bind(this));
        this.closeOverlay.click(this.closeStudentDetails.bind(this));
        this.filterCategory.click(this.toggleCategoryOption.bind(this));
    }

    showStudentDetails() {
        this.detailsOverlay.toggleClass("site-main__helpMe--mainContent__overlay--visible");
    }

    closeStudentDetails() {
        this.detailsOverlay.removeClass("site-main__helpMe--mainContent__overlay--visible");
    }

    toggleCategoryOption() {
        this.filterCategoryOption.toggleClass("site-main__helpMe--filter__category--option__visible");
        this.filterToggleIcon.toggleClass("icon--rotate");
    }

}

export default SiteMainHelpMe;