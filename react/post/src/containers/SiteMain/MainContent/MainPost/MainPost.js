import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainPost.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Posts from './Posts/Posts';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainPost extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/post/mypost')
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-pt-filter">
                    <div className="reuse-pt-filter__wrapper">
                        <Category />
                        <Filter />
                        <div 
                            className="reuse-pt-filter__pt"
                            onClick={this.fetchCntHandler}>
                            My Post 
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-pt-filter__add">
                            <a href="/add/post">Add </a>
                        </div>
                    </div>
                </div>
                <Posts />
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


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainPost));