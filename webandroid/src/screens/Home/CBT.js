import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Href from '../../components/UI/Href/Href';
// import { updateObject  } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribe();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = (page) => {

    }

    render() {

      return (
        <NoBackground>
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    href: {
        textDecorationLine: 'underline',
        textDecorationColor: '#0284a8',
        color: '#0284a8',
        textDecorationStyle: 'solid',
        marginLeft: 5
    },
    wrapper: {
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        marginBottom: 20,
        marginTop: 38,
        position: 'relative',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);