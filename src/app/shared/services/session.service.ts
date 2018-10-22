import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Admin } from '../models/admin.model';
import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseApiService {
  private static readonly SESSIONS_API = `${BaseApiService.BASE_API}/`;
  private static readonly CURRENT_ADMIN_KEY = 'current-user';

  admin: Admin;
  adminSubject: Subject<Admin> = new Subject();

  constructor(private http: HttpClient) {
    super();
    const adminData = localStorage.getItem(SessionService.CURRENT_ADMIN_KEY);
    if (adminData) {
      this.admin = Object.assign(new Admin(), JSON.parse(adminData));
    }
    this.notifyAdminChanges();
  }

  authenticate(admin: Admin): Observable<Admin | ApiError> {
    return this.http.post<Admin>(SessionService.SESSIONS_API, admin, BaseApiService.defaultOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        map((admin: Admin) => {
          this.doAuthenticate(admin);
          return admin;
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<void | ApiError> {
    return this.http.delete(SessionService.SESSIONS_API, BaseApiService.defaultOptions)
      .pipe(
        map(() => this.doLogout()),
        catchError(this.handleError)
      );
  }

  onAdminChanges(): Observable<Admin> {
    return this.adminSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.admin ? true : false;
  }

  private notifyAdminChanges(): void {
    this.adminSubject.next(this.admin);
  }

  private doAuthenticate(admin: Admin): void {
    this.admin = admin;
    localStorage.setItem(SessionService.CURRENT_ADMIN_KEY, JSON.stringify(this.admin));
    this.notifyAdminChanges();
  }

  private doLogout(): void {
    this.admin = null;
    localStorage.removeItem(SessionService.CURRENT_ADMIN_KEY);
    this.notifyAdminChanges();
  }

}
