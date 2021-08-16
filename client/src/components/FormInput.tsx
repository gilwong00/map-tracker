import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

interface Props {
  label?: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const styles = StyleSheet.create({
  space: {
    paddingVertical: 15
  }
});

const FormInput: React.FC<Props> = ({ value, handleChange, label }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <Input
      style={styles.space}
      label={label}
      value={value}
      onChangeText={handleChange}
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={label?.toLocaleLowerCase() === 'password'}
      renderErrorMessage={!value}
      errorMessage={errorMessage}
      onBlur={() => setErrorMessage(!value ? `${label} is required` : '')}
      labelStyle={{ paddingTop: 10 }}
    />
  );
};

export default FormInput;
