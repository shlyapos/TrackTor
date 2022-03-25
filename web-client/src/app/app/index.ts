import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { leftSidebarReducer } from "../track/components/left-sidebar/left-sidebar.reducer";
import { trackSearchReducer } from "../track/components/track-search/track-search.reducer";
import { trackReducer } from "../track/track.reducer";

export interface IState {
}

export const reducers: ActionReducerMap<IState> = {
  track: trackReducer,
  trackSearch: trackSearchReducer,
  leftSidebar: leftSidebarReducer,
}

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : []