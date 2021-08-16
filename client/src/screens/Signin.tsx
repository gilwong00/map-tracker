import React, { useState, useContext } from 'react';
import { Actions, AuthContext } from '../context/AuthContext';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { signin } from '../api';
import { authStyles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../components/FormInput';
import { User } from '../@types';

const Signin = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { mutateAsync } = useMutation(signin, {
    onSuccess: async (user: User): Promise<void> => {
      await AsyncStorage.setItem('token', user.token);
      dispatch({ type: Actions.LOGIN, payload: user });
      navigation.navigate('Main');
    }
  });

  return (
    <View style={authStyles.container}>
      <Text h3 style={authStyles.title}>
        Sign up for Tracker
      </Text>
      <FormInput label='Email' value={email} handleChange={setEmail} />
      <FormInput label='Password' value={password} handleChange={setPassword} />
      <Button
        style={authStyles.authBtn}
        title='Sign In'
        onPress={async () => await mutateAsync({ email, password })}
        accessibilityLabel='Sign In'
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={authStyles.authText}>
          Click here to sign up if you don't have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
