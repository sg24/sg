import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainAdvert.css';
import Search from './Search/Search';
import Filter from './Filter/Filter';  
import Adverts from './Adverts/Adverts';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainAdvert extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    inputSearchHandler = () => {
        this.props.onShowSearch();
    }

    fetchCntHandler = () => {
        this.props.history.push('/advert/myadvert')
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-ads-filter">
                    <div className="reuse-ads-filter__wrapper">
                        <div 
                            className="reuse-ads-filter__srch"
                            onClick={this.inputSearchHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-ads-filter--srch" />
                        </div>
                        <Filter />
                        <div 
                            className="reuse-ads-filter__que"
                            onClick={this.fetchCntHandler}>
                            My Advert
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-ads-filter__add">
                            <a href="/add/advert">Add</a>
                        </div>
                    </div>
                    <Search />
                </div>
                <Adverts />
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


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainAdvert));