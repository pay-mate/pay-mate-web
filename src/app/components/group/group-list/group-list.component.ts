import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Group } from './../../../shared/models/group.model';
import { GroupService } from '../../../shared/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit, OnDestroy {

  groups: Array<Group> = [];
  onGroupChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.groupService.list()
    .subscribe((groups: Array<Group>) => this.groups = groups);
    this.onGroupChangesSubscription = this.groupService.onGroupsChanges().subscribe((groups: Array<Group>) => this.groups = groups);
  }

  onCreateGroup() {
    this.router.navigate(['groups/create']);
  }


  ngOnDestroy(): void {
    this.onGroupChangesSubscription.unsubscribe();
  }
}
