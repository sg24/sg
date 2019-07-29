import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class NavigationInput extends Component {
    expandFormHandler = () => {
        this.props.onFormExpand();
    }

    render() {
        let formClass = ["site-header__form"];

        if (this.props.expand) {
            formClass.push("site-header__form--expand")
        }

        return (
            <form className={formClass.join(' ')}>
                <input type="text" 
                    className="site-header__form--input" 
                    autoComplete="on" 
                    onClick={this.expandFormHandler}/>
                <div className="site-header__form--search">
                    <i className="fas fa-search icon icon__site-header--search"></i>
                </div>
            </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        expand: state.header.expand
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormExpand: () => dispatch(actions.headerFormExpand())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationInput);