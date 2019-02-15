import $ from 'jquery';

class FormQue {
    constructor() {
        this.viewToggler = $(".site-main__queform--que__viewall");
        this.view = $(".site-main__queform--view");   
        this.viewClose = $(".site-main__queform--view__close, .site-main__overlay, .site-main__queform--form__user--teach__close");
        this.categToggler = $(".site-main__queform--form__categ--content__opt");
        this.categ = $(".site-main__queform--form__categ--content__opt--item");
        this.selecTeachToggler = $(".site-main__queform--form__user--content__selec");
        this.selecTeach = $(".site-main__queform--form__user--teach");
        this.overlay = $(".site-main__overlay");
        this.wrapper = $(".site-main__queform--form__user--teach__user--wrapper");
        this.wrapperHover = $(".site-main__queform--form__user--teach__user--selectIcon");
        this.wrapperActive =  $(".site-main__queform--form__user--teach__user--selectIconActive");
        this.optToggler = $(".site-main__queform--view__que--footer__opt");
        this.opt = $(".site-main__queform--view__que--footer__opt--items");
        this.events();
    }
 
    events() {
        this.viewToggler.click(this.openView.bind(this)); 
        this.viewClose.click(this.closeView.bind(this));
        this.categToggler.click(this.toggleCategOpt.bind(this)); 
        this.selecTeachToggler.click(this.toggleSelecTeach.bind(this)); 
        this.wrapper.mouseenter(this.toggleWrapperHover.bind(this));
        this.wrapper.mouseleave(this.closeWrapperHover.bind(this));
        this.wrapper.click(this.toggleWrapperActive.bind(this)); 
        this.optToggler.click(this.toggleOpt.bind(this));
    }

    openView() {
        this.view.toggleClass("site-main__queform--view__visible"); 
        this.overlay.toggleClass("site-main__overlay--visible"); 
    }
 
    closeView() { 
        this.view.removeClass("site-main__queform--view__visible"); 
        this.overlay.removeClass("site-main__overlay--visible");
        this.selecTeach.removeClass("site-main__queform--form__user--teach__visible");   
    }

    toggleCategOpt() {
        this.categ.toggleClass("site-main__queform--form__categ--content__opt--item__visible");
    }  

    toggleSelecTeach() {
        this.selecTeach.toggleClass("site-main__queform--form__user--teach__visible"); 
        this.overlay.toggleClass("site-main__overlay--visible");
    }
       
    toggleWrapperHover() {
        this.wrapperHover.addClass("site-main__queform--form__user--teach__user--selectIcon__visible");
        this.wrapper.addClass("site-main__queform--form__user--teach__user--wrapper__borderhover");
    }
    
    closeWrapperHover() {
        this.wrapperHover.removeClass("site-main__queform--form__user--teach__user--selectIcon__visible");
        this.wrapper.removeClass("site-main__queform--form__user--teach__user--wrapper__borderhover");
    }
 
    toggleWrapperActive() {
        this.wrapperHover.removeClass("site-main__queform--form__user--teach__user--selectIcon__visible");
        this.wrapper.removeClass("site-main__queform--form__user--teach__user--wrapper__borderhover"); 
        this.wrapperActive.toggleClass("site-main__queform--form__user--teach__user--selectIconActive__visible");
        this.wrapper.toggleClass("site-main__queform--form__user--teach__user--wrapper__borderactive");
    } 

    toggleOpt() {
        this.opt.toggleClass("site-main__queform--view__que--footer__opt--items__visible");
    }
} 
export default FormQue;