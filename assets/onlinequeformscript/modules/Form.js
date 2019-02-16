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
        this.editTmToggler = $(".reuse-form__cnt--title__tm");
        this.editTmClose = $(".reuse-form__cnt--det__tm--edit");
        this.editTm = $(".reuse-form__cnt--det__tm");
        this.itmClose = $(".reuse-form__btn--close");
        this.overlay = $(".reuse-form__overlay");
        this.events();
    }
 
    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.addOptToggler.click(this.toggleAddOpt.bind(this));
        this.addImgToggler.click(this.toggleAddImg.bind(this));
        this.addVidToggler.click(this.toggleAddVid.bind(this));
        this.editTmToggler.click(this.toggleEditTm.bind(this));
        this.editTmClose.click(this.closeEditItm.bind(this));
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

    toggleEditTm() {
        this.editTm.toggleClass("reuse-form__cnt--det__tm--visible");
    }

    closeEditItm() {
        this.editTm.removeClass("reuse-form__cnt--det__tm--visible");
    }

    closeItm() {
        this.addImg.removeClass("reuse-form__itm--img__visible");
        this.addVid.removeClass("reuse-form__itm--vid__visible");
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
    }

} 
export default Form; 