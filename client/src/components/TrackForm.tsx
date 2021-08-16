import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FormInput from '../components/FormInput';
import {
  LocationActionTypes,
  LocationContext
} from '../context/LocationContext';

const TrackForm = () => {
  const { dispatch, recording, locations } = useContext(LocationContext);
  const [trackName, setTrackName] = useState<string>('');

  const handlePress = () => {
    return recording
      ? dispatch({ type: LocationActionTypes.STOP_RECORDING })
      : dispatch({ type: LocationActionTypes.START_RECORDING });
  };
  console.log('loca', locations.length);
  return (
    <View style={{ padding: 10, marginTop: 20 }}>
      <FormInput
        label='Enter name'
        value={trackName}
        handleChange={setTrackName}
      />
      <Button
        title={recording ? 'Stop Recording' : 'Start Record'}
        type='solid'
        onPress={handlePress}
      />
    </View>
  );
};

export default TrackForm;
