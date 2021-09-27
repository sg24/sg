import React, { Component } from 'react';
import { View, Image, ImageBackground, ActivityIndicator, StyleSheet, Keyboard, Dimensions, Platform, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import Constants from 'expo-constants';
import { v4 as uuid } from 'uuid';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';
import urischeme from 'urischeme';
import Text, { translator } from 'text';

import ChatItem from '../../components/UI/ChatBox/ChatItem/ChatItem';
import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import InnerScreen from '../../components/UI/InnerScreen/InnerScreen';
import { size } from 'tailwind';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import SearchHeader from '../../components/UI/Header/Search';
import Button from '../../components/UI/Button/Button';
import TouchableNativeFeedback from '../../components/UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Option from '../../components/UI/Option/Option';
import * as actions from '../../store/actions/index';
import  { updateObject, checkValidity, socket } from '../../shared/utility';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import FormElement from '../../components/UI/FormElement/FormElement';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import VideoCamera from '../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../components/UI/EmojiPicker/EmojiPicker';
import UploadPreview from '../../components/UI/UploadPreview/UploadPreview';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import Settings from '../../components/UI/Settings/Settings';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            containerHeight: null,
            backgroundColor: '#fff',
            color: '#333',
            room: uuid(),
            title: this.props.route.params.title,
            chatType: this.props.route.params.chatType,
            page: this.props.route.params.page,
            pageID: this.props.route.params.pageID,
            cntID: this.props.route.params.cntID,
            showChatReply: this.props.route.params.showReply,
            enableComment: this.props.route.params.enableComment,
            enableDelete: this.props.route.params.enableDelete,
            showHeaderImage: this.props.route.params.showHeaderImage,
            info: this.props.route.params.info,
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
            chatBoxLayout: [],
            width: 0
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  'portrait'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onFetchChat(this.props.fetchChat ? this.props.fetchChat.length : 0, this.props.settings.commentBox.fetchLimit, this.state.chatType, this.state.cntID, this.state.page, this.state.pageID);
                socket.emit('join', 'private', this.props.userID, this.state.pageID, this.state.room, (status) => {
            });
            let these = this;
            socket.on('recieveChat', (cnt, room) => {
                let allowUpdate = these.props.fetchChat.filter(chat => chat._id === cnt._id).length < 1 ? true : false;
                if (allowUpdate && (this.state.room === room)) {
                    these.props.onUpdateChat(cnt);
                    if (these.scroll) {
                       setTimeout(() => {
                        these.scroll.scrollToEnd({animated: true});
                       }, 1000)
                    }
                }
            });
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onChatReset();
            socket.off('recieveChat');
            this.setState({ 
                showOption: false,option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},{title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
                formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
                formIsValid: false,showActionSheet: false,showCamera: false,showVideoCamera: false,showAudioRecorder: false,showEmoji: false,showSharePicker: false,showSettings: false,selection: {start: 0, end: 0},uploadFile: [],showChatOption: null,
                showChatInfo: null,showSearch: false,searchText: '',replyChatBox: null,editChatBox: null,showPreview: null,showReply: null,searchHashTag: false,editUploadFile: null,chatBoxLayout: [],width: 0
            })
        });
    }

    componentDidUpdate() {
        if (this.props.fetchChat && (this.props.fetchChat.length !== this.state.width)) {
            this.setState({width: this.props.fetchChat.length})
        }
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onChatReset();
        this._unsubscribe();
        this._unsubscribeBlur();
        socket.off('recieveChat');
    }

    reloadFetchHandler = () => {
        if (this.props.fetchReplyErr) {
            this.props.onFetchReply(this.props.fetchReply ? this.props.fetchReply.length : 0, this.props.settings.commentBox.fetchLimit, this.state.chatType, this.props.chatID, this.state.showReply._id);
            return
        }
        this.props.onFetchChat(this.props.fetchChat ? this.props.fetchChat.length : 0, this.props.settings.commentBox.fetchLimit, this.state.chatType, this.state.cntID, this.state.page, this.state.pageID);
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
        this.setState({showOption: false, showChatOption: null, showChatInfo: null,  editChatBox: null, showPreview: null,
            replyChatBox: null});
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

    showChatOptionHandler = (cnt, direction, e, isText) => {
        let updateCnt = {...cnt};
        delete updateCnt.replyChatID
        let copyOpt = cnt.media.length < 1 || isText === true ? [
            {title: 'Share', icon: {name: 'paper-plane-outline'}, action: 'share'},
            {title: 'Copy Text', icon: {name: 'clipboard-outline'}, action: 'copy'}
        ] : [{title: 'Share', icon: {name: 'paper-plane-outline'}, action: 'share'}]
        let deleteOpt = cnt.reply && cnt.reply.length < 1 && this.props.userID === cnt.authorID ? [
            ...copyOpt,
            {title: 'Delete', icon: {name: 'trash-bin-outline'}, action: 'delete'}] : 
            copyOpt;
        let enableReply = this.state.showReply || this.state.replyChatBox  || (cnt.reply && cnt.reply.length > 0 && this.state.showChatReply ) ? [] : [
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
        locationX:  e.nativeEvent.locationX, cnt: updateCnt}, showOption: false, showChatInfo: null,  editChatBox: null});
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
            cnt: {...this.state.showChatOption.cnt, cntType: 'users'}}})
        }
        if (action === 'delete') {
            return this.props.onDeleteChat(this.state.chatType, this.props.chatID, this.state.page, this.state.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
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
            this.props.onDeleteChat(this.state.chatType, this.props.chatID, this.state.page, this.state.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
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
            this.props.onDeleteChat(this.state.chatType, this.props.chatID, this.state.page, this.state.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
            this.state.showChatInfo.cnt, true);
        } else if (this.state.showChatOption) {
            this.props.onDeleteChat(this.state.chatType, this.props.chatID, this.state.page, this.state.pageID, this.state.showReply ? 'deleteReply' : 'deleteChat', 
            this.state.showChatOption.cnt, true);
        }
        this.closeModalHandler();
    }

    deleteChatResetHandler = () => {
        this.props.onDeleteChatReset();
        this.closeModalHandler();
    }

    scrollToChatHandler = (replyChatBox) => {
        let chatBoxLayout = this.state.chatBoxLayout;
        let chatBoxPosition = chatBoxLayout.filter(cnt => cnt.chatBoxID === replyChatBox._id)[0];
        if (chatBoxPosition && this.scroll) {
            this.scroll.scrollTo({y: chatBoxPosition.layout.y});
            return;
        }
        let chatPosition = this.props.fetchChat.filter(cnt => (cnt._id === replyChatBox._id) && cnt.scrollID)[0];
        if (chatPosition && this.scroll) {
            chatBoxPosition = chatBoxLayout.filter(cnt => cnt.chatBoxID === chatPosition.scrollID)[0];
            if (chatBoxPosition && this.scroll) {
                this.scroll.scrollTo({y: chatBoxPosition.layout.y});
                return;
            }
        }
        this.scroll.scrollTo({y:0});
        alert(translator('Load more to scroll to chat'))
    }

    chatBoxPositionHandler = (layout, chatBoxID, scrollID) => {
        chatBoxID = chatBoxID ? chatBoxID : scrollID 
        if (chatBoxID && !this.state.replyChatBox) {
            let chatBoxLayout = [...this.state.chatBoxLayout];
            let chatBoxItem = chatBoxLayout.filter(cnt => cnt.chatBoxID === chatBoxID)[0];
            if (chatBoxItem) {
                chatBoxItem.layout = layout;
                let chatBoxItemIndex = chatBoxLayout.findIndex(cnt => cnt.chatBoxID === chatBoxID)
                chatBoxLayout[chatBoxItemIndex] = chatBoxItem;
                this.setState({chatBoxLayout});
            } else {
                chatBoxLayout.push({layout, chatBoxID});
                this.setState({chatBoxLayout});
            }
        }
    }

    showReplyHandler = (cnt) => {
        this.props.onFetchReply(this.props.fetchReply ? this.props.fetchReply.length : 0, this.props.settings.commentBox.fetchLimit, this.state.chatType, this.props.chatID, cnt._id);
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
            this.props.onFetchReply(this.props.fetchReply ? this.props.fetchReply.length : 0, this.props.settings.commentBox.fetchLimit, this.state.chatType, this.props.chatID, this.state.showReply._id);
            return
        }
        this.props.onFetchChat(this.props.fetchChat ? this.props.fetchChat.length : 0, this.props.settings.commentBox.fetchLimit, this.state.chatType, this.state.cntID, this.state.page, this.state.pageID);
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

    showProfileHandler = () => {
        this.props.navigation.navigate('Profile', {userID: this.state.pageID})
    }

    sendChatHandler = (content) => {
        Keyboard.dismiss();
        if (!this.state.editChatBox && !this.state.showReply) {
            let replyChatInfo = this.state.replyChatBox ? [{
                _id: this.state.replyChatBox._id, authorID: this.state.replyChatBox.authorID, content: this.state.replyChatBox.content, media: this.state.replyChatBox.media,
                tempFileID: this.state.replyChatBox.tempFileID
            }] : [];
            this.props.onSendChat(this.state.chatType, this.props.chatID, this.state.page, this.state.pageID, updateObject(content, {
                sendChatID: uuid(), sent: false, fail: false, username: this.props.username, userImage: this.props.userImage,
                authorID: this.props.userID, reply: [], replyChatInfo, replyChatID: this.state.replyChatBox ? this.state.replyChatBox._id : null, 
                replyChat: this.state.replyChatBox ? true : false, scrollID: uuid()}));
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
        if (this.state.showReply) {
            let cnt = this.state.showReply;
            this.props.onReplyChat(this.state.chatType, this.props.chatID, cnt._id, this.state.page, this.state.pageID, updateObject(content, {
                sendChatID: uuid(), sent: false, fail: false, username: this.props.username, userImage: this.props.userImage,
                authorID: this.props.userID, reply: [], replyChatID: cnt._id}));
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
                this.props.onReplyChat(this.state.chatType, this.props.chatID, this.state.showReply._id, this.state.page, this.state.pageID, updateObject(resendChatCnt, content));
            } else {
                this.props.onSendChat(this.state.chatType, this.props.chatID, this.state.page, this.state.pageID, updateObject(resendChatCnt, content));
            }
        }
        this.closeModalHandler();
    }

    render() {
        let checkFetchError = (this.props.fetchChat && this.props.fetchChat.length > 0 && this.props.fetchChatErr) || 
        (this.props.fetchReply && this.props.fetchReply.length > 0 && this.props.fetchReplyErr)
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
        if (this.state.info && this.state.info.status) {
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
        if (this.state.info && this.state.info.image) {
            headerImg = (
                <View>
                    <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${this.state.info.image}`}} style={styles.userImageWrapper}/>
                    { userStatus }
                </View>
            )
        }

        let header = (
            <DefaultHeader
                onPress={() => this.props.navigation.goBack()}
                title={this.state.title}
                leftSideContent={this.state.showHeaderImage ? (
                    <TouchableNativeFeedback onPress={this.showProfileHandler}>
                        <View style={styles.leftSideContent}>
                            { headerImg }
                            {this.state.info && this.state.info.title ? 
                            <Text style={styles.leftSideContentText} numberOfLines={1}>{ this.state.info.title }</Text> : null}
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
                    title="Search "
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
                                chatBoxPosition={this.chatBoxPositionHandler}
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
                        showOption={this.showChatOptionHandler}
                        sendChatInfo={this.sendChatInfoHandler}
                        deleteChatBox={this.props.deleteChat}
                        editChatBox={this.state.editChatBox}
                        preview={this.mediaPreviewHandler}
                        enableReply
                        openURI={this.openURIHandler}
                        chatBoxPosition={this.chatBoxPositionHandler}/>
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
                                showReply={this.state.showChatReply}
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
                                scrollToChat={this.scrollToChatHandler}
                                chatBoxPosition={this.chatBoxPositionHandler}
                                width={this.state.width}/>
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

        let allCnt = (
            <View style={styles.wrapper}>
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
                                                scrollToChat={this.scrollToChatHandler}
                                                chatBoxPosition={this.chatBoxPositionHandler}/>
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
                        info="Are you sure you want to delete this chat"
                        closeModal={this.deleteChatResetHandler}
                        button={[{title: 'Ok', onPress: this.deleteChatHandler, style: styles.buttonCancel},
                        {title: 'Exit', onPress: this.deleteChatResetHandler, style: styles.button}]}/> : null}
                { this.props.deleteChat && this.props.deleteChat.start ? 
                    <AbsoluteFill style={{zIndex: 9999999}}/> : null}
            </View>
        )

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
                content={ allCnt }
                contentFetched={this.props.fetchChat}>
            </NoBackground>
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
        userID: state.auth.userID,
        deleteChat: state.chatBox.deleteChat,
        deleteChatError: state.chatBox.deleteChatError
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
        onUpdateChat: (cnt) => dispatch(actions.updateChat(cnt))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);