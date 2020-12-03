import React from 'react';
import { useContext, createContext, useState } from 'react';
import { LatLng } from 'react-native-maps';

const ExhibitionDataContext = createContext({});

export const ExhibitionDataProvider: React.FC = (props) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [position, setPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState([] as any);

  return (
    <ExhibitionDataContext.Provider
      value={{
        name,
        setName,
        position,
        setPosition,
        about,
        setAbout,
        instructions,
        setInstructions,
        opening_hours,
        setOpeningHours,
        open_on_weekends,
        setOpenOnWeekends,
        images,
        setImages,
      }}
    >
      {props.children}
    </ExhibitionDataContext.Provider>
  );
};

export const useExhibitionData = () => {
  const {
    name,
    setName,
    position,
    setPosition,
    about,
    setAbout,
    instructions,
    setInstructions,
    opening_hours,
    setOpeningHours,
    open_on_weekends,
    setOpenOnWeekends,
    images,
    setImages,
  } = useContext(ExhibitionDataContext) as any;
  return {
    name,
    setName,
    position,
    setPosition,
    about,
    setAbout,
    instructions,
    setInstructions,
    opening_hours,
    setOpeningHours,
    open_on_weekends,
    setOpenOnWeekends,
    images,
    setImages,
  };
};
