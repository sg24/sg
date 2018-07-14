import $ from 'jquery';

class PostFilter {
    constructor() {
        this.categToggler = $(".expost__category");
        this.categ = $(".expost__category--item");
        this.filterToggler = $(".expost__filter");
        this.filter = $(".expost__filter--options");
        this.filterOverlay =$(".site-main__content--details__overlay");
        this.filterClose = $(".expost__filter--options__search--found__total, .expost__filter--options__search--btn__ok, .expost__filter--options__search--btn__cancel");
        this.seleToggler = $(".expost__filter--options__search--categsm");
        this.seleCateg = $(".expost__filter--options__search--categsm__item");
        this.seleCategIcon = $(".expost__filter--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("expost__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("expost__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("expost__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
    }

    toggleFilter() {
        this.filter.toggleClass("expost__filter--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("expost__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("expost__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        // this.filterOverlay.toggleClass("site-main__content--details__overlay--visible");
    }

    closeAllFilter() {
        this.filter.removeClass("expost__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        // this.filterOverlay.removeClass("site-main__content--details__overlay--visible");
        this.seleCateg.removeClass("expost__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("expost__filter--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default PostFilter;