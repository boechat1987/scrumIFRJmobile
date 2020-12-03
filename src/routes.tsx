/* import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import {Header} from './components/Header';

import ExhibitionVisitData from "./pages/CreateExhibition/ExhibitionVisitData";
import OnBoardingScreen from "./pages/OnBordingScreen";
import ExhibitionsMap from "./pages/ExhibitionsMap";
import ExhibitionDetails from "./pages/ExhibitionDetails";
import SelectMapPosition from "./pages/CreateExhibition/SelectMapPosition";
import ExhibitionData from "./pages/CreateExhibition/ExhibitionData";



const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="Landing" component={OnBoardingScreen} />
        
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

        <Screen
            options={{
              header: () => <Header title="Adicionar uma exibição" />,
            }}
            name="ExhibitionVisitData"
            component={ExhibitionVisitData}
        />

      </Navigator>
    </NavigationContainer>
  );
}

export default Routes; */

import React from 'react';
import { ExhibitionDataProvider } from './contexts/exhibitiondata';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from './components/Header';

import ExhibitionsMap from './pages/ExhibitionsMap';
import ExhibitionDetails from './pages/ExhibitionDetails';
import SelectMapPosition from './pages/CreateExhibition/SelectMapPosition';
import ExhibitionData from './pages/CreateExhibition/ExhibitionData';
import ExhibitionVisitData from './pages/CreateExhibition/ExhibitionVisitData';
import OnBoardingScreen from "./pages/OnBordingScreen";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <ExhibitionDataProvider>
      <NavigationContainer>
        <Navigator>
          <Screen 
            options={{
              headerShown: false,
            }}
            name="OnBoardingScreen" 
            component={OnBoardingScreen} 
          />
          <Screen
            options={{
              headerShown: false,
            }}
            name="ExhibitionsMap"
            component={ExhibitionsMap}
          />
          <Screen
            options={{
              header: () => <Header showCancel={false} title="Detalhes" />,
            }}
            name="ExhibitionDetails"
            component={ExhibitionDetails}
          />

          <Screen
            options={{
              header: () => <Header title="Selecione no mapa" />,
            }}
            name="SelectMapPosition"
            component={SelectMapPosition}
          />
          <Screen
            options={{
              header: () => <Header title="Informe os dados" />,
            }}
            name="ExhibitionData"
            component={ExhibitionData}
          />
          <Screen
            options={{
              header: () => <Header title="Adicionar uma exposição" />,
            }}
            name="ExhibitionVisitData"
            component={ExhibitionVisitData}
          />
        </Navigator>
      </NavigationContainer>
    </ExhibitionDataProvider>
  );
}