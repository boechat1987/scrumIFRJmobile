import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { RectButton } from 'react-native-gesture-handler';
import { useExhibitionData } from '../../contexts/exhibitiondata'

import ExhibitionsRepository from '../../repositories/exhibitions';

const ExhibitionVisitData: React.FC = () => {
  const navigation = useNavigation();
  const {
    name,
    about,
    images,
    position,
    instructions,
    setInstructions,
    opening_hours,
    setOpeningHours,
    open_on_weekends,
    setOpenOnWeekends,
    setAbout,
    setImages,
    setName,
    setPosition,
    value,
    setValue,
  } = useExhibitionData();

  async function handleCreateExhibition() {
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', position.latitude as any);
    data.append('longitude', position.longitude as any);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', open_on_weekends as any);
    data.append('category_of_art', value);
    images.forEach((image: any, index: number) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    const response = await ExhibitionsRepository.create(data);
    if (response?.status == 201) {
      alert('Cadastro efetuado com sucesso!');
      navigation.navigate('ExhibitionsMap');
      setName('');
      setPosition({
        latitude: 0,
        longitude: 0,
      });
      setAbout('');
      setImages([]);
      setInstructions('');
      setOpeningHours('');
      setValue(null);
      setOpenOnWeekends(true);
      navigation.navigate('ExhibitionsMap');
    } else {
      alert('Não foi possível cadastrar!');
    }
  }
  let controller;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Visitação</Text>
        <Text style={styles.stages}>
          01 -{' '}
          <Text style={{ ...styles.stages, fontFamily: 'Nunito_800ExtraBold' }}>
            02
          </Text>
        </Text>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={(text) => setOpeningHours(text)}
      />

      <DropDownPicker 
               items={[
                  {label: 'Música / Dança', value: 'musica', icon: () => <Icon name="headphones" size={18} color="#900" />, hidden: true},
                  {label: 'Pintura / Escultura / Fotografia', value: 'pintura', icon: () => <Icon name="camera" size={18} color="#900" />},
                  {label: 'Teatro / Cinema', value: 'teatro', icon: () => <Icon name="tv" size={18} color="#900" />},
                  {label: 'Literatura / História em Quadrinho', value: 'literatura', icon: () => <Icon name="book" size={18} color="#900" />},
                  {label: 'Jogos eletrônicos / Arte Digital', value: 'jogos', icon: () => <Icon name="wifi" size={18} color="#900" />},
              ]} 
              /* items={items} */
              scrollViewProps = {{showsVerticalScrollIndicator: true}}
              defaultValue = {value}
              controller={instance => controller = instance}
              placeholder="Selectione uma categoria"
              containerStyle={{height: 40}}
              style={
                { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  backgroundColor: '#fff'}
              }
              itemStyle={{
                  justifyContent: 'flex-start',
              }}
              /* onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setItems(items)))
                    .then(() => callback())
                    .catch(() => {});
              }} */
              dropDownStyle={{backgroundColor: '#fafafa', height: 80}}
              onChangeItem={item => 
                setValue(item.value)
              }
        />

      <View style={styles.switchContainer}>
            <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton
        style={
          instructions && opening_hours
            ? styles.nextButton
            : { ...styles.nextButton, opacity: 0.6 }
        }
        onPress={handleCreateExhibition}
        enabled={instructions && opening_hours ? true : false}
      >
        <Text style={styles.nextButtonText}>Confirmar</Text>
      </RectButton>
    </ScrollView>
  );
};

export default ExhibitionVisitData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',

    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',

    justifyContent: 'space-between',
  },

  stages: {
    color: '#5c8599',
    fontSize: 14,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});