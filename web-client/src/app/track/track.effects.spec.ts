import { of, ReplaySubject, Subject, throwError } from "rxjs";
import { Action } from "@ngrx/store";
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClient } from "@angular/common/http";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { mock, when, verify, deepEqual, anything } from "ts-mockito";
import { TestBed } from "@angular/core/testing";
import { 
  ERROR_LABEL_LOAD_TRACK,
  ERROR_LABEL_LOAD_TRACK_COORDS,
  ERROR_LABEL_LOAD_TRACK_LEADERBOARD,
  ERROR_MESSAGE_LOAD_TRACK,
  ERROR_MESSAGE_LOAD_TRACK_COORDS,
  ERROR_MESSAGE_LOAD_TRACK_LEADERBOARD,
  TrackEffects 
} from "./track.effects";
import { trackActions } from "./track.actions";
import { mapActions } from "../map/map.actions";
import { Track, TransportType } from "../shared/models/track";
import { TrackCoord } from "../shared/models/trackCoord";
import { TrackLeaderboardRecord } from "../shared/models/leaderboard";
import providerOf from "../shared/utils/providerOf";
import * as faker from 'faker';

describe('TrackEffects', () => {
  let actions$: Subject<Action>;
  let effects: TrackEffects;
  let http: HttpClient;
  let alertService: TuiAlertService;

  beforeEach(() => {
    http = mock(HttpClient);
    alertService = mock(TuiAlertService);

    TestBed.configureTestingModule({
      providers: [
        TrackEffects,
        providerOf(HttpClient, http),
        providerOf(TuiAlertService, alertService),
        provideMockActions(() => actions$.asObservable()),
      ],
    });
  });

  beforeEach(() => {
    effects = TestBed.inject(TrackEffects);
    actions$ = new ReplaySubject(1);
  });

  describe('Загрузка треков', () => {
    let action: Action | null = null;

    beforeEach(() => {
      effects.loadTracks$.subscribe(result => (action = result));
      action = null;
    });

    it('Должен вызываться запрос на получение треков', () => {
      when(http.get<Track[]>('/tracks')).thenReturn(of(anything()));

      actions$.next(trackActions.loadTracks());

      verify(http.get<Track[]>('/tracks')).once();
    });

    it('Если ответ сервера успешный, то должен диспатчить экшен на сохранение загруженных треков', () => {
      const randomCount = faker.datatype.number({min: 0, max: 10});
      const mockTracks:Track[] = Array.from({length: randomCount}).map((_, i) => {
        return {
          id: faker.datatype.string(),
          userId: faker.datatype.string(),
          name: faker.datatype.string(),
          transportType: TransportType.Hiking,
          region: faker.address.city(),
          distance: faker.datatype.number(),
          time: faker.datatype.number(),
        }
      });

      when(http.get<Track[]>('/tracks')).thenReturn(of(mockTracks));

      actions$.next(trackActions.loadTracks());

      expect(action).toEqual(trackActions.saveTracks(mockTracks));
    });

    it('Если ответ сервера неуспешный, то должен показывать уведомление об ошибке', () => {
      const error = { name: 'ApiError', message:'ApiError', response: {}};

      when(http.get<Track[]>('/tracks')).thenReturn(throwError(error));

      actions$.next(trackActions.loadTracks());

      verify(
        alertService.open(
          `${ERROR_MESSAGE_LOAD_TRACK}: ${error}`,
          deepEqual({
            label: ERROR_LABEL_LOAD_TRACK,
            status: TuiNotification.Error,
          }),
        ),
      ).once();
    });
  });

  describe('Загрузка точек маршрута', () => {
    let action: Action | null = null;

    beforeEach(() => {
      effects.loadCoordsByTrackId$.subscribe(result => (action = result));
      action = null;
    });

    it('Должен вызываться запрос на получение точек маршрута', () => {
      const trackId = faker.datatype.string();
      const mockTrack:Track = {
        id: faker.datatype.string(),
        userId: faker.datatype.string(),
        name: faker.datatype.string(),
        transportType: TransportType.Hiking,
        region: faker.address.city(),
        distance: faker.datatype.number(),
        time: faker.datatype.number(),
      }

      when(http.get<TrackCoord[]>(`/tracks/${trackId}/coords`))
        .thenReturn(of(anything()));

      actions$.next(trackActions.setActiveTrack(mockTrack));

      verify(http.get<TrackCoord[]>(`/tracks/${trackId}/coords`)).once();
    });

    it('Если ответ сервера успешный, то должен диспатчить экшен на сохранение координат трека', () => {
      const trackId = faker.datatype.string();
      const mockTrack:Track = {
        id: faker.datatype.string(),
        userId: faker.datatype.string(),
        name: faker.datatype.string(),
        transportType: TransportType.Hiking,
        region: faker.address.city(),
        distance: faker.datatype.number(),
        time: faker.datatype.number(),
      }

      const randomCount = faker.datatype.number({min: 0, max: 10});
      const mockTrackCoords:TrackCoord[] = Array.from({length: randomCount}).map((_, i) => {
        return {
          lat: faker.datatype.number(),
          lng: faker.datatype.number(),
        }
      });

      when(http.get<TrackCoord[]>(`/tracks/${trackId}/coords`))
        .thenReturn(of(mockTrackCoords));

      actions$.next(trackActions.setActiveTrack(mockTrack));

      expect(action).toEqual(mapActions.setTrackCoords(mockTrackCoords));
    });

    it('Если ответ сервера неуспешный, то должен показывать уведомление об ошибке', () => {
      const trackId = faker.datatype.string();
      const mockTrack:Track = {
        id: faker.datatype.string(),
        userId: faker.datatype.string(),
        name: faker.datatype.string(),
        transportType: TransportType.Hiking,
        region: faker.address.city(),
        distance: faker.datatype.number(),
        time: faker.datatype.number(),
      }
      const error = { name: 'ApiError', message:'ApiError', response: {}};
     
      when(http.get<TrackCoord[]>(`/tracks/${trackId}/coords`))
        .thenReturn(throwError(error));

      actions$.next(trackActions.setActiveTrack(mockTrack));

      verify(
        alertService.open(
          `${ERROR_MESSAGE_LOAD_TRACK_COORDS}: ${error}`,
          deepEqual({
            label: ERROR_LABEL_LOAD_TRACK_COORDS,
            status: TuiNotification.Error,
          }),
        ),
      ).once();
    });
  });

  describe('Загрузка таблица лидеров для трека', () => {
    let action: Action | null = null;

    beforeEach(() => {
      effects.loadLeaderboardByTrackId$.subscribe(result => (action = result));
      action = null;
    });

    it('Должен вызываться запрос на получение таблицы лидеров для трека', () => {
      const trackId = faker.datatype.string();
      const mockTrack:Track = {
          id: faker.datatype.string(),
          userId: faker.datatype.string(),
          name: faker.datatype.string(),
          transportType: TransportType.Hiking,
          region: faker.address.city(),
          distance: faker.datatype.number(),
          time: faker.datatype.number(),
        }

      when(http.get<TrackLeaderboardRecord[]>(`/tracks/${trackId}/leaderboard`))
        .thenReturn(of(anything()));

      actions$.next(trackActions.setActiveTrack(mockTrack));

      verify(http.get<TrackLeaderboardRecord[]>(`/tracks/${trackId}/leaderboard`)).once();
    });

    it('Если ответ сервера успешный, то должен диспатчить экшен на сохранение таблицы лидеров трека', () => {
      const trackId = faker.datatype.string();
      const mockTrack:Track = {
        id: faker.datatype.string(),
        userId: faker.datatype.string(),
        name: faker.datatype.string(),
        transportType: TransportType.Hiking,
        region: faker.address.city(),
        distance: faker.datatype.number(),
        time: faker.datatype.number(),
      }
      const randomCount = faker.datatype.number({min: 0, max: 10});
      const mockLeaderboard: TrackLeaderboardRecord[] = Array.from({length: randomCount}).map((_, i) => {
        return {
          loginLeader: faker.datatype.string(),
          time: faker.datatype.string(),
        }
      });
    
      when(http.get<TrackLeaderboardRecord[]>(`/tracks/${trackId}/leaderboard`))
        .thenReturn(of(mockLeaderboard));

      actions$.next(trackActions.setActiveTrack(mockTrack));

      expect(action).toEqual(trackActions.setActiveTrackLeaderboard(mockLeaderboard));
    });

    it('Если ответ сервера неуспешный, то должен показывать уведомление об ошибке', () => {
      const trackId = faker.datatype.string();
      const mockTrack:Track = {
        id: faker.datatype.string(),
        userId: faker.datatype.string(),
        name: faker.datatype.string(),
        transportType: TransportType.Hiking,
        region: faker.address.city(),
        distance: faker.datatype.number(),
        time: faker.datatype.number(),
      }
      const error = { name: 'ApiError', message:'ApiError', response: {}};
     
      when(http.get<TrackLeaderboardRecord[]>(`/tracks/${trackId}/leaderboard`))
        .thenReturn(throwError(error));

      actions$.next(trackActions.setActiveTrack(mockTrack));

      verify(
        alertService.open(
          `${ERROR_MESSAGE_LOAD_TRACK_LEADERBOARD}: ${error}`,
          deepEqual({
            label: ERROR_LABEL_LOAD_TRACK_LEADERBOARD,
            status: TuiNotification.Error,
          }),
        ),
      ).once();
    });
  });

  describe('Отменить выбранный трек', () => {
    let actions: Action[] = [];

    beforeEach(() => {
      actions = [];
      effects.clearActiveTrack$.subscribe(result => {
        actions.push(result);
      });
    });

    it('Должен вызываться запрос на получение треков', () => {
      actions$.next(trackActions.setActiveTrack(null));

      expect(actions).toEqual([
        mapActions.setTrackCoords([]),
        trackActions.setActiveTrackLeaderboard([]),
      ]);
    });
  });
});