import $ from 'jquery';

class Form {
    constructor() {
        this.categToggler = $(".reuse-form__cnt--det__selec--categ");
        this.categ = $(".reuse-form__cnt--det__selec--categ > ul ");
        this.addOptToggler = $(".reuse-form__cnt--det__selec--add");
        this.addOpt = $(".reuse-form__cnt--det__selec--add > ul");
        this.addImgToggler = $(".reuse-form__cnt--det__selec--opt__img");
        this.addImg = $(".reuse-form__itm--img");
        this.addVidToggler = $(".reuse-form__cnt--det__selec--opt__vid");
        this.addVid = $(".reuse-form__itm--vid");
        this.addUserToggler = $(".reuse-form__cnt--det__selec--user");
        this.addUser = $(".reuse-form__itm--user");
        this.srchUserToggler = $(".reuse-form__itm--tab__srch");
        this.srchClose = $(".reuse-form__itm--srch__close");
        this.srchUser = $(".reuse-form__itm--srch");
        this.itmClose = $(".reuse-form__btn--close");
        this.overlay = $(".reuse-form__overlay");
        this.events();
    }
 
    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.addOptToggler.click(this.toggleAddOpt.bind(this));
        this.addImgToggler.click(this.toggleAddImg.bind(this));
        this.addVidToggler.click(this.toggleAddVid.bind(this));
        this.addUserToggler.click(this.toggleAddUser.bind(this));
        this.srchUserToggler.click(this.toggleSrchUser.bind(this));
        this.srchClose.click(this.closeSrch.bind(this)); 
        this.itmClose.click(this.closeItm.bind(this));
        this.overlay.click(this.closeAll.bind(this)); 
    }

    toggleCateg() {
        this.categToggler.toggleClass("icon--rotate");
        this.categ.toggleClass("reuse-form__cnt--det__selec--opt__visible");
        this.overlay.toggleClass("reuse-form__overlay--visible");
    }

    toggleAddOpt() {
        this.addOptToggler.toggleClass("icon--rotate");
        this.addOpt.toggleClass("reuse-form__cnt--det__selec--opt__visible");
        this.overlay.toggleClass("reuse-form__overlay--visible");
    }

    toggleAddImg() {
        this.addImg.toggleClass("reuse-form__itm--img__visible");
        this.overlay.toggleClass("reuse-form__overlay--visible");
    }

    toggleAddVid() {
        this.addVid.toggleClass("reuse-form__itm--vid__visible");
        this.overlay.toggleClass("reuse-form__overlay--visible");
    }

    toggleAddUser() {
        this.addUser.toggleClass("reuse-form__itm--user__visible");
        this.overlay.toggleClass("reuse-form__overlay--visible");
    }

    toggleSrchUser() {
        this.srchUser.toggleClass("reuse-form__itm--srch__visible");
    }

    closeSrch() {
        this.srchUser.removeClass("reuse-form__itm--srch__visible");
    }

    closeItm() {
        this.addImg.removeClass("reuse-form__itm--img__visible");
        this.addVid.removeClass("reuse-form__itm--vid__visible");
        this.addUser.removeClass("reuse-form__itm--user__visible");
        this.overlay.removeClass("reuse-form__overlay--visible");
    }

    closeAll() {
        this.categToggler.removeClass("icon--rotate");
        this.categ.removeClass("reuse-form__cnt--det__selec--opt__visible");
        this.overlay.removeClass("reuse-form__overlay--visible");
        this.addOptToggler.removeClass("icon--rotate");
        this.addOpt.removeClass("reuse-form__cnt--det__selec--opt__visible");
        this.addImg.removeClass("reuse-form__itm--img__visible");
        this.addVid.removeClass("reuse-form__itm--vid__visible");
        this.addUser.removeClass("reuse-form__itm--user__visible");
    }

} 
export default Form; 