import React, { Component } from 'react';
import { View, StyleSheet,  ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import Ionicons from 'ionicons';
import { size, tailwind } from 'tailwind';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';
import Carousel from 'react-native-snap-carousel';
import Text from 'text';

import Exam from './Exam/Exam';
import FormElement from '../../../components/UI/FormElement/FormElement';
import Button from '../../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../../shared/utility';
import NotificationModal from '../../../components/UI/NotificationModal/NotificationModal';
import Select from '../../../components/UI/Select/Select';
import InnerScreen from '../../../components/UI/InnerScreen/InnerScreen';
import DefaultHeader from '../../../components/UI/Header/DefaultHeader';
import ActionSheet from '../../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../../components/UI/Camera/Camera';
import VideoCamera from '../../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../../components/UI/EmojiPicker/EmojiPicker';
import UploadPreview from '../../../components/UI/UploadPreview/UploadPreview';

class  ExamContent extends Component {
    constructor(props) {
        super(props);
        const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            viewportWidth,
            viewportHeight,
            backgroundColor: '#fff',
            formElement: {
                currentPage: {
                    value: '',
                    validation: {
                        numbersOnly: true
                    },
                    valid: false,
                    touched: false
                },
                totalOption: {
                    value: '',
                    validation: {
                    },
                    option:  [{title: 3},{title: 4},{title: 5}],
                    valid: false,
                }
            },
            formIsValid: false,
            question: [{id: uuid(), value: {examType: 'Objective'}, formIsValid: false}],
            contentFetched: false,
            totalOption: '5',
            gridView: true,
            showRemoveQue: false,
            questionID: null,
            cacheQuestion: false,
            formError: null,
            showActionSheet: false,
            showCamera: false,
            showVideoCamera: false,
            showAudioRecorder: false,
            showEmoji: false,
            showUpload: false,
            containerWidth: null,
            nextPage: false,
            optionItms : ['A', 'B', 'C', 'D', 'E'],
            currentQuestion: 1,
            showClearHistory: false
        }
    }


    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat',
            viewportWidth: dims.window.width,
            viewportHeight: dims.window.height
        })
    }

    async componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        await AsyncStorage.getItem('CBT').then(storedQue => {
            if (storedQue) {
                let cnt = JSON.parse(storedQue);
                let formElement = this.state.formElement;
                let updateFormType = updateObject(formElement.totalOption, {value: cnt.totalOption});
                let updateFormElement = updateObject(formElement, {totalOption: updateFormType});
                return this.setState({question: cnt.question, formIsValid: cnt.formIsValid, contentFetched: true,
                    formElement: updateFormElement});
            }
        })
        this.setState({contentFetched: true})
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        if (this.state.cacheQuestion && this.props.examDetail) {
            let updateQuestion = [];
            for (let question of this.state.question) {
                if (question.value) {
                    question.value.uploadFile = [];
                }
                updateQuestion.push(question);
            }
            AsyncStorage.setItem('CBT', JSON.stringify({question: updateQuestion, formIsValid: this.state.formIsValid,
                totalOption: this.state.formElement.totalOption.value || '5'}))
        }
    }

    inputChangedHandler = (value, inputType) => {
        let check = checkValidity(value, this.state.formElement[inputType].validation);
        let cntCheck =  this.state.question.length >= value && (value !== 0 && value !== '0' && !String(value).startsWith('0'));
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: check ? value : 
            value !== '' ? this.state.formElement[inputType].value : '' ,
            touched: true,
            valid: inputType === 'totalOption' ? check : check && cntCheck
        });

        let formError = null

        if (!updateFormType.valid) {
            formError = !check ? 'Use only number' : 'Page Specified does not exist'
        }
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        if (inputType === 'totalOption') {
            let updateQuestion = [];
            for (let question of this.state.question) {
                let checkOption = 0;
                let options = question.allOption ? {...question.allOption} : {};
                if (Object.entries(options).length >= value) {
                    for (let cnt in options) {
                        ++checkOption;
                        if (checkOption > value) {
                            options = updateObject(options, {[cnt]: updateObject(options[cnt], {show: false})});
                        } else {
                            options = updateObject(options, {[cnt]: updateObject(options[cnt], {show: true})});
                        }
                    }
                } else {
                    for (let _ of [...Array(value)]) {
                        ++checkOption;
                        let cnt = this.state.optionItms[checkOption - 1];
                        if (checkOption > Object.entries(options).length) {
                            options = updateObject(options, {[cnt]: updateObject(options[cnt], {
                                value: '', correct: false, show: true, valid: false, validation: { required: true, minLength: 1}})})
                        } else {
                            options = updateObject(options, {[cnt]: updateObject(options[cnt], {show: true})});
                        }
                    }
                };
                let answerIsValid = true;
                let answerOption = {};
                let correct = false;
                for (let inputType in options) {
                    if (options[inputType].show) {
                        answerIsValid = options[inputType].valid && answerIsValid;
                        answerOption[inputType] = { value: options[inputType].value, 
                            correct:  options[inputType].correct};
                        if (options[inputType].correct) {
                            correct = options[inputType].correct;
                        }
                    }
                }
                answerIsValid = answerIsValid && correct;
                question.formIsValid =  question.value.examType === 'Objective' ? (question.cntFormIsValid ? true : false) && answerIsValid
                    : question.formIsValid, 
                question.allOption = options,
                question.cntAnswerIsValid = answerIsValid
                updateQuestion.push(question);
            }
            let index = -1
            for (let cnt of this.state.question) {
                ++index
                this[`exam${index}`].totalOptionHandler(value, updateQuestion, cnt.cntAnswerIsValid);
            }
            return this.setState({formElement: updateFormElement, formError, question: updateQuestion})
        }
        
        this.setState({formElement: updateFormElement, formError})
    }

    navigationHandler = () => {
        let formElement = {...this.state.formElement};
        let updateFormElement = updateObject(formElement.currentPage, {value: '', valid: false, touched: false});
        let updateForm = updateObject(formElement, {currentPage: updateFormElement})
        this.setState({currentPage: this.state.formElement.currentPage.value, formElement: updateForm});
        if (this._carousel) {
            this._carousel.snapToItem(this.state.formElement.currentPage.value - 1, true);
        }
    }

    seekHandler = (page) => {
        if (page === 'right') {
            this._carousel.snapToNext(true);
        } else {
            this._carousel.snapToPrev(true);
        }
    }

    addQuestionGridHandler = () => {
        let question = [...this.state.question];
        let questionCnt = {id: uuid(), value: {examType: 'Objective'}, formIsValid: false};
        question.push(questionCnt);
        this.setState((prevState, props) => ({
            question,
            formIsValid: false
        }))
    }

    containerWidthHandler = (e) => {
        if (e) {
            let {width} = e.nativeEvent.layout;
            this.setState({containerWidth: width})
        }
    }

    checkFormHandler = (formDet) => {
        let form = [...this.state.question];
        let curForm = form.filter(cnt => cnt.id === formDet.id)[0];
        let curFormIndex = form.findIndex(cnt => cnt.id === formDet.id);
        if (curForm) {
            for (let cnt in formDet) {
                curForm[cnt] = formDet[cnt];
            }
        }
        form[curFormIndex] = curForm;
        let formIsValid = true;
        let question = [];
        for (let formItem of form) {
            question.push({...formItem})
            formIsValid = formIsValid && formItem.formIsValid;
        }
        this.setState({question, formIsValid, cacheQuestion: true});
    }

    clearHistoryHandler  = async (isChecked) => {
        if (isChecked) {
            await AsyncStorage.removeItem('CBT');
            this.setState({showClearHistory: false, question: [{id: uuid(), value: {examType: 'Objective'}, formIsValid: false}], formIsValid: false});
        } else {
            this.setState({showClearHistory: true});
        }
    }

    removeQuestionHandler = (isChecked, id) => {
        if (isChecked) {
            let question = [...this.state.question];
            let removeQuestion = question.filter(que => que.id !== id);
            let formIsValid = true
            for (let formItem of removeQuestion) {
                formIsValid = formIsValid && formItem.formIsValid;
            }
            this._carousel.snapToPrev(true);
            this.setState({showRemoveQue: false, question: removeQuestion, formIsValid, questionID: null})
        } else {
            this.setState({showRemoveQue: true, questionID: id})
        }
    }

    closeModalHandler = () => {
        this.setState({showRemoveQue: false, showClearHistory: false})
    }

    showEmojiHandler = (currentQuestion) => {
        this.setState({showEmoji: true, currentQuestion});
    }

    emojiSelectHandler = (emoji) => {
        this[`exam${this.state.currentQuestion}`].emojiSelectHandler(emoji);
        this.setState({showEmoji: false})
    }

    pickImageHandler = (currentQuestion) => {
        this.setState({showActionSheet: true, currentQuestion});
    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            camera({type: "Images"}).then(file => {
                let uploadFile = [...this[`exam${this.state.currentQuestion}`].state.uploadFile];
                uploadFile.push(...file);
                this[`exam${this.state.currentQuestion}`].uploadFileHandler(uploadFile);
                this.setState({showActionSheet: false})
            }).catch(e => {
                if (e === 'useCamera') {this.setState({showCamera: true, showActionSheet: false})}
                this.setState({showActionSheet: false})
            })
        } else if (index === 1){
            if (Platform.OS === 'web') {
                this.setState({showActionSheet: false, showVideoCamera: true})
            } else {
                camera({type: "Videos"}).then(file => {
                    let uploadFile = [...this[`exam${this.state.currentQuestion}`].state.uploadFile];
                    uploadFile.push(...file);
                    this[`exam${this.state.currentQuestion}`].uploadFileHandler(uploadFile);
                    this.setState({showActionSheet: false})
                }).catch(e => {
                    this.setState({showActionSheet: false})
                })
            }
        } else if (index === 2) {
            this.setState({showActionSheet: false, showAudioRecorder: true})
        }else if (index === 3){
            explorer({multiple: true}).then(file => {
                let uploadFile = [...this[`exam${this.state.currentQuestion}`].state.uploadFile];
                uploadFile.push(...file);
                this[`exam${this.state.currentQuestion}`].uploadFileHandler(uploadFile);
                this.setState({showActionSheet: false})
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
        this[`exam${this.state.currentQuestion}`].uploadFileHandler([...files]);
        this.setState({showCamera: false, showAudioRecorder: false, showVideoCamera: false, showEmoji: false, showUpload: false})
    }

    takePictureHandler = async () => {
        if (this.camera) {
            takePicture(this.camera).then(image => {
                let uploadFile = [...this[`exam${this.state.currentQuestion}`].state.uploadFile];
                uploadFile.push(...image);
                this[`exam${this.state.currentQuestion}`].uploadFileHandler(uploadFile);
                this.setState({showCamera: false})
            }).catch(e => { this.setState({showCamera: false})})
        }
    }

    stopAudioRecorderHandler = (recording) => {
        stopAudioRecorder(recording).then(audio => {
            let uploadFile = [...this[`exam${this.state.currentQuestion}`].state.uploadFile];
            uploadFile.push(...audio);
            this[`exam${this.state.currentQuestion}`].uploadFileHandler(uploadFile);
            this.setState({showAudioRecorder: false})
        }).catch(e => { this.setState({showAudioRecorder: false})})
    }

    showUploadHandler = (currentQuestion) => {
        this.setState({showUpload: true, currentQuestion});
    }

    _renderItem = ({item:question, index}) => {
        return (
            <Exam
                ref={(ref) =>  this[`exam${index}`] = ref}
                key={index}
                question={question}
                currentPage={index}
                checkForm={this.checkFormHandler}
                totalOption={this.state.formElement.totalOption.value || 5}
                showEmoji={this.showEmojiHandler}
                pickImage={this.pickImageHandler}
                showUpload={this.showUploadHandler}
                optionItms={this.state.optionItms}
                totalQuestion={this.state.question.length}
                removeQuestion={this.removeQuestionHandler}
                clearHistory={this.clearHistoryHandler}/>
        )
    }

    widthPercent =  (percentage) => {
        let width = this.state.viewMode === 'landscape' ? this.state.containerWidth : this.state.viewportWidth;
        const value = (percentage * width) / 100;
        return Math.round(value);
    }

    submitHandler = () => {
        let question = [];
        for (let cnt of this.state.question) {
            question.push({...cnt.value, id: cnt.id});
        }
        this.props.submitForm({...this.props.examDetail, question, totalOption: this.state.formElement.totalOption.value || 5})
    }

    resetFormHandler = async () => {
        await AsyncStorage.removeItem('CBT');
        this.props.resetFormHandler();
    }

    render() {
        const slideWidth = this.widthPercent(100);
        const itemHorizontalMargin = this.widthPercent(0);
        const sliderWidth = this.state.viewportWidth;
        const itemWidth = slideWidth + itemHorizontalMargin * 2;
        const loader= (
            <View style={styles.loaderCnt}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        );
        return (
            <InnerScreen
                onRequestClose={this.props.closeExamContent.bind(this, this.state.uploadFiles)}
                animationType="slide"
                onBackdropPress={this.props.closeExamContent.bind(this, this.state.uploadFiles)}>
                <DefaultHeader
                    onPress={this.props.closeExamContent.bind(this, this.state.uploadFiles)}
                    title="Set Question"/>
                <View 
                    style={styles.actionBarWrapper}  
                    onLayout={this.containerWidthHandler}>
                    <View style={styles.actionBar}>
                        <View style={styles.page}>
                            <View style={styles.pageTitleWrapper}>
                                <Text style={styles.pageTitle}>Page</Text>
                            </View>
                            <FormElement
                                placeholder="1"
                                onChangeText={(val) => this.inputChangedHandler(val, 'currentPage')}
                                value={this.state.formElement.currentPage.value}
                                formWrapperStyle={styles.formElementInput}
                                inputWrapperStyle={styles.formElementInput}
                                keyboardType="numeric"/>
                            <FormElement
                                value={String(this.state.question.length)}
                                editable={false}
                                formWrapperStyle={styles.formElementInput}
                                inputWrapperStyle={[styles.inputWrapperStyle, styles.formElementInput]}/>
                            <Button 
                                title="Go"
                                style={styles.pageButton}
                                onPress={this.navigationHandler}
                                disabled={!this.state.formElement.currentPage.valid}
                                textStyle={styles.textStyle}/>
                        </View>
                        <View style={styles.pageAction}>
                            <Select 
                                title="Options"
                                onSelect={(val) => this.inputChangedHandler(val, 'totalOption')}
                                value={this.state.formElement.totalOption.value}
                                option={this.state.formElement.totalOption.option}
                                formWrapperStyle={styles.select}
                                titleStyle={styles.titleStyle}
                                optionWrapperStyle={styles.optionWrapper}
                                optionStyle={styles.option}
                                />
                            <Button 
                                title="Add"
                                style={styles.pageActionAdd}
                                disabled={!this.state.contentFetched}
                                onPress={this.addQuestionGridHandler}/>
                        </View>
                    </View>
                    {this.state.formError ?
                        <Text style={styles.error}> { this.state.formError  } </Text>: null}
                </View>
                { this.state.contentFetched ? (
                    this.state.viewMode !== 'landscape' ? (
                        <ScrollView 
                            style={styles.scroll}>
                            <View style={styles.scroll}>
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.question}
                                    renderItem={this._renderItem}
                                    sliderWidth={sliderWidth}
                                    itemWidth={itemWidth}
                                />
                            </View>
                        </ScrollView>
                    ): (
                        this.state.containerWidth ? (
                            <ScrollView
                                showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape'} 
                                style={styles.scroll}>
                                <View style={styles.scroll}>
                                    <Carousel
                                        ref={(c) => { this._carousel = c; }}
                                        data={this.state.question}
                                        renderItem={this._renderItem}
                                        sliderWidth={this.state.containerWidth}
                                        itemWidth={itemWidth}
                                    />
                                </View>
                            </ScrollView>
                        ): loader
                    )
                ): loader}
                <View style={this.state.contentFetched ?
                    this.state.viewMode === 'landscape' && !this.state.containerWidth ? null : styles.buttonWrapper 
                    : null}>
                    <View style={styles.formElementButton}>
                        <Button 
                            title="Submit"
                            style={styles.button}
                            onPress={this.submitHandler}
                            disabled={!this.state.formIsValid || !this.props.examDetail || this.props.submitStart || this.props.submitted}
                            textStyle={styles.textStyle}
                            submitting={this.props.submitStart}
                            loaderStyle="#fff"/>
                        <View style={styles.seek}>
                            <Button
                                style={styles.pageActionSeek}
                                onPress={() => this.seekHandler('left')}>
                                <Ionicons name="chevron-back-outline" size={15}/>
                            </Button>
                            <Button
                                style={styles.pageActionSeekRight}
                                onPress={() => this.seekHandler('right')}>
                                <Ionicons name="chevron-forward-outline" size={15}/>
                            </Button>
                        </View>
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
                            uploadFile={this[`exam${this.state.currentQuestion}`].state.uploadFile}
                            closePreview={this.closePreviewHandler}
                            disableDescription/>: null}
                { this.props.submitError ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onAddFormReset}
                        button={[{title: 'Ok', onPress: this.props.onAddFormReset, style: styles.modalButton}]}/> : null}
                {this.state.showRemoveQue ?
                    <NotificationModal
                        info="Are you sure you want to delete this question"
                        closeModal={this.closeModalHandler}
                        button={[{title: 'ok', onPress: () => this.removeQuestionHandler(true, this.state.questionID), 
                            style: styles.buttonCancel},
                        {title: 'Exit', onPress: this.closeModalHandler, style: styles.modalButton}]}/> : null}
                {this.state.showClearHistory ?
                    <NotificationModal
                        info="Are you sure you want to delete all Questions"
                        closeModal={this.closeModalHandler}
                        button={[{title: 'ok', onPress: () => this.clearHistoryHandler(true), 
                            style: styles.buttonCancel},
                        {title: 'Exit', onPress: this.closeModalHandler, style: styles.modalButton}]}/> : null}
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    scroll: {
        width: '100%'
    },
    actionBarWrapper: {
        backgroundColor: '#dcdbdc',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    page: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pageTitleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    pageButton: {
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 5,
        marginLeft: 5,
        height: Platform.OS !== 'web' ? 'auto' : '100%',
        ...tailwind('rounded-full')
    },
    pageAction: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pageActionAdd: {
        width: 40,
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        marginLeft: 5,
        height: Platform.OS !== 'web' ? 'auto' : '100%'
    },
    pageActionSeek: {
        width: 30,
        backgroundColor: '#dcdbdc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageActionSeekRight: {
        width: 30,
        marginLeft: 20,
        backgroundColor: '#dcdbdc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seek: {
       flexDirection: 'row'
    },
    buttonWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
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
    formElementInput: {
        paddingTop: 0,
        marginTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        marginVertical: 0,
        width: 40
    },
    error: {
        position: 'relative',
        paddingTop: 5,
        fontSize: 15,
        color: '#ff1600'
    },
    inputWrapperStyle: {
        backgroundColor: '#e9ebf2',
        marginTop: 0
    },
    select: {
        marginTop: 0,
        paddingBottom: 0,
        width: 100,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 5,
    },
    titleStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    optionWrapper: {
        paddingVertical: 0,
        bottom: Platform.OS !== 'web' ? '-20%' : -20,
        flexDirection: Platform.OS !== 'web' ? 'row': 'column'
    },
    option: {
        paddingVertical: Platform.OS !== 'web' ? 4 : 2,
        paddingHorizontal: Platform.OS !== 'web' ? 10: 5
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ExamContent;