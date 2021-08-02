import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  },
  space: {
    padding: 15
  },
  title: {
    paddingLeft: 10,
    paddingBottom: 25
  }
});

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign up for Tracker
      </Text>
      <Input
        style={styles.space}
        label='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Input
        style={styles.space}
        label='Password'
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button style={styles.space} title='Sign up' />
    </View>
  );
};

export default Signup;
