import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class PostScroll {
    constructor() {
        this.menu = $(".site-main");
        this.postTab = $(".site-main__content--details__tab");
        this.siteHeaderList = $(".site-header__list");
        this.postSticky();
    }

    postSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) {
                if (direction == "down") {
                    that.postTab.addClass("site-main__content--details__tab--sticky");
                    that.siteHeaderList.addClass("site-header__list--hidden");
                } else { 
                    that.postTab.removeClass("site-main__content--details__tab--sticky");
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                }
            },
            offset:  "5%"                          
        })
    }
}

export default PostScroll;