import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Group } from './../../../shared/models/group.model';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  @Input() group: Group = new Group();
  @Output() groupSubmit: EventEmitter<Group> = new EventEmitter();
  @ViewChild('groupForm') groupForm: FormGroup;

  constructor(private changesDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onSubmitGroupForm(): void {
    if (this.groupForm.valid) {
      this.groupSubmit.emit(this.group);
    }
  }

  reset(): void {
    this.group = new Group();
    this.groupForm.reset();
  }

}
