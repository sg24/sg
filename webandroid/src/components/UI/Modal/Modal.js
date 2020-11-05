import React from 'react';
import { Modal, TouchableOpacity, StyleSheet } from 'react-native';
const modal = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Modal {...props}>
                { props.children }
            </Modal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFill
    }
});

export default modal;