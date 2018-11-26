import $ from 'jquery';

class GroupFilter {
    constructor() {
        this.sortToggler = $(".site-main__group--filter__alt--title");
        this.sortOption = $(".site-main__group--filter__alt--wrapper");
        this.closeSort = $(".site-main__group--overlay, .site-main__group--filter__alt--wrapper__btn--ok, .site-main__group--filter__alt--total");
        this.categToggler = $(".site-main__group--filter__category");
        this.categTogglerIcon = $(".site-main__group--filter__category--header__toggleIcon");
        this.categ = $(".site-main__group--filter__category--option");
        this.innerCategToggler = $(".site-main__group--filter__innercategory");
        this.innerCategToggleIcon = $(".site-main__group--filter__innercategory--header__toggleIcon");
        this.innerCateg = $(".site-main__group--filter__innercategory--option");
        this.sortOverlay =$(".site-main__group--overlay");
        this.events();
    }

    events() {
       this.sortToggler.click(this.toggleSortOption.bind(this));
       this.categToggler.click(this.toggleCateg.bind(this));
       this.innerCategToggler.click(this.togglerInCateg.bind(this));
       this.closeSort.click(this.closeAllSort.bind(this));
    }

    toggleSortOption() {
        this.sortOption.toggleClass("site-main__group--filter__alt--wrapper__visible");
        this.sortToggler.toggleClass("icon--rotate");
        this.categ.removeClass("site-main__group--filter__category--option__visible");
        this.categTogglerIcon.removeClass("icon--rotate");
        this.sortOverlay.toggleClass("site-main__group--overlay__visible");
    }

    toggleCateg() {
        this.categ.toggleClass("site-main__group--filter__category--option__visible");
        this.categTogglerIcon.toggleClass("icon--rotate");
        this.sortOption.removeClass("site-main__group--filter__alt--wrapper__visible");
        this.sortToggler.removeClass("icon--rotate");
        this.sortOverlay.toggleClass("site-main__group--overlay__visible");
    }

    togglerInCateg() {
        this.innerCateg.toggleClass("site-main__group--filter__innercategory--option__visible");
        this.innerCategToggleIcon.toggleClass("icon--rotate");
    }

    closeAllSort() {
        this.sortOption.removeClass("site-main__group--filter__alt--wrapper__visible");
        this.sortToggler.removeClass("icon--rotate");
        this.sortOverlay.removeClass("site-main__group--overlay__visible");
        this.categ.removeClass("site-main__group--filter__category--option__visible");
        this.categTogglerIcon.removeClass("icon--rotate");
    }
}

export default GroupFilter;