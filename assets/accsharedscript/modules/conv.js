import $ from 'jquery';

class Conv {
    constructor() {
        this.pvtOptToggler = $(".reuse-pvt-chat__opt");
        this.pvtOpt = $(".reuse-pvt-chat__opt--det");
        this.grpOptToggler = $(".reuse-grp-chat__opt");
        this.grpOpt = $(".reuse-grp-chat__opt--det");
        this.events();
    } 

    events() { 
        this.pvtOptToggler.click(this.togglePvtOpt.bind(this));
        this.grpOptToggler.click(this.toggleGrpOpt.bind(this));
    }

    togglePvtOpt() {
        this.pvtOpt.toggleClass("reuse-pvt-chat__opt--det__visible");
        this.pvtOptToggler.toggleClass("reuse-pvt-chat__opt--clk");
    }

    toggleGrpOpt() {
        this.grpOpt.toggleClass("reuse-grp-chat__opt--det__visible");
        this.grpOptToggler.toggleClass("reuse-grp-chat__opt--clk");
    }
}

export default Conv;