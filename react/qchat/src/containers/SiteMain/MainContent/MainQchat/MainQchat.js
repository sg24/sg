import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainQchat.css';
import Search from './Search/Search';
// import Filter from './Filter/Filter';  
import Qchats from './Qchats/Qchats';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainQue extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/qchat/myqchat')
    }

    inputSearchHandler = () => {
        this.props.onShowSearch();
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-onlineque-filter">
                    <div className="reuse-onlineque-filter__wrapper">
                        {/* <Category /> */}
                        <div 
                            className="reuse-onlineque-filter__srch"
                            onClick={this.inputSearchHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-filter--srch" />
                        </div>
                        <div 
                            className="reuse-onlineque-filter__que"
                            onClick={this.fetchCntHandler}>
                            My CBT
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-onlineque-filter__add">
                            <a href="/add/qchat">Add CBT</a>
                        </div>
                    </div>
                     <Search />
                </div>
                <Qchats />
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


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainQue));