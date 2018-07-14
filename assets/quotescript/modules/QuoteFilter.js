import $ from 'jquery';

class QuoteFilter {
    constructor() {
        this.categToggler = $(".quotefilter__category");
        this.categ = $(".quotefilter__category--item");
        this.filterToggler = $(".quotefilter__filter");
        this.filter = $(".quotefilter__filter--options");
        this.filterOverlay =$(".site-main__content--details__overlay");
        this.filterClose = $(".quotefilter__filter--options__search--found__total, .quotefilter__filter--options__search--btn__ok, .quotefilter__filter--options__search--btn__cancel");
        this.seleToggler = $(".quotefilter__filter--options__search--categsm");
        this.seleCateg = $(".quotefilter__filter--options__search--categsm__item");
        this.seleCategIcon = $(".quotefilter__filter--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("quotefilter__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("quotefilter__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("quotefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
    }

    toggleFilter() {
        this.filter.toggleClass("quotefilter__filter--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("quotefilter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("quotefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
    }

    closeAllFilter() {
        this.filter.removeClass("quotefilter__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("quotefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("quotefilter__filter--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default QuoteFilter;