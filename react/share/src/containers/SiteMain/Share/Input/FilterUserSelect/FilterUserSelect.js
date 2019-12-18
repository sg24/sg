import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';

class FilterUserSelect extends Component  {
    state = {
        inputValue: ''
    };

    filterContentHandler = (event) => {
        this.props.onFilterUserSelect(
                event.target.value,
                this.props.userSelect);
        this.setState({inputValue: event.target.value})
    }

    componentDidMount() {
        this.props.onFilterUserSelect('', this.props.userSelect);
    }

    render() {
        return (
            <input 
                className="reuse-share__search--cnt" 
                placeholder="search user selected...." 
                autoFocus
                onChange={this.filterContentHandler} 
                value={this.state.inputValue}/>
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