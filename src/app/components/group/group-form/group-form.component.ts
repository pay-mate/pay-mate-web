import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Group } from './../../../shared/models/group.model';
import { ApiError } from '../../../shared/models/api-error.model';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html'
})
export class GroupFormComponent implements OnInit {

  @Input() group: Group = new Group();
  @Output() groupSubmit: EventEmitter<Group> = new EventEmitter();
  @ViewChild('groupForm') groupForm: FormGroup;
  apiError: ApiError;

  constructor(
    private changesDetector: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
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
