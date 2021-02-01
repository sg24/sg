import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'ionicons';

import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';

class Select extends Component {
    state = {
        open: false,
        options: []
    };

    openSelectHandler = () => {
        this.setState((prevState, props) => ({
            open: !prevState.open
        }))
    }

    render() {
        return (
            <View style={[styles.wrapper, this.props.formWrapperStyle]}>
                <Button onPress={this.openSelectHandler} style={styles.selectTitleWrapper}>
                    <Text style={styles.selectTitle} numberOfLines={1}>
                        {this.props.value || this.props.title }
                    </Text>
                    <Icon name={this.props.icon.name} size={this.props.icon.size} style={this.state.open ? styles.open : null}/>
                </Button>
                { this.state.open ? 
                    <View style={styles.selectOptionWrapper}>
                        {this.props.option.map((option, index) => (
                                <Button  
                                    key={index} 
                                    onPress={() => {
                                        this.props.onSelect(option.title);
                                        this.openSelectHandler();
                                    }} 
                                    style={styles.selectOption}>
                                    <Icon name={option.icon.name} size={option.icon.size ? option.icon.size : 14} />
                                    <Text style={styles.selectOptionTitle} numberOfLines={1}>
                                        { option.title }
                                    </Text>
                                </Button>
                        ))}
                    </View> : null}
                { this.props.valid ?
                    <Text style={styles.error}>{this.props.error}</Text> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#333'
    },
    wrapper: {
        position: 'relative',
        flexShrink: 1,
        width: '100%',
        paddingBottom: 0,
        marginTop: 10,
    },
    selectTitleWrapper:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdbdc',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Platform.OS !== 'web' ? 4 : 7,
        paddingHorizontal: 10,
    }, 
    selectTitle: {
        marginRight: 5,
        flexShrink: 1
    },
    selectOptionWrapper: {
        backgroundColor: '#fff',
        borderRadius: 3,
        position: 'absolute',
        bottom: '-50%',
        left: 0,
        borderWidth: 1,
        borderColor: '#dcdbdc',
        padding: 10
    },
    selectOptionTitle: {
        marginLeft: 10
    },
    selectOption: {
        paddingVertical: 8,
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: 'row'
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#ff1600'
    },
    open: {
        transform: [{rotateX: '180deg'}]
    }
})

export default Select;