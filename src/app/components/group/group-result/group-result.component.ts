import { GroupService } from './../../../shared/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from './../../../shared/models/group.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-result',
  templateUrl: './group-result.component.html',
  styleUrls: ['./group-result.component.css']
})
export class GroupResultComponent implements OnInit {

  group: Group = new Group();
  onGroupChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;

      this.groupService.result(groupId)
        .subscribe(
          (group: Group) => this.group = group
        );
    });
  }
}
