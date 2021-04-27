import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import urischeme from 'urischeme';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import Settings from '../../components/UI/Settings/Settings';
import { updateObject, checkValidity, checkUri } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import PagePreview from '../../components/Page/Preview/Preview';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import ChatBox from '../../components/UI/ChatBox/ChatBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import User from '../../components/Page/User/User';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            pageID: null,
            showChatBox: null,
            showSearch: false,
            search: '',
            showOption: false,
            showSettings: false,
            changeProfile: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'users', 'getUser')
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onPageReset();
            this.setState({ pageID: null,showChatBox: null,showSearch: false,search: '',showOption: false,showSettings: false,changeProfile: null})
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'users', 'searchUser', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'users', 'getUser');
    }

    closeModalHandler = () => {
        this.setState({showChatBox: null, changeProfile: null});
        if (this.state.changeProfile) {
            this.props.onPageReactionReset(this.state.changeProfile.pageID);
        }
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
        this.props.navigation.navigate('Profile', {userID: authorID})
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

        let header = (
            this.state.viewMode === 'landscape' ? (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    disableBackButton
                    title="Users"
                    rightSideContent={(
                        <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                            <Ionicons name="ellipsis-vertical-outline" size={20} />
                        </Button>
                    )}
                />
            ) : (
                <SearchHeader
                    title="Enter Name ...."
                    filterCnt={this.searchPageHandler}
                    editable
                    value={this.state.search}
                    disableBackButton
                />
            )
        );

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
                { header }
                <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : 
                        null]}>
                    <ActivityIndicator 
                        size="large"
                        animating
                        color="#437da3"/>
                </View>
                { options }
           </View>
        )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            let profile = this.props.pageReaction.length > 0 && this.state.changeProfile ? this.props.pageReaction.filter(id => id === this.state.changeProfile.pageID)[0] : null;
            cnt = (
                <View style={styles.container}>
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <ScrollView 
                            style={styles.scroll}
                            showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                            { header }
                            <View style={[styles.scroll, styles.scrollContainer]}>
                                <User
                                    cnt={this.props.fetchCnt}
                                    hideMessage={true}
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
                    { options }
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

        if (this.props.fetchCntErr && !this.props.fetchCnt) {
            cnt = (
                <View style={styles.wrapper}>
                    <ErrorInfo 
                        header={header}
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFetchHandler}/>
                    { options }
                </View>
            )
        }

      return (
        <NoBackground
            sideBar={(
                <>
                <Navigation 
                        color={this.props.settings.color}
                        backgroundColor={this.props.settings.backgroundColor}/>
                <CreateNavigation 
                    color={this.props.settings.color}
                    backgroundColor={this.props.settings.backgroundColor}/>
                </>
            )}
            content={ cnt }
            contentFetched={this.props.fetchCnt}>
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
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);