import React, { useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import Octicons from 'react-native-vector-icons/Octicons';
import Post from '../Home/Post';
import Like from '../Home/Like';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { firebaseApp } from '../../FirebaseConfig';
const database = firebaseApp.database();


const InforUser = ({ navigation, route }) => {
    const { idUser } = route.params;
    // State ----------------------------------------------------
    const [infor, setInfor] = React.useState({
        avatar: 'https://macmillan.yale.edu/sites/default/files/pictures/picture-218-1440186731.jpg',
        country: '',
        email: '',
        fullname: '',
        gender: '',
        gpa: '',
        phone: '',
        university: ''
    });
    const [inforModal, setInforModal] = React.useState(false);
    const [listPost, setListPost] = React.useState([]);
    const [yourID, setYourID] = React.useState('');

    // FUNCTION -----------------------------------------------------

    const ListUserPost = () => {
        if (idUser.length !== 0) {
            let arr = [];
            fetch(`http://localhost:3000/post/list_user_post?idUser=${idUser}`)
                .then((response) => response.json())
                .then((json) => {
                    let data = json.data;
                    data.forEach(element => {
                        arr.push(element._id);
                    });
                })
                .then(() => {
                    setListPost(arr);
                    console.log(arr);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const getIduser = async () => {
        try {
            let value = await AsyncStorage.getItem('iduser');
            setYourID(value);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async () => {
        await database.ref('message/' + yourID + '/' + idUser)
            .push({
                from: yourID,
                content: 'Hello!',
            });
        await database.ref('message/' + idUser + '/' + yourID)
            .push({
                from: yourID,
                content: 'Hello!',
            });
        navigation.navigate('ChatScreen');
    }
    //EFFECT------------------------------------------------------
    useEffect(() => {
        fetch(`http://localhost:3000/information/get_user_by_id?id=${idUser}`)
            .then((response) => response.json())
            .then((json) => {
                //console.log(json);
                let data = json.data;
                let image = data.avatar;
                image = image.replace('hhttps', "https");
                setInfor({
                    avatar: image,
                    country: data.country,
                    email: data.email,
                    fullname: data.fullname,
                    gender: data.gender,
                    gpa: data.gpa,
                    phone: data.phone,
                    university: data.university
                })
            })
            .catch((error) => {
                console.error(error);
            });
        return;
    }, []);

    useEffect(() => {
        ListUserPost();
        getIduser();
        return;
    }, [])



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} >
            <ScrollView>
                <View style={{
                    alignItems: 'center'
                }}>
                    <View style={style.backgroundUser} />
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '90%',
                            height: 250,
                            marginTop: 40,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            borderRadius: 10,
                            // alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                flex: 1 / 3,
                                width: '100%',
                                height: '100%',
                                // alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                onPress={sendMessage}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40,
                                    backgroundColor: '#eee',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 15
                                }}
                            >
                                <Feather
                                    name='message-circle'
                                    size={30}
                                />
                            </TouchableOpacity>
                            <Image
                                source={{ uri: infor.avatar }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    top: -90,
                                    borderWidth: 0.25,
                                    borderColor: 'gray',
                                    alignSelf: 'center'
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flex: 2 / 3,
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <View style={{
                                flex: 4 / 10,
                                alignItems: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: 19,
                                        fontWeight: '700'
                                    }}
                                >
                                    {infor.fullname}
                                </Text>
                                <Text
                                    style={{
                                        color: 'gray',
                                        fontSize: 16,
                                        marginTop: 5
                                    }}
                                >
                                    {infor.email}
                                </Text>
                            </View>

                            <View style={{
                                flex: 4 / 10,
                                flexDirection: 'row'
                            }}>
                                <View
                                    style={{
                                        flex: 1 / 2,
                                        alignItems: 'center',
                                        borderRightWidth: 0.8,
                                        borderColor: '#dddd'
                                    }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: '600' }} >GPA</Text>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 5, color: 'red' }}>{infor.gpa}</Text>
                                </View>

                                <View
                                    style={{
                                        flex: 1 / 2,
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Country</Text>
                                    <Text t style={{ fontSize: 16, fontWeight: '600', marginTop: 5, color: 'green' }}>{infor.country}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1 / 5, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => setInforModal(true)}
                                >
                                    <Text style={{ fontSize: 16, color: 'gray' }}>More information...  </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Modal
                        isVisible={inforModal}
                        onBackdropPress={() => setInforModal(false)}
                    >
                        <View
                            style={{
                                width: '94%',
                                height: 400,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderRadius: 15,
                                padding: 5
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '600', alignSelf: 'center', marginVertical: 15 }}>Information</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>Fullname:</Text>
                                <Text style={style.text1}>{infor.fullname}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>Email:</Text>
                                <Text style={style.text1}>{infor.email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>Country:</Text>
                                <Text style={style.text1}>{infor.country}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>Gender:</Text>
                                <Text style={style.text1}>{infor.gender}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>Phone:</Text>
                                <Text style={style.text1}>{infor.phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>University:</Text>
                                <Text style={style.text1}>{infor.university}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={style.text}>GPA:</Text>
                                <Text style={style.text1}>{infor.gpa}</Text>
                            </View>
                        </View>
                    </Modal>


                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item}
                        data={listPost}
                        style={{ alignSelf: 'center', width: '100%', marginTop: 5 }}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.2,
                                    padding: 5,
                                    marginBottom: 5
                                }}
                            >
                                <Post
                                    idPost={item}
                                />
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        width: '100%',
                                        height: 50,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Like
                                        idPost={item}
                                        idUser={idUser}
                                    />
                                    <TouchableOpacity style={style.containerLike}
                                        onPress={() => {
                                            navigation.navigate('Comment', {
                                                idPost: item,
                                                idUser: idUser,
                                                avatar: infor.avatar,
                                                fullname: infor.fullname
                                            });
                                        }}
                                    >
                                        <Octicons
                                            name='comment'
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default InforUser;

const W = Dimensions.get('window').width;
const style = StyleSheet.create({
    backgroundUser: {
        backgroundColor: 'tomato',
        width: 1000,
        height: 1000,
        borderRadius: 1000,
        position: 'absolute',
        top: -(1000 - W / 2),
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        marginVertical: 5,
        marginLeft: 10
    },
    text1: {
        fontSize: 15,
        marginVertical: 5,
        marginLeft: 10
    },
    containerLike: {
        flex: 1 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})