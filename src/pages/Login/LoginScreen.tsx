import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button } from "react-native-elements";
import api from '../../services/api';

export default function LoginMap() {
    const navigation = useNavigation();
   const [ email, setEmail ] = useState("");
   const [ password, setPassword ] = useState("");

   const handleLogin = ()=>{
    if (email !== "" && password !== "")
    {   
        api.post(`/users/auth`, {
          email: email,
          password: password
        })
        .then(({ data }) => {
          console.log(data)
          navigation.navigate("ExhibitionsMap")
        })
        .catch(error=>{
        return alert("Ocorreu um erro, favor verificar se email e senha estão corretos")
        });
    }
             /* navigation.navigate("OnBoardingScreen")  */
   }
    return(
<View style={styles.container}>
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
        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </TouchableOpacity>
                                <Button 
								title={"ENTRAR"} 
								buttonStyle={{
									width:250,
                                    backgroundColor:"#fb5b5a",
                                    borderRadius:25,
                                    height:50,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    marginTop:20,
                                    marginBottom:10
								}}
								onPress={() => handleLogin()} 
								/>
                                <Button 
								title={"Não possuo cadastro"} 
								buttonStyle={{
									width:250,
                                    backgroundColor:"#14b4c9",
                                    height:50,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    marginTop:20,
                                    marginBottom:10
								}}
								onPress={() => navigation.navigate("RegisterScreen")} 
								/>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#14b4c9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#15c3d6",
      borderRadius:25,
      height:50,
      marginBottom:20,
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



  /* import { SafeAreaView } from "react-native"; */
/* import { Container, Content, Form, Item, Input, Text } from 'native-base';
import { Button } from "react-native-elements"; */

/* export default function LoginMap() {
   const navigation = useNavigation();
   const [ email, setEmail ] = useState("");
   const [ password, setPassword ] = useState("");

   const handleLogin = ()=>{
            alert("Logado")
             navigation.navigate("OnBoardingScreen") 
   }
   return( <SafeAreaView style={{ flex: 1 }}>
        <Container>
        <Content>
          <Form >
            <Item rounded>
              <Input
              value={email}
              onChangeText={(text) => setEmail(text)} 
              placeholder="Email" />
            </Item>
            <Item rounded last>
              <Input placeholder="Senha" />
            </Item>
          </Form>
          <Button
          title="CONFIRMAR"
          buttonStyle={{
            marginTop: 10,
            borderRadius: 20,
            width: 120,
            height: 54,
            backgroundColor: "#14b4c9",    
        }}
        onPress={() => 
            {
            handleLogin;
        }}
        >
          </Button>
        </Content>
      </Container>
    </SafeAreaView>
   )
} */