import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from 'text'

import Filter from './Filter/Filter';

const headerFilter = props => {
    let cntGrp  = {initial: []};
    for (let cnt of props.filterResults.reverse()) {
        for (let grp in cntGrp) {
            if (cnt.grp === grp) {
                let oldCnt = cntGrp[grp];
                oldCnt.push(cnt)
            } else {
                cntGrp[cnt.grp] = [cnt]
            }
        }
    }

    let allFilterRes = Object.entries(cntGrp).map(([grp, res]) => {
            if (grp !== 'initial') {
                return (
                    <View style={styles.wrapper} key={grp}>
                    <Text style={styles.category}>{grp === 'post' ? 'Feed' : grp === 'poet' ? 'Write Up' : 
                        grp === 'qchat' ? 'CBT' : grp === 'aroundme' ? 'Post' : grp}</Text>
                    { 
                        res.map((filterRes, index) => {
                            return (
                                <Filter
                                    key={index}
                                    filterRes={filterRes}
                                    viewCnt={props.viewCnt.bind(this, filterRes.url)}/>
                            )
                        })
                    }
                </View>
                )
            }
    })

    return allFilterRes
}


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

export default headerFilter;