import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { trackActions } from '../../track.actions';
import { Track } from 'src/app/shared/models/track';
import * as faker from 'faker';


@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.less']
})
export class TrackPageComponent implements OnInit {

  constructor(private readonly store$: Store) { }

  ngOnInit(): void {
    const randomCount = faker.datatype.number({min: 0, max: 10});
    const mockTrack:Track[] = Array.from({length: randomCount}).map((_, i) => {
      return {
        id: faker.datatype.string(),
        name: faker.datatype.string(),
        region: faker.address.city(),
        distance: faker.datatype.number(),
        time: faker.datatype.string(),
        transport: 'foot',
      }
    });

    this.store$.dispatch(trackActions.loadTracks(mockTrack));
  }

}
