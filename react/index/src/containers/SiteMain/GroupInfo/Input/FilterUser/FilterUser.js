import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';

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
            className="reuse-share__tab--srch__input" 
            placeholder="search user...." 
            autoFocus
            onChange={this.filterContentHandler} 
            value={this.state.inputValue}/>
        )
    }
}

const mapSateToProps = state => {
    return {
        users: state.grp.users
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFilterUser: (users,filterContent) => dispatch(
                actions.filterGrpUserInit(users, filterContent))
    };
};


export default connect(mapSateToProps, mapDispatchToProps)(FilterUser); 