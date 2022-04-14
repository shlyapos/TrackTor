import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeftSidebarTabs } from 'src/app/shared/models/left-sidebar';
import { Track } from 'src/app/shared/models/track';
import { trackActions } from '../../track.actions';
import { trackSelectors } from '../../track.reducer';
import { leftSidebarActions } from '../left-sidebar/left-sidebar.actions';
import { trackSearchSelectors } from '../track-search/track-search.reducer';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.less']
})
export class TrackListComponent {

  tracks$ = combineLatest([
    this.store$.select(trackSelectors.tracks),
    this.store$.select(trackSearchSelectors.searchInput),
  ]).pipe(
    map(([tracks, searchInput]) =>
      tracks.filter(({ name }) =>
        name.toLowerCase().includes(searchInput.toLowerCase())
      )
    ),
  );

  constructor(private readonly store$: Store) { }

  onTrackItem(track: Track) {
    this.store$.dispatch(leftSidebarActions.setActiveTab(LeftSidebarTabs.TrackInfo));
    this.store$.dispatch(trackActions.setActiveTrack(track));
  }

}
