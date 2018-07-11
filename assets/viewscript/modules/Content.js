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
        this.userSelectedToggler = $(".share--content__options--userCounter__viewall, .share--content__options--userCounter-sm__secondItem, .share--content__options--details__user--options__view");
        this.userSelected = $(".share--content__options--userSelected");
        this.closeSelected = $(".share--content__options--userSelected__mainclose");
        this.moreOptToggler = $(".viewall__comments--box__footer--loadmorewrapper");
        this.moreOpt = $(".viewall__comments--box__footer--lastItem__options");
        this.userCounterSm = $(".share--content__options--userCounter-sm");
        this.quePostToggler = $(".viewall__content--footer__loadmorewrapper");
        this.quePosted = $(".viewall__content--footer__loadmorewrapper--options");
        this.replyTogger = $(".viewall__comments--box__footer--reply");
        this.reply = $(".viewall__comments--box__replyBox");
        this.closeallReply = $(".viewall__comments--box__replyBox--mainClose");
        this.viewUserToggler = $(".viewall__comments--box__header--img, .viewall__comments--box__header--userdetails__title");
        this.viewUser = $(".viewuser");
        this.closeallViewuser = $(".viewuser--mainclose");
        this.events();
    }

    events() {
        this.shareToggler.click(this.toggleShare.bind(this));
        this.shareOverlay.click(this.removeShareOverlay.bind(this));
        this.shareOptDetToggler.click(this.toggleShareDet.bind(this));
        this.userSelectedToggler.click(this.toggleUserSelected.bind(this));
        this.closeSelected.click(this.closeUserSelected.bind(this));
        this.moreOptToggler.click(this.toggleMoreOpt.bind(this));
        this.quePostToggler.click(this.toggleQuePosted.bind(this));
        this.replyTogger.click(this.toggleReply.bind(this));
        this.closeallReply.click(this.closeReply.bind(this));
        this.viewUserToggler.click(this.toggleViewUser.bind(this));
        this.closeallViewuser.click(this.closeViewUser.bind(this));
    }

    toggleShare() {
        this.shareOpt.toggleClass("share--visible");
        this.shareOverlay.toggleClass("viewall__overlay");
        this.shareToggler.toggleClass("viewall__comments--box__footer--firstitem__share--zindex");
        this.moreOpt.removeClass("viewall__comments--box__footer--lastItem__options--visible");
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
        this.userCounterSm.toggleClass("share--content__options--userCounter-sm__visible");
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

    toggleQuePosted() {
        this.quePosted.toggleClass("viewall__content--footer__loadmorewrapper--options__visible");
    }

    toggleReply() {
        this.reply.toggleClass("viewall__comments--box__replyBox--visible");
    }

    closeReply() {
        this.reply.removeClass("viewall__comments--box__replyBox--visible");
    }

    toggleViewUser() {
        this.viewUser.toggleClass("viewuser--visible");
    }

    closeViewUser() {
        this.viewUser.removeClass("viewuser--visible");
    }
}

export default  Content;
