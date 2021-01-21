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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


const W=Dimensions.get("window").width;

const Backgroundheader=({style}) =>{
        return (
            <LinearGradient
            start={{x:0,y:0}}
            end={{x:1,y:0}}
            style={[styles.linearGradient,style]}
            colors={['#7bed9f', '#2ed573','#487eb0']}
            >
            <View style={styles.lines}/>
                <View style={[styles.lines,{top:130,left:-160}]} />
                <View style={[styles.lines,{top:160,left:0}]} />

            </LinearGradient>
        );
};
export default Backgroundheader;

const styles=StyleSheet.create({
    linearGradient: {
        height:(W*4)/7,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
    },
    lines: {
        position:'absolute',
        width:W,
        height:80, 
        top:100,
        left:-300,
        backgroundColor:'rgba(255,255,255,0.1)',
        transform:[{
            rotate:'35deg',
        },
    ],
        borderRadius:60,
    },
});