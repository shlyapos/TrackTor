import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { TrackLeaderboardRecord } from '../shared/models/leaderboard';
import { Track } from '../shared/models/track';
import { trackActions } from './track.actions';

export const TRACK_STATE_KEY = 'track';

interface ITrackState {
  activeTrack: Track | null;
  tracks: Track[];
  activeLeaderboard: TrackLeaderboardRecord[];
}

const initialState: ITrackState = {
  activeTrack: null,
  tracks: [],
  activeLeaderboard: [],
}

const reducer = createReducer(
  initialState,
  on(trackActions.saveTracks, (state, { tracks }) => ({...state, tracks})),
  on(trackActions.setActiveTrack, (state, { activeTrack }) => ({...state, activeTrack})),
  on(trackActions.setActiveTrackLeaderboard, (state, { activeLeaderboard }) => ({...state, activeLeaderboard})),
  
)

export function trackReducer(state: ITrackState, action: Action): ITrackState {
  return reducer(state, action);
}

const trackStateSelector = createFeatureSelector<ITrackState>(TRACK_STATE_KEY);

export const trackSelectors = {
  tracks: createSelector(trackStateSelector, (state: ITrackState): Track[] => state.tracks),
  activeTrack: createSelector(trackStateSelector, (state: ITrackState): Track | null => state.activeTrack),
  activeTrackLeaderboard: createSelector(trackStateSelector, (state: ITrackState): TrackLeaderboardRecord[] => state.activeLeaderboard),
}