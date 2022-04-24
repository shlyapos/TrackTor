import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { trackActions } from '../../track.actions';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.less']
})
export class TrackPageComponent implements OnInit {

  constructor(
    private readonly store$: Store,
    private readonly auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(trackActions.loadTracks());
  }

  logout() {
    this.auth.logout();
  }


}
