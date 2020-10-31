import React, { Component, useState } from 'react';
import { View, Text , StyleSheet, Modal} from 'react-native';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.show = this.show()
    }
    state = {
        visible: false
    }
    
    show = () => {
        alert()
        this.setState({show: !this.state.visible})
    }
    render() {
        return (
            <Modal visible={this.state.visible}>
                {props.bottons.map((botton, index) => (
                    <TouchableNativeFeedback key={index} onPress={props.botton.onPress}>
                        <View>
                            <Icon name={this.props.botton.name} size={20}/>
                            <Text> {this.props.botton.title}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </Modal>
        ) 
    }   
}

const styles = StyleSheet.create({

})

export default Dialog;