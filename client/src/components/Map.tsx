import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Location } from '../@types';
import { LocationContext } from '../context/LocationContext';

const Map = () => {
  const { locations, currentLocation, recording } = useContext(LocationContext);

  if (!currentLocation)
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      // region={{
      //   ...currentLocation.coords,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01
      // }}
    >
      {recording && (
        <>
          <Circle
            center={currentLocation.coords}
            radius={30}
            strokeColor='rgba(158, 158, 255, 1.0)'
            fillColor='rgba(158, 158, 255, 0.3)'
          />
          <Polyline
            coordinates={locations.map((loc: Location) => loc.coords)}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});
