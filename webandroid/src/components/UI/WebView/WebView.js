import React, { Component } from 'react';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../Header/Search';
import Ionicons from 'ionicons';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback'

class webBrowser extends Component {
    state = {
        loadingProgress: 0,
        uri: this.props.uri
    }

    componentDidMount() {
        this._unsubscribe = BackHandler.addEventListener("hardwareBackPress", this.props.onPress);
    }

    componentWillUnmount() {
        this._unsubscribe.remove();
    }

    webviewReloadHandler = () => {
        this.webviewMethod.reload()
    }

    loadProgressHandler = (progress) => {
        this.setState({loadingProgress: progress*100})
    }

    finishedLoadingHandler  = () => {
        this.setState({loadingProgress: 0})
    }

    navigationHandler = (navState) => {
        if (navState.url !== this.props.uri) {
            this.setState({uri: navState.url})
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Header 
                    value={this.state.uri}
                    editable={false}
                    onPress={this.props.onPress}/>
                <View style={[styles.progress, {width: `${this.state.loadingProgress}%`}]}></View>
                <WebView
                    source={{uri: this.props.uri}}
                    onLoadProgress={({ nativeEvent }) => {
                        this.loadProgressHandler(nativeEvent.progress)
                    }}
                    onLoadEnd={() => {
                        this.finishedLoadingHandler()
                    }}
                    onNavigationStateChange={(navState) => {
                        this.navigationHandler(navState)
                    }}
                    renderError={() => {
                        if (this.state.loadingProgress !== 0) {
                            this.setState({loadingProgress: 0})
                        }
                        return (
                            <TouchableNativeFeedback onPress={this.webviewReloadHandler}>
                                <View style={styles.reload}>
                                    <Ionicons name="reload-outline" size={18} color="#777"/> 
                                    <Text style={styles.reloadText}>Reload</Text>
                                </View>
                            </TouchableNativeFeedback>
                         )
                    }}
                    thirdPartyCookiesEnabled
                    allowFileAccessFromFileURLs
                    startInLoadingState
                    mixedContentMode="always"
                    ref={(ref) => this.webviewMethod = ref}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    progress: {
        height: 2,
        backgroundColor: '#437da3'
    },
    reload: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reloadText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#777'
    }
});

export default webBrowser;