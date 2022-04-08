import { createAction } from "@ngrx/store";
import { TrackCoord } from "../shared/models/trackCoord";

export const mapActions = {
  setTrackCoords: createAction('[MAP] Set track coords', (trackCoords: TrackCoord[]) => ({trackCoords})),
}