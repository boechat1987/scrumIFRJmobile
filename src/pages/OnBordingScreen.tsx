import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView, Image } from "react-native";
import React from "react";
import { Button, Icon } from "react-native-elements";

import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const Simple: React.FC = () => {
	const navigation = useNavigation();

	const onDone = () => (
		<View style={styles.container}>
			<Icon
				style={styles.iconStyle}
				name='check-circle'
				type='font-awesome'
				size={44}
				color='white'
				onPress={() => navigation.navigate("ExhibitionsMap")}
			/>
		</View>
	);

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
								<Text style={styles.title}>Localize Exposições próximas de você</Text>
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
							<View style={styles.container}>
								<Button 
								title="ACESSO RESTRITO" 
								buttonStyle={{
									marginBottom: 10,
									borderRadius: 20,
									width: 120,
									height: 54,
									backgroundColor: "#14b4c9",
								}}
								onPress={() => navigation.navigate('GoogleLogin')} 
								/>

								<Button
									title={"ENTRAR"}
									buttonStyle={{
										borderRadius: 20,
										width: 120,
										height: 54,
										backgroundColor: "#14b4c9",
									}}
									onPress={() => navigation.navigate("ExhibitionsMap")}
								/>
							</View>
						),
						subtitle: "",
						backgroundColor: "#15c3d6",
						image: (
							<Image source={require("../images/fc-art.png")} />
						),
					},
				]}
			/>
		</SafeAreaView>
	);
};

export default Simple;

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