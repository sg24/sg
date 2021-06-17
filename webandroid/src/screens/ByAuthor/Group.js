import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';
import urischeme from 'urischeme';
import Uridetect from 'uridetect';
import Constants from 'expo-constants';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';

import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Href from '../../components/UI/Href/Href';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import Group from '../../components/Page/Group/Group';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import SelectPicker from '../../components/UI/SelectPicker/SelectPicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import Instruction from '../../components/UI/Instruction/Instruction';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            isFocused: false,
            profileID: this.props.profileID,
            pageID: null,
            pageCntID: null,
            showSearch: false,
            search: '',
            showOption: false,
            showSettings: false,
            showSharePicker: null,
            showSelectPicker: null,
            showPendingSelectPicker: null,
            showSelectMarkPicker: null,
            examInstruction: null,
            pendingExam: null,
            showGroupRule: null,
            showGroupInfo: null
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
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'group', 'getByAuthor', this.state.profileID)
            return this.setState({isFocused: true});
        }
        if (!this.props.focus && this.state.isFocused) {
            this.setState({isFocused: false});
        }
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'group', 'searchGroup', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'group', 'getByAuthor', this.state.profileID);
    }

    navigationHandler = (page, cntID) => {
        this.props.navigation.navigate(page);
    }

    closeModalHandler = () => {
        if (this.state.pendingExam) {
            this.props.onPageReactionReset(this.state.pendingExam.pageID);
        }
        this.setState({pageCntID: null, pageID: null, showSharePicker: null, showSelectPicker: null, showPendingSelectPicker: null, showSelectMarkPicker: null, examInstruction: null, pendingExam: null,
            showGroupRule: null, showGroupInfo: null});
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
            this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'group', 'searchGroup', cnt);
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'group', 'getByAuthor', this.state.profileID);
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

    editHandler = (id) => {
        this.props.navigation.navigate('EditGroup', {cntID: id});
        this.setState({pageCntID: null});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    showRequestHandler = (pageID) => {
        this.setState({showSelectPicker: {selectType: 'groupRequest', pageID}})
    }

    showPendingAppoveHandler = (pageID) => {
        this.setState({showPendingSelectPicker: {selectType: 'groupPendingapprove', pageID}})
    }

    pendingMarkHandler = (pageID) => {
        this.setState({showSelectMarkPicker: {selectType: 'pendingMark', pageID}})
    }

    markExamHandler = (mark, pageID) => {
        this.props.navigation.navigate('MarkExam', {mark, pageID, cntID: 'getMarkGroupinfo', enableShare: false,
            navigationURI: Platform.OS === 'web' ? 'GroupWeb' :'Group', getMarkID: 'markGroupTheoryexam',
            infoPassed: 'User have been added to group !', infoFailed: 'Score is below the pass mark', infoPending: 'User have been added to pending approval page',
            buttonPassed: [{title: 'Chat', icon: {name: 'chatbox-ellipses-outline'}, onPress: { URI: 'GroupPreview',  params: {pageID}}}],
            buttonPending: [{title: 'Accept', pageReaction: {page: 'exam', pageID, cntType: 'setGroupacceptuser', info: 'Are you sure you want to accept this user'}},
            {title: 'Remove', icon: {name: 'close', color: '#333'},
                pageReaction: {page: 'exam', pageID, cntType: 'setGrouprejectuser', info: 'Are you sure you want to remove this user'}, 
                style: styles.removeButton, textStyle: styles.removeButtonText}]});
    }

    enterGroupHandler = (pageID) => {
        this.props.navigation.navigate('GroupPreview', {pageID});   
    }

    requestHandler = (pageID, cnt, isPublic, isEnableRule, isEnableCbt) => {
        if (isPublic && !isEnableCbt && !isEnableRule) {
          return  this.joinGroupHandler(pageID);
        }
        if (isEnableRule) {
            this.setState({showGroupRule: {content: cnt.content, 
                button: isPublic && !isEnableCbt ? {title: 'Join', onPress: () => this.joinGroupHandler(pageID)} :
                isEnableCbt ? {title: 'Take Exam', onPress: this.startExamHandler} :    
                {title: 'Request', onPress: () => this.sendRequestHandler(pageID)}}, pageID});
            return 
        }
        if (!isPublic && !isEnableCbt) {
            return this.sendRequestHandler(pageID)
        }
        if (isEnableCbt) {
            this.setState({examInstruction: {...cnt, pageID, enableContent: true}, pageID})
        }
    }

    joinGroupHandler = (pageID) => {
        this.props.onPageReaction('group', pageID, 'setJoin');
    }

    startExamHandler = () => {
        this.props.navigation.navigate('Exam', {pageID: this.state.pageID, navigationURI: this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group', enableShare: false, cntID: 'getGroupexam', 
        getMarkID: 'markGroupExam', infoPassed: 'You are now a member !', infoFailed: 'Your score is below the pass mark', infoPending: 'Your score have been sent to admin',
        buttonPassed: [{title: 'Chat', icon: {name: 'chatbox-ellipses-outline'}, onPress: { URI: 'GroupPreview',  params: {pageID: this.state.pageID}}}]});
    }

    sendRequestHandler = (pageID) => {
        this.props.onPageReaction('group', pageID, 'setRequest');
    }

    cancelRequestHandler = (pageID) => {
        this.props.onPageReaction('group', pageID, 'cancelRequest');
    }

    cancelExamHandler = (pageID, title, cntType, confirm, info) => {
        this.props.onPageReaction('group', pageID, cntType, {pageID}, 'post', confirm);
        if (confirm) {
            return this.setState({pendingExam: null});
        }
        this.setState({pendingExam: {pageID, title, cntType, info, confirm}});
    }

    deletePageHandler = (id, start) => {
        this.props.onDeletePage(id, 'group', start, 'getOneAndDelete');
        this.setState({pageCntID: null});
    }

    deletePageResetHandler = () => {
        this.props.onDeletePageReset();
    }

    reportHandler = (pageID) => {
        this.props.navigation.navigate('AddReport', {navigationURI: this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group', cntType: 'pageReport', page: 'group', pageID});
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

    mediaPreviewHandler = (cntID, media, startPage) => {
        this.props.navigation.navigate('MediaPreview', {showOption: false, page: 'group', pageID: cntID, media, startPage});
    }

    saveMediaHandler = (mediaCnt) => {

    }

    favoriteHandler = (pageID) => {
        this.props.onPageReaction('group', pageID, 'setFavorite');
    }

    showGroupInfoHandler = (pageID, title, media) => {
        let mediaInfo = media.filter(cnt => cnt.bucket === 'image')[0];
        this.setState({showGroupInfo: {selectType: 'member',title, media: mediaInfo || {}}, pageID})
    }

    advertChatboxHandler = (pageID) => {
        this.props.navigation.navigate('CommentBox', {title: 'Comment', chatType: 'advertchat', page: 'advert', pageID, showReply: true})
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
                 'group', 'searchGroup', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'group', 'getByAuthor', this.state.profileID);
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

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
            let pendingExam = this.props.pageReaction.length > 0 && this.state.pendingExam ? this.props.pageReaction.filter(id => id === this.state.pendingExam.pageID)[0] : null;
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
                            <Group
                                cnt={this.props.fetchCnt}
                                userID={this.props.userID}
                                openURI={this.openURIHandler}
                                pageCntID={this.state.pageCntID}
                                userProfile={this.userProfileHandler}
                                showGroupInfo={this.showGroupInfoHandler}
                                edit={this.editHandler}
                                delete={this.deletePageHandler}
                                share={this.shareHandler}
                                report={this.reportHandler}
                                showUserOpt={this.showUserOptHandler}
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}
                                favorite={this.favoriteHandler}
                                enterGroup={this.enterGroupHandler}
                                showRequest={this.showRequestHandler}
                                showPendingAppove={this.showPendingAppoveHandler}
                                mark={this.pendingMarkHandler}
                                request={this.requestHandler}
                                cancelRequest={this.cancelRequestHandler}
                                cancelApprove={this.cancelExamHandler}
                                cancelMark={this.cancelExamHandler}
                                pageReaction={this.props.pageReaction}
                                closeModal={this.closeModalHandler}
                                enableLoadMore={this.props.loadMore}
                                start={this.props.fetchCntStart}
                                loadMore={this.loadMoreHandler}
                                advertChatbox={this.advertChatboxHandler}/>
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
                    { this.state.showSharePicker ? 
                        <SharePicker
                            shareType={this.state.showSharePicker.shareType}
                            closeSharePicker={this.closeModalHandler}
                            cnt={this.state.showSharePicker.cnt}
                            shareUpdates={[{shareType: 'group', cntID: 'setShare', page: 'group', pageID: this.state.showSharePicker.cnt._id}]}
                            shareChat={false}
                            info="Group shared successfully !"/> : null}
                    { this.state.showSelectPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Users accepted successfully !"
                            removeInfo="Users removed successfully !"
                            confirmAllInfo="Are you sure you want to accept this users"
                            confirmInfo="Are you sure you want to accept this user"
                            title="Group Request"
                            page="group"
                            pageID={this.state.showSelectPicker.pageID}
                            cntID="getRequest"
                            searchID="searchRequest"
                            pageSetting="userPage"
                            iconName="chatbubble-ellipses"
                            leftButton={{title: 'Remove', action: 'setRejectuser'}}
                            rightButton={{title: 'Accept', action: 'setAcceptuser'}}/> : null}
                    { this.state.showPendingSelectPicker ? 
                        <SelectPicker
                            selectType={this.state.showPendingSelectPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Users accepted successfully !"
                            removeInfo="Users removed successfully !"
                            confirmAllInfo="Are you sure you want to accept this users"
                            confirmInfo="Are you sure you want to accept this user"
                            title="Pending Approval"
                            page="group"
                            pageID={this.state.showPendingSelectPicker.pageID}
                            cntID="getPendingapprove"
                            searchID="searchPendingapprove"
                            pageSetting="userPage"
                            iconName="chatbubble-ellipses"
                            leftButton={{title: 'Remove', action: 'setPendingrejectuser'}}
                            rightButton={{title: 'Accept', action: 'setPendingacceptuser'}}/> : null}
                    { this.state.showSelectMarkPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectMarkPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            title="Pending"
                            page="group"
                            pageID={this.state.showSelectMarkPicker.pageID}
                            cntID="getPendingmark"
                            searchID="searchPendingmark"
                            pageSetting="userPage"
                            iconName="chatbubble-ellipses"
                            markExam={this.markExamHandler}
                            showNote={false}/> : null}
                    { this.state.showGroupInfo ? 
                        <SelectPicker
                            selectType={this.state.showGroupInfo.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            title="Group Information"
                            page="group"
                            cntID="getGroupinfo"
                            pageID={this.state.pageID}
                            pageSetting="userPage"
                            showNote={false}
                            enableSearch={false}>
                            <View>
                                <ImageBackground 
                                    source={{uri: `${Constants.manifest.extra.BASE_URL}media/${this.state.showGroupInfo.media.bucket}/${this.state.showGroupInfo.media.id}`}} 
                                    style={styles.groupInfo}
                                    resizeMode="cover">
                                    <Uridetect
                                        onPress={this.openURIHandler} 
                                        style={styles.groupInfoText} 
                                        content={this.state.showGroupInfo.title}/>
                                </ImageBackground>
                                <BoxShadow style={{backgroundColor: '#dcdbdc', padding: 10}}>
                                    <Text style={styles.textStyle}>Members</Text>
                                </BoxShadow>
                            </View>
                        </SelectPicker> : null}
                    {this.state.showGroupRule ? 
                        <Instruction 
                            pageID={this.state.pageID}
                            title="Group Purpose / Rule"
                            content={this.state.showGroupRule.content}
                            openURI={this.openURIHandler}
                            closeInstruction={this.closeModalHandler}
                            button={[this.state.showGroupRule.button]}
                            enablePageReaction
                            pageReaction={this.props.pageReaction}
                            pageReactionErr={this.props.pageReactionErr}
                            pageReactionReset={this.props.onPageReactionReset} />: null}
                    {this.state.examInstruction ? 
                        <Instruction 
                            title="Exam Instruction"
                            openURI={this.openURIHandler}
                            content={this.state.examInstruction.enableContent ? "You need to need to take exam to join this Group" : null}
                            textStyle={styles.note}
                            closeInstruction={this.closeModalHandler}
                            button={[{title: 'Start', icon: {name: 'timer-outline'}, onPress: this.startExamHandler}]}>
                                <View style={styles.instruction}>
                                    { this.state.examInstruction.autoJoin ? <Text style={[styles.textStyle]}>Pass Mark: <Text style={styles.instructionText}>{ this.state.examInstruction.passMark }%</Text></Text> : null}
                                    <Text style={[styles.textStyle, styles.contentText]}>Total: <Text style={styles.instructionText}>{ this.state.examInstruction.qchatTotal } Questions</Text></Text>
                                    <Text style={[styles.textStyle]}>Duration: 
                                        <Text style={styles.instructionText}>
                                            {`${this.state.examInstruction.hour} hour ${this.state.examInstruction.minute} minute ${this.state.examInstruction.second} second`}</Text></Text>
                                </View>
                        </Instruction>: null}
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
                            info="Are you sure you want to delete this group"
                            closeModal={this.deletePageResetHandler}
                            button={[{title: 'Ok', onPress: () => this.deletePageHandler(this.props.deletePage.pageID, true), style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.deletePageResetHandler, style: styles.button}]}/> : null}
                    { pendingExam && !pendingExam.confirm ? 
                        <NotificationModal
                            info={this.state.pendingExam.info}
                            closeModal={this.closeModalHandler}
                            button={[{title: 'Ok', onPress: () => this.cancelExamHandler(this.state.pendingExam.pageID, this.state.pendingExam.title, this.state.pendingExam.cntType, true), 
                                style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.closeModalHandler, style: styles.button}]}/> : null}
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
                        det={`'${this.state.search}' does not match any Group`}
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
                        name="chatbubble-ellipses-outline"
                        size={40}
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No Group found !!! </Text>
                            { this.props.userID === this.state.profileID ?
                                <View>
                                    <Href title="create Group" onPress={() => this.navigationHandler('AddGroup')} style={styles.href}/>
                                </View> : null}
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
        marginTop: 10
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
    },
    groupInfo: {
        minHeight: 100,
        backgroundColor: '#e9ebf2',
        width: '100%', padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    groupInfoText: {
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 10,
        lineHeight: 24,
        textShadowColor: '#fff',
        textShadowRadius: 15,
        textShadowOffset: {
            width: 1,
            hieght: 1
        }
    },
    note: {
        marginBottom: 10,
        color: '#777'
    },
    instruction: {
        paddingHorizontal: 10
    },
    instructionText: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    removeButton: {
        backgroundColor: '#dcdbdc',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginLeft: 5
    },
    removeButtonText: {
        color: '#333',
        marginLeft: 5
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        fetchCntErr: state.page.fetchGroupError,
        fetchCntStart: state.page.fetchGroupStart,
        fetchCnt: state.page.fetchGroup,
        loadMore: state.page.loadMore,
        deletePageErr: state.page.deleteGroupError,
        deletePage: state.page.deleteGroup,
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
        onPageReaction: (page, pageID, reactionType, cnt, uriMethod, confirm) => dispatch(actions.pageReactionInit(page, pageID, reactionType, cnt, uriMethod, confirm)),
        onPageReactionReset: (pageID) => dispatch(actions.pageReactionReset(pageID)),
    };
};

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(Groups));