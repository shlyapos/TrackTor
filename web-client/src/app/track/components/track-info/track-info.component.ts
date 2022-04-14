import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { trackSelectors } from '../../track.reducer';

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.less']
})
export class TrackInfoComponent {

  activeTrack$ = this.store$.select(trackSelectors.activeTrack)

  constructor(private readonly store$: Store) { }
}
