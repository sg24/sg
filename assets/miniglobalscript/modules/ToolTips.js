import $ from 'jquery';

class ToolTips {
    constructor() {
        this.favToggler = $(".site-header__menu--fav");
        this.fav = $(".site-header__tool-tip--fav");
        this.shareToggler = $(".site-header__menu--share");
        this.share = $(".site-header__tool-tip--share");
        this.notifyToggler = $(".site-header__menu--notify__icn");
        this.notify = $(".site-header__tool-tip--notify");
        this.navToggler = $(".site-header__menu--nav__icn");
        this.nav = $(".site-header__tool-tip--nav");
        this.events();
    }

    events() { 
        this.favToggler.mouseenter(this.openFav.bind(this));
        this.favToggler.mouseleave(this.closeFav.bind(this));
        this.shareToggler.mouseenter(this.openShare.bind(this));
        this.shareToggler.mouseleave(this.closeShare.bind(this));
        this.notifyToggler.mouseenter(this.openNotify.bind(this));
        this.notifyToggler.mouseleave(this.closeNotify.bind(this));
        this.navToggler.mouseenter(this.openNav.bind(this));
        this.navToggler.mouseleave(this.closeNav.bind(this));
    }

    openFav() {
        this.fav.addClass("site-header__tool-tip--fav__visible");
    }

    closeFav() {
        this.fav.removeClass("site-header__tool-tip--fav__visible");
    }

    openShare() {
        this.share.addClass("site-header__tool-tip--share__visible");
    }

    closeShare() {
        this.share.removeClass("site-header__tool-tip--share__visible");
    }

    openNotify() {
        this.notify.addClass("site-header__tool-tip--notify__visible");
    }

    closeNotify() {
        this.notify.removeClass("site-header__tool-tip--notify__visible");
    }

    openNav() {
        this.nav.addClass("site-header__tool-tip--nav__visible");
    }

    closeNav() {
        this.nav.removeClass("site-header__tool-tip--nav__visible");
    }

}

export default ToolTips;