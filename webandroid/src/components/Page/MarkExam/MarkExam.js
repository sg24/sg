import React from 'react';
import { View, Platform, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'ionicons';
import Text from 'text'

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import MediaContainer from '../../UI/MediaContainer/MediaContainer';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import CheckBox from '../../UI/CheckBox/CheckBox';
import FormElement from '../../UI/FormElement/FormElement';
import TabBarge from '../../UI/TabBarge/TabBarge';
import Button from '../../UI/Button/Button';

const exam = props => {
    let isSelected = props.selectedAnswer.filter(cnt => cnt._id === props.cnt._id)[0];
    let startPageReaction = props.pageReaction.length > 0 ? 
        props.pageReaction.filter(id => id === props.cntID).length > 0 ? true : false : false;
    return (
        <>
        <View style={styles.pageInfo}>
            <View style={styles.pageUpdateInfo}>
                <TabBarge
                    notification={props.index+1}
                    style={styles.currentPage}
                    textStyle={styles.textStyle}/>
                <TabBarge
                    notification={props.questionTotal}
                    style={styles.totalPage}
                    textStyle={styles.totalPageText} />
            </View>
            <Button 
                style={styles.submitButton} 
                disabled={props.disableButton || startPageReaction}
                onPress={props.submitAnswerHandler}
                submitting={startPageReaction}
                loaderStyle="#fff">
                <Ionicons name="checkmark-outline" size={16} color="#fff"/>
                <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
        </View>
        <ScrollView 
            style={styles.scroll}
            showsVerticalScrollIndicator={Platform.OS === 'web' && props.viewMode === 'landscape' }>
            <View style={styles.container}>
                <BoxShadow style={styles.wrapper}>
                    <View>
                        {props.cnt.media.map((media, index) => 
                            <MediaContainer
                                key={index}
                                media={media}
                                wrapperStyle={styles.mediaWrapper}
                                disablePreview>
                                {media.description ? <Text numberOfLines={1} style={styles.description}>{ media.description }</Text> : null}
                            </MediaContainer>)}
                        <Text style={styles.content}>{ props.cnt.content }</Text>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={{color: '#777', fontSize: 16}}>Answer</Text>
                            <View style={styles.currentAns}>
                                <Text style={styles.answerText}>{ props.cnt.answer }</Text>
                            </View>
                        </View>
                        <View style={{marginVertical: 10}}>
                            <Text style={{color: '#777', fontSize: 16}}>Answer you provided</Text>
                            <View style={styles.answerCorrect}>
                                <Text style={styles.answerText}>{ props.cnt.correctAnswer }</Text>
                            </View>
                        </View>
                        <View style={styles.checkBoxWrapper}>
                            <CheckBox
                                checked={isSelected && isSelected.correct}
                                onCheck={(val) => val === true ? props.selectAnswer(val, props.cnt._id, 'correct') : null}
                                formWrapperStyle={styles.formCheckWrapper}
                                outterStyle={styles.formCheckOutter}
                                title="Correct"
                                checkedStyle={{backgroundColor: '#16cf27'}}/> 
                            <CheckBox
                                checked={isSelected && (isSelected.correct === false)}
                                onCheck={(val) => !val === false ? props.selectAnswer(!val, props.cnt._id, 'wrong') : null}
                                formWrapperStyle={styles.formCheckWrapper}
                                outterStyle={styles.formCheckOutterWrong}
                                title="Wrong"
                                checkedStyle={{backgroundColor: '#ff1600'}}/> 
                        </View>
                    </View>
                </BoxShadow>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    container: {
        width: '100%',
        paddingHorizontal: 10
    },
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    mediaWrapper: {
        height: 200,
        width: '100%',
        backgroundColor: '#e9ebf2',
        marginTop: 10
    },
    content: {
        fontSize: 18,
        marginVertical: 10
    },
    answer: {
        paddingTop: 20,
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#dcdbdc'
    },
    currentAns: {
        borderWidth: 1,
        borderColor: '#dcdbdc',
        width: '100%',
        marginTop: 5,
        padding: 10
    },
    answerCorrect: {
        backgroundColor: '#dcdbdc',
        width: '100%',
        marginTop: 5,
        padding: 10
    },
    answerText: {
        fontSize: 18
    },
    scroll: {
        width: '100%',
        paddingTop: 5   
    },
    checkBoxWrapper: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    formCheckWrapper: {
        paddingTop: 0,
        marginTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        marginVertical: 0,
        marginHorizontal: 0
    },
    formCheckOutter: {
        borderColor: '#16cf27'
    },
    formCheckOutterWrong: {
        borderColor: '#ff1600'
    },
    pageInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    currentPage: {
        position: 'relative',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#437da3'
    },
    totalPage: {
        position: 'relative',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#dcdbdc',
        marginLeft: 5
    },
    totalPageText: {
        color: '#333',
        fontSize: 15
    },
    pageUpdateInfo: {
        flexDirection: 'row'
    },
    submitButton: {
        backgroundColor: '#437da3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    submitButtonText: {
        color: '#fff',
        marginLeft: 5
    }
});

export default exam;