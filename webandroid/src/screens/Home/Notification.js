import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'ionicons';
import { useNavigation } from '@react-navigation/native';
import withComponent from 'withcomponent';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

import * as actions from '../../store/actions/index';
import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Notify from '../../components/Main/Notify/Notify';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import InfoBox from '../../components/UI/InfoBox/InfoBox';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            notification: null,
            notificationItem: [],
            fetched: false
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        this.setNotification();
        this.props.onPushNotification(this.props.settings.notificationLimit, this.props.settings.notification, '', Platform.OS);
    }

    componentDidUpdate() {
        this.setNotification();
    }

    componentWillUnmount() {
        if (this.props.navigation) {
            Dimensions.removeEventListener('change', this.updateStyle);
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    setNotification = () => {
        if (this.props.notification && (JSON.stringify(this.props.notification) !== JSON.stringify(this.state.notification))) {
            let notificationItem = [];
            for (let cnt in this.props.notification) {
                if (Array.isArray(this.props.notification[cnt])) {
                    notificationItem.push(...this.props.notification[cnt])
                }
            }
            this.setState({notification: this.props.notification, notificationItem, fetched: true});
        }
    }

    navigationHandler = (page, cnt) => {
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
        }
        if (page === 'userChat') {
            this.props.navigation.push('ChatBox', {title: '', showHeaderImage: true,  chatType: 'userchat', page: 'users',
                pageID: cnt.userID, showReply: false, info: {title: cnt.username, image: cnt.userImage, status: cnt.status, showStatus: true}});
        }
        if (page === 'advert') {
            this.props.navigation.push('Profile', {userID: cnt.userID});
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
        } 
        let notification = {...this.state.notification}
        let updatePageCnt = [];
        for (let cntItem of notification[page]) {
            if (cntItem._id === cnt._id) {
                updatePageCnt.push({...cnt, expiresIn: (new Date().getTime() + (1000*60*60*4))})
            } else {
                updatePageCnt.push({...cnt})
            }
        }
        notification[page] = updatePageCnt;
        AsyncStorage.setItem(Constants.manifest.extra.NOTIFICATION, JSON.stringify(notification));
        if (this.state.viewMode === 'landscape') {
            this.props.closeNotification();
        }
        this.props.onUpdateNotification(notification);
    }

    reloadFetchHandler = () => {
        this.props.onFetchNotify();
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        )

        if (this.state.fetched && this.state.notificationItem.length < 1) {
            cnt = (
                <InfoBox
                    det='No Notification found!'
                    name="notifications-outline"
                    size={40}
                    style={styles.textStyle} />
            );
        }

       
        if (this.state.notificationItem.length > 0){
            cnt = (
                <Wrapper
                    {...wrapperProps}
                    style={[styles.wrapper, this.state.viewMode === 'landscape' ? 
                    {backgroundColor: this.props.settings.backgroundColor} : null]}>
                    <ScrollView style={styles.scroll}>
                        <Notify
                            notify={this.state.notificationItem}
                            navigate={this.navigationHandler}/>
                    </ScrollView>
                </Wrapper>
            )
        }

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
        notification: state.header.notification,
        settings: state.settings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPushNotification: (limit, settings, token, platform, stateHistory) => dispatch(actions.headerPushNotificationInit(limit, settings, token, platform, stateHistory)),
        onUpdateNotification: (notification) => dispatch(actions.headerPushNotificationUpdate(notification))
    };
};

export default  withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(Notification));