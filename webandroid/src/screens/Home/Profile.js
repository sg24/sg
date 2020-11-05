import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'Ionicons';
import * as ImagePicker from 'expo-image-picker';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Profiles from '../../components/Main/Profile/Profile.js';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';

class Profile extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            userID: this.props.route.params.userID,
            edit: false,
            formElement: {
                about: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                },
                username: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                },
                newUsername: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
            showUserOpt: false,
            profileTab: ['Post','Friend','Room','Page','Feed','Question', 'CBT','Write Up'],
            currentProfileTab: 'Post',
            uploadImage: null,
            showNameAccodion: false,
            showImageAccodion: true
        }
    }

    componentDidMount() {
        if (this.state.userID) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.onFetchProfile(this.state.userID);
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onCloseHeaderPage();
            });
        } else {
            this.props.navigation.navigate('Home')
        }
    }

    componentDidUpdate() {
        if (this.props.submitAbout && this.state.edit) {
            this.setState({edit: false});
            this.props.onSubmitAboutReset()
        }
        if (this.props.submitProfileImage && this.state.uploadImage) {
            this.setState({uploadImage: null})
        }
        if (this.props.submitUsername && this.state.formElement.newUsername.value) {
            let formElement = this.state.formElement
            formElement.username.value = '';formElement.username.valid = false,
            formElement.username.touched = false;formElement.newUsername.value = '';
            formElement.newUsername.valid = false;formElement.newUsername.touched = false;
            this.setState({formElement})
        }
    }

    componentWillUnmount() {
        if (this.state.userID) {
            this._unsubscribe();
            this._unsubscribeBlur();
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = (page, id) => {
      
    }

    reloadFetchHandler = () => {
        this.props.onFetchProfile(this.state.userID);
    }

    changeProfileHandler = (id, title, det, confirm, info) => {
        this.props.onChangeProfile(id, title, det, confirm, info);
    };

    inputChangedHandler = (value, inputType) => {
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
        
        this.setState({formElement: updateFormElement, formIsValid});
        if (this.props.submitAboutErr) {
            this.props.onSubmitAboutReset()
        }
    }

    enableEditHandler = () => {
        this.setState({edit: !this.state.edit})
        if (this.state.edit) {
            this.props.onSubmitAboutReset();
        }
    }

    submitAboutHandler = (cnt) => {
        this.props.onSubmitAbout(cnt, this.state.userID)
    }

    enableUserOptHandler = () => {
        this.setState({showUserOpt: !this.state.showUserOpt})
    }

    selectProfileTabHandler = (tab) => {
        this.setState({currentProfileTab: tab})
    }

    enableChangeImageHandler = () => {
        const options = {
        }
        // Share.share({message: 'share'})
        // ImagePicker.show()
        // ImagePicker.openPicker(options).then(response => {
        //     if (response.path) {
        //         this.setState({uploadImage: {uri: response.path, type: response.mime, 
        //             name: response.path.split('/').pop()}})
        //     }
        // }).catch(err => err)
    }

    cancelUploadImageHandler = () => {
        this.setState({uploadImage: null});
        this.props.onProfileImageReset()
    }

    submitProfileImageHandler = () => {
        this.props.onSubmitProfileImage(this.state.uploadImage, this.state.userID);
    }

    submitUsernameHandler = () => {
        this.props.onSubmitUsername(this.state.formElement.newUsername.value, this.state.userID)
    }

    enableNameAccodion = () => {
        this.setState({showNameAccodion: !this.state.showNameAccodion});
    }

    enableImageAccodion = () => {
        this.setState({showImageAccodion: !this.state.showImageAccodion});
    }

    render() {
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        )

       
        if (!this.props.profileErr && this.props.profile){
            let profile = this.props.changeProfileStart;
            cnt = (
                <ScrollView>
                     <View style={[styles.wrapper, this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <Profiles
                            profile={this.props.profile}
                            navigate={this.navigationHandler}
                            userID={this.state.userID}
                            changeProfile={this.changeProfileHandler}
                            changeProfileStart={this.props.changeProfileStart}
                            inputChanged={this.inputChangedHandler}
                            formElement={this.state.formElement}
                            enableEdit={this.enableEditHandler}
                            edit={this.state.edit}
                            cancelEdit={this.enableEditHandler}
                            submitAbout={this.submitAboutHandler}
                            submittingAbout={this.props.submitAboutStart}
                            submitAboutErr={this.props.submitAboutErr}
                            enableUserOpt={this.enableUserOptHandler}
                            showUserOpt={this.state.showUserOpt}
                            profileTab={this.state.profileTab}
                            selectProfileTab={this.selectProfileTabHandler}
                            currentProfileTab={this.state.currentProfileTab}
                            enableChangeImage={this.enableChangeImageHandler}
                            uploadImage={this.state.uploadImage}
                            cancelUploadImage={this.cancelUploadImageHandler}
                            submitProfileImage={this.submitProfileImageHandler}
                            submittingProfileImage={this.props.submitProfileImageStart}
                            submitProfileImageErr={this.props.submitProfileImageErr}
                            submittedProfileImage={this.props.submitProfileImage}
                            submitUsername={this.submitUsernameHandler}
                            submittingUsername={this.props.submitUsernameStart}
                            submittedUsername={this.props.submitUsername}
                            submitUsernameErr={this.props.submitUsernameErr}
                            showImageAccodion={this.state.showImageAccodion}
                            enableImageAccodion={this.enableImageAccodion}
                            showNameAccodion={this.state.showNameAccodion}
                            enableNameAccodion={this.enableNameAccodion}/>
                        { this.props.changeProfileErr ? 
                        <NotificationModal
                            info="Network Error !"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.onCloseModal}
                            button={[{title: 'Ok', onPress: this.props.onCloseModal, style: styles.button}]}/> : null}
                        { profile && !profile.confirm ? 
                        <NotificationModal
                            info={profile.info}
                            closeModal={this.props.onCloseModal}
                            button={[{title: 'Ok', onPress: () => this.changeProfileHandler(profile.id, profile.title, profile.det, true), 
                                style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.props.onCloseModal, style: styles.button}]}/> : null}
                     </View>
                </ScrollView>
            )
        }

        if (this.props.profileErr) {
            cnt = (
                <>
                    <InfoBox
                        det='Network Error!'
                        name="cloud-offline-outline"
                        size={40}
                        color="#ff1600"
                        style={styles.info}/>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.reloadFetchHandler} style={styles.reload}>
                            <Ionicons name="reload-outline" size={18} color="#777"/>
                            <Text style={styles.reloadText}>Reload</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }

      return (
        <NoBackground>
            { cnt }
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    landscapeWrapper: {
        width: '100%'
    },
    info: {
        fontSize: 18
    },
    icon: {
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
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    buttonCancel: {
        color: '#ff1600'
    }
})

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        profileErr: state.profile.profileErr,
        changeProfileErr: state.profile.changeProfileErr,
        changeProfileStart: state.profile.changeProfileStart,
        submitAboutStart: state.profile.submitAboutStart,
        submitAboutErr: state.profile.submitAboutErr,
        submitAbout: state.profile.submitAbout,
        submitProfileImageErr: state.profile.submitProfileImageErr,
        submitProfileImageStart: state.profile.submitProfileImageStart,
        submitProfileImage: state.profile.submitProfileImage,
        submitUsernameErr: state.profile.submitUsernameErr,
        submitUsernameStart: state.profile.submitUsernameStart,
        submitUsername: state.profile.submitUsername
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: (userID) => dispatch(actions.fetchProfileInit(userID)),
        onCloseHeaderPage: () => dispatch(actions.fetchProfileStart()),
        onCloseModal: () => dispatch(actions.changeProfileCancel()),
        onChangeProfile: (id, title, det, confirm, info) => dispatch(actions.changeProfileInit(id, title, det, confirm, info)),
        onSubmitAbout: (cnt, userID) => dispatch(actions.submitAboutInit(cnt, userID)),
        onSubmitAboutReset: () => dispatch(actions.submitAboutReset()),
        onSubmitProfileImage: (image, userID) => dispatch(actions.submitProfileImageInit(image, userID)),
        onProfileImageReset: () => dispatch(actions.submitProfileImageReset()),
        onSubmitUsername: (username, userID) => dispatch(actions.submitUsernameInit(username, userID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);