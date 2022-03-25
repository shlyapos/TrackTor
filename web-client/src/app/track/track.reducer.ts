import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Track } from '../shared/models/track';
import { trackActions } from './track.actions';

export const TRACK_STATE_KEY = 'track';

interface ITrackState {
  tracks: Track[];
}

const initialState: ITrackState = {
  tracks: [],
}

const reducer = createReducer(
  initialState,
  on(trackActions.loadTracks, (state, { tracks }) => ({...state, tracks})),
)

export function trackReducer(state: ITrackState, action: Action): ITrackState {
  return reducer(state, action);
}

const trackStateSelector = createFeatureSelector<ITrackState>(TRACK_STATE_KEY);

export const trackSelectors = {
  tracks: createSelector(trackStateSelector, (state: ITrackState): Track[] => state.tracks),
}