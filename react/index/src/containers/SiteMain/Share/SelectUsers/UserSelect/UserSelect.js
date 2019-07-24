import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UserSelect.css';
import User from '../../../../../components/ShareContent/User/User';
import * as actions from '../../../../../store/actions/index';

class UserSelect extends Component {
    state = {
        users: null
    };

    removeSelectedUserHandler = (user) => {
        const userArray = this.state.users.filter(userObj => userObj.authorID === user.authorID)
        
        if (userArray.length > 0) {
            const updateUser = {...userArray[0]};
            const users = [...this.state.users];
            const updateUsers = users.filter(user => user.authorID !== updateUser.authorID);
            const updateUserSelect = this.props.userSelect.filter(user => user.authorID !== updateUser.authorID);
            this.props.onRemoveUser(updateUserSelect);
            this.props.onFilterUserSelect(null, updateUsers);
            this.setState({
                users: updateUsers
            });
            return
        }
    }

    componentDidMount() {
        this.setState({
            users: this.props.userSelect 
        });
    }

    componentDidUpdate() {
        if (this.props.filterUserSelect && this.state.users !== this.props.filterUserSelect) {
            this.setState({
                    users: this.props.filterUserSelect
            });
        }
    }

    render() {
        let users = "loading";

        if (this.state.users) {
            users = <User 
                content={this.state.users}
                selected={this.removeSelectedUserHandler}
                selectedUser={this.state.users}/>
        }

        return (
            <div className="reuse-share__user-select">
                <h4 className="reuse-share__user-select--title">
                <i className="fas fa-users icon icon__reuse-share--user"></i> User Selected
                </h4>
                {users}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSelect: state.share.userSelect,
        filterUserSelect: state.share.filterUserSelect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveUser: (users) => dispatch(actions.removeUser(users)),
        onFilterUserSelect: (filterContent, userSelect) => dispatch(
            actions.filterUserSelectInit(filterContent, userSelect))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSelect);