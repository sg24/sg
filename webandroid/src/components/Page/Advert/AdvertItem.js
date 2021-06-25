import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native';
import Ionicons from 'ionicons';
import Uridetect from 'uridetect';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import Button from '../../UI/Button/Button';
import Carousel from '../../UI/Carousel/Carousel';
import MediaContainer from '../../UI/MediaContainer/MediaContainer';
import LoadMore from '../../UI/LoadMore/LoadMore';

const advertItem = props => (
    <>
    <View style={styles.container}>
        <BoxShadow style={styles.wrapper}>
        { props.cnt.enableComment ? 
                <Button style={styles.chatBox} onPress={props.advertChatbox}> 
                    <Ionicons name="chatbox-ellipses-outline" size={20} />
                </Button>: null}
             <Uridetect
                numberOfLines={1}
                onPress={props.openURI} 
                style={styles.textStyle} 
                content={props.cnt.title}/>
            <Uridetect
                numberOfLines={1}
                onPress={props.openURI} 
                style={styles.content} 
                content={props.cnt.content}/>
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
            <View style={styles.actionButtonWrapper}>
                {props.cnt.button.length > 0 ? 
                    props.cnt.button.map((cnt, index) => (
                        <Button 
                            key={index}
                            onPress={props.openURI.bind(this, cnt.buttonType, cnt.content)}
                            title={cnt.title}
                            style={index === 0 ? styles.actionButton : styles.actionAltButtton}
                            textStyle={index === 0 ? null : styles.actionButtonText}/>
                    )) : null}
            </View>
        </BoxShadow>
    </View>
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10}}>
    { props.lastItem && props.enableLoadMore ? (
        <LoadMore
            style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}
            title=""
            icon={{name: 'reload-outline'}}
            onPress={props.loadMore}
            start={props.start}/>
    ) : null}
    </View>
    </>
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
        fontSize: 16
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
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    actionButton: {
        backgroundColor: '#437da3',
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 10
    },
    actionAltButtton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#dcdbdc'
    },
    actionButtonText: {
        color: '#333',
        fontSize: 15
    },
    chatBox: {
        position: 'absolute',
        top: Platform.OS !== 'web' ? -7 : -15,
        right: Platform.OS !== 'web' ? -3 : -12,
        backgroundColor: '#dcdbdc',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 20
    }
});

export default advertItem;