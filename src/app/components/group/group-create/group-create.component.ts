import { GroupFormComponent } from './../group-form/group-form.component';
import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  @ViewChild(GroupFormComponent) groupFormComponent: GroupFormComponent;

  constructor(
    private routes: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
  }

  onSubmitCreateGroupForm(group: Group): void {
    this.groupService.create(group)
    // tslint:disable-next-line:no-shadowed-variable
    .subscribe((group: Group) => {
      this.groupFormComponent.reset();
    });
  }

  // ¿canDeactivate?

}
