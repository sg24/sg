import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions, Platform } from 'react-native';
import { size} from 'tailwind';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import * as actions from './src/store/actions/index';
import SignInScreen from './src/screens/Auth/Signin';
import SignUpScreen from './src/screens/Auth/Signup';
import ForgetPasswordScreen from './src/screens/Auth/ForgetPassword';
// import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import HomeHeader  from './src/components/UI/Header/Home';
import HomeHeaderWeb  from './src/components/UI/Header/HomeWeb';
import TopTab from './src/components/UI/Navigation/TopTab'
import SearchScreen from './src/screens/Home/Search';
import SearchHeader  from './src/components/UI/Header/Search';
import AddnewScreen from './src/screens/Home/Addnew';
import DefaultHeader  from './src/components/UI/Header/DefaultHeader';
import DefaultSearchHeader  from './src/components/UI/Header/DefaultSearchHeader';
import ConvScreen from './src/screens/Home/Conv';
import NotificatonScreen from './src/screens/Home/Notification';
import ProfileScreen from './src/screens/Home/Profile';
import PostScreen from './src/screens/Home/Post';
import AddPostScreen from './src/screens/AddForm/Post';
import AddQuestionScreen from './src/screens/AddForm/Question';
import AddAdvertScreen from './src/screens/AddForm/Advert';
import AddFeedScreen from './src/screens/AddForm/Feed';
import AddWriteUpScreen from './src/screens/AddForm/WriteUp';

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
  AddPost: AddPostScreen,
  AddQuestion: AddQuestionScreen,
  AddAdvert: AddAdvertScreen,
  AddFeed: AddFeedScreen,
  AddWriteUp: AddWriteUpScreen
};

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait'
    }
  }
  componentDidMount() {
    this.props.onCheckAuth();
    Dimensions.addEventListener('change', this.updateHeader);
  }

  updateHeader = (dims) => {
    this.setState({
        viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
    })
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

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
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : HomeHeader
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                    userImage={this.props.userImage}
                    username={this.props.username}
                    onPress={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    inputValue={this.props.filterCnt} />
                }
                component = this.state.viewMode === 'landscape'  ? PostScreen : component;
              }
              if (name === 'Search') {
                header = {
                  header: ({scene, previous, navigation }) => <SearchHeader 
                    onPress={() => navigation.goBack()}
                    onNavigate={(url) => navigation.navigate(url)}
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

              if (name === 'Profile') {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                    userImage={this.props.userImage}
                    onPress={(url) => this.state.viewMode === 'landscape' ? navigation.navigate(url, {userID: this.props.userID}) : navigation.goBack()}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    title={name}
                    inputValue={this.props.filterCnt} />
                }
              }

              if (name === 'Addnew' || name === 'Notification') {
                header = {
                  header: ({scene, previous, navigation }) => <DefaultHeader 
                    onPress={() => navigation.goBack()}
                    title={name}
                  />
                }
              }
              
              if (name === 'AddPost' || name === 'AddQuestion' || name === "AddAdvert" || name === "AddFeed"
              || name === "AddWriteUp") {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                    title={name.startsWith('Add') ? name.split('Add').join("Add ") : name}
                    userImage={this.props.userImage}
                    username={this.props.username}
                    onPress={(url) => this.state.viewMode === 'landscape' ? navigation.navigate(url, {userID: this.props.userID}) : navigation.goBack()}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    inputValue={this.props.filterCnt}
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
      username: state.auth.username,
      userID: state.auth.userID,
      filterCnt: state.header.filterCnt
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCheckAuth: () => dispatch(actions.checkAuthInit()),
      onHeaderFilter: (filterCnt) => dispatch(actions.headerFilterInit(filterCnt))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Base);
