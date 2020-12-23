import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import api from '../../services/api';

export default function RegisterMap() {
  const navigation = useNavigation();
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleRegister = ()=>{
    if (email !== "" && name !== "" && password !== "")
    {   
        api.post(`/users`, {
          name: name,
          email: email,
          password: password
        })
        .then(({ data }) => {
          
          navigation.navigate("LoginScreen")
        })
        .catch(error=>{
        return alert(`Email já está cadastrado`)
        });
    }
            /* navigation.navigate("OnBoardingScreen")  */
  }
  return(
    <View style={styles.container}>
      <Icon
				style={styles.iconStyle}
				name='user-circle-o'
				type='font-awesome'
				size={44}
				color='white'
			/>
        <Text style={styles.logo}>FC ART</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Nome" 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setName(text)}
            />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
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
                <Button 
								title={"Cadastrar"} 
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
								onPress={() => handleRegister()} 
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
    },
    iconStyle: {
      alignItems:"center",
    },
  });


/* import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Container, Content, Form, Item, Input, Text } from 'native-base';
import { Button } from "react-native-elements";  
return( <SafeAreaView style={{ flex: 1 }}>
        <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Name" />
            </Item>
            <Item>
              <Input placeholder="Email" />
            </Item>
            <Item last>
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
            alert("Registrado")
            navigation.navigate("OnBoardingScreen")
        }}
        >
          </Button>
        </Content>
      </Container>
    </SafeAreaView>
   ) */