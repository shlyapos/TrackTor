import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeftSidebarTabs } from 'src/app/shared/models/left-sidebar';
import { leftSidebarActions } from '../left-sidebar/left-sidebar.actions';

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.less']
})
export class TrackInfoComponent {

  constructor(private readonly store$: Store) { }

  onBackWard() {
    this.store$.dispatch(leftSidebarActions.setActiveTab(LeftSidebarTabs.TrackList));
  }

}
