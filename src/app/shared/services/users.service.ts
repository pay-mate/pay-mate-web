import { ActivatedRoute } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiError } from './../models/api-error.model';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

    private static readonly GROUP_API = `${BaseApiService.BASE_API}/groups`;
    private static readonly USER_API = `/users`;

  // private static readonly USER_API = `${BaseApiService.BASE_API}/groups/${this.params.groupId}/users`;

  private users: Array<User > = [];
  private usersSubject: Subject <Array<User >> = new Subject();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    super();
  }

  list(): Observable<Array<User > | ApiError> {
    return this.http.get<Array<User >>(`${UserService.GROUP_API}`, BaseApiService.defaultOptions)
      .pipe(
        map ((users: Array<User>) => {
          users = users.map(user => Object.assign(new User (), user));
          this.users = users;
          this.notifyUsersChanges();
          return users;
        }),
        catchError(this.handleError)
      );
  }

  select(groupId: string, id: String): Observable<User | ApiError> {
    return this.http.get<User>(`${UserService.GROUP_API}/${groupId}${UserService.USER_API}/${id}`, BaseApiService.defaultOptions)
    .pipe(
      map((user: User) => Object.assign(new User(), user)),
      catchError(this.handleError));
  }

  delete(groupId: string, id: String): Observable<User | ApiError>  {
    return this.http.delete<User>(`${UserService.GROUP_API}/${groupId}${UserService.USER_API}/${id}`, BaseApiService.defaultOptions)
    .pipe(
      tap(() => {
        this.users = this.users.filter(user => user.id !== id);
        this.notifyUsersChanges();
      }),
      catchError(this.handleError)
    );

    }

  onUserChanges(): Observable<Array<User >> {
    return this.usersSubject.asObservable();
  }

  private notifyUsersChanges(): void {
    this.usersSubject.next(this.users);
  }

}
