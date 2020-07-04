import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './MainModel.css';
import Search from './Search/Search';
import Filter from './Filter/Filter';  
import Model from './Model/Model';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/UI/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainModel extends Component {
    inputSearchHandler = () => {
        this.props.onShowSearch();
    }

    fetchCntHandler = () => {
        this.props.history.push('/users/friend')
    }

    componentDidMount() {
        this.props.onFetchTotal();
    }

    render() {
        let teacher = null;
        let loaderCnt = null;

        if (this.props.status) {
            teacher = (
                <div 
                    className="reuse-user-filter__teach"
                    onClick={this.fetchCntHandler}>
                        Friends
                    <div>{this.props.total}</div>
                </div>
            );
        }

        if (this.props.showLoader) {
            loaderCnt = (
                <div className="site-main__content--loader">
                    <Loader />
                </div>
            )
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
                { loaderCnt }
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
     status: state.auth.status,
     total: state.filter.student,
     showLoader: state.cnt.showLoader,
    };
 };

const mapDispatchToProps = dispatch => {
   return {
    onShowSearch: () => dispatch(actions.startSearch()),
    onFetchTotal: () => dispatch(actions.fetchTotalInit())
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(MainModel));