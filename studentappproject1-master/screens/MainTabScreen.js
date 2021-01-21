import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import LoginScreen from './LoginScreen';
import ChattingScreen from './ChattingScreen';
import ProfileScreen from './ProfileScreen';
import ResultSearch from './Search/ResultSearch';
import InforUser from './Search/InforUser';
import UpdateInformation from './ProfileUser/UpdateInformation';
import Comment from './Home/Comment';
import ChatScreen from './ChatScreen';
import ChatRoom from './Chat/ChatRoom';
//import TopRatingScreen from './TopRatingScreen';
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();


const SearchStack = createStackNavigator();
function SearchScreenStack() {
  return (
    <SearchStack.Navigator
      headerMode='none'
    >
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen name="ResultSearch" component={ResultSearch} />
      <SearchStack.Screen name="InforUser" component={InforUser} />
    </SearchStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileScreenStack() {
  return (
    <ProfileStack.Navigator
      headerMode='none'
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="UpdateInformation" component={UpdateInformation} />
      <ProfileStack.Screen name="Comment" component={Comment} />
    </ProfileStack.Navigator>
  );
}

const ChatStack = createStackNavigator();
function ChatScreenStack() {
  return (
    <ChatStack.Navigator
      headerMode='none'
    >
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
    </ChatStack.Navigator>
  );
}



const Tab = createBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}>
    <Tab.Screen
      name="HomeScreen"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="home-account" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreenStack}
      options={{
        tabBarLabel: 'Search',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="search-web" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="ChatScreen"
      component={ChatScreenStack}
      options={{
        tabBarLabel: 'Chatting',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="message-outline" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreenStack}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#697fad',
        tabBarIcon: ({ color }) => (
          <Icon name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    headerMode='none'
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
    />
    <HomeStack.Screen
      name="Comment"
      component={Comment}
    />
  </HomeStack.Navigator>
);
const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <LoginStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button
            name="md-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </LoginStack.Navigator>
);
