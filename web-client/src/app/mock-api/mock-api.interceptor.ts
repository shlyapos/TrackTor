import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { Track } from '../shared/models/track';
import { TrackLeaderboardRecord } from '../shared/models/leaderboard';
import { TrackCoord } from '../shared/models/trackCoord';
import * as faker from 'faker';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class BackendInterceptor implements HttpInterceptor {

  private randomCount = faker.datatype.number({min: 0, max: 10});
  private mockTrack:Track[] = Array.from({length: this.randomCount}).map((_, i) => {
    return {
      id: faker.datatype.string(),
      name: faker.datatype.string(),
      region: faker.address.city(),
      distance: faker.datatype.number(),
      time: faker.datatype.string(),
      transport: 'foot',
    }
  });

  private mockCoords: TrackCoord[] = [
    {lat: 55.70042, lng: 37.57874},
    {lat: 55.82848, lng: 37.64465},
    {lat: 55.78198, lng: 37.81631},
  ];

  private mockLeaderboard: TrackLeaderboardRecord[] = Array.from({length: 50}).map((_, i) => {
    return {
      loginLeader: faker.datatype.string(),
      time: faker.datatype.string(),
    }
  });

  private mockUser: User = {
    id: '1',
    login: 'dimakrut17',
    token: faker.datatype.string(),
  };
  private mockPassword = 'qwerty123';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === "GET" && request.url.endsWith("/tracks")) {
      return of(new HttpResponse({ status: 200, body: this.mockTrack }));
    }

    if (request.method === "GET" && request.url.endsWith("/coords")) {
      return of(new HttpResponse({ status: 200, body: this.mockCoords }));
    }

    if (request.method === "GET" && request.url.endsWith("/leaderboard")) {
      return of(new HttpResponse({ status: 200, body: this.mockLeaderboard }));
    }

    if (request.method === "POST" && request.url.endsWith("/auth")) {
      if (request.body.login === this.mockUser.login && request.body.password === this.mockPassword) {
        return of(new HttpResponse({ status: 200, body: this.mockUser }));
      }

      const error = { name: 'ApiError', message:'ApiError', response: {}};
      
      return throwError(error);
    }

    if (request.method === "POST" && request.url.endsWith("/registration")) {
      console.log(request);
      return of(new HttpResponse({ status: 200, body: this.mockUser }));
    }
    
    return next.handle(request)
  }

}