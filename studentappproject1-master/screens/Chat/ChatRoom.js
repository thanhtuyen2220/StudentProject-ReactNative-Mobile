import React, { useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    KeyboardAvoidingView,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import MyMessage from './MyMessage';
import FriendMessage from './FriendMessage';
import { firebaseApp } from '../../FirebaseConfig.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const database = firebaseApp.database();

const ChatRoom = ({ navigation, route }) => {
    const { idUser } = route.params;
    const { idFriend } = route.params;
    const [listMessage, setListMessage] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [friend, setFriend] = React.useState({
        fullname: '',
        avatar: '',
    });
    const [data, setData] = React.useState();

    const getMessage = () => {
        database.ref('message/' + idUser + '/' + idFriend)
            .on('value', function (snapshot) {
                setData(snapshot);
            })
    }
    useEffect(() => {
        getMessage();
    }, []);

    useEffect(() => {
        if (data) {
            let arr = [];
            data.forEach(element => {
                arr.push(element.val());
            });
            setListMessage(arr);
        }
        return;
    }, [data]);

    const getInfor = () => {
        fetch(`http://localhost:3000/information/get_user_by_id?id=${idFriend}`)
            .then((response) => response.json())
            .then((json) => {
                let data = json.data;
                setFriend({
                    avatar: data.avatar,
                    fullname: data.fullname
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const sendMessage = async () => {
        if (message.length !== 0) {
            await database.ref('message/' + idUser + '/' + idFriend)
                .push({
                    from: idUser,
                    content: message
                })
            await database.ref('message/' + idFriend + '/' + idUser)
                .push({
                    from: idUser,
                    content: message
                })
            setMessage('');
        }
    }

    useEffect(() => {
        getInfor();
        return;
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: 60,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={{ uri: friend.avatar }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>{friend.fullname}</Text>
                </View>

                <FlatList
                    style={{
                        backgroundColor: 'white',
                        marginTop: 10
                    }}
                    keyExtractor={item => item}
                    data={listMessage}
                    renderItem={({ item }) =>
                        item.from == idUser ?
                            (
                                <MyMessage
                                    content={item.content}
                                />
                            )
                            :
                            (
                                <FriendMessage
                                    content={item.content}
                                />
                            )

                    }
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginVertical: 10
                    }}
                >
                    <TextInput
                        value={message}
                        style={{
                            justifyContent: 'flex-start',
                            paddingHorizontal: 20,
                            width: '80%',
                            height: 40,
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            borderRadius: 20,
                            fontSize: 15,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                        }}

                        autoCorrect={false}
                        placeholder='Aa...'
                        returnKeyType='send'
                        blurOnSubmit={true}
                        onChangeText={val => {
                            setMessage(val);
                        }}
                        onSubmitEditing={val => {
                            sendMessage();
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            width: 40, height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={sendMessage}
                    >
                        <MaterialCommunityIcons
                            name='send-circle'
                            size={40}
                            color='tomato'
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
export default ChatRoom;