import { createAction } from "@ngrx/store";
import { Track } from "../shared/models/track";

export const trackActions = {
  loadTracks: createAction('[TRACK] Load tracks', (tracks: Track[]) => ({tracks})),
}