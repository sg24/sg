import React from 'react';
import { View, StyleSheet} from 'react-native';

const webModal = props => {
    return (
        <View style={[styles.wrapper, props.style]}>
            { props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject
    }
})

export default webModal;