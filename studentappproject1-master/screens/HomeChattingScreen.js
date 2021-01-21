import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ChattingTopNav from './ChattingTopNav'
import SearchBarChat from './SearchBarChat';
import ContentContainerforChat from './ContentContainerforChat';
import { useNavigation, NavigationContainer } from '@react-navigation/native';



const HomeChattingScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <SearchBarChat />
            <ContentContainerforChat />
        </View>
    );
};
export default HomeChattingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
