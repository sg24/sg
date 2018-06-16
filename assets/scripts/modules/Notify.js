import $ from 'jquery';

class Notify {
    constructor() {
        this.siteBody = $(".site-hero");
        this.siteHeaderBell = $(".site-header__menu--notification__icon, .site-header__menu--notification__icon--number");
        this.siteHeaderNotify = $(".site-header__menu--notification__notify-content");
        this.siteHeaderMenuFavoritesToolTips = $(".site-header__menu--favorites__tool-tip");
        this.siteHeaderMenuShareToolTips = $(".site-header__menu--shares__tool-tip");
        this.siteHeaderMenuNotificationToolTips = $(".site-header__menu--notification__tool-tip");
        this.siteHeaderMenuNavToolTips = $(".site-header__menu--nav__tool-tip");
        this.siteHeaderNavList = $(".nav__list");
        this.events();
    }

    events() {
        this.siteHeaderBell.click(this.toggleNotify.bind(this));
        this.siteHeaderNotify.mouseenter(this.removeNotifyToolTip.bind(this));
        this.siteHeaderNotify.mouseleave(this.removeNotifyToolTip.bind(this));
        this.siteHeaderNotify.mouseover(this.removeNotifyToolTip.bind(this));
        this.siteBody.click(this.removeAllNotify.bind(this));
    }

    toggleNotify() {
        this.siteHeaderNotify.toggleClass("site-header__menu--notification__notify-content--open");
        this.siteHeaderMenuFavoritesToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuShareToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuNotificationToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuNavToolTips.removeClass("site-header__menu--nav__tool-tip--openIcons");
        this.siteHeaderNavList.removeClass("nav__list--visible");
    }

    removeNotifyToolTip() {
        this.siteHeaderMenuNotificationToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuFavoritesToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuShareToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuNotificationToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
        this.siteHeaderMenuNavToolTips.removeClass("site-header__menu--nav__tool-tip--openIcons");
    }

    removeAllNotify() {
        this.siteHeaderNotify.removeClass("site-header__menu--notification__notify-content--open");
    }
}

export default Notify;