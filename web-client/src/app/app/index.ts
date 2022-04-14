import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { mapReducer } from "../map/map.reducer";
import { leftSidebarReducer } from "../track/components/left-sidebar/left-sidebar.reducer";
import { trackSearchReducer } from "../track/components/track-search/track-search.reducer";
import { TrackEffects } from "../track/track.effects";
import { trackReducer } from "../track/track.reducer";

export interface IState {
}

export const reducers: ActionReducerMap<IState> = {
  track: trackReducer,
  trackSearch: trackSearchReducer,
  leftSidebar: leftSidebarReducer,
  map: mapReducer,
}

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : []

export const effects = [
  TrackEffects,
]