import $ from 'jquery';

class SharedInfo {
    constructor() {
        this.sharedInfoToggler = $(".site-main__acc-srd--info");
        this.sharedInfo = $(".site-main__acc-srd--info__cnt");
        this.events();
    } 

    events() { 
        this.sharedInfoToggler.click(this.toggleSharedInfo.bind(this));
    }

    toggleSharedInfo() {
        this.sharedInfo.toggleClass("site-main__acc-srd--info__cnt--visible");
    }
}

export default SharedInfo;