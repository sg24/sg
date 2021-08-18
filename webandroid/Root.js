import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { AppState, Dimensions, Platform, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { size} from 'tailwind';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import BackgroundFetch from 'react-native-background-fetch';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import axios from './src/axios';
import * as Updates from 'expo-updates';

import * as actions from './src/store/actions/index';
import SignInScreen from './src/screens/Auth/Signin';
import SignUpScreen from './src/screens/Auth/Signup';
import ForgetPasswordScreen from './src/screens/Auth/ForgetPassword';
import ResetPasswordScreen from './src/screens/Auth/ResetPassword';
// import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import HomeHeader  from './src/components/UI/Header/Home';
import HomeHeaderWeb  from './src/components/UI/Header/HomeWeb';
import TopTab from './src/components/UI/Navigation/TopTab';
import FavoriteTopTab from './src/screens/Home/Favorite';
import SearchScreen from './src/screens/Home/Search';
import SearchHeader  from './src/components/UI/Header/Search';
import AddnewScreen from './src/screens/Home/Addnew';
import DefaultHeader  from './src/components/UI/Header/DefaultHeader';
import DefaultSearchHeader  from './src/components/UI/Header/DefaultSearchHeader';
import ConvScreen from './src/screens/Home/Conv';
import NotificatonScreen from './src/screens/Home/Notification';
import NotificatonPageScreen from './src/screens/Home/NotificationPage';
import ProfileScreen from './src/screens/Home/Profile';
import PostScreen from './src/screens/Home/Post';
import UsersScreen from './src/screens/Home/Users';
import QuestionScreen from './src/screens/Home/Question';
import FeedScreen from './src/screens/Home/Feed';
import WriteUpScreen from './src/screens/Home/WriteUp';
import CBTScreen from './src/screens/Home/CBT';
import GroupScreen from './src/screens/Home/Group';
import GroupPreviewScreen from './src/screens/Home/GroupPreview';
import ExamScreen from './src/screens/Home/Exam';
import MarkExamScreen from './src/screens/Home/MarkExam';
import ExamInstructionScreen from './src/screens/Home/ExamInstruction';
import GeneralSettingsScreen from './src/screens/Home/GeneralSettings';
import RoomInfoScreen from './src/screens/Home/RoomInfo';
import LogoutScreen from './src/screens/Home/Logout';
import HashSearchScreen from './src/screens/Home/HashSearch';
import CommentBoxScreen from './src/screens/Home/CommentBox';
import ChatBoxScreen from './src/screens/Home/ChatBox';
import QuestionSolutionScreen from './src/screens/Home/QuestionSolution';
import MediaPreviewScreen from './src/screens/UI/MediaPreview';
import PagePreviewScreen from './src/screens/UI/PagePreview';
import SharePickerScreen from './src/screens/UI/SharePicker';
import SelectPickerScreen from './src/screens/UI/SelectPicker';
import AddPostScreen from './src/screens/AddForm/Post';
import AddQuestionScreen from './src/screens/AddForm/Question';
import AddAdvertScreen from './src/screens/AddForm/Advert';
import AddFeedScreen from './src/screens/AddForm/Feed';
import AddWriteUpScreen from './src/screens/AddForm/WriteUp';
import AddCBTScreen from './src/screens/AddForm/CBT/CBT';
import AddChatRoomScreen from './src/screens/AddForm/Group/ChatRoom';
import AddGroupScreen from './src/screens/AddForm/Group';
import AddGroupPostScreen from './src/screens/AddForm/Group/Post';
import AddGroupQuestionScreen from './src/screens/AddForm/Group/Question';
import AddGroupFeedScreen from './src/screens/AddForm/Group/Feed';
import AddGroupWriteUpScreen from './src/screens/AddForm/Group/WriteUp';
import AddGroupCBTScreen from './src/screens/AddForm/Group/CBT';
import AddPageReportScreen from './src/screens/AddForm/PageReport';
import AddAppErrorScreen from './src/screens/AddForm/AppErrorReport';
import EditPostScreen from './src/screens/EditForm/Post';
import EditGroupPostScreen from './src/screens/EditForm/Group/Post';
import EditGroupQuestionScreen from './src/screens/EditForm/Group/Question';
import EditGroupFeedScreen from './src/screens/EditForm/Group/Feed';
import EditGroupWriteUpScreen from './src/screens/EditForm/Group/WriteUp';
import EditGroupCBTScreen from './src/screens/EditForm/Group/CBT';
import EditQuestionScreen from './src/screens/EditForm/Question';
import EditFeedScreen from './src/screens/EditForm/Feed';
import EditWriteUpScreen from './src/screens/EditForm/WriteUp';
import EditChatRoomScreen from './src/screens/EditForm/Group/ChatRoom';
import EditGroupScreen from './src/screens/EditForm/Group';
import EditCBTScreen from './src/screens/EditForm/CBT';
import EditAdvertScreen from './src/screens/EditForm/Advert';

if (Platform.OS !== 'web') {
  const globalErrorHandler = (err, isFatal) => {
  if (isFatal) {
    let formContent = new FormData();
    formContent.append('content', err);
    axios.post(`/add/appError`, formContent, {headers: { "Content-Type": "multipart/form-data"}}).then(() => {
        alert('Error information sent');
      })
    }
  };
  ErrorUtils.setGlobalHandler(globalErrorHandler);
}

const Stack = createStackNavigator();

const authScreens = {
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgetPassword: ForgetPasswordScreen,
  ResetPassword: ResetPasswordScreen
};

const userScreens = {
  HomeWeb: TopTab,
  Favorite: FavoriteTopTab,
  UsersWeb: UsersScreen, 
  Question: QuestionScreen,
  Feed: FeedScreen,
  WriteUp: WriteUpScreen,
  CommentBox: CommentBoxScreen,
  ChatBox: ChatBoxScreen,
  QuestionSolution : QuestionSolutionScreen,
  MediaPreview: MediaPreviewScreen,
  PagePreview: PagePreviewScreen,
  SharePicker: SharePickerScreen,
  SelectPicker: SelectPickerScreen,
  CBTWeb: CBTScreen,
  GroupWeb: GroupScreen,
  GroupPreview: GroupPreviewScreen,
  ExamInstruction: ExamInstructionScreen,
  Exam: ExamScreen,
  MarkExam: MarkExamScreen,
  GeneralSettings: GeneralSettingsScreen,
  RoomInfo: RoomInfoScreen,
  Logout: LogoutScreen,
  Search: SearchScreen,
  Addnew: AddnewScreen,
  Conversation: ConvScreen,
  Notification: NotificatonScreen,
  Profile: ProfileScreen,
  AddPost: AddPostScreen,
  AddQuestion: AddQuestionScreen,
  AddAdvert: AddAdvertScreen,
  AddFeed: AddFeedScreen,
  AddWriteUp: AddWriteUpScreen,
  AddCBT: AddCBTScreen,
  AddGroup: AddGroupScreen,
  AddGroupPost: AddGroupPostScreen,
  AddGroupQuestion: AddGroupQuestionScreen,
  AddGroupFeed: AddGroupFeedScreen,
  AddGroupWriteUp: AddGroupWriteUpScreen,
  AddGroupCBT: AddGroupCBTScreen,
  AddChatRoom: AddChatRoomScreen,
  AddReport: AddPageReportScreen,
  AddAppError: AddAppErrorScreen,
  EditPost: EditPostScreen,
  EditQuestion: EditQuestionScreen,
  EditFeed :  EditFeedScreen,
  EditWriteUp: EditWriteUpScreen,
  EditGroup: EditGroupScreen,
  EditGroupPost: EditGroupPostScreen,
  EditGroupQuestion: EditGroupQuestionScreen,
  EditGroupFeed: EditGroupFeedScreen,
  EditGroupWriteUp: EditGroupWriteUpScreen,
  EditGroupCBT: EditGroupCBTScreen,
  EditChatRoom: EditChatRoomScreen,
  EditCBT: EditCBTScreen,
  EditAdvert: EditAdvertScreen,
  HashSearch: HashSearchScreen,
  NotificationPage: NotificatonPageScreen
};

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
      isLoggedIn: false,
      expoPushToken: '',
      checkNotification: null,
      checkAppState: null,
      notificationDuration: 1000*60
    }
  }
  componentDidMount() {
    this.props.onCheckAuth();
    if (Platform.OS !== 'web') {
      Linking.addEventListener('url', this._onReceiveURL);
      Linking.getInitialURL().then(uri => {
        let { path, queryParams } = Linking.parse(uri);
        if (path === 'ResetPassword') {
          AsyncStorage.setItem(Constants.manifest.extra.REDIRECT_URI, JSON.stringify({uri: path, params: queryParams}))
        }
      })
    }
    Dimensions.addEventListener('change', this.updateHeader);
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn && !this.state.isLoggedIn) {
      this.props.onPushNotification(this.props.settings.notificationLimit, this.props.settings.notification, '', Platform.OS)
      AsyncStorage.removeItem(Constants.manifest.extra.PERSISTENCE_KEY).then(() => {
        let checkNotification = setInterval(() => {
          AsyncStorage.getItem(Constants.manifest.extra.PERSISTENCE_KEY).then(state => {
            if (state) {
              state = JSON.parse(state);
              let stateHistory = [];
              for (let cnt in state.routes) {
                if (state.routes[cnt].state && (state.routes[cnt].state.index || state.routes[cnt].state.index === 0)) {
                  let routeName = state.routes[cnt].state.routeNames[state.routes[cnt].state.index];
                  stateHistory.push(routeName);
                } else {
                  stateHistory.push(state.routes[cnt].params && state.routes[cnt].params.props && state.routes[cnt].params.props.notificationPage ? 
                    state.routes[cnt].params.props.notificationPage : state.routes[cnt].name);
                }
              }
              AsyncStorage.getItem(Constants.manifest.extra.NOTIFICATION).then(notification => {
                if (notification) {
                  notification = JSON.parse(notification);
                  for (let page of stateHistory) {
                      page = page.split('Web')[0].toLowerCase();
                      for (let notificationPage in notification) {
                        page = page === 'home' ? 'post' : page;
                        if (notificationPage.toLowerCase() === page) {
                            notification[notificationPage] = [];
                        }
                      }
                  }
                  AsyncStorage.setItem(Constants.manifest.extra.NOTIFICATION, JSON.stringify(notification)).then(() => {
                    this.props.onPushNotification(this.props.settings.notificationLimit, this.props.settings.notification, '', Platform.OS, JSON.stringify(stateHistory))
                  })
                } else {
                  this.props.onPushNotification(this.props.settings.notificationLimit, this.props.settings.notification, '', Platform.OS, JSON.stringify(stateHistory))
                }
              })
              
            } else {
              this.props.onPushNotification(this.props.settings.notificationLimit, this.props.settings.notification, '', Platform.OS)
            }
          })
          if (this.state.notificationDuration !== 120000) {
            this.setState({notificationDuration: 120000})
          }
        }, this.state.notificationDuration);
        this.setState({checkNotification})
      })
      this.props.onProfileInfo();
      if (Platform.OS !== 'web') {
        this.registarBackgroundTask();
        AppState.addEventListener('change', this._handleAppStateChange);
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true
          }),
        });
        // this.registerForPushNotificationsAsync().then(token => {
        //   this.props.onPushNotification(this.props.settings.notificationLimit, this.props.settings.notification, token, Platform.OS);
        // });
        // this.subscription = Notifications.addPushTokenListener(this.registerForPushNotificationsAsync);
        Updates.checkForUpdateAsync().then(({isAvailable}) => {
          if (isAvailable) {
            Updates.fetchUpdateAsync().then(({isNew}) => {
              if (isNew) {
                Alert.alert(
                  "App Updated Successfully",
                  "Press Reload ,to reload the application",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "Reload", onPress: Updates.reloadAsync }
                  ],
                  { cancelable: false }
                );
              }
            })
          }
        })
      }
      this.setState({isLoggedIn: true})
    }
  }

  componentWillUnmount() {
      if (this.subscription && this.responseListener) {
        this.subscription.remove();
        this.responseListener.remove()
      }
      clearInterval(this.state.checkNotification);
      if (Platform.OS !== 'web') {
        if (this.state.isLoggedIn) {
          AppState.removeEventListener('change', this._handleAppStateChange);
        }
        Linking.removeEventListener('url', this._onReceiveURL);
      }
  }

  _onReceiveURL = ({url}) => {
    let { path, queryParams } = Linking.parse(url);
    if (path === 'ResetPassword') {
      AsyncStorage.setItem(Constants.manifest.extra.REDIRECT_URI, JSON.stringify({uri: path, params: queryParams}))
    }
  }

  updateHeader = (dims) => {
    this.setState({
        viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
    })
  }

  getNotification = () => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          (async () => {
            let response = await axios.post('/users', {settings: JSON.stringify(this.props.settings.notification), limit: this.props.settings.notificationLimit, token: this.state.expoPushToken, platform: Platform.OS}, {headers: {'data-categ':'getNotification'}});
            let cnt = response.data ? response.data : {};
            let notification = cnt.notification;
            let showedNotification = await AsyncStorage.getItem(Constants.manifest.extra.NOTIFICATION);
            showedNotification = showedNotification ? JSON.parse(showedNotification) : {};
            for (let page in notification) {
              if (Array.isArray(notification[page])) {
                  if (showedNotification[page]) {
                    showedNotification[page] = showedNotification[page].filter(cntItem => notification[page].filter(notifyItem => notifyItem._id === cntItem._id).length > 0 ? false : true)
                    showedNotification[page].push(...notification[page])
                    let updateNotification = [];
                    for (let cntItem of showedNotification[page]) {
                        if ((cntItem && cntItem.expiresIn && (cntItem.expiresIn >= (new Date().getTime()))) || (cntItem && !cntItem.expiresIn)) {
                            updateNotification.push(cntItem);
                        }
                    }
                    showedNotification[page] = updateNotification;
                  } else {
                    showedNotification[page] = notification[page];
                  }
              }
          }
          await AsyncStorage.setItem(Constants.manifest.extra.NOTIFICATION, JSON.stringify(showedNotification));
          for (let page in notification) {
              for (let pageItem of notification[page]) {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: pageItem.title,
                    body: pageItem.content,
                    subtitle: pageItem.page,
                    data: pageItem
                  },
                  trigger: {
                    seconds: 10,
                    channelId: 'default',
                  },
                });
              }
          }
          resolve();
          })();
        } else {
          resolve();
        }
      });
    })
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.getNotification();
    }
  };

  registarBackgroundTask  = async  () => {
     const onEvent = async (taskId) => {
      await this.getNotification();
      BackgroundFetch.finish(taskId);
    }

    const onTimeout = async (taskId) => {
      BackgroundFetch.finish(taskId);
    }

    await BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true
    }, onEvent, onTimeout);
  }

  registerForPushNotificationsAsync = async () => {
    let token = '';
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      this.setState({expoPushToken: token});
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
    return token;
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
    let props = this.props;
    return (
      <NavigationContainer
        onStateChange={(state) =>
          AsyncStorage.setItem(Constants.manifest.extra.PERSISTENCE_KEY, JSON.stringify(state))
        }
        linking={Platform.OS !== 'web' ? {
          config: {
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);
            Linking.addEventListener('url', onReceiveURL);
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
              props.onNavigationPage(response.notification.request.content.data.page, response.notification.request.content.data)
              listener(response.notification.request.content.data.page);
            });
            return () => {
              Linking.removeEventListener('url', onReceiveURL);
              subscription.remove();
            };
          },
        }: {}}>
          <Stack.Navigator
            headerMode="screen">
            {Object.entries({
              ...(this.props.isLoggedIn ? userScreens : authScreens),
            }).map(([name, component]) => {
              let header = {}
              if (name === 'Home' || name === 'HomeWeb' || name === 'UsersWeb' || name === 'CBTWeb' || name === 'GroupWeb') {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : HomeHeader
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                    userImage={this.props.userImage}
                    username={this.props.username}
                    onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    inputValue={this.props.filterCnt}
                    notification={this.props.notification} />
                }
                component = this.state.viewMode === 'landscape'  ?
                  name === 'HomeWeb' ? PostScreen :
                  name === 'UsersWeb' ? UsersScreen : 
                  name === 'CBTWeb' ? CBTScreen:
                  name === 'GroupWeb' ? GroupScreen:
                  PostScreen: component;
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
                    onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    onPress={navigation.goBack}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    title={name}
                    inputValue={this.props.filterCnt}
                    notification={this.props.notification} />
                }
              }

              if (name === 'GeneralSettings' || name === 'ExamInstruction') {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                  userImage={this.props.userImage}
                  onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                  onPress={navigation.goBack}
                  modalSearch={SearchScreen}
                  modalConv={ConvScreen}
                  modalNotify={NotificatonScreen}
                  filterCnt={this.props.onHeaderFilter}
                  title={name === 'GeneralSettings' ? 'General Settings' : 
                    name === 'ExamInstruction' ? 'Exam Summary / Instruction' : name} 
                  inputValue={this.props.filterCnt}
                  notification={this.props.notification}/>
                }
              }

              if ( name === 'Favorite') {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader
                header = {
                  header: ({scene, previous, navigation }) => this.state.viewMode === 'landscape' ? <HeaderBar
                    userImage={this.props.userImage}
                    onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    onPress={() => navigation.navigate(this.state.viewMode === 'landscape' ? 'HomeWeb' : 'Home')}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    title={name}
                    inputValue={this.props.filterCnt}
                    notification={this.props.notification} /> : null
                }
              }

              if (name === 'Question' || name === 'Feed' || name === 'WriteUp' || name === 'GroupPreview' || name === 'CommentBox'
                || name === 'Exam' || name === 'MarkExam' || name === 'RoomInfo' || name === 'Search' || name === 'QuestionSolution' || name === 'ChatBox'
                || name === 'MediaPreview' || name === 'PagePreview' || name === 'SharePicker' || name === 'SelectPicker' || name === 'HashSearch') {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader
                header = {
                  header: ({scene, previous, navigation }) => this.state.viewMode === 'landscape' ?  <HeaderBar
                    userImage={this.props.userImage}
                    onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    onPress={navigation.goBack}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    title={name === 'WriteUp' ? 'Write Up' : name}
                    inputValue={this.props.filterCnt}
                    notification={this.props.notification} /> : null
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
              
              if (name === 'AddPost' || name === 'AddQuestion' || name === "AddAdvert" || name === "AddFeed" || name === "AddWriteUp" 
              || name === "AddCBT" || name === "AddChatRoom" || name === "AddGroup" || name === "AddReport" || name === "AddAppError"
              || name === 'AddGroupPost' || name === 'AddGroupQuestion' || name === 'AddGroupFeed' || name === 'AddGroupWriteUp' || name === 'AddGroupCBT') {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader;
                let title = name.startsWith('Add') ? name === "AddChatRoom" ? "Add Chat Room" :
                  name === "AddAppError" ? "App Error Report" : 
                  name.startsWith('AddGroup') ? name.split('AddGroup').join("Add Group ") : name.split('Add').join("Add ") : name;
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                    title={title}
                    userImage={this.props.userImage}
                    username={this.props.username}
                    onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    onPress={navigation.goBack}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    inputValue={this.props.filterCnt}
                    notification={this.props.notification}
                  />,
                  title
                }
              }

              if (name === 'EditPost' || name === 'EditQuestion' || name === "EditAdvert" || name === "EditFeed"
              || name === "EditWriteUp" || name === "EditCBT" || name === 'EditGroup' || name === "EditChatRoom"
              || name === "EditGroupPost" || name === "EditGroupQuestion" || name === "EditGroupFeed" || name === "EditGroupWriteUp"
              || name === "EditGroupCBT") {
                let HeaderBar = this.state.viewMode === 'landscape' ? HomeHeaderWeb : DefaultHeader;
                let title = name.startsWith('Edit') ? name === "EditChatRoom" ? "Edit Chat Room" : 
                  name.startsWith('EditGroup') ? name.split('EditGroup').join("Edit Group ") : name.split('Edit').join("Edit ") : name;
                header = {
                  header: ({scene, previous, navigation }) => <HeaderBar
                    title={title}
                    userImage={this.props.userImage}
                    username={this.props.username}
                    onNavigate={(url) => navigation.navigate(url, {userID: this.props.userID})}
                    onPress={navigation.goBack}
                    modalSearch={SearchScreen}
                    modalConv={ConvScreen}
                    modalNotify={NotificatonScreen}
                    filterCnt={this.props.onHeaderFilter}
                    inputValue={this.props.filterCnt}
                    notification={this.props.notification}
                  />,
                  title
                }
              }
              if (name === 'Logout' || name === 'NotificationPage') {
                header = {
                  header: ({scene, previous, navigation }) => null
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
      settings: state.settings,
      isAuthChecked: state.auth.isAuthChecked,
      isLoggedIn: state.auth.isLoggedIn,
      authErr: state.auth.authErr,
      userImage: state.auth.img,
      username: state.auth.username,
      userID: state.auth.userID,
      filterCnt: state.header.filterCnt,
      notification: state.header.notification,
      notificationPage: state.header.notificationPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCheckAuth: () => dispatch(actions.checkAuthInit()),
      onHeaderFilter: (filterCnt) => dispatch(actions.headerFilterInit(filterCnt)),
      onPushNotification: (limit, settings, token, platform, stateHistory) => dispatch(actions.headerPushNotificationInit(limit, settings, token, platform, stateHistory)),
      onNavigationPage: (page, cnt) => dispatch(actions.headerNotificationPage(page, cnt)),
      onProfileInfo: () => dispatch(actions.profileInfoInit())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Base);
