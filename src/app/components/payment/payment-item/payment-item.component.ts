import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Payment } from './../../../shared/models/payment.model';
// import { User } from '../../../shared/models/user.model';
// import { Group } from './../../../shared/models/group.model';


@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html'
})
export class PaymentItemComponent implements OnInit {

  @Input() payment: Payment;
  // @Input() group: Group;
  // @Input() user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onPaymentDetails(paymentId: string) {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'payments', paymentId]);
    });
  }
}

