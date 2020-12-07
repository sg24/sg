import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'ionicons';
import { Audio } from 'expo-av';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import DefaultHeader from '../Header/DefaultHeader';

class AudioComponent extends Component {
    state = {
        start: false,
        error: false,
        pause: false,
        play: false,
        recording: null,
        duration: '00:00'
    }

    async componentDidMount() {
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            await recording.setOnRecordingStatusUpdate(this.recordUpdateHandler)
            this.setState({recording})
        } catch (error) {
            alert(error)
        }
    }

    recordUpdateHandler = (status) => {
        console.log(status)
    }

    audioHandler = () => {
        if (this.state.play) {
            console.log(this.state.recording)
            this.state.recording.pauseAsync()
            this.setState({play: false, pause: true});
        } else {
            this.setState({play: true, pause: false})
        }
    }

    closeRecorderHandler = () => {
        this.state.recording.stopAndUnloadAsync();
        console.log(this.state.recording.getURI())
    }

    render() {
        return (
            <InnerScreen
                onRequestClose={this.props.closeCamera}
                animationType="slide"
                onBackdropPress={this.props.closeCamera}>
                <DefaultHeader
                    onPress={this.props.closeCamera}
                    title={this.props.title}/>
                <View style={!this.state.start || this.state.error ? styles.audioLoading : styles.wrapper}>
                    { !this.state.start  ?
                        <ActivityIndicator size="large" animating color="#437da3"/> : 
                        this.state.error ? <Text style={styles.error}> Audio could not been started</Text> :
                        <>
                            <View style={styles.mic}>
                                <Icon name="mic-outline" size={40} color="#fff" />
                            </View>
                            <Text style={styles.duration}>{this.state.duration}</Text>
                            <View style={styles.buttonWrapper}>
                                <View style={styles.audioButton}>
                                    <Button
                                        onPress={this.audioHandler}>
                                        <BoxShadow style={[styles.button, {backgroundColor: '#fff'}]}>
                                            <Icon name={this.state.pause ? 'play-outline' : 'pause-outline'} size={24} color="#fff"/>
                                        </BoxShadow>
                                    </Button>
                                    <Button
                                        onPress={this.closeRecorderHandler}>
                                        <BoxShadow style={[styles.button, {backgroundColor: '#ff1600'}]}>
                                            <Icon name={'stop-outline'} size={24} color="#fff"/>
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
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    mic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ff1600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    duration: {
        padding: 5,
        backgroundColor: '#dcdbdc',
        borderRadius: 5
    },
    error: {
        fontSize: 18,
        color: '#ff1600'
    }
})

export default AudioComponent;