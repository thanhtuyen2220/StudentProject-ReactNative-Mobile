import React from 'react';
import {
  View, Text, Button, StyleSheet, TouchableOpacity, Flatform, TextInput, StatusBar,
  Dimensions
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { firebaseApp } from '../FirebaseConfig';
import AsyncStorage from '@react-native-community/async-storage';

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    errorSignIn: '',
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      });
    }
  }
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const storageID = async (val) => {
    try {
      await AsyncStorage.setItem('iduser', val)
    } catch (error) {
      console.log(error);
    }
  }

  const SignInAccount = async () => {
    console.log('Pressed Sign In');
    //http://localhost:3000/register/createuser
    console.log(data.email);
    console.log(data.password);
    try {
      let response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      let resJson = await response.json();
      console.log(resJson);
      if (resJson.result == 'ok') {
        try {
          await storageID(resJson.id_user);
        } catch (error) {

        }
        navigation.navigate('HomeDrawer');
      } else {
        setData({
          ...data,
          errorSignIn: resJson.message
        })
      }

    } catch (error) {
      console.log(error);
    }
    // navigation.navigate('HomeDrawer');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}

      >
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text
          style={
            (styles.text_footer,
            {
              marginTop: 35,
            })
          }>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput2}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ?
              <Feather name="eye-off" color="green" size={20} />
              :
              <Feather name="eye" color="green" size={20} />
            }
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={styles.errorLogin}>{data.errorSignIn}</Text>
        </View>

        <View style={styles.button}>

          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={SignInAccount}
          >

            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={styles.textSign, { color: '#fff' }}>Sign In</Text>
            </LinearGradient>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[styles.signIn, {
              borderColor: '#009387',
              borderWidth: 1,
              marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
              color: '#009387'
            }]}>Sign Up</Text>
          </TouchableOpacity>

        </View>


      </Animatable.View>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -10,
    paddingLeft: 15,
    color: '#05375a',
  },
  textInput2: {
    flex: 1,
    marginTop: -10,
    paddingLeft: 15,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorLogin: {
    fontSize: 14,
    color: 'red'
  },
});
