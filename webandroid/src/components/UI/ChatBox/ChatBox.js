import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Keyboard,  Dimensions, Platform, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { v4 as uuid } from 'uuid';

import ChatItem from './ChatItem/ChatItem';
import { size } from 'tailwind';
import InnerScreen from '../InnerScreen/InnerScreen';
import DefaultHeader from '../Header/DefaultHeader';
import Button from '../Button/Button';
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

class MediaPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            showOption: false,
            option: [{title: 'Note', icon: {name: 'create-outline'}, action: 'save'},
                {title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
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
            selection: {start: 0, end: 0},
            uploadFile: [],
            showChatOption: null,
            showChatInfo: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  'portrait'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        this.props.onFetchChat(this.props.start, 10, this.props.chatType, this.props.cntID, this.props.page, this.props.pageID);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchChat(this.props.start, 10, this.props.chatType, this.props.cntID, this.props.page, this.props.pageID);
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

    closeModalHandler = () => {
        this.setState({showOption: false, showChatOption: null});
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption
        }))
    }


    closeOptionHandler = () => {
        this.setState({showOption: false})
    }

    optionHandler = (action) => {
        if (action === 'Save') {
        }
    }

    showChatOptionHandler = (cnt, e) => {
        this.setState({showChatOption: { option: [{title: 'Edit', icon: {name: 'pencil-outline'}, action: 'edit'},
        {title: 'Delete', icon: {name: 'trash-bin-outline'}, action: 'delete'},
        {title: 'Reply', icon: {name: 'arrow-redo-outline'}, action: 'reply'},
        {title: 'Share', icon: {name: 'paper-plane-outline'}, action: 'share'},
        {title: 'Copy Text', icon: {name: 'clipboard-outline'}, action: 'copy'}],
        pageY: e.nativeEvent.pageY - e.nativeEvent.locationY, 
        locationX:  e.nativeEvent.locationX, cnt}});
    }

    closeChatOptionHandler = () => {
        this.setState({showChatOption: null})
    }

    chatOptionHandler = async (action) => {
        if (action === 'copy') {
            Clipboard.setString(this.state.showChatOption.cnt.content);
        }
        if (action === 'share') {
            this.setState({showActionSheet: {option: ['Friends', 'Groups', 'Chat Room'],
            icon: ['people-outline', 'chatbox-outline', 'chatbubble-ellipses-outline']}})
        }
        this.setState({showChatOption: null});
    }

    sendChatInfoHandler = (cnt, e) => {
        this.setState({showChatInfo: {
            info: 'Message not sent, check your connnection',
            option: [{title: 'Edit', icon: {name: 'pencil-outline'}, action: 'edit'},
            {title: 'Delete', icon: {name: 'trash-bin-outline'}, action: 'delete'},
            {title: 'Resend', icon: {name: 'clipboard-outline'}, action: 'resend'}]}});
    }

    closeChatInfoHandler = () => {
        this.setState({showChatInfo: null})
    }

    showEmojiHandler = () => {
        Keyboard.dismiss();
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
        Keyboard.dismiss();
        this.setState({showActionSheet: {option: ['Take Picture', 'Video Record', 'Audio Record', 'File Explorer'],
            icon: ['camera-outline', 'videocam-outline', 'mic-outline', 'documents-outline']}})
    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
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
        }else if (index === 3){
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
        this.setState({showCamera: false, showAudioRecorder: false, showVideoCamera: false, showEmoji: false, showUpload: false})
    }

    closePreviewHandler = (files) => {
        this.setState({showCamera: false, showAudioRecorder: false, showVideoCamera: false, showEmoji: false, showUpload: false, uploadFile: [...files]})
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

    showUploadHandler = () => {
        this.setState({showUpload: true })
    }

    userProfileHandler = () => {
        
    }

    sendChatHandler = (content) => {
        this.props.onSendChat(this.props.chatType, this.props.cntID, updateObject(content, {
            sendChatID: uuid(), sent: false, fail: false, username: this.props.username, userImage: this.props.userImage,
            authorID: this.props.userID}));
        this.setState({ formElement: {content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}},
            formIsValid: false})
    }

    render() {
        let loader = (
            <View style={styles.loaderCnt}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        );

        let cnt = loader;

        if (this.props.fetchChat) {
            cnt = (
                <View style={styles.wrapper}>
                   <View style={styles.chatBoxwrapper}>
                        <ScrollView style={styles.scroll}>
                            <ChatItem 
                                cnt={[{sendChatID: '12', fail: true, content: ' SCholars rooms SCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars rooms ' , username: this.props.username, userImage: this.props.userImage,
                                authorID: this.props.userID, _id: '1200'},
                            {sendChatID: '1200', content: ' SCholars rooms SCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars rooms ' , username: this.props.username, userImage: this.props.userImage,
                                authorID: this.props.userID},
                                {sendChatID: '1200', content: ' SCholars rooms SCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars roomsSCholars rooms ' , username: this.props.username, userImage: this.props.userImage,
                                authorID: 'id', fail: true}]}
                                showReply={this.props.showReply}
                                userID={this.props.userID}
                                userProfile={this.userProfileHandler}
                                showOption={this.showChatOptionHandler}
                                sendChatInfo={this.sendChatInfoHandler}/>
                            { this.state.showChatOption ? (
                                <Option
                                    option={this.state.showChatOption.option}
                                    closeOption={this.closeChatOptionHandler}
                                    wrapperStyle={{top: this.state.showChatOption.pageY, right: 'auto', left: this.state.showChatOption.locationX}}
                                    onPress={this.chatOptionHandler}/>
                            ) : null}
                        </ScrollView>
                   </View>
                    <View style={styles.commentBox}>
                        <BoxShadow
                            style={styles.commentButtonShadow}>
                            <Button
                                style={styles.commentBoxButton}>
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
                            autoFocus
                            placeholder={"Write ...."}
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
                </View>
            );
        }

        if (this.props.fetchChatErr) {
            cnt = (
                <ErrorInfo 
                    viewMode={this.state.viewMode}
                    reload={this.reloadFetchHandler}/>
            )
        }

        return (
            <InnerScreen
                onRequestClose={this.props.closeChat}
                animationType="slide"
                onBackdropPress={this.props.closeChat}>
                <DefaultHeader
                    onPress={this.props.closeChat}
                    title={this.props.title}
                    rightSideContent={(
                        <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                            <Ionicons name="ellipsis-vertical-outline" size={20} />
                        </Button>
                    )}/>
                <View style={styles.wrapper}>
                    { cnt }
                </View>
                { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                { this.state.showActionSheet ? 
                    <ActionSheet
                        options ={this.state.showActionSheet.option}
                        icons={this.state.showActionSheet.icon}
                        bottonIndex={this.actionSheetHandler}
                        title={"Choose"}
                        showSeparator/>
                    : null}
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
                { this.state.showUpload ?  
                    <UploadPreview
                        uploadFile={this.state.uploadFile}
                        closePreview={this.closePreviewHandler}/>: null}
                { this.state.showChatInfo ? (
                    <Option
                        option={this.state.showChatInfo.option}
                        info={this.state.showChatInfo.info}
                        overlay
                        closeOption={this.closeChatInfoHandler}
                        onPress={this.optionHandler}/>
                ) : null}
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
        borderColor: '#dcdbdc'
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
        paddingHorizontal: 10
    }
});
const mapStateToProps = state => {
    return {
        start: state.chatBox.start,
        fetchChatErr: state.chatBox.fetchChatError,
        fetchChat: state.chatBox.fetchChat,
        username: state.chatBox.username,
        userImage: state.chatBox.userImage,
        userID: state.chatBox.userID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchChat: (start, limit, chatType, cntID, page, pageID) => dispatch(actions.fetchChatInit(start, limit, chatType, cntID, page, pageID)),
        onSendChat: (chatType, cntID, formData) => dispatch(actions.sendChatInit(chatType, cntID, formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPreview);