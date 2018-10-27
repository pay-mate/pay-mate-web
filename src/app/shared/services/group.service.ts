import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Group } from '../models/group.model';
import { ApiError } from './../models/api-error.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseApiService {
  private static readonly GROUP_API = `${BaseApiService.BASE_API}/groups`;

  private groups: Array<Group> = [];
  group: Group;
  private groupsSubject: Subject <Array<Group>> = new Subject();
  private groupSubject: Subject <Group> = new Subject();


  constructor(private http: HttpClient) {
    super();
  }

  create(group: Group): Observable <Group | ApiError> {
    return this.http.post<Group>(`${GroupService.GROUP_API}`, group, BaseApiService.defaultOptions )// --> Con body y el json directamente
    // return this.http.post<Group>(`${GroupService.GROUP_API}`, group.asFormData(), { withCredentials: true }) // --> con FormData
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      map((group: Group) => {
        group = Object.assign(new Group(), group);
        this.groups.push(group);
        this.notifyGroupsChanges();
        return group;
      }),
      catchError(this.handleError));
  }

  list(): Observable<Array<Group> | ApiError> {
    return this.http.get<Array<Group>>(`${GroupService.GROUP_API}`, BaseApiService.defaultOptions)
      .pipe(
        map ((groups: Array<Group>) => {
          groups = groups.map(group => Object.assign(new Group(), group));
          this.groups = groups;
          this.notifyGroupsChanges();
          return groups;
        }),
        catchError(this.handleError)
      );
  }

  select(id: String): Observable<Group | ApiError> {
    return this.http.get<Group>(`${GroupService.GROUP_API}/${id}`, BaseApiService.defaultOptions)
    .pipe(
      map((group: Group) => {
        Object.assign(new Group(), group);
        this.group = group;
        this.notifyGroupChanges();
        return group;
      }),
      catchError(this.handleError));
  }

  delete(id: String): Observable<Group | ApiError> {
    return this.http.delete<Group>(`${GroupService.GROUP_API}/${id}`, BaseApiService.defaultOptions)
    .pipe(
      tap(() => {
      this.groups = this.groups.filter(group => group.id !== id);
      this.notifyGroupsChanges();
    }),
      catchError(this.handleError));
    }

    result(id: String): Observable<Group | ApiError> {
      return this.http.get<Group>(`${GroupService.GROUP_API}/${id}/result`, BaseApiService.defaultOptions)
      .pipe(
        map((group: Group) => Object.assign(new Group(), group)),
        catchError(this.handleError));
    }

  onGroupsChanges(): Observable<Array<Group>> {
    return this.groupsSubject.asObservable();
  }

  onGroupChanges(): Observable<Group> {
    return this.groupSubject.asObservable();
  }

  groupLogout(): void {
    this.group = null;
    this.notifyGroupChanges();
  }

  private notifyGroupsChanges(): void {
    this.groupsSubject.next(this.groups);
  }

  private notifyGroupChanges(): void {
    this.groupSubject.next(this.group);
  }

}
