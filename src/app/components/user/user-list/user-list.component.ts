import { UserService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: Array<User> = [];
  onUserChangesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.list()
    .subscribe((users: Array<User>) => this.users = users);
    this.onUserChangesSubscription = this.userService.onUserChanges().subscribe((users: Array<User>) => this.users = users);
  }


  ngOnDestroy(): void {
    this.onUserChangesSubscription.unsubscribe();
  }
}
