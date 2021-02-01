import React, { Component } from 'react';
import { View, Text , StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import LinkItem from './LinkItem/LinkItem';
import { size } from 'tailwind';
import { verifyUri } from '../../../shared/utility'

class LinkPreview extends Component {
    constructor(props) {
        super(props);
        const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 
            Platform.OS === 'web' ? 'landscape' : 'portrait',
            sizeMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            viewportWidth,
            viewportHeight
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  
            Platform.OS === 'web' ? 'landscape' : 'portrait',
            sizeMode: dims.window.width >= size.sm ? 'landscape' : 'portrait',
            viewportWidth: dims.window.width,
            viewportHeight: dims.window.height
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    _renderItem = ({item:link, index}) => {
        return (
            <LinkItem 
                uri={verifyUri(link)}
                style={this.state.viewMode !== 'portriat' ? styles.scrollView : null}/>
        )
    }

    widthPercent =  (percentage) => {
        const value = (percentage * this.state.viewportWidth) / 100;
        return Math.round(value);
    }

    render() {
        const slideHeight = this.state.viewportHeight * 0.36;
        const slideWidth = this.widthPercent(75);
        const itemHorizontalMargin = this.widthPercent(2);
        const sliderWidth = this.state.viewportWidth;
        const itemWidth = slideWidth + itemHorizontalMargin * 2;
     return (
        <View style={styles.wrapper}>
            { this.state.viewMode === 'portriat' ? (
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    layout={'default'}
                    data={this.props.links}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    />
            ): (
                <ScrollView 
                    showsHorizontalScrollIndicator={Platform.OS === 'web' && this.state.sizeMode === 'landscape'} 
                    contentContainerStyle={{width: '100%'}}
                    horizontal>
                    {this.props.links.map((link, index) => (
                        <View style={styles.scrollView} key={index}>
                            <LinkItem 
                                uri={verifyUri(link)}
                                style={this.state.viewMode !== 'portriat' ? styles.scrollView : null}/>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
     )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 100, 
        width: '100%', 
        padding: 10,
        backgroundColor: '#dcdbdc'
    },
    scrollView: {
        width: 280,
        height: '100%',
        marginRight: 10
    }
})
export default LinkPreview