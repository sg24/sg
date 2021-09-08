import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';
import Text from 'text';

import Button from '../Button/Button';

const loadMore= props => (
    <Button onPress={props.onPress} disabled={props.start} style={props.wrapperStyle ? props.wrapperStyle : styles.wrapper}>
        <View style={[styles.loadMoreWrapper, props.style]}>
            { !props.start ? (
                <View style={styles.loadMore}>
                    {props.icon ? <Ionicons name={props.icon.name} size={18} /> : null}
                    <Text style={styles.loadMoreText}>{ props.title }</Text>
                </View>
            ):  (
                <ActivityIndicator
                    size="small"
                    animating
                    color="#437da3"/>
            )}
        </View>
    </Button>
);

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 0
    },
    loadMoreWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#dcdbdc'
    },
    loadMore: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadMoreText: {
        marginLeft: 10
    }
});

export default loadMore;