import $ from 'jquery';
import waypoints from 'waypoints/lib/noframework.waypoints';

class Scroll {
    constructor() {
        this.nav = $(".site-main__nav");
        this.menu = $(".site-main");
        this.siteMain = $(".site-main__content--tab"); 
        this.scrollItems();
        this.siteHeaderScroll(); 
    }
 

    siteHeaderScroll() {
        var that = this;
        new Waypoint({
            element: this.menu[0],
            handler: function(direction) {
                if (direction == "down") {
                    that.siteMain.addClass("site-main__content--tab__sticky");
                } else { 
                    that.siteMain.removeClass("site-main__content--tab__sticky");
                }
            },
            offset:  "12%"             
        })
    }

    scrollItems() {
        var that = this;
        new Waypoint({
            element: this.menu[0],
            handler: function(direction) {
                if (direction == "down") {
                    that.nav.addClass("site-main__nav--sticky");
                } else {
                    that.nav.removeClass("site-main__nav--sticky");
                }
            },
            offset: "10%"
        })
    }
}

export default Scroll;

