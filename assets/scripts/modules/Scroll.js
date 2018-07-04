import $ from 'jquery';
import waypoints from 'waypoints/lib/noframework.waypoints';

class Scroll {
    constructor() {
        this.item = $(".site-main__nav");
        this.scrollItems();
    }


    getElementTop() {

    }

    scrollItems() {
        var that = this;
        new Waypoint({
            element: this.item[0],
            handler: function(direction) {
                if (direction == "down") {
                    that.item.addClass("site-main__nav--waypoint");
                     that.item.innerHeight()
                } else {
                    that.item.removeClass("site-main__nav--waypoint");
                }
            },
            offset: function() {
                return -this.element.clientHeight
            }
        })
    }
}

export default Scroll;

