import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
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
                <div className="site-main__content--wrapper">
                    <div class="site-main__content--tab">
                        <div class="site-main__content--tab__icn">
                            <i class="fas fa-heart icon icon__site-main__fav-main--header"></i>
                        </div>
                        Favorites
                        <span>255</span>
                    </div>
                    <Model />
                </div>
                { loaderCnt }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       showLoader: state.cnt.showLoader
    };
};

export default connect(mapStateToProps, null)(MainContent);