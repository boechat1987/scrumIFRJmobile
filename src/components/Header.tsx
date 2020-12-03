/* import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header = ({ title, showCancel =  true }: HeaderProps) => {
  const navigation = useNavigation();

  const HandleBackHomePage = () => {
    navigation.navigate('ExhibitionsMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{ title }</Text>

      { showCancel ? (
        <BorderlessButton onPress={HandleBackHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (  <View /> )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16
  }
})

export default Header;   */

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