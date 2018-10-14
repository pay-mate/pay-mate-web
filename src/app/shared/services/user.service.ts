import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { ApiError } from '../models/api-error.model';

import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

  private static readonly GROUP_API = `${BaseApiService.BASE_API}/groups`;
  private static readonly USER_API = `/users`;

  private users: Array<User> = [];
  private usersSubject: Subject<Array<User>> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  select(groupId: string, id: String): Observable<User | ApiError> {
    return this.http.get<User>(`${UserService.GROUP_API}/${groupId}${UserService.USER_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((user: User) => Object.assign(new User(), user)),
        catchError(this.handleError));
  }

  delete(groupId: string, id: String): Observable<User | ApiError> {
    return this.http.delete<User>(`${UserService.GROUP_API}/${groupId}${UserService.USER_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.users = this.users.filter(user => user.id !== id);
          this.notifyUsersChanges();
        }),
        catchError(this.handleError)
      );

  }

  onUserChanges(): Observable<Array<User>> {
    return this.usersSubject.asObservable();
  }

  private notifyUsersChanges(): void {
    this.usersSubject.next(this.users);
  }

}
