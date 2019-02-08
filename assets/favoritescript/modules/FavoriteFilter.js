import $ from 'jquery';

class FavoriteFilter {
    constructor() {
        this.sortToggler = $(".exfav__sort");
        this.sort = $(".exfav__sort--item");
        this.filterToggler = $(".exfav__filter");
        this.filter = $(".exfav__filter--options");
        this.filterCateg = $(".exfav__filter--options__search--categ__title");
        this.categToggler = $(".exfav__filter--options__search--categ");
        this.categ = $(".exfav__filter--options__search--categ__item");
        this.overlay = $(".site-main__content--overlay");
        this.events();
    }

    events() {
        this.sortToggler.click(this.toggleSort.bind(this));
        this.filterToggler.click(this.toggleFilter.bind(this));
        this.categToggler.click(this.toggleCateg.bind(this));
        this.overlay.click(this.closeAll.bind(this));
    }

    toggleSort() {
        this.overlay.toggleClass("site-main__content--overlay__visible");
        this.sort.toggleClass("exfav__sort--item__visible");
        this.sortToggler.toggleClass("icon--rotate"); 
    }

    toggleFilter() {
        this.overlay.toggleClass("site-main__content--overlay__visible");
        this.filter.toggleClass("exfav__filter--options__visible");
    }

    toggleCateg() {
        this.categ.toggleClass("exfav__filter--options__search--categ__item--visible");
        this.filterCateg.toggleClass("icon--rotate");
    }

    closeAll() {
        this.sort.removeClass("exfav__sort--item__visible");
        this.sortToggler.removeClass("icon--rotate"); 
        this.filter.removeClass("exfav__filter--options__visible");
        this.categ.removeClass("exfav__filter--options__search--categ__item--visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }
}

export default FavoriteFilter;