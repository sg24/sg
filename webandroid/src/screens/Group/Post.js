import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import urischeme from 'urischeme';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';
import Text, { translator } from 'text';

import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import PostItem from '../../components/Page/Post/Post';
import PagePreview from '../../components/Page/Preview/Preview';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import SelectPicker from '../../components/UI/SelectPicker/SelectPicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import Loader from '../../components/UI/Loader/Loader';

const TABPAGE = 'GROUPPREVIEW';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            groupID: this.props.groupID,
            isFocused: false,
            isPressed: false,
            pageCntID: null,
            showPreview: null,
            pageID: null,
            showChatBox: false,
            showActionSheet: null,
            showSearch: false,
            tabPage: TABPAGE,
            search: '',
            showOption: false,
            showSettings: false,
            showPagePreview: null,
            showSelectGroupPicker: null,
            showAdvertChat: false
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
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
            if (this.state.groupID) {
                // if (!this.props.fetchCnt || (this.props.fetchCnt && this.props.fetchCnt.length < 1)) {
                //     this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID, this.state.tabPage);
                // }
                this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID, this.state.tabPage);
            } else {
                this.props.navigation.navigate(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group');
            }
          return this.setState({isFocused: true});
        }
        if (this.props.tabPress && !this.state.isPressed) {
            if (this.props.fetchCnt && this.props.fetchCnt.length > 0 && !this.state.showSearch) {
                this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID, this.state.tabPage, this.props.fetchCnt[0]._id);
            }
            return this.setState({isPressed: true});
        }
        if (!this.props.tabPress && this.state.isPressed) {
            this.setState({isPressed: false});
        }
        if (!this.props.focus && this.state.isFocused) {
            this.setState({isFocused: false});
        }
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'grouppost', 'searchPost', JSON.stringify({search: this.state.search, groupID: this.state.groupID}), this.state.tabPage);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID, this.state.tabPage);
    }

    navigationHandler = (page, cntID={}) => {
        this.props.navigation.navigate(page, cntID);
    }

    closeModalHandler = () => {
        this.setState({pageCntID: null, showChatBox: false, pageID: null, showSharePicker: null, showPagePreview: null, showSelectGroupPicker: null, showAdvertChat: false});
    }

    openURIHandler = (type, uri) => {
        if (type === 'hashTag') {
            return this.props.navigation.navigate('HashSearch', {hashTag: uri})
        }
        urischeme(type, uri);
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
            this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'grouppost', 'searchPost', JSON.stringify({search: cnt, groupID: this.state.groupID}), this.state.tabPage);
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID, this.state.tabPage);
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

    editHandler = (id) => {
        this.props.navigation.navigate('EditGroupPost', {cntID: id});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    deletePageHandler = (id, start) => {
        this.props.onDeletePage(id, 'grouppost', start, 'getOneAndDelete');
        if (this.props.fetchCnt.length < 2) {
            this.loadMoreHandler();
        }
        this.setState({pageCntID: null});
    }

    deletePageResetHandler = () => {
        this.props.onDeletePageReset();
    }

    reportHandler = (pageID) => {
        this.props.navigation.navigate('AddReport', {navigationURI: this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group', cntType: 'pageReport', page: 'grouppost', pageID});
    }

    shareHandler = (cnt, shareType) => {
        let updateCnt = {_id: cnt._id, groupID: cnt.groupID};
        if (shareType === 'Friends') {
            this.setState({showSharePicker: {cnt: updateCnt, shareType}})
            // this.props.navigation.navigate('SharePicker', {shareType, cnt: updateCnt,
            //     shareUpdates: [{shareType: 'grouppost', cntID: 'setShare', page: 'grouppost', pageID: updateCnt._id}], shareChat: false,
            //     info: 'Post shared successfully'})
        } else {
            this.setState({showActionSheet: {option: ['Friends', 'Groups'],
                icon: ['people-outline', 'chatbubble-ellipses-outline', 'chatbox-outline'],cnt: updateCnt}})
        }
    }

    mediaPreviewHandler = (cntID, media, startPage) => {
        this.setState({showPreview: { startPage, media, cntID}})
        // this.props.navigation.navigate('MediaPreview', {showOption: cntID ? true : false, page: 'grouppost', pageID: cntID, media, startPage});
    }

    closePreviewHandler = () => {
        this.setState({showPreview: null})
    }

    saveMediaHandler = (mediaCnt) => {

    }

    pagePreviewHandler = (cnt) => {
        this.setState({showPagePreview: cnt})
        // let navigationURI = this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group';
        // this.props.navigation.navigate('PagePreview', {cnt, page: 'grouppost', groupID: this.state.groupID, navigationURI,
        //     navigationURIWeb: navigationURI, editPage: 'EditGroupPost',
        //     share: {shareType: 'grouppost', page: 'grouppost', pageID: cnt._id, shareChat: false,  info: 'Post shared successfully'}})
    }

    chatHandler = (pageID) => {
        this.setState({showChatBox: true, pageID})
        // this.props.navigation.navigate('CommentBox', {title: 'Comment', chatType: 'grouppostchat', page: 'grouppost', pageID, 
        //     showReply: true})
    }

    advertChatboxHandler = (pageID) => {
        this.setState({showAdvertChat: true, pageID})
        // this.props.navigation.navigate('CommentBox', {title: 'Comment', chatType: 'advertchat', page: 'advert', pageID, 
        //     showReply: true})
    }

    favoriteHandler = (pageID) => {
        this.props.onPageReaction('grouppost', pageID, 'setFavorite');
    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            this.setState({showSharePicker: {shareType: this.state.showActionSheet.option[index],
                cnt: this.state.showActionSheet.cnt}, showActionSheet: false})
            // this.props.navigation.navigate('SharePicker', {shareType: this.state.showActionSheet.option[index], cnt: this.state.showActionSheet.cnt,
            //     shareUpdates: [{shareType: 'grouppost', cntID: 'setShare', page: 'grouppost', pageID: this.state.showActionSheet.cnt._id}], shareChat: false,
            //     info: 'Post shared successfully'})
            return
        } else if (index === 1){
            this.setState({showSelectGroupPicker: {selectType: 'group', pageID: this.state.showActionSheet.cnt._id}, showActionSheet: false})
        } else if (index === 2) {
        } else if (index === 3){
        }
    };

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit,
                 'grouppost', 'searchPost', JSON.stringify({search: this.state.search, groupID: this.state.groupID}), this.state.tabPage);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID, this.state.tabPage);
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

        let header = (
            <DefaultHeader 
                onPress={() => this.props.navigation.goBack()}
                disableBackButton
                rightSideContent={(
                    <View style={{flexDirection: 'row'}}>
                        {this.props.enable ? 
                        <Button style={styles.optionIcon} onPress={() => this.navigationHandler('AddGroupPost', {groupID: this.state.groupID})}>
                            <Ionicons name="pencil-outline" size={20} />
                            <Text style={styles.optionIconText}>Create Post</Text>
                        </Button> : null}
                        <Button style={styles.optionIcon} onPress={() => this.optionHandler('search')}>
                            <Ionicons name="search-outline" size={20} />
                            <Text style={styles.optionIconText}>Search</Text>
                        </Button>
                    </View>
                )}
            />
        );

        if (this.state.showSearch) {
            header =  (
                <SearchHeader 
                    onPress={this.closeSearchHandler}
                    title="Search"
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
        //    <View style={styles.wrapper}>
        //         { header }
        //         <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : 
        //                 null]}>
        //             <ActivityIndicator 
        //                 size="large"
        //                 animating
        //                 color="#437da3"/>
        //         </View>
        //         { options }
        //    </View>
        <Loader header={header} options={options} page="post" />
        )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            cnt = (
                <View style={styles.container}>
                    { header }
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <View 
                            style={styles.scroll}>
                            <PostItem 
                                cnt={this.props.fetchCnt}
                                userID={this.props.userID}
                                viewMode={this.state.viewMode}
                                openURI={this.openURIHandler}
                                pageCntID={this.state.pageCntID}
                                userProfile={this.userProfileHandler}
                                pagePreview={this.pagePreviewHandler}
                                edit={this.editHandler}
                                delete={this.deletePageHandler}
                                share={this.shareHandler}
                                report={this.reportHandler}
                                showUserOpt={this.showUserOptHandler}
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}
                                chat={this.chatHandler}
                                favorite={this.favoriteHandler}
                                pageReaction={this.props.pageReaction}
                                closeModal={this.closeModalHandler}
                                enableLoadMore={this.props.loadMore}
                                start={this.props.fetchCntStart}
                                loadMore={this.loadMoreHandler}
                                advertChatbox={this.advertChatboxHandler}
                                loadMoreHandler={this.loadMoreHandler}
                                tabLoadMore={this.props.tabLoadMore} />
                        </View>
                    </Wrapper>
                    { options }
                    { this.props.deletePageErr ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onDeletePageReset}
                        button={[{title: 'Ok', onPress: this.props.onDeletePageReset, style: styles.button}]}/> : null}
                    { this.props.pageReactionErr ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onPageReactionReset}
                        button={[{title: 'Ok', onPress: this.props.onPageReactionReset, style: styles.button}]}/> : null}
                    { this.state.showPagePreview ? 
                        <PagePreview
                            cnt={this.state.showPagePreview}
                            page="grouppost"
                            pageID={this.state.showPagePreview._id}
                            groupID={this.state.groupID}
                            userID={this.props.userID}
                            openURI={this.openURIHandler}
                            userProfile={this.userProfileHandler}
                            edit={this.editHandler}
                            share={this.shareHandler}
                            report={this.reportHandler}
                            openURI={this.openURIHandler}
                            closePagePreview={this.closeModalHandler} /> : null}
                   { this.state.showPreview ? 
                        <MediaPreview
                            showOption={this.state.showPreview.cntID ? true : false}
                            pageID={this.state.showPreview.cntID}
                            media={this.state.showPreview.media}
                            page="grouppost"
                            startPage={this.state.showPreview.startPage}
                            closePreview={this.closePreviewHandler}
                            backgroundColor={this.props.settings.backgroundColor}/> : null}
                    { this.state.showChatBox ? 
                        <CommentBox
                            title="Comment"
                            chatType="grouppostchat"
                            page="grouppost"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply/> : null}
                    { this.state.showAdvertChat ? 
                        <CommentBox
                            title="Comment"
                            chatType="advertchat"
                            page="advert"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply/> : null}
                    { this.state.showSharePicker ? 
                        <SharePicker
                            shareType={this.state.showSharePicker.shareType}
                            closeSharePicker={this.closeModalHandler}
                            cnt={this.state.showSharePicker.cnt}
                            shareUpdates={[{shareType: 'grouppost', cntID: 'setShare', page: 'grouppost', pageID: this.state.showSharePicker.cnt._id}]}
                            shareChat={false}
                            info="Post shared successfully"/> : null}
                    { this.state.showSelectGroupPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectGroupPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Post Shared successfully"
                            confirmAllInfo="Are you sure, you want to share this post"
                            infoBox="Group"
                            iconName="paper-plane-outline"
                            title="Select"
                            page="group"
                            pageID={this.state.showSelectGroupPicker.pageID}
                            cntID="getMembergroup"
                            searchID="searchMemberGroup"
                            pageSetting="userPage"
                            rightButton={{title: 'Share', action: 'setShareGroup'}}
                            actionpage="grouppost"/> : null}
                    { this.state.showActionSheet ? 
                        <ActionSheet
                            options={this.state.showActionSheet.option}
                            icons={this.state.showActionSheet.icon}
                            bottonIndex={this.actionSheetHandler}
                            title={"Choose"}
                            showSeparator/>
                        : null}
                    { this.props.deletePage && !this.props.deletePage.start ?  
                        <NotificationModal
                            info="Are you sure you want to delete this post"
                            closeModal={this.deletePageResetHandler}
                            button={[{title: 'Ok', onPress: () => this.deletePageHandler(this.props.deletePage.pageID, true), style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.deletePageResetHandler, style: styles.button}]}/> : null}
                    { this.props.deletePage && this.props.deletePage.start ? 
                        <AbsoluteFill style={{zIndex: 9999999}}/> : null}
                    { this.props.fetchCntErr && this.props.fetchCnt ? 
                        <NotificationModal
                            info="Network Error"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.onFetchCntReset}
                            button={[{title: 'Ok', onPress: this.props.onFetchCntReset, style: styles.button}]}/> : null}
                </View>
            )
        }

        if (!this.props.fetchCntErr && (this.props.tabPage === this.state.tabPage) && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length > 1) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        det={`${translator('Searched text')} '${this.state.search}' ${translator('does not match any post')}`}
                        name="search"
                        size={40}
                        color="#333"
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}/>
                </View>
            )
        }

        if (!this.props.fetchCntErr && (this.props.tabPage === this.state.tabPage) && this.props.fetchCnt && this.props.fetchCnt.length < 1 && !this.state.showSearch) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        name="chatbox"
                        size={40}
                        color="#437da3"
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No post found </Text>
                            {this.props.enable ? 
                            <View>
                                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Href title="create Post" onPress={() => this.navigationHandler('AddGroupPost', {groupID: this.state.groupID})} style={styles.href}/></Text>
                            </View>: null }
                        </View>
                    </InfoBox>
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

      return cnt;
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
        flex: 1
    },
    optionIcon: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginLeft: 10,
        backgroundColor: '#e9ebf2',
        borderRadius: 99999
    },
    optionIconText: {
        marginLeft: 5
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
    href: {
        textDecorationLine: 'underline',
        fontSize: 16
    },
    infoTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        fetchCntErr: state.page.fetchGroupPostError,
        fetchCntStart: state.page.fetchGroupPostStart,
        fetchCnt: state.page.fetchGroupPost ? state.page.fetchGroupPost.filter(cnt => cnt.tabPage === TABPAGE) : null,
        tabLoadMore: state.page.tabLoadMore,
        tabPage: state.page.tabPage,
        loadMore: state.page.loadMore,
        deletePageErr: state.page.deleteGroupPostError,
        deletePage: state.page.deleteGroupPost,
        pageReaction: state.page.pageReaction,
        pageReactionErr: state.page.pageReactionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt, tabPage, pageID) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt, tabPage, pageID)),
        onSearchCnt: (start, limit, page, cntID, searchCnt, tabPage, pageID) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt, tabPage, pageID)),
        onDeletePage: (pageID, page, start, cntType) => dispatch(actions.deletePageInit(pageID, page, start, cntType)),
        onPageReset: () => dispatch(actions.pageReset()),
        onDeletePageReset: () => dispatch(actions.deletePageReset()),
        onFetchCntReset: () => dispatch(actions.fetchPageReset()),
        onPageReaction: (page, pageID, reactionType) => dispatch(actions.pageReactionInit(page, pageID, reactionType)),
        onPageReactionReset: () => dispatch(actions.pageReactionReset()),
    };
};

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(Post));