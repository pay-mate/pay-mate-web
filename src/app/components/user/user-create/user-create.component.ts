import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from './../../../shared/models/user.model';
import { UserFormComponent } from './../user-form/user-form.component';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;

  constructor(
    private routes: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

    onSubmitCreateUserForm(user: User) {
      this.routes.params.subscribe(params => {
        const groupId = params.groupId;
        this.userService.create(groupId, user)
          .subscribe(() => { });
      });
    }
  }
