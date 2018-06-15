import $ from 'jquery';

class SiteHeader {
    constructor () {
       this.siteBody = $(".site-hero");
       this.siteHeaderForm = $(".site-header__form");
       this.siteHeaderInput = $(".site-header__form--input");
       this.siteHeaderAddnew = $(".site-header__addNew");
       this.siteHeaderAddNewList = $(".site-header__addNew--list");
       this.siteHeaderList = $(".site-header__list");
       this.siteHeaderSearchBtn = $(".site-header__form--search");
       this.siteHeaderMiniToggler= $(".site-header__form--search, .site-header__list--search-mini__content");
       this.siteHeaderMiniForm = $(".site-header__miniForm");
       this.siteHeaderMiniFormClose = $(".site-header__miniForm--close");
       this.siteHeaderMini = $(".site-header__list--search-minis");
       this.siteHeaderNav = $(".site-header__menu--nav__icon, .site-header__list--bars");
       this.siteHeaderNavList = $(".site-header__menu--nav__list");
       this.siteHeaderMenuNavToolTips = $(".site-header__menu--nav__tool-tip");
       this.siteHeaderNavListFirstItem = $(".site-header__menu--nav__list--options__firstdropdown");
       this.siteHeaderNavListFirstItemDetails = $(".site-header__menu--nav__list--options__firstItemsDetails");
       this.siteHeaderNavListSecondItem = $(".site-header__menu--nav__list--options__seconddropdown");
       this.siteHeaderNavListSecondItemDetails = $(".site-header__menu--nav__list--options__secondItemsDetails");
       this.sitewrapper = $(".site-header__menu--notification--ct__details");
       this.siteHeaderNotify = $(".site-header__menu--notification__notify-content");
       this.events();
    }

   events() {
    this.siteHeaderInput.click(this.expandForm.bind(this));
    this.siteBody.click(this.clearForm.bind(this));
    this.siteHeaderMiniToggler.click(this.toggleForm.bind(this));
    this.siteHeaderMiniFormClose.click(this.clearMiniForm.bind(this));
    this.siteHeaderAddnew.click(this.toggleAddNew.bind(this));
    this.siteHeaderNav.click(this.toggleNav.bind(this));
    this.siteHeaderNavListFirstItem.click(this.toggleNavFirstItem.bind(this));
    this.siteHeaderNavListSecondItem.click(this.toggleNavSecondItem.bind(this));
   };

   expandForm() {
    this.siteHeaderForm.addClass("site-header__form--expanded");
    this.siteHeaderAddnew.addClass("site-header__addNew--formExpanded");
    this.siteHeaderList.addClass("site-header__list--formExpanded");
    this.siteHeaderSearchBtn.addClass("site-header__form--search__formExpanded");
    this.siteHeaderInput.addClass("site-header__form--input__formExpanded")
   }

   clearMiniForm() {
    this.siteHeaderMiniForm.removeClass("site-header__miniForm--miniForm__expanded");
   }
   clearForm() {
    this.siteHeaderForm.removeClass("site-header__form--expanded");
    this.siteHeaderAddnew.removeClass("site-header__addNew--formExpanded");
    this.siteHeaderList.removeClass("site-header__list--formExpanded");
    this.siteHeaderSearchBtn.removeClass("site-header__form--search__formExpanded");
    this.siteHeaderInput.removeClass("site-header__form--input__formExpanded");
    this.siteHeaderMiniForm.removeClass("site-header__miniForm--miniForm__expanded");
    this.siteHeaderNavList.removeClass("site-header__menu--nav__list--visible");
    this.siteHeaderMenuNavToolTips.removeClass("site-header__menu--nav__tool-tip--openIcons");
    this.siteHeaderAddNewList.removeClass("site-header__addNew--list__opened");
   }

   toggleForm() {
        this.siteHeaderMiniForm.toggleClass("site-header__miniForm--miniForm__expanded");
   }

    toggleAddNew() {
    this.siteHeaderAddNewList.toggleClass("site-header__addNew--list__opened");
    }

   toggleNav() {
    this.siteHeaderNavList.toggleClass("site-header__menu--nav__list--visible");
    this.siteHeaderMenuNavToolTips.removeClass("site-header__menu--nav__tool-tip--openIcons");
    this.siteHeaderNotify.removeClass("site-header__menu--notification__notify-content--open");
   }

   toggleNavFirstItem () {
       this.siteHeaderNavListFirstItem.toggleClass("site-header__menu--nav__list--options__firstitems--addHeight");
       this.siteHeaderNavListFirstItemDetails.toggleClass("site-header__menu--nav__list--options__firstItemsDetails--visible");
   }

   toggleNavSecondItem () {
    this.siteHeaderNavListSecondItem.toggleClass("site-header__menu--nav__list--options__seconditems--addHeight");
    this.siteHeaderNavListSecondItemDetails.toggleClass("site-header__menu--nav__list--options__secondItemsDetails--visible");
}
}

export default SiteHeader;