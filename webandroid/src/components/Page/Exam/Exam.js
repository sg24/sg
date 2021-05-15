import React from 'react';
import { View, Text, Platform, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'ionicons';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import MediaContainer from '../../UI/MediaContainer/MediaContainer';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import CheckBox from '../../UI/CheckBox/CheckBox';
import FormElement from '../../UI/FormElement/FormElement';

const exam = props => {
    let isSelected = props.selectedAnswer.filter(cnt => cnt._id === props.cnt._id)[0];
    return (
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
                    <View style={{flex: 1, marginBottom: 10}}>
                    { props.cnt.examType === 'Objective' ? (
                                <View style={styles.answerWrapper}>
                                    {[...Object.entries(props.cnt.answerOption)].map(([option, cnt], index) => (
                                        <View key={index} style={styles.answer}>
                                            <TouchableNativeFeedback onPress={() => props.selectAnswer(!(isSelected && isSelected.option.filter(opt => opt === option)[0]), props.cnt._id, props.cnt.examType, option)} style={styles.answerOptWrapper}>
                                                <View style={[styles.answerOpt, isSelected && isSelected.option.filter(opt => opt === option)[0] ? styles.answerCorrect : null]}>
                                                    <Text style={[styles.textStyle, isSelected && isSelected.option.filter(opt => opt === option)[0] ? styles.answerTextCorrect : {color: '#333'}]}>{option}</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                            <Text style={styles.textStyle}>{ cnt.value }</Text>
                                            <CheckBox
                                                checked={isSelected && isSelected.option.filter(opt => opt === option)[0]}
                                                onCheck={(val) => props.selectAnswer(val, props.cnt._id, props.cnt.examType, option)}
                                                formWrapperStyle={styles.formCheckWrapper}
                                                outterStyle={styles.formCheckOutter}/>
                                        </View>
                                    ))}
                                </View>
                            ) : 
                                <FormElement
                                    placeholder="Write Answer ..."
                                    onChangeText={(val) => props.selectAnswer(val, props.cnt._id, props.cnt.examType)}
                                    error="Answer must not be empty"
                                    autoCorrect
                                    multiline
                                    value={isSelected ? isSelected.answer : ''}
                                    formWrapperStyle={styles.formWrapperStyle}
                                    inputWrapperStyle={{flex: 1, marginTop: 10, borderRadius: 0}}
                                    style={styles.formElementInput}/>}
                    </View>
                </BoxShadow>
            </View>
        </ScrollView>
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
        minHeight: 400,
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
        marginTop: 10
    },
    answerWrapper: {
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
    answerOptWrapper: {
        height: Platform.OS !== 'web' ? 'auto' : '100%'
    },
    answerOpt: {
        paddingVertical: 5,
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
    scroll: {
        width: '100%',
        paddingTop: 5   
    },
    formWrapperStyle: {
        flex: 1,
        paddingTop: 0,
        marginTop: 10,
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
        fontSize: 18,
        borderRadius: 0
    },
});

export default exam;