import React, { createContext, useReducer, useEffect } from 'react';
import { User } from '../@types';
import { whoAmI } from '../api';

export enum Actions {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

interface IAuthState {
  user: User | null;
  authenticated: boolean;
  authError: string;
}

interface Action {
  type: Actions.LOGIN | Actions.LOGOUT;
  payload: User | null;
}

interface IAuthContext extends IAuthState {
  dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  user: null,
  authError: '',
  dispatch: () => undefined
});

const authReducer = (state: IAuthState, action: Action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case Actions.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authenticated: false,
    authError: ''
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await whoAmI<User>();
        dispatch({ type: Actions.LOGIN, payload: user });
      } catch (err) {
        console.log('err', err);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
