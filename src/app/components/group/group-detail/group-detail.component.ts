import { Subscription } from 'rxjs';
import { GroupService } from '../../../shared/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from './../../../shared/models/group.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group = new Group();
  onGroupChangesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    console.log('SELECT->', this.groupService.select );
    // this.groupService.select(groupId)
    // .subscribe((group: Group) => this.group = group);
  }

}
