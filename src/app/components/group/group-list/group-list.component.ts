import { GroupService } from '../../../shared/services/group.service';
import { Group } from './../../../shared/models/group.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
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
    this.onGroupChangesSubscription = this.groupService.onGroupChanges().subscribe((groups: Array<Group>) => this.groups = groups);
  }

  onCreateGroup() {
    this.router.navigate(['group/create']);
  }

  ngOnDestroy(): void {
    this.onGroupChangesSubscription.unsubscribe();
  }
}
