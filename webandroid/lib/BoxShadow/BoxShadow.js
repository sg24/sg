import React, { Component } from 'react';
import {  Platform, View } from 'react-native';

class ShadowView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      if (Platform.OS === 'ios') {
        return (<View
          {...this.props}
        />)
      }

      const { style } = this.props || {};
      let flattenedStyle = {};
      if (Array.isArray(style)) {
        style.map((item) => {
          item && Object.keys(item) && Object.keys(item).map(key => flattenedStyle[key] = item[key]);
        })
      }
      else {
        flattenedStyle = style || {};
      }

      delete flattenedStyle.elevation;
      
      const {
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        borderRadius,
        backgroundColor,
        borderWidth,
        borderColor,
      } = flattenedStyle;
      if (!shadowRadius || shadowOpacity === 0) {
        return (<View
          {...this.props}
        />)
      }

      const { width: shadowOffsetX, height: shadowOffsetY} = shadowOffset || {}
      return (
        <View
          {...this.props}
          style={[flattenedStyle]}
          borderWidth={borderWidth}
          borderColor={borderColor !== undefined ? borderColor : 'black'}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          shadowColor={shadowColor !== undefined ? shadowColor : 'black'}
          shadowOffsetX={shadowOffsetX}
          shadowOffsetY={shadowOffsetY}
          shadowOpacity={(shadowOpacity !== undefined ? shadowOpacity : 0)}
          shadowRadius={(shadowRadius !== undefined ? shadowRadius : 2.8)}
      >
      {this.props.children}
    </View>
    );
    }
}

export default ShadowView