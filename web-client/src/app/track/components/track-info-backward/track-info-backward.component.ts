import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeftSidebarTabs } from 'src/app/shared/models/left-sidebar';
import { trackActions } from '../../track.actions';
import { leftSidebarActions } from '../left-sidebar/left-sidebar.actions';

@Component({
  selector: 'app-track-info-backward',
  templateUrl: './track-info-backward.component.html',
  styleUrls: ['./track-info-backward.component.less']
})
export class TrackInfoBackwardComponent {

  constructor(private readonly store$: Store) { }

  onBackWard() {
    this.store$.dispatch(leftSidebarActions.setActiveTab(LeftSidebarTabs.TrackList));
    this.store$.dispatch(trackActions.setActiveTrack(null));
  }

}
