import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Keyboard, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { camera, explorer, takePicture, stopAudioRecorder} from 'picker';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import FormElement from '../../components/UI/FormElement/FormElement';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity, checkUri } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import CameraComponent from '../../components/UI/Camera/Camera';
import VideoCamera from '../../components/UI/VideoCamera/VideoCamera';
import AudioRecorder from '../../components/UI/AudioRecorder/AudioRecorder';
import EmojiPicker from '../../components/UI/EmojiPicker/EmojiPicker';
import LinkPreview from '../../components/UI/LinkPreview/LinkPreview';
import UploadPreview from '../../components/UI/UploadPreview/UploadPreview'
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import PostItem from '../../components/Page/Post/Post';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333',
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            viewHeight: Dimensions.get('window').height,
            pageCntID: null,
            showPreview: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat',
            viewHeight: dims.window.height
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onFetchPage(this.props.start, 5)
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onPageReset();
            this.setState({pageCntID: null, showPreview: null})
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchPage(this.props.start, 5);
    }

    navigationHandler = (page) => {
        console.log(page)
    }

    editHandler = (id) => {
        this.props.navigation.navigate('EditPost', {cntID: id});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    deleteHandler = (id) => {
        this.props.onDeletePage(id);
    }

    reportHandler = () => {

    }

    shareHandler = () => {

    }

    mediaPreviewHandler = (cntID, media, page) => {
        this.setState({showPreview: { startPage: page, media, cntID}})
    }

    closePreviewHandler = () => {
        this.setState({showPreview: null})
    }

    saveMediaHandler = (mediaCnt) => {

    }

    render() {
        let { styles } = this.props;
        let header = (
            this.state.viewMode === 'landscape' ? (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    disableBackButton
                    title="Home"
                />
            ) : null
        );

        let cnt = (
           <View style={styles.wrapper}>
                { header }
                <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.state.backgroundColor} : 
                        null]}>
                    <ActivityIndicator 
                        size="large"
                        animating
                        color="#437da3"/>
                </View>
           </View>
        )

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            cnt = (
                <View style={styles.container}>
                    { header }
                    {/* <View style={styles.formContainer}>
                        <BoxShadow style={styles.formWrapper}>
                            <Button 
                                style={styles.buttonIcon}> 
                                <Ionicons name="camera-outline" size={22} />
                            </Button>
                            <Button 
                                style={styles.buttonIcon}> 
                                <Ionicons name="happy-outline" size={22} />
                            </Button>
                            <FormElement
                                onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                                autoCorrect
                                multiline
                                autoFocus
                                placeholder={"Write ...."}
                                value={this.state.formElement.content.value}
                                formWrapperStyle={styles.formWrapperStyle}
                                inputWrapperStyle={styles.formWrapperStyle}
                                style={styles.formElementInput}/>
                            <Button 
                                title="Add"
                                style={styles.addButton}
                                onPress={this.props.start ? null : this.submitHandler}
                                textStyle={styles.textStyle}
                                submitting={this.props.start}
                                loaderStyle="#fff"/>
                        </BoxShadow>
                    </View> */}
                    <View style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.state.backgroundColor} : null]}>
                        <ScrollView 
                            style={styles.scroll}
                            showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                            <PostItem 
                                cnt={this.props.fetchCnt}
                                pageCntID={this.state.pageCntID}
                                edit={this.editHandler}
                                delete={this.deleteHandler}
                                share={this.shareHandler}
                                report={this.reportHandler}
                                showUserOpt={this.showUserOptHandler}
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}/>
                        </ScrollView>
                    </View>
                    { this.props.deletePageErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onDeletePageReset}
                        button={[{title: 'Ok', onPress: this.props.onDeletePageReset, style: styles.button}]}/> : null}
                   { this.state.showPreview ? 
                        <MediaPreview
                            pageID={this.state.showPreview.cntID}
                            media={this.state.showPreview.media}
                            page="post"
                            startPage={this.state.showPreview.startPage}
                            closePreview={this.closePreviewHandler}
                            backgroundColor={this.state.backgroundColor}/> : null}
                </View>
            )
        }

        if (this.props.fetchCntErr) {
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
            contentFetched={this.props.fetchCnt}>
        </NoBackground>
      )
    }
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
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
        alignItems: 'center'
    },
    container: {
        width: '100%',
        flex: 1
    },
    formContainer: {
        padding: 10,
        backgroundColor: '#dcdbdc'
    },
    formWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5
    },
    formWrapperStyle: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0,
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        fontSize: 18
    },
    buttonIcon: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#dcdbdc',
        borderRightWidth: 1,
        borderRadius: 0
    },
    addButton: {
        backgroundColor: '#437da3',
        color: '#fff',
        paddingHorizontal: 10,
        marginRight: 5
    },
    scroll: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10
    }
}))

const mapStateToProps = state => {
    return {
        start: state.page.start,
        fetchCntErr: state.page.fetchPostError,
        fetchCnt: state.page.fetchPost,
        deletePageStart: state.page.deletePostStart,
        deletePageErr: state.page.deletePostErr,
        deletePage: state.page.deletePage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit) => dispatch(actions.fetchPageInit(start, limit, 'post')),
        onDeletePage: (id) => dispatch(actions.deletePageInit(id, 'post')),
        onPageReset: () => dispatch(actions.fetchPageReset()),
        onDeletePageReset: () => dispatch(action.deletePageReset())
    };
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Post));