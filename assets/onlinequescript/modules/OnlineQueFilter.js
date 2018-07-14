import $ from 'jquery';

class QuestionFilter {
    constructor() {
        this.categToggler = $(".onlinequefilter__category");
        this.categ = $(".onlinequefilter__category--item");
        this.filterToggler = $(".onlinequefilter__filter");
        this.filter = $(".onlinequefilter__filter--options");
        this.filterOverlay =$(".site-main__content--details__overlay");
        this.filterClose = $(".onlinequefilter__filter--options__search--found__total, .onlinequefilter__filter--options__search--btn__ok, .onlinequefilter__filter--options__search--btn__cancel");
        this.seleToggler = $(".onlinequefilter__filter--options__search--categsm");
        this.seleCateg = $(".onlinequefilter__filter--options__search--categsm__item");
        this.seleCategIcon = $(".onlinequefilter__filter--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("onlinequefilter__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("onlinequefilter__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("onlinequefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
    }

    toggleFilter() {
        this.filter.toggleClass("onlinequefilter__filter--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("onlinequefilter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("onlinequefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        // this.filterOverlay.toggleClass("site-main__content--details__overlay--visible");
    }

    closeAllFilter() {
        this.filter.removeClass("onlinequefilter__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("onlinequefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        // this.filterOverlay.removeClass("site-main__content--details__overlay--visible");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("onlinequefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default QuestionFilter;