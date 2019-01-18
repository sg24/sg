import $ from 'jquery';

class QuestionFilter {
    constructor() {
        this.categToggler = $(".exquestion__category");
        this.categ = $(".exquestion__category--item");
        this.filterToggler = $(".exquestion__filter");
        this.filter = $(".exquestion__filter--options");
        this.filterOverlay =$(".site-main__content--overlay");
        this.filterClose = $(".site-main__content--overlay,.exquestion__filter--options__search--found__total, .exquestion__filter--options__search--btn__ok, .exquestion__filter--options__search--btn__cancel");
        this.seleToggler = $(".exquestion__filter--options__search--categsm");
        this.seleCateg = $(".exquestion__filter--options__search--categsm__item");
        this.seleCategIcon = $(".exquestion__filter--options__search--categsm__title");
        this.events();
    }

    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.filterClose.click(this.closeAllFilter.bind(this));
        this.seleToggler.click(this.toggleSelecCate.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("exquestion__category--item__visible");
        this.categToggler.toggleClass("icon--rotate");
        this.filter.removeClass("exquestion__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("exquestion__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.toggleClass("site-main__content--overlay__visible");
    }

    toggleFilter() {
        this.filter.toggleClass("exquestion__filter--options__visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.categ.removeClass("exquestion__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("exquestion__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.toggleClass("site-main__content--overlay__visible");
    }

    closeAllFilter() {
        this.filter.removeClass("exquestion__filter--options__visible");
        this.filterToggler.removeClass("icon--rotate");
        this.seleCateg.removeClass("exquestion__filter--options__search--categsm__item--visible");
        this.seleCategIcon.removeClass("icon--rotate");
        this.filterOverlay.removeClass("site-main__content--overlay__visible");
        this.categ.removeClass("exquestion__category--item__visible");
        this.categToggler.removeClass("icon--rotate");
    }

    toggleSelecCate() {
        this.seleCateg.toggleClass("exquestion__filter--options__search--categsm__item--visible");
        this.seleCategIcon.toggleClass("icon--rotate");
    }
} 

export default QuestionFilter;