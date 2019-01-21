import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class PtwritScroll {
    constructor() {
        this.siteNav = $(".site-main__nav");
        this.siteHeaderList = $(".site-header__list");
        this.menu = $(".site-main");
        this.tabMenu = $(".site-main__ptwrit--main-wrapper");
        this.tab = $(".site-main__ptwrit--tab");
        this.tabWrapper = $(".site-main__content--wrapper");
        this.tabMain = $(".site-main__ptwrit--main-wrapper");
        this.navSticky();
        this.tabSticky();
    }

    navSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.siteNav.addClass("site-main__nav--sticky");
                } else { 
                    that.siteNav.removeClass("site-main__nav--sticky");
                }
            },
            offset:  "5%"                       
        })
    }

    tabSticky() {
        var that = this; 
        new Waypoint({
            element: this.tabMenu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.siteHeaderList.addClass("site-header__list--hidden");
                    that.tab.addClass("site-main__ptwrit--tab__sticky");
                    that.tabWrapper.addClass("site-main__content--wrapper__visible");
                    that.tabMain.addClass("site-main__ptwrit--main-wrapper__hidden");
                } else { 
                    that.tab.removeClass("site-main__ptwrit--tab__sticky");
                    that.tabWrapper.removeClass("site-main__content--wrapper__visible");
                    that.tabMain.removeClass("site-main__ptwrit--main-wrapper__hidden");
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                }
            },
            offset:  "5%"                       
        })
    }
}

export default PtwritScroll;