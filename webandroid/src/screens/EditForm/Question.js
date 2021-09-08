import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Keyboard, StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';
import Text from 'text';

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
import InfoBox from '../../components/UI/InfoBox/InfoBox';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            backgroundColor: '#fff',
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
            inputUri: [],
            inputHashTag: [],
            showUpload: false,
            cntID: this.props.route.params ? this.props.route.params.cntID : null,
            loaded: false,
            fetchedUploadFile: [],
            resetAll: false
        }
    }


    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        if (this.state.cntID) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.onFetchEditForm(this.state.cntID);
                this.props.onPageReset();
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.setState({resetAll: true});
            });
        } else {
            this.props.navigation.navigate('Question')
        }
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentDidUpdate() {
        if (!this.state.loaded && this.props.editFormCnt) {
            let form = this.props.editFormCnt;
            let uploadFile = [];
            for (let cnt of form.media) {
                cnt = updateObject(cnt, {uri: `${Constants.manifest.extra.BASE_URL}media/${cnt.bucket}/${cnt.id}`,
                    type: cnt.ext, name: cnt.filename, description: cnt.description});
                uploadFile.push(cnt);
            }
            this.setState({
                formElement: {content: { value: form.content,validation: {required: true,minLength: 1 }, valid: true,touched: false } },
                formIsValid: true, inputHashTag: form.hashTag, loaded: true, uploadFile, fetchedUploadFile: uploadFile
            });
        }
        if (this.state.resetAll) {
            this._textEditor?._editor?.setText('');
            this.setState({
                formElement: {content: { value: '',validation: {required: true,minLength: 1 }, valid: false,touched: false } },
                formIsValid: false,showActionSheet: false, showCamera: false,showVideoCamera: false,showAudioRecorder: false,
                showEmoji: false,selection: {start: 0, end: 0},uploadFile: [],inputUri: [],inputHashTag: [], showUpload: false,
                loaded: false,fetchedUploadFile: [],resetAll: false
            })
        }
    }

    componentWillUnmount() {
        if (this.props.submitted && this.props.cntID) {
            this._unsubscribe();
            this._unsubscribeBlur();
        }
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchEditForm(this.state.cntID);
    }

    inputChangedHandler = (value, inputType) => {
        let uri = checkUri(value);
        let hashTag = checkHashtag(value);
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
        this.setState({formElement: updateFormElement, formIsValid, inputUri: uri ? uri : [],
        inputHashTag: hashTag ? hashTag: []})
    }

    inputChangePositionHandler  = ({ nativeEvent: { selection } }) => {
        this.setState({selection})
    }

    navigationHandler = (page) => {
        this.props.navigation.navigate(page);
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
        let removeMedia = this.state.fetchedUploadFile.filter(cnt => 
            !this.state.uploadFile.filter(file => file.id === cnt.id).length > 0);
        let uploadedMedia = this.state.uploadFile.filter(file => file.bucket ? true : false);
        let uploadFile = this.state.uploadFile.filter(file => file.bucket ? false : true);
        let cnt = {
            cntID: this.state.cntID,
            content: this.state.formElement.content.value,
            uploadFile,
            hashTag: this.state.inputHashTag,
            removeMedia,
            uploadedMedia
        }
        this.props.onSubmitForm(cnt);
    }

    resetFormHandler = () => {
        this.props.onFetchEditForm(this.state.cntID);
        this.setState({resetAll: true});
    }

    render() {
        let header = (
            this.state.viewMode === 'landscape' ? (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    title="Edit Question"
                />
            ) : null
        );

        let cnt = (
           <View style={styles.wrapper}>
                { header }
                <View style={styles.loaderCnt}>
                    <ActivityIndicator 
                        size="large"
                        animating
                        color="#437da3"/>
                </View>
           </View>
        );

        if (!this.props.editFormErr && (this.props.editFormCnt && this.state.loaded)){ 
            cnt = (
                <View style={styles.formWrapper}>
                    { header }
                    <View style={styles.formElementWrapper}>
                        <FormElement
                            ref={(ref) => this._textEditor = ref}
                            fullEditor
                            onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                            autoCorrect
                            multiline
                            autoFocus
                            placeholder={"Ask Question"}
                            editable={this.state.editable}
                            value={this.state.formElement.content.value}
                            formWrapperStyle={styles.formWrapperStyle}
                            inputWrapperStyle={styles.formWrapperStyle}
                            style={styles.formElementInput}
                            onSelectionChange={this.inputChangePositionHandler}/>
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
                                title="Edit"
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
                            info="Network Error"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.onSubmitFormReset}
                            button={[{title: 'Ok', onPress: this.props.onSubmitFormReset, style: styles.modalButton}]}/> : null}
                    { this.props.submitted ? 
                        <NotificationModal
                            info="Question updated successfully"
                            infoIcon={{name: 'cloud-upload-outline', color: '#16cf27', size: 40}}
                            closeModal={this.resetFormHandler}
                            button={[{title: 'View', onPress: () => this.navigationHandler('Question')},
                            {title: 'Edit', onPress: this.resetFormHandler, style: styles.modalButton}]}/> : null}
                </View>
            )
        }

        if (this.props.editFormErr) {
            cnt = (
                <View style={styles.wrapper}>
                    { header }
                    <View style={styles.loaderCnt}>
                        <InfoBox
                            det='Network Error'
                            name="cloud-offline-outline"
                            size={40}
                            color="#ff1600"
                            style={styles.info}/>
                        <View style={styles.loaderIcon}>
                            <TouchableOpacity onPress={this.reloadFetchHandler} style={styles.reload}>
                                <Ionicons name="reload-outline" size={18} color="#777"/>
                                <Text style={styles.reloadText}>Reload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        };

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
    wrapper: {
        width: '100%',
        flex: 1,
    },
    info: {
        fontSize: 18
    },
    loaderIcon: {
        marginBottom: 5
    },
    reload: {
        flexDirection: 'row'
    },
    reloadText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#777'
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    formWrapper: {
        width:'100%',
        position: 'relative',
        flex: 1,
        paddingBottom: 5
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
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16
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
        editFormErr: state.editForm.fetchQuestionError,
        editFormCnt: state.editForm.fetchQuestion,
        submitError: state.editForm.questionSubmitError,
        submitted: state.editForm.questionSubmitted,
        start: state.editForm.questionStart,
        cntID: state.editForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEditForm: (cntID) => dispatch(actions.fetchEditFormInit(cntID, 'question')),
        onSubmitForm: (formData) => dispatch(actions.submitEditFormInit(formData, 'question')),
        onPageReset: () => dispatch(actions.pageReset()),
        oonSubmitFormReset: () => dispatch(actions.submitEditFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);