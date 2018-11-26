import $ from 'jquery';

class PtwritFilter {
    constructor() {
        this.categToggler = $(".ptwritfilter__category");
        this.categ = $(".ptwritfilter__category--item");
        this.filterToggler = $(".ptwritfilter__filter");
        this.filter = $(".ptwritfilter__filter--options");
        this.filterOverlay =$(".site-main__ptwrit--mainwrapper__overlay");
        this.filterClose = $(".site-main__ptwrit--mainwrapper__overlay, .ptwritfilter__filter--options__search--found__total, .ptwritfilter__filter--options__search--btn__ok, .ptwritfilter__filter--options__search--btn__cancel");
        this.seleToggler = $(".ptwritfilter__filter--options__search--categsm");
        this.seleCateg = $(".ptwritfilter__filter--options__search--categsm__item");
        this.seleCategIcon = $(".ptwritfilter__filter--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("ptwritfilter__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("ptwritfilter__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("ptwritfilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.toggleClass("site-main__ptwrit--mainwrapper__overlay--visible");
    }

    toggleFilter() {
        this.filter.toggleClass("ptwritfilter__filter--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("ptwritfilter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("ptwritfilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.addClass("site-main__ptwrit--mainwrapper__overlay--visible");
    }

    closeAllFilter() {
        this.filter.removeClass("ptwritfilter__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("ptwritfilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.removeClass("site-main__ptwrit--mainwrapper__overlay--visible");
        this.categ.removeClass("ptwritfilter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("ptwritfilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default PtwritFilter;