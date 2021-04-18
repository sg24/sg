import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'ionicons';
import { size } from 'tailwind';

import Button from '../Button/Button';

class CarouselWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            containerWidth: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  'portrait'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    containerWidthHandler = (e) => {
        if (e) {
            let {width} = e.nativeEvent.layout;
            this.setState({containerWidth: width})
        }
    }

    seekHandler = (page) => {
       if (this._carousel) {
            if (page === 'right') {
                this._carousel.snapToNext(true);
            } else {
                this._carousel.snapToPrev(true);
            }
       }
    }

    render() {
        let seekLeft = (
            <View style={styles.seekWrapper}>
                <Button style={styles.seek} onPress={() => this.seekHandler('left')}>
                    <Ionicons name="chevron-back-outline" size={15}/>
                </Button>
            </View>
        )
        let seekRight = (
            <View style={[styles.seekWrapper, styles.seekWrapperRight]}>
                <Button style={styles.seek} onPress={() => this.seekHandler('right')}>
                    <Ionicons name="chevron-forward-outline" size={15}/>
                </Button>
            </View>
        );

        let loader = (
            <View style={styles.loaderCnt}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        );

        let cnt = loader;

        cnt = (
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
                { !this.props.hideSeeker && this.props.renderData.length > 1 ? seekLeft : null}
                <View 
                    style={styles.container}  
                    onLayout={this.containerWidthHandler}>
                    { this.state.containerWidth ? 
                        <View style={[styles.scroll, this.props.carouselStyle]}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            layout={this.props.layout ? this.props.layout : 'default'}
                            data={this.props.renderData}
                            renderItem={this.props._renderItem}
                            sliderWidth={this.state.containerWidth}
                            itemWidth={this.state.containerWidth}
                            enableSnap
                            enableMomentum />
                    </View> : loader }
                </View>
                { !this.props.hideSeeker && this.props.renderData.length > 1 ? seekRight : null}
            </View>
        );

        return cnt
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row'
    },
    container: {
        flex: 1,
    },
    seekWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    seekWrapperRight: {
        marginRight: 0,
        marginLeft: 5
    },
    seek: {
        backgroundColor: '#dcdbdc',
        width: 20,
        height: 40,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll: {
        width: '100%',
        flex: 1
    }
});

export default CarouselWrapper;