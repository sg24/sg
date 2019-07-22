import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

class FilterUserSelect extends Component  {
    filterContentHandler = (event) => {
        this.props.onFilterUserSelect(
                event.target.value,
                this.props.userSelect);
    }

    componentDidMount() {
        this.props.onFilterUserSelect(null, this.props.userSelect);
    }

    render() {
        return (
            <input 
                className="reuse-share__search--cnt" 
                placeholder="search user selected...." 
                autoFocus
                onChange={this.filterContentHandler} />
        )
    }
}

const mapStateToProps = state => {
    return {
        userSelect: state.share.userSelect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFilterUserSelect: (filterContent, userSelect) => dispatch(
                actions.filterUserSelectInit(filterContent, userSelect))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FilterUserSelect);