import React, { Component } from 'react';
import { Text } from 'react-native';

import translate from './translator';

class TranslatedText extends Component {
    render() {
        if (Array.isArray(this.props.children)) {
            for (let word of this.props.children) {
                if (typeof word === 'object') {
                    return (<Text {...this.props}>{this.props.children}</Text>)
                }
            }
        }
        let sentence = Array.isArray(this.props.children) ? this.props.children.join('') : this.props.children;
        return (
            <Text {...this.props}>{translate(sentence, this.props.keyword, this.props.positionRight, this.props.core, this.props.fullLocale)}</Text>
        )
    }
}
export const translator = (sentence, keyword, positionRight, core, fullLocale) => translate(sentence, keyword, positionRight, core, fullLocale)
export const TextWrapper  = Text;
export default TranslatedText;