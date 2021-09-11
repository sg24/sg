import React, { Component } from 'react';
import { View, Keyboard, StyleSheet, Dimensions, Platform } from 'react-native';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import Text from 'text';

import FormElement from '../../../../components/UI/FormElement/FormElement';
import TouchableNativeFeedback from '../../../../components/UI/TouchableNativeFeedback/TouchableNativeFeedback';
import BoxShadow from '../../../../components/UI/BoxShadow/BoxShadow';
import Button from '../../../../components/UI/Button/Button';
import { updateObject, checkValidity,  checkHashtag } from '../../../../shared/utility';
import CheckBox from '../../../../components/UI/CheckBox/CheckBox';
import Select from '../../../../components/UI/Select/Select';

class  Exam extends Component {
    constructor(props) {
        super(props);
        let optionItms = this.props.optionItms;
        optionItms = optionItms.slice(0, this.props.totalOption);
        let options = {};
        for (let itm of optionItms) {
            options[itm] =  {value: '', correct: false, show: true, valid: false, validation: { required: true, minLength: 1}};
        }
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            backgroundColor: '#fff',
            id: this.props.question.id,
            currentPage: this.props.currentPage,
            formElement: {
                content: {
                    value: this.props.question.value.content || '',
                    validation: { 
                        required: true, 
                        minLength: 1
                    },
                    valid: this.props.question.value.content ? true : false,
                    touched: false,
                    focus: true,
                    inputHashTag: this.props.question.value.hashTag || []
                },
                answer: {
                    value: this.props.question.value.answer || '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: this.props.question.value.answer ? true : false,
                    touched: false
                },
                examType: {
                    value: this.props.question.value.examType,
                    validation: {},
                    option:  [{title: 'Objective'},{title: 'Theory'}],
                    valid: true,
                },
            },
            totalOption: parseInt(this.props.totalOption),
            options: this.props.question.allOption || options,
            answerOption: this.props.question.value.answerOption || {},
            formIsValid: this.props.question.cntFormIsValid ? true : false,
            answerIsValid: this.props.question.cntAnswerIsValid ? true : false,
            selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},
            uploadFile: this.props.question.value.uploadFile || [],
            addExam: false
        }

    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
    }

    componentDidUpdate() {
        if ((this.state.id !== this.props.question.id) && (this.state.currentPage === this.props.currentPage)) {
            this.resetExamHandler();
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    resetExamHandler = () => {
        let optionItms = this.props.optionItms;
        optionItms = optionItms.slice(0, this.props.totalOption);
        let options = {};
        for (let itm of optionItms) {
            options[itm] =  {value: '', correct: false, show: true, valid: false, validation: { required: true, minLength: 1}};
        }
        this.setState({
            id: this.props.question.id,currentPage: this.props.currentPage,
            formElement: {content: {value: this.props.question.value.content || '',validation: { required: true, minLength: 1},valid: this.props.question.value.content ? true : false,touched: false,focus: true,
            inputHashTag: this.props.question.value.hashTag || []},answer: {value: this.props.question.value.answer || '',validation: {required: true,minLength: 1},
            valid: this.props.question.value.answer ? true : false,touched: false},examType: {value: this.props.question.value.examType,validation: {},option:  [{title: 'Objective'},{title: 'Theory'}],valid: true,},}, 
            totalOption: parseInt(this.props.totalOption),options: this.props.question.allOption || options,answerOption: this.props.question.value.answerOption || {},formIsValid: this.props.question.cntFormIsValid ? true : false,
            answerIsValid: this.props.question.cntAnswerIsValid ? true : false,selection: {title: {start: 0, end: 0}, content: {start: 0, end: 0}},uploadFile: this.props.question.value.uploadFile || [],addExam: false
        });
    }

    inputChangedHandler = (value, inputType) => {
        let hashTag = checkHashtag(value);
        let allowHashTag = inputType !== 'examType' && inputType !== 'answer' ? {inputHashTag: hashTag ? hashTag: []} : {};
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value,
            valid: checkValidity(value, this.state.formElement[inputType].validation),
            touched: true,
            ...allowHashTag
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})
        let answerIsValid = false;
        for (let inputType in updateFormElement) {
            answerIsValid = updateFormElement.examType.value !== 'Objective';
            let checkInput = inputType === 'answer' ? 
                updateFormElement.examType.value !== 'Objective' ? updateFormElement[inputType].valid : true : 
                updateFormElement[inputType].valid
            formIsValid = checkInput && formIsValid;
        }
        
        let allValue = {
            content: updateFormElement.content.value,
            answer: updateFormElement.answer.value,
            examType: updateFormElement.examType.value,
            uploadFile: this.state.uploadFile,
            fetchedUploadFile: this.props.fetchedUploadFile,
            hashTag: updateFormElement.content.inputHashTag,
            answerOption: this.state.answerOption
        }
        this.props.checkForm({
            id: this.state.id, formIsValid:  formIsValid && (answerIsValid || this.state.answerIsValid), value: allValue,
            cntFormIsValid: formIsValid});
        this.setState({formElement: updateFormElement, formIsValid})
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

    answerOptionHandler = (value, inputType, isCheckBox) => {
        let options = this.state.options;
        let updateFormType = updateObject(options[inputType], {
            value: isCheckBox ? options[inputType].value : value,
            valid: isCheckBox ? options[inputType].valid : checkValidity(value, options[inputType].validation),
            touched: true,
            correct: isCheckBox ? value : options[inputType].correct
        });
        options[inputType] = updateFormType
        let updateFormElement = options;
        let answerIsValid = true;
        let answerOption = {};
        let correct = false;
        for (let inputType in updateFormElement) {
            if (updateFormElement[inputType].show) {
                answerIsValid = updateFormElement[inputType].valid && answerIsValid;
                answerOption[inputType] = { value: updateFormElement[inputType].value, 
                    correct:  updateFormElement[inputType].correct};
                if (updateFormElement[inputType].correct) {
                    correct = updateFormElement[inputType].correct;
                }
            }
        }
        answerIsValid = answerIsValid && correct;
        let allValue = {
            content: this.state.formElement.content.value,
            answer: this.state.formElement.answer.value,
            examType: this.state.formElement.examType.value,
            uploadFile: this.state.uploadFile,
            fetchedUploadFile: this.props.fetchedUploadFile,
            hashTag: this.state.formElement.content.inputHashTag,
            answerOption,
        }
        this.props.checkForm({
            id: this.state.id, formIsValid: this.state.formIsValid && answerIsValid, allOption: updateFormElement, value: allValue,
             cntAnswerIsValid: answerIsValid});
        this.setState({answerIsValid, answerOption, options: updateFormElement})
    }

    totalOptionHandler = (total, question, answerIsValid) => {
        let currentQuestion = question.filter(cnt => cnt.id === this.state.id)[0];
        this.props.checkForm({id: this.state.id});
        if (currentQuestion) {
            this.setState({options: currentQuestion.allOption||this.state.options, totalOption: total, answerIsValid})
        }
    }

    clearHistoryHandler = () => {
        this.props.clearHistory(false);
    }

    removeQuestionHandler = () => {
        this.props.removeQuestion(false, this.state.id);
    }

    showEmojiHandler = () => {
        Keyboard.dismiss();
        this.props.showEmoji(this.state.currentPage);
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
    }


    pickImageHandler = () => {
        Keyboard.dismiss();
        this.props.pickImage(this.state.currentPage);
    }

    uploadFileHandler = (uploadFile) => {
        let allValue = {
            content: this.state.formElement.content.value,
            answer: this.state.formElement.answer.value,
            examType: this.state.formElement.examType.value,
            uploadFile,
            fetchedUploadFile: this.props.fetchedUploadFile,
            hashTag: this.state.formElement.content.inputHashTag,
            answerOption: this.state.answerOption,
        }
        this.props.checkForm({
            id: this.state.id, formIsValid: this.state.formIsValid && this.state.answerIsValid, allOption: this.state.options, value: allValue});
        this.setState({uploadFile});
    };

    showUploadHandler = () => {
        this.props.showUpload(this.state.currentPage);
    }

    render() {
        return (
            <View 
                style={[styles.formWrapper, 
                    Platform.OS === 'web' && this.state.viewMode === 'landscape' ? styles.formWrapperLandscape : null]}>
                <View style={styles.formElementWrapper}>
                    <View style={styles.formWrapperStyle}>
                        <View style={styles.pageAction}>
                            <Button
                                onPress={() => this.clearHistoryHandler()}
                                style={styles.pageWrapper}>
                                <Ionicons name="ban-outline" size={20}/>
                            </Button>
                            <View style={[styles.pageWrapper, styles.currentPage]}>
                                <Text style={styles.currrentPageText}>
                                    { this.props.currentPage + 1}
                                </Text>
                            </View>
                            <Button
                                onPress={() => this.removeQuestionHandler()}
                                style={styles.pageWrapper}
                                disabled={this.props.totalQuestion === 1}>
                                <Ionicons name="trash-bin-outline" size={20} color="#ff1600"/>
                            </Button>
                        </View>
                        <FormElement
                            labelTitle="Question"
                            onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                            error="Question must not be empty"
                            autoCorrect
                            multiline
                            numberOfLines={4}
                            value={this.state.formElement.content.value}
                            valid={!this.state.formElement.content.valid && this.state.formElement.content.touched}
                            onSelectionChange={(e) => this.inputChangePositionHandler(e, 'content')}
                            onFocus={() => this.inputFocusHandler('content')}
                            style={styles.formElementInput}/>
                        <Select 
                            ref={(ref) => this.select = ref}
                            title="Question Type"
                            onSelect={(val) => this.inputChangedHandler(val, 'examType')}
                            error="select Question Type"
                            valid={!this.state.formElement.examType.valid && this.state.formElement.examType.touched}
                            value={this.state.formElement.examType.value}
                            option={this.state.formElement.examType.option}
                            formWrapperStyle={styles.select}
                            optionWrapperStyle={styles.selectOption}
                            />
                        { this.state.formElement.examType.value === 'Objective' ? (
                            <View style={styles.answerWrapper}>
                                <Text style={[styles.answerTitle, styles.textStyle]}>Note: Select correct answer</Text>
                                {[...Array(this.state.totalOption)].map((_, index) => (
                                    [Object.entries(this.state.options)[index]].map(([option, cnt], index) => {
                                        let optionCnt = null;
                                        if (cnt.show) {
                                            optionCnt = (
                                                <View key={index} style={styles.answer}>
                                                    <TouchableNativeFeedback 
                                                            onPress={() => this.answerOptionHandler(!cnt.correct, option, true)}
                                                            style={styles.answerOptWrapper}>
                                                        <View style={[styles.answerOpt, cnt.correct ? styles.answerCorrect : null]}>
                                                            <Text style={[styles.textStyle, cnt.correct ? styles.answerTextCorrect : null]}>{option}</Text>
                                                        </View>
                                                    </TouchableNativeFeedback>
                                                    <FormElement
                                                        onChangeText={(val) => this.answerOptionHandler(val, option, false)}
                                                        autoCorrect
                                                        value={cnt.value}
                                                        formWrapperStyle={styles.formInputWrapper}
                                                        inputWrapperStyle={styles.formInputWrapper}/>
                                                    <CheckBox
                                                        checked={cnt.correct}
                                                        onCheck={(val) => this.answerOptionHandler(val, option, true)}
                                                        formWrapperStyle={styles.formCheckWrapper}
                                                        outterStyle={styles.formCheckOutter}/>
                                                </View>
                                            );
                                        }
                                        return optionCnt;
                                    })
                                ))}
                            </View>
                        ) : 
                            <FormElement
                                labelTitle="Answer ( Note: Question will be submitted for marking)"
                                onChangeText={(val) => this.inputChangedHandler(val, 'answer')}
                                error="Answer must not be empty"
                                autoCorrect
                                multiline
                                numberOfLines={2}
                                value={this.state.formElement.answer.value}
                                valid={!this.state.formElement.answer.valid && this.state.formElement.answer.touched}
                                style={styles.formElementInput}/>}
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
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: '#333'
    },
    formWrapper: {
        width:'100%',
        position: 'relative',
        paddingBottom: 30
    },
    formWrapperLandscape: {
        paddingRight: 15
    },
    formElementWrapper: {
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '#fff'
    },
    formElementButton: {
        width: '100%',
        paddingVertical: 5,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formButtonWrapper: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formWrapperStyle: {
        flex: 1,
        width:'100%',
        alignItems: 'flex-start'
    },
    formInputWrapper: {
        flex: 1,
        paddingTop: 0,
        marginTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        marginVertical: 0,
    },
    formCheckWrapper: {
        paddingTop: 0,
        marginTop: 0,
        paddingRight: 0,
        paddingLeft: 10,
        paddingBottom: 0,
        marginVertical: 0,
        marginHorizontal: 0
    },
    formCheckOutter: {
        marginRight: 0
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
        width: 160
    },
    answerWrapper: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        width: '100%'
    },
    answer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        width: '100%'
    },
    answerTitle:{
        marginBottom: 10,
    },
    answerOptWrapper: {
        height: Platform.OS !== 'web' ? 'auto' : '100%'
    },
    answerOpt: {
        height: '100%',
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ebf2',
        marginRight: 10,
        borderRadius: 5
    },
    answerCorrect: {
        backgroundColor: '#437da3'
    },
    answerTextCorrect: {
        color: '#fff'
    },
    pageAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    pageWrapper: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#e9ebf2',
        borderRadius: 15,
    },
    currentPage: {
        backgroundColor: '#437da3',
    },
    currrentPageText: {
        color: '#fff'
    },
    selectOption: {
        left: 10
    }
})

export default Exam;