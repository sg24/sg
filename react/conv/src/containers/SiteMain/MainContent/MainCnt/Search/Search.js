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
    }

    filterInputHandler = (event) => {
        this.setState({searchCnt: event.target.value});
        this.props.onFilterCnt(this.props.match.params.id ? this.props.match.params.id : 'private' , event.target.value)
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
                        placeholder={this.props.match.params.id === 'private' ? 'Enter Friend name ...' : 'Enter group name'}
                        onChange={this.filterInputHandler}
                        autoFocus
                        value={this.state.searchCnt}/>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        startSearch: state.cnt.startSearch
    };
 }

 const mapDispatchToProps = dispatch => {
    return {
        onCloseSearch: () => dispatch(actions.closeSearch()),
        onFilterCnt: (curTab, content) => dispatch(actions.filterCnt(curTab, content)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
    };
 }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));