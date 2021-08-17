import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location, Track } from '../@types';

const BASE_URL = 'http://localhost:5000/api/tracks';

export const createTrack = async (newTrack: {
  name: string;
  locations: Array<Location>;
}) => {
  const token = await AsyncStorage.getItem('token');
  const { data } = await axios.post<Track>(BASE_URL, newTrack, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const fetchTracks = async (): Promise<Array<Track>> => {
  const token = await AsyncStorage.getItem('token');
  const { data } = await axios.get<Array<Track>>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};
