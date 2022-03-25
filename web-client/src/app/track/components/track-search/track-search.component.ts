import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, take, takeUntil } from 'rxjs/operators';
import { trackSearchActions } from './track-search.actions';
import { trackSearchSelectors } from './track-search.reducer';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.less']
})
export class TrackSearchComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  searchInput = new FormControl('');

  constructor(private readonly store$: Store) { }

  ngOnInit(): void {
    this.store$.select(trackSearchSelectors.searchInput).pipe(
      take(1),
      takeUntil(this.destroy$),
    ).subscribe(text => this.searchInput.setValue(text));

    this.searchInput.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(text => this.store$.dispatch(trackSearchActions.setSearchInput(text)));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
