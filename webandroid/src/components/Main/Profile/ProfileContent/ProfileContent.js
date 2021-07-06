import React from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Icon from 'ionicons';
import Moment from 'react-moment';
import ShadowView from 'react-native-simple-shadow-view';
import Constants from 'expo-constants';

import Button from '../../../UI/Button/Button';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';
import FormElement from '../../../UI/FormElement/FormElement';
import TouchableNativeFeedback from '../../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import TabView from '../../../UI/TabView/TabView';
import ChangeProfile from './ChangeProfile/ChangeProfile';
import Post from '../../../../screens/ByAuthor/Post';
import Question from '../../../../screens/ByAuthor/Question';
import Feed from '../../../../screens/ByAuthor/Feed';
import WriteUp from '../../../../screens/ByAuthor/WriteUp';
import CBT from '../../../../screens/ByAuthor/CBT';
import Group from '../../../../screens/ByAuthor/Group'
import Advert from '../../../../screens/ByAuthor/Advert';
import Users from '../../../../screens/ByAuthor/Users';

const profileContent = props => {
    let renderScene = screenProps => {
        switch (screenProps.route.key) {
            case 'friend':
                return <Users {...screenProps} profileID={props.userID} focus={(props.index === 0) && props.showTab}/>;
            case 'post':
                return <Post {...screenProps} profileID={props.userID} focus={(props.index === 1) && props.showTab}/>;
            case 'feed':
                return <Feed {...screenProps} profileID={props.userID} focus={(props.index === 2) && props.showTab}/>;
            case 'group':
                return <Group {...screenProps} profileID={props.userID} focus={(props.index === 3) && props.showTab}/>;
            case 'CBT':
                return <CBT {...screenProps} profileID={props.userID} focus={(props.index === 4) && props.showTab}/>;
            case 'question':
                return <Question {...screenProps} profileID={props.userID} focus={(props.index === 5) && props.showTab}/>;
            case 'writeUp':
                return <WriteUp {...screenProps} profileID={props.userID} focus={(props.index === 6) && props.showTab}/>;
            case 'advert':
                return <Advert {...screenProps} profileID={props.userID} focus={(props.index === 7) && props.showTab}/>;
            default:
                return null;
        }
    }
    let userImg = <Icon name="person" size={60} color="#777"/>
    let myAccount = props.profileID === props.userID
    if (props.cnt.image) {
        userImg = <Image source={{uri: Constants.manifest.extra.BASE_IMAGE_URL + props.cnt.image}} style={styles.userImageWrapper}/>;
    }
    let status = (
        <>
            <View style={[styles.statusIcon]}></View>
            <Text numberOfLines={1} style={styles.statusDet}>
                <Moment element={Text} date={props.cnt.visited} fromNow />
            </Text>
        </>
    )
    let edit = null;
    let updateProfile = null;
    if (props.cnt.status) {
        status = (
            <>
                <View style={[styles.statusIcon, styles.statusOnIcon]}></View>
                <Text numberOfLines={1} style={styles.statusDet}>
                   online
                </Text>
            </>
        )
    }
    let userOpt = (
        <Button onPress={props.addUser} >
            <BoxShadow style={styles.useroptBotton}>
                <Icon name="person" size={16} color="#437da3"/>
                <Text numberOfLines={1} style={[styles.userOptText, styles.chatText]}>Add</Text>
            </BoxShadow>
        </Button>
    )
    if (props.cnt.request) {
        userOpt = (
            <>
                <Button onPress={props.acceptUser}>
                    <BoxShadow style={styles.useroptBotton}>
                        <Icon name="person-add" size={16} color="#16cf27"/>
                        <Text numberOfLines={1} style={[styles.userOptText, styles.acceptText]}>Accept</Text>
                    </BoxShadow>
                </Button>
                <Button onPress={props.rejUser}>
                    <BoxShadow style={StyleSheet.flatten([styles.useroptBotton, styles.useroptBottonWrapper])}>
                        <Icon name="close" size={16} color="#ff1600"/>
                        <Text numberOfLines={1} style={[styles.userOptText, styles.cancelText]}>Reject</Text>
                    </BoxShadow>
                </Button>
            </>
        )
    }
    if (props.cnt.pending) {
        userOpt = (
            <Button onPress={props.cancelReq}>
               <BoxShadow style={styles.useroptBotton}>
                   <Icon name="close" size={16} color="#ff1600"/>
                   <Text numberOfLines={1} style={[styles.userOptText, styles.cancelText]}>Cancel</Text>
               </BoxShadow>
           </Button>
        )
    }
    if (props.cnt.accept) {
        userOpt = (
            <>
                <Button onPress={props.chat}>
                    <BoxShadow style={styles.useroptBotton}>
                        <Icon name="chatbubble-ellipses" size={16} color="#437da3"/>
                        <Text numberOfLines={1} style={[styles.userOptText, styles.chatText]}>Chat</Text>
                    </BoxShadow>
                </Button>
                <Button onPress={props.unfriend}>
                    <BoxShadow style={StyleSheet.flatten([styles.useroptBotton, styles.useroptBottonWrapper])}>
                        <Icon name="person-remove" size={16} color="#ff1600"/>
                        <Text numberOfLines={1} style={[styles.userOptText, styles.cancelText]}>Unfriend</Text>
                    </BoxShadow>
                </Button>
            </>
        )
    }
    if (myAccount) {
        status = null
        edit = (
            <TouchableNativeFeedback onPress={props.enableUserOpt} style={styles.edit}>
                <View style={styles.edit}><Icon name="create-outline" size={20} color="#437da3"/></View>
            </TouchableNativeFeedback>
        )
        userOpt = null
    }
    
    if (props.showUserOpt) {
        updateProfile = (
            <ChangeProfile
                cnt={props.cnt}
                viewMode={props.viewMode}
                enableUserOpt={props.enableUserOpt}
                enableChangeImage={props.enableChangeImage}
                formElement={props.formElement}
                inputChanged={props.inputChanged}
                uploadImage={props.uploadImage}
                cancelUploadImage={props.cancelUploadImage}
                submitProfileImage={props.submitProfileImage}
                submittingProfileImage={props.submittingProfileImage}
                submittedProfileImage={props.submittedProfileImage}
                submitProfileImageErr={props.submitProfileImageErr}
                submitUsername={props.submitUsername}
                submittingUsername={props.submittingUsername}
                submitUsernameErr={props.submitUsernameErr}
                submittedUsername={props.submittedUsername}
                showImageAccodion={props.showImageAccodion}
                enableImageAccodion={props.enableImageAccodion}
                showNameAccodion={props.showNameAccodion}
                enableNameAccodion={props.enableNameAccodion}
                />
        )
    }

    return (
        <>
            <View style={styles.wrapper}>
                <ScrollView>
                    <View style={styles.userDet}>
                        <View style={styles.userDetWrapper}>
                            <BoxShadow style={styles.userImageWrapper}>
                                { userImg }
                                { edit }
                            </BoxShadow>
                            <View style={[styles.status]}>{status}</View>
                            <ShadowView style={styles.usernameWrapper}>
                                <Text style={styles.usernameText} numberOfLines={1}>
                                    { props.cnt.username }
                                </Text>
                            </ShadowView>
                        </View>
                        <BoxShadow style={styles.userOpt}>
                            <View style={[styles.disabledCnt, props.start ? styles.disabled : null]}>
                                { userOpt }
                            </View>
                        </BoxShadow>
                    </View>
                    <View style={styles.about}>
                        <FormElement
                            labelTitle="About"
                            onChangeText={(val) => props.inputChanged(val, 'about')}
                            autoCorrect
                            multiline
                            numberOfLines={props.edit ? 4 : 1}
                            placeholder={!props.cnt.about && props.edit ? "Short description ...." : null}
                            editable={props.edit && !props.submittingAbout}
                            value={props.edit && props.formElement.about.touched  ? props.formElement.about.value : props.cnt.about}
                            style={props.aboutField}
                            labelStyle={styles.aboutTitle}
                            valid={(!props.formElement.about.valid && props.formElement.about.touched) || props.submitAboutErr}
                            error={props.submitAboutErr ? "Network Error" : "About must be longer than 5 characters"}
                            inputWrapperStyle={styles.formInputWrapper}
                            formWrapperStyle={styles.formWrapper}
                            style={props.edit ? StyleSheet.flatten([styles.inputEdit, styles.input]) : styles.input }
                            inputIcon={!props.edit && myAccount ? "create-outline" : null}
                            inputIconStyle={[styles.edit, styles.inputEdit]}
                            onPress={props.enableEdit}
                            />
                        {props.edit ? <View style={styles.aboutButtonWrapper}>
                            <Button onPress={props.cancelEdit} >
                                <BoxShadow style={styles.aboutButton}>
                                    <Icon name="close" size={14} color="#ff1600"/>
                                    <Text numberOfLines={1} style={styles.cancel}>Cancel</Text>
                                </BoxShadow>
                            </Button>
                            <Button 
                                onPress={props.formElement.about.valid && !props.submittingAbout ? props.submitAbout.bind(this, props.formElement.about.value) : null}
                                disabled={!props.formElement.about.valid}>
                                <BoxShadow 
                                    style={styles.aboutButton}
                                    disabled={!props.formElement.about.valid}>
                                {!props.submittingAbout ? (
                                    <>
                                        <Icon name="checkmark-outline" size={14} color="#437da3"/>
                                        <Text numberOfLines={1} style={styles.save}>Save</Text>
                                    </>
                                ) : <ActivityIndicator size="small" color="#437da3" animating/>}
                                </BoxShadow> 
                            </Button>
                        </View> : null }
                    </View>
                    <TabView
                        navigationState={{ index: props.index, routes: props.routes }}
                        renderScene={renderScene}
                        onIndexChange={props.setIndex}
                        initialLayout={{ width: props.layoutWidth }}
                        lazy
                    />
                </ScrollView>
            </View>
            { updateProfile }
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 10
    },
    userDet: {
        backgroundColor: '#437da3',
        width: '100%'
    },
    userDetWrapper: {
       marginVertical: 10
    },
    textStyle: {
        fontSize: 15 ,
        color: '#fff'  
    },
    edit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 20,
        width: 20,
        backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageWrapper: {
        position: 'relative',
        width: 100,
        height: 100,
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        resizeMode: 'stretch',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: .6,
        shadowRadius: 5,
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusIcon: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#ff1600',
        marginRight: 10,
        top: 2,
        borderColor: '#fff',
        borderWidth: 1
    },
    statusOnIcon: {
        backgroundColor: '#16cf27',
        borderColor: '#fff',
        borderWidth: 1
    },
    statusDet: {
        fontSize: 16,
        flexShrink: 1,
        color: '#dcdbdc'
    },
    usernameWrapper: {
        shadowColor: 'rgba(220,219,220,.8)',
        backgroundColor: '#437da3',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: 10
    },
    usernameText: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(5,87,139, .8)',
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 22,
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 15,
        textShadowOffset: {
            width: 1,
            hieght: 1
        }
    },
    userOpt: {
        flexDirection: 'row',
        shadowColor: 'rgba(220,219,220,.8)',
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#437da3',
        paddingBottom: 5,
        paddingHorizontal: 10
    },
    useroptBotton: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: .8,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5
    },
    useroptBottonWrapper: {
        marginLeft: 20,
        backgroundColor: '#fff'
    },
    userOptText: {
        fontSize: 16,
        marginLeft: 5
    },
    disabledCnt: {
        flexDirection: 'row',
    },
    disabled: {
        opacity: .6
    },
    about: {
        padding: 10
    },
    aboutTitle: {
        textAlign: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: '#e9ebf2',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        color: 'rgba(5,87,139, .8)',
        flexShrink: 1,
        fontSize: 16,
        alignSelf: 'center'
    },
    formWrapper: {
        position: 'relative',
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },
    formInputWrapper: {
        marginTop: 0,
        backgroundColor: '#e9ebf2',
        color: '#333'
    },
    input: {
        color: '#333',
        textAlignVertical: 'top'
    },
    inputEdit: {
        backgroundColor: '#fff',
        top: 0
    },
    aboutButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    aboutButton: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        color: '#437da3',
        marginLeft: 5, 
    },
    chatText: {
        color: '#437da3'
    },
    cancel: {
        color: '#ff1600',
        marginLeft: 5
    },
    cancelText: {
        color: '#ff1600'
    },
    acceptText: {
        color: '#16cf27'
    }
});

export default profileContent;