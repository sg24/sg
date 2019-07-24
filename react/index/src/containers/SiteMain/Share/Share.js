import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Share.css';
import Input from './Input/Input';
import SelectUsers from './SelectUsers/SelectUsers';
import ShareOpt from './ShareOpt/ShareOpt';
import * as actions from '../../../store/actions/index';

class Share extends Component {
    closeShareHandler = () => {
        this.props.history.goBack()
    }

    componentWillUnmount() {
        this.props.onDefaultShareProps();
    }

    render() { 
        let share = (
            <div className="reuse-share">
                <div className="reuse-share__main-wrapper">
                    <div className="reuse-share__backdrop"  onClick={this.closeShareHandler}>
                    </div>
                    <div className="reuse-share__wrapper">  
                        <Input />
                        <SelectUsers />
                        <ShareOpt />
                    </div>
                </div>
            </div>
        );

        if (!this.props.shareID || !this.props.userID) {
            this.closeShareHandler();
            share = null
        };

        return share
    }
}

const mapStateToProps = state => {
    return {
        shareID: state.share.shareID,
        userID: state.auth.userID,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDefaultShareProps: () => dispatch(actions.defaultShareProps())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Share));