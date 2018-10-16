import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../shared/services/user.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';

import { User } from '../../../shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User = new User();
  @Output() userSubmit: EventEmitter<User> = new EventEmitter();
  @ViewChild('userForm') userForm: FormGroup;
  users: User[] = [];

  constructor(private changesDetector: ChangeDetectorRef,
    private usersService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;

      this.usersService.list(groupId).subscribe((users: Array<User>) => this.users = users
      );
    });
}

  onSubmitUserForm(): void {
    if (this.userForm.valid) {
      this.userSubmit.emit(this.user);
    }
  }

  reset(): void {
    this.user = new User();
    this.userForm.reset();
  }

}
