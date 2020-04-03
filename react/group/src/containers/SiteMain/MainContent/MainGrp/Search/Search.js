import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Search.css';
import * as actions from '../../../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Search extends Component {
    state= {
        searchCnt: ''
    }

    closeSearchHandler = () => {
        this.props.onCloseSearch();
        if (this.state.searchCnt.length > 0) {
            this.props.history.push('/group')
        }
    }

    filterInputHandler = (event) => {
        this.props.onFilter({searchCnt: event.target.value, filterSelect: [], category: [], apply: true})
        this.setState({searchCnt: event.target.value});
        this.props.history.push('/group/filter/?search='+event.target.value);
    }

    render() {
        let searchClass = ['reuse-srch'];

        if (this.props.startSearch) {
            searchClass.push('reuse-srch__visible')
        }

        return (
            <div className={searchClass.join(' ')}>
                <div 
                    className="reuse-srch__close"
                    onClick={this.closeSearchHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__reuse-srch--close" />
                </div>
                <div className="reuse-srch__wrapper">
                    {/* <div>
                        <FontAwesomeIcon 
                            icon={['far', 'calendar-alt']} 
                            className="icon icon__reuse-srch--calend" />
                    </div> */}
                    <input 
                        type="text" 
                        className="reuse-srch__input"
                        placeholder="Enter group name ..."
                        onChange={this.filterInputHandler}
                        value={this.state.searchCnt}/>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        startSearch: state.filter.startSearch
    };
 }

 const mapDispatchToProps = dispatch => {
    return {
        onCloseSearch: () => dispatch(actions.closeSearch()),
        onFilter: (content) => dispatch(actions.filterContentInit(content)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
    };
 }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));