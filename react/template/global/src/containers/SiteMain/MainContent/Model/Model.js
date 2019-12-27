import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import Users from '../../../../components/Main/Users/Users';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';

class Model extends Component {
    componentDidMount() {
        this.props.onFetchCnt();
    }

    render() {
        this.props.onFetchShareActive();
        this.props.onFetchNotifyActive();

        let cnt = <Loader />;
        
        if (this.props.cntErr) {
            cnt = null
        }

        // if (this.props.cnts ) {
        //     cnt = <Redirect to="/user" />
        // }
       
        if (this.props.cnts) {
            cnt = <Users 
                cnt={this.props.cnts}/>
        }

        return cnt
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        cnts: state.cnt.cnts,
        cntErr: state.cnt.cntErr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchCnt: (userID) => dispatch(actions.fetchCntInit(userID))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));