import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FilterItems from '../../../../components/FilterItems/FilterItems';
import * as actions from '../../../../store/actions/index';

class Tags extends Component {
    state = {
        path: null
    };

    componentDidMount() {
        this.props.onFetchTags();
    }

    render() {
        let filter = null;

        if (this.props.tags) {
            filter = (
                <div className="reuse-tag">
                    <div className="reuse-tag__header">
                        <i className="fas fa-tags icon icon__reuse-tag--header"></i> Tags
                    </div>
                    <ul className="reuse-tag__cnt">
                        <FilterItems
                            path={this.props.path}
                            tags={this.props.tags}/>
                    </ul>
                </div>
            );
        }

        return filter;
    };
}

const mapStateToProps = state => {
    return {
        path: state.tags.path,
        tags: state.tags.tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTags: () => dispatch(actions.fetchTagsInit())
    };  
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tags));