import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainQue.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Qchats from './Qchats/Qchats';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainQue extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/question/myquestion')
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-que-filter">
                    <div className="reuse-que-filter__wrapper">
                        <Category />
                        <Filter />
                        <div 
                            className="reuse-que-filter__que"
                            onClick={this.fetchCntHandler}>
                            My Qchat 
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-que-filter__add">
                            <a href="/add/question">Add Qchat</a>
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