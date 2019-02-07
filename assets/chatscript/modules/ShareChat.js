import $ from 'jquery';

class ShareChat {
    constructor() {
        this.chatBoxToggler = $(".site-main__chat--box__hst--wrapper, .site-main__chat--box__reply--wrapper");
        this.chatBoxHs = $(".site-main__chat--box__hst");
        this.chatBoxRely = $(".site-main__chat--box__reply");
        this.chatBoxOpt = $(".site-main__chat--opt");
        this.events(); 
    }

    events() {
        this.chatBoxToggler.click(this.toggleChatBox.bind(this));
    } 
 
    toggleChatBox() {
        this.chatBoxOpt.addClass("site-main__chat--opt__visible");
        this.chatBoxHs.addClass("site-main__chat--box__hst--clk");
        this.chatBoxRely.addClass("site-main__chat--box__reply--clk");
    }
}

export default ShareChat;