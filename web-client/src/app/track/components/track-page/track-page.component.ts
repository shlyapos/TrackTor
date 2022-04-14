import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { trackActions } from '../../track.actions';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.less']
})
export class TrackPageComponent implements OnInit {

  constructor(private readonly store$: Store) { }

  ngOnInit(): void {
    this.store$.dispatch(trackActions.loadTracks());
  }

}
