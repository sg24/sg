import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainModel.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Model from './Model/Model';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainModel extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/poet/mypoet')
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-pwt-filter">
                    <div className="reuse-pwt-filter__wrapper">
                        <Category />
                        <Filter />
                        <div 
                            className="reuse-pwt-filter__pwt"
                            onClick={this.fetchCntHandler}>
                            My Works
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-pwt-filter__add">
                            <a href="/add/poet">Add</a>
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
     total: state.filter.cnt
    };
 };

const mapDispatchToProps = dispatch => {
   return {
    onFetchTotal: () => dispatch(actions.fetchTotalInit())
   };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainModel));