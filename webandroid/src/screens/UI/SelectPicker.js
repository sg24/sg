import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import SelectPickerItem from '../../components/UI/SelectPicker/SelectPicker';

class SelectPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            selectProps: this.props.route.params.props,
            selectChildren: this.props.route.params.children
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        if (this.state.selectProps) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                if (!this.state.selectProps) {
                    this.props.navigation.goBack();               
                }
            });
        } else {
            this.props.navigation.goBack()
        }
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        if (this.state.selectProps) {
            this._unsubscribe();
        }
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    render() {
        let cnt = (
            <View style={styles.wrapper}>
                 <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : 
                         null]}>
                     <ActivityIndicator 
                         size="large"
                         animating
                         color="#437da3"/>
                 </View>
            </View>
         )

        if (this.state.selectProps) {
            cnt = (
                <View 
                    style={[styles.wrapper, this.state.viewMode === 'landscape' ? 
                    {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <SelectPickerItem
                            {...this.state.selectProps}
                            closeSelectPicker={this.props.navigation.goBack}
                            animation="fade">
                            { this.state.selectChildren}
                        </SelectPickerItem>
                </View>
            )
        } 

      return (
        <NoBackground
            sideBar={(
                <>
                <Navigation 
                        color={this.props.settings.color}
                        backgroundColor={this.props.settings.backgroundColor}/>
                <CreateNavigation 
                    color={this.props.settings.color}
                    backgroundColor={this.props.settings.backgroundColor}/>
                </>
            )}
            content={ cnt }
            contentFetched={true}>
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        flex: 1,
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
const mapStateToProps = state => {
    return {
        settings: state.settings
    };
};

export default connect(mapStateToProps)(SelectPicker);