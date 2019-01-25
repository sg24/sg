import $ from 'jquery';
import waypoints from 'waypoints/lib/noframework.waypoints';

class Scroll {
    constructor() {
        this.item = $(".site-main__nav");
        this.menu = $(".site-main");
        this.siteHeaderList = $(".site-header__list");
        this.siteNav = $(".site-main__nav--md");
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
                    that.siteHeaderList.addClass("site-header__list--hidden");
                    that.siteNav.addClass("site-main__nav--md__sticky"); 
                    that.siteMain.addClass("site-main__content--tab__sticky");
                } else { 
                    that.siteHeaderList.removeClass("site-header__list--hidden");
                    that.siteNav.removeClass("site-main__nav--md__sticky");
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
                    that.item.addClass("site-main__nav--sticky");
                    that.item.innerHeight()
                } else {
                    that.item.removeClass("site-main__nav--sticky");
                }
            },
            offset: "10%"
        })
    }
}

export default Scroll;

