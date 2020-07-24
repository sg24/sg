import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MainAround.css';
import Aroundme from '../MainAround/Aroundme/Aroundme';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class MainAround extends Component {
    componentDidMount() {
        this.props.onFetchTotal()
    }

    fetchCntHandler = () => {
        this.props.history.push('/aroundme/mylocation')
    }
    
    addAroundmeHandler = () => {
        this.props.history.push('/aroundme/add')
    }

    render() {
        return (
            <Aux>
                 <div className="reuse-around-filter">
                    <div className="reuse-around-filter__wrapper">
                    <div className="reuse-around-filter__form" onClick={this.addAroundmeHandler}>
                        <textarea  className="reuse-around-filter__form--cnt" placeholder="Write something ..." disabled></textarea>
                    </div>
                    </div>
                </div>
                <Aroundme />
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


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(MainAround));