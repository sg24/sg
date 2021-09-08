import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import Icon from 'ionicons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import Text from 'text';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import DefaultHeader from '../Header/DefaultHeader';

class EmojiPicker extends Component {
    state = {
        emoji: []
    }

    emojiSelectHandler = (emoji) => {
        let allEmoji = [...this.state.emoji];
        allEmoji.push(emoji)
        this.setState({emoji: allEmoji})
    }

    clearSelectEmojiHandler = () => {
        this.setState({emoji: []})
    }

    render() {
        return (
            <InnerScreen
                onRequestClose={this.props.closePicker}
                animationType="slide"
                onBackdropPress={this.props.closePicker}>
                <DefaultHeader
                    onPress={this.props.closePicker}
                    title={this.props.title}/>
                <View style={styles.wrapper}>
                    {this.state.emoji.length > 0 ? 
                        <View style={styles.emoji}>
                            <Text style={styles.emojiTitle}>Emoji Selected</Text>
                            <ScrollView 
                                contentContainerStyle={styles.emojiPrev}
                                horizontal
                                showsHorizontalScrollIndicator={Platform.OS === 'web'}>
                                {this.state.emoji.map((emoji, index) => (
                                    <Text key={index} style={styles.emojiText}>{emoji}</Text>
                                ))}
                            </ScrollView>
                            <View style={styles.buttonWrapper}>
                                <Button onPress={this.clearSelectEmojiHandler}>
                                    <BoxShadow style={styles.button}>
                                        <Text style={styles.clearButtonText}>Clear</Text>
                                    </BoxShadow>
                                </Button>
                                <Button onPress={this.props.emoji.bind(this, this.state.emoji)}>
                                    <BoxShadow style={styles.doneButton}>
                                        <Text style={styles.doneButtonText}>Done</Text>
                                    </BoxShadow>
                                </Button>
                            </View>
                        </View> : null }
                   <View style={styles.emojiSelectorWrapper}>
                        <EmojiSelector
                            category={Categories.emotion}
                            theme="#437da3"
                            onEmojiSelected={this.emojiSelectHandler}
                            showHistory={false}
                            columns={10} />
                   </View>
                </View>
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
    },
    emojiSelectorWrapper: {
        flex: 1,
        position: 'relative'
    },
    emojiSelector: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    emojiTitle: {
        padding: 5,
        backgroundColor: '#dcdbdc',
        fontSize: 16
    },
    emojiPrev: {
        flexDirection: 'row'
    },
    emojiText: {
        padding: 5,
        fontSize: 20
    },
    buttonWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#e9ebf2',
        justifyContent: 'space-between'
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5 ,
        borderRadius: 5
    },
    doneButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 10,
        paddingVertical: 5 ,
        borderRadius: 5
    },
    doneButtonText: {
        color: '#fff'
    }
})

export default EmojiPicker;