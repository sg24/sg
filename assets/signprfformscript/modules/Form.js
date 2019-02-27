import $ from 'jquery';

class Form {
    constructor() {
        this.categToggler = $(".reuse-form__cnt--det__selec--categ");
        this.categ = $(".reuse-form__cnt--det__selec--categ > ul ");
        this.overlay = $(".reuse-form__overlay");
        this.events();
    }
 
    events() {
        this.categToggler.click(this.toggleCateg.bind(this));
        this.overlay.click(this.closeAll.bind(this)); 
    }

    toggleCateg() {
        this.categToggler.toggleClass("icon--rotate");
        this.categ.toggleClass("reuse-form__cnt--det__selec--opt__visible");
        this.overlay.toggleClass("reuse-form__overlay--visible");
    }

    closeAll() {
        this.categToggler.removeClass("icon--rotate");
        this.categ.removeClass("reuse-form__cnt--det__selec--opt__visible");
        this.overlay.removeClass("reuse-form__overlay--visible");
    }

} 
export default Form;