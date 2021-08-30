import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';
import WebView from 'react-native-webview';
import { v4 as uuid } from 'uuid';

import { createHtml } from './EditorUtils/EditorUtils'

class FormElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
          webviewContent: this.getInitalHtml(),
        };
    
        this._handlers = [];
        this._promises = [];
        const {
          onSelectionChange,
          onChangeText,
          autoCorrect,
          autoFocus,
          onBlur,
        } = this.props;
        if (onSelectionChange) {
          this.on('selection-change', onSelectionChange);
        }
        if (onChangeText) {
          this.on('text-change', onChangeText);
        }
        if (onBlur) {
          this.on('blur', onBlur);
        }
        if (autoFocus) {
          this.on('focus', autoFocus);
        }
    }

    getInitalHtml = () => {
        const {
          initialHtml = this.props.value,
          import3rdParties = 'local',
          containerId = 'standalone-container',
          theme = {
            background: 'white',
            color: 'rgb(32, 35, 42)',
            placeholder: 'rgba(0,0,0,0.6)',
          },
          placeholder = '',
          customStyles = [],
          initialValue = this.props.value
        } = this.props;
    
        return createHtml({
          initialHtml,
          initialValue,
          placeholder: placeholder,
          theme:  'snow',
          toolbar: JSON.stringify(false),
          libraries: import3rdParties,
          editorId: 'editor-container',
          containerId,
          color: theme.color,
          backgroundColor: theme.background,
          placeholderColor: theme.placeholder,
          customStyles,
          defaultStyle: StyleSheet.flatten(this.props.style)
        });
    };

    getKey = () => {
        return uuid();
    }

    postAwait = (data) => {
        const key = this.getKey();
        let resolveFn = () => {};
        const promise = new Promise((resolve) => {
            resolveFn = resolve;
        });

        const resp = {
            key,
            resolve: resolveFn,
        };

        this._promises.push(resp);
        this.post({ ...data, key });

        return promise;
    }
    
    post = (obj) => {
        const jsonString = JSON.stringify(obj);
        this._webview?.postMessage(jsonString);
    };

    toMessage = (data) => {
        const message= JSON.parse(data);
        return message;
    };
    
    onMessage = (event) => {
        const message = this.toMessage(event.nativeEvent.data);
        const response = message.key
          ? this._promises.find((x) => x.key === message.key)
          : undefined;
        switch (message.type) {
          case 'format-change':
          case 'text-change':
          case 'selection-change':
          case 'html-change':
          case 'editor-change':
          case 'blur':
          case 'focus':
            this._handlers
              .filter((x) => x.event === message.type)
              .forEach((item) => item.handler(message.data));
            break;
          case 'has-focus':
          case 'get-contents':
          case 'get-text':
          case 'get-length':
          case 'get-html':
            if (response) {
              response.resolve(message.data);
              this._promises = this._promises.filter((x) => x.key !== message.key);
            }
            break;
        }
    };
    
    blur = () => {
        this.post({ command: 'blur' });
    };

    autoFocus = () => {
        this.post({ command: 'focus' });
    };

    hasFocus = () => {
        return this.postAwait({ command: 'hasFocus' });
    };

    editable = (enable = true) => {
        this.post({ command: 'enable', value: enable });
    };

    update = () => {
        this.post({ command: 'update' });
    };
    
    format = (name, value) => {
        this.post({ command: 'format', name, value });
    };
    
    deleteText = (index, length) => {
        this.post({ command: 'deleteText', index, length });
    };
    
    getContents = (index, length) => {
        return this.postAwait({ command: 'getContents', index, length });
    };
    
    getHtml = () => {
        return this.postAwait({ command: 'getHtml' });
    };
    
    getLength = () => {
        return this.postAwait({ command: 'getLength' });
    };
    
    getText = (index, length) => {
        return this.postAwait({ command: 'getText', index, length });
    };

    insertEmbed = (index, type, value) => {
        this.post({ command: 'insertEmbed', index, type, value });
    };

    insertText = (index, text, formats) => {
        this.post({ command: 'insertText', index, text, formats });
    };
    
    setContents = (delta) => {
        this.post({ command: 'setContents', delta });
    };
    
    setText = (text) => {
        this.post({ command: 'setText', text });
    };
    
    updateContents = (delta) => {
        this.post({ command: 'updateContents', delta });
    };
    
    on = (event, handler) => {
        this._handlers.push({ event, handler });
    };
    
    off = (event, handler) => {
        const index = this._handlers.findIndex(
          (x) => x.event === event && x.handler === handler
        );
        if (index > -1) {
          this._handlers.splice(index, 1);
        }
    };
    
    dangerouslyPasteHTML = (index, html) => {
        this.post({ command: 'dangerouslyPasteHTML', index, html });
    };


    renderWebview = (content,style) => (
        <WebView
          scrollEnabled={false}
          hideKeyboardAccessoryView={true}
          keyboardDisplayRequiresUserAction={false}
          originWhitelist={['*']}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          allowFileAccess={true}
          domStorageEnabled={false}
          automaticallyAdjustContentInsets={true}
          bounces={false}
          dataDetectorTypes="none"
          javaScriptEnabled={true}
          source={{ html: content }}
          style={style}
          ref={(ref) => this._webview = ref}
          onMessage={this.onMessage}
          onLoadEnd={() => {
            this.autoFocus()
          }}
        />
    );

    render() {
        const {style} = this.props;
        
        const { webviewContent } = this.state;
        return (
            webviewContent ? <View style={{flex: 1, width: '100%'}}>{this.renderWebview(webviewContent, style)}</View> : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#333', fontSize: 18}}>Loading ...</Text>
                </View>
            )
        )
    }
}

export default FormElement;