import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'ionicons';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class CheckBox extends Component {
    checkBoxHandler = () => {
        this.props.onCheck(!this.props.checked);
    }

    render() {
        return (
            <View style={[styles.wrapper, this.props.formWrapperStyle]}>
                <TouchableNativeFeedback onPress={this.checkBoxHandler} >
                    <View style={styles.container}>
                        <View style={[styles.checkWrapper, this.props.circle ? styles.circle : null, this.props.outterStyle]}>
                            <View style={[styles.check, this.props.circle ? styles.checkCircle : null, 
                                this.props.checked ? styles.checked: null, this.props.innerStyle]}></View>
                        </View>
                        <Text style={[styles.title, this.props.textStyle]}>
                            { this.props.title }
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        paddingBottom: 20,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkWrapper: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dcdbdc',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    check: {
        width: 10,
        height: 10,
        backgroundColor: '#dcdbdc'
    },
    circle: {
        borderRadius: 10
    },
    checkCircle : {
        borderRadius: 5
    },
    checked: {
        backgroundColor: '#437da3'
    },
    title: {
        fontSize: 16
    }
})

export default CheckBox;