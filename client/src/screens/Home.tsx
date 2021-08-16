import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from '../navigators/AuthNavigator';
import MainNavigator from '../navigators/MainNavigator';

const Home = () => {
  const { authenticated } = useContext(AuthContext);
  return <>{!authenticated ? <AuthNavigator /> : <MainNavigator />}</>;
};

export default Home;
