import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../../store/actions/index';

class FilterUser extends Component  {
    state = {
        value: ''
    };

    filterContentHandler = (event) => {
        this.props.onFilterUser(this.props.users, event.target.value);
        this.setState({value: event.target.value})
    }

    componentDidMount() {
        this.props.onFilterUser(this.props.users, '');
        this.props.onInputDefault();
    }

    componentDidUpdate() {
        if (this.props.defaultValue) {
            this.setState({value: ''});
            this.props.onInputDefault();
        }
    }

    render() {
        return (
            <input 
                type="search" 
                className="reuse-form__itm--tab__srch--input"
                autoFocus 
                placeholder="Enter username ..." 
                onChange={this.filterContentHandler}
                value={this.state.value}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.addPost.users,
        defaultValue: state.addPost.defaultValue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFilterUser: (users, filterContent) => dispatch(actions.filterUserInit(users, filterContent)),
        onInputDefault: () => dispatch(actions.inputDefaultValue())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FilterUser); 