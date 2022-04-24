import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { IFrontendTrack, Transport } from '../models/tracks';

export type RootStackParams = {
  Home: undefined;
  TrackInfo: { track: IFrontendTrack };
  TrackRecord: { name: string; transport: string | Transport };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'Home'
>;

export type TrackInfoScreenRouteProp = RouteProp<RootStackParams, 'TrackInfo'>;

export type TrackInfoScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackInfo'
>;

export type TrackRecordScreenRouteProp = RouteProp<
  RootStackParams,
  'TrackRecord'
>;

export type TrackRecordScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TrackRecord'
>;
