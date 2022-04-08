import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { trackActions } from "./track.actions";
import { mapActions } from "../map/map.actions";
import { Track } from "../shared/models/track";
import { TrackCoord } from "../shared/models/trackCoord";
import { TrackLeaderboardRecord } from "../shared/models/leaderboard";
import { catchError, filter, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class TrackEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
  ) {}

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.loadTracks),
      mergeMap(() => this.http
        .get<Track[]>('/tracks')
        .pipe(
          map((tracks) => trackActions.saveTracks(tracks)),
          catchError((error) => of(error)),
        )
      ),
    )
  });

  loadCoordsByTrackId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.setActiveTrack),
      filter(({activeTrack}) => !!activeTrack),
      mergeMap(({activeTrack}) => this.http
        .get<TrackCoord[]>(`/tracks/${activeTrack?.id}/coords`)
        .pipe(
          map((coords) => mapActions.setTrackCoords(coords)),
          catchError((error) => of(error)),
        )
      ),
    )
  });

  loadLeaderboardByTrackId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.setActiveTrack),
      filter(({activeTrack}) => !!activeTrack),
      mergeMap(({activeTrack}) => this.http
        .get<TrackLeaderboardRecord[]>(`/tracks/${activeTrack?.id}/leaderboard`)
        .pipe(
          map((leaderboard) => trackActions.setActiveTrackLeaderboard(leaderboard)),
          catchError((error) => of(error)),
        )
      ),
    )
  });

  clearActiveTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.setActiveTrack),
      filter(({activeTrack}) => activeTrack === null),
      tap(activeTrack => console.log(activeTrack)),
      mergeMap(() => [
        mapActions.setTrackCoords([]),
        trackActions.setActiveTrackLeaderboard([]),
      ]),
    )
  });
}
