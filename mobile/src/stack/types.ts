import { StackNavigationProp } from '@react-navigation/stack';
import ITrackInfoProps from '../pages/TrackInfo';

export type RootStackParams = {
  Home: undefined;
  TrackInfo: { trackId: string };
};

export type TrackListScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'Home'
>;

export type TrackInfoScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackInfo'
>;
