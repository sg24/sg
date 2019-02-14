import $ from 'jquery';

class SiteHeader {
    constructor () {
       this.siteBody = $(".reuse-view, .site-main");
       this.form = $(".site-header__form")
       this.formInput = $(".site-header__form--input");
       this.addNewToggler = $(".site-header__add-new");
       this.addNew = $(".site-header__add-new--opt");
       this.navOpt = $(".site-header__nav-opt");
       this.nofityToggler = $(".site-header__menu--notify__icn, .site-header__menu--notify__num");
       this.notify = $(".site-header__menu--notify__cnt");
       this.navToggler = $(".site-header__menu--nav__icn");
       this.nav = $(".nav");
       this.userOptToggler = $(".site-header__user");
       this.userOpt = $(".site-header__user--det");
       this.formSmOpen = $(".site-header__form-sm");
       this.formSm = $(".site-header__sm-form");
       this.formSmClose = $(".site-header__sm-form--close");
       this.events();
    }

   events() {
        this.formInput.click(this.formExpanded.bind(this)); 
        this.siteBody.click(this.closeAll.bind(this)); 
        this.addNewToggler.click(this.toggleAddNew.bind(this)); 
        this.nofityToggler.click(this.toggleNotify.bind(this)); 
        this.navToggler.click(this.toggleNav.bind(this)); 
        this.userOptToggler.click(this.toggleUserOpt.bind(this)); 
        this.formSmOpen.click(this.openFormSm.bind(this)); 
        this.formSmClose.click(this.closeFormSm.bind(this)); 
    }

   formExpanded() {
       this.form.addClass("site-header__form--expand");
       this.addNewToggler.addClass("site-header__add-new--hidden"); 
       this.navOpt.addClass("site-header__nav-opt--hidden"); 
    }

   toggleAddNew() {
        this.addNew.toggleClass("site-header__add-new--opt__visible");
        this.addNewToggler.toggleClass("icon--rotate"); 
    }

   toggleNotify() {
        this.notify.toggleClass("site-header__menu--notify__cnt--visible");
        this.nav.removeClass("nav__visible");
        this.userOpt.removeClass("site-header__user--det__visible");
    }

    toggleNav() {
        this.nav.toggleClass("nav__visible");
        this.notify.removeClass("site-header__menu--notify__cnt--visible");
        this.userOpt.removeClass("site-header__user--det__visible");
    }

    toggleUserOpt() {
        this.userOpt.toggleClass("site-header__user--det__visible");
        this.notify.removeClass("site-header__menu--notify__cnt--visible");
        this.nav.removeClass("nav__visible");
    }

    openFormSm() {
        this.formSm.addClass("site-header__sm-form--visible");
    }

    closeFormSm() {
        this.formSm.removeClass("site-header__sm-form--visible");
    }

   closeAll() {
        this.form.removeClass("site-header__form--expand");
        this.addNewToggler.removeClass("site-header__add-new--hidden"); 
        this.navOpt.removeClass("site-header__nav-opt--hidden"); 
        this.addNew.removeClass("site-header__add-new--opt__visible");
        this.addNewToggler.removeClass("icon--rotate"); 
        this.notify.removeClass("site-header__menu--notify__cnt--visible");
        this.nav.removeClass("nav__visible"); 
        this.userOpt.removeClass("site-header__user--det__visible");
        this.formSm.removeClass("site-header__sm-form--visible");
    }
}

export default SiteHeader;