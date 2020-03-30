import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../../store/actions/index';

class FilterUser extends Component  {
    state = {
        inputValue: ''
    };

    filterContentHandler = (event) => {
        this.setState({inputValue: event.target.value})
        this.props.onFilterUser(this.props.users, event.target.value);
    }

    render() {
        return (
            <input 
            className="site-main__chat--grp-info__srch--input" 
            placeholder="search user...." 
            autoFocus
            onChange={this.filterContentHandler} 
            value={this.state.inputValue}/>
        )
    }
}

const mapSateToProps = state => {
    return {
        users: state.groupInfo.users
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFilterUser: (users,filterContent) => dispatch(
                actions.filterMemberInit(users, filterContent))
    };
};


export default connect(mapSateToProps, mapDispatchToProps)(FilterUser); 