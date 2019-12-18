import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../store/actions/index';

class NavigationInput extends Component {
    state = {
        value: '',
        isExpand: false
    }

    componentDidUpdate() {
        if (!this.props.expand && this.state.isExpand) {
            this.setState({value: '', isExpand: false})
        }
    }

    expandFormHandler = () => {
        this.props.onFormExpand();
    }

    filterContentHandler = (event) => {
        this.setState({value: event.target.value});
        let inputElem = window.document.querySelector('.site-header__form');
        let inputLastElem = window.document.querySelector('.site-header__user');
        let updateInputLastElem = window.innerWidth - inputLastElem.offsetLeft - 30;
        let updateInputElem = inputElem.offsetLeft;
        if (window.innerWidth > 1200) {
            updateInputElem = 220;
            updateInputLastElem = 100; 
        }
        this.props.onHeaderFilter(event.target.value, updateInputElem, updateInputLastElem);
        if (!this.state.isExpand) {
            this.setState({isExpand: true})
        }
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
                    onClick={this.expandFormHandler}
                    onChange={this.filterContentHandler}
                    value={this.state.value}/>
                <div className="site-header__form--search">
                    <FontAwesomeIcon 
                        icon={['fas', 'search']} 
                        className="icon icon__site-header--search" />
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
        onFormExpand: () => dispatch(actions.headerFormExpand()),
        onHeaderFilter: (filterCnt, filterPos, filterLastpos) => dispatch(actions.headerFilterInit(filterCnt, filterPos, filterLastpos))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationInput);