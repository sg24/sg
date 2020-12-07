import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'ionicons';
import * as Animatable from 'react-native-animatable';

import InnerScreen from '../InnerScreen/InnerScreen';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import AbsoluteFill from '../AbsoluteFill/AbsoluteFill';


class ActionSheet extends Component {
    render() {
        return (
            <InnerScreen
                transparent 
                onRequestClose={() => this.props.bottonIndex(-1)}
                animationType="slide"
                onBackdropPress={() => this.props.bottonIndex(-1)}
                outterStyle={styles.webModal}
                overlay>
                <View style={styles.modal}>
                    <AbsoluteFill onPress={() => this.props.bottonIndex(-1)}/>
                   <Animatable.View style={styles.wrapper}  animation="slideInDown" duration={500}>
                        <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
                        <View>
                            {this.props.options.map((botton, index) => (
                                <View style={this.props.showSeparator ? styles.separator : null} key={index} >
                                    <TouchableNativeFeedback  key={index} onPress={() => this.props.bottonIndex(index)}>
                                        <View style={[styles.botton]}>
                                            { this.props.icons && this.props.icons.length >= index + 1 ? <Icon name={this.props.icons[index]} size={24} /> : null}
                                            <Text style={[styles.bottonText]}>
                                                { botton }
                                            </Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            ))}
                        </View>
                   </Animatable.View>
                </View>
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 2
    },
    webModal: {
        backgroundColor: 'transparent'
    },
    wrapper: {
        backgroundColor: '#fff',
        position: 'relative',
        width: '100%',
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        padding: 5,
        color: '#777',
        marginBottom: 5
    },
    botton: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottonText: {
        marginLeft: 10,
        fontSize: 16
    },
    separator: {
        borderTopColor: '#dcdbdc',
        borderTopWidth: 1,
    }
})
let customComponent = Animatable.createAnimatableComponent(ActionSheet);
export default customComponent;