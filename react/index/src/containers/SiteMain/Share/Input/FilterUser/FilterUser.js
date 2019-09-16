import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';

class FilterUser extends Component  {
    filterContentHandler = (event) => {
        this.props.onFilterUser(event.target.value);
    }

    componentDidMount() {
        this.props.onFilterUser('');
    }

    render() {
        return (
            <input 
            className="reuse-share__search--cnt" 
            placeholder="search user...." 
            autoFocus
            onChange={this.filterContentHandler} />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFilterUser: (filterContent) => dispatch(
                actions.filterUserInit(filterContent))
    };
};


export default connect(null, mapDispatchToProps)(FilterUser); 