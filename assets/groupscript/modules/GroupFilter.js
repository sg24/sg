import $ from 'jquery';

class GroupFilter {
    constructor() {
        this.sortToggler = $(".reuse-group__filter--srt__title");
        this.sortOpt = $(".reuse-group__filter--srt__wrapper");
        this.closeFilter = $(".site-main__content--overlay, .reuse-group__filter--srt__btn--ok, .reuse-group__filter--srt__btn--cancel");
        this.categToggler = $(".reuse-group__filter--categ");
        this.categ = $(".reuse-group__filter--categ__opt");
        this.srtCategToggler = $(".reuse-group__filter--srt__categ--title");
        this.srtCateg = $(".reuse-group__filter--srt__categ--opt");
        this.overlay =$(".site-main__content--overlay");
        this.events();
    }

    events() {
       this.sortToggler.click(this.toggleSortOpt.bind(this));
       this.categToggler.click(this.toggleCateg.bind(this));
       this.srtCategToggler.click(this.toggleSortCateg.bind(this));
       this.closeFilter.click(this.closeAll.bind(this));
    }

    toggleSortOpt() {
        this.sortOpt.toggleClass("reuse-group__filter--srt__wrapper--visible");
        this.sortToggler.toggleClass("icon--rotate");
        this.categ.removeClass("reuse-group__filter--categ__opt--visible");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    toggleCateg() {
        this.categ.toggleClass("reuse-group__filter--categ__opt--visible");
        this.categToggler.toggleClass("icon--rotate"); 
        this.sortOpt.removeClass("reuse-group__filter--srt__wrapper--visible");
        this.sortToggler.removeClass("icon--rotate");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    toggleSortCateg() {
        this.srtCateg.toggleClass("reuse-group__filter--srt__categ--opt__visible");
        this.srtCategToggler.toggleClass("icon--rotate");
    } 

    closeAll() {
        this.categ.removeClass("reuse-group__filter--categ__opt--visible");
        this.categToggler.removeClass("icon--rotate"); 
        this.sortOpt.removeClass("reuse-group__filter--srt__wrapper--visible");
        this.sortToggler.removeClass("icon--rotate"); 
        this.overlay.removeClass("site-main__content--overlay__visible");
    }
}

export default GroupFilter;