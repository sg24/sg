import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom'

import './Contest.css';

class AboutMe extends Component {
    showFormHandler = () => {
        this.props.history.push('/index/add/contest')
    }

    render() {
        return (
            <div 
                className="aroundme"
                onClick={this.showFormHandler}>
                <div className="aroundme__main">
                    <div    className="aroundme__main--loc">
                        <FontAwesomeIcon 
                            icon={['fas', 'mask']} 
                            className="icon icon__aroundme--loc" /> 
                    </div>
                    <h4 className="aroundme__main--title">Face of slodge24 (contest)</h4>
                </div>
            </div>
        )
    }
}

export default withRouter(AboutMe)