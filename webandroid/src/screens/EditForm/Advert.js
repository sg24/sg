import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Keyboard, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import Constants from 'expo-constants';
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
import { updateObject, checkValidity, checkUri } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import VideoCamera from '../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../components/UI/EmojiPicker/EmojiPicker';
import LinkPreview from '../../components/UI/LinkPreview/LinkPreview';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import UploadPreview from '../../components/UI/UploadPreview/UploadPreview'
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import CreateButton from '../../components/UI/CreateButton/CreateButton';
import CheckBox from '../../components/UI/CheckBox/CheckBox';

class Advert extends Component {
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
                    range: {start: 0, end: 20}
                },
                description: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false,
                    focus: false,
                    range: {start: 0, end: 30}
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
            selection: {title: {start: 0, end: 0}, description: {start: 0, end: 0}},
            uploadFile: [],
            inputUri: [],
            showUpload: false,
            createButtonValid: true,
            advertButton: [],
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
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.setState({resetAll: true});
            });
        } else {
            this.props.navigation.navigate('Home')
        }
        Dimensions.addEventListener('change', this.updateStyle);
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
                formElement: {title: { value: form.title, validation: { required: true,minLength: 1},valid: true,touched: false,focus: true, range: {start: String(form.title).length, end: 20} },
                description: { value: form.content, validation: {required: true,minLength: 1 }, valid: true,touched: false, focus: false, range: {start: String(form.content).length, end: 30} }, 
                comment: {value: form.enableComment, validation: {},valid: true}}, formIsValid: true, uploadFile,
                createButtonValid: true,advertButton: form.button, loaded: true,fetchedUploadFile: uploadFile
            });
        }
        if (this.state.resetAll) {
            this.setState({
                formElement: {title: { value: '', validation: { required: true,minLength: 1},valid: false,touched: false,focus: true, range: {start: 0, end: 20} },
                description: { value: '', validation: {required: true,minLength: 1 }, valid: false,touched: false, focus: false, range: {start: 0, end: 30} }, 
                comment: {value: true, validation: {},valid: true}}, formIsValid: false,showActionSheet: false,showCamera: false, showVideoCamera: false,showAudioRecorder: false,
                showEmoji: false, selection: {title: {start: 0, end: 0}, description: {start: 0, end: 0}},uploadFile: [],inputUri: [],showUpload: false,createButtonValid: true,advertButton: [],
                loaded: false,fetchedUploadFile: [],resetAll: false
            })
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchEditForm(this.state.cntID);
    }

    inputChangedHandler = (value, inputType) => {
        if (!this.state.formElement[inputType].range || String(value).length <= this.state.formElement[inputType].range.end) {
            let uri = checkUri(value);
            let range = inputType !== 'comment' ?  {range: updateObject(this.state.formElement[inputType].range , {
                start: String(value).length
            })} : {};
            let updateFormType = updateObject(this.state.formElement[inputType], {
                value,
                valid: checkValidity(value, this.state.formElement[inputType].validation),
                touched: true,
                ...range
            });
            let formIsValid = true;
            let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

            for (let inputType in updateFormElement) {
                formIsValid = updateFormElement[inputType].valid && formIsValid;
            }
            this.setState({formElement: updateFormElement, formIsValid, inputUri: uri ? uri : []})
        }
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

    advertButtonUriHandler = (inputUri) => {
        this.setState({inputUri})
    }

    advertButtonHandler = (formIsValid, advertButtonCnt) => {
        this.setState({createButtonValid: formIsValid, advertButton: advertButtonCnt})
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
            title: this.state.formElement.title.value,
            content: this.state.formElement.description.value,
            uploadFile,
            button: this.state.advertButton,
            comment: this.state.formElement.comment.value,
            removeMedia,
            uploadedMedia
        }
        this.props.onSubmitForm(cnt);
    }

    resetFormHandler = () => {
        this.createButtonMethod.resetButton();
        this.props.onFetchEditForm(this.state.cntID);
        this.setState({resetAll: true});
    }

    render() {
        let header = (
            this.state.viewMode === 'landscape' ? (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    title="Edit Advert"
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
        )

        if (!this.props.editFormErr && (this.props.editFormCnt || this.state.loaded)){ 
            cnt = (
                <View style={styles.formWrapper}>
                    { header }
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
                                    range={`${this.state.formElement.title.range.start}/${this.state.formElement.title.range.end}`}
                                    onFocus={() => this.inputFocusHandler('title')}
                                    style={styles.formElementInput}
                                    inputIconStyle={styles.inputIcon}/>
                                <FormElement
                                    labelTitle="Description"
                                    onChangeText={(val) => this.inputChangedHandler(val, 'description')}
                                    error="Description must not be empty"
                                    autoCorrect
                                    value={this.state.formElement.description.value}
                                    valid={!this.state.formElement.description.valid && this.state.formElement.description.touched}
                                    onSelectionChange={(e) => this.inputChangePositionHandler(e, 'description')}
                                    range={`${this.state.formElement.description.range.start}/${this.state.formElement.description.range.end}`}
                                    onFocus={() => this.inputFocusHandler('description')}
                                    style={styles.formElementInput}
                                    inputIconStyle={styles.inputIcon}/>
                                <CheckBox
                                    title="Enable Comment"
                                    checked={this.state.formElement.comment.value}
                                    onCheck={(val) => this.inputChangedHandler(val, 'comment')}/>
                                <CreateButton 
                                    ref={(ref) => this.createButtonMethod = ref}
                                    title="Create Advert Button"
                                    max={2}
                                    button={this.state.advertButton}
                                    updateButton={this.state.loaded}
                                    advertButtonUri={this.advertButtonUriHandler}
                                    advertButton={this.advertButtonHandler} />
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
                                title="Edit"
                                style={styles.button}
                                onPress={this.props.start ? null : this.submitHandler}
                                disabled={!this.state.formIsValid || this.props.start || !this.state.createButtonValid || this.props.submitted}
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
                            closeModal={this.props.onEditFormReset}
                            button={[{title: 'Ok', onPress: this.props.onEditFormReset, style: styles.modalButton}]}/> : null}
                    { this.props.submitted ? 
                        <NotificationModal
                            info="Advert updated successfully !"
                            infoIcon={{name: 'cloud-upload-outline', color: '#16cf27', size: 40}}
                            closeModal={this.resetFormHandler}
                            button={[{title: 'Edit', onPress: this.resetFormHandler, style: styles.modalButton}]}/> : null}
                </View>
            )
        }

        if (this.props.editFormErr) {
            cnt = (
                <View style={styles.wrapper}>
                    { header }
                    <View style={styles.loaderCnt}>
                        <InfoBox
                            det='Network Error!'
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
        }

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
        fontSize: 18
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
    },
    inputIcon: {
        width: 'auto'
    }
})

const mapStateToProps = state => {
    return {
        editFormErr: state.editForm.fetchAdvertError,
        editFormCnt: state.editForm.fetchAdvert,
        submitError: state.editForm.advertSubmitError,
        submitted: state.editForm.advertSubmitted,
        start: state.editForm.advertStart,
        cntID: state.editForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEditForm: (cntID) => dispatch(actions.fetchEditFormInit(cntID, 'advert')),
        onSubmitForm: (formData) => dispatch(actions.submitEditFormInit(formData, 'advert')),
        onEditFormReset: () => dispatch(actions.editFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Advert);