import React from 'react';
import { View, StyleSheet} from 'react-native';
import Ionicons from 'ionicons';
import Text from 'text';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import InfoBox from '../InfoBox/InfoBox';

const errorInfo = props => (
    <View style={styles.wrapper}>
        { props.header ? props.header : null }
        <View style={[styles.loaderCnt, props.viewMode === 'landscape' ? {backgroundColor: '#fff'} : 
            null]}>
            <InfoBox
                det='Network Error'
                name="cloud-offline-outline"
                size={40}
                color="#ff1600"
                style={styles.info}/>
            <TouchableNativeFeedback onPress={props.reload}>
                <View style={styles.reload}>
                    <Ionicons name="reload-outline" size={18} color="#777"/>
                    <Text style={styles.reloadText}>Reload</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    </View>
);

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        flex: 1,
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        fontSize: 18,
        marginBottom: 5
    },
    reload: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reloadText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#777'
    },
})

export default errorInfo;