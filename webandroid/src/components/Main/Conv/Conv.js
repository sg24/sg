import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PrivateConv from './PrivateConv/PrivateConv';
import GroupConv from './GroupConv/GroupConv';

const conv = props => (
    Object.entries(props.conv).map(([title, res]) =>  (
        <View style={styles.wrapper} key={title}>
            <Text style={styles.category}>{title}</Text>
            {
                res.map((cnt, index) => {
                    if (title === 'friend') {
                        return (
                            <PrivateConv
                                key={index}
                                cnt={cnt}
                                chat={props.navigate.bind(this, 'chat', cnt.id)}
                                userProfile={props.navigate.bind(this, 'profile', cnt.id)}
                                lastItem={(resizeBy.length - 1) === index}
                                enableLoadMore={props.enableLoadMore}
                                start={props.start}
                                loadMore={props.loadMore}/>
                        )
                    }
                    return (
                        <GroupConv
                            key={index}
                            groupDet={cnt}
                            showGroup={props.navigate.bind(this, 'group', cnt._id)}/>
                    )
                })
            }
        </View>
    ))
)


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
        borderColor: '#dcdbdc',
        borderWidth: 1
    },
    category: {
        backgroundColor: '#dcdbdc',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        textTransform: 'capitalize',
        fontSize: 16
    }
});

export default conv;