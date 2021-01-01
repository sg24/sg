import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Icon from 'ionicons';
import { Camera } from 'expo-camera';
import permission from 'permission';

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
        duration: '00:00',
        errorMsg: '',
        type: Camera.Constants.Type.back
    }

    async componentDidMount() {
        if (Platform.OS === 'web') {
            alert('Video recording in not supported on web browser, Please use the slodge24 APK');
            this.setState({error: true, start: true,
                errorMsg: 'Video recording in not supported on web browser, Please use the slodge24 APK'})
        } else {
            try {
                await permission.camera();
            } catch(e) {
                this.setState({errorMsg: e.message, error: true, start: true})
            }
        }
    }

    componentWillUnmount() {
        if (this.camera) {
            this.camera.stopRecording()
        }
    }

    cameraReadyHandler = async () => {
        if (Platform.OS !== 'web') {
            try {
                this.setState({start: true})
                let duration = 0;
                setInterval(() => {
                    duration+=50
                    this.recordUpdateHandler(duration)
                }, 50)
                this.camera.recordAsync().then(uri => {
                    console.log(uri)
                });
            } catch(e) {
                this.setState({errorMsg: e.message, error: true, start: true})
            }
        }
    }

    recordUpdateHandler = (durationMillis) => {
        let mills = (durationMillis/1000);
        let minDur = mills/60
        let minRem = Math.floor(mills%60) < 10 ? `0${Math.floor(mills%60)}` : Math.floor(mills%60);
        let min =  minDur < 10 ? `0${Math.floor(minDur)}:${minRem}` : `${Math.floor(minDur)}:${minRem}`;
        let duration = mills < 60 ? Math.floor(mills) < 10 ? `00:0${Math.floor(mills)}` : `00:${Math.floor(mills)}`: min
        this.setState({duration})
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

    cameraTypeHandler = async () => {
        if (this.state.type === Camera.Constants.Type.back) {
            this.setState({type: Camera.Constants.Type.front})
        } else {
            this.setState({type: Camera.Constants.Type.back})
        }
    }

    errorHandler = () => {
        this.setState({error: true})
    }

    render() {
        let buttonCnt = (
            <View style={this.state.error ? styles.errorWrapper : styles.camera}>
                { !this.state.start ?
                    <ActivityIndicator size="large" animating color="#437da3"/> : 
                    this.state.error ? <View style={styles.errorWrapper}><Text style={styles.error}> {this.state.errorMsg}</Text></View> :
                    <>
                        <View style={styles.durationWrapper}>
                            <Text style={styles.duration}>{this.state.duration}</Text>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <View style={styles.videoButton}>
                                <Button
                                    onPress={this.videoRecorderHandler}>
                                    <BoxShadow style={styles.button}>
                                        <Icon name={this.state.pause ? 'play-outline' : 'pause-outline'} size={24} />
                                    </BoxShadow>
                                </Button>
                                <Button
                                    onPress={this.cameraTypeHandler}>
                                    <BoxShadow style={styles.button}>
                                        <Icon name={'pause-outline'} size={24} />
                                    </BoxShadow>
                                </Button>
                                <Button>
                                    <BoxShadow style={{...styles.button, ...styles.stopRecorder}}>
                                        <Icon name="stop-outline" size={24} color="#fff"/>
                                    </BoxShadow>
                                </Button>
                            </View>
                        </View>
                    </>
                }
            </View>
        )
        return (
            <InnerScreen
                onRequestClose={this.props.closePicker}
                animationType="slide"
                onBackdropPress={this.props.closePicker}>
                <DefaultHeader
                    onPress={this.props.closePicker}
                    title={this.props.title}/>
                {!this.state.error ? 
                <Camera 
                    style={styles.wrapper}
                    type={this.state.type}
                    ref={(ref) => this.camera = ref}
                    onCameraReady={this.cameraReadyHandler}
                    onMountError={this.errorHandler}/> : null }
                { buttonCnt }
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
    camera: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    buttonWrapper: {
        alignItems: 'center',
        flexDirection: 'column-reverse',
        width: '100%'
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    durationWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    duration: {
        padding: 10,
        backgroundColor: '#dcdbdc',
        borderRadius: 5,
        fontSize: 18
    },
    stopRecorder: {
        backgroundColor: '#ff1600'
    },
    errorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        fontSize: 18,
        color: '#ff1600',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})

export default CameraComponent;