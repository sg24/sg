import React, { Component } from 'react';

class Share extends Component {
    state = {
        show: false
    };

    showShareTipHandler = () => {
        this.setState({
            show: true
        });
    };

    hidShareTipHandler = () => {
        this.setState({
            show: false
        });
    };


   render() {
        let shareTipClass = ["site-header__tool-tip site-header__tool-tip--share"];
    
        if (this.state.show) {
            shareTipClass.push("site-header__tool-tip--share__visible")
        }

        return (
            <a 
                className="site-header__menu--share" 
                href="/acc/shared"
                onMouseEnter={this.showShareTipHandler}
                onMouseLeave={this.hidShareTipHandler}>
                <div className="active__main active__main--header">
                    <div>9</div>
                </div>
                <i className="fas fa-location-arrow icon icon__site-header--shares"></i>
                <div className={shareTipClass.join(' ')}>
                    Shared with me
                </div>
            </a> 
        )
   }
};

export default Share;