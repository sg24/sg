import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { tailwind } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Href from '../../components/UI/Href/Href';
// import { updateObject  } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333'
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    navigationHandler = (page) => {
        console.log(page)
    }

    render() {
        let { styles } = this.props;
      return (
        <NoBackground
            sideBar={(
                <>
                <Navigation 
                        color={this.state.color}
                        backgroundColor={this.state.backgroundColor}
                        navigate={this.navigationHandler}/>
                <CreateNavigation 
                    color={this.state.color}
                    backgroundColor={this.state.backgroundColor}
                    navigate={this.navigationHandler}/>
                </>
            )}>
        </NoBackground>
      )
    }
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
    textStyle: {
        fontSize: 15
    }
}))

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Post));