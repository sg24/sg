import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';

class SiteMain extends Component {
    render() {
        return (
            <div className="site-main site-main__fm">
            <div className="wrapper__exmain">
                <MainContent />
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault())
    };
};

export default connect(null, mapDispatchToProps)(SiteMain); 