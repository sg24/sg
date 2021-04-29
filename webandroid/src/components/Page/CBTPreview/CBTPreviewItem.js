import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native';
import Ionicons from 'ionicons';
import Uridetect from 'uridetect';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import Button from '../../UI/Button/Button';
import Carousel from '../../UI/Carousel/Carousel';
import MediaContainer from '../../UI/MediaContainer/MediaContainer';

const cbtPreviewItem = props => (
    <View style={styles.container}>
        <BoxShadow style={styles.wrapper}>
            <Carousel 
                renderData={props.cnt.media}
                _renderItem={({item:media, index}) => (
                    <View
                        style={styles.carousel}>
                        <MediaContainer
                            media={media}
                            onPress={props.preview.bind(this, null, props.cnt.media, index)} >
                            {media.description ? <Text numberOfLines={1} style={styles.description}>{ media.description }</Text> : null}
                        </MediaContainer>
                    </View>
                )}
                layout="stack"/>
             <Uridetect
                numberOfLines={1}
                onPress={props.openURI} 
                style={styles.content} 
                content={props.cnt.title}/>
            <Text style={styles.textStyle}>Total: { props.cnt.qchatTotal } Questions</Text>
            <Text style={styles.textStyle}>Duration: {`${props.cnt.hour} hour ${props.cnt.minute} minute ${props.cnt.second} second`}</Text>
            <View style={styles.actionButtonWrapper}>
                <Button
                    onPress={props.openURI}
                    title="Take Exam"
                    style={styles.actionButton }/>
            </View>
        </BoxShadow>
    </View>
);

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    container: {
        paddingRight: 20
    },
    wrapper: {
        width: 300,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    content: {
        fontSize: 16,
        marginBottom: 5
    },
    carousel: {
        backgroundColor: '#e9ebf2',
        flex: 1,
        width: '100%',
        marginVertical: 10
    },
    description: {
        padding: 10,
        fontSize: 15
    },
    actionButtonWrapper: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    actionButton: {
        backgroundColor: '#437da3',
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 10
    }
});

export default cbtPreviewItem;