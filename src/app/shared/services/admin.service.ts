import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiError } from './../models/api-error.model';
import { Admin } from './../models/admin.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseApiService {
  private static readonly ADMIN_API = `${BaseApiService.BASE_API}/admins`;

  private adminsSubject: Subject<Array<Admin>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  create(admin: Admin): Observable<Admin | ApiError> {
    return this.http.post<Admin>(AdminService.ADMIN_API, admin, BaseApiService.defaultOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        map((admin: Admin) => Object.assign(new Admin(), admin)),
        catchError(this.handleError));
  }


  onAdminsChanges(): Observable<Array<Admin>> {
    return this.adminsSubject.asObservable();
  }

}
