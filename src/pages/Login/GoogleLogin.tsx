import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {GoogleLogInConfig} from "expo-google-app-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from "@react-navigation/native"

export default function GoogleLogin() {
    const [accessToken, setAccessToken] = useState<string | null>()
    const navigation = useNavigation();
    
    useFocusEffect( () => {
        async function getData(){
            try {
                const storedAccessToken = await AsyncStorage.getItem('@accessToken')
                const storedUser = await AsyncStorage.getItem('@user')
                if(storedAccessToken !== null && storedUser !== null) {
                    setAccessToken(storedAccessToken);
                    console.log(storedUser)
                    console.log(storedAccessToken)
                    /* navigation.navigate('GoogleLogin'); */
                }
                else{
                    handleSignIn()
                }
            } catch(e) {
                // error reading value
            }
        }

        getData()
    })

    const config: GoogleLogInConfig = {
        androidClientId: "1794468350-d2ot378ppn0jc33netp1gfiaab7n1s4m.apps.googleusercontent.com", // expo
        //androidStandaloneAppClientId: "441242396389-j1mq4np4ampuv2eb1ph1u16ofejf9una.apps.googleusercontent.com", // production
        // redirectUrl: "com.notoriousigor.lettura:/oauth2redirect/google",
        scopes: ["profile", "email"]
    }

    async function handleSignOut() {
        const storedAccessToken = await AsyncStorage.getItem('@accessToken');
        
        try {
            // @ts-ignore
            await Google.logOutAsync({accessToken: storedAccessToken, ...config})
            setAccessToken(null)
            /* setUser(null) */
            await AsyncStorage.removeItem('@accessToken')
            await AsyncStorage.removeItem('@user')
            navigation.navigate('LoginScreen')
        } catch (e) {
            console.log(e)
            return {error: true}
        }
    }

    async function handleSignIn() {
        try {
            // @ts-ignore
            const {type, user, accessToken} = await Google.logInAsync(config);

            if (type === 'success') {
                await AsyncStorage.setItem('@accessToken', accessToken)
                await AsyncStorage.setItem('@user', JSON.stringify(user))
                navigation.navigate('ExhibitionsMap')
                console.log(accessToken, "aaa")
                return accessToken
            } else {
                return {cancelled: true}
            }
        }catch (e) {
            return { error: true }
        }
    }

        return (
            <><View style={styles.container}>
                {/* <Button onPress={handleSignIn} title="LOG IN" /> */}
                <Text>Aguarde...</Text>
            </View>
               {accessToken? <View style={styles.container}>
                    <Button onPress={handleSignOut} title="LOG OUT" />
        </View> : null}</>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
