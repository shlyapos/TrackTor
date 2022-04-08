import { createAction } from "@ngrx/store";
import { TrackLeaderboardRecord } from "../shared/models/leaderboard";
import { Track } from "../shared/models/track";

export const trackActions = {
  loadTracks: createAction('[TRACK] Load tracks'),
  saveTracks: createAction('[TRACK] Save tracks', (tracks: Track[]) => ({tracks})),
  setActiveTrack: createAction('[TRACK] Set active track', (activeTrack: Track | null) => ({activeTrack})),
  setActiveTrackLeaderboard: createAction('[TRACK] Set active track leaderboard', (activeLeaderboard: TrackLeaderboardRecord[]) => ({activeLeaderboard})),
}