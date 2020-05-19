import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AroundMe.css';

class AboutMe extends Component {
    render() {
        return (
            <div 
                className="aroundme">
                {/* <div className="aroundme__exit">
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__reuse-pt--options__dft" /> 
                </div> */}
                <div className="aroundme__main">
                    <div    className="aroundme__main--loc">
                        <FontAwesomeIcon 
                            icon={['fas', 'map-marker-alt']} 
                            className="icon icon__aroundme--loc" /> 
                    </div>
                    <h4 className="aroundme__main--title">Fun - Around Me</h4>
                    {/* <h4 className="aroundme__main--title">Start slodge24</h4> */}
                </div>
            </div>
        )
    }
}

export default AboutMe