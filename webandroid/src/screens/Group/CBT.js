import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import urischeme from 'urischeme';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import CBTItem from '../../components/Page/CBT/CBT';
import PagePreview from '../../components/Page/Preview/Preview';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import SelectPicker from '../../components/UI/SelectPicker/SelectPicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import Instruction from '../../components/UI/Instruction/Instruction';

class CBT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            groupID: this.props.groupID,
            isFocused: false,
            pageID: null,
            pageCntID: null,
            showChatBox: null,
            showSearch: false,
            search: '',
            showOption: false,
            showSettings: false,
            showPagePreview: null,
            showSelectPicker: null,
            showSelectMarkPicker: null,
            allowedSelectPicker: null,
            examInstruction: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'cbt', 'getCBT')
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onPageReset();
            this.setState({ pageID: null, pageCntID: null, showChatBox: null,showSearch: false,search: '',showOption: false,showSettings: false,  showPagePreview: null,
            showSelectPicker: null, showSelectMarkPicker: null, allowedSelectPicker: null, examInstruction: null})
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
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'cbt', 'searchCBT', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'cbt', 'getCBT');
    }

    navigationHandler = (page, cntID) => {
        this.props.navigation.navigate(page);
    }

    closeModalHandler = () => {
        this.setState({pageCntID: null, showChatBox: null, pageID: null, showSharePicker: null, showPagePreview: null, 
                showSelectPicker: null, showSelectMarkPicker: null, allowedSelectPicker: false, examInstruction: null});
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
            this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'cbt', 'searchCBT', cnt);
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'cbt', 'getCBT');
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
        this.props.navigation.navigate('EditCBT', {cntID: id});
        this.setState({pageCntID: null});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    deletePageHandler = (id, start) => {
        this.props.onDeletePage(id, 'cbt', start, 'getOneAndDelete');
        this.setState({pageCntID: null});
    }

    deletePageResetHandler = () => {
        this.props.onDeletePageReset();
    }

    reportHandler = (pageID) => {
        this.props.navigation.navigate('AddReport', {navigationURI: this.state.viewMode === 'landscape' ? 'CBTWeb' : 'CBT', cntType: 'pageReport', page: 'cbt', pageID});
        this.setState({pageCntID: null});
    }

    shareHandler = (cnt, shareType) => {
        let updateCnt = {_id: cnt._id, content: cnt.content, media: cnt.media, tempFileID: cnt.tempFileID, authorID: cnt.authorID};
        if (shareType === 'Friends') {
            this.setState({showSharePicker: {cnt: updateCnt, shareType}})
        } else {
            this.setState({showActionSheet: {option: ['Friends', 'Groups', 'Chat Room'],
                icon: ['people-outline', 'chatbox-outline', 'chatbubble-ellipses-outline'],cnt: updateCnt}})
        }
        this.setState({pageCntID: null});
    }

    showRequestHandler = (pageID) => {
        this.setState({showSelectPicker: {selectType: 'cbtRequest', pageID}})
    }

    allowedUserHandler = (pageID) => {
        this.setState({allowedSelectPicker: {selectType: 'cbtRequest', pageID}})
    }

    pendingMarkHandler = (pageID) => {
        this.setState({showSelectMarkPicker: {selectType: 'pendingMark', pageID}})
    }

    markExamHandler = (mark, pageID) => {
        this.props.navigation.navigate('MarkExam', {mark, pageID,  cntID: 'getMarkinfo', 
        navigationURI: this.state.viewMode === 'landscape' ? 'CBTWeb' : 'CBT', getMarkID: 'markTheoryexam'})
    }

    requestHandler = (pageID) => {
        this.props.onPageReaction('cbt', pageID, 'setRequest');
    }

    takeExamHandler = (pageID, content) => {
        this.setState({examInstruction: {pageID, content}, pageCntID: pageID});
    }

    startExamHandler = () => {
        this.props.navigation.navigate('Exam', {pageID: this.state.pageCntID, 
            navigationURI: this.state.viewMode === 'landscape' ? 'CBTWeb' : 'CBT', cntID: 'getExam', getMarkID: 'markExam'});
    }

    cancelRequestHandler = (pageID) => {
        this.props.onPageReaction('cbt', pageID, 'cancelRequest');
    }

    mediaPreviewHandler = (cntID, media, page) => {
        this.setState({showPreview: { startPage: page, media, cntID}})
    }

    closePreviewHandler = () => {
        this.setState({showPreview: null})
    }

    saveMediaHandler = (mediaCnt) => {

    }

    pagePreviewHandler = (cnt) => {
        this.setState({showPagePreview: cnt})
    }

    chatHandler = (pageID, enableComment, enableDelete) => {
        this.setState({showChatBox: {enableComment, enableDelete}, pageID})
    }

    favoriteHandler = (pageID) => {
        this.props.onPageReaction('cbt', pageID, 'setFavorite');
    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            this.setState({showSharePicker: {shareType: this.state.showActionSheet.option[index],
                cnt: this.state.showActionSheet.cnt}, showActionSheet: false})
            return
        } else if (index === 1){
        } else if (index === 2) {
        } else if (index === 3){
        }
    };

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit,
                 'cbt', 'searchCBT', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'cbt', 'getCBT');
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

        let header = (
            this.state.viewMode === 'landscape' ? ( <DefaultHeader
                onPress={this.props.navigation.goBack}
                title="CBT"
                rightSideContent={(
                    <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                        <Ionicons name="ellipsis-vertical-outline" size={20} />
                    </Button>
                )}/>
            ) : null
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
            cnt = (
                <View style={styles.container}>
                    { header }
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <ScrollView 
                            style={styles.scroll}
                            showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                            <CBTItem
                                cnt={this.props.fetchCnt}
                                userID={this.props.userID}
                                openURI={this.openURIHandler}
                                pageCntID={this.state.pageCntID}
                                userProfile={this.userProfileHandler}
                                pagePreview={this.pagePreviewHandler}
                                edit={this.editHandler}
                                delete={this.deletePageHandler}
                                share={this.shareHandler}
                                report={this.reportHandler}
                                showUserOpt={this.showUserOptHandler}
                                showRequest={this.showRequestHandler}
                                mark={this.pendingMarkHandler}
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}
                                chat={this.chatHandler}
                                favorite={this.favoriteHandler}
                                request={this.requestHandler}
                                allowedUser={this.allowedUserHandler}
                                takeExam={this.takeExamHandler}
                                cancelRequest={this.cancelRequestHandler}
                                pageReaction={this.props.pageReaction}
                                closeModal={this.closeModalHandler}
                                enableLoadMore={this.props.loadMore}
                                start={this.props.fetchCntStart}
                                loadMore={this.loadMoreHandler}/>
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
                    { this.state.showPagePreview ? 
                        <PagePreview
                            showOption={false}
                            cnt={this.state.showPagePreview}
                            title="CBT"
                            userID={this.props.userID}
                            openURI={this.openURIHandler}
                            userProfile={this.userProfileHandler}
                            edit={this.editHandler}
                            share={this.shareHandler}
                            report={this.reportHandler}
                            openURI={this.openURIHandler}
                            closePagePreview={this.closeModalHandler}
                            showContent ={false} /> : null}
                   { this.state.showPreview ? 
                        <MediaPreview
                            showOption={false}
                            pageID={this.state.showPreview.cntID}
                            media={this.state.showPreview.media}
                            page="cbt"
                            startPage={this.state.showPreview.startPage}
                            closePreview={this.closePreviewHandler}
                            backgroundColor={this.props.settings.backgroundColor}/> : null}
                    { this.state.showChatBox ?
                        <CommentBox
                            title={'Result'}
                            chatType="cbtchat"
                            page="cbt"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply
                            enableComment={this.state.showChatBox.enableComment}
                            enableDelete={this.state.showChatBox.enableDelete}/> : null}
                    { this.state.showSharePicker ? 
                        <SharePicker
                            shareType={this.state.showSharePicker.shareType}
                            closeSharePicker={this.closeModalHandler}
                            cnt={this.state.showSharePicker.cnt}
                            shareUpdates={[{shareType: 'cbt', cntID: 'setShare', page: 'cbt', pageID: this.state.showSharePicker.cnt._id}]}
                            shareChat={false}
                            info="CBT shared successfully !"/> : null}
                    { this.state.showSelectPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Users allowed successfully !"
                            removeInfo="Users removed successfully !"
                            title="CBT Request"
                            page="cbt"
                            pageID={this.state.showSelectPicker.pageID}
                            cntID="getRequest"
                            searchID="searchRequest"
                            pageSetting="userPage"
                            leftButton={{title: 'Remove', action: 'setRejectuser'}}
                            rightButton={{title: 'Allow', action: 'setAllowuser'}}/> : null}
                    { this.state.showSelectMarkPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectMarkPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            title="Pending"
                            page="cbt"
                            pageID={this.state.showSelectMarkPicker.pageID}
                            cntID="getPendingmark"
                            searchID="searchPendingmark"
                            pageSetting="userPage"
                            markExam={this.markExamHandler}
                            showNote={false}/> : null}
                    {this.state.allowedSelectPicker ? 
                        <SelectPicker
                            selectType={this.state.allowedSelectPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            removeInfo="Users removed successfully !"
                            title="Allowed User"
                            page="cbt"
                            pageID={this.state.allowedSelectPicker.pageID}
                            cntID="getAlloweduser"
                            searchID="searchAlloweduser"
                            pageSetting="userPage"
                            leftButton={{title: 'Remove', action: 'removeAcceptuser'}}/> : null}
                    {this.state.examInstruction ? 
                        <Instruction 
                            title="Exam Instruction"
                            content={this.state.examInstruction.content}
                            openURI={this.openURIHandler}
                            closeInstruction={this.closeModalHandler}
                            button={[{title: 'Start', icon: {name: 'timer-outline'}, onPress: this.startExamHandler}]}/>: null}
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
                            info="Are you sure you want to delete this CBT"
                            closeModal={this.deletePageResetHandler}
                            button={[{title: 'Ok', onPress: () => this.deletePageHandler(this.props.deletePage.pageID, true), style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.deletePageResetHandler, style: styles.button}]}/> : null}
                    { this.props.deletePage && this.props.deletePage.start ? 
                        <AbsoluteFill style={{zIndex: 9999999}}/> : null}
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
                        det={`'${this.state.search}' does not match any CBT`}
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
                        name="timer"
                        size={40}
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No CBT found !!! </Text>
                            <View>
                                <Href title="create CBT" onPress={() => this.navigationHandler('AddCBT')} style={styles.href}/>
                            </View>
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
        fetchCntErr: state.page.fetchCBTError,
        fetchCntStart: state.page.fetchCBTStart,
        fetchCnt: state.page.fetchCBT,
        loadMore: state.page.loadMore,
        deletePageErr: state.page.deleteCBTError,
        deletePage: state.page.deleteCBT,
        pageReaction: state.page.pageReaction,
        pageReactionErr: state.page.pageReactionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onSearchCnt: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onDeletePage: (pageID, page, start, cntType) => dispatch(actions.deletePageInit(pageID, page, start, cntType)),
        onPageReset: () => dispatch(actions.pageReset()),
        onDeletePageReset: () => dispatch(actions.deletePageReset()),
        onFetchCntReset: () => dispatch(actions.fetchPageReset()),
        onPageReaction: (page, pageID, reactionType) => dispatch(actions.pageReactionInit(page, pageID, reactionType)),
        onPageReactionReset: () => dispatch(actions.pageReactionReset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CBT);