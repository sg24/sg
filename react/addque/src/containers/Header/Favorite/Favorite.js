import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Favorite extends Component {
    state = {
        show: false
    };

    showFavTipHandler = () => {
        this.setState({
            show: true
        });
    };

    hidFavTipHandler = () => {
        this.setState({
            show: false
        });
    };

    render() {
        let favTipClass = ["site-header__tool-tip site-header__tool-tip--fav"];

        if (this.state.show) {
            favTipClass.push("site-header__tool-tip--fav__visible")
        }

        return (
            <a 
                className="site-header__menu--fav" 
                href="/favorite" 
                onMouseEnter={this.showFavTipHandler}
                onMouseLeave={this.hidFavTipHandler}>
                <FontAwesomeIcon 
                    icon={['fas', 'heart']} 
                    className="icon icon__site-header--favorites" />
                <div className={favTipClass.join(' ')}>
                    Favorites 
                </div>
            </a>
        )
    }
};

export default Favorite;