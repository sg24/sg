import React, { Component } from 'react';
import { StatusBar, View, ScrollView, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { minWidth } from 'react-native-stylex/media-query';
import { tailwind, size } from 'tailwind';
import urischeme from 'urischeme';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';

import SafeAreaView from '../SafeArea/SafeArea';
import Container from '../Container/Container';
import * as actions from '../../../store/actions/index';
import Advert from  '../../Page/Advert/Advert';
import ErrorInfo from '../ErrorInfo/ErrorInfo';

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
        if (!this.props.fetchCnt) {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'advert', 'getAdvert');
        }
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'advert', 'getAdvert', this.state.profileID);
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

    mediaPreviewHandler = (cntID, media, startPage) => {
        this.props.navigation.push('MediaPreview', {showOption: false, page: 'advert', pageID: cntID, media, startPage});
    }

    loadMoreHandler = () => {
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'advert', 'getAdvert');
    }

    render() {
        const { styles } = this.props;
        let cnt = (
        <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : null]}>
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        </View>
        )
        if (Platform.OS !== 'web') {
            cnt = (
                <View style={{height: 300}}>
                    <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-3611317424444370/5347321528" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds // true or false
                        onDidFailToReceiveAdWithError={this.bannerError} />
                </View>
            )
        }

        if ( this.props.fetchCnt && this.props.fetchCnt.length > 0) {
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
                                        <View>
                                            
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
        friendLoadMore: state.sidebar.friendLoadMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchSidebarInit(start, limit, page, cntID, searchCnt))
    };
};

export default withStyles(useStyles)(withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(NoBackground)));