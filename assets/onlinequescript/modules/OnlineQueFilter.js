import $ from 'jquery';

class QuestionFilter {
    constructor() {
        this.categToggler = $(".onlineque-filter__category");
        this.categ = $(".onlineque-filter__category--item");
        this.filterToggler = $(".onlineque-filter__cnt");
        this.filter = $(".onlineque-filter__cnt--options");
        this.filterOverlay =$(".site-main__content--overlay");
        this.filterClose = $(".site-main__content--overlay, .onlineque-filter__cnt--options__search--found__total, .onlineque-filter__cnt--options__search--btn__ok, .onlineque-filter__cnt--options__search--btn__cancel");
        this.seleToggler = $(".onlineque-filter__cnt--options__search--categsm");
        this.seleCateg = $(".onlineque-filter__cnt--options__search--categsm__item");
        this.seleCategIcon = $(".onlineque-filter__cnt--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("onlineque-filter__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("onlineque-filter__cnt--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("onlinequefilter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.toggleClass("site-main__content--overlay__visible");
    }

    toggleFilter() {
        this.filter.toggleClass("onlineque-filter__cnt--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("onlineque-filter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("onlineque-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.toggleClass("site-main__content--overlay__visible");
    }

    closeAllFilter() {
        this.filter.removeClass("onlineque-filter__cnt--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("onlineque-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.removeClass("site-main__content--overlay__visible");
        this.categ.removeClass("onlineque-filter__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("onlineque-filter__cnt--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default QuestionFilter;