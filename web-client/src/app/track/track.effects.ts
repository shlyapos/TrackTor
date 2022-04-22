import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { trackActions } from "./track.actions";
import { mapActions } from "../map/map.actions";
import { Track } from "../shared/models/track";
import { TrackCoord } from "../shared/models/trackCoord";
import { TrackLeaderboardRecord } from "../shared/models/leaderboard";
import { catchError, filter, map, mergeMap, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { TuiNotification, TuiAlertService } from '@taiga-ui/core';

export const ERROR_LABEL_LOAD_TRACK = 'Не удалось загрузить треки';
export const ERROR_MESSAGE_LOAD_TRACK = 'Во время загрузки треков произошла ошибка';
export const ERROR_LABEL_LOAD_TRACK_COORDS = 'Не удалось загрузить координаты маршрута';
export const ERROR_MESSAGE_LOAD_TRACK_COORDS = 'Во время загрузки координат маршрута произошла ошибка';
export const ERROR_LABEL_LOAD_TRACK_LEADERBOARD = 'Не удалось загрузить таблицу лидеров';
export const ERROR_MESSAGE_LOAD_TRACK_LEADERBOARD = 'Во время загрузки таблицы лидеров произошла ошибка';

@Injectable()
export class TrackEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
  ) {}

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.loadTracks),
      mergeMap(() => this.http
        .get<Track[]>('/tracks')
        .pipe(
          map((tracks) => trackActions.saveTracks(tracks)),
          catchError((error) => {
            this.alertService.open(`${ERROR_MESSAGE_LOAD_TRACK}: ${error}`, {
              label: ERROR_LABEL_LOAD_TRACK,
              status: TuiNotification.Error,
            }).subscribe();
            
            return EMPTY;
          }),
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
          catchError((error) => {
            this.alertService.open(`${ERROR_MESSAGE_LOAD_TRACK_COORDS}: ${error}`, {
              label: ERROR_LABEL_LOAD_TRACK_COORDS,
              status: TuiNotification.Error,
            }).subscribe();
            
            return EMPTY;
          }),
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
          catchError((error) => {
            this.alertService.open(`${ERROR_MESSAGE_LOAD_TRACK_LEADERBOARD}: ${error}`, {
              label: ERROR_LABEL_LOAD_TRACK_LEADERBOARD,
              status: TuiNotification.Error,
            }).subscribe();
            
            return EMPTY;
          }),
        )
      ),
    )
  });

  clearActiveTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.setActiveTrack),
      filter(({activeTrack}) => activeTrack === null),
      mergeMap(() => [
        mapActions.setTrackCoords([]),
        trackActions.setActiveTrackLeaderboard([]),
      ]),
    )
  });
}
