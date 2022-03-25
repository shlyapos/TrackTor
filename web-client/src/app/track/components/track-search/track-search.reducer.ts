import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { trackSearchActions } from './track-search.actions';

export const TRACK_SEARCH_STATE_KEY = 'trackSearch';

interface ITrackSearchState {
  searchInput: string;
}

const initialState: ITrackSearchState = {
  searchInput: '',
}

const reducer = createReducer(
  initialState,
  on(trackSearchActions.setSearchInput, (state, { searchInput }) => ({...state, searchInput})),
)

export function trackSearchReducer(state: ITrackSearchState, action: Action): ITrackSearchState {
  return reducer(state, action);
}

const trackSearchStateSelector = createFeatureSelector<ITrackSearchState>(TRACK_SEARCH_STATE_KEY);

export const trackSearchSelectors = {
  searchInput: createSelector(trackSearchStateSelector, (state: ITrackSearchState): string => state.searchInput),
}