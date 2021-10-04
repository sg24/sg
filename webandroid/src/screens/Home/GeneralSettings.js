import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { explorer } from 'picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import Text from 'text';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import Accodion from '../../components/UI/Accodion/Accodion';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import CheckBox from '../../components/UI/CheckBox/CheckBox';

class GeneralSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            changeBackground: {commentBox: false, page: false},
            changeBackgroundImage: {commentBox: false, page: false},
            highlighted: {commentBox: false, page: false},
            highlightedBackground: {commentBox: false, page: false},
            highlightedText: {commentBox: false, page: false},
            page: [{title: 'Chat Box', page: 'commentBox', id: 'showCommentBox'}, {title:'Page', page: 'page' ,id: 'showPage'}],
            showCommentBox: false,
            showPageNotification: false,
            showGroupNotification: false,
            showShareNotification: false,
            pageNotification: [{title: 'Post', page: 'post'}, {title: 'Question', page: 'question'}, {title: 'Feed', page: 'feed'},{title: 'Write up', page: 'writeup'},{title: 'CBT', page: 'cbt'}, {title: 'Advert', page: 'advert'}],
            groupNotification: [{title: 'Chat Room', page: 'chatroom'},{title: 'Post', page: 'post'}, {title: 'Question', page: 'question'}, {title: 'Feed', page: 'feed'},{title: 'Write up', page: 'writeup'},{title: 'CBT', page: 'cbt'}],
            showPage: false
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                changeBackground: {commentBox: false, page: false},changeBackgroundImage: {commentBox: false, page: false},highlighted: {commentBox: false, page: false},highlightedBackground: {commentBox: false, page: false},highlightedText: {commentBox: false, page: false},
                page: [{title: 'Chat Box', page: 'commentBox', id: 'showCommentBox'}, {title:'Page', page: 'page' ,id: 'showPage'}],
                showCommentBox: false,showPageNotification: false,showGroupNotification: false, showShareNotification: false,
                pageNotification: [{title: 'Post', page: 'post'}, {title: 'Question', page: 'question'}, {title: 'Feed', page: 'feed'},{title: 'Write up', page: 'writeup'},{title: 'CBT', page: 'cbt'}],
                groupNotification: [{title: 'Chat Room', page: 'chatroom'},{title: 'Post', page: 'post'}, {title: 'Question', page: 'question'}, {title: 'Feed', page: 'feed'},{title: 'Write up', page: 'writeup'},{title: 'CBT', page: 'cbt'}],
                showPage: false
            })
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    accordionHandler = (page, nested) => {
        this.setState((prevState, props) => ({
            [page]: !nested ? !prevState[page] : {...prevState[page], [nested] : !prevState[page][nested]}
        }))
    }

    settingsChangedHandler = async (page, value, type, nestedType) => {
        let updateSettings = this.props.settings;
        if (nestedType) {
            updateSettings[page][type][nestedType] = value;
        } else if (type) {
            updateSettings[page][type] = value;
        } else {
            updateSettings[page] = value;
        }
        AsyncStorage.setItem('settings', JSON.stringify(updateSettings));
        this.props.onSaveSettings(updateSettings);
    }

    changeImageHandler = async (page) => {
        explorer({multiple: false}).then(file => {
            let updateSettings = this.props.settings;
            if (Platform.OS === 'web') {
                updateSettings[page]['backgroundImage'] = file[0].uri;
                AsyncStorage.setItem('settings', JSON.stringify(updateSettings));
                this.props.onSaveSettings(updateSettings);
            } else {
                const fileDir = FileSystem.documentDirectory + 's lodge24/commentBox/';
                const fileUri = fileDir + file[0].uri.split('/').pop();
                const filePath = file[0].uri;
                FileSystem.getInfoAsync(fileDir).then(dirInfo => {
                    if (!dirInfo.exists) {
                      (async () => await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true }))();
                    }
                    FileSystem.copyAsync({from: filePath, to: fileUri}).then(() => {
                        updateSettings[page]['backgroundImage'] = fileUri;
                        AsyncStorage.setItem('settings', JSON.stringify(updateSettings));
                        this.props.onSaveSettings(updateSettings);
                    });
                })
            }
            
        }).catch(e => {
            alert(e)
        })
    }
    

    render () {
        const settings = this.props.settings;

        let cnt =  (
            <View style={[styles.container, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : null]}>
                {this.state.viewMode === 'landscape' ? (
                    <DefaultHeader 
                        onPress={() => this.props.navigation.goBack()}
                        title="General Settings"
                    />) : null}
                <ScrollView 
                    style={styles.wrapper}
                    showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                    <CheckBox
                        title="Enable Auto Loading"
                        checked={settings.autoLoading}
                        onCheck={(val) => this.settingsChangedHandler('autoLoading', val)}
                        formWrapperStyle={{paddingHorizontal: 10, paddingBottom: 10}}/>
                    <Accodion 
                        title="Notification"
                        icon={{name: 'chevron-down-outline',size: 15}}
                        visible={this.state.showPageNotification}
                        onPress={() => this.accordionHandler('showPageNotification')}
                        style={styles.accodion}
                        titleStyle={styles.textStyle}>
                        <Text style={styles.info}>Enable Notification for</Text>
                        {this.state.pageNotification.map((cnt, index) => (
                            <CheckBox
                                key={index}
                                title={cnt.title}
                                checked={settings.notification.page[cnt.page]}
                                onCheck={(val) => this.settingsChangedHandler('notification', val, 'page', cnt.page)}
                                formWrapperStyle={styles.checkbox}/>
                        ))}
                    </Accodion>
                    <Accodion 
                        title="Group Notification"
                        icon={{name: 'chevron-down-outline',size: 15}}
                        visible={this.state.showGroupNotification}
                        onPress={() => this.accordionHandler('showGroupNotification')}
                        style={styles.accodion}
                        titleStyle={styles.textStyle}>
                        <Text style={styles.info}>Enable Notification for</Text>
                        {this.state.groupNotification.map((cnt, index) => (
                            <CheckBox
                                key={index}
                                title={cnt.title}
                                checked={settings.notification.group[cnt.page]}
                                onCheck={(val) => this.settingsChangedHandler('notification', val, 'group', cnt.page)}
                                formWrapperStyle={styles.checkbox}/>
                        ))}
                    </Accodion>
                    <Accodion 
                        title="Share Notification"
                        icon={{name: 'chevron-down-outline',size: 15}}
                        visible={this.state.showShareNotification}
                        onPress={() => this.accordionHandler('showShareNotification')}
                        style={styles.accodion}
                        titleStyle={styles.textStyle}>
                        <Text style={styles.info}>Enable Notification for</Text>
                        {this.state.pageNotification.map((cnt, index) => (
                            <CheckBox
                                key={index}
                                title={cnt.title}
                                checked={settings.notification.share[cnt.page]}
                                onCheck={(val) => this.settingsChangedHandler('notification', val, 'share', cnt.page)}
                                formWrapperStyle={styles.checkbox}/>
                        ))}
                    </Accodion>
                    {this.state.page.map(({page, id, title}, index) => (
                        <Accodion
                            key={index}
                            title={title}
                            icon={{name: 'chevron-down-outline',size: 15}}
                            visible={this.state[id]}
                            onPress={() => this.accordionHandler(id)}
                            style={styles.accodion}
                            titleStyle={styles.textStyle}>
                            <Accodion 
                                title="Background"
                                icon={{name: 'chevron-down-outline',size: 15}}
                                visible={this.state.changeBackground[page]}
                                onPress={() => this.accordionHandler('changeBackground', page)}
                                style={styles.accodion}
                                titleStyle={styles.textStyle}>
                                <CheckBox
                                    title="Enable Background Image"
                                    checked={settings[page].enableBackgroundImage}
                                    onCheck={(val) => this.settingsChangedHandler(page, val, 'enableBackgroundImage')}
                                    formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}/>
                                {settings[page].enableBackgroundImage ? 
                                    <Accodion
                                        title="Change Background Image"
                                        icon={{name: 'chevron-down-outline',size: 15}}
                                        titleStyle={styles.modalText}
                                        visible={this.state.changeBackgroundImage[page]}
                                        onPress={() => this.accordionHandler('changeBackgroundImage', page)}
                                        style={styles.accodion}
                                        titleStyle={styles.textStyle}>
                                        <View style={styles.upload}>
                                            { settings && (settings[page]['backgroundImage']) ? (
                                                <Image source={{uri: settings[page]['backgroundImage']}} 
                                                resizeMode="center"
                                                style={styles.uploadImage}/>
                                            ) : null}
                                            <View style={styles.wrapper}>
                                                <Button style={styles.uploadButtonWrapper} onPress={() => this.changeImageHandler(page)}>
                                                    <View style={styles.uploadButton}>
                                                        <Ionicons name="cloud-upload-outline" size={30} color="#fff"/>
                                                        <Text style={styles.uploadButtonText}>Upload Image</Text>
                                                    </View>
                                                </Button>
                                            </View>
                                        </View>
                                    </Accodion>: null}
                            </Accodion>
                            { settings[page].enableHighlighted ? 
                                <Accodion
                                    title="Highlighted"
                                    icon={{name: 'chevron-down-outline',size: 15}}
                                    visible={this.state.highlighted[page]}
                                    onPress={() => this.accordionHandler('highlighted', page)}
                                    titleStyle={styles.textStyle}
                                    style={styles.accodion}>
                                    <Accodion
                                        title="Background Color"
                                        icon={{name: 'chevron-down-outline',size: 15}}
                                        titleStyle={styles.modalText}
                                        visible={this.state.highlightedBackground[page]}
                                        onPress={() => this.accordionHandler('highlightedBackground', page)}
                                        style={styles.accodion}
                                        titleStyle={styles.textStyle}>
                                            { settings.highlightBackgroundColor.map((highlighted, index) => (
                                                <CheckBox
                                                    key={index}
                                                    title={highlighted.title}
                                                    checked={highlighted.color === settings[page].highlighted.backgroundColor}
                                                    onCheck={(val) => this.settingsChangedHandler(page, (val ? highlighted.color : '#437da3'), 'highlighted', 'backgroundColor')}
                                                    formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}
                                                    outterStyle={{borderColor: highlighted.color}}
                                                    innerStyle={highlighted.color === settings[page].highlighted.backgroundColor ? 
                                                        {backgroundColor: highlighted.color} : null}/>
                                            ))}
                                    </Accodion>
                                    <Accodion
                                        title="Text Color"
                                        icon={{name: 'chevron-down-outline',size: 15}}
                                        titleStyle={styles.modalText}
                                        visible={this.state.highlightedText[page]}
                                        onPress={() => this.accordionHandler('highlightedText', page)}
                                        style={styles.accodion}
                                        titleStyle={styles.textStyle}>
                                        { settings.highlightColor.map((highlighted, index) => (
                                                <CheckBox
                                                    key={index}
                                                    title={highlighted.title}
                                                    checked={highlighted.color === settings[page].highlighted.color}
                                                    onCheck={(val) => this.settingsChangedHandler(page, (val ? highlighted.color : '#fff'), 'highlighted', 'color')}
                                                    formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}
                                                    outterStyle={{borderColor: highlighted.color === '#fff' ? '#dcdbdc': highlighted.color}}
                                                    innerStyle={highlighted.color === settings[page].highlighted.color ? 
                                                        {backgroundColor: highlighted.color} : null}/>
                                            ))}
                                    </Accodion>
                                </Accodion> : null }
                        </Accodion>
                    ))}
                </ScrollView>
            </View>
        );

        return (
            <NoBackground
                sideBar={(
                    <>
                    <Navigation 
                            color={settings.color}
                            backgroundColor={settings.backgroundColor}/>
                    <CreateNavigation 
                        color={settings.color}
                        backgroundColor={settings.backgroundColor}/>
                    </>
                )}
                content={ cnt }
                contentFetched={true}>
            </NoBackground>
          )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%'
    },
    upload: {
        backgroundColor: '#e9ebf2',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    uploadButtonWrapper: {
        backgroundColor: '#437da3',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 5,
        width: '100%',
        borderRadius: 5,
        marginTop: 10
    },
    uploadButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadButtonText: {
        marginLeft: 10,
        fontSize: 15,
        color: '#fff'
    },
    uploadImage: {
        width: 100, 
        height: 100
    },
    accodion: {
        backgroundColor: 'transparent',
        paddingHorizontal: 10
    },
    checkbox: {
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    info: {
        fontSize: 14,
        color: '#777',
        paddingHorizontal: 10,
        marginTop: 10
    }
});


const mapStateToProps = state => {
    return {
        settings: state.settings
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onSaveSettings: (settings) => dispatch(actions.saveSettings(settings))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
  