import { Group } from './../../../shared/models/group.model';
import { UserService } from './../../../shared/services/user.service';
import { GroupService } from './../../../shared/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  group: Group = new Group();
  users: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.groupService.select(groupId)
        .subscribe(
          (group: Group) => this.group = group
        );
    });

    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.userService.list(groupId).subscribe((users: Array<User>) => this.users = users
      );
    });
  }

  onUserDetails(userId: string) {
    this.router.navigate(['groups/', this.group.id, 'users', userId]);
  }

  onLinkCreateUser() {
    this.router.navigate(['groups/', this.group.id, 'users', 'create']);
  }
  onGoGroup() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'users']);
    });
  }

  onGoPayments() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'payments']);
    });
  }

  onGoDebt() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'debts']);
    });
  }
}
