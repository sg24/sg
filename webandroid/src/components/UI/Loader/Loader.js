import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions , ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { size } from 'tailwind';

import BoxShadow from '../BoxShadow/BoxShadow';

class PageLoader extends Component {
    state = {
        viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
        width: null,
        height: null
    }

    containerLayoutHandler = (e) => {
        if (e) {
            let {width, height} = e.nativeEvent.layout;
            this.setState({width, height})
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    render() {
        let loader= (
            <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor, height: this.state.height} : 
                this.state.height]}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        )

        let showLoader = ['post'].filter(page => page === this.props.page).length > 0;

        if (this.props.page === 'post') {
            loader = (
                <ContentLoader 
                    speed={2}
                    foregroundColor="#777"
                    width="100%"
                    height="100%"
                    backgroundColor="#e9ebf2"
                    >
                        <Circle cx="30" cy="30" r="20"/> 
                        <Rect x="60" y="10" rx="10" ry="10" width={this.state.width/4} height="14" /> 
                        <Rect x="60" y="32" rx="10" ry="10" width={this.state.width/4} height="14" /> 
                        <Circle cx={this.state.width-100} cy="24" r="10" /> 
                        <Circle cx={this.state.width-70} cy="24" r="10" /> 
                        <Circle cx={this.state.width-40} cy="24" r="10" /> 
                        <Rect x="10" y="60" rx="0" ry="0" width={this.state.width-40} height="150" /> 
                        <Rect x="10" y="220" rx="0" ry="0" width="60" height="20" /> 
                        <Rect x={(this.state.width-80)/2} y="220" rx="0" ry="0" width="60" height="20" /> 
                        <Rect x={this.state.width-90} y="220" rx="0" ry="0" width="60" height="20" />
                    </ContentLoader>
            )
        }

        return (
        <View style={{width: '100%', flex: 1}}>
            { this.props.header }
            { this.props.options }
            <ScrollView
                style={[styles.wrapper, this.state.width ? 
                this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor, height: this.state.height} : {height: this.state.height} : 
                this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor, height: this.state.height} : null]} 
                scrollEnabled={false}
                onLayout={this.containerLayoutHandler}>
                {this.state.width ? showLoader ? [...Array(24)].map((_, index) => (
                    <BoxShadow style={styles.container} key={index}>
                        { loader }
                    </BoxShadow>
                )) : loader : null}
            </ScrollView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 10,
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        height: 250,
        marginVertical: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        }
    },
    loaderCnt: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        settings: state.settings
    };
};

export default connect(mapStateToProps)(PageLoader);
