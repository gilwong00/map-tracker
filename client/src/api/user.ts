import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../@types';

const BASE_URL = 'http://localhost:5000/api/user';

export const whoAmI = async () => {
  const token = await AsyncStorage.getItem('token');
  return axios.get(`${BASE_URL}/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const signup = async (newUser: User) => {
  const { data } = await axios.post(`${BASE_URL}/signup`, newUser);
  return data;
};

export const signin = async (user: Pick<User, 'email' | 'password'>) => {
  const { data } = await axios.post(`${BASE_URL}/signin`, user);
  return data;
};
