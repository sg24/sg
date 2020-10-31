import React from 'react';
import { View, Text, Image, ScrollView, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TouchableNativeFeedback from '../../../../UI/TouchableNativeFeedback/TouchableNativeFeedback'
import DefaultHeader from '../../../../UI/Header/DefaultHeader';
import FormElement from '../../../../UI/FormElement/FormElement'
import Button from '../../../../UI/Button/Button';
import BoxShadow from '../../../../UI/BoxShadow/BoxShadow';
import Accodion from '../../../../UI/Accodion/Accodion';

const changeProfile = props => {
    let uploadOpt = (
        <TouchableNativeFeedback onPress={props.enableChangeImage}>
            <View style={styles.modalUpload}>
                <Icon name="cloud-upload-outline" size={30} color="#437da3"/>
                <Text style={styles.modalUploadText}>Upload Image </Text>
            </View>
        </TouchableNativeFeedback>
    );

    if (props.uploadImage) {
       uploadOpt = (
        <View style={styles.modalUpload}>
            <Image source={{...props.uploadImage}} style={styles.modalImageWrapper}/>
            {props.submitProfileImageErr ? <View><Text style={styles.error}> Network Error </Text></View> : null }
            <View style={styles.uploadButtonWrapper}>
                <Button 
                    onPress={!props.submittingProfileImage ? props.cancelUploadImage : null}
                    disabled={props.submittingProfileImage}>
                    <BoxShadow style={styles.uploadButton}>
                        <Icon name="close" size={14} color="#ff1600"/>
                        <Text numberOfLines={1} style={styles.cancel}>Cancel</Text>
                    </BoxShadow>
                </Button>
                <Button 
                    onPress={!props.submittingProfileImage ? props.submitProfileImage : null}>
                    <BoxShadow style={styles.uploadButton}>
                    {!props.submittingProfileImage ? (
                            <>
                                <Icon name="checkmark-outline" size={14} color="#437da3"/>
                                <Text numberOfLines={1} style={styles.upload}>Upload</Text>
                            </>
                        ) : <ActivityIndicator size="small" color="#437da3" animating/>}
                    </BoxShadow> 
                </Button>
            </View>
        </View>
       )
    }

    if (props.submittedProfileImage) {
        uploadOpt = (
            <View style={styles.modalUpload}>
                <Text style={styles.modalUploadText}>Profile image updated</Text>
            </View>
        )
    }

    return (
        <Modal
            onRequestClose={props.enableUserOpt}
            animationType="slide">
                <ScrollView>
                    <DefaultHeader 
                        title="Change Profile"
                        onPress={props.enableUserOpt}/>
                    <View style={styles.modal}>
                        <Accodion
                            title="Change Image"
                            icon={{name: 'chevron-down-outline',size: 15}}
                            titleStyle={styles.modalText}
                            visible={props.showImageAccodion}
                            onPress={props.enableImageAccodion}>
                            { uploadOpt }
                        </Accodion>
                        <Accodion
                            title="Change Name"
                            icon={{name: 'chevron-down-outline',size: 15}}
                            titleStyle={styles.modalText}
                            visible={props.showNameAccodion}
                            onPress={props.enableNameAccodion}>
                            <View>
                                {props.submitUsernameErr ? <View style={styles.modalInfo}><Text style={styles.error}> Network Error </Text></View> : 
                                props.submittedUsername ? <View style={[styles.modalUpload, styles.modalInfo]}><Text style={styles.modalUploadText}>Username updated</Text></View> : null}
                                <FormElement 
                                    labelTitle="Old Username"
                                    onChangeText={(val) => props.inputChanged(val, 'username')}
                                    autoCorrect={false}
                                    placeholder={`Enter Previous username '${props.cnt.username}'`}
                                    autoCompleteType="username"
                                    value={props.formElement.username.value}
                                    valid={(props.formElement.username.value !== props.cnt.username) && props.formElement.username.touched}
                                    error="Does not match old username"
                                    formWrapperStyle={styles.modalFormWrapper}
                                    />
                                <FormElement 
                                    labelTitle="New Username"
                                    onChangeText={(val) => props.inputChanged(val, 'newUsername')}
                                    autoCorrect
                                    autoCompleteType="username"
                                    value={props.formElement.newUsername.value}
                                    valid={!props.formElement.newUsername.valid && props.formElement.newUsername.touched}
                                    error="Username must be longer than 5 characters"
                                    formWrapperStyle={styles.modalFormWrapper}
                                    />
                                <View style={styles.formButtomWrapper}>
                                    <Button 
                                        onPress={!props.submittingUsername && props.formElement.username.value === props.cnt.username &&  
                                            props.formElement.newUsername.valid ? props.submitUsername : null}
                                        disabled={(props.formElement.username.value !== props.cnt.username) || !props.formElement.newUsername.valid}>
                                        <BoxShadow style={styles.formButton}>
                                        {!props.submittingUsername ? (
                                                <>
                                                    <Icon name="checkmark-outline" size={14} color="#fff"/>
                                                    <Text numberOfLines={1} style={styles.formButtonText}>update</Text>
                                                </>
                                            ) : <ActivityIndicator size="small" color="#fff" animating/>}
                                        </BoxShadow> 
                                    </Button>
                                </View>
                            </View>
                        </Accodion>
                    </View>
                </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        paddingTop: 0,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    modalFormWrapper: {
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10
    },
    modalText: {
        fontSize: 15
    },
    modalUpload: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalUploadText: {
        fontSize: 16,
        marginTop: 5,
        color: '#437da3'
    },
    modalImageWrapper: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        resizeMode: 'cover',
        borderRadius: 5,
        alignSelf: 'center'
    },
    uploadButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    uploadButton: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upload: {
        color: '#437da3',
        marginLeft: 5, 
    },
    cancel: {
        color: '#ff1600',
        marginLeft: 5
    },
    error: {
        color: '#ff1600',
        marginTop: 5
    },
    formButtomWrapper: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    formButton: {
        backgroundColor: '#437da3',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formButtonText: {
        color: '#fff',
        marginLeft: 5
    },
    modalInfo: {
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    }
});

export default changeProfile;