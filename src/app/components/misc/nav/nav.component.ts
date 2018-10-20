import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
 private sessionService: SessionService;
 private router: Router;
  constructor() { }

  ngOnInit() {
  }

  // onClickLogout(): void {
  //   this.sessionService.logout()
  //     .subscribe(() => {
  //       this.router.navigate(['/login']);
  //     });
  // }

}
