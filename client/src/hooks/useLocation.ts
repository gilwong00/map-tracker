import { useState, useEffect, useContext } from 'react';
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from 'expo-location';
import {
  LocationActionTypes,
  LocationContext
} from '../context/LocationContext';

interface Subscriber {
  remove: () => void;
}

const useLocation = (shouldTrack: boolean): { err: Error } => {
  const { dispatch, recording } = useContext(LocationContext);
  // const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    let subscriber: Subscriber;

    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
          subscriber = await watchPositionAsync(
            {
              accuracy: Accuracy.BestForNavigation,
              timeInterval: 1000,
              distanceInterval: 10
            },
            location => {
              dispatch({
                type: LocationActionTypes.ADD_CURRENT_LOCATION,
                payload: location
              });

              if (recording)
                dispatch({
                  type: LocationActionTypes.ADD_LOCATION,
                  payload: location
                });
            }
          );
          // setSubscriber(sub);
        } else {
          throw new Error('Location permission not granted');
        }
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack || recording) {
      startWatching();
    } else {
      if (subscriber) subscriber.remove();
      subscriber = null;
    }

    return () => {
      if (subscriber) subscriber.remove();
    };
  }, [shouldTrack, recording]);

  return { err };
};

export default useLocation;
