import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    isAvailableAsync,
    getPermissionsAsync,
    requestPermissionsAsync
  } from 'expo-ads-admob';

class AdMob extends Component {
    state = {
        fetched: false
    }

    async componentDidMount() {
        let isAvailable = await isAvailableAsync();
        if (isAvailable && Platform.OS === 'ios') {
            let { status } = await getPermissionsAsync();
            if (status !== 'granted') {
                await requestPermissionsAsync()
            }
        }
    }

    adReceivedHandler = () => {
        this.setState({fetched: true})
    }

    render() {
        let cnt = null;
        if (Platform.OS !== 'web') {
            cnt = (
                <View style={!this.state.fetched ? styles.container : [styles.container, {height: 'auto'}]}>
                    {!this.state.fetched ? (
                            <View style={{position: 'absolute', top: 120}}>
                                <ActivityIndicator 
                                    size="large"
                                    animating
                                    color="#437da3"/>
                            </View>
                        ):  null}
                    <AdMobBanner
                        bannerSize="mediumRectangle"
                        adUnitID="ca-app-pub-3611317424444370/7555759807"
                        servePersonalizedAds
                        onAdViewDidReceiveAd={this.adReceivedHandler} />
                        
                </View>
            );
        }
        return cnt;
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdbdc',
        padding: 10,
        marginVertical: 10,
        height: 300
    }
});

export default AdMob;