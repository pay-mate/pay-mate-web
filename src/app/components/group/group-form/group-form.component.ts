import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiError } from '../../../shared/models/api-error.model';

import { Group } from './../../../shared/models/group.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  @Input() group: Group = new Group();
  @Output() groupSubmit: EventEmitter<Group> = new EventEmitter();
  @ViewChild('groupForm') groupForm: FormGroup;
  apiError: ApiError;

  constructor(
    private changesDetector: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmitGroupForm(): void {
    if (this.groupForm.valid) {
      this.groupSubmit.emit(this.group);
      this.router.navigate(['groups/']);
    }
  }

  reset(): void {
    this.group = new Group();
    this.groupForm.reset();
  }


}
