import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'ionicons';
import { Camera } from 'expo-camera';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import DefaultHeader from '../Header/DefaultHeader';

class CameraComponent extends Component {
    state = {
        start: false,
        error: false
    }

    cameraReadyHandler = () => {
        this.setState({start: true})
    }

    errorHandler = () => {
        this.setState({error: true})
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
                <Camera 
                    style={styles.wrapper}
                    ref={this.props.camera}
                    onCameraReady={this.cameraReadyHandler}
                    onMountError={this.errorHandler}>
                    <View style={!this.state.start || this.state.error ? styles.cameraLoading : styles.buttonWrapper}>
                        { !this.state.start  ?
                            <ActivityIndicator size="large" animating color="#437da3"/> : 
                            this.state.error ? <Text style={styles.error}> Camera preview could not been started</Text> :
                            <Button
                                onPress={this.props.onPress}>
                                <BoxShadow style={[styles.button, this.props.buttonStyle]}>
                                    <Icon name={this.props.icon.name} size={24} color={this.props.icon.color}/>
                                </BoxShadow>
                            </Button>
                        }
                    </View>
                </Camera>
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
        color: '#ff1600'
    }
})

export default CameraComponent;