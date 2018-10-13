import { GroupService } from './../../../shared/services/group.service';
import { Router } from '@angular/router';
import { Group } from './../../../shared/models/group.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
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
    this.router.navigate(['group/', this.group.id]);
  }

  onDeleteGroup() {
    this.groupService.delete(this.group.id).subscribe(() => {} );
  }

}
