import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import ExhibitionsRepository, { IExhibition } from '../repositories/exhibitions';

export default function ExhibitionsMap() {
  const [exhibitions, setExhibitions] = useState<IExhibition[] | undefined>([]);
  const navigation = useNavigation();

  function handleNavigateToExhibitionDetails(id: number) {
    navigation.navigate('ExhibitionDetails', { id });
  }
  function HandlenavigationToCreateExhibition() {
    navigation.navigate('SelectMapPosition');
  }

  useFocusEffect(() => {
    async function loadExhibitions() {
      const response = await ExhibitionsRepository.index();
      setExhibitions(response?.data);
    }
    loadExhibitions();
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -22.9161531,
          longitude: -43.2110856, 
          latitudeDelta: 0.078, 
          longitudeDelta:  0.078
        }}
      >
        {exhibitions?.map((exhibition, index) => (
          <Marker
            key={index}
            tracksViewChanges={false}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.6,
              y: 0.8,
            }}
            coordinate={{
              latitude: exhibition.latitude,
              longitude: exhibition.longitude,
            }}
          >
            <Callout
              tooltip={true}
              onPress={() => handleNavigateToExhibitionDetails(exhibition.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{exhibition.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
           {exhibitions?.length}  Exposições encontradas
        </Text>

        <RectButton
          style={styles.createExhibitionButton}
          onPress={HandlenavigationToCreateExhibition}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: 'center',
    borderColor: '#13BFCC',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 2,
  },

  footerText: {
    color: '#8fa7b3',
    fontSize: 17,
    fontFamily: 'Nunito_700Bold',
  },

  createExhibitionButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});