import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import * as actions from './src/store/actions/index';
import SignInScreen from './src/screens/Auth/Signin';
import SignUpScreen from './src/screens/Auth/Signup';
import ForgetPasswordScreen from './src/screens/Auth/ForgetPassword';
// import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import HomeHeader  from './src/components/UI/Header/Home';
import TopTab from './src/components/UI/Navigation/TopTab'
import SearchScreen from './src/screens/Home/Search';
import SearchHeader  from './src/components/UI/Header/Search';
import AddnewScreen from './src/screens/Home/Addnew';
import DefaultHeader  from './src/components/UI/Header/DefaultHeader';
import DefaultSearchHeader  from './src/components/UI/Header/DefaultSearchHeader';
import ConvScreen from './src/screens/Home/Conv';
import NotificatonScreen from './src/screens/Home/Notification';
import ProfileScreen from './src/screens/Home/Profile';
import AddPostScreen from './src/screens/AddForm/Post';


const Stack = createStackNavigator();

const authScreens = {
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgetPassword: ForgetPasswordScreen
};

const userScreens = {
  Home: TopTab,
  Search: SearchScreen,
  Addnew: AddnewScreen,
  Conversation: ConvScreen,
  Notification: NotificatonScreen,
  Profile: ProfileScreen,
  AddPost: AddPostScreen
};

class Base extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }

  render() {
    if (this.props.authErr) {
      alert('Error'+this.props.authErr)
      return null
    }

    if (!this.props.isAuthChecked) {
      return null
    }

    SplashScreen.hideAsync();
    
    return (
      <NavigationContainer>
          <Stack.Navigator
            headerMode="screen">
            {Object.entries({
              ...(this.props.isLoggedIn ? userScreens : authScreens),
            }).map(([name, component]) => {
              let header = {}
              if (name == 'Home') {
                header = {
                  header: ({scene, previous, navigation }) => <HomeHeader 
                    userImage={this.props.userImage}
                    onPress={(url) => navigation.navigate(url, {userID: this.props.userID})} />
                }
              }
              if (name === 'Search') {
                header = {
                  header: ({scene, previous, navigation }) => <SearchHeader 
                    onPress={() => navigation.goBack()}
                    filterCnt={this.props.onHeaderFilter}
                  />
                }
              }

              if ( name === 'Conversation') {
                header = {
                  header: ({scene, previous, navigation }) => <DefaultSearchHeader
                    onPress={() => navigation.goBack()}
                    onNavigate={() => navigation.navigate('Search')}
                    title={name}
                  />
                }
              }

              if (name === 'Addnew' || name === 'Notification' || name === 'Profile') {
                header = {
                  header: ({scene, previous, navigation }) => <DefaultHeader 
                    onPress={() => navigation.goBack()}
                    title={name}
                  />
                }
              }
              
              if (name === 'AddPost') {
                header = {
                  header: ({scene, previous, navigation }) => <DefaultHeader 
                    onPress={() => navigation.goBack()}
                    title={name.startsWith('Add') ? name.split('Add').join("Add ") : name}
                  />
                }
              }
              return (
                <Stack.Screen name={name} component={component} key={name} options={{headerShown: this.props.isLoggedIn, ...header}}/>
              )
            })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthChecked: state.auth.isAuthChecked,
      isLoggedIn: state.auth.isLoggedIn,
      authErr: state.auth.authErr,
      userImage: state.auth.img,
      userID: state.auth.userID
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCheckAuth: () => dispatch(actions.checkAuthInit()),
      onHeaderFilter: (filterCnt) => dispatch(actions.headerFilterInit(filterCnt))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Base);
