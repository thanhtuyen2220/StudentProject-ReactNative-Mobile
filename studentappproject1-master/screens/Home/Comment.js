import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    FlatList,
    Image
} from 'react-native';
import { View } from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebaseApp } from '../../FirebaseConfig';

const database = firebaseApp.database();


const Comment = ({ navigation, route }) => {
    const { idPost } = route.params;
    const { idUser } = route.params;
    const { avatar } = route.params;
    const { fullname } = route.params;

    const [content, setContent] = React.useState('');
    const [listCmt, setListCmt] = React.useState([]);
    const [data, setData] = React.useState();

    const sendComment = async () => {
        database.ref('post/' + idPost + '/comment')
            .push({
                idUser: idUser,
                comment: content,
                avatar: avatar,
                fullname: fullname
            })
        setContent('');
    }

    const getListComment = async () => {
        database.ref('post/' + idPost + '/comment')
            .on('value', function (snapshot) {
                if (snapshot.val() !== null) {
                    setData(snapshot);
                }
            })
    }

    const pushDataToList = async () => {
        if (data == undefined) {
            console.log('khong lam');
        } else {
            let arr = [];
            await data.forEach(function (snap) {
                let value = snap.val();
                arr.push(value);
            });
            setListCmt(arr);
        }
    }
    useEffect(() => {
        getListComment();
        return;
    }, []);

    useEffect(() => {
        pushDataToList();
        return;
    }, [data]);

    useEffect(() => {
        console.log(listCmt);
        return;
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 50,
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons
                        name='ios-arrow-back'
                        size={30}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Comment</Text>
                <View></View>
            </View>

            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}
            >
                <FlatList
                    style={{
                        backgroundColor: 'white',
                        marginTop: 5
                    }}
                    keyExtractor={item => item}
                    data={listCmt}
                    renderItem={({ item }) =>
                        <View style={{ width: '100%', padding: 10, marginBottom: 10 }}>
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Image
                                    source={{ uri: item.avatar }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50
                                    }}
                                />
                                <View style = {{backgroundColor:'#eeeeee',borderRadius:10, maxWidth:'80%',padding:5}}>
                                    <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 10 }}>{item.fullname}</Text>
                                    <Text style={{ fontSize: 14, marginLeft: 10,marginTop:5 }}>{item.comment}</Text>
                                </View>
                            </View>
                        </View>
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
                        value={content}
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
                            setContent(val);
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            width: 40, height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={sendComment}
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
export default Comment;