import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Users.css';
import User from '../../../../../components/ShareContent/User/User';
import * as actions from '../../../../../store/actions/index';
 
class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        !this.props.userSelect ? this.props.onFetchUsers() : 
            this.setState({
                users: this.props.userSelect
            });
    }

    showSelectedUserHandler = (user) => {
        let userArray = this.state.users.filter(userDet => userDet.authorID === user.authorID)
        
        if (userArray.length > 0) {
            const updateUser = {...userArray[0]};
            const users = [...this.state.users];
            let updateUsers = users.filter(user => user.authorID !== updateUser.authorID)
            this.setState({
                users: updateUsers
            });
            return
        }

        this.setState(prevState => {
            return {
                users: prevState.users.concat(user)
            }
        })
    }

    render() {
        let users = "loading";

        this.props.onSelectUser(this.state.users);

        if (this.props.users) {
            users = (
                <div className="reuse-share__all-users">
                    <User 
                        content={this.props.users}
                        selected={this.showSelectedUserHandler}
                        selectedUser={this.state.users}/>
                </div>
            );
        }

        return users
    }
}

const mapStateToProps = state => {
    return {
        users: state.share.users,
        userSelect: state.share.userSelect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsersInit()),
        onSelectUser: (users) => dispatch(actions.userSelect(users))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);