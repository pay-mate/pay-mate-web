import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../shared/models/user.model';
// import { Group } from './../../../shared/models/group.model';
import { Payment } from './../../../shared/models/payment.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html'
})
export class UserItemComponent implements OnInit {

 payment: Payment = new Payment();
  // @Input() group: Group = new Group();
  @Input() user: User = new User();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onUserDetails(userId: string) {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'users', userId]);
    });
  }

}
