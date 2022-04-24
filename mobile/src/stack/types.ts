import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { IFrontendTrack } from '../models/tracks';

export type RootStackParams = {
  Home: undefined;
  TrackInfo: { track: IFrontendTrack };
};

export type TrackListScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackInfo'
>;

export type TrackInfoScreenScreenRouteProp = RouteProp<
  RootStackParams,
  'TrackInfo'
>;

export type TrackInfoScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackInfo'
>;
