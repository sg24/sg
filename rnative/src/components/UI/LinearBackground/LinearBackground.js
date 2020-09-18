import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from '../SafeArea/SafeArea';

const formWrapper = props => {
    return (
        <SafeAreaView>
            
                <StatusBar barStyle="light-content" backgroundColor="#437da3" />
    
                <LinearGradient 
                    colors={['#05578b','#0284a8','#05578b',]} end={{x: 1, y: .8}}  style={styles.wrapper} locations={[0.1,0.5,0.8]}>
                    {/* <ScrollView> */}
                        { props.children }
                    {/* </ScrollView> */}
                </LinearGradient>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default formWrapper;