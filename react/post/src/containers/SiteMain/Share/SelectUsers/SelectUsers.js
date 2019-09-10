import React, { Component } from 'react';
import { connect } from 'react-redux';

import Users from './Users/Users';
import UserSelect from './UserSelect/UserSelect';

class SelectUsers extends Component {
    render() {
        let users = <Users />
        
        if (!this.props.viewAllUsers) {
            users = <UserSelect />
        }
        return users
    }
}

const mapStateToProps = state => {
   return {
    viewAllUsers: state.share.viewAllUsers  
   };
};

export default connect(mapStateToProps, null)(SelectUsers);