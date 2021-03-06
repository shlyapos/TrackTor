import React from 'react';
import * as Location from 'expo-location';
import {
  IBackendTrack,
  IFrontendTrack,
  Transport,
  Coordinate,
} from '../../models/tracks';
import {
  TrackRecordScreenRouteProp,
  TrackRecordScreenNavigationProp,
} from '../../stack';
import { convertTime } from '../../utils/time';
import {
  calcCrow,
  differenceBetweenCoords,
  convertDistanceToString,
} from '../../utils/distance';
import TrackRecordPage from './TrackRecordPage';

interface ITrackRecordProps {
  route: TrackRecordScreenRouteProp;
  navigation: TrackRecordScreenNavigationProp;
}

export type loadStatus = 'load' | 'error' | 'done' | 'stop';

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
  const [finishStatus, setFinishStatus] = React.useState<boolean>(false);
  const [routeCoords, setRouteCoords] =
    React.useState<IFrontendTrack['coords']>(undefined);
  const [coords, setCoords] = React.useState<IFrontendTrack['coords']>([]);
  const [isUserLocLoaded, setUserLocLoad] = React.useState<loadStatus>('load');
  const [userLoc, setUserLoc] =
    React.useState<Location.LocationObject>(initialUserLoc);
  const [timer, setTimer] = React.useState<number>(0);
  const [distance, setDistance] = React.useState<number>(0.0);

  const updateDistance = (lastLoc: Coordinate, newLoc: Coordinate) => {
    const newDistance = calcCrow(
      lastLoc.lat,
      lastLoc.lon,
      newLoc.lat,
      newLoc.lon
    );

    setDistance((distance) => distance + newDistance);
  };

  const updateCoords = (newLoc: Location.LocationObject) => {
    let isCoordsUpdate: boolean = false;

    const { latitude, longitude } = newLoc.coords;

    if (!coords) return;

    if (coords.length > 1) {
      const lastCoord = coords[coords.length - 1];
      const newCoord: Coordinate = { lat: latitude, lon: longitude };

      isCoordsUpdate = differenceBetweenCoords(newCoord, lastCoord);

      isCoordsUpdate && updateDistance(lastCoord, newCoord);
    } else {
      isCoordsUpdate = true;
    }

    if (isCoordsUpdate && coords) {
      setCoords((coords) => [...coords!, { lat: latitude, lon: longitude }]);
    }
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setUserLocLoad('error');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    location && updateCoords(location);

    setUserLoc(location);
    setUserLocLoad('done');
  };

  const checkFinishStatus = () => {
    if (coords && routeCoords) {
      const finishCoord: Coordinate = routeCoords[routeCoords.length - 1];
      const lastCoord: Coordinate = coords[coords.length - 1];

      return !differenceBetweenCoords(finishCoord, lastCoord);
    }

    return false;
  };

  const fetchNewTrack = async () => {
    const { name, transport } = route.params;

    const track: IBackendTrack = {
      id: '',
      name,
      transport: transport as Transport | '????????????',
      distance: distance,
      time: convertTime(timer),
      coords,
    };
  };

  const fetchRunResult = async () => {};

  // Initialize states on component loaded
  React.useEffect(() => {
    const { isRun, routeCoords } = route.params;

    if (isRun && routeCoords) {
      setRouteCoords([...routeCoords]);
    }

    return () => {
      setUserLocLoad('load');
      setUserLoc(initialUserLoc);
      setDistance(0);
    };
  }, []);

  // Update user location by 2 sec
  // TODO: ?????????????????? ?????????????????????? ???????????????? ?????????????????? ????????????
  React.useEffect(() => {
    let intervalLoc: NodeJS.Timer | null = null;

    isUserLocLoaded === 'done' || 'load'
      ? (intervalLoc = setInterval(() => {
          isUserLocLoaded !== 'stop' && getUserLocation();
        }, 2000))
      : intervalLoc && clearInterval(intervalLoc);

    return () => {
      if (intervalLoc) clearInterval(intervalLoc);
    };
  }, [userLoc, isUserLocLoaded]);

  // Update timer by 1 sec
  // TODO: ?????????????????? ?????????????????????? ???????????????? ?????????????????? ????????????
  React.useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    isUserLocLoaded === 'done'
      ? (interval = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000))
      : interval && clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isUserLocLoaded]);

  const onPressPause = () => {
    setUserLocLoad('stop');

    if (routeCoords) setFinishStatus(checkFinishStatus());
  };

  const onPressSave = async () => {
    routeCoords ? await fetchRunResult() : await fetchNewTrack();

    navigation.navigate('Home');
  };

  const onPressContinue = () => {
    setUserLocLoad('done');
  };

  const onPressNotSave = () => {
    navigation.navigate('Home');
  };

  return (
    <TrackRecordPage
      coords={coords}
      timer={convertTime(timer)}
      distance={convertDistanceToString(distance)}
      userLoc={userLoc}
      isUserLocLoaded={isUserLocLoaded}
      onPressPause={onPressPause}
      onPressSave={onPressSave}
      onPressContinue={onPressContinue}
      onPressNotSave={onPressNotSave}
      routeCoords={routeCoords}
      finishStatus={finishStatus}
    />
  );
};

export default TrackRecord;
