import React, { Component } from 'react';
import { View, Platform, Dimensions , StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import WebModal from 'modal-enhanced-react-native-web'
import { size } from 'tailwind';

class InnerScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait'
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }
    
    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    render() {
        const ModalComponent = this.state.viewMode === 'landscape' ? View : 
        Platform.OS === 'web' ? WebModal : Modal;
        return (
            <ModalComponent
                style={this.state.viewMode === 'landscape' ? [styles.modalContainer, this.props.outterStyle, 
                 this.props.viewStyle] : [styles.modalDefault, this.props.outterStyle]}
                isVisible
                {...this.props}>
                { this.props.children }
            </ModalComponent>
        ) 
    }   
}

const styles = StyleSheet.create({
    modalDefault: {
        margin: 0,
        backgroundColor: '#fff'
    },
    modalContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 999999,
        flex: 1
    }
})

export default InnerScreen;