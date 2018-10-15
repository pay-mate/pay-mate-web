import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';

import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User = new User();
  @Output() userSubmit: EventEmitter<User> = new EventEmitter();
  @ViewChild('userForm') userForm: FormGroup;

  constructor(private changesDetector: ChangeDetectorRef) { }

  ngOnInit() {
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
