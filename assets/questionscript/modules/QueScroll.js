import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class QueScroll {
    constructor() {
        this.menu = $(".site-main");
        this.queTab = $(".site-main__content--details__tab");
        this.siteNav = $(".site-main__nav");
        this.siteHeaderList = $(".site-header__list");
        this.queSticky();
    }

    queSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.queTab.addClass("site-main__content--details__tab--sticky");
                    that.siteHeaderList.addClass("site-header__list--hidden");
                    that.siteNav.addClass("site-main__nav--sticky");
                } else { 
                    that.queTab.removeClass("site-main__content--details__tab--sticky");
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                    that.siteNav.removeClass("site-main__nav--sticky");
                }
            },
            offset:  "5%"                          
        })
    }
}

export default QueScroll;