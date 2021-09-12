import React, { Component} from 'react';
import { View, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { explorer } from 'picker';
import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';
import Text from 'text';

import InnerScreen from '../InnerScreen/InnerScreen';
import DefaultHeader from '../Header/DefaultHeader';
import Accodion from '../Accodion/Accodion';
import * as actions from '../../../store/actions/index';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import NotificationModal from '../NotificationModal/NotificationModal';
import AbsoluteFill from '../AbsoluteFill/AbsoluteFill';

class ChatBoxSettings extends Component {
    state = {
        changeBackground: true,
        changeBackgroundImage: false,
        highlighted: false,
        highlightedBackground: true,
        highlightedText: false,
        allowMembers: false
    };

    componentDidMount() {
        this.props.onUpdateReset();
    }

    accordionHandler = (page) => {
        this.setState((prevState, props) => ({
            [page]: !prevState[page]
        }))
    }

    settingsChangedHandler = async (value, type, nestedType, sendSettings) => {
        if (sendSettings) {
            for (let cnt in sendSettings) {
                if (cnt === type) {
                    sendSettings[cnt] = value;
                }
            }
            this.props.onUpdateSettings('grouppreview', this.props.pageID, 'updateGroupInfo', sendSettings);
            return;
        }
        let updateSettings = this.props.settings;
        if (nestedType) {
            updateSettings[this.props.page][type][nestedType] = value;
        } else {
            updateSettings[this.props.page][type] = value;
        }
        AsyncStorage.setItem('settings', JSON.stringify(updateSettings));
        this.props.onSaveSettings(updateSettings);
    }

    changeImageHandler = async () => {
        explorer({multiple: false}).then(file => {
            let updateSettings = this.props.settings;
            if (Platform.OS === 'web') {
                updateSettings[this.props.page]['backgroundImage'] = file[0].uri;
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
                        updateSettings[this.props.page]['backgroundImage'] = fileUri;
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
        let uploadOpt = (
            <View style={styles.upload}>
                { settings && (settings[this.props.page]['backgroundImage']) ? (
                    <Image source={{uri: settings[this.props.page]['backgroundImage']}} 
                    resizeMode="center"
                    style={styles.uploadImage}/>
                ) : null}
                <View style={styles.wrapper}>
                    <Button style={styles.uploadButtonWrapper} onPress={this.changeImageHandler}>
                        <View style={styles.uploadButton}>
                            <Ionicons name="cloud-upload-outline" size={30} color="#fff"/>
                            <Text style={styles.uploadButtonText}>Upload Image </Text>
                        </View>
                    </Button>
                </View>
            </View>
        );

        return (
            <InnerScreen
                onRequestClose={this.props.closeSettings}
                animationType="slide"
                onBackdropPress={this.props.closeSetting}>
                <DefaultHeader
                    onPress={this.props.closeSettings}
                    title="Settings"/>
                <ScrollView style={styles.wrapper}>
                    <Accodion 
                        title="Background"
                        icon={{name: 'chevron-down-outline',size: 15}}
                        visible={this.state.changeBackground}
                        onPress={() => this.accordionHandler('changeBackground')}
                        style={styles.accodion}
                        titleStyle={styles.textStyle}>
                        <CheckBox
                            title="Enable Background Image"
                            checked={settings[this.props.page].enableBackgroundImage}
                            onCheck={(val) => this.settingsChangedHandler(val, 'enableBackgroundImage')}
                            formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}/>
                        {settings[this.props.page].enableBackgroundImage ? 
                            <Accodion
                                title="Change Background Image"
                                icon={{name: 'chevron-down-outline',size: 15}}
                                titleStyle={styles.modalText}
                                visible={this.state.changeBackgroundImage}
                                onPress={() => this.accordionHandler('changeBackgroundImage')}
                                style={styles.accodion}
                                titleStyle={styles.textStyle}>
                                { uploadOpt }
                            </Accodion>: null}
                    </Accodion>
                    { settings[this.props.page].enableHighlighted ? 
                        <Accodion
                            title="Highlighted"
                            icon={{name: 'chevron-down-outline',size: 15}}
                            visible={this.state.highlighted}
                            onPress={() => this.accordionHandler('highlighted')}
                            style={styles.accodion}
                            titleStyle={styles.textStyle}>
                            <Accodion
                                title="Background Color"
                                icon={{name: 'chevron-down-outline',size: 15}}
                                titleStyle={styles.modalText}
                                visible={this.state.highlightedBackground}
                                onPress={() => this.accordionHandler('highlightedBackground')}
                                style={styles.accodion}
                                titleStyle={styles.textStyle}>
                                    { settings.highlightBackgroundColor.map((highlighted, index) => (
                                        <CheckBox
                                            key={index}
                                            title={highlighted.title}
                                            checked={highlighted.color === settings[this.props.page].highlighted.backgroundColor}
                                            onCheck={(val) => this.settingsChangedHandler((val ? highlighted.color : '#437da3'), 'highlighted', 'backgroundColor')}
                                            formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}
                                            outterStyle={{borderColor: highlighted.color}}
                                            innerStyle={highlighted.color === settings[this.props.page].highlighted.backgroundColor ? 
                                                {backgroundColor: highlighted.color} : null}/>
                                    ))}
                            </Accodion>
                            <Accodion
                                title="Text Color"
                                icon={{name: 'chevron-down-outline',size: 15}}
                                titleStyle={styles.modalText}
                                visible={this.state.highlightedText}
                                onPress={() => this.accordionHandler('highlightedText')}
                                style={styles.accodion}
                                titleStyle={styles.textStyle}>
                                { settings.highlightColor.map((highlighted, index) => (
                                        <CheckBox
                                            key={index}
                                            title={highlighted.title}
                                            checked={highlighted.color === settings[this.props.page].highlighted.color}
                                            onCheck={(val) => this.settingsChangedHandler((val ? highlighted.color : '#fff'), 'highlighted', 'color')}
                                            formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}
                                            outterStyle={{borderColor: highlighted.color === '#fff' ? '#dcdbdc': highlighted.color}}
                                            innerStyle={highlighted.color === settings[this.props.page].highlighted.color ? 
                                                {backgroundColor: highlighted.color} : null}/>
                                    ))}
                            </Accodion>
                        </Accodion> : null }
                        { this.props.groupSettings ? (
                            <Accodion 
                                title="Permission"
                                icon={{name: 'chevron-down-outline',size: 15}}
                                visible={this.state.allowMembers}
                                onPress={() => this.accordionHandler('allowMembers')}
                                style={styles.accodion}
                                titleStyle={styles.textStyle}>
                                <Text style={styles.info}>Allow members to create</Text>
                                {Object.entries(this.props.groupSettings).map((cnt, index) => (
                                    <CheckBox
                                        key={index}
                                        title={this.props.groupPages.filter(groupPage => groupPage.title === cnt[0])[0]?.page}
                                        checked={cnt[1]}
                                        onCheck={(val) => this.settingsChangedHandler(val, cnt[0], null, this.props.groupSettings)}
                                        formWrapperStyle={{paddingBottom: 10, paddingHorizontal: 10}}/>
                                ))}
                            </Accodion>
                        ) : null}
                </ScrollView>
                { this.props.groupSettings && this.props.start ? 
                    <AbsoluteFill style={{zIndex: 9999999}}/> : null}
                { this.props.updateErr && this.props.groupSettings ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onUpdateReset}
                        button={[{title: 'Ok', onPress: this.props.onUpdateReset, style: styles.button}]}/> : null}
            </InnerScreen>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },
    textStyle: {
        fontSize: 15
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
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
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
        settings: state.settings,
        start: state.settings.config.updateStart,
        updateErr: state.settings.config.updateError
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onSaveSettings: (settings) => dispatch(actions.saveSettings(settings)),
        onUpdateSettings: (page, pageID, cntID, cnt) => dispatch(actions.updateSettingsInit(page, pageID, cntID, cnt)),
        onUpdateReset: () => dispatch(actions.updateSettingsReset())
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxSettings);
  