import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';

import { Payment } from './../../../shared/models/payment.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { PaymentService } from './../../../shared/services/payment.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  @Output() user: User = new User();
  payments: Payment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private paymentsService: PaymentService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const userId = params.userId;

      this.userService.select(groupId, userId)
        .subscribe(
          (user: User) => this.user = user
        );

      this.paymentsService.list(groupId).subscribe((payments: Payment[]) => {
        this.payments = payments.filter(payment => payment.payer === userId);
      });
    });
  }

  onDeleteUser() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const userId = this.user.id;
      this.userService.delete(groupId, userId)
        .subscribe(() => { });
        this.router.navigate(['groups/', groupId]);
    });
  }

  onLinkCreatePayment() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'payments', 'create']);
    });
  }

  onPaymentDetails(paymentId: string) {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
    this.router.navigate(['groups/', groupId, 'payments', paymentId]);
    });
  }

  onGoGroup() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'users']);
    });
  }

  onGoPayments() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'payments']);
    });
  }

  onGoDebt() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'debts']);
    });
  }
}
