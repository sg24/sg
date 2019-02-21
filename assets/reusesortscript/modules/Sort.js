import $ from 'jquery';

class Sort {
    constructor() {
        this.sortToggler = $(".reuse-sort");
        this.sortOpt = $(".reuse-sort__opt");
        this.overlay = $(".site-main__content--overlay");
        this.events();

    } 

    events() { 
        this.sortToggler.click(this.toggleSort.bind(this));
        this.overlay.click(this.closeAll.bind(this));
    }

    toggleSort() {
        this.sortOpt.toggleClass("reuse-sort__opt--visible");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    closeAll() {
        this.overlay.removeClass("site-main__content--overlay__visible");
        this.sortOpt.removeClass("reuse-sort__opt--visible");
    }
}

export default Sort;