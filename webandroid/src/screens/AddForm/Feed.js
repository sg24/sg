import React, { Component } from 'react';
import { View, Text, Keyboard, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';


import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import FormElement from '../../components/UI/FormElement/FormElement';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity, checkUri, checkHashtag } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import VideoCamera from '../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../components/UI/EmojiPicker/EmojiPicker';
import LinkPreview from '../../components/UI/LinkPreview/LinkPreview';
import UploadPreview from '../../components/UI/UploadPreview/UploadPreview'
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import CheckBox from '../../components/UI/CheckBox/CheckBox';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            backgroundColor: '#fff',
            formElement: {
                title: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false,
                    focus: true,
                    inputHashTag: []
                },
                content: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false,
                    focus: false,
                    inputHashTag: []
                },
                comment: {
                    value: true,
                    validation: {
                    },
                    valid: true,
                }
            },
            formIsValid: false,
            showActionSheet: false,
            showCamera: false,
            showVideoCamera: false,
            showAudioRecorder: false,
            showEmoji: false,
            selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},
            uploadFile: [],
            inputUri: [],
            showUpload: false
        }
    }


    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onAddFormReset();
            this.props.onPageReset();
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.resetFormHandler();
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    inputChangedHandler = (value, inputType) => {
        let uri = checkUri(value);
        let hashTag = checkHashtag(value);
        let allowHashTag = inputType !== 'comment' ? {inputHashTag: hashTag ? hashTag: []} : {};
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value,
            valid: checkValidity(value, this.state.formElement[inputType].validation),
            touched: true,
            ...allowHashTag
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }
        this.setState({formElement: updateFormElement, formIsValid, inputUri: uri ? uri : []})
    }

    inputChangePositionHandler  = ({ nativeEvent: { selection } }, inputType) => {
        let updateSelection = updateObject(this.state.selection, {[inputType]: selection});
        this.setState({selection: updateSelection})
    }

    inputFocusHandler = (inputType) => {
        let formElement  = this.state.formElement;
        for (let input in this.state.formElement) {
            formElement[input].focus = false;
        }
        let updateFormType = updateObject(this.state.formElement[inputType], {focus: true});
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})
        this.setState({formElement: updateFormElement})
    }

    navigationHandler = (page) => {
        this.props.navigation.navigate(page);
    }

    showEmojiHandler = () => {
        Keyboard.dismiss();
        this.setState({showEmoji: true})
    }

    emojiSelectHandler = (emoji) => {
        let inputType;
        for (let input in this.state.formElement) {
            if (this.state.formElement[input].focus) {
                inputType = input
            }
        }
        let inputValue = String(this.state.formElement[inputType].value);
        let selection = this.state.selection;
        let diff = selection[inputType].end - selection[inputType].start
        let content = inputValue.slice(0, selection[inputType].start) + emoji.join(' ') + 
            inputValue.slice(selection[inputType].start + diff, inputValue.length)
        this.inputChangedHandler(content, inputType);
        this.setState({showEmoji: false})
    }


    pickImageHandler = () => {
        Keyboard.dismiss();
        this.setState({showActionSheet: true})
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

    submitHandler = () => {
        let cnt = {
            title: this.state.formElement.title.value,
            content: this.state.formElement.content.value,
            uploadFile: this.state.uploadFile,
            hashTag: [...this.state.formElement.title.inputHashTag, ...this.state.formElement.content.inputHashTag],
            comment: this.state.formElement.comment.value
        }
        this.props.onSubmitForm(cnt)
    }

    resetFormHandler = () => {
        this.props.onAddFormReset();
        this._textEditor?._editor?.setText('');
        this.setState({
            formElement: { title: { value: '',validation: {required: true, minLength: 1},valid: false,touched: false, focus: true, inputHashTag: []},
            content: { value: '',validation: {required: true, minLength: 1 },  valid: false, touched: false,focus: false, inputHashTag: []},
            comment: {value: true, validation: {}, valid: true } },formIsValid: false,showActionSheet: false,showCamera: false,
            showVideoCamera: false,showAudioRecorder: false, showEmoji: false,selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},
            uploadFile: [],inputUri: [], showUpload: false
        })
    }

    render() {
        let cnt = (
            <View style={styles.formWrapper}>
                { this.state.viewMode === 'landscape' ? (
                    <DefaultHeader 
                        onPress={() => this.props.navigation.goBack()}
                        title="Add Feed"
                    />
                ): null}
                <View style={styles.formElementWrapper}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.formWrapperStyle}>
                            <FormElement
                                labelTitle="Title"
                                onChangeText={(val) => this.inputChangedHandler(val, 'title')}
                                error="Title must not be empty"
                                autoCorrect
                                autoFocus
                                value={this.state.formElement.title.value}
                                valid={!this.state.formElement.title.valid && this.state.formElement.title.touched}
                                onSelectionChange={(e) => this.inputChangePositionHandler(e, 'title')}
                                onFocus={() => this.inputFocusHandler('title')}
                                style={styles.formElementInput}/>
                            <FormElement
                                ref={(ref) => this._textEditor = ref}
                                fullEditor
                                labelTitle="Content"
                                onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                                error="Content must not be empty"
                                autoCorrect
                                multiline
                                numberOfLines={4}
                                value={this.state.formElement.content.value}
                                valid={!this.state.formElement.content.valid && this.state.formElement.content.touched}
                                onSelectionChange={(e) => this.inputChangePositionHandler(e, 'content')}
                                onFocus={() => this.inputFocusHandler('content')}
                                style={styles.formElementEditor}/>
                            <CheckBox 
                                title="Enable Comment"
                                checked={this.state.formElement.comment.value}
                                onCheck={(val) => this.inputChangedHandler(val, 'comment')}/>
                        </View>
                    </ScrollView>
                    {this.state.inputUri.length > 0 ? 
                            <LinkPreview 
                                links={this.state.inputUri}/>: null}
                    <View style={styles.formElementButton}>
                        <View style={styles.formButtonWrapper}>
                            <Button 
                                style={styles.icon}
                                onPress={this.pickImageHandler}> 
                                <Ionicons name="camera-outline" size={22} />
                            </Button>
                            <Button 
                                style={styles.icon}
                                onPress={this.showEmojiHandler}>
                                <Ionicons name="happy-outline" size={22}/>
                            </Button>
                            <Button 
                                style={styles.icon}
                                onPress={this.showUploadHandler}>
                                <BoxShadow style={styles.explorer}>
                                    <Text>{this.state.uploadFile.length}</Text>
                                </BoxShadow>
                                <Ionicons name="cloud-upload-outline" size={22}/>
                            </Button>
                        </View>
                        <Button 
                            title="Add"
                            style={styles.button}
                            onPress={this.props.start ? null : this.submitHandler}
                            disabled={!this.state.formIsValid || this.props.start || this.props.submitted}
                            textStyle={styles.textStyle}
                            submitting={this.props.start}
                            loaderStyle="#fff"/>
                    </View>
                </View>
                { this.state.showActionSheet ? 
                    <ActionSheet
                        options ={['Take Picture', 'Video Record', 'Audio Record', 'File Explorer']}
                        icons={['camera-outline', 'videocam-outline', 'mic-outline', 'documents-outline']}
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
                 { this.props.submitError ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onAddFormReset}
                        button={[{title: 'Ok', onPress: this.props.onAddFormReset, style: styles.modalButton}]}/> : null}
                { this.props.submitted ? 
                    <NotificationModal
                        info="Feed submitted successfully !"
                        infoIcon={{name: 'cloud-upload-outline', color: '#16cf27', size: 40}}
                        closeModal={this.resetFormHandler}
                        button={[{title: 'View', onPress: () => this.navigationHandler('Feed')},
                        {title: 'Add', onPress: this.resetFormHandler, style: styles.modalButton}]}/> : null}
            </View>
        )
      return (
        <NoBackground
            sideBar={(
                <>
                <Navigation 
                        color={this.state.color}
                        backgroundColor={this.state.backgroundColor}/>
                <CreateNavigation 
                    color={this.state.color}
                    backgroundColor={this.state.backgroundColor}/>
                </>
            )}
            content={ cnt }
            contentFetched>
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    formWrapper: {
        width:'100%',
        position: 'relative',
        flex: 1,
        paddingBottom: 5
    },
    scroll: {
        width: '100%'
    },
    formElementWrapper: {
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '#fff',
        flex: 1
    },
    formElementButton: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#dcdbdc',
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formButtonWrapper: {
        flexDirection: 'row'
    },
    button: {
        width: 70,
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    icon: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#ff1600'
    },
    formWrapperStyle: {
        flex: 1,
        paddingVertical: 10,
        width:'100%',
        alignItems: 'flex-start'
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16
    },
    formElementEditor: {
        fontSize: 16,
        height: 150
    },
    explorer: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdbdc',
        top: -3,
        right: -3
    }
})

const mapStateToProps = state => {
    return {
        submitError: state.addForm.feedSubmitError,
        submitted: state.addForm.feedSubmitted,
        start: state.addForm.feedStart,
        cntID: state.addForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAddFormInit(formData, 'feed')),
        onPageReset: () => dispatch(actions.pageReset()),
        onAddFormReset: () => dispatch(actions.addFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);