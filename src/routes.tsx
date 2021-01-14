import React from 'react';
import { ExhibitionDataProvider } from './contexts/exhibitiondata';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import ExhibitionsMap from './pages/ExhibitionsMap';
import ExhibitionDetails from './pages/ExhibitionDetails';
import SelectMapPosition from './pages/CreateExhibition/SelectMapPosition';
import ExhibitionData from './pages/CreateExhibition/ExhibitionData';
import ExhibitionVisitData from './pages/CreateExhibition/ExhibitionVisitData';
import OnBoardingScreen from "./pages/OnBordingScreen";
import RegisterScreen from './pages/Login/RegisterScreen';
import LoginScreen from './pages/Login/LoginScreen';
import FirebaseLogin from './pages/Login/FirebaseLogin';
import GoogleLogin from './pages/Login/GoogleLogin';

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
              /* header: () => <Header title="Iniciar Sessão" showCancel={false}/>, */
            }}
            name="GoogleLogin"
            component={GoogleLogin} 
          />
          //<Screen 
            options={{
             headerShown: false,
               header: () => <Header title="Iniciar Sessão" showCancel={false}/>,
            }}
           name="FirebaseLogin"
            component={FirebaseLogin} 
          />
          <Screen 
            options={{
              header: () => <Header title="Registro de usuário" showCancel={false}/>,
            }}
            name="RegisterScreen" 
            component={RegisterScreen} 
          />
          <Screen 
            options={{
              header: () => <Header title="Iniciar Sessão" showCancel={false}/>,
            }}
            name="LoginScreen" 
            component={LoginScreen} 
          />
          <Screen
            options={{
              header: () => <SearchBar showCancel={false} title="Barra de busca" />,
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