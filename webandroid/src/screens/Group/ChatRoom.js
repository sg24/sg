import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import urischeme from 'urischeme';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';
import Uridetect from 'uridetect';
import Constants from 'expo-constants';
import Text, { translator } from 'text';

import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import Href from '../../components/UI/Href/Href';
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import ChatRoomItem from '../../components/Page/ChatRoom/ChatRoom';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import SelectPicker from '../../components/UI/SelectPicker/SelectPicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import Instruction from '../../components/UI/Instruction/Instruction';
import Loader from '../../components/UI/Loader/Loader';

const TABPAGE = 'GROUPPREVIEW';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            groupID: this.props.groupID,
            isFocused: false,
            pageID: null,
            tabPage: TABPAGE,
            pageCntID: null,
            showSearch: false,
            isPressed: false,
            search: '',
            showOption: false,
            showSettings: false,
            showSelectPicker: null,
            showPendingSelectPicker: null,
            showSelectMarkPicker: null,
            showChatRoomInfo: null,
            examInstruction: null,
            pendingExam: null,
            showAdvertChat: false,
            showChatRoomRule: null
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
                //     this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'chatroom', 'getChatroom', this.state.groupID, this.state.tabPage);
                // }
                this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'chatroom', 'getChatroom', this.state.groupID, this.state.tabPage);
            } else {
                this.props.navigation.navigate(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group');
            }
            return this.setState({isFocused: true});
        }
        if (this.props.tabPress && !this.state.isPressed) {
            if (this.props.fetchCnt && this.props.fetchCnt.length > 0 && !this.state.showSearch) {
                this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'chatroom', 'getChatroom', this.state.groupID, this.state.tabPage, this.props.fetchCnt[0]._id);
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
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'chatroom', 'searchChatroom', JSON.stringify({search: this.state.search, groupID: this.state.groupID}), this.state.tabPage);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'chatroom', 'getChatroom', this.state.groupID, this.state.tabPage);
    }

    navigationHandler = (page, cntID={}) => {
        this.props.navigation.navigate(page, cntID);
    }

    closeModalHandler = () => {
        if (this.state.pendingExam) {
            this.props.onPageReactionReset(this.state.pendingExam.pageID);
        }
        this.setState({pageCntID: null, pageID: null, showSelectPicker: null, showPendingSelectPicker: null, showSelectMarkPicker: null, examInstruction: null, pendingExam: null, showAdvertChat: false, showChatRoomRule: null, showChatRoomInfo: null});
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
            this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'chatroom', 'searchChatroom', JSON.stringify({search: cnt, groupID: this.state.groupID}), this.state.tabPage);
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'chatroom', 'getChatroom', this.state.groupID, this.state.tabPage);
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
        this.props.navigation.navigate('EditChatRoom', {cntID: id});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    showRequestHandler = (pageID) => {
        this.setState({showSelectPicker: {selectType: 'chatroomRequest', pageID}})
    }

    showPendingAppoveHandler = (pageID) => {
        this.setState({showPendingSelectPicker: {selectType: 'chatroomPendingapprove', pageID}})
    }

    pendingMarkHandler = (pageID) => {
        this.setState({showSelectMarkPicker: {selectType: 'pendingMark', pageID}})
    }

    markExamHandler = (mark, pageID) => {
        this.props.navigation.navigate('MarkExam', {mark, pageID, cntID: 'getMarkChatroominfo', enableShare: false,
            navigationURI: Platform.OS === 'web' ? 'GroupWeb' :'Group', getMarkID: 'markChatroomTheoryexam',
            infoPassed: 'User have been added to chat Room ', infoFailed: 'Score is below the pass mark', infoPending: 'User have been added to pending approval page',
            buttonPassed: [{title: 'Chat', icon: {name: 'chatbox-ellipses-outline'}, onPress: { URI: 'CommentBox',  params: {title: 'Room', chatType: 'roomchat', page: 'chatroom', pageID,showReply: true}}}],
            buttonPending: [{title: 'Accept', pageReaction: {page: 'exam', pageID, cntType: 'setChatroomacceptuser', info: 'Are you sure you want to accept this user'}},
            {title: 'Remove', icon: {name: 'close', color: '#333'},
                pageReaction: {page: 'exam', pageID, cntType: 'setChatroomrejectuser', info: 'Are you sure you want to remove this user'}, 
                style: styles.removeButton, textStyle: styles.removeButtonText}]});
    }

    enterChatroomHandler = (pageID) => {
        this.props.navigation.navigate('CommentBox', {title: 'Room', chatType: 'roomchat', page: 'chatroom', pageID,showReply: true});   
    }

    requestHandler = (pageID, cnt, isPublic, isEnableRule, isEnableCbt) => {
        if (isPublic && !isEnableCbt && !isEnableRule) {
          return  this.joinChatroomHandler(pageID);
        }
        if (isEnableRule) {
            this.setState({showChatRoomRule: {content: cnt.content, 
                button: isPublic && !isEnableCbt ? {title: 'Join', onPress: () => this.joinChatroomHandler(pageID)} :
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

    joinChatroomHandler = (pageID) => {
        this.props.onPageReaction('chatroom', pageID, 'setJoin');
    }

    startExamHandler = () => {
        this.props.navigation.navigate('Exam', {pageID: this.state.pageID, navigationURI: this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group', enableShare: false, cntID: 'getChatroomexam', 
        getMarkID: 'markChatroomExam', infoPassed: 'You are now a member', infoFailed: 'Your score is below the pass mark', infoPending: 'Your score have been sent to admin',
        buttonPassed: [{title: 'Chat', icon: {name: 'chatbox-ellipses-outline'}, onPress: { URI: 'CommentBox',  params: {title: 'Room', chatType: 'roomchat', page: 'chatroom', pageID: this.state.pageID,showReply: true}}}]});
    }

    sendRequestHandler = (pageID) => {
        this.props.onPageReaction('chatroom', pageID, 'setRequest');
    }

    cancelRequestHandler = (pageID) => {
        this.props.onPageReaction('chatroom', pageID, 'cancelRequest');
    }

    cancelExamHandler = (pageID, title, cntType, confirm, info) => {
        this.props.onPageReaction('chatroom', pageID, cntType, {pageID}, 'post', confirm);
        if (confirm) {
            return this.setState({pendingExam: null});
        }
        this.setState({pendingExam: {pageID, title, cntType, info, confirm}});
    }

    deletePageHandler = (id, start) => {
        this.props.onDeletePage(id, 'chatroom', start, 'getOneAndDelete');
        if (this.props.fetchCnt.length < 2) {
            this.loadMoreHandler();
        }
        this.setState({pageCntID: null});
    }

    deletePageResetHandler = () => {
        this.props.onDeletePageReset();
    }

    reportHandler = (pageID) => {
        this.props.navigation.navigate('AddReport', {navigationURI: this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group', cntType: 'pageReport', page: 'chatroom', pageID});
        this.setState({pageCntID: null});
    }

    mediaPreviewHandler = (cntID, media, startPage) => {
        this.setState({showPreview: { startPage, media, cntID}})
        // this.props.navigation.navigate('MediaPreview', {showOption: false, page: 'chatroom', pageID: cntID, media, startPage});
    }

    closePreviewHandler = () => {
        this.setState({showPreview: null})
    }

    saveMediaHandler = (mediaCnt) => {

    }

    favoriteHandler = (pageID) => {
        this.props.onPageReaction('chatroom', pageID, 'setFavorite');
    }

    showChatroomInfoHandler = (pageID, title, media) => {
        let mediaInfo = media.filter(cnt => cnt.bucket === 'image')[0];
        this.setState({showChatRoomInfo: {selectType: 'member',title, media: mediaInfo || {}}, pageID})
    }

    advertChatboxHandler = (pageID) => {
        this.setState({showAdvertChat: true, pageID})
        // this.props.navigation.navigate('CommentBox', {title: 'Comment', chatType: 'advertchat', page: 'advert', pageID, 
        //     showReply: true})
    }

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit,
                 'chatroom', 'searchChatroom', JSON.stringify({search: this.state.search, groupID: this.state.groupID}), this.state.tabPage);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'chatroom', 'getChatroom', this.state.groupID, this.state.tabPage);
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
                            <Button style={styles.optionIcon} onPress={() => this.navigationHandler('AddChatRoom', {groupID: this.state.groupID})}>
                                <Ionicons name="pencil-outline" size={20} />
                                <Text style={styles.optionIconText}>Create Chat Room</Text>
                            </Button>: null}
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
        <Loader header={header} options={options} page="chatroom" />
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
                        <View 
                            style={styles.scroll}>
                            <ChatRoomItem
                                cnt={this.props.fetchCnt}
                                userID={this.props.userID}
                                viewMode={this.state.viewMode}
                                openURI={this.openURIHandler}
                                pageCntID={this.state.pageCntID}
                                userProfile={this.userProfileHandler}
                                showChatroomInfo={this.showChatroomInfoHandler}
                                edit={this.editHandler}
                                delete={this.deletePageHandler}
                                report={this.reportHandler}
                                showUserOpt={this.showUserOptHandler}
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}
                                favorite={this.favoriteHandler}
                                enterChatroom={this.enterChatroomHandler}
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
                                advertChatbox={this.advertChatboxHandler}
                                loadMoreHandler={this.loadMoreHandler}
                                tabLoadMore={this.props.tabLoadMore}/>
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
                   { this.state.showPreview ? 
                        <MediaPreview
                            showOption={false}
                            pageID={this.state.showPreview.cntID}
                            media={this.state.showPreview.media}
                            page="chatroom"
                            startPage={this.state.showPreview.startPage}
                            closePreview={this.closePreviewHandler}
                            backgroundColor={this.props.settings.backgroundColor}/> : null}
                    { this.state.showAdvertChat ? 
                        <CommentBox
                            title="Comment"
                            chatType="advertchat"
                            page="advert"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply/> : null}
                    { this.state.showSelectPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Users accepted successfully"
                            removeInfo="Users removed successfully"
                            confirmAllInfo="Are you sure you want to accept this users"
                            confirmInfo="Are you sure you want to accept this user"
                            title="Chat Room Request"
                            page="chatroom"
                            pageID={this.state.showSelectPicker.pageID}
                            cntID="getRequest"
                            searchID="searchRequest"
                            pageSetting="userPage"
                            iconName="chatbox-ellipses"
                            leftButton={{title: 'Remove', action: 'setRejectuser'}}
                            rightButton={{title: 'Accept', action: 'setAcceptuser'}}/> : null}
                    { this.state.showPendingSelectPicker ? 
                        <SelectPicker
                            selectType={this.state.showPendingSelectPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Users accepted successfully"
                            removeInfo="Users removed successfully"
                            confirmAllInfo="Are you sure you want to accept this users"
                            confirmInfo="Are you sure you want to accept this user"
                            title="Pending Approval"
                            page="chatroom"
                            pageID={this.state.showPendingSelectPicker.pageID}
                            cntID="getPendingapprove"
                            searchID="searchPendingapprove"
                            pageSetting="userPage"
                            iconName="chatbox-ellipses"
                            leftButton={{title: 'Remove', action: 'setPendingrejectuser'}}
                            rightButton={{title: 'Accept', action: 'setPendingacceptuser'}}/> : null}
                    { this.state.showSelectMarkPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectMarkPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            title="Pending"
                            page="chatroom"
                            pageID={this.state.showSelectMarkPicker.pageID}
                            cntID="getPendingmark"
                            searchID="searchPendingmark"
                            pageSetting="userPage"
                            markExam={this.markExamHandler}
                            iconName="chatbox-ellipses"
                            showNote={false}/> : null}
                    { this.state.showChatRoomInfo ? 
                        <SelectPicker
                            selectType={this.state.showChatRoomInfo.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            title="Chat Room Information"
                            page="chatroom"
                            cntID="getChatroominfo"
                            pageID={this.state.pageID}
                            pageSetting="userPage"
                            showNote={false}
                            enableSearch={false}>
                            <View>
                                <ImageBackground 
                                    source={{uri: `${Constants.manifest.extra.BASE_URL}media/${this.state.showChatRoomInfo.media.bucket}/${this.state.showChatRoomInfo.media.id}`}} 
                                    style={styles.roomInfo}
                                    resizeMode="cover">
                                    <Uridetect
                                        onPress={this.openURIHandler} 
                                        style={styles.roomInfoText} 
                                        content={this.state.showChatRoomInfo.title}/>
                                </ImageBackground>
                                <BoxShadow style={{backgroundColor: '#dcdbdc', padding: 10}}>
                                    <Text style={styles.textStyle}>Members</Text>
                                </BoxShadow>
                            </View>
                        </SelectPicker> : null}
                    {this.state.showChatRoomRule ? 
                        <Instruction 
                            pageID={this.state.pageID}
                            title="Chat Room Purpose / Rule"
                            content={this.state.showChatRoomRule.content}
                            openURI={this.openURIHandler}
                            closeInstruction={this.closeModalHandler}
                            button={[this.state.showChatRoomRule.button]}
                            enablePageReaction
                            pageReaction={this.props.pageReaction}
                            pageReactionErr={this.props.pageReactionErr}
                            pageReactionReset={this.props.onPageReactionReset} />: null}
                    {this.state.examInstruction ? 
                        <Instruction 
                            title="Exam Instruction"
                            openURI={this.openURIHandler}
                            content={this.state.examInstruction.enableContent ? "You need to need to take exam to join this Chat Room" : null}
                            textStyle={styles.note}
                            closeInstruction={this.closeModalHandler}
                            button={[{title: 'Start', icon: {name: 'timer-outline'}, onPress: this.startExamHandler}]}>
                                <View style={styles.instruction}>
                                    { this.state.examInstruction.autoJoin ? <Text style={[styles.textStyle]}>{translator('Pass Mark')}: <Text style={styles.instructionText}>{ this.state.examInstruction.passMark }{translator('%')}</Text></Text> : null}
                                    <Text style={[styles.textStyle, styles.contentText]}>{translator('Total')}: <Text style={styles.instructionText}>{ this.state.examInstruction.qchatTotal } {translator('Questions')}</Text></Text>
                                    <Text style={[styles.textStyle]}>{translator('Duration')}: 
                                        <Text style={styles.instructionText}>
                                            {`${this.state.examInstruction.hour} ${translator('hour')} ${this.state.examInstruction.minute} ${translator('minute')} ${this.state.examInstruction.second} ${translator('second')}`}</Text></Text>
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
                            info="Are you sure you want to delete this chat Room"
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
                        det={`'${this.state.search}' ${translator('does not match any Chat Room')}`}
                        name="search"
                        size={40}
                        color="#333"
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}/>
                </View>
            )
        }

        if (!this.props.fetchCntErr  && (this.props.tabPage === this.state.tabPage) && this.props.fetchCnt && this.props.fetchCnt.length < 1 && !this.state.showSearch) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        name="chatbox-ellipses-outline"
                        size={40}
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No Chat Room found </Text>
                            {this.props.enable ? 
                            <View>
                                <Href title="create Chat Room" onPress={() => this.navigationHandler('AddChatRoom', {groupID: this.state.groupID})} style={styles.href}/>
                            </View>: null}
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
    roomInfo: {
        minHeight: 100,
        backgroundColor: '#e9ebf2',
        width: '100%', padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    roomInfoText: {
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
        fetchCntErr: state.page.fetchChatRoomError,
        fetchCntStart: state.page.fetchChatRoomStart,
        fetchCnt: state.page.fetchChatRoom ? state.page.fetchChatRoom.filter(cnt => cnt.tabPage === TABPAGE) : null,
        tabLoadMore: state.page.tabLoadMore,
        tabPage: state.page.tabPage,
        loadMore: state.page.loadMore,
        deletePageErr: state.page.deleteChatRoomError,
        deletePage: state.page.deleteChatRoom,
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
        onPageReaction: (page, pageID, reactionType, cnt, uriMethod, confirm) => dispatch(actions.pageReactionInit(page, pageID, reactionType, cnt, uriMethod, confirm)),
        onPageReactionReset: (pageID) => dispatch(actions.pageReactionReset(pageID)),
    };
};

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(ChatRoom));