import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
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
  authBtn: {
    paddingTop: 30
  },
  authText: {
    color: 'blue',
    textAlign: 'center',
    paddingTop: 15
  }
});

export default authStyles;
