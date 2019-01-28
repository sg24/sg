import $ from 'jquery';

class ToolTips {
    constructor() {
        this.siteHeaderMenuFavoriteIcons = $(".site-header__menu--favorites");
        this.siteHeaderMenuFavoritesToolTips = $(".site-header__menu--favorites__tool-tip");
        this.siteHeaderMenuShareIcons = $(".site-header__menu--shares");
        this.siteHeaderMenuShareToolTips = $(".site-header__menu--shares__tool-tip");
        this.siteHeaderMenuNotificationIcons = $(".site-header__menu--notify");
        this.siteHeaderMenuNotificationToolTips = $(".site-header__menu--notify__tool-tip");
        this.siteHeaderMenuNavIcons = $(".site-header__menu--nav");
        this.siteHeaderMenuNavToolTips = $(".site-header__menu--nav__tool-tip");
        this.events();
    }

    events() {
        this.siteHeaderMenuFavoriteIcons.mouseenter(this.toolTipsFavoritesMouseEnter.bind(this));
        this.siteHeaderMenuShareIcons.mouseenter(this.toolTipsSharesMouseEnter.bind(this));
        this.siteHeaderMenuNotificationIcons.mouseenter(this.toolTipsNotificationsMouseEnter.bind(this));
        this.siteHeaderMenuNavIcons.mouseenter(this.toolTipsNavMouseEnter.bind(this));

        this.siteHeaderMenuFavoriteIcons.mouseleave(this.toolTipsFavoritesMouseLeave.bind(this));
        this.siteHeaderMenuShareIcons.mouseleave(this.toolTipsSharesMouseLeave.bind(this));
        this.siteHeaderMenuNotificationIcons.mouseleave(this.toolTipsNotificationsMouseLeave.bind(this));
        this.siteHeaderMenuNavIcons.mouseleave(this.toolTipsNavMouseLeave.bind(this));
    }

    

    toolTipsFavoritesMouseEnter() {
        this.siteHeaderMenuFavoritesToolTips.addClass("site-header__menu--favorites__tool-tip--openIcons");
    }

    toolTipsSharesMouseEnter() {
        this.siteHeaderMenuShareToolTips.addClass("site-header__menu--favorites__tool-tip--openIcons");
    }

    toolTipsNotificationsMouseEnter() {
        this.siteHeaderMenuNotificationToolTips.addClass("site-header__menu--favorites__tool-tip--openIcons");
    }

    toolTipsNavMouseEnter() {
        this.siteHeaderMenuNavToolTips.addClass("site-header__menu--nav__tool-tip--openIcons");
    }

    toolTipsFavoritesMouseLeave() {
        this.siteHeaderMenuFavoritesToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
    }

    toolTipsSharesMouseLeave() {
        this.siteHeaderMenuShareToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
    }

    toolTipsNotificationsMouseLeave() {
        this.siteHeaderMenuNotificationToolTips.removeClass("site-header__menu--favorites__tool-tip--openIcons");
    }

    toolTipsNavMouseLeave() {
        this.siteHeaderMenuNavToolTips.removeClass("site-header__menu--nav__tool-tip--openIcons");
    }

}

export default ToolTips;