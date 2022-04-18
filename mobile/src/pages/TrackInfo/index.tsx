import React from 'react';
import {
  TrackInfoScreenScreenRouteProp,
  TrackInfoScreenNavigationProp,
} from '../../stack';
import TrackInfoPage from './TrackInfoPage';

interface ITrackInfoProps {
  route: TrackInfoScreenScreenRouteProp;
  navigation: TrackInfoScreenNavigationProp;
}

const TrackInfo: React.FC<ITrackInfoProps> = ({ route, navigation }) => {
  const onPress = () => {
    navigation.navigate('Home');
  };

  const onStart = () => {};

  const { track } = route.params;

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
