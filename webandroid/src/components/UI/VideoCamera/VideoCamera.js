import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Icon from 'ionicons';
import { Camera } from 'expo-camera';
import {  stopRecorder } from 'picker';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import DefaultHeader from '../Header/DefaultHeader';

class CameraComponent extends Component {
    state = {
        start: false,
        error: false,
        pause: false,
        play: true,
    }

    componentDidMount() {
        if (Platform.OS === 'web') {
            alert('Video recording in not supported on web browser, Please use the slodge24 APK');
            this.setState({error: true, start: true})
        } 
    }

    cameraReadyHandler = async () => {
        if (Platform.OS !== 'web') {
            await this.camera.recordAsync();
            this.setState({start: true})
        }
    }

    stopRecorderHandler = async () => {
        stopRecorder(this.camera).then(video => {
            this.setState({uploadFile: image, showVideoCamera: false})
        }).catch(e => { this.setState({showVideoCamera: false})})
    }

    videoRecorderHandler = () => {
        if (this.state.play) {
            this.setState({play: false, pause: true})
            this.camera.pausePreview();
        } else {
            this.setState({play: true, pause: false})
            this.camera.resumePreview();
        }
    }

    errorHandler = () => {
        this.setState({error: true})
    }

    render() {
        let buttonCnt = (
            <View style={!this.state.start || this.state.error ? styles.cameraLoading : styles.buttonWrapper}>
                { !this.state.start  ?
                    <ActivityIndicator size="large" animating color="#437da3"/> : 
                    this.state.error ? <Text style={styles.error}> Video recording in not supported on web browser, Please use the slodge24 APK</Text> :
                    !this.props.recordButton? 
                        <Button
                        onPress={this.props.onPress}>
                        <BoxShadow style={[styles.button, this.props.buttonStyle]}>
                            <Icon name={this.props.icon.name} size={24} color={this.props.icon.color}/>
                        </BoxShadow>
                    </Button> : 
                    <View style={styles.videoButton}>
                        <Button
                            onPress={this.videoRecorderHandler}>
                            <BoxShadow style={[styles.button, {backgroundColor: '#fff'}]}>
                                <Icon name={this.state.pause ? 'play-outline' : 'pause-outline'} size={24} color="#fff"/>
                            </BoxShadow>
                        </Button>
                        <Button
                            onPress={this.stopRecorderHandler}>
                            <BoxShadow style={[styles.button, {backgroundColor: '#ff1600'}]}>
                                <Icon name={'stop-outline'} size={24} color="#fff"/>
                            </BoxShadow>
                        </Button>
                    </View>
                }
            </View>
        )
        return (
            <InnerScreen
                onRequestClose={this.props.closeCamera}
                animationType="slide"
                onBackdropPress={this.props.closeCamera}>
                <DefaultHeader
                    onPress={this.props.closeCamera}
                    title={this.props.title}/>
                {!this.state.error ?
                    <Camera 
                        style={styles.wrapper}
                        ref={(ref) => this.camera = ref}
                        onCameraReady={this.cameraReadyHandler}
                        onMountError={this.errorHandler}>
                    { buttonCnt }
                    </Camera>
                 : buttonCnt}
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        marginVertical: 2,
    },
    cameraLoading: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonWrapper: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: 'transparent'
    },
    videoButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    error: {
        fontSize: 18,
        color: '#ff1600',
        paddingHorizontal: 10
    }
})

export default CameraComponent;