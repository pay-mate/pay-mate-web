import { Payment } from './../../../shared/models/payment.model';
import { map } from 'rxjs/operators';
import { GroupService } from './../../../shared/services/group.service';
import { Group } from './../../../shared/models/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { PaymentService } from '../../../shared/services/payment.service';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group = new Group();
  user: User = new User();
  users: User[] = [];
  payments: Payment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
    private paymentsService: PaymentService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.groupService.select(groupId)
        .subscribe(
          (group: Group) => this.group = group
        );
    });

    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.userService.list(groupId).subscribe((users: Array<User>) => this.users = users
      );
    });

    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.paymentsService.list(groupId).subscribe((payments: Array<Payment>) => this.payments = payments
      );
    });
  }

  onUserDetails(userId: string) {
    this.router.navigate(['groups/', this.group.id, 'users', userId]);
  }

  // onUserDelete(groupId: string, id: string) {
  //   this.route.params.subscribe(params => {
  //     const groupId = params.groupId;
  //     this.userService.delete(groupId, id)
  //       .subscribe(() => { });
  //   });
  // }

  onPaymentDetails(paymentId: string) {
    this.router.navigate(['groups/', this.group.id, 'payments', paymentId]);
  }

  onLinkCreateUser() {
    this.router.navigate(['groups/', this.group.id, 'users', 'create']);
  }

    onLinkCreatePayment() {
    this.router.navigate(['groups/', this.group.id, 'payments', 'create']);
  }

  onLinkDebts() {
    this.router.navigate(['groups/', this.group.id, 'debts']);
  }

}

