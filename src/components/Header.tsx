import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useExhibitionData } from '../contexts/exhibitiondata';

interface IHeaderProps {
  title: string;
  showCancel?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({
  title,
  showCancel = true,
}) => {
  const navigation = useNavigation();
  const {
    setName,
    setPosition,
    setAbout,
    setImages,
    setInstructions,
    setOpenOnWeekends,
    setValue,
    setOpeningHours,
  } = useExhibitionData();

  function handleNavigateToExhibitionsMap() {
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
  }
  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCancel ? (
        <BorderlessButton onPress={handleNavigateToExhibitionsMap}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View>
          <Feather name="x" size={24} style={{ opacity: 0 }} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 64,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },

  backButton: {},
});