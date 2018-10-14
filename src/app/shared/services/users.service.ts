import { map, catchError } from 'rxjs/operators';
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
  private static readonly USER_API = `${BaseApiService.BASE_API}/group/:groupId/users`;

  private users: Array<User > = [];
  private usersSubject: Subject <Array<User >> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(): Observable<Array<User > | ApiError> {
    return this.http.get<Array<User >>(`${UserService.USER_API}`, BaseApiService.defaultOptions)
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

  onUserChanges(): Observable<Array<User >> {
    return this.usersSubject.asObservable();
  }

  private notifyUsersChanges(): void {
    this.usersSubject.next(this.users);
  }

}
