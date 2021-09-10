import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import Ionicons from 'ionicons';
import { connect } from 'react-redux';
import { size } from 'tailwind';
import Text from 'text';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import Button from '../../components/UI/Button/Button';

class ExamInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            content: this.props.route.params.content,
            pageID: this.props.route.params.pageID
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        if (this.state.pageID && this.state.content) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                if (!this.state.pageID || !this.state.content) {
                    this.props.navigation.navigate(Platform.OS === 'web' ? 'CBTWeb' :'CBT')
                }
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                // this.setState({content: null, pageID: null})
            });
        } else {
            this.props.navigation.navigate(Platform.OS === 'web' ? 'CBTWeb' :'CBT')
        }
    }

    componentWillUnmount() {
        if (this.state.pageID && this.state.content) {
            this._unsubscribe();
            this._unsubscribeBlur();
        }
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    startExamHandler = () => {
        this.props.navigation.navigate('Exam', {pageID: this.state.pageID});
    }

    render () {
        let cnt =  (
            <View style={[styles.container, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : null]}>
                {this.state.viewMode === 'landscape' ? (
                    <DefaultHeader 
                        onPress={() => this.props.navigation.goBack()}
                        title="Exam Summary / Instruction"
                    />
                ) : null}
                <ScrollView 
                    style={styles.wrapper}
                    showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                    <Text>{ this.state.content }</Text>
                    <View style={styles.buttonWrapper}>
                        <Button 
                            textStyle={styles.textStyle}
                            style={styles.button}
                            onPress={this.startExamHandler}>
                            <Ionicons name="timer-outline" color="#fff" size={18} />
                            <Text style={styles.buttonText}>Start</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );

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
    container: {
        flex: 1,
        width: '100%'
    },
    textStyle: {
        fontSize: 15,
        color: '#fff'
    },
    wrapper: {
        width: '100%',
        padding: 10
    },
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#dcdbdc',
        padding: 10
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#437da3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16
    }
});


const mapStateToProps = state => {
    return {
        settings: state.settings
    };
  };

  export default connect(mapStateToProps)(ExamInstruction);
  