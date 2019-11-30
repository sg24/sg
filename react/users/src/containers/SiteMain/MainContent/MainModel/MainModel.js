import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './MainModel.css';
import Search from './Search/Search';
import Filter from './Filter/Filter';  
import Model from './Model/Model';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainModel extends Component {
    inputSearchHandler = () => {
        this.props.onShowSearch();
    }

    fetchCntHandler = () => {
        this.props.history.push('/users/student')
    }

    componentDidMount() {
        this.props.onFetchTotal();
    }

    render() {
        let teacher = null;
        if (this.props.status) {
            teacher = (
                <div 
                    className="reuse-user-filter__teach"
                    onClick={this.fetchCntHandler}>
                        My Student
                    <div>{this.props.total}</div>
                </div>
            );
        }

        return (
            <Aux>
                <Search />
                <div className="reuse-user-filter">
                    <div className="reuse-user-filter__wrapper">
                        <Filter />
                        { teacher }
                        <div 
                            className="reuse-user-filter__srch"
                            onClick={this.inputSearchHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-user-filter--srch" />
                        </div>
                    </div>
                </div>
                <Model />
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
     status: state.auth.status,
     total: state.filter.student
    };
 };

const mapDispatchToProps = dispatch => {
   return {
    onShowSearch: () => dispatch(actions.startSearch()),
    onFetchTotal: () => dispatch(actions.fetchTotalInit())
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(MainModel));