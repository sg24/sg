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
import BackgroundFetch from 'react-native-background-fetch';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import * as actions from './src/store/actions/index';
import SignInScreen from './src/screens/Auth/Signin';
import SignUpScreen from './src/screens/Auth/Signup';
import ForgetPasswordScreen from './src/screens/Auth/ForgetPassword';
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
import QuestionSolutionScreen from './src/screens/Home/QuestionSolution';
import MediaPreviewScreen from './src/screens/UI/MediaPreview';
import PagePreviewScreen from './src/screens/UI/PagePreview';
import SharePickerScreen from './src/screens/UI/SharePicker';
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

const Stack = createStackNavigator();

const authScreens = {
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgetPassword: ForgetPasswordScreen
};

const userScreens = {
  HomeWeb: TopTab,
  Favorite: FavoriteTopTab,
  UsersWeb: UsersScreen, 
  Question: QuestionScreen,
  Feed: FeedScreen,
  WriteUp: WriteUpScreen,
  CommentBox: CommentBoxScreen,
  QuestionSolution : QuestionSolutionScreen,
  MediaPreview: MediaPreviewScreen,
  PagePreview: PagePreviewScreen,
  SharePicker: SharePickerScreen,
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
  HashSearch: HashSearchScreen
};

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
      isLoggedIn: false,
      expoPushToken: ''
    }
  }
  componentDidMount() {
    this.props.onCheckAuth();
    this.registarBackgroundTask();
    this.props.onPushNotification('ExponentPushToken[jP4U8kP5i80OQyPKKUi0PI]', Platform.OS)
    Dimensions.addEventListener('change', this.updateHeader);
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn && !this.state.isLoggedIn) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: true
        }),
      });
      this.registerForPushNotificationsAsync().then(token => {
        this.props.onPushNotification(token, Platform.OS);
        console.log(token)
      });
      this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
      this.subscription = Notifications.addPushTokenListener(this.registerForPushNotificationsAsync);
      this.setState({isLoggedIn: true})
    }
  }

  componentWillUnmount() {
      if (this.subscription && this.responseListener) {
        this.subscription.remove();
        this.responseListener.remove()
      }
  }

  updateHeader = (dims) => {
    this.setState({
        viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
    })
  }

  registarBackgroundTask = () => {
    BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true
    }, () => {
      console.log("[js] Received background-fetch event");
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          console.log(this.state.expoPushToken);
          (async () => {
            let response = await axios.post('/users', {token: this.state.expoPushToken}, {headers: {'data-categ':'getNotification'}});
            let cnt = response.data ? response.data : {};
            let notification = cnt.notification;
            let showedNotification = await AsyncStorage.getItem('notification');
            await AsyncStorage.setItem('notification', JSON.stringify(notification));
            if (showedNotification) {
              showedNotification = JSON.parse(showedNotification);
              for (let page in showedNotification) {
                let notifyItem = notification[page];
                let showedItem = showedNotification[page];
                if (showedItem && notifyItem && showedItem.length > 0 && notifyItem.length > 0) {
                  let updatePageItem = notifyItem.filter(pageItem => showedItem.filter(item => item.userID !== pageItem.userID).length > 0)
                  notification[page] = updatePageItem;
                }
              }
            }
           for (let page in notification) {
              for (let pageItem of notification[page]) {
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: `${pageItem.username} created new ${page.toLocaleUpperCase()}`,
                    body: "",
                    
                  },
                  trigger: {
                    seconds: 10,
                    channelId: 'default',
                  },
                });
              }
           }
          })();
        }
      });
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });
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
    
    return (
      <NavigationContainer>
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
                    inputValue={this.props.filterCnt} />
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
                    inputValue={this.props.filterCnt} />
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
                  inputValue={this.props.filterCnt}/>
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
                    inputValue={this.props.filterCnt} /> : null
                }
              }

              if (name === 'Question' || name === 'Feed' || name === 'WriteUp' || name === 'GroupPreview' || name === 'CommentBox'
                || name === 'Exam' || name === 'MarkExam' || name === 'RoomInfo' || name === 'Search' || name === 'QuestionSolution'
                || name === 'MediaPreview' || name === 'PagePreview' || name === 'SharePicker' || name === 'HashSearch') {
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
                    inputValue={this.props.filterCnt} /> : null
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
                  />,
                  title
                }
              }
              if (name === 'Logout') {
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
      isAuthChecked: state.auth.isAuthChecked,
      isLoggedIn: state.auth.isLoggedIn,
      authErr: state.auth.authErr,
      userImage: state.auth.img,
      username: state.auth.username,
      userID: state.auth.userID,
      filterCnt: state.header.filterCnt,
      notification: state.header.notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCheckAuth: () => dispatch(actions.checkAuthInit()),
      onHeaderFilter: (filterCnt) => dispatch(actions.headerFilterInit(filterCnt)),
      onPushNotification: (token, platform) => dispatch(actions.headerPushNotificationInit(token, platform))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Base);
