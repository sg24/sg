import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Icon from 'ionicons';
import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import permission from 'permission';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import DefaultHeader from '../Header/DefaultHeader';

class AudioComponent extends Component {
    state = {
        start: false,
        error: false,
        pause: false,
        play: true,
        recording: null,
        duration: '00:00',
        animation: 'pulse',
        wrapperAnim: 'fadeIn',
        errorMsg: 'Audio could not be started, Please use the slodg24 android app version',
        audio: []
    }

    async componentDidMount() {
        try {
            await permission.camera();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS:  true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            });
            const recording = new Audio.Recording();
            if (Platform.OS !== 'web') {
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                this.setState({recording, start: true})
                await recording.setProgressUpdateInterval(200)
                await recording.setOnRecordingStatusUpdate(this.recordUpdateHandler)
            } else {
                this.setState({error: true, start: true})
            }
           
        } catch (e) {
            this.setState({errorMsg: e.message, error: true, start: true});
        }
    }

    componentWillUnmount() {
        if (this.state.recording) {
            this.state.recording.stopAndUnloadAsync().catch(e => {});
        }
    }

    recordUpdateHandler = (status) => {
        let mills = (status.durationMillis/1000);
        let minDur = mills/60
        let minRem = Math.floor(mills%60) < 10 ? `0${Math.floor(mills%60)}` : Math.floor(mills%60);
        let min =  minDur < 10 ? `0${Math.floor(minDur)}:${minRem}` : `${Math.floor(minDur)}:${minRem}`;
        let duration = mills < 60 ? Math.floor(mills) < 10 ? `00:0${Math.floor(mills)}` : `00:${Math.floor(mills)}`: min
        this.setState({duration})
    }

    audioHandler = async () => {
        if (this.state.play && !this.state.recording._isDoneRecording) {
            try {
                await this.state.recording.pauseAsync()
                this.setState({play: false, pause: true, animation: '', wrapperAnim: ''});
            } catch(e) {
                alert('Pausing an audio recording is unsupported on your android device ')
            }
        } else if (!this.state.play && !this.state.recording._isDoneRecording){
            await this.state.recording.startAsync();
            this.setState({play: true, pause: false, animation: 'pulse', wrapperAnim: 'fadeIn'})
        }
    }

    render() {
        return (
            <InnerScreen
                onRequestClose={this.props.closePicker}
                animationType="slide"
                onBackdropPress={this.props.closePicker}>
                <DefaultHeader
                    onPress={this.props.closePicker}
                    title={this.props.title}/>
                <View style={!this.state.start || this.state.error ? styles.audioLoading : styles.wrapper}>
                    { !this.state.start  ?
                        <ActivityIndicator size="large" animating color="#437da3"/> : 
                        this.state.error ? <Text style={styles.error}> { this.state.errorMsg } </Text> :
                        <>
                            <Animatable.View style={styles.mic} animation={this.state.wrapperAnim} duration={10000} iterationCount="infinite">
                                <Animatable.View style={styles.micWrapper} iterationCount="infinite" animation={this.state.animation} duration={500} >
                                    <Icon name="mic-outline" size={50} color="#fff" />
                                </Animatable.View>
                            </Animatable.View>
                            <View style={styles.durationWrapper}>
                                <Text style={styles.duration}>{this.state.duration}</Text>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <View style={styles.audioButton}>
                                    <Button
                                        onPress={this.audioHandler}>
                                        <BoxShadow style={styles.button}>
                                            <Icon name={this.state.pause ? 'play-outline' : 'pause-outline'} size={24} />
                                        </BoxShadow>
                                    </Button>
                                    <Button
                                        onPress={this.props.stopRecorder.bind(this, this.state.recording)}>
                                        <BoxShadow style={{...styles.button, ...styles.stopRecorder}}>
                                            <Icon name="stop-outline" size={24} color="#fff"/>
                                        </BoxShadow>
                                    </Button>
                                </View>
                            </View>
                        </>
                    }
                </View>
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
    audioLoading: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginVertical: 2,
    },
    buttonWrapper: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: 'transparent'
    },
    audioButton: {
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    mic: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    micWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ff1600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    durationWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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
    error: {
        fontSize: 18,
        color: '#ff1600',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})

let customComponent = Animatable.createAnimatableComponent(AudioComponent);
export default customComponent;