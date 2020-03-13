import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Users.css';
import User from '../../../../components/ShareContent/Users/Users';
import Loader from '../../../../components/UI/Loader/Loader';
import * as actions from '../../../../store/actions/index';
 
class Users extends Component {
    state = {
        users: []
    }

    componentDidUpdate() {
        if (this.props.filterUser && (JSON.stringify(this.state.users) !== JSON.stringify(this.props.filterUser))) {
            this.setState({users: this.props.filterUser})
        }

        if (!this.props.filterUser && (JSON.stringify(this.state.users) !== JSON.stringify(this.props.users))) {
            this.setState({users: this.props.users})
        }
    }

    changeCntHandler = (userID, categ, username, confirm) => {
        this.props.onChangeCnt(this.props.grpInfo._id, userID, categ, username, this.props.curTab, confirm)
    }

    render() {
        let users = <Loader />;

        if (this.state.users) {
            users = (
                <User 
                    content={this.state.users}
                    userOpt={this.props.userOpt}
                    curTab={this.props.curTab}
                    changeCnt={this.changeCntHandler}
                    disable={this.props.disable}/>
            );
        }

        return (
            <div className="reuse-share__all-users">
                { users }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.share.users,
        userOpt: state.share.userOpt,
        curTab: state.share.curTab,
        disable: state.share.disable,
        grpInfo: state.share.grpInfo,
        filterUser: state.share.filterUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeCnt: (id, userID, categ,  username, curTab, confirm) => dispatch(actions.changeCntInit(id, userID, categ, username, curTab, confirm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);