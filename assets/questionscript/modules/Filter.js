import $ from 'jquery';

class Filter {
    constructor() {
        this.categToggler = $(".reuse-categ");
        this.categ = $(".reuse-categ__opt");
        this.filterToggler = $(".reuse-filter__title");
        this.filter = $(".reuse-filter__opt");
        this.overlay = $(".site-main__content--overlay");
        this.filterClose = $(".reuse-filter__opt--btn__cancel, .reuse-filter__opt--btn__apply");
        this.events();
    }

    events() {  
        this.categToggler.click(this.toggleCateg.bind(this));
        this.filterToggler.click(this.openFilter.bind(this));
        this.filterClose.click(this.closeFilter.bind(this));
        this.overlay.click(this.closeAll.bind(this));
    }

    toggleCateg() {
        this.categ.toggleClass("reuse-categ__opt--visible");
        this.categToggler.toggleClass("icon--rotate");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    openFilter() {
        this.filter.toggleClass("reuse-filter__opt--visible");
        this.filterToggler.toggleClass("icon--rotate");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    closeFilter() {
        this.filter.removeClass("reuse-filter__opt--visible");
        this.filterToggler.removeClass("icon--rotate");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }

    closeAll() {
        this.filter.removeClass("reuse-filter__opt--visible");
        this.filterToggler.removeClass("icon--rotate");
        this.overlay.removeClass("site-main__content--overlay__visible");
        this.categ.removeClass("reuse-categ__opt--visible");
        this.categToggler.removeClass("icon--rotate");
    }
} 

export default Filter;