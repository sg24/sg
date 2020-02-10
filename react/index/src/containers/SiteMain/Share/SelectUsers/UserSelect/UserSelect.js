import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './UserSelect.css';
import User from '../../../../../components/ShareContent/Users/Users';
import Loader from '../../../../../components/UI/Loader/Loader';
import * as actions from '../../../../../store/actions/index';

class UserSelect extends Component {
    state = {
        users: this.props.userSelect 
    };

    removeSelectedUserHandler = (user) => {
        const userArray = this.state.users.filter(userObj => userObj.id === user.id)
        
        if (userArray.length > 0) {
            const updateUser = {...userArray[0]};
            const users = [...this.state.users];
            const updateUsers = users.filter(user => user.id !== updateUser.id);
            const updateUserSelect = this.props.userSelect.filter(user => user.id !== updateUser.id);
            this.props.onRemoveUser(updateUserSelect);
            this.props.onFilterUserSelect(null, updateUsers);
            this.setState({
                users: updateUsers
            });
            return
        }
    }

    componentDidUpdate() {
        if (this.props.filterUserSelect && this.state.users !== this.props.filterUserSelect) {
            this.setState({
                    users: this.props.filterUserSelect
            });
        }
    }

    render() {
        let users = <Loader />;

        if (this.state.users) {
            users = <User 
                content={this.state.users}
                selected={this.removeSelectedUserHandler}
                selectedUser={this.state.users}/>
        }

        return (
            <div className="reuse-share__user-select">
                <h4 className="reuse-share__user-select--title">
                    <FontAwesomeIcon 
                        icon={['fas', 'users']} 
                        className="icon icon__reuse-share--user" /> 
                    User Selected
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