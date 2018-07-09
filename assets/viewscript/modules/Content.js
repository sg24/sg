import $ from 'jquery';

class Content {
    constructor() {
        this.shareToggler = $(".viewall__comments--box__footer--firstitem__share, .viewall__content--footer__share--shareIcon");
        this.shareOpt = $(".share");
        this.shareOverlay = $(".view__wrapper");
        this.shareOptDetToggler = $(".share--content__options--item");
        this.shareOptDet = $(".share--content__options--details");
        this.shareOptSocial = $(".share--content__options--socialIcons");
        this.userCounter = $(".share--content__options--userCounter");
        this.userSelectedToggler = $(".share--content__options--userCounter__viewall");
        this.userSelected = $(".share--content__options--userSelected");
        this.closeSelected = $(".share--content__options--userSelected__mainclose");
        this.moreOptToggler = $(".viewall__comments--box__footer--loadmorewrapper");
        this.moreOpt = $(".viewall__comments--box__footer--lastItem__options");
        this.events();
    }

    events() {
        this.shareToggler.click(this.toggleShare.bind(this));
        this.shareOverlay.click(this.removeShareOverlay.bind(this));
        this.shareOptDetToggler.click(this.toggleShareDet.bind(this));
        this.userSelectedToggler.click(this.toggleUserSelected.bind(this));
        this.closeSelected.click(this.closeUserSelected.bind(this));
        this.moreOptToggler.click(this.toggleMoreOpt.bind(this));
    }

    toggleShare() {
        this.shareOpt.toggleClass("share--visible");
        this.shareOverlay.toggleClass("viewall__overlay");
        this.shareToggler.toggleClass("viewall__comments--box__footer--firstitem__share--zindex");
    }

    removeShareOverlay() {
        this.shareOverlay.removeClass("viewall__overlay");
        this.shareOpt.removeClass("share--visible");
        this.shareToggler.removeClass("viewall__comments--box__footer--firstitem__share--zindex");
    }

    toggleShareDet() {
        this.shareOptDet.toggleClass("share--content__options--details__visible");
        this.shareOptDetToggler.toggleClass("icon--rotate");
        this.shareOptSocial.toggleClass("share--content__options--socialIcons__socialIconHide");
        this.userCounter.toggleClass("share--content__options--userCounter__visible")
    }

    toggleUserSelected() {
        this.userSelected.toggleClass("share--content__options--userSelected__visible");
        this.shareOptDet.toggleClass("share--content__options--details__visible");
    }

    closeUserSelected() {
        this.userSelected.removeClass("share--content__options--userSelected__visible");
        this.shareOptDet.addClass("share--content__options--details__visible");
    }

    toggleMoreOpt() {
        this.moreOpt.toggleClass("viewall__comments--box__footer--lastItem__options--visible");
    }

}

export default  Content;
