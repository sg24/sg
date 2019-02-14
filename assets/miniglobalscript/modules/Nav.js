import $ from 'jquery';

class Nav {
    constructor() {
        this.navPtToggler = $(".nav__pt");
        this.navPtIcn = $(".nav__pt > h4 > span");
        this.navPt = $(".nav__pt > ul");
        this.navQueToggler = $(".nav__que");
        this.navQue = $(".nav__que > ul");
        this.navQueIcn = $(".nav__que > h4 > span");
        this.navGrpToggler = $(".nav__grp");
        this.navGrp = $(".nav__grp > ul");
        this.navGrpIcn = $(".nav__grp > h4 > span");
        this.navPwtToggler = $(".nav__pwt");
        this.navPwt = $(".nav__pwt > ul");
        this.navPwtIcn = $(".nav__pwt > h4 > span");
        this.navOnqueToggler = $(".nav__online-que");
        this.navOnque = $(".nav__online-que > ul");
        this.navOnqueIcn = $(".nav__online-que> h4 > span");
        this.navOnqueSmToggler = $(".nav__online-que-sm");
        this.navOnqueSm = $(".nav__online-que-sm > ul");
        this.navOnqueIcnSm = $(".nav__online-que-sm> h4 > span");
        this.navOptToggler = $(".nav__other");
        this.navOpt = $(".nav__other > ul");
        this.navOptIcn = $(".nav__other > h4 > span");
        this.navOptSmToggler = $(".nav__other-sm");
        this.navOptSm = $(".nav__other-sm > ul");
        this.navOptIcnSm = $(".nav__other-sm > h4 > span");
        this.events(); 
    } 

    events() {
        this.navPtToggler.click(this.togglePtNav.bind(this));
        this.navQueToggler.click(this.toggleQueNav.bind(this));
        this.navGrpToggler.click(this.toggleGrpNav.bind(this));
        this.navPwtToggler.click(this.togglePwtNav.bind(this));
        this.navOnqueToggler.click(this.toggleOnqueNav.bind(this));
        this.navOnqueSmToggler.click(this.toggleOnqueNavSm.bind(this));
        this.navOptToggler.click(this.toggleNavOpt.bind(this)); 
        this.navOptSmToggler.click(this.toggleNavOptSm.bind(this));
    }

    togglePtNav() {
        this.navPt.toggleClass("nav__wrapper--visible");
        this.navPtIcn.toggleClass("icon--rotate");  
    }

    toggleQueNav() {
        this.navQue.toggleClass("nav__wrapper--visible");
        this.navQueIcn.toggleClass("icon--rotate");  
    }

    toggleGrpNav() {
        this.navGrp.toggleClass("nav__wrapper--visible");
        this.navGrpIcn.toggleClass("icon--rotate");  
    }

    togglePwtNav() {
        this.navPwt.toggleClass("nav__wrapper--visible");
        this.navPwtIcn.toggleClass("icon--rotate");  
    }

    toggleOnqueNav() {
        this.navOnque.toggleClass("nav__wrapper--visible");
        this.navOnqueIcn.toggleClass("icon--rotate");  
    }

    toggleOnqueNavSm() {
        this.navOnqueSm.toggleClass("nav__wrapper--visible");
        this.navOnqueIcnSm.toggleClass("icon--rotate");  
    }

    toggleNavOpt() {
        this.navOpt.toggleClass("nav__wrapper--visible");
        this.navOptIcn.toggleClass("icon--rotate");  
    }

    toggleNavOptSm() {
        this.navOptSm.toggleClass("nav__wrapper--visible");
        this.navOptIcnSM.toggleClass("icon--rotate");  
    }

}

export default Nav;