import React from 'react';
import { useContext, createContext, useState } from 'react';
import { LatLng } from 'react-native-maps';

const ExhibitionFindContext = createContext({});

export const ExhibitionFindProvider: React.FC = (props) => {
    const [exhibitionsName, setExhibitionsName] = useState([])
    const [exhibitionsLongitude, setExhibitionsLongitude] = useState([])
    const [exhibitionsLatitude, setExhibitionsLatitude] = useState([])

  return (
    <ExhibitionFindContext.Provider
      value={{
        exhibitionsName,
        setExhibitionsName,
        exhibitionsLongitude,
        setExhibitionsLongitude,
        exhibitionsLatitude,
        setExhibitionsLatitude,
      }}
    >
      {props.children}
    </ExhibitionFindContext.Provider>
  );
};

export const useExhibitionFind = () => {
  const {
    exhibitionsName,
    setExhibitionsName,
    exhibitionsLongitude,
    setExhibitionsLongitude,
    exhibitionsLatitude,
    setExhibitionsLatitude,
  } = useContext(ExhibitionFindContext) as any;
  return {
    exhibitionsName,
    setExhibitionsName,
    exhibitionsLongitude,
    setExhibitionsLongitude,
    exhibitionsLatitude,
    setExhibitionsLatitude,
  };
};
