import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Filter.css';  
import * as actions from '../../../../../store/actions/index'; 

class Filter extends Component {
    showFilterOptHandler = () => {
        this.props.onShowBackdrop();
    }

    render() {
        return (
            <div className="reuse-filter">
                <div 
                    className="reuse-filter__title"
                    onClick={this.showFilterOptHandler}>
                    Filter 
                    <FontAwesomeIcon 
                        icon={['fas', 'angle-down']} 
                        className="icon icon__reuse-filter--angle"/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
         onShowBackdrop: () => dispatch(actions.showMainBackdrop()) 
    };
 }

export default connect(null, mapDispatchToProps)(Filter);