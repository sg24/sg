import $ from 'jquery';

class Nav {
    constructor() {
        this.selectToggle = $(".viewall__nav--timedQues__category--title");
        this.selectOpt = $(".viewall__nav--timedQues__category--title__item");
        this.events();
    }

    events() {
        this.selectToggle.click(this.toggleSelectOpt.bind(this));
    }

    toggleSelectOpt() {
        this.selectOpt.toggleClass("viewall__nav--timedQues__category--title__item--visible")
        this.selectToggle.toggleClass("icon--rotate");
    }
}

export default Nav;