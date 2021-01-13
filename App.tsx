import React from 'react';
import { useFonts } from "expo-font";
import { 
  Nunito_600SemiBold, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from "@expo-google-fonts/nunito";

import {GoogleLogInConfig} from "expo-google-app-auth";

import Routes from "./src/routes";
/* import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyBaybQiB4OHXIk9-5y6fkyVYzJ4899f4Ak',
  authDomain: 'fc-art.firebaseapp.com',
  databaseURL: 'https://fc-art.firebaseio.com',
  projectId: 'fc-art',
  storageBucket: 'fc-art.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:1037610983253:android:4bb12f0e9878adf15819dc',
  measurementId: 'G-measurement-id',
};
firebase.initializeApp(firebaseConfig); */

const config: GoogleLogInConfig = {
  androidClientId: "1794468350-d2ot378ppn0jc33netp1gfiaab7n1s4m.apps.googleusercontent.com", // expo
 // androidStandaloneAppClientId: "441242396389-j1mq4np4ampuv2eb1ph1u16ofejf9una.apps.googleusercontent.com", // production
  // redirectUrl: ":/oauth2redirect/google",
  scopes: ["profile", "email"]
}

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if (!fontsLoaded)  return null;
  
  return (
    <Routes />
  );
}

export default App;
