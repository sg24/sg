import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MainModel from './MainModel/MainModel'; 

class MainContent extends Component {
    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--no-tab-wrapper">
                    <Route path="/view/:categ/:id" exact  component={MainModel} />
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