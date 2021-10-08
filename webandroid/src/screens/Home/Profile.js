import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { takePicture, camera, gallery } from 'picker';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Profiles from '../../components/Main/Profile/Profile.js';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import TabView from '../../components/UI/TabView/TabView';
import Post from '../../screens/ByAuthor/Post';
import Question from '../../screens/ByAuthor/Question';
import Feed from '../../screens/ByAuthor/Feed';
import WriteUp from '../../screens/ByAuthor/WriteUp';
import CBT from '../../screens/ByAuthor/CBT';
import Group from '../../screens/ByAuthor/Group'
import Advert from '../../screens/ByAuthor/Advert';
import Users from '../../screens/ByAuthor/Users';

class Profile extends Component {
    constructor(props) {
        super(props);
        let layoutWidth = Dimensions.get('window').width;
        this.state = {
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portrait',
            backgroundColor: '#fff',
            userID: this.props.route.params ? this.props.route.params.userID : null,
            index: 0,
            routes: [{key: 'friend', title: 'Friend'},{key: 'post', title: 'Post'},{key: 'feed', title: 'Feed'},  {key: 'group' , title: 'Group'}, 
            {key: 'CBT', title: 'CBT'}, {key: 'question', title: 'Question'}, {key: 'writeUp', title: 'Write Up'},
            {key: 'advert', title: 'Product'}],
            edit: false,
            layoutWidth,
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
            showImageAccodion: true,
            showActionSheet: false,
            showCamera: false,
            showTab: true
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        if (this.state.userID) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.onFetchProfile(this.state.userID);
                this.setState({showTab: true});
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onCloseHeaderPage();
                this.setState({showTab: false});
                this.props.onPageReset('BYAUTHOR');
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
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    navigationHandler = (page, id) => {
      
    }

    
    updateStyle = (dims) => {
        let layoutWidth = dims.window.width;
        this.setState({
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portriat',
            layoutWidth
        })
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

    enableChangeImageHandler =  () => {
       this.setState({showActionSheet: true})
    }
    
    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            camera({type: "Images"}).then(image=> {
                this.setState({uploadImage: image[0], showActionSheet: false})
            }).catch(e => {
                if (e === 'useCamera') {this.setState({showCamera: true, showActionSheet: false})}
                this.setState({showActionSheet: false})
            })
        } else {
            gallery({type: "Images", allowsMultipleSelection: false}, 'image').then(image => {
                this.setState({uploadImage: image[0], showActionSheet: false})
            }).catch(e => {
                this.setState({showActionSheet: false})
            })
        }
    };

    closeCameraHandler = () => {
        this.setState({showCamera: false})
    }

    cancelUploadImageHandler = () => {
        this.setState({uploadImage: null});
        this.props.onProfileImageReset()
    }

    takePictureHandler = async () => {
        if (this.camera) {
            takePicture(this.camera).then(image => {
                this.setState({uploadImage: image[0], showCamera: false})
            }).catch(e => { this.setState({showCamera: false})})
        }
    }

    submitProfileImageHandler = () => {
        this.props.onSubmitProfileImage(this.state.uploadImage, this.state.userID);
    }

    submitUsernameHandler = () => {
        this.props.onSubmitUsername(String(this.state.formElement.newUsername.value).trim(), this.state.userID)
    }

    enableNameAccodion = () => {
        this.setState({showNameAccodion: !this.state.showNameAccodion});
    }

    enableImageAccodion = () => {
        this.setState({showImageAccodion: !this.state.showImageAccodion});
    }

    setIndexHandler = (index) => {
        this.setState({index});
    }

    chatHandler = (cnt) => {
        this.props.navigation.push('ChatBox', {title: '', showHeaderImage: true,  chatType: 'userchat', page: 'users',
            pageID: cnt.id, showReply: false, info: {title: cnt.username, image: cnt.image, status: cnt.status, showStatus: true}});
    }

    render() {
        let header = (
            this.state.viewMode === 'landscape' ? (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    title="Profile"
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

        let renderScene = screenProps => {
            switch (screenProps.route.key) {
                case 'friend':
                    return <Users {...screenProps} profileID={this.props.userID} focus={(this.state.index === 0) && this.state.showTab}/>;
                case 'post':
                    return <Post {...screenProps} profileID={this.props.userID} focus={(this.state.index === 1) && this.state.showTab}/>;
                case 'feed':
                    return <Feed {...screenProps} profileID={this.props.userID} focus={(this.state.index === 2) && this.state.showTab}/>;
                case 'group':
                    return <Group {...screenProps} profileID={this.props.userID} focus={(this.state.index === 3) && this.state.showTab}/>;
                case 'CBT':
                    return <CBT {...screenProps} profileID={this.props.userID} focus={(this.state.index === 4) && this.state.showTab}/>;
                case 'question':
                    return <Question {...screenProps} profileID={this.props.userID} focus={(this.state.index === 5) && this.state.showTab}/>;
                case 'writeUp':
                    return <WriteUp {...screenProps} profileID={this.props.userID} focus={(this.state.index === 6) && this.state.showTab}/>;
                case 'advert':
                    return <Advert {...screenProps} profileID={this.props.userID} focus={(this.state.index === 7) && this.state.showTab}/>;
                default:
                    return null;
            }
        }

       
        if (!this.props.profileErr && this.props.profile){
            let profile = this.props.changeProfileStart;
            cnt = (
                <View style={[styles.wrapper]}>
                    { header }
                    <Profiles
                        profile={this.props.profile}
                        navigate={this.navigationHandler}
                        userID={this.state.userID}
                        profileID={this.props.userID}
                        chat={this.chatHandler}
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
                        enableNameAccodion={this.enableNameAccodion}
                        viewMode={this.state.viewMode}
                        showTab={this.state.showTab}
                        index={this.state.index}
                        setIndex={this.setIndexHandler}
                        routes={this.state.routes}
                        layoutWidth={this.state.layoutWidth}
                        onTabPress={this.tabPressHandler}/>
                    <TabView
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        renderScene={renderScene}
                        onIndexChange={this.setIndexHandler}
                        initialLayout={{ width: this.state.layoutWidth}}
                        lazy
                        style={{height: this.state.layoutHeight}}
                    />

                    { this.props.changeProfileErr ? 
                    <NotificationModal
                        info="Network Error"
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
                    { this.state.showActionSheet ? 
                        <ActionSheet
                            options ={['Camera', 'Gallery']}
                            icons={['camera-outline', 'image-outline']}
                            bottonIndex={this.actionSheetHandler}
                            title={"Choose"}
                            showSeparator/>
                        : null}
                    { this.state.showCamera ? 
                        <CameraComponent 
                            closeCamera={this.closeCameraHandler}
                            onPress={this.takePictureHandler}
                            camera={ref => this.camera = ref}
                            title="Camera"
                            icon={{name: 'camera-outline', color: '#fff'}}/>: null}
                </View>
            )
        }

        if (this.props.profileErr) {
            cnt = (
                <ErrorInfo 
                    header={header}
                    viewMode={this.state.viewMode}
                    backgroundColor={this.state.backgroundColor}
                    reload={this.reloadFetchHandler}/>
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
            contentFetched={this.props.profile}>
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
    landscapeWrapper: {
        width: '100%'
    },
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    buttonCancel: {
        color: '#ff1600'
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
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
        onSubmitUsername: (username, userID) => dispatch(actions.submitUsernameInit(username, userID)),
        onPageReset: (page) => dispatch(actions.pageReset(page))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);