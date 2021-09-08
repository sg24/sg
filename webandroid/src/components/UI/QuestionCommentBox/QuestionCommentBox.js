import React, { Component } from 'react';
import { View, Image, ImageBackground, ActivityIndicator, StyleSheet, Keyboard, Dimensions, Platform, ScrollView } from 'react-native';
import Clipboard from 'expo-clipboard';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import Constants from 'expo-constants';
import { v4 as uuid } from 'uuid';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';
import urischeme from 'urischeme';
import { useNavigation } from '@react-navigation/native';
import withComponent from 'withcomponent';
import Text from 'text';

import ChatItem from './CommentItem/CommentItem';
import { size } from 'tailwind';
import InnerScreen from '../InnerScreen/InnerScreen';
import DefaultHeader from '../Header/DefaultHeader';
import SearchHeader from '../Header/Search';
import Button from '../Button/Button';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import Option from '../Option/Option';
import * as actions from '../../../store/actions/index';
import  { updateObject, checkValidity } from '../../../shared/utility';
import ErrorInfo from '../ErrorInfo/ErrorInfo';
import NotificationModal from '../NotificationModal/NotificationModal';
import FormElement from '../FormElement/FormElement';
import ActionSheet from '../ActionSheet/ActionSheet';
import CameraComponent from '../Camera/Camera';
import VideoCamera from '../VideoCamera/VideoCamera';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import UploadPreview from '../UploadPreview/UploadPreview';
import BoxShadow from '../BoxShadow/BoxShadow';
import AbsoluteFill from '../AbsoluteFill/AbsoluteFill';
import MediaPreview from '../MediaPreview/MediaPreview';
import SharePicker from '../SharePicker/SharePicker';
import Settings from '../Settings/Settings';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            containerHeight: null,
            backgroundColor: '#fff',
            color: '#333',
            showOption: false,
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            formElement: {
                content: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
            showActionSheet: false,
            showCamera: false,
            showVideoCamera: false,
            showAudioRecorder: false,
            showEmoji: false,
            showSharePicker: false,
            showSettings: false,
            selection: {start: 0, end: 0},
            uploadFile: [],
            showChatOption: null,
            showChatInfo: null,
            showSearch: false,
            searchText: '',
            replyChatBox: null,
            editChatBox: null,
            showPreview: null,
            showReply: null,
            searchHashTag: false,
            editUploadFile: null,
            changeReaction: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  'portrait'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        this.props.onFetchChat( 0, this.props.settings.commentBox.fetchLimit, this.props.chatType, this.props.cntID, this.props.page, this.props.pageID);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onChatReset();
    }

    reloadFetchHandler = () => {
        if (this.props.fetchReplyErr) {
            this.props.onFetchReply(this.props.fetchReply ? this.props.fetchReply.length : 0, this.props.settings.commentBox.fetchLimit, this.props.chatType, this.props.chatID, this.state.showReply._id);
            return
        }
        this.props.onFetchChat(this.props.fetchChat ? this.props.fetchChat.length : 0, this.props.settings.commentBox.fetchLimit, this.props.chatType, this.props.cntID, this.props.page, this.props.pageID);
    }

    inputChangedHandler = (value, inputType) => {
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value,
            valid: checkValidity(value, this.state.formElement[inputType].validation),
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }
        this.setState({formElement: updateFormElement, formIsValid});
    }

    inputChangePositionHandler  = ({ nativeEvent: { selection } }) => {
        this.setState({selection})
    }

    containerHeightHandler = (e) => {
        if (e) {
            let {height} = e.nativeEvent.layout;
            this.setState({containerHeight: height})
        }
    }

    closeModalHandler = () => {
        let reaction = this.state.changeReaction;
        if (reaction) {
            this.props.onChatBoxReactionReset(reaction.cntID);
        }
        this.setState({showOption: false, showChatOption: null, showChatInfo: null,  editChatBox: null, showPreview: null,
            replyChatBox: null, changeReaction: null});
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption, showChatOption: null, showChatInfo: null,  showPreview: null
        }))
    }

    closeOptionHandler = () => {
        this.setState({showOption: false, showChatOption: null, showChatInfo: null,  showPreview: null})
    }

    optionHandler = (action) => {
        if (action === 'search') {
            this.setState({showSearch: true, showOption: false});
        }

        if (action === 'settings') {
            this.setState({showSettings: true, showOption: false});
        }
    }

    searchCommentHandler = (cnt) => {
        this.setState({searchText: cnt});
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, searchText: ''});
    }

    closeSettingsHandler = () => {
        this.setState({showSettings: false});
    }

    showChatOptionHandler = (cnt, direction, e, allowDelete = true) => {
        let copyOpt = cnt.media.length < 1 ? [
            {title: 'Share', icon: {name: 'paper-plane-outline'}, action: 'share'},
            {title: 'Copy Text', icon: {name: 'clipboard-outline'}, action: 'copy'}
        ] : [{title: 'Share', icon: {name: 'paper-plane-outline'}, action: 'share'}]
        let deleteOpt = cnt.reply.length < 1 && this.props.userID === cnt.authorID && allowDelete ? [
            ...copyOpt,
            {title: 'Delete', icon: {name: 'trash-bin-outline'}, action: 'delete'}] : 
            copyOpt;
        let enableReply = this.state.showReply || this.state.replyChatBox  || cnt.reply.length > 0 ? [] : [
            {title: 'Reply', icon: {name: 'arrow-redo-outline'}, action: 'reply'}
        ];
        this.setState({showChatOption: { option: [
        ...enableReply,
        ...deleteOpt],
        pageY: this.state.containerHeight ? 
        this.state.containerHeight - e.nativeEvent.pageY < 150 ? 
            this .state.viewMode === 'landscape' ? e.nativeEvent.pageY - 255 : e.nativeEvent.pageY - 185 :
            this.state.viewMode === 'landscape' ?  e.nativeEvent.pageY - 65: e.nativeEvent.pageY :
        '50%', direction,
        locationX:  e.nativeEvent.locationX, cnt}, showOption: false, showChatInfo: null,  editChatBox: null});
    }

    closeChatOptionHandler = () => {
        this.setState({showChatOption: null})
    }

    closeReplyBoxHandler = () => {
        this.setState({replyChatBox: null})
    }

    chatOptionHandler = async (action) => {
        if (action === 'copy') {
            Clipboard.setString(this.state.showChatOption.cnt.content);
        }
        if (action === 'share') {
            this.setState({showActionSheet: {option: ['Friends', 'Groups', 'Chat Room'],
            icon: ['people-outline', 'chatbox-outline', 'chatbubble-ellipses-outline'],
            cnt: this.state.showChatOption.cnt}})
        }
        if (action === 'delete') {
            return this.props.onDeleteChat(this.props.chatType, this.props.chatID, this.props.page, this.props.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
            this.state.showChatOption.cnt, false);
        }
        if (action === 'reply') {
            this.setState({replyChatBox: this.state.showChatOption.cnt});
        }
        this.setState({showChatOption: null});
    }

    sendChatInfoHandler = (cnt, e) => {
        this.setState({showChatInfo: {
            info: 'Message not sent, check your internet connnection',
            option: [{title: 'Resend', icon: {name: 'arrow-redo-outline'}, action: 'resend'},
            {title: 'Edit', icon: {name: 'pencil-outline'}, action: 'edit'},
            {title: 'Delete', icon: {name: 'trash-bin-outline'}, action: 'delete'}], cnt},
            showOption: false, showChatOption: null,  editChatBox: null});
    }

    chatInfoOptionHandler = (action) => {
        if (action === 'resend') {
            this.resendChatHandler(this.state.showChatInfo.cnt.sendChatID, {});
            this.setState({showChatInfo: null})
        }
        if (action === 'edit') {
            if (!this.state.showChatInfo.cnt.media || this.state.showChatInfo.cnt.media.length < 1) {
                this.inputChangedHandler(this.state.showChatInfo.cnt.content, 'content')
                this.setState({editChatBox: this.state.showChatInfo.cnt, showOption: false, showChatOption: null, showChatInfo: null});
            } else {
                this.setState({uploadFile: this.state.showChatInfo.cnt.uploadFile, showChatInfo: null, 
                    editUploadFile: this.state.showChatInfo.cnt.sendChatID});
            }
        }
        if (action === 'delete') {
            this.props.onDeleteChat(this.props.chatType, this.props.chatID, this.props.page, this.props.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
                this.state.showChatInfo.cnt, false);
        }
    }

    closeChatInfoHandler = () => {
        this.setState({showChatInfo: null});
    }

    closeEditChatHandler = () => {
        this.setState({formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
        formIsValid: false, editChatBox: null});
    }

    deleteChatHandler = () => {
        if (this.state.showChatInfo) {
            this.props.onDeleteChat(this.props.chatType, this.props.chatID, this.props.page, this.props.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
            this.state.showChatInfo.cnt, true);
        } else if (this.state.showChatOption) {
            this.props.onDeleteChat(this.props.chatType, this.props.chatID, this.props.page, this.props.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
            this.state.showChatOption.cnt, true);
        }
        this.closeModalHandler();
    }

    deleteChatResetHandler = () => {
        this.props.onDeleteChatReset();
        this.closeModalHandler();
    }

    showReplyHandler = (cnt) => {
        this.props.onFetchReply(this.props.fetchReply ? this.props.fetchReply.length : 0, this.props.settings.commentBox.fetchLimit, this.props.chatType, this.props.chatID, cnt._id);
        this.setState({showReply: cnt, showSearch: false, searchText: ''});
    }

    closeReplyHandler = () => {
        this.setState({formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
        formIsValid: false, showReply: null, showSearch: false, searchText: ''});
        this.closeModalHandler();
        this.props.onFetchReplyReset();
    }

    mediaPreviewHandler = (cntID, media, page) => {
        this.setState({showPreview: { startPage: page, media, cntID}, showOption: false, showChatOption: null, showChatInfo: null, editChatBox: null})
    }

    showEmojiHandler = () => {
        this.setState({showEmoji: true})
    }

    emojiSelectHandler = (emoji) => {
        let inputValue = String(this.state.formElement.content.value);
        let selection = this.state.selection;
        let diff = selection.end - selection.start
        let content = inputValue.slice(0, selection.start) + emoji.join(' ') + 
            inputValue.slice(selection.start + diff, inputValue.length)
        this.inputChangedHandler(content, 'content');
        this.setState({showEmoji: false})
    }


    pickImageHandler = () => {
        this.setState({showActionSheet: {option: ['Take Picture', 'Video Record', 'Audio Record', 'File Explorer'],
            icon: ['camera-outline', 'videocam-outline', 'mic-outline', 'documents-outline']}})
    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            if (this.state.showActionSheet.option[0] === 'Friends') {
                this.setState({showSharePicker: {type: this.state.showActionSheet.option[index],
                    cnt: this.state.showActionSheet.cnt}, showActionSheet: false})
                return
            }
            camera({type: "Images"}).then(file => {
                let uploadFile = [...this.state.uploadFile];
                uploadFile.push(...file);
                this.setState({uploadFile, showActionSheet: false})
            }).catch(e => {
                if (e === 'useCamera') {this.setState({showCamera: true, showActionSheet: false})}
                this.setState({showActionSheet: false})
            })
        } else if (index === 1){
            if (Platform.OS === 'web') {
                this.setState({showActionSheet: false, showVideoCamera: true})
            } else {
                camera({type: "Videos"}).then(file => {
                    let uploadFile = [...this.state.uploadFile];
                    uploadFile.push(...file);
                    this.setState({uploadFile, showActionSheet: false})
                }).catch(e => {
                    this.setState({showActionSheet: false})
                })
            }
        } else if (index === 2) {
            this.setState({showActionSheet: false, showAudioRecorder: true})
        } else if (index === 3){
            explorer({multiple: true}).then(file => {
                let uploadFile = [...this.state.uploadFile];
                uploadFile.push(...file)
                this.setState({uploadFile, showActionSheet: false})
            }).catch(e => {
                alert(e)
                this.setState({showActionSheet: false})
            })
        }
    };


    closePickerHandler = () => {
        this.setState({showSharePicker: false, showCamera: false, showAudioRecorder: false, showVideoCamera: false, showEmoji: false, uploadFile: []})
    }

    closePreviewHandler = () => {
        this.setState({showCamera: false, showAudioRecorder: false, showVideoCamera: false, showEmoji: false, 
            uploadFile: [], editUploadFile: null});
    }

    takePictureHandler = async () => {
        if (this.camera) {
            takePicture(this.camera).then(image => {
                let uploadFile = [...this.state.uploadFile];
                uploadFile.push(...image);
                this.setState({uploadFile, showCamera: false})
            }).catch(e => { this.setState({showCamera: false})})
        }
    }

    stopAudioRecorderHandler = (recording) => {
        stopAudioRecorder(recording).then(audio => {
            let uploadFile = [...this.state.uploadFile];
            uploadFile.push(...audio);
            this.setState({uploadFile, showAudioRecorder: false})
        }).catch(e => { this.setState({showAudioRecorder: false})})
    }

    userProfileHandler = (userID) => {
        this.props.navigation.navigate('Profile', {userID})
    }

    loadPreviousHandler = () => {
        if (this.props.fetchReply) {
            this.props.onFetchReply(this.props.fetchReply ? this.props.fetchReply.length : 0, this.props.settings.commentBox.fetchLimit, this.props.chatType, this.props.chatID, this.state.showReply._id);
            return
        }
        this.props.onFetchChat(this.props.fetchChat ? this.props.fetchChat.length : 0, this.props.settings.commentBox.fetchLimit, this.props.chatType, this.props.cntID, this.props.page, this.props.pageID);
    }

    submitUploadHandler = () => {
        if (this.uploadPreview) {
            if (this.state.editUploadFile) {
                this.resendChatHandler(this.state.editUploadFile, {
                    media: this.uploadPreview.state.uploadFiles, 
                    uploadFile: this.uploadPreview.state.uploadFiles, uploadedPercent: 0
                });
                this.setState({editUploadFile: null, uploadFile: []})
                return
            }
            this.sendChatHandler({media: this.uploadPreview.state.uploadFiles, 
                uploadFile: this.uploadPreview.state.uploadFiles, uploadedPercent: 0});
            this.setState({uploadFile: []})
        }
    }

    openURIHandler = (type, uri) => {
        if (type === 'URL') {
            urischeme(type, uri)
        }
        if (type === 'hashTag') {
            this.props.navigation.navigate('HashSearch', {hashTag: uri})
        }
    }

    chatBoxReactionHandler = (cntID, title, reactionType, confirm, info) => {
        this.props.onChatBoxReaction(this.props.chatType, cntID, this.props.page, reactionType, 
            {cntID, chatID: this.props.chatID, pageID: this.props.pageID}, 'chatReaction', 'post', confirm);
        if (confirm) {
            return this.setState({changeReaction: null});
        }
        this.setState({changeReaction: {cntID, title, reactionType, info, confirm}});
    }

    sendChatHandler = (content) => {
        Keyboard.dismiss();
        if (!this.state.editChatBox && !this.state.replyChatBox && !this.state.showReply) {
            this.props.onSendChat(this.props.chatType, this.props.chatID, this.props.page, this.props.pageID, updateObject(content, {
                sendChatID: uuid(), sent: false, fail: false, username: this.props.username, userImage: this.props.userImage,
                authorID: this.props.userID, reply: [], correct: 0, wrong: 0}));
            if (this.scroll) {
                this.scroll.scrollToEnd({animated: true});
            }
        } 
        if (this.state.editChatBox) {
            this.resendChatHandler(this.state.editChatBox.sendChatID, content);
            this.setState({ formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
                formIsValid: false});
            this.closeModalHandler();
            return;
        }
        if (this.state.replyChatBox || this.state.showReply) {
            let cnt = this.state.replyChatBox || this.state.showReply;
            this.props.onReplyChat(this.props.chatType, this.props.chatID, cnt._id, this.props.page, this.props.pageID, updateObject(content, {
                sendChatID: uuid(), sent: false, fail: false, username: this.props.username, userImage: this.props.userImage,
                authorID: this.props.userID, reply: [], replyChatID: cnt._id, correct: 0, wrong: 0}));
            this.setState({showReply: cnt, replyChatBox: null,
                formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
                formIsValid: false});
            if (this.state.showReply && this.scrollReply) {
                this.scrollReply.scrollToEnd({animated: true});
            }
            return
        }
        this.setState({ formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
                formIsValid: false});
        this.closeModalHandler();
    }

    resendChatHandler = (sendChatID, content) => {
        Keyboard.dismiss();
        let chat =  this.state.showReply ? [...this.props.fetchReply] : [...this.props.fetchChat];
        let resendChatCnt = chat.filter(cnt => cnt.sendChatID === sendChatID)[0];
        if (resendChatCnt) {
            if (this.state.showReply) {
                this.props.onReplyChat(this.props.chatType, this.props.chatID, this.state.showReply._id, this.props.page, this.props.pageID, updateObject(resendChatCnt, content));
            } else {
                this.props.onSendChat(this.props.chatType, this.props.chatID, this.props.page, this.props.pageID, updateObject(resendChatCnt, content));
            }
        }
        this.closeModalHandler();
    }

    render() {
        let checkFetchError = (this.props.fetchChat && this.props.fetchChat.length > 0 && this.props.fetchChatErr) || 
        (this.props.fetchReply && this.props.fetchReply.length > 0 && this.props.fetchReplyErr);
        let chatBoxReaction = this.props.chatBoxReaction.length > 0 && this.state.changeReaction ? this.props.chatBoxReaction.filter(id => id === this.state.changeReaction.cntID)[0] : null;
        let loader = (
            <View style={styles.loaderCnt}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        );
        let cnt = loader;
        let replyCnt = null;
        let commentBackground = this.props.settings.commentBox.backgroundImage  && this.props.settings.commentBox.enableBackgroundImage;
        let Wrapper = commentBackground ? ImageBackground : View;
        let wrapperProps = commentBackground ? {source: {uri: this.props.settings.commentBox.backgroundImage}, resizeMode: 'cover'} : {}

        let userStatus = (
            <View style={[styles.userStatus]}></View>
        );
        if (this.props.info && this.props.info.status) {
            userStatus = (
                <View style={[styles.userStatus, styles.userStatusOn]}></View>
            );
        }
        let headerImg = (
            <View style={styles.userImageWrapper}>
                <Ionicons name="person" size={20} color="#777"/>
                { userStatus }
            </View>
        );
        if (this.props.info && this.props.info.image) {
            headerImg = (
                <View>
                    <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${this.props.info.image}`}} style={styles.userImageWrapper}/>
                    { userStatus }
                </View>
            )
        }

        let header = (
            <DefaultHeader
                onPress={this.props.closeChat}
                title={this.props.title}
                leftSideContent={this.props.showHeaderImage ? (
                    <TouchableNativeFeedback onPress={this.props.showProfile}>
                        <View style={styles.leftSideContent}>
                            { headerImg }
                            {this.props.info && this.props.info.title ? 
                            <Text style={styles.leftSideContentText} numberOfLines={1}>{ this.props.info.title }</Text> : null}
                        </View>
                    </TouchableNativeFeedback>
                ) : null}
                rightSideContent={(
                    <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                        <Ionicons name="ellipsis-vertical-outline" size={20} />
                    </Button>
                )}/>
        )

        let replyHeader = (
            <DefaultHeader
                onPress={this.closeReplyHandler}
                title="Reply"
                rightSideContent={(
                    <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                        <Ionicons name="ellipsis-vertical-outline" size={20} />
                    </Button>
                )}/>
        );

        if (this.state.showSearch) {
            header =  (
                <SearchHeader 
                    onPress={this.closeSearchHandler}
                    title="Search"
                    filterCnt={this.searchCommentHandler}
                    editable
                />
            );
        }

        let option = (
            <>
                { this.state.showChatOption && !this.props.deleteChat ? (
                    <Option
                        option={this.state.showChatOption.option}
                        closeOption={this.closeChatOptionHandler}
                        wrapperStyle={{top: this.state.showChatOption.pageY, 
                            right: this.state.showChatOption.direction === 'right' ? this.state.showChatOption.locationX :'auto', 
                            left: this.state.showChatOption.direction === 'right' ? 'auto' : this.state.showChatOption.locationX}}
                        onPress={this.chatOptionHandler}/>
                ) : null}
                { this.state.editChatBox ? (
                    <AbsoluteFill onPress={this.closeEditChatHandler} />
                ) : null}
                { this.state.replyChatBox ? (
                    <AbsoluteFill onPress={this.closeReplyBoxHandler} style={{
                        justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1
                    }}>
                        <ScrollView
                            style={[styles.scroll, {maxHeight: 150, paddingBottom: 50}]}>
                            <ChatItem
                                cnt={[this.state.replyChatBox]}
                                showReply={false}
                                replyChat={this.showReplyHandler}
                                userID={this.props.userID}
                                userProfile={this.userProfileHandler}
                                showOption={this.showChatOptionHandler}
                                sendChatInfo={this.sendChatInfoHandler}
                                deleteChatBox={this.props.deleteChat}
                                editChatBox={this.state.editChatBox}
                                preview={this.mediaPreviewHandler}
                                disableUserOpt={true}
                                openURI={this.openURIHandler}
                                enableReply
                                chatBoxReaction={this.props.chatBoxReaction}
                                changeReaction={this.chatBoxReactionHandler}
                                hideSolutionInfo
                                />
                        </ScrollView>
                    </AbsoluteFill>
                ) : null}
            </>
        )

        let commentBox = (
            <View style={styles.commentBox}>
                <BoxShadow
                    style={styles.commentButtonShadow}>
                    <Button
                        style={styles.commentBoxButton}
                        onPress={this.pickImageHandler}>
                        <Ionicons name="camera-outline" size={22} />
                    </Button>
                </BoxShadow>
                <BoxShadow
                    style={styles.commentButtonShadow}>
                    <Button 
                        style={styles.commentBoxButton}
                        onPress={this.showEmojiHandler}>
                        <Ionicons name="happy-outline" size={22}/>
                    </Button>
                </BoxShadow>
                <FormElement
                    onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                    autoCorrect
                    multiline
                    placeholder={this.state.showReply || this.state.replyChatBox ? "Reply" : "Write"}
                    value={this.state.formElement.content.value}
                    formWrapperStyle={styles.formWrapperStyle}
                    inputWrapperStyle={styles.formWrapperStyle}
                    style={styles.formElementInput}
                    onSelectionChange={this.inputChangePositionHandler}/>
                <BoxShadow
                    style={styles.sendButtonShadow}
                    disabled={!this.state.formIsValid}>
                    <Button 
                        style={styles.sendButton}
                        onPress={() => this.sendChatHandler({ content: this.state.formElement.content.value})}
                        disabled={!this.state.formIsValid}>
                        <Ionicons name="send-outline" size={22} color="#fff"/>
                    </Button>
                </BoxShadow>
            </View>
        )


        if (this.state.showReply) {
            replyCnt = (
                <View style={styles.replyCntWrapper}>
                    <ChatItem
                        cnt={[this.state.showReply]}
                        showReply={false}
                        replyChat={this.showReplyHandler}
                        userID={this.props.userID}
                        userProfile={this.userProfileHandler}
                        showOption={(cnt, direction, e) => this.showChatOptionHandler(cnt, direction, e, false)}
                        sendChatInfo={this.sendChatInfoHandler}
                        deleteChatBox={this.props.deleteChat}
                        editChatBox={this.state.editChatBox}
                        preview={this.mediaPreviewHandler}
                        enableReply
                        openURI={this.openURIHandler}
                        chatBoxReaction={this.props.chatBoxReaction}
                        changeReaction={this.chatBoxReactionHandler}/>
                </View>
            )
        }

        if (this.props.fetchChat && this.props.chatID) {
            cnt = (
                <Wrapper 
                    {...wrapperProps}
                    style={styles.wrapper}>
                   <View 
                    style={styles.chatBoxwrapper}
                    onLayout={this.containerHeightHandler}>
                        <ScrollView 
                            ref={(ref) => this.scroll = ref}
                            style={styles.scroll}>
                            <ChatItem
                                cnt={this.props.fetchChat}
                                showReply={this.props.showReply}
                                replyChat={this.showReplyHandler}
                                userID={this.props.userID}
                                userProfile={this.userProfileHandler}
                                showOption={this.showChatOptionHandler}
                                sendChatInfo={this.sendChatInfoHandler}
                                deleteChatBox={this.props.deleteChat}
                                editChatBox={this.state.editChatBox}
                                preview={this.mediaPreviewHandler}
                                openURI={this.openURIHandler}
                                loadPrevious={this.loadPreviousHandler}
                                enableLoadPrevious={this.props.loadPreviousChat}
                                fetchChatStart={this.props.fetchChatStart}
                                searchText={this.state.searchText}
                                highlighted={this.props.settings.commentBox.highlighted}
                                chatBoxReaction={this.props.chatBoxReaction}
                                changeReaction={this.chatBoxReactionHandler}/>
                        </ScrollView>
                        { option }
                    </View>
                    { commentBox }
                </Wrapper>
            );
        }

        if (this.props.fetchChatErr && !checkFetchError) {
            cnt = (
                <ErrorInfo 
                    viewMode={this.state.viewMode}
                    reload={this.reloadFetchHandler}/>
            )
        }

        let previewSubmitButton = (
            <Button 
                title={this.state.editUploadFile ? 'Edit' : 'Send'}
                style={styles.previewSubmitButton}
                onPress={this.submitUploadHandler}/>
        );

        return (
            <InnerScreen
                onRequestClose={this.props.closeChat}
                animationType="slide"
                onBackdropPress={this.props.closeChat}>
                { header }
                <View style={styles.wrapper}>
                    { cnt }
                </View>
                { this.state.showReply ?
                    <InnerScreen
                        onRequestClose={this.closeReplyHandler}
                        animationType="slide"
                        onBackdropPress={this.closeReplyHandler}>
                            { this.state.showSearch ? header : replyHeader }
                            <View style={styles.wrapper}>
                                { this.props.fetchReplyErr && !checkFetchError ?
                                    <ErrorInfo 
                                        viewMode={this.state.viewMode}
                                        reload={this.reloadFetchHandler}/> : 
                                    !this.props.fetchReply ? loader: null }
                                { this.props.fetchReply ? 
                                 <Wrapper
                                    {...wrapperProps}
                                    style={styles.wrapper}>
                                    <View 
                                        style={styles.chatBoxwrapper}
                                        onLayout={this.containerHeightHandler}>
                                        <ScrollView 
                                            ref={(ref) => this.scrollReply = ref}
                                            style={styles.scroll}>
                                            { replyCnt   }
                                            <ChatItem
                                                cnt={this.props.fetchReply}
                                                showReply={false}
                                                hideSolutionInfo={this.state.showReply}
                                                replyChat={this.showReplyHandler}
                                                userID={this.props.userID}
                                                userProfile={this.userProfileHandler}
                                                showOption={this.showChatOptionHandler}
                                                sendChatInfo={this.sendChatInfoHandler}
                                                deleteChatBox={this.props.deleteChat}
                                                editChatBox={this.state.editChatBox}
                                                preview={this.mediaPreviewHandler}
                                                openURI={this.openURIHandler}
                                                loadPrevious={this.loadPreviousHandler}
                                                enableLoadPrevious={this.props.loadPreviousReply}
                                                fetchChatStart={this.props.fetchReplyStart}
                                                searchText={this.state.searchText}
                                                highlighted={this.props.settings.commentBox.highlighted}
                                                chatBoxReaction={this.props.chatBoxReaction}
                                                changeReaction={this.chatBoxReactionHandler}
                                                />
                                        </ScrollView>
                                        { option }
                                    </View>
                                    { commentBox }
                                </Wrapper> : null}
                            </View>
                        </InnerScreen> : null}
                { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                { this.state.showSettings ?
                    <Settings 
                        page="commentBox"
                        closeSettings={this.closeSettingsHandler}/> : null}
                { this.state.showActionSheet ? 
                    <ActionSheet
                        options ={this.state.showActionSheet.option}
                        icons={this.state.showActionSheet.icon}
                        bottonIndex={this.actionSheetHandler}
                        title={"Choose"}
                        showSeparator/>
                    : null}
                { this.state.showSharePicker ? 
                    <SharePicker
                        shareType={this.state.showSharePicker.type}
                        closeSharePicker={this.closePickerHandler}
                        cnt={this.state.showSharePicker.cnt}/> : null}
                { this.state.showCamera ? 
                    <CameraComponent 
                        closePicker={this.closePickerHandler}
                        onPress={this.takePictureHandler}
                        camera={ref => this.camera = ref}
                        title="Camera"
                        icon={{name: 'camera-outline', color: '#fff'}}/>: null}
                { this.state.showVideoCamera ? 
                    <VideoCamera 
                        closePicker={this.closePickerHandler}
                        title="Video Recorder"
                        icon={{name: 'videocam-outline', color: '#fff'}}/>: null}
                { this.state.showAudioRecorder ? 
                    <AudioRecorder
                        closePicker={this.closePickerHandler}
                        title="Audio Recorder"
                        icon={{name: 'mic-outline', color: '#fff'}}
                        stopRecorder={this.stopAudioRecorderHandler}/>: null}
                { this.state.showEmoji ? 
                    <EmojiPicker
                        closePicker={this.closePickerHandler}
                        title="Emoji Selector"
                        emoji={this.emojiSelectHandler}/>: null}
                { this.state.uploadFile.length > 0 ?  
                    <UploadPreview
                        ref={(ref) => this.uploadPreview = ref}
                        rightSideContent={previewSubmitButton}
                        uploadFile={this.state.uploadFile}
                        closePreview={this.closePreviewHandler}/>: null}
                { this.state.showChatInfo && !this.props.deleteChat ?
                    <Option
                        option={this.state.showChatInfo.option}
                        info={this.state.showChatInfo.info}
                        overlay
                        closeOption={this.closeChatInfoHandler}
                        onPress={this.chatInfoOptionHandler}/>: null}
                { this.state.showPreview ? 
                    <MediaPreview
                        media={this.state.showPreview.media}
                        startPage={this.state.showPreview.startPage}
                        closePreview={this.closeModalHandler}
                        backgroundColor={this.state.backgroundColor}/> : null}
                 { this.props.deleteChatError || checkFetchError ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onDeleteChatReset} /> : null}
                { checkFetchError && this.props.fetchChatErr ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onFetchChatReset} /> : null}
                { checkFetchError && this.props.fetchReplyErr ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onFetchReplyReset} /> : null}
                 { this.props.deleteChat && !this.props.deleteChat.start ?  
                    <NotificationModal
                        info="Are you sure you want to delete this solution"
                        closeModal={this.deleteChatResetHandler}
                        button={[{title: 'Ok', onPress: this.deleteChatHandler, style: styles.buttonCancel},
                        {title: 'Exit', onPress: this.deleteChatResetHandler, style: styles.button}]}/> : null}
                { this.props.deleteChat && this.props.deleteChat.start ? 
                    <AbsoluteFill style={{zIndex: 9999999}}/> : null}
                { chatBoxReaction && !chatBoxReaction.confirm ? 
                    <NotificationModal
                        info={this.state.changeReaction.info}
                        closeModal={this.closeModalHandler}
                        button={[{title: 'Ok', onPress: () => this.chatBoxReactionHandler(this.state.changeReaction.cntID, this.state.changeReaction.title, this.state.changeReaction.reactionType, true), 
                            style: styles.buttonCancel},
                        {title: 'Exit', onPress: this.closeModalHandler, style: styles.button}]}/> : null}
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        width: '100%'
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionIcon: {
        paddingVertical: 0
    },
    chatBoxwrapper: {
        flex: 1,
        width: '100%'
    },
    formWrapperStyle: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0,
        borderRadius: 9999
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 18,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#dcdbdc',
        paddingHorizontal: 15
    },
    commentBox: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderTopColor: '#dcdbdc',
        borderTopWidth: 1,
        padding: 10
    },
    commentButtonShadow: {
        shadowOffset: {
            width: 0,
            height: 1
        },
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentBoxButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendButtonShadow: {
        shadowOffset: {
            width: 1,
            height: 1
        },
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#437da3'
    },
    scroll: {
        width: '100%',
        paddingBottom: 40
    },
    previewSubmitButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    button: {
        color: '#ff1600'
    },
    buttonCancel: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    replyCntWrapper: {
        backgroundColor: '#dcdbdc',
        marginBottom: 10
    },
    leftSideContent: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftSideContentText: {
        fontSize: 18,
        marginLeft: 10
    },
    userImageWrapper: {
        position: 'relative',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userStatus: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        bottom: -1,
        right: -1,
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#ff1600'
    },
    userStatusOn: {
        backgroundColor: '#16cf27'
    },
});
const mapStateToProps = state => {
    return {
        settings: state.settings,
        fetchChatStart: state.chatBox.fetchChatStart,
        fetchChatErr: state.chatBox.fetchChatError,
        fetchChat: state.chatBox.fetchChat,
        fetchReplyStart: state.chatBox.fetchReplyStart,
        fetchReplyErr: state.chatBox.fetchReplyError,
        fetchReply: state.chatBox.fetchReply,
        loadPreviousChat: state.chatBox.loadPreviousChat,
        loadPreviousReply: state.chatBox.loadPreviousReply,
        chatID: state.chatBox.chatID,
        username: state.chatBox.username,
        userImage: state.chatBox.userImage,
        userID: state.chatBox.userID,
        deleteChat: state.chatBox.deleteChat,
        deleteChatError: state.chatBox.deleteChatError,
        chatBoxReaction: state.chatBox.chatBoxReaction
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChatReset: () => dispatch(actions.chatBoxReset()),
        onFetchChat: (start, limit, chatType, cntID, page, pageID) => dispatch(actions.fetchChatInit(start, limit, chatType, cntID, page, pageID)),
        onFetchChatReset: () => dispatch(actions.fetchChatReset()),
        onSendChat: (chatType, cntID, page, pageID, formData) => dispatch(actions.sendChatInit(chatType, cntID, page, pageID, formData)),
        onDeleteChat: (chatType, chatID, page, pageID, cntType, cnt, start) => dispatch(actions.deleteChatInit(chatType, chatID, page, pageID, cntType, cnt, start)),
        onDeleteChatReset: () => dispatch(actions.deleteChatReset()),
        onReplyChat: (chatType, cntID, chatID, page, pageID, formData) =>  dispatch(actions.replyChatInit(chatType, cntID, chatID, page, pageID,formData)),
        onFetchReply: (start, limit, chatType, cntID, chatID) => dispatch(actions.fetchReplyInit(start, limit, chatType, cntID, chatID)),
        onFetchReplyReset: () => dispatch(actions.fetchReplyReset()),
        onChatBoxReaction: (chatType, cntID, page, reactionType, cnt, cntType, uriMethod, confirm) => dispatch(actions.chatBoxReactionInit(chatType, cntID, page, reactionType, cnt, cntType, uriMethod, confirm)),
        onChatBoxReactionReset: (cntID) => dispatch(actions.chatBoxReactionReset(cntID)),
    };
};

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(CommentBox));