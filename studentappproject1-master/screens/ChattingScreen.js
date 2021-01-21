import React from 'react';
import {View, Text, Button, StyleSheet,FlatList, TabBarIOS} from 'react-native';
import ChattingTopNav from './ChattingTopNav'
import {useNavigation,NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ContentChattingScreen from './ContentChattingScreen';
import HomeChattingScreen from './HomeChattingScreen';

const Stack=createStackNavigator();



const ChattingScreen = () => {
  return (
      <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="HomeChattingScreen">
          <Stack.Screen name="Chat" 
              component={HomeChattingScreen}
         />
          <Stack.Screen name="ContentChattingScreen" 
              component={ContentChattingScreen}              
            />
        </Stack.Navigator>
        
      </NavigationContainer>
  );
};
export default ChattingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
