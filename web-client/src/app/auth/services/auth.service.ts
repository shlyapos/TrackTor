import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';


export const ERROR_LABEL_AUTH = 'Не удалось авторизоваться';
export const ERROR_LABEL_REGISTRATION = 'Не удалось зарегистрироваться';
export const ERROR_MESSAGE_AUTH = 'Ошибка сервера или проверьте логин и пароль';
export const ERROR_MESSAGE_REGISTRATION = 'Ошибка сервера или пользователь с таким логином уже существует';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private readonly http: HttpClient,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly router: Router,
  ) {
    const user = JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));

    this.currentUserSubject = new BehaviorSubject<User | null>(user ? {
      id: user.id,
      login: user.login,
    } : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
      return this.currentUserSubject.value;
  }

  isAuthed(): boolean {
    return this.currentUserSubject.value ? true : false;
  }

  signIn(login: string, password: string) {
    return this.http.post<User>('/login', { login, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError((error) => {
          this.alertService.open(`${ERROR_MESSAGE_AUTH}: ${error}`, {
            label: ERROR_LABEL_AUTH,
            status: TuiNotification.Error,
          }).subscribe();
          return EMPTY;
        }),
      );
  }

  registration(login: string, password: string) {
    return this.http.post<User>('/user', { login, password })
      .pipe(
        mergeMap(() => {
          return this.http.post<User>('/login', { login, password });
        }),
        catchError((error) => {
          this.alertService.open(`${ERROR_MESSAGE_REGISTRATION}: ${error}`, {
            label: ERROR_LABEL_REGISTRATION,
            status: TuiNotification.Error,
          }).subscribe();
          return EMPTY;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['auth']);
  }
}