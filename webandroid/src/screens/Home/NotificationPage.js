import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';

class NotificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            page: this.props.route.params.page,
            cnt: this.props.route.params.cnt
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.state.page && this.state.cnt) {
                this.navigationHandler(this.state.page, this.state.cnt);
            } else {
                this.props.navigation.goBack();
            }
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onNotificationPageReset();
            this.setState({page: null, cnt: null})
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onNotificationPageReset();
        this._unsubscribe();
        this._unsubscribeBlur();
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = async (page, cnt) => {
        let notification = await AsyncStorage.getItem(Constants.manifest.extra.NOTIFICATION);
        notification = notification ? JSON.parse(notification) : {};
        let updatePageCnt = [];
        if (notification[page]) {
            for (let cntItem of notification[page]) {
                if (cntItem._id === cnt._id) {
                    updatePageCnt.push({...cnt, expiresIn: (new Date().getTime() + (1000*60*4))})
                } else {
                    updatePageCnt.push({...cnt})
                }
            }
            notification[page] = updatePageCnt;
            await AsyncStorage.setItem(Constants.manifest.extra.NOTIFICATION, JSON.stringify(notification))
            this.props.onUpdateNotification(notification);
        }
        if (page === 'post' || page === 'postShare' || page === 'question'  || page === 'questionShare' 
        || page === 'writeup'  || page === 'writeupShare' || page === 'feed'  || page === 'feedShare'
        || page === 'CBT'  || page === 'CBTShare' || page === 'Group Creation') {
            if (page.startsWith('post')) {
                this.props.navigation.push('PagePreview', {cnt, page: 'post', navigationURI: 'Home',
                    navigationURIWeb: 'HomeWeb', editPage: 'EditPost', share: {shareType: 'post', shareChat: false,  info: 'Post shared successfully !'}})
            }
            if (page.startsWith('question')) {
                this.props.navigation.push('PagePreview', {cnt, title: 'Question', page: 'question', navigationURI: 'Question',
                    navigationURIWeb: 'Question', editPage: 'EditQuestion', showOption: false, share: {shareType: 'question', shareChat: false,  info: 'Question shared successfully !'}})
            }
            if (page.startsWith('writeup')) {
                this.props.navigation.push('PagePreview', {cnt, title: 'Write Up', page: 'writeup', navigationURI: 'WriteUp',
                    navigationURIWeb: 'WriteUp', editPage: 'EditWriteUp', showOption: false, share: {shareType: 'writeup', shareChat: false,  info: 'Write Up shared successfully !'}})
            }
            if (page.startsWith('feed')) {
                this.props.navigation.push('PagePreview', {cnt, title: 'Feed', page: 'feed', navigationURI: 'Feed',
                    navigationURIWeb: 'Feed', editPage: 'EditFeed', share: {shareType: 'feed', shareChat: false,  info: 'Feed shared successfully !'}})
            }
            if (page.startsWith('CBT')) {
                this.props.navigation.push('PagePreview', {cnt, title: 'CBT', page: 'cbt', showOption: false, navigationURI: 'CBT',
                    navigationURIWeb: 'CBTWeb', editPage: 'EditCBT', showContent: false , share: {shareType: 'cbt', shareChat: false,  info: 'CBT shared successfully !'}})
            }
            if (page === 'Group Creation') {
                this.props.navigation.push('RoomInfo', {groupID: cnt._id});
            }
            return
        }
        if (page === 'groupRequest' || page === 'groupAccept' || page === 'groupReject' || page === 'groupPending' || page === 'groupMark'
            || page === 'groupUserRemove') {
            if (page === 'groupUserRemove'|| page === 'groupAccept' || page === 'groupReject' || page === 'groupMark') {
                this.props.navigation.push('RoomInfo', {groupID: cnt._id});
            }
            if (page === 'groupRequest') {
                let selectProps = {animation: 'fade', notificationPage: 'groupRequest', selectType: 'groupRequest',info: 'Users accepted successfully !', removeInfo: 'Users removed successfully !',
                confirmAllInfo: 'Are you sure you want to accept this users',confirmInfo: 'Are you sure you want to accept this user',title: 'Group Request',page: 'group',
                pageID: cnt._id,cntID: 'getRequest',searchID: 'searchRequest',pageSetting: 'userPage',iconName: 'chatbubble-ellipses',leftButton:{title: 'Remove', action: 'setRejectuser'},
                rightButton: {title: 'Accept', action: 'setAcceptuser'}}
                this.props.navigation.push('SelectPicker', {props: selectProps});
            }
            if (page === 'groupPending') {
                let selectProps = {animation: 'fade', notificationPage: 'groupPending', selectType: 'groupPendingapprove',info: 'Users accepted successfully !',removeInfo: 'Users removed successfully !',confirmAllInfo: 'Are you sure you want to accept this users',
                    confirmInfo: 'Are you sure you want to accept this user',title: 'Pending Approval',page: 'group',pageID: cnt._id,cntID: 'getPendingapprove',searchID: 'searchPendingapprove',pageSetting: 'userPage',
                    iconName: 'chatbubble-ellipses',leftButton: {title: 'Remove', action: 'setPendingrejectuser'},rightButton: {title: 'Accept', action: 'setPendingacceptuser'}
                }
                this.props.navigation.push('SelectPicker', {props: selectProps});
            }
            return;
        }
        if (page === 'chatRoomJoin' || page === 'chatRoomRequest' || page === 'chatRoomReject' || page === 'chatRoomPending' || page === 'chatRoomMark'
            || page === 'groupCbtRequest' || page === 'groupCbtAccept' || page === 'groupCbtReject' || page === 'groupCbtMark' || page === 'groupCbtResult') {
            if (page === 'groupCbtRequest') {
                let selectProps = {animation: 'fade', notificationPage: 'groupCbtRequest', selectType: 'cbtRequest',info: 'Users allowed successfully !', removeInfo: 'Users removed successfully !',
                title: 'CBT Request',page: 'groupcbt', pageID: cnt._id, cntID: 'getRequest',searchID: 'searchRequest',pageSetting: 'userPage',
                leftButton:{title: 'Remove', action: 'setRejectuser'},rightButton: {title: 'Allow', action: 'setAllowuser'}}
                this.props.navigation.push('SelectPicker', {props: selectProps});
            } else {
                this.props.navigation.push('RoomInfo', {groupID: cnt._id});
            }
            return
        }
        if (page === 'userChat') {
            return this.props.navigation.push('ChatBox', {title: '', showHeaderImage: true,  chatType: 'userchat', page: 'users',
                pageID: cnt.userID, showReply: false, info: {title: cnt.username, image: cnt.userImage, status: cnt.status, showStatus: true}});
        }
        if (page === 'advert') {
            return this.props.navigation.push('Profile', {userID: cnt.userID});
        }
        if (page === 'qchatRequest' || page === 'qchatAccept' || page === 'qchatReject' || page === 'qchatMark') {
            if (page === 'qchatAccept' || page === 'qchatReject' || page === 'qchatMark') {
                this.props.navigation.push(this.state.viewMode === 'landscape' ? 'CBTWeb' : 'CBT', {cntID: cnt._id});
            }
            if (page === 'qchatRequest') {
                let selectProps = { animation: 'fade', notificationPage: 'qchatRequest', selectType: 'cbtRequest',info: 'Users allowed successfully !', removeInfo: 'Users removed successfully !',
                title: 'CBT Request',page: 'cbt', pageID: cnt._id, cntID: 'getRequest',searchID: 'searchRequest',pageSetting: 'userPage',
                leftButton:{title: 'Remove', action: 'setRejectuser'},rightButton: {title: 'Allow', action: 'setAllowuser'}}
                this.props.navigation.push('SelectPicker', {props: selectProps});
            }
            return;
        }
        if (page === 'userRequest' || page === 'userAccept' || page === 'userReject'  || page === 'userUnfriend' || page === 'profileImage') {
            if (page === 'userRequest') {
                let selectProps = {
                    animation: 'fade', notificationPage: 'userRequest',
                    selectType: 'userRequest',info:'Users accepted successfully !',removeInfo: 'Users rejected successfully !',confirmAllInfo: 'Are you sure you want to accept this users',
                    confirmInfo: 'Are you sure you want to accept this user',confirmAllRejInfo: 'Are you sure you want to reject this users',confirmRejInfo: 'Are you sure you want to reject this user',title: 'User Request',
                    page: 'users',pageID:this.props.userID,cntID: 'getUserRequest',searchID: 'searchUserRequest',pageSetting: 'userPage',iconName: 'people',leftButton:{title: 'Reject', action: 'setRejectuser'},rightButton:{title: 'Accept', action: 'setAcceptuser'}};
                this.props.navigation.push('SelectPicker', {props: selectProps});
            } else {
                this.props.navigation.push('Profile', {userID: cnt.userID});
            }
            return
        }
        this.props.navigation.goBack();  
    }

    render() {
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        )

      return (
        <NoBackground>
            { cnt }
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    scroll: {
        width: '100%',
        padding: 10
    }
})

const mapStateToProps = state => {
    return {
        notificationPage: state.header.notificationPage,
        settings: state.settings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNotificationPageReset: () => dispatch(actions.headerNotificationPageReset()),
        onUpdateNotification: (notification) => dispatch(actions.headerPushNotificationUpdate(notification))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);