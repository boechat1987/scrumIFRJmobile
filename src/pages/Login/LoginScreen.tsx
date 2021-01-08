import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, SocialIcon } from "react-native-elements";
import { GoogleSigninButton } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function LoginMap() {
   const navigation = useNavigation();
   const [ email, setEmail ] = useState("");
   const [ password, setPassword ] = useState("");
   const [alteredColorBackground, setAlteredColorBackground] = useState('');
   const [alteredColorButton, setAlteredColorButton] = useState('');
   const hookedStyles = {
    backgroundColor: alteredColorBackground,
  };

      useFocusEffect( () => {
        async function getColor(){
            try {
                const storedBackground = await AsyncStorage.getItem('@ColorBackground')
                const storedButton = await AsyncStorage.getItem('@ColorButton')
                if(storedBackground !== null && storedButton !== null) {
                    setAlteredColorBackground(storedBackground);
                    setAlteredColorButton(storedButton);
                }
            } catch(e) {
                // error reading value
            }
        }
        getColor()
    })

   const handleLogin = ()=>{
    if (email !== "" && password !== "")
    {   
        api.post(`/users/auth`, {
          email: email,
          password: password
        })
        .then(({ data }) => {
         
          navigation.navigate("ExhibitionsMap")
        })
        .catch(error=>{
        return alert("Ocorreu um erro, favor verificar se email e senha estão corretos")
        });
    }
             /* navigation.navigate("OnBoardingScreen")  */
   }
    return(
        <View style={[styles.container, hookedStyles]}>
        <Text style={styles.logo}>FC ART</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
            />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Senha..." 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPassword(text)}
            />
        </View>
        {/* <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </TouchableOpacity> */}
        
                                <Button 
								title={"ENTRAR"} 
								buttonStyle={{
									width:250,
                                    /* backgroundColor:"#fb5b5a", */
                                    backgroundColor: alteredColorButton,
                                    borderRadius:25,
                                    height:50,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    marginTop:10,
                                    marginBottom:10
								}}
								onPress={() => handleLogin()} 
								/>
                <Button 
								title={"Não possuo cadastro"} 
								buttonStyle={{
									width:250,
                                    backgroundColor: alteredColorBackground,
                                    height:50,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    marginTop:10,
                                    marginBottom:10
								}}
								onPress={() => navigation.navigate("RegisterScreen")} 
								/>
                                
                <Text style={styles.baseText}>Ou Continuar com Google</Text>
                
                <SocialIcon
                  /* title='Continuar com o Google' */
                  type='google'
                  onPress={() => {
                    navigation.navigate("GoogleLogin")
                    }}
                />
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    baseText: {
      color: "white",
      fontWeight:"bold",
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#14b4c9",
      borderRadius:25,
      height:50,
      marginBottom:10,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"white",
      fontSize:15
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });