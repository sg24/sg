import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainGrp.css';
import Search from './Search/Search';
// import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Groups from './Groups/Groups';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainGrp extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/group/mygroup')
    }
    
    inputSearchHandler = () => {
        this.props.onShowSearch();
    }

    render() {
        return (
            <Aux>
                <div className="reuse-grp-filter">
                    <div className="reuse-grp-filter__wrapper">
                        {/* <Category /> */}
                        <Filter />
                        <div 
                            className="reuse-grp-filter__grp"
                            onClick={this.fetchCntHandler}>
                            My Group 
                            <div>{this.props.total}</div>
                        </div>
                        <div 
                            className="reuse-grp-filter__srch"
                            onClick={this.inputSearchHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-grp-filter--srch" />
                        </div>
                    </div>
                    <Search />
                </div>
                <Groups />
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
    onShowSearch: () => dispatch(actions.startSearch()),
    onFetchTotal: () => dispatch(actions.fetchTotalInit())
   };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainGrp));