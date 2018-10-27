import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';

import { User } from '../../../shared/models/user.model';
import { ApiError } from '../../../shared/models/api-error.model';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  @Input() user: User = new User();
  @Output() userSubmit: EventEmitter<User> = new EventEmitter();
  @ViewChild('userForm') userForm: FormGroup;
  users: User[] = [];
  apiError: ApiError;

  constructor(private changesDetector: ChangeDetectorRef,
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;

      this.usersService.list(groupId).subscribe((users: Array<User>) => this.users = users
      );
    });
}

  onSubmitUserForm(): void {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
    if (this.userForm.valid) {
      this.userSubmit.emit(this.user);
      this.router.navigate(['groups/', groupId]);
    }
  });
}

  reset(): void {
    this.user = new User();
    this.userForm.reset();
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

