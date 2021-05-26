import React, { Component } from 'react';
import { View, Text, Keyboard, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';
import { v4 as uuid } from 'uuid';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import FormElement from '../../components/UI/FormElement/FormElement';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import { updateObject, checkValidity, checkUri, checkHashtag } from '../../shared/utility';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import VideoCamera from '../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../components/UI/EmojiPicker/EmojiPicker';
import LinkPreview from '../../components/UI/LinkPreview/LinkPreview';
import UploadPreview from '../../components/UI/UploadPreview/UploadPreview';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import CheckBox from '../../components/UI/CheckBox/CheckBox';
import Select from '../../components/UI/Select/Select';
import ExamContent from './ExamContent/ExamContent';

class Group extends Component {
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
                cbt: {
                    value: false,
                    validation: {},
                    valid: true
                },
                rule: {
                    value: false,
                    validation: {},
                    valid: true
                },
                autoJoin: {
                    value: false,
                    validation: {},
                    valid: true
                },
                passMark: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1,
                        maxNumber: 100,
                        numbersOnly: true
                    },
                    valid: false,
                    touched: false
                },
                roomType: {
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
            passMarkError: null,
            resetAll: false
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
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.resetFormHandler();
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentDidUpdate() {
        if (this.state.resetAll) {
            this.setState({
                id: uuid(),duration: {hour: {value: '',validation: {required: true,minLength: 1,maxNumber: 24,numbersOnly: true},valid: false,touched: false},
                minute: {value: '',validation: {required: true,minLength: 1,maxNumber: 59,numbersOnly: true},valid: false,touched: false},
                second: {value: '',validation: {required: true,minLength: 1,maxNumber: 59,numbersOnly: true},valid: false,touched: false},},
                formElement: {title: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false,focus: true,inputHashTag: []},
                content: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false,focus: false,inputHashTag: []},
                cbt: {value: false,validation: {},valid: true},rule: {value: false,validation: {},valid: true},autoJoin: {value: false,validation: {},valid: true},
                passMark: {value: '',validation: {required: true,minLength: 1,maxNumber: 100,numbersOnly: true},valid: false,touched: false},
                roomType: {value: '',validation: {},option:  [{title: 'Public', icon: {name: 'lock-open-outline', size: 18}},{title: 'Private', icon: {name: 'lock-closed-outline', size: 18}}],valid: false,}},
                formIsValid: false,durationIsValid: false,durationError: null,totalDuration: 0,showActionSheet: false,showCamera: false,showVideoCamera: false,
                showAudioRecorder: false,showEmoji: false,selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},uploadFile: [],inputUri: [],addExam: false,
                showUpload: false,examDetail: null,passMarkError: null, resetAll: false
            })
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    inputChangedHandler = (value, inputType) => {
        let uri = checkUri(value);
        let hashTag = checkHashtag(value);
        let allowHashTag = inputType === 'title' || inputType === 'content' ? 
            {inputHashTag: hashTag ? hashTag: []} : {};
        let valid = checkValidity(value, this.state.formElement[inputType].validation)
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: valid ? value : 
                !value ? '' : this.state.formElement[inputType].value,
            valid,
            touched: true,
            ...allowHashTag
        });
        let passMarkError = null;
        if (!valid && inputType === 'passMark') {
            passMarkError =  'Use only number';
        }

        if (parseInt(value) === 0 && inputType === 'passMark') {
            passMarkError =  'Pass mark must not be zero';
        }
        if (inputType === 'passMark' && parseInt(value) > this.state.formElement[inputType].validation.maxNumber) {
            passMarkError =  `Number must not be greater than ${this.state.formElement[inputType].validation.maxNumber}`;
        }

        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})
        for (let inputType in updateFormElement) {
            let contentIsValid = updateFormElement.rule.value ? updateFormElement[inputType].valid : true;
            let cbtIsValid = updateFormElement.cbt.value ? this.state.durationIsValid : true;
            let passMarkIsValid = updateFormElement.autoJoin.value ? updateFormElement[inputType].valid  ? true : 
                updateFormElement[inputType].value ? true : false : true;
            let roomTypeIsValid = updateFormElement.cbt.value ? true : updateFormElement[inputType].valid;
            let formElementIsValid = inputType === 'content' ?  contentIsValid : 
                inputType === 'cbt' ? cbtIsValid : 
                inputType === 'passMark' ? passMarkIsValid : 
                inputType === 'roomType' ? roomTypeIsValid : updateFormElement[inputType].valid;
            formIsValid = formElementIsValid && formIsValid;
        }
        this.setState({formElement: updateFormElement, formIsValid, inputUri: uri ? uri : [], passMarkError})
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

        let formElement = this.state.formElement;
        let formIsValid = true;
        for (let inputType in formElement) {
            let contentIsValid = formElement.rule.value ? formElement[inputType].valid : true;
            let cbtIsValid = formElement.cbt.value ? totalDuration !== 0 : true;
            let passMarkIsValid = formElement.autoJoin.value ? formElement[inputType].valid : true;
            let roomTypeIsValid = formElement.cbt.value ? true : formElement[inputType].valid;
            let formElementIsValid = inputType === 'content' ?  contentIsValid : 
                inputType === 'cbt' ? cbtIsValid : 
                inputType === 'passMark' ? passMarkIsValid : 
                inputType === 'roomType' ? roomTypeIsValid : formElement[inputType].valid;
            formIsValid = formElementIsValid && formIsValid;
        }

        this.setState({duration: updateDuration, durationError, totalDuration,  durationIsValid : totalDuration !== 0,
            formIsValid});
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
        await AsyncStorage.removeItem('CBT');
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
            id: this.state.id,
            title: this.state.formElement.title.value,
            content: this.state.formElement.content.value,
            roomType: this.state.formElement.roomType.value,
            rule: this.state.formElement.rule.value,
            cbt: this.state.formElement.cbt.value,
            autoJoin: this.state.formElement.autoJoin.value,
            passMark: this.state.formElement.passMark.value,
            hour: this.state.duration.hour.value || 0,
            minute: this.state.duration.minute.value || 0,
            second: this.state.duration.second.value || 0,
            duration: this.state.totalDuration,
            uploadFile: this.state.uploadFile,
            hashTag: [...this.state.formElement.title.inputHashTag, ...this.state.formElement.content.inputHashTag]
        }
        this.props.onSubmitForm(cnt)
    }

    showExamContentHandler = () => {
        let cnt = {
            id: this.state.id,
            title: this.state.formElement.title.value,
            content: this.state.formElement.content.value,
            roomType: this.state.formElement.roomType.value,
            rule: this.state.formElement.rule.value,
            cbt: this.state.formElement.cbt.value,
            autoJoin: this.state.formElement.autoJoin.value,
            passMark: this.state.formElement.passMark.value,
            hour: this.state.duration.hour.value || 0,
            minute: this.state.duration.minute.value || 0,
            second: this.state.duration.second.value || 0,
            duration: this.state.totalDuration,
            uploadFile: this.state.uploadFile,
            hashTag: [...this.state.formElement.title.inputHashTag, ...this.state.formElement.content.inputHashTag]
        }
        this.setState((prevState, props) => ({
            addExam: !prevState.addExam,
            examDetail: cnt
        }))
    }

    resetFormHandler = () => {
        this.props.onAddFormReset();
        this.setState({examDetail: null,resetAll: true})
    }

    render() {
        let cnt = (
            <View style={styles.formWrapper}>
                { this.state.viewMode === 'landscape' ? (
                    <DefaultHeader 
                        onPress={() => this.props.navigation.goBack()}
                        title="Add Group"
                    />
                ): null}
                <View style={styles.formElementWrapper}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.formWrapperStyle}>
                            <FormElement
                                labelTitle="Name"
                                onChangeText={(val) => this.inputChangedHandler(val, 'title')}
                                error="Name must not be empty"
                                autoCorrect
                                autoFocus
                                value={this.state.formElement.title.value}
                                valid={!this.state.formElement.title.valid && this.state.formElement.title.touched}
                                onSelectionChange={(e) => this.inputChangePositionHandler(e, 'title')}
                                onFocus={() => this.inputFocusHandler('title')}
                                style={styles.formElementInput}/>
                            <CheckBox
                                title="Add Purpose / Rules"
                                checked={this.state.formElement.rule.value}
                                onCheck={(val) => this.inputChangedHandler(val, 'rule')}/>
                            {this.state.formElement.rule.value ? (
                                <FormElement
                                    labelTitle="Purpose / Rules"
                                    autoCorrect
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                                    value={this.state.formElement.content.value}
                                    onFocus={() => this.inputFocusHandler('content')}
                                    onSelectionChange={(e) => this.inputChangePositionHandler(e, 'content')}
                                    style={styles.formElementInput}/>
                            ) : null}
                            <CheckBox
                                title="Ask Question"
                                checked={this.state.formElement.cbt.value}
                                onCheck={(val) => this.inputChangedHandler(val, 'cbt')}/>
                             {this.state.formElement.cbt.value ? (
                                <>
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
                                                keyboardType="numeric"/>
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
                                    <CheckBox
                                        title="Accept user at pass mark"
                                        checked={this.state.formElement.autoJoin.value}
                                        onCheck={(val) => this.inputChangedHandler(val, 'autoJoin')}/>
                                    {this.state.formElement.autoJoin.value ? (
                                        <View style={styles.duration}>
                                            <Text style={[styles.textStyle, styles.durationTitle]}>Pass mark in percent(%)</Text>
                                            <View style={styles.durationForm}>
                                                <FormElement
                                                    placeholder="Pass Mark"
                                                    onChangeText={(val) => this.inputChangedHandler(val, 'passMark')}
                                                    value={this.state.formElement.passMark.value}
                                                    style={styles.formElementInput}
                                                    formWrapperStyle={styles.formElementPassMark}
                                                    inputWrapperStyle={styles.formElementPassMark}
                                                    keyboardType="numeric"/>
                                                <View style={styles.durationPreview}> 
                                                    <Text>%</Text>
                                                </View>
                                            </View>
                                            {this.state.passMarkError ? <Text style={styles.error}> { this.state.passMarkError } </Text> : null}
                                        </View>
                                    ) : null }
                                </>
                            ) : (
                                <Select 
                                    title="Select Type"
                                    onSelect={(val) => this.inputChangedHandler(val, 'roomType')}
                                    error="Select Type"
                                    valid={!this.state.formElement.roomType.valid && this.state.formElement.roomType.touched}
                                    value={this.state.formElement.roomType.value}
                                    option={this.state.formElement.roomType.option}
                                    formWrapperStyle={styles.select}/>
                            ) }
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
                            title={this.state.formElement.cbt.value ? 'Next' : 'Create'}
                            style={styles.button}
                            onPress={this.state.formElement.cbt.value ? this.showExamContentHandler : this.submitHandler}
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
                { this.state.addExam ? 
                    <ExamContent
                        ref={(ref) => this.examContent = ref}
                        closeExamContent={this.showExamContentHandler}
                        examDetail={this.state.examDetail}
                        resetFormHandler={this.resetFormHandler}
                        submitForm={this.props.onSubmitForm}
                        submitStart={this.props.start}
                        submitted={this.props.submitted}/> : null}
                { this.props.submitError ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onAddFormReset}
                        button={[{title: 'Ok', onPress: this.props.onAddFormReset, style: styles.modalButton}]}/> : null}
                { this.props.submitted ? 
                    <NotificationModal
                        info="Group created successfully !"
                        infoIcon={{name: 'cloud-upload-outline', color: '#16cf27', size: 40}}
                        closeModal={this.resetFormHandler}
                        button={[{title: 'View', onPress: () => this.navigationHandler(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group')},
                        {title: 'Add', onPress: 
                            this.state.formElement.cbt.value ? this.examContent.resetFormHandler :
                                this.resetFormHandler, style: styles.modalButton}]}/> : null}
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
    },
    formElementPassMark: {
        width: 'auto',
        paddingBottom: 0,
        marginBottom: 0
    }
});

const mapStateToProps = state => {
    return {
        submitError: state.addForm.groupSubmitError,
        submitted: state.addForm.groupSubmitted,
        start: state.addForm.groupStart,
        cntID: state.addForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAddFormInit(formData, 'group')),
        onAddFormReset: () => dispatch(actions.addFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);