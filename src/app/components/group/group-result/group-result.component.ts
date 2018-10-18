import { User } from './../../../shared/models/user.model';
import { GroupService } from './../../../shared/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from './../../../shared/models/group.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-group-result',
  templateUrl: './group-result.component.html',
  styleUrls: ['./group-result.component.css']
})
export class GroupResultComponent implements OnInit {

  group: Group = new Group();
  users: User[] = [];
  onGroupChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;

      this.groupService.result(groupId)
        .subscribe(
          (group: Group) => this.group = group
        );
        this.userService.list(groupId)
        .subscribe(
          (users: Array<User>) => this.users = users
        );
    });
  }
}
