import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Header from './components/Header';

import ExhibitionsMap from "./pages/ExhibitionsMap";
import ExhibitionDetails from "./pages/ExhibitionDetails";
import SelectMapPosition from "./pages/CreateExhibition/SelectMapPosition";
import ExhibitionData from "./pages/CreateExhibition/ExhibitionData";


const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="ExhibitionsMap" component={ExhibitionsMap} />

        <Screen 
          name="ExhibitionDetails" 
          component={ExhibitionDetails} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Exposição" />
          }}
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />

        <Screen 
          name="ExhibitionData" 
          component={ExhibitionData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;