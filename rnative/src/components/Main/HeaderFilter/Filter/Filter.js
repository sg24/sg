import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'react-moment';

import { calendarStrings } from '../../../../shared/utility';

const headerFilter = props => {
    return (
        <TouchableOpacity onPress={props.viewCnt}>
            <View style={styles.filterDet}>
                <Icon name="search" size={16} style={styles.icon}/>
                <Text style={styles.content} numberOfLines={1}>{props.filterRes.title}</Text>
                <Text style={styles.contentCreated} numberOfLines={1}>
                {props.filterRes.created  ? <Moment element={Text} calendar={calendarStrings}>
                    { props.filterRes.created }
                </Moment>: null }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
        marginLeft: 10
    },
    filterDet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdbdc',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    contentCreated: {
        color: '#777',
        marginLeft: 10
    }
});

export default headerFilter;