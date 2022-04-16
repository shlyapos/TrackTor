import React from 'react';
import { IFrontendTrack } from '../../models/tracks';
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

  const { track } = route.params;

  return (
    <TrackInfoPage
      id={track.id}
      name={track.name}
      transport={track.transport}
      region={track.region}
      distance={track.distance}
      time={track.time}
      onPress={onPress}
    />
  );
};

export default TrackInfo;
