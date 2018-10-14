import { map } from 'rxjs/operators';
import { GroupService } from './../../../shared/services/group.service';
import { Group } from './../../../shared/models/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group = new Group();
  user: User = new User();

  constructor(
    private router: Router,
    private groupService: GroupService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;

      this.groupService.select(groupId)
        .subscribe(
          (group: Group) => this.group = group
        );
    });
  }

  onUserDetails(userId: string) {
    this.router.navigate(['groups/', this.group.id, 'users', userId]);
  }

  onPaymentDetails() {
    this.router.navigate(['register']);
  }

}

