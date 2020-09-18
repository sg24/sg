import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import SafeAreaView from '../../components/UI/SafeArea/SafeArea';
import launch_screen from '../../assets/launch_screen.png';

class SplashScreen extends Component {
    render() {

      return (
          <SafeAreaView>
            <View style={styles.wrapper}>
                <Image source={launch_screen} style={styles.splashImage}/>
            </View>
          </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    splashImage: {
        width: 75,
        height: 75,
        resizeMode: 'cover',
        alignSelf: 'center'
    }
})

export default SplashScreen;