import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../store/actions/index';
import NotifyItems from '../../../components/Navigation/NotifyItems/NotifyItems';

class NavigationNotify extends Component {
    state = {
        show: false,
        showNotify: false,
        default: false
    };
    
    componentDidMount() {
        this.props.onFetchNotifyActive();
    }
    
    componentDidUpdate() {
        if (this.state.showNotify && !this.state.default && this.props.hidNotify) {
            this.setState({
                default: true,
                show: false,
                showNotify: false,
            });
        }
    }

    showNotifyTipHandler = () => {
        if (!this.state.showNotify) {
            this.setState({
                show: true
            });
        }
    }

    hidNotifyTipHandler = () => {
        this.setState({
            show: false
        });
    }

    fetchNotifyHandler = () => {
        this.props.onFetchNotify(this.props.userID);
        this.setState((prevState, props) => {
            return {
                show: false,
                default: false,
                showNotify: !prevState.showNotify
            }
        });
    }

    changeFavoriteHandler = (notifyID) => {
        this.props.onChangeFav(this.props.notify, notifyID)
    };

    render() {
        let notifyTipClass = ["site-header__tool-tip site-header__tool-tip--notify"];
        let notify = null;
        let notifyCntClass = ["site-header__menu--notify__cnt"];
        let notifyActiveCnt = null;

        if (this.props.notifyActive && this.props.notifyActive > 0) {
            notifyActiveCnt = (
                <div className="active__main active__main--header site-header__menu--notify__num">
                    <div>{ this.props.notifyActive }</div>
                </div>
            );
        }

        if (this.state.show) {
            notifyTipClass.push("site-header__tool-tip--notify__visible");
        }

        if (this.props.notify && this.state.showNotify) {
            notify = <NotifyItems 
                content={this.props.notify}
                fav={this.changeFavoriteHandler}/>
            notifyCntClass.push("site-header__menu--notify__cnt--visible");
            this.props.onDefaultNotifyactive();
        }

        return (
            <div className="site-header__menu--notify">
                {notifyActiveCnt}
                <div 
                    className="site-header__menu--notify__icn"
                    onMouseEnter={this.showNotifyTipHandler}
                    onMouseLeave={this.hidNotifyTipHandler}
                    onClick={this.fetchNotifyHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'bell']} 
                        className="icon icon__site-header--bell" />
                </div>
                <div className={notifyTipClass.join(' ')}>
                    Notifications
                </div>
                <div className={notifyCntClass.join(' ')}>
                    <div className="site-header__menu--notify__cnt--set">
                        <FontAwesomeIcon 
                            icon={['fas', 'cogs']} 
                            className="icon icon__site-header--notify__set" />
                    </div>
                    <div className="site-header__menu--notify__cnt--det">
                    <div className="reuse-trd">
                        <div className="reuse-trd__cnt reuse-trd__cnt--notify">
                        { notify }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        notify: state.header.notify,
        hidNotify: state.header.hidNotify,
        notifyActive: state.header.notifyActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onFetchNotify: (userID) => dispatch(actions.fetchNotifyInit(userID)),
       onChangeFav: (notify, notifyID) => dispatch(actions.changeFavNotifyInit(notify, notifyID)),
       onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
       onDefaultNotifyactive: () => dispatch(actions.defaultNotifyactiveInit())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationNotify);