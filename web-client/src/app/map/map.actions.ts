import { createAction } from "@ngrx/store";
import { TrackCoord } from "../shared/models/track";

export const mapActions = {
  setTrackCoords: createAction('[Map] Set track coords', (trackCoords: TrackCoord[]) => ({trackCoords})),
}