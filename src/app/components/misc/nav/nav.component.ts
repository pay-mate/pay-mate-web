import { Group } from './../../../shared/models/group.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
 group: Group = new Group();
  onAdminChanges: Subscription;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.admin = this.sessionService.admin;
    this.onAdminChanges = this.sessionService.onAdminChanges()
      .subscribe((admin: Admin) => this.admin = admin);
  }

  ngOnDestroy() {
    this.onAdminChanges.unsubscribe();
  }

  onClickLogout(): void {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

}
