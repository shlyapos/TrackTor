export interface TrackLeaderboard {
  trackId: string;
  record: TrackLeaderboardItem[];
}

export interface TrackLeaderboardItem {
  loginLeader: string;
  time: string;
}