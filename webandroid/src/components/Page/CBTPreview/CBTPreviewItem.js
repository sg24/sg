import React from 'react';
import { View, StyleSheet } from 'react-native';
import Uridetect from 'uridetect';
import Text, { translator } from 'text';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import Button from '../../UI/Button/Button';
import Carousel from '../../UI/Carousel/Carousel';
import MediaContainer from '../../UI/MediaContainer/MediaContainer';

const cbtPreviewItem = props => {
    let startPageReaction = props.pending && props.pending.filter(cnt => cnt.id === props.cnt._id && cnt.type === 'cbtRequest')[0];
    let isCancelRequest = props.page.filter(cnt => cnt.id === props.cnt._id && cnt.cntType === 'setRequest')[0] ? true : false
    return ( 
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
                <Text style={styles.textStyle}>{translator('Total')}: { props.cnt.qchatTotal } {translator('Questions')}</Text>
                <Text style={styles.textStyle}>{translator('Duration')}: {`${props.cnt.hour} ${translator('hour')} ${props.cnt.minute} ${translator('minute')} ${props.cnt.second} ${translator('second')}`}</Text>
                <View style={styles.actionButtonWrapper}>
                    { props.userID !== props.cnt.authorID ?
                        <Button
                            onPress={props.cnt.takeExam ? props.takeExam : 
                                props.cnt.isPending || isCancelRequest ? props.cancelRequest : props.request}
                            title={props.cnt.takeExam ? 'Take Exam' : 
                                props.cnt.isPending  || isCancelRequest ? 'Cancel Request' : 'Request'}
                            style={props.cnt.takeExam ? styles.actionButton : styles.actionButtonAlt}
                            textStyle={props.cnt.takeExam ? styles.textStyle : styles.actionButtonText}
                            disabled={startPageReaction && (props.cnt.isPending || !props.cnt.takeExam )}/> : null}
                </View>
            </BoxShadow>
        </View>
    );
}

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
    },
    actionButtonAlt: {
        backgroundColor: '#dcdbdc',
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 10
    },
    actionButtonText: {
        color: '#333',
        fontSize: 15
    }
});

export default cbtPreviewItem;