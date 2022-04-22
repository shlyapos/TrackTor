import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
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

  login(username: string, password: string) {
    return this.http.post<any>('/users/auth', { username, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}