import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from "react-native-paper";
import api from '../services/api';

interface IHeaderProps {
  title: string;
  showCancel?: boolean;
}

export const SearchBar: React.FC<IHeaderProps> = ({
  title,
  showCancel = true,
}) => {
  const [searchItem, setsearchItem] = useState({
    "item": ``
  });
  const [exhibitionsName, setExhibitionsName] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    if (name !== "")
    {   
        api.get(`/exhibitions/${name}`).then(({ data }) => {
        setExhibitionsName(data)
        })
    }
  }, [name])

  /*const nameFilter = exhibitionsName.filter((list) => {
    return list;
     ?.name?.toLowerCase().includes(searchItem?.item?.toLowerCase()); 
  });*/

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{exhibitionsName}</Text>
      <Searchbar
        placeholder="Buscar"
        style={{
          "position": `absolute`,
          "top": 20,
          "margin": 10
        }}
          value={searchItem?.item}
        onChangeText= {(item) => setsearchItem({ ...searchItem, item })}
        onIconPress={() => {setName(searchItem?.item)}}
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 30,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
    paddingTop: 150,
  },

  backButton: {},
});