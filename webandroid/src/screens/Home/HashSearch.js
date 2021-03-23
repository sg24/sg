import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import { size } from 'tailwind';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import SearchHeader from '../../components/UI/Header/Search';

class HastTagSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333',
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            viewHeight: Dimensions.get('window').height,
            hastTag: this.props.route.params.hastTag
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat',
            viewHeight: dims.window.height
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
    }

    render() {
        let { styles } = this.props;
        let header = (
            this.state.viewMode === 'landscape' ? (
                <SearchHeader 
                    onPress={() => this.props.navigation.goBack()}
                    title={this.state.hashTag || '#'}
                    editable={false}
              />
            ) : null
        );
        let cnt =  (
            <View style={styles.wrapper}>
                { header }
                
            </View>
        )

        return (
            <NoBackground
                sideBar={(
                    <>
                    <Navigation 
                            color={this.state.color}
                            backgroundColor={this.state.backgroundColor}/>
                    <CreateNavigation 
                        color={this.state.color}
                        backgroundColor={this.state.backgroundColor}/>
                    </>
                )}
                content={ cnt }
                contentFetched={this.props.fetchCnt}>
            </NoBackground>
          )
    }
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        flex: 1,
    },
    scroll: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10
    }
}))

export default withStyles(useStyles)(HastTagSearch);