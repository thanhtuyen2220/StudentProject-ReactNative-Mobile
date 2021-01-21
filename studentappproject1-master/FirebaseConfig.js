import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAwslblx05a_ADOul4JsjxDiQMeuebqApY",
    authDomain: "studentappproject-314ef.firebaseapp.com",
    databaseURL: "https://studentappproject-314ef.firebaseio.com",
    projectId: "studentappproject-314ef",
    storageBucket: "studentappproject-314ef.appspot.com",
    messagingSenderId: "12546311399",
    appId: "1:12546311399:web:acb5f92418a86a54f30e42",
    measurementId: "G-B008PVGGRQ"
  };
export const firebaseApp = firebase.initializeApp(firebaseConfig);
