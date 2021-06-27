import React, { Component } from 'react';
import { StatusBar, View, Text, ScrollView, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { minWidth } from 'react-native-stylex/media-query';
import { tailwind, size } from 'tailwind';
import urischeme from 'urischeme';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';
import { Html5Entities } from 'html-entities';
  
import SafeAreaView from '../SafeArea/SafeArea';
import Container from '../Container/Container';
import * as actions from '../../../store/actions/index';
import Advert from  '../../Page/Advert/Advert';
import ErrorInfo from '../ErrorInfo/ErrorInfo';
import Avatar from '../Avatar/Avatar';
import AdMob from '../AdMob/AdMob';
import Href from '../Href/Href';

class NoBackground extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait'
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        if (!this.props.fetchCnt && (Platform.OS === 'web')) {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'advert', 'getAdvert');
        }
        if (!this.props.fetchFriend) {
            this.props.onFetchPage(0, this.props.settings.friendSidebarListLimit, 'users', 'getFriend');
        }
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentDidUpdate() {
        if (this.props.notificationPage) {
           this.props.navigation.navigate('NotificationPage', {page: this.props.notificationPage.page, cnt: this.props.notificationPage.cnt});
           this.props.onNotificationPageReset();
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'advert', 'getAdvert');
    }

    reloadFriendFetchHandler = () => {
        this.props.onFetchPage(this.props.fetchFriend ? this.props.fetchFriend.length : 0, this.props.settings.friendSidebarListLimit, 'users', 'getFriend');
    }
    
    openURIHandler = (type, uri) => {
        if (type === 'hashTag') {
            return this.props.navigation.push('HashSearch', {hashTag: uri})
        }
        urischeme(type, uri);
    }

    advertChatboxHandler = (pageID) => {
        this.props.navigation.push('CommentBox', {title: 'Comment', chatType: 'advertchat', page: 'advert', pageID, showReply: true})
    }

    navigationHandler = (page) => {
        this.props.navigation.navigate(page)
    }

    chatHandler = (cnt) => {
        this.props.navigation.push('ChatBox', {title: '', showHeaderImage: true,  chatType: 'userchat', page: 'users',
            pageID: cnt._id, showReply: false, info: {title: cnt.username, image: cnt.userImage, status: cnt.status, showStatus: true}});
    }

    mediaPreviewHandler = (cntID, media, startPage) => {
        this.props.navigation.push('MediaPreview', {showOption: false, page: 'advert', pageID: cntID, media, startPage});
    }

    loadMoreHandler = () => {
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'advert', 'getAdvert');
    }

    render() {
        const { styles } = this.props;
        const entities = new Html5Entities();
        let cnt = (
        <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : null]}>
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        </View>
        )
        let friend = cnt;

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            cnt = (
                <Advert
                    cnt={this.props.fetchCnt}
                    openURI={this.openURIHandler}
                    preview={this.mediaPreviewHandler}
                    enableLoadMore={this.props.loadMore}
                    start={this.props.fetchCntStart}
                    loadMore={this.loadMoreHandler}
                    advertChatbox={this.advertChatboxHandler}/>
            )
        }

        if (Platform.OS !== 'web') {
            cnt = (
                <View style={{height: '100%'}}>
                    <AdMob/>
                </View>
            )
        }

        if (this.props.fetchFriend && this.props.fetchFriend.friend.length > 0) {
            friend = (
                <View style={styles.friend}>
                    <Text style={{color: '#777'}}>Friends</Text>
                    <ScrollView style={{width: '100%'}} horizontal>
                        { this.props.fetchFriend.friend.map((user, index) => (
                        <Avatar key={index} 
                            userImage={user.userImage} 
                            iconSize={30}
                            imageSize={50}
                            style={[styles.friendImage, {left: index !== 0 ? -(index*8) : 'auto'}]}
                            onPress={() => this.chatHandler(user)}/> ))}
                    </ScrollView>
                    {(this.props.fetchFriend.friendTotal - this.props.fetchFriend.friend.length) ?
                    <Href title={`+${(this.props.fetchFriend.friendTotal - this.props.fetchFriend.friend.length)} other's`} 
                        style={styles.friendTotal} 
                        onPress={() => this.navigationHandler(this.state.viewMode === 'landscape' ? 'UsersWeb' : 'Users')}/>: null}
                </View>
            );
        }

        if (this.props.fetchFriend && this.props.fetchFriend.friend.length < 0) {
            friend = null;
        }

        if (this.props.fetchCntErr && !this.props.fetchCnt) {
            cnt = (
                <View style={styles.wrapper}>
                    <ErrorInfo 
                        header={null}
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFetchHandler}/>
                </View>
            )
        }

        if (this.props.fetchFriendErr && !this.props.fetchFriend) {
            friend = (
                <View style={styles.wrapper}>
                    <ErrorInfo 
                        header={null}
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFriendFetchHandler}/>
                </View>
            )
        }

        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar barStyle="light-content" backgroundColor="#437da3" />
                    {!this.props.children ?
                        <Container style={styles.container}>
                            <View style={[styles.contentWrapper]}>
                                <View style={styles.sideBarWrapper}>
                                    <ScrollView style={[styles.sideBar]} >
                                        {this.props.sideBar}
                                    </ScrollView>
                                </View>
                                <View style={styles.content}>
                                    {this.props.contentFetched ?
                                       <View style={styles.contentContainer}>
                                        {this.props.content}
                                        </View> :  this.props.content}
                                </View>
                                <View style={styles.instantChat}>
                                    <ScrollView>
                                        <View style={styles.advert}>
                                            { cnt }
                                        </View>
                                        <View style={{marginTop: 10, backgroundColor: this.props.settings.backgroundColor}}>
                                            { friend }
                                            {Platform.OS === 'web' ? <Text style={styles.copywrite}>{entities.decode('&copy;')} 2021, S LODGE24</Text> : null}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Container>
                    : this.props.children }
            </SafeAreaView>
        )
    }
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
       flex: 1,
       flexDirection: 'row',
       width: '100%',
       ...minWidth(size.sm, {marginTop: 10})
    },
    sideBarWrapper: {
        display: 'none',
        ...minWidth(size.md, tailwind('flex w-1/5')),
        ...minWidth(size.lg,  tailwind('flex w-1/6'))
    },
    sideBar: {
        position: 'absolute', 
        top: 0,
        bottom: 0, 
        right: 0, 
        left: 0 , 
        paddingLeft: 1,
        ...tailwind('pr-2 pb-2'),
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...minWidth(size.md, tailwind('w-3/5 pl-4 pr-4')),
        ...minWidth(size.lg,  tailwind('w-3/6')),
        flex: 1
    },
    contentContainer: {
        position: 'absolute', 
        top: 0,
        bottom: 0, 
        right: 0, 
        left: 0,
        ...minWidth(size.md, tailwind('pl-4 pr-4'))
    },
    instantChat: {
        display: 'none',
        ...minWidth(size.md, tailwind('flex w-1/5  pl-4')),
        ...minWidth(size.lg,  tailwind('w-2/6'))
    },
    advert: {
        height: 360
    },
    loaderCnt: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    friend: {
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#dcdbdc',
        borderWidth: 2
    },
    friendTotal: {
        color: '#777',
        marginTop: 10
    },
    copywrite: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 10,
        marginTop: 10,
        backgroundColor: '#dcdbdc',
        textAlign: 'center'
    }
}));


const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        fetchCntErr: state.sidebar.fetchAdvertError,
        fetchCntStart: state.sidebar.fetchAdvertStart,
        fetchCnt: state.sidebar.fetchAdvert,
        loadMore: state.sidebar.advertLoadMore,
        fetchFriendErr: state.sidebar.fetchFriendError,
        fetchFriendStart: state.sidebar.fetchFriendStart,
        fetchFriend: state.sidebar.fetchFriend,
        friendLoadMore: state.sidebar.friendLoadMore,
        notificationPage: state.header.notificationPage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchSidebarInit(start, limit, page, cntID, searchCnt)),
        onNotificationPageReset: () => dispatch(actions.headerNotificationPageReset())
    };
};

export default withStyles(useStyles)(withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(NoBackground)));