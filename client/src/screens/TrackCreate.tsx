// import '../_mockLocation';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { useLocation } from '../hooks';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';

const TrackCreate = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { err } = useLocation(isFocused);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {});

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text h2>Create Track</Text>
      <Map />
      <TrackForm />
      {err && <Text>Please enable location service</Text>}
    </SafeAreaView>
  );
};

export default TrackCreate;
