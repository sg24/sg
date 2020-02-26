import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import MainModel from './MainModel/MainModel'; 

class MainContent extends Component {
    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--no-tab-wrapper">
                    <MainModel />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));