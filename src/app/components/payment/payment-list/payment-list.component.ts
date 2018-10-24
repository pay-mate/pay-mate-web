import { PaymentService } from './../../../shared/services/payment.service';
import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html'
})
export class PaymentListComponent implements OnInit {
  group: Group = new Group();
  payments: Payment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
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
      this.paymentsService.list(groupId).subscribe((payments: Array<Payment>) => this.payments = payments
      );
    });
  }

  onPaymentDetails(paymentId: string) {
    this.router.navigate(['groups/', this.group.id, 'payments', paymentId]);
  }

  onLinkCreatePayment() {
    this.router.navigate(['groups/', this.group.id, 'payments', 'create']);
  }

  onGoGroup() {
    this.route.params.subscribe(params => {
      this.router.navigate(['groups/', this.group.id, 'users']);
    });
  }

  onGoPayments() {
    this.route.params.subscribe(params => {
      this.router.navigate(['groups/', this.group.id, 'payments']);
    });
  }

  onGoDebt() {
    this.route.params.subscribe(params => {
      this.router.navigate(['groups/', this.group.id, 'debts']);
    });
  }

}
