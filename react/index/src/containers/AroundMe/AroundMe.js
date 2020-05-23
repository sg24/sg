import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom'

import './AroundMe.css';

class AboutMe extends Component {
    showFormHandler = () => {
        this.props.history.push('/index/add/aroundme')
    }

    render() {
        return (
            <div 
                className="aroundme"
                onClick={this.showFormHandler}>
                <div className="aroundme__main">
                    <div    className="aroundme__main--loc">
                        <FontAwesomeIcon 
                            icon={['fas', 'map-marker-alt']} 
                            className="icon icon__aroundme--loc" /> 
                    </div>
                    <h4 className="aroundme__main--title">Fun - Around Me</h4>
                </div>
            </div>
        )
    }
}

export default withRouter(AboutMe)