import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import ScrollView from '../../components/UI/ScrollView/ScrollView';

class Addnew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = (page) => {
        this.props.navigation.push(page)
    }

    render() {
      return (
        <NoBackground>
            <ScrollView>
                <View style={styles.wrapper}>
                    <View style={[ this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("AddPost")}>
                            <Icon name="chatbox" size={20} color="#437da3"/>
                            <Text style={styles.textStyle}>Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("AddAdvert")}>
                            <Icon name="megaphone-outline" size={20} />
                            <Text style={styles.textStyle}>Advert</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("")}>
                            <Icon name="chatbubble-ellipses-outline" size={20} />
                            <Text style={styles.textStyle}>Chat Room</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("")}>
                            <Icon name="create-outline" size={20} />
                            <Text style={styles.textStyle}>Answer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("AddQuestion")}>
                            <Icon name="bulb-outline" size={20} />
                            <Text style={styles.textStyle}>Question</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("")}>
                            <Icon name="timer-outline" size={20} />
                            <Text style={styles.textStyle}>CBT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("")}>
                            <Icon name="newspaper-outline" size={20} />
                            <Text style={styles.textStyle}>Feed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => this.navigationHandler("wrie")}>
                            <Icon name="reader-outline" size={20} />
                            <Text style={styles.textStyle}>Write Up</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </ScrollView>
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        marginLeft: 10,
        fontSize: 16
    },
    wrapper: {
        width: '100%',
        padding: 10
    },
    landscapeWrapper: {
        width: '100%'
    },
    navItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10,
        width: '100%',
        borderColor: '#dcdbdc',
        borderWidth: 1
    }
})

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default Addnew;