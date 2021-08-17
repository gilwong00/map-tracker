import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { Track } from '../@types';
import MapView, { Polyline } from 'react-native-maps';

type Params = {
  track: Track;
};

const styles = StyleSheet.create({
  map: {
    height: 300
  },
  header: {
    fontSize: 40,
    padding: 15
  }
});

const TrackDetail = () => {
  const { params: track } = useRoute<RouteProp<Params, 'track'>>();

  return (
    <View>
      <Text style={styles.header}>{track.name}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...track.locations[0].coords
        }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
    </View>
  );
};

export default TrackDetail;
