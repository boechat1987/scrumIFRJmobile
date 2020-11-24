import {StatusBar} from 'expo-status-bar'
import React from 'react';
import { StyleSheet, Text, View , Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Landing() {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>Imagem PNG</Text>
            <StatusBar style="auto"/>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
    },
});