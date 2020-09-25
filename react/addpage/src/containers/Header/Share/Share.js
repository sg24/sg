import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Chat.css';
import * as actions from '../../../store/actions/index';
import Loader from '../../../components/UI/Loader/Loader';
import PrivateUsers from '../../../components/Main/Nav/PrivateUsers/PrivateUsers';
import GroupContents from '../../../components/Main/Nav/GroupContents/GroupContents';
import NoAcc from '../../../components/Main/NoAcc/NoAcc';

class Share extends Component {
    state = {
        show: false,
        showOpt: false,
        showCnt: false,
        default: false,
        categ: null
    };

    componentDidUpdate() {
        if ((this.state.showCnt || this.state.showOpt) && !this.state.default && this.props.default) {
            this.setState({
                default: true,
                show: false,
                showCnt: false,
                showOpt: false
            });
        }
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

    showOptHandler = () => {
        this.setState((prevState, props) => {
            return {
                showOpt: !prevState.showOpt,
                default: false,
                show: false,
                showCnt: false
            }
        })
        this.props.onShowChatDet()
    }

    showDetHandler = (categ) => {
        this.props.onFetchChatDet(categ)
        this.setState({showCnt: true, default: false, show: false, categ})
    }

   render() {
        let shareTipClass = ["site-header__tool-tip site-header__tool-tip--share"];
        let shareActiveCnt = null;
        let chatOpt = null;
        let cnt = null;
        let chatDet = null;

        if (this.props.navActive && this.props.navActive > 0) {
            shareActiveCnt = (
                <div className="active__main active__main--header">
                    <div>{this.props.navActive}</div>
                </div>
            );
        }

        if (this.state.show) {
            shareTipClass.push("site-header__tool-tip--share__visible")
        }

        if (this.state.showOpt) {
            chatOpt = (
                <ul className="site-header__chat">
                    <li
                        onClick={this.showDetHandler.bind(this, 'friends')}>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-friends']} 
                            className="icon icon__site-header--chat" /> Friends
                    </li>
                    <li
                        onClick={this.showDetHandler.bind(this, 'group')}>
                        <FontAwesomeIcon 
                            icon={['fas', 'users']} 
                            className="icon icon__site-header--chat" /> Groups
                    </li>
                </ul>
            )
        }

        if (!this.props.chatDetLoader && !this.props.chatDetErr && this.props.chatDet && this.props.chatDet.length > 0 && this.state.categ === 'friends') {
            chatDet = <PrivateUsers 
                        content={this.props.chatDet}/>
        }

        if (!this.props.chatDetLoader && !this.props.chatDetErr && this.props.chatDet && this.props.chatDet.length > 0 && this.state.categ === 'group') {
            chatDet = <GroupContents
                        content={this.props.chatDet}/>
        }

        if (!this.props.chatDetLoader && !this.props.chatDetErr && this.props.chatDet && this.props.chatDet.length < 1) {
            chatDet = <NoAcc 
                isAuth={this.props.status}
                det={`No ${this.state.categ} found!`}
                icn='users'
                filter/>
        }

        if (this.props.chatDetErr) {
            chatDet = (
                <div className="site-header__chat--err">
                    Network Error 
                </div>
            )
        }

        if (this.state.showCnt) {
            chatOpt = null;
            cnt = (
                <div className="site-header__chat--opt">
                    <div className="site-header__chat--opt--det">
                        {this.props.chatDetLoader ? <Loader/> : null}
                        {chatDet}
                    </div>
                </div>
            )
        }

        return (
            <div className="site-header__menu--share">
                <div 
                    className="site-header__menu--share__icn" 
                    onMouseEnter={this.showShareTipHandler}
                    onMouseLeave={this.hidShareTipHandler}
                    onClick={this.showOptHandler}>
                { shareActiveCnt }
                <FontAwesomeIcon 
                    icon={['fas', 'comment-alt']} 
                    className="icon icon__site-header--shares" />
                </div> 
                <div className={shareTipClass.join(' ')}>
                    Chat
                </div>
                { chatOpt }
                { cnt }
            </div>
        )
   }
};

const mapStateToProps = state => {
    return {
       shareActive: state.main.shareActive,
       chatDet: state.header.chatDet,
       chatDetErr: state.header.chatDetErr,
       chatDetLoader: state.header.chatDetLoader,
       navActive: state.main.navActive,
       status: state.auth.status,
       default: state.header.default
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchChatDet: (categ) => dispatch(actions.fetchChatDetInit(categ)),
        onShowChatDet: () => dispatch(actions.showChatDet())
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);