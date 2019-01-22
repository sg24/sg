import $ from 'jquery';

class Content {
    constructor() {
        this.moreOptToggler = $(".viewall__comments--box__footer--loadmorewrapper");
        this.moreOpt = $(".viewall__comments--box__footer--lastItem__options");
        this.quePostToggler = $(".viewall__content--footer__loadmorewrapper");
        this.quePosted = $(".viewall__content--footer__loadmorewrapper--options");
        this.replyTogger = $(".viewall__comments--box__footer--user-opt__reply"); 
        this.reply = $(".viewall__comments--box__reply");
        this.closeallReply = $(".viewall__comments--box__reply--mainClose");
        this.events();
    }

    events() {
        this.moreOptToggler.click(this.toggleMoreOpt.bind(this));
        this.quePostToggler.click(this.toggleQuePosted.bind(this));
        this.replyTogger.click(this.toggleReply.bind(this));
        this.closeallReply.click(this.closeReply.bind(this));
    }


    toggleMoreOpt() {
        this.moreOpt.toggleClass("viewall__comments--box__footer--lastItem__options--visible");
    }

    toggleQuePosted() {
        this.quePosted.toggleClass("viewall__content--footer__loadmorewrapper--options__visible");
    }

    toggleReply() {
        this.reply.toggleClass("viewall__comments--box__reply--visible");
    }

    closeReply() {
        this.reply.removeClass("viewall__comments--box__reply--visible");
    }
}

export default  Content;
