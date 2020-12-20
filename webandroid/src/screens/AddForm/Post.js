import React, { Component } from 'react';
import { View, Text, Keyboard, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';


import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import FormElement from '../../components/UI/FormElement/FormElement';
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

class Post extends Component {
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
            inputUri: []
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
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentDidUpdate() {
        if (this.props.submitted && this.props.cntID) {
            this._unsubscribe();
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    inputChangedHandler = (value, inputType) => {
        let uri = checkUri(value);
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
        this.setState({formElement: updateFormElement, formIsValid, inputUri: uri ? uri : []})
    }

    inputChangePositionHandler  = ({ nativeEvent: { selection } }) => {
        this.setState({selection})
    }

    navigationHandler = (page) => {
    }

    showEmojiHandler = () => {
        Keyboard.dismiss();
        this.setState({showEmoji: true})
    }

    emojiSelectHandler = (emoji) => {
        let inputValue = String(this.state.formElement.content.value);
        let selection = this.state.selection;
        let diff = selection.end - selection.start
        let content = inputValue.slice(0, selection.start) + emoji.join('') + 
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
                this.setState({uploadFile: file, showActionSheet: false})
            }).catch(e => {
                if (e === 'useCamera') {this.setState({showCamera: true, showActionSheet: false})}
                this.setState({showActionSheet: false})
            })
        } else if (index === 1){
            if (Platform.OS === 'web') {
                this.setState({showActionSheet: false, showVideoCameara: true})
            } else {
                camera({type: "Videos"}).then(file => {
                    this.setState({uploadFile: file, showActionSheet: false})
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
        this.setState({showCamera: false, showAudioRecorder: false, showVideoCamera: false, showEmoji: false})
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

    submitHandler = () => {
        if (this.state.formIsValid) {
            //  let newCnt = {
            //      email: this.state.formElement.email.value,
            //      password: this.state.formElement.password.value
            //  }
            //  this.props.onSubmitForm(newCnt)
         return
        }
    }

    render() {
        let cnt = (
            <View style={styles.formWrapper}>
                { this.state.viewMode === 'landscape' ? (
                    <DefaultHeader 
                        onPress={() => this.props.navigation.goBack()}
                        title="Add Post"
                    />
                ): null}
                { this.props.submitError ?
                    <Text style={styles.error}>{this.props.submitError.message}</Text> : null
                }
                
                <View style={styles.formElementWrapper}>
                    <FormElement
                        onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                        autoCorrect
                        multiline
                        autoFocus
                        placeholder={"Write ...."}
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
                        </View>
                        <Button 
                            title="Add"
                            style={styles.button}
                            onPress={this.submitHandler}
                            disabled={!this.state.formIsValid}
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
    imageWrapper: {
        position: 'absolute',
        width: 52,
        height: 40,
        backgroundColor: '#fff',
        top: -20,
        zIndex: 1,
        resizeMode: 'cover',
        borderRadius: 5,
        alignSelf: 'center'
    },
    formElementWrapper: {
        position: 'relative',
        // borderRadius: 5,
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
        paddingBottom: 0
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 18
    }
})

const mapStateToProps = state => {
    return {
        submitError: state.addForm.postSubmitError,
        submitted: state.addForm.postSubmitted,
        start: state.addForm.postStart,
        cntID: state.addForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAddFormInit(formData)),
        onAddFormReset: () => dispatch(actions.addFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);