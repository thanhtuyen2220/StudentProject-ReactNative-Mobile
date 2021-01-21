import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Dimensions,Image,TouchableOpacity } from 'react-native';
import Backgroundheader from './Backgroundheader';
import backgroundheader from './Backgroundheader';
import { Avatar, Title, Caption, Paragraph } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ContentContainerforProfile from './ContentContainerforProfile'


const ProfileScreen = () => {
    return ( 
            <View style={styles.userInfo}>
                <Avatar.Image
                    source={{
                    uri: 'https://revelogue.com/wp-content/uploads/2020/02/Hinh-anh-cua-emma-watson-e1581709329931.jpg'
                    }}
                    size={150}
                    style={{ alignSelf: 'center',marginTop:40}}
                />
            <View style={{alignItems:'center',alignSelf:'center' }}>
                <Title style={styles.title}>Emma Watson</Title>
            </View>

            <View style={styles.button}>
                <Button
                    icon={
                        <Icon
                            name="facebook-messenger"
                            size={20}
                            color="white"
                        />
                    }
                    iconLeft
                    title=" Texting for Qoobee Trinh"
                    type="solid"
                    borderRadius={60}
                    
                />

                <Button
                    title=" See more ....."
                    type="outline"
                />
                
            </View>
                    <ContentContainerforProfile/>
            </View>
       
        
    );
};
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F2'
    },
    bg: {
        position: 'absolute',
        width: Dimensions.get("window").width,
    },
    userImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 135,
        height: 135
    },
    title: {
        fontSize: 30,
        marginTop: 3,
        fontWeight: 'bold',
    },

    button: {
        alignItems: 'center',
        marginTop: 10,
        flexDirection:'row',
        borderBottomColor:'#ff4757',
        marginLeft:10,
        justifyContent:'space-between',
    },
    follow: {
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
