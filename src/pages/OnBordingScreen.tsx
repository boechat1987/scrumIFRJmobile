import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Button, Icon } from "react-native-elements";

import Onboarding from "react-native-onboarding-swiper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import ExhibitionsRepository, { IExhibition } from '../repositories/exhibitions';

export default function Simple() {
	const navigation = useNavigation();
	const [firstCondition, setFirstCondition] = useState("true");
	const [secondCondition, setSecondCondition] = useState("false");
	const [thirdCondition, setThirdCondition] = useState("false");
	
	const corOriginalBackground = '#15c3d6';
	const [alteredColorBackground, setAlteredColorBackground] = useState('#15c3d6');
	
	const firstColorButton = '#14b4c9';
	const [alteredColorButton, setAlteredColorButton] = useState(firstColorButton);

	const secondColorBackground = '#321831';
	const secondColorButton = '#6C74E1';
	const thirdColorBackground = '#E7DCD3';
	const thirdColorButton = '#FEC331';
	
	const [exhibitions, setExhibitions] = useState<IExhibition[] | undefined>([]);

	useFocusEffect( () => {
        async function getColor(){
            try {
                const storedBackground = await AsyncStorage.getItem('@ColorBackground')
                const storedButton = await AsyncStorage.getItem('@ColorButton')
                if(storedBackground !== alteredColorBackground && storedButton !== alteredColorButton) {
                    await AsyncStorage.setItem('@ColorBackground', alteredColorBackground)
					await AsyncStorage.setItem('@ColorButton', alteredColorButton)
                }
            } catch(e) {
                // error reading value
            }
        }
		getColor()
		
		async function loadExhibitions() {
			const response = await ExhibitionsRepository.index();
			setExhibitions(response?.data);
		  }
		  loadExhibitions();

    })

	const onDone = () => (
		<View style={styles.container}>
			<Icon
				style={styles.iconStyle}
				name='paint-brush'
				type='font-awesome'
				size={44}
				color='white'
				onPress={onclickChangeColor}
			/>
		</View>
	);

	 const onclickChangeColor = async ()=> {
		if(firstCondition === "true"){
		setFirstCondition("false")
		setSecondCondition("true")
		setThirdCondition("false")
		setAlteredColorBackground(secondColorBackground)
		setAlteredColorButton(secondColorButton)
		await AsyncStorage.setItem('@ColorBackground', secondColorBackground)
		await AsyncStorage.setItem('@ColorButton', secondColorButton)
		}
		else if(secondCondition === "true"){
			setFirstCondition("false")
			setSecondCondition("false")
			setThirdCondition("true")
			setAlteredColorBackground(thirdColorBackground)
			setAlteredColorButton(thirdColorButton)
			await AsyncStorage.setItem('@ColorBackground', thirdColorBackground)
			await AsyncStorage.setItem('@ColorButton', thirdColorButton)
		}
		else{
			setFirstCondition("true")
			setSecondCondition("false")
			setThirdCondition("false")
			setAlteredColorBackground(corOriginalBackground)
			setAlteredColorButton(firstColorButton)
			await AsyncStorage.setItem('@ColorBackground', corOriginalBackground)
			await AsyncStorage.setItem('@ColorButton', firstColorButton)
		}
		
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Onboarding
				DoneButtonComponent={onDone}
				showDone={true}
				showNext={false}
				showSkip={false}
				pages={[
					{
						backgroundColor: "#F2F3F5",
						image: (
							<Image source={require("../images/read-icon.png")} />
						),
						title: (
							<View style={styles.container}>
								<Text style={styles.title}>Localize Exposições próximas de você {exhibitions?.length}</Text>
							</View>
						),
						subtitle: (
							<View>
								<Text style={styles.subTitle}>
									Consulte os horários de funcionamento
								</Text>
							</View>
						),
					},
					{
						backgroundColor: "#F2F3F5",
						image: (
							<Image source={require("../images/way-icon2.png")} />
						),
						title: (
							<View style={styles.container}>
								<Text style={styles.title}>
									Escolha uma exposição no mapa
								</Text>
							</View>
						),
						subtitle: (
							<View>
								<Text style={styles.subTitle}>Faça sua visita</Text>
							</View>
						),
					},
					{
						title: (				
						<Image 
						source={
							secondCondition === "true" ? require(`../images/fc-art-white.png`): require('../images/fc-art.png')
							} 
						/>
						),
						subtitle: (
							<View style={styles.container}>
								<Text style={styles.title}> Bem-vindo!</Text>
								<Button
									title={"VISITANTE"}
									buttonStyle={{
										borderRadius: 20,
										width: 120,
										height: 54,
										backgroundColor: alteredColorButton,
									}}
									onPress={() => navigation.navigate("ExhibitionsMap")}
								/>
							</View>
						),
						backgroundColor: alteredColorBackground,
						image: (
							<View style={styles.titleAccess}>
							<Button 
							title="Área do Expositor" 
							buttonStyle={{
								borderRadius: 20,
								width: 120,
								height: 54,
								backgroundColor: alteredColorButton,								
							}}
							onPress={() => navigation.navigate('LoginScreen')} 
							/>
						</View>	
						),
					},
				]}
			/>
		</SafeAreaView>
	);
};



const styles = StyleSheet.create({
	container: {
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		marginVertical: -15,
	},
	title: {
        textAlign:"center",
		marginLeft: 20,
		marginRight: 20,
		flex: 0,
		fontWeight: "bold",
		fontSize: 26,
		color: "rgba(0, 137, 165, 1)",
		padding: 1,
	},
	titleAccess: {
		textAlign:"center",
		alignItems:"center",
		marginLeft: 20,
		marginRight: 20,
		flex: 0,
		fontWeight: "bold",
		fontSize: 26,
		color: "rgba(0, 137, 165, 1)",
		padding: 0,
		marginVertical: -190,
	},
	subTitle: {
		marginLeft: 28,
		marginRight: 10,
		fontSize: 18,
		color: "rgba(0, 137, 165, 1)",
		marginBottom: 60,
		padding: 5,
	},
	iconStyle: {
		marginRight: 50,
	},
});