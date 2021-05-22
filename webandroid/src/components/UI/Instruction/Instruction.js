import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'ionicons';
import Uridetect from 'uridetect';

import InnerScreen from '../InnerScreen/InnerScreen';
import DefaultHeader from '../Header/DefaultHeader';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import NotificationModal from '../NotificationModal/NotificationModal';

class Instruction extends  Component {
    state = {
        pending: false
    }

    componentDidUpdate() {
        let pageReaction = this.props.enablePageReaction && this.props.pageReaction.length > 0 ? 
        this.props.pageReaction.filter(id => id === this.props.pageID).length > 0 ? true : false : false;
        if (!this.state.pending && pageReaction) {
            this.setState({pending: true})
        }
        if (this.state.pending && !pageReaction) {
            this.closeInstructionHandler();
        }
        if (this.state.pending && this.props.pageReactionErr) {
            this.setState({pending: false});
        }
    }

    closeInstructionHandler = () => {
        this.props.closeInstruction();
    }

    render() {
        return (
            <InnerScreen
                onRequestClose={this.props.closeInstruction}
                animationType="slide"
                onBackdropPress={this.props.closeInstruction}>
                <View style={styles.wrapper}>
                    { this.props.header ? this.props.header : (
                        <DefaultHeader
                            onPress={this.props.closeInstruction}
                            title={this.props.title} />
                    )}
                    <ScrollView style={styles.scroll}>
                        <Uridetect
                            onPress={this.props.openURI} 
                            style={[styles.content, this.props.textStyle]} 
                            content={this.props.content}/>
                        { this.props.children }
                        {this.props.button ? <View style={styles.buttonWrapper}>
                            {this.props.button.map((cnt, index) => (
                                <Button key={index} onPress={cnt.onPress} style={{paddingVertical: 0}} disabled={this.state.pending}>
                                    <BoxShadow style={styles.button}>
                                        {cnt.icon ? <Ionicons name={cnt.icon.name} color={cnt.icon.color ? cnt.icon.color : '#fff'} size={cnt.icon.size ? cnt.icon.size : 18} style={{marginRight: 5}}/> : null }
                                        <Text style={[styles.buttonText, cnt.style]}>{cnt.title}</Text>
                                    </BoxShadow>
                                </Button>
                            ))}
                        </View>: null}
                    </ScrollView>
                    { this.props.pageReactionErr ? 
                        <NotificationModal
                            info="Network Error !"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.pageReactionReset}
                            button={[{title: 'Ok', onPress: this.props.pageReactionReset, style: styles.pageReactionbutton}]}/> : null}
                </View>
            </InnerScreen>
        )
    }

};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
   scroll: {
       width: '100%',
   },
   content: {
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 10,
        lineHeight: 24
   },
   buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#dcdbdc',
        padding: 10
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#437da3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    pageReactionbutton: {
        backgroundColor: '#437da3',
        color: '#fff'
    }
});

export default Instruction;