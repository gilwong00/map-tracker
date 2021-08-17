import React, { createContext, useReducer } from 'react';
import { Location } from '../@types';

export enum LocationActionTypes {
  START_RECORDING = 'START_RECORDING',
  STOP_RECORDING = 'STOP_RECORDING',
  ADD_LOCATION = 'ADD_LOCATION',
  ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION',
  RESET = 'RESET'
}

interface LocationState {
  locations: Array<Location>;
  recording: boolean;
  currentLocation: Location | null;
}

interface LocationAction {
  type:
    | LocationActionTypes.START_RECORDING
    | LocationActionTypes.STOP_RECORDING
    | LocationActionTypes.ADD_LOCATION
    | LocationActionTypes.ADD_CURRENT_LOCATION
    | LocationActionTypes.RESET;
  payload?: Location | null;
}

interface ILocationContext extends LocationState {
  dispatch: React.Dispatch<LocationAction>;
}

export const LocationContext = createContext<ILocationContext>({
  locations: [],
  recording: false,
  currentLocation: null,
  dispatch: () => undefined
});

const locationReducer = (state: LocationState, action: LocationAction) => {
  switch (action.type) {
    case LocationActionTypes.ADD_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      };
    case LocationActionTypes.START_RECORDING:
      return {
        ...state,
        recording: true
      };
    case LocationActionTypes.STOP_RECORDING:
      return {
        ...state,
        recording: false
      };
    case LocationActionTypes.ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload]
      };
    case LocationActionTypes.RESET:
      return {
        ...state,
        locations: [],
        recording: false
      };
    default:
      return state;
  }
};

export const LocationProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(locationReducer, {
    locations: [],
    recording: false,
    currentLocation: null
  });

  return (
    <LocationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
