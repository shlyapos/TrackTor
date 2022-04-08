import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { TrackCoord } from '../shared/models/track';
import { mapActions } from './map.actions';

export const MAP_STATE_KEY = 'map';

interface IMapState {
  trackCoords: TrackCoord[];
}

const initialState: IMapState = {
  trackCoords: [],
}

const reducer = createReducer(
  initialState,
  on(mapActions.setTrackCoords, (state, { trackCoords }) => ({...state, trackCoords})),
)

export function mapReducer(state: IMapState, action: Action): IMapState {
  return reducer(state, action);
}

const mapStateSelector = createFeatureSelector<IMapState>(MAP_STATE_KEY);

export const mapSelectors = {
  trackCoords: createSelector(mapStateSelector, (state: IMapState): TrackCoord[] => state.trackCoords),
}