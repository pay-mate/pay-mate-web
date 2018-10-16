import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Output() users: Array<User> = [];
  onUserChangesSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  userList() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.userService.list(groupId)
        .subscribe((users: Array<User>) => this.users = users);
        this.onUserChangesSubscription = this.userService.onUserChanges().subscribe((users: Array<User>) => this.users = users);
    });
  }
}
