import { StackNavigationProp } from '@react-navigation/stack';
import ITrackInfoProps from '../pages/TrackInfo';

export type RootStackParams = {
  TrackList: undefined;
  TrackInfo: { trackId: string };
};

export type TrackListScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackList'
>;

export type TrackInfoScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackInfo'
>;
