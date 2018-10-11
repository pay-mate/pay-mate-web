import { map, catchError } from 'rxjs/operators';
import { ApiError } from './../models/api-error.model';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { Group } from '../models/group.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseApiService {
  private static readonly GROUP_API = `${BaseApiService.BASE_API}/groups`;

  private groups: Array<Group> = [];
  private groupsSubject: Subject <Array<Group>> = new Subject();

  constructor(private http: HttpClient) {
    super();
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

  select(groupId: String): Observable<Group | ApiError> {
    return this.http.get<Group>(`${GroupService.GROUP_API}/group/${groupId}`, BaseApiService.defaultOptions)
      .pipe(
        map((group: Group) => Object.assign(new Group(), group)),
        catchError(this.handleError));
  }

  onGroupChanges(): Observable<Array<Group>> {
    return this.groupsSubject.asObservable();
  }

  private notifyGroupsChanges(): void {
    this.groupsSubject.next(this.groups);
  }

}
