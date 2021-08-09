import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { signin } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../components/FormInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
    padding: 10
  },
  title: {
    paddingLeft: 10,
    paddingBottom: 25,
    textAlign: 'center'
  },
  signInBtn: {
    paddingTop: 30
  },
  signUpText: {
    color: 'blue',
    textAlign: 'center',
    paddingTop: 15
  }
});

const Signin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  const { mutateAsync } = useMutation(signin, {
    onSuccess: async (data: string): Promise<void> => {
      await AsyncStorage.setItem('token', data);
      navigation.navigate('Main');
    }
  });

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign up for Tracker
      </Text>
      <FormInput label='Email' value={email} handleChange={setEmail} />
      <FormInput label='Password' value={password} handleChange={setPassword} />
      <Button
        style={styles.signInBtn}
        title='Sign In'
        onPress={async () => await mutateAsync({ email, password })}
        accessibilityLabel='Sign In'
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUpText}>
          Click here to sign up if you don't have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
