import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { useQuery } from 'react-query';
import { fetchTracks } from '../api';
import { useNavigation } from '@react-navigation/core';

const TrackList = () => {
  const navigation = useNavigation();
  const { isLoading, isError, data, error } = useQuery('tracks', fetchTracks, {
    staleTime: 100000,
    refetchOnMount: true
  });

  if (isLoading)
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />;

  if (isError) return Alert.alert('ERROR', (error as Error).message);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('TrackDetail', item)}
          >
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default TrackList;
