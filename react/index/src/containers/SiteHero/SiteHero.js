import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class SiteHero extends Component {
    render() {
        return (
            <div className="site-hero" onClick={this.props.onNavDefault}>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault())
    };
};
export default connect(null, mapDispatchToProps)(SiteHero); 