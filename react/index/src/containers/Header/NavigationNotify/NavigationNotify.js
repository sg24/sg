import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class NavigationNotify extends Component {

    render() {

        return (
            <div className="site-header__menu--notify">
                <div className="active__main active__main--header site-header__menu--notify__num">
                    <div>9</div>
                </div>
                <div className="site-header__menu--notify__icn"><i className="fas fa-bell icon icon__site-header--bell"></i></div>
                <div className="site-header__tool-tip site-header__tool-tip--notify">
                    Notifications
                </div>
                <div className="site-header__menu--notify__cnt">
                    <div className="site-header__menu--notify__cnt--set"><i className="fas fa-cogs icon icon__site-header--notify__set"></i></div>
                    <div className="site-header__menu--notify__cnt--det">
                        {/* {{> partialtrd}} */}
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationNotify);