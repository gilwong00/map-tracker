import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import FormInput from '../components/FormInput';
import {
  LocationActionTypes,
  LocationContext
} from '../context/LocationContext';
import { useMutation } from 'react-query';
import { createTrack } from '../api';

const TrackForm = () => {
  const navigation = useNavigation();
  const { dispatch, recording, locations } = useContext(LocationContext);
  const [trackName, setTrackName] = useState<string>('');
  const { mutateAsync } = useMutation(createTrack, {
    onSuccess: () => {
      setTrackName('');
      dispatch({ type: LocationActionTypes.RESET });
      navigation.navigate('TrackList');
    }
  });

  const handlePress = () => {
    return recording
      ? dispatch({ type: LocationActionTypes.STOP_RECORDING })
      : dispatch({ type: LocationActionTypes.START_RECORDING });
  };

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
        disabled={!trackName}
        style={{ paddingTop: 15 }}
      />

      {locations.length > 0 && !recording && (
        <Button
          title='Save Recordings'
          type='solid'
          style={{ paddingTop: 15 }}
          onPress={async () => mutateAsync({ name: trackName, locations })}
        />
      )}
    </View>
  );
};

export default TrackForm;
