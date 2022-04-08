import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { trackSelectors } from '../../track.reducer';

@Component({
  selector: 'app-track-leaderboard',
  templateUrl: './track-leaderboard.component.html',
  styleUrls: ['./track-leaderboard.component.less']
})
export class TrackLeaderboardComponent {

  leaderboard$ = this.store$.select(trackSelectors.activeTrackLeaderboard)

  constructor(private readonly store$: Store) { }
}
