import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'ionicons';
import { Camera } from 'expo-camera';
import permission from 'permission';
import Text from 'text';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import DefaultHeader from '../Header/DefaultHeader';

class CameraComponent extends Component {
    state = {
        start: false,
        error: false,
        errorMsg: 'Camera preview could not been started'
    }

    async componentDidMount() {
        try {
            await permission.camera();
        } catch(e) {
            this.setState({errorMsg: e.message, error: true, start: true})
        }
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
                onRequestClose={this.props.closePicker}
                animationType="slide"
                onBackdropPress={this.props.closePicker}>
                <DefaultHeader
                    onPress={this.props.closePicker}
                    title={this.props.title}/>
                <Camera 
                    style={styles.wrapper}
                    ref={this.props.camera}
                    onCameraReady={this.cameraReadyHandler}
                    onMountError={this.errorHandler}>
                    <View style={!this.state.start || this.state.error ? styles.cameraLoading : styles.buttonWrapper}>
                        { !this.state.start  ?
                            <ActivityIndicator size="large" animating color="#437da3"/> : 
                        this.state.error ? <Text style={styles.error}> { this.state.errorMsg } </Text> :
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
        color: '#ff1600',
        textAlign: 'center'
    }
})

export default CameraComponent;