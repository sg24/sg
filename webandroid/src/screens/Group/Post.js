import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import urischeme from 'urischeme';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';

import FormElement from '../../components/UI/FormElement/FormElement';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import Settings from '../../components/UI/Settings/Settings';
import { updateObject, checkValidity, checkUri } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import VideoCamera from '../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../components/UI/EmojiPicker/EmojiPicker';
import LinkPreview from '../../components/UI/LinkPreview/LinkPreview';
import UploadPreview from '../../components/UI/UploadPreview/UploadPreview'
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import PostItem from '../../components/Page/Post/Post';
import PagePreview from '../../components/Page/Preview/Preview';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            groupID: this.props.groupID,
            pageCntID: null,
            showPreview: null,
            pageID: null,
            showChatBox: false,
            showActionSheet: null,
            showSearch: false,
            search: '',
            showOption: false,
            showSettings: false,
            showPagePreview: null,
            showAdvertChat: false
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        if (this.state.groupID) {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID);
        } else {
            this.props.navigation.navigate(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group');
        }
        
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'grouppost', 'searchPost', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID);
    }

    navigationHandler = (page, cntID={}) => {
        this.props.navigation.navigate(page, cntID);
    }

    closeModalHandler = () => {
        this.setState({pageCntID: null, showChatBox: false, pageID: null, showSharePicker: null, showPagePreview: null, showAdvertChat: false});
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
            this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'grouppost', 'searchPost', cnt);
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID);
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
        } else {
            this.setState({showActionSheet: {option: ['Friends', 'Groups', 'Chat Room'],
                icon: ['people-outline', 'chatbox-outline', 'chatbubble-ellipses-outline'],cnt: updateCnt}})
        }
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

    chatHandler = (pageID) => {
        this.setState({showChatBox: true, pageID})
    }

    advertChatboxHandler = (pageID) => {
        this.setState({showAdvertChat: true, pageID})
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
            return
        } else if (index === 1){
        } else if (index === 2) {
        } else if (index === 3){
        }
    };

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit,
                 'grouppost', 'searchPost', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'grouppost', 'getPost', this.state.groupID);
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
                    rightSideContent={(
                        <View style={{flexDirection: 'row'}}>
                            <Button style={styles.optionIcon} onPress={() => this.navigationHandler('AddGroupPost', {groupID: this.state.groupID})}>
                                <Ionicons name="pencil-outline" size={20} />
                                <Text style={styles.optionIconText}>Create Post</Text>
                            </Button>
                            <Button style={styles.optionIcon} onPress={() => this.optionHandler('search')}>
                                <Ionicons name="search-outline" size={20} />
                                <Text style={styles.optionIconText}>Search</Text>
                            </Button>
                        </View>
                    )}
                />
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
                    {/* <View style={styles.formContainer}>
                        <BoxShadow style={styles.formWrapper}>
                            <Button 
                                style={styles.buttonIcon}> 
                                <Ionicons name="camera-outline" size={22} />
                            </Button>
                            <Button 
                                style={styles.buttonIcon}> 
                                <Ionicons name="happy-outline" size={22} />
                            </Button>
                            <FormElement
                                onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                                autoCorrect
                                multiline
                                autoFocus
                                placeholder={"Write ...."}
                                value={this.state.formElement.content.value}
                                formWrapperStyle={styles.formWrapperStyle}
                                inputWrapperStyle={styles.formWrapperStyle}
                                style={styles.formElementInput}/>
                            <Button 
                                title="Add"
                                style={styles.addButton}
                                onPress={this.props.start ? null : this.submitHandler}
                                textStyle={styles.textStyle}
                                submitting={this.props.start}
                                loaderStyle="#fff"/>
                        </BoxShadow>
                    </View> */}
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <ScrollView 
                            style={styles.scroll}
                            showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                            <PostItem 
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
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}
                                chat={this.chatHandler}
                                favorite={this.favoriteHandler}
                                pageReaction={this.props.pageReaction}
                                closeModal={this.closeModalHandler}
                                enableLoadMore={this.props.loadMore}
                                start={this.props.fetchCntStart}
                                loadMore={this.loadMoreHandler}
                                advertChatbox={this.advertChatboxHandler} />
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
                            cnt={this.state.showPagePreview}
                            page="grouppost"
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
                            info="Post shared successfully !"/> : null}
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
                        det={`Searched text '${this.state.search}' does not match any post`}
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
                        name="chatbox"
                        size={40}
                        color="#437da3"
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No post found !!! </Text>
                            <View>
                                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Href title="create Post" onPress={() => this.navigationHandler('AddGroupPost', {groupID: this.state.groupID})} style={styles.href}/></Text>
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
    formContainer: {
        padding: 10,
        backgroundColor: '#dcdbdc'
    },
    formWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5
    },
    formWrapperStyle: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0,
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        fontSize: 18
    },
    buttonIcon: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#dcdbdc',
        borderRightWidth: 1,
        borderRadius: 0
    },
    addButton: {
        backgroundColor: '#437da3',
        color: '#fff',
        paddingHorizontal: 10,
        marginRight: 5
    },
    scroll: {
        width: '100%',
        paddingTop: 10
    },
    optionIcon: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginRight: 10,
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
        fetchCnt: state.page.fetchGroupPost,
        loadMore: state.page.loadMore,
        deletePageErr: state.page.deleteGroupPostError,
        deletePage: state.page.deleteGroupPost,
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

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(Post));