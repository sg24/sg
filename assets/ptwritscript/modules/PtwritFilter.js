import $ from 'jquery';

class PtwritFilter {
    constructor() {
        this.categToggler = $(".ptwrit-filter__category");
        this.categ = $(".ptwrit-filter__category--item");
        this.filterToggler = $(".ptwrit-filter__cnt");
        this.filter = $(".ptwrit-filter__cnt--options");
        this.filterOverlay =$(".site-main__content--overlay");
        this.filterClose = $(".site-main__content--overlay, .ptwrit-filter__cnt--options__search--found__total, .ptwrit-filter__cnt--options__search--btn__ok, .ptwrit-filter__cnt--options__search--btn__cancel");
        this.seleToggler = $(".ptwrit-filter__cnt--options__search--categsm");
        this.seleCateg = $(".ptwrit-filter__cnt--options__search--categsm__item");
        this.seleCategIcon = $(".ptwrit-filter__cnt--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("ptwrit-filter__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("ptwrit-filter__cnt--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("ptwrit-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.toggleClass("site-main__content--overlay__visible");
    }

    toggleFilter() {
        this.filter.toggleClass("ptwrit-filter__cnt--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("ptwrit-filter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("ptwrit-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.addClass("site-main__content--overlay__visible");
    }

    closeAllFilter() {
        this.filter.removeClass("ptwrit-filter__cnt--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("ptwrit-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.removeClass("site-main__content--overlay__visible");
        this.categ.removeClass("ptwrit-filter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("ptwrit-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default PtwritFilter;