import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class OnlineQueScroll {
    constructor() {
        this.menu = $(".site-main");
        this.onlinequeTab = $(".site-main__onlineQue--tab");
        this.siteNav = $(".site-main__nav");
        this.siteHeaderList = $(".site-header__list");
        this.OnlineQueSticky();
    }

    OnlineQueSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.onlinequeTab.addClass("site-main__onlineQue--tab__sticky");
                    that.siteHeaderList.addClass("site-header__list--hidden");
                    that.siteNav.addClass("site-main__nav--sticky");
                } else { 
                    that.onlinequeTab.removeClass("site-main__onlineQue--tab__sticky");
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                    that.siteNav.removeClass("site-main__nav--sticky");
                }
            },
            offset:  "5%"                          
        })
    }
}

export default OnlineQueScroll;