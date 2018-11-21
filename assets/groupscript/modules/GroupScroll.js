import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class GroupScroll {
    constructor() {
        this.menu = $(".site-main");
        this.groupTab = $(".site-main__group--optionsTab");
        this.siteNav = $(".site-main__nav");
        this.siteHeaderList = $(".site-header__list");
        this.GroupSticky();
    }

    GroupSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.groupTab.addClass("site-main__group--optionsTab__sticky");
                    that.siteHeaderList.addClass("site-header__list--hidden");
                    that.siteNav.addClass("site-main__nav--sticky");
                } else { 
                    that.groupTab.removeClass("site-main__group--optionsTab__sticky");
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                    that.siteNav.removeClass("site-main__nav--sticky");
                }
            },
            offset:  "5%"                          
        })
    }
}

export default GroupScroll;