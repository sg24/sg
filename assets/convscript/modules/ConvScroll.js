import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class ConvScroll {
    constructor() {
        this.menu = $(".site-main"); 
        this.siteNav = $(".site-main__conv--nav");
        this.navSticky();
    }

    navSticky() {
        var that = this; 
        new Waypoint({
            element: this.menu[0], 
            handler: function(direction) { 
                if (direction == "down") { 
                    that.siteNav.addClass("site-main__conv--nav__sticky");
                } else { 
                    that.siteNav.removeClass("site-main__conv--nav__sticky");
                }
            },
            offset:  "5%"                       
        })
    }

}

export default ConvScroll; 