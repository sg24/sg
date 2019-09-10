import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../store/actions/index';

class Share extends Component {
    state = {
        show: false
    };

    componentDidMount() {
        this.props.onFetchShareActive();
    }

    showShareTipHandler = () => {
        this.setState({
            show: true
        });
    };

    hidShareTipHandler = () => {
        this.setState({
            show: false
        });
    };


   render() {
        let shareTipClass = ["site-header__tool-tip site-header__tool-tip--share"];
        let shareActiveCnt = null;
    
        if (this.props.shareActive && this.props.shareActive > 0) {
            shareActiveCnt = (
                <div className="active__main active__main--header">
                    <div>{this.props.shareActive}</div>
                </div>
            );
        }

        if (this.state.show) {
            shareTipClass.push("site-header__tool-tip--share__visible")
        }

        return (
            <a 
                className="site-header__menu--share" 
                href="/acc/shared"
                onMouseEnter={this.showShareTipHandler}
                onMouseLeave={this.hidShareTipHandler}>
                { shareActiveCnt }
                <FontAwesomeIcon 
                    icon={['fas', 'location-arrow']} 
                    className="icon icon__site-header--shares" />
                <div className={shareTipClass.join(' ')}>
                    Shared with me
                </div>
            </a> 
        )
   }
};

const mapStateToProps = state => {
    return {
       shareActive: state.header.shareActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onFetchShareActive: () => dispatch(actions.fetchShareactiveInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);