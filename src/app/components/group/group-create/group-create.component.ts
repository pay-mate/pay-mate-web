import { Component, OnInit, ViewChild } from '@angular/core';

import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { GroupFormComponent } from './../group-form/group-form.component';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html'
})
export class GroupCreateComponent implements OnInit {
  @ViewChild(GroupFormComponent) groupFormComponent: GroupFormComponent;

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
  }

  onSubmitCreateGroupForm(group: Group): void {
    this.groupService.create(group)
    .subscribe((group: Group) => {
      this.groupFormComponent.reset();
    });
  }


}
