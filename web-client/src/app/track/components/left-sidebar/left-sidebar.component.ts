import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeftSidebarTabs } from 'src/app/shared/models/left-sidebar';
import { leftSidebarSelectors } from './left-sidebar.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.less']
})
export class LeftSidebarComponent {

  isTrackListTab$ = this.store$.select(leftSidebarSelectors.activeTab).pipe(
    map((tab) => tab === LeftSidebarTabs.TrackList),
  );

  constructor(private readonly store$: Store) {}
}
