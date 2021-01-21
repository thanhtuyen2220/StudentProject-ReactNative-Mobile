import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { firebaseApp } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import RNPickerSelect from 'react-native-picker-select';
import listCountry from '../../data/listCountry';
const storage = firebaseApp.storage();


const options = {
    title: 'Select Avatar',
    //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const list = listCountry.map(function (element) {
    let obj = {};
    obj['label'] = element.country;
    obj['value'] = element.country;
    return obj;
});

const UpdateInformation = ({ navigation }) => {

    // State ----------------------------------------------------

    const [data, setData] = React.useState({
        avatar: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
        country: '',
        email: '',
        fullname: '',
        gender: '',
        gpa: '',
        phone: '',
        university: ''
    });

    const [idUser, setIdUser] = React.useState('');

    // Function --------------------------------------------------
    const getIduser = async () => {
        try {
            let value = await AsyncStorage.getItem('iduser');
            setIdUser(value);
        } catch (error) {
            console.log(error);
        }
    };
    const getInforUser = async () => {
        fetch(`http://localhost:3000/information/get_user_by_id?id=${idUser}`)
            .then((response) => response.json())
            .then((json) => {
                let data = json.data;
                let image = data.avatar;
                image = image.replace('hhttps', "https");
                setData({
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
    }


    const uploadImage = (uri, mime = 'application/octet-stream') => {
        let Blob = RNFetchBlob.polyfill.Blob;
        let fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        console.log('Url ' + index + ' danhg duoc xu li:' + uri);

        return new Promise((resolve, reject) => {
            let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            let sessionID = new Date().getTime();
            let uploadBlob = null;
            let imageRef = storage.ref('avatar').child(`${sessionID}.jpg`);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime}; BASE64` });
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime });
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => console.log(error));
        })
    }
    //handle select images

    const updateAvatar = async () => {
        console.log('Update avatar');
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);
            // setData({
            //     ...data,
            //     uri:''
            // })
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {
            } else {
                // setData({
                //     ...data,
                //     uri: ''
                // })
                console.log(response.uri);
                uploadImage(response.uri)
                    .then(url => {
                        console.log(url);
                        setData({
                            ...data,
                            avatar: url
                        });
                    })
                    .catch(error => console.log(error));
            }
        });
    }

    const updateInfor = async () => {
        console.log('Update');
        try {
            let response = await fetch('http://localhost:3000/information/update', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname: data.fullname,
                    gender: data.gender,
                    phone: data.phone,
                    country: data.country,
                    university: data.university,
                    idUser: idUser
                })
            });
            let resJson = await response.json();
            console.log(resJson);
        } catch (error) {
            console.log(error);
        }
    }

    //EFFECT------------------------------------------------------
    useEffect(() => {
        getIduser();
        return;
    }, []);

    useEffect(() => {
        if (idUser !== '') {
            getInforUser();
        }
        return;
    }, [idUser])

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.containImageAndName}>
                <View style={{ flex: 4 / 10, justifyContent: 'center' }}>
                    <TouchableOpacity
                    //onPress = {updateAvatar}
                    >
                        <Image
                            source={{ uri: data.avatar }}
                            style={styles.avatar}
                        />
                        <AntDesign
                            name="pluscircle"
                            size={25}
                            color='tomato'
                            style={styles.btnAdd}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 6 / 10, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{data.fullname}</Text>
                </View>
            </View>
            <ScrollView style={{ marginTop: 20 }}>

                <View style={styles.containerElement}>
                    <Text style={styles.title}>Fullname</Text>
                    <TextInput
                        placeholder={data.fullname}
                        style={styles.textinput}
                        maxLength={35}
                        autoCorrect={false}
                        onChangeText={val => setData({
                            ...data,
                            fullname: val
                        })}
                    />
                </View>

                <View style={styles.containerElement}>
                    <Text style={styles.title}>Gender</Text>
                    <TextInput
                        placeholder={data.gender}
                        style={styles.textinput}
                        maxLength={35}
                        autoCorrect={false}
                        onChangeText={val => setData({
                            ...data,
                            gender: val
                        })}
                    />
                </View>



                <View style={styles.containerElement}>
                    <Text style={styles.title}>Phone</Text>
                    <TextInput
                        maxLength={10}
                        keyboardType='numeric'
                        placeholder={data.phone}
                        style={styles.textinput}
                        autoCorrect={false}
                        onChangeText={val => setData({
                            ...data,
                            phone: val
                        })}
                    />
                </View>

                <View style={styles.containerElement}>
                    <Text style={styles.title}>Country</Text>
                    <View
                        style={styles.textinput}
                    >
                        <RNPickerSelect
                            style={{ ...pickerSelectStyles }}
                            value={data.country}
                            onValueChange={(value) => setData({
                                ...data,
                                country: value
                            })}
                            items={
                                list
                            }
                        />
                    </View>
                </View>

                <View style={styles.containerElement}>
                    <Text style={styles.title}>University</Text>
                    <TextInput
                        maxLength={10}
                        keyboardType='numeric'
                        placeholder={data.university}
                        style={styles.textinput}
                        autoCorrect={false}
                        onChangeText={val => setData({
                            ...data,
                            university: val
                        })}
                    />
                </View>


            </ScrollView>

            <TouchableOpacity
                onPress={updateInfor}
            >
                <View
                    style={styles.btnUpdate}
                >
                    <Text style={{ fontWeight: '400', fontSize: 20, color: 'white' }}>Update</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default UpdateInformation;

const styles = StyleSheet.create({
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center',
    },
    textinput: {
        width: '70%',
        fontSize: 16,
        borderRadius: 10,
        flex: 7 / 10,
        marginRight: 10,
        alignSelf: 'center'
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        flex: 3 / 10,
        marginLeft: 20,
        alignSelf: 'center'
    },
    containerElement: {
        flexDirection: 'row',
        borderColor: 'gray',
        borderBottomWidth: 0.3,
        width: '100%',
        height: 70
    },
    containImageAndName: {
        width: '100%',
        height: 150,
        flexDirection: 'row'
    },
    btnAdd: {
        position: 'relative',
        top: -20,
        left: 95
    },
    btnUpdate: {
        alignSelf: 'center',
        backgroundColor: 'tomato',
        width: '40%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        //borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: 'white',
        color: 'black',
        // shadowOffset: { width: 0, height: 0 },
        // shadowColor: 'black',
        // shadowOpacity: 0.2,
        width: '70%',
    },
});