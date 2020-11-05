import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BoxShadow from '../BoxShadow/BoxShadow';

const search = props => (
    <BoxShadow>
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon name="arrow-back-outline" size={26}/>
            </TouchableOpacity>
            <TextInput 
                placeholder="Search ..."
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                style={styles.input}
                onChangeText={props.filterCnt}/>
        </View>
    </BoxShadow>
)

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 50
    },
    input: {
        paddingHorizontal: 10,
        height: '100%',
        marginLeft: 10,
        backgroundColor: '#e9ebf2',
        flex: 1,
        borderRadius: 20
    }
});


export default search;