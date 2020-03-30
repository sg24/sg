import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import Main from './Main/Main';
import Nav from './Nav/Nav';
import ChatBox from './Main/ChatBox/ChatBox';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxs/Aux';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import Loader from '../../../components/UI/Loader/Loader';
import { socket } from '../../../shared/utility';
import ChatInput from './Main/ChatInput/ChatInput';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../components/UI/Modal/Modal';

const AsyncSearch = asyncComponent(() => {
    return import ('./Main/Search/Search');
});

const AsyncGroup = asyncComponent(() => {
    return import ('./Main/Groups/Groups');
});

const AsyncGroupInfo = asyncComponent(() => {
    return import ('./Main/GroupInfo/GroupInfo');
});

const AsyncUsers = asyncComponent(() => {
    return import ('./Main/Users/Users');
});

const AsyncVidRec = asyncComponent(() => {
    return import ('./Main/ChatInput/VideoRec/VideoRec');
});

const AsyncSnap = asyncComponent(() => {
    return import ('./Main/ChatInput/Snapshot/Snapshot');
});

class MainContent extends Component {
    state = {
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
        chatLimit: 300,
        err: null
    }

    componentDidMount() {
        let these = this;
        socket.on('connect', function(msg) {
            socket.emit('join',these.state.id, function(err) {
                these.props.onJoinErr(err)
            });
            socket.on('member', function(members){
                these.props.onFetchMember(members)
            })
            these.props.onConnect()
        });
        socket.on('disconnect', function(members){
            these.props.onDisconnect()
        })
        socket.on('typing', function(users){
            these.props.onUserTyping(users)
        })
        socket.on('newChat', function(chats){
            these.props.onNewChat(chats)
        })
        socket.on('allgroup', function(grps){
            these.props.onFetchGroup(grps)
        })
        socket.on('getGroupNotify', function(notifyCnt){
            these.props.onFetchGroupNotify(notifyCnt)
        })
        socket.on('chatRemoved', function(cnt){
            console.log(cnt)
            these.props.onRemoveChat(cnt)
        })

        socket.emit('setLastMsg', {}, function(err) {
            these.props.onTypingErr(err)
        })
        
        this.props.onFetchCnt(this.state.id, this.state.categ)
        // setInterval(() => {
        //     socket.emit('checkMember', null, function(err) {
        //         these.setState({err})
        //     })
        // }, 10000)
    }

    closeModelBackdropHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}`)
    }

    closeSelectedHandler = () => {
        this.props.onReleaseChat()
    }

    deleteChatHandler= () => {
        let these = this;
        socket.emit('deleteChat', this.props.chatSelected, function(err) {
            these.props.onTypingErr(err)
        })
    }

    editChatHandler = () => {
        this.props.onEditChat(this.props.chatSelected);
    }

    render() {
        let cnt = null
        let backdrop = null;
        let showSnapshot = this.props.location.search && (this.props.location.search.split('=')[1] === 'camera')
        let showVidCam = this.props.location.search && (this.props.location.search.split('=')[1] === 'videoCamera')
        let showSearch = this.props.location.search && (this.props.location.search.split('=')[1] === 'search')
        let showGroups = this.props.location.search && (this.props.location.search.split('=')[1] === 'groups');
        let showGroupInfo = this.props.location.search && (this.props.location.search.split('=')[1] === 'groupInfo')
        let showFriends = this.props.location.search && (this.props.location.search.split('=')[1] === 'friends')
        let chatOpt = null;

        if (this.props.chatSelected && this.props.chatSelected.length > 0) {
            chatOpt = (
                <div className="site-main__chat--opt__wrapper">
                    <div 
                        className="site-main__chat--opt__close"
                        onClick={this.closeSelectedHandler}>
                        <FontAwesomeIcon  icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                    </div>
                    <ul className="site-main__chat--opt">
                        <li 
                            onClick={this.deleteChatHandler}
                            className="site-main__chat--opt__del"><FontAwesomeIcon  icon={['far', 'trash-alt']} className="icon icon icon__site-main--chat__header--opt"/></li>
                        {/* <li 
                            onClick={this.editChatHandler}
                            className="site-main__chat--opt__edit"><FontAwesomeIcon  icon={['far', 'edit']} className="icon icon__site-main--chat__header--opt"/></li> */}
                        {/* <li className="site-main__chat--opt__fav"><FontAwesomeIcon  icon={['far', 'heart']} className="icon icon__site-main--chat__header--opt__fav"/></li>
                        <li className="site-main__chat--opt__share"><FontAwesomeIcon  icon={['fas', 'location-arrow']} className="icon icon icon__site-main--chat__header--opt"/></li> */}
                    </ul>
                    <div className="site-main__chat--opt__total">
                        { this.props.chatSelected.length }
                    </div>
                </div>
            )
        }
        if (this.props.showLoader) {
            cnt = <Loader
             main />
        }

        if (this.props.addBackdrop || this.props.userBackdrop || 
           showSnapshot || showVidCam ||this.props.emojiBackdrop || 
           showGroups || showGroupInfo || showFriends || this.props.showSideNav) {
            backdrop = (
                <div 
                    className="site-main__chat--overlay"
                    onClick={this.closeModelBackdropHandler}></div>
            )
        }

        if (!this.props.showLoader && this.props.cnts) {
            cnt = (
                <Aux>
                    <div className="site-main__chat--main">
                        { backdrop }
                        <div className="site-main__chat--main__wrapper">
                            <Main />
                            { chatOpt }
                            <ChatBox />
                            {showGroups ?
                                < AsyncGroup /> : null }
                            { showFriends ? 
                                <AsyncUsers/> : null }
                            { showGroupInfo ? 
                                <AsyncGroupInfo /> : null}
                            {showSearch ? 
                                <AsyncSearch /> : null}
                            {showVidCam ? 
                                <AsyncVidRec /> : null}
                            {showSnapshot ? 
                                <AsyncSnap /> : null}
                            <ChatInput />
                        </div>
                    </div>
                <Nav />
            </Aux>
            )
        }
        this.props.onFetchShareActive();
        return (
            <div className="site-main__chat">
                { this.props.cntErr || this.state.err ? 
                    <Backdrop 
                        component={ Modal }
                        close={this.closeModelBackdropHandler}
                        err={ this.props.cntErr } /> : null}
                { cnt }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        showLoader: state.cnt.showLoader,
        cnts: state.cnt.cnts,
        navCnt: state.cnt.navCnt,
        addBackdrop: state.cnt.addBackdrop,
        userBackdrop: state.cnt.userBackdrop,
        emojiBackdrop: state.cnt.emojiBackdrop,
        showSideNav: state.cnt.showSideNav,
        cntErr: state.cnt.cntErr,
        chatSelected: state.cnt.chatSelected
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onConnect: () => dispatch(actions.chatConnect()), 
        onDisconnect: () => dispatch(actions.chatDisconnect()), 
        onFetchCnt: (id, categ) => dispatch(actions.fetchCntInit(id, categ)),
        onFetchMember: (members) => dispatch(actions.fetchMember(members)),
        onJoinErr: (err) => dispatch(actions.fetchCntFail(err)) ,
        onUserTyping: (users) => dispatch(actions.userTyping(users)),
        onCloseBackdrop: () => dispatch(actions.closeBackdrop()),
        onFetchShareActive: (userID) => dispatch(actions.fetchShareactiveInit(userID)),
        onNewChat: (chat) => dispatch(actions.addNewChat(chat)),
        onFetchGroup: (grp) => dispatch(actions.fetchGroup(grp)),
        onFetchGroupNotify: (notifyCnt) => dispatch(actions.fetchGroupNotify(notifyCnt)),
        onReleaseChat: () => dispatch(actions.releaseChat()),
        onTypingErr: (err) => dispatch(actions.fetchCntFail(err)),
        onDeleteChat: (chat) => dispatch(actions.deleteChatInit(chat)),
        onRemoveChat: (cnt) => dispatch(actions.chatRemoved(cnt))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent)); 