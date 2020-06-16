import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainQchat.css';
// import Category from './Category/Category';
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
    
    render() {
        return (
            <Aux>
                <div className="reuse-onlineque-filter">
                    <div className="reuse-onlineque-filter__wrapper">
                        {/* <Category /> */}
                        {/* <Filter /> */}
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
    onFetchTotal: () => dispatch(actions.fetchTotalInit())
   };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainQue));