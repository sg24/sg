import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';

import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import TabBarge from '../../components/UI/TabBarge/TabBarge';
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import ChatBox from '../../components/UI/ChatBox/ChatBox';
import User from '../../components/Page/User/User';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            isFocused: false,
            profileID: this.props.profileID,
            pageID: null,
            showChatBox: null,
            showSearch: false,
            search: '',
            showOption: false,
            showSettings: false,
            changeProfile: null
        }
    }

    componentDidMount() {
        this.screenFocused();
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentDidUpdate() {
        this.screenFocused();
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    screenFocused() {
        if (this.props.focus && !this.state.isFocused) {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'users', 'getFriendById', this.state.profileID)
            return this.setState({isFocused: true});
        }
        if (!this.props.focus && this.state.isFocused) {
            this.setState({isFocused: false});
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'users', 'searchUser', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'users', 'getFriendById');
    }

    closeModalHandler = () => {
        this.setState({showChatBox: null, changeProfile: null});
        if (this.state.changeProfile) {
            this.props.onPageReactionReset(this.state.changeProfile.pageID);
        }
    }

    navigationHandler = (page, cnt={}) => {
        this.props.navigation.navigate(page, cnt);
    }

    optionHandler = (action) => {
        if (action === 'search') {
            this.setState({showSearch: true, showOption: false});
        }

        if (action === 'settings') {
            this.setState({showSettings: true, showOption: false});
        }
    }

    searchPageHandler = (cnt) => {
        this.setState({search: cnt});
        if (cnt && cnt.length > 0) {
            return this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'users', 'searchUser', cnt);
        }
        if (!this.state.showSearch) {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'users', 'getUser');
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'users', 'getUser');
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption, showActionSheet: null
        }))
    }

    closeOptionHandler = () => {
        this.setState({showOption: false})
    }

    closeSettingsHandler = () => {
        this.setState({showSettings: false});
    }

    userProfileHandler = (authorID) => {
        this.props.navigation.push('Profile', {userID: authorID})
    }

    chatHandler = (cnt) => {
        this.setState({showChatBox: {info: {title: cnt.username, image: cnt.userImage, status: cnt.status, showStatus: true}}, pageID: cnt._id});
    }

    changeProfileHandler = (pageID, title, cntType, confirm, info) => {
        this.props.onPageReaction('users', pageID, cntType, {id: pageID}, 'patch', confirm);
        if (confirm) {
            return this.setState({changeProfile: null});
        }
        this.setState({changeProfile: {pageID, title, cntType, info, confirm}});
    }

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit,
                 'users', 'searchUser', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'users', 'getUser');
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}
        let selectProps = {
            animation: 'fade',
            notificationPage: 'userRequest',
            selectType: 'userRequest',
            info:'Users accepted successfully !',
            removeInfo: 'Users rejected successfully !',
            confirmAllInfo: 'Are you sure you want to accept this users',
            confirmInfo: 'Are you sure you want to accept this user',
            confirmAllRejInfo: 'Are you sure you want to reject this users',
            confirmRejInfo: 'Are you sure you want to reject this user',
            title: 'User Request',
            page: 'users',
            pageID:this.props.userID,
            cntID: 'getUserRequest',
            searchID: 'searchUserRequest',
            pageSetting: 'userPage',
            iconName: 'people',
            leftButton:{title: 'Reject', action: 'setRejectuser'},
            rightButton:{title: 'Accept', action: 'setAcceptuser'}
        };

        let header = null;

        if (this.state.showSearch) {
            header =  (
                <SearchHeader 
                    onPress={this.closeSearchHandler}
                    title="Search ...."
                    filterCnt={this.searchPageHandler}
                    value={this.state.search}
                    editable
                />
            );
        }

        let options = (
            <>
                { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                { this.state.showSettings ?
                    <Settings 
                        page="page"
                        closeSettings={this.closeSettingsHandler}/> : null}
            </>
        );

        let cnt = (
           <View style={styles.wrapper}>
                <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : 
                        null]}>
                    <ActivityIndicator 
                        size="large"
                        animating
                        color="#437da3"/>
                </View>
           </View>
        )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            let profile = this.props.pageReaction.length > 0 && this.state.changeProfile ? this.props.pageReaction.filter(id => id === this.state.changeProfile.pageID)[0] : null;
            cnt = (
                <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <Button style={styles.optionButton} onPress={() => this.navigationHandler('SelectPicker', {props: selectProps})}>
                            {/* <Ionicons name="pencil-outline" size={20} /> */}
                            <Text style={styles.optionIconText}>Friend Request</Text>
                            <TabBarge
                                onPress={() => this.navigationHandler('SelectPicker', {props: selectProps})}
                                notification={this.props.notification && this.props.notification['userRequest'] ? this.props.notification['userRequest'].length : 0}
                                style={styles.tabBarge}
                                textStyle={styles.tabBargeText}
                                disableZero/>
                        </Button>
                    </View>
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <ScrollView 
                            style={styles.scroll}
                            showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                            <View style={[styles.scroll, styles.scrollContainer]}>
                                <User
                                    cnt={this.props.fetchCnt}
                                    hideMessage={true}
                                    showProfileButton
                                    userID={this.props.userID}
                                    userProfile={this.userProfileHandler}
                                    closeModal={this.closeModalHandler}
                                    chat={this.chatHandler}
                                    changeProfile={this.changeProfileHandler}
                                    pageReaction={this.props.pageReaction}
                                    enableLoadMore={this.props.loadMore}
                                    start={this.props.fetchCntStart}
                                    loadMore={this.loadMoreHandler} />
                            </View>
                        </ScrollView>
                    </Wrapper>
                    { this.props.deletePageErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onDeletePageReset}
                        button={[{title: 'Ok', onPress: this.props.onDeletePageReset, style: styles.button}]}/> : null}
                    { this.props.pageReactionErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onPageReactionReset}
                        button={[{title: 'Ok', onPress: this.props.onPageReactionReset, style: styles.button}]}/> : null}
                    { this.state.showChatBox ? 
                        <ChatBox
                            title=""
                            showHeaderImage={true}
                            chatType="userchat"
                            page="users"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply={false}
                            info={this.state.showChatBox.info}
                            showProfile={() => this.userProfileHandler(this.state.pageID)}/> : null}
                    { profile && !profile.confirm ? 
                        <NotificationModal
                            info={this.state.changeProfile.info}
                            closeModal={this.closeModalHandler}
                            button={[{title: 'Ok', onPress: () => this.changeProfileHandler(this.state.changeProfile.pageID, this.state.changeProfile.title, this.state.changeProfile.cntType, true), 
                                style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.closeModalHandler, style: styles.button}]}/> : null}
                    { this.props.fetchCntErr && this.props.fetchCnt ? 
                        <NotificationModal
                            info="Network Error !"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.onFetchCntReset}
                            button={[{title: 'Ok', onPress: this.props.onFetchCntReset, style: styles.button}]}/> : null}
                </View>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length > 1) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        det={`'${this.state.search}' does not match any username`}
                        name="search"
                        size={40}
                        color="#333"
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}/>
                </View>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && !this.state.showSearch) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        name="person"
                        size={40}
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No friend found !!! </Text>
                        </View>
                    </InfoBox>
                </View>
            )
        }

        if (this.props.fetchCntErr && !this.props.fetchCnt) {
            cnt = (
                <View style={styles.wrapper}>
                    <ErrorInfo 
                        // header={header}
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFetchHandler}/>
                </View>
            )
        }

        let allCnt = (
            <View style={styles.wrapper}>
                { header }
                { cnt }
                { options }
            </View>
        )

      return allCnt;
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        flex: 1,
    },
    landscapeWrapper: {
        width: '100%'
    },
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    buttonCancel: {
        color: '#ff1600'
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        flex: 1
    },
    scroll: {
        width: '100%',
    },
    scrollContainer: {
        paddingHorizontal: 10,
        paddingTop: 10
    },
    optionIcon: {
        paddingVertical: 0
    },
    infoWrapper: {
        flex: 1
    },
    info: {
        fontSize: 18,
        marginBottom: 5
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    infoTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    optionButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#dcdbdc',
        borderRadius: 99999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBarge: {
        position: 'relative',
        top: 'auto',
        right: 'auto',
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 0,
        marginLeft: 10
    },
    tabBargeText: {
        fontSize: 15
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        notification: state.header.notification,
        fetchCntErr: state.page.fetchUserError,
        fetchCntStart: state.page.fetchUserStart,
        fetchCnt: state.page.fetchUser,
        loadMore: state.page.loadMore,
        pageReaction: state.page.pageReaction,
        pageReactionErr: state.page.pageReactionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onSearchCnt: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onPageReset: () => dispatch(actions.pageReset()),
        onFetchCntReset: () => dispatch(actions.fetchPageReset()),
        onPageReaction: (page, pageID, reactionType, cnt, uriMethod, confirm) => dispatch(actions.pageReactionInit(page, pageID, reactionType, cnt, uriMethod, confirm)),
        onPageReactionReset: (pageID) => dispatch(actions.pageReactionReset(pageID))
    };
};

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(Users));