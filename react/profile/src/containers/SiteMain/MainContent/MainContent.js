import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from '../../../components/UI/Loader/Loader';
import Model from './Model/Model';

class MainContent extends Component {
    render() {
        let loaderCnt = null;

        if (this.props.showLoader) {
            loaderCnt = (
                <div className="site-main__content--loader">
                    <Loader />
                </div>
            )
        }

        return (
            <div className="site-main__content">
                <div className="site-main__content--no-tab-wrapper">
                    <Model />
                    { loaderCnt }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       showLoader: state.cnt.showLoader,
       cntTotal: state.cnt.cntTotal
    };
};

export default connect(mapStateToProps, null)(MainContent);