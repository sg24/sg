import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class PostScroll {
    constructor() {
        this.menu = $(".site-main");
        this.postTab = $(".site-main__content--tab");
        this.siteNav = $(".site-main__nav");
        this.siteHeaderList = $(".site-header__list");
        this.postSticky();
    }

    postSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.postTab.addClass("site-main__content--tab__sticky");
                    that.siteHeaderList.addClass("site-header__list--hidden");
                    that.siteNav.addClass("site-main__nav--sticky");
                } else { 
                    that.postTab.removeClass("site-main__content--tab__sticky");
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                    that.siteNav.removeClass("site-main__nav--sticky");
                }
            },
            offset:  "5%"                          
        })
    }
}

export default PostScroll;