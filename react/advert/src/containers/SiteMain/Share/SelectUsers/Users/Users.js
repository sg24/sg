import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Users.css';
import User from '../../../../../components/ShareContent/Users/Users';
import Loader from '../../../../../components/UI/Loader/Loader';
import * as actions from '../../../../../store/actions/index';
 
class Users extends Component {
    state = {
        users: this.props.userSelect ? this.props.userSelect : []
    }

    componentDidMount() {
        this.props.onFetchUsers();
    }

    showSelectedUserHandler = (user) => {
        let userArray = this.state.users.filter(userDet => userDet.id === user.id)
        
        if (userArray.length > 0) {
            const updateUser = {...userArray[0]};
            const users = [...this.state.users];
            let updateUsers = users.filter(user => user.id !== updateUser.id)
            this.setState({
                users: updateUsers
            });
            this.props.onSelectUser(updateUsers)
            return
        }

        let newUser = this.state.users.concat(user);
        this.props.onSelectUser(newUser)
        this.setState(prevState => {
            return {
                users: newUser
            }
        })
    }

    render() {
        let users = <Loader />;

        if (this.props.users) {
            users = (
                <div className="reuse-share__all-users">
                    <User 
                        content={this.props.filterUser ? this.props.filterUser : this.props.users}
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
        userSelect: state.share.userSelect,
        filterUser: state.share.filterUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsersInit()),
        onSelectUser: (users) => dispatch(actions.userSelect(users))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);