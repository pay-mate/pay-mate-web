
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Group } from './../../../shared/models/group.model';
import { Debt } from './../../../shared/models/debt.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { GroupService } from './../../../shared/services/group.service';

@Component({
  selector: 'app-group-result',
  templateUrl: './group-result.component.html'
})
export class GroupResultComponent implements OnInit {

  group: Group = new Group();
  users: User[] = [];
  result: Debt[] = [];
  debt: Debt = new Debt();
  onGroupChangesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;

      this.userService.list(groupId)
      .subscribe(
        (users: Array<User>) => this.users = users
      );

      this.groupService.result(groupId)
        .subscribe(
          (group: Group) => this.group = group
        );
    });
  }
}
