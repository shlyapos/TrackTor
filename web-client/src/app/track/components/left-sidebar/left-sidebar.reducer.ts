import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { LeftSidebarTabs } from 'src/app/shared/models/left-sidebar';
import { leftSidebarActions } from './left-sidebar.actions';

export const LEFT_SIDEBAR_STATE_KEY = 'leftSidebar';

interface ILeftSidebarState {
  activeTab: LeftSidebarTabs;
}

const initialState: ILeftSidebarState = {
  activeTab: LeftSidebarTabs.TrackList,
}

const reducer = createReducer(
  initialState,
  on(leftSidebarActions.setActiveTab, (state, { activeTab }) => ({...state, activeTab})),
)

export function leftSidebarReducer(state: ILeftSidebarState, action: Action): ILeftSidebarState {
  return reducer(state, action);
}

const leftSidebarStateSelector = createFeatureSelector<ILeftSidebarState>(LEFT_SIDEBAR_STATE_KEY);

export const leftSidebarSelectors = {
  activeTab: createSelector(leftSidebarStateSelector, (state: ILeftSidebarState): LeftSidebarTabs => state.activeTab),
}