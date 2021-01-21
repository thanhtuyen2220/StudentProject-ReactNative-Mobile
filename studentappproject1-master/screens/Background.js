import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Dimensions,
    ImageBackground,
} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';

import LinearGradient from 'react-native-linear-gradient';

const W = Dimensions.get("window").width;

const Background = ({ style }) => {
    return (
        <ImageBackground
            source={require('../assets/project1.jpg')}
            style={{ width:'100%', height:'75%',opacity:0.6}}
        >

        </ImageBackground>
        
    );
};
export default Background;

const styles = StyleSheet.create({
  

});