import { Component, OnInit } from '@angular/core';
import { TrackLeaderboard } from 'src/app/shared/models/leaderboard';

@Component({
  selector: 'app-track-leaderboard',
  templateUrl: './track-leaderboard.component.html',
  styleUrls: ['./track-leaderboard.component.less']
})
export class TrackLeaderboardComponent implements OnInit {

  table: TrackLeaderboard = {
    trackId: '1',
    record:  Array.from({length: 50}).map((_, i) => {
      return {
        loginLeader: 'd',
        time: '444'
      }
    }),
  }

  constructor() { }

  ngOnInit(): void {
  }

}
