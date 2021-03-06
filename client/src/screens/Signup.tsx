import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useMutation } from 'react-query';
import { signup } from '../api';
import { authStyles } from '../styles';
import FormInput from '../components/FormInput';

const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  const { mutateAsync } = useMutation(signup, {
    onSuccess: (): void => {
      Alert.alert('SUCCESS', 'You successfully signed up', [
        {
          text: 'Click here to login',
          onPress: () => navigation.navigate('Signin')
        }
      ]);
    }
  });

  return (
    <View style={authStyles.container}>
      <Text h3 style={authStyles.title}>
        Sign up for Tracker
      </Text>
      <FormInput
        label='First Name'
        value={firstName}
        handleChange={setFirstName}
      />

      <FormInput
        label='Last Name'
        value={lastName}
        handleChange={setLastName}
      />
      <FormInput label='Email' value={email} handleChange={setEmail} />
      <FormInput label='Password' value={password} handleChange={setPassword} />

      <Button
        style={authStyles.authBtn}
        title='Sign up'
        onPress={async () =>
          await mutateAsync({ firstName, lastName, email, password })
        }
        accessibilityLabel='Sign up'
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={authStyles.authText}>
          If you have an account, click here to log in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
