import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PreChat from './Chat/PreChat';
import { firebaseApp } from '../FirebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';


const database = firebaseApp.database();

const ChattingScreen = ({navigation}) => {
    //State
    const [idUser, setIdUser] = React.useState('');
    const [data, setData] = React.useState('');
    const [listFriend, setListFriend] = React.useState([]);
    // Function ------------------------------------
    const getIduser = async () => {
        try {
            let value = await AsyncStorage.getItem('iduser');
            setIdUser(value);
            console.log('UserID:' + idUser)
        } catch (error) {
            console.log(error);
        }
    };

    const getListMessage = async () => {
        try {
            database.ref('message/' + idUser)
                .on('value', function (snapshot) {
                    console.log(snapshot);
                    setData(snapshot);
                })
        } catch (error) {

        }
    }

    //Effect------------------------------------------
    useEffect(() => {
        getIduser();
        return;
    }, []);
    useEffect(() => {
        if (idUser.length !== 0) {
            getListMessage();
        }
        return;
    }, [idUser])
    useEffect(() => {
        if (data) {
            let arr = [];
            data.forEach(element => {
                arr.push(element.key);
            });
            setListFriend(arr);
        }
        return;
    }, [data])

    useEffect(() => {
        console.log(listFriend);
        return;
    }, [listFriend])
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Chat</Text>
            </View>


            <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                data={listFriend}
                style={{ alignSelf: 'center', width: '100%' }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress = {()=>{
                            navigation.navigate('ChatRoom',{
                                idUser: idUser,
                                idFriend: item
                            });
                        }}
                    >
                        <PreChat
                            idUser={idUser}
                            idfriend={item}
                        />
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView>
    );
}
export default ChattingScreen;