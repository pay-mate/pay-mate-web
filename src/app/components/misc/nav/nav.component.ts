import { map } from 'rxjs/operators';
import { GroupService } from './../../../shared/services/group.service';
import { Group } from './../../../shared/models/group.model';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Admin } from './../../../shared/models/admin.model';
import { SessionService } from './../../../shared/services/session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  admin: Admin;
  group: Group;
  groupId: string;
  groups: Group [] = [];
  onAdminChanges: Subscription;
  onGroupChangesSubscription: Subscription;
  onGroupChanges: Subscription;

  constructor(
    private sessionService: SessionService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onAdminChanges = this.sessionService.onAdminChanges()
    .subscribe((admin: Admin) => this.admin = admin);

      this.onGroupChanges = this.groupService.onGroupChanges()
      .subscribe((group: Group) => {
      this.group = group;
    });


  }

  ngOnDestroy() {
    this.onAdminChanges.unsubscribe();
    this.onGroupChanges.unsubscribe();
  }

  onClickHome(): void {
    this.groupService.groupLogout();
  }

  onClickLogout(): void {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}


