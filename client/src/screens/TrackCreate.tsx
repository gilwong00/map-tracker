import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-elements';
import Map from '../components/Map';

const TrackCreate = () => {
  return (
    <SafeAreaView>
      <Text h2>Create Track</Text>
      <Map />
    </SafeAreaView>
  );
};

export default TrackCreate;
