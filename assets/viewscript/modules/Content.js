import $ from 'jquery';

class Content {
    constructor() {
        this.replyTogger = $(".reuse-view__comments--box__footer--user-opt__reply"); 
        this.reply = $(".reuse-view__comments--box__reply");
        this.closeallReply = $(".reuse-view__comments--box__reply--main-close");
        this.overlay = $(".site-main__content--overlay"); 
        this.events();
    }

    events() {
        this.replyTogger.click(this.toggleReply.bind(this));
        this.closeallReply.click(this.closeReply.bind(this));
        this.overlay.click(this.closeAll.bind(this)); 
    }

    toggleReply() {
        this.reply.toggleClass("reuse-view__comments--box__reply--visible");
        this.overlay.toggleClass("site-main__content--overlay__visible");
    }

    closeReply() {
        this.reply.removeClass("reuse-view__comments--box__reply--visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }

    closeAll() {
        this.reply.removeClass("reuse-view__comments--box__reply--visible");
        this.overlay.removeClass("site-main__content--overlay__visible");
    }
}

export default  Content;
