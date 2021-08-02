import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Sign in screen</Text>
      <Button
        title='Go to Main Flow'
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
};

export default Signin;
