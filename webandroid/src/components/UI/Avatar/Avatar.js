import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const avatar = props => {
    let Wrapper = props.pressable ? View : TouchableNativeFeedback;
    let wrapperProps = props.pressable ? {} : { onPress: props.onPress }
    let userImg = (
        <View style={[styles.wrapper, props.style, props.imageSize ? {width: props.imageSize, height: props.imageSize, borderRadius: props.imageSize/2} : null]}>
            <Ionicons name="person" size={props.iconSize ? props.iconSize : 20} color="#777"/>
        </View>
    )

    if (props.userImage) {
        userImg = <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.userImage}`}} 
        style={[styles.wrapper, 
            props.style, props.imageSize ? {width: props.imageSize, height: props.imageSize, borderRadius: props.imageSize/2} : null,
            props.enableBorder === false ? null : styles.borderWrapper]}/>;
    }

   
    return (
        <Wrapper {...wrapperProps}>
            { userImg}
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#e9ebf2',
        resizeMode: 'cover',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderWrapper: {
        borderColor: '#437da3',
        borderWidth: 2,
    }
})

export default avatar;