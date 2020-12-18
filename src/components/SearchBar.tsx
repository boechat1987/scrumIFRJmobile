import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Searchbar, Button } from "react-native-paper";
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
/* import { useExhibitionFind } from '../contexts/exhibitionFind'; */

interface IHeaderProps {
  title: string;
  showCancel?: boolean;
  showDrower?: boolean;
}

export const SearchBar: React.FC<IHeaderProps> = ({
  showCancel = true,
}) => {
  const navigation = useNavigation();
  const [searchItem, setsearchItem] = useState({
    "item": ``
  });
  const [exhibitionsName, setExhibitionsName] = useState([])
  const [exhibitionsId, setExhibitionsId] = useState(Number)
  const [exhibitionsLongitude, setExhibitionsLongitude] = useState([])
  const [exhibitionsLatitude, setExhibitionsLatitude] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const showButton = () => setVisible(true);
  const hideButton = () => setVisible(false);


  useEffect(() => {
    if (name !== "")
    {   
        api.get(`/exhibitions/name/${name}`)
        .then(({ data }) => {
          setExhibitionsName(data.name)
          setExhibitionsId(data.id)
          setExhibitionsLongitude(data.longitude)
          setExhibitionsLatitude(data.latitude)
          showButton();
        })
        .catch(error=>{
          hideButton();
          alert("Não há exposições com esse nome")
        });
        setName("")
    }
  }, [name])

  /*const nameFilter = exhibitionsName.filter((list) => {
    return list;
     ?.name?.toLowerCase().includes(searchItem?.item?.toLowerCase()); 
  });*/

  function alerta(id: number){
    navigation.navigate('ExhibitionDetails', { id });
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        style={{
          "position": `absolute`,
          "top": 0,
          "margin": 10
        }}
          value={searchItem?.item}
        onChangeText= {(item) => setsearchItem({ ...searchItem, item })}
        onIconPress={() => {
          setName(searchItem?.item)
          if (name === ""){
            hideButton();
          }
        }}
      />
      {showCancel ? (
        <BorderlessButton >
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View>
          <Feather name="x" size={24} style={{ opacity: 0 }} />
        </View>
      )}
      {visible ? (
        <Button 
        style={{
          "position": `absolute`,
          "top": 60,
          "margin": 10
        }}
         mode="contained" onPress={() => alerta(exhibitionsId)}>
         <Text>Ir para {exhibitionsName}?</Text>
        </Button>
        ) : (<View></View>)}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
    paddingTop: 10,
  },

  backButton: {},
});