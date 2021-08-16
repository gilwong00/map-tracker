import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useMutation } from 'react-query';
import { signout } from '../api';
import { Actions, AuthContext } from '../context/AuthContext';

const Account = () => {
  const { dispatch } = useContext(AuthContext);
  const { mutateAsync } = useMutation(signout, {
    onSuccess: (): void => {
      dispatch({ type: Actions.LOGOUT, payload: null });
    }
  });

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Text>Account</Text>
      <Button title='Sign Out' onPress={async () => mutateAsync()} />
    </SafeAreaView>
  );
};

export default Account;
