import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Stories from './Stories';

const { width } = Dimensions.get('window');


const HomeTopNav = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topWrapper}>
                <View style={styles.topLeftWrapper}>
                    <Icon
                        style={styles.icons}
                        name="camera"
                        size={30}
                        color="black"
                    />
                </View>

                <Image
                    source={require('../assets/logon.png')}
                    style={styles.Logo}
                    resizeMode="contain"
                />

                <View style={styles.topRightWrapper}>

                    <Icon
                        style={styles.icons}
                        name="edit"
                        size={30}
                        color="black"
                    />
                </View>
            </View>
            
        </SafeAreaView>
    );
};
export default HomeTopNav;
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
    },
    topWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    topLeftWrapper: {},
    topRightWrapper: {
        flexDirection: 'row',
    },
    Logo: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: -45,
        left: width / 2 - 50,
    },
    icons: {
        marginHorizontal: 10,
        paddingTop:10,
    },
});