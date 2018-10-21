import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html'
})
export class GroupItemComponent implements OnInit {

  @Input() group: Group = new Group();

  constructor(
    private router: Router,
    private groupService: GroupService
  ) { }

  ngOnInit() {

  }
  onClickGroup() {
    this.router.navigate(['groups/', this.group.id]);
  }

  onDeleteGroup() {
    this.groupService.delete(this.group.id).subscribe(() => {} );
    this.router.navigate(['groups/']);
  }

}
