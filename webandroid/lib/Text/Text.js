import React, { Component } from 'react';
import { Text } from 'react-native';

import translator from './translator';

class TranslatedText extends Component {
    render() {
        return (
            <Text {...this.props}>{translator(this.props.children)}</Text>
        )
    }
}

export default TranslatedText;