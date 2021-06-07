import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Keyboard, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';
import { v4 as uuid } from 'uuid';

import NoBackground from '../../../components/UI/NoBackground/NoBackground';
import Navigation from '../../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import FormElement from '../../../components/UI/FormElement/FormElement';
import BoxShadow from '../../../components/UI/BoxShadow/BoxShadow';
import Button from '../../../components/UI/Button/Button';
import DefaultHeader from '../../../components/UI/Header/DefaultHeader';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity, checkUri, checkHashtag } from '../../../shared/utility';
import ActionSheet from '../../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../../components/UI/Camera/Camera';
import VideoCamera from '../../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../../components/UI/EmojiPicker/EmojiPicker';
import LinkPreview from '../../../components/UI/LinkPreview/LinkPreview';
import UploadPreview from '../../../components/UI/UploadPreview/UploadPreview';
import NotificationModal from '../../../components/UI/NotificationModal/NotificationModal';
import InfoBox from '../../../components/UI/InfoBox/InfoBox';
import CheckBox from '../../../components/UI/CheckBox/CheckBox';
import Select from '../../../components/UI/Select/Select';
import ExamContent from '../ExamContent/ExamContent';

class CBT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            backgroundColor: '#fff',
            id: uuid(),
            duration: {
                hour: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1,
                        maxNumber: 24,
                        numbersOnly: true
                    },
                    valid: false,
                    touched: false
                },
                minute: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1,
                        maxNumber: 59,
                        numbersOnly: true
                    },
                    valid: false,
                    touched: false
                },
                second: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1,
                        maxNumber: 59,
                        numbersOnly: true
                    },
                    valid: false,
                    touched: false
                },
            },
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
                },
                result: {
                    value: false,
                    validation: {
                    },
                    valid: true,
                },
                delete: {
                    value: false,
                    validation: {
                    },
                    valid: true,
                },
                participant: {
                    value: '',
                    validation: {
                    },
                    option:  [{title: 'Public', icon: {name: 'lock-open-outline', size: 18}},
                    {title: 'Private', icon: {name: 'lock-closed-outline', size: 18}}],
                    valid: false,
                }
            },
            formIsValid: false,
            durationIsValid: false,
            durationError: null,
            totalDuration: 0,
            showActionSheet: false,
            showCamera: false,
            showVideoCamera: false,
            showAudioRecorder: false,
            showEmoji: false,
            selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},
            uploadFile: [],
            inputUri: [],
            addExam: false,
            showUpload: false,
            examDetail: null,
            resetAll: false,
            cntID: this.props.route.params ? this.props.route.params.cntID : null,
            loaded: false,
            fetchedUploadFile: [],
            fetchedQuestion: {}
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
            this.props.navigation.navigate(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group')
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
              let duration = form.hour + form.minute + form.second;
            let hour = String(form.hour) === '0' ? '' : String(form.hour);
            let minute = String(form.minute) === '0' ? '' : String(form.minute);
            let second = String(form.second) === '0' ? '' : String(form.second);
            this.setState({
                id: uuid(),duration: {hour: { value: hour,validation: {required: true,minLength: 1,maxNumber: 24,numbersOnly: true },valid: hour ? true : false,touched: false},
                minute: {value: minute,validation: {required: true,minLength: 1,maxNumber: 59,numbersOnly: true},valid: minute ? true : false,touched: false},
                second: {value: second,validation: {required: true,minLength: 1,maxNumber: 59,numbersOnly: true},valid: second ? true : false,touched: false},},
                formElement: {title: {value: form.title,validation: {required: true,minLength: 1},valid: true,touched: false,focus: true,inputHashTag: checkHashtag(form.title)},
                content: {value: form.content,validation: {required: true,minLength: 1},valid: true,touched: false,focus: false,inputHashTag: checkHashtag(form.content)},
                comment: {value: form.enableComment,validation: {},valid: true,},result: {value: form.showResult,validation: {},valid: true,},delete: {value: form.enableDelete,validation: {},valid: true,},
                participant: {value: form.participant,validation: {},option:  [{title: 'Public', icon: {name: 'lock-open-outline', size: 18}},{title: 'Private', icon: {name: 'lock-closed-outline', size: 18}}],valid: true,}},
                formIsValid: true,durationIsValid: true,durationError: null,totalDuration: form.duration,uploadFile,loaded: true,fetchedUploadFile: uploadFile,fetchedQuestion: form.cbt ? form.cbt : {}
            });
        }
        if (this.state.resetAll) {
            this.setState({
                id: uuid(),duration: {hour: { value: '',validation: {required: true,minLength: 1,maxNumber: 24,numbersOnly: true },valid: false,touched: false},
                minute: {value: '',validation: {required: true,minLength: 1,maxNumber: 59,numbersOnly: true},valid: false,touched: false},
                second: {value: '',validation: {required: true,minLength: 1,maxNumber: 59,numbersOnly: true},valid: false,touched: false},},
                formElement: {title: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false,focus: true,inputHashTag: []},
                content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false,focus: false,inputHashTag: []},
                comment: {value: true,validation: {},valid: true,},result: {value: false,validation: {},valid: true,},delete: {value: false,validation: {},valid: true,},
                participant: {value: '',validation: {},option:  [{title: 'Public', icon: {name: 'lock-open-outline', size: 18}},{title: 'Private', icon: {name: 'lock-closed-outline', size: 18}}],valid: false,}},
                formIsValid: false,durationIsValid: false,durationError: null,totalDuration: 0,showActionSheet: false,showCamera: false,showVideoCamera: false,
                showAudioRecorder: false,showEmoji: false,selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},uploadFile: [],inputUri: [],addExam: false,
                showUpload: false,examDetail: null, resetAll: false, loaded: false,fetchedUploadFile: [], fetchedQuestion: {}
            })
        }
    }

    componentWillUnmount() {
        if (this.state.cntID) {
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

    durationInputHandler = (value, inputType) => {
        let check = checkValidity(value, this.state.duration[inputType].validation)
        let updateFormType = updateObject(this.state.duration[inputType], {
            value : check ? value : 
            !value ? '' : this.state.duration[inputType].value,
            valid: check,
            touched: true
        });
        
        let totalDuration = 0
        let durationError = null;
        let maxNumber = updateFormType.validation.maxNumber;
        let updateDuration = updateObject(this.state.duration, {[inputType]: updateFormType});
        for (let inputType in updateDuration) {
            let inputValue = updateDuration[inputType].value ? 
            inputType === 'hour' ? Number.parseInt(updateDuration[inputType].value)*60*60*1000
            : inputType === 'minute' ? Number.parseInt(updateDuration[inputType].value)*60*1000 
            : Number.parseInt(updateDuration[inputType].value)*1000 : 0;
            totalDuration += inputValue
        }

        if (totalDuration === 0) {
            durationError =  'Duration must not be zero';
        }

        if (value > maxNumber) {
            durationError =  `Number must not be greater than ${maxNumber}`;
        }

        this.setState({duration: updateDuration, durationError, totalDuration,  durationIsValid : totalDuration !== 0});
    }

    durationFormatHandler = (durationMillis, hrSeparator, minSeparator, secSeparator) => {
        let secDur = (durationMillis/1000);
        let minDur = secDur/60
        let sec = Math.floor(secDur%60) < 10 ? `0${Math.floor(secDur%60)} ${secSeparator}` : `${Math.floor(secDur%60)} ${secSeparator}`;
        let min =  minDur < 10 ? `0${Math.floor(minDur)} ${minSeparator} ${sec}` : `${Math.floor(minDur)} ${minSeparator} ${sec}`;
        let hr = '00';
        if ( minDur > 59) {
            min =  Math.floor(minDur%60) < 10 ? `0${Math.floor(minDur%60)} ${minSeparator} ${sec}` : `${Math.floor(minDur%60)} ${minSeparator} ${sec}`;
            let hrDur = minDur/60;
            hr =  hrDur < 10 ? `0${Math.floor(hrDur)} ${hrSeparator} ${min}` : `${Math.floor(hrDur)} ${hrSeparator} ${min}`
        }
        let duration = secDur < 60 || minDur < 60 ? min : hr;
        return duration;
    }

    navigationHandler = async (page) => {
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

    showExamContentHandler = () => {
        let removeMedia = this.state.fetchedUploadFile.filter(cnt => 
            !this.state.uploadFile.filter(file => file.id === cnt.id).length > 0);
        let uploadedMedia = this.state.uploadFile.filter(file => file.bucket ? true : false);
        let uploadFile = this.state.uploadFile.filter(file => file.bucket ? false : true);
        let cnt = {
            cntID: this.state.cntID,
            id: this.state.id,
            title: this.state.formElement.title.value,
            content: this.state.formElement.content.value,
            participant: this.state.formElement.participant.value,
            result: this.state.formElement.result.value,
            delete: this.state.formElement.delete.value,
            hour: this.state.duration.hour.value || 0,
            minute: this.state.duration.minute.value || 0,
            second: this.state.duration.second.value || 0,
            duration: this.state.totalDuration,
            comment: this.state.formElement.comment.value,
            uploadFile,
            hashTag: [...this.state.formElement.title.inputHashTag, ...this.state.formElement.content.inputHashTag],
            removeMedia,
            uploadedMedia
        }
        this.setState((prevState, props) => ({
            addExam: !prevState.addExam,
            examDetail: cnt
        }))
    }

    resetFormHandler = () => {
        this.props.onFetchEditForm(this.state.cntID);
        this.setState({examDetail: null,resetAll: true})
    }

    render() {
        let header = (
            this.state.viewMode === 'landscape' ? (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    title="Edit CBT"
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

        if (!this.props.editFormErr && (this.props.editFormCnt && this.state.loaded)) { 
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
                                    onFocus={() => this.inputFocusHandler('title')}
                                    style={styles.formElementInput}/>
                                <FormElement
                                    labelTitle="Exam Summary / Instruction"
                                    onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                                    error="Exam Summary / Instruction must not be empty"
                                    autoCorrect
                                    multiline
                                    numberOfLines={4}
                                    value={this.state.formElement.content.value}
                                    valid={!this.state.formElement.content.valid && this.state.formElement.content.touched}
                                    onFocus={() => this.inputFocusHandler('content')}
                                    onSelectionChange={(e) => this.inputChangePositionHandler(e, 'content')}
                                    style={styles.formElementInput}/>
                                <View style={styles.duration}>
                                    <Text style={[styles.textStyle, styles.durationTitle]}>Exam Duration</Text>
                                    <View style={styles.durationForm}>
                                        <FormElement
                                            placeholder="Hour"
                                            onChangeText={(val) => this.durationInputHandler(val, 'hour')}
                                            value={this.state.duration.hour.value}
                                            style={styles.formElementInput}
                                            formWrapperStyle={styles.formElementDuration}
                                            inputWrapperStyle={styles.formElementDuration}
                                            keyboardType="numeric"
                                            />
                                        <FormElement
                                            placeholder="Minute"
                                            onChangeText={(val) => this.durationInputHandler(val, 'minute')}
                                            value={this.state.duration.minute.value}
                                            style={styles.formElementInput}
                                            formWrapperStyle={styles.formElementDuration}
                                            inputWrapperStyle={styles.formElementDuration}
                                            keyboardType="numeric"/>
                                        <FormElement
                                            placeholder="Second"
                                            onChangeText={(val) => this.durationInputHandler(val, 'second')}
                                            value={this.state.duration.second.value}
                                            style={styles.formElementInput}
                                            formWrapperStyle={styles.formElementDuration}
                                            inputWrapperStyle={styles.formElementDuration}
                                            keyboardType="numeric"/>
                                        <View style={styles.durationPreview}> 
                                            <Text> {this.durationFormatHandler(this.state.totalDuration, 'Hrs :', 'Min :', 'Sec')} </Text>
                                        </View>
                                    </View>
                                    {this.state.durationError ? <Text style={styles.error}> { this.state.durationError } </Text> : null}
                                </View>
                                <Select 
                                    title="Select Participant"
                                    onSelect={(val) => this.inputChangedHandler(val, 'participant')}
                                    error="select paticipant"
                                    valid={!this.state.formElement.participant.valid && this.state.formElement.participant.touched}
                                    value={this.state.formElement.participant.value}
                                    option={this.state.formElement.participant.option}
                                    formWrapperStyle={styles.select}
                                    />
                                <CheckBox 
                                    ref={(ref) => this.checkBox = ref}
                                    title="Enable Comment"
                                    checked={this.state.formElement.comment.value}
                                    onCheck={(val) => this.inputChangedHandler(val, 'comment')}/>
                                <CheckBox 
                                    ref={(ref) => this.checkBox = ref}
                                    title="Enable Chat Deletion"
                                    checked={this.state.formElement.delete.value}
                                    onCheck={(val) => this.inputChangedHandler(val, 'delete')}/>
                                <CheckBox 
                                    ref={(ref) => this.checkBox = ref}
                                    title="Add Participant Result To Chat"
                                    checked={this.state.formElement.result.value}
                                    onCheck={(val) => this.inputChangedHandler(val, 'result')}/>
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
                                title="Next"
                                style={styles.button}
                                onPress={this.showExamContentHandler}
                                disabled={!this.state.formIsValid || this.state.totalDuration === 0}
                                textStyle={styles.textStyle}/>
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
                    { this.state.addExam ? 
                        <ExamContent
                            ref={(ref) => this.examContent = ref}
                            closeExamContent={this.showExamContentHandler}
                            examDetail={this.state.examDetail}
                            resetFormHandler={this.resetFormHandler}
                            submitForm={this.props.onSubmitForm}
                            submitStart={this.props.start}
                            fetchedQuestion={this.state.fetchedQuestion.question}
                            totalOption={this.state.fetchedQuestion.totalOption}
                            submitted={this.props.submitted}/> : null}
                    { this.props.submitError ? 
                        <NotificationModal
                            info="Network Error !"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.onEditFormReset}
                            button={[{title: 'Ok', onPress: this.props.onEditFormReset, style: styles.modalButton}]}/> : null}
                    { this.props.submitted ? 
                        <NotificationModal
                            info="CBT updated successfully !"
                            infoIcon={{name: 'cloud-upload-outline', color: '#16cf27', size: 40}}
                            closeModal={this.resetFormHandler}
                            button={[{title: 'View', onPress: this.props.navigation.goBack},
                            {title: 'Edit', onPress: this.examContent ? this.examContent.resetFormHandler : null, style: styles.modalButton}]}/> : null}
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
    select: {
        paddingHorizontal: 10,
        marginBottom: 20,
        width: 180
    },
    duration: {
        width: '100%'
    },
    durationTitle: {
        paddingHorizontal: 10
    },
    durationForm: {
        flexDirection: 'row',
        marginBottom: 20,
        flex: 1
    },
    durationPreview: {
        backgroundColor: '#e9ebf2',
        color: '#333',
        paddingHorizontal:  10,
        marginRight: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formElementDuration: {
        width: 'auto',
        flex: 1,
        paddingBottom: 0,
        marginBottom: 0
    }
})

const mapStateToProps = state => {
    return {
        editFormErr: state.editForm.fetchGroupCbtError,
        editFormCnt: state.editForm.fetchGroupCbt,
        submitError: state.editForm.groupcbtSubmitError,
        submitted: state.editForm.groupcbtSubmitted,
        start: state.editForm.groupcbtStart,
        cntID: state.editForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEditForm: (cntID) => dispatch(actions.fetchEditFormInit(cntID, 'groupcbt')),
        onSubmitForm: (formData) => dispatch(actions.submitEditFormInit(formData, 'groupcbt')),
        onEditFormReset: () => dispatch(actions.editFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CBT);