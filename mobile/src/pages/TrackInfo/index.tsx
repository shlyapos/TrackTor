import React from 'react';
import {
  TrackInfoScreenRouteProp,
  TrackInfoScreenNavigationProp,
} from '../../stack';
import TrackInfoPage from './TrackInfoPage';

interface ITrackInfoProps {
  route: TrackInfoScreenRouteProp;
  navigation: TrackInfoScreenNavigationProp;
}

const TrackInfo: React.FC<ITrackInfoProps> = ({ route, navigation }) => {
  const { track } = route.params;

  const onPress = () => {
    navigation.navigate('Home');
  };

  const onStart = () => {
    const { id, name, coords, transport } = track;

    navigation.navigate('TrackRecord', {
      isRun: true,
      id,
      name,
      routeCoords: coords,
      transport,
    });
  };

  return (
    <TrackInfoPage
      id={track.id}
      name={track.name}
      transport={track.transport}
      region={track.region}
      distance={track.distance}
      time={track.time}
      coords={track.coords}
      onPress={onPress}
      onStart={onStart}
    />
  );
};

export default TrackInfo;
