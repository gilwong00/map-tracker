import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { Track } from '../@types';

type Params = {
  track: Track;
};

const TrackDetail = () => {
  const { params: track } = useRoute<RouteProp<Params, 'track'>>();

  return (
    <View>
      <Text>{track.name}</Text>
    </View>
  );
};

export default TrackDetail;
