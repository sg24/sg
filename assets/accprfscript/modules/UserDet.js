import $ from 'jquery';

class UserDet {
    constructor() {
        this.uploadToggler = $(".site-main__acc-prf--user-det__title > div");
        this.upload = $(".site-main__acc-prf--user-det__cnt");
        this.expToggler = $(".site-main__acc-prf--exp__title > span");
        this.exp = $(".site-main__acc-prf--exp__cnt");
        this.events();
    } 

    events() { 
        this.uploadToggler.click(this.toggleUpload.bind(this));
        this.expToggler.click(this.toggleExp.bind(this));
    }

    toggleUpload() {
        this.upload.toggleClass("site-main__acc-prf--user-det__cnt--visible");
    }

    toggleExp() {
        this.exp.toggleClass("site-main__acc-prf--exp__cnt--visible");
    }
}

export default UserDet;