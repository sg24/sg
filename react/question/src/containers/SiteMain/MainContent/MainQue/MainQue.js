import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainQue.css';
// import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Questions from './Questions/Questions';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';
import Search from './Search/Search';

class MainQue extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/question/myquestion')
    }

    inputSearchHandler = () => {
        this.props.onShowSearch();
    }
    
    render() {
        return (
            <Aux>
                <div className="reuse-que-filter">
                    <div className="reuse-que-filter__wrapper">
                        <div 
                            className="reuse-que-filter__srch"
                            onClick={this.inputSearchHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-filter--srch" />
                        </div>
                        <Filter />
                        <div 
                            className="reuse-que-filter__que"
                            onClick={this.fetchCntHandler}>
                            My Question 
                            <div>{this.props.total}</div>
                        </div>
                        <div className="reuse-que-filter__add">
                            <a href="/add/question">Add </a>
                        </div>
                    </div>
                    <Search />
                </div>
                <Questions />
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