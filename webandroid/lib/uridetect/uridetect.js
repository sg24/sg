import React, { Component } from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { v4 as uuid } from 'uuid';

const LINK_DETECTION_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;
const LINK_VERIFY_REGEX = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const HASH_DETECTION_REGEX = /(^|\s)(#[a-z\d-]+)/i

class UriDetect extends Component {
    verifyURIHandler = (uri) => {
        let detectUrl = uri.replace(/\n/g, ` `).split(` `).find((token) => LINK_VERIFY_REGEX.test(token));
        if (!detectUrl) {
            return this.props.onPress('URL', `http://${uri}`);
        }
        return this.props.onPress('URL', detectUrl);
    }
    render() {
        let uniqueID = uuid();
        let Touchable = TouchableNativeFeedback;
        if (Platform.OS === 'web') {
            Touchable = TouchableOpacity
        }
        let content = this.props.content ? this.props.content : '';
        let words = content.split(/\r\n|\r|\n/);
        let updateWords = words.join(uniqueID)
        words = updateWords.split(/\s/)
        content = words.map((rawWord, index) => {
            let word = rawWord.split(uniqueID).join('\n');
            let seperator = index < (words.length - 1) ? ' ' : '';
            let searchStyle = this.props.searchText && this.props.searchText.length > 0 && word.match(this.props.searchText) ?
                {backgroundColor: this.props.highlighted ? this.props.highlighted.backgroundColor : '#437da3', 
                color: this.props.highlighted ? this.props.highlighted.color : '#fff'} : {color: '#333'};
            if (word.match(LINK_DETECTION_REGEX)) {
                return <Touchable key={index} onPress={() => this.verifyURIHandler(word)}><Text style={[styles.href, searchStyle, this.props.textStyle]}>{ word + seperator }</Text></Touchable>;
            } else if (word.match(HASH_DETECTION_REGEX)) {
                return <Touchable key={index} onPress={() => this.props.onPress('hashTag', word)}><Text style={[styles.hashTag, searchStyle, this.props.textStyle]}>{ word + seperator}</Text></Touchable>;
            } else if (this.props.searchText && this.props.searchText.length > 0 && word.match(this.props.searchText)) {
                return <Text key={index} style={[searchStyle, this.props.textStyle]}>{ word + seperator}</Text>
            } else {
                return word + seperator;
            }
        });
        return <Text style={this.props.style} numberOfLines={this.props.numberOfLines}>{ content }</Text>
    }
}

const styles = StyleSheet.create({
    href: {
        textDecorationLine: 'underline',
        color: '#777'
    },
    hashTag: {
        fontWeight: 'bold'
    }
});

export default UriDetect;