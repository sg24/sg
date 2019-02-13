import $ from 'jquery';

class SiteNav {
    constructor() {
        this.setQueToggler = $(".reuse-set__categ");
        this.setQue = $(".reuse-set__categ--opt");
        this.events(); 
    } 

    events() {
        this.setQueToggler.click(this.toggleSetQue.bind(this));
    }

    toggleSetQue() {
        this.setQueToggler.toggleClass("icon--rotate");
        this.setQue.toggleClass("reuse-set__categ--opt__visible");
    }

}

export default SiteNav;