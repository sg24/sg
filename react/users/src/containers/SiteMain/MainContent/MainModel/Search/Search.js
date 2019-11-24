import React, { Component } from 'react';

import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Search extends Component {
    render() {
        return (
            <div className="reuse-srch">
                <div className="reuse-srch__close">
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__reuse-srch--close" />
                </div>
                <div className="reuse-srch__wrapper">
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'calendar-alt']} 
                            className="icon icon__reuse-srch--calend" />
                    </div>
                    <input type="text" className="reuse-srch__input" placeholder="search..."/>
                </div>
            </div>
        );
    }
}

export default Search;