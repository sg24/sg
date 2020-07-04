import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainModel.css';
import Search from './Search/Search';
import Filter from './Filter/Filter';  
import Model from './Model/Model';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainModel extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    inputSearchHandler = () => {
        this.props.onShowSearch();
    }

    fetchCntHandler = () => {
        this.props.history.push('/poet/mypoet')
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-pwt-filter">
                    <div className="reuse-pwt-filter__wrapper">
                        <div 
                            className="reuse-pwt-filter__srch"
                            onClick={this.inputSearchHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-pwt-filter--srch" />
                        </div>
                        <Filter />
                        <div 
                            className="reuse-pwt-filter__pwt"
                            onClick={this.fetchCntHandler}>
                                Published
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-pwt-filter__add">
                            <a href="/add/poet">Add</a>
                        </div>
                    </div>
                    <Search />
                </div>
                <Model />
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
     total: state.filter.cnt
    };
 };

const mapDispatchToProps = dispatch => {
   return {
        onFetchTotal: () => dispatch(actions.fetchTotalInit()),
        onShowSearch: () => dispatch(actions.startSearch())
   };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainModel));