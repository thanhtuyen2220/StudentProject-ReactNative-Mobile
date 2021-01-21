import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Backgroundheader from './Backgroundheader';
import HomeTopNav from './HomeTopNav';
import ContentContainer from './ContentContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Post from './Home/Post';
import Octicons from 'react-native-vector-icons/Octicons';
import Like from './Home/Like';

const HomeScreen = ({ navigation }) => {

  // STATE ------------------------------------------------------
  const [idUser, setIdUser] = React.useState('');
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
  const [refreshing, setRefreshing] = React.useState(false);
  const [postModal, setPostModal] = React.useState(false);
  const [post, setPost] = React.useState({
    enablePost: false,
    content: ''
  });
  const [listPost, setListPost] = React.useState([]);

  // FUNCTION--------------------------------------------------
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    ListAllPost();
    wait(700).then(() => setRefreshing(false));
  }, [refreshing]);

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
  }

  const CreateNewPost = async () => {
    try {
      let response = await fetch('http://localhost:3000/post/newpost', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUser: idUser,
          content: post.content
        })
      });
      let resJson = await response.json();
      //console.log(resJson);
      if (resJson.result == 'ok') {
        setPostModal(false);

      } else {
        alert('Somethings was wrong. Please post it again!');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const ListAllPost = () => {
    let arr = [];
    fetch(`http://localhost:3000/post/list_all_post`)
      .then((response) => response.json())
      .then((json) => {
        let data = json.data;
        data.forEach(element => {
          arr.push(element._id);
        });
      })
      .then(() => {
        setListPost(arr);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //EFFECT--------------------------------------------------------
  useEffect(() => {
    getIduser();
    return;
  }, []);

  useEffect(() => {
    if (idUser !== '') {
      getInforUser();
    }
    return;
  }, [idUser]);

  useEffect(() => {
    ListAllPost();
    return;
  }, [])


  /// MODAL-------------------------------------------
  const ModalNewPost = () => {
    return (
      <Modal
        isVisible={postModal}
        onBackdropPress={() => setPostModal(false)}
      >
        <View style={style.containPostModal}>

          <View style={style.modalHeader}>
            <TouchableOpacity
              onPress={() => { setPostModal(false) }}
            >
              <AntDesign
                name='close'
                size={28}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Create Post</Text>

            <TouchableOpacity
              disabled={!post.enablePost}
              onPress={CreateNewPost}
            >
              {
                post.enablePost ?
                  (<Text style={{ fontSize: 18, fontWeight: '600', color: 'tomato', marginRight: 5 }}>Post</Text>)
                  :
                  (<Text style={{ fontSize: 18, fontWeight: '600', color: 'gray', marginRight: 5 }}>Post</Text>)
              }
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Image
              source={{ uri: infor.avatar }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginLeft: 5
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10 }}>{infor.fullname}</Text>
          </View>
          <TextInput
            multiline={true}
            placeholder={`What's on your mind?`}
            style={{
              width: '100%',
              height: 500,
              borderWidth: 0.6,
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              borderStyle: 'dashed'
            }}
            onChangeText={val => {
              if (val.length !== 0) {
                setPost({
                  enablePost: true,
                  content: val
                })
              } else {
                setPost({
                  enablePost: false,
                  content: val
                })
              }
            }}
          />
        </View>
      </Modal>
    );
  }




  ///-----------------------------------------------_MAIN-----------------------------------------//
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={style.header}>
        <Image
          source={require('../assets/header.png')}
          style={{
            width: 120,
            height: 50,
            borderRadius: 10,
            marginLeft: 10,
          }} Z
        />
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity
            style={style.message}
            onPress={() => {
              navigation.navigate('Search')
            }}
          >
            <Feather
              size={30}
              name='search'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.message}
            onPress={() => {
              navigation.navigate('ChatScreen')
            }}
          >
            <Entypo
              size={32}
              name='message'
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          backgroundColor: 'black'
        }}
      >
        {
          refreshing ?
            (
              <ActivityIndicator
                size="large"
                color="white"
                hidesWhenStopped={true}
                animating={true}
              />
            ) : null
        }
        <View style={{ backgroundColor: 'black', width: '100%', height: 70, borderBottomWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <View style={style.post}>
            <Image
              source={{ uri: infor.avatar }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginLeft: 10
              }}
            />

            <TouchableOpacity
              style={style.postTitle}
              onPress={() => {
                setPostModal(true);
              }}
            >
              <Text style={{
                color: 'gray',
                fontSize: 16
              }}>What's on your mind?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {ModalNewPost()}
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          data={listPost}
          style={{ alignSelf: 'center', width: '100%' }}
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
                  idPost = {item}
                  idUser = {idUser}
                />
                <TouchableOpacity style={style.containerLike}
                  onPress = {()=>{
                    navigation.navigate('Comment',{
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

      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;





// -----------------------style-----------------
const style = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    width: '100%',
    height: 70,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  message: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#dddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  post: {
    width: '100%',
    backgroundColor: 'white',
    height: 65,
    borderRadius: 10,
    alignItems: 'center',
    // justifyContent:'space-evenly',
    flexDirection: 'row'
  },
  postTitle: {
    marginHorizontal: 10,
    width: '80%',
    borderWidth: 3,
    alignItems: 'center',
    borderStyle: 'dotted',
    height: '90%',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#cccc'
  },
  containPostModal: {
    backgroundColor: 'white',
    width: '100%',
    height: '90%',
    borderRadius: 10,
    padding: 5
  },
  modalHeader: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eeee',
    borderRadius: 5
  },
  containerLike: {
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
