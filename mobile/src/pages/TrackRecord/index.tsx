import React from 'react';
import * as Location from 'expo-location';
import { IFrontendTrack, Transport } from '../../models/tracks';
import {
  TrackRecordScreenRouteProp,
  TrackRecordScreenNavigationProp,
} from '../../stack';
import TrackRecordPage from './TrackRecordPage';

interface ITrackRecordProps {
  route: TrackRecordScreenRouteProp;
  navigation: TrackRecordScreenNavigationProp;
}

export type loadStatus = 'load' | 'error' | 'done';

const initialTrack: IFrontendTrack = {
  id: '',
  name: '',
  region: '',
  transport: 'Пешком',
  distance: '0.0 км',
  time: '00:00:00',
  coords: [],
};

const initialUserLoc: Location.LocationObject = {
  coords: {
    latitude: 0,
    longitude: 0,
    altitude: null,
    accuracy: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: 0,
};

const TrackRecord: React.FC<ITrackRecordProps> = ({ route, navigation }) => {
  const [track, setTrack] = React.useState<IFrontendTrack>(initialTrack);
  const [isUserLocLoaded, setUserLocLoad] = React.useState<loadStatus>('load');
  const [userLoc, setUserLoc] =
    React.useState<Location.LocationObject>(initialUserLoc);

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setUserLocLoad('error');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    setUserLoc(location);
    setUserLocLoad('done');
  };

  // Срабатывает
  React.useEffect(() => {
    const { name, transport } = route.params;

    setTrack({
      ...initialTrack,
      name,
      transport: transport as Transport | 'Пешком',
    });

    return () => {
      setUserLoc(initialUserLoc);
      setUserLocLoad('load');
    };
  }, []);

  React.useEffect(() => {
    getUserLocation();
  }, [userLoc]);

  const onPressBack = () => {
    navigation.navigate('Home');
  };

  return (
    <TrackRecordPage
      userLoc={userLoc}
      isUserLocLoaded={isUserLocLoaded}
      onPressBack={onPressBack}
    />
  );
};

export default TrackRecord;
