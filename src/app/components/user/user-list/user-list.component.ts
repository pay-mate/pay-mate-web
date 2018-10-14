import { Subscription } from 'rxjs';
import { UserService } from './../../../shared/services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];
  onUserChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.list()
    .subscribe((users: Array<User>) => this.users = users);
    this.onUserChangesSubscription = this.userService.onUserChanges().subscribe((users: Array<User>) => this.users = users);
  }

  onCreateUser() {
    this.router.navigate(['group/:groupId/users']);
  }

  // ngOnDestroy(): void {
  //   this.onUserChangesSubscription.unsubscribe();
  // }

}
