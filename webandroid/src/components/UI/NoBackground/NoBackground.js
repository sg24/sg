import React from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import SafeAreaView from '../SafeArea/SafeArea';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { minWidth } from 'react-native-stylex/media-query';
import { tailwind, size } from 'tailwind';

import Container from '../Container/Container';

const noBackground = props => {
    const { styles } = props;
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" backgroundColor="#437da3" />
                {!props.children ?
                    <Container style={styles.container}>
                        <View style={[styles.contentWrapper]}>
                            <View style={styles.sideBarWrapper}>
                                <ScrollView style={[styles.sideBar]} >
                                    {props.sideBar}
                                </ScrollView>
                            </View>
                            <View style={styles.content}>
                                {props.contentFetched ?
                                   <View style={styles.contentContainer}>
                                    {props.content}
                                    </View> :  props.content}
                            </View>
                            <View style={styles.instantChat}>
                                { props.instantChat }
                            </View>
                        </View>
                    </Container>
                : props.children }
        </SafeAreaView>
    )
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
       flex: 1,
       flexDirection: 'row',
       width: '100%',
       ...minWidth(size.sm, {marginTop: 10})
    },
    sideBarWrapper: {
        display: 'none',
        ...minWidth(size.md, tailwind('flex w-1/5')),
        ...minWidth(size.lg,  tailwind('flex w-1/6'))
    },
    sideBar: {
        position: 'absolute', 
        top: 0,
        bottom: 0, 
        right: 0, 
        left: 0 , 
        paddingLeft: 1,
        ...tailwind('pr-2 pb-2'),
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...minWidth(size.md, tailwind('w-3/5 pl-4 pr-4')),
        ...minWidth(size.lg,  tailwind('w-3/6')),
        flex: 1
    },
    contentContainer: {
        position: 'absolute', 
        top: 0,
        bottom: 0, 
        right: 0, 
        left: 0,
        ...minWidth(size.md, tailwind('pl-4 pr-4'))
    },
    instantChat: {
        display: 'none',
        ...minWidth(size.md, tailwind('flex w-1/5  pl-4')),
        ...minWidth(size.lg,  tailwind('w-2/6'))
    }
}));

export default withStyles(useStyles)(noBackground);