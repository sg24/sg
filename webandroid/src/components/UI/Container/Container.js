import React from 'react';
import { tailwind, size } from 'tailwind';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { minWidth } from 'react-native-stylex/media-query';
import { View } from 'react-native';

const container = props => (
    <View style={[props.styles.wrapper, props.style]}>
        { props.children }
    </View>
)    

const useStyles = makeUseStyles(({ palette, utils }) => ({
    wrapper: {
        width: '100%',
        ...minWidth(size.sm, tailwind('max-w-screen-sm mx-auto')),
        ...minWidth(size.md, tailwind('max-w-screen-md mx-auto')),
        ...minWidth(size.lg, tailwind('max-w-screen-lg mx-auto')),
        ...minWidth(size.xl, tailwind('max-w-screen-xl mx-auto'))
    }
}))


export default withStyles(useStyles)(container)