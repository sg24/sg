import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainContest.css';
import Contest from './Contest/Contest';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainContest extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/contest/mycontest')
    }
    
    addContestHandler = () => {
        this.props.history.push('/contest/add')
    }

    render() {
        return (
            <Aux>
                <div className="reuse-contest-filter">
                    <div className="reuse-contest-filter__wrapper">
                        <div 
                            className="reuse-contest-filter__que"
                            onClick={this.fetchCntHandler}>
                            My Contest
                            <div>{this.props.total}</div>
                        </div>
                        <div 
                            className="reuse-contest-filter__add"
                            onClick={this.addContestHandler}>
                            <div>
                                JOIN
                            </div>
                        </div>
                    </div>
                </div>
                <Contest />
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


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainContest));