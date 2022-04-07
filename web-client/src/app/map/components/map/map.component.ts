import { MapService } from './../../services/map.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mapSelectors } from '../../map.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private readonly map: MapService,
    private readonly store$: Store,
  ) { }

  ngOnInit(): void {
    this.map.initMap(document.getElementById('map')!);

    this.store$.select(mapSelectors.trackCoords)
    .pipe(takeUntil(this.destroy$))
    .subscribe((coords) => {
      this.map.updateMap(coords);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}