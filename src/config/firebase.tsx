import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBaybQiB4OHXIk9-5y6fkyVYzJ4899f4Ak',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'fc-art',
  storageBucket: 'fc-art.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:1037610983253:android:4bb12f0e9878adf15819dc',
  measurementId: 'G-measurement-id',
};
export default firebaseConfig;
/* firebase.initializeApp(firebaseConfig); */