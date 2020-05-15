import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainAdvert.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Adverts from './Adverts/Adverts';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainAdvert extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/advert/myadvert')
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-ads-filter">
                    <div className="reuse-ads-filter__wrapper">
                        <Category />
                        <Filter />
                        <div 
                            className="reuse-ads-filter__que"
                            onClick={this.fetchCntHandler}>
                            My Advert
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-ads-filter__add">
                            <a href="/add/advert">Add Advert</a>
                        </div>
                    </div>
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
    onFetchTotal: () => dispatch(actions.fetchTotalInit())
   };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainAdvert));